import { useEffect, useState } from 'react'
import { Link, useParams, Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import { emit, trackCTA } from '../lib/analytics.js'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../lib/auth.jsx'
import FoundingPriceBlock from '../components/FoundingPriceBlock.jsx'
import { useFoundingSeats, FOUNDING } from '../lib/foundingCohort.js'

const SLUG_TO_PRODUCT = {
  'probation-blueprint': 'probation_blueprint',
  'ai-ready': 'ai_ready_behaviours',
  'bundle': 'bundle',
}

const PRODUCT_META = {
  probation_blueprint: {
    name: 'Probation Blueprint™',
    tagline: 'The first 90 days, rehearsed.',
    description:
      'Seven behavioural dimensions. Every rehearsal drops you inside a real workplace moment and follows your choices through same day, next week, and month end.',
    directoryHref: '/probation-blueprint',
  },
  ai_ready_behaviours: {
    name: 'AI-Ready Behaviours™',
    tagline: 'The judgment calls AI now creates.',
    description:
      'Five workplace AI pressure points. Practise verification, disclosure, escalation, and repair when AI-assisted work goes wrong — before your reputation rides on the answer.',
    directoryHref: '/ai-ready',
  },
  bundle: {
    name: 'Founding Cohort Bundle',
    tagline: 'Both products. One purchase. One seat in each cohort.',
    description:
      'Probation Blueprint + AI-Ready Behaviours together at the Founding Cohort bundle price. One-time purchase, 12-month access to both.',
    directoryHref: '/#products',
  },
}

// Where the create-checkout-session Edge Function lives. Default: same
// Supabase project as the frontend, standard functions path.
const CHECKOUT_ENDPOINT =
  import.meta.env.VITE_STRIPE_CHECKOUT_ENDPOINT ||
  `${import.meta.env.VITE_SUPABASE_URL || 'https://hwdqjrppeiyftwlsxpva.supabase.co'}/functions/v1/create-checkout-session`

export default function Checkout() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const product = SLUG_TO_PRODUCT[slug]
  if (!product) return <Navigate to="/" replace />

  const meta = PRODUCT_META[product]
  const { seats } = useFoundingSeats()
  const seatState = product === 'bundle' ? null : seats?.[product]
  const { user, loading: authLoading } = useAuth()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const canceled = params.get('canceled') === '1'

  const startCheckout = async () => {
    if (submitting) return
    setError(null)
    if (!user) {
      const next = encodeURIComponent(`/checkout/${slug}`)
      navigate(`/signin?next=${next}`)
      return
    }
    setSubmitting(true)
    try {
      const { data: sess } = await supabase.auth.getSession()
      const token = sess?.session?.access_token
      const r = await fetch(CHECKOUT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.url) {
        setError(j?.detail || j?.error || 'Could not start checkout. Please try again.')
        setSubmitting(false)
        return
      }
      emit('checkout_session_created', { product, tranche: j.tranche })
      window.location.href = j.url
    } catch (e) {
      setError(e?.message || 'Network error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Founding Cohort · Reserve</p>
        <h1 className="policy-title">
          {meta.name.replace('™', '')}<em> — reserve your seat</em>
        </h1>
        <p className="policy-meta">
          One-time purchase · 12-month access · Not a subscription. Payment is handled by Stripe — you'll be redirected to a secure checkout page. Canadian buyers see CAD equivalents on that page, converted at checkout.
        </p>

        {canceled && (
          <div className="policy-section">
            <div style={{
              padding: '14px 18px', borderRadius: '12px',
              background: 'var(--flame-faint)', border: '1px solid var(--flame)',
              color: 'var(--paper)', fontSize: 14,
            }}>
              Checkout canceled — no charge was made. You can start again when you're ready.
            </div>
          </div>
        )}

        <div className="policy-section">
          <h2>{meta.tagline}</h2>
          <p>{meta.description}</p>
          {product !== 'bundle' && <FoundingPriceBlock product={product} seat={seatState} />}
          {product === 'bundle' && (
            <div className="price-block">
              <p className="price-tier">Founding Cohort · Bundle</p>
              <div className="price-row">
                <span className="price">${FOUNDING.bundle.prices.T1}</span>
                <span className="price-original">${FOUNDING.bundle.postLaunch} USD</span>
              </div>
              <p className="price-sub">One-time purchase · 12-month access to both products.</p>
              <p className="price-counter">Bundle price steps to ${FOUNDING.bundle.prices.T2} once either product enters Tranche 2, and reverts to ${FOUNDING.bundle.postLaunch} once either cohort closes.</p>
            </div>
          )}
        </div>

        <div className="policy-section">
          {error && <p style={{ color: 'var(--flame)', fontSize: 14, marginBottom: 12 }}>{error}</p>}
          <button
            type="button"
            className="btn btn-primary"
            disabled={submitting || authLoading}
            onClick={() => { trackCTA(`checkout_${slug}`, 'start_stripe'); startCheckout() }}
          >
            {submitting ? 'Redirecting to Stripe…' : (user ? 'Continue to secure checkout' : 'Sign in to reserve')}
            {' '}<i className="ti ti-arrow-right"></i>
          </button>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--paper-mute)', marginTop: 10 }}>
            Your seat is reserved when your payment is confirmed. Every Founding Cohort seat includes a founder-led onboarding session within 14 days — the founder's office will reach out to schedule.
          </p>
        </div>

        <div className="policy-section" style={{ marginTop: '40px' }}>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--paper-mute)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
          >
            <i className="ti ti-arrow-left"></i> Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
