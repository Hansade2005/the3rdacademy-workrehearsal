import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'

// Founding Cohort pricing table — mirrors supabase/migrations/0001_founding_cohort.sql.
// The source of truth for what a buyer pays is the DB RPC (reserve_founding_seat /
// reserve_founding_bundle). These values drive display only.
export const FOUNDING = {
  probation_blueprint: {
    slug: 'probation-blueprint',
    name: 'Probation Blueprint',
    prices: { T1: 99, T2: 149, POST: 249 },
    postLaunch: 249,
  },
  ai_ready_behaviours: {
    slug: 'ai-ready',
    name: 'AI-Ready Behaviours',
    prices: { T1: 79, T2: 119, POST: 179 },
    postLaunch: 179,
  },
  bundle: {
    prices: { T1: 149, T2: 229, POST: 379 },
    postLaunch: 379,
  },
}

export function currentTranche(seatsTaken) {
  if (seatsTaken >= 100) return 'POST'
  if (seatsTaken >= 50) return 'T2'
  return 'T1'
}

// Fetch live seat state for both products. Returns { probation_blueprint, ai_ready_behaviours }
// each shaped as { seatsTaken, tranche, price, seatsRemainingInTranche, cohortOpen }.
export function useFoundingSeats() {
  const [state, setState] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data, error } = await supabase
        .from('founding_cohort_seats')
        .select('product,seats_taken,cohort_size,tranche1_size')
      if (cancelled) return
      if (error) { setError(error); return }
      const out = {}
      for (const row of data) {
        const tranche = currentTranche(row.seats_taken)
        const price = FOUNDING[row.product]?.prices[tranche]
        const inTranche = tranche === 'T1'
          ? row.tranche1_size - row.seats_taken
          : tranche === 'T2'
          ? row.cohort_size - row.seats_taken
          : 0
        out[row.product] = {
          seatsTaken: row.seats_taken,
          tranche,
          price,
          seatsRemainingInTranche: Math.max(0, inTranche),
          tranche1Size: row.tranche1_size,
          cohortSize: row.cohort_size,
          cohortOpen: row.seats_taken < row.cohort_size,
        }
      }
      setState(out)
    }
    load()
    const t = setInterval(load, 30000)
    return () => { cancelled = true; clearInterval(t) }
  }, [])

  return { seats: state, error }
}

export async function reserveFoundingSeat(product, email) {
  const { data, error } = await supabase.rpc('reserve_founding_seat', {
    p_product: product,
    p_buyer_email: email || null,
  })
  if (error) throw error
  return Array.isArray(data) ? data[0] : data
}

export async function reserveFoundingBundle(email) {
  const { data, error } = await supabase.rpc('reserve_founding_bundle', {
    p_buyer_email: email || null,
  })
  if (error) throw error
  return Array.isArray(data) ? data[0] : data
}
