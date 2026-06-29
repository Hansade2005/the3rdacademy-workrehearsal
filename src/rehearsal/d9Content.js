/* ============================================================================
   D9 CONTENT LAYER — Learning Agility (Probation Blueprint Capstone)
   Production reference v1.0 FINAL (May 2026). Mirrors the d3Content schema
   shape so the engine renders D9 unchanged. Where the script declares only a
   pattern (not exact prose), authored copy is FLAGGED with an AUTHORED comment
   in the script's observational register.

   Cross-module memory contract:
     prior_module_references = ["D1","D2","D3","D4","D5","D8"]
     D9 consumes D8.final_personal_sentence + D8.recovery_pattern_state_final
     D9 emits the Probation Blueprint completion record at G-4.

   Override 1 (§3.0): Agility Ledger columns are
     Scenario / Feedback or Experience / What You Extracted / What Changed Next
   not the universal Scenario / Commitment / Outcome / Others' Adjustment.

   Threading state model: agility_pattern_state with five values
     defensive / selective / theoretical / applying / integrating
   For engine compatibility the renderer maps:
     defensive   → avoidant
     selective   → cautious
     theoretical → cautious
     applying    → transparent
     integrating → transparent
   ========================================================================== */

export const D9_CONTENT = {
  module: {
    id: "D9",
    title: "Learning Agility — Growth That Transfers",
    tier: "Foundational",
    sector_variants: ["Technology/Software"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Technology/Software workplace context. The same context applies across all four scenarios.",
      pickerHint: "The context you choose here applies across all four scenarios.",
    },
  },
  dimension: {
    id: "D9",
    name: "Learning Agility",
    central_question:
      "When something challenges how you work, do you grow from it — or just survive it?",
    framework: { label: "The Learning Cycle", body: "Receive → Absorb → Apply → Integrate" },
  },
  // Threading state model per Engineering Doctrine §5.
  threading_state_model: "agility_pattern_state",
  agility_pattern_states: ["defensive", "selective", "theoretical", "applying", "integrating"],
  // Cross-module memory contract — D9 consumes D8 and weaves D1–D5 + D8.
  prior_module_references: ["D1", "D2", "D3", "D4", "D5", "D8"],

  /* -------- SEGMENT A — COLD OPEN (COMFORT TRAP) + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    coldOpen: {
      // Beat 1 — D8 callback prefix beat (conditional render).
      // TODO(cross-module-memory): replace fallback playback with participant's
      // verbatim D8 final_personal_sentence once the cross-module memory store
      // is online. Atmosphere overlays keyed by prior.D8.recovery_pattern_state_final.
      d8Callback: {
        wrapperLead: "Last time, you wrote this about returning after pressure without pretending nothing changed…",
        sentenceSlot: "{{prior.D8.final_personal_sentence}}",
        wrapperTail: "That sentence still belongs to you. We are going to ask you to live another moment now — a moment where what you carried matters.",
        atmosphere: {
          restored: "Your recovery held. The next test is what changed after the recovery.",
          masking: "Your recovery was uneven. What follows now is whether the lesson stayed.",
          spiralling: "Your recovery was uneven. What follows now is whether the lesson stayed.",
        },
        fallback: "This module can stand alone, but it connects more deeply after the prior six dimensions of the Probation Blueprint. We are going to ask you to live a moment now — a moment where what you do with what you have already been told matters.",
      },
      // Engine-compat alias: the existing D9 renderer (cloned from D3) reads
      // .d2Callback for the Beat 1 surface. Keep an alias so the cold open
      // renders unchanged. Same payload as d8Callback above.
      d2Callback: {
        wrapperLead: "Last time, you wrote this about returning after pressure without pretending nothing changed…",
        sentenceSlot: "{{prior.D8.final_personal_sentence}}",
        wrapperTail: "That sentence still belongs to you. We are going to ask you to live another moment now — a moment where what you carried matters.",
        fallback: "This module can stand alone, but it connects more deeply after the prior six dimensions of the Probation Blueprint. We are going to ask you to live a moment now — a moment where what you do with what you have already been told matters.",
      },
      // Setup narration — Beat 2, the Comfort Trap arc.
      narration: [
        "It is 4:47 PM on a Friday. Your quarterly review just landed in your inbox. The headline is good. Solid. Reliable. ‘Continues to deliver.’ You scroll to the bottom.",
        "And then you see this:",
        "Same growth areas as the August review.",
        "You read the line three times.",
        "The phrasing is gentle. The implication is not. The first time you saw this feedback was March. The second was August. This is the third time. You have said you would work on it, twice. Both times you meant it. Both times you did not.",
        "You have not received a hard piece of feedback in five months. You do not know whether that is because you got better — or because people gave up.",
      ],
      mistakeLine: "The mistake was not failing to hear it. The mistake was hearing it three times.",
      options: [
        { key: "a", label: "Reply to the review thanking my manager. Schedule time to revisit my goals on Monday." },
        { key: "b", label: "Open a blank doc. Write the exact behaviour I have not changed. Email my manager: ‘I want to talk about why I have not done what I said I would do twice. Can we book 30 minutes next week?’" },
        { key: "c", label: "This feedback is wrong. My manager is comparing me to someone I am not. I will set up a meeting to push back." },
        { key: "d", label: "This is fine. The review is positive overall. I will work on it this quarter, like I said before." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk?",
      // A-1.5 mandatory two-line artifact-write (Comfort Trap experiential).
      artifactWrite: {
        label: "Cold-open artifact-write (A-1.5) · two lines",
        prompt: [
          "Write the exact behaviour you have not changed, in one sentence.",
          "Then write the first sentence of the message you would send your manager.",
        ],
        line1Placeholder: "the behaviour you have not changed…",
        line2Placeholder: "the first sentence of the message you would send…",
        submit: "Continue",
        minChars: 30,
        maxChars: 220,
      },
      sameDay: {
        a: [
          "Your manager replies pleasantly: “Sure — Monday works.” The Monday session gets booked. You start the weekend feeling productive.",
          "By Sunday night you have not opened the doc. By Wednesday the Monday session has been postponed to the following week. Nothing has changed yet.",
        ],
        b: [
          "Your manager replies within twenty minutes: “Yes. Thank you for naming it. Tuesday 10 AM works.” The conversation has started.",
          "The weekend will not feel comfortable. You will think about what to say on Tuesday.",
        ],
        c: [
          "Your manager replies, polite but clipped: “Happy to discuss. Let’s look at the specifics together.”",
          "The shift is not what you wanted. You can feel something has hardened in the tone.",
        ],
        d: [
          "No reply needed. You close the laptop. You enjoy the weekend.",
          "On Monday, your manager moves a stretch assignment to a peer. They do not say why. You do not ask.",
        ],
      },
    },
    safetyFloor: {
      card: [
        "THIS IS REHEARSAL, NOT EVALUATION.",
        "Nothing you do here is shared, scored, or sent to your employer.",
        "D9 is not a Korn Ferry instrument. D9 does not produce a learning-agility score. D9 is a private rehearsal mirror.",
        "Your Growth Log captures what you practised and how you engaged — it is your private development record.",
        "What you just experienced was one moment, with four paths, and four outcomes. None of those outcomes are rated. They are observed.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    intro: [
      "Before we go further, a quick read.",
      "What you are about to see is not a rulebook. It is a field guide — a description of what learning agility looks like under workplace pressure, and how it quietly breaks down when no one says anything.",
      "The scenarios you will face later are built on what is in this guide. Read it carefully.",
    ],
    fieldGuide: {
      meaning: {
        title: "B-1 · WHAT D9 IS",
        body: [
          "Learning agility at work is the behaviour pattern that decides whether what happens to you actually changes how you work.",
          "Learning agility is not whether you can absorb new information. It is whether the information changes the next thing you do. The workplace measures you not on what you understood. It measures you on what you became different about.",
          "Learning Agility is not how quickly you understand feedback. It is how quickly feedback changes your next behaviour.",
        ],
      },
      present: {
        title: "B-3 · WHAT LEARNING LOOKS LIKE UNDER WORKPLACE PRESSURE",
        intro: "Seven things that show learning agility is present:",
        items: [
          { h: "Faithful repeat-back.", t: "You can state the feedback in the giver’s own words before responding." },
          { h: "Honest absorption.", t: "You can name what part is true even if you do not like the framing." },
          { h: "Observable change.", t: "You change one observable behaviour by the end of the week." },
          { h: "External check.", t: "You set a specific check-in to confirm the change has held." },
          { h: "Status-blind acknowledgement.", t: "You acknowledge when someone junior is right and you were wrong." },
          { h: "Active seeking.", t: "You ask why feedback has stopped arriving when it has." },
          { h: "Pattern awareness.", t: "You revisit your own pattern across multiple feedback moments, not just the last one." },
        ],
      },
      breakdown: {
        title: "B-4 · HOW LEARNING BREAKS DOWN",
        intro: "Seven things that show learning agility is breaking down:",
        items: [
          { h: "Defensive Receiver.", t: "You explain why the feedback does not quite apply to you." },
          { h: "Selective Absorber.", t: "You take the part that confirms what you already believed." },
          { h: "Theoretical Applier.", t: "You agree the feedback is right and change nothing." },
          { h: "Two-Week Drifter.", t: "You change one behaviour for two weeks and drift back." },
          { h: "Passive Receiver.", t: "You wait for feedback to arrive instead of seeking it." },
          { h: "Status-Filterer.", t: "You absorb feedback from people senior to you and dismiss it from people junior." },
          { h: "Silence-Comforter.", t: "You assume silence means you are doing well." },
        ],
      },
      isNot: {
        title: "B-2 · WHAT D9 IS NOT",
        lines: [
          "D9 is not growth mindset.",
          "D9 is not being a fast study.",
          "D9 is not curiosity.",
          "D9 is not being humble in the abstract.",
          "D9 is not agreeing with every piece of feedback.",
          "D9 is not over-rotating to please whoever spoke last.",
        ],
        narration: "The workplace does not need you to receive feedback well in the moment. It needs to see whether the feedback changed how you work three months later. Three minutes of agreement is not three months of change. The workplace can tell the difference.",
      },
      costEquation: {
        title: "B-5 · THE COST EQUATION",
        headline: "Un-integrated feedback becomes the pattern others stop bothering to challenge.",
        rows: [
          "Fewer stretch assignments.",
          "Softer feedback (the cost of being un-coachable is that people stop trying).",
          "Slower promotion velocity.",
          "Mentors drifting away.",
          "Capability plateau without warning.",
          "Career repetition instead of compound growth.",
        ],
        narration: "The most expensive line on a quarterly review is not the one telling you what to fix. It is the one that reads the same as last quarter.",
        brutalLine: "Some people do not lack feedback. They lack transfer.",
      },
      end: {
        title: "WHERE THIS DIMENSION ENDS",
        body: [
          // AUTHORED — D9 boundary paragraph in the script's register, mirroring D3's scope-notice cadence. D9 is the MVP capstone.
          "Learning Agility (D9) is the capstone of the Probation Blueprint. It assumes you have already rehearsed truth (D1), ownership (D2), reliability (D3), communication under pressure (D4), collaboration (D5), and recovery (D8). D9 asks the one question every prior module assumed but never tested: did your next behaviour change because of what you learned?",
          "The Foundational tier holds the learning-agility question to the single behaviour cycle — Receive, Absorb, Apply, Integrate. The Intermediate tier covers learning agility under longitudinal stake — across a full year, across multiple managers, across changing organisational contexts.",
        ],
      },
    },
    reflectionPrompt:
      "Before we go any further — take 60 seconds. Think about the last working quarter. Is there a piece of feedback you have received more than once that you have not yet converted into a behaviour someone else can observe? You do not have to share it. We are asking you to notice it.",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    c1: {
      title: "C1 — Receiving Is Not Learning",
      narration: [
        "Most people confuse the act of receiving feedback with the act of learning from it. They are different behaviours, separated by months of follow-through. The first lasts one meeting. The second lasts six months.",
        "Receiving is a moment. Learning is a pattern. The two get confused because they start the same way.",
      ],
      signals: [
        { n: "i", h: "Lasts the meeting — or lasts six months.", t: "Receiving feedback lasts the meeting. Learning from feedback lasts six months." },
        { n: "ii", h: "Confirmed by what you say — or by what someone else can observe.", t: "Receiving is confirmed by what you say. Learning is confirmed by a different behaviour next Tuesday that someone else can see." },
        { n: "iii", h: "You decide — or they decide.", t: "Receiving is something you decide you did well. Learning is something they decide you did well." },
      ],
      close:
        "This module is not about how well you receive feedback in the moment. It is about whether the receiving translated into anything someone else can see months later.",
      // AUTHORED — C1 reflection prompt (script does not specify; mirrors D3's C1 cadence).
      prompt: "Think of a person at work, school, or in any professional context who is known for actually changing how they work after feedback. What do you see them do that others don’t?",
    },
    c2: {
      title: "C2 — The Comfort Trap",
      narration: [
        "The most dangerous learning moment is not when feedback is rejected. It is when the participant stays close to what already makes them feel competent — and stops being asked to grow.",
        "Comfort can look polished. Comfort can look professional. Comfort can even look like success. Until the environment changes — and you cannot.",
        "The person inside the Comfort Trap did not refuse growth. They just kept doing what was already working, while the work around them quietly moved on.",
      ],
      equation: {
        title: "INSIDE / OUTSIDE THE COMFORT TRAP",
        rows: [
          { k: "Inside", v: "Hard feedback has stopped arriving." },
          { k: "Outside", v: "Hard feedback still arrives, because people still expect more from you." },
          { k: "Inside", v: "You assume the silence means you are doing well." },
          { k: "Outside", v: "You ask why the silence is there." },
          { k: "Inside", v: "Your last stretch assignment was a while ago." },
          { k: "Outside", v: "Stretch assignments still come." },
          { k: "Inside", v: "You feel competent. The work feels predictable." },
          { k: "Outside", v: "You feel competent. The work still surprises you." },
        ],
        footer: "The person does not refuse growth. They stay close to what already makes them feel competent.",
      },
      delayed: [
        "When feedback stops arriving, ask whether you got better — or whether the room stopped expecting more from you.",
      ],
      closing: [
        // AUTHORED — closing pivot to the Learning Cycle naming.
        "Comfort Traps do not feel like traps from the inside. They feel like competence. That is the part that makes them dangerous.",
        "There is a method that breaks them. We name it next.",
      ],
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question.",
        echo: "When something challenges how you work, do you grow from it — or just survive it?",
        closing: "Now you know the tension this module is built on. The single piece of feedback acted on is unremarkable. The pattern of feedback that has changed your next behaviour, across managers, across years — that is the whole module.",
      },
      // AUTHORED — C2 reflective decision prompt (engine parity with D3's C2).
      prompt: "Which of these reads most like a Comfort Trap, in your experience?",
      options: [
        { key: "a", label: "Hard feedback has stopped arriving and you are not asking why." },
        { key: "b", label: "Your last stretch assignment was a long time ago and nothing about that surprises you." },
        { key: "c", label: "You feel competent every day and the work no longer surprises you." },
        { key: "d", label: "Quarterly reviews keep saying the same growth area, in slightly different words." },
      ],
      justificationPrompt: "Why this one? What does that pattern feel like from the inside?",
    },
    c3: {
      title: "C3 — The Learning Cycle",
      open:
        "You have already felt the Trap. The quarterly review with the same line at the bottom for the third time. Now we name the method that breaks it.",
      framework: "The Learning Cycle",
      steps: [
        { name: "Receive.", body: "Take it in without filtering through ego. Hear the full thing. The failure mode this step exposes is the Defensive Receiver — explains, justifies, or deflects before hearing." },
        { name: "Absorb.", body: "Decide what part is true even if you do not like it. The failure mode this step exposes is the Selective Absorber — takes only the confirming part." },
        { name: "Apply.", body: "Change one thing in your actual work this week. One observable behaviour, with a timeframe, and someone external who can confirm the change held. The failure mode this step exposes is the Theoretical Applier — agrees in principle, changes nothing." },
        { name: "Integrate.", body: "Until the new way is your way — six months from now, still doing it differently. The failure mode this step exposes is the Two-Week Drifter — changes briefly, drifts back." },
      ],
      close: [
        "The Learning Cycle does not require talent. It does not require speed. It requires honesty. And honesty about your own gaps is the hardest kind.",
        "You will see all four steps tested in the scenarios ahead. After each scenario, the Agility Ledger will add a row. The fourth column — What Changed Next — is the whole module.",
      ],
      // AUTHORED — C3 reflection prompt in the script's register.
      prompt: "Of the four steps — Receive, Absorb, Apply, Integrate — which one would you skip first when the week gets tight? Which one have you been skipping for a while? One sentence each.",
    },
    complete: {
      label: "Transition to Segment D · 15s",
      narration: [
        "You now have the framework. Four steps. The Learning Cycle.",
        "Now I want you to meet someone who heard the same feedback for three years across three managers — and never made it change anything.",
        "Put your headphones on if you have them.",
      ],
      scopeBoundaries: {
        title: "Scope Boundaries — Foundational Tier and What the Capstone Adds",
        paragraphs: [
          // AUTHORED — D9 Foundational/Capstone boundary, script register.
          "This behavioural Dimension [D9], Learning Agility — Foundational, is the capstone of the Probation Blueprint MVP. It rehearses learning agility as workplace behaviour: whether feedback you have already received has changed your next observable behaviour.",
          "The scenarios are designed so the standard is knowable. The difficulty lives in whether you honour the Learning Cycle when nobody is watching, when the feedback is from someone junior to you, and when the pattern across multiple feedback moments would be uncomfortable to name.",
          "What this tier does not cover is learning agility across years of organisational change — the layer where the same person re-encounters the same growth area in three different companies, with three different managers, over five years. That longitudinal architecture is the Audio Case you are about to enter — and the Capstone Memory Weave at the end of this module.",
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

  /* ---------------- SEGMENT D — AUDIO CASE: THE FEEDBACK THAT FOLLOWED HER -------------- */
  // D9 LONGITUDINAL ARCHITECTURE — Priya across 3 managers, 3 organisations, 5 years.
  // 9 beats. 4 voice profiles. 1 decision pause (D-6). 1 retrospective Growth
  // Extraction (D-8). The engine reuses D3's audio-case + pause1 + retrospective
  // shape; D-1..D-5 narration is mapped into part1; D-6 = pause1; D-7 reference
  // calibration = part2; D-8 retrospective = retrospective; D-9 debrief = part3.
  segmentD: {
    title: "The Feedback That Followed Her",
    intro: [
      "This is the story of someone you probably know. You may have worked with them. You may be them. Her name is Priya. What matters is the pattern.",
      "Three managers. Three organisations. Five years. The wording was slightly different each time. The substance was identical. The change never came.",
      "What happened to Priya was not dramatic. There was no crisis. No confrontation. No failure anyone would write a report about. What happened was small. And it happened across years. And by the time anyone said anything directly, the damage was already a pattern.",
    ],
    // 9-beat structure — rendered as a structured array. The renderer walks
    // segmentD.beats in order, lighting voice-profile labels + temporal pills.
    beats: [
      {
        id: "D-1",
        heading: "Beat D-1 — Setup: The Third Manager (2025)",
        voice: "avatar",
        voiceLabel: "Avatar (setup narration)",
        temporal: "November 2025 · Third organisation · Third manager",
        onScreen: "November 2025. Third organisation. Third manager. One piece of feedback.",
        narration: [
          "This is Priya. Senior analyst. Strong on the work. Respected. It is November 2025. She has just sat down for a development conversation with her third manager in five years.",
          "The manager begins. Priya hears the feedback. She agrees with it. She has heard something like it before. She is not sure where.",
        ],
      },
      {
        id: "D-2",
        heading: "Beat D-2 — Priya’s Internal Experience (2025)",
        voice: "priya_AI",
        voiceLabel: "Priya · internal narration (2025)",
        temporal: "November 2025",
        narration: [
          "My manager said ‘Your conclusions are sound. The team feels like they’re watching the meeting rather than being in it.’ I nodded. I thought — okay, fair, I do move fast. I said ‘Thank you. I’ll work on it.’",
          "I meant it. I always mean it.",
          "On the way back to my desk, something nagged at me. I had heard something like this before. I could not remember exactly when. Maybe at the last company. Maybe the one before that. I shook it off.",
          "I am a high performer. I get the work done. The feedback was useful. I would think about it.",
        ],
      },
      {
        id: "D-3",
        heading: "Beat D-3 — Cut Back: The Second Manager (2023)",
        voice: "manager_2_AI",
        voiceLabel: "Manager 2 · 2023 · pragmatic, recollective",
        temporal: "Two years earlier · Different company · Different room",
        narration: [
          "This was in 2023. I had just promoted Priya to lead the strategy review. She was running her third one. I pulled her aside afterward and said: ‘Your analysis is excellent. But your team feels like they are watching the meeting rather than being in it. You are arriving at the answer faster than they can travel to it.’",
          "She nodded. She said she would work on it. I believed her. I think she believed herself.",
          "Six months later it was still the same. I stopped raising it. I started routing the strategy reviews around her.",
        ],
      },
      {
        id: "D-4",
        heading: "Beat D-4 — Cut Back: The First Manager (2021)",
        voice: "manager_1_AI",
        voiceLabel: "Manager 1 · 2021 · warm, recollective",
        temporal: "Two years before that · Priya’s first job out of grad school",
        narration: [
          "It was 2021. Priya was eighteen months in. Hardworking. Sharp. I sat down with her in our quarterly and said: ‘You are strong on analysis. You jump to recommendations before the team is ready. You need to slow down enough to bring the room with you.’",
          "She wrote it down. She said ‘Got it. I’ll work on this.’ She meant it.",
          "Six months later I gave the same feedback in different words. Six months after that, I stopped giving it. Priya left for a bigger role at another company. Her last 360 still mentioned it. I always wondered if anyone there would say it to her.",
        ],
      },
      {
        id: "D-5",
        heading: "Beat D-5 — The Pattern Reveal (back to 2025)",
        voice: "avatar",
        voiceLabel: "Avatar · calm, slow",
        temporal: "Back to 2025 · all three managers visible",
        narration: [
          "Three managers. Three organisations. Five years. The wording was slightly different each time. The substance was identical.",
          "Slow down enough to bring the room with you.",
          "Your team feels like they are watching the meeting rather than being in it.",
          "You are arriving at the answer faster than they can travel to it.",
          "Each manager gave the feedback once or twice. Then they stopped. Priya never made the change. She always meant to. She never made it.",
        ],
        wow: "Ignored feedback does not disappear. It follows you in different clothing.",
      },
    ],
    // Engine compat — part1 / pause1 / part2 / retrospective / part3 map to the
    // D3 audio-case surface. Beats D-1..D-5 → part1 (with the report artifact
    // visualising the longitudinal pattern). Beat D-6 → pause1. Beat D-7 →
    // part2 (reference calibration). Beat D-8 → retrospective. Beat D-9 → part3.
    part1: {
      heading: "Beats D-1 through D-5 — Walking Backward Through Five Years",
      narration: [
        "Beat D-1 (avatar, 2025). This is Priya. Senior analyst. Strong on the work. Respected. It is November 2025. She has just sat down for a development conversation with her third manager in five years. The manager begins. Priya hears the feedback. She agrees with it. She has heard something like it before. She is not sure where.",
        "Beat D-2 (Priya internal, 2025). My manager said ‘Your conclusions are sound. The team feels like they’re watching the meeting rather than being in it.’ I nodded. I thought — okay, fair, I do move fast. I said ‘Thank you. I’ll work on it.’ I meant it. I always mean it. On the way back to my desk, something nagged at me. I had heard something like this before. I could not remember exactly when. I shook it off.",
        "Beat D-3 (Manager 2, 2023). This was in 2023. I had just promoted Priya to lead the strategy review. I pulled her aside afterward and said: ‘Your team feels like they are watching the meeting rather than being in it. You are arriving at the answer faster than they can travel to it.’ She nodded. She said she would work on it. Six months later it was still the same. I stopped raising it. I started routing the strategy reviews around her.",
        "Beat D-4 (Manager 1, 2021). It was 2021. Priya was eighteen months in. I sat down with her in our quarterly and said: ‘You jump to recommendations before the team is ready. You need to slow down enough to bring the room with you.’ She wrote it down. She said ‘Got it. I’ll work on this.’ She meant it. Six months later I gave the same feedback in different words. Six months after that, I stopped giving it.",
        "Beat D-5 (avatar, back to 2025). Three managers. Three organisations. Five years. The wording was slightly different each time. The substance was identical. Each manager gave the feedback once or twice. Then they stopped. Priya never made the change. She always meant to. She never made it.",
      ],
      reportArtifact: {
        title: "PRIYA — Longitudinal Feedback Pattern",
        lines: [
          "2021 (Manager 1):  ‘Slow down enough to bring the room with you.’       → received, never applied",
          "2023 (Manager 2):  ‘Your team feels like they are watching the meeting.’ → received, never applied",
          "2025 (Manager 3):  ‘Your conclusions are sound. The team is watching.’  → about to be received",
          "",
          "Three managers · three organisations · five years · one piece of feedback.",
          "Number of changes Priya made: 0",
          "Number of managers who stopped offering: 2 of 2",
        ],
      },
      reflection: {
        heading: "Beat D-5 — The Pattern Reveal",
        narration: [
          "Three managers. Three organisations. Five years. The substance was identical.",
          "Ignored feedback does not disappear. It follows you in different clothing.",
        ],
      },
    },
    pause1: {
      heading: "Beat D-6 — Decision Pause (2025)",
      prompt:
        "Back in the 2025 conversation, Manager 3 has just delivered the feedback. They have ended with one question. Priya does not know yet that they are the third person to give her this feedback. But she suspects. Manager 3 asks: “I want to invest in you. I need to know whether you can hear something you have probably already been told.” The third time you hear it, the question is no longer about the feedback. The question is about you. What does Priya do?",
      voiceLabel: "Manager 3 · direct, careful, deciding whether to invest",
      options: [
        { key: "a", label: "“Yes — I can hear it. I appreciate you saying this directly. I’ll work on it.” (The Priya response. Will mean it. Will not do it.)" },
        { key: "b", label: "“You are not the first to tell me this. I think I owe you specificity. Here is one thing I can change starting Tuesday — in our Friday strategy meeting, I will not state my recommendation until after at least three other people have spoken. Can you flag me if I forget?” (Name the pattern. Convert to one observable behaviour with an external check.)" },
        { key: "c", label: "“Honestly, I don’t think I am that fast. I think the team finds it useful when someone moves the conversation forward.” (Defensive reframe.)" },
      ],
      justificationPrompt: "Why this option? What is Priya trying to protect, and what is she willing to risk?",
    },
    part2: {
      heading: "Beat D-7 — Reference Calibration",
      narration: [
        "Three reference versions for the Decision Pause you just made.",
        "Reference 1 — The Priya response. ‘Yes — I can hear it. I’ll work on it.’ Receives and agrees. No transfer. Manager 3 will be the fourth-to-last person to bother giving this feedback.",
        "Reference 2 — Name the pattern with a behaviour change. ‘You are not the first to tell me this. Here is one thing I can change starting Tuesday.’ Receives, absorbs, applies. Names the pattern across managers. Converts to one observable behaviour with an external check. Manager 3 will invest.",
        "Reference 3 — Defensive reframe. ‘Honestly, I don’t think I am that fast.’ Filters the feedback through identity protection. Manager 3 hears that this is the response they were probing for. The investment does not happen.",
      ],
      timelineArtifact: {
        title: "BEAT D-7 — Reference Calibration",
        lines: [
          "Ref 1 — The Priya response       → received, agreed, no transfer",
          "Ref 2 — Name the pattern + apply  → received, absorbed, applied",
          "Ref 3 — Defensive reframe        → received, filtered, dismissed",
          "",
          "The three references are shown side-by-side.",
          "Your own version is not labelled. You draw your own conclusion.",
        ],
      },
    },
    // D-8 — Retrospective Growth Extraction (D9 signature mechanic).
    retrospective: {
      heading: "Beat D-8 — Recovery Retrospective + Growth Extraction [D9 SIGNATURE]",
      narration: [
        "Go back to 2021. Priya has just heard the feedback for the first time. Before the next six months passed and the feedback faded, what should she have done differently?",
        "Write a Growth Extraction. Three elements required: one observable behaviour she should have changed, by when she should have changed it, and who would have confirmed the change held.",
      ],
      writePrompt:
        "Write the Growth Extraction for Priya in 2021. Include all three elements: (1) one observable behaviour she should have changed, (2) the timeframe in which she should have changed it, (3) who would have confirmed it held.",
      submitLabel: "Save to Growth Log",
      minChars: 80,
      validatorElements: ["observable_behaviour", "timeframe", "external_check"],
      references: [
        { tag: "Reference 1 — General intention", text: "She should have worked on slowing down and bringing the team with her.", lands: "Cannot be observed by anyone else. This is the language of agreement, not change." },
        { tag: "Reference 2 — Better but still un-observable", text: "She should have made an effort to be more inclusive in meetings.", lands: "Still general. No behaviour. No timeframe. No external check." },
        { tag: "Reference 3 — Complete Growth Extraction", text: "In every Friday strategy meeting from January 2022 onward, she would not state her recommendation until at least three other people had spoken. Her peer Maya would have flagged her if she did. Maya would have confirmed the practice held at six months.", lands: "Observable behaviour, timeframe, external check. This is what Apply looks like." },
      ],
    },
    part3: {
      heading: "Beat D-9 — Debrief Through The Learning Cycle",
      narration: [
        "Here is what The Learning Cycle would have looked like inside Priya’s five years.",
        "Receive. Priya received the feedback every time. She never refused it. Receive was not the failure.",
        "Absorb. She absorbed the words. She agreed. She did not absorb the implication — that her natural strength was costing her relational reach.",
        "Apply. She never converted any of the three feedback moments into one observable behaviour change with an external check. This is the step that broke.",
        "Integrate. Without Apply, there was nothing to integrate. The drift was not slow. It was instantaneous.",
        "Priya did not reject feedback. She kept understanding it without becoming different.",
      ],
    },
    close: {
      card: [
        "You walked backward through five years with Priya.",
        "You met three managers, three rooms, one piece of feedback.",
        "You made one decision in 2025, and you wrote one retrospective for 2021.",
        "Some of what those decisions revealed, you saw as you made them.",
        "Some of it, you may not see for weeks.",
      ],
    },
    complete: {
      label: "Transition to Segment E · 20s",
      narration: [
        "You have heard the longitudinal pattern. You have decided inside the 2025 moment. You have written what should have happened in 2021.",
        "Next, you are inside the situation yourself. Four scenarios. Four decisions. Four consequence chains across this week, this month, and this quarter.",
        "Each scenario tests one step of The Learning Cycle. Trust your judgment. Make the call. See what happens.",
      ],
      continueLabel: "Continue",
    },
    breakPoint2: {
      label: "Pause invitation · Break Point 2 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 2",
      subtitle: "After Segment D",
      elapsedLabel: "Elapsed: ~37 minutes",
      remainingLabel: "Remaining: ~52 minutes",
      avatarScript: [
        "You have just walked backward through five years and made one decision in 2025 and one retrospective for 2021. Let what you have practised so far settle.",
        "The Scenario Lab ahead will ask more of you — and you are more ready for it than you think.",
        "Step away if you need to. Reflect. Come back when you are ready.",
      ],
      continueLabel: "Enter the Scenario Lab",
      returnLaterLabel: "Return later",
    },
  },

  /* ------------------ SEGMENT F — MICRO-DRILLS ------------- */
  segmentF: {
    intro: "Two short consolidation exercises. The Learning Cycle. The Scenario Lab pattern. Now: rapid recognition.",
    f1: {
      title: "Drill 1 — The Repeat-Back",
      audioIntro: "Practise receiving feedback by stating it back in the giver’s own framing before responding. Most defensive responses begin with a subtle restatement that smuggles in a defence. We will show you a single line of feedback, then three different restatements. Identify the faithful one.",
      header: "A colleague has just told you: ‘You take up so much space in meetings that the people who need to hear themselves think do not get to.’ Identify the faithful repeat-back.",
      onScreenHeader: {
        title: "THE REPEAT-BACK — IDENTIFY THE FAITHFUL RESTATEMENT",
        lines: [
          "A colleague has told you: “You take up so much space in meetings that the people who need to hear themselves think do not get to.”",
          "For each version, choose the one that keeps the giver’s framing intact.",
        ],
        cta: "Tap to begin.",
      },
      options: [
        "Defensive restatement (smaller, dismissable)",
        "Reductive paraphrase (removes the relational consequence)",
        "Faithful restatement (keeps the cost in the framing)",
        "Hedged restatement (adds qualifiers)",
      ],
      // AUTHORED — drill items framed as recognition for engine parity with the D3 SingleChoiceCard pattern. The three references come from the script's locked Drill 1 calibration.
      items: [
        { vignette: "Restatement A: “You think I talk too much in meetings.”", answer: "Defensive restatement (smaller, dismissable)", feedback: "The Repeat-Back. The wording is smaller and more dismissable than what the colleague said. A defensive restatement is the first move out of receiving." },
        { vignette: "Restatement B: “You’re saying I dominate.”", answer: "Reductive paraphrase (removes the relational consequence)", feedback: "The Repeat-Back. The wording removes the relational consequence — the people who need to hear themselves think — and leaves only the verdict." },
        { vignette: "Restatement C: “You’re saying I take up so much space that the people who need to hear themselves think do not get to.”", answer: "Faithful restatement (keeps the cost in the framing)", feedback: "The Repeat-Back. Keeps the cost in the framing. Holds the giver’s sentence intact. A faithful restatement is the first move into absorbing." },
      ],
      closeCard: "A defensive restatement is the first move out of receiving. A faithful restatement is the first move into absorbing.",
    },
    f2: {
      title: "Drill 2 — The One Behaviour",
      audioIntro: "Practise the Apply step. Most feedback gets converted into general intentions — ‘I will work on listening more.’ D9 requires conversion into one observable behaviour, with a timeframe, and someone external who can confirm. We will show you a single line of feedback, then three different conversions. Identify the complete Growth Extraction.",
      header: "Your manager has told you: ‘You rush to conclusions before the team is ready.’ Identify the complete Growth Extraction.",
      onScreenHeader: {
        title: "THE ONE BEHAVIOUR — IDENTIFY THE COMPLETE GROWTH EXTRACTION",
        lines: [
          "Your manager has told you: “You rush to conclusions before the team is ready.”",
          "For each conversion, choose the one with all three elements: observable behaviour + timeframe + external check.",
        ],
        showOptionsRow: true,
        cta: "Tap to begin.",
      },
      options: [
        "General intention (no observable behaviour)",
        "Better but un-observable (still general)",
        "Complete Growth Extraction (3 elements present)",
        "Apology only (no plan)",
      ],
      items: [
        { vignette: "Conversion A: “I’ll work on slowing down.”", answer: "General intention (no observable behaviour)", feedback: "The One Behaviour. Cannot be observed by anyone else. This is the language of agreement, not change." },
        { vignette: "Conversion B: “I will be more inclusive in meetings.”", answer: "Better but un-observable (still general)", feedback: "The One Behaviour. Still general. No behaviour. No timeframe. No external check." },
        { vignette: "Conversion C: “In the next three team meetings, I will not state my recommendation until at least three other people have spoken. I will ask Aisha to flag me if I forget.”", answer: "Complete Growth Extraction (3 elements present)", feedback: "The One Behaviour. Observable behaviour + timeframe + external check. A general intention is the language of agreement. A Growth Extraction is the language of change." },
      ],
      closeCard: "A general intention is the language of agreement. A Growth Extraction is the language of change.",
    },
    complete: {
      label: "Transition to Segment G · 15s",
      narration: [
        "The Field Guide gave you the language.",
        "The Scenario Lab gave you the consequences.",
        "The micro-drills settled the language into recognition.",
        "One thing left.",
      ],
      continueLabel: "Continue",
    },
    closingReflection: {
      prompt: "What did you notice about your default after feedback — defend, agree, plan in general, or convert? Take 30 seconds. Speak it or type it. This is for you.",
    },
  },

  /* ---------------- SEGMENT G — CAPSTONE MEMORY WEAVE + CAPSTONE MOMENT PROTOCOL -------------------- */
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
    recognitionLabel: "Recognition narration · 45s",
    recognition: [
      "You did not practise being open to feedback. You practised converting feedback into a behaviour someone else could observe six months later.",
      "You saw what happens when learning becomes transfer.",
      "You saw what happens when it does not.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "A sharper sense of what your learning pattern looks like to others — and whether it is changing.",
      ],
    },
    // AUTHORED — G-1 cold-open callback per path (script does not enumerate).
    callback: {
      a: "You opened this module at 4:47 PM by thanking your manager and scheduling Monday. Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 4:47 PM by writing the exact behaviour you had not changed. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 4:47 PM by deciding the feedback was wrong. Hold that first instinct beside the choices that followed.",
      d: "You opened this module at 4:47 PM by closing the laptop. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      label: "G-1.5 · Framework Return · 30s",
      durationSeconds: 30,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through four scenarios. Different stakes. Different costs. But the same four steps.",
      steps: ["Receive.", "Absorb.", "Apply.", "Integrate."],
      tagline: "The Learning Cycle. The method is simple. The integration is not.",
      carryForward: "You used it across this module. You will use it across the next five years.",
    },
    // G-2 — Capstone Memory Weave + Six-Month Replay (D9 signature mechanic).
    capstoneWeave: {
      label: "G-2 · Capstone Memory Weave + Six-Month Replay · 2:00",
      header: "Before you leave, look at what you have written across the six prior dimensions of the Probation Blueprint.",
      // Six prior modules with fallback string for MVP where the memory store is not yet wired up.
      // TODO(cross-module-memory): hydrate from cross_module_memory_store.
      priorRows: [
        { dim: "D1 — Integrity", slot: "{{prior.D1.final_personal_sentence}}", fallback: "(no entry)" },
        { dim: "D2 — Accountability", slot: "{{prior.D2.final_personal_sentence}}", fallback: "(no entry)" },
        { dim: "D3 — Reliability", slot: "{{prior.D3.final_personal_sentence}}", fallback: "(no entry)" },
        { dim: "D4 — Communication", slot: "{{prior.D4.final_personal_sentence}}", fallback: "(no entry)" },
        { dim: "D5 — Collaboration", slot: "{{prior.D5.final_personal_sentence}}", fallback: "(no entry)" },
        { dim: "D8 — Resilience", slot: "{{prior.D8.final_personal_sentence}}", fallback: "(no entry)" },
      ],
      ledgerHeader: "And then — your D9 Agility Ledger across four scenarios:",
      replayPrompt: "Six months from now, what would have actually changed?",
      replayWritePrompt: "Write the Six-Month Replay. What change made across this module is still visible in six months? What is the evidence?",
      replaySubmit: "Save to Growth Log",
      replayMinChars: 80,
      doctrinalNote: "The change you made for two weeks is not the change. The change is what is still here in six months.",
    },
    delayedRetentionCheck: {
      label: "G-3 · Retention Check Setup · 30s",
      title: "RETENTION CHECK · SAME PATTERN, NEW CONTEXT",
      narration: [
        "In three to seven days, one of these learning moments will come back to you — the same pattern, in a different room, with different people. You will see what you wrote. You will answer one question.",
        "Is this still what I would do with feedback today?",
      ],
      details: [
        { k: "Appears", v: "3 to 7 days from now (notification sent)" },
        { k: "Format", v: "1 scenario revisited — same pattern, different surface" },
        { k: "Response", v: "Single response, or skip" },
        { k: "Attempts", v: "1 available" },
        { k: "Cooldown", v: "48 hours if you defer the prompt" },
        { k: "Window", v: "72 hours from notification" },
      ],
      doctrinalNote: [
        "This is not a pass / fail check. It is a check that the pattern has stayed with you after time has passed.",
        "Each Retention Check variant preserves the underlying behavioural pattern. New people, new room, new artifacts, same pattern. This is D9’s structural test of transfer.",
      ],
      continueLabel: "Got it — continue",
      questionsPerAttempt: 1,
      attemptsMax: 1,
      cooldownHours: 48,
      windowHours: 72,
      notificationWindowHours: [72, 168],
    },
    // G-4 — Capstone Moment Protocol (locked sequence).
    capstoneMoment: {
      label: "G-4 · Capstone Moment Protocol · 1:30",
      step1: {
        narration: [
          "There are people in your career who decided what to invest in you based on what you did with their feedback. You did not always know they were watching. They were.",
          "They have already decided about the feedback they have already given you. The next feedback is still ahead of you.",
          "Think of one piece of feedback you have heard more than once.",
        ],
        prompt: "Write one sentence you can use the next time it arrives.",
      },
      sevenRowPanel: {
        header: "Your Probation Blueprint, in seven sentences.",
        rows: [
          { dim: "D1 — Integrity", slot: "{{prior.D1.final_personal_sentence}}", fallback: "(no entry)" },
          { dim: "D2 — Accountability", slot: "{{prior.D2.final_personal_sentence}}", fallback: "(no entry)" },
          { dim: "D3 — Reliability", slot: "{{prior.D3.final_personal_sentence}}", fallback: "(no entry)" },
          { dim: "D4 — Communication", slot: "{{prior.D4.final_personal_sentence}}", fallback: "(no entry)" },
          { dim: "D5 — Collaboration", slot: "{{prior.D5.final_personal_sentence}}", fallback: "(no entry)" },
          { dim: "D8 — Resilience", slot: "{{prior.D8.final_personal_sentence}}", fallback: "(no entry)" },
          { dim: "D9 — Learning Agility", slot: "{{current.D9.final_personal_sentence}}", fallback: "(your sentence)" },
        ],
      },
      // LOCKED — the seven-versions line. Renders verbatim. Two-second holds.
      sevenVersionsLine: "You have not completed seven lessons. You have met seven versions of yourself under workplace pressure. D9 asks what those meetings changed.",
      // LOCKED — the closing couplet.
      closingCouplet: [
        "The point was never to make you perfect. The point was to make your patterns visible early enough to change them.",
        "Experience does not make you better by itself. What you extract, apply, and keep is what changes you.",
      ],
      // LOCKED — the MVP arc panel.
      mvpArc: {
        line: "Truth → Ownership → Reliability → Communication → Collaboration → Recovery → Growth.",
        completion: "You have completed the Probation Blueprint. Use what you practised.",
      },
    },
    bookendQuestion:
      "When something challenges how you work, do you grow from it — or just survive it?",
    finalPrompt:
      "Write one sentence you can use the next time a piece of feedback you have heard before arrives again.",
  },
  blueprintEmission: {
    signature_framework_named: "The Learning Cycle",
    capstone_panel_rows_at_g2: 6,
    capstone_panel_rows_at_g4: 7,
    consequence_horizon_set: "C",
  },
};

