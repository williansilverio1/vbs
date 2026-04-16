import * as React from 'react'

import { cn } from '@/lib/utils'

export type LazyImageProps = {
  alt: string
  src: string
  className?: string
  wrapClassName?: string
  fallback?: string
  ratio: number
  inView?: boolean
}

export function LazyImage({
  alt,
  src,
  ratio,
  fallback,
  inView = false,
  className,
  wrapClassName,
}: LazyImageProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(inView ? undefined : src)
  const [isLoading, setIsLoading] = React.useState(true)

  const handleError = () => {
    if (fallback) setImgSrc(fallback)
    setIsLoading(false)
  }

  const handleLoad = () => setIsLoading(false)

  React.useEffect(() => {
    if (!inView) return
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setImgSrc(src)
          obs.disconnect()
        }
      },
      { rootMargin: '120px', threshold: 0.01 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, src])

  React.useEffect(() => {
    if (imgRef.current?.complete) handleLoad()
  }, [imgSrc])

  return (
    <div
      ref={wrapRef}
      className={cn('relative w-full overflow-hidden bg-[var(--cream)]', wrapClassName)}
      style={{ aspectRatio: ratio }}
    >
      <div
        className={cn(
          'absolute inset-0 bg-[var(--gold-pale)]/40 transition-opacity duration-300',
          !isLoading && 'opacity-0',
        )}
        aria-hidden
      />
      {imgSrc ? (
        <img
          ref={imgRef}
          alt={alt}
          src={imgSrc}
          className={cn(
            'size-full object-cover opacity-0 transition-opacity duration-500',
            !isLoading && 'opacity-100',
            className,
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={inView ? 'lazy' : 'eager'}
          decoding="async"
        />
      ) : null}
    </div>
  )
}
