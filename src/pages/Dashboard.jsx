import { Link } from 'react-router-dom'
import { useAuth, useMyEntitlements, signOut } from '../lib/auth.jsx'
import { FOUNDING } from '../lib/foundingCohort.js'

const PRODUCT_LABEL = {
  probation_blueprint: {
    name: 'Probation Blueprint™',
    tagline: 'The first 90 days, rehearsed.',
    directory: '/probation-blueprint',
    modules: [
      { slug: 'd1', title: 'D1 · Integrity & Ethics' },
      { slug: 'd2', title: 'D2 · Accountability & Ownership' },
      { slug: 'd3', title: 'D3 · Execution Reliability' },
      { slug: 'd4', title: 'D4 · Communication Under Pressure' },
      { slug: 'd5', title: 'D5 · Collaboration & Conflict' },
      { slug: 'd8', title: 'D8 · Resilience & Recovery' },
      { slug: 'd9', title: 'D9 · Learning Agility' },
    ],
  },
  ai_ready_behaviours: {
    name: 'AI-Ready Behaviours™',
    tagline: 'The judgment calls AI now creates.',
    directory: '/ai-ready',
    modules: [
      { slug: 'm1', title: 'M1 · AI Output Judgment' },
      { slug: 'm2', title: 'M2 · AI Disclosure & Attribution' },
      { slug: 'm3', title: 'M3 · AI Override & Escalation' },
      { slug: 'm4', title: 'M4 · AI Grey Zone' },
      { slug: 'm5', title: 'M5 · AI Breakdown & Recovery' },
    ],
  },
}

function trancheLabel(t) {
  if (t === 'T1') return 'Founding Cohort · Tranche 1'
  if (t === 'T2') return 'Founding Cohort · Tranche 2'
  return 'Post-launch'
}

export default function Dashboard() {
  const { user, loading } = useAuth()
  const { rows, loading: entLoading } = useMyEntitlements()

  if (loading) {
    return <div className="policy-page"><div className="container-narrow"><p className="policy-meta">Loading…</p></div></div>
  }

  // Group by product; take the earliest (most authoritative) row per product.
  const byProduct = {}
  for (const r of rows) {
    if (!byProduct[r.product] ||
        new Date(r.purchased_at) < new Date(byProduct[r.product].purchased_at)) {
      byProduct[r.product] = r
    }
  }

  const products = Object.keys(PRODUCT_LABEL)

  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Your dashboard</p>
        <h1 className="policy-title">
          Welcome<em> back</em>.
        </h1>
        <p className="policy-meta">
          Signed in as <strong style={{ color: 'var(--paper)' }}>{user?.email}</strong>.
          {' '}<button
            type="button"
            onClick={() => signOut().then(() => { window.location.href = '/' })}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              color: 'var(--flame)', fontWeight: 600, font: 'inherit', textDecoration: 'underline',
            }}
          >Sign out</button>
        </p>

        {entLoading ? (
          <div className="policy-section"><p>Loading your seats…</p></div>
        ) : (
          <>
            {products.map((prodKey) => {
              const meta = PRODUCT_LABEL[prodKey]
              const seat = byProduct[prodKey]
              const owned = Boolean(seat)
              return (
                <div key={prodKey} className="policy-section" style={{
                  padding: '28px 30px',
                  background: 'var(--bg-2)',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                    <div>
                      <h2 style={{ margin: 0 }}>{meta.name}</h2>
                      <p style={{ marginTop: '6px', color: 'var(--paper-soft)' }}>{meta.tagline}</p>
                    </div>
                    {owned ? (
                      <span style={{
                        padding: '6px 12px', borderRadius: '100px',
                        background: 'var(--flame-faint)', border: '1px solid var(--flame)',
                        color: 'var(--flame)', fontSize: 12, fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                      }}>
                        {seat.seat_number ? `Seat #${seat.seat_number}` : 'Owned'} · {trancheLabel(seat.tranche)}
                      </span>
                    ) : (
                      <span style={{
                        padding: '6px 12px', borderRadius: '100px',
                        background: 'transparent', border: '1px solid var(--line)',
                        color: 'var(--paper-mute)', fontSize: 12, fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                      }}>
                        Not yet owned
                      </span>
                    )}
                  </div>

                  {owned ? (
                    <>
                      <p style={{ marginTop: '18px', color: 'var(--paper-soft)', fontSize: 14.5 }}>
                        Your founder-led onboarding session (within 14 days of purchase) will be scheduled by the founder's office. Meanwhile, all modules are open — take them in any order.
                      </p>
                      <div className="module-mini-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: '10px',
                        marginTop: '18px',
                      }}>
                        {meta.modules.map((m) => (
                          <Link key={m.slug} to={`/rehearse/${m.slug}`} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '14px 16px', background: 'var(--bg)', border: '1px solid var(--line)',
                            borderRadius: '10px', color: 'var(--paper)', textDecoration: 'none',
                            fontSize: 14, fontWeight: 500,
                          }}>
                            <span>{m.title}</span>
                            <i className="ti ti-arrow-right" style={{ color: 'var(--flame)' }}></i>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={{ marginTop: '18px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <Link to={`/checkout/${FOUNDING[prodKey].slug}`} className="btn btn-primary">
                        Reserve a seat <i className="ti ti-arrow-right"></i>
                      </Link>
                      <Link to={meta.directory} className="btn btn-secondary">
                        See what's inside
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}

        <div className="policy-section" style={{ marginTop: '20px' }}>
          <p style={{ color: 'var(--paper-mute)', fontSize: 13 }}>
            Questions? <Link to="/contact" style={{ color: 'var(--flame)' }}>Contact the founder's office</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
