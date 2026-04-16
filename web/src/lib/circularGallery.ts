import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

export interface CircImageData {
  title: string
  url: string
}

const CG_GAP = 10
const CG_R = 7
const CG_DURATION = 0.4
const CG_W = 400
const CG_H = 400
const CG_SCALE = 700
const CG_BIG = CG_R * CG_SCALE
const CG_OVERLAP = 0
const defaults = { transformOrigin: 'center center' }

function getPosSmall(id: number, total: number) {
  return {
    cx: CG_W / 2 - (total * (CG_R * 2 + CG_GAP) - CG_GAP) / 2 + id * (CG_R * 2 + CG_GAP),
    cy: CG_H - 30,
    r: CG_R,
  }
}
function getPosSmallAbove(id: number, total: number) {
  return {
    cx: CG_W / 2 - (total * (CG_R * 2 + CG_GAP) - CG_GAP) / 2 + id * (CG_R * 2 + CG_GAP),
    cy: CG_H / 2,
    r: CG_R * 2,
  }
}
function getPosCenter() {
  return { cx: CG_W / 2, cy: CG_H / 2, r: CG_R * 7 }
}
function getPosEnd() {
  return { cx: CG_W / 2 - CG_BIG + CG_OVERLAP, cy: CG_H / 2, r: CG_BIG }
}
function getPosStart() {
  return { cx: CG_W / 2 + CG_BIG - CG_OVERLAP, cy: CG_H / 2, r: CG_BIG }
}

function mountReducedMotion(mount: HTMLElement, images: CircImageData[]) {
  const wrap = document.createElement('div')
  wrap.className = 'circ-gallery-root'
  wrap.style.minHeight = 'auto'
  const inner = document.createElement('div')
  inner.style.display = 'grid'
  inner.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))'
  inner.style.gap = '14px'
  inner.style.maxWidth = '56rem'
  inner.style.margin = '0 auto'
  inner.style.padding = '8px clamp(12px, 4vw, 28px) 32px'
  images.forEach((it) => {
    const a = document.createElement('a')
    a.href = it.url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.setAttribute('aria-label', it.title)
    const img = document.createElement('img')
    img.src = it.url
    img.alt = it.title
    img.loading = 'lazy'
    img.decoding = 'async'
    img.style.width = '100%'
    img.style.aspectRatio = '1'
    img.style.objectFit = 'cover'
    img.style.borderRadius = '16px'
    img.style.boxShadow = 'var(--shadow-md)'
    a.appendChild(img)
    inner.appendChild(a)
  })
  wrap.appendChild(inner)
  mount.appendChild(wrap)
}

