import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { recordEvent, readCampaignSource } from '../../lib/moment.js'

/**
 * Product page for "The Moment You Notice".
 * Copy is fixed by Section 5.1 of T3A-DEV-INS-WR-FREE-001 and must be used as
 * written. No duration, no dimension names, no source product names,
 * no testimonials, no second CTA.
 */
export default function MomentProduct() {
  useEffect(() => {
    readCampaignSource()
    recordEvent('moment_product_view', { screen: 'product' })
  }, [])

  return (
    <div className="moment-page">
      <section className="moment-hero">
        <div className="container" style={{ maxWidth: 780 }}>
          <p className="moment-eyebrow">FREE</p>
          <h1 className="moment-title">The Moment You Notice</h1>
          <p className="moment-lede">
            Two workplace rehearsal experiences built around one question: you
            noticed something isn&rsquo;t right — what do you do next?
          </p>
          <p className="moment-body">
            You spot something wrong. Saying so costs you something. Staying
            quiet costs you something else.
          </p>
          <p className="moment-body">
            You have probably heard a situation like this described before.
            Hearing it is not the same as standing in it. Here you make the
            call yourself, and then you live with what follows.
          </p>
          <p className="moment-body">
            Most workplace advice tells you what the right answer is. This does
            not. You step into the situation, you make the call you would
            actually make, and then you see how that choice unfolds over the
            days and weeks that follow.
          </p>

          <h2 className="moment-h2">WHAT IS INSIDE</h2>

          <h3 className="moment-h3">Saying the Hard Thing</h3>
          <p className="moment-body">
            Speaking up when the timing, the room or the person makes it
            expensive. A correction that has to land without becoming a
            confrontation. A disagreement you cannot avoid. Feedback you did
            not want to hear. You work the situations through a method for
            staying steady and saying the thing anyway — notice, center, name,
            land — and every call you make plays out immediately, a week
            later, and a month later.
          </p>

          <h3 className="moment-h3">When the AI Looks Right</h3>
          <p className="moment-body">
            What to do when a machine hands you something convincing and one
            part of it does not hold. The pressure comes from two directions:
            someone senior has already accepted the output, and you are not
            certain you are right to doubt it. You work through the habit of
            going back to where a claim came from before it goes out under
            your name — and, again, you watch your choice unfold over the
            weeks that follow.
          </p>

          <h2 className="moment-h2">HOW IT WORKS</h2>
          <p className="moment-body">
            You enter the moment. You make the call. You see what happens next.
          </p>
          <p className="moment-body">
            Private. No score. No pass or fail. Nothing here becomes evidence.
          </p>
          <p className="moment-body">
            You can stop and come back. Your place is kept.
          </p>

          <div style={{ marginTop: 40 }}>
            <Link
              to="/moment/gate"
              className="btn btn-primary"
              onClick={() => recordEvent('moment_start_click', { screen: 'product' })}
            >
              Start free →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
