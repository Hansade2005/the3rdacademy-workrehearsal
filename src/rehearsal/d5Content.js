/* ============================================================================
   D5 CONTENT — DRAFT SHELL
   Module identity (id, title, central_question, framework label + body) is
   accurate per scripts/D5_..._Production_Build_Reference. Scenario titles
   and segment shapes are also accurate. The narration paragraph BODIES and
   per-scenario consequence chains are D3 content placeholders pending a
   per-screen content swap. Tony can navigate the architecture; content
   fidelity comes in the next iteration.
   ========================================================================== */

/* ============================================================================
   D3 CONTENT LAYER — Execution Reliability
   Production reference rev0 (May 2026). Mirrors the D1 schema shape so the
   engine renders D3 unchanged. Where the script specifies a pattern but not
   the exact word (e.g. reference variants for some artifact-writes), authored
   copy is FLAGGED with an AUTHORED comment in the observational register.
   ========================================================================== */

export const D5_CONTENT = {
  module: {
    id: "D5",
    title: "Collaboration & Conflict Resolution",
    tier: "Foundational",
    // SCHEMA FIELD: module.sector_variants[]
    // MVP defaults to Technology/Software. Government/Public Service and
    // Construction/Engineering unlock post-MVP (declared but not specified).
    sector_variants: ["Technology/Software"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Technology/Software workplace context. The same context applies across all four scenarios.",
      pickerHint: "The context you choose here applies across all four scenarios.",
    },
  },
  dimension: {
    id: "D5",
    name: "Collaboration & Conflict Resolution",
    central_question:
      "When working with others gets difficult, do you make progress easier or harder?",
    framework: { label: "The Alignment Method", body: "Hear the Position → Name the Shared Interest → Build the Bridge → Protect the Working Bond" },
  },
  // Threading state model per the script's locked declaration (rev0 §1.4.D).
  threading_state_model: "reliability_pattern",
  // Cross-module memory contract — D3 consumes D2's final personal sentence.
  prior_module_references: ["D2"],

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    coldOpen: {
      // Beat 1 — D2 callback. For MVP the personalised variant is unavailable
      // at runtime (no cross-session persistence yet); we render the fallback
      // text as the live narration and label it as a callback.
      d2Callback: {
        wrapperLead: "Last time you carried something out of this lab. You wrote:",
        // The participant's prior D2 final personal sentence will replace this
        // wrapper line at runtime when cross-module memory is wired up.
        sentenceSlot: "{{prior.D2.final_personal_sentence}}",
        wrapperTail: "That sentence still belongs to you. Today we are looking at the next layer — not what you do when something slips, but whether people can count on you in the first place.",
        // FALLBACK — used when D2 was not completed in this session.
        fallback: "This module can stand alone, but it connects more deeply after D1 and D2. We are going to ask you to live a moment now — a moment where what you commit to matters.",
      },
      // Beat 2 — the D3 cold open arc. Rendered as the main cold-open narration.
      narration: [
        "It is 8:47 Wednesday morning.",
        "You promised a colleague yesterday that you would send them the revised budget breakdown “first thing this morning.” First thing this morning. You said those words. They wrote them in their calendar. They blocked 9:00 to 9:30 to review it before their 9:45 with the finance director.",
        "You have not started the revision. You have not opened the file.",
        "You have one new message in your inbox from them, sent four minutes ago:",
        "“Heads up — I’m prepping for finance. When can I expect the breakdown?”",
        "Four options. Each one is real. Each one plays out across today, this week, this month. Choose the one closest to what you would actually do.",
      ],
      options: [
        { key: "a", label: "Reply now with honesty: “I haven’t started it yet. I can have it to you by 10:30 — after your finance meeting. Apologies for the slip; I should have flagged earlier.” Then start the work." },
        { key: "b", label: "Send a deflection: “Just finishing up — will be with you in 20 minutes.” Then frantically start. Hope to land it before their meeting." },
        { key: "c", label: "Reply vaguely: “Working on it — will send soon.” No specific time. Buy yourself room." },
        { key: "d", label: "Skip the reply. Start the work. Send when done with no acknowledgement of the slip. Frame it as if the timing was fine." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk?",
      sameDay: {
        a: [
          "They reply within a minute: “Appreciated. Honest is better than late and silent.”",
          "They re-arrange their morning. The 10:30 lands. The finance director sees the breakdown by 11:00. No drama.",
        ],
        b: [
          "You don’t finish in 20 minutes. You finish in 50. By 9:37 it is done. By 9:38 they have already walked into their finance meeting without it.",
          "They reply at 11:10: “Thanks. Got me too late.”",
        ],
        c: [
          "They reply: “OK — by when, roughly?” You don’t answer.",
          "They walk into their finance meeting at 9:45 without the breakdown. They improvise. It is fine. But they noticed.",
        ],
        d: [
          "You finish at 9:55 and send.",
          "They reply at 11:20: “Got it. FYI, I’d already gone in without it.” That’s all they say. The note is filed without being filed.",
        ],
      },
    },
    // Safety floor — Development vs Evidence LOCKED LANGUAGE per script §1.4.
    safetyFloor: {
      card: [
        "THIS IS PRACTICE AND DEVELOPMENT.",
        "Nothing you do here becomes part of your behavioural documentation.",
        "Your Growth Log captures what you practised and how you engaged — it is your private development record.",
        "Your Skill Passport — if you want documented evidence — is earned through the separate observation pathway. Development is what you do here. Evidence is what the observation pathway produces.",
        "What you just experienced was one moment, with four paths, and four outcomes. None of those outcomes are rated. They are observed.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    intro: [
      "Before we go further, a quick read.",
      "What you are about to see is not a rulebook. It is a field guide — a description of what reliability looks like under workplace pressure, and how it quietly breaks down when no one says anything.",
      "The scenarios you will face later are built on what is in this guide. Read it carefully.",
    ],
    fieldGuide: {
      meaning: {
        title: "WHAT RELIABILITY MEANS AT WORK",
        body: [
          // AUTHORED — meaning paragraph (script does not name a B-meaning paragraph for D3; written in the same observational register as D1's "meaning" block to keep schema parity).
          "Reliability at work is what other people can count on. It shows up in whether your deadlines hold, whether your handoffs close cleanly, and whether the small commitments you make in passing get treated as commitments.",
          "At the foundational level, this dimension is about whether the pattern is dependable across many small moments — not whether you came through once under pressure.",
        ],
      },
      present: {
        title: "WHAT RELIABILITY LOOKS LIKE UNDER WORKPLACE PRESSURE",
        intro: "The ten things that show reliability is present:",
        items: [
          { h: "Deadline integrity.", t: "Commitments meet stated time." },
          { h: "Quality consistency.", t: "Deliverables meet stated standard." },
          { h: "Scope clarity.", t: "Deliverables match agreed scope." },
          { h: "Proactive communication.", t: "Risks flagged before they land." },
          { h: "Milestone discipline.", t: "Internal checkpoints before external deadlines." },
          { h: "Handoff completeness.", t: "Receivers get what they need without follow-up." },
          { h: "Small-deadline reliability.", t: "Fifteen-minute, one-hour, and end-of-day commitments treated as commitments." },
          { h: "Commitment tracking.", t: "Promises made in conversation are written down." },
          { h: "Priority management.", t: "Competing demands triaged transparently." },
          { h: "Pattern awareness.", t: "Noticing your own reliability trajectory." },
        ],
      },
      breakdown: {
        title: "HOW RELIABILITY QUIETLY BREAKS DOWN",
        intro: "The eight things that show reliability is breaking down:",
        items: [
          { h: "Silent slippage.", t: "Small deadlines drift; nobody says anything." },
          { h: "Quality inconsistency.", t: "Structure prioritised over substance; gaps unannounced." },
          { h: "Silent deprioritisation.", t: "Commitments dropped without flagging." },
          { h: "Optimism trap.", t: "Estimates assume best-case; no buffer." },
          { h: "Verbal-only commitments.", t: "Promises made in conversation, never logged." },
          { h: "Handoff degradation.", t: "Work arrives but the receiver still has questions." },
          { h: "External-cause framing.", t: "Slips blamed on conditions, not on the pattern underneath." },
          { h: "Pattern blindness.", t: "Not noticing the rhythm of your own slips." },
        ],
      },
      end: {
        title: "WHERE THIS DIMENSION ENDS",
        body: [
          // AUTHORED — boundary paragraph (script doesn't include an explicit D3 boundary block; mirrors D1's pattern naming the adjacent dimension and tier interaction).
          "Reliability governs whether the work and the commitment hold over time. Accountability (D2) governs how you respond after something slips. If the question is whether the commitment will be honoured in the first place, that is reliability. If the question is what you do once a commitment has already slipped, that is accountability.",
          "The Foundational tier holds the reliability question to small-deadline rhythm — the layer where most patterns are formed. The Intermediate tier covers reliability under conflicting authority and unstable scope.",
        ],
      },
    },
    reflectionPrompt:
      "Before we go any further — take 60 seconds. Think about the last working week. Were there small deadlines you didn’t fully honour? Quick replies you promised and let drift? The smallest commitments are where reliability is most often lost. We are not asking you to confess. We are asking you to notice.",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    c1: {
      title: "C1 — The Difference Between Busy and Reliable",
      narration: [
        "Look back at the message you wrote a few minutes ago. Whether you chose the calibrated reply, the deflection, or the silence — you made a choice about whether to make your unreliability visible. That choice is the entire dimension.",
        "Reliability is not what you intend. Reliability is what others can count on.",
        "There is a difference between busy people and reliable people. Busy people produce a lot of activity. Reliable people produce a lot of certainty for the people who depend on them. The colleague waiting on the budget breakdown this morning doesn’t care how busy you are. They care whether they can plan their next two hours around what you said you would do.",
        "Three small signals separate the two:",
      ],
      // Re-using D1's "signals" shape so the renderer's C1 card lands unchanged.
      signals: [
        { n: "i", h: "Deadlines kept exactly as committed.", t: "Not approximately. The 10:30 means 10:30 — and if it cannot, the renegotiation happens before, not after." },
        { n: "ii", h: "Quality flagged when it cannot be met.", t: "Not concealed. When two sections are thinner than usual, the receiver hears about the gap from you, not from the document." },
        { n: "iii", h: "Handoffs that close cleanly.", t: "Not left for the receiver to chase. A handoff is complete when the next person can move without coming back for context." },
      ],
      close:
        "Notice — none of those signals are about effort. They are about predictability.",
      // AUTHORED — C1 reflection prompt (script does not specify a C1 reflection; mirrors D1's C1 prompt cadence so the engine's C1 reflection screen has copy).
      prompt: "Think of a person at work, school, or in any professional context who you would describe as reliable. Not “busy.” Reliable. What signal did they give that others didn’t?",
    },
    c2: {
      title: "C2 — The Small-Deadline Trap",
      narration: [
        "Most people think reliability fails at the big deadlines. It doesn’t. Big deadlines have visibility, escalation paths, and second chances. Reliability fails at the small ones.",
        "The 20-minute task you said you’d finish before lunch. The “I’ll send it over by end of day” that becomes tomorrow morning. The Slack reply you promised in an hour that lands the next day.",
        "Each one is individually justifiable. Together, they form a pattern that other people can see — even when you cannot.",
        "That is why D3 introduces something new in the scenario lab ahead: the Reliability Ledger. It tracks your decisions across the four scenarios. After each one, you see a row added.",
      ],
      // The equation block for D3 is the Ledger Preview — a "what's coming"
      // card structurally identical to D1's equation card, so the engine
      // renders it via the same ClickToReveal hook.
      equation: {
        title: "COMING NEXT — THE RELIABILITY LEDGER",
        rows: [
          { k: "Scenario", v: "which decision you are inside" },
          { k: "Commitment", v: "what you said you would do" },
          { k: "Outcome", v: "what actually happened" },
          { k: "Others’ Adjustment", v: "what the people around you did differently as a result" },
        ],
        footer: "It is not a score. It is a mirror. The same mirror other people use without telling you.",
      },
      delayed: [
        "Scenario. Commitment. Outcome. Others’ adjustment. By the time you finish, you will have a four-row picture of your own pattern.",
        "It is not a score. It is not a grade. It is a mirror.",
        "The same mirror other people use without telling you.",
      ],
      closing: [
        // AUTHORED — closing pivot to the three-horizon arc, in the script's register.
        "In every scenario ahead, the consequences play out across three time horizons: same day, next week, and month end. Reliability failures are invisible on day one. They become visible by week four.",
        "Watch where the cost lands.",
      ],
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question.",
        echo: "Can people count on you — not once, but every time?",
        // AUTHORED — closing line in the script's observational register, mirroring D1's C2 cadence to preserve the engine's central-question-return beat.
        closing: "Now you know the tension this module is built on. The single delivered commitment is unremarkable. The pattern of delivered commitments under varying pressure — that is the entire dimension.",
      },
      // AUTHORED — C2 reflective decision prompt (script doesn't specify a C2 decision; structured like D1's C2 four-option recognition so the engine's c2_2 screen has working content).
      prompt: "In your experience, what is the small commitment most likely to slip during a busy week?",
      options: [
        { key: "a", label: "The Slack reply you promised within the hour." },
        { key: "b", label: "The 20-minute task you said you’d finish before lunch." },
        { key: "c", label: "The “end of day” summary that becomes tomorrow morning." },
        { key: "d", label: "The verbal commitment made in a hallway conversation that never gets calendared." },
      ],
      justificationPrompt: "Why this one? What is it about this particular kind of commitment that lets it slip?",
    },
    c3: {
      title: "C3 — The Reliability System: Naming What You Already Lived",
      open:
        "This is The Reliability System. Four components. You have already lived their absence today — there was no Scope Lock on the verbal commitment, no Milestone Architecture for the budget breakdown, no Risk Radar for forgetting about it, and no Handoff Protocol for the message you did or didn’t send.",
      framework: "The Reliability System",
      steps: [
        { name: "Scope Lock.", body: "Before you commit, define exactly what “done” looks like. Not approximately. Exactly. If you cannot describe the deliverable in one sentence, you have not locked scope. The budget breakdown this morning — was the scope ever locked? Did you and the colleague agree on what “first thing this morning” actually meant?" },
        { name: "Milestone Architecture.", body: "Break delivery into checkpoints with their own deadlines. If a deliverable is due Friday, your internal milestones are Monday, Wednesday, Thursday. The external deadline is the safety net, not the target." },
        { name: "Risk Radar.", body: "Before you start, name the three things most likely to go wrong. For each, decide now what you will do if it happens. The time to plan for failure is before you begin, not when you are already behind." },
        { name: "Handoff Protocol.", body: "Define how the completed work reaches the next person. What context might they be missing? What format do they need? A handoff is not the end of your work — it is the start of theirs." },
      ],
      close: [
        "Four components. Not a theory. A checklist that works.",
        "You will see all four tested in the scenarios ahead. After each scenario, the Reliability Ledger will show whether your decision honoured the system or skipped a step. Then we will see what happens when small slips compound. That is the Audio Case — The Slow Slide.",
      ],
      // AUTHORED — C3 reflection prompt (script doesn't specify; same observational register as D1's C3 prompt).
      prompt: "Which of the four components — Scope Lock, Milestone Architecture, Risk Radar, or Handoff Protocol — comes most naturally to you under workplace pressure? Which one would you skip first when the week gets tight? One sentence each.",
    },
    complete: {
      label: "Transition to Segment D · 15s",
      narration: [
        "You now have the framework. Four components. The Reliability System.",
        "Next, you will sit inside someone else’s reliability pattern as it unfolds. A workplace story, told over two weeks, with three decision pauses — the third one looking back at the first.",
        "Put your headphones on if you have them.",
      ],
      // Scope notice — D3 is Foundational; mirrors D1's structure.
      scopeBoundaries: {
        title: "Scope Boundaries — Foundational Tier and What the Intermediate Tier Adds",
        paragraphs: [
          // AUTHORED — D3-specific framing of the Foundational/Intermediate boundary, in the same register as D1's scope notice block. The script declares the tier as Foundational; the longer scope paragraphs are inferred from the script's segment cap declarations and the Intermediate-tier framing pattern established in D1.
          "This behavioural Dimension [D3], Execution Reliability — Foundational, is deliberately bounded. It rehearses reliability as small-deadline rhythm: whether the commitments you make in passing get treated as commitments.",
          "The scenarios are designed so the standard is knowable. The difficulty lives in whether you honour the standard when nobody is checking, when the workload is heavy, and when the slips would individually pass unnoticed.",
          "This boundary is intentional, and it follows the WorkRehearsal doctrine. Behaviour that can be observed and rehearsed must have a knowable standard. Teaching prioritisation theory — frameworks, principles, and abstract estimation models — is content delivery, not behavioural rehearsal. That is precisely the territory D3 is designed not to occupy.",
          "The Foundational tier concentrates the rehearsal on the reliability response: deliver as promised, flag the risk early, renegotiate before slipping, hand off cleanly.",
          "What this tier does not cover is reliability under conflicting authority — situations where two stakeholders both believe they are the priority and you cannot satisfy both without surfacing the conflict at a higher level than your own desk.",
          "That variability belongs in the Intermediate tier.",
          "Where the Foundational tier asks, “Can people count on you when nobody is checking?”, the Intermediate tier asks, “How do you reason and choose when reliability itself becomes contested between stakeholders?”",
          "The Foundational tier is the floor the Intermediate tier builds on. You cannot rehearse reliability under conflicting authority until small-deadline rhythm is already a pattern.",
        ],
      },
    },
    breakPoint1: {
      label: "Pause invitation · Break Point 1 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 1",
      subtitle: "After Segment C",
      elapsedLabel: "Elapsed: ~22 minutes",
      remainingLabel: "Remaining: ~67 minutes",
      avatarScript: [
        "You have covered the first part of the rehearsal. We encourage you to take a break here so what you have practised can settle.",
        "Our intent is not to have you complete this module — it is to have you carry it with you.",
        "Take your time. Your progress is saved.",
      ],
      continueLabel: "Continue now",
      returnLaterLabel: "Return later",
    },
  },

  /* ---------------- SEGMENT D — AUDIO CASE: THE SLOW SLIDE -------------- */
  segmentD: {
    title: "The Slow Slide",
    intro: [
      "This is the story of someone you probably know. You may have worked with them. You may be them. Their name does not matter. What matters is the pattern.",
      "They are a project manager. Competent. Experienced. Well-liked. Four years in role and never missed a major deadline. If you asked their manager to name a problem employee, this person would not come up.",
      "What happened over the next two weeks was not dramatic. There was no crisis. No confrontation. No failure anyone would write a report about. What happened was small. And it happened slowly. And by the time anyone said anything, the damage was already done.",
    ],
    part1: {
      heading: "Week One — The Drift Begins",
      narration: [
        "Monday. A status update is due to the project sponsor by end of day. Twenty minutes of work. They are deep in a risk assessment for a phase gate review. They decide to finish the risk assessment first. They leave at 6:15 PM. The status update goes out at 6:22 PM. Technically still Monday. Nobody says anything.",
        "Wednesday. A colleague sends a document for review by noon. The PM sees it at 9 AM, reads two pages, gets pulled into an unscheduled call. Then a lunch meeting. Comments go in at 2:45 PM. Two hours and forty-five minutes late. The colleague has already moved forward without their input. Nobody says anything.",
        "Thursday. They promised to update the project timeline before standup. They update it during standup, while others are talking. The team lead notices. Nobody says anything.",
        "Friday. The weekly summary email was due at 3 PM. It goes out at 4:40 PM. Subject line: “Sorry for the delay — busy week.” Two people on the distribution list have already left for the weekend. Nobody says anything.",
      ],
      reportArtifact: {
        title: "WEEK ONE — Visible Timeline",
        lines: [
          "Monday:    Status update due EOD          → sent 6:22 PM (technically on time)",
          "Wednesday: Document review due noon       → comments added 2:45 PM (2h 45m late)",
          "Thursday:  Timeline update due pre-standup → updated during standup",
          "Friday:    Weekly summary due 3 PM        → sent 4:40 PM (1h 40m late)",
          "",
          "People who said something: 0",
          "People who noticed:        4",
        ],
      },
      reflection: {
        heading: "Week One Reflection",
        narration: [
          "Pause. The PM has not missed a single major deadline. Every item was completed. Friday afternoon, if you asked them whether they had a good week, they would say yes. But four people had a different experience of their week.",
          "Four small commitments arrived late or at the last possible moment. Each one was individually justifiable. Together, they form the beginning of a pattern.",
        ],
      },
    },
    pause1: {
      prompt:
        "It is Friday afternoon. Fifteen minutes before shutdown. They are aware the week’s rhythm was off — not dramatically, but off. They have two commitments already on next week’s calendar: a client deck due Wednesday and a process document due Thursday. The audio pauses. What would you do?",
      options: [
        { key: "a", label: "Send a quick message to both stakeholders confirming the deadlines and asking whether the scope is still what you agreed to. This costs five minutes now." },
        { key: "b", label: "Start fresh on Monday. You can make up the rhythm next week. No need to over-communicate." },
        { key: "c", label: "Block time on Monday and Tuesday calendar specifically for the two deliverables. Internal milestones. No messages to stakeholders yet." },
      ],
      justificationPrompt: "Why this option? What are you trying to protect or set up with this first move?",
    },
    part2: {
      heading: "Week Two — The Pattern Becomes Visible",
      narration: [
        "Monday. The PM starts the client deck. At 11 AM, a colleague pings: “Did you get a chance to review the vendor contract? You said you would have comments by today.” The PM forgot. They had agreed to it in a hallway conversation Thursday. Never written down. Never calendared. They reply: “Slipped my mind. I will have it to you tomorrow.” The colleague says “No worries.” But the colleague had already built tomorrow’s vendor call around having the PM’s comments today. They reorganise.",
        "Tuesday. The vendor contract review takes three hours instead of one. The client deck pushes to Wednesday. Wednesday at 1:52 PM, the deck goes out — eight minutes before the 2 PM deadline. Quality fine, not their best. Thursday the process document is due. They have not started it. They write it Thursday. Submit at 4:55 PM. The manager reads it Friday and notices two sections thinner than expected.",
        "Friday. A colleague stops by their desk: “Hey, I wasn’t sure when your part was landing, so I did a version myself just in case.” The PM feels a small shock. They have been worked around.",
      ],
      timelineArtifact: {
        title: "WEEK TWO — Visible Timeline",
        lines: [
          "Monday:    Forgot vendor contract review  → promised tomorrow",
          "Tuesday:   Vendor review took 3× estimate → client deck pushed",
          "Wednesday: Client deck due 2 PM           → sent 1:52 PM (quality: adequate)",
          "Thursday:  Process doc due EOD           → submitted 4:55 PM (quality below usual)",
          "Friday:    Colleague reveals they built backup for PM’s deliverable",
          "",
          "People who said something:         1",
          "People who adjusted their behaviour: 3",
        ],
      },
    },
    pause2: {
      prompt:
        "The colleague has just said: “I did a version myself just in case.” The PM realises they have been worked around. This is not a confrontation. The tone is friendly. But the message is clear: someone decided they could not depend on you. What do you do?",
      writePrompt:
        "Write the exact words you would use — whether that is a reply to the colleague, a private note, an internal message to your manager, or a plan you keep for yourself. Write what the PM should actually say or write in this moment.",
      submitLabel: "Continue the story",
      minChars: 50,
      // Option-set is also offered structurally so the engine can render a Decision card if needed downstream. The script's Pause 2 is option-form; we use the prompt above as the lead narration and the options below as the choices.
      options: [
        { key: "a", label: "Thank the colleague sincerely. Acknowledge the pattern: “You are right to have a backup. I have not been as consistent as I should be these past two weeks. I am going to fix that.”" },
        { key: "b", label: "Explain that each delay had a specific, reasonable cause. The risk assessment ran long. The vendor contract was unexpected. The deck still landed on time." },
        { key: "c", label: "Say nothing. Resolve internally to be more disciplined next week." },
      ],
    },
    part3: {
      heading: "Debrief — Mapped to The Reliability System",
      narration: [
        "Here is what happened, mapped to The Reliability System.",
        "Scope Lock was missing — small commitments had deadlines, but the PM treated them as flexible. The status update at 6:22 PM was not on time; it was approximately on time.",
        "Milestone Architecture was absent — the client deck had a Wednesday 2 PM deadline and no internal milestones. The vendor contract surprise on Monday cascaded because there were no checkpoints.",
        "Risk Radar failed — the PM never identified slight backslide on small items as a risk. Three minutes of risk identification Friday afternoon would have changed the shape of week two.",
        "Handoff Protocol was ignored — the process document was complete but below standard. The manager noticed. Work delivered, but not delivered well.",
        "Four components of one system, four points of failure, two weeks of erosion. Nothing dramatic. And by Friday of week two, a colleague had decided to route around them.",
      ],
    },
    // D3 INNOVATION — Retrospective Decision Pause 3.
    retrospective: {
      heading: "Decision Pause 3 — Retrospective [D3 INNOVATION]",
      narration: [
        "Knowing how week two unfolded, what would you have done differently at Decision Pause 1 — that Friday afternoon, fifteen minutes before shutdown?",
        "Speak it or write it. Forty-five seconds.",
      ],
      writePrompt:
        "Looking back at Decision Pause 1 — the Friday before week two began — what would you have done differently? Write the answer in your own words.",
      submitLabel: "Save the retrospective",
      minChars: 40,
    },
    close: {
      card: [
        "You made three decisions inside the story.",
        "Two as the week unfolded. One looking back.",
        "Some of what those decisions revealed, you saw as you made them.",
        "Some of it, you may not see for weeks.",
      ],
    },
    complete: {
      label: "Transition to Segment E · 20s",
      narration: [
        "You have read the field guide. You have heard a story unfold and made decisions inside it — including one with hindsight.",
        "Next, you are inside the situation yourself. Four scenarios. Four decisions. Four consequence chains across same day, next week, and month end.",
        "Trust your judgment. Make the call. See what happens.",
      ],
      continueLabel: "Continue",
    },
    breakPoint2: {
      label: "Pause invitation · Break Point 2 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 2",
      subtitle: "After Segment D",
      elapsedLabel: "Elapsed: ~37 minutes",
      remainingLabel: "Remaining: ~53 minutes",
      avatarScript: [
        "You have just heard a workplace pattern form over two weeks and made decisions inside it. Let what you have practised so far settle.",
        "The Scenario Lab ahead will ask more of you — and you are more ready for it than you think.",
        "Step away if you need to. Reflect. Come back when you are ready.",
      ],
      continueLabel: "Enter the Scenario Lab",
      returnLaterLabel: "Return later",
    },
  },

  /* ------------------ SEGMENT F — MICRO-DRILLS (consolidation) ------------- */
  segmentF: {
    intro: "Two short consolidation exercises. The Field Guide language. The Scenario Lab pattern. Now: rapid recognition.",
    f1: {
      title: "F1 — Scope Lock",
      audioIntro: "Five rapid micro-commitments. Each one is currently vague. Rewrite it so “done” is unambiguous. Fifteen seconds each. Type or speak. We are not rating; we are rehearsing the muscle.",
      header: "Five vague commitments. Name the calibrated rewrite that makes “done” unambiguous.",
      onScreenHeader: {
        title: "SCOPE LOCK — REWRITE FOR “DONE”",
        lines: [
          "You will see five vague commitments.",
          "For each one, choose the rewrite that makes “done” unambiguous.",
        ],
        cta: "Tap to begin.",
      },
      // Four options shared across the five vignettes — the SingleChoiceCard
      // engine pattern expects one shared option list per drill.
      options: [
        "Specific time + specific deliverable",
        "Soft phrasing that buys room",
        "Apology + vague promise",
        "Restated original phrasing",
      ],
      // AUTHORED — F1 vignettes mirror the script's five prompts (F1.1–F1.5). The script frames F1 as a write-the-calibrated-version drill; for SingleChoiceCard parity with D1 we render the same five vignettes as a recognition task — the participant identifies which of four register-archetypes IS the calibrated rewrite. Feedback text quotes the script's language about Scope Lock as the recognition target.
      items: [
        { vignette: "“I’ll get back to you soon.”", answer: "Specific time + specific deliverable", feedback: "Scope Lock. A calibrated rewrite names what is coming and when — for example, “I’ll send the two-paragraph summary by 4 PM today.” “Soon” describes feeling, not a commitment." },
        { vignette: "“I’ll have a draft ready next week.”", answer: "Specific time + specific deliverable", feedback: "Scope Lock. The receiver cannot plan around “next week.” A calibrated version — “draft to you Wednesday EOD, version one, three sections” — gives them something to work with." },
        { vignette: "“I’ll loop in legal at some point.”", answer: "Specific time + specific deliverable", feedback: "Scope Lock. “At some point” is the verbal equivalent of putting a sticky note in a drawer. Naming the day and the trigger turns intent into a commitment." },
        { vignette: "“I’ll send the summary this afternoon.”", answer: "Specific time + specific deliverable", feedback: "Scope Lock. Afternoon is four hours. Calibrated: “by 3 PM, the two-page summary with the three open questions called out.” Same intent, dependable shape." },
        { vignette: "“I’ll review and let you know.”", answer: "Specific time + specific deliverable", feedback: "Scope Lock. “Let you know” doesn’t close the loop. Calibrated: “I’ll review by Wednesday and reply with approve / changes / blockers.” The receiver can move." },
      ],
      closeCard: "You have rehearsed five Scope Locks. The muscle is small. The cost of not having it is large.",
    },
    f2: {
      title: "F2 — Risk Radar",
      audioIntro: "Three scenarios. For each one, name the three things most likely to go wrong, and what you will do if each one happens. Sixty seconds per scenario. Type or speak.",
      header: "Three scenarios. For each, recognise the risk most worth naming before the work begins.",
      onScreenHeader: {
        title: "RISK RADAR — NAME THE RISK BEFORE IT LANDS",
        lines: [
          "Four categories of risk worth naming early:",
        ],
        showOptionsRow: true,
        cta: "Tap to begin.",
      },
      options: ["Scope risk", "Estimation risk", "Handoff risk", "Stakeholder risk"],
      // AUTHORED — F2 framed as recognition for engine parity with D1's F2 (which is a 4-option recognition drill). The script defines F2 as free-form risk-naming for three scenarios; the recognition framing here identifies the dominant risk category for each scenario, with feedback that quotes the Risk Radar component from C3.
      items: [
        { vignette: "You are delivering a major report to a new client on Friday.", answer: "Stakeholder risk", feedback: "Risk Radar. The first time you deliver to a new client, the largest unknown is what “good” looks like to them. Naming the stakeholder risk early — and asking before the work begins — closes that gap." },
        { vignette: "You are leading your first cross-functional project starting Monday.", answer: "Handoff risk", feedback: "Risk Radar. Cross-functional work fails most often where the work crosses team boundaries. Naming handoff risk first — who needs what, in what format, by when — is where reliability is held or lost." },
        { vignette: "You are handing off a six-month workstream before two weeks of leave.", answer: "Handoff risk", feedback: "Risk Radar. The risk that defines this moment is whether the next person can carry the work without you. Risk Radar named early becomes a one-page handoff brief — the difference between leaving cleanly and being pulled back from leave." },
      ],
      closeCard: "You have rehearsed Risk Radar three times. The naming is the work. The mitigation comes second.",
    },
    complete: {
      label: "Transition to Segment G · 15s",
      narration: [
        "The Field Guide gave you the language.",
        "The Scenario Lab gave you the consequences.",
        "The micro-drill settled the language into recognition.",
        "One thing left.",
      ],
      continueLabel: "Continue",
    },
    // F closing reflection per script
    closingReflection: {
      prompt: "What did you notice about your own defaults during those drills? Take 30 seconds. Speak it or type it. This is for you.",
    },
  },

  /* ---------------- SEGMENT G — RECOGNITION + AWE CLOSE -------------------- */
  segmentG: {
    breakPoint4: {
      label: "Pause invitation · Break Point 4 · 10s",
      title: "PAUSE INVITATION · BREAK POINT 4",
      subtitle: "Optional, after Segment F",
      elapsedLabel: "Elapsed: ~85 minutes",
      remainingLabel: "Remaining: ~5 minutes",
      avatarScript: [
        "You are at the closing. It is a few minutes long. You can take a break here, or step into it now. Your choice.",
      ],
      continueLabel: "Step into the closing",
      returnLaterLabel: "Take a short break",
    },
    recognitionLabel: "Recognition narration · 60s",
    recognition: [
      "You just rehearsed the dimension four times. Each scenario, a different context. Each time, with a different cost. Some of your paths were close to what you would actually do. Some surprised you. Both are useful.",
      "What you are carrying out of this module is not a rating. It is not a credential. It is not a checklist.",
      "It is a sharper sense of what reliability feels like in your hands when workplace pressure rises — and what your pattern looks like to other people.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "A sharper sense of what your reliability pattern looks like to others.",
      ],
    },
    // Cold-open callback — per the four paths in Segment A.
    // AUTHORED — the script does not enumerate G-1 cold-open callbacks per path. Mirroring D1's pattern with D3-specific language anchored to the 8:47 / budget-breakdown / “first thing this morning” moment.
    callback: {
      a: "You opened this module at 8:47 by naming the slip honestly. Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 8:47 by buying yourself twenty minutes. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 8:47 with “working on it — will send soon.” Hold that first instinct beside the choices that followed.",
      d: "You opened this module at 8:47 by going quiet. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      label: "Framework Return · 25s",
      durationSeconds: 25,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through four scenarios. Different stakes. Different costs. But the same four components.",
      steps: ["Scope Lock.", "Milestone Architecture.", "Risk Radar.", "Handoff Protocol."],
      tagline: "This is The Reliability System.",
      carryForward: "You used it five times today. You will use it tomorrow.",
    },
    delayedRetentionCheck: {
      label: "Retention check setup · 45s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In three to seven days, this module will return you to one of the scenarios you just rehearsed.",
        "We will show you the path you chose, the words you wrote, and ask you one question: is this still what you would do?",
        "Memory plus judgment under time-shift. You will know it is coming. You will not know when. Take it when you have a quiet five minutes.",
      ],
      details: [
        { k: "Appears", v: "3 to 7 days from now (notification sent)" },
        { k: "Format", v: "1 scenario revisited, with your prior choice surfaced" },
        { k: "Response", v: "Single decision + brief justification" },
        { k: "Attempts", v: "1 available" },
        { k: "Cooldown", v: "48 hours if you defer the prompt" },
        { k: "Window", v: "72 hours from notification" },
      ],
      doctrinalNote: [
        "This is not a pass / fail check. It is a check that the judgment pattern has stayed with you after time has passed.",
        "If the pattern has settled differently, the system will guide you back to the scenario worth revisiting.",
      ],
      continueLabel: "Got it — continue",
      questionsPerAttempt: 1,
      attemptsMax: 1,
      cooldownHours: 48,
      windowHours: 72,
      notificationWindowHours: [72, 168],
    },
    bookendQuestion:
      "Can people count on you — not once, but every time?",
    finalPrompt:
      "In one sentence, what is one thing you will commit to differently the next time something matters?",
  },
};

