/* ============================================================================
   M4 CONTENT LAYER — AI Grey Zone (AIWorkLab Pressure Point 4)
   PilotReady script v1.2 (July 2026). AIWorkLab differs from BehaviourLab:
     • 45-min runtime; six segments (A, B, C, E, F, G) — Segment D omitted.
     • Segment E holds two layered scenarios (LS1 → LS2) with intra-module
       residue (Pranav's Slack thread and the LS2 Decide framing drift by LS1).
     • Micro-Drills (Segment F) fixed at 2.
     • Inspect Beat is a MOAT-CRITICAL source-artifact surface presented
       BEFORE each Decide.
     • Pressure Beat is a genuine second decision, LS1 = identity/role
       (Pranav), LS2 = epistemic (HR Tech Weekly newsletter).
   Content is rendered verbatim from the script wherever the script fixes
   language. Where the script defines a pattern but not the exact word
   (schema glue, engine-facing labels, options where the script's table
   lists ≤12-word Decide/Pressure labels but not accompanying justification
   copy), authored copy is FLAGGED with an AUTHORED comment.
   ========================================================================== */

export const M4_CONTENT = {
  module: {
    id: "M4",
    title: "AI Grey Zone",
    tier: "AIWorkLab · Pressure Point 4",
    productLine: "AIWorkLab",
    runtimeMinutes: 45,
    audienceVariant: "First-Time People Manager (Axis 2)",
    sector_variants: ["Technology / Knowledge Work"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice:
        "Your two layered scenarios are set in a Technology / Knowledge Work workplace, with a first-time people-manager frame. The same context carries from LS1 into LS2.",
      pickerHint: "The context you choose here carries across both layered scenarios.",
    },
  },
  dimension: {
    id: "M4",
    name: "AI Grey Zone",
    central_question: "Do you self-govern, or shortcut?",
    framework: {
      label: "The Daylight Rule",
      // Three-part reflex per the script's C.2 Locked signature framework
      // reveal. Rendered verbatim in Segment C and echoed at G-1.5.
      body: "Name the gap · Apply the obligation · Decide in daylight",
    },
  },
  // AIWorkLab threading model — LS1 outcome threads into LS2 via two surfaces:
  // (1) Pranav's Slack single-line follow-on; (2) LS2 Decide prompt drift.
  threading_state_model: "grey_zone_ls1_stance",
  // AIWorkLab callback contract — M4 consumes D1 (BehaviourLab) final sentence
  // if available. Fallback plays otherwise. See M4_A_1 render for the runtime.
  prior_module_references: ["D1"],

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    // AIWorkLab A-0 hook — if D1 final sentence exists in cross-module store,
    // read it back with " — you, last month." attribution. MVP falls back to
    // the standalone anchor line.
    coldOpen: {
      d1Callback: {
        wrapperLead: "Last time you carried something out of this lab. You wrote:",
        sentenceSlot: "{{prior.D1.final_personal_sentence}}",
        wrapperTail:
          "You, last month. That sentence still belongs to you. We are going to ask you to live another moment now — a moment where no rule reaches, and what you decide will teach the people around you what to expect from you.",
        // FALLBACK — MVP variant when D1 is not present in the browser store.
        // AUTHORED — mirrors the D2/D3 fallback register per the AIWorkLab
        // architecture rule; the script fixes only the cross-module hook
        // description, not the fallback string.
        fallback:
          "This module can stand alone, but it connects more deeply after D1. We are going to ask you to live a moment now — a moment where no rule reaches, and what you decide will teach the people around you what to expect from you.",
      },
      // Beat 2 — the Wednesday afternoon cold open arc. Rendered verbatim from
      // script §A.2 (Screen A-1) and §A.3 (Screen A-2). No narration voice
      // over on this cold open per script — narration voice enters at B-1.
      // We fold the script's stage directions into observational body copy so
      // the participant reads what the scene shows.
      narration: [
        "It is Wednesday afternoon. 3:48 PM. You are at your desk.",
        "Two browser windows are open. On the left, the company's AI productivity dashboard, filtered to Q4 Performance Indicators for Devon Park. On the right, a Slack DM from your HR Business Partner, Naomi Choi, that landed two minutes ago.",
        "You are three months into your first management role. Devon is one of five direct reports you inherited. Three weeks ago you assigned him as sole owner of the Q4 data-pipeline migration — a scope that requires freezing incoming PRs from the team until end of November to avoid merge conflicts. You are the only person in the company, other than Devon, who knows about that assignment.",
      ],
      // Cold-open Decision Prompt — three paths per script §A. There is no
      // fourth path in AIWorkLab modules (Decide options are 3, not 4).
      decisionPrompt:
        "Naomi's asking for your read by 8 PM. Pranav has already sent his. What do you do?",
      options: [
        { key: "a", label: 'Reply now: "Concur. PIP appropriate given Q4 metrics." Move on.' },
        { key: "b", label: "Reply with the migration context. Name the policy gap. Ask Naomi to pause the recommendation." },
        { key: "c", label: "Request a 20-minute call with Naomi before responding. Walk her through the assignment." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk?",
      // Same-day cold-open consequences by cold-open path. These are the
      // MICRO-consequences that let the participant feel the choice landing
      // before Segment B names the standard. Full three-horizon consequences
      // arrive later in LS1's Segment E arc — the cold open only shows the
      // first ripple. AUTHORED per the AIWorkLab micro-consequence pattern
      // (D3/D5 both render three same-day sentences before the safety floor
      // returns; the script does not enumerate these for M4's cold open,
      // treating LS1 as a full run of the Wednesday moment).
      sameDay: {
        a: [
          "You reply at 3:53 PM. Six words. Naomi acknowledges at 3:54: “Got it. Will batch tonight. Thanks for the fast response.”",
          "Pranav DMs a thumbs up. The exchange closes in under four minutes. The dashboard tab stays open on your screen. The 1:1 notes from October 12 stay open on a second screen. You do not return to them.",
          "The room around you does not change. Something inside the room does.",
        ],
        b: [
          "You spend eighteen minutes drafting. You name the October 12 assignment, the PR freeze that explains the commit and review-activity gap, and the fact that the policy library does not address performance review during scoped migration work.",
          "You send at 5:11 PM. Naomi reads at 5:14, replies at 5:23: “This is incredibly helpful — can you join a quick call at 5:30 so we can decide together? I'd rather not batch this tonight.”",
          "The evening you had planned is now a different evening.",
        ],
        c: [
          "You DM Naomi at 4:21: “Could we hop on a quick call before I respond? Want to walk through Devon's Q4 in more detail.” Naomi: “Sure — 5:30 work?” You: “Perfect.”",
          "Pranav, watching the Slack channel, DMs you: “OK — heads up, Naomi's flagging it to Mia. Mia wants managers tracking with the new dashboard this rollout — just so you know the room you'll be walking into.”",
          "You have bought yourself thirty minutes. You have also announced yourself in a room you did not choose to enter.",
        ],
      },
      // A-2 · Pranav's peer-pressure banner. Rendered as an artifact card
      // inside the cold open scene; used before the decision beat.
      pranavBanner: {
        header: "Pranav Joshi (Peer Manager) · 4:17 PM",
        body:
          "Hey — just confirmed mine. HR's batching tonight. You good?",
        footnote:
          "The banner sits in the corner for a moment then collapses to a numbered Slack indicator. There is no meeting to join. This is text, alone, with a deadline.",
      },
    },
    // Safety floor — locked language block; AIWorkLab uses the same
    // Development vs Evidence framing as BehaviourLab.
    // AUTHORED — the M4 script does not enumerate a safety-floor card
    // verbatim; we mirror the D-lab locked pattern so the AIWorkLab engine
    // renders the same private-rehearsal frame the standard requires.
    safetyFloor: {
      card: [
        "THIS IS PRIVATE REHEARSAL.",
        "Nothing you decide here becomes part of your performance record.",
        "Your Growth Log captures behavioural signals as fingerprints — never displayed to you, never surfaced as a score.",
        "This is rehearsal. Nothing is graded. Take the time you would actually take.",
        "What you just experienced was one moment, with three paths, and three first-ripples. None of them are rated. They are observed.",
      ],
    },
  },

  /* ---------------------- SEGMENT B — BEHAVIOUR STANDARD ------------------- */
  // Compressed 4-minute compressed segment; renders the grey-zone standard
  // without yet naming the framework (script §Segment B locked cadence).
  segmentB: {
    // B-1 · what the participant just lived through (verbatim script)
    intro: [
      "That moment has a shape. An AI tool with confidence. A policy library that does not address the specific case in front of you. A peer who has already answered. And a deadline that closes tonight.",
      "The grey zone is not a problem to be removed. It is the standing condition of management. Every policy library was written before the situation in front of you arrived.",
    ],
    // B-2 · the grey-zone standard, plainly stated (verbatim script)
    fieldGuide: {
      standard: {
        title: "THE GREY-ZONE STANDARD, UNDER AI-ASSISTED WORK",
        bullets: [
          "You recognise when no rule applies cleanly, and you name that out loud.",
          "You apply the obligation you already hold — to people, to fairness, to the work — without waiting for permission.",
          "You make your decision visible to at least one person who can examine it.",
          "You match caution to the sensitivity of the decision, not to your discomfort with making it.",
          "When new information arrives, you revisit. Consistency is not the same as correctness.",
        ],
        // Locked italic tagline from the script §B.2 text panel.
        italicTagline:
          "Self-governance is what happens where no rule reaches. Shortcut is what happens when the absence of a rule is treated as the absence of an obligation.",
      },
      // B-3 · what this standard refuses (verbatim script)
      refuses: {
        title: "WHAT THIS STANDARD REFUSES",
        items: [
          {
            h: "The shortcut disguised as compliance.",
            t: "\"No rule says I can't, therefore I can.\"",
          },
          {
            h: "The shortcut disguised as alignment.",
            t: "\"Pranav already did it, therefore it must be fine.\"",
          },
          {
            h: "The shortcut disguised as caution.",
            t: "Escalating to policy when the obligation in front of you is clear and not asking for help.",
          },
          {
            h: "The silent shortcut.",
            t: "Making the call in your head without writing it down, telling anyone, or letting it be examined.",
          },
        ],
      },
    },
    // B closing reflection — AUTHORED. The script fixes B-1 through B-3 as
    // narration + text panels; the reflection prompt bridging to Segment C is
    // authored in the observational register to match the AIWorkLab beat map.
    reflectionPrompt:
      "Before we go further — take 60 seconds. Think of the last grey-zone moment you moved through at work. A moment where no rule reached, and the fastest path was the one that left no trace. We are not asking you to confess. We are asking you to notice.",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS ----------------------- */
  // Two Recognition Briefs; the framework is NAMED here for the first time
  // (script §Segment C locked reveal).
  segmentC: {
    c1: {
      title: "C1 — The policy was written before this situation",
      // Verbatim script C.1 narration.
      narration: [
        "Here is what makes the grey zone hard.",
        "No policy library is complete. Every policy was written before the situation in front of the manager arrived. The AI tool fills part of the gap. The peer's behaviour fills part of the gap. The deadline fills the rest. The shortcut is to let those three fill the gap completely — to let the AI's confidence, the peer's example, and the clock decide the call.",
        "The shortcut works. It clears the queue. But it leaves the manager with no answer to a question they will be asked later: where did you stand?",
      ],
      // The on-screen text panel that lands after the narration (verbatim).
      close: "The absence of a rule is not the absence of an obligation.",
      tagline: "The policy was written before this situation.",
    },
    c2: {
      title: "C2 — The Daylight Rule",
      framework: "The Daylight Rule",
      // Signature framework reveal — three-part reflex (verbatim script §C.2)
      steps: [
        { name: "When no rule exists, name that out loud.", body: "The shortcut hides the absence of a rule because the absence is uncomfortable. Naming the gap in the policy is the first move of a manager who is willing to be examined. It is also the moment that asks the people around you — your peer, your HR partner, your director — whether they are also willing to be examined." },
        { name: "Apply the obligation you already have.", body: "To the report whose work you assigned. To the team whose data you would upload. To the fairness you committed to when you took the role. Obligations do not require a policy to be in effect; they require a person to be in role. The policy is downstream of the obligation, not upstream." },
        { name: "Decide in daylight, not in silence.", body: "The grey-zone decision made silently is the one that compounds. The decision that lives in a Slack message, a one-line note, a brief acknowledgement to the people affected — that decision can be examined, revised, and remembered. The decision that lives only in the manager's head teaches the people around them what to expect from a manager whose decisions cannot be examined." },
      ],
      // Verbatim script narration wrapping the framework reveal.
      narration: [
        "The Daylight Rule is what self-governance looks like when it is a reflex, not a performance.",
        "When no rule exists, name that out loud. The shortcut hides the absence of a rule because the absence is uncomfortable. Naming the gap in the policy is the first move of a manager who is willing to be examined. It is also the moment that asks the people around you — your peer, your HR partner, your director — whether they are also willing to be examined.",
        "Apply the obligation you already have. To the report whose work you assigned. To the team whose data you would upload. To the fairness you committed to when you took the role. Obligations do not require a policy to be in effect; they require a person to be in role. The policy is downstream of the obligation, not upstream.",
        "Decide in daylight, not in silence. The grey-zone decision made silently is the one that compounds. The decision that lives in a Slack message, a one-line note, a brief acknowledgement to the people affected — that decision can be examined, revised, and remembered. The decision that lives only in the manager's head teaches the people around them what to expect from a manager whose decisions cannot be examined.",
        "The Daylight Rule is what was missing in the manager who answered fast and silently.",
      ],
      // AUTHORED — C2 central-question return beat. AIWorkLab modules echo the
      // central question just before Segment E (parallel to the BehaviourLab
      // c2_cqreturn convention). Kept observational; no editorialising.
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question.",
        echo: "Do you self-govern, or shortcut?",
        closing:
          "The Daylight Rule is not a virtue demanded of you. It is a reflex available to you. Two layered scenarios sit ahead — one Wednesday afternoon that has already begun, and one Monday morning that starts five days after it closes. What you decide in the first will still be in the room in the second.",
      },
    },
    // C → E transition — AIWorkLab has no Segment D, so the transition goes
    // from Segment C directly to Segment E (Scenario Lab). Break Point 1
    // sits between C and E per the AIWorkLab beat map.
    complete: {
      label: "Transition to Segment E · 15s",
      narration: [
        "You now have the language. Three parts. The Daylight Rule.",
        "Ahead: two layered scenarios. LS1 opens where the cold open opened — the Wednesday PIP recommendation — but this time you see the full arc across same-day, next-week, and month-end horizons. LS2 opens the following Monday, with a Slack thread from Pranav sitting at the top of your inbox.",
        "Put your headphones on if you have them.",
      ],
      // Scope notice — AIWorkLab uses First-Time People Manager (Axis 2)
      // and Technology/Knowledge Work (Axis 1). AUTHORED to mirror the D-lab
      // scope-notice pattern in the AIWorkLab register.
      scopeBoundaries: {
        title: "Scope Boundaries — Pressure Point 4 and what M5 adds",
        paragraphs: [
          "This pressure point, M4 (AI Grey Zone), is deliberately bounded. It rehearses the grey-zone reflex under AI-assisted people-management work: whether a manager, in the absence of a clean rule, can name the gap, apply the obligation they already hold, and let the decision be examined.",
          "The layered scenarios are designed so the standard is knowable — the Daylight Rule is a reflex the manager can already reach for. The difficulty lives in whether they reach for it when the peer has already answered, when the AI tool speaks with confidence, and when new information arrives on Wednesday morning that they did not have on Monday.",
          "This boundary is intentional, and it follows the AIWorkLab doctrine. Behaviour that can be rehearsed under AI-assisted conditions must have a knowable reflex. Teaching AI-policy theory — frameworks, principles, vendor-comparison decks — is content delivery, not behavioural rehearsal. That is precisely the territory M4 is designed not to occupy.",
          "M5 (AI Breakdown & Recovery) covers the adjacent surface: what a manager does when an AI-assisted decision has already unravelled and the room is waiting for their next move. Where M4 asks, \"Do you self-govern where no rule reaches?\", M5 asks, \"How do you carry yourself when the previous decision is already visible and wrong?\"",
        ],
      },
    },
    breakPoint1: {
      label: "Pause invitation · Break Point 1 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 1",
      subtitle: "After Segment C",
      elapsedLabel: "Elapsed: ~11 minutes",
      remainingLabel: "Remaining: ~34 minutes",
      avatarScript: [
        "You have covered the first part of the rehearsal. The Daylight Rule is now something you have language for.",
        "Our intent is not to have you complete this module — it is to have you carry it with you.",
        "Take your time. Your progress is saved.",
      ],
      continueLabel: "Enter the Scenario Lab",
      returnLaterLabel: "Return later",
    },
  },

  /* ---------------------- SEGMENT F — MICRO-DRILLS ------------------------- */
  segmentF: {
    intro:
      "Two short consolidation drills. The grey-zone standard. The Daylight Rule. Now: rapid recognition.",
    f1: {
      title: "F1 — Is there a rule, or is there a gap?",
      // Verbatim script F.1 intro voice-over.
      audioIntro:
        "Three small grey-zone moments. For each, mark whether the situation has a clear rule, a clear gap, or a hidden rule. Each item shows for forty seconds. We are not rating; we are rehearsing the muscle.",
      // On-screen header renders the same beat visually.
      onScreenHeader: {
        title: "IS THERE A RULE, OR IS THERE A GAP?",
        lines: [
          "You will see three small grey-zone moments.",
          "For each, choose whether the situation has a clear rule, a clear gap, or a hidden rule.",
        ],
        cta: "Tap to begin.",
      },
      // Shared option list per SingleChoiceCard engine convention.
      options: ["Clear rule", "Clear gap", "Hidden rule"],
      // Verbatim script F.1 vignettes 1-3. Answers per §Engine capture note.
      items: [
        {
          vignette:
            "Your direct report asks to attend a half-day external workshop on company time. Your company's L&D policy covers conferences explicitly but does not mention workshops. Your direct report is asking now; the workshop is next week.",
          answer: "Clear gap",
          // AUTHORED — feedback in the observational register that quotes the
          // Daylight Rule's first step; the script defines the correct answer
          // internally but does not author participant-facing feedback lines
          // for F1 items.
          feedback:
            "Clear gap. The L&D policy speaks to conferences; it is silent on workshops. The absence of a rule is not the absence of an obligation — the Daylight Rule's first step is to name the gap out loud.",
        },
        {
          vignette:
            "A new AI coding assistant has just been added to your company's \"approved tools\" list. The tool's data-handling policy is buried in a 47-page document linked from the approved-tools page. Your team is asking if they can use it for client-facing code.",
          answer: "Hidden rule",
          feedback:
            "Hidden rule. The rule exists; it is just not in front of the person who has to decide. Most managers will not read forty-seven pages. Naming the hidden rule — and where it lives — is what protects the team from acting on a policy nobody has read.",
        },
        {
          vignette:
            "A peer manager asks you to \"informally chat\" about a candidate they are considering hiring — someone you worked with at a previous company. Your company's reference policy covers formal references through HR; it says nothing about informal manager-to-manager conversations.",
          answer: "Clear gap",
          feedback:
            "Clear gap. Informal references are a category the policy does not address. The obligation you already hold — to fairness, to the candidate, to the peer — does not require the policy to be in effect. It requires a person to be in role.",
        },
      ],
      // Verbatim reflection beat from the script §F.1 completion.
      closeCard:
        "Three grey-zone moments. You distinguished no-rule from hard-to-find-rule. That distinction is the prerequisite for the Daylight Rule's first step.",
    },
    f2: {
      title: "F2 — Daylight or silence?",
      audioIntro:
        "Three small grey-zone decisions. For each, choose the appropriate visibility action. Sixty seconds total. Type or speak.",
      onScreenHeader: {
        title: "DAYLIGHT OR SILENCE? — MATCH THE VISIBILITY LEVEL",
        lines: [
          "Three visibility levels available:",
        ],
        showOptionsRow: true,
        cta: "Tap to begin.",
      },
      // Verbatim visibility register from script §F.2 table.
      options: ["V1 (light)", "V2 (medium)", "V3 (high)"],
      // Vignettes derived directly from the script's Item 1-3, with the
      // Daylight/silence pairing preserved. Answers per §Engine capture note.
      items: [
        {
          vignette:
            "You decided to approve the workshop attendance from Drill 1. The L&D budget will absorb it without a budget overrun. Visibility action?",
          answer: "V2 (medium)",
          // AUTHORED feedback — observational, quoting the visibility-level
          // rationale the script encodes but does not author participant-side.
          feedback:
            "V2. Slack to the direct report's L&D or HR partner naming the call. Visible to the stakeholder, no need for director-level precedent setting. Daylight is not louder. Daylight is visible to the right person.",
        },
        {
          vignette:
            "You decided the team should not use the AI coding assistant for client-facing code until Privacy weighs in. Visibility action?",
          answer: "V3 (high)",
          feedback:
            "V3. This is precedent-setting for an approved tool. Director-level visibility is warranted — not because the call is louder, but because the room where the precedent will land is one level up.",
        },
        {
          vignette:
            "You decided to share an informal reference with the peer manager — limited to what is on the candidate's public profile and the project you worked on together. Visibility action?",
          answer: "V1 (light)",
          feedback:
            "V1. Your own decision log is the right level. The call is bounded, you know the candidate, you stayed within the public-profile boundary. Daylight matches the sensitivity of the decision, not your discomfort with making it.",
        },
      ],
      // Verbatim reflection beat from script §F.2.
      closeCard: "Daylight is not louder. Daylight is visible to the right person.",
    },
    complete: {
      label: "Transition to Segment G · 15s",
      // AUTHORED — F → G transition narration in the AIWorkLab register.
      // The script fixes the F closing beat (the "Daylight is not louder"
      // line already lives in f2.closeCard); this is the bridge into the Awe
      // Moment, matched to the beat map.
      narration: [
        "You have language for the grey zone.",
        "You have moved through two layered scenarios that already carry into your working week.",
        "The micro-drills settled the reflex into recognition.",
        "One thing left.",
      ],
      continueLabel: "Continue",
    },
    // AUTHORED — 30-second closing reflection prompt (parallel to the D-lab
    // pattern the AIWorkLab engine expects). The script does not enumerate
    // this beat but leaves room for it in the F → G transition timing.
    closingReflection: {
      prompt:
        "Take thirty seconds. What did you notice about your own default under those two drills? Was the reach for daylight already there, or did you feel yourself hesitating? Speak it or type it. This is for you.",
    },
  },

  /* ------------- SEGMENT G — COMPLETION + AWE-MOMENT + RETENTION ----------- */
  segmentG: {
    breakPoint4: {
      label: "Pause invitation · Break Point 4 · 10s",
      title: "PAUSE INVITATION · BREAK POINT 4",
      subtitle: "Optional, after Segment F",
      elapsedLabel: "Elapsed: ~41 minutes",
      remainingLabel: "Remaining: ~4 minutes",
      // AUTHORED — mirrors D-lab break-4 script.
      avatarScript: [
        "You are at the closing. It is a few minutes long. You can take a break here, or step into it now. Your choice.",
      ],
      continueLabel: "Step into the closing",
      returnLaterLabel: "Take a short break",
    },
    // G-1 · Recognition narration — AUTHORED in the observational M4 register.
    // The script §G names the silence beat and the awe-moment couplet but
    // does not enumerate a Recognition narration; the AIWorkLab engine
    // reuses the D-lab G-1 shape so the Growth Log bridge has language.
    recognitionLabel: "Recognition narration · 60s",
    recognition: [
      "You just rehearsed the grey zone twice. Once on Wednesday afternoon, once on Monday morning. Same manager. Same reflex. Different pressures.",
      "What you are carrying out of this module is not a rating. It is not a credential. It is not a checklist.",
      "It is a sharper sense of what the Daylight Rule feels like in your hands when the peer has already answered, when the AI tool speaks with confidence, and when the deadline closes tonight.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "A sharper sense of what your grey-zone reflex looks like to the people on the receiving end of it.",
      ],
    },
    // Cold-open callback lines — one per cold-open path. AUTHORED to bookend
    // Segment A the AIWorkLab way (the D-lab pattern).
    callback: {
      a: "You opened this module at 3:48 PM by concurring with the dashboard in six words. Hold that first instinct beside the two layered scenarios you just walked through.",
      b: "You opened this module at 3:48 PM by naming the migration context and the policy gap. Hold that first instinct beside the two layered scenarios you just walked through.",
      c: "You opened this module at 3:48 PM by requesting a call before you answered. Hold that first instinct beside the two layered scenarios you just walked through.",
    },
    // G-1.5 · Framework Return — no-input, auto-advances. Steps rendered
    // verbatim (three-part Daylight Rule).
    frameworkReturn: {
      label: "Framework Return · 25s",
      durationSeconds: 25,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through two layered scenarios. One Wednesday. One Monday. Different pressures. The same three-part reflex.",
      steps: [
        "Name the gap.",
        "Apply the obligation.",
        "Decide in daylight.",
      ],
      tagline: "This is The Daylight Rule.",
      carryForward:
        "You used it twice today. You will use it tomorrow — the next time no rule reaches and the deadline closes anyway.",
    },
    // G-2 · Growth Log Pattern Mirror — AIWorkLab shows a two-row mirror
    // (LS1 stance + LS2 stance) rather than the four-row BehaviourLab ledger.
    growthLog: {
      title: "Your Grey-Zone Pattern Mirror",
      cols: ["Scenario", "Stance", "Visibility", "What compounds"],
      // Row shape rendered by the engine from st.ledger.
    },
    // G-3 · Delayed Retention Check — per script §Appendix M4.7.
    delayedRetentionCheck: {
      label: "Retention check setup · 45s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In three to seven days, the workplace will return.",
        "One scene. One question. No grade.",
        "Random send within the window; weekends skipped. You will know it is coming. You will not know when. Take it when you have a quiet five minutes.",
      ],
      details: [
        { k: "Appears", v: "3 to 7 days from now (in-app · email · SMS)" },
        { k: "Format", v: "1 peer-manager DM revisited, three response options" },
        { k: "Response", v: "Single decision, one Same-Day horizon" },
        { k: "Attempts", v: "1 available" },
        { k: "Weekend rule", v: "If the 3–7 day window has fewer than two eligible weekdays, extends to 9 days rather than sending on a weekend" },
        { k: "Total time", v: "60–90 seconds end to end" },
      ],
      doctrinalNote: [
        "This is not a pass / fail check. It is a check that the Daylight Rule has stayed with you after time has passed.",
        "If the reflex has settled differently, the system will guide you back to the grey-zone moment worth revisiting.",
      ],
      continueLabel: "Got it — continue",
      // Retention scene (verbatim script §Appendix M4.7).
      retentionScene: {
        header: "Lior Ben-Ari · 9:21 AM",
        body:
          "Hey — new tool just launched, our director wants us to pilot it. It's a \"team wellbeing scoring\" AI that scrapes Slack patterns to flag burnout risk in direct reports. He says everyone's adopting it. I've got a 1:1 with my newest hire at 10:30 and I'm tempted to skip it and use the tool's auto-summary instead. Quick read?",
        prompt: "What do you tell Lior?",
        options: [
          { key: "a", label: "If everyone's using it, you're probably fine. Go ahead." },
          { key: "b", label: "Pause. Two things to check before you skip the 1:1." },
          { key: "c", label: "Skip the tool. Keep the 1:1. New hires need you." },
        ],
        // Verbatim Same-Day horizons from the script §Retention table.
        sameDay: {
          a: [
            "Lior thanks you, uses the tool's summary instead of running the 1:1.",
            "Tuesday afternoon his new hire DMs HR: “Wanted to flag — my manager cancelled our 1:1 and sent me a Slack message his AI tool generated. It said I was ‘showing burnout markers' but we hadn't even talked. Is this normal?”",
            "HR opens a ticket. Lior's director gets pulled in Wednesday. The tool's pilot is paused company-wide pending review. Lior DMs you Thursday: “Why didn't you say anything?”",
          ],
          b: [
            "You walk Lior through the two checks: (1) what does the tool's ToS say about Slack-scraped data, and (2) has the director communicated this to HR or just to managers.",
            "Lior pauses, asks his director both questions. The director admits they had not formally cleared the tool. The pilot is rescheduled for after IT/Privacy review.",
            "Lior keeps his 10:30 1:1 with his new hire. The conversation goes well. Lior DMs you Friday: “Saved me.”",
          ],
          c: [
            "Lior keeps the 1:1. The conversation reveals his new hire is genuinely struggling — not with burnout, but with confusion about the team's coding standards.",
            "Lior pairs him with a senior engineer for the next two weeks. The pairing solves the issue.",
            "Lior DMs you Friday: “The tool would have flagged him as burnout. He just needed two weeks of pairing.” You think about how often this is the case.",
          ],
        },
        completion: "Module rehearsal continues in the workplace. Return to your Growth Log when you're ready.",
      },
    },
    // G-4 · Awe Moment — silence beat + two-line couplet + final personal
    // sentence prompt. Bell does NOT sound at the couplet per script; the
    // silence is the point.
    aweMoment: {
      // Rendered verbatim from script §G.2 text panel.
      coupletLines: [
        "What you do where no one is watching",
        "is what you actually decided.",
      ],
      // Bell suppressed for G-2 — see engine renderer.
      suppressBell: true,
    },
    bookendQuestion: "Do you self-govern, or shortcut?",
    // AUTHORED — final personal sentence prompt for cross-module memory
    // (M4 emits prior.M4.final_personal_sentence into the AIWorkLab store).
    // The script does not enumerate this prompt at G-4; we mirror the D-lab
    // convention so the AIWorkLab cross-module contract lands.
    finalPrompt:
      "In one sentence, what is one thing you will make visible the next time no rule reaches and the deadline closes anyway?",
    // Completion screen (verbatim script §G.4).
    completion: {
      title: "Module Complete: AI Grey Zone",
      body: "You can now return to the workplace, or open your Growth Log.",
      buttons: {
        dashboard: "Return to dashboard",
        growthLog: "Open Growth Log",
      },
    },
  },
};

