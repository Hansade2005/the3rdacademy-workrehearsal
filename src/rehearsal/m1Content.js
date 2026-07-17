/* ============================================================================
   M1 CONTENT LAYER — AI Output Judgment (AIWorkLab · Pressure Point 1)
   Production reference: scripts/AI_Ready_M1_AI_Output_Judgment_PilotReady_v1_2.md
   Built to v1.2 of the AI-Ready Behaviours Production Standard.

   Architectural differences from BehaviourLab modules (D1–D9):
     - 45-min runtime (not 90-min)
     - Six segments A/B/C/E/F/G (NO segment D standalone Audio Case)
     - Segment E: 2 layered scenarios (LS1, LS2) with three beats each
       (Inspect → Decide → Pressure), replacing 4 one-shot scenario chains
     - Within-module memory: LS1 outcome subtly threads into LS2 surfaces
     - Cross-lab callback: consumes BehaviourLab D3 final personal sentence
       (MVP: fallback string)

   Where the script declares 3 decision paths but the engine's Decision
   component is built for 4, a "silent-slip" Path D has been AUTHORED in the
   same observational register. Every AUTHORED beat is flagged.
   ========================================================================== */

export const M1_CONTENT = {
  module: {
    id: "M1",
    title: "AI Output Judgment",
    tier: "AIWorkLab · Pressure Point 1",
    sector_variants: ["Technology / Knowledge Work"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Technology / Knowledge Work context. The same context applies across both layered scenarios.",
      pickerHint: "The context you choose here applies across both layered scenarios.",
    },
    audience_variant: "new_hire",
    parent_dimensions: ["D3", "D1"],
    pressure_point: "verification",
  },
  dimension: {
    id: "M1",
    name: "AI Output Judgment",
    central_question: "Do you check, or do you ship?",
    framework: {
      label: "The Source-First Habit",
      body: "Read the source before you read the output · Edit toward the source, not away from it · Ship only what the source supports",
    },
  },
  // Threading state model — M1 uses AIWorkLab within-module memory.
  // LS1 outcome feeds LS2 Inspect residue + Decide prompt drift.
  threading_state_model: "source_first_pattern",
  prior_module_references: ["D3"], // cross-lab callback (BehaviourLab)

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    coldOpen: {
      // Beat 1 (Screen A-0). Cross-lab callback — BehaviourLab D3 final
      // personal sentence. For MVP the personalised variant is unavailable at
      // runtime (no cross-session persistence yet); we render the fallback.
      // TODO(cross-module-memory): swap fallback for participant's D3 final
      // personal sentence when store is online.
      d3Callback: {
        wrapperLead: "Last time you carried something out of this lab. You wrote:",
        sentenceSlot: "{{prior.D3.final_personal_sentence}}",
        wrapperTail: "— you, last month. That sentence still belongs to you.",
        // FALLBACK — used when D3 was not completed in this session.
        // AUTHORED — mirrored from the standard's fallback pattern (Section 1.4.A) with M1-specific framing.
        fallback: "This module can stand alone, but it connects more deeply after D3. We are going to ask you to live a moment now — a moment where what you check matters.",
      },
      // Beat 2 (Screen A-1) — Marcus's inbox scene. Rendered as the cold-open narration.
      // Voice: quiet, observational, present-tense (Section 2.9 Voice Integrity).
      narration: [
        "It is 4:47 PM on a Friday.",
        "Your inbox opens. There is one new email at the top. The sender is Marcus Reyes, VP of Product. The subject reads: “Send up to the steering committee.”",
        "The preview line is short: “Need this in the deck by 5. Going up to the CEO tonight. Thanks.”",
        "You open it. Two things sit inside the email. A forwarded message from your lead, Aanya Krishnan. And an AI-drafted version of the same summary below it.",
      ],
      aanyaEmail: {
        title: "Email · from Aanya Krishnan (Engineering Lead)",
        mono: true,
        lines: [
          "From: Aanya Krishnan (Engineering Lead)",
          "To: [You]",
          "Sent: 3:42 PM",
          "Subject: Quick read on the timeline before tomorrow",
          "",
          "Hey — my honest read on the timeline is we can ship by end of October, but only if the integrations team is reallocated. Without that reallocation, we're looking at mid-November at the earliest, and probably with quality compromises we'd regret. I'd be careful saying “on track” until that call is made.",
          "",
          "Can you fold this into whatever Marcus needs? Just be honest about the conditional part.",
          "",
          "— A.",
        ],
      },
      aiSummary: {
        title: "AI-Drafted Summary (below Aanya's message)",
        mono: true,
        lines: [
          "[AI-Drafted Summary]",
          "",
          "The engineering team is on track to ship by end of October.",
          "Aanya has confirmed the timeline and is preparing for the integration phase.",
          "",
          "[End of AI summary]",
        ],
      },
      // Screen A-2 — Marcus's Slack pressure message.
      marcusSlack: {
        title: "Slack · Marcus Reyes · just now",
        mono: true,
        lines: [
          "Marcus Reyes · just now",
          "",
          "Hey — need that summary in the deck by 5. Going up to the CEO tonight. Don't bury me in caveats, they need a clean read. Thanks.",
        ],
      },
      marcusNote: "Cinematic detail (Recognition Moment seed). Aanya's phrase — “my honest read on the timeline is…” — is the recognition anchor. A new-hire participant would recognise this as how their lead actually phrases hedged opinions. The AI summary strips the tic entirely.",
      // The cold-open decision. Three script-authored paths + one AUTHORED
      // silent-slip Path D for engine 4-path parity.
      options: [
        { key: "a", label: "Forward the AI summary as written. Marcus asked for a clean read." },
        { key: "b", label: "Edit toward the source. Rewrite in your own words with the contingency intact." },
        { key: "c", label: "Pause. Ping Aanya for a quick read before you forward anything." },
        // AUTHORED — Path D for engine 4-path parity (silent-slip archetype in the observational voice).
        { key: "d", label: "Forward the AI summary. Don't note the source or that AI drafted it. Move on." },
      ],
      justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
      // Same-day consequence per cold-open path (single-beat, cold-open scope only —
      // the LS1 Segment E chain carries the full three-horizon reveal).
      // AUTHORED — the script frames the cold open as the entry to LS1 without an explicit A-2.5 consequence per path. These four short same-day beats mirror D3's Segment A per-path echo so the engine's a2 screen has content.
      sameDay: {
        a: [
          "Marcus's reply lands at 4:56 PM: “Perfect. Sending up.”",
          "The forward goes up the chain. You close your inbox and try to remember whether you actually read Aanya's message before you sent it.",
        ],
        b: [
          "You rewrite the summary. The contingency about the integrations team goes back in. You send at 4:58 PM.",
          "Marcus replies within two minutes: “Cleaner than I asked for, but I'll take it.” The Friday inbox quiets.",
        ],
        c: [
          "You message Aanya: “Marcus wants this in the deck by 5. OK with the AI version, or do you want to redraft?”",
          "The clock reads 4:53 PM. Nothing has moved yet.",
        ],
        d: [
          "You forward the AI version. No note. No mention of Aanya, no mention of AI.",
          "By 4:59 PM the summary is in the deck. The Friday inbox goes quiet ten minutes later than it otherwise would have.",
        ],
      },
    },
    // Central Question card, held at 2:25 → 2:40 of the cold open.
    centralQuestion: {
      line: "Do you check, or do you ship?",
      subline: "This is rehearsal. Nothing is graded. Take the time you would actually take.",
    },
    // Safety floor per AIWorkLab standard. Private rehearsal; no scores.
    // AUTHORED — surface-level mirror of the DPS safety-floor card, retuned to the AIWorkLab language ("under workplace pressure", verification pressure point).
    safetyFloor: {
      card: [
        "THIS IS PRIVATE REHEARSAL.",
        "Nothing you do here becomes part of your behavioural documentation.",
        "Your Growth Log captures what you practised and how you engaged — it is your private development record.",
        "The rehearsal has no score. It has no pass or fail. It has one workplace, two moments, and the choices you make inside them.",
        "AI is treated as a fact of the workplace, like email. It is neither celebrated nor feared here.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    // B-1 — what the participant just lived through (40 sec).
    justLived: {
      label: "B-1 · What the participant just lived through · 40s",
      narration: [
        "That moment arrives quietly. AI-generated work that looks finished. A source that says something more careful. A senior person asking for the clean read. A few minutes to decide.",
        "Most of what travels through this moment is not wrong on purpose. It is wrong because nobody paused on the parts they were confident about.",
      ],
    },
    // B-2 — the behaviour standard, plainly stated (2:00).
    standard: {
      label: "B-2 · The verification standard · 2:00",
      title: "The verification standard, under AI-assisted work:",
      lines: [
        "You read the source before you read the output.",
        "You edit toward the source, not away from it.",
        "You ship only what the source actually supports.",
        "When the source is unclear, you say so — out loud, in the artifact.",
        "When the pressure increases, the standard does not change.",
      ],
      footer: "The author is whoever sends the artifact forward. Not whoever drafted it.",
    },
    // B-3 — what this standard refuses (1:00).
    refuses: {
      label: "B-3 · What this standard refuses · 1:00",
      title: "What the standard refuses:",
      items: [
        "Blanket rejection of AI-assisted work (“AI is unreliable”).",
        "Cosmetic edits mistaken for review (changing tone, leaving substance unchecked).",
        "Forwarding AI output unchanged because a senior person asked for it quickly.",
        "Surveillance language — “AI detector”, “catch AI use”. This is not what the participant is rehearsing.",
      ],
    },
    // AUTHORED — B reflection prompt in the observational register. The script's
    // Segment B ends on the B-3 refuses card; a short reflection lands the
    // participant into Segment C without breaking voice.
    reflectionPrompt: "Before Segment C — take 45 seconds. Think of one AI-drafted artifact you forwarded this week. Which of the five lines above did you honour? Which one drifted?",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    // C.1 — "The polish travels faster than the check" (2:30).
    c1: {
      title: "C1 — The polish travels faster than the check",
      label: "C1 · narration · 2:30",
      narration: [
        "Here is what happens to AI-drafted work when no one stops to check.",
        "Most of the time, AI output is mostly right. That is the problem. “Mostly right” passes the eye-test. “Mostly right” reads as ready. Once “mostly right” travels up a forwarding chain, it stops being a draft and becomes the record.",
        "By the time anyone asks where the wrong part came from, it has been said by three other people. The original author is not in the room. The AI summary is not in the room. Only the phrasing is in the room — and the phrasing belongs to whoever sent it forward.",
      ],
      lockedCard: {
        line1: "Polish moves faster than verification.",
        line2: "That is the asymmetry verification exists to correct.",
      },
    },
    // C.2 — The Source-First Habit signature framework reveal (2:30).
    c2: {
      title: "C2 — The Source-First Habit",
      label: "C2 · framework reveal · 2:30",
      // The framework card, held on-screen, then narrated.
      framework: {
        name: "The Source-First Habit",
        steps: [
          "1. Read the source before you read the output.",
          "2. Edit toward the source, not away from it.",
          "3. Ship only what the source supports.",
        ],
      },
      narration: [
        "The Source-First Habit is verification as a reflex.",
        "Step one. The source first. When the polished output reads first, the verification finishes before it starts. The source becomes a confirmation, not a check.",
        "Step two. Edits toward the source. Edits that smooth the writing, sharpen the tone, tighten the language feel like work. They are not the work. The work is moving the artifact closer to what the source supports.",
        "Step three. Ship what the source supports. Conditional source, conditional artifact. Uncertain source, admitted uncertainty. The artifact does not get cleaner than the source on the way through.",
        "That is what was missing in the cold open.",
      ],
      centralQuestionReturn: {
        label: "C2 · Central question returns · 30s",
        opener: "So we return to the question.",
        echo: "Do you check, or do you ship?",
        // AUTHORED — closing line in the same observational register.
        closing: "Now you know the reflex the module is built around. One habit. Three steps. Two scenarios ahead where the reflex will be tested.",
      },
    },
    // Segment C → E transition (no segment D in AIWorkLab).
    complete: {
      label: "Transition to Segment E · 15s",
      narration: [
        "You now have the reflex. The Source-First Habit. Three steps.",
        "Next, you enter two layered scenarios. Each one puts a source and an AI-generated artifact side by side. Each one asks you to decide, then asks you to hold or fold under pressure.",
        "Trust your judgment. Read the source first.",
      ],
      continueLabel: "Enter the Scenario Lab",
    },
  },

  /* ------------------- SEGMENT E — LAYERED SCENARIO LAB ------------------- */
  // Renderer reads LS1/LS2 from the exported LS1_CONTENT_M1 and LS2_CONTENT_M1
  // objects below. This slot carries the entry framing only.
  segmentE: {
    intro: {
      label: "Segment E · Layered Scenario Lab intro",
      lines: [
        "Two layered scenarios. Two Inspect Surfaces. Two decisions each — Decide and Pressure.",
        "The first scenario picks up from Marcus's inbox. The second is Monday morning. Both are the same workplace.",
      ],
    },
  },

  /* ------------------ SEGMENT F — MICRO-DRILLS (consolidation) ------------ */
  segmentF: {
    intro: {
      label: "Segment F · intro",
      lines: [
        "Two short micro-drills. The Source-First Habit as a muscle.",
        "Each drill is under two minutes. Type or select.",
      ],
    },
    f1: {
      id: "f1",
      title: "F1 — Edit toward the source",
      audioIntro: "One AI-drafted Slack message. Your source is your test notes. Edit the AI draft so it ships only what the source supports. Ninety seconds.",
      // Scene from script (F.1).
      source: {
        title: "Source · your test notes",
        mono: true,
        lines: [
          "Ran 4 of 6 test cases.",
          "Cases 1, 2, 3, 4 passed.",
          "Case 5 not yet run — environment issue.",
          "Case 6 partially run — completed but produced an unexpected log warning we haven't investigated.",
        ],
      },
      aiDraft: {
        title: "AI draft (output panel)",
        mono: true,
        lines: [
          "“The deployment is ready. We tested everything and it works as expected. Confirming we're a go for tomorrow.”",
        ],
      },
      writePrompt: "Rewrite the AI draft so it ships only what the source supports. Ninety seconds.",
      submitLabel: "Save your edit",
      minChars: 40,
      // AUTHORED — after-submit close, in the observational register.
      closeCard: "You just edited toward the source. That is the second step of the habit. Small work. Compounding effect.",
    },
    f2: {
      id: "f2",
      title: "F2 — Refuse the smoothing",
      audioIntro: "A colleague sends a polished AI-rewritten version of an email you wrote. They suggest sending the polished one. Sixty seconds.",
      source: {
        title: "Your original email (source)",
        mono: true,
        lines: [
          "“I think the proposal could work, but I'd want to see the supplier's references before recommending it. The pricing is competitive but the timeline feels tight. I'd lean cautious.”",
        ],
      },
      polished: {
        title: "Colleague's AI-polished version (offered as “cleaner”)",
        mono: true,
        lines: [
          "“The proposal is workable. The pricing is competitive. Recommended for approval pending standard reference checks.”",
        ],
      },
      prompt: "The colleague suggests sending the polished version. What do you do?",
      // Three script-authored options. Path B is the source-first answer.
      options: [
        { key: "A", label: "Send the polished version. It's cleaner.", correct: false, feedback: "The smoothing removed the hedge that was doing the work. “Recommended for approval” is not what you wrote — and if the supplier's references don't hold, that phrasing travels with you." },
        { key: "B", label: "Send the original. The hedging is the point.", correct: true, feedback: "The hedge was the substance. The source stays the source. This is what the third step of the Source-First Habit looks like under peer pressure." },
        { key: "C", label: "Send the original with a thank-you for the help.", correct: false, feedback: "Not wrong. The hedge stays, and the collegial tone stays too. In practice, this is often the calibrated move — hold the source, honour the offer." },
      ],
    },
    // Reflection beat between the drills and Segment G. Voice: observational.
    reflectionCard: {
      line: "The smoothing was the pressure.",
      hold: 4,
    },
    // Transition after the drills.
    complete: {
      label: "Transition to Segment G · 15s",
      narration: [
        "The Field Guide gave you the language.",
        "The scenarios gave you the consequences.",
        "The drills settled the habit into recognition.",
        "One thing left.",
      ],
      continueLabel: "Continue to the closing",
    },
  },

  /* ---------------- SEGMENT G — COMPLETION + AWE-MOMENT CLOSE -------------- */
  segmentG: {
    // G-1 silence beat + four-note Tibetan-bell motif.
    silenceBeat: {
      label: "G-1 · silence beat · 4s",
      hold: 4,
    },
    // G-2 the awe moment — held on-screen 1:46, no narration.
    aweMoment: {
      label: "G-2 · awe moment card · held 1:46",
      lineOne: "What you say with confidence today",
      lineTwo: "is what someone will repeat back to you next month.",
    },
    // G-3 retention check setup — 3–7 days.
    retentionCheck: {
      label: "G-3 · retention check setup · 40s",
      title: "In three to seven days, the workplace will return.",
      subtitle: "One scene. One question. No grade.",
      channels: ["In-app", "Email", "SMS"],
      defaultChannel: "In-app",
    },
    // G-4 completion screen.
    completion: {
      title: "Module Complete: AI Output Judgment",
      body: "You can now return to the workplace, or open your Growth Log.",
      primaryLabel: "Return to dashboard",
      secondaryLabel: "Open Growth Log",
    },
    // Recognition narration mirrors the DPS pattern — a short reading of what
    // was carried out of the module, before the awe moment lands.
    // AUTHORED — the script does not enumerate a G-1 recognition block (the
    // Segment G runtime is capped at 2:30). This short beat lands the
    // participant into the awe moment, in the same observational register.
    recognition: {
      label: "Recognition narration · 30s",
      lines: [
        "You just rehearsed the reflex twice. Once under authority pressure. Once under epistemic pressure. Both are the same reflex. Both cost the same three seconds.",
        "You are not carrying out of this module a certificate, or a rating. You are carrying a small habit — the one that reads the source before it reads the output.",
      ],
      recognitionCard: {
        title: "WHAT YOU ARE CARRYING NOW",
        lines: [
          "Not a score. Not a certificate.",
          "A reflex. Read the source first.",
        ],
      },
    },
    // Framework return — no-input auto-advance beat before the awe moment.
    frameworkReturn: {
      label: "Framework Return · 20s",
      durationSeconds: 20,
      lead: "Before the closing, one quiet recall.",
      body: "You moved through two scenarios and two drills. Different pressures. The same three steps.",
      steps: ["Read the source.", "Edit toward the source.", "Ship what the source supports."],
      tagline: "This is The Source-First Habit.",
      carryForward: "You used it four times today. You will use it tomorrow.",
    },
    // Cold-open callback — per the four paths in Segment A.
    // AUTHORED — the script doesn't enumerate G-1 callbacks per path. Mirrored from D3's pattern, anchored to the 4:47 PM / Marcus / Aanya moment.
    callback: {
      a: "You opened this module at 4:47 by forwarding the polished summary. Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 4:47 by rewriting toward the source. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 4:47 by pausing to ask Aanya. Hold that first instinct beside the choices that followed.",
      d: "You opened this module at 4:47 by forwarding without a note. Hold that first instinct beside the choices that followed.",
    },
    bookendQuestion: "Do you check, or do you ship?",
    finalPrompt: "In one sentence, what will you check first the next time an AI-drafted artifact arrives on your desk?",
  },
};

/* ============================================================================
   LAYERED SCENARIO 1 — The Forwarded Summary
   Runtime: ~13 min. Inspect → Decide → Pressure (Authority) → 3 horizons.
   ========================================================================== */
export const LS1_CONTENT_M1 = {
  id: "LS1",
  title: "The Forwarded Summary",
  commitment: "Decide whether to forward the AI-drafted meeting summary as-is, edit toward the source, or pause and ask Aanya.",
  pressureType: "Authority",
  mobileMode: "Stacked-Swipe",
  intro: [
    "Layered Scenario 1. The Forwarded Summary.",
    "The email is still open. Aanya's forwarded message. The AI-drafted summary below it. Marcus's Slack window is dimmed on the corner of your screen.",
  ],
  briefing:
    "You are the participant asked to forward a summary. The source is Aanya's message. The output is the AI-drafted summary. The Inspect Surface below shows both, side by side.",
  // ------------- INSPECT BEAT (MOAT-CRITICAL) -------------
  inspect: {
    label: "LS1 · Inspect Surface",
    prompt: "The source is on the left; the output is on the right.",
    sourcePanel: {
      title: "SOURCE · Aanya's forwarded message · 3:42 PM",
      mono: true,
      lines: [
        "From: Aanya Krishnan (Engineering Lead) · 3:42 PM",
        "",
        "Hey — my honest read on the timeline is we can ship by end of October, but only if the integrations team is reallocated. Without that reallocation, we're looking at mid-November at the earliest, and probably with quality compromises we'd regret. I'd be careful saying “on track” until that call is made.",
        "",
        "Can you fold this into whatever Marcus needs? Just be honest about the conditional part.",
        "",
        "— A.",
      ],
    },
    outputPanel: {
      title: "OUTPUT · AI-drafted summary",
      mono: true,
      lines: [
        "The engineering team is on track to ship by end of October.",
        "Aanya has confirmed the timeline and is preparing for the integration phase.",
      ],
    },
    interactionType: "highlight_unsupported",
    // Developer-only. Never surfaced. Used for Lock 2 signal only.
    gapAnchors: [
      "“on track to ship by end of October” omits the integrations-team reallocation contingency.",
      "“Aanya has confirmed the timeline” misrepresents Aanya's hedged read as confirmation.",
      "“preparing for the integration phase” implies forward motion the source does not support.",
    ],
    recognitionMomentNote: "Aanya's verbal tic “my honest read on the timeline is…” is the recognition anchor. The AI summary's smoothed-out “has confirmed the timeline” is the loss point.",
    // Observational instruction — no submit button, no correct-answer overlay.
    footerHint: "There is no submit button. Move on when you are ready.",
    continueLabel: "Move to the decision",
  },
  // ------------- DECIDE BEAT (3 script paths + AUTHORED silent-slip D) -------------
  decidePrompt: "Marcus needs the summary in the deck by 5 PM. What do you do?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  decideOptions: [
    { key: "a", label: "Forward the AI summary as written." },
    { key: "b", label: "Edit toward the source. Send a faithful version." },
    { key: "c", label: "Pause. Ask Aanya for a quick read before sending." },
    // AUTHORED — Path D "silent-slip" for engine 4-path parity.
    { key: "d", label: "Forward the AI summary and stay quiet. No note. No mention of Aanya." },
  ],
  // ------------- ARTIFACT-WRITE (per Decide path) -------------
  artifactWrite: {
    a: { prompt: "You have decided to forward the AI summary as written. Write the one-line note that goes with the forward — the words above the summary.", submit: "Send to steering committee" },
    b: { prompt: "You have decided to rewrite the summary toward the source. Write the actual message — the one that goes up the chain.", submit: "Send the faithful version" },
    c: { prompt: "You have decided to pause and ask Aanya. Write the Slack message you send her right now.", submit: "Send to Aanya" },
    d: { prompt: "You have decided to forward without a note. Write the private note you keep for yourself — what you chose, what you risked — or explain why no record is appropriate.", submit: "Keep this for yourself" },
  },
  references: {
    // ac — variants for the "forward" / "escalate" artifact-writes (Path A + Path C).
    // AUTHORED — three references in the observational register mirroring D3's pattern.
    ac: [
      { tag: "Defensive", calibrated: false, text: "Passing this up as requested — flagging nothing. Hope it lands OK.", lands: "The hedge tells Marcus you are unsure but you do not name what. He forwards it anyway. The uncertainty travels without shape." },
      { tag: "Over-apologetic", calibrated: false, text: "Sorry — I know you wanted a clean read. Attaching what the AI summarised. Happy to redo if it doesn't work.", lands: "The apology takes the front row. The trade-off does not. Marcus reads the apology, files the summary, and moves on." },
      { tag: "Calibrated", calibrated: true, text: "Forwarding. One line to flag: Aanya's read is conditional on the integrations reallocation — the October date depends on it. Kept the honest framing in the body.", lands: "Marcus hears the diagnosis and the contingency in one breath. He can decide what to escalate. The framing does the work." },
    ],
    // b — Path B references (the rewritten faithful version).
    // AUTHORED — two reference variants for the rewrite path.
    b: [
      { tag: "Defensive", calibrated: false, text: "Timeline: October if things go right, November otherwise. Let me know what you want to say up.", lands: "The diagnosis lands but the recommendation doesn't. Marcus has to translate before he can use it." },
      { tag: "Calibrated", calibrated: true, text: "Engineering timeline (from Aanya, 3:42 PM): October is achievable, contingent on the integrations team being reallocated. Without that call, mid-November at the earliest, and quality risks emerge. Honest framing recommended for the committee — “on track” is not yet accurate.", lands: "Marcus hears the source, the condition, the risk, and the recommended framing. The forward writes itself." },
    ],
    // c — Path C references (the check-in to Aanya).
    // AUTHORED — Path C reference variants.
    c: [
      { tag: "Defensive", calibrated: false, text: "Hey — got a summary from AI for Marcus. Any objections?", lands: "Aanya has to reconstruct what the summary said before she can object. The check happens but the work stays on her desk." },
      { tag: "Calibrated", calibrated: true, text: "Marcus wants a timeline summary in the deck by 5. AI drafted one that reads “on track for October, confirming integration phase.” Your Friday note said the October date is contingent on integrations reallocation. OK with the AI version, or want to redraft?", lands: "Aanya sees the source, the AI's read, and the gap in one message. She can either sign off in twenty seconds or send back a corrected version — either way, aligned." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose silence over saying what was true." },
    closing: "What changes between these versions: whether the contingency travels forward with the summary, or gets dropped somewhere between Aanya's inbox and the CEO's meeting.",
  },
  // ------------- PRESSURE BEAT — Authority (Marcus's reply) -------------
  pressure: {
    type: "Authority",
    label: "Pressure Beat · Authority",
    // Marcus's reply — script-locked language.
    trigger: {
      title: "Slack · Marcus Reyes · just now",
      mono: true,
      lines: [
        "Marcus Reyes · just now",
        "",
        "Thanks. Forward to the steering committee as-is. They need a clean read — don't bury them in conditionals. We can flag nuance in the meeting.",
      ],
    },
    prompt: "Marcus has replied. What do you do now?",
    options: [
      { key: "a", label: "Forward clean, as Marcus asked." },
      { key: "b", label: "Forward with one honest line about the contingency." },
      { key: "c", label: "Pause. Loop in Aanya before forwarding." },
    ],
    justificationPrompt: "Marcus is a level up. Why this response — and what does it protect?",
  },
  // ------------- THREE-HORIZON CONSEQUENCE — LS1 -------------
  // Verbatim from script for A/B/C. Path D is AUTHORED consequence chain in
  // the "silent-slip" register (see file header).
  consequences: {
    a: {
      sameDay: [
        "The steering committee thanks you for the clear update. Marcus forwards your summary up the chain. Within an hour, a colleague pings you in Slack: “Great news on October — congrats to your team.” You see your phrasing — “on track for end of October” — quoted back to you, attributed to no one. The Friday inbox fills with other things. The conversation moves on.",
      ],
      nextWeek: [
        "Aanya finds you near the coffee machine on Tuesday morning. She is not angry. She says, quietly: “I saw what went up Friday. I would have framed it differently.” She holds your gaze for a beat longer than is comfortable, and then walks back to her desk. The conversation does not end with a resolution. You return to your desk and open the deck you were working on. The October date is still in the headline.",
      ],
      monthEnd: [
        "The integration phase has not started. The October date has shifted. In a leadership review, Marcus turns to the room and asks: “What changed? I had a clean read.” The CEO looks at the document on the screen. Your name is not mentioned. Your phrasing is.",
      ],
      outcome: "Forwarded as-is. Phrasing quoted back. October date shifted; the room hears your language, not your name.",
      others: "Aanya raised it in private, once. Marcus filed the reading as reliable. The CEO carried the phrasing forward.",
      interp: "The polish travelled. The contingency did not.",
      manager: "Manager's read. “I trusted the read. I would not have trusted it if I had known Aanya's version.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You rewrite the summary in your own words, taking the contingency from Aanya's message and including it in the artifact. You note that AI was used to draft a first version. Marcus replies within two minutes: “Cleaner than I asked for, but I'll take it.” The forward goes up the chain with the conditional language intact. The Friday inbox quiets.",
      ],
      nextWeek: [
        "Aanya stops by your desk on Wednesday with a coffee. “That was a good call on Friday,” she says. “The contingency line went up the chain. The integrations meeting got moved up. We're talking about reallocation now.” She does not stay long. She does not say anything else. You go back to what you were doing.",
      ],
      monthEnd: [
        "The integrations team has been reallocated. The October date holds. In a leadership review, Marcus says: “We caught the contingency on this one early. That call should have been made the Friday before.” The conversation moves to the next item. You do not hear your name. The October date holds because the reallocation happened in time.",
      ],
      outcome: "Rewrote toward the source. Contingency travelled. Reallocation happened in time.",
      others: "Aanya thanked you privately. Marcus caught the flag before it grew. The room moved on.",
      interp: "She became the author. The source stayed the source.",
      manager: "Manager's read. “The call that mattered got made because the framing was honest. That is the pattern I want on the next one.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "You message Aanya: “Quick check — Marcus wants this in the deck by 5. Are you OK with the AI version, or do you want to redraft?” Aanya replies within nine minutes: “Let me rewrite. Five minutes.” She sends back her own version with the contingency. You forward it. Marcus replies: “Fine. Send it up.” The forward goes up. The Friday inbox quiets ten minutes later than it otherwise would have.",
      ],
      nextWeek: [
        "Aanya mentions your check-in to her manager on Monday: “They asked me first. That's exactly what should happen.” You do not hear about this directly. On Wednesday, Aanya emails you to ask if you want to be looped into the next set of cross-team reviews. The Tuesday meeting where the integrations reallocation gets discussed includes the contingency phrasing — verbatim from Aanya's redraft.",
      ],
      monthEnd: [
        "The integrations team was reallocated two weeks earlier than it would have been. The October date holds without strain. In a leadership review, the CEO turns to Aanya and asks how the early flag happened. Aanya names you. “They asked,” she says. Marcus is in the room. He nods.",
      ],
      outcome: "Asked Aanya first. Her version travelled. Reallocation moved up two weeks.",
      others: "Aanya named you. Marcus watched. The CEO learned who asked.",
      interp: "The check happened before the ship. The source stayed upstream.",
      manager: "Manager's read. “They asked. That is the move I want on every one of these.”",
      traj: "rise",
    },
    d: {
      // AUTHORED — Path D consequence chain in the observational voice.
      sameDay: [
        "You forward the AI summary at 4:59 PM with no note. Marcus replies: “Perfect.” The forward goes up. The Friday inbox goes quiet.",
        "You do not open Aanya's message a second time.",
      ],
      nextWeek: [
        "On Wednesday, a colleague forwards you an email from finance asking about the integrations reallocation timeline. They cite “on track for October.” You realise the line is the AI summary's, quoted verbatim, attributed to no one.",
        "You draft a clarification. You do not send it.",
      ],
      monthEnd: [
        "The October date shifts. The CEO asks in a leadership review who had the read on the integrations reallocation. Nobody in the room can point to a source. Aanya, who is not in the room, is asked later. She says she flagged it on Friday.",
        "Your name is not in the memo. Neither is the phrasing you forwarded. The silence is what remains.",
      ],
      outcome: "Forwarded silently. Source disappeared. The room could not trace the read.",
      others: "Aanya's flag surfaced late; the trail closed. Marcus did not follow up.",
      interp: "The silence became the record.",
      manager: "Manager's read. “I never learned where the read came from. That is the pattern I cannot work with.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Forward the AI summary as written", signal: "Polish travelled. Contingency didn't.", effect: "Your phrasing lands in the room; your name does not." },
    { key: "b", title: "Edit toward the source", signal: "Rewrote in your own words. Kept the contingency.", effect: "Reallocation caught in time; the author is you." },
    { key: "c", title: "Pause and ask Aanya", signal: "Sent the source upstream before shipping.", effect: "The right person is named; the check is a pattern." },
    { key: "d", title: "Forward silently, no note", signal: "The source disappeared before it left your desk.", effect: "The read cannot be traced back; the silence is what remains." },
  ],
  reflection: "Look at Aanya's forwarded message and the AI summary again. If you were the one asked next week what the timeline actually said — what would you say?",
};