/* ============================================================================
   D9 helper — five-state Perception Replay variants (renders BEFORE SC4
   decision paths). Keyed by agility_pattern_state.
   ========================================================================== */
export const PERCEPTION_REPLAY_D9 = {
  label: "Perception Replay — Manager's Internal State [shown before you decide]",
  intro: "Before the decision, you see what your manager already believes about your learning pattern. Notice the field you are walking into.",
  doctrine: "It is rendered BEFORE the participant chooses a decision path. It is not feedback after the decision — it is the field that already exists.",
  variants: {
    defensive: "Before this conversation, your manager has noticed that the last three times feedback arrived, the conversation became about why it did not quite apply. They are not sure whether to give you the harder feedback they have been holding.",
    selective: "Before this conversation, your manager has noticed that you take the part of feedback that confirms your strengths and let the rest slide. They are deciding whether to package the harder part more carefully — or stop trying.",
    theoretical: "Before this conversation, your manager has noticed that you agree with every piece of feedback and change very little. They are not angry. They are recalibrating what to expect from your next quarter.",
    applying: "Before this conversation, your manager has noticed two specific behaviours you changed in the last six weeks. They are watching whether the changes hold.",
    integrating: "Before this conversation, your manager has noticed that the changes from August are still here in November. They are deciding which harder assignment to give you next.",
  },
};

