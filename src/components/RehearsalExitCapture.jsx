import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

/**
 * Watches the current route. When the user is INSIDE a rehearsal
 * (`/rehearse/<slug>` or `/moment/rehearse/<n>/module`) and then navigates
 * elsewhere in the app without having reached the module's completion
 * screen, we intercept the next paint and show a one-question exit survey.
 *
 * A `beforeunload` beacon covers the tab-close case with an anonymous row
 * (no reason_text, elapsed_ms only). Prompts are optional and dismissible;
 * telemetry is aggregate-only.
 */

const REHEARSAL_ROUTE = /^\/rehearse\/([a-z0-9-]+)$/i
const MOMENT_MODULE_ROUTE = /^\/moment\/rehearse\/(\d+)\/module$/

const MOMENT_SLUG_BY_N = {
  '1': 'saying-the-hard-thing',
  '2': 'when-the-ai-looks-right',
}

function matchRehearsal(pathname) {
  const m = REHEARSAL_ROUTE.exec(pathname)
  if (m) return { slug: m[1].toLowerCase(), kind: 'dimension' }
  const mm = MOMENT_MODULE_ROUTE.exec(pathname)
  if (mm) return { slug: MOMENT_SLUG_BY_N[mm[1]] || `moment-${mm[1]}`, kind: 'moment' }
  return null
}

function sessionId() {
  try {
    let id = sessionStorage.getItem('rehearsal_exit_session')
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('rehearsal_exit_session', id) }
    return id
  } catch { return null }
}

async function recordExit({ module: mod, screen = null, kind, reason = null, elapsed = null, props = {} }) {
  try {
    await supabase.rpc('rehearsal_record_exit', {
      p_module: mod,
      p_screen: screen,
      p_kind: kind,
      p_reason: reason,
      p_elapsed: elapsed,
      p_session: sessionId(),
      p_props: props,
    })
  } catch { /* fire-and-forget */ }
}

export default function RehearsalExitCapture() {
  const location = useLocation()
  const prevRef = useRef(null)        // { slug, kind, enteredAt }
  const completedRef = useRef(false)  // set when module dispatches bridgefast:complete
  const [prompt, setPrompt] = useState(null) // { slug, elapsed }

  // Listen for the completion signal — if fired, don't show the exit prompt.
  useEffect(() => {
    const onDone = () => { completedRef.current = true }
    window.addEventListener('bridgefast:complete', onDone)
    return () => window.removeEventListener('bridgefast:complete', onDone)
  }, [])

  // Route-change detection.
  useEffect(() => {
    const now = matchRehearsal(location.pathname)
    const prev = prevRef.current

    if (prev && (!now || now.slug !== prev.slug)) {
      // Leaving a rehearsal by in-app navigation.
      const elapsed = Date.now() - prev.enteredAt
      const wasCompleted = completedRef.current
      // Fire the aggregate telemetry regardless.
      recordExit({
        module: prev.slug,
        kind: wasCompleted ? 'explicit_leave' : 'in_app_navigation',
        elapsed,
        props: { completed: wasCompleted, to: location.pathname },
      })
      // Only surface the survey when they left BEFORE finishing.
      if (!wasCompleted) setPrompt({ slug: prev.slug, elapsed })
      completedRef.current = false
    }

    if (now && (!prev || prev.slug !== now.slug)) {
      prevRef.current = { ...now, enteredAt: Date.now() }
      completedRef.current = false
    } else if (!now) {
      prevRef.current = null
    }
  }, [location.pathname])

  // Tab-close beacon.
  useEffect(() => {
    const onBeforeUnload = () => {
      const cur = prevRef.current
      if (!cur || completedRef.current) return
      try {
        const url =
          (import.meta.env.VITE_SUPABASE_URL || 'https://hwdqjrppeiyftwlsxpva.supabase.co') +
          '/rest/v1/rpc/rehearsal_record_exit'
        const body = JSON.stringify({
          p_module: cur.slug, p_screen: null, p_kind: 'tab_close',
          p_reason: null, p_elapsed: Date.now() - cur.enteredAt,
          p_session: sessionId(), p_props: {},
        })
        const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
          'sb_publishable_9Mfa4wwQoEqESWartQ7-oA_7RjeDkSE'
        const blob = new Blob([body], { type: 'application/json' })
        // sendBeacon can't attach headers, so fall back to fetch(keepalive: true).
        if (!navigator.sendBeacon || !navigator.sendBeacon(url, blob)) {
          fetch(url, {
            method: 'POST',
            keepalive: true,
            headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
            body,
          })
        }
      } catch { /* best-effort */ }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [])

  if (!prompt) return null
  return (
    <ExitPromptModal
      slug={prompt.slug}
      elapsedMs={prompt.elapsed}
      onClose={() => setPrompt(null)}
    />
  )
}

function ExitPromptModal({ slug, elapsedMs, onClose }) {
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async () => {
    setBusy(true)
    await recordExit({
      module: slug,
      kind: 'in_app_navigation',
      reason,
      elapsed: elapsedMs,
      props: { source: 'exit_prompt' },
    })
    setBusy(false)
    onClose()
  }
  return (
    <div className="moment-feedback-overlay" role="dialog" aria-label="Quick question">
      <div className="moment-feedback-card">
        <h2>Before you go</h2>
        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 14 }}>
          You left partway through. What made you stop? Optional — one field.
        </p>
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ marginTop: 12 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 12 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Skip</button>
          <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
            {busy ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
