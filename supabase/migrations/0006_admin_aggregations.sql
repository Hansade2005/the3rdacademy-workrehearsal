-- Admin gate + aggregate read RPCs on top of the write-only telemetry.
-- Section 7: "aggregate reporting only" enforced at the data layer, not the UI.
-- Every RPC below runs SECURITY DEFINER and rejects unless auth.uid() is in
-- admin_users. No participant-level row is ever surfaced.

-- ---------------------------------------------------------------------------
-- Admin roster
-- ---------------------------------------------------------------------------

create table if not exists public.admin_users (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  added_at    timestamptz not null default now(),
  note        text
);

alter table public.admin_users enable row level security;
-- Self-read only. Aggregation RPCs check membership internally.
drop policy if exists admin_users_self_read on public.admin_users;
create policy admin_users_self_read on public.admin_users
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $BODY$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$BODY$;

grant execute on function public.is_admin() to authenticated;

-- Convenience: current user's admin flag (safe to expose).
create or replace function public.moment_am_i_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $BODY$
  select public.is_admin();
$BODY$;

grant execute on function public.moment_am_i_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- Aggregate reads (admin-only)
-- ---------------------------------------------------------------------------

-- Section 8 headline funnel: signups → entered → completed, by module.
-- "Completed" = telemetry event 'moment_module_complete' OR a Prompt A/B row
-- OR an entitlement row with activated_at set. We use activated_at from
-- moment_entitlements as the canonical "entered" signal and count telemetry
-- 'bridgefast:complete' proxy events for completion.
create or replace function public.moment_funnel_stats(
  p_from timestamptz default (now() - interval '30 days'),
  p_to   timestamptz default now()
)
returns table(
  signups              bigint,
  gate_completed       bigint,
  entered_m1           bigint,
  entered_m2           bigint,
  completed_m1         bigint,
  completed_m2         bigint,
  finished_product     bigint,
  feedback_a           bigint,
  feedback_b           bigint,
  feedback_c           bigint
)
language sql
security definer
set search_path = public
as $BODY$
  select
    (select count(*) from auth.users
       where created_at between p_from and p_to),
    (select count(distinct user_id) from public.moment_telemetry
       where event_name = 'moment_gate_completed'
         and created_at between p_from and p_to),
    (select count(distinct user_id) from public.moment_entitlements
       where module_slug = 'saying-the-hard-thing'
         and activated_at is not null
         and activated_at between p_from and p_to),
    (select count(distinct user_id) from public.moment_entitlements
       where module_slug = 'when-the-ai-looks-right'
         and activated_at is not null
         and activated_at between p_from and p_to),
    (select count(distinct user_id) from public.moment_telemetry
       where event_name in ('moment_module_complete','bridgefast:complete')
         and module_slug = 'saying-the-hard-thing'
         and created_at between p_from and p_to),
    (select count(distinct user_id) from public.moment_telemetry
       where event_name in ('moment_module_complete','bridgefast:complete')
         and module_slug = 'when-the-ai-looks-right'
         and created_at between p_from and p_to),
    (select count(*) from public.moment_telemetry
       where event_name = 'moment_end_view'
         and created_at between p_from and p_to),
    (select count(*) from public.moment_feedback
       where prompt = 'A' and created_at between p_from and p_to),
    (select count(*) from public.moment_feedback
       where prompt = 'B' and created_at between p_from and p_to),
    (select count(*) from public.moment_feedback
       where prompt = 'C' and created_at between p_from and p_to)
  where public.is_admin();
$BODY$;

grant execute on function public.moment_funnel_stats(timestamptz, timestamptz) to authenticated;

-- Screen-level drop-off inside a module. Aggregates telemetry rows grouped by
-- screen_id and counts distinct sessions; useful for spotting where people
-- stop scrolling.
create or replace function public.moment_dropoff_by_screen(
  p_module text,
  p_from   timestamptz default (now() - interval '30 days'),
  p_to     timestamptz default now()
)
returns table(
  screen_id       text,
  sessions_seen   bigint,
  total_events    bigint
)
language sql
security definer
set search_path = public
as $BODY$
  select
    coalesce(screen_id, '(none)') as screen_id,
    count(distinct session_id)    as sessions_seen,
    count(*)                       as total_events
  from public.moment_telemetry
  where module_slug = p_module
    and created_at between p_from and p_to
    and public.is_admin()
  group by screen_id
  order by sessions_seen desc;