/* ============================================================================
   D9 helper — Mid-Lab Pattern Check (renders after SC2, before SC3).
   Five-state single-tap. No feedback rendered. Selection stored in Lock 2.
   ========================================================================== */
export const MID_LAB_PATTERN_CHECK_D9 = {
  bridge: "Two scenarios in. Before you go further, one quiet question.",
  prompt: "How does your learning pattern read to others so far — defensive, selective, theoretical, applying, or integrating?",
  options: [
    { key: "defensive", label: "Defensive — explaining why feedback does not quite apply." },
    { key: "selective", label: "Selective — taking the parts that confirm what I already believe." },
    { key: "theoretical", label: "Theoretical — agreeing with feedback without changing what I do." },
    { key: "applying", label: "Applying — converting feedback into one observable behaviour at a time." },
    { key: "integrating", label: "Integrating — the changes from earlier are still here months later." },
  ],
  doctrinalNote: "Selection stored privately. No score returned. The mechanic itself is the data.",
};

/* ============================================================================
   SCENARIO CHAIN 1 — UNEXPECTED FEEDBACK (tests Receive)
   ========================================================================== */
export const SC1_CONTENT_D9 = {
  id: "SC1",
  title: "Unexpected Feedback",
  commitment: "Decide what to do in 30 seconds when a senior peer offers unsolicited, specific feedback in the hallway.",
  callback: [
    "You have been here before.",
    "At the start of this module, you saw a Comfort Trap moment for 30 seconds. Now you return to the dimension with the full consequence chain — this week, this month, this quarter.",
    "You may choose the same instinct again, or choose differently. Notice whether your reasoning has changed.",
  ],
  intro: [
    "Scenario one. Unexpected Feedback.",
    "A senior peer — not your manager — has just offered you a specific piece of feedback in the hallway after a workshop you facilitated. They counted. They waited. Now it is your move.",
  ],
  briefing:
    "It is 4:14 PM. You have just facilitated a 90-minute strategy workshop with twelve people on the Northland Health implementation review. The energy was high. The outputs were strong. Three people stayed afterward to ask follow-up questions. You feel good about it. On the way back to your desk, Marcus — a senior peer from the operations team, ten years more experienced — falls in step with you. He says: ‘That was a good session. Can I share one thing? You talked seven times as much as the second-most-frequent speaker. I counted because I was curious. The people who needed to hear themselves think did not get to.’ Then: ‘Take it or leave it.’ He turns toward the elevator. He does not stop walking. You have about thirty seconds to respond before he is gone.",
  artifacts: [
    {
      caption: "Marcus's message in the hallway",
      title: "Hallway · 4:14 PM",
      mono: true,
      lines: [
        "Marcus (senior peer, operations) — 4:14 PM",
        "“That was a good session. Can I share one thing?”",
        "",
        "“You talked seven times as much as the",
        " second-most-frequent speaker. I counted",
        " because I was curious. The people who",
        " needed to hear themselves think did not get to.”",
        "",
        "“Take it or leave it.”",
        "",
        "(He turns toward the elevator. He does not stop walking.)",
      ],
    },
    {
      caption: "Your private state",
      title: "Your private state",
      mono: false,
      lines: [
        "You did not realise you spoke that much.",
        "You ran the meeting because you knew the content. The team is fine with you driving it.",
        "Marcus did not have to say anything. He counted. He waited until the workshop was over.",
        "You have about thirty seconds to respond before he is gone.",
      ],
    },
  ],
  decisionPrompt: "Thirty seconds. Marcus is moving toward the elevator. What do you say?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  options: [
    { key: "a", label: "“Thanks. I’ll think about that.” Receive without engagement. Walk back to your desk." },
    { key: "b", label: "“Wait — Marcus, say more. What did you see that made you count? I want to know what looked different from the inside of the room.” Engage to absorb." },
    { key: "c", label: "“I think I was leading because nobody else was stepping in. The room is mostly junior — they need someone to drive.” Defensive reframe." },
  ],
  artifactWrite: {
    a: { prompt: "You have decided to receive without engagement. Write the exact words you would say to Marcus in the 30-second window — the words that land before he reaches the elevator.", submit: "Send to Marcus" },
    b: { prompt: "You have decided to engage to absorb. Write the exact words you would say to Marcus in the 30-second window — the words that stop him before he reaches the elevator.", submit: "Send to Marcus" },
    c: { prompt: "You have decided on a defensive reframe. Write the exact words you would say to Marcus in the 30-second window — the words that explain your reasoning before he reaches the elevator.", submit: "Send to Marcus" },
  },
  references: {
    ac: [
      // AUTHORED — three references for the 30-second hallway response.
      { tag: "Defensive (Path A)", calibrated: false, text: "Thanks. I’ll think about that.", lands: "Marcus hears the door close. He has decided what kind of feedback you can hear. He will not offer another piece." },
      { tag: "Defensive reframe (Path C)", calibrated: false, text: "I think I was leading because nobody else was stepping in. The room is mostly junior — they need someone to drive.", lands: "Marcus hears you protect a working version of yourself. He does not look back from the elevator. He will not count again." },
      { tag: "Calibrated (Path B)", calibrated: true, text: "Wait — Marcus, say more. What did you see that made you count? I want to know what looked different from the inside of the room.", lands: "Marcus turns back. He walks you to your desk. The conversation is twelve minutes. You learn something you would not have learned in any course." },
    ],
    b: [
      { tag: "Curious-but-vague", calibrated: false, text: "Interesting — say more whenever you have time.", lands: "Marcus reads the soft defer. He nods and keeps walking. The investment of his attention does not happen now, and it does not happen later." },
      { tag: "Calibrated", calibrated: true, text: "Wait — Marcus, say more. What did you see that made you count? I want to know what looked different from the inside of the room.", lands: "Marcus turns back. He walks you to your desk. He explains what he counted and why. You absorb the substance, not the message." },
    ],
    d: { card: "Whatever you wrote, you now have a record of how you held the 30 seconds Marcus gave you." },
    closing: "What changes between these versions: whether Marcus offers you another piece of feedback, and what he tells the people who ask him about you. Same workshop. Different next quarter.",
  },
  consequences: {
    a: {
      sameDay: [
        "Marcus does not mention it again. You think about the comment for about an hour, then it fades.",
        "By Friday you cannot remember the exact phrasing.",
      ],
      nextWeek: [
        "You facilitate three more workshops the same way.",
        "Marcus stops attending. He does not say why. You assume he is busy.",
      ],
      monthEnd: [
        "Your quarterly review includes a line: ‘Continues to drive workshops effectively.’ You feel good about it.",
        "Marcus would write something different. He does not see your review.",
      ],
      outcome: "Received the words. Kept the substance at arm’s length.",
      others: "Marcus stopped attending; the silence read as the verdict.",
      interp: "She received the words. She kept the substance at arm’s length.",
      manager: "Marcus’s perspective. “She thanked me. She did not engage. That is how I know which feedback she can hear and which she cannot. I will offer the easy stuff. I will save the hard stuff for someone else.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "Marcus turns back and walks you to your desk. He explains what he counted and why. The conversation is twelve minutes.",
        "You learn something you would not have learned in any course.",
      ],
      nextWeek: [
        "You change one thing in your next workshop — you state a question, then ask one person to answer, then wait for the next one.",
        "The first one is awkward. By the third workshop it is becoming natural.",
      ],
      monthEnd: [
        "Your team feedback in the quarterly review mentions you specifically: ‘Started bringing the room in. Different from six months ago.’",
        "Marcus is still not in your meetings. He has gone back to his own work, knowing you can run yours.",
      ],
      outcome: "Engaged the substance. Changed one behaviour the team noticed.",
      others: "Team feedback noted the change specifically; Marcus invested.",
      interp: "She engaged the substance before deciding what to do with it.",
      manager: "Marcus’s perspective. “She stopped me. She asked a real question. She converted my count into one behaviour the team noticed. I will hand her the harder workshop next quarter — and I will keep counting.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Marcus replies, polite but flat: ‘Fair.’ He continues toward the elevator. He does not look back.",
      ],
      nextWeek: [
        "Marcus does not offer you another piece of feedback.",
        "Ever.",
      ],
      monthEnd: [
        "You notice that hard feedback has stopped arriving from anyone except your direct manager.",
        "You are not sure when the pattern started. It started with Marcus.",
      ],
      outcome: "Defended a working version of yourself. Marcus filed the response.",
      others: "Hard feedback from peers begins to disappear.",
      interp: "She defended a working version of herself instead of testing it.",
      manager: "Marcus’s perspective. “She told me why I was wrong about what I counted. That is the response I was probing for. I have my answer. I will not offer this again.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Receive without engagement", signal: "Said thanks. Did not absorb. Did not change.", effect: "Marcus stops attending; the silence becomes the verdict." },
    { key: "b", title: "Engage to absorb", signal: "Stopped Marcus. Asked the real question. Converted into one behaviour.", effect: "Marcus invests; team feedback registers the change in the next quarter." },
    { key: "c", title: "Defensive reframe", signal: "Defended the working version of yourself.", effect: "Marcus stops offering feedback; hard feedback from peers begins to disappear." },
  ],
  reflection: "Think of a 30-second hallway moment in your last quarter when a peer offered you something specific. What did you do with it? What would absorbing it have changed?",
};

