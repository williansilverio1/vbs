import { VideoIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
  ContainerStagger,
} from '@/components/ui/animated-gallery'
import { splitThree } from '@/lib/portfolioManifest'

const imgClass =
  'aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-md border border-[var(--border-soft)]'

export function ProjectsSection({ imageUrls }: { imageUrls: string[] | undefined }) {
  const loaded = imageUrls !== undefined
  const list = imageUrls ?? []
  const hasImages = list.length > 0
  const [col1, col2, col3] = splitThree(list)

  return (
    <section id="projects" className="sec proj-scroll-section relative overflow-x-clip bg-[var(--cream)]">
      {!loaded ? (
        <div className="py-24 text-center text-[var(--slate)]" aria-busy="true">
          Loading portfolio…
        </div>
      ) : !hasImages ? (
        <div className="container py-16">
          <p className="proj-scroll-empty">
            No images yet. Add files to the <code>images/</code> folder and update{' '}
            <code>images/manifest.json</code>.
          </p>
        </div>
      ) : (
        <div className="relative">
          <ContainerStagger className="relative z-[2] -mb-12 mx-auto max-w-[42rem] place-self-center px-6 pt-8 text-center md:pt-12">
            <ContainerAnimated>
              <p className="label" style={{ marginBottom: 8 }}>
                ✦ Our Portfolio
              </p>
            </ContainerAnimated>
            <ContainerAnimated>
              <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15] tracking-[-0.02em] text-charcoal">
                Featured <span className="font-serif font-light text-gold not-italic">portfolio</span>
              </h2>
            </ContainerAnimated>
            <ContainerAnimated>
              <h2 className="mt-1 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15] tracking-[-0.02em] text-charcoal">
                of our recent work
              </h2>
            </ContainerAnimated>

            <ContainerAnimated className="my-4">
              <p className="text-[0.95rem] leading-[1.55] text-[var(--slate)]">
                A selection of projects across the UK — commercial, residential, and renovation.
                <br />
                Scroll to explore the gallery.
              </p>
            </ContainerAnimated>

            <ContainerAnimated className="flex flex-wrap items-center justify-center gap-3">
              <Button className="gap-1 bg-charcoal text-cream hover:bg-gold hover:text-charcoal" asChild>
                <a href="#contact">
                  Request a quote <VideoIcon className="size-4" aria-hidden />
                </a>
              </Button>
              <Button variant="link" className="h-auto p-0 text-gold underline-offset-4 hover:underline" asChild>
                <a href="#contact">Get in touch</a>
              </Button>
            </ContainerAnimated>
          </ContainerStagger>

          <div
            className="pointer-events-none absolute z-[1] h-[70vh] w-full"
            style={{
              background:
                'linear-gradient(to right, rgba(184,148,59,0.35), rgba(26,23,20,0.25), rgba(247,243,238,0.5))',
              filter: 'blur(84px)',
              mixBlendMode: 'multiply',
            }}
            aria-hidden
          />

          <ContainerScroll className="relative h-[350vh]">
            <ContainerSticky className="flex min-h-[100dvh] h-svh flex-col items-center overflow-hidden">
              <GalleryContainer className="max-h-[85vh] w-[min(100%,1420px)] max-w-full flex-1 min-h-0 gap-[clamp(6px,1.2vw,10px)] px-2 sm:px-4">
                <GalleryCol yRange={['-10%', '2%']} className="-mt-2">
                  {col1.map((src, index) => (
                    <img key={src} src={src} alt={'Portfolio ' + (index + 1)} loading="lazy" className={imgClass} />
                  ))}
                </GalleryCol>
                <GalleryCol className="mt-[-50%] max-md:mt-0" yRange={['15%', '5%']}>
                  {col2.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={'Portfolio ' + (col1.length + index + 1)}
                      loading="lazy"
                      className={imgClass}
                    />
                  ))}
                </GalleryCol>
                <GalleryCol yRange={['-10%', '2%']} className="-mt-2">
                  {col3.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={'Portfolio ' + (col1.length + col2.length + index + 1)}
                      loading="lazy"
                      className={imgClass}
                    />
                  ))}
                </GalleryCol>
              </GalleryContainer>
            </ContainerSticky>
          </ContainerScroll>
        </div>
      )}
    </section>
  )
}
