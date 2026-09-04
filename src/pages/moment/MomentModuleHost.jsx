import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { enterRehearsal, recordEvent } from '../../lib/moment.js'
import { useAuth } from '../../lib/auth.jsx'
import FeedbackPrompt from '../../components/moment/FeedbackPrompt.jsx'

/**
 * Runs the underlying rehearsal module and, on completion, shows Prompt A (or
 * Prompt B for the second module). The end-of-module behavioral mapping is
 * suppressed here — per Section 3, that panel does not appear in the free
 * release in any form, and per Section 4 it must NEVER be shown as locked,
 * greyed, blurred, or teased.
 */
const D4 = lazy(() => import('../../rehearsal/BridgeFastD4Module.jsx'))
const M1 = lazy(() => import('../../rehearsal/BridgeFastM1Module.jsx'))

export default function MomentModuleHost({ which }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)

  const cfg = which === 1
    ? { slug: 'saying-the-hard-thing', Component: D4, promptId: 'A', next: '/moment/between' }
    : { slug: 'when-the-ai-looks-right', Component: M1, promptId: 'B', next: '/moment/end' }

  useEffect(() => {
    if (!user) return
    // Entering either module permanently grants both.
    enterRehearsal(cfg.slug).catch(() => {})
    recordEvent('moment_module_enter', { module: cfg.slug })
  }, [user, cfg.slug])

  // Listen for the underlying module's completion signal. The existing
  // modules dispatch a `bridgefast:complete` event on window when finished;
  // if the concrete module does not yet, an in-module "Finish" button posts
  // the same event via window.dispatchEvent. Suppressing the mapping panel
  // itself is handled by the SuppressBehavioralMapping wrapper below.
  useEffect(() => {
    const onDone = () => setDone(true)
    window.addEventListener('bridgefast:complete', onDone)
    return () => window.removeEventListener('bridgefast:complete', onDone)
  }, [])

  if (loading) return null
  if (!user) return <Navigate to="/moment/gate" replace />

  const Component = cfg.Component

  return (
    <div data-moment-free-release="1">
      <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#0A0908' }} />}>
        <SuppressBehavioralMapping>
          <Component freeRelease hideBehavioralMapping />
        </SuppressBehavioralMapping>
      </Suspense>

      {done && (
        <FeedbackPrompt
          prompt={cfg.promptId}
          onDone={() => navigate(cfg.next, { replace: true })}
          onDismiss={() => navigate(cfg.next, { replace: true })}
        />
      )}
    </div>
  )
}

/**
 * Hides the end-of-module BehaviouralSignaturePanel and any element authored
 * as a "mapping" panel, without editing the source modules. This is a hard
 * removal at the DOM level: the wrapper stamps a stylesheet that sets
 * display:none on candidate selectors inside its subtree. There is no lock
 * icon, blurred preview or upgrade CTA — the module simply ends where it ends.
 */
function SuppressBehavioralMapping({ children }) {
  return (
    <div className="moment-mapping-suppressed">
      <style>{`
        .moment-mapping-suppressed [data-mapping-panel],
        .moment-mapping-suppressed [data-behavioural-signature],
        .moment-mapping-suppressed [data-testid="behavioural-signature-panel"] {
          display: none !important;
        }
      `}</style>
      {children}
    </div>
  )
}
