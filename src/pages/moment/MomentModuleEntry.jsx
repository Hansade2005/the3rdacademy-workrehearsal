import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { recordEvent } from '../../lib/moment.js'

const COPY = {
  1: {
    title: 'Saying the Hard Thing',
    slug: 'saying-the-hard-thing',
    body: (
      <>
        <p>
          You are in a meeting with an important customer. Your manager is
          presenting. One of the numbers on the screen is out of date, and you
          are the person who ran the corrected figure and sent it last week.
        </p>
        <p>He has not noticed.</p>
      </>
    ),
    next: '/moment/rehearse/1/module',
  },
  2: {
    title: 'When the AI Looks Right',
    slug: 'when-the-ai-looks-right',
    body: (
      <>
        <p>
          The draft in front of you reads well. It is clear, it is confident,
          and it is nearly finished.
        </p>
        <p>
          One claim in it does not match what you know. Checking properly will
          cost you time you were not planning to spend, and the work goes out
          under your name.
        </p>
      </>
    ),
    next: '/moment/rehearse/2/module',
  },
}

export default function MomentModuleEntry({ which }) {
  const copy = COPY[which]
  useEffect(() => {
    recordEvent('moment_entry_view', { module: copy.slug, screen: `entry-${which}` })
  }, [which, copy.slug])

  return (
    <div className="moment-page">
      <section className="moment-hero">
        <div className="container" style={{ maxWidth: 700 }}>
          <h1 className="moment-title">{copy.title}</h1>
          <div className="moment-body" style={{ fontSize: 20, lineHeight: 1.6 }}>
            {copy.body}
          </div>
          <p className="moment-body" style={{ marginTop: 24, color: 'rgba(0,0,0,0.6)' }}>
            What happens next is your call. Take your time — there is no time limit.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link
              to={copy.next}
              className="btn btn-primary"
              onClick={() => recordEvent('moment_begin_click', { module: copy.slug })}
            >
              Begin →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
