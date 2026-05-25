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
  // Dev visibility
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', eventName, payload)
  }
}

export const trackCheckout = (product) => emit('checkout_click', { product })
export const trackCTA = (location, label) => emit('cta_click', { location, label })
