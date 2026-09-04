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
    // Internal reference — never displayed:
    sourceComponent: 'BridgeFastD4Module',
  },
  {
    slug: 'when-the-ai-looks-right',
    title: 'When the AI Looks Right',
    order: 2,
    sourceComponent: 'BridgeFastM1Module',
  },
]

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