function buildCircularGallery(mount: HTMLElement, images: CircImageData[]): () => void {
  const total = images.length
  const uid = 'cg' + Math.random().toString(36).slice(2, 9)
  let opened = 0
  let inPlace = 0
  let disabled = false
  let autoplayTimer: number | null = null
  const clips: SVGCircleElement[] = []
  const groups: SVGGElement[] = []
  const layerEls: HTMLDivElement[] = []

  const root = document.createElement('div')
  root.className = 'circ-gallery-root'

  const frame = document.createElement('div')
  frame.className = 'circ-gallery-frame'

  for (let i = 0; i < total; i++) {
    const layer = document.createElement('div')
    layer.className = 'circ-gallery-layer'
    layer.dataset.index = String(i)

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 ' + CG_W + ' ' + CG_H)
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice')
    svg.setAttribute('class', 'circ-gallery-svg')

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const cpathId = uid + '_' + i + '_circleClip'
    const spathId = uid + '_' + i + '_squareClip'

    const cp = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
    cp.setAttribute('id', cpathId)
    const circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circ.setAttribute('cx', '0')
    circ.setAttribute('cy', '0')
    circ.setAttribute('r', String(CG_R))
    cp.appendChild(circ)
    defs.appendChild(cp)

    const sp = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
    sp.setAttribute('id', spathId)
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('width', String(CG_W))
    rect.setAttribute('height', String(CG_H))
    sp.appendChild(rect)
    defs.appendChild(sp)

    svg.appendChild(defs)

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.setAttribute('clip-path', 'url(#' + cpathId + ')')

    const im = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    im.setAttribute('width', String(CG_W))
    im.setAttribute('height', String(CG_H))
    im.setAttribute('href', images[i].url)
    im.setAttributeNS('http://www.w3.org/1999/xlink', 'href', images[i].url)

    g.appendChild(im)
    svg.appendChild(g)
    layer.appendChild(svg)
    frame.appendChild(layer)

    clips.push(circ)
    groups.push(g)
    layerEls.push(layer)
  }

  function setGroupClip(idx: number, square: boolean) {
    const id = uid + '_' + idx + (square ? '_squareClip' : '_circleClip')
    groups[idx].setAttribute('clip-path', 'url(#' + id + ')')
  }

  function updateLayersZ() {
    for (let z = 0; z < total; z++) {
      layerEls[z].style.zIndex = inPlace === z ? String(z) : String(total + 1)
    }
  }

  function initPositions() {
    for (let j = 0; j < total; j++) {
      if (j === 0) {
        gsap.set(clips[j], { ...defaults, ...getPosEnd() })
        setGroupClip(j, true)
      } else {
        gsap.set(clips[j], { ...defaults, ...getPosSmall(j, total) })
        setGroupClip(j, false)
      }
    }
    opened = 0
    inPlace = 0
    disabled = false
    updateLayersZ()
  }

  function armAutoplay() {
    if (autoplayTimer) window.clearInterval(autoplayTimer)
    autoplayTimer = window.setInterval(() => {
      if (disabled || total < 2) return
      let n = opened + 1
      if (n >= total) n = 0
      onSelect(n)
    }, 4500)
  }

  function runOpen(idx: number) {
    const clip = clips[idx]
    setGroupClip(idx, false)
    gsap.set(clip, { ...defaults, ...getPosSmall(idx, total) })
    gsap
      .timeline()
      .to(clip, { ...defaults, ...getPosCenter(), duration: 0.2, ease: 'power3.inOut' })
      .to(clip, {
        ...defaults,
        ...getPosEnd(),
        duration: CG_DURATION,
        ease: 'power4.in',
        onComplete: () => {
          inPlace = idx
          setGroupClip(idx, true)
          updateLayersZ()
          disabled = false
          syncNavDisabled()
          armAutoplay()
        },
      })
  }

  function runClose(idx: number) {
    const clip = clips[idx]
    const closeDelay = CG_DURATION + 0.2
    setGroupClip(idx, false)
    gsap.set(clip, { ...defaults, ...getPosStart() })
    gsap
      .timeline({ overwrite: true })
      .to(clip, {
        ...defaults,
        ...getPosCenter(),
        delay: closeDelay,
        duration: CG_DURATION,
        ease: 'power4.out',
      })
      .to(clip, {
        ...defaults,
        ...getPosSmallAbove(idx, total),
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(clip, { ...defaults, ...getPosSmall(idx, total), duration: 0.6, ease: 'bounce.out' })
  }

  function onSelect(idx: number) {
    if (disabled || idx === opened) return
    disabled = true
    syncNavDisabled()
    if (autoplayTimer) window.clearInterval(autoplayTimer)
    const prev = opened
    opened = idx
    runClose(prev)
    runOpen(opened)
  }

  const tabLayer = document.createElement('div')
  tabLayer.className = 'circ-gallery-tabs-layer'
  const tabSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  tabSvg.setAttribute('viewBox', '0 0 ' + CG_W + ' ' + CG_H)
  tabSvg.setAttribute('preserveAspectRatio', 'xMidYMid slice')
  tabSvg.style.height = '100%'
  tabSvg.style.width = '100%'

  function getTabX(ti: number) {
    return CG_W / 2 - (total * (CG_R * 2 + CG_GAP) - CG_GAP) / 2 + ti * (CG_R * 2 + CG_GAP)
  }
  const tabY = CG_H - 30

  const tabDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
  for (let t = 0; t < total; t++) {
    const tcp = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
    tcp.setAttribute('id', uid + '_tab_' + t + '_clip')
    const tcirc = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    tcirc.setAttribute('cx', String(getTabX(t)))
    tcirc.setAttribute('cy', String(tabY))
    tcirc.setAttribute('r', String(CG_R))
    tcp.appendChild(tcirc)
    tabDefs.appendChild(tcp)
  }
  tabSvg.appendChild(tabDefs)

  for (let tj = 0; tj < total; tj++) {
    const idx = tj
    const gtab = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    gtab.setAttribute('class', 'cg-tab-hit')
    const tim = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    tim.setAttribute('x', String(getTabX(idx) - CG_R))
    tim.setAttribute('y', String(tabY - CG_R))
    tim.setAttribute('width', String(CG_R * 2))
    tim.setAttribute('height', String(CG_R * 2))
    tim.setAttribute('href', images[idx].url)
    tim.setAttributeNS('http://www.w3.org/1999/xlink', 'href', images[idx].url)
    tim.setAttribute('clip-path', 'url(#' + uid + '_tab_' + idx + '_clip)')
    tim.setAttribute('preserveAspectRatio', 'xMidYMid slice')
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    hit.setAttribute('cx', String(getTabX(idx)))
    hit.setAttribute('cy', String(tabY))
    hit.setAttribute('r', String(CG_R + 2))
    hit.setAttribute('fill', 'rgba(255,255,255,0)')
    hit.setAttribute('stroke', 'rgba(255,255,255,0.75)')
    hit.setAttribute('stroke-width', '2')
    hit.style.cursor = 'pointer'
    hit.addEventListener('click', () => onSelect(idx))
    gtab.appendChild(tim)
    gtab.appendChild(hit)
    tabSvg.appendChild(gtab)
  }
  tabLayer.appendChild(tabSvg)
  frame.appendChild(tabLayer)

  const btnPrev = document.createElement('button')
  btnPrev.type = 'button'
  btnPrev.className = 'circ-gallery-nav circ-gallery-nav--prev'
  btnPrev.setAttribute('aria-label', 'Previous image')
  btnPrev.innerHTML =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>'

  const btnNext = document.createElement('button')
  btnNext.type = 'button'
  btnNext.className = 'circ-gallery-nav circ-gallery-nav--next'
  btnNext.setAttribute('aria-label', 'Next image')
  btnNext.innerHTML =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>'

  function syncNavDisabled() {
    btnPrev.disabled = disabled
    btnNext.disabled = disabled
  }

  btnPrev.addEventListener('click', () => {
    if (disabled) return
    let p = opened - 1
    if (p < 0) p = total - 1
    onSelect(p)
  })
  btnNext.addEventListener('click', () => {
    if (disabled) return
    let n = opened + 1
    if (n >= total) n = 0
    onSelect(n)
  })

  root.appendChild(frame)
  root.appendChild(btnPrev)
  root.appendChild(btnNext)
  mount.appendChild(root)

  initPositions()
  syncNavDisabled()
  armAutoplay()

  return () => {
    if (autoplayTimer) window.clearInterval(autoplayTimer)
    mount.innerHTML = ''
  }
}

export function showCircEmpty(mount: HTMLElement) {
  mount.innerHTML =
    '<div class="circ-gallery-empty">No images yet. Add files to the <code>images/</code> folder and update <code>images/manifest.json</code>.</div>'
}

/** Returns cleanup, or null if reduced-motion grid mounted (still returns cleanup clearing mount) */
export function mountCircularGalleryRoot(mount: HTMLElement, images: CircImageData[]): () => void {
  mount.innerHTML = ''
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    mountReducedMotion(mount, images)
    return () => {
      mount.innerHTML = ''
    }
  }
  try {
    return buildCircularGallery(mount, images)
  } catch {
    mount.innerHTML = ''
    mountReducedMotion(mount, images)
    return () => {
      mount.innerHTML = ''
    }
  }
}
