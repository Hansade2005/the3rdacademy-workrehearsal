/**
 * Lightweight analytics shim.
 * Wires the 4 event categories from Tony's brief (Section 4):
 *   - product checkout conversion
 *   - section scroll depth
 *   - FAQ engagement
 *   - CTA clicks
 *
 * Drop-in for GTM, Plausible, PostHog, etc. by replacing the implementation
 * inside `emit`. The call sites do not need to change.
 */
export function emit(eventName, payload = {}) {
  if (typeof window === 'undefined') return
  // GTM-style
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...payload })
  }
  // Plausible custom events
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: payload })
  }
  // Supabase analytics (fire-and-forget)
  import('../lib/supabase.js').then(({ supabase }) => {
    supabase.from('analytics_events').insert({
      event_name: eventName,
      properties: payload,
      session_id: getSessionId(),
    }).then(() => {})
  }).catch(() => {})
  // Dev visibility
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', eventName, payload)
  }
}

function getSessionId() {
  if (typeof window === 'undefined') return null
  let id = sessionStorage.getItem('wr_session')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('wr_session', id)
  }
  return id
}

export const trackCheckout = (product) => emit('checkout_click', { product })
export const trackCTA = (location, label) => emit('cta_click', { location, label })
