import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../lib/auth.jsx'

// The password-reset email link brings the user here already signed in
// (Supabase sets a recovery session). We just capture a new password.
export default function ResetPassword() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // If someone lands here without a recovery session (e.g. shared link),
    // send them to sign-in so they can request another reset email.
    if (!loading && !user) navigate('/signin', { replace: true })
  }, [loading, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || submitting) return
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setSubmitting(true); setError(null)
    const { error: err } = await supabase.auth.updateUser({ password })
    setSubmitting(false)
    if (err) { setError(err.message || 'Could not update your password.'); return }
    setDone(true)
    setTimeout(() => navigate('/dashboard', { replace: true }), 1200)
  }

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Reset password</p>
        <h1 className="policy-title">Set a new <em>password</em>.</h1>
        <p className="policy-meta">
          Pick something you'll remember. At least 8 characters. This replaces any previous password on your account.
        </p>

        <div className="policy-section">
          {done ? (
            <div style={{
              padding: '20px 24px', background: 'var(--flame-faint)',
              border: '1px solid var(--flame)', borderLeft: '2px solid var(--flame)',
              borderRadius: '14px',
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '18px', color: 'var(--paper)', margin: 0 }}>
                Password updated. Taking you to your dashboard…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px' }}>
              {error && <p style={{ color: 'var(--flame)', fontSize: '14px', margin: 0 }}>{error}</p>}
              <label htmlFor="new-password" style={{
                fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--paper-mute)', fontWeight: 500,
              }}>New password</label>
              <input
                id="new-password" type="password" required minLength={8}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                style={{
                  padding: '14px 18px', background: 'var(--bg-2)',
                  border: '1px solid var(--line)', borderRadius: '100px',
                  color: 'var(--paper)', fontFamily: 'var(--font-sans)',
                  fontSize: '15px', outline: 'none',
                }}
              />
              <label htmlFor="confirm-password" style={{
                fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--paper-mute)', fontWeight: 500,
              }}>Confirm new password</label>
              <input
                id="confirm-password" type="password" required minLength={8}
                value={confirm} onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter the password"
                style={{
                  padding: '14px 18px', background: 'var(--bg-2)',
                  border: '1px solid var(--line)', borderRadius: '100px',
                  color: 'var(--paper)', fontFamily: 'var(--font-sans)',
                  fontSize: '15px', outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ marginTop: '4px' }}>
                {submitting ? 'Updating…' : 'Update password'} <i className="ti ti-arrow-right"></i>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
