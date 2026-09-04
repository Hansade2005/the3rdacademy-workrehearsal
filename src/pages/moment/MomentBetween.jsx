import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { recordEvent } from '../../lib/moment.js'

export default function MomentBetween() {
  const [comeBackLater, setComeBackLater] = useState(false)
  useEffect(() => { recordEvent('moment_between_view', { screen: 'between' }) }, [])

  if (comeBackLater) {
    return (
      <div className="moment-page">
        <section className="moment-hero">
          <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
            <p style={{ fontSize: 22 }}>It will be here.</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="moment-page">
      <section className="moment-hero">
        <div className="container" style={{ maxWidth: 620 }}>
          <p className="moment-body" style={{ fontSize: 20 }}>That was one kind of workplace pressure.</p>
          <p className="moment-body" style={{ fontSize: 20 }}>
            The next looks completely different. Same question underneath: you noticed
            something, and now you have to decide what to do about it.
          </p>
          <div style={{ display: 'grid', gap: 12, marginTop: 32 }}>
            <Link
              to="/moment/rehearse/2"
              className="btn btn-primary"
              onClick={() => recordEvent('moment_between_continue', {})}
            >
              Continue to the second rehearsal →
            </Link>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                recordEvent('moment_between_later', {})
                setComeBackLater(true)
              }}
            >
              I&rsquo;ll come back to this later
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
