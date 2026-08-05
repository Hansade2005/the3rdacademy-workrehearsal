import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { emit, trackCTA } from '../lib/analytics.js'
import { supabase } from '../lib/supabase.js'
import FoundingPriceBlock from '../components/FoundingPriceBlock.jsx'
import { useFoundingSeats, reserveFoundingSeat, FOUNDING } from '../lib/foundingCohort.js'

// URL slug → founding product key
const SLUG_TO_PRODUCT = {
  'probation-blueprint': 'probation_blueprint',
  'ai-ready': 'ai_ready_behaviours',
}

const PRODUCT_META = {
  probation_blueprint: {
    name: 'Probation Blueprint™',
    tagline: 'The first 90 days, rehearsed.',
    description:
      'Seven behavioural dimensions. Every rehearsal drops you inside a real workplace moment and follows your choices through same day, next week, and month end.',
    modulesLine: 'Full access to all 7 modules for 12 months',
    directoryHref: '/probation-blueprint',
  },
  ai_ready_behaviours: {
    name: 'AI-Ready Behaviours™',
    tagline: 'The judgment calls AI now creates.',
    description:
      'Five workplace AI pressure points. Practise verification, disclosure, escalation, and repair when AI-assisted work goes wrong — before your reputation rides on the answer.',
    modulesLine: 'Full access to all 5 modules for 12 months',
    directoryHref: '/ai-ready',
  },
}

export default function Checkout() {
  const { slug } = useParams()
  const product = SLUG_TO_PRODUCT[slug]
  if (!product) return <Navigate to="/" replace />

  const meta = PRODUCT_META[product]
  const { seats } = useFoundingSeats()
  const seatState = seats?.[product]

  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [reserved, setReserved] = useState(null) // { seat_number, tranche, price_usd }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    const cleanEmail = email.trim().toLowerCase()

    try {
      const row = await reserveFoundingSeat(product, cleanEmail)
      // Fire OTP so the buyer can access their seat.
      await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          data: { founding_product: product, seat_number: row?.seat_number ?? null },
          emailRedirectTo: `${window.location.origin}${meta.directoryHref}`,
        },
      })
      setReserved(row)
      emit('founding_seat_reserved', {
        product,
        tranche: row?.tranche,
        seat_number: row?.seat_number,
        price_usd: row?.price_usd,
      })
    } catch (err) {
      setError(err?.message || 'Something went wrong reserving your seat. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const cohortClosed = reserved?.tranche === 'POST'

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Founding Cohort · First 100 Seats</p>
        <h1 className="policy-title">
          {meta.name.replace('™', '')}<em> — reserve your seat</em>
        </h1>
        <p className="policy-meta">
          One-time purchase · 12-month access · Not a subscription. The Founding Cohort closes at 100 seats — the first 50 at ${FOUNDING[product].prices.T1}, the next 50 at ${FOUNDING[product].prices.T2}, after which new buyers pay ${FOUNDING[product].postLaunch}.
        </p>

        <div className="policy-section">
          <h2>{meta.tagline}</h2>
          <p>{meta.description}</p>
          <FoundingPriceBlock product={product} seat={seatState} />
        </div>

        <div className="policy-section">
          {reserved ? (
            <div
              style={{
                padding: '24px 28px',
                background: 'var(--flame-faint)',
                border: '1px solid var(--flame)',
                borderLeft: '2px solid var(--flame)',
                borderRadius: '14px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '20px',
                  color: 'var(--paper)',
                  lineHeight: 1.45,
                  marginBottom: '8px',
                }}
              >
                {cohortClosed
                  ? 'The Founding Cohort has closed.'
                  : `Seat ${reserved.seat_number} reserved · ${reserved.tranche === 'T1' ? 'Tranche 1' : 'Tranche 2'} · $${reserved.price_usd} USD`}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--paper-soft)', marginBottom: '12px' }}>
                {cohortClosed
                  ? `New buyers now pay $${reserved.price_usd} USD (post-launch price). We've sent your access link to `
                  : 'Check your inbox at '}
                <strong style={{ color: 'var(--paper)' }}>{email}</strong> — confirm the sign-in link to enter the rehearsals.
              </p>
              {!cohortClosed && (
                <>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--paper-soft)', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--paper)' }}>Your Founding Cohort seat includes:</strong>
                  </p>
                  <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--paper-soft)', fontSize: '14.5px', lineHeight: 1.75 }}>
                    <li>A founder-led onboarding session within 14 days of purchase — the founder's office will reach out to schedule.</li>
                    <li>{meta.modulesLine}.</li>
                    <li>A place in the first cohort — your feedback shapes the product.</li>
                  </ul>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px' }}>
              {error && <p style={{ color: 'var(--flame)', fontSize: '14px', margin: 0 }}>{error}</p>}
              <label
                htmlFor="founding-email"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-mute)',
                  fontWeight: 500,
                }}
              >
                Reserve at Founding Cohort pricing
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  id="founding-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@work.com"
                  style={{
                    flex: '1 1 240px',
                    minWidth: 0,
                    padding: '14px 18px',
                    background: 'var(--bg-2)',
                    border: '1px solid var(--line)',
                    borderRadius: '100px',
                    color: 'var(--paper)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  onClick={() => trackCTA(`checkout_${slug}`, 'reserve_seat')}
                >
                  {submitting ? 'Reserving…' : 'Reserve my seat'} <i className="ti ti-arrow-right"></i>
                </button>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--paper-mute)', margin: '4px 0 0' }}>
                Canadian buyers see CAD equivalents at checkout, converted at checkout.
              </p>
            </form>
          )}
        </div>

        <div className="policy-section" style={{ marginTop: '40px' }}>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--paper-mute)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <i className="ti ti-arrow-left"></i> Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
