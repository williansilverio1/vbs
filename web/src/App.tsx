import { useEffect, useState } from 'react'

import { BlogModals } from '@/components/BlogModals'
import { CookieBanner } from '@/components/CookieBanner'
import { LegalModals } from '@/components/LegalModals'
import { SiteHeader } from '@/components/SiteHeader'
import { ModalProvider } from '@/context/ModalContext'
import { useHeaderNav } from '@/hooks/useHeaderNav'
import { useHeroVideo } from '@/hooks/useHeroVideo'
import { useRevealObserver } from '@/hooks/useReveal'
import { fetchPortfolioImageUrls } from '@/lib/portfolioManifest'
import { HomePage } from '@/pages/HomePage'

function AppShell({ portfolioUrls }: { portfolioUrls: string[] | undefined }) {
  useRevealObserver()
  useHeaderNav()
  useHeroVideo()

  return (
    <>
      <CookieBanner />
      <SiteHeader />
      <HomePage portfolioUrls={portfolioUrls} />
      <LegalModals />
      <BlogModals />
    </>
  )
}

export default function App() {
  const [portfolioUrls, setPortfolioUrls] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    fetchPortfolioImageUrls()
      .then((u) => setPortfolioUrls(u))
      .catch(() => setPortfolioUrls([]))
  }, [])

  return (
    <ModalProvider>
      <AppShell portfolioUrls={portfolioUrls} />
    </ModalProvider>
  )
}
