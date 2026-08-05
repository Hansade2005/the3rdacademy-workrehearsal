// Supabase Edge Function: stripe-webhook
// Deno runtime. Deploy with: supabase functions deploy stripe-webhook --no-verify-jwt
// (--no-verify-jwt is required — Stripe does not send a Supabase JWT.)
//
// Required env vars:
//   STRIPE_SECRET_KEY          (sk_live_… or sk_test_…)
//   STRIPE_WEBHOOK_SECRET      (whsec_…, from the Stripe webhook endpoint page)
//   SUPABASE_URL               (auto-provided by Supabase)
//   SUPABASE_SERVICE_ROLE_KEY  (set manually; needed to call the by_session RPCs)
//
// On checkout.session.completed the function calls the appropriate
// reserve_founding_*_by_session RPC. Both RPCs are idempotent on session_id,
// so Stripe retries never double-book a seat.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Timing-safe hex compare.
function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function verifyStripeSignature(rawBody: string, header: string, secret: string, toleranceSec = 300): Promise<boolean> {
  // header like: t=1699999999,v1=abcdef...,v1=... (Stripe supports multiple v1s during rotation)
  const parts = Object.create(null) as Record<string, string[]>
  for (const part of header.split(',')) {
    const [k, v] = part.split('=')
    if (!k || !v) continue
    ;(parts[k] ||= []).push(v)
  }
  const timestamp = parts.t?.[0]
  const signatures = parts.v1 || []
  if (!timestamp || signatures.length === 0) return false
  const ageSec = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp))
  if (!Number.isFinite(ageSec) || ageSec > toleranceSec) return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${rawBody}`))
  const expected = toHex(new Uint8Array(sig))
  return signatures.some((s) => safeEqualHex(s, expected))
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 })

  const sig = req.headers.get('stripe-signature') || ''
  const raw = await req.text()
  const secret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
  if (!secret) return new Response('missing webhook secret', { status: 500 })

  const ok = await verifyStripeSignature(raw, sig, secret)
  if (!ok) return new Response('bad signature', { status: 400 })

  const evt = JSON.parse(raw)

  // We only act on payment completion. Everything else is acknowledged 200 so
  // Stripe stops retrying.
  if (evt.type !== 'checkout.session.completed') {
    return new Response('ignored', { status: 200 })
  }

  const session = evt.data.object
  const product = session?.metadata?.product as string | undefined
  const userId  = session?.metadata?.user_id || session?.client_reference_id
  const email   = session?.customer_email || session?.customer_details?.email || null
  const sessionId = session?.id as string

  if (!product || !userId || !sessionId) {
    console.error('checkout.session.completed missing metadata', { product, userId, sessionId })
    return new Response('missing metadata', { status: 200 })
  }
  if (session?.payment_status !== 'paid') {
    // e.g. async payment_pending; wait for payment_intent.succeeded event downstream
    return new Response('unpaid, waiting', { status: 200 })
  }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  try {
    if (product === 'bundle') {
      const { data, error } = await admin.rpc('reserve_founding_bundle_by_session', {
        p_user_id: userId,
        p_session_id: sessionId,
        p_buyer_email: email,
      })
      if (error) throw error
      console.log('bundle reserved', data)
    } else {
      const { data, error } = await admin.rpc('reserve_founding_seat_by_session', {
        p_product: product,
        p_user_id: userId,
        p_session_id: sessionId,
        p_buyer_email: email,
      })
      if (error) throw error
      console.log('seat reserved', data)
    }
    return new Response('ok', { status: 200 })
  } catch (e) {
    console.error('reserve failed', e)
    // Return 500 so Stripe retries; the RPC is idempotent on session_id.
    return new Response('reserve failed', { status: 500 })
  }
})
