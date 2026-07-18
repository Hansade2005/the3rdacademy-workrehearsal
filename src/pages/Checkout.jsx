import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { emit, trackCTA } from '../lib/analytics.js'
import { supabase } from '../lib/supabase.js'

// Product registry — single source of truth for slug → product details
const PRODUCTS = {
  'probation-blueprint': {
    name: 'Probation Blueprint™',
    tagline: 'The first 90 days, rehearsed.',
    price: '$29',
    priceOriginal: '$49',
    tier: 'Launch Access',
    description:
      'Rehearse the first 90 days of any new role before they happen. You\'ll face missed commitments, unclear expectations, early mistakes, manager follow-ups, and trust-building moments — and see how your choices land over time.',
  },
  'ai-ready': {
    name: 'AI-Ready Behaviours™',
    tagline: 'The judgment calls AI now creates.',
    price: '$39',
    priceOriginal: '$59',
    tier: 'Launch Bundle',
    description:
      'Rehearse the judgment calls AI now creates at work. Practise verification, disclosure, escalation, and ownership when AI-assisted work goes wrong — before your reputation rides on the answer.',
  },
}

export default function Checkout() {
  const { slug } = useParams()
  const product = PRODUCTS[slug]

  // Unknown product slug → bounce to home
  if (!product) return <Navigate to="/" replace />

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    const cleanEmail = email.trim().toLowerCase()

    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({ email: cleanEmail, product: slug, source: 'checkout' })

    if (dbError && dbError.code !== '23505') {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        data: { waitlist_product: slug },
        emailRedirectTo: `${window.location.origin}/checkout/${slug}`,
      },
    })

    setSubmitted(true)
    setSubmitting(false)
    emit('checkout_waitlist_signup', { product: slug, email: cleanEmail })
  }

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">{product.tier}</p>
        <h1 className="policy-title">
          {product.name.replace('™', '')}<em> — reserve launch pricing</em>
        </h1>
        <p className="policy-meta">
          The rehearsals are live now — you can enter them directly from the{' '}
          <a
            href={slug === 'ai-ready' ? '/ai-ready' : '/probation-blueprint'}
            style={{ color: 'var(--flame)', fontWeight: 600 }}
          >
            {slug === 'ai-ready' ? 'AI-Ready directory' : 'Probation Blueprint directory'}
          </a>
          . Paid access via Stripe Checkout is being wired in the next engineering pass. Drop your email below to lock in launch pricing and we'll send you the checkout link the moment it goes live.
        </p>

        <div className="policy-section">
          <h2>{product.tagline}</h2>
          <p>{product.description}</p>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              flexWrap: 'wrap',
              padding: '24px 0',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              margin: '24px 0',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: '56px',
                color: 'var(--paper)',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
              }}
            >
              {product.price}
            </span>
            {product.priceOriginal && (
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '17px',
                  color: 'var(--paper-mute)',
                  textDecoration: 'line-through',
                }}
              >
                Regular {product.priceOriginal}
              </span>
            )}
          </div>
        </div>

        {/* Waitlist form OR confirmation */}
        <div className="policy-section">
          {submitted ? (
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
                You're on the list.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: 'var(--paper-soft)',
                  margin: 0,
                }}
              >
                Check your inbox at <strong style={{ color: 'var(--paper)' }}>{email}</strong> — we've sent a confirmation. We'll email you the moment {product.name} goes live. No spam.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px' }}
            >
              {error && (
                <p style={{ color: 'var(--flame)', fontSize: '14px', margin: 0 }}>{error}</p>
              )}
              <label
                htmlFor="waitlist-email"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-mute)',
                  fontWeight: 500,
                }}
              >
                Notify me at launch
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  id="waitlist-email"
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
                  onClick={() => trackCTA(`checkout_${slug}`, 'waitlist_submit')}
                >
                  {submitting ? 'Adding...' : 'Add me'} <i className="ti ti-arrow-right"></i>
                </button>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: 'var(--paper-mute)',
                  margin: '4px 0 0',
                }}
              >
                One email. The checkout link. Nothing else.
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