/* ============================================================================
   LS1 — THE PIP RECOMMENDATION
   Wednesday afternoon. Pressure type: Policy ambiguity (identity/role subtype).
   Inspect → Decide → Pressure → three-horizon consequence per script §E.1.
   ========================================================================== */
export const LS1_CONTENT_M4 = {
  id: "LS1",
  title: "The PIP Recommendation",
  pressureType: "policy_ambiguity_identity_role",
  commitment:
    "Decide whether to concur with the AI dashboard's PIP recommendation, push back with the migration context, or request a call before responding — with a peer already answered and HR batching tonight.",
  // The LS1 intro re-anchors the Wednesday moment. The participant already
  // lived the cold open; this intro tells them they are now inside the full
  // consequence arc, not the micro-consequence.
  // AUTHORED — the script §E.1 describes LS1 as picking up "from the Cold
  // Open's Wednesday 4:17 PM moment" but does not author an intro line for
  // the participant. The AIWorkLab engine reuses the BehaviourLab intro
  // shape so the Scenario Lab has a bridging beat.
  callback: [
    "You have been here before.",
    "At the start of this module, you saw the Wednesday 3:48 PM moment for a few minutes. Now you return with the full consequence arc — same day, next week, month end.",
    "You may choose the same instinct again, or choose differently. Notice whether your reasoning has changed.",
  ],
  intro: [
    "Layered Scenario 1. The PIP Recommendation.",
    "The AI productivity dashboard has recommended Devon Park for PIP consideration. The recommendation is defensible on the metrics it can see. It cannot see the assignment you made three weeks ago. HR is batching manager recommendations tonight at 8 PM. Pranav has already sent his.",
  ],
  briefing:
    "You have three hours and forty-eight minutes until Naomi batches at 8 PM. The dashboard is on your left. Your October 12 1:1 notes are on your right. The policy library search results are underneath both. Read them before you decide.",

  /* ------------- INSPECT BEAT — MOAT-CRITICAL source artifacts ------------- */
  inspect: {
    label: "Inspect Surface · LS1",
    mobileMode: "Stacked-Swipe",
    // Rendered as three labelled monospaced artifact cards (mobile: swipe).
    // Countdown banner sits fixed on top per script.
    countdown: "Naomi batches in 3h 48m",
    // Verbatim on-screen instruction from script §E.1.1.
    instruction:
      "The dashboard is on the left. Your 1:1 notes are in the middle. The policy library is on the right. Naomi's deadline is in the corner.",
    artifacts: [
      {
        caption: "SOURCE — AI dashboard (WorkPattern Engine)",
        title: "WorkPattern Engine · Q4 Performance Indicators · Devon Park",
        mono: true,
        lines: [
          "Direct Report: Devon Park · Engineer II",
          "Recommendation: Consider Performance Improvement Plan (PIP)",
          "Risk score: 0.78 · PIP threshold: 0.70",
          "",
          "FLAGGED SIGNALS (last 90 days):",
          "  Commits/month:            18 (team avg 42) — flagged",
          "  PRs reviewed:              6 (team avg 19) — flagged",
          "  Meeting attendance:       92%              — no flag",
          "  Slack median response:    47 min (avg 12) — flagged",
          "  Standup speaking time:    3.2 min (avg 4.1) — no flag",
          "",
          "COMPARABLE COHORT OUTCOME:",
          "  72% of Engineer IIs with this metric profile",
          "  entered PIP within 60 days.",
          "  Of those, 58% exited with successful improvement.",
          "  Of those, 31% left the company within 12 months.",
          "",
          "[Status: AWAITING MANAGER RECOMMENDATION]",
        ],
      },
      {
        caption: "SOURCE — your own 1:1 notes, October 12",
        title: "1:1 — Devon Park · October 12, 2026 · 30 min",
        mono: true,
        lines: [
          "Q4 work assignment confirmed:",
          "  Devon = sole owner of data-pipeline migration",
          "",
          "Scope discussed:",
          "  · PR queue frozen for incoming changes Nov 1 – Nov 28",
          "    (to avoid merge conflicts during migration cut-over)",
          "  · Devon runs all teammate PR review through a holding",
          "    queue during freeze",
          "  · Devon's own commits drop to migration-only commits",
          "    (which run on a separate branch, not visible in the",
          "     standard commit feed)",
          "",
          "Devon flagged concern:",
          "  “this is going to make my dashboard look quiet”",
          "",
          "Confirmed:",
          "  “the migration unblocks 40% of Q1 work — that's the",
          "   priority. Your dashboard for Q4 is going to look",
          "   different from Q3 and that's expected.”",
          "",
          "Action items:",
          "  · Devon to send weekly migration update",
          "  · You to flag to Director Mia Tran in monthly summary",
        ],
      },
      {
        caption: "SOURCE — company policy library search",
        title: "Policy library search: \"performance review during scoped migration work\"",
        mono: true,
        lines: [
          "Search results: 0 exact matches",
          "",
          "Related policies (closest match):",
          "  · Performance Review Policy v3.2",
          "      generic procedure for quarterly reviews",
          "  · PIP Eligibility Guidelines v2.1",
          "      defines threshold scores; does not define",
          "      exceptions for scoped solo work",
          "  · Engineering Manager Handbook Section 4.3",
          "      recommends “considering project context” in",
          "      performance review, without specifying how",
          "",
          "Status: No policy directly addresses this case.",
        ],
      },
    ],
    // AUTHORED — closing observation after the Inspect Surface, mirroring
    // the AIWorkLab pattern of a one-line settling beat before the Decide.
    closingObservation:
      "The dashboard is doing its job correctly on the data it has. The data does not include the assignment you made.",
  },

  /* ------------------------------ DECIDE BEAT ------------------------------ */
  decide: {
    // Verbatim script §E.1.2 prompt.
    prompt: "Naomi is waiting for your read. Pranav has already sent his. What do you do?",
    // Verbatim script §E.1.2 Decide table (3 paths, each ≤12 words).
    options: [
      { key: "a", label: 'Reply: "Concur. PIP appropriate given Q4 metrics."' },
      { key: "b", label: "Reply with the migration context. Name the policy gap." },
      { key: "c", label: "Request 20-minute call with Naomi before responding." },
    ],
    justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
    artifactWrite: {
      a: {
        prompt: "You have decided to concur. Write the exact Slack message you send Naomi.",
        submit: "Send to Naomi",
      },
      b: {
        prompt:
          "You have decided to name the migration context and the policy gap. Write the actual reply — the words you would send Naomi at 5:11 PM.",
        submit: "Send to Naomi",
      },
      c: {
        prompt:
          "You have decided to request a call. Write the Slack DM you send Naomi at 4:21 PM.",
        submit: "Send call request",
      },
    },
    // Three references per artifact write (calibrated-in-position). AUTHORED
    // — the script encodes the paths and the calibrated register but does
    // not enumerate the participant-facing reference variants.
    references: {
      a: [
        {
          tag: "Silent",
          calibrated: false,
          text: "Concur. PIP appropriate given Q4 metrics.",
          lands:
            "Six words. Naomi has the recommendation and nothing else. The migration assignment is not in the room; it is on your second screen.",
        },
        {
          tag: "Softened",
          calibrated: false,
          text:
            "Yeah, I think the metrics support it — we can move ahead with the PIP paperwork. Happy to talk more if useful, otherwise fine to batch.",
          lands:
            "You hedged, then landed on concur anyway. Naomi files it as concur. The softening did nothing except make you feel better about it.",
        },
        {
          tag: "Calibrated (for the path)",
          calibrated: true,
          text:
            "Concur. If you want me on the Monday paperwork call I can be there — otherwise batch it.",
          lands:
            "This is the honest version of the path you chose. It signals the decision is closed and the door is not open. Naomi will not come back to ask for context.",
        },
      ],
      b: [
        {
          tag: "Defensive",
          calibrated: false,
          text:
            "Not sure PIP is right yet — three weeks ago I gave Devon the migration and it's affecting his metrics. Can we hold off?",
          lands:
            "You named the migration but not the policy gap. Naomi has half the story. She can push back and you would not have language for why the process itself needs revisiting.",
        },
        {
          tag: "Calibrated",
          calibrated: true,
          text:
            "Want to flag context before you batch. Three weeks ago I assigned Devon as sole owner of the Q4 data-pipeline migration — his commit and PR-review drop is the predicted consequence of that scope, not a performance signal. The policy library returns zero exact matches for performance review during scoped migration work, so I'd like to flag the gap and ask whether the PIP recommendation can be paused pending broader context. Happy to jump on a call.",
          lands:
            "Naomi has the diagnosis, the assignment, the policy gap, and an offer to talk in one message. She can pause the batch and know exactly why.",
        },
      ],
      c: [
        {
          tag: "Vague",
          calibrated: false,
          text:
            "Could we hop on a quick call before I respond? Want to talk through Devon.",
          lands:
            "Naomi says yes but does not know what to prepare. Pranav sees the exchange and reads it as hesitation. Mia hears about the call from someone other than you.",
        },
        {
          tag: "Calibrated",
          calibrated: true,
          text:
            "Could we hop on a quick 20-minute call before I respond? Want to walk you through Devon's Q4 in more detail — there's a scope assignment from three weeks ago that shapes how I read the dashboard signal, and I'd rather cover it live than in Slack.",
          lands:
            "Naomi knows what she is walking into. Pranav can see this is not hesitation; it is preparation. The call becomes an event, not a private moment.",
        },
      ],
      closing:
        "What changes between these versions: whether the migration assignment enters the room, whether the policy gap gets named, and whether the decision Naomi batches at 8 PM was made in daylight or in the corner.",
    },
  },

  /* ----------------------- PRESSURE BEAT — IDENTITY/ROLE ----------------------- */
  pressure: {
    // Pressure type: policy ambiguity → identity/role subtype (script §E.1.3).
    // "The first-time manager's reflex to look decisive because hesitating
    //  looks weak." Locked pressure type for LS1.
    type: "identity_role",
    typeLabel: "Identity / role",
    countdown: "Naomi batches in 3h 28m",
    // Verbatim script §E.1.3 pressure moment per Decide path — Pranav's
    // Mia reference lands in each path with a slightly different tone.
    trigger: {
      a: [
        "Pranav Joshi (4:23 PM): “Quick. Mia's checking who's tracking with the new dashboard rollout this week. She mentioned it at the manager sync. Good to be on the right side of that one.”",
        "Naomi (4:24 PM): “Got it. Will batch tonight. Thanks for the fast response.”",
        "The exchange closes in under four minutes.",
      ],
      b: [
        "Pranav Joshi (5:12 PM): “Heads-up — I just saw your reply to Naomi. Pretty long. Mia's been flagging that we should be ‘tracking with’ the new dashboard rollout this quarter. Just FYI.”",
        "Naomi (5:17 PM): “Thanks — can you join a quick call at 5? Wanted to talk through Devon's situation directly given the context you flagged.”",
        "The countdown widens to a follow-up window.",
      ],
      c: [
        "Pranav Joshi (4:26 PM): “OK — Naomi accepted your call request. She's also flagging it to Mia. She mentioned Mia wants managers ‘tracking with the new dashboard' this rollout — just so you know the room you'll be walking into.”",
        "Naomi (4:36 PM): [Calendar invite] Devon Park · 5:30 PM.",
        "The call is now an event, not a private moment.",
      ],
    },
    prompt:
      "Pranav's second message just landed. Mia is now in the room, whether you meant her to be or not. What do you do?",
    // Verbatim script §E.1.3 pressure options (≤12 words each).
    options: [
      { key: "a", label: "Acknowledge Pranav briefly. Move on. Trust the decision." },
      { key: "b", label: "Reply to Pranav naming what your call is about." },
      { key: "c", label: "Send a follow-up note to Mia with your reasoning." },
    ],
    justificationPrompt:
      "The pressure is identity, not authority. If you hesitate, do you look weak? If you push back, do you become “the new manager who is going to be difficult”? Why this move?",
  },

  /* ------------------ THREE-HORIZON CONSEQUENCE — LS1 ---------------------- */
  // Per script §E.1.4 the 3 Decide paths each carry a full three-horizon
  // consequence chain, with pressure-path modulations that widen or narrow
  // the outcome. Engine renders the base horizon narration, then appends the
  // relevant pressure-path modulation lines chosen at the Pressure Beat.
  consequences: {
    a: {
      sameDay: [
        "The exchange closes at 4:22 PM. Naomi confirms PIP paperwork will be prepped over the weekend. You close the dashboard tab. The 1:1 notes from October 12 remain open on a second screen — you do not return to them.",
      ],
      nextWeek: [
        "PIP paperwork is delivered to Devon Tuesday morning. Devon asks for a 15-minute meeting Tuesday afternoon.",
        "Devon arrives with his laptop open, the dashboard up, and a copy of the October 12 1:1 notes you had emailed him. Devon: “I just want to understand — did the migration assignment factor into this?”",
        "You pause. Devon's tone is not angry. It is genuinely puzzled. You think about how to answer. You realise the honest answer is: it should have, and it did not.",
      ],
      monthEnd: [
        "The data-pipeline migration is delivered on November 28, on schedule. Devon's PIP is reviewed in mid-December. Devon's Q4 metrics remain flagged because the migration freeze created the metric pattern; the dashboard does not adjust retroactively.",
        "Mia, in the December performance calibration, asks: “We have an Engineer II flagged for PIP — what's the read?” You hear yourself say: “Metrics are still flagged. Recommend continuing.”",
        "You hear the words leaving your mouth. You feel something. You don't name it.",
      ],
      // Pressure-path modulations layered onto each horizon (verbatim §E.1.4).
      pressureMods: {
        a: {
          sameDay: [
            "Pressure: You acknowledge Pranav with a 👍. The exchange ends. Mia hears nothing about it.",
          ],
          nextWeek: [
            "Pressure: Devon does not bring up the 1:1 notes. He simply asks: “What do I need to focus on to exit the PIP?” You answer in terms of metrics. The migration continues; Devon's commit cadence stays low; the cycle reinforces itself.",
          ],
          monthEnd: [
            "Pressure: Devon receives a final PIP outcome notice in late January. He starts interviewing externally in February. He gives notice in March, citing “team structure changes.” Mia and the team are surprised. You are not.",
          ],
        },
        b: {
          sameDay: [
            "Pressure: You replied to Pranav: “Going to chat with Naomi tomorrow about it.” Pranav: “Cool. What for?” You hesitate, draft a longer message, delete it. Send: “Just want to make sure I'm not missing anything.” Pranav: “Got it.” The visibility is partial; the obligation transfer is private.",
          ],
          nextWeek: [
            "Pressure: Devon asks the migration question quietly. You give a partial answer. He nods. He does not ask again.",
          ],
          monthEnd: [
            "Pressure: Mia mentions in December calibration that she had heard something about a migration context on Devon. She does not press it. The context stays half-in, half-out of the room.",
          ],
        },
        c: {
          sameDay: [
            "Pressure: You sent Mia a 4-line note at 5:14 PM: “Just want to give you a heads-up that I confirmed PIP for Devon — wanted to make sure you were aware before paperwork lands Monday.” Mia replies at 7:20 PM: “Got it. Trust your call.”",
            "You have visibility. You also chose to keep the assignment context out of the note. The visibility is structural without being substantive.",
          ],
          nextWeek: [
            "Pressure: Devon asks about the migration. You explain it fully to him. You do not update Mia. The structural visibility from Wednesday does not extend to the migration context.",
          ],
          monthEnd: [
            "Pressure: Mia learns about the migration in January, from Devon's exit conversation notes. She does not raise it with you directly. The next assignment she routes to you carries a check-in cadence you did not have before.",
          ],
        },
      },
      // Mirror Rule candidate — fires ONLY on Decide-A + Pressure-A (double-silence)
      // per script §E.1.4 Mirror Rule locked candidate.
      mirrorRule: {
        combo: "aa",
        line: "You answered fast. You answered quietly. Devon never knew where you stood.",
      },
      outcome: "Concurred with the dashboard. Migration context stayed off the record. Consequences compound quietly.",
      others: "Manager, HR, and Devon each formed a read of you that did not include what you knew.",
      interp: "She concurred. She did not name what she knew. The receiver had to guess where she stood.",
      manager:
        "Manager's perspective. “She confirmed the PIP quickly. She did not tell me about the migration. When Devon asked me about it in April, I had to say I didn't know either. That is not a supervision problem. That is a visibility problem.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You spend 18 minutes drafting the reply. You name three things: (1) the October 12 assignment of Devon to sole-owner migration; (2) the PR freeze that explains the commit and review-activity gap; (3) the fact that the policy library does not address performance review during scoped migration work, so you want to flag the gap and ask whether the PIP recommendation should be put on hold pending broader context.",
        "You send at 5:11 PM. Naomi reads it at 5:14, replies at 5:23: “This is incredibly helpful — can you join a quick call at 5:30 so we can decide together? I'd rather not batch this tonight.”",
      ],
      nextWeek: [
        "Naomi convenes a Tuesday meeting with you, Pranav, and two other team leads who have direct reports doing scoped solo work.",
        "HR identifies four additional cases where WorkPattern Engine's PIP threshold may have flagged scoped-work patterns. The PIP recommendations for all four are put on hold pending case-by-case manager review.",
        "Devon's review is the first one resolved — the migration explanation is accepted, the PIP is rescinded, and Devon receives a follow-up note from HR clarifying that the original recommendation was withdrawn given the work-context information.",
      ],
      monthEnd: [
        "By mid-December, WorkPattern Engine's configuration is updated. A new field — “manager-attested scoped work” — allows managers to flag direct reports whose Q metrics will be structurally affected by sole-owner project work. The change is documented in the December engineering all-hands as “a manager-led calibration improvement.”",
        "Your name is in the documentation footer as one of three contributors. Devon delivers the data-pipeline migration on November 28, on schedule. His January performance review notes the migration as a Q4 contribution rather than a Q4 deficit.",
      ],
      pressureMods: {
        a: {
          sameDay: [
            "Pressure: You sent Pranav a “thanks for the heads-up” but did not name the substance. The call happens. Naomi pauses the PIP recommendation; the case is added to a new “scoped-work review exception” pattern HR will document over the next two weeks. Mia hears about the call from Naomi, not from you.",
          ],
          nextWeek: [],
          monthEnd: [
            "Pressure: Mia eventually learns of your role from Naomi. The credit lands, but a step later than it should have. Your visible decisiveness in front of HR was real; your visible decisiveness in front of your reporting line was filtered.",
          ],
        },
        b: {
          sameDay: [
            "Pressure: You sent Pranav: “Going to the call at 5:30 — I think Devon's PIP needs to be paused pending context I had on his Q4 assignment.” Pranav: “Damn. Mia's going to hear about that.” You: “I think she should.” The call happens. The PIP is paused. Mia is briefed by Naomi the next morning. Mia DMs you Thursday: “Good catch. Let's talk Friday about what other migration-scoped cases might be affected.”",
          ],
          nextWeek: [],
          monthEnd: [],
        },
        c: {
          sameDay: [
            "Pressure: You send Mia a 4-line note at 5:14 PM in parallel — the migration assignment, the policy gap, the call at 5:30. Mia replies at 7:20 PM: “Thanks for the heads-up. Trust your call — appreciate the flag either way.”",
          ],
          nextWeek: [],
          monthEnd: [
            "Pressure: Mia flags it as a reference pattern the next time she talks to another Director. Your name is in that conversation before you are in that room.",
          ],
        },
      },
      outcome: "Named the migration context and the policy gap. PIP paused; scoped-work calibration follows.",
      others:
        "Naomi paused the batch. HR identified four other cases. WorkPattern Engine's next release adds a manager-attested field.",
      interp: "She named the gap. She named the assignment. Naomi could pause and know exactly why.",
      manager:
        "Manager's perspective. “She flagged it before the batch. That saved Devon. It also saved three other people I didn't know were at risk. This is what I want from a first-quarter manager.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "You DM Naomi at 4:21: “Could we hop on a quick call before I respond? Want to walk through Devon's Q4 in more detail.” Naomi: “Sure — 5:30 work?” You: “Perfect.”",
        "Pranav, watching the Slack channel, DMs you: “OK — heads up, Naomi's flagging it to Mia. Mia wants managers tracking with the new dashboard this rollout — just so you know the room you'll be walking into.”",
        "At 5:30, you join the call. You walk Naomi through the October 12 1:1 notes and the migration assignment. Naomi listens, then: “I had no idea about the migration. Let me pause the PIP recommendation and circle back.” The call ends at 5:42.",
      ],
      nextWeek: [
        "Naomi invites you to a Wednesday meeting with the People Analytics team — the internal group that owns WorkPattern Engine configuration. You walk the team through Devon's case as a worked example.",
        "The People Analytics lead, Marina, asks if you would be willing to review three other current PIP recommendations she is “now second-guessing.” You spend Thursday afternoon on it. You find that two of the three have similar scoped-work patterns the dashboard could not see. Marina pauses both.",
        "By Friday, a working-group is formed to design a “scoped work calibration” feature for WorkPattern Engine v2.4, with a targeted ship date of Q1 next year.",
      ],
      monthEnd: [
        "The scoped-work calibration feature ships ahead of schedule, in late December. Internal documentation cites the Devon Park case as the precipitating example. You are named in the design credit.",
        "The original PIP cycle that would have caught four Engineer IIs catches none. Mia mentions the contribution in your January year-end review: “What I notice is that you made a call where the policy didn't reach, and you made it in writing in front of HR. That's a manager-defining moment in your first quarter.”",
        "You feel the weight of the sentence. You decide to write it down for yourself.",
      ],
      pressureMods: {
        a: {
          sameDay: [
            "Pressure: You did not loop Mia in directly. Naomi handles the loop-in the next day. The visibility is structural but channeled through HR rather than direct.",
          ],
          nextWeek: [],
          monthEnd: [],
        },
        b: {
          sameDay: [
            "Pressure: You reply to Pranav before the call: “Naomi and I are going to walk through Devon's Q4 assignment before I answer. I'll loop in Mia after if it goes anywhere.” Pranav: “Fair.” The call happens; you send Mia a 3-line note afterwards.",
          ],
          nextWeek: [],
          monthEnd: [],
        },
        c: {
          sameDay: [
            "Pressure: You send Mia a 4-line note before the call: “Requested a 20-minute call with Naomi about Devon's PIP recommendation — there's a scope assignment from three weeks ago that shapes the metric read. Wanted you in the loop before I walk into the room.” Mia: “Thanks. Trust your call.” The call happens with Mia already in the room, in a way.",
          ],
          nextWeek: [],
          monthEnd: [
            "Pressure: When the scoped-work calibration ships, Mia's introductory note to the engineering all-hands names you directly. You did not ask for that. The daylight compounds.",
          ],
        },
      },
      outcome: "Requested the call, walked Naomi through the assignment, opened the door on scoped-work calibration.",
      others:
        "People Analytics engaged; two additional PIPs paused. The dashboard configuration changes because of the call you asked for.",
      interp: "She requested a pause and used the pause to walk HR through what she knew.",
      manager:
        "Manager's perspective. “She asked for a call before answering a Slack. That call turned into a working group. That working group shipped a calibration feature. First quarter and already changing the room.”",
      traj: "rise",
    },
  },
  // Signal panel — LS1 stances read across LS2. The engine uses this to
  // render the per-path signature panel after the pressure-consequence arc.
  signalPanel: [
    {
      key: "a",
      title: "Concur silently with the dashboard",
      signal: "Confirmed the recommendation. Did not name the migration context or the policy gap.",
      effect: "Consequences compound. Devon, HR, and Mia each build a read of you that does not include what you knew.",
    },
    {
      key: "b",
      title: "Name the migration context and the policy gap",
      signal: "Named the assignment. Named the gap. Asked Naomi to pause the batch.",
      effect: "PIP paused. Four other cases surfaced. Dashboard configuration changes downstream.",
    },
    {
      key: "c",
      title: "Request a 20-minute call before responding",
      signal: "Requested a pause. Used the pause to walk HR through what she knew.",
      effect: "Working group forms. Scoped-work calibration ships. Reputation extends beyond the desk.",
    },
  ],
  reflection:
    "Think of a grey-zone moment at work where the AI tool spoke with more confidence than the situation deserved. Did you name the gap? Or did you let the tool's confidence do the deciding for you?",
};

