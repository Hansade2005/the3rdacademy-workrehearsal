# MEMORANDUM · TO THE LEAD PLATFORM DEVELOPER

*The 3rd Academy Inc.*

**To:** Hans Ade, Lead Platform Developer, Pixelways Solutions Inc.
**From:** Dr. Tony Mofoke, Founder & CEO
**Date:** July 2026
**Re:** Founding Cohort launch pricing — implementation requirements for WorkRehearsal.com (Probation Blueprint™ and AI-Ready Behaviours™)

---

## Section 1 — Purpose and scope

This memo converts the Founding Cohort pricing structure into build requirements for WorkRehearsal.com. It covers the pricing configuration, the seat-counter and tranche mechanics, the bundle rule, the product-page display blocks, the currency rule, and the post-purchase step. All mechanics must be built, tested, and confirmed before launch. Three items in Section 8 require the Founder's decision before the corresponding logic is coded.

## Section 2 — Pricing configuration

All prices are one-time purchases in USD, granting 12-month access. The Founding Cohort for each product closes at exactly 100 seats: 50 at the Tranche 1 price, then 50 at the Tranche 2 price.

| Product | Post-launch price | Tranche 1 (seats 1–50) | Tranche 2 (seats 51–100) | After seat 100 |
|---|---|---|---|---|
| Probation Blueprint™ | $249 | $99 | $149 | $249 (ongoing) |
| AI-Ready Behaviours™ | $179 | $79 | $119 | $179 (ongoing) |
| Probation Blueprint + AI-Ready Behaviours bundle | $379 | $149 | $229 | $379 (ongoing) |

## Section 3 — Seat counter and tranche mechanics

1. **Independent counters.** Each product carries its own seat counter. The counter counts completed paid orders only.
2. **Automatic stepping.** When a counter reaches 50, checkout steps automatically to the Tranche 2 price. When it reaches 100, the Founding Cohort closes and the post-launch price applies.
3. **No manual override.** Tier changes are triggered by the counter inside the checkout system — no admin toggle, no extension of either tranche, for either product.
4. **No overselling.** The cap must hold under concurrent checkouts: two simultaneous buyers must not both take the final seat of a tranche. Reserve the seat at checkout or verify it at payment capture, and price the order at the tranche in force when the seat is secured.
5. **Live seat counter.** Each product page displays the seats remaining in the current tranche ("50 of 50 seats remaining" at launch), updating as seats are taken.

## Section 4 — Bundle rule

1. Each bundle purchase decrements both the Probation Blueprint counter and the AI-Ready Behaviours counter by one, in a single transaction.
2. The bundle's Founding Cohort pricing is available only while both products have Founding Cohort seats open. The moment either counter reaches 100, the bundle reverts to the $379 post-launch price.

## Section 5 — Product-page display blocks

Build the two blocks exactly as shown: strike-through post-launch anchor beside the Founding Cohort price, the one-time-purchase line, the live seat counter with the sunset sentence, the three-item benefit list, and the call-to-action button.

> **PROBATION BLUEPRINT™ · Founding Cohort · First 50 Seats**
>
> **$99 USD** ~~$249 USD~~
>
> **One-time purchase · 12-month access · Not a subscription**
>
> **50 of 50 seats remaining** · When the Founding Cohort closes, new buyers pay $249 USD (post-launch price).
>
> **Every Founding Cohort seat includes:**
>
> - A founder-led onboarding session within 14 days of purchase
> - Full access to all 7 modules for 12 months
> - A place in the first cohort — your feedback shapes the product
>
> **[ Reserve your seat → ]**

> **AI-READY BEHAVIOURS™ · Founding Cohort · First 50 Seats**
>
> **$79 USD** ~~$179 USD~~
>
> **One-time purchase · 12-month access · Not a subscription**
>
> **50 of 50 seats remaining** · When the Founding Cohort closes, new buyers pay $179 USD (post-launch price).
>
> **Every Founding Cohort seat includes:**
>
> - A founder-led onboarding session within 14 days of purchase
> - Full access to all 5 modules for 12 months
> - A place in the first cohort — your feedback shapes the product
>
> **[ Reserve your seat → ]**

When Tranche 1 closes, the same block structure carries the Tranche 2 price against the same strike-through anchor. When the Founding Cohort closes, the block reverts to a standard listing at the post-launch price with no strike-through and no counter.

## Section 6 — Currency

All listed prices are USD. Canadian buyers see CAD equivalents at checkout, converted at checkout — there is no fixed CAD price list.

## Section 7 — Post-purchase step

Every Founding Cohort purchase confirmation must include the invitation to a founder-led onboarding session, to take place within 14 days of purchase (individual or small-group format). Minimum build: an automated confirmation message carrying the invitation; the scheduling flow will be confirmed with the Founder.

## Section 8 — Decisions required before build

1. **Bundle tranche governance.** When the two product counters sit in different tranches, which tranche governs the bundle price? Recommendation: the later (higher-priced) tranche governs.
2. **Refunds.** Does a refunded Founding Cohort order reopen its seat, or does the counter never step back? Recommendation: the counter never steps back — simpler, and it preserves the no-extension rule.
3. **Onboarding scheduling.** Whether the 14-day onboarding session is booked through an automated scheduling link or coordinated manually by the Founder's office.

## Section 9 — Acceptance checklist

- Tranche steps fire at exactly seat 50 and seat 100 for each product, with no manual override path.
- A bundle purchase decrements both counters atomically; a failed payment decrements neither.
- Bundle Founding Cohort pricing disappears the moment either product's cohort closes.
- Seat counters never oversell under concurrent checkout.
- Display blocks match Section 5 exactly, including the strike-through anchor and the live counter.
- CAD equivalents render at checkout for Canadian buyers.
- Purchase confirmation carries the onboarding invitation.

*— Dr. Tony Mofoke, Founder & CEO*

*AI assistance was used for research, synthesis, drafting, structuring, and language refinement.*
