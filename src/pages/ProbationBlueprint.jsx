import { useEffect } from 'react'
import { emit } from '../lib/analytics.js'
import FoundingPriceBlock from '../components/FoundingPriceBlock.jsx'
import { useFoundingSeats } from '../lib/foundingCohort.js'

const MODULES = [
  {
    slug: 'd1',
    number: '1',
    title: 'Integrity & Ethics',
    framework: 'The Integrity Pause',
    steps: 'Notice · Name · Choose · Stand',
    question:
      'What do you do when the right thing to do is clear, but doing it costs you something?',
    kicker: 'Behavioural Dimension No. 1',
    duration: '90 min',
    role: 'Foundational',
  },
  {
    slug: 'd2',
    number: '2',
    title: 'Accountability & Ownership',
    framework: 'The Repair Sequence',
    steps: 'Acknowledge · Fix · Execute · Confirm',
    question:
      'When something you committed to slips, what do other people see in how you handle it?',
    kicker: 'Behavioural Dimension No. 2',
    duration: '90 min',
    role: 'Foundational',
  },
  {
    slug: 'd3',
    number: '3',
    title: 'Execution Reliability',
    framework: 'The Reliability System',
    steps: 'Commit · Deliver · Communicate · Continue',
    question:
      'Can other people build plans around what you say you will do?',
    kicker: 'Behavioural Dimension No. 3',
    duration: '90 min',
    role: 'Foundational',
  },
  {
    slug: 'd4',
    number: '4',
    title: 'Communication Under Pressure',
    framework: 'The Pressure Response Protocol',
    steps: 'Notice · Centre · Name · Land',
    question:
      'When the room heats up, what does what you say next make possible?',
    kicker: 'Behavioural Dimension No. 4',
    duration: '90 min',
    role: 'Foundational',
  },
  {
    slug: 'd5',
    number: '5',
    title: 'Collaboration & Conflict Resolution',
    framework: 'The Alignment Method',
    steps: 'Field · Third Object · Perspective · Repair',
    question:
      'When agreement is no longer easy, does your behaviour keep progress possible?',
    kicker: 'Behavioural Dimension No. 5',
    duration: '90 min',
    role: 'Foundational',
  },
  {
    slug: 'd8',
    number: '8',
    title: 'Resilience & Recovery',
    framework: 'The Recovery Method',
    steps: 'Steady · See · Respond · Return',
    question:
      'When you take a hit, what does your recovery show the room about who you are?',
    kicker: 'Behavioural Dimension No. 8',
    duration: '90 min',
    role: 'Foundational',
  },
  {
    slug: 'd9',
    number: '9',
    title: 'Learning Agility',
    framework: 'The Learning Cycle',
    steps: 'Receive · Absorb · Apply · Integrate',
    question:
      'Does the feedback you receive today change the way you work next month?',
    kicker: 'Behavioural Dimension No. 9',
    duration: '90 min',
    role: 'Capstone',
  },
]

export default function ProbationBlueprint() {
  const { seats } = useFoundingSeats()
  useEffect(() => {
    emit('page_view', { page: 'probation_blueprint_directory' })
  }, [])

  return (
    <div className="directory-page">
      {/* ==================== INTRO ==================== */}
      <section className="directory-hero">
        <div className="container">
          <p className="directory-eyebrow">Probation Blueprint™ · BehaviourLab</p>
          <h1 className="directory-headline">
            The first 90 days, <em>rehearsed</em>.
          </h1>
          <p className="directory-sub">
            Seven behavioural dimensions. Ninety minutes each. Every rehearsal opens with a moment you can already feel, then follows your decisions through same day, next week, and month end. No scores. No rankings. A private record of what you practised.
          </p>
          <div className="directory-meta-row">
            <span className="directory-meta-chip">7 rehearsals · 90 min each</span>
            <span className="directory-meta-chip">Available now · take in any order</span>
            <span className="directory-meta-chip">Private to you</span>
          </div>

          <div className="directory-price-wrap">
            <FoundingPriceBlock product="probation_blueprint" seat={seats?.probation_blueprint} />
            <a href="/checkout/probation-blueprint" className="btn btn-primary directory-price-cta">
              Reserve your seat <i className="ti ti-arrow-right"></i>
            </a>
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
                className={`module-card${m.role === 'Capstone' ? ' module-card--capstone' : ''}`}
                onClick={() =>
                  emit('module_open', { module: m.slug, source: 'probation_blueprint_directory' })
                }
              >
                <div className="module-card-top">
                  <span className="module-card-kicker">{m.kicker}</span>
                  {m.role === 'Capstone' ? (
                    <span className="module-card-role">Capstone</span>
                  ) : null}
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
              <p>Each rehearsal is a self-contained 90-minute experience. You can pause anywhere and your progress saves. Come back and pick up where you left off.</p>
            </div>
            <div className="directory-how-item">
              <h4>Any order works</h4>
              <p>They are designed as a sequence, but you can enter any of them first. Later rehearsals surface subtle callbacks when you have completed the earlier ones.</p>
            </div>
            <div className="directory-how-item">
              <h4>No pass or fail</h4>
              <p>The Growth Log captures what you practised — quietly, accurately, in your own words. You will see your own pattern, not a score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER-LEVEL LINK ==================== */}
      <section className="directory-tail">
        <div className="container-narrow">
          <p className="directory-tail-line">
            Looking for the AI-Ready Behaviours?{' '}
            <a href="/ai-ready" className="directory-tail-link">
              See the five AIWorkLab rehearsals →
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
