import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <Link to="/" className="logo" aria-label="WorkRehearsal home">
              <span className="logo-mark"><span className="logo-dot"></span></span>
              <span className="logo-text">WorkRehearsal</span>
            </Link>
            <p className="footer-brand-text">
              Rehearse the workplace moments that decide your job. A product of The 3rd Academy Inc., Canada.
            </p>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><Link to="/#products">Probation Blueprint™</Link></li>
              <li><Link to="/#products">AI-Ready Behaviours™</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/#faq">FAQ</Link></li>
              <li><Link to="/refunds">Refunds</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><a href="https://the3rdacademy.com" target="_blank" rel="noreferrer">The 3rd Academy</a></li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark — gallery exhibit close */}
        <div className="footer-wordmark" aria-hidden="true">
          Work<em>Rehearsal</em>
        </div>

        <div className="footer-bottom">
          <span>© 2026 The 3rd Academy Inc.</span>
          <span style={{ textAlign: 'center' }}>
            EN at launch · FR, ES, ZH coming soon
          </span>
          <span className="micro">
            Practice and development only. Not behavioural documentation.
          </span>
        </div>
      </div>
    </footer>
  )
}
