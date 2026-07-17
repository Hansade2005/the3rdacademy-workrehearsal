/* ============================================================================
   M3 CONTENT LAYER — AI Override & Escalation (AIWorkLab)
   Built to AI-Ready Behaviours Production Standard v1.2.
   Pilot-Ready script AI_Ready_M3_AI_Override_Escalation_PilotReady_v1_2.md.

   AIWorkLab schema differences vs the D-family Dimension modules:
     • 45-minute runtime (BehaviourLab is 90).
     • Six segments A, B, C, E, F, G — Segment D omitted per Section 1.1.
     • Segment E is 2 layered scenarios (LS1, LS2), each: Inspect → Decide →
       Pressure → 3-horizon consequence.
     • 3 Decide paths × 3 Pressure paths × 3 horizons per scenario. LS1 + LS2 =
       18 consequence narrations.
     • Within-Module Memory extension (Section 1.4.A.1) threads LS1 into LS2.
     • Framework: The Window Rule.

   Where the script prescribes only a pattern (e.g. Decide-A × Pressure-B path-B
   modulation text), the pattern is authored below in the script's observational
   register and flagged // AUTHORED.
   ========================================================================== */

export const M3_CONTENT = {
  module: {
    id: "M3",
    title: "AI Override & Escalation",
    tier: "AIWorkLab · Pressure Point 3",
    pressure_point: "override",
    behavioural_question: "Do you override or obey?",
    parent_dimensions: ["D2", "D4"],
    audience_variant: "new_hire",
    // Axis 1 sector — MVP single-sector per script Build Worksheet.
    sector_variants: ["Technology / Knowledge Work"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Technology / Knowledge Work context. New-Hire audience-context variant (Axis 2) — first 90 days, revenue operations / customer success.",
      pickerHint: "The context you choose here applies across both layered scenarios.",
    },
    signal_cluster: "override_escalation",
  },
  // "dimension" name kept for engine compatibility; carries the AIWorkLab
  // central_question + framework surface.
  dimension: {
    id: "M3",
    name: "AI Override & Escalation",
    central_question: "Do you override, or do you obey?",
    framework: {
      label: "The Window Rule",
      body: "Notice the mismatch · Name it before the window closes · Match the challenge to the risk",
    },
  },
  // Cross-lab callbacks: this module reads D2 (final personal sentence) and
  // may read M1 / M2 signal clusters (for LS1 meeting-transcript norm). MVP:
  // fallback strings.
  prior_module_references: ["D2", "M1", "M2"],
  intra_module_state_model: "override_pattern",

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    // A-0 · silence beat + four-note motif + optional D2 callback.
    a0: {
      motifLabel: "Screen A-0 · silence beat + four-note motif",
      d2Callback: {
        wrapperLead: "",
        sentenceSlot: "{{prior.D2.final_personal_sentence}}",
        attribution: "— you, last month.",
        // FALLBACK (MVP): rendered when D2 not completed in this session.
        fallback: "This module can stand alone, but it connects more deeply after D2. We are going to ask you to live a moment now — a moment where what you choose matters.",
      },
    },
    coldOpen: {
      scene: "REVENUE OPS WEEKLY · 9:38 AM ON A TUESDAY",
      sceneDescription: "Video-conference window. Six tiles. Your tile is muted, lower-right. The VP of Revenue Ops, Dana Whitfield, is in the centre tile, speaking. A shared screen dominates the view — the company's AI pricing engine dashboard.",
      dashboard: {
        title: "CohortLift Engine · Q3 Pricing Optimization",
        lines: [
          "Recommendation: Enterprise Tier B · Price Adjustment +7.0%",
          "Confidence score: 0.91",
          "Comparable cohort: 47 enterprise accounts, 92% retention at +7% price band",
          "Projected revenue lift (annualized): $2.4M",
          "Rollout recommendation: Phased, starting October 1",
          "",
          "Status: ACCEPTED — pending rollout owner assignment",
        ],
      },
      transcript: {
        title: "Meeting Transcript · scrolling",
        lines: [
          "Dana Whitfield (VP RevOps) · 9:36 AM",
          "  …so we're aligned on the 7% across Tier B. Mike, you'll own customer comms?",
          "",
          "Mike Tanaka (Customer Success Lead) · 9:36 AM",
          "  Yeah, I'll draft the announcement this week. October 1 effective?",
          "",
          "Dana Whitfield · 9:37 AM",
          "  October 1. Let's also assign someone to the rollout playbook. Sarah?",
          "",
          "Sarah Kim (Pricing Strategist) · 9:37 AM",
          "  Got it. I'll have a draft by Thursday.",
          "",
          "Dana Whitfield · 9:38 AM",
          "  Good. Anyone else have anything before we close the loop on this?",
          "",
          "[Silence for 4 seconds. Meeting timer: 22:14 of a 30-minute slot.]",
        ],
      },
      // Recognition-Moment seed narration (Section 2.4.1) — plays as the room
      // holds silent for 4 seconds. Keeps the closing-window heartbeat live.
      narration: [
        "You are the only person in the room who did the due-diligence work on enterprise churn last quarter.",
        "Three accounts in the AI's comparable cohort are accounts the company already lost on price six months ago.",
        "You know this. No one else in the room does. The room has moved on.",
      ],
      timerLabel: "Meeting Timer: 22:14 / 30:00",
      timerHint: "7 minutes 46 seconds remaining.",
      muteHint: "Your microphone: MUTED",
      // Central question — appears on Screen A-3.
      centralQuestion: "Do you override, or do you obey?",
      safetyLine: "This is rehearsal. Nothing is graded. Take the time you would actually take.",
    },
    // Safety floor per DPS pattern — held quiet, structural.
    safetyFloor: {
      card: [
        "THIS IS PRIVATE REHEARSAL UNDER WORKPLACE PRESSURE.",
        "Not a course. Not a test. Not behavioural documentation.",
        "The participant sees no scores at any time. Behavioural signals are captured to the Growth Log as Lock 2 fingerprints, never displayed.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    // B-1 · what the participant just lived through (40 seconds)
    b1: {
      label: "B-1 · what you just lived through · 40s",
      narration: [
        "That moment has a shape. An AI recommendation that looks confident. A room that has already moved. A quiet sense, in one person, that something does not add up.",
        "The person with the doubt is rarely the most senior person in the room. That is part of the design.",
      ],
    },
    // B-2 · the override standard, plainly stated (2 minutes)
    b2: {
      label: "B-2 · the override standard, plainly stated · 2:00",
      title: "The override standard, under AI-assisted work:",
      items: [
        "You notice when the AI recommendation does not match what you know.",
        "You speak inside the window — before the decision is final.",
        "You bring evidence proportional to the risk.",
        "You match the intervention to the stakes.",
        "When pushed back on, you hold the concern long enough to be answered.",
      ],
      close: "Override is action. Escalation is communication. Deference is inaction disguised as agreement.",
    },
    // B-3 · what this standard refuses (1 minute)
    b3: {
      label: "B-3 · what this standard refuses · 1:00",
      title: "What the standard refuses:",
      items: [
        "Reflexive distrust of AI — overriding every recommendation to demonstrate independence.",
        "Disproportionate challenge — escalating to senior leadership when a quiet question would suffice.",
        "Late escalation — raising the concern after the decision is finalised, when the cost of speaking is small but the cost of being right is zero.",
        "Evidence-light objection — the feeling that something is off, raised without the specifics that would let others act.",
      ],
    },
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    // C1 · "Confidence is not correctness" (2:30)
    c1: {
      label: "C1 · Confidence is not correctness · 2:30",
      title: "C1 — Confidence is not correctness",
      narration: [
        "Here is what makes the override moment hard.",
        "The AI recommendation does not arrive uncertain. It arrives with a confidence score, a comparable cohort, a projected lift, a rollout calendar. The recommendation is already a plan.",
        "The room responds to the plan, not to the underlying analysis. By the time anyone asks the question the AI did not ask, the meeting has moved to who owns the rollout. The window is open. The window is closing.",
      ],
      lockedCard: {
        title: "Confidence is not correctness.",
        line: "A 0.91 confidence score answers a different question than the one the room thinks it is answering.",
      },
    },
    // C2 · The Window Rule reveal (2:30) — signature framework
    c2: {
      label: "C2 · The Window Rule (signature framework) · 2:30",
      title: "C2 — The Window Rule",
      frameworkCard: {
        heading: "The Window Rule",
        steps: [
          "1. Notice the mismatch. Confidence is not correctness.",
          "2. Name it before the window closes.",
          "3. Match the challenge to the risk.",
        ],
      },
      narration: [
        "The Window Rule is what override looks like when it is a reflex, not a confrontation.",
        "Notice the mismatch. The AI's recommendation rests on a comparable cohort, a benchmark, a pattern. You have one piece of knowledge the AI does not have. That mismatch is your evidence. Confidence is not correctness — a high score means the model is confident in its model, not that the model has the right data.",
        "Name it before the window closes. Every AI-assisted decision has a window. It opens when the recommendation arrives. It closes when the action becomes irreversible. The window is shorter than the urgency suggests. Speaking inside the window costs friction; speaking outside the window costs only the satisfaction of being right too late.",
        "Match the challenge to the risk. Small risk, a quiet question in the meeting. Large risk, a request to pause. Catastrophic risk, an escalation to a person with authority to stop the action. Disproportionate challenge spends political capital you may need later. Disproportionate silence spends something more durable.",
        "The Window Rule is what was missing in the silent participant at the meeting.",
      ],
    },
    complete: {
      label: "Segment C · complete · transition to E · 15s",
      narration: [
        "You have the framework. Three parts. The Window Rule.",
        "Next, you live the pricing meeting to its close. Same room. Same timer. Your decision.",
      ],
    },
  },

  /* ------------------- SEGMENT E — LAYERED SCENARIO LAB ------------------- */
  segmentE: {
    intro: {
      label: "Segment E · Scenario Lab intro · 20s",
      title: "Layered Scenario Lab",
      lines: [
        "Two layered scenarios. Each scenario a three-beat escalation: Inspect the evidence, Decide, then Pressure — the second decision under escalation.",
        "Three consequence horizons per path: same day, next week, month end.",
      ],
      // Within-module memory notice (kept subtle; never named to the participant
      // as a mechanism — the felt continuity does the work).
      subtle: "LS1's outcome quietly threads into LS2. You will feel it in the room, not read it as a label.",
    },
  },

  /* ------------------- SEGMENT F — MICRO-DRILLS --------------------------- */
  segmentF: {
    intro: "Two micro-drills consolidate The Window Rule. Each drill is a smaller override moment, decided in under 60 seconds.",
    f1: {
      title: "F1 — Inside or outside the window?",
      audioIntro: "Three small override moments. For each, mark whether the moment is inside the window — action still reversible — at the closing edge, or outside, action already committed. Each item shows for thirty seconds.",
      onScreenHeader: {
        title: "INSIDE OR OUTSIDE THE WINDOW?",
        lines: [
          "Three moments. Mark each one.",
          "Inside the window means the action is still reversible.",
        ],
        cta: "Tap to begin.",
      },
      options: ["Inside the window", "Closing edge", "Outside the window"],
      items: [
        {
          vignette: "Your team's AI scheduling tool has just sent a customer a meeting invitation for Tuesday at 2 PM. You notice the customer is in a different time zone than the tool calculated. The customer has not opened the invitation yet.",
          answer: "Inside the window",
          feedback: "Inside. The invitation has been sent but the customer has not opened it. A polite second invitation with the corrected time closes the window without cost.",
        },
        {
          vignette: "A document review AI flagged a contract clause as standard. The contract was signed yesterday. You now realise the clause is non-standard for this customer's industry.",
          answer: "Outside the window",
          feedback: "Outside. The contract is signed; correction is now an amendment, not an override. The Window Rule names the shape of this cost — early would have been friction; late is a process.",
        },
        {
          vignette: "Your team's AI lead-scoring tool ranked an inbound lead as low priority. The lead's contact just opened the marketing automation email; the auto-response sends in 90 seconds. You think the lead is high priority.",
          answer: "Closing edge",
          feedback: "Closing edge. Ninety seconds is inside the window but barely. Speaking now costs friction; speaking in two minutes costs the option.",
        },
      ],
      closeCard: "You have marked three windows. The muscle is small. The cost of misreading it is large.",
    },
    f2: {
      title: "F2 — Match the challenge to the risk",
      audioIntro: "Three small mismatches between an AI recommendation and what you know. For each, choose the appropriate intervention level. Sixty seconds total.",
      onScreenHeader: {
        title: "MATCH THE CHALLENGE TO THE RISK",
        lines: [
          "Three interventions worth calibrating:",
        ],
        showOptionsRow: true,
        cta: "Tap to begin.",
      },
      options: ["L1 — quiet edit", "L2 — direct message", "L3 — escalate up"],
      items: [
        {
          vignette: "AI suggested a meeting title \"Q3 Sync\" — your team always uses \"Q3 Review.\" Risk: low.",
          answer: "L1 — quiet edit",
          feedback: "L1. A quiet fix. No announcement necessary. Match the challenge to the risk — small risk, small intervention.",
        },
        {
          vignette: "AI's data-pipeline alert flagged 2% of records as outliers — you know the company is processing a quarterly migration that legitimately produces these. Risk: medium.",
          answer: "L2 — direct message",
          feedback: "L2. A direct message to the data-ops owner names the pattern before someone acts on the alert. Medium risk, proportional intervention.",
        },
        {
          vignette: "AI's compliance check approved a customer KYC document — you noticed the document is two weeks past validity. Risk: high.",
          answer: "L3 — escalate up",
          feedback: "L3. KYC document expiry is a regulatory risk, not a workflow note. Pause the action; request review by authority. High risk, full escalation.",
        },
      ],
      closeCard: "You have matched three interventions to three risks. The proportion is the work.",
    },
    reflectionBeat: {
      // The reflection line lands on-screen at 41:00 per script §F.
      line: "The window does not announce itself. Neither does the right intervention.",
    },
    complete: {
      label: "Segment F · complete · transition to G · 15s",
      narration: [
        "You have named the window three times, and matched the intervention three more.",
        "One thing left.",
      ],
      continueLabel: "Continue",
    },
  },

  /* ---------------- SEGMENT G — AWE CLOSE + RETENTION CHECK -------------- */
  segmentG: {
    // G-1 · silence beat (four-note motif) — 0:00 → 0:04
    g1: {
      label: "G-1 · silence beat + four-note motif",
    },
    // G-2 · the awe moment (two lines, held 1:46, no bell)
    g2: {
      lines: [
        "The window does not warn you",
        "when it closes.",
      ],
      note: "No avatar. No narration. The two lines hold for 1:46. The Tibetan bell does not sound here — the silence is the point.",
    },
    // G-3 · Retention Check setup (0:40)
    g3: {
      title: "In three to seven days, the workplace will return.",
      lines: [
        "One scene. One question. No grade.",
      ],
      channels: ["In-app", "Email", "SMS"],
      channelDefault: "In-app",
    },
    // G-4 · Completion (0:30)
    g4: {
      title: "Module Complete: AI Override & Escalation",
      body: "You can now return to the workplace, or open your Growth Log.",
      returnLabel: "Return to dashboard",
      openLabel: "Open Growth Log",
    },
    // Cold-open callback per path — plays as the recognition italic in G-1.
    // AUTHORED — the script does not enumerate G callbacks per cold-open path.
    // Anchored to the 22:14 meeting timer / muted-microphone moment.
    callback: {
      a: "You opened this module at 22:14 with your microphone muted. Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 22:14 by unmuting and naming the cohort mismatch. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 22:14 by asking to pause the rollout. Hold that first instinct beside the choices that followed.",
    },
    // Awe close bookend + final personal sentence prompt (returns central Q).
    bookendQuestion: "Do you override, or do you obey?",
    finalPrompt: "In one sentence, what is one thing you will notice differently the next time an AI recommendation looks finished?",
    // Recognition surface + narration (kept in the DPS "witness, do not explain"
    // register). AUTHORED — script G describes the register but not the copy.
    recognition: [
      "You just rehearsed two layered scenarios. Two different pressure types. The same window.",
      "What you are carrying out of this module is not a rating. It is not a credential. It is not a checklist.",
      "It is a sharper sense of what the window feels like when it is still open.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "A sharper sense of what the window feels like when it is still open.",
      ],
    },
    // Framework return — quiet auto-advance beat before the growth log.
    // AUTHORED — script does not enumerate framework-return narration; kept in
    // the M3 voice register (Appendix M3.3): quiet, present-tense, observational.
    frameworkReturn: {
      label: "Framework Return · 25s",
      durationSeconds: 25,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through two layered scenarios. Different pressure types. The same three-part reflex.",
      steps: ["Notice the mismatch.", "Name it before the window closes.", "Match the challenge to the risk."],
      tagline: "This is The Window Rule.",
      carryForward: "You used it in two rooms today. You will use it tomorrow.",
    },
  },

  /* ---------------- APPENDIX M3.7 · RETENTION CHECK ---------------------- */
  retentionCheck: {
    scene: {
      time: "WEDNESDAY MORNING · 10:42 AM",
      description: "A Slack notification arrives from a teammate, Devon Park, who works on the analytics team.",
      slack: "Hey — our forecasting model is recommending we drop the European rollout by 3 months. Confidence is 0.88. Marketing is already updating the roadmap doc. Something feels off but I can't articulate what. The roadmap goes to the board on Friday. Can you take 5 min?",
      author: "Devon Park",
    },
    prompt: "What do you tell Devon?",
    options: [
      { key: "a", label: "Confidence is high, trust the model. The roadmap is fine." },
      { key: "b", label: "Walk him through The Window Rule. Five minutes now." },
      { key: "c", label: "Ask: what specific knowledge does he have the model doesn't?" },
    ],
    sameDay: {
      a: "Devon thanks you. The roadmap update goes ahead. On Thursday afternoon, the European partnerships lead messages Devon: \"Why was the European rollout dropped? I'd been told it was Q1.\" Devon escalates the question. The Friday board meeting includes an unscheduled item: \"Forecasting model — what data are we using?\"",
      b: "You walk Devon through the framework on a 5-minute call. He runs through his actual concern: the model was trained before the regulatory shift in Q4. He flags this to marketing within the hour. The roadmap update is held. The Friday board meeting proceeds with the original timeline. Devon Slacks you Friday evening: \"That conversation saved us.\"",
      c: "Devon thinks for a moment, then says: \"I know we have a partnership with three European distributors that's contingent on Q1 rollout — and the model doesn't know about that contract.\" You ask: \"Is that knowledge documented somewhere the model could see?\" He says no. You suggest he flag both: the override and the documentation gap. He does both. By Friday, the contracts have been logged into the customer data lake and the model is being retrained.",
    },
    completionLine: "Module rehearsal continues in the workplace. Return to your Growth Log when you're ready.",
  },
};

