# CLAUDE PROGRESS MEMORY — WorkRehearsal build

Two product lines share the same engine:

- **BehaviourLab** — 90-min modules, 4 one-shot scenarios per Segment E, includes standalone Audio Case (Segment D). Probation Blueprint family.
- **AIWorkLab** — 45-min modules, 2 layered scenarios (LS1 → LS2 with intra-module residue), NO Audio Case (Segment D omitted). AI-Ready Behaviours family. Same engine, same audio, same memory contract.

## Status

### BehaviourLab (all live)
- **D1** Integrity & Ethics — ✅ `/rehearse/d1`
- **D2** Accountability & Ownership — ✅ `/rehearse/d2`
- **D3** Execution Reliability — ✅ `/rehearse/d3`
- **D4** Communication Under Pressure — ✅ `/rehearse/d4`
- **D5** Collaboration & Conflict Resolution — ✅ `/rehearse/d5`
- **D8** Resilience & Recovery — ✅ `/rehearse/d8`
- **D9** Learning Agility (Probation Blueprint Capstone) — ✅ `/rehearse/d9`

### AIWorkLab (to build)
- **M1** AI Output Judgment — to build
- **M2** AI Disclosure & Attribution — to build
- **M3** AI Override & Escalation — to build
- **M4** AI Grey Zone — to build
- **M5** AI Breakdown & Recovery — to build

## AIWorkLab architecture differences

