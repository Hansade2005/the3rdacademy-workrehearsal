import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Is this an assessment? Will my score be sent to my employer?',
    a: `No. WorkRehearsal is private practice. Your rehearsal responses are private to your account and are not shared with employers, used as hiring decisions, or displayed publicly. There are no public scores and no pass/fail outcome. Your activity is subject to our privacy policy and platform operations.`,
  },
  {
    q: 'How is this different from an online course?',
    a: `Courses teach you what you should know. WorkRehearsal puts you inside the moment and asks what you would actually do. You don't watch — you decide. You see the consequences of your decision unfold in workplace time. You build the judgment, not the vocabulary.`,
  },
  {
    q: 'How long does each product take?',
    a: `Probation Blueprint™ is 90 minutes per module. You can pause anytime and resume where you left off. AI-Ready Behaviours™ is five modules of 45 minutes each — take them in any order, on your own schedule.`,
  },
  {
    q: 'Will this work on my phone?',
    a: `Yes. WorkRehearsal is built mobile-first. Most candidates complete it on their phone during commutes or evenings.`,
  },
  {
    q: "I'm not on probation. Can I still use Probation Blueprint?",
    a: `Yes. Probation Blueprint is useful beyond formal probation. It applies when you start a new role, join a new team, take on new responsibility, return after a career break, or want to recalibrate how you handle workplace pressure.`,
  },
  {
    q: "What if I don't think it was worth it?",
    a: `14-day no-questions refund. Email refund@workrehearsal.com (live at launch) from the address you bought with and you'll have your money back within 48 hours.`,
  },
  {
    q: 'Who built this?',
    a: `WorkRehearsal is a product of The 3rd Academy Inc., a Canada-based company focused on workplace readiness, behavioural rehearsal, and professional development — led by Dr. Tony Mofoke. Founder background and deeper company details live on The 3rd Academy site.`,
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (idx) => {
    setOpenIdx(prev => (prev === idx ? null : idx))
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'faq_toggle',
        faq_index: idx,
        faq_question: FAQ_ITEMS[idx].q,
      })
    }
  }

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIdx === idx
        return (
          <div key={idx} className={`faq-item${isOpen ? ' open' : ''}`}>
            <button
              className="faq-question"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-button-${idx}`}
            >
              <span className="faq-num">{String(idx + 1).padStart(2, '0')}</span>
              <span>{item.q}</span>
              <span className="faq-icon" aria-hidden="true"><i className="ti ti-plus"></i></span>
            </button>
            <div
              className="faq-answer"
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-button-${idx}`}
            >
              <div className="faq-answer-inner">{item.a}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