/* ============================================================================
   SCENARIO CHAIN 2 — NEW TOOL ADOPTION (tests Absorb)
   ========================================================================== */
export const SC2_CONTENT_D9 = {
  id: "SC2",
  title: "New Tool Adoption",
  commitment: "Decide what to do when a colleague names the thing about you that the tool is exposing.",
  threading: {
    transparent: [
      "Last time, you stopped Marcus in the hallway and absorbed what he counted.",
      "It is Thursday. You are in the required training for a new project-tracking tool. Aisha is about to say something that names the thing your last three years of decisions have quietly avoided.",
    ],
    cautious: [
      "Last time, you received Marcus’s count and let it pass.",
      "It is Thursday. You are in the required training for a new project-tracking tool. Aisha is about to say something that names a discipline you have been keeping at arm’s length.",
    ],
    avoidant: [
      "Last time, you reframed Marcus’s count as junior team dynamics.",
      "Hard feedback from peers has been quieter since. It is Thursday. You are in the required training for a new project-tracking tool. Aisha is about to say something that lands directly on what you have been protecting.",
    ],
  },
  intro: [
    "Scenario two. New Tool Adoption.",
    "Leadership mandated a new tool. You have been quietly continuing in the old one. A colleague three years senior says the thing that is not about the tool — it is about you.",
  ],
  briefing:
    "The mandate landed Monday. It is now Thursday. You have been quietly continuing in the old tool while attending the required training sessions for the new one. Your output is fine. Your resistance is invisible. In the Thursday training session, Aisha — a colleague three years senior, normally pragmatic — says something you did not expect: ‘I hated this tool at first. After three weeks, I realised it was forcing me to write down decisions I used to keep in my head. Half the time I was wrong about what I remembered. The tool is annoying. The discipline is real.’ You have been keeping decisions in your head for three years. You have always assumed your memory was good enough. Aisha’s point is not about the tool. It is about you. The trainer is moving on to the next topic. You have about a minute before this moment passes.",
  artifacts: [
    {
      caption: "Aisha's comment in the training session",
      title: "Training session · Thursday",
      mono: true,
      lines: [
        "Aisha (colleague, three years senior) — Thursday training",
        "",
        "“I hated this tool at first. After three weeks, I",
        " realised it was forcing me to write down",
        " decisions I used to keep in my head.”",
        "",
        "“Half the time I was wrong about what I",
        " remembered. The tool is annoying. The",
        " discipline is real.”",
      ],
    },
  ],
  decisionPrompt: "Sixty seconds before the trainer moves on. What do you do?",
  justificationPrompt: "Why this option? What part of Aisha’s point are you willing to absorb, and what part are you protecting?",
  options: [
    { key: "a", label: "“That’s fair, but my system already works. I rarely lose track of decisions.” Selective absorption — dismissed Aisha’s actual point." },
    { key: "b", label: "“Aisha, can we grab fifteen minutes? I want to know what you did differently after the first three weeks. I think you are saying something I have been avoiding.” Full absorption." },
    { key: "c", label: "“I think the tool is a solution looking for a problem. We were fine without it.” Defensive dismissal." },
  ],
  artifactWrite: {
    a: { prompt: "You have decided to absorb selectively. Write the exact words you would say to Aisha — the words that close the moment politely.", submit: "Reply to Aisha" },
    b: { prompt: "You have decided to absorb fully. Write the exact words you would say to Aisha to set up the fifteen-minute conversation.", submit: "Send to Aisha" },
    c: { prompt: "You have decided to dismiss the tool. Write the exact words you would say in the training room — the words that signal your position to anyone listening.", submit: "Speak up" },
  },
  references: {
    ac: [
      // AUTHORED — three references covering Paths A and C in calibrated/non-calibrated rows.
      { tag: "Selective (Path A)", calibrated: false, text: "That’s fair, but my system already works. I rarely lose track of decisions.", lands: "Aisha hears the filter. She files what kind of feedback you can absorb. Her future suggestions will not include the discipline you would not hear today." },
      { tag: "Defensive dismissal (Path C)", calibrated: false, text: "I think the tool is a solution looking for a problem. We were fine without it.", lands: "Three people in the training room hear it. One of them is your manager. The dismissal becomes a data point in the next staffing decision you do not know is being made." },
      { tag: "Calibrated (Path B)", calibrated: true, text: "Aisha, can we grab fifteen minutes? I want to know what you did differently after the first three weeks. I think you are saying something I have been avoiding.", lands: "Aisha sees the absorption attempt. The fifteen minutes happens. The discipline becomes one specific behaviour you start logging on Friday." },
    ],
    b: [
      { tag: "Vague ask", calibrated: false, text: "Aisha, fancy a chat about the tool sometime?", lands: "Aisha reads the soft ask. It dies on someone’s calendar two weeks from now. Both of you forget." },
      { tag: "Calibrated", calibrated: true, text: "Aisha, can we grab fifteen minutes this week? I want to know what you did differently after the first three weeks. I think you are saying something I have been avoiding.", lands: "Aisha sees the specificity. The fifteen minutes is booked by end of day. The discipline lands." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose to absorb selectively, fully, or dismiss." },
    closing: "What changes between these versions: whether the discipline behind the tool reaches your work, or whether the tool surface arrives without it. The mandate is the same. The next three years are not.",
  },
  consequences: {
    a: {
      sameDay: [
        "You go back to the old tool for the rest of the week. Output is fine. Nothing has changed.",
      ],
      nextWeek: [
        "Two decisions you thought you would remember turn out to be different from what your manager remembers. Both times you accept the manager’s version.",
        "It is uncomfortable but small.",
      ],
      monthEnd: [
        "You eventually adopt the new tool because everyone else has.",
        "But you adopt the surface of it, not the discipline. The tool changes. You do not.",
      ],
      outcome: "Absorbed the words. Filtered the substance.",
      others: "Manager began reconstructing your decisions against your memory.",
      interp: "She absorbed the words but filtered the substance.",
      manager: "Manager’s perspective. “She uses the tool. She does not use the discipline. I have started writing down our 1:1 outcomes myself because her memory and mine do not always match.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You meet Aisha. She walks you through one specific change she made — logging every decision longer than five minutes, with a one-line reason.",
        "You try it Friday on three decisions.",
      ],
      nextWeek: [
        "You have logged 47 decisions. Six of them looked obvious at the time and turned out to be wrong.",
        "You would not have remembered why you made them. The discipline is changing what you do.",
      ],
      monthEnd: [
        "Your manager notices: ‘Your handoffs to the team have gotten cleaner. They know not just what you decided, but why.’",
        "Aisha was not the lesson. The discipline was.",
      ],
      outcome: "Absorbed the discipline. Changed what you write down.",
      others: "Manager noticed cleaner handoffs; the team can carry your decisions.",
      interp: "She absorbed the discipline behind the tool, not just the surface.",
      manager: "Manager’s perspective. “Her handoffs got cleaner. The team knows why she decided, not just what. The tool is not the change. The discipline is.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "You vent about the tool to two colleagues. Both nod. One of them stops using it eventually.",
        "You feel validated.",
      ],
      nextWeek: [
        "Your manager has begun asking you to walk through your decision rationale in 1:1s. They never asked before.",
        "You assume they are being thorough.",
      ],
      monthEnd: [
        "Your manager notices that two of your decisions this quarter cannot be reconstructed. They do not blame you. They start adding a peer reviewer to your work.",
        "You assume it is about pace.",
      ],
      outcome: "Dismissed the substance before testing it.",
      others: "Manager added a peer reviewer to your work.",
      interp: "She dismissed the substance before testing it.",
      manager: "Manager’s perspective. “She thinks the tool is the problem. The problem is that I cannot reconstruct her decisions when I need to. I have started adding a peer reviewer to her work. She thinks it is about pace.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Selective absorption", signal: "Absorbed the words. Filtered the substance.", effect: "Manager begins reconstructing your decisions against your memory." },
    { key: "b", title: "Full absorption", signal: "Absorbed the discipline, not just the surface.", effect: "Manager noticed cleaner handoffs; the discipline becomes the change." },
    { key: "c", title: "Defensive dismissal", signal: "Dismissed the substance before testing it.", effect: "Manager adds a peer reviewer; staffing decisions follow quietly." },
  ],
  reflection: "Think of the last time a colleague named a discipline you have been quietly avoiding. What did you absorb? What did you filter?",
};

