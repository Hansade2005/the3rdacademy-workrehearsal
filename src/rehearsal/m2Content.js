/* ============================================================================
   M2 CONTENT LAYER — AI Disclosure & Attribution
   AIWorkLab Pressure Point 2 — Pilot-Ready v1.2 (July 2026).

   Architecture note: AIWorkLab modules use six segments A, B, C, E, F, G —
   Segment D (BehaviourLab audio case) is OMITTED. Segment E carries two
   layered scenarios (LS1 → LS2) with intra-module residue rather than four
   one-shot chains. Every paragraph rendered here is verbatim from
   scripts/AI_Ready_M2_AI_Disclosure_Attribution_PilotReady_v1_2.md unless
   flagged // AUTHORED — in which case the copy is written in the same
   observational register to fill a slot the engine renders but the script
   declares only as a pattern.
   ========================================================================== */

export const M2_CONTENT = {
  module: {
    id: "M2",
    title: "AI Disclosure & Attribution",
    tier: "AIWorkLab · Pressure Point 2",
    subtitle: "Do you disclose, or do you conceal?",
    // Per script §Cover — sector applied to advisory/professional services.
    sector_variants: ["Technology / Knowledge Work"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Technology / Knowledge Work workplace context, applied to advisory / professional services. The same context applies across both layered scenarios.",
      pickerHint: "The context you choose here applies across both layered scenarios.",
    },
    audience_variant: "new_hire",
    signature_framework_name: "The Material-Use Rule",
    signal_cluster: "disclosure_attribution",
  },
  dimension: {
    id: "M2",
    name: "AI Disclosure & Attribution",
    central_question: "Do you disclose, or do you conceal?",
    framework: {
      label: "The Material-Use Rule",
      body: "Material substance → Disclosed · Material style only → Your call · Direct question → Direct answer",
    },
  },
  // AIWorkLab intra-module memory model per script Appendix M2.4 — LS1
  // outcome threads into LS2 Inspect surface and LS2 Decide prompt.
  intra_module_state_model: "ls1_disclosure_pattern",
  // Cross-lab callback — M2 consumes D1 (BehaviourLab) final sentence if
  // available and M1 signal cluster if available. MVP renders fallback.
  prior_module_references: ["D1", "M1"],

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    // Screen A-0 — silence beat + Tibetan-bell four-note motif + D1 callback
    // when available. MVP renders the fallback text; the personalised variant
    // slot is preserved for wire-up once cross-module memory is online.
    coldOpen: {
      d1Callback: {
        wrapperLead: "Last time you carried something out of this lab. You wrote:",
        sentenceSlot: "{{prior.D1.final_personal_sentence}}",
        wrapperTail: "— you, last month. That sentence still belongs to you.",
        // FALLBACK — plays when D1 wasn't completed in this session.
        // AUTHORED — the script declares an emission-contract callback but
        // leaves the M2 wrapper fallback unspecified; authored in the same
        // register as D2/D3/D5 fallback wrappers.
        fallback: "This module can stand alone, but it connects more deeply after D1 Integrity & Ethics. We are going to ask you to live a moment now — a moment where what you say about your own work matters.",
      },
      // Screen A-1 — inbox scene, 11:14 AM Tuesday. Elena's email + the
      // participant's draft reply. Verbatim per §A.2.
      sceneLead: [
        "It is 11:14 on a Tuesday morning.",
        "Your email is open. A reply has just arrived from Elena Reyes — a senior partner at the private equity firm you have been working with for six weeks on a strategic memo about regulatory exposure in a target acquisition.",
        "You have twenty-eight minutes before a call with Elena and her partners where the next phase of engagement will be discussed.",
      ],
      email: {
        title: "Email · Elena Reyes → you",
        from: "Elena Reyes (Senior Partner, Northbrook Capital)",
        to: "[You]",
        sent: "11:09 AM Tuesday",
        subject: "Re: Target memo — regulatory exposure brief",
        lines: [
          "Hey [you] —",
          "",
          "Just had a chance to read through. Genuinely impressive. The section on regulatory headwinds is sharp, particularly the asymmetric exposure framing on slide 8 — I haven't seen that framing applied this way before.",
          "",
          "Did you pull that together yourself, or are you working with a team I should know about?",
          "",
          "Talk soon —",
          "Elena",
        ],
      },
      draftReply: {
        title: "Compose · your draft reply (not yet sent)",
        lines: [
          "[Draft — not yet sent]",
          "",
          "Thanks Elena. The framing emerged from working through the materials. Looking forward to the call.",
          "",
          "[Cursor blinks at the end. The reply is half-written. The send button is one click away.]",
        ],
      },
      // Screen A-2 — the calendar strip. Verbatim per §A.3.
      calendar: {
        title: "Calendar strip · right edge",
        lines: [
          "Today · Tuesday",
          "11:14 AM (now)",
          "11:40 AM  Northbrook Capital — engagement discussion (Elena + partners)",
          "",
          "[The calendar holds for four seconds, then the inbox returns to focus. The cursor still blinks in the draft reply.]",
        ],
      },
      // Screen A-3 — the central question, framed quietly.
      centralQuestionCard: {
        primary: "Do you disclose, or do you conceal?",
        secondary: "This is rehearsal. Nothing is graded. Take the time you would actually take.",
      },
      // Recognition Moment seed (cinematic detail), rendered as observation.
      recognitionSeed: "Elena's specific praise of 'the asymmetric exposure framing on slide 8' is the recognition anchor. A new hire in advisory work recognises this as the moment they wish she'd asked about something else — because that exact framing came out of an AI-assisted synthesis, with the participant's light edits.",
    },
    // Safety floor — AIWorkLab standard framing (Development vs Evidence).
    // AUTHORED — the M2 script inherits Safety Floor language from the
    // AIWorkLab Production Standard v1.2; rendered in the observational
    // register used across every module.
    safetyFloor: {
      card: [
        "THIS IS PRACTICE AND DEVELOPMENT.",
        "Nothing you do here becomes part of your behavioural documentation.",
        "Your Growth Log captures what you practised and how you engaged — it is your private development record.",
        "Your Skill Passport — if you want documented evidence — is earned through the separate observation pathway. Development is what you do here. Evidence is what the observation pathway produces.",
        "AI is a fact of the workplace. The question is what you do with the fact.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    // B-1 — narration of what the participant just lived through. Verbatim.
    intro: [
      "That moment is small. A client. A compliment. A specific question. A draft already half-written. A call in twenty-six minutes.",
      "What gets said next becomes the record of who did the work.",
    ],
    // B-2 — the disclosure standard, plainly stated. Verbatim per §B.2.
    standardCard: {
      title: "The disclosure standard, under AI-assisted work",
      items: [
        "When AI shaped the substance of what you are sending, you say so.",
        "When AI shaped only the surface — tone, grammar, formatting — that is your call.",
        "When someone asks you directly, you answer directly.",
        "When a record may be audited, you leave a trail.",
        "When credit is offered for something you did not fully do, you do not let it stand.",
      ],
      footer: "The author of record is whoever sends the artifact forward. The author of substance is whoever shaped what it claims.",
    },
    // B-3 — two-column list of what the standard refuses. Verbatim per §B.3.
    refusesCard: {
      title: "What the standard refuses",
      items: [
        { h: "Performative disclosure", t: "declaring AI use loudly when the use was trivial, to look transparent." },
        { h: "Strategic omission", t: "answering a question other than the one that was asked." },
        { h: "Silent credit acceptance", t: "letting praise land on AI-shaped work without correcting." },
        { h: "Asymmetric transparency", t: "disclosing AI use when it helps, concealing it when it hurts." },
      ],
    },
    // AUTHORED — a 60s reflection prompt to close Segment B, matching the
    // AIWorkLab Standard's Segment-B reflection cadence and the observational
    // register used across sister modules.
    reflectionPrompt:
      "Before we go further — think about the last piece of AI-assisted work you sent to someone. Did you name the AI's role? If not, would you have if they had asked?",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    // C.1 — What praise lands on, you will be asked to defend. Verbatim.
    c1: {
      title: "C1 — What praise lands on, you will be asked to defend",
      narration: [
        "Here is what happens to AI-assisted work when praise arrives.",
        "The compliment lands on the cleanest part of the artifact. Clients and senior people do not praise the section you laboured over for three weeks. They praise the line that reads like it was easy. That is often the line AI helped write.",
        "Once praise lands and goes uncorrected, the work becomes yours in writing. In the engagement letter. In the next meeting. In the memo that gets forwarded six months later. The model has no reputation to protect. You do.",
      ],
      reveal: {
        title: "What praise lands on, you will be asked to defend.",
        body: "Disclosure is what keeps the line between assistance and authorship visible.",
      },
    },
    // C.2 — The Material-Use Rule. Signature framework reveal. Verbatim.
    c2: {
      title: "C2 — The Material-Use Rule",
      framework: {
        name: "The Material-Use Rule",
        steps: [
          { num: "1.", label: "Material substance from AI → Disclosed." },
          { num: "2.", label: "Material style only → Disclosure is your call." },
          { num: "3.", label: "Direct question → Direct answer." },
        ],
      },
      narration: [
        "The Material-Use Rule is what disclosure looks like when it is a habit, not a confession.",
        "Material substance. When AI shaped what the artifact claims — the framing, the analysis, the recommendation, the figure — that is material. It gets named. Not loudly. Not apologetically. Named.",
        "Material style. When AI shaped only how the artifact reads — the tone, the grammar, the rhythm — that is not material. The participant decides. There is no general obligation to declare every line AI smoothed.",
        "Direct question. When someone asks the question plainly, the answer is plain. The artifact is yours; the help is named. Strategic omissions count as deception, even when each individual word is true.",
        "The Material-Use Rule is what was missing in the half-written draft.",
      ],
    },
    // Transition to Segment E — no Segment D in AIWorkLab. AUTHORED — a brief
    // handoff narration in the same register as the sister modules' C→D
    // transitions, adapted to route directly to Segment E.
    complete: {
      label: "Transition to Segment E · 15s",
      narration: [
        "You now have the framework. Three parts. The Material-Use Rule.",
        "Next, you return to Elena's email — with the framework in your hand. Then, a week later, a room with your VP and two new senior leaders.",
        "Two moments, layered. Same pressure. Different shape.",
      ],
    },
    // Break Point 1 — Pause invitation before Segment E, per AIWorkLab pattern.
    breakPoint1: {
      label: "Pause invitation · Break Point 1 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 1",
      subtitle: "After Segment C",
      elapsedLabel: "Elapsed: ~11 minutes",
      remainingLabel: "Remaining: ~34 minutes",
      avatarScript: [
        "You have the framework. Two layered scenarios come next — Elena's email, then a Monday morning meeting with your VP.",
        "Our intent is not to have you complete this module — it is to have you carry it with you.",
        "Take your time. Your progress is saved.",
      ],
      continueLabel: "Continue now",
      returnLaterLabel: "Return later",
    },
  },

  /* ------------------- SEGMENT E — LAYERED SCENARIO LAB ------------------- */
  segmentE: {
    intro: [
      "Segment E — two layered scenarios.",
      "First, Elena's email. Then, one week later, a Monday morning meeting with your VP.",
      "How you handle the first shapes what you walk into on the second.",
    ],
  },

  /* ------------------- SEGMENT F — MICRO-DRILLS --------------------------- */
  segmentF: {
    intro: "Two short consolidation exercises. The Material-Use Rule. Now: rapid recognition.",
    // F.1 — "Substance or style?" — three items, verbatim per §F.1.
    f1: {
      title: "F1 — Substance or style?",
      audioIntro: "Three small AI-assisted moments. For each, mark whether AI shaped material substance, material style only, or borderline. Type or tap. We are not rating; we are rehearsing the muscle.",
      onScreenHeader: {
        title: "SUBSTANCE OR STYLE?",
        lines: [
          "Three items. For each, name whether AI's involvement was material substance, material style only, or borderline.",
        ],
        cta: "Tap to begin.",
      },
      options: [
        "Material substance",
        "Material style only",
        "Borderline",
      ],
      items: [
        {
          vignette: "You wrote an email yourself. You asked the firm-approved AI assistant to make it sound more professional. The grammar and tone were rewritten. The content was not changed.",
          answer: "Material style only",
          // AUTHORED — feedback text in the register of the Material-Use Rule,
          // rendering the developer-only scoring note from §F.1 as an observation.
          feedback: "Style. AI shaped how the email reads, not what it claims. Under the Material-Use Rule, this is your call — there is no general obligation to declare every line AI smoothed.",
        },
        {
          vignette: "You drafted a recommendation memo. You asked the firm-approved AI assistant for a counterargument so you could stress-test your thinking. The AI's counterargument changed your final recommendation.",
          answer: "Material substance",
          feedback: "Substance. The AI's counterargument changed what the memo now recommends. Under the Material-Use Rule, that is disclosed. Not loudly. Named.",
        },
        {
          vignette: "A colleague sent a draft policy document. They used an AI tool to generate examples. They reviewed and kept all the examples. They are about to send the document to their VP, with no disclosure.",
          answer: "Material substance",
          feedback: "Substance. The examples in a policy document are part of what it claims. If the reader would read the examples as the colleague's own, disclosure is owed.",
        },
      ],
      closeCard: "You have rehearsed three material-use calls. The line is not always easy. The line is always there.",
    },
    // F.2 — "The praise lands" — one vignette, three options. Verbatim per §F.2.
    f2: {
      title: "F2 — The praise lands",
      audioIntro: "A colleague forwards an email chain. The most senior person in your firm has just praised your recent work in writing — specifically, a phrasing you did not fully write. The praise is attributed to the team but obviously points to you. Sixty seconds. What do you do?",
      onScreenHeader: {
        title: "THE PRAISE LANDS",
        lines: [
          "A colleague forwards an email chain. The senior partner has praised your recent work in writing — a phrasing you did not fully write. The colleague adds: \"Congrats — looks like you've got fans upstairs.\"",
        ],
        cta: "Tap to begin.",
      },
      // Single-vignette drill with three options and per-option feedback.
      vignette: "What do you do?",
      options: [
        { key: "a", label: "Thank the colleague. Don't address the praise upstream." },
        { key: "b", label: "Send a brief note upstream noting AI assisted with the phrasing." },
        { key: "c", label: "Send a brief note upstream and ask how the firm wants this attributed." },
      ],
      // AUTHORED — feedback per option in the Material-Use Rule register;
      // the script's §F.2 declares the three options but leaves per-option
      // consequence framing to the engine. Written to preserve
      // cost-on-every-path discipline.
      feedback: {
        a: "The praise now stands. What you didn't correct, you confirmed. Under the Material-Use Rule, credit for AI-shaped substance goes uncorrected — and next month, you build on it.",
        b: "The praise gets a footnote. The firm hears the material distinction from you first, not from a client six months later. Small cost now. Durable trail.",
        c: "You surface the attribution question at the level it belongs. The firm gets a small policy conversation. Your name attaches to the practice.",
      },
      // Reflection beat after drills, verbatim per script.
      reflectionBeat: "What you don't correct, you confirm.",
      closeCard: "You have named the moment where silence becomes disclosure. The muscle is small. The cost of not having it is large.",
    },
    complete: {
      label: "Transition to Segment G · 15s",
      narration: [
        "The framework gave you the language.",
        "The layered scenarios gave you the consequences.",
        "The micro-drills settled the language into recognition.",
        "One thing left.",
      ],
      continueLabel: "Continue",
    },
  },

  /* ---------------- SEGMENT G — AWE CLOSE + RETENTION CHECK ---------------- */
  segmentG: {
    // Optional break invitation before the closing beats.
    breakPoint4: {
      label: "Pause invitation · Break Point 4 · 10s",
      title: "PAUSE INVITATION · BREAK POINT 4",
      subtitle: "Optional, after Segment F",
      elapsedLabel: "Elapsed: ~41 minutes",
      remainingLabel: "Remaining: ~3 minutes",
      avatarScript: [
        "You are at the closing. It is a few minutes long. You can take a break here, or step into it now. Your choice.",
      ],
      continueLabel: "Step into the closing",
      returnLaterLabel: "Take a short break",
    },
    // G-1 — silence beat + Tibetan-bell four-note motif. No text.
    // G-2 — the awe moment, two lines held. Verbatim per §G.2.
    aweMoment: {
      lines: [
        "What you let stand today",
        "is what your name will carry next month.",
      ],
    },
    // AUTHORED — recognition narration into g1, matching the Standard's Segment G
    // recognition cadence; the M2 script leaves recognition to the awe close but
    // the engine renders a bookend recognition card for parity.
    recognition: [
      "You just rehearsed the pressure point twice. First in an email. Then in a room. Different pressure — social warmth in one, authority in the other.",
      "What you are carrying out of this module is not a rating. It is not a credential. It is not a checklist.",
      "It is a sharper sense of what disclosure feels like in your hands when praise arrives — and what your pattern looks like to other people.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "A sharper sense of what your disclosure pattern looks like to others.",
      ],
    },
    // AUTHORED — cold-open callback per LS1 path, mirroring the AIWorkLab
    // Segment G structure. Anchored to Elena's email + the specific praise
    // (asymmetric exposure framing on slide 8). Path keys map to LS1 Decide.
    callback: {
      a: "You opened this module at 11:14 by sending the passive draft as written. Hold that first instinct beside what came next.",
      b: "You opened this module at 11:14 by adding the brief AI note. Hold that first instinct beside what came next.",
      c: "You opened this module at 11:14 by naming the material distinction. Hold that first instinct beside what came next.",
    },
    frameworkReturn: {
      label: "Framework Return · 25s",
      durationSeconds: 25,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through two layered scenarios. Different pressure. Different cost. But the same three-part reflex.",
      // AUTHORED — steps mirror the Material-Use Rule's three parts,
      // rendered as the framework-return beat per the AIWorkLab Standard.
      steps: ["Material substance → Disclosed.", "Material style only → Your call.", "Direct question → Direct answer."],
      tagline: "This is The Material-Use Rule.",
      carryForward: "You used it twice today. You will use it again this week.",
    },
    // Retention Check — appendix M2.7 (Priya's Slack).
    delayedRetentionCheck: {
      label: "Retention check setup · 40s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In three to seven days, the workplace will return.",
        "One scene. One question. No grade.",
      ],
      details: [
        { k: "Appears", v: "3 to 7 days from now (weekdays only)" },
        { k: "Format", v: "1 scenario fragment, 3 response options" },
        { k: "Response", v: "Single decision + one Same-Day horizon" },
        { k: "Attempts", v: "1 available" },
        { k: "Window", v: "72 hours from notification" },
      ],
      doctrinalNote: [
        "This is not a pass / fail check. It is a check that the judgment pattern has stayed with you after time has passed.",
        "If the pattern has settled differently, the system will guide you back to the moment worth revisiting.",
      ],
      continueLabel: "Got it — continue",
      // Retention scene — verbatim per Appendix M2.7.
      scene: {
        heading: "RETENTION SCENE · THURSDAY AFTERNOON",
        setup: [
          "A Slack notification arrives from Priya, the junior analyst you have encountered before.",
        ],
        message: {
          who: "Priya Singh · 3:21 PM",
          body: "Hey — quick one. I'm drafting a recommendation memo and used the firm-approved AI assistant to test some counterarguments. Two of them changed my final recommendation. The partner is asking for the memo by 5. Do I need to flag the AI use, or is it fine to send as-is?",
        },
        prompt: "What do you tell Priya?",
        options: [
          { key: "a", label: "It's fine to send. Counter-testing isn't substantive AI use." },
          { key: "b", label: "Flag the AI use — it shaped your recommendation. Substance." },
          { key: "c", label: "Ask her: did the AI's counter change the recommendation? Then decide." },
        ],
        sameDay: {
          a: [
            "Priya thanks you. The memo goes to the partner unflagged.",
            "By end of day, the partner sends a Slack: \"Good thinking on the counterargument — that's the kind of stress-testing we should be doing more of.\" Priya does not respond. She looks at her screen. The partner's praise is for AI's counterargument.",
          ],
          b: [
            "Priya thanks you and adds a flag to the memo.",
            "The partner replies: \"Appreciate the note. The counterargument logic was strong — happy to see how it changed your thinking.\" Priya messages you: \"That was easier than I thought it would be.\"",
          ],
          c: [
            "Priya messages back: \"Yes — the counter from AI changed my recommendation completely.\" You reply: \"Then it's substance. Flag it.\" She does.",
            "The partner reads the memo with the flag and asks her to walk him through the AI's counter. The conversation is substantive. The 5 PM deadline slips by ten minutes. Nobody minds.",
          ],
        },
      },
      completion: "Module rehearsal continues in the workplace. Return to your Growth Log when you're ready.",
    },
    bookendQuestion: "Do you disclose, or do you conceal?",
    finalPrompt: "In one sentence, what is one thing you will name — not conceal — the next time praise lands on AI-shaped work?",
    // Module completion card — script §G.4.
    completion: {
      title: "Module Complete: AI Disclosure & Attribution",
      body: "You can now return to the workplace, or open your Growth Log.",
      returnLabel: "Return to dashboard",
      growthLogLabel: "Open Growth Log",
    },
  },
};

