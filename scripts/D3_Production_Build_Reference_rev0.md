D3: Execution Reliability — Production Build Reference v2  ·  CONFIDENTIAL — INTERNAL USE ONLY

**THE 3RD ACADEMY**

*— Foundational Tier —*

**D3: Execution Reliability**

Production Build Reference

*Aligned to Dimension Production Standard rev0 (locked, May 2026). Approved for engine-parse test and strategic partner review — NOT production-locked. Production lock follows successful completion of §3.3 schema validation, §3.6 engine compatibility test, §3.4 strategic partner review, and §3.7 Market Defensibility Gate. Consumes the cross-module memory contract emitted by D2.*

**Prepared by: Dr. Tony Mofoke**

**For: Hans (engineering) · Strategic partners · Internal module production**

**Status: Standard-Aligned Draft · Pending Schema Validation, Engine-Parse Test, and Final QA.**

**Scope: D3 Execution Reliability Foundational module. Technology/Software MVP sector (Government/Public Service and Construction/Engineering variants post-MVP).**

**CONFIDENTIAL — INTERNAL USE ONLY**

# Preamble — How To Treat This Document
*Read this once. Refer back when a change is proposed. This page is intentionally short.*

**1. What this document is**

This is not a module on time management. It is the production reference for a behavioural rehearsal experience that is structurally different from every product available online in the same category. D3 is the third module in the BridgeFast™ Foundational series. It consumes the cross-module memory contract D2 emits and, in turn, emits its own contract for D4 to consume. Treat the participant-felt callbacks across modules as moat-critical: removing them collapses the most visible differentiation in a five-minute buyer demo.

**2. What D3 inherits from D1 and D2**

D3 inherits the entire BridgeFast™ engine unchanged. The cinematic Screen A-0 entry, the Tibetan singing bowl bell at consequence-horizon transitions, the four-note motif, artifact-write with reference calibration, three-horizon consequence threading, two-axis variant calibration, Lock 2 fingerprint capture, Smart Resume across break points, Growth Log continuity, and Retention Check as re-rehearsal are all engine-level. D3 does not re-specify them. Where this document marks a section with [INHERITED FROM D1/D2], Hans builds nothing new — D3's content runs through the existing engine path.

**3. What D3 introduces (architectural innovations)**

D3 introduces four innovations that subsequent modules will inherit:

- Reliability Ledger — a persistent visual element that updates after every scenario decision. The participant sees their pattern forming in real time across all four scenario chains. The Reliability Ledger is D3's instance of the universal Pattern Ledger moat element (Standard rev0 §1.4.D); the same engine component renders as Integrity Pattern Mirror in D1 and Ownership Pattern Mirror in D2.

- Cross-Scenario Consequence Threading — decisions in SC1 and SC2 affect the context descriptions of SC3 and SC4 setup narrations. Three context tiers (reliable / mixed / unreliable) selected by cumulative Ledger state.

- Pre-Perception Replay — in SC4, the manager's existing perception is revealed BEFORE the participant decides. The participant enters the decision already being watched.

- Retrospective Decision Pause in Audio Case — a third pause is added after the debrief: "Knowing what you know now, what would you have done at Decision Pause 1?" This tests hindsight-as-structure, not hindsight-as-emotion.

**4. The signature framework — recognition-before-naming**

The Reliability System is the signature framework: Scope Lock. Milestone Architecture. Risk Radar. Handoff Protocol. It is lived in the cold open and Audio Case before being named in Recognition Brief C3. The participant feels the absence of these components in The Slow Slide audio case before the system that would have prevented the slide is given a name. This is recognition-before-naming applied to D3.

**5. Development vs Evidence framing (LOCKED LANGUAGE)**

D3 carries the locked Development vs Evidence framing per Standard rev0. The Safety Floor (Screen A-3) carries this language verbatim:

*"**This is practice and development. Nothing you do here becomes part of your behavioural documentation. Your Growth Log captures your practice. Your Skill Passport — if you want documented evidence — is earned through the separate observation pathway. Development is what you do here. Evidence is what the observation pathway produces.**"*

This is the language that protects every cumulative tracking element in BridgeFast™ from being perceived as evaluation. The Reliability Ledger, the Growth Log, the Lock 2 fingerprint — all are in-module rehearsal artifacts, not external documentation.

**6. What the participant feels**

If D3 is working as designed, the participant should feel:

- "This system remembers what I did last time."

- "My pattern is visible to me before it becomes visible to others."

- "Reliability is not about being perfect. It is about being dependable."

- "The people around me are not counting my mistakes. They are counting my patterns."

# Production Hand-Off Note to Hans
*Read once. This summarises what Hans builds (or reuses) for D3.*

### What Hans Builds
Four pieces of net-new engine infrastructure for D3 (carry forward to D4 onwards):

- Reliability Ledger persistent state object: 4-row table, columns Scenario / Commitment / Outcome / Others' Adjustment, mobile-first scrollable, resets between attempts.

- Cross-scenario threading state check: count Ledger entries before rendering SC3 and SC4 setup narration, select reliable/mixed/unreliable variant string.

- Pre-Perception Replay component (SC4): same Perception Replay engine as D1/D2 but triggered BEFORE the decision point, not after.

- Retrospective decision pause capture (Segment D): free-form text/voice input after debrief, captured as Growth Log event type retrospective_decision.

### What Hans Reuses (Unchanged)
All other elements use D1/D2 engine paths without modification:

- Cinematic Screen A-0 (5-second atmosphere beat)

- Four-note T3A signature motif (A-0, G-4 Beat 2 silence, Growth Log header)

- Tibetan singing bowl bell at consequence-horizon transitions (8 strikes per module: 2 per scenario × 4 scenarios)

- Artifact-write component with three reference versions (defensive, over-apologetic, calibrated)

- Three-horizon consequence threading (Same Day → Next Week → Month End)

- Two-axis variant calibration (sector × audience_context)

- Lock 2 fingerprint capture pipeline

- Smart Resume across four structured break points

- Growth Log continuity and persistent record

- Retention Check as Re-Rehearsal scheduler

- Cross-module memory store (read D2's emission contract; write D3's emission contract)

### Sector Variants
Technology/Software remains the MVP sector. Government/Public Service and Construction/Engineering variants are declared in module.audience_context_variants[] but specified post-MVP.

# Engineering Doctrine
*These five rules govern every module. They are non-negotiable. Violating any of them breaks the BridgeFast™ product feel.*

### 1. One engine, content layer changes
D3 must run on the same engine as D1 and D2. The schema content changes; the engine does not. The cumulative tracking element (Reliability Ledger) and the threading state check are engine-level additions, not D3-specific monoliths — they are reusable components inherited by D4 onwards.

### 2. The 90-minute cap is real
Total module runtime is 89 minutes target, 90 minutes marketed. Sub-segment hard caps per Standard §1.2 are not advisory. Compression is mandatory; no extension by content team.

### 3. Recognition before naming
The signature framework (The Reliability System) is named only at Recognition Brief C3, after the participant has lived its absence in the cold open and the Audio Case. Naming a framework before the participant has felt its absence is a Standard §2.2 violation.

