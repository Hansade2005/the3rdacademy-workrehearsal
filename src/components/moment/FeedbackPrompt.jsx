import { useState } from 'react'
import { recordFeedback, recordEvent } from '../../lib/moment.js'

/**
 * Prompt A/B/C — questions worded exactly per Section 7.
 * Every field optional; every prompt dismissible in one action.
 * No stars, no NPS, no self-evaluation.
 */
const PROMPTS = {
  A: {
    title: 'Two quick things before you continue',
    fields: [
      { id: 'unrealistic',      label: 'Did any moment feel unrealistic to you?', type: 'text' },
      { id: 'missing_choice',   label: 'Was there a choice you wanted to make that we did not offer?', type: 'text' },
      { id: 'plausible',        label: 'Be honest: were the choices you made here close to what you would actually do at work?', type: 'radio', options: ['Yes','No','Not sure'] },
      { id: 'plausible_notes',  label: 'What would you do differently?', type: 'text' },
    ],
  },
  B: {
    title: 'One more, then you are done',
    fields: [
      { id: 'most_realistic',   label: 'Across the two rehearsals, what felt most realistic?', type: 'text' },
      { id: 'change',           label: 'Anything you would change?', type: 'text' },
      { id: 'appetite',         label: 'Would you want to rehearse other workplace moments like these?', type: 'radio', options: ['Yes','No','Not sure'] },
    ],
  },
  C: {
    title: 'Before you go',
    fields: [
      { id: 'why_stop',         label: 'You are leaving partway through. What made you stop?', type: 'text' },
    ],
  },
}

export default function FeedbackPrompt({ prompt, onDone, onDismiss }) {
  const spec = PROMPTS[prompt]
  const [values, setValues] = useState({})
  const [busy, setBusy] = useState(false)

  const setField = (id, v) => setValues((s) => ({ ...s, [id]: v }))

  const submit = async () => {
    setBusy(true)
    try {
      await recordFeedback(prompt, values)
      recordEvent('moment_feedback_submitted', { props: { prompt } })
    } catch { /* fire-and-forget */ }
    setBusy(false)
    onDone && onDone()
  }

  const dismiss = () => {
    recordEvent('moment_feedback_dismissed', { props: { prompt } })
    onDismiss && onDismiss()
  }

  return (
    <div className="moment-feedback-overlay" role="dialog" aria-label={spec.title}>
      <div className="moment-feedback-card">
        <h2>{spec.title}</h2>
        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 14 }}>
          Every field is optional. No score, no rating.
        </p>
        <div style={{ display: 'grid', gap: 18, marginTop: 16 }}>
          {spec.fields.map((f) => (
            <div key={f.id} style={{ display: 'grid', gap: 6 }}>
              <label htmlFor={`fp-${f.id}`}>{f.label}</label>
              {f.type === 'text' ? (
                <textarea
                  id={`fp-${f.id}`}
                  rows={2}
                  value={values[f.id] || ''}
                  onChange={(e) => setField(f.id, e.target.value)}
                />
              ) : (
                <div role="radiogroup" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {f.options.map((opt) => (
                    <label key={opt} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                      <input
                        type="radio"
                        name={f.id}
                        value={opt}
                        checked={values[f.id] === opt}
                        onChange={() => setField(f.id, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, gap: 12 }}>
          <button type="button" className="btn btn-secondary" onClick={dismiss}>Skip</button>
          <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
            {busy ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