$BODY$;

grant execute on function public.moment_dropoff_by_screen(text, timestamptz, timestamptz) to authenticated;

-- Exit rows grouped by module + exit_kind. The "why they stopped" table.
create or replace function public.moment_exit_summary(
  p_from timestamptz default (now() - interval '30 days'),
  p_to   timestamptz default now()
)
returns table(
  module_slug   text,
  exit_kind     text,
  n             bigint,
  median_ms     numeric
)
language sql
security definer
set search_path = public
as $BODY$
  select
    module_slug,
    exit_kind,
    count(*)                                                              as n,
    percentile_cont(0.5) within group (order by elapsed_ms)::numeric      as median_ms
  from public.rehearsal_exit_feedback
  where created_at between p_from and p_to
    and public.is_admin()
  group by module_slug, exit_kind
  order by module_slug, n desc;
$BODY$;

grant execute on function public.moment_exit_summary(timestamptz, timestamptz) to authenticated;

-- Completion by campaign_source (Section 7: "which channels send people who finish").
create or replace function public.moment_source_stats(
  p_from timestamptz default (now() - interval '30 days'),
  p_to   timestamptz default now()
)
returns table(
  campaign_source   text,
  sessions          bigint,
  gate_completions  bigint,
  module_completions bigint
)
language sql
security definer
set search_path = public
as $BODY$
  select
    coalesce(campaign_source, '(direct)')                                  as campaign_source,
    count(distinct session_id)                                             as sessions,
    count(*) filter (where event_name = 'moment_gate_completed')           as gate_completions,
    count(*) filter (where event_name in ('moment_module_complete','bridgefast:complete')) as module_completions
  from public.moment_telemetry
  where created_at between p_from and p_to
    and public.is_admin()
  group by campaign_source
  order by sessions desc;
$BODY$;

grant execute on function public.moment_source_stats(timestamptz, timestamptz) to authenticated;

-- Recent free-text feedback (paginated). Read-only, admin-only, most-recent first.
-- Answers are jsonb — the caller decides which keys to display.
create or replace function public.moment_feedback_recent(
  p_prompt text default null,
  p_limit  int  default 50,
  p_offset int  default 0
)
returns table(
  id          uuid,
  prompt      text,
  answers     jsonb,
  created_at  timestamptz
)
language sql
security definer
set search_path = public
as $BODY$
  select id, prompt, answers, created_at
  from public.moment_feedback
  where (p_prompt is null or prompt = p_prompt)
    and public.is_admin()
  order by created_at desc
  limit least(coalesce(p_limit, 50), 500)
  offset greatest(coalesce(p_offset, 0), 0);
$BODY$;

grant execute on function public.moment_feedback_recent(text, int, int) to authenticated;

-- Plausibility roll-up for Prompt A question 3 ("were the choices close to what
-- you would actually do at work?"). Yes / No / Not sure counts.
create or replace function public.moment_plausibility_counts(
  p_from timestamptz default (now() - interval '30 days'),
  p_to   timestamptz default now()
)
returns table(answer text, n bigint)
language sql
security definer
set search_path = public
as $BODY$
  select
    coalesce(nullif(answers->>'plausible',''), '(no answer)') as answer,
    count(*)                                                  as n
  from public.moment_feedback
  where prompt = 'A'
    and created_at between p_from and p_to
    and public.is_admin()
  group by answers->>'plausible'
  order by n desc;
$BODY$;

grant execute on function public.moment_plausibility_counts(timestamptz, timestamptz) to authenticated;

-- Appetite roll-up for Prompt B question 3 ("would you want to rehearse other
-- workplace moments like these?"). Yes / No / Not sure counts.
create or replace function public.moment_appetite_counts(
  p_from timestamptz default (now() - interval '30 days'),
  p_to   timestamptz default now()
)
returns table(answer text, n bigint)
language sql
security definer
set search_path = public
as $BODY$
  select
    coalesce(nullif(answers->>'appetite',''), '(no answer)') as answer,
    count(*)                                                 as n
  from public.moment_feedback
  where prompt = 'B'
    and created_at between p_from and p_to
    and public.is_admin()
  group by answers->>'appetite'
  order by n desc;
$BODY$;

grant execute on function public.moment_appetite_counts(timestamptz, timestamptz) to authenticated;