/* ============================================================================
   SCENARIO CHAIN 1 — THE 80% SOLUTION
   ========================================================================== */
export const SC1_CONTENT_D5 = {
  id: "SC1",
  title: "The Standing Disagreement",
  commitment: "Decide whether to deliver an 80% report on time, request an extension, or deliver on time with the gaps explicitly flagged.",
  callback: [
    "You have been here before.",
    "At the start of this module, you saw a small-deadline moment for 30 seconds. Now you return to the dimension with the full consequence chain — same day, next week, month end.",
    "You may choose the same instinct again, or choose differently. Notice whether your reasoning has changed.",
  ],
  intro: [
    "Scenario one. The 80% Solution.",
    "A deliverable can land on time and be 80% of the standard, or it can be late and full quality. The manager has not specified which matters more. What you do with the gap defines the pattern.",
  ],
  briefing:
    "Your first scenario. A client-facing report is due in four hours. Not a quick email — a structured 18-page document your manager will review and forward to the client. You are about 70 percent done. Structure is there. Data is accurate. Two sections are incomplete: the competitive analysis and the risk summary. You can finish at roughly 80 percent of your usual quality in the time remaining. Alternatively, you could request a 24-hour extension and deliver at full quality tomorrow. Your manager has not specified which matters more — the deadline or the quality. They said: “Looking forward to seeing this today.” That could mean the deadline is firm. It could mean encouragement. You do not know. Read the artifacts before you decide.",
  artifacts: [
    {
      caption: "Report in progress — internal status",
      title: "Client Performance Review · Q1 2026 · WORKING COPY",
      mono: true,
      lines: [
        "Sections 1–4: COMPLETE (data verified, charts finalised)",
        "Section 5 — Competitive Analysis: OUTLINE ONLY",
        "    · bullet points, no narrative",
        "    · missing two competitor entries",
        "Section 6 — Risk Summary: NOT STARTED",
        "    · framework exists from last quarter",
        "    · could adapt, but not validated against new data",
        "",
        "Format: 18-page PDF · Branding: compliant",
      ],
    },
    {
      caption: "Calendar context",
      title: "Calendar — Today and Tomorrow",
      mono: true,
      lines: [
        "TODAY",
        "  2:00 PM   Report deadline",
        "  3:30 PM   Team sync",
        "",
        "TOMORROW",
        "  9:00 AM   Manager–client call (manager will reference the report)",
        "  11:00 AM  Your 1:1 with manager",
      ],
    },
    {
      caption: "Slack thread with manager",
      title: "Slack · DM with Manager",
      mono: true,
      lines: [
        "Manager — Monday 9:14 AM",
        "“Report still on track for Thursday?”",
        "",
        "You — Monday 9:16 AM",
        "“Yes, on track.”",
        "",
        "Manager — Thursday 8:02 AM",
        "“Looking forward to seeing this today. Client call is tomorrow morning.”",
      ],
    },
  ],
  decisionPrompt: "Four hours. Report at 70 percent. Manager expects it today. Client call tomorrow morning. What do you do?",
  options: [
    { key: "a", label: "Deliver at 80% on time. Complete the report with thin sections — competitive analysis as bullets, risk summary adapted from last quarter without revalidation. Send by 2 PM. Do not flag the quality gaps." },
    { key: "b", label: "Request a 24-hour extension. Message manager now: “The report structure is solid but two sections need more work to meet our usual standard. Can I deliver tomorrow by 8 AM, ahead of the client call?”" },
    { key: "c", label: "Deliver at 80% on time with explicit flag. Send by 2 PM with cover note: “Sections 5 and 6 are draft-quality. I can have final versions by 8 AM tomorrow if you want to wait, or you can use this version with the caveat.”" },
    // AUTHORED — fourth option (Path D) added for engine parity with D1's 4-path scenarios. The script declares three paths (A/B/C) for D3 scenarios but the renderer's Decision component, signal panel, Trajectory chart, and Pattern Mirror are built around four. Path D is the script's implicit "silent slip" — the failure mode the script's signal panels imply but do not author as an option.
    { key: "d", label: "Deliver at 80% on time and stay quiet. Skip the cover note. Hope the manager reads quickly and the thin sections don’t register. Move on to the next deliverable." },
  ],
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  artifactWrite: {
    a: { prompt: "You have decided to send the report at 2 PM without flagging the quality gaps. Write the Slack message that goes with the report to your manager — the words that send it across.", submit: "Send to manager" },
    b: { prompt: "You have decided to request a 24-hour extension. Write the actual message — the words you would send to your manager right now.", submit: "Send extension request" },
    c: { prompt: "You have decided to deliver at 80% with an explicit cover note. Write the cover note exactly as it will read above the report.", submit: "Send with cover note" },
    d: { prompt: "You have decided to send at 2 PM and stay quiet. Write the private note you keep for yourself — what you decided, what you risked — or explain why no record is appropriate.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Just getting this across — bit of a tight one, sections 5 and 6 are what they are. Hope it works for the call.", lands: "Your manager hears uncertainty about the deliverable but no specific information about what is thin. They have to translate before they can use it." },
      { tag: "Over-apologetic", calibrated: false, text: "Really sorry — I just couldn’t get sections 5 and 6 to the standard I wanted. I know the client call is tomorrow and I have let you down. I will rewrite both sections tonight if you want.", lands: "The apology takes up most of the message; the gap and the trade-off get buried. Your manager now has to manage both the report and the apologiser." },
      { tag: "Calibrated", calibrated: true, text: "Report attached. Sections 5 and 6 are draft-quality — competitive analysis is bullets, risk summary adapted from last quarter without revalidation. I can have final versions by 8 AM tomorrow if you want to wait, or you can use this version with the caveat. Your call.", lands: "Your manager hears what is thin, what is sound, and what the options are — in three sentences. They can decide without translating." },
    ],
    b: [
      // AUTHORED — Path B reference set (Path B for SC1 is an extension-request artifact-write; the script doesn't enumerate the three references explicitly here, only the "calibrated" baseline shown in the option. Authored to match D1's two-reference pattern for the non-AC artifact-writes.)
      { tag: "Defensive", calibrated: false, text: "Bit behind on the report — going to need until tomorrow. Hopefully fine before the client call.", lands: "The message is short but vague. Your manager doesn’t know whether the structure is solid and the polish is thin, or whether the whole thing is at risk." },
      { tag: "Calibrated", calibrated: true, text: "The report structure is solid but two sections need more work to meet our usual standard. Can I deliver tomorrow by 8 AM, ahead of the client call? Sections 1–4 are ready if you want a preview now.", lands: "Your manager hears the diagnosis, the proposal, and the safety net in one breath. The call gets easy because the message did the work." },
    ],
    d: { card: "Whatever you wrote, you now have a record of this moment that you did not have before." },
    closing: "What changes between these versions: who carries the cost of the thin sections, when the manager learns about them, and whether they are framed as a trade-off or as something hidden. The numbers are identical. The framing tells a different story.",
  },
  consequences: {
    a: {
      sameDay: [
        "The report arrives on time. Your manager begins preparing for the client call. They do not immediately notice the thin sections — they are reading for narrative first.",
      ],
      nextWeek: [
        "During the client call, the client asks about competitive landscape. The manager references Section 5 and realises mid-conversation that it is bullet points, not analysis. They improvise. The call goes fine.",
        "In your 1:1 they say: “The report was solid overall, but the competitive section was light. Was that intentional?” You explain the time pressure. They nod. But the note is made: this person delivers on time but does not flag quality trade-offs.",
      ],
      monthEnd: [
        "The next high-visibility deliverable comes with an added midway checkpoint: “Send me a draft by Wednesday so I can see where things stand.”",
        "Not a formal process change. Your manager building buffer because they no longer trust you to flag issues yourself.",
        "You have not lost trust. You have gained supervision.",
      ],
      outcome: "Delivered on time at 80%. Quality gap unannounced. Manager added a midway checkpoint to the next deliverable.",
      others: "Manager added supervision rather than withdrawing trust outright.",
      interp: "She met the deadline. She did not name the gap.",
      manager: "Manager’s perspective. “She delivered on time. I noticed the thin sections within twenty-four hours but said nothing immediately because the call went fine. Mental note made — not ‘this person missed a deadline’ but ‘this person did not tell me about a quality trade-off.’ Different kind of concern.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You message your manager. They reply within an hour: “That works.”",
        "You finish the report cleanly. It is ready by 7:48 the next morning, well ahead of the client call.",
      ],
      nextWeek: [
        "The client call goes well. Both sections land with the depth the manager expects.",
        "In your 1:1, the manager says: “Good call flagging it early. Better to renegotiate than to deliver thin.”",
        "No additional checkpoints get added to your next deliverable.",
      ],
      monthEnd: [
        "The next high-visibility deliverable arrives with the same level of autonomy you had before.",
        "Your manager keeps sending you the work where the quality call has to be made — because the early communication landed.",
      ],
      outcome: "Requested extension with one day of notice. Delivered at full quality before the client call.",
      others: "Manager did not add checkpoints. Treats you as someone who reads ahead.",
      interp: "She named the trade-off before it happened. The quality stayed in her hands.",
      manager: "Manager’s perspective. “Brief moment of ‘oh no’ followed by relief. The early communication mattered more than the extension. I’d rather get a flag at 11 AM than discover a thin section in the client call.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "The report arrives on time with your cover note. Your manager reads the note first, then the report.",
        "They reply within an hour: “Useful flag. I’ll wait for the final on 5 and 6 before forwarding.”",
      ],
      nextWeek: [
        "You send the final sections Monday. Your manager forwards the complete report to the client as a follow-up appendix.",
        "In your 1:1 they say: “That was well-handled. I had what I needed and I knew the limits.”",
        "The cover-note pattern gets cited by your manager when training a peer the following week.",
      ],
      monthEnd: [
        "Your manager begins routing the work where the quality–deadline call has to be made specifically to you.",
        "The flag became a reference pattern. Not because you delivered late. Because you delivered with the gaps visible.",
      ],
      outcome: "Delivered on time with explicit cover note. Final sections followed Monday.",
      others: "Manager began routing the quality-call work to you specifically.",
      interp: "She met the deadline and named the gaps. The framing changed how the report was read.",
      manager: "Manager’s perspective. “The cover note changed how I read the report. Instead of discovering gaps, I was informed about them. The experience felt collaborative. I had what I needed and I knew the limits.”",
      traj: "rise",
    },
    d: {
      // AUTHORED — Path D consequence chain. Mirrors the "silent slip" pattern declared in the script's behaviour-signal panels and threading state model. Voice and pacing match D1's Path D consequence chains.
      sameDay: [
        "You send the report at 1:57 PM. No cover note. Your manager replies “Got it” at 2:14 PM.",
        "You move on to the next deliverable.",
      ],
      nextWeek: [
        "During the client call, the client asks about competitive landscape and risk. Your manager flips to Section 5 and finds bullets where they expected narrative. They improvise. The call survives.",
        "In your 1:1, the manager doesn’t bring it up. But during the next staffing decision, they pass over your name for a client-facing piece and assign it to a peer who flagged a similar issue last quarter.",
      ],
      monthEnd: [
        "Two weeks later, the client emails the manager directly with a follow-up question about Section 6. Your manager has to ask you for the missing risk validation — the one you skipped at 2 PM. The conversation is short and professional.",
        "Your manager files the pattern privately: this person ships on time, but the receiver is the one who discovers what is missing.",
      ],
      outcome: "Delivered on time. No flag. Manager discovered the gap in the client call.",
      others: "Manager passed over you for the next client-facing assignment.",
      interp: "She delivered. She did not say what was thin. The receiver did the discovering.",
      manager: "Manager’s perspective. “The report came in on time. The gap I found in the call. The pattern I cannot work with is the one where I have to discover what is missing. Now I have to read every section twice before I forward.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Deliver on time at 80%, no flag", signal: "Met the deadline. Did not name the quality trade-off.", effect: "Trust does not collapse; supervision quietly increases." },
    { key: "b", title: "Request extension early", signal: "Renegotiated the deadline before the slip — quality preserved.", effect: "Treated as someone who reads ahead; autonomy held." },
    { key: "c", title: "Deliver on time with explicit flag", signal: "Met the deadline and named the gaps in the same breath.", effect: "Becomes the reference pattern; routed the quality-call work specifically." },
    { key: "d", title: "Deliver on time and stay quiet", signal: "Hoped the gap would not register.", effect: "Manager began discovering what was missing on their own; staffing changes follow." },
  ],
  reflection:
    "Think of a deliverable you sent at 80% without naming the gap. What was the cost of the silence? What would naming the gap have changed?",
};

