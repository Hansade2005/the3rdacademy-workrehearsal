import { useState, useEffect, useRef } from 'react'
import { SCENARIOS, SCENARIO_ORDER } from '../data/scenarios.js'
import { emit, trackCheckout } from '../lib/analytics.js'

/**
 * DemoModal — interactive sample rehearsal.
 *
 * Two scenarios in tabs (Probation Blueprint + AI-Ready Behaviours).
 * Three stages per scenario: moment → consequence → ending.
 * No email gate. ESC + click-outside + close button all dismiss.
 * Focus trapped while open, body scroll locked.
 */
export default function DemoModal({ open, onClose }) {
  const [activeScenario, setActiveScenario] = useState('probation')
  const [stage, setStage] = useState('moment')      // 'moment' | 'consequence' | 'ending'
  const [pickedChoice, setPickedChoice] = useState(null)
  const closeBtnRef = useRef(null)
  const dialogRef = useRef(null)
  const previousActiveEl = useRef(null)

  const scenario = SCENARIOS[activeScenario]
  const consequence = pickedChoice ? scenario.consequences[pickedChoice] : null

  // Reset to first stage when scenario changes
  const switchScenario = (id) => {
    if (id === activeScenario) return
    setActiveScenario(id)
    setStage('moment')
    setPickedChoice(null)
    emit('demo_scenario_switched', { scenario: id })
  }

  // Pick a choice → reveal consequence
  const pick = (choiceId) => {
    setPickedChoice(choiceId)
    setStage('consequence')
    emit('demo_choice_made', { scenario: scenario.id, choice: choiceId })
  }

  // Advance from consequence to ending
  const advance = () => {
    setStage('ending')
    emit('demo_consequence_viewed', { scenario: scenario.id, choice: pickedChoice })
  }

  // Restart current scenario
  const restart = () => {
    setStage('moment')
    setPickedChoice(null)
    emit('demo_scenario_restarted', { scenario: scenario.id })
  }

  // Checkout from ending
  const checkout = () => {
    trackCheckout(`demo_${scenario.id}`)
    emit('demo_checkout_clicked', { scenario: scenario.id, choice: pickedChoice })
    // Let the link navigate
  }

  // Body scroll lock + ESC handling + focus management
  useEffect(() => {
    if (!open) return

    // Save scroll position and lock
    previousActiveEl.current = document.activeElement
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    document.body.classList.add('modal-open')

    // Focus the close button on open for keyboard users
    setTimeout(() => closeBtnRef.current?.focus(), 30)

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      // Simple focus trap — keep tab inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)

    emit('demo_opened', {})

    return () => {
      document.removeEventListener('keydown', handleKey)
      // Restore scroll
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
      window.scrollTo(0, scrollY)
      // Restore focus
      previousActiveEl.current?.focus?.()
    }
  }, [open, onClose])

  // Reset on close
  useEffect(() => {
    if (!open) {
      // Defer reset slightly so the closing transition doesn't show a flash
      const t = setTimeout(() => {
        setActiveScenario('probation')
        setStage('moment')
        setPickedChoice(null)
      }, 200)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!open) return null

  // Click-outside dismissal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const totalStages = 3
  const stageIndex = stage === 'moment' ? 1 : stage === 'consequence' ? 2 : 3

  return (
    <div
      className="demo-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="demo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
      >
        {/* Top bar */}
        <div className="demo-top">
          <div className="demo-top-left">
            <span className="demo-eyebrow">Sample rehearsal</span>
            <span className="demo-stage-count">
              Stage {stageIndex} of {totalStages}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            className="demo-close"
            onClick={onClose}
            aria-label="Close sample rehearsal"
            type="button"
          >
            <i className="ti ti-x"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="demo-tabs" role="tablist" aria-label="Choose a sample rehearsal">
          {SCENARIO_ORDER.map(id => {
            const s = SCENARIOS[id]
            const isActive = id === activeScenario
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                className={`demo-tab${isActive ? ' active' : ''}`}
                onClick={() => switchScenario(id)}
                type="button"
              >
                <span className="demo-tab-product">{s.productKey}</span>
                <span className="demo-tab-label">{s.label}</span>
              </button>
            )
          })}
        </div>

        {/* Body */}
        <div className="demo-body">
          {/* ============ STAGE 1: THE MOMENT ============ */}
          {stage === 'moment' && (
            <div className="demo-stage">
              <p className="demo-stage-kicker">The moment</p>
              <p className="demo-setting">{scenario.moment.setting}</p>
              <p className="demo-narrative">{scenario.moment.body}</p>

              <div className="demo-message">
                <span className="demo-message-mark" aria-hidden="true"></span>
                <p className="demo-message-text">{scenario.moment.message}</p>
              </div>

              <p className="demo-prompt">{scenario.moment.prompt}</p>

              <div className="demo-choices" role="group" aria-label="Pick your response">
                {scenario.choices.map((choice) => (
                  <button
                    key={choice.id}
                    className="demo-choice"
                    onClick={() => pick(choice.id)}
                    type="button"
                  >
                    <span className="demo-choice-label">{choice.label}</span>
                    <span className="demo-choice-text">{choice.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============ STAGE 2: CONSEQUENCE ============ */}
          {stage === 'consequence' && consequence && (
            <div className="demo-stage">
              <p className="demo-stage-kicker">The reply</p>

              <div className="demo-reply">
                <p className="demo-reply-from">{consequence.reply.from}</p>
                <p className="demo-reply-text">{consequence.reply.text}</p>
              </div>

              <p className="demo-prompt">What happens next?</p>

              <button
                className="demo-advance"
                onClick={advance}
                type="button"
              >
                See what happens next
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          )}

          {/* ============ STAGE 3: ENDING + CTA ============ */}
          {stage === 'ending' && consequence && (
            <div className="demo-stage">
              <p className="demo-stage-kicker">{consequence.later.when}</p>

              <p className="demo-narrative demo-narrative-large">
                {consequence.later.body}
              </p>

              <div className="demo-lesson">
                <p className="demo-lesson-kicker">Notice what shifted?</p>
                <p className="demo-lesson-text">{consequence.later.lesson}</p>
              </div>

              <div className="demo-end-actions">
                <a
                  href={scenario.productHref}
                  className="demo-cta-primary"
                  onClick={checkout}
                >
                  <span>Start {scenario.productKey} · {scenario.productPrice}</span>
                  <i className="ti ti-arrow-right" aria-hidden="true"></i>
                </a>
                <button
                  className="demo-cta-secondary"
                  onClick={restart}
                  type="button"
                >
                  Try a different response
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer microcopy — locked phrase */}
        <div className="demo-footer">
          Practice and development only. Not behavioural documentation.
        </div>
      </div>
    </div>
  )
}