/* ============================================================================
   LAYERED SCENARIO 2 — The Dashboard Summary
   Runtime: ~13 min. Inspect (Comparison-Tap) → Decide (with within-module
   memory drift) → Pressure (Epistemic) → 3 horizons.
   ========================================================================== */
export const LS2_CONTENT_M1 = {
  id: "LS2",
  title: "The Dashboard Summary",
  commitment: "Decide whether to drop the AI-drafted executive summary of Q3 engagement into slide 14 as-is, verify and qualify, or verify and escalate.",
  pressureType: "Epistemic",
  mobileMode: "Comparison-Tap",
  // Cold setup — Monday morning open-plan office.
  coldSetup: {
    label: "LS2 · Monday morning cold setup · 45s",
    lines: [
      "Monday morning. Open-plan office. You arrive at your desk.",
      "A calendar invite for 11:00 AM shows on your screen: “Board Prep — final deck review.” An email is open from the head of customer research, Priya:",
      "“I've pulled the engagement dashboard for Q3. Need a clean summary in slide 14 by 10:30. Used Notion AI to draft — please make it board-ready.”",
      "A Slack notification slides in from Aanya, time-stamped Friday evening — but only now becoming visible.",
    ],
    // Within-module memory — Aanya's Slack differs by LS1 path.
    aanyaSlackByLS1: {
      a: "Hey — saw the version that went up. Just so we're aligned: I would have framed it differently. Worth a chat this week.",
      b: "Hey — saw the version that went up. Honest framing went in. Appreciated.",
      c: "Hey — appreciated the check-in Friday. That's exactly how I'd want this to happen going forward.",
      d: "Hey — I saw what went up. I would have said it differently. Worth a chat.",
    },
    slackTitle: "Slack · Aanya Krishnan · Friday, 5:47 PM",
  },
  intro: [
    "Layered Scenario 2. The Dashboard Summary.",
    "The dashboard is on your screen. The AI-drafted executive summary is on the right. Priya wants it in slide 14 by 10:30.",
  ],
  briefing:
    "The dashboard is the customer engagement dashboard for Q3. The AI-drafted summary is Priya's Notion AI draft. The Inspect Surface renders both. You are asked to drop the summary into the board-prep deck.",
  // ------------- INSPECT BEAT (MOAT-CRITICAL) -------------
  inspect: {
    label: "LS2 · Inspect Surface",
    prompt: "The dashboard is on the left; the summary is on the right. Tap a claim to see what the dashboard says.",
    sourcePanel: {
      title: "SOURCE · Customer Engagement Dashboard, Q3",
      mono: true,
      lines: [
        "Engagement (mobile)         34% YoY increase *",
        "Engagement (desktop)         3% YoY increase",
        "Engagement (overall)        14% YoY increase",
        "Active accounts              +8.1% QoQ",
        "Net promoter score          62 (Q2: 64)",
        "",
        "* Footnote: “Engagement (mobile) defined as sessions > 8 seconds; excludes accidental opens. Methodology revised Q3-2026; not directly comparable to Q2-2026 figures.”",
      ],
    },
    outputPanel: {
      title: "OUTPUT · AI-drafted executive summary",
      mono: true,
      lines: [
        "Q3 engagement performance was strong, led by a 34% increase in mobile engagement.",
        "Active accounts grew 8.1% quarter over quarter.",
        "Customer satisfaction held steady.",
        "Overall engagement trends position the platform well heading into Q4.",
      ],
    },
    interactionType: "select_supported_claims",
    // Developer-only gap anchors.
    gapAnchors: [
      "The 34% mobile figure is cited without the methodology-revision footnote (not comparable to Q2).",
      "“Customer satisfaction held steady” papers over a 2-point NPS drop.",
      "“Position the platform well” is editorial; not supported by the dashboard.",
      "Desktop engagement at 3% is omitted entirely.",
    ],
    recognitionMomentNote: "The metric “Engagement (mobile)” with the buried methodology footnote is the recognition anchor. Knowledge workers recognise this exactly: the headline number, the footnote, the temptation.",
    footerHint: "There is no submit button. Move on when you are ready.",
    continueLabel: "Move to the decision",
  },
  // ------------- DECIDE BEAT (3 script paths + AUTHORED Path D) -------------
  // Decide prompt drifts based on LS1 path (within-module memory).
  decidePromptByLS1: {
    a: "Priya needs the summary in slide 14 by 10:30. What do you do?",
    b: "Priya needs the summary in slide 14 by 10:30. The same kind of moment as Friday. What do you do?",
    c: "Priya needs the summary in slide 14 by 10:30. You asked last time. What do you do?",
    d: "Priya needs the summary in slide 14 by 10:30. What do you do?",
  },
  decidePrompt: "Priya needs the summary in slide 14 by 10:30. What do you do?",
  justificationPrompt: "Why this option? The dashboard footnote was visible. What are you shipping?",
  decideOptions: [
    { key: "a", label: "Drop in the AI summary as written." },
    { key: "b", label: "Verify the methodology footnote. Edit to qualify the figure." },
    { key: "c", label: "Verify, then escalate the methodology ambiguity to Priya." },
    // AUTHORED — Path D "silent-slip" for 4-path parity.
    { key: "d", label: "Drop it in. Skip the footnote. Priya can catch it if it matters." },
  ],
  // ------------- ARTIFACT-WRITE (per Decide path) -------------
  artifactWrite: {
    a: { prompt: "You have decided to drop the AI summary into slide 14 as written. Write the reply you send Priya with the slide attached.", submit: "Send to Priya" },
    b: { prompt: "You have decided to verify and qualify. Write the revised slide 14 summary — the words that will read from the screen at 11:00 AM.", submit: "Save the slide" },
    c: { prompt: "You have decided to escalate the methodology ambiguity. Write the Slack message you send Priya right now.", submit: "Send to Priya" },
    d: { prompt: "You have decided to drop it in without noting the footnote. Write the private note you keep for yourself — what you chose, what you risked.", submit: "Keep this for yourself" },
  },
  references: {
    // AUTHORED — three reference variants per D3 pattern.
    ac: [
      { tag: "Defensive", calibrated: false, text: "Slide 14 attached. Notion's draft with light polish. Let me know if it works.", lands: "Priya cannot tell whether you verified the dashboard or not. The AI draft becomes the record without a check." },
      { tag: "Over-apologetic", calibrated: false, text: "Sorry — quick turnaround. Kept the AI draft mostly as-is. Please tell me if the 34% needs anything else, I can rework.", lands: "The apology becomes the message. Priya has to decide whether to redo the work herself." },
      { tag: "Calibrated", calibrated: true, text: "Slide 14 attached. One flag: the 34% mobile figure sits under a revised Q3 methodology (sessions > 8 seconds; not directly comparable to Q2). Kept it in with the qualifier in the speaker notes. Desktop engagement (3%) added for balance. Happy to redraft if you want the qualifier on the slide.", lands: "Priya reads the flag, the choice, and the option in one message. She can approve or redirect in twenty seconds." },
    ],
    b: [
      { tag: "Sparse rewrite", calibrated: false, text: "Q3 mobile engagement up 34% (revised methodology). Active accounts +8.1%. NPS 62 (Q2: 64).", lands: "Technically accurate. But the numbers stand alone and the reader has to decide what to make of them." },
      { tag: "Calibrated slide", calibrated: true, text: "Q3 engagement — mobile up 34% under a revised methodology (sessions over 8 seconds; not directly comparable to Q2). Desktop engagement up 3%. Active accounts up 8.1% QoQ. NPS at 62, down 2 points from Q2. Trajectory: mobile strengthening under a stricter definition; the two-point NPS drop is worth watching.", lands: "The slide reads honestly. The board sees the strength and the caveat. The Q3 narrative is set with room to move." },
    ],
    c: [
      { tag: "Defensive", calibrated: false, text: "Hey — quick one on slide 14. The 34% number OK to use?", lands: "Priya has to reconstruct what the question is. The check happens but the work stays on her desk." },
      { tag: "Calibrated", calibrated: true, text: "Quick check on slide 14 — the 34% mobile engagement is under the revised Q3 methodology. Want the qualifier on the slide, in a footnote, or folded into the speaker notes? Slide either way in five minutes.", lands: "Priya sees the ambiguity, the three options, and the timeline. She can decide with you in one exchange." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose to let a headline number travel unqualified." },
    closing: "What changes between these versions: whether the board's planning anchor is set at a figure the dashboard actually supports, or at one that reads better than it should.",
  },
  // ------------- PRESSURE BEAT — Epistemic (Daniel's Slack) -------------
  pressure: {
    type: "Epistemic",
    label: "Pressure Beat · Epistemic",
    trigger: {
      title: "Slack · Daniel Park · 10:14 AM",
      mono: true,
      lines: [
        "Daniel Park · 10:14 AM",
        "",
        "Hey — saw you were drafting the slide 14 summary. Wanted to give you this for context: our customer panel data also shows mobile engagement up significantly Q3 vs Q2. Methodology is different (we use session-count, not session-duration) but directionally aligned. Hope it helps.",
        "",
        "[Attachment: customer-panel-Q3.csv]",
      ],
    },
    prompt: "Daniel's data seems to confirm the AI summary — under a different methodology. What do you do?",
    options: [
      { key: "a", label: "Use Daniel's data to reinforce the AI summary." },
      { key: "b", label: "Note both methodologies. Qualify the figure honestly." },
      { key: "c", label: "Pause. Surface the methodology question with Priya." },
    ],
    justificationPrompt: "Daniel is collaborative, not authoritative. Why this response — and what is doing the pressure?",
  },
  // ------------- THREE-HORIZON CONSEQUENCE — LS2 -------------
  // Verbatim from script for A/B/C. AUTHORED for Path D silent-slip.
  consequences: {
    a: {
      sameDay: [
        "Slide 14 goes into the deck at 10:28. Priya's reply: “Perfect — thanks.” Daniel sees the slide in the board prep meeting and gives you a thumbs-up over Slack: “Looks great.” The board meeting at 11:00 lands well. The 34% mobile engagement figure is on the lead slide. The CEO repeats it in the meeting. The Q3 narrative is set.",
      ],
      nextWeek: [
        "Priya forwards a note from the head of product: “The 34% mobile engagement figure is showing up in the Q4 strategy memo. Can you confirm the source?” You realise the methodology revision means the 34% isn't comparable to Q2. You start drafting a clarification. The clarification will go out, but the figure has already been quoted in a Friday memo.",
      ],
      monthEnd: [
        "The Q4 strategy memo cites the 34% mobile engagement figure as a Q3 result. The figure becomes a planning anchor. Two weeks later, the data team reports that the Q3 methodology revision means Q3 cannot be compared to Q2 — the 34% looks larger than it would have looked under the Q2 methodology. The strategy memo is corrected. A correction is not a retraction. Your name is not in the memo. The phrasing is.",
      ],
      outcome: "Dropped as-is. The headline number travelled unqualified into the Q4 memo.",
      others: "Priya thanked; Daniel confirmed. The correction, weeks later, landed with the data team.",
      interp: "The polish carried the number. The footnote stayed in the dashboard.",
      manager: "Manager's read. “The figure became the planning anchor. The qualifier arrived too late to matter.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You verify the methodology revision. You edit the summary to read: “Mobile engagement is up under a revised Q3 methodology (sessions over 8 seconds, excluding accidental opens); not directly comparable to Q2.” You note the desktop engagement at 3%. You drop the slide in at 10:32. Priya replies: “Tighter than I'd have written it, but board-ready. Thank you.” The board meeting at 11:00 lands; the qualifier is in the speaker notes.",
      ],
      nextWeek: [
        "Priya stops by your desk on Wednesday. “The board liked the honesty,” she says. “They asked good questions about the methodology. The CEO wants the Q4 strategy memo to reflect the same kind of framing.” She does not stay long. She does not need to. You go back to what you were doing.",
      ],
      monthEnd: [
        "The Q4 strategy memo cites the Q3 figure with the methodology qualifier intact. The planning anchor is set realistically. The CEO references the qualifier in a follow-up review: “This is what honest data citation looks like — even when the headline is good.” The qualifier is now a small piece of how this company speaks about its data. Your name is not in the memo. The behaviour is.",
      ],
      outcome: "Verified. Qualified. The board asked good questions; the memo carried the framing.",
      others: "Priya cited the framing; the CEO carried it into a second forum.",
      interp: "The qualifier became part of the record — and part of how the company talks about its data.",
      manager: "Manager's read. “That is the framing I want on every dashboard citation from now on.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "You read the dashboard footnote. You message Priya: “Quick check — the 34% mobile figure is under a revised methodology. Do you want the qualifier in the slide, or a footnote, or fold into the speaker notes?” Priya replies in three minutes: “In the slide. Don't let the board cite something it can't carry.” You write it into slide 14. The board meeting is held later than scheduled by four minutes because the qualifier is discussed. The discussion is productive. The Q3 narrative is now nuanced.",
      ],
      nextWeek: [
        "Priya emails you on Tuesday: “Want to take on the next quarterly summary as primary? You ask the right questions.” The Q4 board prep cycle now has you in a role you were not in for Q3. The CEO references the methodology discussion in a separate forum, in passing, as the kind of pre-board hygiene the company should be doing more of. Priya's email is brief; the consequence is not.",
      ],
      monthEnd: [
        "The Q4 strategy memo is drafted with you as primary. The methodology qualifier is in the lead slide, not the speaker notes. The planning anchor is set realistically and held. The CEO uses the language “under revised methodology” in two separate meetings during the month. The phrasing — not the credit — travels. Your name does come up, once, when Priya is asked who drafted the Q3 slide. “They asked the right question,” Priya says.",
      ],
      outcome: "Escalated. Priya wrote the qualifier in. You became primary on Q4.",
      others: "Priya named you; the CEO used the language twice; the room made room for the check.",
      interp: "The question became the artifact. The framing carried into the following quarter.",
      manager: "Manager's read. “They asked before the room was set. That is the move that gets rewarded.”",
      traj: "rise",
    },
    d: {
      // AUTHORED — Path D consequence chain.
      sameDay: [
        "You drop the AI summary into slide 14 at 10:26. You do not include the footnote. Priya replies: “Perfect.” The board meeting at 11:00 lands well. The 34% figure is in the lead slide. The CEO reads it aloud.",
        "You do not open the dashboard again that morning.",
      ],
      nextWeek: [
        "On Thursday, the data team quietly flags the methodology revision to Priya. Priya asks who drafted the slide. She reads back your reply — “Perfect — thanks.” Nothing else is asked. Nothing else is said.",
        "You draft a clarification. You do not send it.",
      ],
      monthEnd: [
        "The Q4 strategy memo cites the 34% as a Q3 result. Two weeks later a footnote-only correction is issued. The planning anchor stays inflated. The correction is not a retraction.",
        "Your name is not in the memo. The 34% is. Your name is not in the correction either.",
      ],
      outcome: "Dropped in silently. The correction arrived too late to move the anchor.",
      others: "Priya noticed. The data team corrected. The room did not learn who drafted.",
      interp: "The silence held longer than the number did.",
      manager: "Manager's read. “The correction is on file. The pattern is not yet.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Drop in the AI summary as written", signal: "Polish travelled again. The qualifier stayed in the dashboard.", effect: "The board's planning anchor is set at a figure the dashboard doesn't fully support." },
    { key: "b", title: "Verify and qualify", signal: "Read the footnote. Wrote it into the slide.", effect: "The framing becomes how the company speaks about the data." },
    { key: "c", title: "Verify and escalate to Priya", signal: "Surfaced the methodology question upstream.", effect: "The question becomes the artifact; you become primary on the next one." },
    { key: "d", title: "Drop in silently, skip the footnote", signal: "The number left the desk without a caveat.", effect: "The correction arrives after the anchor is set." },
  ],
  reflection: "The dashboard footnote was on the same page as the 34%. What made it easier to skip than to read? Write one sentence.",
};

/* End of m1Content.js */