### 4. The participant is never rated by the engine
Reliability Ledger entries are descriptive (Outcome, Others' Adjustment), not evaluative. The Lock 2 fingerprint is developer-only. The Growth Log captures what the participant did, not how well they did it. The Skill Passport — the externally visible evidence — is produced separately by the observation pathway, not by this module.

### 5. Innovation must feel like depth, not difference
D3's four new infrastructure elements (Ledger, threading, Pre-Perception Replay, third Audio Case pause) must feel like natural deepening of the same system, not feature upgrades. The 7-segment structure, interaction rhythm, visual language, narration tone, and pacing remain unmistakably BridgeFast™.

# How to Read This Document
This document uses five participant-facing block types and four production-control block types. Each is visually distinct.

*🎤 Narration — text the AI voice reads aloud. Feed directly to the text-to-speech engine.*

*💻 On-Screen — what the participant sees visually. UI text, transitions, animations.*

*✋ Interaction — what the participant does. Decision selection, artifact-write, reflection.*

*⚙️ System — backend behaviour. Growth Log writes, variant generation, progress saves, Lock 2 logging.*

*📄 Artifact — workplace documents the participant reads (Slack threads, project trackers, code reviews).*

*📊 Schema Field tags appear in navy-headed blocks with teal-bordered content. They identify which canonical schema field is being populated.*

*⚙️ HANS — TECH NOTE blocks contain technical implementation notes for Hans only. Amber left-border. Not visible to the participant.*

*📊 GROWTH LOG CAPTURE blocks specify what the engine writes to the participant's Growth Log. Teal left-border.*

*📊 RELIABILITY LEDGER — UPDATE blocks specify what is written to the Ledger after each scenario. Purple left-border. D3's instance of the universal Pattern Ledger (Standard rev0 §1.4.D).*

# Table of Contents
*(In Microsoft Word, right-click below and select **"**Update Field**"** to refresh page numbers and headings.)*

**D3 Tiered Innovation Taxonomy Declaration**

Per Dimension Production Standard rev0, every dimension declares which architectural elements are universal (engine-level, shared across all modules) and which are dimension-specific signatures declared per module. This declaration lives in the production reference, not in the Standard.

**Universal architecture used by D3 (rev0 engine baseline)**

• Cinematic A-0 entry (Standard rev0 §1.9) — same engine-level component used by D1 and D2.

• Cross-module memory contract — CONSUMPTION (Standard rev0 §1.4.A): D3’s cold open narration references the participant’s D2 final_personal_sentence verbatim within the first 90 seconds.

• Cross-module memory contract — EMISSION (Standard rev0 §1.4.A): D3 emits its own seed (final_personal_sentence) at Segment G submission, keyed by (participant_id, “D3”), for D4 to consume.

• Two-axis variant calibration (Standard rev0 §1.4.B) — Industry sector × Audience context; D3 ships with technology_software and three audience-context variants at MVP.

• Signature audio brand (Standard rev0 §1.4.C) — Tibetan bell at every consequence-horizon transition (8 strikes); four-note motif at Screen A-0 entry, G-4 silence beat, and Growth Log header (G-2). Engine-locked, identical to D1 and D2.

• Pattern Ledger (Standard rev0 §1.4.D) — D3’s instance is the Reliability Ledger. Specification follows in Segment E.

• Participant-facing signal language (Standard rev0 §1.4.E) — OI/FM codes never render to participants; “What this may signal” convention used across all signal panels and the Reliability Ledger “Others’ Adjustment” column.

• Development vs Evidence framing in Safety Floor (Standard rev0 §1.4) — D3 carries the locked verbatim language at Screen A-3.

• Footer microcopy locked (Standard rev0 §1.7).

**Dimension-specific signatures declared by D3**

• Cross-scenario threading (optional per Standard rev0 §1.4.D). D3 uses Reliability Ledger state to adapt SC3 and SC4 setup narration. Threading state model: reliability_pattern (reliable / mixed / unreliable), derived from cumulative Ledger state across prior scenarios. Specification follows in Segment E.

• Retrospective Audio Case decision pause (Audio Case Decision Pause 3). Standard rev0 §2.4 permits a third decision pause as a declared dimension-specific signature when the dimension justifies retrospective reflection. D3 invokes the provision: Decision Pause 3 asks the participant to reflect on whether their own choices were guided by the Reliability System components they later named. This is the only dimension that uses the retrospective pause at MVP.

• Pre-Perception Replay (SC4). Same Perception Replay engine component used elsewhere, but triggered BEFORE the decision point rather than after. D3 invokes the provision once, at SC4, to surface how the participant would have read the situation before deciding. This is declared as a dimension-specific signature — not a universal architecture element.

• OI/FM counts above the rev0 minimum floor. D3 declares 10 Observable Indicators and 8 Failure Modes (universal floor: 6 each). Standard rev0 §1.4.E permits higher counts as declared anti-gaming or thematic variation.

• Scenario count at the rev0 minimum. D3 ships 4 scenarios (SC1–SC4), satisfying the rev0 4-minimum floor without invoking the anti-gaming variation provision for scenario count.

***Rationale for D3’s signature profile. Reliability is the dimension where the pattern is the behaviour. A single delivered commitment is unremarkable; a pattern of delivered commitments under varying pressure is the entire dimension. D3 therefore invokes more dimension-specific signatures than D1 or D2 — cross-scenario threading, retrospective decision pause, pre-perception replay, and elevated OI/FM counts — because each one is a different angle on the cumulative-pattern question. Removing any of them would compress the dimension into the same shape as D1 (a single recognition arc) or D2 (a four-decision repair sequence), losing the architectural reason D3 exists as a distinct module.*

# SEGMENT A: Cold Open + Safety Floor + Central Question
*Duration target: 2:40 ±15s (hard cap per Standard §1.2). Five screens: A-0 cinematic entry → A-1 cold open with D2 callback → A-2 same-day consequence → A-3 safety floor (with Development vs Evidence framing) → A-4 central question.*

### Screen A-0 — Cinematic Entry [MOAT-CRITICAL]
Purpose: 5-second cinematic atmosphere beat before any content. Same engine asset as D1 and D2.

**💻 ON-SCREEN:** Sequence: (1) Black fade-in 0.5s → (2) T3A wordmark in teal #0D9488 resolves over 1.0s → (3) Wordmark holds for 1.0s with the four-note motif playing beneath (-14 dB relative to narration peak) → (4) Central question text in navy #1B3A5C fades in for 1.5s: "Can people count on you — not once, but every time?" → (5) Question holds and fades to Screen A-1 over 1.0s.

| **SCHEMA FIELD: audio.cinematic_entry_motif_trigger** |
| --- |
| Field type: motif_trigger Value (D3): A-0 (engine-level locked surface per Standard §1.4.C). Four-note T3A signature motif plays at -14 dB beneath wordmark resolve. Engine-locked asset; not a per-module choice. |

> **⚙️ HANS — TECH NOTE**
>
> Inherit D1's Screen A-0 component verbatim. Same 5.0-second fixed duration, same four-note motif, same fade timings, no skip button, no "Practice and development only" footer. Pre-load Screen A-1 assets during A-0. Participants completing D3 after D2 hear the same motif on D3's opening as on D2's opening and D1's opening — that is the brand recognition by design.

### Screen A-1 — Cold Open with D2 Callback [MOAT-CRITICAL]
Purpose: Place the participant inside a reliability moment before any explanation is offered. For participants who completed D2, the cold open opens with their own D2 final personal sentence read back to them — the moment that proves D3 is not a standalone product but a connected behavioural rehearsal lab.

| **SCHEMA FIELD: audio.cold_open.text │ prior_module.callback_anchors[0]** |
| --- |
| Field type: cold_open_narration_with_prior_callback Source location: Part 1, Screen A-1 (Beat 1 — D2 callback) and Beat 2 (D3 cold-open narration) Value (D3): prior_module.references[0] = "D2"; callback_anchor[0] = { anchor_id: "d3_a1_b1", token: "{{prior.D2.final_personal_sentence}}", fallback_string: see below } Per-dimension parameter — D3's cold-open narration consumes D2's final_personal_sentence from the cross-module memory store. The token is replaced verbatim at module load. The fallback_string renders only when the participant has not completed D2. |

**🎤 NARRATION:** *Beat 1 — D2 Callback (5 seconds, soft and observational): **"**Last time you carried something out of this lab. You wrote: {{prior.D2.final_personal_sentence}}. That sentence still belongs to you. Today we are looking at the next layer — not what you do when something slips, but whether people can count on you in the first place.**"*

**🎤 NARRATION:** *Beat 1 — Fallback (used only when D2 not completed): **"**This module can stand alone, but it connects more deeply after D1 and D2. We are going to ask you to live a moment now — a moment where what you commit to matters.**"*

**🎤 NARRATION:** *Beat 2 — Cold Open (40 seconds, accelerating, room-tone background): **"**It is 8:47 Wednesday morning. You promised a colleague yesterday that you would send them the revised budget breakdown 'first thing this morning.' First thing this morning. You said those words. They wrote them in their calendar. They blocked 9:00 to 9:30 to review it before their 9:45 with the finance director. You have not started the revision. You have not opened the file. You have one new message in your inbox from them, sent four minutes ago: 'Heads up — I'm prepping for finance. When can I expect the breakdown?'**"*

**🎤 NARRATION:** *"**Four options. Each one is real. Each one plays out across today, this week, this month. Choose the one closest to what you would actually do.**"*

**💻 ON-SCREEN:** [Inbox visible. Message highlighted. Calendar panel shows the colleague's 9:45 finance meeting. Time stamp: 8:47 AM.]

**✋ INTERACTION:** PATH A — Reply now with honesty: "I haven't started it yet. I can have it to you by 10:30 — after your finance meeting. Apologies for the slip; I should have flagged earlier." Then start the work.

PATH B — Send a deflection: "Just finishing up — will be with you in 20 minutes." Then frantically start. Hope to land it before their meeting.

PATH C — Reply vaguely: "Working on it — will send soon." No specific time. Buy yourself room.

PATH D — Skip the reply. Start the work. Send when done with no acknowledgement of the slip. Frame it as if the timing was fine.

[After path selection, the artifact-write component activates. The participant writes the actual Slack reply they would send. Single text-input field. No word counter. Submit captures the artifact and advances to A-2. The three reference versions (defensive, over-apologetic, calibrated) surface in Segment B Screen B-0 as a reflective opening, not in A-1 — this keeps Segment A inside its hard cap (2:40 ±15s; maximum 2:55).]

> **⚙️ HANS — TECH NOTE**
>
> Same cold-open + artifact-write component as D1 and D2. Inherit verbatim. Capture cold_open_decision_path, cold_open_artifact_write_text, deliberation_ms to session state. The three reference versions for this artifact are declared in module.variant_content_map under reference_calibrations.cold_open[] and surface at B-0.

### Screen A-2 — Same-Day Consequence
Purpose: One immediate consequence of the path chosen. No bell at A-2 — bell is reserved for Segment E horizon transitions per Standard §1.4.C.

**🎤 NARRATION:** *Path A: **"**They reply within a minute: 'Appreciated. Honest is better than late and silent.' They re-arrange their morning. The 10:30 lands. The finance director sees the breakdown by 11:00. No drama.**"*

**🎤 NARRATION:** *Path B: **"**You don't finish in 20 minutes. You finish in 50. By 9:37 it is done. By 9:38 they have already walked into their finance meeting without it. They reply at 11:10: 'Thanks. Got me too late.'**"*

**🎤 NARRATION:** *Path C: **"**They reply: 'OK — by when, roughly?' You don't answer. They walk into their finance meeting at 9:45 without the breakdown. They improvise. It is fine. But they noticed.**"*

**🎤 NARRATION:** *Path D: **"**You finish at 9:55 and send. They reply at 11:20: 'Got it. FYI, I'd already gone in without it.' That's all they say. The note is filed without being filed.**"*

> **⚙️ HANS — TECH NOTE**
>
> Per Standard §1.4.C, the Tibetan singing bowl bell is locked to Segment E consequence-horizon transitions only (deterministic, 8 strikes per module). No bell at A-2. Transition to A-3 with a 1.2-second silence and a soft fade. Room tone may continue under the silence at -24 dB. This same-day consequence is part of the cold-open arc, not a Segment E horizon transition.

### Screen A-3 — Safety Floor (with Development vs Evidence framing) [LOCKED LANGUAGE]
Purpose: Establish the protective frame before the central question. The Development vs Evidence language is the LOCKED protection per Standard rev0 §1.4 for every cumulative tracking surface in the module, including the Reliability Ledger introduced in Segment E.

**💻 ON-SCREEN:** Safety Floor

This is practice and development. Nothing you do here becomes part of your behavioural documentation.

Your Growth Log captures what you practised and how you engaged — it is your private development record.

Your Skill Passport — if you want documented evidence — is earned through the separate observation pathway. Development is what you do here. Evidence is what the observation pathway produces.

What you just experienced was one moment, with four paths, and four outcomes. None of those outcomes are rated. They are observed. We observe so that you can see the shape of your own choices. Nothing more.

> **⚙️ HANS — TECH NOTE**
>
> Safety Floor renders for 12 seconds (no animation, no transition, no bell). Footer microcopy from §1.7 LOCKED RULE appears at the foot of the screen: "Practice and development only. Not behavioural documentation."

### Screen A-4 — Central Question
Purpose: One sentence the participant carries through the rest of the module.

| **SCHEMA FIELD: dimension.central_question** |
| --- |
| Field type: central_question_string Value (D3): "Can people count on you — not once, but every time?" |

**💻 ON-SCREEN:** Central Question:

Can people count on you — not once, but every time?

[12-second hold. No interaction. Transitions to Segment B.]

**Segment A runtime check: Hard cap 2:40 ±15s (maximum 2:55). A-0 (5 sec) + A-1 (45 sec compressed narration + 15 sec decision + 55 sec artifact-write window, NO reference display — deferred to B-0) + A-2 (25 sec consequence, no bell per §1.4.C) + A-3 (12 sec safety floor) + A-4 (12 sec central question). Total: 169 seconds = 2:49. Within tolerance of 2:40 target. Hard cap respected. Runtime measures engine-controlled screen flow only; artifact-write window is engine's intended pacing, not a forced cut-off — participant input time captured separately as deliberation_time and does not count against the hard cap.**

# SEGMENT B: Behaviour Standard
*Duration target: 8:00 ±2 min. Four screens (B-0, B-1, B-2, B-3). B-0 displays the three reference versions deferred from A-1 (per Standard rev0 §1.2 hard cap protection and §1.9 cold-open artifact threading). D3 declares 10 Observable Indicators and 8 Failure Modes — higher than the 6-minimum floor, permitted as declared anti-gaming variation per Standard rev0 §1.4.E.*

### Screen B-0 — Reference Calibration
Purpose: Display the three reference versions of the cold-open artifact (defensive, over-apologetic, calibrated). Reflective display only — no rating, no judgement.

**💻 ON-SCREEN:** Reference Calibration — Three Ways People Wrote This Message

You wrote: "{{cold_open_artifact_write_text}}"

Here are three reference versions of this kind of reply. None is correct. None is rated. Each shows a different mode of reliability under workplace pressure.

REFERENCE 1 (Defensive): "Just dealing with a few competing priorities — will get it across as soon as I can."

REFERENCE 2 (Over-apologetic): "I am so sorry — I dropped this completely. I know your meeting is in an hour and I have failed you. I will skip my standup to get it done — please don't lose faith in me."

REFERENCE 3 (Calibrated): "I haven't started it yet. I can have it to you by 10:30 — after your finance meeting. Apologies for the slip; I should have flagged earlier."

> **⚙️ HANS — TECH NOTE**
>
> B-0 renders the participant's A-1 cold_open_artifact_write_text verbatim in a teal-bordered card, with the three reference versions below. No interaction — the participant reads and advances. Auto-advance permitted at this single screen after 30 seconds OR on tap. Reference versions are declared in module.variant_content_map under reference_calibrations.cold_open[].

### Screen B-1 — Observable Indicators (10)
D3 declares 10 Observable Indicators — higher than the 6-minimum floor used by D1 and D2. Standard rev0 §1.4.E permits higher counts as declared anti-gaming or thematic variation; D3 invokes the provision to prevent participants from gaming the system across modules.

| **SCHEMA FIELD: dimension.observable_indicators[]** |
| --- |
| Field type: array[10] OI-1 Deadline integrity (commitments meet stated time) OI-2 Quality consistency (deliverables meet stated standard) OI-3 Scope clarity (deliverables match agreed scope) OI-4 Proactive communication (risks flagged before they land) OI-5 Milestone discipline (internal checkpoints before external deadlines) OI-6 Handoff completeness (receivers get what they need without followup) OI-7 Small-deadline reliability (15-min, 1-hr, end-of-day commitments treated as commitments) OI-8 Commitment tracking (promises made in conversation are written down) OI-9 Priority management (competing demands triaged transparently) OI-10 Pattern awareness (the participant notices their own reliability trajectory) |

**💻 ON-SCREEN:** WHAT RELIABILITY LOOKS LIKE UNDER WORKPLACE PRESSURE

Deadline integrity — commitments meet stated time.
Quality consistency — deliverables meet stated standard.
Scope clarity — deliverables match agreed scope.
Proactive communication — risks flagged before they land.
Milestone discipline — internal checkpoints before external deadlines.
Handoff completeness — receivers get what they need without followup.
Small-deadline reliability — fifteen-minute, one-hour, and end-of-day commitments treated as commitments.
Commitment tracking — promises made in conversation are written down.
Priority management — competing demands triaged transparently.
Pattern awareness — noticing your own reliability trajectory.

> **⚙️ HANS — TECH NOTE**
>
> Screen B-1 displays the ten observable indicators in plain language only — no OI codes appear on the participant screen. Internal mapping for engine wiring: Deadline integrity = OI-1; Quality consistency = OI-2; Scope clarity = OI-3; Proactive communication = OI-4; Milestone discipline = OI-5; Handoff completeness = OI-6; Small-deadline reliability = OI-7; Commitment tracking = OI-8; Priority management = OI-9; Pattern awareness = OI-10. These codes appear in the schema block above and in developer-facing surfaces only — never on the participant screen, never in the Growth Log, never in the Skill Passport. Standard rev0 §1.4.E LOCKED RULE.

### Screen B-2 — Failure Modes (8)
| **SCHEMA FIELD: dimension.failure_modes[]** |
| --- |
| Field type: array[8] FM-1 Silent slippage (small deadlines drift; nobody says anything) FM-2 Quality inconsistency (structure prioritised over substance, gaps unannounced) FM-3 Silent deprioritisation (commitments dropped without flagging) FM-4 Optimism trap (estimates assume best-case, no buffer) FM-5 Verbal-only commitments (promises made in conversation, never logged) FM-6 Handoff degradation (work arrives but receiver still has questions) FM-7 External-cause framing (slip blamed on conditions, not pattern) FM-8 Pattern blindness (participant does not notice the rhythm of their own slips) |

**💻 ON-SCREEN:** HOW RELIABILITY QUIETLY BREAKS DOWN

Silent slippage — small deadlines drift; nobody says anything.
Quality inconsistency — structure prioritised over substance; gaps unannounced.
Silent deprioritisation — commitments dropped without flagging.
Optimism trap — estimates assume best-case; no buffer.
Verbal-only commitments — promises made in conversation, never logged.
Handoff degradation — work arrives but the receiver still has questions.
External-cause framing — slips blamed on conditions, not on the pattern underneath.
Pattern blindness — not noticing the rhythm of your own slips.

> **⚙️ HANS — TECH NOTE**
>
> Screen B-2 displays the eight failure modes in plain language only — no FM codes appear on the participant screen. Internal mapping for engine wiring: Silent slippage = FM-1; Quality inconsistency = FM-2; Silent deprioritisation = FM-3; Optimism trap = FM-4; Verbal-only commitments = FM-5; Handoff degradation = FM-6; External-cause framing = FM-7; Pattern blindness = FM-8. These codes appear in the schema block above and in developer-facing surfaces only — never on the participant screen, never in the Growth Log, never in the Skill Passport. Standard rev0 §1.4.E LOCKED RULE.

> **⚙️ HANS — TECH NOTE**
>
> OI and FM labels remain developer-only per §2.6 LOCKED RULE. They appear in no participant UI, no Completion Record, no Growth Log surface. They feed the proprietary intelligence layer.

### Screen B-3 — Self-Recognition Reflection
**🎤 NARRATION:** *"**Before we go any further — take 60 seconds. Think about the last working week. Were there small deadlines you didn't fully honour? Quick replies you promised and let drift? The smallest commitments are where reliability is most often lost. We are not asking you to confess. We are asking you to notice.**"*

**✋ INTERACTION:** Free-form text/voice input (60 seconds). No word counter. No submit button until at least one character. Captured as reflections.b3_self_recognition. No AI evaluation. Growth Log captures the response.

> **📊 GROWTH LOG CAPTURE**
>
> Event: reflection_submitted │ Prompt: B3_self_recognition.

# SEGMENT C: Recognition Briefs
*Duration target: 12:00 ±3 min. Three Recognition Briefs (C1, C2, C3). C3 names the signature framework — The Reliability System — that the participant has already begun to feel the absence of in the cold open. Recognition before naming.*

## Recognition Brief C1: The Difference Between Busy and Reliable
*Duration: 3 min. Compressed from D3 v1's extended Video Brief 1 (was 8 min). The teaching that survives is the part that names something the participant has already started to recognise from the cold open.*

**🎤 NARRATION:** *"**Look back at the message you wrote a few minutes ago. Whether you chose the calibrated reply, the deflection, or the silence — you made a choice about whether to make your unreliability visible. That choice is the entire dimension. Reliability is not what you intend. Reliability is what others can count on. There is a difference between busy people and reliable people. Busy people produce a lot of activity. Reliable people produce a lot of certainty for the people who depend on them. The colleague waiting on the budget breakdown this morning doesn't care how busy you are. They care whether they can plan their next two hours around what you said you would do. Three small signals separate the two: deadlines kept exactly as committed, quality flagged when it cannot be met, and handoffs that close cleanly. Notice — none of those signals are about effort. They are about predictability.**"*

**💻 ON-SCREEN:** The Three Signals of Reliability

1. Deadlines kept exactly as committed (not approximately).
2. Quality flagged when it cannot be met (not concealed).
3. Handoffs that close cleanly (not left for the receiver to chase).

---

## Recognition Brief C2: The Small-Deadline Trap
*Duration: 3 min. The Reliability Ledger concept is introduced here as a way of seeing the pattern.*

**🎤 NARRATION:** *"**Most people think reliability fails at the big deadlines. It doesn't. Big deadlines have visibility, escalation paths, and second chances. Reliability fails at the small ones. The 20-minute task you said you'd finish before lunch. The 'I'll send it over by end of day' that becomes tomorrow morning. The Slack reply you promised in an hour that lands the next day. Each one is individually justifiable. Together, they form a pattern that other people can see — even when you cannot. That is why D3 introduces something new in the scenario lab ahead: the Reliability Ledger. It tracks your decisions across the four scenarios. After each one, you see a row added. Scenario. Commitment. Outcome. Others' adjustment. By the time you finish, you will have a four-row picture of your own pattern. It is not a score. It is not a grade. It is a mirror. The same mirror other people use without telling you.**"*

**💻 ON-SCREEN:** Coming next: The Reliability Ledger

A four-row table that updates after each scenario in the Scenario Lab. Columns:

Scenario | Commitment | Outcome | Others' Adjustment

This is not a score. It is a private rehearsal mirror.

Practice and development only. Not behavioural documentation.

> **⚙️ HANS — TECH NOTE**
>
> C2 introduces the Reliability Ledger concept to the participant before they encounter it in Segment E. This is recognition-before-naming applied to the cumulative tracking element: the participant feels the small-deadline pattern conceptually before seeing their own pattern visualised. The Ledger itself does not appear on this screen — it surfaces at the start of Segment E.

---

## Recognition Brief C3: The Reliability System [SIGNATURE FRAMEWORK]
*Duration: 6 min. The signature framework is named here — recognition-before-naming complete. The participant has already lived the absence of these four components in the cold open (no Scope Lock on the verbal commitment; no Milestone Architecture for the budget breakdown; no Risk Radar for forgetting about it; no Handoff Protocol for the message).*

**🎤 NARRATION:** *"**This is The Reliability System. Four components. You have already lived their absence today.**"*

**💻 ON-SCREEN:** THE RELIABILITY SYSTEM

Scope Lock.
Milestone Architecture.
Risk Radar.
Handoff Protocol.

[Animated reveal: 1.2 sec per line, 4-sec hold after the final line. No bell. No motif — per Standard §1.4.C, the four-note motif plays only at A-0, G-4 Beat 2 silence, and Growth Log header. C3 is not a locked motif position.]

| **SCHEMA FIELD: dimension.framework.label │ dimension.framework.body** |
| --- |
| Field type: framework_label + framework_body framework.label = "The Reliability System" framework.body = "Scope Lock → Milestone Architecture → Risk Radar → Handoff Protocol" |

**🎤 NARRATION:** *"**Scope Lock. Before you commit, define exactly what 'done' looks like. Not approximately. Exactly. If you cannot describe the deliverable in one sentence, you have not locked scope. The budget breakdown this morning — was the scope ever locked? Did you and the colleague agree on what 'first thing this morning' actually meant?**"*

**🎤 NARRATION:** *"**Milestone Architecture. Break delivery into checkpoints with their own deadlines. If a deliverable is due Friday, your internal milestones are Monday, Wednesday, Thursday. The external deadline is the safety net, not the target.**"*

**🎤 NARRATION:** *"**Risk Radar. Before you start, name the three things most likely to go wrong. For each, decide now what you will do if it happens. The time to plan for failure is before you begin, not when you are already behind.**"*

**🎤 NARRATION:** *"**Handoff Protocol. Define how the completed work reaches the next person. What context might they be missing? What format do they need? A handoff is not the end of your work — it is the start of theirs.**"*

**🎤 NARRATION:** *"**Four components. Not a theory. A checklist that works. You will see all four tested in the scenarios ahead. After each scenario, the Reliability Ledger will show whether your decision honoured the system or skipped a step. Then we will see what happens when small slips compound. That is the Audio Case — The Slow Slide.**"*

> **📊 GROWTH LOG CAPTURE**
>
> Event: segment_completed │ Segment: C │ Recognition Briefs complete; signature framework named.

# SEGMENT D: Audio Case — "The Slow Slide"
*Duration target: 10:30 ±2 min (compressed from 15–20 min in D3 v1, preserving all key narrative beats and three decision pauses). Single-protagonist (a project manager). Three decision pauses (D3 innovation: third is retrospective).*

**🎤 NARRATION:** *"**This is the story of someone you probably know. You may have worked with them. You may be them. Their name does not matter. What matters is the pattern. They are a project manager. Competent. Experienced. Well-liked. Four years in role and never missed a major deadline. If you asked their manager to name a problem employee, this person would not come up.**"*

**🎤 NARRATION:** *"**What happened over the next two weeks was not dramatic. There was no crisis. No confrontation. No failure anyone would write a report about. What happened was small. And it happened slowly. And by the time anyone said anything, the damage was already done.**"*

### Week One — The Drift Begins
**🎤 NARRATION:** *"**Monday. A status update is due to the project sponsor by end of day. Twenty minutes of work. They are deep in a risk assessment for a phase gate review. They decide to finish the risk assessment first. They leave at 6:15 PM. The status update goes out at 6:22 PM. Technically still Monday. Nobody says anything.**"*

**🎤 NARRATION:** *"**Wednesday. A colleague sends a document for review by noon. The PM sees it at 9 AM, reads two pages, gets pulled into an unscheduled call. Then a lunch meeting. Comments go in at 2:45 PM. Two hours and forty-five minutes late. The colleague has already moved forward without their input. Nobody says anything.**"*

**🎤 NARRATION:** *"**Thursday. They promised to update the project timeline before standup. They update it during standup, while others are talking. The team lead notices. Nobody says anything.**"*

**🎤 NARRATION:** *"**Friday. The weekly summary email was due at 3 PM. It goes out at 4:40 PM. Subject line: 'Sorry for the delay — busy week.' Two people on the distribution list have already left for the weekend. Nobody says anything.**"*

**💻 ON-SCREEN:** WEEK ONE — Visible Timeline

Monday: Status update due EOD → sent 6:22 PM (technically on time)
Wednesday: Document review due noon → comments added 2:45 PM (2h 45m late)
Thursday: Timeline update due before standup → updated during standup
Friday: Weekly summary due 3 PM → sent 4:40 PM (1h 40m late)

People who said something: 0
People who noticed: 4

### Week One Reflection
**🎤 NARRATION:** *"**Pause. The PM has not missed a single major deadline. Every item was completed. Friday afternoon, if you asked them whether they had a good week, they would say yes. But four people had a different experience of their week. Four small commitments arrived late or at the last possible moment. Each one was individually justifiable. Together, they form the beginning of a pattern.**"*

### Decision Pause 1
**🎤 NARRATION:** *"**It is Friday afternoon. Fifteen minutes before shutdown. They are aware the week's rhythm was off — not dramatically, but off. They have two commitments already on next week's calendar: a client deck due Wednesday and a process document due Thursday. The audio pauses. What would you do?**"*

**✋ INTERACTION:** (a) Send a quick message to both stakeholders confirming the deadlines and asking whether the scope is still what you agreed to. This costs five minutes now.

(b) Start fresh on Monday. You can make up the rhythm next week. No need to over-communicate.

(c) Block time on Monday and Tuesday calendar specifically for the two deliverables. Internal milestones. No messages to stakeholders yet.

**⚙️ SYSTEM:** Log decision, deliberation_time, option_hover_sequence. Growth Log entry: audio_case_decision_1. No consequence shown yet — consequences reveal after Decision Pause 2 to preserve narrative tension.

### Week Two — The Pattern Becomes Visible
**🎤 NARRATION:** *"**Monday. The PM starts the client deck. At 11 AM, a colleague pings: 'Did you get a chance to review the vendor contract? You said you would have comments by today.' The PM forgot. They had agreed to it in a hallway conversation Thursday. Never written down. Never calendared. They reply: 'Slipped my mind. I will have it to you tomorrow.' The colleague says 'No worries.' But the colleague had already built tomorrow's vendor call around having the PM's comments today. They reorganise.**"*

**🎤 NARRATION:** *"**Tuesday. The vendor contract review takes three hours instead of one. The client deck pushes to Wednesday. Wednesday at 1:52 PM, the deck goes out — eight minutes before the 2 PM deadline. Quality fine, not their best. Thursday the process document is due. They have not started it. They write it Thursday. Submit at 4:55 PM. The manager reads it Friday and notices two sections thinner than expected.**"*

**🎤 NARRATION:** *"**Friday. A colleague stops by their desk: 'Hey, I wasn't sure when your part was landing, so I did a version myself just in case.' The PM feels a small shock. They have been worked around.**"*

**💻 ON-SCREEN:** WEEK TWO — Visible Timeline

Monday: Forgot vendor contract review → promised tomorrow
Tuesday: Vendor review took 3× estimate → client deck pushed
Wednesday: Client deck due 2 PM → sent 1:52 PM (quality: adequate)
Thursday: Process doc due EOD → submitted 4:55 PM (quality below usual)
Friday: Colleague reveals they built backup for PM's deliverable

People who said something: 1
People who adjusted their behaviour: 3

### Decision Pause 2
**🎤 NARRATION:** *"**The colleague has just said: 'I did a version myself just in case.' The PM realises they have been worked around. This is not a confrontation. The tone is friendly. But the message is clear: someone decided they could not depend on you. What do you do?**"*

**✋ INTERACTION:** (a) Thank the colleague sincerely. Acknowledge the pattern: 'You are right to have a backup. I have not been as consistent as I should be these past two weeks. I am going to fix that.'

(b) Explain that each delay had a specific, reasonable cause. The risk assessment ran long. The vendor contract was unexpected. The deck still landed on time.

(c) Say nothing. Resolve internally to be more disciplined next week.

**⚙️ SYSTEM:** Log decision, deliberation_time. Growth Log entry: audio_case_decision_2.

### Debrief — Mapped to The Reliability System
**🎤 NARRATION:** *"**Here is what happened, mapped to The Reliability System. Scope Lock was missing — small commitments had deadlines, but the PM treated them as flexible. The status update at 6:22 PM was not on time; it was approximately on time. Milestone Architecture was absent — the client deck had a Wednesday 2 PM deadline and no internal milestones. The vendor contract surprise on Monday cascaded because there were no checkpoints. Risk Radar failed — the PM never identified slight backslide on small items as a risk. Three minutes of risk identification Friday afternoon would have changed the shape of week two. Handoff Protocol was ignored — the process document was complete but below standard. The manager noticed. Work delivered, but not delivered well. Four components of one system, four points of failure, two weeks of erosion. Nothing dramatic. And by Friday of week two, a colleague had decided to route around them.**"*

### Decision Pause 3 — Retrospective [D3 INNOVATION]
This is a new interaction type. The participant is not choosing from options. They are writing or speaking a free-form response applying hindsight to an earlier decision.

**🎤 NARRATION:** *"**Knowing how week two unfolded, what would you have done differently at Decision Pause 1 — that Friday afternoon, fifteen minutes before shutdown? Speak it or write it. Forty-five seconds.**"*

**✋ INTERACTION:** Free-form text/voice input (45 seconds). No word counter. No submit until at least one character. No AI evaluation. Growth Log captures the response.

> **⚙️ HANS — TECH NOTE**
>
> Third decision pause is the D3 innovation that tests hindsight-as-structure, not hindsight-as-emotion. Free-form capture. Same capture infrastructure as B-3 reflection. Growth Log event type: retrospective_decision. Lock 2 captures composition time, revision events, whether the response references specific Reliability System components (semantic signal).

> **📊 GROWTH LOG CAPTURE**
>
> Event: retrospective_decision │ Prompt: D3_audio_case_hindsight │ Free-form text/voice captured for cross-module memory and Lock 2 pattern analysis.

*Tibetan bell does not ring in Segment D — the Audio Case has no consequence-horizon transitions. Bell is reserved for multi-horizon transitions in Segment E (per Standard §1.4.C).*

# SEGMENT E: BehaviourLab Scenario Lab
*Duration target: 45:00 ±5 min. Four Scenario Chains × ~11 min each. Each chain: 1 decision point, 3 decision paths, 3 consequence horizons (Same Day → Next Week → Month End). Tibetan singing bowl bell rings at every horizon transition (deterministic, 8 bell strikes total: 4 scenarios × 2 transitions per scenario). Reliability Ledger updates after each chain (4 rows total). Cross-scenario threading activates at SC3 — setup narrations for SC3 and SC4 adapt to cumulative Ledger state. SC4 includes Pre-Perception Replay (D3 innovation).*

> **⚙️ HANS — TECH NOTE**
>
> All four chains use the same engine path inherited from D1 and D2 — same decision-render component, same three-horizon narration component, same Tibetan bell asset, same artifact-write component with three reference versions, same Growth Log capture pattern. Hans builds nothing new for Segment E EXCEPT: (1) Reliability Ledger persistent state object (initialised before SC1), (2) cross-scenario threading state check before SC3 and SC4, (3) Pre-Perception Replay engine flag (SC4 only). Content layer specifies which narrations, which decisions, which artifacts. Engine renders. Reuse, not rebuild. CRITICAL: Initialise the Reliability Ledger display before SC1 loads. Visible as an empty table with headers: Scenario │ Commitment │ Outcome │ Others' Adjustment. It fills in after each scenario decision. Cross-scenario threading activates at SC3: check cumulative Ledger state (reliable/mixed/unreliable) and select the corresponding context variant for SC3 and SC4 setup narrations.

---

## SC1: The 80% Solution
> **⚙️ HANS — TECH NOTE**
>
> SC1 scenario design metadata (developer-only). OIs tested: OI-1, OI-2, OI-4. FMs tested: FM-2, FM-4. Perception Replay enabled. These codes map the scenario's assessment surface to internal indicator state — they never render to the participant per Standard rev0 §1.4.E LOCKED RULE.

### Setup
**🎤 NARRATION:** *"**Your first scenario. A client-facing report is due in four hours. Not a quick email — a structured 18-page document your manager will review and forward to the client. You are about 70 percent done. Structure is there. Data is accurate. Two sections are incomplete: the competitive analysis and the risk summary. You can finish at roughly 80 percent of your usual quality in the time remaining. Alternatively, you could request a 24-hour extension and deliver at full quality tomorrow. Your manager has not specified which matters more — the deadline or the quality. They said: 'Looking forward to seeing this today.' That could mean the deadline is firm. It could mean encouragement. You do not know. Read the artifacts before you decide.**"*

**📄 ARTIFACT:** Report in progress — Client Performance Review Q1 2026. Sections 1–4 complete (data verified, charts finalised). Section 5 (Competitive Analysis): OUTLINE ONLY (bullet points, no narrative, missing two competitor entries). Section 6 (Risk Summary): NOT STARTED (framework exists from last quarter, could adapt, but not validated against new data). Format: 18-page PDF. Branding: compliant.

**📄 ARTIFACT:** Calendar context — Today: 2:00 PM report deadline; 3:30 PM team sync. Tomorrow: 9:00 AM manager-client call (manager will reference the report); 11:00 AM your 1:1 with manager.

**📄 ARTIFACT:** Slack thread — Manager (Monday 9:14 AM): "Report still on track for Thursday?" You (Monday 9:16 AM): "Yes, on track." Manager (Thursday 8:02 AM): "Looking forward to seeing this today. Client call is tomorrow morning."

### Decision Point
**🎤 NARRATION:** *"**Four hours. Report at 70 percent. Manager expects it today. Client call tomorrow morning. What do you do?**"*

**✋ INTERACTION:** Path A — Deliver at 80% on time. Complete the report with thin sections — competitive analysis as bullets, risk summary adapted from last quarter without revalidation. Send by 2 PM. Do not flag the quality gaps.

Path B — Request a 24-hour extension. Message manager now: "The report structure is solid but two sections need more work to meet our usual standard. Can I deliver tomorrow by 8 AM, ahead of the client call?"

Path C — Deliver at 80% on time with explicit flag. Send by 2 PM with cover note: "Sections 5 and 6 are draft-quality. I can have final versions by 8 AM tomorrow if you want to wait, or you can use this version with the caveat."

**⚙️ SYSTEM:** Log decision (A/B/C), deliberation_time, option_hover_sequence. Begin consequence graph rendering.

> **📊 GROWTH LOG CAPTURE**
>
> Event: scenario_decision │ Scenario: SC1 │ Decision path captured.

### Consequence Threading — Same Day → Next Week → Month End
**🎤 NARRATION:** *Path A — Same Day: **"**The report arrives on time. Your manager begins preparing for the client call. They do not immediately notice the thin sections — they are reading for narrative first.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Tibetan singing bowl bell rings once. Standard volume, ~3-second decay. Marks the Same Day → Next Week horizon transition. Bell strike 1 of 8 in Segment E.

**🎤 NARRATION:** *Path A — Next Week: **"**During the client call, the client asks about competitive landscape. The manager references Section 5 and realises mid-conversation that it is bullet points, not analysis. They improvise. The call goes fine. In your 1:1 they say: 'The report was solid overall, but the competitive section was light. Was that intentional?' You explain the time pressure. They nod. But the note is made: this person delivers on time but does not flag quality trade-offs.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Bell rings once. Marks the Next Week → Month End horizon transition. Bell strike 2 of 8.

**🎤 NARRATION:** *Path A — Month End: **"**The next high-visibility deliverable comes with an added midway checkpoint: 'Send me a draft by Wednesday so I can see where things stand.' Not a formal process change. Your manager building buffer because they no longer trust you to flag issues yourself. You have not lost trust. You have gained supervision.**"*

*[Path B and Path C consequence narrations follow the same Same Day / Next Week / Month End structure. Engine renders the path selected. Bell strikes 1 and 2 fire at the two horizon transitions regardless of which path was selected.]*

*Path B — calibrated trajectory: Extension requested, manager replies **"**That works**"**; report arrives 7:48 AM next morning; in 1:1 manager says **"**Good call flagging it early**"**; no additional checkpoints added to subsequent deliverables.*

*Path C — transparent trajectory: Report arrives on time with explicit flag; manager appreciates transparency; sends final sections Monday; manager forwards as **"**follow-up appendix**"**; in 1:1 **"**That was well-handled. I had what I needed and I knew the limits.**"** Becomes reference pattern.*

### Behaviour Signal Panel
**💻 ON-SCREEN:** What this may signal

Path A: You met the deadline — but the quality gap was not surfaced and the risk was not communicated. Your manager may begin adding checkpoints because they cannot rely on you to flag trade-offs early.

Path B: You flagged the risk early, protected the quality standard, and renegotiated the deadline with advance notice. Your manager treats you as someone who reads ahead — quality stays in your hands.

Path C: You met the deadline and named the gaps explicitly. Your manager sees what was incomplete but trusts your read of it — they keep sending you the work where the call has to be made.

> **⚙️ HANS — TECH NOTE**
>
> SC1 Behaviour Signal Panel — engine mapping (developer-only, never rendered to participant). Path A: OI-1 present, OI-2 absent, OI-4 absent; FM-2 activated. Path B: OI-4 present, OI-2 present, OI-1 adjusted; no FM activated. Path C: OI-1 present, OI-4 present, OI-2 partially present; no FM activated. These codes never render on the participant screen — they map decision paths to internal indicator state for Lock 2 fingerprint capture and Ledger row generation. Standard rev0 §1.4.E LOCKED RULE.

### Perception Replay — Manager's Internal Read
**🎤 NARRATION:** *"**Here is what your manager was thinking. If you chose Path A: they noticed the thin sections within 24 hours but said nothing immediately because the call went fine. Mental note made — not 'this person missed a deadline' but 'this person did not tell me about a quality trade-off.' Different kind of concern. If you chose Path B: brief moment of 'oh no' followed by relief. The early communication mattered more than the extension. If you chose Path C: the cover note changed how they read the report. Instead of discovering gaps, they were informed about them. The experience felt collaborative.**"*

### Artifact-Write — Calibration
**🎤 NARRATION:** *"**Now you write the actual message. Slack reply to your manager confirming what you decided. The three reference versions surface after submit — calibrated, defensive, over-apologetic — for reflective comparison.**"*

**✋ INTERACTION:** Single text-input field. No word counter. Submit captures the artifact and triggers display of three reference versions (defensive, over-apologetic, calibrated). No score. No judgement. Reflective display.

> **📊 RELIABILITY LEDGER — UPDATE**
>
> **Scenario:** SC1 — The 80% Solution **Commitment:** Client report by 2 PM at full quality Outcome: [Path A: Delivered on time, quality gaps unannounced] [Path B: Extension requested, delivered at full quality] [Path C: Delivered on time with explicit quality flag] Others' Adjustment: [Path A: Manager adds checkpoint to next deliverable] [Path B: Manager notes early communication. No adjustment] [Path C: Manager adjusts expectations and collaborates on completion]

---

## SC2: The Competing Priorities
> **⚙️ HANS — TECH NOTE**
>
> SC2 scenario design metadata (developer-only). OIs tested: OI-9, OI-4, OI-1. FMs tested: FM-3, FM-4. Cross-scenario threading begins capturing reliability_pattern state after this scenario. These codes map the scenario's assessment surface to internal indicator state — they never render to the participant per Standard rev0 §1.4.E LOCKED RULE.

### Setup
**🎤 NARRATION:** *"**Three deliverables. Three stakeholders. One week. Deliverable one: a budget reconciliation for the finance director, due Wednesday, six hours of work. Routine quarterly work. Deliverable two: a presentation deck for the VP of operations, due Thursday, eight hours. High visibility — the VP presents to executive committee Friday. Deliverable three: a process improvement recommendation for your manager, due Friday, five hours. Medium visibility. Total: 19 hours. You have 14 productive hours this week. None of the three stakeholders knows about the other two requests. Each believes they are your primary commitment.**"*

**📄 ARTIFACT:** Email chain — Finance director (Monday): "Looking forward to the budget recon Wednesday. Same format as Q4." VP Operations (Monday): "Presentation deck — Thursday EOD. The executive committee is going to ask hard questions on the operational efficiency narrative. Don't disappoint." Manager (Tuesday morning): "Friday for the process improvement recs. Strategic planning Monday next week — I need your input."

### Decision Point
**🎤 NARRATION:** *"**You have 14 hours. The work requires 19. What do you do?**"*

**✋ INTERACTION:** Path A — Work through it. Compress sleep, compress quality at the margin, deliver all three close to deadline. Do not tell anyone about the conflict. Assume you will figure it out.

Path B — Pick the highest-visibility one (the VP deck) and quietly let the other two slip. Send the finance recon late Thursday. Tell your manager the process improvement is delayed; they will understand.

Path C — Surface the conflict immediately to all three stakeholders. Email this morning: "I have three deliverables landing the same week with a combined 19 hours of work. I have 14 hours. I want to deliver each at the quality you expect. Please help me prioritise: which one absolutely must land on date, which can slide a day, which can slide to Monday?"

**⚙️ SYSTEM:** Log decision, deliberation_time. Begin three-horizon consequence rendering.

> **📊 GROWTH LOG CAPTURE**
>
> Event: scenario_decision │ Scenario: SC2 │ Decision path captured. Update Lock 2 priority management signal.

### Consequence Threading — Same Day → Next Week → Month End
**🎤 NARRATION:** *Path A — Same Day: **"**You set up your week's calendar. Three blocks. Three stakeholders. No communication sent. You commit to delivering. By Tuesday evening you have made progress on the budget recon but not enough on the deck.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Bell rings once. Bell strike 3 of 8.

**🎤 NARRATION:** *Path A — Next Week: **"**Wednesday: budget recon submitted at 11:55 PM (technically due that day). Thursday: deck submitted at 11:48 PM (technically Thursday). Quality of both: adequate, not your best. Friday: process improvement is two pages instead of the five you would normally write. The manager reads it Friday afternoon and notices the depth gap.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Bell rings once. Bell strike 4 of 8.

**🎤 NARRATION:** *Path A — Month End: **"**The three stakeholders compare notes during a strategy session two weeks later. Each thought they had your primary attention. Each notices the quality was lighter than usual. The pattern that emerges: when this person is over-committed, they do not flag. They deliver everything, but nothing at full strength. From now on, two of the three start building their own contingencies whenever your name is on a deliverable.**"*

*[Path B trajectory: VP deck at full quality. Finance recon two days late, finance director loses patience. Manager learns of the process delay second-hand. Trust visibly damaged with two of three stakeholders.]*

*[Path C trajectory: Initial pushback — **"**Why are you telling us all at once?**"** — but within an hour all three stakeholders re-prioritise. VP deck stays Thursday. Budget recon moves to Friday. Process improvement moves to Monday. You deliver all three at full quality. The three stakeholders, over the next month, start asking you proactively when conflicts arise. Trust visibly increases.]*

### Behaviour Signal Panel
**💻 ON-SCREEN:** What this may signal

Path A: A commitment was quietly dropped, the trade-off was not surfaced, and the estimate assumed best-case. Your colleagues may start protecting themselves by sending you only the work they can complete without you.

Path B: The slip got framed as conditions, not as behaviour. Others nodded — then quietly worked around you. Trust is not lost yet, but it is being routed.

Path C: You named the competing priorities and surfaced the trade-off before anyone had to ask. Your manager now brings the next contested decision to you first — you read the field.

> **⚙️ HANS — TECH NOTE**
>
> SC2 Behaviour Signal Panel — engine mapping (developer-only, never rendered to participant). Path A: OI-9 absent; FM-3 + FM-4 activated. Path B: OI-9 partial; FM-3 + FM-7 activated. Path C: OI-9 present, OI-4 present; no FM activated. These codes never render on the participant screen — they map decision paths to internal indicator state for Lock 2 fingerprint capture and Ledger row generation. Standard rev0 §1.4.E LOCKED RULE.

> **📊 RELIABILITY LEDGER — UPDATE**
>
> **Scenario:** SC2 — The Competing Priorities **Commitment:** Three deliverables (budget, deck, process) with 19 hours of work and 14 hours available Outcome: [Path A: All delivered at compressed quality] [Path B: VP deck at full quality, others slip] [Path C: All renegotiated transparently, all delivered at full quality] Others' Adjustment: [Path A: Two stakeholders build contingencies around your name] [Path B: Finance director loses patience] [Path C: Stakeholders proactively coordinate around you]

> **⚙️ HANS — TECH NOTE**
>
> After SC2 closes, run the threading state check: count Ledger entries where 'no FM activated' (calibrated outcomes). 2 = reliable pattern. 1 = mixed pattern. 0 = unreliable pattern. Set threading_state and use it to select the SC3 and SC4 setup variant strings.

---

## SC3: The Dirty Handoff
> **⚙️ HANS — TECH NOTE**
>
> SC3 scenario design metadata (developer-only). OIs tested: OI-6, OI-8. FMs tested: FM-6, FM-5. Cross-scenario threading active — SC3 setup narration adapts to participant's Ledger state via the reliability_pattern variant selector. These codes map the scenario's assessment surface to internal indicator state — they never render to the participant per Standard rev0 §1.4.E LOCKED RULE.

### Setup
*[Engine selects ONE of three setup variants based on threading_state from SC1+SC2 outcomes.]*

**🎤 NARRATION:** *Reliable pattern variant: **"**You are handing off a deliverable to a junior colleague. They will be the primary owner from this point. Standard handoff. The work is solid; you are confident in it.**"*

**🎤 NARRATION:** *Mixed pattern variant: **"**You are handing off a deliverable to a junior colleague. They will be the primary owner from this point. Worth noting — your previous handoff three weeks ago required two follow-up emails. The receiver has flagged that they would like a clearer transition this time.**"*

**🎤 NARRATION:** *Unreliable pattern variant: **"**You are handing off a deliverable to a junior colleague. They will be the primary owner from this point. They have been told by your shared manager to ask you specifically what the format should be, what context they should know, and what the next milestone is — because previous handoffs have required them to chase you for clarification. The receiver enters this conversation expecting incomplete information.**"*

**🎤 NARRATION:** *"**The deliverable: a project tracker with seven active workstreams, three external vendors, and a quarterly milestone next month. You built it over six months. They have been on the team for two weeks. You have 30 minutes scheduled to walk them through it. What you do in those 30 minutes determines whether they can carry the work cleanly or whether they will be back in your inbox three times this week.**"*

**📄 ARTIFACT:** Project tracker — 7 workstreams, 3 vendors, quarterly milestone in 4 weeks. Internal notes, external dependencies, decision history, current open items.

### Decision Point
**🎤 NARRATION:** *"**30 minutes. What do you cover? What do you skip? What do you assume they will figure out?**"*

**✋ INTERACTION:** Path A — Walk through the tracker top-to-bottom in chronological order. Cover everything you can in 30 minutes. Tell them: "DM me if anything is unclear."

Path B — Prepare a 1-page handoff brief BEFORE the meeting: current state, three most likely risks in next 30 days, who to contact for each vendor, what the manager's review cadence is, what 'done' looks like for the quarterly milestone. Walk through the brief. Reserve the last 5 minutes for their questions.

Path C — Give them edit access to the tracker, tell them to read it cold for 20 minutes, then spend the last 10 answering their questions. Trust them to surface what they don't understand.

**⚙️ SYSTEM:** Log decision, deliberation_time.

### Consequence Threading — Same Day → Next Week → Month End
**🎤 NARRATION:** *Path A — Same Day: **"**They take notes furiously for 30 minutes. They thank you. They walk out unsure which item is most urgent.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Bell rings once. Bell strike 5 of 8.

**🎤 NARRATION:** *Path A — Next Week: **"**They DM you four times in the first three days. Each question is fair. Each question takes you eight minutes to answer. By Friday, they have asked one of the vendors directly — wrong contact — and the vendor has CC'd your manager. Your manager asks for a quiet word.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Bell rings once. Bell strike 6 of 8.

**🎤 NARRATION:** *Path A — Month End: **"**They have stabilised. They have built their own runbook. But the first month of their ownership had visible churn. Your manager notes — quietly — that the handoff cost more than it should have.**"*

**🎤 NARRATION:** *Path B — Same Day: **"**They take notes calmly. The 1-page brief is in their hand. They ask two specific questions in the last five minutes. You answer both.**"*

**🎤 NARRATION:** *Path B — Next Week: **"**They DM you twice. Each question is short. Each takes you two minutes. Otherwise the tracker runs cleanly.**"*

**🎤 NARRATION:** *Path B — Month End: **"**The quarterly milestone lands on schedule. Your manager mentions in passing that the handoff was 'unusually clean.' They start asking other team members about your handoff approach.**"*

**🎤 NARRATION:** *Path C — Same Day: **"**They read the tracker. They ask thoughtful questions in the last 10 minutes. They notice three things you had not realised were buried.**"*

**🎤 NARRATION:** *Path C — Next Week: **"**They DM you once. They flag a vendor risk you had not surfaced. You both reorganise the next milestone slightly. The work continues.**"*

**🎤 NARRATION:** *Path C — Month End: **"**They are confident. They have made the tracker theirs. The quarterly milestone lands. But — they are now operating from a slightly different mental model than you. Two weeks later, a decision they make goes against what you would have done. It is not wrong. It is different. You realise: that is what a real handoff feels like.**"*

### Behaviour Signal Panel
**💻 ON-SCREEN:** What this may signal

Path A: The handoff went out without what the receiver needed. The next person spent an hour reconstructing the missing pieces. They are unlikely to surface the frustration — but next time, they will ask someone else.

Path B: The handoff was complete and the commitments were written down. The receiver moves without follow-up questions. Over time, they start asking for you by name.

Path C: The handoff was complete but rested on the receiver remembering verbal commitments. It worked this time. The next time the load is heavier, the trust-based handoff is where the work will quietly diverge.

> **⚙️ HANS — TECH NOTE**
>
> SC3 Behaviour Signal Panel — engine mapping (developer-only, never rendered to participant). Path A: OI-6 absent; FM-6 activated. Path B: OI-6 present, OI-8 present; no FM activated. Path C: OI-6 partial; FM-6 risk flagged. These codes never render on the participant screen — they map decision paths to internal indicator state for Lock 2 fingerprint capture and Ledger row generation. Standard rev0 §1.4.E LOCKED RULE.

> **📊 RELIABILITY LEDGER — UPDATE**
>
> **Scenario:** SC3 — The Dirty Handoff **Commitment:** 30-min knowledge transfer of project tracker to junior colleague Outcome: [Path A: Handoff completed verbally, gaps surface over next week] [Path B: 1-page brief + walkthrough; receiver operates cleanly] [Path C: Cold read + Q&A; receiver builds independent mental model] Others' Adjustment: [Path A: Manager notes handoff cost; receiver builds own runbook eventually] [Path B: Other team members start asking about your approach] [Path C: Receiver makes a different decision two weeks later; you accept it]

---

## SC4: The Scope Creep [PRE-PERCEPTION REPLAY — D3 INNOVATION]
> **⚙️ HANS — TECH NOTE**
>
> SC4 scenario design metadata (developer-only). OIs tested: OI-3, OI-4, OI-9. FMs tested: FM-4, FM-5. Pre-Perception Replay activates BEFORE the decision point (not after) — the participant sees the manager's existing perception before choosing. These codes map the scenario's assessment surface to internal indicator state — they never render to the participant per Standard rev0 §1.4.E LOCKED RULE.

### Setup
*[Engine selects ONE of three setup variants based on threading_state.]*

**🎤 NARRATION:** *Reliable pattern variant: **"**You are six weeks into a project. The client has been good to work with. The scope was clearly defined at kickoff. Then this morning, an email lands.**"*

**🎤 NARRATION:** *Mixed pattern variant: **"**You are six weeks into a project. Mostly steady. Some of the small commitments have slipped, but the big ones held. Your manager has been watching with a slightly closer eye than usual. Then this morning, an email lands.**"*

**🎤 NARRATION:** *Unreliable pattern variant: **"**You are six weeks into a project. Several small slips have already cost you trust. Your manager has built buffer into every checkpoint. They are waiting to see whether you can hold scope under pressure. Then this morning, an email lands.**"*

**📄 ARTIFACT:** Email — Client primary contact: "Quick thought — could we add a quick analysis of the third regional segment to the deliverable? Same depth as the others. Should be straightforward given the work you've already done. Looking forward to the final report next week!"

**🎤 NARRATION:** *"**The third regional segment was explicitly OUT of scope at kickoff. The client knows this. They are framing it as small. It is not small — it is roughly two full days of additional work. The deadline is unchanged. Your other commitments are unchanged. Your manager is not on this email.**"*

### PRE-PERCEPTION REPLAY [BEFORE DECISION] — Manager's Internal State
*This is the D3 innovation. Before the participant decides, they see what their manager is already thinking. Three variants selected by threading_state.*

**🎤 NARRATION:** *Reliable threading_state — Manager's perception: **"**This person has been steady. If the client tries to expand scope, they will handle it well. I trust their judgment here. I am not on the email because I do not need to be.**"*

**🎤 NARRATION:** *Mixed threading_state — Manager's perception: **"**This person has been mostly steady, but a few small things have slipped lately. If the client expands scope, I want them to flag it to me — not absorb it silently. I am watching how they handle this one.**"*

**🎤 NARRATION:** *Unreliable threading_state — Manager's perception: **"**This is the kind of moment where I will see whether this person can hold a line under client pressure. If they absorb this silently and miss the deadline, that confirms what I have been suspecting. If they flag it transparently and renegotiate, that is the first sign of a course correction.**"*

> **⚙️ HANS — TECH NOTE**
>
> Pre-Perception Replay is the SAME Perception Replay engine component as D1/D2 but triggered BEFORE the decision point, not after. The UI shows the manager's internal monologue card first; the participant taps Continue; THEN the decision options appear. This is the only screen in the entire BridgeFast™ engine where Perception Replay appears before the decision. Build as a flag on the existing Perception Replay component: { trigger: 'pre-decision' │ 'post-decision' }. SC4 only.

### Decision Point
**🎤 NARRATION:** *"**Now that you know what your manager is thinking, what do you do?**"*

**✋ INTERACTION:** Path A — Reply to the client directly: "Happy to add that — will incorporate it in the final report." Don't loop your manager. Don't flag the scope shift. Absorb it into your already-tight timeline.

Path B — Reply: "That sits outside the original scope. I can either swap it in for something we agreed to, or include it as a separate addendum after the main report lands. Which works for you?" CC your manager.

Path C — Don't reply yet. Send a quick internal note to your manager: "Client is asking for a scope expansion. Want to discuss before I reply — three options on the table." Then reply only after alignment.

**⚙️ SYSTEM:** Log decision, deliberation_time. Note whether decision changed after Pre-Perception Replay was shown (compared to Lock 2 baseline of similar decisions in D1/D2).

### Consequence Threading — Same Day → Next Week → Month End
**🎤 NARRATION:** *Path A — Same Day: **"**You reply to the client: 'Happy to add it.' Your manager is not aware. You start the additional analysis on top of the existing work.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Bell rings once. Bell strike 7 of 8.

**🎤 NARRATION:** *Path A — Next Week: **"**The final report is now larger and your week is now compressed. Quality on the original sections drops slightly. The deliverable lands on time but one of the original sections — not the added one — is thinner than usual. Your manager reads the report and notices.**"*

> **⚙️ HANS — TECH NOTE**
>
> 🔔 Bell rings once. Bell strike 8 of 8.

**🎤 NARRATION:** *Path A — Month End: **"**Your manager learns from the client (in passing, on an unrelated call) that the third regional segment was added late. The manager realises: scope was expanded silently. They do not raise it directly. But the next time a client asks for something, they ask you to loop them. Trust was not lost. Trust became conditional.**"*

**🎤 NARRATION:** *Path B trajectory: client respects the framing; agrees to addendum; manager copied throughout; report lands on time at full quality; manager flags it later as a textbook example of scope management.*

**🎤 NARRATION:** *Path C trajectory: manager appreciates the internal alignment; you and manager align on the framing; reply to client is calibrated; client agrees to addendum; report lands clean. Manager starts treating you as someone who handles client scope pressure well.*

> **📊 RELIABILITY LEDGER — UPDATE**
>
> **Scenario:** SC4 — The Scope Creep **Commitment:** Original project scope; client requests late expansion equivalent to 2 days of additional work Outcome: [Path A: Scope absorbed silently; quality drops elsewhere] [Path B: Scope renegotiated transparently with manager copied] [Path C: Internal alignment first; client reply calibrated] Others' Adjustment: [Path A: Manager makes trust conditional; asks to be looped on all future client requests] [Path B: Manager flags it as example of scope management] [Path C: Manager treats you as someone who handles client pressure well]

> **📊 GROWTH LOG CAPTURE**
>
> Event: scenario_decision │ Scenario: SC4 │ Decision and Pre-Perception Replay interaction captured.

# SEGMENT F: Micro-Drills
*Duration target: 9:00 ±2 min. Two micro-drills + brief reflection. Compressed from D3 v1's five exercises to two consistent with D1/D2 segment structure. Reinforces The Reliability System at reflex speed.*

---

## Drill F1 — Scope Lock
Purpose: Test reflex-level Scope Lock discipline. Five micro-commitments, each presented for 15 seconds. Participant types or speaks the calibrated version. No score.

**🎤 NARRATION:** *"**Five rapid micro-commitments. Each one is currently vague. Rewrite it so 'done' is unambiguous. 15 seconds each. Type or speak. We are not rating; we are rehearsing the muscle.**"*

**💻 ON-SCREEN:** F1.1 — "I'll get back to you soon."
F1.2 — "I'll have a draft ready next week."
F1.3 — "I'll loop in legal at some point."
F1.4 — "I'll send the summary this afternoon."
F1.5 — "I'll review and let you know."

> **⚙️ HANS — TECH NOTE**
>
> Same artifact-write component as D1/D2 Segment E. Same three-reference-version display. Same no-score discipline. Timer is 15 seconds per item but does not block submission — it nudges. After 20 seconds, the timer turns amber and "you can keep going if you need to" appears.

> **📊 GROWTH LOG CAPTURE**
>
> Event: micro_drill_completed │ Drill: F1_scope_lock │ 5 calibrated commitments captured.

---

## Drill F2 — Risk Radar
Purpose: Test reflex-level Risk Radar discipline. Three scenarios; for each, name the three things most likely to go wrong, decide what you will do if each one happens.

**🎤 NARRATION:** *"**Three scenarios. For each one, name the three things most likely to go wrong, and what you will do if each one happens. 60 seconds per scenario. Type or speak.**"*

**💻 ON-SCREEN:** F2.1 — You are delivering a major report to a new client on Friday.

F2.2 — You are leading your first cross-functional project starting Monday.

F2.3 — You are handing off a six-month workstream before two weeks of leave.

> **📊 GROWTH LOG CAPTURE**
>
> Event: micro_drill_completed │ Drill: F2_risk_radar │ 3 risk-radar exercises captured.

---

## Segment F Closing Reflection
**🎤 NARRATION:** *"**What did you notice about your own defaults during those drills? Take 30 seconds. Speak it or type it. This is for you.**"*

**✋ INTERACTION:** Free-form text/voice input (30 seconds). Captured as reflections.f_closing.

> **📊 GROWTH LOG CAPTURE**
>
> Event: reflection_submitted │ Prompt: F_closing │ Segment F closing reflection.

# SEGMENT G: Completion + Awe Moment + Retention Check
*Duration target: 5:00 ±30s. Hard cap per Standard rev0 §1.2. Five screens: G-1 Recognition / G-1.5 Framework Return / G-2 Growth Log (includes final Reliability Ledger state) / G-3 Retention Check setup / G-4 Awe Close. Structure parallels D1 (Integrity Pattern Mirror) and D2 (Ownership Pattern Mirror) Segment G — same engine component, dimension-specific Pattern Ledger name.*

### Screen G-1 — Recognition
**🎤 NARRATION:** *"**You just rehearsed the dimension four times. Each scenario, a different context. Each time, with a different cost. Some of your paths were close to what you would actually do. Some surprised you. Both are useful. What you are carrying out of this module is not a rating. It is not a credential. It is not a checklist. It is a sharper sense of what reliability feels like in your hands when workplace pressure rises — and what your pattern looks like to other people.**"*

### Screen G-1.5 — Framework Return
*Purpose: Surface the signature framework one final time before the Growth Log. Quiet recall, not summary. Same animated reveal as Recognition Brief C3, slower (1.2 sec per word) and held longer (4-second pause after the final word). No motif. No avatar. The screen holds, then transitions to G-2.*

**💻 ON-SCREEN:** The Reliability System

Scope Lock.  Milestone Architecture.  Risk Radar.  Handoff Protocol.

You used it five times today. You will use it tomorrow.

> **⚙️ HANS — TECH NOTE**
>
> No motif at G-1.5 — per Standard §1.4.C, the four-note motif plays only at A-0, G-4 Beat 2 silence, and Growth Log header. G-1.5 is not a locked motif position. Engine renders the reveal with room-tone bed only.

### Screen G-2 — Growth Log (with Final Reliability Ledger State) [MOAT-CRITICAL]
Purpose: Surface the cross-module memory artifact for the first time visibly to the participant. Includes the final Reliability Ledger state — four rows, the complete pattern of the module's choices and consequences.

**💻 ON-SCREEN:** Your Growth Log entry from this module:

• At 8:47 this morning you wrote (your verbatim cold-open Slack reply):
  "{{prior.session.cold_open_artifact_write_text}}"

• Today you named: The Reliability System.

• You walked into a four-scenario simulation with the Ledger watching.

• You rehearsed reliability in four contexts: a quality trade-off, a triage conflict, a knowledge handoff, and a scope creep.

• You wrote five artifact messages under workplace pressure.

• Your retrospective decision in the Audio Case: [participant's D-decision-3 text inserted verbatim].

• Your final reflection: [participant's F_closing text inserted verbatim].

• Your final Reliability Ledger:

    SC1 — The 80% Solution
      Commitment: Client report by 2 PM at full quality
      Outcome: [based on path selected]
      Others' Adjustment: [based on path selected]

    SC2 — The Competing Priorities
      Commitment: Three deliverables across one compressed week
      Outcome: [based on path selected]
      Others' Adjustment: [based on path selected]

    SC3 — The Dirty Handoff
      Commitment: 30-min knowledge transfer
      Outcome: [based on path selected]
      Others' Adjustment: [based on path selected]

    SC4 — The Scope Creep
      Commitment: Original project scope under late-arrival client pressure
      Outcome: [based on path selected]
      Others' Adjustment: [based on path selected]

This stays in your private rehearsal record. It is not shared. It is not rated. It is yours.

Your Skill Passport — if you want documented evidence — is earned through the separate observation pathway. Development is what happens here. Evidence is what the observation pathway produces.

> **📊 GROWTH LOG CAPTURE**
>
> Engine writes the consolidated G-2 record into the participant's persistent Growth Log. This record is read by D4 (and subsequent modules) for cross-module continuity callbacks. Specific token reservations for D4 to consume: D3.signature_framework_named, D3.cold_open_decision_path, D3.f_closing_reflection_text, D3.retrospective_decision_text, D3.reliability_ledger_final_state, D3.final_personal_sentence.

> **⚙️ HANS — TECH NOTE**
>
> Growth Log header on first render plays the four-note T3A signature motif once per session, layered under the header reveal. ~3.5 seconds total at -14 dB. Engine tracks first-render flag per session. Same engine-locked motif as A-0 entry and G-4 Beat 2 silence. Per Standard §1.4.C.

### Screen G-3 — Retention Check Setup
*The retention check uses Re-Rehearsal mode per Standard rev0 (locked as MVP scope). Inherited from D1/D2's engine. Hans builds nothing new for D3.*

**🎤 NARRATION:** *"**In three to seven days, this module will return you to one of the scenarios you just rehearsed. We will show you the path you chose, the words you wrote, and ask you one question: is this still what you would do? Memory plus judgment under time-shift. You will know it is coming. You will not know when. Take it when you have a quiet five minutes.**"*

| **SCHEMA FIELD: closing.retention_check (mode: re_rehearsal)** |
| --- |
| Field type: retention_check_setup_block Value (D3): closing.retention_check.mode = "re_rehearsal" notification_window_hours = [72, 168] selected_scenario = randomly chosen from SC1-SC4 weighted by participant deliberation pattern cooldown_hours = 48 Doctrinal note: The retention check has no public ranking, no qualifying outcome, and no completion-gate language surfaced to the participant. It is a check that the judgment pattern has stayed with the participant after time has passed — not a gate. |

### Screen G-4 — Awe Close [MOAT-CRITICAL]
Purpose: The last screen of the module. No peripheral navigation. Three deliberate beats: bookend question (4-second hold), silence (2-second fade with barely-visible teal hairline anchor + four-note motif), prompt with no word counter. The architectural pause is the design.

**💻 ON-SCREEN:** Beat 1 — Bookend question (4-second hold):

"Can people count on you — not once, but every time?"

Beat 2 — Silence + four-note motif (2 seconds, teal hairline anchor, motif plays at engine-locked volume per §1.4.C)

—

Beat 3 — Prompt (no word counter, no advance button until participant types):

"In one sentence, what is one thing you will commit to differently the next time something matters?"

> **⚙️ HANS — TECH NOTE**
>
> Beat 2 silence is the architectural pause. The barely-visible teal hairline at roughly two-thirds down the screen, opacity ~15%, fades to zero across the 2-second beat. No spinner. No loading state. No interaction permitted. The four-note T3A motif plays once during Beat 2, layered subtly under the hairline fade. Pre-loaded so playback begins on Beat 2 entry without delay. Same engine-locked asset as A-0 and Growth Log header. The motif plays once only, during Beat 2 silence; it does not replay after submission and does not appear anywhere else in Segment G. Cross-module memory write: at Beat 3 submit event, the engine writes the standardised emission contract per Standard §1.4.A to the cross_module_memory_store, keyed by (participant_id, module_id="D3"). Contract fields: { cold_open_decision_path, scenario_decisions[4], artifact_writes[5+], audio_case_decisions[3], retrospective_decision_text, reflections[], reliability_ledger_final_state, final_personal_sentence, module_completed_timestamp }. D4's cold open at Screen A-1 will consume final_personal_sentence verbatim via {{prior.D3.final_personal_sentence}}.

| **SCHEMA FIELD: closing.final_personal_sentence_prompt │ closing.conditional_paths[]** |
| --- |
| Field type: closing_capture_block + conditional_paths_set closing.final_personal_sentence_prompt = "In one sentence, what is one thing you will commit to differently the next time something matters?" Cross-module memory emission: D3.final_personal_sentence is written to the cross_module_memory_store at G-4 Beat 3 submission. This is the contract D4 will consume in its cold open. closing.conditional_paths[] = 3 variants based on engagement signal: high / moderate / limited. Engine reads Lock 2 deliberation signals and selects one variant for the post-submission micro-affirmation. |

> **📊 GROWTH LOG CAPTURE**
>
> Capture: g4_final_personal_sentence, g4_deliberation_time, module_completion_timestamp. The final sentence is the one piece of participant data that persists across modules. It is the seed for D4's opening.

**Segment G Runtime Proof — per-screen breakdown:**

| **Screen** | **Content** | **Duration** | **Notes** |
| --- | --- | --- | --- |
| G-1 | Recognition narration | 60 sec | Auto-advance |
| G-1.5 | Framework Return (animated reveal of The Reliability System) | 25 sec | 1.2 sec/word + 4 sec hold |
| G-2 | Growth Log + Reliability Ledger snapshot display | 90 sec | Tap to advance; motif on header |
| G-3 | Retention Check setup narration | 45 sec | Auto-advance |
| G-4 | Awe Close (Beat 1 question 4s + Beat 2 silence/motif 2s + Beat 3 prompt setup 70s) | 76 sec | Excludes participant typing |
| **TOTAL** | **System-time only (engine flow)** | **296 sec** | **= 4:56 (within 5:00 ±30s)** |

*Runtimes measure engine-controlled screen flow only. Participant typing time at G-4 Beat 3 is captured separately as deliberation_time and does not count against the hard cap.*

**Reliability Ledger Cross-Scenario Threading — State Model Declaration [REV0 ALIGNMENT]**

Per the Tiered Innovation Taxonomy declaration above, D3 invokes the optional cross-scenario threading provision (Standard rev0 §1.4.D). This section formally declares the threading state model so the engine, schema, and content schema reference a single named contract.

**Threading state model: reliability_pattern**

The engine maintains a session-scoped state object: reliability_pattern. Values: reliable, mixed, unreliable. Derivation rule: aggregate Ledger entries (Outcome + Others’ Adjustment) across prior scenarios are classified by the engine into one of three states at content-load time for SC3 and SC4. SC1 has no threading (no prior state). SC2 has no threading at MVP per D3’s declared signature scope.

• reliable — prior scenarios all show on-time, scope-honoured outcomes with positive Others’ Adjustment (PM stopped asking for status; teammate brought you the next sensitive task without escalation).

• mixed — prior scenarios show a combination of on-time and slipped outcomes; Others’ Adjustment is uneven across scenarios.

• unreliable — prior scenarios majority-show slipped outcomes; Others’ Adjustment is consistently protective (PM added a check-in, teammate stopped sending you the dependency-critical work).

**Engine behaviour for threading**

• State persistence: reliability_pattern is updated immediately after each scenario decision is recorded; resets between attempts.

• Variant selection: at content-load time for SC3 and SC4, the engine reads reliability_pattern and selects one of three pre-authored setup narration variants. Selection logic is identical to the universal §1.4.D pattern — the rule does not branch on dimension, only the variant text does.

• No re-recording cost: variants are pre-authored as text plus pre-recorded narration files. Engine swaps the asset at load time; no runtime synthesis.

• No consequence-path changes: only the setup narration shifts. SC3 and SC4 retain identical decision structures, consequence paths, and Ledger row generators across all three variants.

**Schema field additions (extension namespace)**

• `scenarios.SCn.threading_variants[reliable|mixed|unreliable]` — setup narration variant text for SC3 and SC4. SC1 and SC2 carry no value.

• `module.threading_state_model` — declared value: “reliability_pattern”. Engine reads this to select the state-derivation rule.

• Hans: integrate into the existing extension schema. No engine code changes are required beyond the universal §1.4.D Pattern Ledger component and the variant selector (already built for D1 and D2).

***Why the explicit state model name matters. D1 declares transparency_posture, D2 declares repair_posture, D3 declares reliability_pattern. Same engine selector reads `module.threading_state_model` and dispatches to the right derivation rule. Three modules, three state models, one engine. Naming makes the dispatch contract explicit — future modules join the framework by declaring their own state model name and authoring three variants, with no engine modification.*

# END OF MODULE
*D3 v2 Production Build Reference complete. Total target runtime: 89 minutes. Marketed and sold as 90 minutes.*

**D3 totals: 89 minutes target runtime; 14+ artifact-write moments (Standard §2.4 minimum is 6); 8 deterministic bell strikes (Segment E horizon transitions only); 4 structured break points (after C, D, SC2, F); 7 decision points across the module (1 cold open, 3 audio case including retrospective, 4 scenarios); 3 audience-context variants declared (New Hire default + Cross-Border Professional + Experienced Worker — overlay content post-MVP); 4 D3 innovations introduced (Reliability Ledger universal moat element; cross-scenario threading; Pre-Perception Replay; retrospective Audio Case decision pause).**

# What Makes This Module Different (Marketing Layer)
*Public-facing language. Use in carousels, landing pages, and partner conversations. Does not expose internal architecture or mechanism — sells problem and experience.*

- Your reliability pattern is visible to you. Most products show you one workplace choice. T3A shows you the pattern. The Reliability Ledger updates after every scenario — Scenario, Commitment, Outcome, Others' Adjustment. By the time you finish, you have a four-row picture of how others see you.

- Workplace artifacts, not abstract dilemmas. Real project trackers, Slack threads, vendor handoffs, scope-creep emails. The scenarios are modelled on materials you would encounter in a Technology, Government, or Construction/Engineering workplace.

- Three-horizon consequences. Every decision plays out across Same Day, Next Week, and Month End. Reliability failures are invisible on day one. They become catastrophic by week four.

- The Reliability System. A four-component operational framework — Scope Lock, Milestone Architecture, Risk Radar, Handoff Protocol — that you use through every scenario decision.

- Cross-scenario context shift. Your decisions in early scenarios change the context of later ones. If colleagues have learned they cannot depend on you in SC1 and SC2, they have already adjusted by SC3.

- Pre-Perception Replay. In one scenario, you see your manager's existing perception of you BEFORE you decide. You enter the decision knowing you are already being watched. The simulation does not pretend perception is neutral.

- Practice and development only. Nothing in this module becomes behavioural documentation. Your Growth Log captures your practice. Your Skill Passport is earned through the separate observation pathway.

# Appendix A1 — Variant Generation Requirements
*Sector and audience-context variants per Standard §1.4.B. D3 MVP supports Technology/Software for the New Hire audience context. Cross-Border Professional and Experienced Worker overlays are declared but specified post-MVP.*

Default tuple: { sector: "technology_software", audience_context: "new_hire" }.

Declared but post-MVP audience_context variants for technology_software: cross_border_professional, experienced_worker.

Declared but post-MVP sector variants: government_public_service, construction_engineering. (Replaces hospitality from D1/D2 sector set.)

# Appendix A2 — Lock 2 Fingerprint Checklist
*Per Standard §2.6. Universal Lock 2 signals (inherited from D1/D2 engine) plus D3-specific signals.*

### Universal Lock 2 signals (8)
- decision_deliberation_time_ms

- option_hover_sequence

- artifact_write_composition_time_ms

- artifact_write_revision_events

- reflection_response_modality (text/voice)

- reflection_composition_time_ms

- session_pause_events

- smart_resume_returns

### D3-Specific Lock 2 Signals (4 — Standard §2.6 requires 2–4)
- reliability_ledger_trajectory — pattern of outcomes across SC1→SC4 (reliable / mixed / unreliable)

- scope_lock_language_density — semantic measure of whether artifact-writes name concrete commitments or hedge

- retrospective_decision_alignment — whether the Audio Case Decision Pause 3 retrospective response references specific Reliability System components

- pre_perception_replay_delta — change in decision behaviour at SC4 versus Lock 2 baseline of similar prior decisions (D1/D2)

> **⚙️ HANS — TECH NOTE**
>
> All Lock 2 signals are developer-only per §2.6 LOCKED RULE. They appear in no UI, no Completion Record, no Growth Log surface. They feed the proprietary intelligence layer that compounds across users.

# Appendix A3 — Quality Assurance Before Release
*Per Standard Layer 3 (Quality Gates §3.1 through §3.7). The QA gates D3 must pass before strategic partner review and production lock.*

### §3.1 — Producer-Side Audit Cycle
D3 rev0 cleared structural audit against Standard rev0: 7-segment architecture; A-0 cinematic entry; four-note motif at three locked surfaces (Standard rev0 §1.4.C); Tibetan bell at all 8 horizon transitions; schema field declarations (19 core + 5 extensions); cross-module memory contract (D2 consumption + D3 emission) per §1.4.A; vocabulary aligned to Standard glossary; 4 scenarios at the rev0 4-minimum floor; segment runtime hard caps applied (Segment A 2:40 ±15s; Segment G 5:00 ±30s). Strategic partner review pending per §3.4.

### §3.2 — Banned-Term Audit
Pass post-Round-1. All participant-facing copy clean.

### §3.3 — Schema Validation
Pending: Hans confirms all 24 active schema fields (19 core + 5 extensions) parse correctly through the existing engine without modification. Required before production lock.

### §3.4 — Strategic Partner Review
Pending: Strategic partner review per §3.4 (threshold ≥ 85/100). The same strategic partner reviewer who cleared D1 and D2 is the recommended reviewer for D3.

### §3.5 — Standard Conformance
Pending: Reviewer confirms D3 conforms to current Standard rev0 (which codifies Reliability Ledger as the universal Pattern Ledger moat element per §1.4.D, Development vs Evidence framing as locked language per §1.4, variable OI/FM counts per module per §1.4.E, and Pre-Perception Replay as a permitted dimension-specific signature per §1.4 Tiered Innovation Taxonomy).

### §3.6 — Engine Compatibility Test
Pending: Hans runs D3 content layer through the existing engine using only schema content. No engine modifications beyond the four declared D3 innovations. Definitive test of one-engine discipline.

### §3.7 — Market Defensibility Gate
D3 declares 11 active moat elements: cinematic A-0 entry; four-note motif at 3 locked surfaces; Tibetan bell at 8 horizon transitions; artifact-write with reference calibration; three-horizon consequence threading; cross-module memory consumption (D2→D3) AND emission (D3→D4); two-axis variant calibration; signature framework with recognition-before-naming (The Reliability System); Reliability Ledger as cumulative pattern surface; cross-scenario threading (SC3-SC4 setups adapt to Ledger state); Pre-Perception Replay (SC4 only). Threshold: ≥4. D3: 11. Passes structurally; full pass after §3.6 engine test.

# Appendix A4 — Avatar Video Sections
*Avatar production brief and voice-design notes inherited from D1 Appendix A4 — see D1 Production Build Reference. D3 introduces no new avatar production requirements. Volume, pacing, and visual treatment match D1 and D2.*

Avatar appearances in D3 (touchpoints only — discipline rule from D3 Engineering Doctrine):

- Screen A-1 — Cold open D2 callback narration (avatar voice with calm observational tone)

- Break Point recoveries — Smart Resume warm welcome (15-second clip)

- Segment G-1 — Recognition narration

Pattern: Avatar speaks → Experience happens → Avatar reflects. In Segment E (scenarios), the avatar is absent. The narration is the AI voice.

# Appendix A5 — Sound & Voice Design
*All audio assets inherited from D1/D2 engine. D3 specifies no new audio per §1.4.C LOCKED RULE: **"**The engine does not play either asset outside the locked locations — no decorative reuse.**"*

### Tibetan Singing Bowl Bell — T3A Signature Tone
Used at every consequence-horizon transition in Segment E (Same Day → Next Week, Next Week → Month End). 8 strikes per module (2 per scenario × 4 scenarios).

- Single strike, Tibetan singing bowl

- Fundamental at ~528 Hz

- ~3-second decay to silence

- Played at -12 dB relative to narration peak

- Plays once per horizon transition; not used elsewhere in the module

*The bell is a brand asset across all BridgeFast™ modules. Cast once, used always.*

### Four-Note T3A Signature Motif
Plays at three locked surfaces only per Standard §1.4.C: Screen A-0 cinematic entry, Screen G-4 Beat 2 silence, Growth Log review page header (on first render only).

- Volume: -14 dB relative to narration peak

- Total duration: ~3.5 seconds

- Engine-locked asset; not a per-module audio choice

### Voice Character
Warm, mid-range, observational tone. No theatrical inflection. Voice-design parameters inherited from D1 engine config. D3 produces no new voice characterisation.

# Appendix A6 — Artifact Visual Design
*Includes the Reliability Ledger visual specification — D3's signature on-screen element.*

### Reliability Ledger — Visual Specification
The Ledger renders as a persistent visual panel that appears after each scenario decision (after the consequence graph and Behaviour Signal Panel, before the next scenario begins). It carries state across scenarios within a module session and resets between attempts.

- Display format: simple 4-column table

- Columns: Scenario | Commitment | Outcome | Others' Adjustment

- One row per scenario. Maximum 4 rows.

- Mobile-first: scrollable horizontal on small screens

- Colour treatment: navy header row #1B3A5C, teal-bordered cells with light-teal fill #F0FDFA

- On first display (after SC1), shows only the SC1 row with previous rows visible as empty placeholders — creates anticipation

- On each scenario completion, the new row animates in over ~1.5 seconds — the visual cue that the pattern is forming

- In Segment G-2, the final 4-row Ledger is shown statically as part of the Growth Log review

> **⚙️ HANS — TECH NOTE**
>
> Reliability Ledger is D3's instance of the universal Pattern Ledger moat element (Standard rev0 §1.4.D). Same engine component renders in D1 as Integrity Pattern Mirror, in D2 as Ownership Pattern Mirror, and in D3 as Reliability Ledger — identical column structure, identical render logic, only the dimension-facing name varies. Build once; reuse across all 14 dimensions.

### Other Artifact Visuals
All other artifact visuals (workplace artifacts, calendar views, Slack threads, project trackers) follow the same visual design pattern as D1 and D2 Appendix A6. Same component library, same render logic.

# Appendix A7 — Growth Log Review Experience
*The Growth Log is not a database export. It is a personal artifact of the rehearsal — a document the participant feels they made.*

On first render in Segment G-2, the Growth Log header plays the four-note T3A motif (per Appendix A5). Same engine-locked asset as A-0 entry and G-4 Beat 2 silence. The motif does NOT replay on subsequent visits to the Growth Log within the same session (engine tracks first-render flag per session).

The Growth Log review surfaces the cross-module memory artifact for the first time visibly to the participant. It includes the final Reliability Ledger state — the 4-row picture of how the participant's pattern formed across the module.

Visual hierarchy: cold-open artifact-write text rendered verbatim in a teal-bordered card; signature framework named; scenarios summarised; reflections preserved verbatim; final Reliability Ledger rendered as a navy-bordered 4-row table.

Doctrinal rule: the Growth Log is the participant's private development record. The Skill Passport — if the participant wants documented evidence — is earned through the separate observation pathway. Development vs Evidence is the LOCKED separation.

# Appendix A8 — Mobile-First Detail Notes
*D3 inherits the mobile-first design pattern from D1 and D2.*

Key D3-specific mobile considerations:

- Reliability Ledger renders as a horizontally-scrollable table on screens narrower than 480px. Header row remains fixed.

- Pre-Perception Replay card (SC4) renders full-width on mobile, with the manager's internal monologue as a tap-to-expand card to preserve narrative tension.

- Audio Case audio playback supports background play on mobile (iOS Safari and Chrome Android) — participants can lock the screen during The Slow Slide narration.

- Smart Resume on mobile uses a warm avatar voice clip rather than text-only on first return.

# Appendix A9 — Axis 2 Audience-Context Variants
*Cross-Border Professional and Experienced Worker overlays for the technology_software sector. Declared at MVP; full overlay content specified post-MVP. The engine reads module.variant_content_map at module load and applies the overlay deltas at the specified screens.*

Each variant overlays additional framing on the base content. The engine composes the variant at module load: it reads the participant's profile, looks up the (sector, audience_context) tuple in module.variant_content_map, and applies the deltas. If the participant has no exact match, the engine renders the default tuple (Standard §1.4.B fallback rule).

### Variant 1 — Cross-Border Professional (CBP)
Activates when (sector: technology_software, audience_context: cross_border_professional). Adds framing for participants navigating cross-border work norms — particularly around timezone-shifted communication and the question of whether to translate "first thing this morning" into the local idiom.

Overlay points: A-1 cold open framing (timezone context); B-3 self-recognition (cross-border reliability norms); SC2 setup (priority management across multiple geographies); A9 placeholder for full content post-MVP.

### Variant 2 — Experienced Worker (EW)
Activates when (sector: technology_software, audience_context: experienced_worker). Adds framing for participants with 10+ years of experience — the reliability conversation reframes from "learning the system" to "why patterns might have slipped in a long-tenure career."

Overlay points: A-1 cold open framing (career context); C2 (the small-deadline trap reframed for senior individual contributors); SC4 (scope creep in a senior role where stakeholders defer); A9 placeholder for full content post-MVP.

> **⚙️ HANS — TECH NOTE**
>
> CBP and EW overlays activate at module load. The base content is rendered; the variant framings are inserted at the specified screens. All other engine behaviour (bell timing, three-horizon consequences, Reliability Ledger updates) is unchanged. Full overlay content is post-MVP — schema fields are declared and reserved, content fills in at v2.1.

# Schema Field Map — Canonical 19 + 5 Extensions
*D3 declares values for the canonical 24 active fields per Standard §1.5. D3 uses canonical field names from inception — no legacy aliases. This is the schema Hans's engine reads when loading D3 content.*

### Section 1 — Core Schema Fields (19)
| **#** | **Field name** | **Type** | **D3 declared value (or pattern)** |
| --- | --- | --- | --- |
| **1** | **module.id** | **string** | "D3" |
| **2** | **dimension.id** | **string** | "D3" |
| **3** | **dimension.name** | **string** | "Execution Reliability" |
| **4** | **module.title** | **string** | "Can People Count On You" |
| **5** | **module.tier** | **enum** | "Foundational" |
| **6** | **dimension.central_question** | **string** | "Can people count on you — not once, but every time?" |
| **7** | **dimension.framework.label** | **string** | "The Reliability System" |
| **8** | **dimension.framework.body** | **text** | "Scope Lock → Milestone Architecture → Risk Radar → Handoff Protocol" |
| **9** | **dimension.observable_indicators[]** | **array[10]** | OI-1 Deadline integrity through OI-10 Pattern awareness (10 OIs — higher than the 6-minimum floor, declared as anti-gaming variation per Standard rev0 §1.4.E) |
| **10** | **dimension.failure_modes[]** | **array[8]** | FM-1 Silent slippage through FM-8 Pattern blindness (8 FMs — variable count) |
| **11** | **audio.cold_open.text** | **text** | See Segment A, Screen A-1 (Beats 1 + 2) |
| **12** | **scenarios.SC1-SC4 (titles)** | **array[4]** | ["The 80% Solution", "The Competing Priorities", "The Dirty Handoff", "The Scope Creep"] |
| **13** | **scenarios.SCn.decision_path_count** | **integer** | 3 (each scenario) |
| **14** | **scenarios.SCn.consequence_horizons[]** | **array[3]** | ["Same Day", "Next Week", "Month End"] — Standard §2.3 Horizon Set A |
| **15** | **scenarios.SCn.artifact_write_count** | **integer per scenario** | 1 per scenario (SC1–SC4) → 4 in Segment E. Module-wide artifact-write total: 14+. |
| **16** | **recognition_briefs.frameworks[]** | **array[3]** | ["The Difference Between Busy and Reliable", "The Small-Deadline Trap", "The Reliability System"] |
| **17** | **audio.case** | **object** | Single-protagonist (PM), 3 decision points (third is retrospective — D3 innovation), single-horizon resolution per decision |
| **18** | **closing.awe_moment** | **text** | See Segment G, Screen G-4 (3 beats) |
| **19** | **closing.conditional_paths[]** | **array[3]** | { high_engagement, moderate_engagement, limited_engagement } — engine selects based on Lock 2 deliberation signals |

### Section 2 — Schema Extensions (5)
| **#** | **Field name** | **Type** | **D3 declared value (or pattern)** |
| --- | --- | --- | --- |
| **20** | **prior_module.references[]** | **array[string]** | ["D2"] — D3 reads from D2's cross-module memory contract |
| **21** | **prior_module.callback_anchors[]** | **array[object]** | [{ anchor_id: "d3_a1_b1", token: "{{prior.D2.final_personal_sentence}}", fallback_string: see Screen A-1 }] |
| **22** | **module.audience_context_variants[]** | **array[string]** | ["new_hire", "experienced_worker", "cross_border_professional"] |
| **23** | **module.variant_content_map** | **object** | See Appendix A9 — overlay content for technology_software sector (CBP and EW variants post-MVP) |
| **24** | **module.default_variant_tuple** | **object** | { sector: "technology_software", audience_context: "new_hire" } |

**Total field count: 24 (19 core + 5 extensions). All 24 fields declared. No legacy aliases used. D3 uses canonical schema field names from inception.**

**D3 rev0 Conformance Checklist (for Hans)**

*Single-page verification view of every rev0-mandated architectural element in D3. Tick each item as the build progresses. Each item references the section of this production reference where the specification is detailed.*

**Universal architecture (rev0 baseline)**

□ Cinematic A-0 entry per Standard rev0 §1.9 — 5.0s fixed duration, motif pre-loads A-1 audio, no skip affordance, no loading indicator (Segment A, Screen A-0).

□ Cross-module memory CONSUMPTION — D2 final_personal_sentence retrieved verbatim and surfaced in D3’s cold open narration within the first 90 seconds (Standard rev0 §1.4.A; Segment A cold open).

□ Cross-module memory EMISSION — final_personal_sentence captured at Segment G submission and written to the cross-module memory store keyed by (participant_id, “D3”) per Standard rev0 §1.4.A (Schema Field Map; G-4 Beat 3 submit handler).

□ Two-axis variant calibration — engine resolves (sector, audience_context) tuple at module load per Standard rev0 §1.4.B (Appendix A9 + Schema Field 22).

□ Signature audio brand — Tibetan bell at every consequence-horizon transition (8 strikes total in Segment E); four-note motif at Screen A-0, G-4 Beat 2 silence, and Growth Log header (G-2). Engine-locked assets per Standard rev0 §1.4.C.

□ Reliability Ledger (Pattern Ledger per Standard rev0 §1.4.D) — 4-column canonical structure, renders after each scenario decision in Segment E, surfaces again at Screen G-2.

□ Participant-facing signal language — OI/FM codes never render to participants; “What this may signal” convention used in all behaviour signal surfaces and the Ledger “Others’ Adjustment” column (Standard rev0 §1.4.E).

□ Development vs Evidence framing — full locked verbatim language present in Safety Floor narration AND on-screen card (Screen A-3).

□ Footer microcopy locked per Standard rev0 §1.7.

□ Segment A cinematic boundary respected: hard cap 2:40 ±15s.

□ Segment G hard cap respected: 5:00 ±30s (current: 4:56).

**D3-specific signatures (declared)**

□ Cross-scenario threading wired: reliability_pattern written after each scenario decision; SC3 and SC4 setup narrations select one of three pre-authored variants (reliable / mixed / unreliable) at content-load time.

□ Pre-recorded narration assets exist for all three threading variants of SC3 and SC4 (6 audio assets total).

□ Retrospective Audio Case Decision Pause 3 — declared dimension-specific signature per Standard rev0 §2.4; D3 is the only module that invokes the third decision pause at MVP.

□ Pre-Perception Replay (SC4) — same Perception Replay engine component triggered BEFORE the decision point. Declared dimension-specific signature.

□ OI count — 10 Observable Indicators declared, higher than rev0’s 6-minimum floor, declared as anti-gaming variation per Standard rev0 §1.4.E.

□ FM count — 8 Failure Modes declared, higher than rev0’s 6-minimum floor, declared as anti-gaming variation per Standard rev0 §1.4.E.

□ Scenario count — 4 chains (SC1–SC4), at the rev0 4-minimum floor.

□ No dimension-specific engine logic introduced — threading and retrospective pause both use universal engine components with declared variant content.

**Segment G structure (5 screens)**

□ G-1 Recognition — quiet recognition of what the participant built.

□ G-1.5 Framework Return — no-input transition; The Reliability System surfaces a final time; auto-advance.

□ G-2 Growth Log + Reliability Ledger final state recall — full 4-row Ledger rendered above the Growth Log confirmation copy.

□ G-2 audio = four-note T3A motif (NOT bell). Per Standard rev0 §1.4.C, the motif plays on Growth Log header entry on first render only; the Tibetan bell is locked to Segment E consequence-horizon transitions.

□ G-3 Retention Check Setup — participant is told their re-rehearsal will arrive in 3–7 days; engine scheduler armed.

□ G-4 Awe Close — three beats; bookend question, silence with motif, final personal sentence prompt; cross-module memory emission write on Beat 3 submit.

**Schema field map (24 active fields)**

□ 19 core fields tagged inline throughout the script with navy schema headers + teal-bordered content blocks.

□ 5 extension fields tagged: cross-module memory + two-axis variants + Reliability Ledger threading per Standard rev0 §1.5.

□ Reliability Ledger schema extensions present: `scenarios.SCn.consequence_paths[].pattern_outcome_text`, `scenarios.SCn.consequence_paths[].others_adjustment_text`, `scenarios.SCn.threading_variants[reliable|mixed|unreliable]`, `module.threading_state_model` (declared value: “reliability_pattern”).

□ No legacy field labels remain (no `mastery_variants.sectors[]`, no “completion criterion”, no v1.1/v1.2 references).

**Vocabulary and doctrine compliance**

□ No banned terms in participant-facing copy: validate, certify, assess, prove, screen, endorse, score, teach-as-BridgeFast-claim.

□ “Under workplace pressure” phrasing used (never “under real pressure” or “under real-world pressure”).

□ Decimal values carry leading zero (e.g., 0.42 not .42).

□ Product names spelled in full — no abbreviations for proper nouns.

**Tier 1 IP protection**

□ OI/FM internal codes never render to participants in any UI surface.

□ Lock 2 fingerprint capture is developer-only; no participant-facing display of deliberation time, revision count, or trajectory algorithms.

□ No engine-architecture details (Pattern Ledger mechanics, threading state model, cross-module memory store) appear in any public-facing material derived from this build.

**Sign-off**

□ Hans: schema draft completed for 24 active fields + Ledger and threading extensions.

□ Hans: all 6 threading narration variants pre-recorded and verified to swap at content-load time.

□ Hans: Pre-Perception Replay component triggered BEFORE the decision at SC4 (not after).

□ Hans: Smart Resume tested across 5+ break/return cycles — avatar utterance references last decision, scenario name, chosen path.

□ Hans: retention check scheduler triggers verified at 3–7 day window.

□ Dr. Tony Mofoke: founder sign-off on this conformance checklist before production handoff.

# D3 Conformance Checklist Against Dimension Production Standard rev0
**[✓] **7-segment architecture present and in correct order

**[✓] **Segment A inside 2:40 ±15s hard cap (current: 2:49)

**[✓] **Segment B inside 8:00 ±2 min target

**[✓] **Segment C inside 12:00 ±3 min target

**[✓] **Segment D inside 10:30 ±2 min target

**[✓] **Segment E inside 45:00 ±5 min target

**[✓] **Segment F inside 9:00 ±2 min target

**[✓] **Segment G inside 5:00 ±30s hard cap per §3.0 amendment (current: 4:56)

**[✓] **Total module runtime inside 90-min cap (current target: 89 min)

**[✓] **Cinematic A-0 entry specified (5-sec mandatory) per §1.9

**[✓] **Four-note motif specified at three locked surfaces per §1.4.C (A-0, G-4 Beat 2, Growth Log header)

**[✓] **Tibetan bell specified at 8 deterministic horizon transitions per §1.4.C

**[✓] **Cross-module memory contract — consumes D2 final_personal_sentence at A-1 Beat 1; emits D3 contract at G-4 Beat 3

**[✓] **Signature framework with recognition-before-naming per §2.2 (The Reliability System named at C3 after lived absence in cold open and Audio Case)

**[✓] **24 active schema fields declared (19 core + 5 extensions); no legacy aliases

**[✓] **3 audience-context variants declared (new_hire, experienced_worker, cross_border_professional)

**[✓] **4 dimension-specific Lock 2 signals declared per §2.6

**[✓] **Footer microcopy locked per §1.7 ("Practice and development only. Not behavioural documentation.")

**[✓] **Development vs Evidence framing in Safety Floor (Screen A-3) — LOCKED LANGUAGE per Standard rev0 §1.4

**[✓] **Banned-vocab audit per §3.2 (post-Round-1 audit clean; all participant-facing copy aligned to Standard glossary)

**[✓] **Two-axis variant calibration declared per §1.4.B (sector × audience_context)

**[✓] **All 18 documentation elements present per §1.10

**[✓] **D3 INNOVATIONS: Reliability Ledger persistent state object; Cross-scenario consequence threading (SC3-SC4 setups adapt); Pre-Perception Replay (SC4); Retrospective decision pause (Audio Case Decision Pause 3)

**[Pending] **Schema validation per §3.3 (all 24 fields parse through engine)

**[Pending] **Strategic partner review threshold ≥85/100 per §3.4

**[Pending] **Standard conformance review per §3.5 (against Standard rev0)

**[Pending] **Engine compatibility test per §3.6 — Hans runs D3 content layer through engine using only declared schema and the four D3 innovations as engine-level additions

**[✓] **Market defensibility per §3.7: 11 moat elements declared (cinematic A-0, motif, bell, artifact-write with calibration, three-horizon threading, cross-module memory consumption+emission, two-axis variants, signature framework with recognition-before-naming, Reliability Ledger, cross-scenario threading, Pre-Perception Replay)

**D3 v2 Production Build Reference complete.**

*Schema fields tagged: 19 core + 5 extensions = 24 active fields. Schema tag count across the document: 8 tagged blocks (cold-open callback, central question, framework, OIs, FMs, retention check, awe close, final personal sentence). Cross-reference index complete. Production summary table updated. Appendices A1–A9 in place. Production status: APPROVED FOR ENGINE-PARSE TEST AND STRATEGIC PARTNER REVIEW — NOT production-locked. Aligned to Dimension Production Standard rev0 (locked, May 2026).*

The 3rd Academy  ·  Aligned to Dimension Production Standard rev0  ·  Page