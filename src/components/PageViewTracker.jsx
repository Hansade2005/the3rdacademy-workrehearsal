import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { recordEvent, readCampaignSource } from '../lib/moment.js'

/**
 * Fires a `page_view` event into moment_telemetry — landing page (`/`) only.
 * Deep links to other routes are excluded; the Board metric is "how many
 * people saw the front door today". Server-side aggregation via
 * moment_daily_visits(), admin-only.
 *
 * Dedupes consecutive identical URLs so a StrictMode double-mount doesn't
 * count twice.
 */
export default function PageViewTracker() {
  const { pathname, search } = useLocation()
  const lastRef = useRef(null)

  useEffect(() => {
    if (pathname !== '/') return
    const url = pathname + search
    if (lastRef.current === url) return
    lastRef.current = url
    readCampaignSource() // capture ?src=/utm_source once per session
    recordEvent('page_view', {
      screen: pathname,
      props: {
        path: pathname,
        search: search || null,
        referrer: typeof document !== 'undefined' ? (document.referrer || null) : null,
      },
    })
  }, [pathname, search])

  return null
}
