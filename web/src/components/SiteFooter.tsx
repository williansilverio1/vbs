import { useModal } from '@/context/ModalContext'

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
              <a href="#" className="f-social">
                in
              </a>
              <a href="#" className="f-social">
                📷
              </a>
              <a href="#" className="f-social">
                f
              </a>
              <a href="#" className="f-social">
                𝕏
              </a>
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
