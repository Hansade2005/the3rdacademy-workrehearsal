// Supabase Edge Function: create-checkout-session
// Deno runtime. Deploy with: supabase functions deploy create-checkout-session
//
// Required env vars (set on the Supabase project, not in the repo):
//   STRIPE_SECRET_KEY          (sk_live_… or sk_test_…)
//   SUPABASE_URL               (auto-provided by Supabase)
//   SUPABASE_ANON_KEY          (auto-provided by Supabase)
//   PUBLIC_APP_URL             (e.g. https://www.workrehearsal.com)
//
// Contract:
//   POST { product: 'probation_blueprint' | 'ai_ready_behaviours' | 'bundle' }
//   Authorization: Bearer <user JWT>
//   -> 200 { url, session_id, product, tranche, price_usd }
//
// The tranche is looked up server-side from founding_cohort_seats so the
// buyer cannot tamper with the price. Seat reservation happens only in the
// webhook (verify at payment capture).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Founding Cohort Stripe price IDs (LIVE).
const PRICE_IDS: Record<string, { T1: string; T2: string; POST: string }> = {
  probation_blueprint: {
    T1:   'price_1U12yx3Tf9QaIPnVdw6CXIDz',
    T2:   'price_1U12yx3Tf9QaIPnV7ByHdnRS',
    POST: 'price_1U12yx3Tf9QaIPnViV42dh9l',
  },
  ai_ready_behaviours: {
    T1:   'price_1U12yy3Tf9QaIPnVixpfdmgS',
    T2:   'price_1U12yy3Tf9QaIPnVU60iDZGY',
    POST: 'price_1U12yz3Tf9QaIPnVPAsjGCmK',
  },
  bundle: {
    T1:   'price_1U12yz3Tf9QaIPnVdfZabixz',
    T2:   'price_1U12z03Tf9QaIPnVOL7I8s7v',
    POST: 'price_1U12z03Tf9QaIPnV5GrM62cm',
  },
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })
}

async function stripe(method: string, path: string, body?: Record<string, string>) {
  const key = Deno.env.get('STRIPE_SECRET_KEY')!
  const init: RequestInit = { method, headers: { Authorization: `Bearer ${key}` } }
  if (body) {
    ;(init.headers as Record<string, string>)['Content-Type'] = 'application/x-www-form-urlencoded'
    init.body = new URLSearchParams(body).toString()
  }
  const r = await fetch(`https://api.stripe.com/v1${path}`, init)
  const j = await r.json()
  if (!r.ok) throw new Error(`Stripe ${method} ${path} ${r.status}: ${JSON.stringify(j)}`)
  return j
}

// Match the SQL logic in reserve_founding_seat.
function trancheFor(seatsTaken: number, t1: number, cap: number): 'T1' | 'T2' | 'POST' {
  if (seatsTaken >= cap) return 'POST'
  if (seatsTaken >= t1) return 'T2'
  return 'T1'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' })

  try {
    const auth = req.headers.get('Authorization') || ''
    if (!auth.startsWith('Bearer ')) return json(401, { error: 'missing_auth' })

    // The caller's Supabase session — used to identify the buyer.
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: auth } } },
    )
    const { data: userData, error: userErr } = await supabase.auth.getUser()
    if (userErr || !userData.user) return json(401, { error: 'invalid_session' })
    const user = userData.user

    const { product } = await req.json().catch(() => ({}))
    if (!product || !PRICE_IDS[product]) return json(400, { error: 'invalid_product' })

    // Read live seat state to pick the tranche server-side.
    const { data: seats, error: seatsErr } = await supabase
      .from('founding_cohort_seats')
      .select('product,seats_taken,cohort_size,tranche1_size')
    if (seatsErr) return json(500, { error: 'seats_read_failed', detail: seatsErr.message })

    let tranche: 'T1' | 'T2' | 'POST'
    if (product === 'bundle') {
      const pb = seats.find((r) => r.product === 'probation_blueprint')!
      const ai = seats.find((r) => r.product === 'ai_ready_behaviours')!
      if (pb.seats_taken >= pb.cohort_size || ai.seats_taken >= ai.cohort_size) tranche = 'POST'
      else if (pb.seats_taken >= pb.tranche1_size || ai.seats_taken >= ai.tranche1_size) tranche = 'T2'
      else tranche = 'T1'
    } else {
      const row = seats.find((r) => r.product === product)!
      tranche = trancheFor(row.seats_taken, row.tranche1_size, row.cohort_size)
    }

    const priceId = PRICE_IDS[product][tranche]
    const appUrl = (Deno.env.get('PUBLIC_APP_URL') || 'https://www.workrehearsal.com').replace(/\/$/, '')

    const params: Record<string, string> = {
      mode: 'payment',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      customer_email: user.email || '',
      client_reference_id: user.id,
      'metadata[product]': product,
      'metadata[tranche]': tranche,
      'metadata[user_id]': user.id,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/${product === 'ai_ready_behaviours' ? 'ai-ready' : product === 'probation_blueprint' ? 'probation-blueprint' : 'bundle'}?canceled=1`,
      allow_promotion_codes: 'true',
      'payment_intent_data[metadata][product]': product,
      'payment_intent_data[metadata][user_id]': user.id,
    }

    const session = await stripe('POST', '/checkout/sessions', params)
    return json(200, { url: session.url, session_id: session.id, product, tranche })
  } catch (e) {
    return json(500, { error: 'server_error', detail: String((e as Error).message || e) })
  }
})
