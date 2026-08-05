-- Auth & entitlements: link Founding Cohort orders to auth users, gate the
-- rehearsal modules on ownership. Stripe checkout will land next; for now the
-- reserve_founding_* RPCs (which run as the calling user) capture auth.uid()
-- if a session is present, so a signed-in reserve immediately confers access.

alter table public.founding_cohort_orders
  add column if not exists user_id uuid;

create index if not exists founding_cohort_orders_user_id_idx
  on public.founding_cohort_orders(user_id);

drop policy if exists orders_own_read on public.founding_cohort_orders;
create policy orders_own_read on public.founding_cohort_orders
  for select to authenticated
  using (user_id = auth.uid());

-- Recreate reserve_founding_seat with auth.uid() capture.
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
  v_uid    uuid := auth.uid();
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
    insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id)
      values (p_product, v_tr, v_price, p_buyer_email, v_uid);
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

  insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id,
    probation_seat, ai_ready_seat)
    values (p_product, v_tr, v_price, p_buyer_email, v_uid,
      case when p_product='probation_blueprint' then v_seats + 1 end,
      case when p_product='ai_ready_behaviours' then v_seats + 1 end);

  return query select (v_seats + 1)::integer, v_tr, v_price;
end;
$BODY$;

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
  v_uid      uuid := auth.uid();
begin
  select seats_taken into v_ai_seats
    from public.founding_cohort_seats
   where product = 'ai_ready_behaviours'
   for update;
  select seats_taken into v_pb_seats
    from public.founding_cohort_seats
   where product = 'probation_blueprint'
   for update;

  if v_pb_seats >= v_cap or v_ai_seats >= v_cap then
    v_tr := 'POST';
    v_price := 379;
    insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id)
      values ('bundle', v_tr, v_price, p_buyer_email, v_uid);
    return query select null::integer, null::integer, v_tr, v_price;
    return;
  end if;

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

  insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id,
    probation_seat, ai_ready_seat)
    values ('bundle', v_tr, v_price, p_buyer_email, v_uid,
      v_pb_seats + 1, v_ai_seats + 1);

  return query select (v_pb_seats + 1)::integer, (v_ai_seats + 1)::integer, v_tr, v_price;
end;
$BODY$;

-- Entitlement check. Returns true if the calling user owns the given product
-- (either directly or via a bundle purchase). SECURITY DEFINER so it reads the
-- orders table even under RLS; matching strictly on auth.uid() prevents
-- cross-user reads.
create or replace function public.has_founding_access(p_product text)
returns boolean
language sql
security definer
set search_path = public
stable
as $BODY$
  select exists (
    select 1
      from public.founding_cohort_orders
     where user_id = auth.uid()
       and (order_type = p_product or order_type = 'bundle')
       and tranche in ('T1','T2','POST')
  );
$BODY$;

-- List the calling user's entitlements in one round trip.
create or replace function public.my_founding_entitlements()
returns table(
  product     text,
  seat_number integer,
  tranche     text,
  price_usd   integer,
  purchased_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $BODY$
  with mine as (
    select order_type, probation_seat, ai_ready_seat, tranche, price_usd, created_at
      from public.founding_cohort_orders
     where user_id = auth.uid()
  )
  select 'probation_blueprint'::text as product,
         probation_seat as seat_number,
         tranche, price_usd, created_at
    from mine
   where order_type in ('probation_blueprint','bundle')
  union all
  select 'ai_ready_behaviours'::text,
         ai_ready_seat, tranche, price_usd, created_at
    from mine
   where order_type in ('ai_ready_behaviours','bundle')
   order by product;
$BODY$;

grant execute on function public.has_founding_access(text) to anon, authenticated;
grant execute on function public.my_founding_entitlements() to authenticated;