Per `scripts/AI_Ready_Behaviours_Production_Standard_v1_2.md`:
- **Runtime**: 45 min (BehaviourLab is 90 min)
- **Segments**: 6 (A, B, C, E, F, G) — **Segment D omitted**. Its cautionary-story function folds into Segment A cold open + the Inspect beat of Segment E.
- **Segment E**: 2 layered scenarios (LS1, LS2) instead of 4 one-shot scenario chains. LS1's outcome subtly threads into LS2 inside the same module (intra_module_state extension — a participant who folded under LS1 pressure sees a subtle reference in LS2 Inspect or Decide).
- **Micro-Drills (Segment F)**: 2 exercises fixed.
- **The Inspect Beat**: source-artifact requirement (MOAT-CRITICAL) — participants must inspect sources before deciding.
- **The Pressure Beat**: escalation requirements.
- **Cross-lab callbacks**: AIWorkLab modules can callback BehaviourLab final sentences (e.g., M1 references D3's final sentence at Screen A-0). MVP: fallback string. Same TODO(cross-module-memory) pattern.
- **Same engine**: One BridgeFast engine renders both product lines. Same cinematic entry (Screen A-0), same signature audio (Tibetan bell + four-note motif), same Growth Log, same Awe Close pattern, same Retention Check specification.
- **Same voice register**: quiet, observational, present-tense. Banned vocabulary list applies.

## AIWorkLab-specific signature elements (per module)

Each pressure-point module has a named signature framework revealed in Segment C AFTER the participant lives the cold open. Named per module in the script.

- **M1** — AI Output Judgment. Framework: The Source-First Habit.
- **M2** — AI Disclosure & Attribution. Framework: per script.
- **M3** — AI Override & Escalation. Framework: per script.
- **M4** — AI Grey Zone. Framework: per script.
- **M5** — AI Breakdown & Recovery. Framework: per script.

Central question closes at Segment G. Awe-moment close pattern per DPS Section 1.4.

253 narration MP3s in `public/narration/` for D1+D2+D3.

## Visual theme — Editorial Noir (locked)
Shared palette lives at **`src/rehearsal/theme.js`**. Every module
imports `import { C } from "./theme.js"`. The C.* key names (`navy`,
`teal`, `amber`, etc.) are stable across themes; only the hex values
change. Currently:
- Warm cinematic black (#13110F / #0A0908)
- Brushed brass primary accent (#C8A35C)
- Muted terracotta secondary (#E07856)
- Cream paper (#F4EFE6) on G-2 + light-chrome screens
- Warm dark ink (#1A1814) on cream

Tony approved this direction over the previous SaaS navy/teal. Do NOT
revert to navy unless he asks. New modules MUST import from theme.js
— never declare a local `const C = {...}` block.

## Architecture (the canonical D1 pattern)

### Files
```
src/rehearsal/
  d1Content.js          ← all D1 strings, scenarios, references
  BridgeFastModule.jsx  ← the D1 module renderer + engine
  usePiper.jsx          ← narration playback + chime/settle SFX + prefetch
  narrationKey.js       ← FNV-1a hash; shared by browser + generator
public/narration/
  <hash>.mp3            ← one file per spoken text (de-duped by hash)
  manifest.json
scripts/
  generate-narration.mjs ← Piper TTS pipeline (Python `piper-tts` + ffmpeg)
  D1_Production_Build_Reference_rev0.md  ← Tony's locked spec
  D2_Production_Build_Reference_rev0.md
  D3_Production_Build_Reference_rev0.md
  T3A_Dimension_Production_Standard_rev0 (1).md
```

### How a module is wired
1. **Content** in `dNContent.js` — all narration strings, scenario data, references,
   artifact-write prompts, signal panels, threading variants, consequence horizons.
   Engine reads this; engine itself is content-agnostic.
2. **Engine** in `BridgeFastDNModule.jsx` — useReducer state machine. Screens
   are an `if (st.screen === "...")` chain that assigns `body`. Defensive
   fallback renders a recovery card if no branch matches. Wrapped in a
   `ModuleErrorBoundary` so any thrown render shows a navy recovery card
   rather than the global cream body bg.
3. **Narration** — `npm run narration` walks `dNContent.js`, computes
   `narrationKey(text)` for every spoken string, renders each through Piper
   to MP3, prunes orphans, writes `public/narration/manifest.json`. Browser
   computes the same hash at click time and plays the static file.
4. **Routing** — `src/App.jsx` mounts the renderer at `/rehearse/dN`.

### State shape (initialState)
```js
{
  screen: "enter",
  history: [],
  paused: false,
  coldOpenPath: null,
  scenarioPath: null,
  scenarioPathHistory: [],     // ALL past disclosure paths
  threadingPosture: null,      // "transparent" | "cautious" | "avoidant"
                               // (== reliable | mixed | unreliable in spec)
  ledger: [],                  // Pattern Mirror rows
  analyses: [],
  segmentBReflection: "",
  segmentCResponses: {},
  segmentFAnswers: { f1: [], f2: [] },
  segmentDPause2Text: "",
  finalSentence: "",
}
```

### Engine quirks worth knowing
- `Stage` defaults to `bg: C.navy`; `narrow` clamps maxWidth to 540 (else 720).
- Chrome (Back + segment indicator + Pause) is fixed at top; on **cream
  backgrounds**, pass `onLight={true}` to BackControl/PauseControl OR add the
  screen ID to `lightChromeScreens` so colours invert. g2 is on the list.
- `canBack` excludes `g15` (auto-advance), `g4` (awe close), `done` (terminal).
- AudioContext lazy-created in `usePiper`; first user click resumes it.
- `prefetch()` is idempotent + de-duped per key. The first `prefetch()` call
  also kicks off a session-wide idle-time sweep of every clip in the manifest
  so later Plays are zero-latency.
- `ListenButton key={st.screen}` pattern: any list-component that holds
  internal state across question screens MUST be re-keyed on `st.screen`,
  otherwise state leaks from one vignette to the next (bug we hit in F1/F2).

### Narration generator parity rule
Every `<AVPlaceholder text={...}>` or `audioText` prop in the renderer MUST
have a corresponding `add(label, text)` in `scripts/generate-narration.mjs`
that uses the **identical join expression**. Drift = manifest miss = "not
pre-rendered yet" red chip in the UI.

## Tony's review-corrections checklist (apply to every new module)

These are the things he flagged on D1 that need to be done correctly the
first time on D2 and D3.

### Content faithfulness
- [ ] **Don't summarize the script.** Render every paragraph as written.
      Tony will diff line-by-line against the production reference.
- [ ] All briefings render the full text — including secondary lines like
      "No one is likely to notice it before the meeting unless they
      rebuild the formula from scratch." (We lost these on D1 SC1 and had
      to put them back.)
- [ ] All artifacts (Slack threads, emails, QA reports, internal docs)
      render as **labeled monospaced cards** below the briefing via
      `SC.artifacts[]` — same mechanism as D1 SC1/SC3/SC4.
- [ ] Slack messages include `[Read: HH:MM Day]` receipts when the script
      shows them (we missed this on D1 Segment D Part 1).
- [ ] **Inline artifact data** (e.g., spreadsheet rows with highlighted
      cells) gets rendered too. See D1 SC1 Revenue Projection.

### Narration UX
- [ ] Voice and on-screen text must match. If the script defines both an
      audio narration AND a different on-screen header, render BOTH:
      audioIntro string as the displayed body, plus an `onScreenHeader`
      card above. (D1 F1/F2 pattern.)
- [ ] Split narrations where the script has a [pause] mid-flow that the
      learner reveals something during. Two AVPlaceholders (part 1 +
      part 2) inside/outside a `ClickToReveal`. See D1 C2 (cost equation),
      D1 C3 (Integrity Pause banner).
- [ ] Every screen with narratable content gets its own Listen button —
      including transition beats (Segment C Complete, Segment D Complete,
      Segment F Complete), Pause Invitations at break points, and reflective
      cards like the Scope Notice.
- [ ] Long beats (>400 chars) get the cinematic `settle` SFX automatically
      via ListenButton's `outro` prop. Short prompts skip the chime so
      single-sentence beats don't feel over-scored.

### Screen patterns the engine already supports — REUSE THEM
- `<ClickToReveal buttonLabel="...">` — for moments where a visual card
  should land as a beat the learner triggers.
- `<AVPlaceholder label="..." text="..." />` — Listen button + audio.
- `<Decision prompt options justification audioText audioLabel />`.
- `<ArtifactWrite prompt submitLabel references refKind closing />` — the
  participant's submission + 3 reference variants + optional closing
  observation.
- `<ConsequenceReveal horizons onBell onDone />` — Same Day → Next Week →
  Month End with Tibetan bell at each transition.
- `<Trajectory chosen signalPanel />` — labeled line chart with endpoint
  letters + a legend that pulls path titles from `signalPanel`.
- `<PatternLedger name rows totalRows fullRecall />` — Integrity Mirror table.
- `<BehaviouralSignaturePanel paths theme />` — Reliable / Mixed / Unreliable
  aggregate signature. Theme: "dark" for navy bg, "light" for cream g2.
- `<SectorAssignment module />` — MVP notice OR post-MVP picker, driven by
  `module.sector_variants[]` length.

### Flow patterns to mirror
- **Segment A**: cold open narration → 4-option decision + justification
  → same-day consequence per path → safety floor → central question.
- **Segment B**: behaviour-standard intro narration → Field Guide (two
  contrasted lists with accent colours; D1 used teal for "present" and
  amber for "breakdown") → reflection prompt.
- **Segment C**: three Recognition Briefs (C1, C2, C3). Each Brief is a
  narration + visual reveal + step body + close + reflection prompt.
  Narrations split into Part 1 / Part 2 around the reveal.
- **Segment C → D transition** screen with own narration + Scope Notice
  card (Foundational vs Intermediate framing).
- **Break Point 1** (after Segment C) — Pause Invitation with "Continue
  now" / "Return later" dual buttons. The Return-later button reuses
  `onPause` so the existing pause overlay covers state preservation.
- **Segment D**: audio case with two Decision Pauses. Artifacts (the
  "in-world" documents) render between the narration and the pauses.
  Decision Pause 1 = multiple choice. Decision Pause 2 = free-write
  with a 50-char minimum.
- **Segment D → E transition** + **Break Point 2** screens — same shape
  as the C→D pair. Mirror the elapsed/remaining labels.
- **Segment E (Scenario Lab)**:
  - `scenario_chain_intro` with `SectorAssignment` notice.
  - For each scenario (SC1–SC4):
    `sc_callback` (threading-variant intro) → `sc_decision` (4 options +
    justification) → `sc_artifact` (write the actual workplace text;
    references appear after submit) → `sc_consequence` (3-horizon reveal
    with bells) → `sc_interp` (one-line observation) → `sc_signal`
    (4-row signal panel + Trajectory chart) → `sc_manager` (manager's
    perspective) → `sc_reflection` (write a sentence) → `sc_ledger`
    (Pattern Mirror with UP NEXT preview of the next scenario).
  - After SC4: `e_signature` (Behavioural Signature Mirror — counts +
    aggregate reading).
- **Segment F**: F1 + F2 micro-drills (6 vignettes each).
  `SingleChoiceCard key={st.screen}` mandatory or selections leak.
  F1/F2 intros use both `audioIntro` (matching voice) AND
  `onScreenHeader` (the script's screen text card).
  Then `f_complete` transition → `break_4` (optional break before close).
- **Segment G**: g1 (Recognition narration + WHAT YOU ARE CARRYING NOW
  card + cold-open callback italic) → g15 (Framework Return,
  no-input, auto-advance per `frameworkReturn.durationSeconds`) → g2
  (Growth Log: Pattern Mirror + Behavioural Signature in `theme="light"`)
  → g3 (Delayed Retention Check — content-only, backend deferred) →
  g4 (Awe Close: bookend → silence + motif → final sentence prompt) → done.

### Bugs we already fixed — don't reintroduce
- Auto-select on multiple-choice list: add `key={st.screen}` on
  `SingleChoiceCard`.
- Blank screen on Back when render throws: `ModuleErrorBoundary` wraps
  the module; `body === null` fallback inside the render.
- Chrome invisibility on cream bg: pass `onLight={onLightBg}` based on
  `lightChromeScreens.includes(st.screen)`.
- F1/F2 voice ≠ on-screen text: display `audioIntro` verbatim AND show
  the `onScreenHeader` card above it.
- Threading posture computed from ONLY the latest scenario: aggregate
  from `scenarioPathHistory` and compute `reliable/mixed/unreliable`.
- Generator missed inline `audioText="..."` props (cold-open Decision Beat
  prompt, Decision Pause 1 prompt): walk every `audioText` AND every
  `AVPlaceholder text` in the renderer and confirm each appears in
  `generate-narration.mjs`.

## Cross-module memory contract (D1 → D2 → D3)

### What each module EMITS (writes to session state for downstream consumption)
- `prior.dN.final_personal_sentence` — the G-4 Beat 3 one-sentence prompt
  the participant wrote. Stored verbatim. **D2 reads D1's. D3 reads D2's.**
- `prior.dN.cold_open_decision_path` — a / b / c / d.
- `prior.dN.scenario_path_history` — the 4 disclosure paths chosen in
  Segment E.
- `prior.dN.behavioural_signature_key` — reliable / mixed / unreliable.
- `prior.dN.cold_open_artifact_write_text` — what the participant wrote
  on the cold-open artifact-write (D2 introduces this).
- `growth_log_events[]` — full log captured at every Lock 2 event.

For MVP we **don't have cross-session persistence yet**. The contract is
schema-only. At runtime:
- If the user did D1 in the same browser session and we have it in memory,
  use it.
- Otherwise the **fallback string** (per script) plays.
- Both render paths must work day one.

### D2's A-1 cold open hard requirement
Beat 1 narration is the verbatim D1 final-personal-sentence playback:
> "Last time you carried something out of this lab. You wrote:
> {{prior.D1.final_personal_sentence}}. That sentence still belongs to
> you. We are going to ask you to live another moment now — a moment
> where what you carried matters."

Fallback when D1 wasn't completed:
> "This module can stand alone, but it connects more deeply after D1. We
> are going to ask you to live a moment now — a moment where what you
> choose matters."

### D3's A-1 cold open
Mirror — Beat 1 is the D2 final-personal-sentence callback with the
same fallback pattern.

### Implementation plan for the callback
Both runtime branches need MP3s:
- Generate the **fallback variant** as a regular static clip.
- The **personalized variant** can't be pre-rendered (the participant's
  sentence is unknown at build time). Two options:
  1. **At click time, call Piper TTS via a server endpoint.** Not viable
     for MVP — we don't have a server.
  2. **Web Speech API in the browser** for the participant's sentence
     portion only; the wrapper sentences ("Last time you carried…",
     "That sentence still belongs to you…") play from a pre-rendered MP3.
  3. **Stitch:** play wrapper MP3 part 1 → Web Speech API speaks the
     stored sentence → play wrapper MP3 part 2. This is the MVP target.
- If neither path is available, fall back to the no-D1 fallback narration.

## Per-module signature elements

### D1 — Integrity & Ethics ✅
- Framework: "The Integrity Pause" — Notice. Name. Choose. Stand.
- Central question: "What do you do when the right thing to do is clear,
  but doing it costs you something?"
- Sector (MVP): Corporate/Finance
- Cold open: $340K spreadsheet error / Sarah / 10AM client meeting
- Audio case: "The Status Report" / methodology footnote / David Chen

### D2 — Accountability & Ownership (to build)
- Framework: "The Repair Sequence" — Acknowledge. Fix. Execute. Confirm.
- Central question: "When something you committed to slips, what do
  other people see in how you handle it?"
- Sector (MVP): Technology/Software
- Cold open: Sprint Standup — uncompleted ticket, 16 minutes to standup
- 4 cold-open paths:
  - A: Disclose at standup
  - B: Mark "in review", quietly finish
  - C: Skip standup, Slack later
  - D: Disclose but blame external blocker
- Cold-open ARTIFACT-WRITE happens IN Segment A (write the actual Slack
  message / standup statement). REFERENCES surface in Segment B-0.
- Audio case: "The Slow Slide" wait that's D3. D2's audio case is the
  post-mortem leadership case — TBD in script. Has TWO decisions and an
  artifact-write.
- Scenarios:
  - SC1: The Deadline You Cannot Meet
  - SC2: The Client Deck You Forgot To Update
  - SC3: The Code Review You Disagreed With
  - SC4: The Mistake You Discovered In Someone Else's Work
- Micro-drills:
  - F1: Behaviour-Centred Rewrite
  - F2: Specific Repair Offer

### D3 — Reliability & Follow-Through (to build)
- Framework: "The Reliability System"
- Sector (MVP): Technology/Software
- Cold open: with D2 callback
- Innovations:
  - **Retrospective Decision Pause** in audio case
  - **Pre-Perception Replay** (Manager's Internal State BEFORE decision
    in SC4)
- Audio case: "The Slow Slide" — Week One drift + Week Two pattern.
- Scenarios:
  - SC1: The 80% Solution
  - SC2: The Competing Priorities
  - SC3: The Dirty Handoff
  - SC4: The Scope Creep [pre-perception replay innovation]
- Micro-drills: TBD per script

## Build environment
- Python: `pip install piper-tts imageio-ffmpeg`
- Voice model: `python3 -m piper.download_voices en_US-hfc_female-medium
  --download-dir .piper-voices`
- Generation: `npm run narration`
- Build: `npm run build`
- The voice model is gitignored. Narration MP3s ARE committed.

## Deploy notes
- Lives on `main`. Auto-deploys to workrehearsal.com on push.
- `Permissions-Policy: microphone=(self)` is set in both
  `netlify.toml` and `vercel.json` so the voice-dictation mic works.

## The 5-reviewer link
Tony plans to send a link to 5 reviewers tomorrow (~13 June 2026).
D1 is review-ready. D2 and D3 must be at the same bar.

## Don't ship without
1. Build clean (`npm run build` zero errors).
2. Narration manifest matches every spoken string referenced in the
   renderer. Run `grep AVPlaceholder | grep -v function` then audit
   each entry against `generate-narration.mjs`.
3. All four scenario paths produce a clean consequence reveal — no
   undefined access (`cons.manager`, `signalPanel[k].title`, etc.).
4. Back navigation works from every screen (or is explicitly excluded).
5. Pause overlay shows a Restart link.
6. Mobile narrow-viewport check: Integrity Pause / Repair Sequence /
   Reliability System banner uses `flex-wrap: wrap` + `clamp()` font sizes.