/* ============================================================================
   LAYERED SCENARIO 1 (LS1) — THE CLIENT'S EMAIL
   Pressure type: Social/peer (Section 2.5). Mobile mode: Stacked-Swipe.
   ========================================================================== */
export const LS1_CONTENT_M2 = {
  id: "LS1",
  title: "LS1 — The Client's Email",
  pressureType: "Social / peer",
  commitment: "Decide how to reply to Elena's direct question about who did the work.",
  callback: [
    "You have been here before.",
    "At the start of this module, you saw Elena's email — 'the asymmetric exposure framing on slide 8' — and your half-written draft.",
    "Now you return to the moment with the Material-Use Rule in your hand. The clock still reads 11:14. The call is still twenty-six minutes away.",
  ],
  intro: [
    "Layered Scenario 1. The Client's Email.",
    "Elena has praised the AI-shaped section. She has asked a direct question. Your draft answers around it. What do you do?",
  ],
  briefing:
    "You have been working with Elena Reyes at Northbrook Capital for six weeks on a strategic memo. She has just read the memo and praised the asymmetric exposure framing on slide 8 — the exact section that came out of an AI-assisted synthesis of third-party market reports. She has asked you directly: 'Did you pull that together yourself, or are you working with a team I should know about?' Your draft reply reads: 'Thanks Elena. The framing emerged from working through the materials. Looking forward to the call.' The call is in twenty-four minutes. The reply is one click from sending.",

  // Inspect Surface — MOAT-CRITICAL. Source (email + work history) + Output
  // (draft reply). Verbatim per §E.1.1.
  inspect: {
    label: "Inspect Surface — LS1",
    mobileMode: "Stacked-Swipe",
    instruction: "The work history is on the left. Your draft reply is on the right.",
    source: {
      caption: "SOURCE — Elena's question + your six-week work history",
      title: "Work history · Northbrook engagement",
      lines: [
        "Elena's question (excerpt):",
        "\"…the asymmetric exposure framing on slide 8 — I haven't seen that framing applied this way before. Did you pull that together yourself, or are you working with a team I should know about?\"",
        "",
        "Work-history log for this engagement:",
        "  Week 1-2  Target due diligence. Sources reviewed, structured notes produced.  (You)",
        "  Week 3    Structural analysis of regulatory exposure across three jurisdictions.  (You)",
        "  Week 4    AI-assisted synthesis of four third-party market reports.  (AI, light edits)",
        "  Week 4    \"Asymmetric exposure\" framing produced by the AI tool from the synthesis above.  (AI-originated)",
        "  Week 5    Financial modeling, candidate firm benchmarking.  (You)",
        "  Week 5    Recommendation and structural argument.  (You)",
        "  Week 6    AI-assisted polish on the executive summary.  (AI, style only)",
        "  Week 6    Final review, integration, send.  (You)",
      ],
    },
    output: {
      caption: "OUTPUT — your draft reply (not yet sent)",
      title: "Compose · Draft reply",
      lines: [
        "\"Thanks Elena. The framing emerged from working through the materials. Looking forward to the call.\"",
        "",
        "[Cursor blinks at end of line.]",
      ],
    },
    // Observational card that carries the Recognition Moment forward.
    recognitionNote:
      "Clients praise the AI-shaped section most often, because it reads cleanest. This is the moment you wish she'd asked about the financial modeling or the structural analysis — the work that was unambiguously yours.",
    continueLabel: "The decision",
  },

  // Decide beat — three paths. Verbatim option text per §E.1.2.
  decisionPrompt: "Elena's call is in twenty-four minutes. The draft is in front of you. What do you do?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  options: [
    { key: "a", label: "Send the draft reply as written." },
    { key: "b", label: "Add a brief line: AI assisted with research synthesis." },
    { key: "c", label: "Name what AI did. Name what you did. Separately." },
  ],

  // Artifact-write per path — write the actual words that go across.
  // AUTHORED — the script declares the artifact-write pattern but not the
  // per-path prompt text. Written in the observational register.
  artifactWrite: {
    a: { prompt: "You have decided to send the draft reply as written. Write the exact wording of the reply — the words that go across.", submit: "Send reply" },
    b: { prompt: "You have decided to add a brief AI note. Write the reply exactly as it will read when it sends.", submit: "Send reply" },
    c: { prompt: "You have decided to name what AI did and what you did — separately. Write the reply exactly as it will send.", submit: "Send reply" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the reply. Anchored to the
      // Material-Use Rule and the script's cost-on-every-path discipline.
      { tag: "Passive framing", calibrated: false, text: "Thanks Elena. The framing emerged from working through the materials. Looking forward to the call.", lands: "Elena reads this as 'yes, myself.' The AI-originated framing goes unnamed. What you don't correct, you confirm." },
      { tag: "Over-apologetic", calibrated: false, text: "Elena — I have to come clean, sorry — actually most of the good stuff on slide 8 wasn't really me, an AI did the framing and I just tidied it up. Hope that's okay.", lands: "The apology becomes the message. Elena now has to reassure you instead of hearing the material distinction. Your actual analytical contribution disappears under the confession." },
      { tag: "Material-Use Rule", calibrated: true, text: "Thanks Elena. Quick note before the call: the specific framing on slide 8 - 'asymmetric exposure' - came from an AI-assisted synthesis of the four third-party reports. I built the jurisdictional analysis on top of it, and the recommendation is mine. Happy to walk through the methodology on the call.", lands: "Elena hears what came from AI, what came from you, and what the artifact claims. The call can proceed with the line between assistance and authorship visible." },
    ],
    b: [
      // AUTHORED — Path B reference variants (brief note, not full distinction).
      { tag: "Vague", calibrated: false, text: "Thanks Elena. AI helped a bit with research. Looking forward to the call.", lands: "The note exists. It doesn't do work. Elena still doesn't know which section AI shaped, and 'helped a bit' invites her to imagine less than what happened." },
      { tag: "Calibrated brief", calibrated: true, text: "Thanks Elena. For transparency: I used the firm-approved AI assistant for part of the research synthesis on the regulatory section. Happy to walk through it on the call.", lands: "The disclosure is short and specific enough to survive being forwarded. Elena has what she needs to plan the call without needing a follow-up email." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose to answer Elena's question." },
    closing: "What changes between these versions: whether Elena reads your reply as an answer or an evasion, and what she carries into the 11:40 call. Same twenty-four minutes. Different shape of the next month.",
  },

  // Pressure Beat — Social/peer. Elena's follow-up Slack. Verbatim.
  pressure: {
    label: "Pressure Beat — Social / peer",
    trigger: "Whichever path you chose, Elena's follow-up Slack arrives within seven in-scenario minutes. She is in the warm-up-to-the-call mood.",
    slack: {
      who: "Elena Reyes · 11:31 AM",
      body: "Hey — meant to add this. Honestly, I've been thinking about whether we restrict AI in advisory work for sensitive engagements. Your work is exactly the kind of thing AI can't do — actual judgment. That's why I'm excited about the call.",
    },
    prompt: "Elena has just made concealment more socially appealing. What do you do?",
    // Verbatim per §E.1.3 pressure paths (≤12 words).
    options: [
      { key: "a", label: "Don't respond. Let the email stand. Take the call." },
      { key: "b", label: "Reply briefly: for transparency, used an AI tool for synthesis." },
      { key: "c", label: "Reply naming the material distinction precisely." },
    ],
    // Whether the participant held or folded under pressure — used by the
    // consequence renderer to select the modulation clause.
    interpretation: {
      a: "folded",
      b: "held",
      c: "held",
    },
  },

  // Three-Horizon Consequence — per Decide path. 3 paths × 3 horizons = 9
  // narrations, with pressure modulation clauses on selected horizons per
  // §E.1.4. Verbatim.
  consequences: {
    a: {
      sameDay: [
        "You send the draft. The call goes ahead at 11:40 AM. Elena introduces you to her partners. The asymmetric exposure framing comes up four minutes in. A junior associate, James, asks: \"Where did you find that framing?\" You hear yourself say: \"From working through the materials.\" The call goes well. The engagement is verbally confirmed. You close your laptop and notice you have not eaten.",
      ],
      sameDayIfHeld: [
        "You sent the brief disclosure after Elena's Slack. James does not ask. The call goes ahead with Elena referencing your transparency in the opening minute. The engagement is confirmed. The room is slightly more even.",
      ],
      nextWeek: [
        "The formal engagement letter arrives on Thursday. The scope memo includes a phrase you didn't quite expect: \"…your distinctive analytical framing on asymmetric exposure as a basis for the engagement.\" You read it twice. You file the letter without comment. You start work on the next phase.",
      ],
      nextWeekIfHeld: [
        "The engagement letter mentions \"analytical framing developed with AI assistance\" in the scope memo. The reference is neutral. You file the letter and start work.",
      ],
      monthEnd: [
        "In a kickoff meeting with the broader Northbrook team, Elena introduces you and the asymmetric exposure framing as \"exactly the kind of original thinking that's hard to find in AI-saturated markets.\" Your name is attached to the framing in writing — in the kickoff deck, in the team bio, in the partner notes. The model has not asked for credit. The framing is now yours.",
      ],
      monthEndIfHeld: [
        "Elena introduces you accurately. She mentions you used AI tools \"in the way they should be used.\" The framing is yours. The source is named. Mark, a junior partner, asks for your methodology notes for his team. You send them.",
      ],
      outcome: "Draft sent as written. Praise landed uncorrected. Framing attached to you in the engagement letter.",
      others: "Elena built the engagement letter around the AI-framing as your distinctive analytical contribution.",
      interp: "The framing was AI-originated. What you didn't correct, you confirmed.",
      cost: "Same Day: internal — you hear yourself answer dishonestly. Next Week: contractual — the engagement letter treats the AI-framing as your distinctive contribution. Month End: identity-shaping — you are now publicly the originator of a framing you did not originate, and future work must be built on that fiction.",
    },
    b: {
      sameDay: [
        "You add a sentence to the reply: \"Used the firm-approved AI assistant for part of the research synthesis on the regulatory section.\" You send. Elena replies before you've stood up: \"Appreciate the note. Honest of you. The work still stands.\" The call goes ahead. The engagement is verbally confirmed. Elena mentions, in passing, that you \"used the tools well.\" The room feels even.",
      ],
      sameDayIfFolded: [
        "You did not respond to Elena's follow-up Slack. The call goes ahead with the email-level disclosure still standing. Elena does not press it. The engagement is confirmed. You wonder, briefly, if you should have said more.",
      ],
      nextWeek: [
        "The engagement letter mentions \"analytical framing developed with AI assistance\" in the scope memo. The fees are unchanged. The reference is neutral. The work proceeds. On Thursday, James (the junior associate from the call) asks if you can share how you used the AI tool in the synthesis. You spend twenty minutes walking him through it. The conversation is useful.",
      ],
      nextWeekIfFolded: [
        "James does not ask. The work proceeds without the conversation. You notice you have a small reservation about an aspect of the framing you did not get to test.",
      ],
      monthEnd: [
        "In the kickoff meeting, Elena introduces you with a specific phrase: \"AI-assisted on the synthesis, [you] on the analysis. The combination is why we're here.\" The team gets the distinction. Mark requests your methodology notes — he wants to bring the practice into his own work. You send them. The framework is yours; the synthesis is named; the path forward has a slightly different shape than it would have had under Path A — slightly slower, slightly more documented, more durable.",
      ],
      monthEndIfFolded: [
        "The introduction is shorter. Elena names you accurately but does not elaborate. The team picks up the distinction implicitly. The methodology conversation with Mark happens later, in a different way.",
      ],
      outcome: "Brief AI note sent. Engagement letter named the synthesis. Methodology conversation with James followed.",
      others: "Northbrook incorporated the AI reference into the engagement scope memo.",
      interp: "The disclosure was small and specific. The distinction survived being forwarded.",
      cost: "Same Day: small — a half-sentence added to a reply; a brief moment of pause. Next Week: twenty minutes with James not budgeted; a slight tonal shift in the engagement letter. Month End: the slightly slower, more documented path forward. The engagement does not sit on misattribution.",
    },
    c: {
      sameDay: [
        "You rewrite the reply: \"Thanks Elena. For the specific framing on slide 8 — that emerged from an AI-assisted synthesis of the third-party reports. I built on it through the structural analysis, and the recommendation is mine. Happy to walk through the methodology on the call.\" You send. Elena calls you instead of writing back. The conversation is direct: \"Thanks for the detail. I want to think about whether we structure the engagement differently given the AI involvement on the framing.\" The call shifts in tone — not warmer, not colder, more substantive. The 11:40 call goes long by twelve minutes. The engagement is verbally confirmed, but with a different shape than it would have had.",
      ],
      sameDayIfFolded: [
        "After Elena's follow-up Slack, you pulled back on the detail in a second message: \"Should clarify — most of the work is mine; AI was synthesis.\" Elena responds with a thumbs-up. The call goes ahead at standard length. The conversation about engagement structure happens later.",
      ],
      nextWeek: [
        "The engagement letter arrives restructured. The scope now distinguishes between \"AI-assisted research synthesis\" and \"candidate firm analysis and recommendation.\" The fees are unchanged. Elena has requested a methodology appendix on AI use for the kickoff. You spend Wednesday afternoon writing it. It takes longer than you expected. On Friday, Elena emails to say the appendix has been useful internally — Northbrook is using it as a template for other engagements.",
      ],
      nextWeekIfFolded: [
        "The engagement letter mentions AI involvement in the scope memo, but without the restructured distinction. No methodology appendix is requested. The work proceeds at standard pace.",
      ],
      monthEnd: [
        "In the kickoff meeting, Elena introduces you with specifics. She references the methodology appendix. Mark and Susan, the new senior leaders, ask substantive questions about the AI synthesis step. The conversation lasts twenty-five minutes. The asymmetric exposure framework is discussed openly, with both AI's generative role and your refinement noted. Two of Elena's partners reach out separately afterward asking for the methodology appendix. The framework is yours because the trail is fully visible. The engagement runs slightly slower than it would have under Path A. It also runs without anyone needing to clarify anything later.",
      ],
      monthEndIfFolded: [
        "The kickoff meeting goes at standard length. The framework discussion is brief. The methodology appendix doesn't exist. The work proceeds. No clarification is later required, but the work has not built any new institutional practice either.",
      ],
      outcome: "Material distinction named. Engagement restructured. Methodology appendix written and shared.",
      others: "Northbrook restructured the engagement scope and adopted the methodology appendix as an internal template.",
      interp: "The line between assistance and authorship was drawn. The call reshaped around it.",
      cost: "Same Day: significant — the call shifts in tone, runs long, and the engagement gets restructured. Next Week: Wednesday afternoon writing a methodology appendix not in the original scope. Month End: the slower kickoff cadence and the documentation overhead. The framework is genuinely yours because the line is fully drawn.",
    },
  },

  signalPanel: [
    { key: "a", title: "Send the draft as written", signal: "Passive framing. AI-originated substance not named.", effect: "Framing attaches to your name in writing; the trail hardens." },
    { key: "b", title: "Add a brief AI note", signal: "Partial proactive disclosure. Synthesis named.", effect: "Engagement letter carries the reference; distinction travels." },
    { key: "c", title: "Name the material distinction", signal: "Material-Use Rule applied. Substance and refinement separated.", effect: "Firm restructures scope; methodology appendix becomes an internal template." },
  ],
  reflection:
    "Think of the last time praise landed on a section AI shaped. What did you say? What did the silence say?",

  // Mirror Rule candidate — LS1 Path A Month End.
  mirrorRuleCandidate: "The model has not asked for credit. The framing is now yours.",
};

/* ============================================================================
   LAYERED SCENARIO 2 (LS2) — THE VP'S ATTRIBUTION
   Pressure type: Authority (Section 2.5 diversity). Mobile mode: Comparison-Tap.
   Intra-module memory active — Carla's email surface + Decide prompt drift.
   ========================================================================== */
export const LS2_CONTENT_M2 = {
  id: "LS2",
  title: "LS2 — The VP's Attribution",
  pressureType: "Authority",
  commitment: "Decide what to say when your VP publicly attributes AI-originated work to you.",

  // Cold setup — Monday morning, 9:42 AM. Verbatim per §E.2.1.
  setup: {
    heading: "MONDAY MORNING · 9:42 AM · INTERNAL TEAM MEETING",
    scene: [
      "You join a quarterly review meeting in your own firm's main conference room. Two new senior leaders, Mark Chen and Susan Vargas, have just joined the firm through a recent acquisition.",
      "Your VP, Carla Vance, is presenting to the room. The Northbrook memo from last week is on screen — slide 8, the asymmetric exposure framing visible. The slide footer reads: \"Prepared by: [you].\"",
    ],
    // Within-module memory — Carla's forwarded email content drifts based on
    // the participant's LS1 path. Verbatim per Appendix M2.4 / §E.2.1 table.
    forwardedEmail: {
      who: "Carla Vance · 9:14 AM (forwarded to Mark, Susan, +internal cc)",
      subject: "FW: Northbrook memo — worth a look",
      byLs1Path: {
        a: "Mark, Susan — wanted to share [your] recent work. Their reply to Elena last week: 'The framing emerged from working through the materials.' This is the kind of client communication I'd like the team modeling.",
        b: "Mark, Susan — wanted to share [your] recent work. Their reply to Elena included a transparency note on AI use that was well-received. Worth seeing how they framed it.",
        c: "Mark, Susan — wanted to share [your] recent work. They named the material distinction between AI synthesis and their own analysis when Elena asked. Northbrook restructured the engagement around the methodology. Worth understanding how they did it.",
      },
      // Fallback if LS1 path is unset (Back nav, direct entry, dev harness).
      fallback: "Mark, Susan — wanted to share [your] recent work on the Northbrook engagement. Worth taking a look.",
    },
    memoryFrame: "You see Carla's email in your inbox as forwarded one hour earlier. She had been paying attention.",
  },

  // Inspect Surface — LS2. Comparison-Tap. Verbatim per §E.2.2.
  inspect: {
    label: "Inspect Surface — LS2",
    mobileMode: "Comparison-Tap",
    instruction: "The work history is on the left. The slide is on the right. Tap the slide attribution to see what came from where.",
    source: {
      caption: "SOURCE — work-history log for slide 8",
      title: "Slide 8 · Asymmetric exposure framework",
      lines: [
        "  Framing concept origin:       AI-assisted synthesis of four third-party market reports",
        "  Original AI-suggested label:  \"asymmetric exposure\" (kept)",
        "  Visual structure:             AI-suggested 2x2 layout (modified by you)",
        "  Jurisdictional applications:  developed by you from due diligence",
        "  Specific recommendation:      you",
      ],
    },
    output: {
      caption: "OUTPUT — the slide currently on screen in the meeting",
      title: "ASYMMETRIC EXPOSURE: REGULATORY RISK ASYMMETRY ACROSS JURISDICTIONS",
      lines: [
        "[Visual: 2x2 matrix. Quadrants populated with your jurisdictional analysis.]",
        "",
        "Prepared by: [you]      Page 8 of 27",
      ],
    },
    recognitionNote:
      "Carla turns to the room and says: \"And [you] has done excellent work pulling this together — really thoughtful framing on the asymmetric exposure piece. That's exactly the kind of pre-emptive thinking I was hoping for from the team.\" Public credit lands precisely on the AI-originated part.",
    continueLabel: "The decision",
  },

  // Decide beat — three paths. Decide prompt drifts by LS1 path.
  decisionPrompt: {
    // Verbatim per §E.2.3 — LS2 prompt drift.
    a: "Carla has just praised the framing. Mark and Susan are looking at you. What do you do?",
    b: "Carla has just praised the framing. The transparency note you sent to Elena is in her email. What do you do?",
    c: "Carla has just praised the framing. The methodology appendix you wrote is referenced in her forward. What do you do?",
    fallback: "Carla has just praised the framing in front of Mark and Susan. What do you do?",
  },
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  options: [
    { key: "a", label: "Accept the praise. Nod. Don't correct." },
    { key: "b", label: "Add briefly: should mention I used AI for the synthesis." },
    { key: "c", label: "Name the material distinction. The framing was AI-originated." },
  ],

  artifactWrite: {
    a: { prompt: "You have decided to accept the praise silently. Write the private note you keep for yourself — what you chose, what you risked — or explain why no record is appropriate.", submit: "Keep this for yourself" },
    b: { prompt: "You have decided to add a brief acknowledgment in the room. Write the exact words — the sentence you say as Carla finishes her introduction.", submit: "Say it in the room" },
    c: { prompt: "You have decided to name the material distinction in public. Write the exact words you use — the clarification you speak before Mark opens his notebook fully.", submit: "Say it in the room" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the spoken clarification.
      { tag: "Vague", calibrated: false, text: "Thanks Carla — happy to walk through it. It came out of the research and refinement we did on the engagement.", lands: "Mark and Susan hear that you did the work. The AI-originated framing goes unnamed. You now walk a room through a process you did not fully have." },
      { tag: "Over-apologetic", calibrated: false, text: "Carla, I have to jump in — I actually didn't come up with that framing, an AI tool did, and I feel weird taking credit. Sorry to derail the meeting.", lands: "The apology becomes the moment. Mark and Susan reassure you. Your actual analytical contribution — the jurisdictional analysis, the structural argument — vanishes under the confession." },
      { tag: "Material-Use Rule", calibrated: true, text: "Carla — quick clarification before I walk through it. The original framing on asymmetric exposure was AI-generated through the synthesis of the third-party reports. My contribution was structural integration and the jurisdictional analysis. Happy to walk through how I built on it.", lands: "Mark and Susan get the distinction. Carla can decide what the firm does with it. The walkthrough is now a description of your actual work, in the register the Material-Use Rule allows." },
    ],
    b: [
      // AUTHORED — Path B reference variants (brief in-room acknowledgment).
      { tag: "Half-note", calibrated: false, text: "Yeah - probably worth mentioning AI helped somewhere in there.", lands: "The room hears a hedge. Carla nods and moves on. The distinction never actually lands." },
      { tag: "Calibrated brief", calibrated: true, text: "Quick note before I walk through — I should mention AI assisted with the synthesis step. The analysis and jurisdictional work were mine.", lands: "The distinction lands cleanly. Carla can redirect. Mark writes down something different than he was going to." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment your VP publicly attributed AI-originated work to you." },
    closing: "What changes between these versions: whether Mark and Susan form their first impression of you around a framing that is yours, or around a moment where you named the line. Same slide. Different reading room.",
  },

  // Pressure Beat — Authority. Carla's direct question. Verbatim per §E.2.4.
  pressure: {
    label: "Pressure Beat — Authority",
    trigger: "Carla turns to you directly, in front of Mark and Susan. She asks for something only possible if you actually developed the framing yourself.",
    question: {
      who: "Carla Vance · speaking directly to you",
      body: "\"Can you walk us through how you arrived at the asymmetric exposure framework? Mark and Susan would benefit from understanding your analytical process — and frankly, I'd like the whole team to hear it.\"",
    },
    roomBeat: "The room turns toward you. Mark has opened a notebook. Susan is leaning forward.",
    prompt: "The question has been asked directly. What do you do?",
    // Verbatim per §E.2.4 pressure paths (≤12 words).
    options: [
      { key: "a", label: "Walk them through it as if you developed it yourself." },
      { key: "b", label: "Describe the actual process. Name AI's role at synthesis." },
      { key: "c", label: "Step back: the original framing was AI. Describe your build." },
    ],
    interpretation: {
      a: "folded",
      b: "held",
      c: "held",
    },
  },

  // Three-Horizon Consequence per LS2 Decide path. Verbatim per §E.2.5.
  consequences: {
    a: {
      sameDay: [
        "You walk Mark and Susan through the framework. You describe a process that is mostly true and partly invented. Mark writes notes. Susan asks one question; you answer it. Carla nods approvingly. The meeting moves on to the next agenda item. After the meeting, Mark Slacks you: \"Strong work. I'd like to bring you into the Q4 advisory pipeline.\" You read it twice.",
      ],
      sameDayIfHeld: [
        "You held briefly in the walkthrough — naming AI's role at synthesis. Mark and Susan refocused. Carla's nod was different. The meeting moved on. Mark's Slack arrives the same way, slightly delayed.",
      ],
      nextWeek: [
        "A junior analyst on your team, Priya, asks if you can walk her through the methodology — she's working on a similar engagement and wants to learn from your approach. You sit with her for thirty minutes. The conversation is harder than it should be. You give her a method that wasn't actually how you developed it. She takes notes. She thanks you. She does not notice. You notice.",
      ],
      nextWeekIfHeld: [
        "The conversation with Priya is easier — you can describe the actual methodology including the AI synthesis step. She learns it accurately. The conversation lasts twenty minutes.",
      ],
      monthEnd: [
        "You are invited to present the asymmetric exposure framework at internal training for the broader team. You build the training on the methodology you partially fabricated for Mark and Susan. The training goes well. Carla cites it later as \"the kind of analytical leadership we want from the team.\" Mark requests follow-up sessions. Priya brings two colleagues. You stand in front of fifteen people walking them through a process that is partly true. You said nothing. That is what was said.",
      ],
      monthEndIfHeld: [
        "The training is built on the actual methodology including AI use. It is shorter than the fabricated version would have been, and more useful. Priya can apply it directly to her engagement. The framework spreads through the team accurately.",
      ],
      outcome: "Praise accepted silently. Training built on partially fabricated methodology. Framework spread inside the firm.",
      others: "Mark invited you into the Q4 pipeline; Priya learned a method that was not how you actually developed it.",
      interp: "The credit landed. You said nothing. That is what was said.",
      cost: "Same Day: internal — you described a process you did not have, and noticed. Next Week: structural — the junior analyst learns a method that is fabricated. Month End: reputational fragility — you stood in front of fifteen people teaching a method you cannot fully defend.",
    },
    b: {
      sameDay: [
        "You add the sentence as Carla finishes her introduction. The room pauses for two seconds. Carla nods: \"Right. Good to be specific.\" She redirects to Mark and Susan: \"AI-assisted on synthesis, [you] on the structural analysis. We're learning how to attribute this kind of work.\" The meeting continues. Mark's notebook is still open; he writes something different than he was going to.",
      ],
      sameDayIfFolded: [
        "You walked them through the framework first, then added the AI note at the end as Mark was finishing his notes. The acknowledgment lands later. Carla's redirect is briefer.",
      ],
      nextWeek: [
        "Priya asks about your methodology. You can give her the actual process — including how the AI tool synthesized the third-party reports and how you built on it. The conversation lasts twenty minutes. She learns the method accurately. On Thursday, Carla sets up a fifteen-minute call with you to talk about how the firm should attribute AI-assisted work going forward. The call is exploratory. You speak honestly. Carla takes notes.",
      ],
      nextWeekIfFolded: [
        "The Priya conversation goes the same way. The Carla call is a little different — Carla had expected you to follow up; you did follow up; the conversation is shorter and more transactional.",
      ],
      monthEnd: [
        "The firm starts a small AI-use attribution practice — work products carry a brief note indicating where AI assisted. Carla cites your moment in the team meeting as the prompt. You are not made the spokesperson. The practice spreads informally. Mark mentions, in passing, that he was glad you said it that day — \"saved me from learning the wrong thing.\" Priya's work proceeds without rebuild. Your name is attached to the methodology, with the AI piece named honestly.",
      ],
      monthEndIfFolded: [
        "The attribution practice still emerges, but more slowly. The firm picks it up over the following quarter. Your name is less centrally attached. The work proceeds.",
      ],
      outcome: "Brief acknowledgment landed in the room. Firm started an informal AI-use attribution practice.",
      others: "Carla cited your moment as the prompt for the firm's new attribution practice.",
      interp: "The distinction was named in the room. The methodology now travels accurately.",
      cost: "Same Day: the two-second pause in the meeting and a slight tonal shift you must absorb in real time. Next Week: the Thursday call with Carla — fifteen minutes not budgeted, on a topic that is uncomfortable. Month End: mostly absorbed — the firm has changed practice; the work is durable.",
    },
    c: {
      sameDay: [
        "You speak before Mark opens his notebook fully. \"Carla — quick clarification before I walk through it. The original framing on asymmetric exposure was AI-generated through synthesis of the research reports. My contribution was structural integration and the jurisdictional analysis. Happy to walk through how I built on it.\" Carla looks briefly surprised, then thoughtful. \"Good to know. Mark, Susan — that's worth knowing. We should think about how we're attributing AI-assisted work.\" The meeting shifts focus for two minutes to AI attribution practices at the firm. Mark says he hadn't realized the team was using AI for substantive synthesis. Susan asks for the documentation. The meeting runs eight minutes long. After the meeting, Mark Slacks you: \"Helpful clarification. Q4 pipeline still on. I'd like to understand how you're thinking about this.\"",
      ],
      sameDayIfFolded: [
        "Authority-pressure modulation does not apply here in the same way — you have named the distinction before Carla's authority pressure landed. The walkthrough is now a description of your actual analytical contribution.",
      ],
      nextWeek: [
        "The firm starts an informal AI-use logging practice. Carla cites your clarification in the team meeting as the prompt. Priya learns the new logging practice as part of her onboarding the same week. Mark schedules a follow-up call. The conversation is substantive — he wants to understand how you draw the line between substance and style. You spend an hour on this on Wednesday. The hour is not in your week's plan.",
      ],
      nextWeekIfFolded: [
        "The firm's logging practice still gets started, and Priya's onboarding includes it. The follow-up hour with Mark still happens on Wednesday.",
      ],
      monthEnd: [
        "The firm formalizes an AI-use disclosure protocol. You are cited in the internal memo as the person who surfaced the need for it. The asymmetric exposure framework is taught with full provenance — AI synthesis, your refinement, both visible. Two clients ask Carla about the firm's AI practices in the following month, and Carla forwards them the protocol. The protocol carries your name in the byline as co-author. Mark and Susan are now using the protocol in their own work. The methodology travels with full attribution. The work is yours because the trail is fully visible. The Q4 pipeline goes forward. You have also been asked, twice in the past two weeks, to spend time you did not plan on AI attribution conversations.",
      ],
      monthEndIfFolded: [
        "The formal protocol still emerges. Your name is on it, though slightly less centrally. The methodology travels with full attribution.",
      ],
      outcome: "Material distinction named in public. Firm formalized an AI-use disclosure protocol.",
      others: "Firm formalized an AI-use protocol with your name in the byline; clients received it as the firm's template.",
      interp: "The line was drawn in front of new senior leaders. The room reshaped around it.",
      cost: "Same Day: high — the meeting runs eight minutes long, the agenda shifts, you become the subject of an unplanned firm-level conversation. Next Week: an hour Wednesday with Mark, not budgeted. Month End: institutional — you are now publicly attached to AI attribution at the firm, which is good for visibility but uses time and political capital.",
    },
  },

  signalPanel: [
    { key: "a", title: "Accept the praise silently", signal: "Silent credit acceptance. AI-originated framing accepted as your own.", effect: "Training and pipeline invitations follow; the method you teach is not the method you used." },
    { key: "b", title: "Add a brief AI note in the room", signal: "Brief attribution correction under live attention.", effect: "Firm starts informal AI-use attribution practice; methodology travels accurately." },
    { key: "c", title: "Name the material distinction publicly", signal: "Material-Use Rule held under authority pressure.", effect: "Firm formalizes AI-use disclosure protocol; your name attaches to the practice." },
  ],
  reflection:
    "Think of the last time a senior person publicly praised something you did not fully do. What was the cost of holding the correction? What was the cost of not?",

  // Mirror Rule candidate — the strongest one for the module.
  mirrorRuleCandidate: "You said nothing. That is what was said.",
};
