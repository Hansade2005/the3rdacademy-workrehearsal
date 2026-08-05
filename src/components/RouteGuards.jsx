import { Navigate, useLocation } from 'react-router-dom'
import { useAuth, useEntitlement } from '../lib/auth.jsx'
import { FOUNDING } from '../lib/foundingCohort.js'

function FullScreenSpinner() {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--paper-mute)', fontFamily: 'var(--font-sans)', fontSize: 13,
      letterSpacing: '0.16em', textTransform: 'uppercase',
    }}>Loading…</div>
  )
}

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <FullScreenSpinner />
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/signin?next=${next}`} replace />
  }
  return children
}

export function EntitlementRoute({ product, children }) {
  const { user, loading: authLoading } = useAuth()
  const { hasAccess, loading: entLoading } = useEntitlement(product)
  const location = useLocation()

  if (authLoading || (user && entLoading)) return <FullScreenSpinner />

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/signin?next=${next}`} replace />
  }
  if (!hasAccess) return <LockedProductScreen product={product} />
  return children
}

function LockedProductScreen({ product }) {
  const cfg = FOUNDING[product]
  const slug = cfg?.slug
  const name = cfg?.name || product
  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Locked · {name}</p>
        <h1 className="policy-title">
          You don't own this <em>yet</em>.
        </h1>
        <p className="policy-meta">
          These rehearsals are only accessible to buyers. Reserve a Founding Cohort seat and you'll be able to enter them right away.
        </p>
        <div className="policy-section" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href={`/checkout/${slug}`} className="btn btn-primary">
            Reserve a seat <i className="ti ti-arrow-right"></i>
          </a>
          <a href="/dashboard" className="btn btn-secondary">
            Back to dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
