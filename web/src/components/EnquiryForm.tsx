import { type FormEvent, useState } from 'react'

import { useModal } from '@/context/ModalContext'

const ENQUIRY_DEBUG = import.meta.env.DEV

/** Same Google Apps Script Web App as root `index.html`. Override with `VITE_GOOGLE_SHEET_WEBAPP_URL` in `web/.env` if you deploy a new script version. */
const DEFAULT_ENQUIRY_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbw2oD_Ymhp6SS_zl5wIrncC59kutXG9DHiH7gstZcyyi5RpZH5dAbNkTAp8h2hYHvXu/exec'

const WEBAPP_URL = (
  (import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL as string | undefined)?.trim() ||
  DEFAULT_ENQUIRY_WEBAPP_URL
).trim()

function enqLog(...args: unknown[]) {
  if (ENQUIRY_DEBUG) console.log('[VBS enquiry]', ...args)
}
function enqWarn(...args: unknown[]) {
  if (ENQUIRY_DEBUG) console.warn('[VBS enquiry]', ...args)
}
function enqErr(...args: unknown[]) {
  if (ENQUIRY_DEBUG) console.error('[VBS enquiry]', ...args)
}

export function EnquiryForm() {
  const { openModal } = useModal()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const btn = form.querySelector('#enq-submit') as HTMLButtonElement | null

    if (!WEBAPP_URL || !WEBAPP_URL.startsWith('http')) {
      enqWarn('VITE_GOOGLE_SHEET_WEBAPP_URL missing or invalid')
      setError(
        'Configure VITE_GOOGLE_SHEET_WEBAPP_URL (see web/.env.example and Google Apps Script web app URL).',
      )
      return
    }

    const payload = {
      firstName: (form.querySelector('[name="firstName"]') as HTMLInputElement)?.value?.trim() || '',
      lastName: (form.querySelector('[name="lastName"]') as HTMLInputElement)?.value?.trim() || '',
      email: (form.querySelector('[name="email"]') as HTMLInputElement)?.value?.trim() || '',
      phone: (form.querySelector('[name="phone"]') as HTMLInputElement)?.value?.trim() || '',
      service: (form.querySelector('[name="service"]') as HTMLSelectElement)?.value || '',
      budget: (form.querySelector('[name="budget"]') as HTMLSelectElement)?.value || '',
      details: (form.querySelector('[name="details"]') as HTMLTextAreaElement)?.value?.trim() || '',
      privacyConsent: (form.querySelector('#priv-chk') as HTMLInputElement)?.checked ? 'yes' : 'no',
      submittedAt: new Date().toISOString(),
    }

    enqLog('submit start', { url: WEBAPP_URL, payload })

    const prevLabel = btn?.textContent || ''
    if (btn) {
      btn.disabled = true
      btn.textContent = 'Sending…'
    }
    setSubmitting(true)

    try {
      const res = await fetch(WEBAPP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      const text = await res.text()
      enqLog('response', { status: res.status, ok: res.ok, bodyPreview: text.slice(0, 500) })
      if (/^\s*</.test(text)) {
        enqWarn('response looks like HTML', text.slice(0, 200))
      }
      let data: { ok?: boolean; error?: string; spreadsheetId?: string; version?: string } = {}
      try {
        data = JSON.parse(text) as typeof data
      } catch (parseErr) {
        enqErr('JSON.parse failed', parseErr, 'raw length', text.length)
      }
      if (!res.ok || data.ok === false) {
        enqWarn('server refused', { httpOk: res.ok, data })
        throw new Error(data.error || 'HTTP ' + res.status || 'Server error')
      }
      enqLog('success', data)
      if (!data.spreadsheetId || !data.version) {
        enqWarn('Web App response missing spreadsheetId/version — deploy latest Enquiries.gs if needed.')
      }
      setSuccess(true)
    } catch (err: unknown) {
      enqErr('submit failed', err)
      const fallback =
        'Could not send your enquiry. Please try again in a moment or contact us by email.'
      const m = err instanceof Error ? err.message : ''
      setError(
        m && !/^Failed to fetch/i.test(m) && m !== 'NetworkError when attempting to fetch resource.'
          ? m
          : fallback,
      )
    } finally {
      setSubmitting(false)
      if (btn) {
        btn.disabled = false
        btn.textContent = prevLabel
      }
    }
  }

  return (
    <form className="enquiry-form" id="enquiry-form" onSubmit={onSubmit}>
      <div id="form-content" style={{ display: success ? 'none' : 'block' }}>
        <h3 className="f-title">Send an Enquiry</h3>
        <p className="f-sub">We&apos;ll respond within 24 business hours.</p>
        <p id="form-error" role="alert" style={{ display: error ? 'block' : 'none' }}>
          {error}
        </p>
        <div className="f-row">
          <div className="f-group">
            <label htmlFor="enq-first">First Name *</label>
            <input id="enq-first" name="firstName" type="text" placeholder="John" required autoComplete="given-name" />
          </div>
          <div className="f-group">
            <label htmlFor="enq-last">Last Name *</label>
            <input id="enq-last" name="lastName" type="text" placeholder="Smith" required autoComplete="family-name" />
          </div>
        </div>
        <div className="f-group">
          <label htmlFor="enq-email">Email Address *</label>
          <input
            id="enq-email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            autoComplete="email"
          />
        </div>
        <div className="f-group">
          <label htmlFor="enq-phone">Phone Number</label>
          <input id="enq-phone" name="phone" type="tel" placeholder="+44 7748 323194" autoComplete="tel" />
        </div>
        <div className="f-group">
          <label htmlFor="enq-service">Service Required *</label>
          <select id="enq-service" name="service" required defaultValue="">
            <option value="" disabled>
              Select a service...
            </option>
            <option value="Residential Construction">Residential Construction</option>
            <option value="Commercial Development">Commercial Development</option>
            <option value="Renovation & Remodelling">Renovation &amp; Remodelling</option>
            <option value="Architecture & Design">Architecture &amp; Design</option>
            <option value="Sustainable Building">Sustainable Building</option>
            <option value="Project Management">Project Management</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </div>
        <div className="f-group">
          <label htmlFor="enq-budget">Estimated Budget</label>
          <select id="enq-budget" name="budget" defaultValue="">
            <option value="" disabled>
              Select range...
            </option>
            <option value="Under £25,000">Under £25,000</option>
            <option value="£25,000 – £75,000">£25,000 – £75,000</option>
            <option value="£75,000 – £200,000">£75,000 – £200,000</option>
            <option value="£200,000 – £500,000">£200,000 – £500,000</option>
            <option value="£500,000+">£500,000+</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="f-group">
          <label htmlFor="enq-details">Project Details *</label>
          <textarea
            id="enq-details"
            name="details"
            placeholder="Tell us about your project, location, timeline, and any specific requirements..."
            required
          />
        </div>
        <div className="f-check">
          <input type="checkbox" id="priv-chk" name="privacyConsent" value="yes" required />
          <label htmlFor="priv-chk">
            I agree to the{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openModal('privacy-modal')
              }}
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                openModal('terms-modal')
              }}
            >
              Terms &amp; Conditions
            </a>{' '}
            and consent to being contacted regarding my enquiry. *
          </label>
        </div>
        <button type="submit" className="btn-submit" id="enq-submit" disabled={submitting}>
          Send Enquiry →
        </button>
      </div>
      <div className="form-success" id="form-success" style={{ display: success ? 'block' : 'none' }}>
        <div className="tick">✅</div>
        <h3>Enquiry Received!</h3>
        <p>Thank you for reaching out. A member of our team will be in touch within 24 business hours.</p>
      </div>
    </form>
  )
}
