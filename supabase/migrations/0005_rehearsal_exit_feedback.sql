-- Mid-rehearsal exit feedback + drop-off telemetry.
-- Captures why a participant leaves a module part-way, plus a lightweight
-- beacon-safe row for tab-close cases where a UI prompt can't render.

create table if not exists public.rehearsal_exit_feedback (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,
  session_id    text,
  module_slug   text not null,
  screen_id     text,
  exit_kind     text not null check (exit_kind in (
    'in_app_navigation','tab_close','explicit_leave','beacon'
  )),
  reason_text   text,
  elapsed_ms    integer,
  properties    jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists rehearsal_exit_feedback_module_idx
  on public.rehearsal_exit_feedback(module_slug);
create index if not exists rehearsal_exit_feedback_created_idx
  on public.rehearsal_exit_feedback(created_at desc);

alter table public.rehearsal_exit_feedback enable row level security;
-- No select policy — responses are aggregate-only, never surfaced back.

create or replace function public.rehearsal_record_exit(
  p_module    text,
  p_screen    text,
  p_kind      text,
  p_reason    text,
  p_elapsed   integer,
  p_session   text,
  p_props     jsonb
) returns void
language plpgsql
security definer
set search_path = public
as $BODY$
begin
  if p_kind not in ('in_app_navigation','tab_close','explicit_leave','beacon') then
    raise exception 'invalid exit_kind %', p_kind;
  end if;
  insert into public.rehearsal_exit_feedback
    (user_id, session_id, module_slug, screen_id, exit_kind,
     reason_text, elapsed_ms, properties)
  values
    (auth.uid(), p_session, p_module, p_screen, p_kind,
     nullif(p_reason,''), p_elapsed, coalesce(p_props, '{}'::jsonb));
end;
$BODY$;

grant execute on function public.rehearsal_record_exit(
  text, text, text, text, integer, text, jsonb
) to anon, authenticated;
