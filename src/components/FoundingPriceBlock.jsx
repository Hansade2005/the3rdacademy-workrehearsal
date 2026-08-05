import { FOUNDING } from '../lib/foundingCohort.js'

/**
 * Founding Cohort price block, per developer memo Section 5.
 *
 * product: 'probation_blueprint' | 'ai_ready_behaviours'
 * seat:    { tranche, price, seatsRemainingInTranche, tranche1Size, cohortOpen } | null
 *
 * When `seat` is null (loading / offline) the block shows Tranche 1 pricing as the
 * "safe default" launch state so buyers never see broken UI.
 */
export default function FoundingPriceBlock({ product, seat }) {
  const cfg = FOUNDING[product]
  const t = seat?.tranche ?? 'T1'
  const cohortOpen = seat ? seat.cohortOpen : true
  const price = seat?.price ?? cfg.prices.T1
  const seatsRemaining = seat?.seatsRemainingInTranche ?? 50
  const trancheSize = t === 'T1' ? (seat?.tranche1Size ?? 50) : (t === 'T2' ? 50 : 0)

  if (!cohortOpen) {
    // Founding Cohort closed — post-launch listing, no strike, no counter.
    return (
      <div className="price-block">
        <p className="price-tier">One-time purchase · 12-month access</p>
        <div className="price-row">
          <span className="price">${cfg.postLaunch}</span>
        </div>
      </div>
    )
  }

  const trancheLabel = t === 'T1'
    ? 'Founding Cohort · First 50 Seats'
    : 'Founding Cohort · Final 50 Seats'
  const sunset = t === 'T1'
    ? `When the Founding Cohort closes, new buyers pay $${cfg.postLaunch} USD (post-launch price).`
    : `When the Founding Cohort closes, new buyers pay $${cfg.postLaunch} USD (post-launch price).`

  return (
    <div className="price-block">
      <p className="price-tier">{trancheLabel}</p>
      <div className="price-row">
        <span className="price">${price}</span>
        <span className="price-original">${cfg.postLaunch} USD</span>
      </div>
      <p className="price-sub">One-time purchase · 12-month access · Not a subscription</p>
      <p className="price-counter">
        <strong>{seatsRemaining} of {trancheSize} seats remaining</strong>
        <span> · {sunset}</span>
      </p>
    </div>
  )
}
