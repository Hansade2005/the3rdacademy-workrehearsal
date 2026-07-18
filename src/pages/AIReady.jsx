import { useEffect } from 'react'
import { emit } from '../lib/analytics.js'

const MODULES = [
  {
    slug: 'm1',
    number: '1',
    title: 'AI Output Judgment',
    framework: 'The Source-First Habit',
    steps: 'Inspect · Compare · Attribute · Decide',
    question:
      'What you say with confidence today is what someone will repeat back to you next month. What are you willing to have carried?',
    kicker: 'Pressure Point No. 1',
    duration: '45 min',
  },
  {
    slug: 'm2',
    number: '2',
    title: 'AI Disclosure & Attribution',
    framework: 'The Material-Use Rule',
    steps: 'Name · Attribute · Repair',
    question:
      'What you let stand today is what your name will carry next month.',
    kicker: 'Pressure Point No. 2',
    duration: '45 min',
  },
  {
    slug: 'm3',
    number: '3',
    title: 'AI Override & Escalation',
    framework: 'The Window Rule',
    steps: 'See the window · Choose the surface · Make it visible',
    question:
      'When the model is confident and you are not, what do you do?',
    kicker: 'Pressure Point No. 3',
    duration: '45 min',
  },
  {
    slug: 'm4',
    number: '4',
    title: 'AI Grey Zone',
    framework: 'The Daylight Rule',
    steps: 'Name it · Bring it into the light · Decide',
    question:
      'What you do where no one is watching is what you actually decided.',
    kicker: 'Pressure Point No. 4',
    duration: '45 min',
  },
  {
    slug: 'm5',
    number: '5',
    title: 'AI Breakdown & Recovery',
    framework: 'The Three Sentences',
    steps: 'What happened · What I own · What I will do',
    question:
      'The work carried your name. The breakdown carried your name. What does the recovery carry?',
    kicker: 'Pressure Point No. 5',
    duration: '45 min',
  },
]

export default function AIReady() {
  useEffect(() => {
    emit('page_view', { page: 'ai_ready_directory' })
  }, [])

  return (
    <div className="directory-page directory-page--ai">
      {/* ==================== INTRO ==================== */}
      <section className="directory-hero">
        <div className="container">
          <p className="directory-eyebrow">AI-Ready Behaviours™ · AIWorkLab</p>
          <h1 className="directory-headline">
            The judgment calls AI now <em>creates</em>.
          </h1>
          <p className="directory-sub">
            Five workplace pressure points. Forty-five minutes each. Every rehearsal drops you into an AI-assisted moment — a summary you did not fully verify, a piece of writing you did not fully author, a piece of advice from a model that was confident and wrong — and follows your response through the days after. Practise the verification, disclosure, escalation, and ownership before your reputation rides on the answer.
          </p>
          <div className="directory-meta-row">
            <span className="directory-meta-chip">5 rehearsals · 45 min each</span>
            <span className="directory-meta-chip">Available now · take in any order</span>
            <span className="directory-meta-chip">Private to you</span>
          </div>
        </div>
      </section>

      {/* ==================== MODULE GRID ==================== */}
      <section className="directory-section">
        <div className="container">
          <div className="module-grid">
            {MODULES.map((m) => (
              <a
                key={m.slug}
                href={`/rehearse/${m.slug}`}
                className="module-card module-card--ai"
                onClick={() =>
                  emit('module_open', { module: m.slug, source: 'ai_ready_directory' })
                }
              >
                <div className="module-card-top">
                  <span className="module-card-kicker">{m.kicker}</span>
                </div>
                <h3 className="module-card-title">{m.title}</h3>
                <p className="module-card-framework">
                  <span className="module-card-framework-label">Framework</span>
                  <span className="module-card-framework-name">{m.framework}</span>
                </p>
                <p className="module-card-steps">{m.steps}</p>
                <p className="module-card-question">
                  <em>{m.question}</em>
                </p>
                <div className="module-card-foot">
                  <span className="module-card-duration">{m.duration}</span>
                  <span className="module-card-cta">
                    Enter rehearsal
                    <i className="ti ti-arrow-right"></i>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW ==================== */}
      <section className="directory-how">
        <div className="container-narrow">
          <p className="directory-how-eyebrow">How to use these</p>
          <div className="directory-how-grid">
            <div className="directory-how-item">
              <h4>Take one at a time</h4>
              <p>Each rehearsal is a self-contained 45-minute experience. You can pause anywhere and your progress saves.</p>
            </div>
            <div className="directory-how-item">
              <h4>Any order works</h4>
              <p>The five pressure points are independent. Later modules pick up subtle threads when you have completed the earlier ones.</p>
            </div>
            <div className="directory-how-item">
              <h4>No pass or fail</h4>
              <p>You will practise verification, disclosure, escalation, and repair — and see, in your own words, what pattern you already carry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER-LEVEL LINK ==================== */}
      <section className="directory-tail">
        <div className="container-narrow">
          <p className="directory-tail-line">
            Looking for the Probation Blueprint?{' '}
            <a href="/probation-blueprint" className="directory-tail-link">
              See the seven BehaviourLab rehearsals →
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
