import { useEffect } from 'react'

export function useHeroVideo() {
  useEffect(() => {
    const v = document.querySelector('.hero-video') as HTMLVideoElement | null
    if (!v) return
    const kick = () => {
      v.play().catch(() => {})
    }
    v.addEventListener('loadeddata', kick, { once: true })
    v.addEventListener('canplay', kick, { once: true })
    const vis = () => {
      if (!document.hidden) kick()
    }
    document.addEventListener('visibilitychange', vis)
    kick()
    return () => document.removeEventListener('visibilitychange', vis)
  }, [])
}
