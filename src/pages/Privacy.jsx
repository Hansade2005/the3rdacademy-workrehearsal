export default function Privacy() {
  return (
    <div className="policy-page">
      <div className="container-narrow">
        <p className="policy-eyebrow">Privacy Policy</p>
        <h1 className="policy-title">Privacy &amp; <em>your data</em></h1>
        <p className="policy-meta">Effective May 14, 2026 · Last updated May 14, 2026 · DRAFT pending legal review</p>

        <div className="policy-section">
          <h2>1. Scope and Canadian regulatory context</h2>
          <p>
            This Privacy Policy describes how The 3rd Academy Inc. (&ldquo;T3A,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, retains, and discloses personal information through WorkRehearsal.com and the WorkRehearsal™ products (collectively, the &ldquo;Service&rdquo;).
          </p>
          <p>
            T3A is a Canadian company. We handle personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and, where applicable, the Alberta Personal Information Protection Act (PIPA). If you are in another jurisdiction, additional local rules may apply to you, and we will honour them where the law requires.
          </p>
        </div>

        <div className="policy-section">
          <h2>2. What we collect</h2>
          <h3>2.1 Account information</h3>
          <p>
            Name, email address, password (hashed), country of residence at signup, and the products you have purchased.
          </p>
          <h3>2.2 Rehearsal content</h3>
          <p>
            The text you write inside rehearsal modules — your decisions, your composed messages, your choices — and the time you spent inside each module. This is your private rehearsal record.
          </p>
          <h3>2.3 Operational data</h3>
          <p>
            Server logs, IP address at request time, browser user-agent, error events, and basic analytics about which pages and modules you access and when.
          </p>
          <h3>2.4 Payment data</h3>
          <p>
            We do not store full card numbers. Payments are processed by Stripe, Inc. Stripe's privacy practices govern card data; we receive only a payment reference, the amount, currency, and the email address used at checkout.
          </p>
        </div>

        <div className="policy-section">
          <h2>3. How we use what we collect</h2>
          <ul>
            <li>To deliver the rehearsal experience you purchased.</li>
            <li>To save your progress and let you resume.</li>
            <li>To send transactional emails (receipts, password resets, important product notices).</li>
            <li>To improve the Service through aggregated, de-identified usage analysis.</li>
            <li>To prevent abuse, debug errors, and maintain operational security.</li>
            <li>To honour our legal obligations.</li>
          </ul>
          <p>
            We do not use your rehearsal content to train public AI models. We do not sell your personal information. We do not share your rehearsal content with employers.
          </p>
        </div>

        <div className="policy-section">
          <h2>4. Cookies and similar technologies</h2>
          <p>
            We use a minimal set of first-party cookies for session management and basic anonymous analytics. We do not run third-party advertising trackers on the Service.
          </p>
        </div>

        <div className="policy-section">
          <h2>5. Service providers</h2>
          <p>
            We rely on a small number of vetted service providers to operate the Service. These currently include: Stripe (payments), an email delivery provider for transactional email, a cloud hosting provider, and our analytics provider. Each provider processes personal information only as needed to deliver its service to us and is bound by confidentiality obligations.
          </p>
        </div>

        <div className="policy-section">
          <h2>6. Retention</h2>
          <p>
            We retain account information and rehearsal content for as long as your account is active, plus a reasonable period afterward to support service continuity, dispute resolution, and our legal obligations. You can request deletion of your account at any time by emailing <a href="mailto:privacy@workrehearsal.com">privacy@workrehearsal.com</a>. Some operational logs are retained longer for security and audit purposes; these are kept in a form that minimizes personal information.
          </p>
        </div>

        <div className="policy-section">
          <h2>7. Your rights</h2>
          <p>
            Subject to applicable law, you have the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccuracies.</li>
            <li>Request deletion of your personal information.</li>
            <li>Withdraw consent for processing where consent is the legal basis.</li>
            <li>Lodge a complaint with the Office of the Privacy Commissioner of Canada or your provincial equivalent if you believe we have not handled your personal information appropriately.</li>
          </ul>
          <p>
            To exercise these rights, email <a href="mailto:privacy@workrehearsal.com">privacy@workrehearsal.com</a>. We will respond within the timelines required by applicable law.
          </p>
        </div>

        <div className="policy-section">
          <h2>8. Security</h2>
          <p>
            We use industry-standard technical and organizational measures to protect personal information, including encryption in transit, encryption at rest where supported by the underlying service, access controls, and routine review of our systems. No online service can guarantee absolute security, but we work to reduce the residual risk.
          </p>
        </div>

        <div className="policy-section">
          <h2>9. International data transfers</h2>
          <p>
            Some of our service providers are located outside of Canada, including in the United States and the European Union. Where this is the case, personal information may be transferred, processed, and stored in those jurisdictions and may be subject to legal access by foreign authorities in accordance with the laws there. We select providers that maintain reasonable protections consistent with this Policy.
          </p>
        </div>

        <div className="policy-section">
          <h2>10. Children</h2>
          <p>
            The Service is intended for adults in a professional context. We do not knowingly collect personal information from individuals under the age of 16. If you believe a child has provided us with personal information, please contact us and we will remove it.
          </p>
        </div>

        <div className="policy-section">
          <h2>11. Changes to this policy</h2>
          <p>
            We may update this Policy from time to time. Material changes will be communicated through the Service or by email to account holders. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision.
          </p>
        </div>

        <div className="policy-section">
          <h2>12. Contact</h2>
          <p>
            Privacy questions: <a href="mailto:privacy@workrehearsal.com">privacy@workrehearsal.com</a>
            <br />General support: <a href="mailto:support@workrehearsal.com">support@workrehearsal.com</a>
          </p>
        </div>

        {/* AMBER WARNING BLOCK — remove once lawyer-approved (per handoff brief Section 5) */}
        <div className="draft-warning" role="note" aria-label="Draft pending legal review">
          <h4>⚠ Draft pending Canadian corporate legal review</h4>
          <p>
            This page is a <strong>production draft</strong>. Before going live to paying customers, it must be reviewed by a Calgary corporate lawyer for PIPEDA / Alberta PIPA compliance language (Section 1), retention periods (Section 6), international data transfer disclosures (Section 9), and Privacy Commissioner references (Section 7). Estimated review time: 1&ndash;2 hours. <strong>Remove this block once lawyer-approved.</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
