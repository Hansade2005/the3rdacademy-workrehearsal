import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  /** Navigate to a home-page section regardless of current route. */
  const goToSection = (sectionId) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`)
      // After route change, scroll to section
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav>
      <div className="container">
        <div className="nav-inner">
          <Link to="/" className="logo" aria-label="WorkRehearsal home">
            <span className="logo-mark"><span className="logo-dot"></span></span>
            <span className="logo-text">Work<em>Rehearsal</em></span>
          </Link>

          <div className="nav-links">
            <Link to="/probation-blueprint">Probation Blueprint</Link>
            <Link to="/ai-ready">AI-Ready Behaviours</Link>
            <a href="/#how" onClick={goToSection('how')}>How it works</a>
            <a href="/#who" onClick={goToSection('who')}>Who it's for</a>
            <a href="/#faq" onClick={goToSection('faq')}>FAQ</a>
            <Link to="/signin" className="nav-cta">Sign in</Link>
          </div>

          <button
            className="mobile-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <i className={open ? 'ti ti-x' : 'ti ti-menu-2'}></i>
          </button>
        </div>

        <div className={`mobile-menu${open ? ' open' : ''}`}>
          <Link to="/probation-blueprint">Probation Blueprint</Link>
          <Link to="/ai-ready">AI-Ready Behaviours</Link>
          <a href="/#how" onClick={goToSection('how')}>How it works</a>
          <a href="/#who" onClick={goToSection('who')}>Who it's for</a>
          <a href="/#faq" onClick={goToSection('faq')}>FAQ</a>
          <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </nav>
  )
}
