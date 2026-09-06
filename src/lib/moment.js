/**
 * The Moment You Notice — free-release helpers.
 * Ref: T3A-DEV-INS-WR-FREE-001
 */
import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'
import { useAuth } from './auth.jsx'

export const MOMENT_MODULES = [
  {
    slug: 'saying-the-hard-thing',
    title: 'Saying the Hard Thing',
    order: 1,
    // Internal reference — never surfaced to participants. Only rendered
    // when showInternalBreadcrumb() returns true (founder review only).
    sourceComponent: 'BridgeFastD4Module',
    internalLabel: 'Probation Blueprint · D4 · Communication Under Pressure',
  },
  {
    slug: 'when-the-ai-looks-right',
    title: 'When the AI Looks Right',
    order: 2,
    sourceComponent: 'BridgeFastM1Module',
    internalLabel: 'AI-Ready Behaviors · M1 · AI Output Judgment',
  },
]

/**
 * Internal-only breadcrumb showing the source product + module id under each
 * module title on the product page. Founder-review affordance.
 *
 * MUST default OFF and MUST be off before Gate B — Section 5.1 forbids naming
 * the source product on any participant-facing surface. Two independent gates,
 * either one turns it on:
 *   - build-time env: VITE_MOMENT_SHOW_INTERNAL_BREADCRUMB=true
 *   - runtime override: append ?internal=1 to any /moment URL
 * The runtime override persists in sessionStorage for the current tab so a
 * founder can click through the flow without re-appending the param.
 */
export function showInternalBreadcrumb() {
  if (typeof window === 'undefined') return false
  try {
    if (import.meta.env.VITE_MOMENT_SHOW_INTERNAL_BREADCRUMB === 'true') return true
    const url = new URL(window.location.href)
    if (url.searchParams.get('internal') === '1') {
      sessionStorage.setItem('moment_internal', '1')
    }
    return sessionStorage.getItem('moment_internal') === '1'
  } catch { return false }
}

const RESUME_KEY = 'moment_resume_v1'

export function saveResume(slug, screenId) {
  try {
    localStorage.setItem(
      RESUME_KEY,
      JSON.stringify({ slug, screenId, at: Date.now() }),
    )
  } catch { /* ignore */ }
}

export function readResume() {
  try {
    const raw = localStorage.getItem(RESUME_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearResume() {
  try { localStorage.removeItem(RESUME_KEY) } catch { /* ignore */ }
}

export function readCampaignSource() {
  try {
    const key = 'moment_campaign_source'
    const url = new URL(window.location.href)
    const src = url.searchParams.get('src') || url.searchParams.get('utm_source')
    if (src) sessionStorage.setItem(key, src)
    return sessionStorage.getItem(key) || null
  } catch { return null }
}

function sessionId() {
  try {
    let id = sessionStorage.getItem('moment_session')
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('moment_session', id) }
    return id
  } catch { return null }
}

export async function recordEvent(event, { module: mod = null, screen = null, props = {} } = {}) {
  try {
    await supabase.rpc('moment_record_event', {
      p_event: event,
      p_module: mod,
      p_screen: screen,
      p_source: readCampaignSource(),
      p_session: sessionId(),
      p_props: props,
    })
  } catch { /* fire-and-forget */ }
}

export async function recordFeedback(prompt, answers) {
  return supabase.rpc('moment_record_feedback', { p_prompt: prompt, p_answers: answers })
}

export async function enterRehearsal(slug) {
  return supabase.rpc('moment_enter_rehearsal', { p_module: slug })
}

export async function startPeriodEntitlement() {
  return supabase.rpc('moment_start_period_entitlement')
}

export function useReleaseState() {
  const [state, setState] = useState({ loading: true, state: null })
  useEffect(() => {
    let cancelled = false
    supabase.rpc('moment_release_status').then(({ data }) => {
      if (cancelled) return
      const row = Array.isArray(data) ? data[0] : data
      setState({ loading: false, state: row?.state ?? null, opens_at: row?.opens_at, closes_at: row?.closes_at })
    })
    return () => { cancelled = true }
  }, [])
  return state
}

export function useMomentEntitlements() {
  const { user, loading: authLoading } = useAuth()
  const [state, setState] = useState({ loading: true, rows: [] })
  useEffect(() => {
    if (authLoading) return
    if (!user) { setState({ loading: false, rows: [] }); return }
    let cancelled = false
    supabase.rpc('moment_my_entitlements').then(({ data }) => {
      if (cancelled) return
      setState({ loading: false, rows: data || [] })
    })
    return () => { cancelled = true }
  }, [user, authLoading])
  return state
}

export function hasAnyMomentAccess(rows) {
  return Array.isArray(rows) && rows.length > 0
}
