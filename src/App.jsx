import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Refunds from './pages/Refunds.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Contact from './pages/Contact.jsx'
import Checkout from './pages/Checkout.jsx'
import SignIn from './pages/SignIn.jsx'
import NotFound from './pages/NotFound.jsx'
import ProbationBlueprint from './pages/ProbationBlueprint.jsx'
import AIReady from './pages/AIReady.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { EntitlementRoute, ProtectedRoute } from './components/RouteGuards.jsx'

const BridgeFastModule = lazy(() => import('./rehearsal/BridgeFastModule.jsx'))
const BridgeFastD2Module = lazy(() => import('./rehearsal/BridgeFastD2Module.jsx'))
const BridgeFastD3Module = lazy(() => import('./rehearsal/BridgeFastD3Module.jsx'))
const BridgeFastD4Module = lazy(() => import('./rehearsal/BridgeFastD4Module.jsx'))
const BridgeFastD5Module = lazy(() => import('./rehearsal/BridgeFastD5Module.jsx'))
const BridgeFastD8Module = lazy(() => import('./rehearsal/BridgeFastD8Module.jsx'))
const BridgeFastD9Module = lazy(() => import('./rehearsal/BridgeFastD9Module.jsx'))
const BridgeFastM1Module = lazy(() => import('./rehearsal/BridgeFastM1Module.jsx'))
const BridgeFastM2Module = lazy(() => import('./rehearsal/BridgeFastM2Module.jsx'))
const BridgeFastM3Module = lazy(() => import('./rehearsal/BridgeFastM3Module.jsx'))
const BridgeFastM4Module = lazy(() => import('./rehearsal/BridgeFastM4Module.jsx'))
const BridgeFastM5Module = lazy(() => import('./rehearsal/BridgeFastM5Module.jsx'))

const rehearsalFallback = (
  <div style={{ position: 'fixed', inset: 0, background: '#0A0908' }} />
)

// slug → { product entitlement key, lazy module component }
const REHEARSAL_ROUTES = [
  { slug: 'd1', product: 'probation_blueprint', Component: BridgeFastModule },
  { slug: 'd2', product: 'probation_blueprint', Component: BridgeFastD2Module },
  { slug: 'd3', product: 'probation_blueprint', Component: BridgeFastD3Module },
  { slug: 'd4', product: 'probation_blueprint', Component: BridgeFastD4Module },
  { slug: 'd5', product: 'probation_blueprint', Component: BridgeFastD5Module },
  { slug: 'd8', product: 'probation_blueprint', Component: BridgeFastD8Module },
  { slug: 'd9', product: 'probation_blueprint', Component: BridgeFastD9Module },
  { slug: 'm1', product: 'ai_ready_behaviours', Component: BridgeFastM1Module },
  { slug: 'm2', product: 'ai_ready_behaviours', Component: BridgeFastM2Module },
  { slug: 'm3', product: 'ai_ready_behaviours', Component: BridgeFastM3Module },
  { slug: 'm4', product: 'ai_ready_behaviours', Component: BridgeFastM4Module },
  { slug: 'm5', product: 'ai_ready_behaviours', Component: BridgeFastM5Module },
]

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function MarketingLayout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {REHEARSAL_ROUTES.map(({ slug, product, Component }) => (
          <Route
            key={slug}
            path={`/rehearse/${slug}`}
            element={
              <EntitlementRoute product={product}>
                <Suspense fallback={rehearsalFallback}>
                  <Component />
                </Suspense>
              </EntitlementRoute>
            }
          />
        ))}

        {/* Marketing site routes */}
        <Route path="/" element={<MarketingLayout><Home /></MarketingLayout>} />
        <Route path="/refunds" element={<MarketingLayout><Refunds /></MarketingLayout>} />
        <Route path="/privacy" element={<MarketingLayout><Privacy /></MarketingLayout>} />
        <Route path="/terms" element={<MarketingLayout><Terms /></MarketingLayout>} />
        <Route path="/contact" element={<MarketingLayout><Contact /></MarketingLayout>} />
        <Route path="/signin" element={<MarketingLayout><SignIn /></MarketingLayout>} />
        <Route path="/checkout/:slug" element={<MarketingLayout><Checkout /></MarketingLayout>} />

        <Route path="/probation-blueprint" element={<MarketingLayout><ProbationBlueprint /></MarketingLayout>} />
        <Route path="/ai-ready" element={<MarketingLayout><AIReady /></MarketingLayout>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MarketingLayout><Dashboard /></MarketingLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/probation-blueprint/checkout" element={<Navigate to="/checkout/probation-blueprint" replace />} />
        <Route path="/ai-ready/checkout" element={<Navigate to="/checkout/ai-ready" replace />} />

        <Route path="*" element={<MarketingLayout><NotFound /></MarketingLayout>} />
      </Routes>
    </>
  )
}
