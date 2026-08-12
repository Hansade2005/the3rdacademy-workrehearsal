import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ name: form.name, email: form.email, message: form.message })

    if (dbError) {
      setError('Something went wrong. Please try again or email support@workrehearsal.com directly.')
      setSubmitting(false)
      return
    }

    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Contact</p>
        <h1 className="policy-title">Get in <em>touch</em></h1>
        <p className="policy-meta">
          The fastest path is email. For refund questions write to{' '}
          <a href="mailto:refund@workrehearsal.com" style={{ color: 'var(--coral-deep)', textDecoration: 'underline' }}>refund@workrehearsal.com</a>.
          For privacy questions write to{' '}
          <a href="mailto:privacy@workrehearsal.com" style={{ color: 'var(--coral-deep)', textDecoration: 'underline' }}>privacy@workrehearsal.com</a>.
          For everything else, write to{' '}
          <a href="mailto:support@workrehearsal.com" style={{ color: 'var(--coral-deep)', textDecoration: 'underline' }}>support@workrehearsal.com</a>{' '}
          or use the form below.
        </p>

        <div className="policy-section" style={{ marginBottom: '32px' }}>
          <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: '24px', rowGap: '10px', fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--paper-soft)', margin: 0 }}>
            <dt style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--paper-mute)', alignSelf: 'center' }}>Head office</dt>
            <dd style={{ margin: 0, color: 'var(--paper)' }}>
              143 Saddlecrest Gardens NE<br />
              Calgary, Alberta&nbsp;T4J&nbsp;0C3, Canada
            </dd>
            <dt style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--paper-mute)', alignSelf: 'center' }}>Telephone</dt>
            <dd style={{ margin: 0 }}>
              <a href="tel:+15877163135" style={{ color: 'var(--coral-deep)', textDecoration: 'underline' }}>+1&nbsp;(587)&nbsp;716&#8209;3135</a>
            </dd>
          </dl>
        </div>

        <div className="policy-section">
          {submitted ? (
            <div
              style={{
                padding: '24px 28px',
                background: 'var(--flame-faint)',
                border: '1px solid var(--flame)',
                borderLeft: '2px solid var(--flame)',
                borderRadius: '14px',
                maxWidth: '540px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '20px',
                  color: 'var(--paper)',
                  lineHeight: 1.45,
                  marginBottom: '8px',
                }}
              >
                Message received.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: 'var(--paper-soft)',
                  margin: 0,
                }}
              >
                We'll get back to you at <strong style={{ color: 'var(--paper)' }}>{form.email}</strong> as soon as we can.
              </p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '540px' }}>
            {error && (
              <p style={{ color: 'var(--flame)', fontSize: '14px', margin: 0 }}>{error}</p>
            )}
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: 'var(--paper-mute)', fontWeight: 500 }}>Your name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: 'var(--paper-mute)', fontWeight: 500 }}>Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: 'var(--paper-mute)', fontWeight: 500 }}>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </label>

            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              {submitting ? 'Sending...' : 'Send message'} <i className="ti ti-arrow-right"></i>
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid var(--line)',
  background: 'var(--bg-2)',
  fontSize: '15px',
  color: 'var(--paper)',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
}
