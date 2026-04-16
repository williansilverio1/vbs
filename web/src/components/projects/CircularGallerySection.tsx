import { useEffect, useRef } from 'react'

import { mountCircularGalleryRoot, showCircEmpty, type CircImageData } from '@/lib/circularGallery'
import { parseManifestJson, filesToImageUrls, titleFromFile } from '@/lib/portfolioManifest'

async function loadCircImages(): Promise<CircImageData[] | null> {
  try {
    const r = await fetch('/images/manifest.json', { cache: 'no-store' })
    if (!r.ok) throw new Error('manifest')
    const data = await r.json()
    const files = parseManifestJson(data)
    if (files.length === 0) return null
    return files.map((f) => ({
      title: titleFromFile(f),
      url: filesToImageUrls([f])[0],
    }))
  } catch {
    return null
  }
}

export function CircularGallerySection() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let cleanup: (() => void) | undefined

    loadCircImages().then((images) => {
      if (!mount.isConnected) return
      if (!images || images.length === 0) {
        showCircEmpty(mount)
        return
      }
      cleanup = mountCircularGalleryRoot(mount, images)
    })

    return () => {
      cleanup?.()
      mount.innerHTML = ''
    }
  }, [])

  return (
    <section id="portfolio-carousel" className="sec sec-alt circ-gallery-section">
      <div className="container">
        <div className="sec-head center reveal">
          <p className="label">✦ Closer look</p>
          <h2>Each project in detail</h2>
          <p
            style={{
              maxWidth: '36rem',
              margin: '0 auto',
              fontSize: '0.95rem',
              color: 'var(--slate)',
              lineHeight: 1.65,
            }}
          >
            Open each photo below — thumbnails at the bottom, or use the arrows. Same images as the
            gallery above.
          </p>
        </div>
      </div>
      <div className="circ-gallery-mount" id="circ-gallery-mount" aria-live="polite" ref={mountRef} />
    </section>
  )
}
