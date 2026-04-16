import { type ReactNode } from 'react'

import { useModal, type ModalId } from '@/context/ModalContext'

function ModalFrame({
  id,
  title,
  children,
}: {
  id: ModalId
  title: string
  children: ReactNode
}) {
  const { activeId, closeModal } = useModal()
  const open = activeId === id
  return (
    <div
      className={'modal-overlay' + (open ? ' active' : '')}
      id={id}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(id)
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="modal-x" onClick={() => closeModal(id)}>
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export function LegalModals() {
  return (
    <>
      <ModalFrame id="terms-modal" title="Terms & Conditions">
        <div className="modal-date">📄 Last updated: 1 January 2025</div>
        <h3>1. Introduction</h3>
        <p>
          These Terms and Conditions govern your use of the Valadares Builders Solutions Ltd
          (&quot;VBS&quot;) website and any services provided by VBS. By accessing this Website or
          engaging our services, you agree to be bound by these Terms in full.
        </p>
        <p>
          We reserve the right to update these Terms at any time. Continued use of the Website
          constitutes acceptance of revised Terms.
        </p>
        <div className="modal-divider" />
        <h3>2. Services</h3>
        <p>
          VBS provides construction, renovation, project management, architectural design, and
          related building services. All services are subject to a separate written contract agreed
          between VBS and the client prior to commencement of any work.
        </p>
        <ul>
          <li>Services described on this Website are for informational purposes and do not constitute a binding offer.</li>
          <li>Quotations are valid for 30 days from the date of issue unless otherwise stated in writing.</li>
          <li>VBS reserves the right to decline any project at its absolute discretion.</li>
          <li>All projects require a signed contract and, where applicable, a deposit prior to commencement.</li>
        </ul>
        <div className="modal-divider" />
        <h3>3. Intellectual Property</h3>
        <p>
          All content on this Website — including text, graphics, logos, photographs, architectural
          drawings, and software — is the exclusive intellectual property of VBS or its licensors
          and is protected by UK and international copyright law. You may not reproduce, distribute,
          or modify any content without prior written permission.
        </p>
        <div className="modal-divider" />
        <h3>4. Enquiry Form & Communications</h3>
        <p>
          Information submitted through our enquiry form is used solely to respond to your enquiry.
          Submitting an enquiry does not create a contractual relationship. We aim to respond within
          24 business hours but cannot guarantee response times.
        </p>
        <div className="modal-divider" />
        <h3>5. Limitation of Liability</h3>
        <p>
          To the maximum extent permitted by applicable law, VBS shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages. Our total liability for
          any claim shall not exceed the total amount paid to VBS in the 12 months preceding the
          claim.
        </p>
        <div className="modal-divider" />
        <h3>6. Governing Law</h3>
        <p>
          These Terms are governed by the laws of England and Wales. Any disputes shall be subject
          to the exclusive jurisdiction of the courts of England and Wales.
        </p>
        <div className="modal-divider" />
        <h3>7. Contact</h3>
        <p>For questions about these Terms: legal@valadaresbuilders.com | 123 Builder&apos;s Row, London, United Kingdom.</p>
      </ModalFrame>

      <ModalFrame id="privacy-modal" title="Privacy Policy">
        <div className="modal-date">🔒 Last updated: 1 January 2025 · UK GDPR Compliant</div>
        <h3>1. Who We Are</h3>
        <p>
          Valadares Builders Solutions Ltd is the data controller for your personal data. We are
          committed to protecting your privacy in accordance with the UK GDPR and the Data
          Protection Act 2018. Contact: privacy@valadaresbuilders.com.
        </p>
        <div className="modal-divider" />
        <h3>2. Data We Collect</h3>
        <ul>
          <li>
            <strong>Identity Data:</strong> First name, last name, title.
          </li>
          <li>
            <strong>Contact Data:</strong> Email address, phone number, postal address.
          </li>
          <li>
            <strong>Project Data:</strong> Details about your construction project, budget range, and requirements.
          </li>
          <li>
            <strong>Technical Data:</strong> IP address, browser type, pages visited, time on site (via cookies).
          </li>
          <li>
            <strong>Marketing Preferences:</strong> Your preferences regarding marketing communications.
          </li>
        </ul>
        <div className="modal-divider" />
        <h3>3. How We Use Your Data</h3>
        <ul>
          <li>To respond to your enquiry and provide our construction services.</li>
          <li>To send you quotations, project updates, and contract documentation.</li>
          <li>To comply with our legal and regulatory obligations.</li>
          <li>To send marketing communications where you have provided consent.</li>
          <li>To improve our Website through analytics.</li>
        </ul>
        <div className="modal-divider" />
        <h3>4. Legal Basis for Processing</h3>
        <ul>
          <li>
            <strong>Contract performance:</strong> Processing necessary to perform a contract with you.
          </li>
          <li>
            <strong>Legitimate interests:</strong> Improving our services and communicating with prospective clients.
          </li>
          <li>
            <strong>Consent:</strong> For marketing communications and non-essential cookies.
          </li>
          <li>
            <strong>Legal obligation:</strong> Where required by law or regulation.
          </li>
        </ul>
        <div className="modal-divider" />
        <h3>5. Data Retention</h3>
        <p>
          Enquiry data is retained for 24 months. Client project data is retained for 7 years for
          legal purposes. Technical data from cookies is retained as specified in our Cookie Policy.
        </p>
        <div className="modal-divider" />
        <h3>6. Your Rights</h3>
        <p>
          Under UK GDPR you have the right to: access, rectification, erasure, restriction of
          processing, data portability, objection, and withdrawal of consent. Contact
          privacy@valadaresbuilders.com. You may also lodge a complaint with the ICO at ico.org.uk.
        </p>
        <div className="modal-divider" />
        <h3>7. Data Security</h3>
        <p>
          We implement appropriate technical and organisational measures to protect your personal
          data. See our Security Policy for full details.
        </p>
      </ModalFrame>

      <ModalFrame id="cookies-modal" title="Cookie Policy">
        <div className="modal-date">🍪 Last updated: 1 January 2025</div>
        <h3>What Are Cookies?</h3>
        <p>
          Cookies are small text files placed on your device when you visit a website. They allow the
          website to recognise your device and store certain information about your preferences or
          past actions.
        </p>
        <div className="modal-divider" />
        <h3>Strictly Necessary Cookies</h3>
        <p>
          Essential for the Website to function. These cannot be switched off and do not store
          personally identifiable information.
        </p>
        <ul>
          <li>
            <strong>session_id:</strong> Maintains your session state. Expires at end of browser session.
          </li>
          <li>
            <strong>cookie_consent:</strong> Stores your cookie consent preference. Expires after 12 months.
          </li>
        </ul>
        <div className="modal-divider" />
        <h3>Analytics Cookies</h3>
        <p>
          Allow us to count visits and traffic sources to measure and improve our Website. All
          information collected is aggregated and anonymous. Requires your consent.
        </p>
        <ul>
          <li>
            <strong>_ga, _gid:</strong> Google Analytics identifiers to distinguish users. Expires 2 years / 24 hours.
          </li>
          <li>
            <strong>_gat:</strong> Used to throttle request rate. Expires after 1 minute.
          </li>
        </ul>
        <div className="modal-divider" />
        <h3>Marketing Cookies</h3>
        <p>Set by advertising partners to build a profile of your interests. Requires your consent.</p>
        <ul>
          <li>
            <strong>_fbp:</strong> Facebook Pixel tracking. Expires after 3 months.
          </li>
          <li>
            <strong>ads/ga-audiences:</strong> Google Ads remarketing. Session-based.
          </li>
        </ul>
        <div className="modal-divider" />
        <h3>Managing Cookies</h3>
        <p>
          You can control and delete cookies through your browser settings. Note that disabling
          cookies may affect Website functionality. For more information, visit www.aboutcookies.org.
        </p>
      </ModalFrame>

      <ModalFrame id="security-modal" title="Security Policy">
        <div className="modal-date">🛡️ Last updated: 1 January 2025 · ISO 27001 Aligned</div>
        <h3>Our Commitment</h3>
        <p>
          VBS is committed to protecting the security of your personal data. We adopt a risk-based
          approach aligned with ISO/IEC 27001 and the UK NCSC guidelines.
        </p>
        <div className="modal-divider" />
        <h3>Technical Measures</h3>
        <ul>
          <li>
            <strong>TLS/SSL Encryption:</strong> All data in transit is encrypted using TLS 1.2 or higher.
          </li>
          <li>
            <strong>Secure Hosting:</strong> Enterprise-grade servers with physical and logical access controls.
          </li>
          <li>
            <strong>WAF & IDS:</strong> Web application firewalls and intrusion detection systems monitor all traffic.
          </li>
          <li>
            <strong>Annual Penetration Testing:</strong> Performed by independent certified security professionals.
          </li>
          <li>
            <strong>Encryption at Rest:</strong> Sensitive data is encrypted using AES-256.
          </li>
          <li>
            <strong>Vulnerability Management:</strong> Regular patching schedule across all software dependencies.
          </li>
        </ul>
        <div className="modal-divider" />
        <h3>Organisational Measures</h3>
        <ul>
          <li>
            <strong>Access Controls:</strong> Data access restricted on a need-to-know basis.
          </li>
          <li>
            <strong>Staff Training:</strong> Annual security and data protection training for all staff.
          </li>
          <li>
            <strong>Multi-Factor Authentication:</strong> Required for all internal systems containing personal data.
          </li>
          <li>
            <strong>Third-Party Vetting:</strong> All data processors subject to rigorous due diligence and data processing agreements.
          </li>
          <li>
            <strong>Incident Response:</strong> Documented plan with ICO notification within 72 hours where required.
          </li>
        </ul>
        <div className="modal-divider" />
        <h3>Responsible Disclosure</h3>
        <p>
          If you discover a security vulnerability, please report it to security@valadaresbuilders.com.
          We acknowledge reports within 48 hours and commit to responsible remediation before any
          public disclosure.
        </p>
        <div className="modal-divider" />
        <h3>Contact</h3>
        <p>Security enquiries: security@valadaresbuilders.com | Data protection: privacy@valadaresbuilders.com</p>
      </ModalFrame>
    </>
  )
}
