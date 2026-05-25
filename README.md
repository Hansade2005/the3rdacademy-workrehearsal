# WorkRehearsal.com — landing site

Pre-launch marketing site for **WorkRehearsal™**, a product of **The 3rd Academy Inc.** (Canada). Built and maintained by **Pixelways Solutions Inc.**

> *Rehearse the workplace moments that decide your job.*

WorkRehearsal sells two scripted-rehearsal products:

- **Probation Blueprint™** — $29 — the first 90 days, rehearsed
- **AI-Ready Behaviours™** — $39 — the judgment calls AI now creates

This repo is the **landing surface only**. Checkout (Stripe), magic-link sign-in, and the rehearsal app itself live behind future engineering phases — placeholder pages and waitlist forms hold their URLs until then.

---

## Stack

- **Vite 5** + **React 18** + **React Router v6** — SPA, static build
- **Vanilla CSS** with custom-property tokens — no Tailwind, no CSS-in-JS, no framework
- **Tabler Icons** via CDN — used sparingly for product-card meta rows
- **Bricolage Grotesque** (variable display) + **Newsreader** (italic serif) + **Inter** (body) — via Google Fonts
- No backend dependencies in this repo. Analytics is a thin shim (`src/lib/analytics.js`) that writes to `window.dataLayer` and `window.plausible` if present

---

## Design system

Warm cream editorial × Swiss layout × pulled italic.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#F5F1E8` | warm cream — primary background |
| `--bg-2` | `#ECE5D4` | sand — card surface (Probation card) |
| `--bg-sage` | `#E7E8DC` | faint sage — AI-Ready card differentiation |
| `--paper` | `#1A1814` | graphite ink — primary text |
| `--paper-soft` | `#4A463D` | secondary text |
| `--paper-mute` | `#8A8472` | tertiary / labels |
| `--flame` | `#D9542F` | warm vermillion — single primary accent |
| `--sage` | `#7D8F73` | dusty sage — secondary accent (rare) |

All colours flow from `:root` in `src/styles/global.css`. Changing one of those values cascades through the whole site.

### Type usage

- **Display sans (Bricolage Grotesque):** hero headline, section titles, FAQ questions, product names, footer wordmark
- **Italic serif (Newsreader):** pulled emphasis inside body copy, hero meta values, section numerals, lesson boxes
- **Body sans (Inter):** all running prose, navigation, microcopy

---

## Locked vocabulary

The 3rd Academy's brand voice has explicit non-negotiables. Anyone editing copy must preserve these verbatim:

- **Rehearse / Rehearsal** — never "training," "course," "practice exercise"
- **workplace pressure** — the framing for what the products address
- **Probation Blueprint™ / AI-Ready Behaviours™** — always with `™` superscript
- **Calibration, not certification** — and **Behavioural calibration, not certification**
- **Practice and development only. Not behavioural documentation.** — footer microcopy on every page
- **Private practice — not shared with employers** — the privacy promise
- **Cross-border professionals** — the audience term for international workers

All product copy lives in `src/pages/Home.jsx` and `src/data/scenarios.js`. Tony reviews copy changes before launch.

---

## Routes

| Path | Page | Status |
|---|---|---|
| `/` | Home (hero + products + pull-quote + how-it-works + audience + FAQ + CTA) | live |
| `/refunds` | Refund policy | live |
| `/privacy` | Privacy policy | **DRAFT — pending Calgary lawyer review** |
| `/terms` | Terms of service | **DRAFT — pending Calgary lawyer review** |
| `/contact` | Contact page | live |
| `/checkout/:slug` | Product placeholder + email waitlist | placeholder until Stripe is wired |
| `/signin` | Magic-link placeholder | placeholder until auth is wired |
| `/probation-blueprint`, `/ai-ready` | Legacy redirects → `/#products` | live |
| `/probation-blueprint/checkout`, `/ai-ready/checkout` | Legacy redirects → `/checkout/:slug` | live |

Privacy and Terms pages currently display an amber `.draft-warning` block at the bottom — remove those blocks (one `<div>` each) once the lawyer signs off.

---

## Demo modal

