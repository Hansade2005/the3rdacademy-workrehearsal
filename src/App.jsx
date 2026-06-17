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

const BridgeFastModule = lazy(() => import('./rehearsal/BridgeFastModule.jsx'))
const BridgeFastD2Module = lazy(() => import('./rehearsal/BridgeFastD2Module.jsx'))
const BridgeFastD3Module = lazy(() => import('./rehearsal/BridgeFastD3Module.jsx'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return // let in-page anchors work
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
        {/* BridgeFast™ rehearsal engine — full-screen, no marketing chrome */}
        <Route
          path="/rehearse/d1"
          element={
            <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#0E2233' }} />}>
              <BridgeFastModule />
            </Suspense>
          }
        />
        <Route
          path="/rehearse/d2"
          element={
            <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#0E2233' }} />}>
              <BridgeFastD2Module />
            </Suspense>
          }
        />
        <Route
          path="/rehearse/d3"
          element={
            <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#0E2233' }} />}>
              <BridgeFastD3Module />
            </Suspense>
          }
        />

        {/* Marketing site routes */}
        <Route path="/" element={<MarketingLayout><Home /></MarketingLayout>} />
        <Route path="/refunds" element={<MarketingLayout><Refunds /></MarketingLayout>} />
        <Route path="/privacy" element={<MarketingLayout><Privacy /></MarketingLayout>} />
        <Route path="/terms" element={<MarketingLayout><Terms /></MarketingLayout>} />
        <Route path="/contact" element={<MarketingLayout><Contact /></MarketingLayout>} />
        <Route path="/signin" element={<MarketingLayout><SignIn /></MarketingLayout>} />
        <Route path="/checkout/:slug" element={<MarketingLayout><Checkout /></MarketingLayout>} />

        {/* Legacy URL shapes from the original brief — redirect them */}
        <Route path="/probation-blueprint" element={<Navigate to="/#products" replace />} />
        <Route path="/ai-ready" element={<Navigate to="/#products" replace />} />
        <Route path="/probation-blueprint/checkout" element={<Navigate to="/checkout/probation-blueprint" replace />} />
        <Route path="/ai-ready/checkout" element={<Navigate to="/checkout/ai-ready" replace />} />

        <Route path="*" element={<MarketingLayout><NotFound /></MarketingLayout>} />
      </Routes>
    </>
  )
}
