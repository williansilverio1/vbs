import { useModal } from '@/context/ModalContext'

const FB_URL = 'https://www.facebook.com/share/1E6E6xGUMz/?mibextid=wwXIfr'
const IG_URL =
  'https://www.instagram.com/valadaresbuilders/?utm_source=ig_web_button_share_sheet'

/** Blue tile + white f (no transparent knock-out that shows the footer background). */
function IconFacebook() {
  return (
    <svg
      aria-hidden
      className="f-social-brand-svg"
      width={22}
      height={22}
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill="#1877F2"
        d="M29 0H3C1.35 0 0 1.35 0 3v26c0 1.65 1.35 3 3 3h13V19h-4v-5h4v-4c0-3.314 2.686-6 6-6h4v5h-2c-1.105 0-2 .895-2 2v3h6l-1 5h-5v13h10c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3z"
      />
      <path
        fill="#fff"
        d="M24 19l1-5h-6v-3c0-1.105.895-2 2-2h4V4h-4c-3.314 0-6 2.686-6 6v4H13v5h6v13h5V19h5z"
      />
    </svg>
  )
}

/** Instagram glyph on square 32 artboard; scales evenly with CSS width/height. */
function IconInstagram() {
  return (
    <svg
      aria-hidden
      className="f-social-brand-svg"
      width={22}
      height={22}
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="footer-instagram-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="0.25" stopColor="#e6683c" />
          <stop offset="0.5" stopColor="#dc2743" />
          <stop offset="0.75" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path
        fill="url(#footer-instagram-grad)"
        d="M16 3.19c3.46 0 3.89.01 5.24.07 1.25.06 2.05.25 2.83.54.77.29 1.43.68 2.08 1.33s1.04 1.31 1.33 2.08c.29.78.48 1.58.54 2.83.06 1.35.07 1.78.07 5.24s-.01 3.89-.07 5.24c-.06 1.25-.25 2.05-.54 2.83-.29.77-.68 1.43-1.33 2.08s-1.31 1.04-2.08 1.33c-.78.29-1.58.48-2.83.54-1.35.06-1.78.07-5.24.07s-3.89-.01-5.24-.07c-1.25-.06-2.05-.25-2.83-.54-.77-.29-1.43-.68-2.08-1.33s-1.04-1.31-1.33-2.08c-.29-.78-.48-1.58-.54-2.83-.06-1.35-.07-1.78-.07-5.24s.01-3.89.07-5.24c.06-1.25.25-2.05.54-2.83.29-.77.68-1.43 1.33-2.08s1.31-1.04 2.08-1.33c.78-.29 1.58-.48 2.83-.54 1.35-.06 1.78-.07 5.24-.07zM16 0c-3.54 0-3.98.01-5.37.07-1.69.08-2.86.34-3.88.72-1.05.4-1.95.94-2.82 1.81-.87.87-1.41 1.77-1.81 2.82-.38 1.02-.64 2.19-.72 3.88C.01 12.02 0 12.46 0 16s.01 3.98.07 5.37c.08 1.69.34 2.86.72 3.88.4 1.05.94 1.95 1.81 2.82.87.87 1.77 1.41 2.82 1.81 1.02.38 2.19.64 3.88.72 1.39.06 1.83.07 5.37.07s3.98-.01 5.37-.07c1.69-.08 2.86-.34 3.88-.72 1.05-.4 1.95-.94 2.82-1.81.87-.87 1.41-1.77 1.81-2.82.38-1.02.64-2.19.72-3.88.06-1.39.07-1.83.07-5.37s-.01-3.98-.07-5.37c-.08-1.69-.34-2.86-.72-3.88-.4-1.05-.94-1.95-1.81-2.82-.87-.87-1.77-1.41-2.82-1.81-1.02-.38-2.19-.64-3.88-.72C19.98.01 19.54 0 16 0zm0 7.78c-4.54 0-8.22 3.68-8.22 8.22s3.68 8.22 8.22 8.22 8.22-3.68 8.22-8.22-3.68-8.22-8.22-8.22zM16 21.34c-2.95 0-5.34-2.39-5.34-5.34s2.39-5.34 5.34-5.34 5.34 2.39 5.34 5.34-2.39 5.34-5.34 5.34zm7.94-13.88c0 1.06-.86 1.92-1.92 1.92s-1.92-.86-1.92-1.92.86-1.92 1.92-1.92 1.92.86 1.92 1.92z"
      />
    </svg>
  )
}

export function SiteFooter() {
  const { openModal } = useModal()

  return (
    <footer>
      <div className="container">
        <div className="footer-main">
          <div className="f-brand">
            <a href="#hero" className="logo-wrap" style={{ marginBottom: 6 }} aria-label="Valadares Builders Solutions — Home">
              <img
                className="logo-img"
                src="/valadares-logo.png"
                alt="Valadares Builders Solutions (VBS) logo"
                width={320}
                height={134}
                decoding="async"
                loading="lazy"
              />
            </a>
            <p>
              Building excellence since 2009. Premium construction, renovation, and project management across the United
              Kingdom.
            </p>
            <div className="f-socials">
              <a
                href={FB_URL}
                className="f-social-brand"
                aria-label="Valadares Builders on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="f-social-brand-icon" aria-hidden>
                  <IconFacebook />
                </span>
                <span>Facebook</span>
              </a>
              <a
                href={IG_URL}
                className="f-social-brand"
                aria-label="Valadares Builders on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="f-social-brand-icon" aria-hidden>
                  <IconInstagram />
                </span>
                <span>Instagram</span>
              </a>
            </div>
            <div className="f-brand-contact">
              <a href="mailto:info@valadaresbuilders.com">info@valadaresbuilders.com</a>
              <p className="f-company-no">Company number 17156604</p>
            </div>
          </div>
          <div className="f-col">
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h5>Services</h5>
            <ul>
              <li>
                <a href="#services">Residential Build</a>
              </li>
              <li>
                <a href="#services">Commercial Build</a>
              </li>
              <li>
                <a href="#services">Renovations</a>
              </li>
              <li>
                <a href="#services">Architecture</a>
              </li>
              <li>
                <a href="#services">Sustainability</a>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h5>Legal</h5>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    openModal('terms-modal')
                  }}
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    openModal('privacy-modal')
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    openModal('cookies-modal')
                  }}
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    openModal('security-modal')
                  }}
                >
                  Security Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Valadares Builders Solutions Ltd. All rights reserved. Registered in England &amp; Wales.</p>
          <div className="f-legal">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openModal('terms-modal')
              }}
            >
              Terms
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openModal('privacy-modal')
              }}
            >
              Privacy
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openModal('cookies-modal')
              }}
            >
              Cookies
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openModal('security-modal')
              }}
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
