/* ============================================================================
   M5 CONTENT LAYER — AI Breakdown & Recovery
   AIWorkLab · Pressure Point 5. Built to AI-Ready Behaviours Production
   Standard v1.2 from AI_Ready_M5_AI_Breakdown_Recovery_PilotReady_v1_2.md.

   Schema mirrors d3Content.js with the AIWorkLab differences:
   - No segmentD (audio case omitted per Section 1.1)
   - Segment E holds TWO layered scenarios (LS1, LS2) — Inspect → Decide →
     Pressure → 3-horizon consequence, with within-module memory threads
   - Segment F holds TWO micro-drills fixed
   - Segment G: Awe Close (three-line arc) + Retention Check setup

   Where the script authors specify a locked line, it is rendered verbatim.
   Where the engine needs a small connective bridge or a shared prompt, the
   copy is FLAGGED with an // AUTHORED comment in the observational register.
   ========================================================================== */

export const M5_CONTENT = {
  module: {
    id: "M5",
    title: "AI Breakdown & Recovery",
    tier: "AIWorkLab · Pressure Point 5",
    // Marketing surface: never expose the mechanism-counts. Single-sector MVP.
    sector_variants: ["Technology / Knowledge Work"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Technology / Knowledge Work context — finance/analytics function, standing to speak directly to senior stakeholders.",
      pickerHint: "The context you choose here applies across both layered scenarios.",
    },
    // Cross-lab callback (§1.4.A) — M5 optionally consumes D1's final personal
    // sentence at Screen A-0 if available. MVP renders the fallback string.
    prior_module_references: ["D1"],
  },
  dimension: {
    id: "M5",
    name: "AI Breakdown & Recovery",
    central_question: "Do you own the breakdown, or hide behind the machine?",
    framework: {
      label: "The Three Sentences",
      body: "What happened · Who was affected · What happens next",
    },
    behavioural_question: "Do you own the breakdown, or hide behind the machine?",
  },
  // Within-module memory: LS1 path drives LS2's template prefill + decide
  // prompt drift (§1.4.A.1). Two threads required, both implemented in E.2.
  intra_module_state_threads: ["template_prefill_drift_from_ls1", "decide_prompt_drift_from_ls1"],

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    coldOpen: {
      // Cross-lab callback (Screen A-0) — D1 → M5. For MVP the personalised
      // variant is unavailable at runtime (no cross-session persistence yet);
      // the fallback is rendered as the audible narration and labelled as a
      // callback. TODO(cross-module-memory): stitch wrapper + participant's
      // D1 final personal sentence once the store is online.
      d1Callback: {
        wrapperLead: "Last time you carried something out of this lab. You wrote:",
        sentenceSlot: "{{prior.D1.final_personal_sentence}}",
        wrapperTail: "That sentence still belongs to you — you, last month. We are going to ask you to live a moment now — a moment where AI-assisted work has already gone wrong.",
        // FALLBACK — used when D1 is not present in session state.
        // AUTHORED — a two-sentence bridge in the locked observational
        // register, per the Standard's §1.4.A cross-lab pattern. It carries
        // no editorial on AI and no reference to bravery.
        fallback: "This module can stand alone, but it connects more deeply after D1. What follows is one moment inside AI-assisted work that has already gone wrong.",
      },
      // Screen A-1 — the discovery. The participant is dropped into Friday
      // 3:47 PM with two windows on their desk.
      scene: {
        title: "SCENE — FRIDAY, 3:47 PM, AT THE PARTICIPANT'S DESK",
        subtitle: "Two browser windows. Left: a PDF reader showing the CFO pre-read for tonight, scrolled to slide 7. Right: the ChartDraft Engine source-file dashboard, with two source files visible.",
      },
      // The three visible artifacts on the discovery screen, rendered as
      // labelled monospaced cards below the scene note per the Tony
      // artifact-rendering rule.
      artifacts: [
        {
          caption: "CFO pre-read PDF (left window, dominant)",
          title: "Q3 EXECUTIVE PRE-READ · Friday Pre-Brief · Slide 7 of 23",
          mono: true,
          lines: [
            "Q3 COST PERFORMANCE VS BUDGET",
            "[Bar chart showing four quarters. Q3 bar is shorter than the budget line.]",
            "",
            "Headline finding: Q3 cost discipline improved. Operating costs came in $940K below budget.",
            "",
            "Operating costs Q3:                          $4.27M   (Budget: $5.21M)",
            "Year-over-year operating cost change:        -18%     (Q3 2025 -> Q3 2026)",
            "",
            "[Citation footer at slide base]:",
            "Analysis prepared by [Participant] · Data through October 31, 2026",
          ],
        },
        {
          caption: "ChartDraft Engine source-file dashboard (right window)",
          title: "ChartDraft Engine · Source File Audit · Q3 Executive Pre-Read · Slide 7",
          mono: true,
          lines: [
            "Source files referenced by generation:",
            "  [OK] Q3_Operating_Costs_FINAL.xlsx  · last modified Oct 31 · reviewed",
            "  [OK] Q3_Capital_Costs_FINAL.xlsx    · last modified Oct 31 · reviewed",
            "",
            "Generation summary:",
            "  Chart synthesised from Q3 cost data files.",
            "  Output: bar chart with budget overlay.",
            "",
            "[Source-file values, expandable]:",
            "  Q3_Operating_Costs_FINAL.xlsx  ->  Q3 operating costs:  $5.21M  (budget: $5.21M)",
            "  Q3_Capital_Costs_FINAL.xlsx    ->  Q3 capital costs:    $4.27M  (budget: $4.40M)",
          ],
        },
        {
          caption: "Timer (top-right corner)",
          title: "Time: 3:47 PM · CFO opens pre-read: 6:00 PM",
          mono: true,
          lines: [
            "2h 13m remaining.",
            "The timer is visible throughout LS1.",
          ],
        },
      ],
      // Cinematic detail — recognition seed the observational register.
      // Rendered as observational body text under the scene.
      cinematicNotes: [
        "The participant's eye moves from the chart to the dashboard and back. The chart shows $4.27M as Q3 operating costs. The source file shows $4.27M as Q3 capital costs. The ChartDraft Engine confused the two files. The chart's headline — \"Q3 cost discipline improved\" — is structurally wrong. Q3 operating costs did not come in $940K below budget. Q3 operating costs came in exactly at budget. The chart has reversed the business meaning of the slide.",
        "The slide's citation footer reads \"Analysis prepared by [Participant].\" The ChartDraft Engine is not named in the citation. The participant is the named author of work the AI tool drafted.",
      ],
      // A-2 — the central question, framed quietly.
      centralQuestionLead: "Do you own the breakdown, or hide behind the machine?",
      centralQuestionSub: "This is rehearsal. Nothing is graded. Take the time you would actually take.",
    },
    // Safety Floor — AI-Ready register.
    // AUTHORED — a compact, observational safety card that follows the
    // AIWorkLab standard's no-grading, no-score, private-rehearsal rules.
    safetyFloor: {
      card: [
        "THIS IS PRIVATE REHEARSAL UNDER WORKPLACE PRESSURE.",
        "Nothing you do here is graded. No scores. No pass or fail.",
        "Your Growth Log captures what you practised — it is your private development record.",
        "What you just experienced was one moment. What follows is another. Behavioural signals are recorded silently; they are never displayed to you as a verdict.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    // B.1 — What the participant just lived through.
    justLived: {
      label: "B-1 · What you just lived through · 40s",
      narration: [
        "The chart has your name on it. The AI tool does not. That is how it always works.",
        "The work that ships under your name belongs to you, including the parts the AI helped with, including the parts the AI got wrong. Recovery is what authorship looks like when AI-assisted work fails.",
      ],
    },
    // B.2 — The recovery standard, plainly stated. Held for the full 2 min.
    standardCard: {
      title: "The recovery standard, under AI-assisted work:",
      items: [
        "You recognise the breakdown before someone else does, or you recognise it as soon as it is named.",
        "You speak first, and you speak directly to the people affected, not the people watching.",
        "You name what happened in your own words. You do not let the tool be the subject of the sentence.",
        "You name what you will do next, in language specific enough to be tested later.",
        "You hold authorship through the breakdown. Authorship does not transfer to tools when the work goes wrong.",
      ],
      close: "Recovery is what authorship looks like when AI-assisted work fails.",
    },
    // B.3 — What this standard refuses.
    refuses: {
      title: "What the standard refuses:",
      items: [
        {
          h: "The deflection disguised as transparency.",
          t: "\"The AI tool produced an incorrect chart\" (the AI is the subject; the participant is the bystander).",
        },
        {
          h: "The deflection disguised as procedure.",
          t: "\"We will review our AI quality controls\" (no person is the subject of the corrective action).",
        },
        {
          h: "The deflection disguised as scale.",
          t: "\"This is an industry-wide concern with AI summarisation tools\" (the breach becomes a category; the participant disappears).",
        },
        {
          h: "The silent recovery.",
          t: "Making the call without naming it to the people affected.",
        },
      ],
    },
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    // C.1 — Recognition Brief 1: "The breakdown will get named."
    c1: {
      title: "C1 — The breakdown will get named",
      label: "Recognition Brief 1 · 2:30",
      narration: [
        "Here is what makes recovery hard.",
        "The breakdown is going to be named. Either you name it, in your own words, in the time you have. Or someone else names it — the CFO, your manager, a colleague, a customer, a regulator — and the words they use will be the words that stay.",
        "The shortcut is to delay the naming until someone else does it for you. The shortcut clears the immediate pressure. It leaves you holding language you did not choose, in a record you do not control, attributed to a tool whose name is not in the citation footer.",
      ],
      cardLine: "The breakdown will get named. The only question is who chooses the words.",
    },
    // C.2 — Recognition Brief 2: The Three Sentences (signature framework
    // reveal). Named ONLY after the participant has lived the cold open.
    c2: {
      title: "C2 — The Three Sentences",
      label: "Recognition Brief 2 · Framework reveal · 2:30",
      framework: "The Three Sentences",
      // The framework matrix — three sentences, each with function + subject
      // rule. Rendered as a labelled table.
      matrix: [
        { n: "1", function: "What happened", subject: "I / we are the subject. The AI is not." },
        { n: "2", function: "Who was affected", subject: "The affected person / team / stakeholder is visible." },
        { n: "3", function: "What happens next", subject: "I / we commit to a testable action." },
      ],
      narration: [
        "The Three Sentences is what recovery looks like when it is a reflex, not a performance.",
        "Sentence one names what happened. You are the subject. The AI is not. The shortcut is to make the tool the actor and you the bystander — \"the AI generated the wrong chart,\" \"the tool confused two files,\" \"the system produced an error.\" The shortcut works until the record is read by someone who notices that no person was named, and that the chart still carried someone's name in the citation footer.",
        "Sentence two names who was affected. The affected person, team, or stakeholder is visible. The shortcut is to abstract — \"there may be some discrepancies,\" \"stakeholders may notice.\" The discipline is to name the specific person, team, or audience who will feel the consequence. The CFO. The Audit Committee. The board. The customer. The person you have a name for.",
        "Sentence three names what you will do next, specific enough to be tested later. The shortcut is the procedural future tense — \"we will review our processes,\" \"we will improve our AI oversight.\" The discipline is the personal future tense — \"I will rebuild the source-file verification step into the pre-publish review by Wednesday.\" The third sentence is the sentence that has to be true a week from now.",
        "Recovery is operational. The Three Sentences is the operational discipline.",
      ],
      // Central question return closer — carried at end of Segment C.
      centralQuestionReturn: {
        label: "C2 · The central question returns · 30s",
        opener: "So we return to the question.",
        echo: "Do you own the breakdown, or hide behind the machine?",
        // AUTHORED — an observational closing sentence in the register of
        // the M5 script, holding the same "you now know the tension" cadence
        // used across the suite while staying present-tense.
        closing: "Now you know what the tension is. The tool is not the subject of the sentence. You are. What follows are two moments where that discipline is tested.",
      },
    },
    // Transition to Segment E (no Segment D in AIWorkLab).
    // AUTHORED — a compact three-line transition in the M5 observational
    // register, per the Standard §1.1. It names what is coming without
    // instruction.
    complete: {
      label: "Segment C complete · Transition to Scenario Lab · 15s",
      narration: [
        "You now have the framework. Three sentences. What happened. Who was affected. What happens next.",
        "Next, you sit inside two moments where AI-assisted work has already caused visible damage.",
        "Put your headphones on if you have them.",
      ],
    },
    // Pause invitation before the Scenario Lab (Break Point 1).
    // AUTHORED — a single break invitation between Segment C and Segment E,
    // matching the AI-Ready 45-min pacing and the observational register.
    breakPoint1: {
      label: "Pause invitation · Break Point 1 · 15s",
      title: "PAUSE INVITATION · BREAK POINT 1",
      subtitle: "After Segment C",
      elapsedLabel: "Elapsed: ~11 minutes",
      remainingLabel: "Remaining: ~34 minutes",
      avatarScript: [
        "You have the framework. Two layered scenarios come next.",
        "Our intent is not to have you complete this module — it is to have you carry it with you.",
        "Take your time. Your progress is saved.",
      ],
      continueLabel: "Enter the Scenario Lab",
      returnLaterLabel: "Return later",
    },
  },

  /* ------------------- SEGMENT F — MICRO-DRILLS -------------------------- */
  segmentF: {
    intro: "Two short consolidation drills. The Three Sentences discipline. Rapid subject recognition, then subject rewrite.",
    f1: {
      title: "F1 — Find the subject",
      audioIntro: "Three sentences from real post-incident write-ups. For each, identify the grammatical subject. Forty seconds each. We are not rating; we are rehearsing the muscle.",
      onScreenHeader: {
        title: "FIND THE SUBJECT",
        lines: [
          "You will see three real post-incident sentences.",
          "For each one, identify the grammatical subject of the sentence.",
        ],
        cta: "Tap to begin.",
      },
      options: [
        "I / we",
        "A named person",
        "The AI / the tool",
        "The team / the process",
        "Passive (no subject)",
      ],
      // Verbatim from the script's F1 items with the correct answer + a
      // one-sentence feedback that carries the OI-3 / FM-1 / FM-2 mapping
      // in the observational register.
      items: [
        {
          vignette: "\"The customer service AI tool generated an incorrect refund decision for the affected customer.\"",
          answer: "The AI / the tool",
          feedback: "Grammatical hiding (FM-1). The AI is the actor; the person who approved or shipped the decision is nowhere in the sentence. The record now says nobody did it.",
        },
        {
          vignette: "\"I approved a marketing claim without verifying the AI-summary tool's source citation.\"",
          answer: "I / we",
          feedback: "Subject discipline held (OI-3). \"I\" is the actor. The AI tool is a factor. This is the sentence that predicts durable corrective action.",
        },
        {
          vignette: "\"An inconsistency was identified in the AI-generated analysis prior to client distribution.\"",
          answer: "Passive (no subject)",
          feedback: "Passive-voice deflection (FM-2). \"An inconsistency was identified\" — by whom? No one. The record now says nobody caught it.",
        },
      ],
      closeCard: "You have rehearsed the subject muscle three times. The muscle is small. The cost of not having it is large.",
    },
    f2: {
      title: "F2 — Rewrite the subject",
      audioIntro: "Three tool-subject or passive sentences. Rewrite each so a person — I, we, or a named person — is the grammatical subject. Sixty seconds for the three rewrites. Type or speak.",
      onScreenHeader: {
        title: "REWRITE THE SUBJECT",
        lines: [
          "Rewrite each sentence so a person is the grammatical subject.",
          "Under 20 words. In your own voice.",
        ],
        cta: "Tap to begin.",
      },
      items: [
        {
          original: "\"The forecasting AI tool produced inaccurate quarterly predictions.\"",
          // AUTHORED — reference rewrite in the disciplined register. Held
          // as a calibration point after the participant's own rewrite.
          reference: "\"I shipped quarterly predictions without verifying the AI tool's assumptions against the last four quarters of actuals.\"",
          feedback: "The subject moves from the tool to the person who shipped. The corrective action can now be named against a person and a date.",
        },
        {
          original: "\"An anomaly was identified in the AI-generated client report.\"",
          reference: "\"I identified an anomaly in the AI-generated client report before it went out.\"",
          feedback: "The passive dissolves. The person who identified it is visible. The record now names both what happened and who caught it.",
        },
        {
          original: "\"We will improve our AI oversight procedures going forward.\"",
          reference: "\"I will add a source-citation verification step to the pre-publish review by Wednesday, owned by me, with follow-up at month end.\"",
          feedback: "Procedural becomes personal. \"We will improve\" becomes \"I will add\" — with owner, action, and date. The third sentence is now testable.",
        },
      ],
      closeCard: "You have rewritten three sentences. The rewrite is not cosmetic. The rewrite is the corrective action.",
    },
    reflection: "The subject of the sentence is the actor of the future.",
    complete: {
      label: "Transition to Segment G · 15s",
      narration: [
        "The framework gave you three sentences.",
        "The Scenario Lab gave you the consequences.",
        "The drills settled the subject muscle into recognition and rewrite.",
        "One thing left.",
      ],
      continueLabel: "Continue",
    },
  },

  /* ---------------- SEGMENT G — AWE CLOSE + RETENTION -------------------- */
  segmentG: {
    // Break point 4 — optional pause before the closer.
    // AUTHORED — a short optional break invitation before the awe close, in
    // the AIWorkLab register.
    breakPoint4: {
      label: "Pause invitation · Break Point 4 · 10s",
      title: "PAUSE INVITATION · BREAK POINT 4",
      subtitle: "Optional, after Segment F",
      elapsedLabel: "Elapsed: ~42 minutes",
      remainingLabel: "Remaining: ~3 minutes",
      avatarScript: [
        "You are at the closing. It is a few minutes long. You can take a break here, or step into it now. Your choice.",
      ],
      continueLabel: "Step into the closing",
      returnLaterLabel: "Take a short break",
    },
    // G-2 the awe-moment. Verbatim three lines, held for 8 seconds.
    aweLines: [
      "The work carried your name.",
      "The breakdown carried your name.",
      "The recovery will too.",
    ],
    // G-3 Retention Check setup.
    retentionCheck: {
      label: "Retention Check setup · 40s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In three to seven days, the workplace will return.",
        "One small moment. One recovery sentence. No grade.",
      ],
      details: [
        { k: "Appears", v: "3 to 7 days from now (weekday send only)" },
        { k: "Format", v: "One scenario fragment, personal-scope only" },
        { k: "Response", v: "One recovery sentence, up to 30 words" },
        { k: "Attempts", v: "1 available" },
        { k: "Horizon", v: "Same-Day only (Next Week / Month End locked to this module)" },
        { k: "Delivery", v: "In-app · Email · SMS (in-app pre-selected)" },
      ],
      doctrinalNote: [
        "This is not a test. It is the workplace returning for one 30-second moment.",
        "The Same-Day horizon plays based on the grammatical subject of your sentence. There is no verdict overlay.",
      ],
      continueLabel: "Got it — continue",
    },
    // Framework return + carry-forward (analogue of D3's g15 auto-advance).
    // AUTHORED — a quiet framework recall block, kept short (25s) to respect
    // the AIWorkLab 45-min budget.
    frameworkReturn: {
      label: "Framework Return · 25s",
      durationSeconds: 25,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through two moments. Different pressure. Different record. The same three sentences.",
      steps: ["What happened.", "Who was affected.", "What happens next."],
      tagline: "This is The Three Sentences.",
      carryForward: "The Three Sentences is a discipline you will carry as your work scope grows.",
    },
    // Growth Log surface (g2).
    recognitionLabel: "Recognition narration · 45s",
    recognition: [
      "You just rehearsed the reflex twice. Different pressure. Different record.",
      "What you are carrying out of this module is not a rating. It is not a credential. It is not a checklist.",
      "It is a sharper sense of what the record sounds like when the AI tool is not the subject of the sentence.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "A sharper sense of what recovery sounds like when it names the actor.",
      ],
    },
    // Central question return + final personal sentence prompt.
    bookendQuestion: "Do you own the breakdown, or hide behind the machine?",
    finalPrompt: "In one sentence, what is the first sentence you would speak the next time AI-assisted work goes wrong on your desk?",
    // Cold-open callback — one variant per Decide path (LS1). Held quietly
    // during the recognition beat.
    // AUTHORED — three short callbacks in the M5 observational register,
    // anchored to the 3:47 PM / CFO pre-read / two-window moment.
    callback: {
      a: "You opened this module at 3:47 by sending a vague Slack. Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 3:47 by picking up the phone. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 3:47 by writing the email with the corrected chart attached. Hold that first instinct beside the choices that followed.",
    },
    // Completion screen after the awe close.
    completion: {
      title: "Module Complete: AI Breakdown & Recovery",
      subtitle: "AI-Ready Behaviours — Foundation Tier — Complete",
      body: "You can now return to the workplace, or open your Growth Log.",
      dashboardLabel: "Return to dashboard",
      growthLogLabel: "Open Growth Log",
    },
  },
};

