import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { emit } from '../lib/analytics.js'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../lib/auth.jsx'

const inputStyle = {
  padding: '14px 18px',
  background: 'var(--bg-2)',
  border: '1px solid var(--line)',
  borderRadius: '100px',
  color: 'var(--paper)',
  fontFamily: 'var(--font-sans)',
  fontSize: '15px',
  outline: 'none',
  width: '100%',
}

const labelStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--paper-mute)',
  fontWeight: 500,
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '10px 18px',
        borderRadius: '100px',
        border: '1px solid ' + (active ? 'var(--flame)' : 'var(--line)'),
        background: active ? 'var(--flame-faint)' : 'transparent',
        color: active ? 'var(--flame)' : 'var(--paper-soft)',
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export default function SignIn() {
  const [params] = useSearchParams()
  const nextPath = params.get('next') || '/dashboard'
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  const [mode, setMode] = useState('password') // 'password' | 'magic'
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [magicSent, setMagicSent] = useState(false)
  const [signupSent, setSignupSent] = useState(false)

  useEffect(() => {
    if (!loading && user) navigate(nextPath, { replace: true })
  }, [user, loading, nextPath, navigate])

  const cleanEmail = email.trim().toLowerCase()
  const redirect = `${window.location.origin}${nextPath.startsWith('/') ? nextPath : '/'}`

  const handleMagic = async (e) => {
    e.preventDefault()
    if (!cleanEmail || submitting) return
    setSubmitting(true); setError(null)
    const { error: err } = await supabase.auth.signInWithOtp({
      email: cleanEmail, options: { emailRedirectTo: redirect },
    })
    setSubmitting(false)
    if (err) { setError('Something went wrong. Please try again.'); return }
    setMagicSent(true)
    emit('signin_link_requested', { email: cleanEmail })
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    if (!cleanEmail || !password || submitting) return
    setSubmitting(true); setError(null)

    if (isSignup) {
      const { data, error: err } = await supabase.auth.signUp({
        email: cleanEmail, password,
        options: { emailRedirectTo: redirect },
      })
      setSubmitting(false)
      if (err) { setError(err.message || 'Could not create your account.'); return }
      emit('signup_password', { email: cleanEmail })
      // If email confirmation is off, session is present -> nav to nextPath.
      if (data?.session) { navigate(nextPath, { replace: true }); return }
      // Otherwise the user has to confirm via email.
      setSignupSent(true)
      return
    }

    const { error: err } = await supabase.auth.signInWithPassword({
      email: cleanEmail, password,
    })
    setSubmitting(false)
    if (err) {
      setError(err.message === 'Invalid login credentials'
        ? 'That email and password combination did not match.'
        : (err.message || 'Sign in failed. Please try again.'))
      return
    }
    emit('signin_password', { email: cleanEmail })
    navigate(nextPath, { replace: true })
  }

  const handleForgot = async () => {
    if (!cleanEmail) { setError('Enter your email above, then click Forgot password.'); return }
    setSubmitting(true); setError(null)
    const { error: err } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setSubmitting(false)
    if (err) { setError('Could not send reset email. Please try again.'); return }
    setMagicSent(true) // reuse the "check your inbox" panel
    emit('signin_reset_requested', { email: cleanEmail })
  }

  const showConfirmation = magicSent || signupSent

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">{isSignup && mode === 'password' ? 'Create account' : 'Sign in'}</p>
        <h1 className="policy-title">
          {isSignup && mode === 'password' ? <>Set up your <em>account</em>.</> : <>Welcome <em>back</em>.</>}
        </h1>
        <p className="policy-meta">
          {mode === 'password'
            ? (isSignup
                ? 'Create an account with your email and a password. After you confirm your email, your Founding Cohort seat and any modules you own are unlocked instantly.'
                : 'Sign in with the email and password on your account. Your seats and modules unlock the moment you\'re in.')
            : 'Prefer no password? We\'ll email you a one-time sign-in link that expires in 15 minutes.'}
        </p>

        <div className="policy-section" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <TabButton active={mode === 'password'} onClick={() => { setMode('password'); setError(null); setMagicSent(false); setSignupSent(false) }}>
            Email &amp; password
          </TabButton>
          <TabButton active={mode === 'magic'} onClick={() => { setMode('magic'); setError(null); setMagicSent(false); setSignupSent(false); setIsSignup(false) }}>
            Magic link
          </TabButton>
        </div>

        <div className="policy-section">
          {showConfirmation ? (
            <div style={{
              padding: '24px 28px',
              background: 'var(--flame-faint)',
              border: '1px solid var(--flame)',
              borderLeft: '2px solid var(--flame)',
              borderRadius: '14px',
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '20px', color: 'var(--paper)', lineHeight: 1.45, marginBottom: '8px' }}>
                Check your inbox.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--paper-soft)', margin: '0 0 12px' }}>
                {signupSent
                  ? <>We sent a confirmation link to <strong style={{ color: 'var(--paper)' }}>{cleanEmail}</strong>. Click it to finish creating your account.</>
                  : <>If <strong style={{ color: 'var(--paper)' }}>{cleanEmail}</strong> has an active WorkRehearsal account, we just sent an email to it.</>}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12.5px', color: 'var(--paper-mute)', margin: 0 }}>
                Don't see it? Check your spam folder. Links expire in 15 minutes.
              </p>
            </div>
          ) : mode === 'password' ? (
            <form onSubmit={handlePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px' }}>
              {error && <p style={{ color: 'var(--flame)', fontSize: '14px', margin: 0 }}>{error}</p>}
              <label htmlFor="signin-email" style={labelStyle}>Email address</label>
              <input id="signin-email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@work.com" style={inputStyle} />
              <label htmlFor="signin-password" style={labelStyle}>Password</label>
              <input id="signin-password" type="password" required minLength={8}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignup ? 'At least 8 characters' : 'Your password'} style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting
                    ? (isSignup ? 'Creating…' : 'Signing in…')
                    : (isSignup ? 'Create account' : 'Sign in')}
                  {' '}<i className="ti ti-arrow-right"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { setIsSignup(v => !v); setError(null) }}
                >
                  {isSignup ? 'I already have an account' : 'Create a new account'}
                </button>
              </div>
              {!isSignup && (
                <button
                  type="button"
                  onClick={handleForgot}
                  disabled={submitting}
                  style={{
                    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                    color: 'var(--flame)', font: 'inherit', fontSize: '13px',
                    fontWeight: 600, textAlign: 'left', width: 'fit-content',
                  }}
                >
                  Forgot password?
                </button>
              )}
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--paper-mute)', margin: '4px 0 0' }}>
                {isSignup
                  ? 'By creating an account you agree to our Terms and Privacy Policy.'
                  : 'Prefer no password? Use the Magic link tab above.'}
              </p>
            </form>
          ) : (
            <form onSubmit={handleMagic} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px' }}>
              {error && <p style={{ color: 'var(--flame)', fontSize: '14px', margin: 0 }}>{error}</p>}
              <label htmlFor="signin-magic-email" style={labelStyle}>Email address</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input id="signin-magic-email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="you@work.com"
                  style={{ ...inputStyle, flex: '1 1 240px', width: 'auto' }} />
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send link'} <i className="ti ti-arrow-right"></i>
                </button>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--paper-mute)', margin: '4px 0 0' }}>
                No password needed. The link in your inbox expires in 15 minutes.
              </p>
            </form>
          )}
        </div>

        <div className="policy-section" style={{ marginTop: '40px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--paper-soft)', marginBottom: '20px' }}>
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
