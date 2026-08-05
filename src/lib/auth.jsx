import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase.js'

const AuthCtx = createContext({ session: null, user: null, loading: true })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      setSession(data.session ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s ?? null)
      setLoading(false)
    })
    return () => { cancelled = true; sub.subscription.unsubscribe() }
  }, [])

  return (
    <AuthCtx.Provider value={{ session, user: session?.user ?? null, loading }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() { return useContext(AuthCtx) }

export async function signOut() {
  await supabase.auth.signOut()
}

// Founding Cohort entitlement check for the current user.
export function useEntitlement(product) {
  const { user, loading: authLoading } = useAuth()
  const [state, setState] = useState({ loading: true, hasAccess: false })

  useEffect(() => {
    if (authLoading) return
    if (!user) { setState({ loading: false, hasAccess: false }); return }
    let cancelled = false
    supabase.rpc('has_founding_access', { p_product: product }).then(({ data, error }) => {
      if (cancelled) return
      if (error) { setState({ loading: false, hasAccess: false, error }); return }
      setState({ loading: false, hasAccess: Boolean(data) })
    })
    return () => { cancelled = true }
  }, [user, authLoading, product])

  return state
}

export function useMyEntitlements() {
  const { user, loading: authLoading } = useAuth()
  const [state, setState] = useState({ loading: true, rows: [] })

  useEffect(() => {
    if (authLoading) return
    if (!user) { setState({ loading: false, rows: [] }); return }
    let cancelled = false
    supabase.rpc('my_founding_entitlements').then(({ data, error }) => {
      if (cancelled) return
      setState({ loading: false, rows: data || [], error })
    })
    return () => { cancelled = true }
  }, [user, authLoading])

  return state
}
