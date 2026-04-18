/** Filenames under /images/newimages (copied from repo `images/newimages`). */

const FILES = [
  'PHOTO-2026-04-16-21-35-23 2.jpg',
  'PHOTO-2026-04-16-21-35-23.jpg',
  'PHOTO-2026-04-16-21-35-36 2.jpg',
  'PHOTO-2026-04-16-21-35-36 3.jpg',
  'PHOTO-2026-04-16-21-35-36.jpg',
  'PHOTO-2026-04-16-21-35-39 2.jpg',
  'PHOTO-2026-04-16-21-35-39 3.jpg',
  'PHOTO-2026-04-16-21-35-39.jpg',
  'PHOTO-2026-04-16-21-35-41 2.jpg',
  'PHOTO-2026-04-16-21-35-41.jpg',
  'PHOTO-2026-04-16-21-35-42 2.jpg',
  'PHOTO-2026-04-16-21-35-42 3.jpg',
  'PHOTO-2026-04-16-21-35-42 4.jpg',
  'PHOTO-2026-04-16-21-35-42 5.jpg',
  'PHOTO-2026-04-16-21-35-42.jpg',
  'PHOTO-2026-04-16-21-35-43 2.jpg',
  'PHOTO-2026-04-16-21-35-43 3.jpg',
  'PHOTO-2026-04-16-21-35-43.jpg',
  'VIDEO-2026-04-16-21-35-26.mp4',
  'VIDEO-2026-04-16-21-35-31.mp4',
  'VIDEO-2026-04-16-21-35-35.mp4',
  'VIDEO-2026-04-16-21-35-37.mp4',
  'VIDEO-2026-04-16-21-35-38.mp4',
  'VIDEO-2026-04-16-21-35-40.mp4',
] as const

export type GalleryMediaKind = 'image' | 'video'

export type GalleryMediaItem = {
  src: string
  kind: GalleryMediaKind
  alt: string
}

/** Items for `InteractiveImageBentoGallery` — spans cycle for a varied bento strip. */
export type BentoGalleryItem = {
  id: string
  title: string
  desc: string
  url: string
  span: string
  kind: GalleryMediaKind
}

function fileToUrl(name: string): string {
  return '/images/newimages/' + encodeURIComponent(name)
}

function fileToAlt(name: string): string {
  const base = name.replace(/\.[^.]+$/, '').replace(/\s+\d+$/, '')
  const isVideo = name.toLowerCase().endsWith('.mp4')
  return isVideo ? `Construction progress video — ${base}` : `Construction progress — ${base}`
}

export const constructionInProgressItems: GalleryMediaItem[] = FILES.map((name) => ({
  src: fileToUrl(name),
  kind: name.toLowerCase().endsWith('.mp4') ? 'video' : 'image',
  alt: fileToAlt(name),
}))

const BENTO_SPANS = [
  'md:col-span-2 md:row-span-2 min-h-[18rem]',
  'md:row-span-1 min-h-[15rem]',
  'md:row-span-1 min-h-[15rem]',
  'md:row-span-2 min-h-[20rem]',
  'md:col-span-2 md:row-span-1 min-h-[14rem]',
] as const

const BENTO_DESCS = [
  'Steel, concrete, and coordination on a live UK site.',
  'Groundworks and plant moving in rhythm with the programme.',
  'First-fix services and structure coming together.',
  'Interior strip-out and prep — before the next phase.',
  'Team on tools: safety first, quality every shift.',
  'Materials staged and ready for the next lift.',
  'Progress snapshot from the same week on site.',
] as const

export const constructionBentoItems: BentoGalleryItem[] = constructionInProgressItems.map((item, i) => ({
  id: `wip-${i}-${item.kind}`,
  url: item.src,
  kind: item.kind,
  title: item.kind === 'video' ? `Site video ${i + 1}` : `On-site progress ${i + 1}`,
  desc: BENTO_DESCS[i % BENTO_DESCS.length],
  span: BENTO_SPANS[i % BENTO_SPANS.length],
}))
