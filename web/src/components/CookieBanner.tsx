import { useState } from 'react'

import { useModal } from '@/context/ModalContext'

const CK_KEY = 'vbs_ck'

export function CookieBanner() {
  const { openModal } = useModal()
  const [visible, setVisible] = useState(() => typeof localStorage === 'undefined' || !localStorage.getItem(CK_KEY))

  if (!visible) return null

  function acceptCookie() {
    setVisible(false)
    localStorage.setItem(CK_KEY, '1')
  }
  function closeCookie() {
    setVisible(false)
    localStorage.setItem(CK_KEY, '0')
  }

  return (
    <div id="cookie-banner">
      <p>
        We use cookies to improve your experience. See our{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            openModal('cookies-modal')
          }}
        >
          Cookie Policy
        </a>{' '}
        and{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            openModal('privacy-modal')
          }}
        >
          Privacy Policy
        </a>
        .
      </p>
      <div className="ck-btns">
        <button type="button" className="ck-decline" onClick={closeCookie}>
          Decline
        </button>
        <button type="button" className="ck-accept" onClick={acceptCookie}>
          Accept All
        </button>
      </div>
    </div>
  )
}