/* ============================================================================
   SCENARIO CHAIN 3 — THE JUNIOR'S SUGGESTION (tests Apply)
   D9 SIGNATURE — Mandatory Growth Extraction after path selection.
   ========================================================================== */
export const SC3_CONTENT_D9 = {
  id: "SC3",
  title: "The Junior’s Suggestion",
  commitment: "Decide what to do, in a room of six, when a junior team member identifies a flaw in a method you have used for three years.",
  threading: {
    transparent: [
      "Last time, you booked the fifteen minutes with Aisha and the discipline began to land.",
      "It is Wednesday at 2:30 PM. Six people in a meeting room. You are presenting a methodology you have used for fourteen successful projects. Sam, two years out of grad school, two years on the team, is about to raise a hand.",
    ],
    cautious: [
      "Last time, you absorbed selectively — the words, not the substance.",
      "It is Wednesday at 2:30 PM. Six people in a meeting room. You are presenting a methodology you have used for fourteen successful projects. Sam, two years out of grad school, two years on the team, is about to raise a hand.",
    ],
    avoidant: [
      "Last time, you dismissed the tool. Your manager has started adding a peer reviewer.",
      "It is Wednesday at 2:30 PM. Six people in a meeting room. You are presenting a methodology you have used for fourteen successful projects. The team is watching to see what you do when feedback comes from below.",
    ],
  },
  intro: [
    "Scenario three. The Junior’s Suggestion.",
    "Sam is two years junior. They have checked your work against fourteen previous projects. They are right. The room is watching.",
  ],
  briefing:
    "It is Wednesday at 2:30 PM. Six people in a meeting room. You are presenting the methodology for an upcoming client engagement — the same methodology you have used for fourteen successful projects. Sam, two years out of grad school, two years into the team, raises a hand: ‘Can I ask something? When we use this approach with this kind of client, we always lose the senior stakeholders by phase three. I checked the post-project reviews — it happens 80% of the time. I wonder if the sequencing of phases two and three is the issue.’ Sam pauses. Then: ‘I built a quick comparison.’ Sam shares their screen. The data is clear. The reorder makes sense. You have not noticed the pattern across fourteen projects. The room is looking at you.",
  artifacts: [
    {
      caption: "Sam's comment in the meeting",
      title: "Meeting room · Wednesday 2:30 PM",
      mono: true,
      lines: [
        "Sam (two years on the team) — Wednesday 2:30 PM",
        "",
        "“Can I ask something? When we use this",
        " approach with this kind of client, we always",
        " lose the senior stakeholders by phase three.”",
        "",
        "“I checked the post-project reviews —",
        " it happens 80% of the time. I wonder if the",
        " sequencing of phases two and three is the issue.”",
        "",
        "“I built a quick comparison.”",
        "(Sam shares screen. Data is clear. The reorder makes sense.)",
      ],
    },
    {
      caption: "Locked wow line",
      title: "On screen, soft amber",
      mono: false,
      lines: [
        "The hardest feedback to integrate is the kind you should have figured out yourself.",
      ],
    },
  ],
  decisionPrompt: "Six people watching. Sam’s data on the screen. What do you do?",
  justificationPrompt: "Why this option? What is the public cost of acknowledgement, and what is the private cost of deferring it?",
  options: [
    { key: "a", label: "“Interesting. Let’s talk after the meeting.” Defer the public moment." },
    { key: "b", label: "“Sam, you’re right. I have used this sequencing on fourteen projects and I missed this. Let’s rework phases two and three before the engagement starts. Thank you for catching it.” Apply with public acknowledgement." },
    { key: "c", label: "“The 80% figure includes a lot of projects where stakeholder loss had nothing to do with sequencing. Let’s be careful before we restructure.” Defensive reframe with statistical hedge." },
  ],
  artifactWrite: {
    a: { prompt: "You have decided to defer the public moment. Write the message you send Sam after the meeting — the words that close the loop privately.", submit: "Send to Sam" },
    b: { prompt: "You have decided to acknowledge publicly. Write the exact words you say in the room when Sam is still on screen — the words six people hear.", submit: "Speak in the room" },
    c: { prompt: "You have decided to hedge statistically. Write the exact words you say in the room — the words that move the conversation onto safer ground.", submit: "Speak in the room" },
  },
  // Mandatory Growth Extraction (D9 signature, rendered after path selection).
  growthExtraction: {
    label: "Mandatory Growth Extraction · SC3 · three-element validator",
    prompt: "Write one observable behaviour you will change because of Sam’s catch. Include a timeframe. Include who will confirm the change held.",
    submitLabel: "Save to Growth Log",
    minChars: 100,
    validatorElements: ["observable_behaviour", "timeframe", "external_check"],
    references: [
      { tag: "Reference 1 — General intention", text: "I will be more open to feedback from junior team members.", lands: "Cannot be observed by anyone else. This is the language of agreement." },
      { tag: "Reference 2 — Slightly better but un-observable", text: "I will reorder the phases on this engagement.", lands: "Specific to this engagement, but not the pattern. Sam taught you about fourteen projects, not one." },
      { tag: "Reference 3 — Complete Growth Extraction", text: "In every methodology presentation for the next quarter, I will end with: ‘Sam, anything off the post-project reviews I missed?’ Sam confirms the practice held at the end of the quarter.", lands: "Observable behaviour, timeframe, external check. The pattern is the change, not the one engagement." },
    ],
  },
  references: {
    ac: [
      { tag: "Defensive deferral (Path A)", calibrated: false, text: "Interesting. Let’s talk after the meeting.", lands: "The room did not see the acknowledgement. Sam knows the team can hear from them. The team still believes you do not get caught flat-footed in public." },
      { tag: "Defensive hedge (Path C)", calibrated: false, text: "The 80% figure includes a lot of projects where stakeholder loss had nothing to do with sequencing. Let’s be careful before we restructure.", lands: "Sam stops contributing in methodology meetings. They do not stop doing the analysis. They stop sharing it." },
      { tag: "Calibrated public acknowledgement (Path B)", calibrated: true, text: "Sam, you’re right. I have used this sequencing on fourteen projects and I missed this. Let’s rework phases two and three before the engagement starts. Thank you for catching it.", lands: "The room saw it. Sam gets two stretch assignments next month. The team begins flagging concerns more readily. Hard feedback comes in." },
    ],
    b: [
      { tag: "Soft acknowledge", calibrated: false, text: "Good point — let’s look at the sequencing.", lands: "The room hears the soft acknowledge. Sam reads the absence of credit. The pattern gets reworked. The reputation does not shift." },
      { tag: "Calibrated", calibrated: true, text: "Sam, you’re right. I have used this sequencing on fourteen projects and I missed this. Let’s rework phases two and three before the engagement starts. Thank you for catching it.", lands: "The credit is named. The miss is named. The fix is named. The next 360 carries the line." },
    ],
    d: { card: "Whatever you wrote, you now have a record of how you held the room while Sam was on the screen." },
    closing: "What changes between these versions: whether the team begins flagging concerns more readily, or whether Sam stops sharing the analysis. The methodology is the same. The next year of your reputation is not.",
  },
  consequences: {
    a: {
      sameDay: [
        "You talk to Sam after the meeting. The conversation is good. The team did not see you change your mind.",
      ],
      nextWeek: [
        "You reorder the phases on the new engagement.",
        "Sam is invited to the kick-off. You do not name what changed or why.",
      ],
      monthEnd: [
        "Sam is invited to lead the next methodology review. Sam now knows the team can hear from them.",
        "But the team still believes you do not get caught flat-footed in public.",
      ],
      outcome: "Applied the change in private. Kept the public version of yourself intact.",
      others: "Sam invited into the next methodology review; team’s belief about your unflappability holds.",
      interp: "She applied the change in private and kept the public version of herself intact.",
      manager: "Manager’s perspective. “She did the right thing privately. The team did not see it. The next time someone junior catches something, they will pause to wonder whether they should bring it to her or wait for her to find it herself.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "You and Sam rework phases two and three together. Two other team members ask to join.",
        "The reordered methodology is sharper than the prior one.",
      ],
      nextWeek: [
        "Sam is given two stretch assignments they would not have been given a month earlier.",
        "The team begins flagging concerns more readily in your sessions. Hard feedback comes in.",
      ],
      monthEnd: [
        "You are mentioned by name in a 360 review by a peer: ‘Acknowledged a junior team member publicly when they were right. Increased the team’s willingness to surface issues.’",
        "The original moment cost a few seconds. The reputation lasts months.",
      ],
      outcome: "Converted catch into change, in public, with credit to the source.",
      others: "Team began flagging concerns more readily; Sam got stretch assignments.",
      interp: "She converted the catch into change, in public, with credit to the source.",
      manager: "Manager’s perspective. “She named her miss in the room with six people watching. The team felt the room shift. Now they bring me what they used to swallow. That moment paid for itself ten times over.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Sam stops contributing in methodology meetings. They do not stop doing the analysis. They stop sharing it.",
      ],
      nextWeek: [
        "The engagement runs with the original sequencing. By phase three, two senior stakeholders disengage.",
        "The post-project review is harder to write.",
      ],
      monthEnd: [
        "Sam is asked by another team to consult on their methodology. They accept.",
        "Your team has lost the early-warning function Sam would have provided.",
      ],
      outcome: "Defended the working version of yourself. Lost the early warning.",
      others: "Sam stopped sharing analysis; the engagement lost senior stakeholders.",
      interp: "She defended the working version of herself and lost the early-warning the source would have provided.",
      manager: "Manager’s perspective. “She handled it cleverly in the room. Sam stopped raising things. By phase three of the engagement, the stakeholders we predicted would disengage did. The hedge cost us the project quality and the team’s flagging instinct.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Defer the public moment", signal: "Applied the change in private. Kept the public version of yourself intact.", effect: "Sam knows the team can hear from them. The team still believes you do not get caught in public." },
    { key: "b", title: "Apply with public acknowledgement", signal: "Converted catch into change, in public, with credit to the source.", effect: "Team begins flagging concerns more readily; Sam earns stretch assignments." },
    { key: "c", title: "Defensive hedge with statistical reframe", signal: "Defended the working version of yourself.", effect: "Sam stops sharing analysis; engagement loses senior stakeholders by phase three." },
  ],
  reflection: "Think of a moment when someone junior named something true in a room of peers. What did you do? What did the room learn about what you can hear?",
};

