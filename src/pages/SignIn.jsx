import { useState } from 'react'
import { Link } from 'react-router-dom'
import { emit } from '../lib/analytics.js'
import { supabase } from '../lib/supabase.js'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || submitting) return
    setSubmitting(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (authError) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setSubmitted(true)
    setSubmitting(false)
    emit('signin_link_requested', { email })
  }

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Sign in</p>
        <h1 className="policy-title">
          Welcome <em>back</em>.
        </h1>
        <p className="policy-meta">
          WorkRehearsal uses email links — no passwords. After your purchase, the access link comes to the email you bought with. Enter it below and we'll send you a fresh link.
        </p>

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
                Check your inbox.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: 'var(--paper-soft)',
                  margin: '0 0 12px',
                }}
              >
                If <strong style={{ color: 'var(--paper)' }}>{email}</strong> has an active WorkRehearsal account, we just sent a sign-in link to it. It expires in 15 minutes.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12.5px',
                  color: 'var(--paper-mute)',
                  margin: 0,
                }}
              >
                Don't see it? Check your spam folder. The link expires in 15 minutes.
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
                htmlFor="signin-email"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-mute)',
                  fontWeight: 500,
                }}
              >
                Email address
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  id="signin-email"
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
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send link'} <i className="ti ti-arrow-right"></i>
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
                No passwords. The link in your inbox is your sign-in.
              </p>
            </form>
          )}
        </div>

        <div className="policy-section" style={{ marginTop: '40px' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--paper-soft)',
              marginBottom: '20px',
            }}
          >
            Haven't bought a rehearsal yet?
          </p>
          <Link to="/#products" className="btn btn-secondary">
            See the rehearsals <i className="ti ti-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}