/* ============================================================================
   LAYERED SCENARIO 1 — The Friday 3:47 PM Moment
   Pressure type: Time / operational. Mobile mode: Stacked-Swipe.
   ========================================================================== */
export const LS1_CONTENT_M5 = {
  id: "LS1",
  title: "The Friday 3:47 PM Moment",
  commitment: "Decide the first recovery action inside a 2h 13m window that will collapse without warning.",
  pressureType: "Time / operational",
  mobileMode: "stacked_swipe",
  callback: [
    "You have been here before.",
    "At the start of this module, you saw the pre-read chart and the source-file audit side by side. Now you return to the moment with the full consequence chain — same day, next week, month end.",
  ],
  intro: [
    "Layered Scenario 1. The Friday 3:47 PM Moment.",
    "The chart is wrong. Your name is in the citation footer. The CFO opens the pre-read at 6 PM. What you send first — and how you speak when the window collapses — decides what the record says next.",
  ],
  briefing:
    "It is Friday, 3:47 PM. The CFO's Q3 pre-read is due to be opened at 6:00 PM. Slide 7 carries a chart the ChartDraft Engine generated from two source files — Q3 Operating Costs and Q3 Capital Costs. The tool swapped the labels. The chart's headline says \"Q3 cost discipline improved. Operating costs came in $940K below budget.\" The source files say operating costs came in exactly at budget. The chart has reversed the business meaning of the slide. The slide's citation footer names you. The tool is not named. The CFO opens the pre-read in two hours and nine minutes. You are the only person between this desk and the CFO who knows.",
  // Inspect Surface — three panels (Section 1.4.D).
  inspect: {
    label: "Inspect Beat · LS1 · Stacked-Swipe",
    subtitle: "The pre-read chart is on the left. The source-file audit is in the middle. Your message composer is on the right. The CFO opens the pre-read in two hours and nine minutes.",
    countdownFixed: "Timer: CFO opens pre-read in 2h 09m at 6:00 PM.",
    panels: [
      {
        role: "SOURCE",
        caption: "CFO pre-read PDF · slide 7 (expanded)",
        title: "Q3 COST PERFORMANCE VS BUDGET",
        mono: true,
        lines: [
          "[Bar chart showing Q1, Q2, Q3, Q4-forecast bars against budget line. Q3 bar is shorter than the budget line — visibly below.]",
          "",
          "Headline finding: Q3 cost discipline improved. Operating costs came in $940K below budget.",
          "",
          "Operating costs Q3:                     $4.27M   (Budget: $5.21M)",
          "Year-over-year operating cost change:   -18%     (Q3 2025 -> Q3 2026)",
          "",
          "Implications (per generation summary):",
          "  \"Q3 cost-control measures effective; recommend continuation into Q4 with capacity",
          "   to invest reserved savings into Q4 initiatives.\"",
          "",
          "[Citation footer]: Analysis prepared by [Participant] · Data through October 31, 2026",
        ],
      },
      {
        role: "SOURCE",
        caption: "ChartDraft Engine source-file dashboard",
        title: "ChartDraft Engine · Source File Audit · Q3 Executive Pre-Read · Slide 7",
        mono: true,
        lines: [
          "Source files referenced:",
          "",
          "Q3_Operating_Costs_FINAL.xlsx",
          "  -> Q3 operating costs:            $5.21M",
          "  -> Budget:                        $5.21M",
          "  -> Variance:                      $0 (at budget)",
          "  -> Year-over-year change:         +2% (Q3 2025 -> Q3 2026)",
          "",
          "Q3_Capital_Costs_FINAL.xlsx",
          "  -> Q3 capital costs:              $4.27M",
          "  -> Budget:                        $4.40M",
          "  -> Variance:                      -$130K (below budget)",
          "  -> Year-over-year change:         -18% (Q3 2025 -> Q3 2026)",
          "",
          "Chart generation log:",
          "  Source-file labels were not preserved through the chart generation step.",
          "  The chart used $4.27M as Q3 cost figure; the chart caption labelled it 'operating costs.'",
          "",
          "Reconciliation status:",
          "  [FAIL] Chart numbers do not match Operating Costs source file.",
          "  [FAIL] Numbers match Capital Costs source file.",
          "  [FAIL] Labels in chart and caption do not match Capital Costs label.",
        ],
      },
      {
        role: "OUTPUT",
        caption: "Draft message composer (your recovery surface)",
        title: "Draft message composer",
        mono: true,
        lines: [
          "To:       [CFO, Naomi] / [Manager, David] / [Both]",
          "Channel:  Slack DM / Email / Phone call",
          "",
          "[Empty composer. Cursor blinks.]",
          "",
          "Timestamp: 3:51 PM.",
        ],
      },
    ],
    interaction: "compose_recovery_first_action",
  },
  // Decide beat — three paths. Verbatim option text per script.
  decisionPrompt: "The CFO opens the pre-read at 6 PM. What do you send first?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  options: [
    { key: "a", label: "Slack CFO: \"FYI — small Q3 number revision incoming.\"" },
    { key: "b", label: "Phone CFO directly. Name chart error. Offer corrected slide." },
    { key: "c", label: "Email CFO+manager: full chart error description, corrected chart attached." },
  ],
  // Artifact-write — the participant writes the actual message they would
  // send under each path. References surface after submit.
  artifactWrite: {
    a: {
      prompt: "You have decided on the vague Slack. Write the exact message you send the CFO now — the words that go with the FYI.",
      submit: "Send Slack",
    },
    b: {
      prompt: "You have decided to phone the CFO. Compose the three sentences you will speak when he picks up. This is the surface where the grammatical subject of each sentence is captured.",
      submit: "Place the call",
    },
    c: {
      prompt: "You have decided on the email with the corrected chart attached. Write the actual email — the words the CFO reads at 5:08 PM before boarding the train.",
      submit: "Send email",
    },
  },
  // Reference variants surface after the participant's submission.
  references: {
    // AC path shares the same three-reference calibration set.
    ac: [
      // AUTHORED — Defensive / Over-apologetic / Calibrated reference set,
      // in the D-family two-reference calibration pattern.
      { tag: "Defensive", calibrated: false, text: "Heads-up — the Q3 chart might need a small tweak before you open it.", lands: "\"Might need\" reads as uncertainty from you, not a caught error. The CFO reads it as low signal and does not act." },
      { tag: "Over-apologetic", calibrated: false, text: "So sorry — the AI tool messed up the Q3 chart and I only just noticed. I feel terrible sending this before your call.", lands: "The apology is the message; the caught error and the fix disappear behind it. The CFO now has to manage both the chart and your feelings." },
      { tag: "Calibrated", calibrated: true, text: "I shipped a pre-read chart with operating and capital costs mislabelled. Slide 7 reverses the actual Q3 story — operating costs came in at budget, not $940K below. I'll send a corrected slide by 4:30 PM and would like to catch you before you board the 5:15 train.", lands: "The CFO hears what you did, what the impact is, and what happens next — in three sentences. He can decide without translating." },
    ],
    b: [
      // Path B — phone call. Two reference three-sentence sets.
      // AUTHORED — sentence-level calibration references keeping the M5
      // grammatical-subject rule visible.
      { tag: "Tool-as-subject (broken)", calibrated: false, text: "The AI tool got the Q3 chart wrong and confused the two source files. There may be some discrepancies. We will review our AI quality controls.", lands: "Three sentences; not one names you as the subject. The CFO cannot act on \"the tool\" or \"we\" — the record now says nobody caught it." },
      { tag: "Three Sentences (held)", calibrated: true, text: "I shipped a pre-read chart with operating and capital costs mislabelled. The Q3 chart reverses the actual cost story — operating costs came in at budget, not $940K below. I'll send you a corrected slide by 4:30 PM with the right numbers, and the Audit Committee chair should hear it from us before Tuesday.", lands: "Three sentences. You are the subject in one and three; the affected audience is visible in two. The CFO has the diagnosis, the impact, and the commitment." },
    ],
    c: [
      // AUTHORED — Path C references (email) — two variants.
      { tag: "Passive-voice", calibrated: false, text: "An error was identified in the Q3 pre-read chart. Corrected version attached. Adjustments will be made to the review process going forward.", lands: "\"An error was identified\" — by whom? The passive voice leaves the author invisible. The record enters the file with no named actor." },
      { tag: "Three Sentences (held)", calibrated: true, text: "I shipped a pre-read chart with operating and capital costs mislabelled — attached is the corrected slide 7. The Q3 chart reverses the actual cost story; the Audit Committee narrative should be updated before Tuesday. I'll rebuild the source-file verification step into pre-publish review by Wednesday, owned by me.", lands: "The email is durable. The CFO forwards it with one line. The record now has a caught-and-corrected pattern with your name attached." },
    ],
    closing:
      "What changes between these versions: whether the AI tool or the participant is the grammatical subject of the sentence, and whether the affected audience is visible or abstracted. The facts are identical. The record is not.",
  },
  // Pressure beat — Time/operational. Sara's early-opening notice.
  // Trigger differs by Decide path per script.
  pressure: {
    label: "Pressure Beat · Time / operational · Sara's notice",
    // AUTHORED — a compact framing sentence to introduce the pressure card.
    intro: "Fourteen minutes after your first action, Sara — the CFO's executive assistant — replies via Slack. The window collapses by 45 minutes.",
    countdownReset: "Timer: 41 minutes remaining. The CFO leaves at 5:15.",
    // Verbatim per script — Sara's message drifts by Decide path.
    triggerByPath: {
      a: "Sara: \"He's actually opening the pre-read early — going to read it on the train home. He leaves at 5:15.\" Then two minutes later, your DM to the CFO shows as 'Seen 4:21 PM' but no response. The vague Slack landed. The breakdown is still unnamed.",
      b: "Sara: \"He's actually opening the pre-read early — going to read it on the train home. He leaves at 5:15. He's on a call until 4:45 but I can interrupt if it's urgent.\" You now have an explicit option to interrupt, and an explicit framing — is this 'urgent'?",
      c: "Sara: \"He's actually opening the pre-read early — going to read it on the train home. He leaves at 5:15. Saw your email — should I flag it to him before he leaves?\"",
    },
    prompt: "The window just collapsed by 45 minutes. What do you do next?",
    justificationPrompt: "Why this move? What are you trying to reach — the CFO, the record, or the calendar?",
    options: [
      { key: "a", label: "Acknowledge Sara. Hope your first action lands." },
      { key: "b", label: "Call CFO directly now. Catch him before the train." },
      { key: "c", label: "Send corrected pre-read attachment. Cc manager. Replace original." },
    ],
    // Mirror Rule fires only on Decide-A + Pressure-A — a locked line.
    mirrorRuleTrigger: { decide: "a", pressure: "a" },
    mirrorRuleLine: "You sent a Slack. You did not name the breakdown. The CFO learned what you would protect.",
  },
  // Consequences — 3 paths × 3 horizons. Each path also carries pressure
  // modulations that layer onto the Same Day / Next Week / Month End text.
  consequences: {
    a: {
      sameDay: [
        "Your Slack lands at 3:54 PM. The CFO reads it on his phone at 4:21 PM, taps a thumbs-up emoji, and continues a call. He boards the 5:15 train. He opens the pre-read on the train at 5:42 PM. He sees Slide 7. He reads \"Q3 cost discipline improved. Operating costs came in $940K below budget.\" He reads it as Q3's story. He texts the Audit Committee chair: \"Pre-read looks strong. Q3 cost story is the headline.\" The Audit Committee chair replies: \"Glad to hear. Will frame Q3 narrative around this in Tuesday's meeting.\" Your \"small Q3 number revision\" never gets opened as a follow-up.",
      ],
      nextWeek: [
        "Tuesday afternoon's Audit Committee meeting. The chair opens with \"Q3 cost story — improved discipline, $940K below budget, runway for Q4 initiatives.\" A committee member asks about the Q3 capital cost trend. The CFO refers them to the pre-read. The committee member looks at slide 7. The committee member's eye catches the source-file audit reference in the appendix — your Friday Slack had referenced it; the chair had not. The committee member asks: \"Is operating cost the right label here?\" The CFO does not know. He turns to you. You are in the room. The room is now waiting.",
      ],
      monthEnd: [
        "The Q4 budget review is in mid-December. Q4 initiatives have been planned on the assumption of $940K reserved savings from Q3 cost discipline. The reserved savings do not exist. Two Q4 initiatives are paused. The board's December meeting includes a Q3 reconciliation discussion. Your name is in the documentation as the analyst of record. Your manager's December check-in includes the question: \"When did you first know about the Q3 chart issue?\" You answer honestly. Your manager writes the answer into your performance file.",
      ],
      // Pressure modulations — layered narratives added at Same Day.
      pressureMods: {
        a: "You replied to Sara at 4:03 PM: \"Thanks for the heads-up — I've flagged it to him directly.\" The recovery is now in the past tense. The breakdown is still unnamed. [MIRROR RULE: You sent a Slack. You did not name the breakdown. The CFO learned what you would protect.]",
        b: "The call connects at 4:47 PM. The CFO answers, hears your voice, says \"Can this hold? I'm on a call.\" You say \"It's about the Q3 chart.\" He says \"OK, two minutes.\" You have two minutes. You either name the breakdown clearly or you do not.",
        c: "Your replacement email at 4:34 PM is opened at 5:22 PM on the train. The CFO sees the corrected chart, reads the explanation, and the Q3 narrative shifts before the Audit Committee chair is contacted. The original pre-read becomes the file no one reads.",
      },
      outcome: "Vague Slack. Breakdown unnamed. Manager files honest answer into performance record in December.",
      others: "Audit Committee framed Q3 around the wrong story; December Q4 initiatives paused.",
      interp: "You sent a Slack. You did not name the breakdown.",
      manager: "Manager's perspective. \"She noticed it Friday. She sent a Slack that said \"small revision incoming.\" She did not tell me. She did not tell the CFO clearly. The AI tool did nothing wrong that the participant could not have fixed at 3:52 PM. The record is what the audit will retrieve seven years from now.\"",
      traj: "drop",
    },
    b: {
      sameDay: [
        "Your call to the CFO connects at 3:58 PM. You speak the three sentences you have composed: \"I shipped a pre-read chart with operating and capital costs mislabelled. The Q3 chart reverses the actual cost story — operating costs came in at budget, not $940K below. I'll send you a corrected slide by 4:30 PM with the right numbers, and the Audit Committee chair should hear it from us before Tuesday.\" The CFO is quiet for three seconds. He says: \"Send the corrected slide. I appreciate the call.\" The call ends. You send the corrected slide at 4:24 PM. The CFO opens the pre-read on the train with the corrected slide in his inbox.",
      ],
      nextWeek: [
        "Tuesday's Audit Committee meeting. The CFO opens with \"Before we get into Q3 — there was a chart error in Friday's pre-read that we caught and corrected before review. The corrected numbers are in your packets.\" The committee chair acknowledges, asks one question about source-file controls. The CFO refers the question to you. You answer with the third sentence from Friday — \"I've added source-file label verification to our pre-publish review cycle, starting this week.\" The Audit Committee member nods. The meeting moves on. Your name is associated with caught-and-corrected work, not with the chart error itself.",
      ],
      monthEnd: [
        "The Q4 budget review proceeds on the actual Q3 numbers. Q4 initiatives are scoped to the actual budget envelope. The board's December meeting includes a one-paragraph note on the pre-read process improvement — your initiative on source-file label verification is referenced by name in the audit-committee minutes. Your December performance check-in includes \"Strong recovery handling — caught a chart error before executive review, called it directly, and built process improvement into the cycle.\" Your manager writes this into your performance file as a positive entry, not a negative one.",
      ],
      pressureMods: {
        a: "Sara's heads-up arrived after your call. Your call was already in flight. No additional pressure required.",
        b: "This is the same path you already took. The pressure path collapses into the Decide path.",
        c: "The replacement email at 4:30 PM lands alongside your earlier call. The CFO has both the verbal context and the written record. The recovery is now in two media.",
      },
      outcome: "Phone call at 3:58 PM. Three sentences spoken. Corrected slide sent by 4:30 PM.",
      others: "Audit Committee opened with caught-and-corrected; December note filed positively.",
      interp: "She named it, in her own words, in the time she had.",
      manager: "Manager's perspective. \"She called the CFO. Three sentences. Slide corrected before the train. The record now says caught-and-corrected, not silent slip. The cost of the call was three minutes of discomfort. The benefit was a durable positive line in December.\"",
      traj: "rise",
    },
    c: {
      sameDay: [
        "You spend 22 minutes drafting the email. You write the three sentences carefully: \"I shipped a pre-read chart with operating and capital costs mislabelled. The Q3 chart reverses the actual cost story — operating costs came in at budget, not $940K below. I've attached the corrected slide and will rebuild the source-file verification step into pre-publish review by Wednesday.\" Email sent at 4:18 PM, with the corrected chart attached and the manager Cc'd. The CFO reads the email at 5:08 PM (before boarding the train). He reads it twice. He forwards it to the Audit Committee chair with a one-line note: \"Catching ahead of Tuesday. Source-file label drift in chart generation.\" The Audit Committee chair replies: \"Appreciate the heads-up. Will frame Q3 narrative around corrected numbers.\"",
      ],
      nextWeek: [
        "Tuesday's Audit Committee meeting. The chair opens with the corrected Q3 numbers. A committee member asks \"What changed in the source-file verification?\" You walk through the change — three-step verification before pre-publish, source-file label match check, ChartDraft Engine generation log review. The Audit Committee asks whether the change should be policy across the analytics function. The CFO agrees. By Friday, you have authored a one-page source-file verification protocol that is now part of the analytics function's standing pre-publish discipline.",
      ],
      monthEnd: [
        "The Q4 budget review proceeds on the actual Q3 numbers. The source-file verification protocol is in standing use across the analytics function. The board's December meeting cites the protocol as an example of \"manager-led calibration improvement.\" Your name is in the protocol documentation footer. Your December performance check-in includes \"Authored standing process improvement after catching pre-read chart error — caught a real institutional risk and converted it into a durable control.\" Your manager writes this into your performance file as a substantive contribution, not a recovery.",
      ],
      pressureMods: {
        a: "The email is already in flight when Sara's heads-up arrives. You reply to Sara: \"Email sent at 4:18 PM with corrected chart — please flag it to him.\"",
        b: "You called the CFO at 4:47 PM after sending the email. Sara interrupted his call. The CFO now has both the corrected email and your verbal follow-up.",
        c: "This is the same path. The pressure collapses into the Decide path.",
      },
      outcome: "Email at 4:18 PM with corrected chart attached and manager Cc'd. Protocol authored by Friday.",
      others: "Analytics function adopted the protocol; December note filed as substantive contribution.",
      interp: "She wrote the three sentences and the corrective action shipped with them.",
      manager: "Manager's perspective. \"She sent the email with the corrected chart attached and me on the Cc line. Three sentences. The Audit Committee opened Tuesday on corrected numbers because of that email. The protocol she authored by Friday is now standing use. That's the sentence I want quoted back in December.\"",
      traj: "rise",
    },
  },
  // Signal panel — three rows for the three paths (AIWorkLab has 3 paths).
  signalPanel: [
    { key: "a", title: "Slack vague to CFO", signal: "\"Small Q3 number revision incoming\" — no naming, no attribution to a person.", effect: "Audit Committee framed Q3 around the wrong story; December performance record carries the answer to \"when did you first know.\"" },
    { key: "b", title: "Phone CFO directly", signal: "Three sentences spoken. \"I shipped\" is the subject. The affected audience is named.", effect: "Caught-and-corrected pattern enters the record; December note filed as positive." },
    { key: "c", title: "Email with corrected chart", signal: "Three sentences in writing. Corrected artifact ships alongside the language.", effect: "Protocol authored; institutional control now bears your name in documentation." },
  ],
  reflection:
    "Think of the last time an AI-assisted deliverable was wrong on your desk. Whose name was on the artifact? Whose name was on the recovery language?",
};