The hero secondary CTA (**"Try a sample rehearsal · 90 sec"**) opens an interactive demo:

- Two scenarios (Probation Blueprint + AI-Ready Behaviours) in tabs
- Three stages per scenario: moment → consequence → ending
- No email gate — fully open
- ESC, click-outside, close button all dismiss
- Focus trapped, body scroll locked
- Seven analytics events fire across the flow

**All scenario copy lives in `src/data/scenarios.js`** — Tony can edit the writing without touching React components. Each scenario is a structured tree of `moment` → `choices[]` → `consequences{}` (keyed by choice id) → `later` narrative + lesson.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output -> dist/
npm run preview  # serve the built dist/ locally
```

Node 18+. No environment variables required for the landing site.

---

## Deployment

The build output (`dist/`) is fully static. Three known-good hosting paths:

### Netlify

```bash
npm run build
# Drag dist/ onto https://app.netlify.com/drop
```

`netlify.toml` is included with the SPA fallback (`/*` → `/index.html` 200).

### Vercel

```bash
npm run build
# Drag dist/ onto https://vercel.com/new
```

`vercel.json` is included with the SPA rewrite rule.

### Any static host (Puter, Cloudflare Pages, S3)

Upload `dist/` contents. The build outputs a `_redirects` file that some hosts (Netlify, Cloudflare Pages) read automatically. For others, configure your host to serve `/index.html` for unmatched routes.

---

## Analytics

`src/lib/analytics.js` exposes three functions:

- `emit(event, props)` — fire a custom event
- `trackCheckout(productKey)` — fires when a checkout CTA is clicked
- `trackCTA(source, action)` — fires for other conversion CTAs

The shim writes to `window.dataLayer.push(...)` for GTM and `window.plausible(...)` for Plausible Analytics. If neither is loaded, calls are silent.

To enable analytics on production: add the Plausible or GTM script to `index.html`.

---

## File layout

```
src/
├── App.jsx                      # routes + ScrollToTop
├── main.jsx                     # React entry
├── components/
│   ├── Navigation.jsx           # sticky nav, mobile menu
│   ├── Footer.jsx               # 4-col footer + giant wordmark
│   ├── FAQ.jsx                  # accordion (instant, no transition)
│   └── DemoModal.jsx            # sample-rehearsal interactive demo
├── pages/
│   ├── Home.jsx                 # everything from hero to closing CTA
│   ├── Refunds.jsx              # policy
│   ├── Privacy.jsx              # policy (DRAFT)
│   ├── Terms.jsx                # policy (DRAFT)
│   ├── Contact.jsx
│   ├── Checkout.jsx             # /checkout/:slug placeholder
│   ├── SignIn.jsx               # magic-link placeholder
│   └── NotFound.jsx
├── data/
│   └── scenarios.js             # demo modal copy (edit here, not in JSX)
├── lib/
│   └── analytics.js             # GTM/Plausible shim
└── styles/
    └── global.css               # the whole design system, ~1,400 lines
```

---

## Roadmap (post-launch engineering phases)

1. **Phase 2 — Commerce wiring** (~$1,445 / 17 hrs)
   - Stripe Checkout for both products at `/checkout/:slug`
   - 14-day / 50%-usage refund-eligibility logic
   - Resend transactional email (receipts, refund confirmations)
   - Magic-link sign-in at `/signin` (Supabase Auth)

2. **Phase 3 — Launch ops** (~$510 / 6 hrs)
   - Calgary lawyer coordination + Privacy/Terms revision
   - DNS / SSL on workrehearsal.com
   - End-to-end QA + post-launch monitoring

See `WorkRehearsal_Engineering_Estimate.docx` (separate deliverable) for line-item breakdown.

---

## License

© 2026 The 3rd Academy Inc. All rights reserved.

This repository contains proprietary marketing copy, brand assets, and product positioning owned by The 3rd Academy Inc. Code architecture, design system, and engineering decisions by Pixelways Solutions Inc.

Not licensed for reuse, redistribution, or derivative works.

---

## Contact

- **Product owner:** Dr. Tony Mofoke · The 3rd Academy Inc.
- **Engineering:** Hans Ade · Pixelways Solutions Inc.
