/** Same rules as static index.html — order follows manifest.json */

export function parseManifestJson(data: unknown): string[] {
  const raw = Array.isArray(data)
    ? data
    : data && typeof data === 'object' && 'images' in data && Array.isArray((data as { images: unknown }).images)
      ? (data as { images: unknown[] }).images
      : []
  return raw.filter(
    (f: unknown): f is string =>
      typeof f === 'string' && Boolean(f) && !f.includes('..') && !f.includes('/'),
  )
}

export function filesToImageUrls(files: string[]): string[] {
  return files.map((f) => 'images/' + encodeURIComponent(f))
}

export async function fetchPortfolioImageUrls(): Promise<string[]> {
  const r = await fetch('/images/manifest.json', { cache: 'no-store' })
  if (!r.ok) throw new Error('manifest')
  const data = await r.json()
  const files = parseManifestJson(data)
  return filesToImageUrls(files)
}

export function splitThree(urls: string[]): [string[], string[], string[]] {
  const a: string[] = []
  const b: string[] = []
  const c: string[] = []
  urls.forEach((u, i) => {
    if (i % 3 === 0) a.push(u)
    else if (i % 3 === 1) b.push(u)
    else c.push(u)
  })
  return [a, b, c]
}

export function titleFromFile(f: string): string {
  const s = String(f)
    .replace(/\.[^./\\]+$/, '')
    .replace(/[-_]+/g, ' ')
  return s || 'Project'
}
