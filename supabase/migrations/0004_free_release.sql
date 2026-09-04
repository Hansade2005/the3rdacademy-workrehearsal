-- Free rehearsal release ("The Moment You Notice")
-- Ref: T3A-DEV-INS-WR-FREE-001
--
-- What this migration adds:
--   * moment_release_state       release lifecycle (DRAFT/LIVE/CLOSED), founder controlled
--   * moment_entitlements        period + permanent entitlements per user (both modules)
--   * moment_feedback            Prompt A / B / C responses
--   * moment_telemetry           screen-level events, campaign_source, aggregate use only
--   * RPCs:
--       moment_release_status()               public: is the release live
--       moment_start_period_entitlement()     issue period entitlement on signup
--       moment_enter_rehearsal(p_module)      convert to PERMANENT on first entry (both modules)
--       moment_my_entitlements()              current user's entitlement rows
--       moment_record_feedback(prompt,ans)    store Prompt A/B/C
--       moment_record_event(ev,mod,scr,src,p) telemetry, pseudonymous
--       moment_delete_my_responses()          participant self-service delete
--
-- Rules enforced at the data layer (not by convention):
--   * A free entitlement never generates bundle credit (kept separate from founding table)
--   * moment_feedback is aggregate-only: no participant read-back RPC exists
--   * moment_telemetry stores pseudonymous session_id + optional user_id; the
--     application never queries a per-participant behavioral history

create table if not exists public.moment_release_state (
  id                integer primary key default 1,
  state             text not null default 'DRAFT'
                    check (state in ('DRAFT','LIVE','CLOSED')),
  opens_at          timestamptz,
  closes_at         timestamptz,
  updated_at        timestamptz not null default now(),
  constraint moment_release_state_single check (id = 1)
);

insert into public.moment_release_state (id, state)
  values (1, 'DRAFT')
  on conflict (id) do nothing;

create table if not exists public.moment_entitlements (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  module_slug   text not null check (module_slug in ('saying-the-hard-thing','when-the-ai-looks-right')),
  status        text not null check (status in ('PERIOD','PERMANENT')),
  created_at    timestamptz not null default now(),
  activated_at  timestamptz,
  unique (user_id, module_slug)
);

create index if not exists moment_entitlements_user_idx
  on public.moment_entitlements(user_id);

create table if not exists public.moment_feedback (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,
  prompt        text not null check (prompt in ('A','B','C')),
  answers       jsonb not null,
  created_at    timestamptz not null default now()
);

create index if not exists moment_feedback_prompt_idx
  on public.moment_feedback(prompt);

create table if not exists public.moment_telemetry (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users(id) on delete set null,
  session_id        text,
  event_name        text not null,
  module_slug       text,
  screen_id         text,
  campaign_source   text,
  properties        jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now()
);

create index if not exists moment_telemetry_event_idx
  on public.moment_telemetry(event_name, module_slug, screen_id);
create index if not exists moment_telemetry_source_idx
  on public.moment_telemetry(campaign_source);

alter table public.moment_release_state enable row level security;
alter table public.moment_entitlements  enable row level security;
alter table public.moment_feedback      enable row level security;
alter table public.moment_telemetry     enable row level security;

drop policy if exists moment_release_state_read on public.moment_release_state;
create policy moment_release_state_read on public.moment_release_state
  for select to anon, authenticated using (true);

drop policy if exists moment_entitlements_own_read on public.moment_entitlements;
create policy moment_entitlements_own_read on public.moment_entitlements
  for select to authenticated using (user_id = auth.uid());

-- Feedback and telemetry are never surfaced back to participants; no select policy.

create or replace function public.moment_release_status()
returns table(state text, opens_at timestamptz, closes_at timestamptz)
language sql
security definer
set search_path = public
as $BODY$
  select state, opens_at, closes_at from public.moment_release_state where id = 1;
$BODY$;

grant execute on function public.moment_release_status() to anon, authenticated;

create or replace function public.moment_start_period_entitlement()
returns void
language plpgsql
security definer
set search_path = public
as $BODY$
declare
  v_uid  uuid := auth.uid();
  v_st   text;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  select state into v_st from public.moment_release_state where id = 1;
  if v_st <> 'LIVE' then
    raise exception 'release not live';
  end if;

  insert into public.moment_entitlements (user_id, module_slug, status)
    values (v_uid, 'saying-the-hard-thing', 'PERIOD'),
           (v_uid, 'when-the-ai-looks-right', 'PERIOD')
    on conflict (user_id, module_slug) do nothing;
end;
$BODY$;

grant execute on function public.moment_start_period_entitlement() to authenticated;

create or replace function public.moment_enter_rehearsal(p_module text)
returns void
language plpgsql
security definer
set search_path = public
as $BODY$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;
  if p_module not in ('saying-the-hard-thing','when-the-ai-looks-right') then
    raise exception 'invalid module %', p_module;
  end if;

  -- Entering either module permanently grants BOTH modules.
  -- Founder decision, Section 6.
  insert into public.moment_entitlements (user_id, module_slug, status, activated_at)
    values (v_uid, 'saying-the-hard-thing',   'PERMANENT', now()),
           (v_uid, 'when-the-ai-looks-right', 'PERMANENT', now())
  on conflict (user_id, module_slug) do update
    set status       = 'PERMANENT',
        activated_at = coalesce(public.moment_entitlements.activated_at, now());
end;
$BODY$;

grant execute on function public.moment_enter_rehearsal(text) to authenticated;

create or replace function public.moment_my_entitlements()
returns table(module_slug text, status text, created_at timestamptz, activated_at timestamptz)
language sql
security definer
set search_path = public
as $BODY$
  select module_slug, status, created_at, activated_at
    from public.moment_entitlements
   where user_id = auth.uid();
$BODY$;

grant execute on function public.moment_my_entitlements() to authenticated;

create or replace function public.moment_record_feedback(p_prompt text, p_answers jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $BODY$
begin
  if p_prompt not in ('A','B','C') then
    raise exception 'invalid prompt %', p_prompt;
  end if;
  insert into public.moment_feedback (user_id, prompt, answers)
    values (auth.uid(), p_prompt, coalesce(p_answers, '{}'::jsonb));
end;
$BODY$;

grant execute on function public.moment_record_feedback(text, jsonb) to anon, authenticated;

create or replace function public.moment_record_event(
  p_event text,
  p_module text,
  p_screen text,
  p_source text,
  p_session text,
  p_props jsonb
) returns void
language plpgsql
security definer
set search_path = public
as $BODY$
begin
  insert into public.moment_telemetry
    (user_id, session_id, event_name, module_slug, screen_id, campaign_source, properties)
  values
    (auth.uid(), p_session, p_event, p_module, p_screen, p_source, coalesce(p_props, '{}'::jsonb));
end;
$BODY$;

grant execute on function public.moment_record_event(text,text,text,text,text,jsonb) to anon, authenticated;

create or replace function public.moment_delete_my_responses()
returns void
language plpgsql
security definer
set search_path = public
as $BODY$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;
  delete from public.moment_feedback  where user_id = v_uid;
  delete from public.moment_telemetry where user_id = v_uid;
end;
$BODY$;

grant execute on function public.moment_delete_my_responses() to authenticated;
