import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
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

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return // let in-page anchors work
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Checkout (placeholder until Stripe is wired in Phase 2) */}
          <Route path="/checkout/:slug" element={<Checkout />} />

          {/* Legacy URL shapes from the original brief — redirect them */}
          <Route
            path="/probation-blueprint"
            element={<Navigate to="/#products" replace />}
          />
          <Route
            path="/ai-ready"
            element={<Navigate to="/#products" replace />}
          />
          <Route
            path="/probation-blueprint/checkout"
            element={<Navigate to="/checkout/probation-blueprint" replace />}
          />
          <Route
            path="/ai-ready/checkout"
            element={<Navigate to="/checkout/ai-ready" replace />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
