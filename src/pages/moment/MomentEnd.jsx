import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { recordEvent } from '../../lib/moment.js'
import FeedbackPrompt from '../../components/moment/FeedbackPrompt.jsx'

export default function MomentEnd() {
  const [feedbackDone, setFeedbackDone] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  useEffect(() => { recordEvent('moment_end_view', { screen: 'end' }) }, [])

  return (
    <div className="moment-page">
      <section className="moment-hero">
        <div className="container" style={{ maxWidth: 620 }}>
          <p className="moment-body" style={{ fontSize: 20 }}>
            You worked through two workplace rehearsal experiences today. In both,
            your choices carried consequences.
          </p>
          <p className="moment-body" style={{ fontSize: 20 }}>
            There are more workplace moments like these to rehearse.
          </p>
          <div style={{ display: 'grid', gap: 12, marginTop: 32 }}>
            <Link
              to="/"
              className="btn btn-primary"
              onClick={() => recordEvent('moment_end_see_moments', {})}
            >
              See the moments →
            </Link>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowFeedback(true)}
              disabled={feedbackDone}
            >
              {feedbackDone ? 'Thank you.' : 'Tell us what you think of this →'}
            </button>
          </div>
        </div>
      </section>

      {showFeedback && !feedbackDone && (
        <FeedbackPrompt
          prompt="B"
          onDone={() => { setFeedbackDone(true); setShowFeedback(false) }}
          onDismiss={() => setShowFeedback(false)}
        />
      )}
    </div>
  )
}