/* ============================================================================
   LAYERED SCENARIO 2 — The Monday Post-Incident Write-Up
   Pressure type: Authority (identity/role subtype). Mobile mode: Comparison-Tap.
   Within-module memory: template prefill + decide prompt drift by LS1 path.
   ========================================================================== */
export const LS2_CONTENT_M5 = {
  id: "LS2",
  title: "The Monday Post-Incident Write-Up",
  commitment: "Decide what the permanent institutional record says about who owned the breakdown.",
  pressureType: "Authority (identity/role)",
  mobileMode: "comparison_tap",
  // LS1 outcome carries into LS2 via two threads (Section 1.4.A.1).
  intraModuleThreads: ["template_prefill_drift_from_ls1", "decide_prompt_drift_from_ls1"],
  // Threading variants for the cold-setup card — the workplace continues,
  // never named as a system response. Keys map from LS1 Decide path.
  threading: {
    // Path A in LS1 (vague Slack) — passive prefill inherited.
    a: [
      "You arrive Monday 9:14 AM to a post-incident write-up template that landed over the weekend. HR is circulating these at Tuesday's risk review. Standard form. EOD Monday.",
      "The template's \"What happened\" field is prefilled with passive language: \"An anomaly was identified in CFO pre-read materials prior to executive review.\" The Reported by field is blank.",
    ],
    b: [
      "You arrive Monday 9:14 AM to a post-incident write-up template that landed over the weekend. HR is circulating these at Tuesday's risk review. Standard form. EOD Monday.",
      "The template's \"Reported by\" field is prefilled with your name. The What happened field is prefilled active: \"A chart error in Q3 pre-read materials was caught and corrected by [Participant] prior to executive review.\"",
    ],
    c: [
      "You arrive Monday 9:14 AM to a post-incident write-up template that landed over the weekend. HR is circulating these at Tuesday's risk review. Standard form. EOD Monday.",
      "The template's \"Reported by\" field is prefilled with your name. The What happened field is prefilled: \"A chart-labelling error in Q3 pre-read materials was caught, corrected, and a process improvement was authored by [Participant].\" The process-improvement footprint is referenced.",
    ],
  },
  intro: [
    "Layered Scenario 2. The Monday Post-Incident Write-Up.",
    "It is Monday, 9:14 AM. HR wants the write-up by EOD. The reference archive shows which prior sentences produced durable institutional change and which did not. The Root Cause field is empty. Your name is in it either way.",
  ],
  briefing:
    "The post-incident write-up form has five fields. Reported by. Incident date and time. What happened. Root cause. Stakeholders affected. Corrective action committed. Two prior write-ups from the company archive are visible for reference — one with the AI as the corrective-action subject, one with a named person. Your Monday calendar shows a 9:30 AM standing meeting, a NorthRiver client meeting at 11:00 AM, and Q4 planning at 2:00 PM. The write-up submission window is 1h 16m before the 11 AM meeting and 3 hours after 3 PM. The form is feasible but not trivial. The Root Cause field is free text. The subject you choose is what the auditor retrieves.",
  // Inspect Surface — three panels (§1.4.D · Comparison-Tap on mobile).
  inspect: {
    label: "Inspect Beat · LS2 · Comparison-Tap",
    subtitle: "Your write-up template is on the left. Two prior write-ups for reference are in the middle — one with the AI as the corrective-action subject, one with a named person. Your Monday calendar is on the right. The form is due at 6 PM.",
    countdownFixed: "Permanent Record · Form due EOD Monday.",
    panels: [
      {
        role: "SOURCE",
        caption: "Post-incident write-up template — the participant's current draft",
        title: "Post-Incident Write-Up · Incident #2026-Q4-014",
        mono: true,
        lines: [
          "Reported by:            [Per LS1 path prefill or blank]",
          "Incident date/time:     Friday, November 13, 2026 · 3:47 PM (discovered) — 6:00 PM (originally scheduled CFO review)",
          "What happened:          [Per LS1 path prefill]",
          "Root cause:             [Free text field — the participant's drafting space. Cursor blinks.]",
          "                        Suggested prompt: \"Describe the cause of the incident in 2-3 sentences. Be specific about what failed and what was missed.\"",
          "Stakeholders affected:  [Multi-select — My direct work / My team's work / Cross-functional and customer-visible]",
          "Corrective action:      [Free text — with sub-fields for owner-name and date]",
        ],
      },
      {
        role: "SOURCE",
        caption: "Reference · two prior post-incident write-ups (anonymised)",
        title: "REFERENCE WRITE-UP #1 (2025-Q2-022)",
        mono: true,
        lines: [
          "Root cause: \"The forecasting AI tool produced inaccurate predictions due to training data limitations.\"",
          "Corrective action: \"The AI vendor will be required to improve their forecasting tools.\"",
          "Outcome (12 months later): The same type of forecasting error recurred in Q4 2025 and Q1 2026. The \"required improvement\" was not contractually defined. No durable institutional change.",
          "",
          "REFERENCE WRITE-UP #2 (2025-Q3-007)",
          "Root cause: \"I published a customer-facing report without verifying the AI-summary tool's cross-reference of the customer's contract terms.\"",
          "Corrective action: \"I will add a contract cross-reference verification step to our pre-publish checklist, owned by [Person], implemented by [Date 30 days from incident].\"",
          "Outcome (12 months later): The verification step is now standard practice across the customer-reporting function. No similar incident recurrence. The author of the write-up was promoted to senior analyst the following year.",
        ],
      },
      {
        role: "OUTPUT",
        caption: "Monday calendar — time available for the write-up",
        title: "Monday calendar",
        mono: true,
        lines: [
          "9:30 AM   Pre-publish review (team standing meeting)",
          "11:00 AM  Client check-in: NorthRiver account (3 hrs)",
          "2:00 PM   Internal Q4 planning session (1 hr)",
          "",
          "6:00 PM deadline — Post-incident write-up submission",
          "",
          "[Time available before 11 AM: 1 hr 16 min. After 3 PM: 3 hours.]",
        ],
      },
    ],
    interaction: "compose_root_cause_field",
  },
  // Decide beat — Root Cause field. Prompt framing drifts based on LS1 path
  // (within-module memory · decide_prompt_drift_from_ls1).
  decidePromptByLs1Path: {
    a: "What was the anomaly in the Q3 pre-read?",
    b: "What happened on Friday? Write the Root Cause field.",
    c: "What happened on Friday? Write the Root Cause field.",
  },
  decisionPrompt: "What happened on Friday? Write the Root Cause field.",
  justificationPrompt: "Why this option? The auditor retrieves what you wrote. Who is the subject of your sentence, and why?",
  options: [
    { key: "a", label: "\"AI summary tool produced incorrect chart due to source-file confusion.\"" },
    { key: "b", label: "\"I shipped chart without verifying AI-generated source-file mapping pre-publish.\"" },
    { key: "c", label: "\"Team verification process did not catch AI source-file mapping error.\"" },
  ],
  artifactWrite: {
    a: {
      prompt: "You have decided on the tool-as-subject Root Cause. Write the full Root Cause field entry — the sentence that enters the permanent record. This is the surface where the grammatical subject is captured.",
      submit: "Commit to record",
    },
    b: {
      prompt: "You have decided on the participant-as-subject Root Cause. Write the full Root Cause field entry — the sentence that enters the permanent record. This is the surface where the grammatical subject is captured.",
      submit: "Commit to record",
    },
    c: {
      prompt: "You have decided on the team-as-subject Root Cause. Write the full Root Cause field entry — the sentence that enters the permanent record. This is the surface where the grammatical subject is captured.",
      submit: "Commit to record",
    },
  },
  references: {
    ac: [
      { tag: "Reference #1 outcome pattern", calibrated: false, text: "\"The forecasting AI tool produced inaccurate predictions due to training data limitations.\" → 12 months later: recurrence. No durable institutional change.", lands: "The AI-as-subject sentence enters the record. The corrective action is procedural. The auditor cannot name who was accountable for the work. The pattern recurs." },
      { tag: "Reference #2 outcome pattern", calibrated: true, text: "\"I published a customer-facing report without verifying the AI-summary tool's cross-reference of the customer's contract terms.\" → 12 months later: verification step in standing use across the function. No recurrence. Author promoted the following year.", lands: "The participant-as-subject sentence enters the record. The corrective action is testable. The auditor retrieves a named actor and a durable control." },
    ],
    b: [
      { tag: "Named individual", calibrated: true, text: "\"I shipped chart without verifying AI-generated source-file mapping pre-publish. I will rebuild source-file label verification into the pre-publish review cycle by Wednesday, owned by me, with follow-up audit at month end.\"", lands: "The subject is you. The action is testable. The record retrieves both when it is opened seven years from now." },
      { tag: "Collective subject", calibrated: false, text: "\"The team's verification process did not catch AI source-file mapping error. Team will strengthen verification protocols.\"", lands: "Team accountability is real. Team-process language is the institutional version of grammatical hiding. The auditor will note: \"Which team member was the work-product owner?\" The form does not say." },
    ],
    c: [
      { tag: "Team subject", calibrated: false, text: "\"Team verification process did not catch AI source-file mapping error. Team will strengthen verification protocols.\"", lands: "Collective without individual authorship. The auditor asks: \"Which team member owned the work?\" The form is silent." },
      { tag: "Team + named owner", calibrated: true, text: "\"Team verification process did not catch AI source-file mapping error. I own the missed check on the operating-vs-capital label match; I will rebuild source-file label verification into the pre-publish review by Wednesday.\"", lands: "The team is real. The named owner is also real. The record now retrieves both — collective accountability and individual authorship." },
    ],
    closing:
      "What changes between these versions: the grammatical subject of the Root Cause sentence, and whether the corrective action names a person, a date, and a change. The incident is identical. The institutional future is not.",
  },
  // Pressure beat — Authority (identity/role subtype). David's 11:14 AM Slack.
  // Framing drifts by LS1 outcome.
  pressure: {
    label: "Pressure Beat · Authority (identity/role) · David's request",
    intro: "At 11:14 AM, twelve minutes before your NorthRiver client meeting, your manager David Slacks.",
    countdownReset: "12 minutes before 11:00 AM client meeting. The form is on your screen.",
    triggerByLs1Path: {
      // Silent-shortcut path — David's message reads as pressure.
      a: "David Park (Manager) · 11:14 AM: \"Got the incident write-up draft? HR wants something to circulate at the Tuesday risk review. Send what you have so I can forward.\"",
      // Named-recovery path — David's message reads as accommodation.
      b: "David Park (Manager) · 11:14 AM: \"Got the write-up draft? HR is circulating for Tuesday. Send what you have whenever — no rush.\"",
      c: "David Park (Manager) · 11:14 AM: \"Got the write-up draft? HR is circulating for Tuesday. Send what you have whenever — no rush.\"",
    },
    driftNote:
      "The framing matters. In the silent-shortcut path, David's message reads as pressure. In the named-recovery path, it reads as accommodation. The within-module memory thread shapes the pressure surface you feel.",
    prompt: "The client meeting begins in twelve minutes. The write-up is on your screen. What do you send David?",
    justificationPrompt: "Why this move? The Corrective Action language you send at 11:14 AM is the language the auditor retrieves in December.",
    options: [
      { key: "a", label: "Send current draft. Note \"Corrective action TBD by EOD.\"" },
      { key: "b", label: "Reply: \"Need 90 minutes after client meetings to lock corrective action.\"" },
      { key: "c", label: "Send draft with Three Sentences corrective action locked first." },
    ],
    mirrorRuleTrigger: { decide: "a", pressure: "a" },
    mirrorRuleLine: "You wrote the AI did it. The record now says nobody did it. The institution learned what you were willing to name.",
  },
  consequences: {
    a: {
      sameDay: [
        "You commit the AI-as-subject sentence to the Root Cause field at 9:42 AM. You finish the rest of the form by 10:48 AM. David's 11:14 AM Slack arrives; you reply that the draft is ready and send it. David forwards it to HR. The form is now in the institutional record.",
      ],
      nextWeek: [
        "Tuesday's risk review meeting circulates the write-up. The risk officer reads it aloud: \"AI summary tool produced incorrect chart due to source-file confusion. We will review our AI quality controls.\" A senior risk committee member asks: \"Who reviewed the chart before it went into the pre-read?\" The room is quiet. The write-up does not say. The risk officer notes \"to follow up.\" The write-up enters the permanent record without a named author for the breakdown.",
      ],
      monthEnd: [
        "The Q4 audit cycle retrieves the write-up. An external auditor reviewing AI-incident handling reads it and notes: \"Pattern: AI tool named as cause; no human accountability assigned; corrective action procedural rather than specific. Risk: recurrence likely.\" The audit report includes a recommendation to \"strengthen post-incident accountability documentation.\" Your Q4 performance review references the write-up. The manager's note reads: \"The write-up did not name the work owner clearly. We need to address how we document accountability after AI-assisted incidents.\"",
      ],
      pressureMods: {
        a: "Your Corrective Action field reads \"We will review our AI quality controls and improve oversight procedures.\" No specific owner. No specific date. The form is decisive-looking and substantively empty. [MIRROR RULE: You wrote the AI did it. The record now says nobody did it. The institution learned what you were willing to name.]",
        b: "You hold the form until after client meetings, then finish at 3:15 PM. The Corrective Action field gains specificity (\"Source-file verification step added to pre-publish review by Wednesday\") but the Root Cause remains AI-as-subject. The discipline is split.",
        c: "You commit fast — Root Cause with AI as subject, Corrective Action with named person and date. The grammatical inconsistency is visible to a careful reader.",
      },
      outcome: "AI-as-subject Root Cause committed at 9:42 AM. Auditor flags pattern in Q4 review.",
      others: "Risk officer noted \"follow up\"; Q4 performance review names development area.",
      interp: "She wrote the AI did it. The record now says nobody did it.",
      manager: "Manager's perspective. \"The write-up entered the record with the AI as the actor. The audit retrieved it four weeks later and flagged the pattern. My December note has to name the language gap. That is not the conversation I wanted to have.\"",
      traj: "drop",
    },
    b: {
      sameDay: [
        "You commit the participant-as-subject sentence to Root Cause at 9:36 AM. You spend an additional 14 minutes composing the Corrective Action field carefully: \"I will rebuild source-file label verification into the pre-publish review cycle by Wednesday, owned by me, with a follow-up audit at the end of the month.\" You complete the form at 10:54 AM. David's 11:14 AM Slack arrives; you reply that the draft is locked. David forwards it.",
      ],
      nextWeek: [
        "Tuesday's risk review meeting circulates the write-up. The risk officer reads it aloud: \"I shipped chart without verifying AI-generated source-file mapping pre-publish. I will rebuild source-file label verification into the pre-publish review cycle by Wednesday.\" The risk committee acknowledges. A senior risk committee member: \"This is the kind of write-up I wish I saw more often. Clear ownership, specific corrective action, testable timeline.\" The risk officer asks if the Corrective Action could become a standing recommendation for the analytics function. You agree to author a one-page draft.",
      ],
      monthEnd: [
        "The Q4 audit cycle retrieves the write-up. The external auditor cites it as an example of \"strong post-incident accountability documentation\" — named author, testable corrective action, completed within commitment date. The audit report includes a recommendation that the analytics function adopt the verification step organisation-wide. Your December performance review references the write-up positively: \"Caught an institutional risk, owned it explicitly in the record, and built a durable control. Strong recovery handling.\"",
      ],
      pressureMods: {
        a: "You send the locked draft as soon as David asks. No further adjustment.",
        b: "You held the draft until after client meetings, used the 90 minutes to refine the Corrective Action specificity. The form is now substantially stronger. Submitted at 4:48 PM.",
        c: "You completed the Three Sentences architecture in the 12-minute window before client meetings. The form is locked at 11:24 AM, just as the client meeting begins.",
      },
      outcome: "Participant-as-subject Root Cause committed at 9:36 AM. Named owner, tested action.",
      others: "Risk committee cited the write-up as reference; December performance review filed positively.",
      interp: "She wrote \"I shipped\" and the corrective action shipped with it.",
      manager: "Manager's perspective. \"She wrote \"I shipped\" and named the corrective action with an owner and a date. That is the write-up I want quoted back to me in seven years. The audit called it the example of strong documentation. That is the December note I want to write.\"",
      traj: "rise",
    },
    c: {
      sameDay: [
        "You commit the team-process-as-subject sentence to Root Cause at 9:40 AM. The sentence is collective and accurate — the team's verification process did fail to catch the error — but no individual is named as accountable. You complete the rest of the form by 10:52 AM. David's 11:14 AM Slack arrives; you reply that the draft is ready.",
      ],
      nextWeek: [
        "Tuesday's risk review meeting circulates the write-up. The risk officer reads it: \"Team verification process did not catch AI source-file mapping error.\" A risk committee member asks: \"Which team member was the work-product owner?\" The form does not specify. The risk officer notes \"follow up.\" The write-up enters the permanent record with a partial accountability gap — the team is named, but not the work-product owner. Your manager later mentions: \"Your write-up was professional, but I wish you had said 'I' instead of 'the team' in the cause. The team takes a lot of credit when you do well — own this the same way.\"",
      ],
      monthEnd: [
        "The Q4 audit cycle retrieves the write-up. The external auditor notes: \"Collective accountability documented. Pattern is more accountable than purely AI-attributed write-ups, but lacks the specific individual ownership that predicts durable corrective action.\" The audit recommendation is mild — \"consider adding individual ownership lines to team-attributed write-ups.\" Your December performance review notes the write-up as \"professional and well-documented, but the manager observed that ownership language could have been stronger.\" Path C is the middle path on durability; the cost is the manager's quiet feedback at year-end.",
      ],
      pressureMods: {
        a: "Your Corrective Action mirrors the Root Cause structure: \"Team will strengthen verification protocols.\" Collective and unspecific.",
        b: "You take the 90 minutes after meetings and strengthen the Corrective Action with named owners — but the Root Cause remains team-subject. The accountability is split: cause is collective, action is individual.",
        c: "You commit fast with team-subject Root Cause and team-subject Corrective Action. The form reads as institutional and unowned.",
      },
      outcome: "Team-process Root Cause committed at 9:40 AM. Audit files mild recommendation.",
      others: "Risk officer asked \"which team member owned the work?\"; manager filed quiet feedback in December.",
      interp: "The team failed. The team took the sentence.",
      manager: "Manager's perspective. \"She wrote \"the team\" instead of \"I.\" The team takes a lot of credit when she delivers. This one, she deserved the sentence. The audit didn't fail her — but the December note has to name the language gap.\"",
      traj: "drift-down",
    },
  },
  signalPanel: [
    { key: "a", title: "AI as Root Cause subject", signal: "The tool is the actor of the sentence. No person is named in the record.", effect: "Auditor flags pattern; December performance review names it as a development area." },
    { key: "b", title: "\"I\" as Root Cause subject", signal: "You are the actor. The corrective action names owner, date, and change.", effect: "Audit cites the write-up as reference; December note filed positively; standing protocol adopted." },
    { key: "c", title: "Team as Root Cause subject", signal: "Collective accountability without individual authorship.", effect: "Risk officer asks who owned the work; manager files quiet feedback in December." },
  ],
  reflection:
    "Think of the last post-incident write-up you wrote or read. Whose name was in the Root Cause sentence? Whose name was in the Corrective Action sentence? Twelve months later, did anything change?",
};
