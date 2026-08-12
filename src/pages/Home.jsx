import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FAQ from '../components/FAQ.jsx'
import DemoModal from '../components/DemoModal.jsx'
import FoundingPriceBlock from '../components/FoundingPriceBlock.jsx'
import LaunchCountdown from '../components/LaunchCountdown.jsx'
import { useFoundingSeats } from '../lib/foundingCohort.js'
import { trackCheckout, trackCTA } from '../lib/analytics.js'

export default function Home() {
  const location = useLocation()
  const [demoOpen, setDemoOpen] = useState(false)
  const { seats } = useFoundingSeats()

  const openDemo = (source) => {
    setDemoOpen(true)
    trackCTA(source, 'open_demo')
  }

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [location.hash])

  return (
    <>
    <div>
      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="container">
          {/* Edition line — top of the plate */}
          <div className="hero-top">
            <p className="hero-edition">
              Volume <span>01</span> · Edition · Fall 2026
            </p>
          </div>

          {/* Pre-headline tagline */}
          <p className="hero-tagline">The warning is rarely the beginning.</p>

          {/* Headline */}
          <h1 className="hero-headline">
            Rehearse the workplace moments that <em>decide</em> your job.
          </h1>

          {/* Supporting subhead */}
          <p className="hero-subhead">
            WorkRehearsal helps you practise the quiet moments that shape trust before they become feedback, concern, or review.
          </p>

          {/* Two-column body */}
          <div className="hero-body-grid">
            <p className="hero-pull">
              When something goes wrong under your name, what do you do next?
            </p>
            <div>
              <p className="hero-sub">
                Before your next workplace pressure moment happens for real — <strong>your first 90 days, your AI judgment calls, the conversation you're nervous about</strong> — practise them here. Private. No scores. No pass or fail.
              </p>
              <div className="cta-group" style={{ marginTop: '36px' }}>
                <a
                  href="#products"
                  className="btn btn-primary"
                  onClick={() => trackCTA('hero', 'see_the_rehearsals')}
>
                  See the rehearsals <i className="ti ti-arrow-right"></i>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => openDemo('hero')}
                >
                  Try a sample rehearsal · 90 sec
                </button>
              </div>
            </div>
          </div>

          {/* Trust meta strip */}
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-key">Privacy</span>
              <span className="hero-meta-val">Private practice</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-key">Scoring</span>
              <span className="hero-meta-val">No pass or fail</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-key">Device</span>
              <span className="hero-meta-val">Mobile-first</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-key">Refund</span>
              <span className="hero-meta-val">14 days</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LAUNCH COUNTDOWN ==================== */}
      <LaunchCountdown />

      {/* ==================== PRODUCTS ==================== */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-header">
            <p className="section-number">01.</p>
            <div className="section-title-block">
              <p className="section-kicker">The rehearsals</p>
              <h2 className="section-title">
                Two ways to practise <em>before</em> it counts.
              </h2>
              <p className="section-sub">
                Each product places you inside the workplace moments that decide how you're seen and trusted. You make the call. You see what happens next.
              </p>
            </div>
          </div>

          <div className="product-grid">
            {/* Probation Blueprint */}
            <div className="product-card">
              <span className="product-tag">Founding Cohort · 7 rehearsals live</span>
              <h3>
                Probation Blueprint<span className="product-trademark">™</span>
              </h3>
              <p className="product-tagline">The first 90 days, rehearsed.</p>
              <p className="product-desc">
                Seven behavioural dimensions — integrity, accountability, reliability, communication under pressure, collaboration, resilience, and learning agility. Each rehearsal drops you inside a real workplace moment, follows your choices through same day, next week, and month end, and captures your pattern in a private Growth Log.
              </p>

              <div className="product-meta">
                <div className="meta-row">
                  <i className="ti ti-user-check"></i>
                  <span>Founder-led onboarding · within 14 days of purchase</span>
                </div>
                <div className="meta-row">
                  <i className="ti ti-stack-2"></i>
                  <span>Full access to all 7 modules for 12 months</span>
                </div>
                <div className="meta-row">
                  <i className="ti ti-flag"></i>
                  <span>A place in the first cohort — your feedback shapes the product</span>
                </div>
              </div>

              <FoundingPriceBlock product="probation_blueprint" seat={seats?.probation_blueprint} />

              <a
                href="/checkout/probation-blueprint"
                className="product-cta"
                onClick={() => trackCheckout('probation_blueprint')}
              >
                <span>Reserve your seat</span>
                <i className="ti ti-arrow-right"></i>
              </a>
              <p className="product-refund">
                <i className="ti ti-circle-check"></i>
                14-day no-questions refund
              </p>
            </div>

            {/* AI-Ready Behaviours */}
            <div className="product-card product-card--ai">
              <span className="product-tag flame">Founding Cohort · 5 rehearsals live</span>
              <h3>
                AI-Ready Behaviours<span className="product-trademark">™</span>
              </h3>
              <p className="product-tagline">The judgment calls AI now creates.</p>
              <p className="product-desc">
                Five workplace AI pressure points — output judgment, disclosure, override & escalation, the grey zone, and breakdown & recovery. Practise verification, attribution, and repair when AI-assisted work goes wrong — before your reputation rides on the answer.
              </p>

              <div className="product-meta">
                <div className="meta-row">
                  <i className="ti ti-user-check"></i>
                  <span>Founder-led onboarding · within 14 days of purchase</span>
                </div>
                <div className="meta-row">
                  <i className="ti ti-stack-2"></i>
                  <span>Full access to all 5 modules for 12 months</span>
                </div>
                <div className="meta-row">
                  <i className="ti ti-flag"></i>
                  <span>A place in the first cohort — your feedback shapes the product</span>
                </div>
              </div>

              <FoundingPriceBlock product="ai_ready_behaviours" seat={seats?.ai_ready_behaviours} />

              <a
                href="/checkout/ai-ready"
                className="product-cta"
                onClick={() => trackCheckout('ai_ready_behaviours')}
              >
                <span>Reserve your seat</span>
                <i className="ti ti-arrow-right"></i>
              </a>
              <p className="product-refund">
                <i className="ti ti-circle-check"></i>
                14-day no-questions refund
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PULL QUOTE ==================== */}
      <section className="pull-quote">
        <div className="container">
          <div className="pull-quote-inner">
            <p className="pull-quote-kicker">The question every worker asks</p>
            <p className="pull-quote-text">
              I got the job — now how do I <em>keep</em> it?
            </p>
            <p className="pull-quote-answer">
              By practising the workplace pressure moments that shape <strong>trust</strong>, <strong>judgment</strong>, and <strong>reputation</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-header">
            <p className="section-number">02.</p>
            <div className="section-title-block">
              <p className="section-kicker">Method</p>
              <h2 className="section-title">
                Practise the workplace pressure. <em>Build</em> the judgment.
              </h2>
              <p className="section-sub">
                Three things make WorkRehearsal different from training. None of them involve a quiz.
              </p>
            </div>
          </div>

          <div className="how-list">
            <div className="how-row">
              <div className="how-row-label">
                <p className="how-num">i</p>
                <h3 className="how-title">Step inside the moment</h3>
              </div>
              <p className="how-desc">
                You don't watch a video. You sit at a <em>kitchen table on a Tuesday evening</em> with a real decision in front of you — your laptop open, the cursor blinking, the message half-written.
              </p>
            </div>

            <div className="how-row">
              <div className="how-row-label">
                <p className="how-num">ii</p>
                <h3 className="how-title">Make the call</h3>
              </div>
              <p className="how-desc">
                Write the message you would actually send. Choose the path you would actually take. Your own workplace language under pressure — <em>not multiple choice, real composition</em>.
              </p>
            </div>

            <div className="how-row">
              <div className="how-row-label">
                <p className="how-num">iii</p>
                <h3 className="how-title">See what happens next</h3>
              </div>
              <p className="how-desc">
                The consequence unfolds in workplace time — <em>same day, next week, month end</em>. You build judgment by watching it land, not by being told what to do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHO IT'S FOR ==================== */}
      <section className="section" id="who">
        <div className="container">
          <div className="section-header">
            <p className="section-number">03.</p>
            <div className="section-title-block">
              <p className="section-kicker">Audience</p>
              <h2 className="section-title">
                Built for the moments that <em>actually</em> decide outcomes.
              </h2>
            </div>
          </div>

          <div className="who-grid">
            <div className="who-card">
              <p className="who-num">i</p>
              <h3 className="who-title">New hires anywhere</h3>
              <p className="who-desc">
                Every new role is a probation, whether it's called that or not. The first 90 days decide whether you become <em>someone people rely on</em> — or someone they work around.
              </p>
            </div>

            <div className="who-card">
              <p className="who-num">ii</p>
              <h3 className="who-title">Experienced workers</h3>
              <p className="who-desc">
                The rehearsal reveals the pressure habits experience can hide — privately, before they show up in a real workplace moment. <em>Behavioural calibration, not certification.</em>
              </p>
            </div>

            <div className="who-card">
              <p className="who-num">iii</p>
              <h3 className="who-title">Cross-border professionals</h3>
              <p className="who-desc">
                You have the qualifications. You have the offer letter. The first 90 days working in a new country are about something else: flagging issues early, owning mistakes, reading rooms you have never been in before, and adjusting to workplace norms no one fully explains. Different workplaces carry different unspoken rules. <em>Rehearse the pressure moments before you learn them the hard way.</em>
              </p>
            </div>

            <div className="who-card">
              <p className="who-num">iv</p>
              <h3 className="who-title">Anyone using AI at work</h3>
              <p className="who-desc">
                Using AI at work is no longer the hard part. The hard part is <em>judgment</em> — when to verify, when to disclose, when to override, when to stop. Rehearse those calls before they become real workplace risks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-header">
            <p className="section-number">04.</p>
            <div className="section-title-block">
              <p className="section-kicker">Questions</p>
              <h2 className="section-title">
                What people ask <em>before</em> they buy.
              </h2>
            </div>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="cta-section">
        <div className="container cta-content">
          <p className="cta-kicker">Start today</p>
          <h2>
            Don't wait for the warning. <em>Rehearse the moments first</em>.
          </h2>
          <p>Founder's pricing during launch. Private. Mobile. Refundable within 14 days.</p>
          <a
            href="#products"
            className="btn btn-primary"
            onClick={() => trackCTA('final_banner', 'start_the_rehearsal')}
>
            Start the rehearsal <i className="ti ti-arrow-right"></i>
          </a>
        </div>
      </section>
    </div>

    <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
