import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../lib/auth.jsx'

// The Stripe redirect lands here with ?session_id=cs_...
// The webhook is what actually creates the order row. We poll the user's
// own orders (via RLS) until it shows up, up to ~30s.
export default function CheckoutSuccess() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const { user, loading: authLoading } = useAuth()
  const [order, setOrder] = useState(null)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (authLoading || !user || !sessionId) return
    let cancelled = false
    const deadline = Date.now() + 30000
    async function poll() {
      const { data } = await supabase
        .from('founding_cohort_orders')
        .select('order_type,tranche,price_usd,probation_seat,ai_ready_seat,created_at')
        .eq('stripe_session_id', sessionId)
        .limit(1)
        .maybeSingle()
      if (cancelled) return
      if (data) { setOrder(data); return }
      if (Date.now() > deadline) { setTimedOut(true); return }
      setTimeout(poll, 1500)
    }
    poll()
    return () => { cancelled = true }
  }, [user, authLoading, sessionId])

  const label = order?.order_type === 'bundle'
    ? 'Founding Cohort Bundle'
    : order?.order_type === 'probation_blueprint'
      ? 'Probation Blueprint™'
      : order?.order_type === 'ai_ready_behaviours'
        ? 'AI-Ready Behaviours™'
        : 'your Founding Cohort seat'

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Payment confirmed</p>
        <h1 className="policy-title">
          Welcome to the <em>Founding Cohort</em>.
        </h1>

        {!sessionId && (
          <p className="policy-meta">
            No session reference found. If your payment went through, head to your <Link to="/dashboard" style={{ color: 'var(--flame)' }}>dashboard</Link>.
          </p>
        )}

        {sessionId && !order && !timedOut && (
          <p className="policy-meta">
            Confirming your seat with Stripe… this usually takes a few seconds.
          </p>
        )}

        {order && (
          <>
            <p className="policy-meta">
              Thanks — your payment for <strong>{label}</strong> is confirmed. Your seat is reserved and your modules are unlocked.
            </p>
            <div className="policy-section" style={{
              padding: '20px 24px', borderRadius: '14px',
              background: 'var(--bg-2)', border: '1px solid var(--line)',
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 20px',
              fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--paper-soft)',
            }}>
              <span style={{ color: 'var(--paper-mute)' }}>Tranche</span>
              <span style={{ color: 'var(--paper)' }}>{order.tranche === 'T1' ? 'Founding Cohort · Tranche 1' : order.tranche === 'T2' ? 'Founding Cohort · Tranche 2' : 'Post-launch'}</span>
              <span style={{ color: 'var(--paper-mute)' }}>Paid</span>
              <span style={{ color: 'var(--paper)' }}>${order.price_usd} USD</span>
              {order.probation_seat && (<><span style={{ color: 'var(--paper-mute)' }}>Blueprint seat</span><span style={{ color: 'var(--paper)' }}>#{order.probation_seat}</span></>)}
              {order.ai_ready_seat && (<><span style={{ color: 'var(--paper-mute)' }}>AI-Ready seat</span><span style={{ color: 'var(--paper)' }}>#{order.ai_ready_seat}</span></>)}
            </div>
            <div className="policy-section">
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--paper-soft)', lineHeight: 1.65 }}>
                <strong style={{ color: 'var(--paper)' }}>Your founder-led onboarding session</strong> — included with every Founding Cohort seat — will be scheduled within 14 days of purchase. The founder's office will reach out to book a time.
              </p>
            </div>
            <div className="policy-section" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/dashboard" className="btn btn-primary">
                Open your dashboard <i className="ti ti-arrow-right"></i>
              </Link>
            </div>
          </>
        )}

        {timedOut && !order && (
          <>
            <p className="policy-meta" style={{ color: 'var(--flame)' }}>
              Your payment likely went through, but we're not seeing the confirmation yet.
            </p>
            <p className="policy-meta">
              This can happen if Stripe's webhook is slow. Refresh in a minute, or head to your <Link to="/dashboard" style={{ color: 'var(--flame)' }}>dashboard</Link> — the seat should appear there shortly. If it doesn't, <Link to="/contact" style={{ color: 'var(--flame)' }}>contact the founder's office</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
