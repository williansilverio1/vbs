import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import type { BentoGalleryItem } from '@/data/constructionInProgressMedia'
import { cn } from '@/lib/utils'

export type { BentoGalleryItem }

export interface InteractiveImageBentoGalleryProps {
  imageItems: BentoGalleryItem[]
  title: string
  description: string
  sectionId?: string
}

/** Above fixed header (1000) and legal modals overlay (9998); full-screen lightbox should sit on top. */
const LIGHTBOX_Z = 10100

const navBtnClass =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-black/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 md:h-12 md:w-12'

function GalleryLightbox({
  items,
  index,
  onClose,
  onGoTo,
}: {
  items: BentoGalleryItem[]
  index: number
  onClose: () => void
  onGoTo: (i: number) => void
}) {
  const close = useCallback(() => onClose(), [onClose])
  const n = items.length
  const safe = ((index % n) + n) % n
  const item = items[safe]
  const prevIndex = (safe - 1 + n) % n
  const nextIndex = (safe + 1) % n
  const prevItem = items[prevIndex]
  const nextItem = items[nextIndex]

  const goPrev = useCallback(() => onGoTo(prevIndex), [onGoTo, prevIndex])
  const goNext = useCallback(() => onGoTo(nextIndex), [onGoTo, nextIndex])

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [close, goPrev, goNext])

  if (typeof document === 'undefined' || n === 0) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex flex-col bg-black/82 backdrop-blur-md"
      style={{ zIndex: LIGHTBOX_Z }}
      onClick={close}
      role="presentation"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          close()
        }}
        className="fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-black/75 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 md:right-6 md:top-6 md:h-12 md:w-12"
        style={{ zIndex: LIGHTBOX_Z + 2 }}
        aria-label="Close gallery"
      >
        <X className="h-6 w-6" strokeWidth={1.75} />
      </button>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-14 py-20 sm:px-20 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Side peek — previous */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          className="absolute left-0 top-1/2 z-[1] hidden h-[min(52vh,420px)] w-[min(16vw,160px)] -translate-y-1/2 overflow-hidden rounded-r-lg border border-l-0 border-white/10 bg-black/30 md:block"
          aria-label="Previous"
        >
          {prevItem.kind === 'image' ? (
            <img
              src={prevItem.url}
              alt=""
              className="h-full w-full scale-105 object-cover opacity-45 blur-[3px] transition-opacity hover:opacity-70"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black/50 text-[0.65rem] font-medium uppercase tracking-wider text-white/40">
              Video
            </div>
          )}
        </button>

        {/* Side peek — next */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          className="absolute right-0 top-1/2 z-[1] hidden h-[min(52vh,420px)] w-[min(16vw,160px)] -translate-y-1/2 overflow-hidden rounded-l-lg border border-r-0 border-white/10 bg-black/30 md:block"
          aria-label="Next"
        >
          {nextItem.kind === 'image' ? (
            <img
              src={nextItem.url}
              alt=""
              className="h-full w-full scale-105 object-cover opacity-45 blur-[3px] transition-opacity hover:opacity-70"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black/50 text-[0.65rem] font-medium uppercase tracking-wider text-white/40">
              Video
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          className={cn(navBtnClass, 'absolute left-3 top-1/2 z-[3] -translate-y-1/2 md:left-6')}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={1.75} />
        </button>

        <div className="relative z-0 mx-auto flex w-full max-w-5xl flex-col items-center px-2">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {item.kind === 'video' ? (
              <video
                src={item.url}
                controls
                autoPlay
                playsInline
                className="max-h-[min(78vh,820px)] w-full rounded-xl bg-black object-contain shadow-2xl"
                aria-label={item.title}
              />
            ) : (
              <img
                src={item.url}
                alt={item.title}
                className="max-h-[min(78vh,820px)] w-full rounded-xl object-contain shadow-2xl"
              />
            )}
          </motion.div>
          <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/88 md:text-[0.95rem]">
            {item.desc}
          </p>
          <p className="mt-1 text-xs text-white/45">
            {safe + 1} / {n}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          className={cn(navBtnClass, 'absolute right-3 top-1/2 z-[3] -translate-y-1/2 md:right-6')}
          aria-label="Next image"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={1.75} />
        </button>
      </div>
    </motion.div>,
    document.body,
  )
}

export function InteractiveImageBentoGallery({
  imageItems,
  title,
  description,
  sectionId,
}: InteractiveImageBentoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLElement>(null)

  /** Vertical wheel / trackpad → horizontal scroll (only when there is room to scroll that way). */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      const absY = Math.abs(e.deltaY)
      const absX = Math.abs(e.deltaX)
      if (absY <= absX) return

      const max = Math.max(0, el.scrollWidth - el.clientWidth)
      if (max < 1) return

      const next = el.scrollLeft + e.deltaY
      if (e.deltaY > 0 && el.scrollLeft >= max - 0.5) return
      if (e.deltaY < 0 && el.scrollLeft <= 0.5) return

      e.preventDefault()
      el.scrollLeft = Math.max(0, Math.min(max, next))
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [imageItems.length])

  const onGalleryKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    const step = Math.min(360, Math.max(240, el.clientWidth * 0.35))
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      el.scrollBy({ left: -step, behavior: 'smooth' })
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      el.scrollBy({ left: step, behavior: 'smooth' })
    } else if (e.key === 'Home') {
      e.preventDefault()
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (e.key === 'End') {
      e.preventDefault()
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [24, 0])

  return (
    <section
      ref={targetRef}
      id={sectionId}
      className="relative w-full overflow-hidden bg-[var(--cream)] py-16 sm:py-24"
    >
      <motion.div style={{ opacity, y }} className="container mx-auto max-w-4xl px-4 text-center">
        <p className="label mb-2">✦ On site</p>
        <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15] tracking-[-0.02em] text-charcoal">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--slate)] sm:text-lg">
          {description}
        </p>
        <p className="mt-2 text-xs text-[var(--slate)]/80 md:text-sm">
          Scroll sideways with a mouse wheel, trackpad, or touch. Use arrow keys when the gallery is focused. Click any
          tile for full size.
        </p>
      </motion.div>

      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="Works in progress gallery. Scroll horizontally."
        onKeyDown={onGalleryKeyDown}
        className={cn(
          'relative mt-12 min-h-[min(280px,45vh)] w-full',
          'overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth',
          'pb-3 pt-1 [-ms-overflow-style:auto] [scrollbar-color:rgba(184,148,59,0.5)_rgba(0,0,0,0.06)] [scrollbar-width:thin]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]',
        )}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="grid w-max auto-cols-[minmax(15rem,1fr)] grid-flow-col gap-4 px-4 md:px-8">
            {imageItems.map((item, i) => (
              <motion.div
                key={item.id}
                className={cn(
                  'group relative flex min-h-[15rem] w-full min-w-[15rem] cursor-pointer items-end overflow-hidden rounded-xl border border-[var(--border)] bg-white/50 p-4 shadow-sm backdrop-blur-[2px] transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]',
                  item.span,
                )}
                initial={false}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                onClick={() => setLightboxIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLightboxIndex(i)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
              >
                {item.kind === 'video' ? (
                  <video
                    src={item.url}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    aria-hidden
                  />
                ) : (
                  <img
                    src={item.url}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/85">{item.desc}</p>
                  {item.kind === 'video' ? (
                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/70">Video</p>
                  ) : null}
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          items={imageItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onGoTo={setLightboxIndex}
        />
      ) : null}
    </section>
  )
}

export default InteractiveImageBentoGallery
