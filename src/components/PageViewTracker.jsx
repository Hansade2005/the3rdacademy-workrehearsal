import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { recordEvent, readCampaignSource } from '../lib/moment.js'

/**
 * Fires a `page_view` event into moment_telemetry on every route change and
 * once on first mount. Server-side aggregation happens through the
 * moment_daily_visits() RPC, admin-only.
 *
 * We deliberately do NOT dedupe by pathname within a session — one row per
 * navigation lets us see repeat visits to a page. We dedupe consecutive
 * fires against the exact same URL so a StrictMode double-mount doesn't
 * count twice.
 */
export default function PageViewTracker() {
  const { pathname, search } = useLocation()
  const lastRef = useRef(null)

  useEffect(() => {
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
