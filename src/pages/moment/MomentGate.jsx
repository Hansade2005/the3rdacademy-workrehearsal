import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase.js'
import { useAuth } from '../../lib/auth.jsx'
import { recordEvent, startPeriodEntitlement } from '../../lib/moment.js'

/**
 * One-screen account gate — email + password only.
 * On success: period entitlement is issued, then straight into module 1.
 */
export default function MomentGate() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signup')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { recordEvent('moment_gate_view', { screen: 'gate' }) }, [])

  if (loading) return null
  if (user) return <Navigate to="/moment/rehearse/1" replace />

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError(null)
    try {
      const call =
        mode === 'signup'
          ? supabase.auth.signUp({ email, password })
          : supabase.auth.signInWithPassword({ email, password })
      const { error: err } = await call
      if (err) throw err
      recordEvent('moment_gate_completed', { screen: 'gate', props: { mode } })
      // Period entitlement — safe to no-op if release not LIVE, we swallow.
      try { await startPeriodEntitlement() } catch { /* release not live yet */ }
      navigate('/moment/rehearse/1', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="moment-page">
      <section className="moment-hero">
        <div className="container" style={{ maxWidth: 460 }}>
          <h1 className="moment-title" style={{ fontSize: 28 }}>
            Create an account so your rehearsal is saved.
          </h1>
          <p className="moment-body">
            You can leave and come back, and this stays yours.
          </p>
          <form onSubmit={submit} style={{ marginTop: 24, display: 'grid', gap: 14 }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Password</span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </label>
            {error && <p role="alert" style={{ color: '#c1272d' }}>{error}</p>}
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? 'One moment…' : mode === 'signup' ? 'Start free →' : 'Continue →'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
            >
              {mode === 'signup' ? 'I already have an account' : 'Create an account instead'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