/* ============================================================================
   LS2 — THE PEER MANAGER'S TOOL
   Monday morning, five days after LS1. Pressure type: Epistemic (HR Tech
   Weekly newsletter Wednesday morning). Two intra-module memory threads
   active: (1) Pranav's Slack single-line follow-on drift; (2) LS2 Decide
   prompt framing drift. Both keyed on LS1 path (a / b / c).
   ========================================================================== */
export const LS2_CONTENT_M4 = {
  id: "LS2",
  title: "The Peer Manager's Tool",
  pressureType: "epistemic",
  commitment:
    "Decide whether to sign up for a peer-shared AI review-drafting tool this Q4 cycle — with a Wednesday morning newsletter arriving five days later that reframes what you know about the vendor.",
  // Within-module memory — LS2 cold setup renders one of three Pranav
  // single-line follow-ons based on LS1 path. Verbatim script §E.2.1 table.
  intraModuleResidue: {
    a: "Pranav added (Saturday 9:35 AM): “Glad we're on the same page on the dashboard stuff this week — this feels like the next step.”",
    b: "Pranav added (Saturday 9:35 AM): “I know you had thoughts on the dashboard last week — maybe worth running this through Naomi too if you want to be careful. Or you can just try it — anyone can sign up.”",
    c: "Pranav added (Saturday 9:35 AM): “Mia mentioned your scoped-work flag last week — this is different territory but similar vibe. Up to you.”",
  },
  callback: [
    "Five days later. Monday morning. Slack thread from Pranav at the top of your inbox.",
    "The Wednesday afternoon has closed. The Monday morning is the next room.",
  ],
  intro: [
    "Layered Scenario 2. The Peer Manager's Tool.",
    "Pranav has been using a tool called ReviewDraft Engine to draft his Q3 review summaries. He wants you to try it this cycle. Anyone in the company can sign up — no formal approval needed. Your first review session is Wednesday at 2 PM.",
  ],
  briefing:
    "Pranav's Slack thread sits on the left. The ReviewDraft Engine Terms of Service sits in the middle. Your review calendar sits on the right. Read them before you decide.",

  /* --------------------- LS2 INSPECT BEAT ---------------------------------- */
  inspect: {
    label: "Inspect Surface · LS2",
    mobileMode: "Comparison-Tap",
    countdown: "First review: Wed Nov 13, 2:00 PM (Maya Reyes)",
    instruction:
      "Pranav's message is on the left. The ToS clause is in the middle. Your review calendar is on the right. Tap each to expand.",
    artifacts: [
      {
        caption: "SOURCE — Pranav's Slack thread (Saturday 9:34 AM)",
        title: "Slack · Pranav Joshi · Saturday 9:34 AM",
        mono: true,
        // Body is engine-rendered as a two-line block; residue (intra-module
        // memory) is added by the engine from intraModuleResidue[ls1Path].
        lines: [
          "Pranav Joshi (Peer Manager) · Saturday 9:34 AM",
          "",
          "Saturday read for ya — this thing is honestly a",
          "game-changer. I uploaded my Q3 1:1 notes and review",
          "drafts last week and it's been generating review",
          "summaries that are 60% of the way there before I touch",
          "them. Saving me probably 3-4 hours per direct report",
          "this cycle. Tool is called ReviewDraft Engine.",
          "I checked — no formal approval needed, anyone in the",
          "company can sign up. Want to try it this cycle?",
          "Could share notes on what works.",
          "",
          "[Screenshot: ReviewDraft Engine dashboard showing 4",
          " direct-report summaries. Devon is not among them —",
          " but two of the four names belong to engineers on YOUR",
          " team, suggesting Pranav has been generating summaries",
          " for cross-team peer review purposes.]",
          "",
          "// LS1 residue — Pranav's Saturday follow-on drifts here",
        ],
      },
      {
        caption: "SOURCE — ReviewDraft Engine Terms of Service, clause 7.4",
        title: "ReviewDraft Engine · Terms of Service v2.1 · Section 7 — Data Usage",
        mono: true,
        lines: [
          "7.1 Submitted content (including review drafts, 1:1 notes,",
          "    and uploaded performance data) is stored on",
          "    ReviewDraft Engine servers for 90 days following",
          "    session end.",
          "",
          "7.2 Customer accounts may delete submitted content at",
          "    any time via account settings.",
          "",
          "7.3 ReviewDraft Engine does not sell submitted content",
          "    to third parties.",
          "",
          "7.4  Submitted content may be used to improve our models",
          "     in aggregated and anonymised form. By using the",
          "     Service, Customer grants ReviewDraft Engine a",
          "     non-exclusive, perpetual license to use such",
          "     aggregated and anonymised data for product",
          "     improvement, including training and refining the",
          "     underlying AI models.",
          "",
          "7.5 Customer may opt out of clause 7.4 by submitting a",
          "    written request to privacy@reviewsmart.ai. Opt-out",
          "    is not retroactive.",
        ],
      },
      {
        caption: "SOURCE — your review calendar (this week)",
        title: "This week's calendar — Q4 Review sessions",
        mono: true,
        lines: [
          "Wed Nov 13, 2:00 PM  ·  Maya Reyes  (Engineer III)",
          "Thu Nov 14, 3:30 PM  ·  Devon Park (Engineer II)",
          "Fri Nov 15, 11:00 AM ·  Aaron Chen (Senior Engineer)",
          "",
          "First review session in ~48 hours.",
        ],
      },
    ],
    closingObservation:
      "The ToS says “aggregated and anonymised.” Two prior public breach disclosures used the same formulation before reversing.",
  },

  /* --------------------- LS2 DECIDE BEAT (drift by LS1) -------------------- */
  decide: {
    // Decide prompt drifts based on LS1 path per script §E.2.3.
    promptByLs1: {
      a: "Pranav is offering to share the tool. Your first review is Wednesday at 2 PM. What do you do?",
      b: "Pranav is offering to share the tool. You raised a process question last week. Your first review is Wednesday at 2 PM. What do you do?",
      c: "Pranav is offering to share the tool. You requested a calibration call last week. Your first review is Wednesday at 2 PM. What do you do?",
    },
    // Verbatim script §E.2.3 Decide table (3 paths, each ≤12 words).
    options: [
      { key: "a", label: 'Reply: "Cool, sign me up. Will try this cycle."' },
      { key: "b", label: 'Reply: "Want to flag this to Naomi before I sign up."' },
      { key: "c", label: 'Reply: "Going to write my reviews without it this cycle."' },
    ],
    justificationPrompt:
      "Why this option? What are you trusting about Pranav, the tool, or your own reading of the ToS?",
    artifactWrite: {
      a: {
        prompt:
          "You have decided to sign up. Write the Slack reply you send Pranav Monday morning.",
        submit: "Send to Pranav",
      },
      b: {
        prompt:
          "You have decided to flag this to Naomi before you sign up. Write the DM you send Naomi.",
        submit: "Send to Naomi",
      },
      c: {
        prompt:
          "You have decided to write your reviews without the tool this cycle. Write the Slack reply you send Pranav.",
        submit: "Send to Pranav",
      },
    },
    references: {
      a: [
        {
          tag: "Enthusiastic",
          calibrated: false,
          text: "Awesome, sign me up! Would love to save some time this cycle — thanks for sharing!",
          lands:
            "The enthusiasm signals to Pranav that you did not read the ToS. He notices. He does not say anything.",
        },
        {
          tag: "Calibrated (for the path)",
          calibrated: true,
          text:
            "Cool, sign me up. Will try it this cycle. I'll pilot on one draft and see how it feels before I go further.",
          lands:
            "Honest about the path you chose. Pranav can see you are trying it deliberately, not sleepwalking into it. He also cannot mistake the message for a full endorsement.",
        },
      ],
      b: [
        {
          tag: "Hedged",
          calibrated: false,
          text:
            "Hey Naomi — quick one, Pranav's been using this AI review tool and thinking about trying it. Let me know if that raises anything.",
          lands:
            "You raised the tool but not the clause. Naomi replies “what tool?” and the conversation stalls before it starts.",
        },
        {
          tag: "Calibrated",
          calibrated: true,
          text:
            "Quick question on a tool Pranav is circulating — ReviewDraft Engine, no formal approval needed to sign up. Their ToS clause 7.4 allows aggregated and anonymised training on uploaded review data — same formulation two prior HR-tech vendors used before reversing. Wanted to check whether IT or Privacy needs to weigh in before I upload any of my team's review materials. First review is Wednesday.",
          lands:
            "Naomi has the tool name, the clause, the historical pattern, and the timing in one message. She can act on it before your Wednesday review.",
        },
      ],
      c: [
        {
          tag: "Softened",
          calibrated: false,
          text: "Thanks — going to pass for now. Feels like a lot to spin up mid-cycle.",
          lands:
            "You declined without naming the reason. Pranav files it as capacity, not concern. The tool keeps circulating; the daylight step (naming the gap to someone who could act on it) never happens.",
        },
        {
          tag: "Calibrated (for the path)",
          calibrated: true,
          text:
            "Going to write my reviews without it this cycle — the ToS clause 7.4 language sits close enough to two prior HR-tech breach disclosures that I want to think about it before uploading team materials. Happy to talk it through if useful.",
          lands:
            "You named the reason. Pranav now knows this is not capacity; it is judgment. The signal travels whether he acts on it or not.",
        },
      ],
      closing:
        "What changes between these versions: whether the reason for the decision travels with the decision, or whether the reason lives only in your head.",
    },
  },

  /* -------------------- LS2 PRESSURE BEAT — EPISTEMIC ---------------------- */
  pressure: {
    // Pressure type: epistemic — new information arrives Wednesday morning.
    type: "epistemic",
    typeLabel: "Epistemic",
    // Verbatim script §E.2.4 trigger (HR Tech Weekly newsletter).
    trigger: [
      "Wednesday morning, 8:47 AM. A notification lands from your industry newsletter subscription.",
      "HR Tech Weekly Newsletter: “AI vendors and the ‘aggregated and anonymised' loophole — what HR teams should know.”",
      "The article opens: recent disclosures from three HR-tech vendors have raised concerns about how the phrase “aggregated and anonymised” is interpreted in machine-learning training pipelines. The Open Privacy Group has documented at least two cases in 2024 and 2025 where vendors using this formulation reversed their training policies after security audits revealed individual-record reconstruction was possible from supposedly anonymised aggregates.",
      "Footnote 14 lists seven vendors using the formulation. ReviewDraft Engine is at position four, with the note: “no reversal disclosed at time of writing.”",
    ],
    calendarReminder: "Wed Nov 13, 2:00 PM — Q4 Review session with Maya Reyes · starts in 5h 13m",
    prompt:
      "The Maya review starts in 5h 13m. Whatever you decided Monday, you now have information you did not have then. What do you do?",
    // Verbatim script §E.2.4 options (≤12 words each).
    options: [
      { key: "a", label: "Read the article. File it. Continue as planned." },
      { key: "b", label: "Forward the article to Pranav. Continue as planned." },
      { key: "c", label: "Pause the tool use. Update Naomi and Pranav with the article." },
    ],
    justificationPrompt:
      "Consistency is not the same as correctness. New information landed. Why this move — and what did the newsletter change?",
  },

  /* ------------------ THREE-HORIZON CONSEQUENCE — LS2 ---------------------- */
  consequences: {
    a: {
      sameDay: [
        "Monday 10:33 AM you reply to Pranav. By Tuesday afternoon you have uploaded Maya's 1:1 notes and three months of project updates into ReviewDraft Engine.",
        "Wednesday's Maya review is generated; you spend 22 minutes editing rather than 90 minutes drafting. The review goes well. Maya does not know how the draft was generated.",
        "Pranav DMs Wednesday evening: “Told ya. Best tool of the year.”",
      ],
      nextWeek: [
        "Pranav uses ReviewDraft Engine for two more cycles. You use it for the rest of your Q4 reviews. You stop reading the ReviewDraft Engine ToS notifications that arrive on Sundays.",
        "Mia mentions at the next manager sync that “some of you have started using a review tool — wanted to flag we are not formally endorsing it, but we are not blocking it either.” Pranav looks at you. You look at Pranav. Neither of you says anything.",
      ],
      monthEnd: [
        "In late December, ReviewDraft Engine publishes a “Policy Update” notification. The clause 7.4 language has been “refined” — the new language states the training use was always limited to “model architecture improvements rather than content-derived training” but acknowledges the original phrasing “may have created ambiguity.”",
        "The Open Privacy Group publishes a new article. Three companies suspend ReviewDraft Engine use pending investigation. Your company is not one of them — because no one is tracking that any of you ever signed up.",
        "Naomi DMs you in early January: “Hey — were any of your team's review materials uploaded to ReviewDraft Engine in Q4?” You stare at the message. You think about how to answer.",
      ],
      pressureMods: {
        a: {
          sameDay: [
            "Pressure: You read the article Wednesday morning before Maya's review. You note ReviewDraft Engine is footnoted. You decide it doesn't change anything for this cycle since you have already started. The Maya review proceeds. The Devon review proceeds. The Aaron review proceeds. Three engineers' performance data is now in ReviewDraft Engine's training pipeline.",
          ],
          nextWeek: [
            "Pressure: The article is still sitting in your saved tabs. You delete it on Friday during a tab cleanup. The cleanup feels good.",
          ],
          monthEnd: [
            "Pressure: You draft three different answers to Naomi. You settle on: “Some materials were used during Q4 reviews. Would you like a list?” Naomi: “Please.” You send the list. The list is real. The consequences are slow.",
          ],
        },
        b: {
          sameDay: [
            "Pressure: You forward the article to Pranav with “interesting timing.” Pranav: “Yeah, saw that. Nothing conclusive though — footnoted isn't the same as reversed.” You: “True.” You both continue.",
          ],
          nextWeek: [],
          monthEnd: [
            "Pressure: When Naomi asks in January, you tell her: “I flagged this to Pranav on Wednesday.” Naomi: “Did you flag it to me?” You did not.",
          ],
        },
        c: {
          sameDay: [
            "Pressure: You reply to Pranav Wednesday 9:15 AM: “Pausing on the tool — newsletter this morning has a footnote on the vendor I want to think about.” Pranav: “Seriously?” You: “Yeah. Will draft Maya without it.” The Wednesday review takes 90 minutes to draft from scratch. It is still good.",
          ],
          nextWeek: [
            "Pressure: You DM Naomi Wednesday afternoon with the article. Naomi: “Thanks. Will look. Did you upload any materials?” You: “Maya's, this morning.” Naomi: “OK — let's talk about cleanup Thursday.”",
          ],
          monthEnd: [
            "Pressure: The Policy Update lands. You are on Naomi's short cleanup list. Your name is also on the “flagged it early” note in the same summary. Both things are true.",
          ],
        },
      },
      mirrorRule: null,
      outcome:
        "Signed up. Uploaded team review materials. Consequences arrive when the vendor's policy update lands.",
      others:
        "Maya, Devon, and Aaron's performance data is in a vendor's training pipeline. HR asks in January.",
      interp: "She signed up. She read the article and did not revisit. Naomi asked in January.",
      manager:
        "Manager's perspective. “She was one of the ones who used it. She saw the article and did not tell me. I found out from the vendor.”",
      traj: "drop",
    },
    b: {
      sameDay: [
        "You reply to Pranav Monday at 10:33: “Want to flag this to Naomi before I sign up — the ToS has some language I want to ask about.” Pranav: “Suit yourself.”",
        "You DM Naomi: “Quick question on a tool Pranav is using — wanted to check whether IT or Privacy needs to weigh in before I start uploading review data.” Naomi: “Good question, give me a sec.”",
        "Tuesday morning, Naomi responds: “Talked to Privacy — they want to do a quick read on the ToS before any team uses it. Can hold off for now? I'll loop back by end of week.” You write Maya's review by hand Wednesday. It takes 90 minutes. It is good.",
      ],
      nextWeek: [
        "Privacy's review concludes Friday. Recommendation: “ReviewDraft Engine not approved for use without DPA modification (specifically: clause 7.4 must be modified or opted-out for any uploaded content).”",
        "Naomi sends a company-wide HR Slack: “Heads up — we've reviewed a review-drafting AI tool that has been informally circulating. Recommendation is to not use without IT/Privacy approval. Please contact me if any team's data has already been uploaded so we can coordinate cleanup.”",
        "Pranav DMs you privately: “Well that was fun.” You reply: “Sorry about the noise — but glad it's clarified.” Pranav: “Yeah, no worries. Better safe.”",
      ],
      monthEnd: [
        "When ReviewDraft Engine's “Policy Update” lands in late December, your company has no exposure. Naomi mentions in the December HR sync that “early flagging by a manager helped us avoid a real cleanup situation.” She does not name you. You appreciate that she does not name you.",
        "Mia mentions in your January year-end review: “What I notice is you ran a quiet flag through Naomi before using a tool. That's the kind of judgment that gets recognised at the institutional level even when it's not visible at the team level.” You take the note. You decide to keep doing this.",
      ],
      pressureMods: {
        a: {
          sameDay: [
            "Pressure: You read the article Wednesday. You note the alignment with what made you uncomfortable on Monday. You consider whether to forward it to Naomi. You don't, because she's already looking at it.",
          ],
          nextWeek: [],
          monthEnd: [],
        },
        b: {
          sameDay: [
            "Pressure: You forward the article to Pranav — “thought you'd want to see this given what we were talking about Monday.” Pranav: “Damn.” The conversation with him warms up. He starts asking you questions about the ToS before signing up to other tools.",
          ],
          nextWeek: [],
          monthEnd: [],
        },
        c: {
          sameDay: [
            "Pressure: You forward the article to Naomi: “Just to flag this — the vendor footnoted at #4 is the one I asked about Monday.” Naomi: “Saw it. Privacy is going to want this in their review notes. Thanks.”",
          ],
          nextWeek: [],
          monthEnd: [
            "Pressure: The Privacy team cites the newsletter forward in the review notes. Your name is quietly attached to two references now — the Monday flag and the Wednesday follow-on. The daylight compounds.",
          ],
        },
      },
      mirrorRule: null,
      outcome:
        "Flagged the tool to Naomi before signing up. Privacy review paused adoption. Company has no exposure.",
      others:
        "Pranav paused too. HR ran a company-wide clarification. Mia noted the judgment in year-end.",
      interp: "She named the gap to someone who could act on it, before the deadline mattered.",
      manager:
        "Manager's perspective. “Quiet flag through the right channel. That is the kind of judgment I want in the room the next time a tool circulates through Slack instead of through IT.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "You reply to Pranav Monday at 10:33: “Going to write my reviews without it this cycle. Want to think about it more.” Pranav: “Sure thing.”",
        "Wednesday's Maya review takes 90 minutes by hand. You feel something during the drafting — not virtuous, just present. The review is good.",
        "The participant does not name the tool. The participant does not flag the tool to anyone else either.",
      ],
      nextWeek: [
        "Pranav continues using ReviewDraft Engine. The Open Privacy Group article you saw Wednesday is circulated more widely Thursday. By Friday, Privacy is asking around informally.",
        "Naomi does not know — yet — that you saw the issue on Monday and chose not to flag it. Pranav still does not know either.",
        "The information lives in your head.",
      ],
      monthEnd: [
        "When ReviewDraft Engine's “Policy Update” lands, your company has exposure through Pranav's team. Naomi convenes a cleanup meeting. The conversation goes to Pranav and his director. You sit in the meeting because you are part of the manager cohort.",
        "Naomi says: “I wish someone had flagged this to me earlier when it was easier to fix.” You feel the sentence land. You think about Monday morning. You realise that “not using the tool” was the easy half of the call. “Naming the gap to Naomi” was the harder half. You did not do it.",
      ],
      pressureMods: {
        a: {
          sameDay: [
            "Pressure: You see ReviewDraft Engine in the footnote Wednesday morning. You feel briefly relieved you said no. You file the article. You don't share it.",
          ],
          nextWeek: [],
          monthEnd: [],
        },
        b: {
          sameDay: [
            "Pressure: You forward the article to Pranav — no comment. Pranav: “Yeah, saw that.” The conversation ends. You did not forward it to Naomi.",
          ],
          nextWeek: [],
          monthEnd: [
            "Pressure: When Naomi's cleanup meeting happens, someone mentions the newsletter was in the group chat by Friday. You did not put it there either.",
          ],
        },
        c: {
          sameDay: [
            "Pressure: You DM Naomi Wednesday morning: “Quick FYI on something Pranav circulated Saturday — there's an HR Tech Weekly article today that mentions the tool. Thought you might want to see.” Naomi: “Thanks. Will look. Did you start using it?” You: “No, decided against it Monday.” Naomi: “Good call. Will follow up.”",
          ],
          nextWeek: [],
          monthEnd: [
            "Pressure: The cleanup meeting credits you with the early flag. The exposure remains, but smaller. The Mirror Rule does not fire on this composition.",
          ],
        },
      },
      // Mirror Rule candidate — LS2 Decide-C + Pressure-A (declined the tool
      // but did not name the gap after new information arrived). Verbatim
      // script §E.2.5 LS2 Mirror Rule candidate.
      mirrorRule: {
        combo: "ca",
        line: "You did not use it. You also did not name it. The people who could have acted earlier did not know.",
      },
      outcome:
        "Declined the tool. Did not flag the gap to anyone. Cleanup lands on Pranav's team.",
      others:
        "Pranav's team carries the exposure. Naomi runs a cleanup meeting without knowing what you knew.",
      interp: "She declined. She did not name the gap. Quiet integrity, without institutional visibility.",
      manager:
        "Manager's perspective. “She said no. She did not tell anyone why. The gap she saw on Monday landed on the team next to hers three weeks later.”",
      traj: "drift-down",
    },
  },
  signalPanel: [
    {
      key: "a",
      title: "Sign up and pilot the tool",
      signal: "Signed up. Uploaded review materials. Continued after the newsletter landed.",
      effect:
        "The vendor's policy update in December surfaces the exposure. HR asks who used it. You have to answer.",
    },
    {
      key: "b",
      title: "Flag to Naomi before signing up",
      signal: "Named the ToS clause to HR before uploading anything. Held the review draft by hand.",
      effect:
        "Privacy pauses adoption company-wide. No exposure when the policy update lands. Judgment travels.",
    },
    {
      key: "c",
      title: "Decline without flagging",
      signal: "Declined the tool. Did not name the gap to anyone who could act on it.",
      effect:
        "Cleanup lands on the team next to yours. You realise “not using the tool” was the easy half of the call.",
    },
  ],
  reflection:
    "Think of a grey-zone moment where you made the right call privately and did not tell anyone. What happened to the people around you who did not have the information you had?",
};
