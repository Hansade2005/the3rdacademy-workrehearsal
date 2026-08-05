-- Stripe checkout integration: idempotent, webhook-safe seat reservation.
-- Each Stripe Checkout Session id maps to at most one Founding Cohort order.

alter table public.founding_cohort_orders
  add column if not exists stripe_session_id text;

create unique index if not exists founding_cohort_orders_stripe_session_uidx
  on public.founding_cohort_orders(stripe_session_id)
  where stripe_session_id is not null;

-- Service-role callable: webhook passes the buyer's user_id explicitly.
-- Returns the existing order row if session_id already processed (idempotent).
create or replace function public.reserve_founding_seat_by_session(
  p_product        text,
  p_user_id        uuid,
  p_session_id     text,
  p_buyer_email    text default null
)
returns table(seat_number integer, tranche text, price_usd integer, idempotent boolean)
language plpgsql
security definer
set search_path = public
as $BODY$
declare
  v_existing public.founding_cohort_orders;
  v_seats  integer;
  v_cap    integer;
  v_t1     integer;
  v_price  integer;
  v_tr     text;
begin
  if p_product not in ('probation_blueprint','ai_ready_behaviours') then
    raise exception 'invalid product %', p_product;
  end if;
  if p_session_id is null or length(p_session_id) = 0 then
    raise exception 'p_session_id required';
  end if;

  select * into v_existing
    from public.founding_cohort_orders
   where stripe_session_id = p_session_id
   limit 1;

  if found then
    return query select
      case p_product
        when 'probation_blueprint' then v_existing.probation_seat
        else v_existing.ai_ready_seat
      end,
      v_existing.tranche, v_existing.price_usd, true;
    return;
  end if;

  select seats_taken, cohort_size, tranche1_size
    into v_seats, v_cap, v_t1
    from public.founding_cohort_seats
   where product = p_product
   for update;

  if v_seats >= v_cap then
    v_tr := 'POST';
    v_price := case p_product when 'probation_blueprint' then 249 else 179 end;
    insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id, stripe_session_id)
      values (p_product, v_tr, v_price, p_buyer_email, p_user_id, p_session_id);
    return query select null::integer, v_tr, v_price, false;
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

  insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id, stripe_session_id,
    probation_seat, ai_ready_seat)
    values (p_product, v_tr, v_price, p_buyer_email, p_user_id, p_session_id,
      case when p_product='probation_blueprint' then v_seats + 1 end,
      case when p_product='ai_ready_behaviours' then v_seats + 1 end);

  return query select (v_seats + 1)::integer, v_tr, v_price, false;
end;
$BODY$;

create or replace function public.reserve_founding_bundle_by_session(
  p_user_id     uuid,
  p_session_id  text,
  p_buyer_email text default null
)
returns table(probation_seat integer, ai_ready_seat integer, tranche text, price_usd integer, idempotent boolean)
language plpgsql
security definer
set search_path = public
as $BODY$
declare
  v_existing public.founding_cohort_orders;
  v_pb_seats integer;
  v_ai_seats integer;
  v_cap  integer := 100;
  v_t1   integer := 50;
  v_tr   text;
  v_price integer;
begin
  if p_session_id is null or length(p_session_id) = 0 then
    raise exception 'p_session_id required';
  end if;

  select * into v_existing
    from public.founding_cohort_orders
   where stripe_session_id = p_session_id
   limit 1;

  if found then
    return query select v_existing.probation_seat, v_existing.ai_ready_seat,
      v_existing.tranche, v_existing.price_usd, true;
    return;
  end if;

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
    insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id, stripe_session_id)
      values ('bundle', v_tr, v_price, p_buyer_email, p_user_id, p_session_id);
    return query select null::integer, null::integer, v_tr, v_price, false;
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

  insert into public.founding_cohort_orders(order_type, tranche, price_usd, buyer_email, user_id, stripe_session_id,
    probation_seat, ai_ready_seat)
    values ('bundle', v_tr, v_price, p_buyer_email, p_user_id, p_session_id,
      v_pb_seats + 1, v_ai_seats + 1);

  return query select (v_pb_seats + 1)::integer, (v_ai_seats + 1)::integer, v_tr, v_price, false;
end;
$BODY$;

-- These are for the webhook (service_role). NOT exposed to anon/authenticated.
revoke all on function public.reserve_founding_seat_by_session(text, uuid, text, text) from public;
revoke all on function public.reserve_founding_bundle_by_session(uuid, text, text) from public;
grant execute on function public.reserve_founding_seat_by_session(text, uuid, text, text) to service_role;
grant execute on function public.reserve_founding_bundle_by_session(uuid, text, text) to service_role;

-- Lookup by session id for /checkout/success polling. Own-row only.
drop policy if exists orders_own_read on public.founding_cohort_orders;
create policy orders_own_read on public.founding_cohort_orders
  for select to authenticated
  using (user_id = auth.uid());
