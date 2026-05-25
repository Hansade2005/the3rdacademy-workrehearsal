import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="policy-page">
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <p className="policy-eyebrow">404</p>
        <h1 className="policy-title">This page isn't <em>here</em>.</h1>
        <p style={{ fontSize: '16px', color: 'var(--ink)', maxWidth: '480px', margin: '8px auto 32px', lineHeight: 1.65 }}>
          The link may be old, or the page may have moved. Head back to the home page and pick up where you left off.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>
          Back to home <i className="ti ti-arrow-right"></i>
        </Link>
      </div>
    </div>
  )
}
