-- App-wide daily visit stats. Reads moment_telemetry.event_name='page_view'
-- (fired by PageViewTracker on every route change). Admin-only.

create or replace function public.moment_daily_visits(
  p_from timestamptz default (now() - interval '30 days'),
  p_to   timestamptz default now()
)
returns table(
  day             date,
  unique_sessions bigint,
  page_views      bigint,
  signed_in_users bigint
)
language sql
security definer
set search_path = public
as $BODY$
  select
    (created_at at time zone 'UTC')::date        as day,
    count(distinct session_id)                    as unique_sessions,
    count(*)                                      as page_views,
    count(distinct user_id) filter (where user_id is not null) as signed_in_users
  from public.moment_telemetry
  where event_name = 'page_view'
    and created_at between p_from and p_to
    and public.is_admin()
  group by day
  order by day;
$BODY$;

grant execute on function public.moment_daily_visits(timestamptz, timestamptz) to authenticated;

-- Top pages in a window.
create or replace function public.moment_top_pages(
  p_from timestamptz default (now() - interval '30 days'),
  p_to   timestamptz default now(),
  p_limit int default 25
)
returns table(
  path            text,
  page_views      bigint,
  unique_sessions bigint
)
language sql
security definer
set search_path = public
as $BODY$
  select
    coalesce(properties->>'path', screen_id, '(unknown)') as path,
    count(*)                                              as page_views,
    count(distinct session_id)                            as unique_sessions
  from public.moment_telemetry
  where event_name = 'page_view'
    and created_at between p_from and p_to
    and public.is_admin()
  group by 1
  order by page_views desc
  limit least(coalesce(p_limit, 25), 200);
$BODY$;

grant execute on function public.moment_top_pages(timestamptz, timestamptz, int) to authenticated;
