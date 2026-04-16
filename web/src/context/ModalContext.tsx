import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ModalId =
  | 'terms-modal'
  | 'privacy-modal'
  | 'cookies-modal'
  | 'security-modal'
  | 'blog-structural-survey'
  | 'blog-sustainability-uk'
  | 'blog-extension-budget'

type ModalContextValue = {
  openModal: (id: ModalId) => void
  closeModal: (id: ModalId) => void
  activeId: ModalId | null
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<ModalId | null>(null)

  const openModal = useCallback((id: ModalId) => {
    setActiveId(id)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback((id: ModalId) => {
    setActiveId((cur) => {
      if (cur !== id) return cur
      document.body.style.overflow = ''
      return null
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveId(null)
        document.body.style.overflow = ''
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(
    () => ({ openModal, closeModal, activeId }),
    [openModal, closeModal, activeId],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

/** @see https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports */
// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