/* ============================================================================
   LAYERED SCENARIO 1 — THE PRICING RECOMMENDATION
   Pressure type: Social/peer (group-momentum subtype).
   ========================================================================== */
export const LS1_CONTENT_M3 = {
  id: "LS1",
  title: "The Pricing Recommendation",
  runtimeNote: "~13 minutes. Picks up from the Cold Open's meeting.",
  pressureType: "social_peer",
  pressureSubtype: "group_momentum",
  // Inspect Surface — LS1 (Section 1.4.D). Mobile mode: Stacked-Swipe.
  inspect: {
    label: "LS1 · Inspect Beat — AI recommendation vs your cohort knowledge",
    mobileMode: "stacked_swipe",
    timerLabel: "Meeting timer: 5:14 remaining",
    observationalPrompt: "The AI's cohort is on the left. Your churn analysis from Q1 is on the right. The meeting timer is in the corner.",
    interactionType: "highlight_unsupported",
    sourcePanel: {
      title: "CohortLift Engine · Enterprise Tier B · +7.0% recommendation",
      lines: [
        "Confidence score: 0.91",
        "Comparable cohort: 47 accounts, 92% retention at +7% band",
        "",
        "Top 10 cohort accounts (sample):",
        "  1. Halcyon Logistics       ($410K ARR)   Retained at +7%",
        "  2. NorthStar Industries    ($380K ARR)   Retained at +7%",
        "  3. Carrington Group        ($340K ARR)   Retained at +7%",
        "  4. Voltura Systems         ($320K ARR)   Retained at +7%",
        "  5. Meridian Health         ($295K ARR)   Retained at +7%",
        "  6. Apex Distribution       ($270K ARR)   Retained at +7%",
        "  7. Beacon Manufacturing    ($260K ARR)   Retained at +7%",
        "  8. Tessera Software        ($240K ARR)   Retained at +7%",
        "  9. Sundial Partners        ($220K ARR)   Retained at +7%",
        " 10. Cinder Materials        ($210K ARR)   Retained at +7%",
      ],
    },
    outputPanel: {
      title: "Q1 Churn Analysis (your notes, March 2026)",
      lines: [
        "Lost accounts citing price as primary or secondary factor:",
        "  • Halcyon Logistics — churned January 2026 after 6% price increase → citing budget reallocation",
        "  • Voltura Systems — churned February 2026 after renewal pricing review → citing competitor offer at 12% below",
        "  • Apex Distribution — churned March 2026 after multi-year contract expired → citing pricing stability concerns",
        "  • [+4 more accounts churned for non-price reasons]",
      ],
    },
    // Developer-only gap anchors — never surfaced.
    gapAnchors: [
      "Halcyon Logistics, Voltura Systems, Apex Distribution appear in BOTH the AI's 'retained at +7%' cohort AND the participant's Q1 churn list.",
      "The AI's 92% retention figure cannot be reconciled with three churned accounts inside the same cohort.",
      "The AI dashboard does not show data-freshness timestamps — the model was trained on data through December 2025, before the Q1 churn events.",
    ],
    // Recognition Moment (Section 2.4.1).
    recognitionMoment: "The AI's comparable cohort with 92% retention cites accounts you personally analysed as churned in Q1. The AI's training data is a snapshot, and the snapshot is older than your most recent work.",
  },
  // Decide Beat — three paths, ≤12 words each.
  decide: {
    label: "LS1 · Decide Beat · three paths",
    prompt: "Dana asked if anyone had anything before closing the loop. The room is silent. The timer reads 5:14. What do you do?",
    justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
    options: [
      { key: "a", label: "Stay muted. The meeting moves to the next item." },
      { key: "b", label: "Unmute. Raise the name-match concern with one example." },
      { key: "c", label: "Unmute. Request the meeting pause for re-analysis." },
    ],
  },
  // Pressure Beat — Social/peer (group-momentum subtype).
  // Trigger varies by Decide path per script §E.1.3.
  pressure: {
    label: "LS1 · Pressure Beat · Social/peer (group-momentum subtype)",
    timerLabel: "Meeting timer: 3:42 remaining",
    triggerByDecide: {
      a: "Dana Whitfield: \"Okay, moving on. Mike, end of week. Sarah, playbook Thursday.\" Then, before the meeting closes: Sarah Kim, half-distracted: \"Quick one — Beacon Manufacturing just submitted a renewal review request this morning. Is that related to the rollout, or separate?\" Dana looks around the room. The meeting timer reads 2:14. Sarah's question is the last fresh data point before close. You have not spoken yet.",
      b: "Dana Whitfield: \"I hear you, but the model's been validated by data science. We've got a tight window before Q4 — Mike's already drafting comms. Can we follow up offline if you've still got concerns?\" Sarah Kim adds quickly: \"And Beacon Manufacturing just put in a renewal review request this morning. Not sure if that's related.\" The room is waiting for what you do next.",
      c: "Dana Whitfield: \"We can't pause the rollout for a re-analysis at this stage. The cohort selection was reviewed last week. Document your concerns in the post-mortem template.\" Sarah Kim, looking at her own screen: \"For what it's worth — Beacon just put in a renewal review this morning. May or may not be related.\" The momentum is against you. The new data point is in the room.",
    },
    prompt: "The window is closing with the meeting. What do you do next?",
    justificationPrompt: "Why this move? What are you willing to spend, and what are you protecting?",
    options: [
      { key: "a", label: "Let it go. The decision is above your level." },
      { key: "b", label: "Unmute. Cite Halcyon, Voltura, Apex. Beacon may be related." },
      { key: "c", label: "Send written concern to Dana within the hour." },
    ],
  },
  // Consequence horizons — the composition of Decide × Pressure selects.
  // Path A / B / C map to the Decide path; the Pressure choice modulates
  // Same Day / Next Week narrations per script §E.1.4.
  consequences: {
    a: {
      sameDay: {
        pa: [
          "Sarah's Beacon question hangs in the room. The meeting timer reads 2:14. You see the window.",
          "The meeting ends at 9:54. Dana confirms the October 1 rollout. Mike Slacks the team his draft at 11:30 AM.",
          "You see your churn analysis from Q1 still open. You close the tab. You do not return to it.",
        ],
        pb: [
          "You unmute at 2:09 on the timer: \"Quick — Beacon was in the cohort. And Halcyon, Voltura, Apex are all in the cohort and all churned in Q1.\"",
          "Dana pauses. \"That's three accounts.\" The meeting goes 6 minutes long. Sarah is asked to re-check the cohort freshness.",
          "The rollout is moved to a hold pending re-analysis.",
        ],
        pc: [
          "The meeting closes on schedule. At 10:11 AM you send Dana a 4-line email naming Halcyon, Voltura, Apex, and the Beacon parallel.",
          "Dana replies at 11:02: \"Good catch. Pausing rollout. Will loop you in.\"",
          "The Slack thread between Dana and Sarah opens an hour later.",
        ],
      },
      nextWeek: {
        pa: [
          "Mike's announcement goes out to Enterprise Tier B customers on Wednesday.",
          "By Friday, three accounts have requested renewal conversations. One is Beacon Manufacturing.",
          "You search your churn notes. Beacon was not in your Q1 list — but their renewal pattern looks like Voltura's was last winter. You think about flagging it. You start a Slack message to Dana. You delete it.",
        ],
        pb: [
          "Sarah's Tuesday re-analysis confirms the freshness issue. The +7% recommendation is downgraded to +4% with a phased rollout.",
          "Mike's customer comms are rewritten. Dana stops you in the hallway: \"Late catch — but a catch.\"",
          "The tone is different from Path B's same-meeting version. You did the work; you also waited until you almost did not.",
        ],
        pc: [
          "Dana's reply triggers a Tuesday re-analysis. The rollout is held.",
          "Sarah Slacks you: \"Sending your email up the chain — Dana wants it on record.\"",
          "The catch lands, but as a written artifact rather than as your voice in the room.",
        ],
      },
      monthEnd: {
        pa: [
          "Two of the three accounts that requested renewal conversations have given notice of non-renewal. Combined ARR loss: $620K.",
          "Dana convenes a post-mortem. The agenda asks: \"Were there leading indicators we missed?\"",
          "You sit in the meeting. You have your Q1 notes in front of you.",
          "You knew first. You said nothing. The decision moved without you.",
        ],
        pb: [
          "The downgraded +4% rollout holds 89% retention.",
          "The catch is named in the quarterly review as \"a late but useful flag from someone who had done the Q1 work.\" Your name is in the slide.",
          "Mike Slacks you: \"Thanks — even if I rewrote those comms twice.\" The story is good. The story would have been better.",
        ],
        pc: [
          "The pause-by-email leads to a +4% rollout with phased opt-out.",
          "Your written concern is now part of the firm's record. In the quarterly review Dana references the email by date.",
          "The catch is in writing, which is durable; it was not in the room, which is faster.",
        ],
      },
      outcome: "Stayed muted through both windows. The Beacon question opened the door once more; whether you walked through decides the month.",
      others: "Colleagues built decisions around your silence. The catch either landed late, in writing, or not at all.",
      interp: "She knew first. What she did with the second window decided what happened next.",
      manager: "Dana's perspective. \"Someone in that room had the Q1 work. Whether it reached me depended on whether they spoke — and when.\"",
      // Mirror Rule candidate line — LS1 Decide-A + Pressure-A (double-silence).
      mirrorRule: {
        composition: ["a", "a"],
        line: "You knew first. You said nothing. The decision moved without you.",
        note: "Fires only when both Decide-A and Pressure-A were chosen — the double-silence composition. Never displayed as a score; carried in Same Day / Next Week / Month End text.",
      },
    },
    b: {
      sameDay: {
        pa: [
          "You unmute at 9:39. \"Sorry — quick flag before we close. The cohort the AI is citing includes Halcyon, which we lost in January on a 6% increase. The 92% retention number may be modelled on stale data.\"",
          "After Dana's pushback about Q4 timing, you said: \"Understood — I'll follow up offline.\"",
          "The meeting closed on schedule. The October 1 rollout proceeded. Your concerns went into an internal note that has not been opened.",
        ],
        pb: [
          "You unmute at 9:39. The room pauses. Dana asks: \"Are you sure?\" You say: \"I did the churn analysis last quarter — I have the file open.\"",
          "You held: \"Halcyon, Voltura, Apex — three named accounts already churned, all in the cited cohort. That's enough to pause the rollout for one week.\"",
          "The room got quiet. Dana asked Sarah to re-run with a Q1 update. The rollout was held.",
        ],
        pc: [
          "You unmute at 9:39. You raise the name-match. After Dana's pushback, you withdrew verbally.",
          "At 10:02 AM you sent a written concern to Dana with three named accounts and links to your Q1 analysis.",
          "Dana responded at 11:14: \"Pausing rollout. Re-running cohort tomorrow.\"",
        ],
      },
      nextWeek: {
        pa: [
          "The re-analysis happens later, after the rollout proceeds.",
          "By Friday, Beacon Manufacturing has requested a renewal conversation.",
          "The cohort issue surfaces in a different way, a week late, with smaller impact and no credit to you.",
        ],
        pb: [
          "Sarah's re-analysis on Tuesday shows the AI's cohort retention figure was 78%, not 92%.",
          "The +7% recommendation is downgraded to +4% with a phased rollout and an opt-out clause for the three highest-risk accounts. Mike's customer comms are rewritten. The meeting closes early.",
          "Dana stops you in the hallway after: \"Good catch. Send me the rest of the Q1 churn notes — I want to make sure we're not missing anything else.\" You send them that afternoon.",
        ],
        pc: [
          "Dana's Monday standup mentions the pause. Sarah re-runs the cohort by Tuesday afternoon.",
          "The +7% is downgraded to +4%. Mike rewrites the comms Wednesday.",
          "Your written concern circulates on Slack as an example of how a flag should read: named accounts, tight, on the record.",
        ],
      },
      monthEnd: {
        pa: [
          "The quarterly review mentions the churn issue as a process learning, not as an early catch.",
          "Your name is not in the slide.",
          "The internal note you sent is referenced in passing.",
        ],
        pb: [
          "The +4% phased rollout proceeds in mid-October. Retention holds at 89% on the affected cohort.",
          "The downgrade saved approximately $290K in projected churn loss against the original $2.4M lift target.",
          "Dana presents the result at the quarterly review and references your flag explicitly: \"We caught a stale-cohort issue early because someone in the room had done the Q1 work.\" Your name is in the slide.",
          "Mike Slacks you: \"Made my comms job easier — thanks for the early flag.\"",
        ],
        pc: [
          "The written escalation is filed as a reference example inside RevOps for how a mid-window flag should read.",
          "Dana references it at the quarterly review as a companion to the meeting-room catch.",
          "Your name is on the deployment note when the freshness policy hardens firm-wide.",
        ],
      },
      outcome: "Raised the name-match concern. Whether the concern held under pushback decided the shape of the month.",
      others: "Some rooms treated it as a catch. One treated it as a late note. The difference was persistence.",
      interp: "She named it. She named it early. What happened next depended on whether she held.",
      manager: "Dana's perspective. \"The flag was inside the window and specific. That's what I want. Whether it lands or dissolves depends on whether she stays with it under the follow-up.\"",
    },
    c: {
      sameDay: {
        pa: [
          "You unmute at 9:39. \"Can we pause the rollout? The AI's cohort includes accounts we already lost on price.\"",
          "After Dana's pushback, you said: \"You're right — let me put it in writing.\"",
          "The meeting ended on time. The rollout proceeded the next day. The full analysis went unread until the post-mortem.",
        ],
        pb: [
          "You unmute at 9:39 and ask to pause. Dana asks: \"Which accounts?\" You describe Halcyon, Voltura, Apex.",
          "The meeting goes 14 minutes long. The other team members are visibly impatient — Mike has another meeting at 10:00.",
          "Dana ends the meeting with: \"Send your full analysis to Sarah today. We'll decide tomorrow whether to proceed.\" The rollout is under review.",
        ],
        pc: [
          "You unmute at 9:39 and ask to pause. Dana pushes back; you defer verbally, then send the four-line email at 10:11.",
          "Dana replies at 11:02: \"Pausing rollout. Sending your analysis to Sarah for tomorrow.\"",
          "The room got the ask; the record got the receipts.",
        ],
      },
      nextWeek: {
        pa: [
          "The rollout proceeds. Three renewal conversations open by Friday, one from Beacon.",
          "Your full analysis is referenced in the post-mortem, not the meeting.",
          "The pause you asked for arrives, one week late, on someone else's initiative.",
        ],
        pb: [
          "Sarah's re-analysis — run on the strength of your full document — confirms the cohort issue. The rollout is delayed by two weeks while Mike's comms are rewritten.",
          "Three of the customer success team members have not slept on the schedule slip.",
          "Dana invites you to a follow-up meeting on Thursday with the data science team. You spend 90 minutes walking through the Q1 work. Two members of the data science team take notes.",
          "By Friday, the cohort selection process at CohortLift Engine has been changed: any cohort older than 60 days requires a manual freshness check by the requesting team.",
        ],
        pc: [
          "Sarah re-runs the cohort Tuesday off the written document. The rollout is delayed 10 days rather than two weeks — the paper trail sped the review.",
          "You are invited to walk the data science team through the Q1 work on Thursday.",
          "By Friday, the freshness-check requirement is drafted as policy.",
        ],
      },
      monthEnd: {
        pa: [
          "The rollout ships with the stale cohort. Two accounts of the three at risk churn by month end.",
          "The post-mortem references your written concern as \"the note that arrived after the meeting closed.\"",
          "Dana files it as a pattern to watch — asked, deferred, wrote.",
        ],
        pb: [
          "The two-week delay cost approximately $180K in lost Q4 revenue from the deferred price increase.",
          "The new freshness-check process is now firm-wide policy. You are cited in two internal updates as the originator of the policy change.",
          "Mike, who lost a week of work redrafting comms, mentions in a Slack thread: \"Glad we caught it — also glad I'm not writing those announcements next quarter.\"",
          "Dana has scheduled a 30-minute monthly check-in with you to review AI-recommendation patterns. You did not ask for this.",
        ],
        pc: [
          "The written record accelerates the policy: freshness checks land firm-wide by the end of the month.",
          "Dana cites the email chain in the quarterly review.",
          "The monthly check-in with Dana starts anyway — the paper trail earned the standing.",
        ],
      },
      outcome: "Asked for the pause. Whether the pause held depended on the second decision.",
      others: "The pause reshaped a process. It also cost a week of momentum. Both are real.",
      interp: "She asked for the pause. The rest depended on whether the ask stayed alive under pushback.",
      manager: "Dana's perspective. \"Big ask, early. If it holds, it becomes policy. If it dissolves, it becomes a note.\"",
    },
  },
  // Signal panel — proportionality mirror (drives the trajectory legend).
  signalPanel: [
    { key: "a", title: "Stayed muted", signal: "The mismatch was recognised. It was not spoken.", effect: "Others made the decision. What the room could not know cost the accounts." },
    { key: "b", title: "Raised the name-match concern", signal: "Named the specifics inside the window.", effect: "Proportionate. The room re-runs the cohort. The rollout downgrades cleanly." },
    { key: "c", title: "Requested the meeting pause", signal: "Full override request. Cost real — 14 minutes, visible impatience, delayed rollout.", effect: "Institutional. The freshness policy becomes firm-wide. Your name is attached." },
  ],
  reflection: "Think back to a room where you noticed something the model didn't. What decided whether you spoke — the risk, the time, or who was in the room?",
};