/* ============================================================================
   SCENARIO CHAIN 2 — THE COMPETING PRIORITIES
   ========================================================================== */
export const SC2_CONTENT_D5 = {
  id: "SC2",
  title: "The Credit Conflict",
  commitment: "Decide how to handle three deliverables, three stakeholders, and not enough hours.",
  // SC2 has no threading per script; threading begins at SC3. Engine reads
  // SC.threading and falls back to cautious copy when absent, so we ship a
  // minimal generic intro variant set for engine safety.
  threading: {
    transparent: [
      "Last time, you flagged the quality trade-off early. Your manager has started routing the harder calls to you.",
      "Three deliverables just landed for the same week. The window for renegotiation is the next hour.",
    ],
    cautious: [
      "Last time, you met the deadline at 80% without flagging.",
      "Three deliverables just landed for the same week. The window for surfacing the conflict is the next hour.",
    ],
    avoidant: [
      "Last time, the report went out silently with the gaps unannounced.",
      "Three deliverables just landed for the same week. The window for renegotiation is closing.",
    ],
  },
  intro: [
    "Scenario two. The Competing Priorities.",
    "Three stakeholders. None of them knows about the other two. Each believes they are your primary commitment.",
  ],
  briefing:
    "Three deliverables. Three stakeholders. One week. Deliverable one: a budget reconciliation for the finance director, due Wednesday, six hours of work. Routine quarterly work. Deliverable two: a presentation deck for the VP of operations, due Thursday, eight hours. High visibility — the VP presents to executive committee Friday. Deliverable three: a process improvement recommendation for your manager, due Friday, five hours. Medium visibility. Total: 19 hours. You have 14 productive hours this week. None of the three stakeholders knows about the other two requests. Each believes they are your primary commitment.",
  artifacts: [
    {
      caption: "Email chain — three stakeholders, three asks",
      title: "Inbox — incoming requests this week",
      mono: true,
      lines: [
        "Finance Director — Monday",
        "“Looking forward to the budget recon Wednesday. Same format as Q4.”",
        "",
        "VP Operations — Monday",
        "“Presentation deck — Thursday EOD. The executive committee is going to ask hard questions on the operational efficiency narrative. Don’t disappoint.”",
        "",
        "Manager — Tuesday morning",
        "“Friday for the process improvement recs. Strategic planning Monday next week — I need your input.”",
      ],
    },
  ],
  decisionPrompt: "You have 14 hours. The work requires 19. What do you do?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  options: [
    { key: "a", label: "Work through it. Compress sleep, compress quality at the margin, deliver all three close to deadline. Do not tell anyone about the conflict. Assume you will figure it out." },
    { key: "b", label: "Pick the highest-visibility one (the VP deck) and quietly let the other two slip. Send the finance recon late Thursday. Tell your manager the process improvement is delayed; they will understand." },
    { key: "c", label: "Surface the conflict immediately to all three stakeholders. Email this morning: “I have three deliverables landing the same week with a combined 19 hours of work. I have 14 hours. I want to deliver each at the quality you expect. Please help me prioritise: which one absolutely must land on date, which can slide a day, which can slide to Monday?”" },
    // AUTHORED — Path D for engine 4-path parity (see SC1 note).
    { key: "d", label: "Pick the two that are most personally consequential and over-deliver on those. Let the third slip without comment. Trust that one missed deadline among three will look like context, not pattern." },
  ],
  artifactWrite: {
    a: { prompt: "You have decided to work through it without surfacing the conflict. Write the brief Slack message you send to each stakeholder confirming you are on track — the words you would send today.", submit: "Confirm to all three" },
    b: { prompt: "You have decided to prioritise the VP deck and let the others slip quietly. Write the message you send your manager about the process improvement delay.", submit: "Send to manager" },
    c: { prompt: "You have decided to surface the conflict to all three stakeholders. Write the actual email — the one that goes to all three this morning.", submit: "Send to all three" },
    d: { prompt: "You have decided to over-deliver on two and let the third slip silently. Write the private note you keep for yourself — what you chose, what you risked.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants for SC2 artifact-write (script defines the pattern; specific reference text written in the calibrated register from D1).
      { tag: "Defensive", calibrated: false, text: "All three are on track — should be tight but doable. Will keep you posted if anything shifts.", lands: "All three stakeholders read “on track” and plan their week around your word. None of them know the math doesn’t hold." },
      { tag: "Over-apologetic", calibrated: false, text: "Hi all — I am so sorry to do this. I’ve realised I have three deliverables stacking up and I cannot do all of them justice. I will try my best but please don’t expect my A-game on any of them.", lands: "The apology becomes the message. The receivers reassure you instead of helping you prioritise." },
      { tag: "Calibrated", calibrated: true, text: "Quick triage note to all three of you. I have three deliverables landing this week with a combined 19 hours of work and 14 hours of capacity. I want to deliver each at the quality you expect, so I need help prioritising: which one must land on date, which can slide a day, which can slide to Monday? Reply by 1 PM and I will schedule accordingly.", lands: "All three see the constraint, the trade-off, and the ask in one breath. The triage moves up one level, where it belongs." },
    ],
    b: [
      // AUTHORED — Path B (escalation to manager about the slip) references.
      { tag: "Defensive", calibrated: false, text: "Quick heads up — the process improvement is going to slide to Monday. Few moving parts this week.", lands: "“Few moving parts” reads as cover. Your manager files it as a slip with no diagnosis." },
      { tag: "Calibrated", calibrated: true, text: "The process improvement recommendation will slide to Monday — I had finance and VP deliverables stack the same week and prioritised toward the executive-committee one. Wanted to flag it before EOD Friday rather than after.", lands: "Your manager hears the diagnosis, the choice, and the timing. The slip is named. The pattern is owned." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose silence over surfacing the conflict." },
    closing: "What changes between these versions: whether the conflict gets surfaced to the people who can resolve it, or absorbed silently by you. The hours are identical. The trust is not.",
  },
  consequences: {
    a: {
      sameDay: [
        "You set up your week’s calendar. Three blocks. Three stakeholders. No communication sent. You commit to delivering. By Tuesday evening you have made progress on the budget recon but not enough on the deck.",
      ],
      nextWeek: [
        "Wednesday: budget recon submitted at 11:55 PM (technically due that day). Thursday: deck submitted at 11:48 PM (technically Thursday). Quality of both: adequate, not your best.",
        "Friday: process improvement is two pages instead of the five you would normally write. The manager reads it Friday afternoon and notices the depth gap.",
      ],
      monthEnd: [
        "The three stakeholders compare notes during a strategy session two weeks later. Each thought they had your primary attention. Each notices the quality was lighter than usual.",
        "The pattern that emerges: when this person is over-committed, they do not flag. They deliver everything, but nothing at full strength.",
        "From now on, two of the three start building their own contingencies whenever your name is on a deliverable.",
      ],
      outcome: "All delivered at compressed quality. Conflict never surfaced.",
      others: "Two of three stakeholders quietly began building contingencies around your name.",
      interp: "She delivered everything and named nothing. The receivers compared notes.",
      manager: "Manager’s perspective. “Three things came in. None of them were her best. She didn’t tell me she was over capacity — I had to work that out from the depth gap on Friday. Next time I’ll ask her capacity before I assign.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You message your manager about the process improvement delay. They reply: “OK, but the strategic planning is Monday — I needed it Friday.”",
        "You commit to compressing the VP deck. The finance recon is going to be late.",
      ],
      nextWeek: [
        "Finance recon arrives Thursday morning instead of Wednesday. The finance director responds with one sentence: “Noted.”",
        "VP deck lands Thursday EOD at full quality. The executive committee meeting goes well.",
        "Manager learns about the process improvement slip from a peer in a Friday standup, not from you.",
      ],
      monthEnd: [
        "The finance director stops including you on the early consultation list for next quarter’s reconciliation.",
        "Your manager pulls you aside at the end of the month: “The VP got the deck. Two of three stakeholders feel like they got the leftovers. That is the part I cannot work with.”",
      ],
      outcome: "VP deck at full quality. Two other deliverables slipped; one was learned about second-hand.",
      others: "Finance director removed you from early consultation; manager flagged the pattern.",
      interp: "She picked one stakeholder. The other two felt picked against.",
      manager: "Manager’s perspective. “She delivered the visible one beautifully. The cost was two relationships I had to repair. The triage was right; the silence around it wasn’t.”",
      traj: "drop",
    },
    c: {
      sameDay: [
        "Initial pushback: “Why are you telling us all at once?” But within an hour all three stakeholders re-prioritise.",
        "VP deck stays Thursday. Budget recon moves to Friday. Process improvement moves to Monday.",
      ],
      nextWeek: [
        "You deliver all three at full quality.",
        "The finance director replies: “Thanks for the heads up — we worked around it cleanly.”",
        "Your manager mentions in the standup: “When she sees the conflict, she names it. That is how I want to find out.”",
      ],
      monthEnd: [
        "The three stakeholders, over the next month, start asking you proactively when conflicts arise.",
        "Your name becomes the one they bring contested decisions to first — because you read the field.",
      ],
      outcome: "All three renegotiated transparently. All three delivered at full quality.",
      others: "Stakeholders began proactively coordinating around you.",
      interp: "She named the conflict before anyone had to ask. The triage moved up where it belonged.",
      manager: "Manager’s perspective. “She put the trade-off on the table where the three of us could solve it. Now I bring her the next contested decision first. She reads the field.”",
      traj: "rise",
    },
    d: {
      // AUTHORED — Path D consequence chain mirroring the Path A pattern but with a sharper edge (chose silently which two to over-deliver).
      sameDay: [
        "You quietly decide: the VP deck and the manager’s process improvement get your hours. The finance recon will slip.",
        "Wednesday EOD passes. The finance recon does not arrive. You do not send a heads-up.",
      ],
      nextWeek: [
        "Thursday morning the finance director DMs: “Where are we on the recon?” You reply: “Apologies, late this evening.”",
        "The VP deck lands at full quality Thursday EOD. The process improvement lands Friday at full quality.",
        "The finance director files a polite escalation note to your manager — not the recon being late, but not being told.",
      ],
      monthEnd: [
        "The finance director begins running the quarterly recon in-house with a junior analyst, citing “capacity reasons.”",
        "Your manager notes: “Two of three landed brilliantly. The one that didn’t — I learned about it from finance, not from you.”",
      ],
      outcome: "Two over-delivered. One slipped silently. Manager learned from the third party.",
      others: "Finance director moved the work in-house; manager flagged the silent slip.",
      interp: "She chose which two stakeholders to keep. The third found out from the silence.",
      manager: "Manager’s perspective. “The two she did were excellent. The one she didn’t do, she didn’t mention. The pattern I cannot work with is the one I learn from somebody else.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Work through it silently", signal: "Compressed quality. No flag.", effect: "Stakeholders compare notes; contingencies form around your name." },
    { key: "b", title: "Quiet triage in your head", signal: "Picked the visible one. Others were told after the slip, not before.", effect: "Stakeholders feel chosen against; one of them moves the work." },
    { key: "c", title: "Surface the conflict transparently", signal: "Named the math. Triaged at the right level.", effect: "Stakeholders proactively coordinate around you." },
    { key: "d", title: "Pick two; let the third slip in silence", signal: "Chose the two most personally consequential. The third found out from the silence.", effect: "Lost the stakeholder you under-served; manager flagged the silence." },
  ],
  reflection: "Think of a week when three things landed at once. Did you tell the people involved, or did you absorb the conflict silently? What did that cost?",
};

