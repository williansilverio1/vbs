import { useEffect } from 'react'

/** Match static IntersectionObserver for .reveal / .reveal-l / .reveal-r */
export function useRevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 },
    )
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  })
}
