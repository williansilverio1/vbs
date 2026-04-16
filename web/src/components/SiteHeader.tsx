import { useState } from 'react'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen((o) => !o)
  }

  return (
    <>
      <header id="site-header">
        <nav>
          <a href="#hero" className="logo-wrap" aria-label="Valadares Builders Solutions — Home">
            <img
              className="logo-img"
              src="/valadares-logo.png"
              alt="Valadares Builders Solutions (VBS) logo"
              width={320}
              height={134}
              decoding="async"
              fetchPriority="high"
            />
          </a>

          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#blog">Insights</a>
            </li>
            <li>
              <a href="#contact" className="nav-cta">
                Get in Touch
              </a>
            </li>
          </ul>
          <button
            type="button"
            className={'hamburger' + (menuOpen ? ' open' : '')}
            id="hamburger"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className={'mob-menu' + (menuOpen ? ' open' : '')} id="mob-menu">
        <a
          href="#about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </a>
        <a
          href="#services"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </a>
        <a
          href="#projects"
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </a>
        <a
          href="#blog"
          onClick={() => setMenuOpen(false)}
        >
          Insights
        </a>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Get in Touch
        </a>
      </div>
    </>
  )
}