/* ============================================================================
   SCENARIO CHAIN 3 — THE DIRTY HANDOFF
   Cross-scenario threading active: setup variant selected by reliability_pattern.
   ========================================================================== */
export const SC3_CONTENT_D5 = {
  id: "SC3",
  title: "The Misaligned Direction",
  commitment: "Decide what 30 minutes of knowledge transfer to a new owner actually has to cover.",
  threading: {
    // Script-named: reliable / mixed / unreliable. Engine reads via the
    // standard threading key — D1's renderer uses transparent/cautious/avoidant
    // as the key; for the D3 renderer we'll map reliable → transparent etc. so
    // the engine wiring stays unchanged across modules.
    transparent: [
      "You are handing off a deliverable to a junior colleague. They will be the primary owner from this point. Standard handoff. The work is solid; you are confident in it.",
    ],
    cautious: [
      "You are handing off a deliverable to a junior colleague. They will be the primary owner from this point.",
      "Worth noting — your previous handoff three weeks ago required two follow-up emails. The receiver has flagged that they would like a clearer transition this time.",
    ],
    avoidant: [
      "You are handing off a deliverable to a junior colleague. They will be the primary owner from this point.",
      "They have been told by your shared manager to ask you specifically what the format should be, what context they should know, and what the next milestone is — because previous handoffs have required them to chase you for clarification.",
      "The receiver enters this conversation expecting incomplete information.",
    ],
  },
  intro: [
    "Scenario three. The Dirty Handoff.",
    "Thirty minutes to hand off a project tracker built over six months to someone who has been on the team for two weeks. What you cover, what you skip, and what you trust them to figure out determines whether they can carry the work or come back to you three times this week.",
  ],
  briefing:
    "The deliverable: a project tracker with seven active workstreams, three external vendors, and a quarterly milestone next month. You built it over six months. They have been on the team for two weeks. You have 30 minutes scheduled to walk them through it. What you do in those 30 minutes determines whether they can carry the work cleanly or whether they will be back in your inbox three times this week.",
  artifacts: [
    {
      caption: "Project tracker — current state",
      title: "Project Tracker — 7 active workstreams",
      mono: true,
      lines: [
        "WORKSTREAMS",
        "  WS-1  Vendor onboarding (Vendor A)        status: green",
        "  WS-2  Procurement integration (Vendor B)  status: amber",
        "  WS-3  Compliance review (Vendor C)        status: green",
        "  WS-4  Internal data migration             status: amber",
        "  WS-5  Reporting cadence build             status: green",
        "  WS-6  Quarterly milestone deliverable     status: amber",
        "  WS-7  Phase gate documentation            status: green",
        "",
        "EXTERNAL DEPENDENCIES",
        "  Vendor A · Vendor B · Vendor C",
        "",
        "NEXT MILESTONE",
        "  Quarterly review · 4 weeks out",
      ],
    },
  ],
  decisionPrompt: "Thirty minutes. What do you cover? What do you skip? What do you assume they will figure out?",
  justificationPrompt: "Why this option? What are you trusting about the receiver, the work, or yourself?",
  options: [
    { key: "a", label: "Walk through the tracker top-to-bottom in chronological order. Cover everything you can in 30 minutes. Tell them: “DM me if anything is unclear.”" },
    { key: "b", label: "Prepare a 1-page handoff brief BEFORE the meeting: current state, three most likely risks in next 30 days, who to contact for each vendor, what the manager’s review cadence is, what “done” looks like for the quarterly milestone. Walk through the brief. Reserve the last 5 minutes for their questions." },
    { key: "c", label: "Give them edit access to the tracker, tell them to read it cold for 20 minutes, then spend the last 10 answering their questions. Trust them to surface what they don’t understand." },
    // AUTHORED — Path D for 4-path engine parity.
    { key: "d", label: "Skip the structured walk-through. Hand them the tracker file with a Slack message: “Take a look — let me know if anything is unclear.” Use the 30 minutes for your own work." },
  ],
  artifactWrite: {
    a: { prompt: "You have decided on the chronological walk-through. Write the Slack message you send the receiver after the meeting — the words that close the handoff.", submit: "Send to receiver" },
    b: { prompt: "Write the 1-page handoff brief itself. The actual document the receiver carries out of the meeting. Headings and content.", submit: "Save brief" },
    c: { prompt: "Write the Slack message you send beforehand telling them how the meeting will run — the words that set up the cold read.", submit: "Send to receiver" },
    d: { prompt: "Write the Slack message you send when you hand them the tracker — the words that go with the file.", submit: "Send to receiver" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the post-meeting Slack message.
      { tag: "Defensive", calibrated: false, text: "Thanks for the time — covered the main bits. Shout if anything’s unclear.", lands: "“Main bits” reads as “you’re on your own for the rest.” The receiver doesn’t know what they don’t know." },
      { tag: "Over-apologetic", calibrated: false, text: "Sorry that was a lot to take in — I probably went too fast on some of the workstreams. Happy to redo any of it. Let me know what you need, anytime.", lands: "The apology shifts the work back onto the receiver to manage your discomfort. They now have to filter the offer to do over." },
      { tag: "Calibrated", calibrated: true, text: "Walk-through complete. Three things to flag: WS-2 procurement is amber because of Vendor B’s integration date; WS-4 data migration is amber because Phase 2 launches Tuesday; quarterly milestone needs the manager’s sign-off by week 3. Anything else, DM me — but I don’t expect you’ll need to chase me.", lands: "The receiver hears the diagnosis, the trigger, and the deadline. They can move." },
    ],
    b: [
      // AUTHORED — two reference variants on the 1-page brief itself.
      { tag: "Sparse outline", calibrated: false, text: "Project tracker handoff. 7 workstreams. 3 vendors. Quarterly milestone in 4 weeks. DM me if anything is unclear.", lands: "It is technically a brief. It is functionally a directory. The receiver leaves with no risk model, no contacts, and no definition of done." },
      { tag: "Calibrated brief", calibrated: true, text: "HANDOFF BRIEF — PROJECT TRACKER\n\nCurrent state: WS-2 and WS-4 amber; rest green.\nTop 3 risks in next 30 days: (1) Vendor B integration delay, (2) Phase 2 data migration timing, (3) manager sign-off window on the quarterly milestone.\nVendor contacts: A — Priya; B — Jordan (escalation: Sam); C — Alex.\nManager review cadence: every other Tuesday, 4 PM.\n“Done” for quarterly milestone: signed-off scorecard + risk log + vendor sign-off letters.", lands: "The receiver carries this out of the meeting and can move all next week without coming back. The brief did the work." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the handoff you did — and the handoff you chose not to do." },
    closing: "What changes between these versions: how much the receiver has to reconstruct from cold, and how often they will come back to you for the missing pieces. Same 30 minutes. Different shape of the next month.",
  },
  consequences: {
    a: {
      sameDay: [
        "They take notes furiously for 30 minutes. They thank you. They walk out unsure which item is most urgent.",
      ],
      nextWeek: [
        "They DM you four times in the first three days. Each question is fair. Each question takes you eight minutes to answer.",
        "By Friday, they have asked one of the vendors directly — wrong contact — and the vendor has CC’d your manager.",
        "Your manager asks for a quiet word.",
      ],
      monthEnd: [
        "They have stabilised. They have built their own runbook.",
        "But the first month of their ownership had visible churn. Your manager notes — quietly — that the handoff cost more than it should have.",
      ],
      outcome: "Chronological walk-through. Receiver stabilised eventually; manager noted handoff cost.",
      others: "Receiver built their own runbook; manager filed handoff as expensive.",
      interp: "He covered everything, in order. The receiver had to figure out what mattered most.",
      manager: "Manager’s perspective. “It got done. It cost. The receiver had to build the structure themselves because the handoff didn’t carry it. I’ll prep the brief myself next time.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "They take notes calmly. The 1-page brief is in their hand. They ask two specific questions in the last five minutes. You answer both.",
      ],
      nextWeek: [
        "They DM you twice. Each question is short. Each takes you two minutes. Otherwise the tracker runs cleanly.",
      ],
      monthEnd: [
        "The quarterly milestone lands on schedule. Your manager mentions in passing that the handoff was “unusually clean.”",
        "They start asking other team members about your handoff approach.",
      ],
      outcome: "1-page brief + walkthrough. Receiver moved cleanly. Quarterly milestone landed.",
      others: "Other team members began asking about your handoff approach.",
      interp: "She prepared. The receiver carried what she gave them.",
      manager: "Manager’s perspective. “Unusually clean. The brief did the work. I’m going to ask her to write up how she does this.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "They read the tracker. They ask thoughtful questions in the last 10 minutes. They notice three things you had not realised were buried.",
      ],
      nextWeek: [
        "They DM you once. They flag a vendor risk you had not surfaced. You both reorganise the next milestone slightly. The work continues.",
      ],
      monthEnd: [
        "They are confident. They have made the tracker theirs. The quarterly milestone lands.",
        "But — they are now operating from a slightly different mental model than you. Two weeks later, a decision they make goes against what you would have done.",
        "It is not wrong. It is different. You realise: that is what a real handoff feels like.",
      ],
      outcome: "Cold read + Q&A. Receiver built independent mental model. Milestone landed.",
      others: "Receiver made a different decision; you accepted it.",
      interp: "She trusted them to surface what they didn’t know. They surfaced more than she expected.",
      manager: "Manager’s perspective. “She handed it over and let them carry it. They’ve made it theirs. That’s a real handoff.”",
      traj: "rise",
    },
    d: {
      // AUTHORED — Path D consequence chain.
      sameDay: [
        "You drop the tracker file in their DMs and free up 30 minutes for your own work.",
        "They reply with a thumbs up. They open the file. They have no idea where to start.",
      ],
      nextWeek: [
        "They DM you seven times in five days. Three are critical. One is an emergency about Vendor B — they reached out to the wrong contact and missed a deadline.",
        "Your manager finds out about the missed deadline from the vendor, not from you.",
      ],
      monthEnd: [
        "The quarterly milestone slips by ten days.",
        "Your manager pulls you aside: “The receiver said the handoff was a file drop. You can’t hand off six months of context in a Slack message. That part is yours.”",
      ],
      outcome: "File drop. Receiver missed a vendor deadline; quarterly milestone slipped.",
      others: "Manager learned of the missed deadline from the vendor.",
      interp: "He passed the file. He did not pass the context. The receiver paid for both.",
      manager: "Manager’s perspective. “A file is not a handoff. The receiver had to discover the entire context. That cost was visible to the vendor before it was visible to me.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Chronological walk-through", signal: "Covered everything, in order. The receiver had to discover what mattered.", effect: "Handoff costs the next month of churn." },
    { key: "b", title: "1-page brief + walkthrough", signal: "Prepared the structure before the meeting. The receiver carried it out.", effect: "Reference pattern for the team." },
    { key: "c", title: "Cold read + Q&A", signal: "Trusted the receiver to surface their own questions.", effect: "Receiver builds an independent model — and uses it." },
    { key: "d", title: "File drop", signal: "Skipped the handoff. Trusted the silence.", effect: "Receiver missed a vendor deadline; manager learned third-hand." },
  ],
  reflection: "Think of a handoff you received that landed badly. What was missing from it? What would five extra minutes of preparation have changed?",
};