/* ============================================================================
   SCENARIO CHAIN 4 — THE PATTERN-REVEALED DEVELOPMENT CONVERSATION (tests Integrate)
   D9 SIGNATURE — Perception Replay (5 variants) renders BEFORE the decision.
   D9 SIGNATURE — Locked reckoning line. Six-Week Plan artifact-write.
   ========================================================================== */
export const SC4_CONTENT_D9 = {
  id: "SC4",
  title: "The Pattern-Revealed Development Conversation",
  commitment: "Decide what to do when the four-row Agility Ledger is on the table and the conversation is no longer about one piece of feedback.",
  threading: {
    transparent: [
      "Last time, you acknowledged Sam in the room. Hard feedback is coming in.",
      "It is Monday morning, 9:02 AM. You are in a 1:1 with your manager. The agenda doc is one line: ‘How this last stretch has gone.’ No bullets. Just the line.",
    ],
    cautious: [
      "Last time, you absorbed selectively — and applied selectively after Sam.",
      "It is Monday morning, 9:02 AM. You are in a 1:1 with your manager. The agenda doc is one line: ‘How this last stretch has gone.’ No bullets. Just the line.",
    ],
    avoidant: [
      "Last time, you hedged Sam. Stakeholders have already disengaged.",
      "It is Monday morning, 9:02 AM. You are in a 1:1 with your manager. The agenda doc is one line: ‘How this last stretch has gone.’ No bullets. Just the line.",
    ],
  },
  intro: [
    "Scenario four. The Pattern-Revealed Development Conversation.",
    "Your four-row Agility Ledger is on the table. The fourth column — What Changed Next — is what your manager is reading. Before the decision, you see what your manager already believes about your learning pattern.",
  ],
  briefing:
    "It is Monday morning, 9:02 AM. You are in a 1:1 with your manager. The agenda doc is one line: ‘How this last stretch has gone.’ No bullets. Just the line. Your manager opens by turning the laptop toward you. On the screen is your four-row Agility Ledger — the same mirror you have been building through SC1, SC2, and SC3. The four columns are visible: Scenario / Feedback or Experience / What You Extracted / What Changed Next. The fourth column is the one your manager is reading. Your manager opens with this: ‘I want to talk about the last six months. I have been watching a pattern. Let me show you what I see.’",
  artifacts: [
    {
      caption: "The agenda doc",
      title: "Agenda · Monday 9:02 AM 1:1",
      mono: true,
      lines: [
        "Subject: 1:1 — Monday 9:02 AM",
        "From: Manager",
        "",
        "Agenda:",
        "  How this last stretch has gone.",
        "",
        "(No bullets. Just the line.)",
      ],
    },
    {
      caption: "On the laptop — your Agility Ledger",
      title: "Agility Ledger · open on the table",
      mono: true,
      lines: [
        "Scenario   |  Feedback or Experience  |  What You Extracted  |  What Changed Next",
        "-----------+--------------------------+----------------------+--------------------",
        "SC1        |  Marcus's hallway count  |  (from your path)    |  (from your state)",
        "SC2        |  Aisha on the discipline |  (from your path)    |  (from your state)",
        "SC3        |  Sam's 14-project catch  |  (from your path)    |  (from your state)",
        "SC4        |  (this conversation)     |  ?                   |  ?",
      ],
    },
  ],
  // PERCEPTION REPLAY — five variants selected by agility_pattern_state.
  // D9 SIGNATURE: renders BEFORE the decision (not after).
  // Both 5-state keys AND legacy 3-state engine-compat keys are exposed.
  prePerception: {
    label: "Perception Replay — Manager's Internal State [shown before you decide]",
    intro: "Before the decision, you see what your manager already believes about your learning pattern. Notice the field you are walking into.",
    defensive: PERCEPTION_REPLAY_D9.variants.defensive,
    selective: PERCEPTION_REPLAY_D9.variants.selective,
    theoretical: PERCEPTION_REPLAY_D9.variants.theoretical,
    applying: PERCEPTION_REPLAY_D9.variants.applying,
    integrating: PERCEPTION_REPLAY_D9.variants.integrating,
    transparent: PERCEPTION_REPLAY_D9.variants.applying,
    cautious: PERCEPTION_REPLAY_D9.variants.selective,
    avoidant: PERCEPTION_REPLAY_D9.variants.defensive,
  },
  // SC4 LOCKED RECKONING LINE — renders verbatim, after the laptop turn, before
  // the decision. Manager voice. Two-second holds on either side.
  reckoningLine: {
    label: "SC4 locked reckoning line · manager voice · two-second holds",
    primary: "This is not the first time you have heard this. That is why this conversation matters.",
    secondary: "This is not feedback about one conversation. This is feedback about your pattern. The question is whether you can see it the way I see it.",
    wow: "The pattern was the feedback. You just thought each one was its own conversation.",
  },
  decisionPrompt: "The Ledger is on the table. The reckoning line has landed. What do you do?",
  justificationPrompt: "Why this option? The Perception Replay was visible to you. Did it change anything?",
  options: [
    { key: "a", label: "“I think the pattern looks worse than it is. Each of these had its own context.” Defensive across-the-board." },
    { key: "b", label: "“I want to read the pattern with you. I want to know what you see that I do not.” Pattern acceptance with curiosity." },
    { key: "c", label: "“I see what you see. Here are the two behaviours I will change this quarter. I will close the loop in six weeks.” Pattern acknowledgement with operational plan." },
  ],
  artifactWrite: {
    a: { prompt: "You have decided to defend the pattern. Write the words you say to your manager — the words that take each of the four rows in turn and explain the context.", submit: "Speak to your manager" },
    b: { prompt: "You have decided to accept the pattern with curiosity. Write the words you say to your manager — the words that open the next 90 minutes.", submit: "Speak to your manager" },
    c: { prompt: "Write the Six-Week Plan. Two specific behaviours you will change. What will be different about them by Week 3. Who will confirm the change held at Week 6.", submit: "Save the Six-Week Plan" },
  },
  // Six-Week Plan structural hints (3-part template).
  sixWeekPlan: {
    label: "Six-Week Plan · structural hints visible while writing",
    hints: [
      { label: "Two specific behaviours I will change", note: "Observable. Not ‘I will be more open.’" },
      { label: "What will be different about them by Week 3", note: "Mid-point check." },
      { label: "Who will confirm the change held at Week 6", note: "External accountability." },
    ],
    minChars: 200,
    maxChars: 560,
  },
  references: {
    ac: [
      { tag: "Defensive (Path A)", calibrated: false, text: "I think the pattern looks worse than it is. Each of these had its own context.", lands: "Your manager listens. They write nothing down. They close the laptop. The conversation moves on. The growth area line repeats again next quarter." },
      { tag: "Curious (Path B)", calibrated: false, text: "I want to read the pattern with you. I want to know what you see that I do not.", lands: "The conversation lasts 90 minutes. You leave with a sharper map than you walked in with. You have not committed to anything yet. The Week 6 conversation is still to be scheduled." },
      { tag: "Calibrated with plan (Path C)", calibrated: true, text: "I see what you see. Here are the two behaviours I will change this quarter. I will close the loop in six weeks.", lands: "Your manager has something usable. The plan is approved. At Week 6, the change has held. Hard feedback resumes." },
    ],
    b: [
      { tag: "Plan without specifics", calibrated: false, text: "I will be more open in meetings and respond better to feedback over the next six weeks.", lands: "Your manager hears the intent. There is nothing to check at Week 3 or Week 6. The plan dissolves." },
      { tag: "Calibrated Six-Week Plan", calibrated: true, text: "Two behaviours: (1) In every Friday strategy meeting, I will not state my recommendation until at least three other people have spoken; (2) After every methodology presentation, I will end with ‘Anything off the post-project reviews I missed?’ Week 3: my peer Maya will tell me whether she has seen behaviour 1 land. Week 6: you and I review behaviour 2 against the next two presentations.", lands: "Your manager has two specific behaviours, a Week 3 check, a Week 6 confirmation. The plan is approved in one breath." },
    ],
    d: { card: "Whatever you wrote, you now have a record of how you met the room with your Ledger on the table." },
    closing: "What changes between these versions: whether the next 1:1 in November reads the same as the one from August — or whether the change has held. The Ledger is the same. The next six months are not.",
  },
  consequences: {
    a: {
      sameDay: [
        "Your manager listens. They write nothing down. They close the laptop. The conversation moves to another topic.",
      ],
      nextWeek: [
        "Your manager does not raise it again. They also do not assign you the project they had been considering.",
      ],
      monthEnd: [
        "You receive your quarterly review.",
        "The growth area line is identical to the August one.",
      ],
      outcome: "Defended the pattern instead of integrating from it.",
      others: "Project assignment quietly withdrawn; review growth area repeats.",
      interp: "She defended the pattern instead of integrating from it.",
      manager: "Manager’s perspective. “She took each row in isolation. She did not see what the Ledger was for. I do not need to raise it again. The next assignment will tell us what we both already know.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "The conversation lasts 90 minutes. You leave with a sharper map of the pattern than you walked in with.",
        "You have not committed to anything yet.",
      ],
      nextWeek: [
        "You and your manager agree on two behavioural changes.",
        "The conversation about Week 6 is on the calendar.",
      ],
      monthEnd: [
        "The Week 6 check happens. One change has held. One has drifted.",
        "The conversation now is about the second one, not the pattern.",
      ],
      outcome: "Accepted the pattern. Did not yet operationalise the change.",
      others: "Manager and you co-mapped the pattern; one change held, one drifted.",
      interp: "She accepted the pattern but did not yet operationalise the change.",
      manager: "Manager’s perspective. “She came in with curiosity. We mapped it together. The second change drifted but the first held. We are now talking about behaviour, not about whether the pattern exists.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Your manager has something usable: two specific behaviours, a Week 3 check, a Week 6 confirmation.",
        "They ask one clarifying question. You answer. The plan is approved.",
      ],
      nextWeek: [
        "At Week 3, both behaviours have begun to change. You log it. Your manager logs it.",
        "The change is visible to at least two other people.",
      ],
      monthEnd: [
        "At Week 6, the change has held.",
        "Your manager begins giving you harder feedback than they have given you in a year. The pattern has shifted.",
      ],
      outcome: "Converted the pattern into a Six-Week Plan with external check.",
      others: "Manager resumed harder feedback; the pattern shifted at Week 6.",
      interp: "She converted the pattern into a six-week integration plan with external check.",
      manager: "Manager’s perspective. “She walked in, named the pattern, gave me two behaviours and a Week 6 check. By Week 6 the change had held. I have started giving her feedback I have been holding back for a year.”",
      traj: "rise",
    },
  },
  signalPanel: [
    { key: "a", title: "Defend the pattern", signal: "Defended the pattern instead of integrating from it.", effect: "Project assignment withdrawn; review growth area repeats." },
    { key: "b", title: "Accept with curiosity", signal: "Accepted the pattern but did not yet operationalise.", effect: "Manager and you co-mapped the pattern; one change held, one drifted." },
    { key: "c", title: "Acknowledge with Six-Week Plan", signal: "Converted the pattern into a Six-Week Plan with external check.", effect: "Manager resumed harder feedback; pattern shifted at Week 6." },
  ],
  reflection: "Think of a development conversation where the pattern was already in the room before the conversation began. What did you do with the field you walked into?",
};