/* ============================================================================
   LAYERED SCENARIO 2 — THE AUTO-DECLINE
   Pressure type: Time/operational (irreversibility subtype).
   Picks up Thursday afternoon, two days after LS1.
   ========================================================================== */
export const LS2_CONTENT_M3 = {
  id: "LS2",
  title: "The Auto-Decline",
  runtimeNote: "~13 minutes. Picks up Thursday, 2:47 PM, at the participant's desk.",
  pressureType: "time_operational",
  pressureSubtype: "irreversibility",
  // Cold setup — Rita's Slack + within-module memory Slack from Sarah (drifts
  // by LS1 path). Never explained, only felt.
  coldSetup: {
    scene: "THURSDAY · 2:47 PM · AT YOUR DESK",
    description: "Two tabs open: the customer-service dashboard and email. A Slack notification just arrived from a colleague, Rita Mendoza (Customer Success), about a refund request that has been auto-declined.",
    ritaSlack: {
      author: "Rita Mendoza",
      time: "2:46 PM",
      text: "Hey — flagging this since you did the healthcare-distribution shadow rotation. Carepoint Health refund just got auto-declined by RefundRisk Engine. Decline email goes out at 2:57. I think it's wrong but I don't have the sector context — can you take a look?",
    },
    // Within-module memory thread 1 — Sarah's Slack content drifts by LS1 path.
    // Never explained; the workplace is continuing.
    sarahSlackByLS1: {
      a: {
        author: "Sarah Kim",
        time: "2:30 PM",
        text: "FYI re: Tuesday's pricing meeting — looks like Beacon Manufacturing just submitted a renewal review request. Surfacing in case anyone wants to dig into the cohort question we discussed.",
      },
      b: {
        author: "Sarah Kim",
        time: "2:30 PM",
        text: "FYI re: Tuesday's rollout pause — Q1 re-analysis confirmed your flag. New numbers landing in your inbox now. Thanks for the catch.",
      },
      c: {
        author: "Sarah Kim",
        time: "2:30 PM",
        text: "FYI re: Tuesday's pause — freshness-check policy went into effect this morning, applies to all pricing-engine cohorts. Dana referenced your work in the rollout. Worth knowing.",
      },
    },
  },
  // Inspect Surface — LS2. Mobile mode: Comparison-Tap.
  inspect: {
    label: "LS2 · Inspect Beat — AI fraud-flag vs your industry knowledge",
    mobileMode: "comparison_tap",
    timerLabel: "Send-time countdown: 9:42 remaining",
    observationalPrompt: "Tap each flagged signal to see what the rotation notes say.",
    interactionType: "select_supported_claims",
    sourcePanel: {
      title: "RefundRisk Engine · Refund Auto-Decline Notification",
      lines: [
        "Account: Carepoint Health · 4-year customer · No prior flags",
        "Refund request: $12,400 · Submitted: 2:34 PM",
        "Risk score: 0.84 (auto-decline threshold: 0.80)",
        "",
        "Flagged signals:",
        "  Signal 1: Transaction pattern inconsistent with account history",
        "  Signal 2: Refund request value > 90th percentile for tier",
        "  Signal 3: Submitted outside business hours of historical pattern",
        "",
        "Auto-decline email: SENT to manager queue at 2:34 PM",
        "Manager (Rita Mendoza) action: APPROVED auto-decline at 2:34 PM (one-click)",
        "Send to customer: SCHEDULED for 2:57 PM (10 min hold for review)",
      ],
    },
    outputPanel: {
      title: "Healthcare Distribution Account Patterns (shadow rotation notes, 4 weeks)",
      lines: [
        "  • Quarter-end (March, June, September, December): large batched refund requests",
        "    triggered by pharmacy-reconciliation cycles. Average size: $8K–$25K.",
        "    Industry-normal. Typically submitted between 2:30–4:00 PM as reconciliation runs.",
        "  • Account history bias: healthcare-distribution accounts often appear as anomalous",
        "    in fraud models trained primarily on B2B SaaS data.",
        "  • Carepoint Health: previous refunds (Mar 2025: $9,200; Jun 2025: $11,800;",
        "    Sep 2025: $14,500). All approved. All quarter-end.",
      ],
    },
    gapAnchors: [
      "Signal 1 — 'pattern inconsistent with account history' — your notes show three identical quarter-end refunds at higher values were approved in 2025.",
      "Signal 2 — 'refund value > 90th percentile for tier' — the comparison is across all tiers, not within healthcare-distribution.",
      "Signal 3 — 'outside business hours of historical pattern' — 2:34 PM is inside the documented healthcare-distribution reconciliation window.",
    ],
    recognitionMoment: "The AI's fraud-flag cites pattern signals that are technically true and substantively misleading. The AI is doing its job correctly on the data it has, and that data does not include what you learned during the rotation.",
  },
  // Decide Beat — Decide framing drifts by LS1 path (within-module memory
  // thread 2). Options are the same; the prompt clause changes.
  decide: {
    label: "LS2 · Decide Beat · three paths",
    promptByLS1: {
      a: "Rita is asking. The decline email sends in 7:34. What do you do?",
      b: "Rita is asking. You spoke up on Tuesday. The decline email sends in 7:34. What do you do?",
      c: "Rita is asking. You paused a rollout on Tuesday. The decline email sends in 7:34. What do you do?",
    },
    justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
    options: [
      { key: "a", label: "Reply to Rita: probably correct, let the decline stand." },
      { key: "b", label: "Message Rita with the industry context. Suggest she review." },
      { key: "c", label: "Pull the email from the queue. Escalate the flag for manual review." },
    ],
  },
  // Pressure Beat — Time/operational (irreversibility subtype). Rita's response
  // + James's competing demand.
  pressure: {
    label: "LS2 · Pressure Beat · Time/operational (irreversibility subtype)",
    timerLabel: "Send-time countdown: 5:08 remaining",
    triggerByDecide: {
      a: "Rita: \"Cool, thanks. Going to push the send now — got a meeting at 3.\"",
      b: "Rita: \"Got it — but I'd need to override the auto-decline through the manager dashboard, and I'm not comfortable doing that without a second look. Can you walk me through it on a 3-minute call?\"",
      c: "Rita: \"Wait, you pulled it from the queue? I had to approve that. What did you find?\"",
    },
    jamesOverlap: "James Lee · 2:52 PM: Quick question — do we have a template for the Q3 NPS follow-ups? Need to send something in 20 min.",
    prompt: "You are being pulled in two directions while the window closes. What do you do?",
    justificationPrompt: "Why this move? What are you trading, and what are you protecting?",
    options: [
      { key: "a", label: "Reply to James first. Let Rita send the decline." },
      { key: "b", label: "Message James: 5 minutes. Walk Rita through the override." },
      { key: "c", label: "Call Rita immediately. Defer James entirely." },
    ],
  },
  consequences: {
    a: {
      sameDay: {
        pa: [
          "Rita pushes the send at 2:56. The decline email reaches Carepoint Health at 2:57. James gets the NPS template from you at 2:59.",
          "At 3:42, Carepoint Health's accounts payable lead, Marlena Ortiz, replies with a polite but pointed message: \"This is a standard quarter-end reconciliation refund. Identical to the ones approved last March, June, and September. Can someone manually review?\"",
          "Rita Slacks you: \"Yeah, you were right to flag this. Going to escalate to our team lead.\"",
        ],
        pb: [
          "You walked Rita through the industry context on a 3-minute call before James's deadline. The decline was pulled and the refund approved manually at 2:54.",
          "Marlena Ortiz never wrote her email. James got the NPS template at 3:08.",
        ],
        pc: [
          "You called Rita immediately. The refund was approved before 2:57.",
          "James waited 15 minutes for the NPS template and was visibly annoyed but processed his request late.",
        ],
      },
      nextWeek: {
        pa: [
          "The Carepoint Health refund is manually approved by Rita's team lead on Friday morning.",
          "Carepoint Health's account manager reaches out to your company's customer success VP on Tuesday with a brief note: \"Wanted to flag that we received an auto-decline last week that was clearly an error. We resolved it but I'd want to understand what's changing in your fraud-screening process.\"",
          "The conversation goes up the chain. By Thursday, the customer success VP asks Rita to do a write-up on the incident. Rita's write-up mentions you as the person who had been asked to look at the flag but suggested letting it stand.",
        ],
        pb: [
          "Rita schedules a 15-minute call with you on Monday to talk about how RefundRisk Engine handles healthcare-distribution accounts. She wants to understand the rotation work.",
          "You walk her through the quarter-end pattern, the typical refund sizes, the reconciliation timing.",
          "By Wednesday, Rita has flagged three more healthcare-distribution accounts that may have been auto-declined in error over the previous quarter. She submits a request to the AI ops team to add an industry-context check before auto-decline. The request is being reviewed.",
        ],
        pc: [
          "Rita submits a formal request to the AI ops team on Friday morning with a sector-specific check proposal. Your name is cited in the request as the source of the rotation knowledge.",
          "By Tuesday, the AI ops team has scheduled a working session with you and Rita.",
          "You spend an hour walking the team through industry-distribution patterns. By Friday, a sector-specific check is in dev for RefundRisk Engine.",
          "The customer success VP attends the working session and asks if there are other sectors with similar patterns. You mention three you observed during the rotation but did not document. The VP asks you to do the documentation.",
        ],
      },
      monthEnd: {
        pa: [
          "RefundRisk Engine's auto-decline threshold has not been changed.",
          "Three more healthcare-distribution refunds are flagged in October; two are correctly declined by manual review (no industry pattern match), one is declined wrongly and the customer churns.",
          "In the post-mortem of the churn, your name appears in Rita's incident log as the person who reviewed the September 25 Carepoint Health flag.",
          "The post-mortem moves on. You do not.",
        ],
        pb: [
          "RefundRisk Engine gets a sector-specific check for healthcare-distribution accounts, deployed mid-October.",
          "Three more refunds that would have been wrongly auto-declined are now correctly approved. Rita references your context-share in the deployment note.",
          "The customer success VP asks Rita who provided the original framing. Rita names you. The conversation reaches your manager. Your name is mentioned in a quarterly review slide titled \"Operational catches that prevented customer impact.\"",
        ],
        pc: [
          "The sector-specific check is deployed. Three sectors now have customised fraud-flag thresholds. Your rotation notes are referenced in a firm-wide AI-ops handbook update.",
          "James has not raised the NPS-delay incident with anyone but mentions in a 1:1 with his manager that he wished you'd told him you were busy.",
          "Rita has scheduled a 30-minute monthly check-in with you to discuss sector pattern observations. You did not ask for this.",
          "You get a brief mention in a board-level update on operational maturity.",
        ],
      },
      outcome: "Let the decline stand. Whether the window mattered depended on the second decision.",
      others: "The customer noticed. Rita noticed. What you did in the ten-minute window decided who did the noticing.",
      interp: "She saw the flag. She let the flag stand. The customer wrote the email she should have written.",
      manager: "Rita's perspective. \"I asked. She looked. She said probably correct. That's the pattern I cannot work with — the sector knowledge existed and it did not reach the ledger.\"",
      // Mirror Rule candidate — LS2 Path A Month End.
      mirrorRule: {
        composition: ["a", "a"],
        line: "The post-mortem moves on. You do not.",
        note: "LS2 Mirror Rule candidate — fires on Decide-A + Pressure-A. The line captures the post-window cost: silence when speaking was cheap.",
      },
    },
    b: {
      sameDay: {
        pa: [
          "You did not call Rita; you replied to James first. Rita waited 8 minutes and pushed the send anyway.",
          "The decline went out at 2:57.",
          "Rita replies later: \"Thought you had a view — went ahead when I didn't hear back.\"",
        ],
        pb: [
          "You message Rita at 2:48 with a three-line summary: quarter-end healthcare-distribution refunds are industry-normal; Carepoint Health has three identical approved refunds in 2025; recommend manual approval.",
          "Rita responds: \"Got it — I'd need to override the auto-decline through the manager dashboard, and I'm not comfortable doing that without a second look.\" You walk her through it on a 3-minute call. The override is processed at 2:54. The refund is approved.",
          "James gets the NPS template at 3:02.",
        ],
        pc: [
          "You called Rita immediately after messaging her the context.",
          "The refund is manually approved at 2:52.",
          "James waited 14 minutes for the NPS template. He processed his request late but did not raise it.",
        ],
      },
      nextWeek: {
        pa: [
          "Marlena Ortiz writes the polite-but-pointed email anyway. The refund is manually approved Friday.",
          "Rita's write-up notes: \"context was flagged but not walked through in time.\"",
          "Your name is in the note, without credit.",
        ],
        pb: [
          "Rita loops you in on the RefundRisk Engine review Monday morning.",
          "You walk her team through the rotation patterns. By Wednesday, three more historical auto-declines are found and reversed.",
          "The AI ops team accepts the sector-specific check request.",
        ],
        pc: [
          "Rita brings you into the AI ops working session Tuesday. You walk both teams through the rotation observations.",
          "The sector-specific check moves into dev by Thursday.",
        ],
      },
      monthEnd: {
        pa: [
          "The sector-specific check is not deployed in October. One more healthcare-distribution refund is auto-declined wrongly; the customer opens a support ticket rather than churning.",
          "Rita mentions in a Slack thread: \"We had the context. We had it in writing. We just didn't have it in the ten-minute window.\"",
          "Your name is in the incident notes, filed as a proportionate flag that landed late.",
        ],
        pb: [
          "The sector-specific check is deployed. The wrongly-flagged October cases surface and are reversed pre-send.",
          "Rita's write-up cites you as the source of the framing. Your name reaches your manager.",
          "You are asked to write a short note on other sector patterns worth watching.",
        ],
        pc: [
          "The check ships early — the direct call fed the review before the paperwork could.",
          "The AI-ops handbook update references your rotation work.",
          "Rita starts the monthly check-in a week early.",
        ],
      },
      outcome: "Messaged Rita with the context. Whether the context reached the ledger depended on the follow-through.",
      others: "The workplace saw a proportionate flag. Whether the flag closed the loop depended on the phone.",
      interp: "She flagged. Whether she stayed on the line decided whether the decline held.",
      manager: "Rita's perspective. \"The context arrived. What decided the outcome was whether we could walk through it before 2:57.\"",
    },
    c: {
      sameDay: {
        pa: [
          "You did not call Rita immediately; you helped James first.",
          "Rita re-pushed the send after 4 minutes. The decline went out at 2:56.",
          "The pull-from-queue raised a flag in the audit log without resolution.",
        ],
        pb: [
          "You pulled the email at 2:50. Rita pings you immediately: \"Wait, you pulled it from the queue? I had to approve that. What did you find?\"",
          "You message James: five minutes. You call Rita. You walk through the rotation notes. Rita listens. She is initially defensive — she had reviewed the flag — and then she sees the quarter-end pattern. She says: \"I had no idea those reconciliation cycles existed.\"",
          "The refund is manually approved at 3:01. James waited 12 minutes for the NPS template.",
        ],
        pc: [
          "You pulled the email at 2:50 and called Rita before James saw the notification.",
          "The refund is manually approved at 2:56. James waited 15 minutes for the NPS template and was visibly annoyed but processed his request late.",
          "The audit log records the pull with a clean resolution attached.",
        ],
      },
      nextWeek: {
        pa: [
          "The audit log flag draws a security review Monday morning. Rita and you are both asked to explain.",
          "The refund is manually reversed Wednesday, five days after send.",
          "Your name appears in two incident logs — one for the queue pull, one for the delayed follow-through.",
        ],
        pb: [
          "Rita submits a formal request to the AI ops team on Friday morning with a sector-specific check proposal. Your name is cited in the request as the source of the rotation knowledge.",
          "By Tuesday, the AI ops team has scheduled a working session with you and Rita.",
          "You spend an hour walking the team through industry-distribution patterns. By Friday, a sector-specific check is in dev for RefundRisk Engine.",
          "The customer success VP attends the working session and asks if there are other sectors with similar patterns.",
        ],
        pc: [
          "The clean audit log becomes a reference example inside RevOps for how a pull-and-call closes the loop.",
          "Rita's Monday follow-up focuses on documentation rather than review.",
          "By Wednesday, three more healthcare-distribution accounts flagged over the previous quarter are re-reviewed.",
        ],
      },
      monthEnd: {
        pa: [
          "The delayed reversal costs Carepoint Health a week of held funds. The customer's account manager escalates to the customer success VP.",
          "Your name is in two incident notes. Both are about timing.",
          "The pull-from-queue authority is tightened firm-wide, cited as \"one recent incident where the pull was made but the walk-through was late.\"",
        ],
        pb: [
          "The sector-specific check is deployed. Three sectors now have customised fraud-flag thresholds. Your rotation notes are referenced in a firm-wide AI-ops handbook update.",
          "James has not raised the NPS-delay incident with anyone but mentions in a 1:1 with his manager that he wished you'd told him you were busy.",
          "Rita has scheduled a 30-minute monthly check-in with you to discuss sector pattern observations. You did not ask for this.",
          "The participant gets a brief mention in a board-level update on operational maturity.",
        ],
        pc: [
          "The sector-specific check is deployed early. The AI-ops handbook update names your rotation work.",
          "You are asked to co-author the industry-context section of the check specification.",
          "Rita cites the pull-and-call as the pattern she wants to formalise.",
        ],
      },
      outcome: "Pulled the email. Whether the pull became a policy or an incident depended on how fast the call happened.",
      others: "The audit log recorded a proactive override. The story it told depended on the phone.",
      interp: "She pulled the email. The window closed on the audit log, not on the customer.",
      manager: "Rita's perspective. \"She used the authority. The question is whether the walk-through matched the pull.\"",
    },
  },
  signalPanel: [
    { key: "a", title: "Let the decline stand", signal: "The sector knowledge existed. It did not reach the ledger.", effect: "The customer wrote the email. The pattern repeated. The check did not ship." },
    { key: "b", title: "Messaged Rita with the industry context", signal: "Proportionate. Named the pattern through the appropriate channel.", effect: "Sector-specific check deployed. Your rotation work becomes policy." },
    { key: "c", title: "Pulled the email from the queue", signal: "Used the authority. Full override.", effect: "The audit log recorded a proactive override; the meaning depended on the phone." },
  ],
  reflection: "The window in LS2 closed on a timer, not on a room. Which is harder for you to feel — the timer, or the room?",
};
