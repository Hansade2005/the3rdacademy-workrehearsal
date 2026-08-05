-- Founding Cohort schema for WorkRehearsal.com
-- Per Founder memo, July 2026: seat counters, tranche stepping, atomic bundle decrement.

create table if not exists public.analytics_events (
  id           bigserial primary key,
  event        text not null,
  properties   jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now()
);

alter table public.analytics_events enable row level security;
drop policy if exists analytics_insert_anon on public.analytics_events;
create policy analytics_insert_anon on public.analytics_events
  for insert to anon, authenticated with check (true);

-- One row per product tracking seats sold in the Founding Cohort.
create table if not exists public.founding_cohort_seats (
  product        text primary key check (product in ('probation_blueprint','ai_ready_behaviours')),
  seats_taken    integer not null default 0 check (seats_taken >= 0),
  cohort_size    integer not null default 100,
  tranche1_size  integer not null default 50,
  updated_at     timestamptz not null default now()
);

insert into public.founding_cohort_seats (product) values
  ('probation_blueprint'),
  ('ai_ready_behaviours')
on conflict (product) do nothing;

-- Order ledger. One row per successful order (single product or bundle).
create table if not exists public.founding_cohort_orders (
  id             uuid primary key default gen_random_uuid(),
  order_type     text not null check (order_type in ('probation_blueprint','ai_ready_behaviours','bundle')),
  probation_seat integer,
  ai_ready_seat  integer,
  tranche        text not null check (tranche in ('T1','T2','POST')),
  price_usd      integer not null,
  buyer_email    text,
  created_at     timestamptz not null default now()
);

alter table public.founding_cohort_seats enable row level security;
alter table public.founding_cohort_orders enable row level security;

drop policy if exists seats_read_all on public.founding_cohort_seats;
create policy seats_read_all on public.founding_cohort_seats
  for select to anon, authenticated using (true);

-- Reserve a seat for a single product. Returns tranche + seat_number + price.
-- Atomic: SELECT ... FOR UPDATE serializes concurrent checkouts.
create or replace function public.reserve_founding_seat(p_product text, p_buyer_email text default null)
returns table(seat_number integer, tranche text, price_usd integer)
language plpgsql
security definer
set search_path = public
as $BODY$
declare
  v_seats  integer;
  v_cap    integer;
  v_t1     integer;
  v_price  integer;
  v_tr     text;
begin
  if p_product not in ('probation_blueprint','ai_ready_behaviours') then
    raise exception 'invalid product %', p_product;
  end if;

  select seats_taken, cohort_size, tranche1_size
    into v_seats, v_cap, v_t1
    from public.founding_cohort_seats
   where product = p_product
   for update;

  if v_seats >= v_cap then
    v_tr := 'POST';
    v_price := case p_product when 'probation_blueprint' then 249 else 179 end;
    insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email)
      values (p_product, v_tr, v_price, p_buyer_email);
    return query select null::integer, v_tr, v_price;
    return;
  end if;

  if v_seats < v_t1 then
    v_tr := 'T1';
    v_price := case p_product when 'probation_blueprint' then 99 else 79 end;
  else
    v_tr := 'T2';
    v_price := case p_product when 'probation_blueprint' then 149 else 119 end;
  end if;

  update public.founding_cohort_seats
     set seats_taken = seats_taken + 1, updated_at = now()
   where product = p_product;

  insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email,
    probation_seat, ai_ready_seat)
    values (p_product, v_tr, v_price, p_buyer_email,
      case when p_product='probation_blueprint' then v_seats + 1 end,
      case when p_product='ai_ready_behaviours' then v_seats + 1 end);

  return query select (v_seats + 1)::integer, v_tr, v_price;
end;
$BODY$;

-- Reserve one seat from EACH product atomically for a bundle purchase.
-- Bundle Founding Cohort pricing requires both cohorts to still be open.
-- When products sit in different tranches, the LATER (higher) tranche governs.
create or replace function public.reserve_founding_bundle(p_buyer_email text default null)
returns table(probation_seat integer, ai_ready_seat integer, tranche text, price_usd integer)
language plpgsql
security definer
set search_path = public
as $BODY$
declare
  v_pb_seats integer;
  v_ai_seats integer;
  v_cap      integer := 100;
  v_t1       integer := 50;
  v_tr       text;
  v_price    integer;
begin
  -- Lock rows in deterministic (alphabetical) order to avoid deadlocks under concurrency.
  select seats_taken into v_ai_seats
    from public.founding_cohort_seats
   where product = 'ai_ready_behaviours'
   for update;
  select seats_taken into v_pb_seats
    from public.founding_cohort_seats
   where product = 'probation_blueprint'
   for update;

  -- If either cohort is closed, revert to post-launch bundle price.
  if v_pb_seats >= v_cap or v_ai_seats >= v_cap then
    v_tr := 'POST';
    v_price := 379;
    insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email)
      values ('bundle', v_tr, v_price, p_buyer_email);
    return query select null::integer, null::integer, v_tr, v_price;
    return;
  end if;

  -- Later tranche governs.
  if v_pb_seats >= v_t1 or v_ai_seats >= v_t1 then
    v_tr := 'T2';
    v_price := 229;
  else
    v_tr := 'T1';
    v_price := 149;
  end if;

  update public.founding_cohort_seats
     set seats_taken = seats_taken + 1, updated_at = now()
   where product in ('probation_blueprint','ai_ready_behaviours');

  insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email,
    probation_seat, ai_ready_seat)
    values ('bundle', v_tr, v_price, p_buyer_email,
      v_pb_seats + 1, v_ai_seats + 1);

  return query select (v_pb_seats + 1)::integer, (v_ai_seats + 1)::integer, v_tr, v_price;
end;
$BODY$;

grant execute on function public.reserve_founding_seat(text, text) to anon, authenticated;
grant execute on function public.reserve_founding_bundle(text) to anon, authenticated;
