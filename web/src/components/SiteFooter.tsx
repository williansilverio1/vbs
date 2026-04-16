const FB_URL = 'https://www.facebook.com/share/1E6E6xGUMz/?mibextid=wwXIfr'
const IG_URL =
  'https://www.instagram.com/valadaresbuilders/?utm_source=ig_web_button_share_sheet'
const CONTACT_EMAIL = 'info@valadaresbuilders.com'
const COMPANY_NUMBER = '17156604'

export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-minimal">
          <div className="footer-minimal-inner">
            <a
              href={FB_URL}
              className="footer-minimal-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href={IG_URL}
              className="footer-minimal-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-minimal-link">
              {CONTACT_EMAIL}
            </a>
            <span className="footer-company-no">Company no. {COMPANY_NUMBER}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Valadares Builders Solutions Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