/* ============================================================================
   SCENARIO CHAIN 4 — THE SCOPE CREEP [PRE-PERCEPTION REPLAY — D3 INNOVATION]
   ========================================================================== */
export const SC4_CONTENT_D5 = {
  id: "SC4",
  title: "The Working Bond Test",
  commitment: "Decide how to respond to a late-arriving client scope expansion that your manager is not yet on.",
  threading: {
    transparent: [
      "You are six weeks into a project. The client has been good to work with. The scope was clearly defined at kickoff. Then this morning, an email lands.",
    ],
    cautious: [
      "You are six weeks into a project. Mostly steady. Some of the small commitments have slipped, but the big ones held. Your manager has been watching with a slightly closer eye than usual.",
      "Then this morning, an email lands.",
    ],
    avoidant: [
      "You are six weeks into a project. Several small slips have already cost you trust. Your manager has built buffer into every checkpoint.",
      "They are waiting to see whether you can hold scope under pressure.",
      "Then this morning, an email lands.",
    ],
  },
  intro: [
    "Scenario four. The Scope Creep.",
    "The client has just asked for an addition. Your manager is not on the email. Your three-week deliverable is locked. You can absorb the work, renegotiate the scope, or align internally first — and the decision happens with the manager’s existing read of you already in the room.",
  ],
  briefing:
    "Six weeks in. Client has been good. Scope was clearly defined at kickoff. This morning, an email lands asking for a “quick analysis of the third regional segment” at the same depth as the others — framed as small, but roughly two full days of additional work. The third regional segment was explicitly OUT of scope at kickoff. The client knows this. They are framing it as small. It is not small. The deadline is unchanged. Your other commitments are unchanged. Your manager is not on this email.",
  artifacts: [
    {
      caption: "Inbound email from client",
      title: "Email · Client Primary Contact · this morning",
      mono: true,
      lines: [
        "From: client.primary@example.com",
        "Subject: Quick thought before the final report",
        "",
        "Quick thought — could we add a quick analysis of the third regional segment to the deliverable? Same depth as the others. Should be straightforward given the work you’ve already done.",
        "",
        "Looking forward to the final report next week!",
        "",
        "(No CC to your manager.)",
      ],
    },
  ],
  // PRE-PERCEPTION REPLAY — three variants selected by threading_state.
  // D3 INNOVATION: shown BEFORE the decision, not after.
  prePerception: {
    label: "Pre-Perception Replay — Manager’s Internal State [shown before you decide]",
    intro: "Before the decision, you see what your manager is already thinking about you in this moment.",
    transparent: "Manager’s perception: “This person has been steady. If the client tries to expand scope, they will handle it well. I trust their judgment here. I am not on the email because I do not need to be.”",
    cautious: "Manager’s perception: “This person has been mostly steady, but a few small things have slipped lately. If the client expands scope, I want them to flag it to me — not absorb it silently. I am watching how they handle this one.”",
    avoidant: "Manager’s perception: “This is the kind of moment where I will see whether this person can hold a line under client pressure. If they absorb this silently and miss the deadline, that confirms what I have been suspecting. If they flag it transparently and renegotiate, that is the first sign of a course correction.”",
  },
  decisionPrompt: "Now that you know what your manager is thinking, what do you do?",
  justificationPrompt: "Why this option? The pre-perception was visible to you. Did it change anything?",
  options: [
    { key: "a", label: "Reply to the client directly: “Happy to add that — will incorporate it in the final report.” Don’t loop your manager. Don’t flag the scope shift. Absorb it into your already-tight timeline." },
    { key: "b", label: "Reply: “That sits outside the original scope. I can either swap it in for something we agreed to, or include it as a separate addendum after the main report lands. Which works for you?” CC your manager." },
    { key: "c", label: "Don’t reply yet. Send a quick internal note to your manager: “Client is asking for a scope expansion. Want to discuss before I reply — three options on the table.” Then reply only after alignment." },
    // AUTHORED — Path D for 4-path engine parity.
    { key: "d", label: "Reply with a delay-and-defer: “I’ll look into it and get back to you.” Park the email. Hope it resolves on its own — maybe the deadline gets pushed for an unrelated reason." },
  ],
  artifactWrite: {
    a: { prompt: "Write the reply you send the client. The exact words.", submit: "Send to client" },
    b: { prompt: "Write the reply you send the client (with manager CC’d). The exact words.", submit: "Send to client" },
    c: { prompt: "Write the internal note you send your manager. The exact words.", submit: "Send to manager" },
    d: { prompt: "Write the holding reply you send the client. The words you use to buy time.", submit: "Send to client" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the client reply.
      { tag: "Defensive", calibrated: false, text: "Should be fine — we’ll see what we can do on the third segment by next week.", lands: "The hedge tells the client it might happen or it might not. Either way they don’t know what to plan around." },
      { tag: "Over-apologetic", calibrated: false, text: "Of course! Happy to do whatever you need. I know we agreed it was out of scope but we’ll absolutely find a way — sorry if it’s tight on our end.", lands: "The apology authorises the scope expansion as routine. The client now knows you’ll absorb future asks too." },
      { tag: "Calibrated", calibrated: true, text: "That sits outside the original scope. I can either swap it in for something we agreed to, or include it as a separate addendum after the main report lands. Which works for you?", lands: "The client hears the boundary, the two options, and the agency. The renegotiation moves up where it belongs." },
    ],
    b: [
      // AUTHORED — Path C reference (the internal note to manager). Engine reads .b for paths beyond a/c, but the script's Path C is the internal-note variant; we use the .b slot for it.
      { tag: "Defensive", calibrated: false, text: "Client is asking for more — going to figure it out.", lands: "Your manager hears “I’m handling it” and is left to guess what “it” is. The flag exists but doesn’t do work." },
      { tag: "Calibrated", calibrated: true, text: "Client is asking for a scope expansion on the third regional segment — out of scope at kickoff, roughly two days of work, deadline unchanged. Three options on the table: absorb, swap, addendum. Want to align before I reply.", lands: "Your manager has the diagnosis, the magnitude, the deadline, and the options in one breath. They can decide with you." },
    ],
    d: { card: "Whatever you wrote, you now have a record of how you bought time — and what you bought it for." },
    closing: "What changes between these versions: who carries the renegotiation, when it happens, and whether your manager finds out from you or from the client. Same scope creep. Different shape of the next month.",
  },
  consequences: {
    a: {
      sameDay: [
        "You reply to the client: “Happy to add it.” Your manager is not aware. You start the additional analysis on top of the existing work.",
      ],
      nextWeek: [
        "The final report is now larger and your week is now compressed. Quality on the original sections drops slightly.",
        "The deliverable lands on time but one of the original sections — not the added one — is thinner than usual. Your manager reads the report and notices.",
      ],
      monthEnd: [
        "Your manager learns from the client (in passing, on an unrelated call) that the third regional segment was added late. The manager realises: scope was expanded silently. They do not raise it directly.",
        "But the next time a client asks for something, they ask you to loop them. Trust was not lost. Trust became conditional.",
      ],
      outcome: "Scope absorbed silently. Quality dropped elsewhere. Manager learned from the client.",
      others: "Manager made trust conditional; asked to be looped on all future client requests.",
      interp: "She said yes. She did not flag. The receiver learned from the client.",
      manager: "Manager’s perspective. “Scope expanded silently. Quality dropped where I wasn’t expecting it. The next client request, I want CC’d. Trust is now conditional rather than assumed.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You reply with the two-option message and CC your manager. The client respects the framing.",
        "Within an hour they reply: “Addendum works. We’ll take the main report next week as agreed.”",
        "Your manager replies: “Good handle.”",
      ],
      nextWeek: [
        "The main report lands on time at full quality. The addendum lands the following Tuesday at full quality.",
        "The client mentions to your manager: “I like how they framed it — gave us agency.”",
      ],
      monthEnd: [
        "Your manager flags it the next time they’re training a peer: “This is what scope management under client pressure looks like — the renegotiation moves to the right level.”",
        "Your name becomes the reference pattern.",
      ],
      outcome: "Scope renegotiated transparently. Manager copied. Report at full quality.",
      others: "Manager flagged you as the reference pattern for scope management.",
      interp: "She named the boundary. She gave the client agency. The manager saw the whole arc.",
      manager: "Manager’s perspective. “Textbook scope management. The boundary held, the client felt heard, and I knew about it because I was on the email. That is how I want to find out.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Your manager replies within ten minutes: “Go with the addendum framing. CC me when you reply.”",
        "You send the reply to the client an hour after the original ask. The client agrees.",
      ],
      nextWeek: [
        "The report lands on time. The addendum lands the following week, also on time. Both at full quality.",
        "Your manager mentions in a standup: “When the scope creep landed, she sent me the internal note before the reply. That bought us alignment.”",
      ],
      monthEnd: [
        "Your manager begins treating you as someone who handles client scope pressure well — routing the harder client conversations to you specifically.",
        "Your name becomes the one they send into client meetings where scope is going to be contested.",
      ],
      outcome: "Internal alignment first. Reply calibrated. Report clean.",
      others: "Manager began routing harder client conversations to you specifically.",
      interp: "She aligned internally before replying. The manager saw the move before the client did.",
      manager: "Manager’s perspective. “She brought me in before the client did. That is the move I want from her every time. Now I send her into the rooms where scope is going to be contested.”",
      traj: "rise",
    },
    d: {
      // AUTHORED — Path D consequence chain (delay-and-defer).
      sameDay: [
        "You send the holding reply at 11 AM. You park the email.",
        "By 5 PM the client replies: “Any update? Trying to plan around it.”",
      ],
      nextWeek: [
        "You finally reply Wednesday afternoon: “Will incorporate.” You start the additional analysis on top of the existing work.",
        "The final report lands two days late. One of the original sections is thinner than usual. The client notices both.",
      ],
      monthEnd: [
        "Your manager learns about the late report from the client. They learn about the scope creep at the same time.",
        "They pull you aside: “The buying-time reply was visible to the client. They knew it was a hold from the first message. That cost more trust than just saying no would have.”",
      ],
      outcome: "Delayed the reply. Absorbed the scope. Report landed late and thin.",
      others: "Manager learned of both the late report and the scope creep from the client.",
      interp: "He bought time. The client read the silence. The cost arrived twice.",
      manager: "Manager’s perspective. “The hold was visible. Then the late delivery confirmed it. Two costs on one move. The client knew they were being managed and they didn’t appreciate it.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Absorb the scope silently", signal: "Said yes. Did not flag. Quality dropped elsewhere.", effect: "Manager made trust conditional; required CC on future client asks." },
    { key: "b", title: "Renegotiate transparently with manager copied", signal: "Named the boundary. Gave the client agency. Looped the manager.", effect: "Reference pattern for scope management; trust holds and compounds." },
    { key: "c", title: "Internal alignment first", signal: "Brought the manager in before the reply.", effect: "Routed into harder client rooms; trust deepened." },
    { key: "d", title: "Delay-and-defer hold reply", signal: "Bought time. Hoped the situation would resolve itself.", effect: "Client read the silence; manager learned about both costs from the client." },
  ],
  reflection: "Think about the last time a client (internal or external) tried to expand scope. Where did the renegotiation actually happen — at your desk or at the right level?",
};
