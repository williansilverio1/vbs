import { useEffect } from 'react'

export function useHeaderNav() {
  useEffect(() => {
    function updateHeaderNav() {
      const y = window.scrollY
      const header = document.getElementById('site-header')
      if (header) header.classList.toggle('scrolled', y > 48)
      let current = ''
      document.querySelectorAll('section[id]').forEach((s) => {
        const el = s as HTMLElement
        if (y >= el.offsetTop - 140) current = el.getAttribute('id') || ''
      })
      document.querySelectorAll('.nav-links a').forEach((a) => {
        const link = a as HTMLAnchorElement
        link.classList.toggle('nav-active', link.getAttribute('href') === '#' + current)
        link.style.removeProperty('color')
      })
    }
    window.addEventListener('scroll', updateHeaderNav)
    updateHeaderNav()
    return () => window.removeEventListener('scroll', updateHeaderNav)
  }, [])
}
