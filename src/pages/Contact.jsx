import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: opens user's mail client with prefilled support@workrehearsal.com
    const subject = encodeURIComponent(`Contact from ${form.name || 'workrehearsal.com'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:support@workrehearsal.com?subject=${subject}&body=${body}`
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

        <div className="policy-section">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '540px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', color: 'var(--slate)', fontWeight: 500 }}>Your name</span>
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
              <span style={{ fontSize: '13px', color: 'var(--slate)', fontWeight: 500 }}>Your email</span>
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
              <span style={{ fontSize: '13px', color: 'var(--slate)', fontWeight: 500 }}>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </label>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              Send message <i className="ti ti-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '12px 14px',
  borderRadius: '10px',
  border: '0.5px solid var(--border-strong)',
  background: 'var(--cream)',
  fontSize: '15px',
  color: 'var(--slate)',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
}
