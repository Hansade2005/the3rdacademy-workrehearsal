/* ============================================================================
   D5 CONTENT LAYER — Collaboration & Conflict Resolution
   Production reference Rev0 (May 2026). Mirrors d3Content.js schema so the
   D5 module renderer is a near-clone of BridgeFastD3Module.jsx.

   D5 SIGNATURES carried as content-only data the engine reads (no new plumbing):
     1. relationshipField    — five-state field view (open/guarded/transactional/avoidant/adversarial)
     2. dualPerspective      — Morgan/Sam beats inside the Audio Case
     3. roleReversal         — SC3 "From Avery's chair" artifact, returned in Segment G
     4. thirdObject          — SC1 + Brief C2 + SC4 visual cue

   Where the script declares 3 decision paths but the engine expects 4, an
   AUTHORED Path D is supplied in the script's register. Where the script's
   F-drills are free-form and the engine expects 4-option recognition, the
   four-option set is AUTHORED with feedback that quotes The Alignment Method.
   ========================================================================== */

export const D5_CONTENT = {
  module: {
    id: "D5",
    title: "Collaboration and Conflict Resolution",
    participantTitle: "Working Through Disagreement",
    tier: "Foundational",
    sector_variants: ["Cross-functional (default)"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set inside a cross-functional knowledge-work context. The same context applies across all four scenarios.",
      pickerHint: "The context you choose here applies across all four scenarios.",
    },
  },
  dimension: {
    id: "D5",
    name: "Collaboration & Conflict Resolution",
    central_question:
      "When working with others gets difficult, do you make progress easier or harder?",
    framework: {
      label: "The Alignment Method",
      body: "Hear the Position · Name the Shared Interest · Build the Bridge · Protect the Working Bond",
    },
  },
  threading_state_model: "relationship_field_state",
  prior_module_references: ["D4"],

  // D5 SIGNATURE: relationshipField — five-state private mirror, never a score.
  relationshipField: {
    label: "Relationship Field View",
    subtitle: "Private rehearsal mirror. Not a score. Not behavioural documentation.",
    states: [
      { key: "open",          label: "Open",          meaning: "Both parties can still bring information, disagreement, and effort." },
      { key: "guarded",       label: "Guarded",       meaning: "One party is now careful, selective, or less generous." },
      { key: "transactional", label: "Transactional", meaning: "Collaboration becomes ‘my part / your part,’ with reduced trust." },
      { key: "avoidant",      label: "Avoidant",      meaning: "One party withdraws, delays, or routes around the other." },
      { key: "adversarial",   label: "Adversarial",   meaning: "The person becomes the problem, not the shared issue." },
    ],
  },

  // D5 SIGNATURE: thirdObject — visual + line surfaced at Brief C2, SC1, SC4.
  thirdObject: {
    intro: "There are two people in this scene. And one shared problem. Notice which one you talk about.",
    closing: "Two figures turn from each other toward the shared object between them.",
  },

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    a0: {
      title: "D5",
      subtitle: "Collaboration and Conflict Resolution",
      avatar: "You are about to enter the space between two people who do not yet agree. Notice what you do to that space.",
    },
    coldOpen: {
      // Beat 1 — D4 callback. MVP renders the FALLBACK string.
      // TODO(cross-module-memory): replace with the participant's verbatim D4
      // final personal sentence once the cross-module memory store is online.
      d4Callback: {
        wrapperLead: "Last time, you wrote this about what your words made another person carry…",
        sentenceSlot: "{{prior.D4.final_personal_sentence}}",
        wrapperTail: "That sentence still belongs to you. Today we are looking at a different layer — what your behaviour does to the working space between two people when agreement is no longer easy.",
        // FALLBACK — used when D4 was not completed in this session (MVP default).
        fallback: "This module can stand alone, but it connects more deeply after D4. We are going to ask you to live a moment now — a moment where what you do to the working space between you and another person matters.",
      },
      setupNarration: [
        "It is 4:18 PM. The client proposal is due at 6:00. You and Avery are co-writing the final version in a shared document. You own the strategic recommendation. Avery owns risk review and approval language.",
        "Your recommendation is still there, but the force is gone. A comment appears beside the paragraph.",
      ],
      paragraphTable: {
        original: "We recommend immediate adoption of the pilot approach across the Northeast region.",
        edit: "The team may wish to consider phased exploration of the pilot approach across selected regional areas.",
      },
      averyComment: "I softened this so it does not create unnecessary pushback. We need approval today.",
      onScreenState: [
        "Your cursor is blinking in the reply box.",
        "You can see Avery typing.",
        "A countdown reads: 30 seconds.",
      ],
      narration: [
        "It is 4:18 PM. The client proposal is due at 6:00. You and Avery are co-writing the final version in a shared document. You own the strategic recommendation. Avery owns risk review and approval language.",
        "Your recommendation is still there, but the force is gone. A comment appears beside the paragraph.",
        "Avery’s comment reads: “I softened this so it does not create unnecessary pushback. We need approval today.”",
        "Your cursor is blinking in the reply box. You can see Avery typing. A countdown reads thirty seconds. Four options. Each one is real. Choose the one closest to what you would actually do.",
      ],
      options: [
        { key: "a", label: "Reply in the document comment: “You removed the strongest recommendation. I do not agree with this edit. We need to put it back.”" },
        { key: "b", label: "Reply: “I see you are trying to reduce pushback. I am trying to preserve the recommendation the client actually needs. Can we take ten minutes to decide what must stay strong and what can be softened?”" },
        { key: "c", label: "Close the comment box. Restore your original wording in the document without replying." },
        { key: "d", label: "Accept Avery’s edit to keep the proposal moving." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk in the working space between you and Avery?",
      sameDay: {
        a: [
          "Avery stops typing. A pause. Then: “Okay. We need to talk about this.”",
          "The issue is visible. The working bond tightens.",
        ],
        b: [
          "Avery pauses. Then: “Okay. Ten minutes.”",
          "The shared problem becomes visible. The cursor moves out of the document and into a brief call.",
        ],
        c: [
          "Avery sees the restored paragraph and adds a new comment: “Why did you reverse my edit without telling me?”",
          "The conflict moves from the work to the relationship.",
        ],
        d: [
          "The proposal moves forward. Avery sends a thumbs-up emoji.",
          "Your name on the document remains, but a small internal indicator shifts: your commitment dropped by a notch Avery cannot see.",
        ],
      },
    },
    safetyFloor: {
      card: [
        "THIS IS REHEARSAL, NOT EVALUATION.",
        "Nothing you do here is shared, scored, or sent to your employer.",
        "What you practise inside this module stays inside this module unless you choose to share it.",
        "D5 is a private rehearsal space where you practise expressing collaborative behaviour under workplace pressure.",
        "You choose what to do with what you learn here. The platform does not validate, certify, score, or endorse anything about you.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    intro: [
      "Before we go further, a quick read.",
      "Collaboration is not the absence of conflict. It is how you behave inside it.",
      "What you are about to see is not a rulebook. It is a field guide — a description of what collaboration looks like under workplace pressure, and how it quietly breaks down when no one says anything.",
    ],
    fieldGuide: {
      meaning: {
        title: "WHAT D5 IS",
        body: [
          "Collaboration is not agreement. It is the ability to keep working honestly when agreement is no longer easy.",
          "In collaboration, the deliverable is not only the task. The working relationship carrying the task is also a deliverable.",
        ],
      },
      present: {
        title: "WHAT COLLABORATION LOOKS LIKE UNDER WORKPLACE PRESSURE",
        intro: "The eight behaviours that show collaboration is present:",
        items: [
          { h: "You can state the other person’s position accurately.", t: "Hear before you propose." },
          { h: "You name the shared goal before defending your preferred path.", t: "The interest comes before the position." },
          { h: "You bring disagreement into the open without making the person the problem.", t: "Separate person from problem." },
          { h: "You build a path that protects the work and the working bond.", t: "Two deliverables, not one." },
          { h: "You make contributions visible.", t: "Credit is created, not absorbed." },
          { h: "You close the loop after tension.", t: "Repair the working bond." },
          { h: "You do not route conflict through third parties.", t: "Transparency over triangulation." },
          { h: "You adapt when the other person’s working style differs from yours.", t: "Style is part of the work." },
        ],
      },
      breakdown: {
        title: "HOW COLLABORATION BREAKS DOWN",
        intro: "The seven failure modes that signal the working space is fracturing:",
        items: [
          { h: "You agree outwardly while disagreeing privately.", t: "Silence mistaken for consent." },
          { h: "You dominate the decision and call it alignment.", t: "Speed mistaken for buy-in." },
          { h: "You keep emotional accounts of every contribution.", t: "Scorekeeping as leverage." },
          { h: "You discuss the person with everyone except the person.", t: "Triangulation as relief." },
          { h: "You withdraw and make the other person guess why.", t: "Disengagement without explanation." },
          { h: "You declare the issue resolved before it is.", t: "False resolution." },
          { h: "You absorb credit that should have been shared.", t: "Credit theft by ambiguity." },
        ],
      },
      end: {
        title: "WHERE THIS DIMENSION ENDS",
        body: [
          "D5 governs the working space between two people when disagreement enters it. Communication Under Pressure (D4) governs the words you choose. If the question is what your words made another person carry, that is D4. If the question is what your behaviour did to the working relationship carrying the task, that is D5.",
          "The Foundational tier holds the collaboration question to two-person disagreement at desk level. The Intermediate tier covers collaboration across coalitions and contested authority.",
        ],
      },
    },
    costEquation: {
      title: "UNRESOLVED DISAGREEMENT DOES NOT DISAPPEAR. IT BECOMES COORDINATION COST.",
      items: [
        "More checking.",
        "Less generosity.",
        "Slower handoffs.",
        "Side conversations.",
        "Reduced trust.",
        "Defensive documentation.",
        "People choosing different collaborators next time.",
      ],
      transition: "Now let me show you the three patterns underneath what you just felt.",
    },
    reflectionPrompt:
      "Before we go any further — take 60 seconds. Think about the last working week. Was there a moment where you agreed outwardly while disagreeing privately? Or one where you withdrew without explaining why? We are not asking you to confess. We are asking you to notice.",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    c1: {
      title: "C1 — Agreement Is Not Alignment",
      narration: [
        "Most teams confuse agreement with alignment. They are not the same thing, and the difference shows up later.",
        "Agreement ends the conversation. Alignment strengthens the next collaboration.",
        "Three small signals separate the two:",
      ],
      signals: [
        { n: "i",   h: "Concerns named clearly.",     t: "Not silence mistaken for consent. The decision moves; the relationship can carry the decision." },
        { n: "ii",  h: "Slower but stronger.",        t: "Agreement is fast and fragile. Alignment takes longer and holds." },
        { n: "iii", h: "Evidence in the next move.",  t: "Agreement can be faked. Alignment leaves evidence in how people work together next time." },
      ],
      close:
        "The team that agrees quickly is not always the team that delivers reliably. Sometimes the silence is the early warning.",
      // AUTHORED — C1 reflection prompt (script doesn't specify a C1 reflection; mirrors D3 C1 cadence so the engine's c1_2 reflection screen has copy).
      prompt: "Think of a meeting where everyone agreed and the work later stalled. What was the silence covering?",
    },
    c2: {
      title: "C2 — The Space Between People Is the Work",
      narration: [
        "In every collaboration, there are three things: your part, their part, and the space between you. The first two are visible. The third is where the work either flows or stalls.",
        "In collaboration, the deliverable is not only the task. The working relationship is part of the deliverable.",
        "D5 introduces a private mirror for that third thing — the Relationship Field View. Five states. Open. Guarded. Transactional. Avoidant. Adversarial. Not a score. A description of where the working space currently sits.",
      ],
      // C2 introduces relationshipField — the engine renders it via the same
      // ClickToReveal mechanism D3 uses for its cost equation card.
      equation: {
        title: "THE RELATIONSHIP FIELD VIEW",
        rows: [
          { k: "Open",          v: "Both parties can still bring information, disagreement, and effort." },
          { k: "Guarded",       v: "One party is now careful, selective, or less generous." },
          { k: "Transactional", v: "Collaboration becomes ‘my part / your part,’ with reduced trust." },
          { k: "Avoidant",      v: "One party withdraws, delays, or routes around the other." },
          { k: "Adversarial",   v: "The person becomes the problem, not the shared issue." },
        ],
        footer: "Private rehearsal mirror. Not a score. Not behavioural documentation.",
      },
      delayed: [
        "A team does not break only when people fight. Sometimes it breaks when people become careful.",
        "The Relationship Field View is rendered after every scenario in the Lab ahead. Not to rate you. To make the third thing — the working space — visible.",
      ],
      closing: [
        "The two figures from the cold open return inside this brief. Notice the second figure has stopped facing you. They are facing what is between you. The shared object — the work — is the only honest place to stand.",
      ],
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question this module sits inside.",
        echo: "When working with others gets difficult, do you make progress easier or harder?",
        // AUTHORED — closing line in the script's register, anchored to the soul line.
        closing: "Now you know the tension. The single resolved disagreement is unremarkable. What your behaviour does to the working space across many disagreements — that is the entire dimension.",
      },
      // AUTHORED — C2 reflective decision prompt for engine parity with D3 c2_2.
      prompt: "Which of these five field states would the person you collaborate most often with describe as the current state of working with you?",
      options: [
        { key: "a", label: "Open — they can still bring concerns and effort to you freely." },
        { key: "b", label: "Guarded — they are now careful or selective in what they bring." },
        { key: "c", label: "Transactional — collaboration has become ‘my part / your part.’" },
        { key: "d", label: "Avoidant — they withdraw, delay, or route around you." },
      ],
      justificationPrompt: "Why this one? What evidence are you reading?",
    },
    c3: {
      title: "C3 — The Alignment Method",
      open:
        "There is a method underneath strong collaboration. Four moves. Not techniques. Behaviours. You will not be quizzed on them. You will rehearse them in real situations and watch what they do to the working space.",
      framework: "The Alignment Method",
      steps: [
        { name: "Hear the Position.",        body: "State their view in a way they would accept. Not a paraphrase that flatters yours. A mirror they would sign." },
        { name: "Name the Shared Interest.", body: "Identify what both people are trying to protect. The position is what each person says. The interest is what each person is trying to protect underneath." },
        { name: "Build the Bridge.",         body: "Create a path that serves the work without erasing either concern. A bridge is not a compromise where everyone loses equally. A bridge protects the shared interest better than either position alone." },
        { name: "Protect the Working Bond.", body: "Close the relationship after the decision, not only the task. The conversation is not done when the decision is made. It is done when the working bond can carry the next decision." },
      ],
      close: [
        "Four moves. Not a theory. A practice that holds up under workplace pressure.",
        "You will see all four tested in the scenarios ahead. After each scenario, the Relationship Field View will show where the working space sits. After all four, the Collaboration Pattern Mirror will show your pattern across them.",
      ],
      // AUTHORED — C3 reflection prompt for engine parity with D3 c3_2.
      prompt: "Which of the four moves — Hear, Name, Build, Protect — comes most naturally to you under workplace pressure? Which one would you skip first when the week gets tight? One sentence each.",
    },
    complete: {
      label: "Transition to Segment D · 15s",
      narration: [
        "Now I want you to hear one disagreement told twice. Once from each chair.",
        "Same meeting. Same deadline. Same shared deliverable. Two people protecting different things.",
        "Put your headphones on if you have them.",
      ],
      scopeBoundaries: {
        title: "Scope Boundaries — Foundational Tier and What the Intermediate Tier Adds",
        paragraphs: [
          // AUTHORED — Foundational/Intermediate framing in the register the script uses for its Engineering Doctrine. The script declares Foundational tier and references an Intermediate tier; the paragraphs are inferred from the tier doctrine pattern established in D1–D3.
          "This behavioural Dimension [D5], Collaboration and Conflict Resolution — Foundational, is deliberately bounded. It rehearses collaboration as the working space between two people when disagreement enters it.",
          "The scenarios are designed so the four moves of The Alignment Method — Hear, Name, Build, Protect — are knowable. The difficulty lives in whether you use them when the cost is immediate and the bridge is not yet visible.",
          "The Foundational tier concentrates rehearsal on two-person disagreement at desk level: a co-authored document, a credit moment, a style clash, a fracture after a meeting.",
          "What this tier does not cover is collaboration across coalitions — situations where three or more parties hold contested authority and the bridge must hold weight beyond a single relationship.",
          "That variability belongs in the Intermediate tier.",
          "Where the Foundational tier asks, ‘What did your move do to the working space between you and one other person?’, the Intermediate tier asks, ‘How do you keep the working space honest when more than two people are protecting different things?’",
          "The Foundational tier is the floor the Intermediate tier builds on. You cannot rehearse collaboration across coalitions until two-person honesty is already a pattern.",
        ],
      },
    },
    breakPoint1: {
      label: "Pause invitation · Break Point 1 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 1",
      subtitle: "After Segment C",
      elapsedLabel: "Elapsed: ~21 minutes",
      remainingLabel: "Remaining: ~68 minutes",
      avatarScript: [
        "You have covered the first part of the rehearsal. We encourage you to take a break here so what you have practised can settle.",
        "Our intent is not to have you complete this module — it is to have you carry it with you.",
        "Take your time. Your progress is saved.",
      ],
      continueLabel: "Continue now",
      returnLaterLabel: "Return later",
    },
  },

  /* ---------------- SEGMENT D — AUDIO CASE: THE SAME MEETING TWICE -------- */
  // D5 SIGNATURE: dualPerspective — Morgan beat + Sam beat, then a gap reveal,
  // then two decision pauses (the second three days later).
  segmentD: {
    title: "The Same Meeting Twice",
    intro: [
      "This case is different. You will hear the same workplace conflict twice. First from Morgan’s chair. Then from Sam’s chair.",
      "Same meeting. Same deadline. Same shared deliverable. Two people protecting different things.",
      "The point is not to decide who is right. The point is to see what the working relationship could no longer carry.",
    ],
    // D5 SIGNATURE: dualPerspective — Morgan's chair (Beat D-2)
    part1: {
      heading: "Morgan’s Chair",
      voice: "morgan_AI",
      narration: [
        "I own the data analysis for a client report due at noon. At 9:40 last night, I found two discrepancies. The new numbers are correct, but the method changed from last quarter. Without a footnote, the client may think the team made an error.",
        "I spent three hours checking the numbers. At 10:18 PM, I messaged Sam: I found a discrepancy in Table 3. The numbers are correct, but the methodology changed. We need to explain this before submission.",
        "Sam replied at 7:06 AM: The client needs it by noon. Let’s not overthink this.",
        "I read the message twice. What I heard was not ‘I’m worried about the deadline.’ What I heard was ‘Your concern does not matter.’",
        "I arrive at 8:45 AM with the data checked, the footnote drafted, and the feeling that Sam has already dismissed the work.",
      ],
      reportArtifact: {
        title: "MORGAN’S TIMELINE",
        lines: [
          "Last night 9:40 PM    Found two discrepancies in Table 3",
          "Last night 10:18 PM   Messaged Sam: need to explain before submission",
          "This morning 7:06 AM  Sam replied: ‘Let’s not overthink this.’",
          "This morning 8:45 AM  Arrived with data checked, footnote drafted",
          "Today 12:00 PM        Report due to client",
          "",
          "What Morgan is protecting: accuracy.",
        ],
      },
      reflection: {
        heading: "After Morgan’s Chair",
        narration: [
          "Pause. You have heard one chair. Notice what you carry into the next one. Notice what you have already decided about Sam.",
          "Now we turn the camera.",
        ],
      },
    },
    // D5 SIGNATURE: dualPerspective — Sam's chair (Beat D-3)
    part2: {
      heading: "Sam’s Chair",
      voice: "sam_AI",
      narration: [
        "I own the executive summary and client presentation. The manager said on Monday: ‘This is a relationship account. If this report is late, the client questions our reliability.’ I have been carrying three deliverables this week. The presentation was finished late last night.",
        "When Morgan’s message arrived at 10:18 PM, I felt the deadline tighten. I did not think Morgan was wrong. I thought the issue was arriving too late.",
        "The reply — ‘Let’s not overthink this’ — was not meant to dismiss Morgan. It was a stress response.",
        "From my chair, Morgan had introduced uncertainty twelve hours before the deadline. From Morgan’s chair, I had dismissed a real risk.",
        "Same event. Two chairs. Two injuries.",
      ],
      timelineArtifact: {
        title: "THE GAP",
        lines: [
          "Accuracy        ←  What Morgan defended.",
          "Timeliness      ←  What Sam defended.",
          "",
          "Client trust    →  The shared interest neither named.",
          "",
          "Morgan argued from the data. Sam argued from the deadline.",
          "The shared deliverable became a tug-of-war because the shared",
          "interest was never placed between them.",
        ],
      },
    },
    // Decision Pause 1 — Morgan's chair, before submission.
    pause1: {
      prompt:
        "It is 8:45 AM. You are Morgan. The report is due at noon. Sam is at their desk. You have the footnote drafted. What do you do first?",
      options: [
        { key: "a", label: "“The data has a discrepancy and Sam does not want to address it. We need a decision before submission.” (Escalate upward.)" },
        { key: "b", label: "“I think we are both protecting client trust. You are protecting the deadline. I am protecting the credibility of the numbers. Can we take 20 minutes to decide which explanation must go in now and what can wait?” (Alignment move.)" },
        { key: "c", label: "Add the footnote yourself without talking to Sam. Submit on time. (Quiet fix.)" },
        // AUTHORED — Path D for engine 4-path parity. Script declares 3 paths; Path D voiced in the script's failure-mode register (the silent withdraw that becomes a side-channel).
        { key: "d", label: "Submit without the footnote. Don’t escalate, don’t fix, don’t talk to Sam. Decide the issue is Sam’s problem now. (Silent withdrawal.)" },
      ],
      justificationPrompt: "Why this option? What are you protecting in the working space between you and Sam?",
    },
    // Decision Pause 2 — Sam's chair, three days later.
    pause2: {
      heading: "Three Days Later",
      intro: [
        "A soft caption fades in. ‘Three days later.’ The same office. Different light. Same two chairs, now both lit.",
        "The client has emailed: ‘The numbers in Table 3 do not match last quarter’s report. Can you explain?’",
        "You are Sam. The issue Morgan flagged has reached the client. What do you do first?",
      ],
      prompt:
        "You are Sam. The issue Morgan flagged has reached the client. Write the words you would send first — to Morgan, to the client, or to the manager. Whichever message you would actually send first.",
      writePrompt:
        "Write the exact message you would send first — whether to Morgan, the client, or your manager. The words you would actually use in this moment.",
      submitLabel: "Send the first message",
      minChars: 50,
      options: [
        { key: "a", label: "“Morgan raised this before submission. I did not slow down enough to resolve it. I will contact Morgan now, align the explanation, and send the correction today.” (Shared accountability with repair.)" },
        { key: "b", label: "“We reviewed under time pressure. We should have footnoted the methodology change. We’ll correct it today.” (Shared oversight framing.)" },
        { key: "c", label: "“Morgan owned the data tables. I relied on their review.” (Protect yourself.)" },
      ],
    },
    part3: {
      heading: "Debrief Through The Alignment Method",
      narration: [
        "Here is what The Alignment Method would have looked like inside this case.",
        "Hear the Position — Morgan did not hear the deadline pressure. Sam did not hear the credibility risk.",
        "Name the Shared Interest — Both were protecting client trust. Neither said it.",
        "Build the Bridge — Submit on time with a clear methodology footnote and a client note explaining the change. The bridge was available.",
        "Protect the Working Bond — The report went out, but the relationship carried the unresolved conflict. Three days later the client became the consequence.",
        "The disagreement was not the failure. The failure was letting each person carry the disagreement alone.",
      ],
    },
    close: {
      card: [
        "You made two decisions inside the story.",
        "One before the report went out. One three days later.",
        "Some of what those decisions revealed, you saw as you made them.",
        "Some of it, you may not see for weeks.",
      ],
    },
    complete: {
      label: "Transition to Segment E · 20s",
      narration: [
        "You have heard one disagreement from two chairs and made decisions inside it.",
        "Next, you are inside the situation yourself. Four scenarios. Four decisions. Four consequence chains across same day, next week, and month end.",
        "After each one, the Relationship Field View will show you where the working space sits.",
      ],
      continueLabel: "Continue",
    },
    breakPoint2: {
      label: "Pause invitation · Break Point 2 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 2",
      subtitle: "After Segment D",
      elapsedLabel: "Elapsed: ~38 minutes",
      remainingLabel: "Remaining: ~51 minutes",
      avatarScript: [
        "You have just heard one disagreement told twice and made decisions inside it. Let what you have practised so far settle.",
        "The Scenario Lab ahead will ask more of you — and you are more ready for it than you think.",
        "Step away if you need to. Reflect. Come back when you are ready.",
      ],
      continueLabel: "Enter the Scenario Lab",
      returnLaterLabel: "Return later",
    },
  },

  /* ------------------ SEGMENT F — MICRO-DRILLS (Position Mirror + Build the Bridge) */
  segmentF: {
    intro: "Two short drills that isolate two of the four moves. Hear the Position. Build the Bridge.",
    f1: {
      title: "F1 — The Position Mirror",
      audioIntro: "Five rapid micro-mirrors. Each is a position you must reflect back so the other person would accept the mirror. We are not rating; we are rehearsing the muscle.",
      header: "Five positions. For each, choose the version that reflects the position the other person would sign.",
      onScreenHeader: {
        title: "POSITION MIRROR — REFLECT WHAT THEY ARE PROTECTING",
        lines: [
          "You will see five disagreements.",
          "For each, choose the mirror that the other person would actually sign.",
        ],
        cta: "Tap to begin.",
      },
      options: [
        "Alignment mirror — accurate and names what they are protecting",
        "Defensive mirror — misstates their position to make yours stronger",
        "Neutral mirror — accurate but cold",
        "Dismissive mirror — minimises their concern",
      ],
      // AUTHORED — F1 vignettes built from the script's Drill 1 reference set + four additional positions in the script's register. Engine expects 5-vignette × 4-option recognition (per D3 F1).
      items: [
        { vignette: "Priya wants to delay the pilot launch by two weeks. You believe the delay will cost momentum.", answer: "Alignment mirror — accurate and names what they are protecting", feedback: "The Position Mirror. ‘Priya, I think what you are protecting is user trust — you do not want momentum to come at the cost of people losing confidence in the product.’ A strong mirror makes their concern recognizable." },
        { vignette: "Avery softened your strongest recommendation in a shared document twelve minutes before a client deadline.", answer: "Alignment mirror — accurate and names what they are protecting", feedback: "The Position Mirror. ‘Avery, I think you are protecting approval risk — you are worried the direct version creates pushback we cannot recover from today.’ Name what they are protecting before naming what you want." },
        { vignette: "Sam replied ‘Let’s not overthink this’ when you raised a data discrepancy twelve hours before the deadline.", answer: "Alignment mirror — accurate and names what they are protecting", feedback: "The Position Mirror. ‘Sam, I think you are protecting the deadline because the client reads lateness as unreliability.’ A mirror is not agreement. It is acknowledgement." },
        { vignette: "Taylor did most of the analytical work but is not in the room when you present.", answer: "Alignment mirror — accurate and names what they are protecting", feedback: "The Position Mirror. ‘Taylor, I think what you are protecting is the visibility of analytical contribution that gets lost when only the presenter is named.’ A mirror is what allows credit to be created instead of absorbed." },
        { vignette: "Jordan wants to keep an unstable feature in the release to honour a client promise.", answer: "Alignment mirror — accurate and names what they are protecting", feedback: "The Position Mirror. ‘Jordan, I think you are protecting client trust in the promise we made. I am protecting client trust in the product. Both are trust.’ The mirror exposes the shared interest." },
      ],
      closeCard: "You have rehearsed five Position Mirrors. A weak mirror makes their position smaller. A strong mirror makes their concern recognizable.",
    },
    f2: {
      title: "F2 — Build the Bridge",
      audioIntro: "Three scenarios. For each one, two positions are in conflict. Choose the version that protects the shared interest better than either position alone.",
      header: "Three scenarios. For each, recognise the bridge that protects the shared interest.",
      onScreenHeader: {
        title: "BUILD THE BRIDGE — PROTECT THE SHARED INTEREST",
        lines: [
          "Four categories of move appear in each scenario:",
        ],
        showOptionsRow: true,
        cta: "Tap to begin.",
      },
      options: [
        "Bridge design — protects the shared interest",
        "Split-the-difference compromise",
        "One-sided solution",
        "Delay-and-defer",
      ],
      // AUTHORED — F2 framed as recognition for engine parity with D3 F2. The script defines F2 as free-form bridge writing; recognition framing here mirrors the script's three reference variants for each scenario.
      items: [
        { vignette: "One person wants speed. One person wants accuracy. The shared interest is client trust. The deadline is real. The quality risk is real.", answer: "Bridge design — protects the shared interest", feedback: "Build the Bridge. ‘We submit the main report on time with a clear note explaining the methodology change, then send the supplemental table by Friday. That protects the deadline and prevents the client from misreading the numbers.’ A bridge protects the shared interest better than either position alone." },
        { vignette: "A client asks for an out-of-scope addition before a final deadline. You want to honour the boundary. The client wants the addition. The shared interest is the relationship.", answer: "Bridge design — protects the shared interest", feedback: "Build the Bridge. ‘That sits outside the original scope. We can either swap it in for something we agreed to, or include it as a separate addendum after the main report lands. Which works for you?’ The bridge gives the client agency without erasing the boundary." },
        { vignette: "A colleague wants tracker-driven planning. You want iterative drafts. The shared interest is the project moving cleanly through both rhythms.", answer: "Bridge design — protects the shared interest", feedback: "Build the Bridge. ‘Can we align on a way to make your drafts visible without forcing your process into my structure? Weekly progress markers, kept light, on a tracker that respects how you actually work.’ The bridge does not pick one rhythm — it gives both a shape." },
      ],
      closeCard: "You have rehearsed Build the Bridge three times. A bridge is not a compromise where everyone loses equally. A bridge protects the shared interest better than either position alone.",
    },
    complete: {
      label: "Transition to Segment G · 15s",
      narration: [
        "The Field Guide gave you the language.",
        "The Audio Case gave you two chairs.",
        "The Scenario Lab gave you the consequences across the working space.",
        "The drills settled two of the four moves into recognition.",
        "One thing left.",
      ],
      continueLabel: "Continue",
    },
    closingReflection: {
      prompt: "What did you notice about your default when disagreement appears — defend, avoid, explain, bridge, or withdraw? Take 30 seconds. Speak it or type it. This is for you.",
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
      "You did not practise being agreeable. You practised staying useful when agreement became difficult.",
      "You worked the space between two people for ninety minutes.",
      "The work was not the dialogue. The work was what you did to the space.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "A sharper sense of what your behaviour does to the working space between you and another person.",
      ],
    },
    // Cold-open callback — per the four paths in Segment A.
    // AUTHORED — script does not enumerate G-1 cold-open callbacks per path. Mirroring D3's pattern with D5-specific language anchored to the 4:18 PM / Avery / shared document moment.
    callback: {
      a: "You opened this module at 4:18 by pushing back directly on Avery’s edit. Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 4:18 by moving toward alignment with Avery. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 4:18 by quietly restoring your wording. Hold that first instinct beside the choices that followed.",
      d: "You opened this module at 4:18 by accepting Avery’s edit to keep the proposal moving. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      label: "Framework Return · 25s",
      durationSeconds: 25,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through four scenarios. Different stakes. Different costs. But the same four moves.",
      steps: ["Hear the Position.", "Name the Shared Interest.", "Build the Bridge.", "Protect the Working Bond."],
      tagline: "This is The Alignment Method.",
      carryForward: "You have now used each step at least once. You will use them tomorrow.",
    },
    // D5 SIGNATURE: roleReversal return — Screen G-2 pacing block per script.
    roleReversal: {
      label: "Role Reversal Artifact return",
      lead: "You wrote this earlier, from someone else’s chair.",
      originalDM: "Is it just me, or is Avery impossible to plan with?",
      artifactLabel: "From Avery’s chair",
      avatarClose: "Both sentences are real. Both came from you.",
      // Pacing per script (Beat 1 → Beat 6, total ~19s).
      timings: { beat1: 0, beat2: 3000, beat3: 8000, beat4: 11000, beat5: 14000, beat6: 17000 },
    },
    delayedRetentionCheck: {
      label: "Retention check setup · 45s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In three to seven days, one of these moments will come back to you.",
        "You will see what you wrote. You will answer one question: Is this still how I would handle the space between us?",
        "A second look at one moment. That is all. No grades. No pass or fail. Both responses are kept in your Growth Log without ranking.",
      ],
      details: [
        { k: "Appears",  v: "3 to 7 days from now (notification sent)" },
        { k: "Format",   v: "1 prior response surfaced + 1 question" },
        { k: "Response", v: "Optional second response, 40–220 characters" },
        { k: "Attempts", v: "1 available" },
        { k: "Cooldown", v: "48 hours if you defer the prompt" },
        { k: "Window",   v: "72 hours from notification" },
      ],
      doctrinalNote: [
        "This is not a quiz. It is a re-rehearsal — a second look at one moment in your own voice.",
        "If your second response differs from your first, both are kept in your Growth Log side-by-side. No score. No comparison label.",
      ],
      continueLabel: "Got it — continue",
      questionsPerAttempt: 1,
      attemptsMax: 1,
      cooldownHours: 48,
      windowHours: 72,
      notificationWindowHours: [72, 168],
    },
    bookendQuestion:
      "When working with others gets difficult, do you make progress easier or harder?",
    finalPrompt:
      "Think of one person you have made harder to work with. Write one sentence that could reopen the working space.",
    finalExamples: [
      "I think we are both protecting something important. Can we slow down and name what each of us is trying to protect?",
      "I do not want this to become you versus me. Can we put the problem in front of us and work from there?",
      "I think I moved too quickly to defend my position. Let me restate what I think you are protecting.",
    ],
  },
};

/* ============================================================================
   SCENARIO CHAIN 1 — THE SHARED DOCUMENT
   D5 SIGNATURE: thirdObject — the visual cue surfaces in this scenario.
   ========================================================================== */
export const SC1_CONTENT_D5 = {
  id: "SC1",
  title: "The Shared Document",
  commitment: "Decide whether to push back on Avery’s edit, move to alignment, restore quietly, or absorb.",
  // D5 SIGNATURE: thirdObject
  signatureMechanic: "thirdObject",
  thirdObjectIntro: "There are two people in this scene. And one shared problem. Notice which one you talk about.",
  callback: [
    "You have been here before.",
    "At the start of this module, you saw the shared document for thirty seconds. Now you return to it with the full consequence chain — same day, next week, month end.",
    "You may choose the same instinct again, or choose differently. Notice whether your reasoning has changed.",
  ],
  intro: [
    "Scenario one. The Shared Document.",
    "The paragraph is the visible object. The real issue is whether both of you can turn toward the proposal together instead of turning on each other.",
  ],
  briefing:
    "It is 4:18 PM on a Thursday. The client proposal is due to the CEO of Northland Health at 6:00 PM. You and Avery have co-owned this proposal for nine days. Avery softened your strongest recommendation in the shared document. You believe the client needs direct language. Avery believes the client will reject the proposal if the language creates too much pushback. The paragraph is the visible object. The real issue is whether both of you can turn toward the proposal together instead of turning on each other.",
  artifacts: [
    {
      caption: "The paragraph that changed",
      title: "Shared Document · paragraph history",
      mono: true,
      lines: [
        "4:02 PM — Your original text",
        "  ‘We recommend immediate adoption of the pilot approach across the",
        "   Northeast region.’",
        "",
        "4:16 PM — Avery’s edit",
        "  ‘The team may wish to consider phased exploration of the pilot",
        "   approach across selected regional areas.’",
        "",
        "4:17 PM — Avery’s comment on the edit",
        "  ‘I softened this so it does not create unnecessary pushback. We",
        "   need approval today.’",
      ],
    },
    {
      caption: "Texture — Avery’s status and earlier comment",
      title: "Working context",
      mono: true,
      lines: [
        "Avery’s Slack status (right now):",
        "  ‘On a client call. Back at 4:30.’",
        "",
        "Earlier today — 2:51 PM, on a different paragraph:",
        "  ‘Your data section is sharp. I think this is the strongest part",
        "   of the proposal.’",
        "",
        "Document share permissions:",
        "  You — owner.",
        "  Avery — editor.",
        "  Your manager — viewer. Last opened twenty minutes ago. No comment.",
      ],
    },
  ],
  decisionPrompt: "Avery is between meetings. The deadline is at 6:00 PM. The paragraph is in front of you. What do you do?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk in the working space between you and Avery?",
  options: [
    { key: "a", label: "“This edit weakens the recommendation. I do not agree. We need to restore the direct version.” (Push back directly.)" },
    { key: "b", label: "“I see you are protecting approval risk. I am protecting the recommendation’s force. Can we take ten minutes to decide what must stay strong and what can be softened?” (Move to alignment.)" },
    { key: "c", label: "Restore original paragraph without replying. (Quietly restore your wording.)" },
    // AUTHORED — Path D for engine 4-path parity. Voiced in the script's failure-mode register (FM-1 Conflict Avoider).
    { key: "d", label: "Accept Avery’s edit and move on. Don’t reply, don’t restore, don’t flag the concern. Hope the client doesn’t notice the softer language. (Silent absorption.)" },
  ],
  artifactWrite: {
    a: { prompt: "You have decided to push back directly. Write the actual comment you would leave in the document — the exact words Avery will see when they come back at 4:30.", submit: "Post the comment" },
    b: { prompt: "You have decided to move to alignment. Write the actual reply you would send to Avery — the words that propose the ten-minute call without making Avery the obstacle.", submit: "Send the alignment reply" },
    c: { prompt: "You have decided to restore quietly. Write the private note you would keep for yourself — what you decided, what you risked, or explain why no record is appropriate.", submit: "Keep this for yourself" },
    d: { prompt: "You have decided to absorb the edit silently. Write the private note you would keep for yourself — what you decided, what you risked.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the direct-challenge comment, in the calibrated register from the script.
      { tag: "Defensive", calibrated: false, text: "You just gutted this paragraph. Putting it back.", lands: "Avery hears anger before they hear the work. The paragraph becomes the proxy for the relationship." },
      { tag: "Over-apologetic", calibrated: false, text: "Sorry to push back — I know you’re between meetings — but I really feel like the original version was stronger if that’s OK to say.", lands: "The apology takes up the message. Avery hears uncertainty rather than the substantive disagreement they could engage." },
      { tag: "Calibrated", calibrated: true, text: "Avery — coming back to your edit. I think we are protecting different things: you, approval risk; me, the recommendation’s force. The softened version reads as advisory rather than directive. Can we take ten minutes when you’re off the call to decide what must stay strong and what can be softened?", lands: "Avery hears the diagnosis, the shared interest, and the ask in one breath. The conflict moves toward the proposal, not toward each other." },
    ],
    b: [
      // AUTHORED — Path B reference set (the alignment-call message).
      { tag: "Defensive", calibrated: false, text: "Can we talk about the edit? Need to push back a bit.", lands: "Avery hears confrontation without context. They walk into the call already defending." },
      { tag: "Calibrated", calibrated: true, text: "Avery — quick ten-minute call when you’re back at 4:30? I think we are protecting different things on this paragraph and I want to land it together rather than swap edits in the comments.", lands: "Avery hears the shape of the conversation before they enter it. The bridge is half-built before the call begins." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose silence over surfacing the disagreement." },
    closing: "What changes between these versions: who carries the disagreement, when it gets surfaced, and whether Avery and the proposal are talked about together or apart. The paragraph is the same. The working space is not.",
  },
  consequences: {
    a: {
      sameDay: [
        "Avery replies: ‘I’m not trying to weaken your work. I’m trying to get this approved.’",
        "The issue is visible, but the tone tightens.",
      ],
      nextWeek: [
        "The proposal is approved with modified language. But Avery stops editing directly in your sections.",
        "They leave comments only.",
      ],
      monthEnd: [
        "On a new project, Avery asks the manager to clarify ownership boundaries before collaborating with you again.",
        "The field is now guarded.",
      ],
      outcome: "Direct challenge. Proposal approved with modified language. Avery stopped editing directly.",
      others: "Avery asked the manager to clarify ownership before collaborating again.",
      interp: "You surfaced disagreement, but risked making Avery the obstacle rather than the proposal the shared object.",
      manager: "Avery’s perspective. “The disagreement was real and I respect the directness. But the next time we co-write, I’m going to ask for clearer ownership lines upfront.”",
      fieldDelta: "open → guarded",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "Avery agrees to a ten-minute alignment call. You identify the shared interest: approval with enough strategic force to matter.",
        "You write a stronger but less provocative sentence together.",
      ],
      nextWeek: [
        "Avery flags a risk earlier on the next deliverable because the prior disagreement did not punish them.",
        "The proposal work improves.",
      ],
      monthEnd: [
        "Avery invites you into a new draft earlier than required.",
        "The field is open.",
      ],
      outcome: "Alignment move. Shared interest named. Stronger paragraph written together.",
      others: "Avery began flagging risks earlier and inviting you in sooner.",
      interp: "You turned the conflict toward the shared deliverable and made both concerns usable.",
      manager: "Avery’s perspective. “That ten-minute call was the difference. We left as collaborators instead of as people who had to manage each other.”",
      fieldDelta: "open → open (deepened)",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Avery sees the restored wording and asks why you reversed the edit.",
        "The conflict shifts from the paragraph to trust.",
      ],
      nextWeek: [
        "Avery begins duplicating key comments in Slack ‘for visibility.’",
        "Collaboration becomes documented instead of fluid.",
      ],
      monthEnd: [
        "The manager notices both of you are spending more time protecting versions than improving content.",
        "The field becomes transactional.",
      ],
      outcome: "Quiet re-edit. Conflict moved from paragraph to trust.",
      others: "Avery began duplicating comments in Slack ‘for visibility.’",
      interp: "You protected your preferred wording but damaged the trust needed to keep editing together.",
      manager: "Avery’s perspective. “The reversal without a reply read as ‘I don’t need to talk to you about this.’ Now I document because I can’t assume you’ll say.”",
      fieldDelta: "open → transactional",
      traj: "drop",
    },
    d: {
      // AUTHORED — Path D consequence chain in the script's failure-mode register (FM-1 / FM-5).
      sameDay: [
        "Avery sends a thumbs-up emoji. The proposal moves forward unchanged from their edit.",
        "Your name on the document remains. A small internal indicator shifts that only you can feel.",
      ],
      nextWeek: [
        "The client receives the softened recommendation. Approval comes through, but with a question: ‘Can you clarify what you actually recommend?’",
        "Your manager asks Avery, not you, to draft the clarification.",
      ],
      monthEnd: [
        "Avery has begun writing your sections more confidently. They no longer ask before softening.",
        "You are quieter on shared drafts. The collaboration looks smooth and feels thinner. The field has moved toward avoidant.",
      ],
      outcome: "Silent absorption. Avery’s edit shipped. Manager routed the clarification through Avery.",
      others: "Avery began writing your sections without asking; you became quieter on shared drafts.",
      interp: "You avoided the friction and lost the position. Avery did not know you disagreed; only that you accepted.",
      manager: "Avery’s perspective. “I thought we were aligned because they didn’t say anything. Now I write the section assuming I have full latitude. They have not pushed back, so I have stopped checking.”",
      fieldDelta: "open → avoidant",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Direct challenge", signal: "Surfaced disagreement directly. Avery became the obstacle.", effect: "Field shifts toward guarded; Avery asks for ownership clarity next time." },
    { key: "b", title: "Alignment move", signal: "Turned the conflict toward the shared deliverable.", effect: "Field opens; Avery brings concerns earlier on the next project." },
    { key: "c", title: "Quiet re-edit", signal: "Protected wording but damaged the trust to keep editing together.", effect: "Field becomes transactional; Avery duplicates comments ‘for visibility.’" },
    { key: "d", title: "Silent absorption", signal: "Accepted without flagging. Avery did not know you disagreed.", effect: "Field becomes avoidant; Avery writes your sections without asking." },
  ],
  reflection:
    "Think of a moment you accepted an edit you disagreed with. What did the silence cost? What would naming the disagreement — toward the shared object, not toward the person — have changed?",
};

/* ============================================================================
   SCENARIO CHAIN 2 — THE CREDIT MOMENT
   D5: Relationship Field View renders after this scenario.
   ========================================================================== */
export const SC2_CONTENT_D5 = {
  id: "SC2",
  title: "The Credit Moment",
  commitment: "Decide how to attribute a peer’s analytical work when ambiguity benefits you.",
  signatureMechanic: "credit_field_view",
  threading: {
    transparent: [
      "Last time, you moved toward alignment with Avery. The collaboration with Taylor enters this scenario already steady.",
      "Leadership has asked you to present the joint work alone. Taylor will not be in the room.",
    ],
    cautious: [
      "Last time, you handled the shared document with mixed results. Taylor has been quietly watching the working space.",
      "Leadership has asked you to present the joint work alone. Taylor will not be in the room.",
    ],
    avoidant: [
      "Last time, the working space with Avery became transactional or avoidant. Taylor has heard about it.",
      "Leadership has asked you to present the joint work alone. Taylor will not be in the room.",
      "The room you are walking into has more weight than it would have last month.",
    ],
  },
  intro: [
    "Scenario two. The Credit Moment.",
    "You and Taylor completed a project together. Taylor did most of the technical analysis. You led client coordination and built the final presentation. Leadership has asked you to present. Taylor will not be in the room.",
    "The room will naturally attach the quality of the work to the person speaking. Taylor is not asking for credit. That is exactly why the moment matters.",
  ],
  briefing:
    "You and Taylor completed a project together. Taylor did most of the technical analysis. You led client coordination and built the final presentation. Leadership has asked you to present the results. Taylor will not be in the room. The room will naturally attach the quality of the work to the person speaking. Taylor is not asking for credit. That is exactly why the moment matters.",
  artifacts: [
    {
      caption: "Contribution breakdown",
      title: "Project contribution — who did what",
      mono: true,
      lines: [
        "TAYLOR",
        "  Data model.",
        "  Analytical methodology.",
        "  Core findings.",
        "  Three late nights last week.",
        "",
        "YOU",
        "  Client coordination.",
        "  Stakeholder management.",
        "  Final presentation design and narrative.",
        "  Two early mornings shaping the story.",
      ],
    },
    {
      caption: "Texture — what Taylor said and did not say",
      title: "Working context",
      mono: true,
      lines: [
        "Taylor’s Slack message to you (last night, 9:47 PM):",
        "  ‘The presentation looks great. You really made the data come",
        "   alive. Good luck Tuesday.’",
        "",
        "What Taylor said to a peer this morning (you did not hear it):",
        "  ‘I hope leadership remembers where the analysis came from.",
        "   I am not going to chase it.’",
        "",
        "The room you are walking into:",
        "  Eight people. The CFO is at the head of the table.",
        "  Your slide is already on the screen. The CFO is leaning forward.",
      ],
    },
  ],
  decisionPrompt: "The CFO is leaning forward. Your slide is up. Taylor is not in the room. What is the exact line you say when introducing the work?",
  justificationPrompt: "Why this option? What are you protecting, and what is it costing you to protect it?",
  options: [
    { key: "a", label: "“The analytical framework was designed by Taylor. I translated it into the client-facing format you see here.” (Specific attribution.)" },
    { key: "b", label: "Use ‘we’ throughout. No individual attribution. (Collective language only.)" },
    { key: "c", label: "Mention the analysis as strong but do not name Taylor. (Let visibility attach to you.)" },
    // AUTHORED — Path D for engine 4-path parity. Voiced as FM-7 Credit Absorber explicit.
    { key: "d", label: "Describe the analysis using ‘I’ language throughout. (Attribute the work to yourself directly.)" },
  ],
  artifactWrite: {
    a: { prompt: "Write the exact line you say to the room when you introduce the work. The words leadership will hear.", submit: "Speak it to the room" },
    b: { prompt: "Write the exact line you say to the room. Collective language, no individual attribution.", submit: "Speak it to the room" },
    c: { prompt: "Write the exact line you say to the room. Mention the analysis, do not name Taylor.", submit: "Speak it to the room" },
    d: { prompt: "Write the exact line you say to the room. The words attached to your name only.", submit: "Speak it to the room" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the specific-attribution line.
      { tag: "Defensive", calibrated: false, text: "I worked with Taylor on this — anyway, here’s what we found.", lands: "Taylor’s name is a hedge, not an attribution. Leadership hears uncertainty about who did what." },
      { tag: "Over-apologetic", calibrated: false, text: "Just to be clear before I start — I want to say Taylor did most of the real work and I’m mostly the messenger here.", lands: "The over-disclaimer collapses your contribution. Leadership now has to repair your self-effacement before they can hear the work." },
      { tag: "Calibrated", calibrated: true, text: "Before I walk you through this — the analytical framework you’re about to see was designed by Taylor, including the methodology and the core findings. I translated their work into the client-facing format you have on the screen.", lands: "Leadership hears the architecture and the translation, named clearly. The work is real, the attribution is real, and your contribution is real too." },
    ],
    b: [
      // AUTHORED — Path B/C reference (collective language).
      { tag: "Defensive", calibrated: false, text: "We — Taylor and I and a couple of others — pulled this together.", lands: "‘We’ stretches to cover everyone and lands attached to no one." },
      { tag: "Calibrated", calibrated: true, text: "This was a two-person project. Taylor led the analysis, I led the client narrative. Let me walk you through what we found.", lands: "Even inside collective framing, the architecture is visible. Leadership can place the work in two pairs of hands." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the line that went into the room — and what it carried out." },
    closing: "What changes between these versions: whether Taylor’s name is in the room when the CFO leans forward, or whether the absence of their name becomes the cost. The work is the same. The credit field is not.",
  },
  consequences: {
    a: {
      sameDay: [
        "Leadership hears Taylor’s name connected to the strongest analytical work and your name connected to translation and coordination.",
        "The CFO nods at the attribution and asks the analytical questions to Taylor’s name, even though Taylor is not in the room.",
      ],
      nextWeek: [
        "Taylor receives direct praise from a senior leader who attended the meeting.",
        "Taylor messages you: ‘I know that came from your presentation. Thank you.’",
      ],
      monthEnd: [
        "You become known as someone who makes others’ work visible.",
        "That becomes a leadership signal of its own.",
      ],
      outcome: "Specific attribution. Taylor named. Both contributions visible.",
      others: "Taylor received direct praise and thanked you for naming them.",
      interp: "You held your own contribution while making another person’s work visible.",
      manager: "Taylor’s perspective. “I wasn’t in the room and I didn’t need to be. Their attribution did the work I would have done if I were there. That is rarer than it should be.”",
      fieldDelta: "open → open (deepened)",
      traj: "rise",
    },
    b: {
      sameDay: [
        "Presentation goes well. The work is remembered as good, but nobody knows who did what.",
        "The CFO asks the analytical questions to you because your name is the only one in the room.",
      ],
      nextWeek: [
        "Taylor is not upset, but notices the absence of attribution.",
        "They mention it once, briefly, in a 1:1 with their manager.",
      ],
      monthEnd: [
        "Taylor still collaborates, but less generously.",
        "The field is slightly guarded.",
      ],
      outcome: "Collective language. Work remembered as good; attribution diffuse.",
      others: "Taylor mentioned it once to their manager; collaborates less generously.",
      interp: "You avoided credit theft, but also avoided credit creation.",
      manager: "Taylor’s perspective. “‘We’ was true. It was also incomplete. I’m not going to chase it, but next time I might not stay late.”",
      fieldDelta: "open → guarded",
      traj: "drift-down",
    },
    c: {
      sameDay: [
        "Leadership associates the work with you.",
        "The CFO files the analytical strength under your name.",
      ],
      nextWeek: [
        "A colleague asks Taylor if their analysis was mentioned.",
        "Taylor says: ‘Not really.’ The collaboration account has a withdrawal.",
      ],
      monthEnd: [
        "Taylor suggests a different partner for a future project.",
        "The cost of invisible attribution is a collaborator who stops volunteering their best work.",
      ],
      outcome: "Strong analysis mentioned; Taylor unnamed.",
      others: "Taylor suggested a different partner for the next project.",
      interp: "You allowed ambiguity to benefit you, and the person who did the work felt the shift.",
      manager: "Taylor’s perspective. “They didn’t lie. They didn’t need to. The shape of what they said put the analytical reputation on their name. The shape was the decision.”",
      fieldDelta: "open → adversarial",
      traj: "drop",
    },
    d: {
      // AUTHORED — Path D consequence chain (direct credit absorption).
      sameDay: [
        "Leadership attaches the analytical reputation to you.",
        "Taylor hears second-hand that the CFO described the methodology as ‘your model.’",
      ],
      nextWeek: [
        "Taylor stops responding to your DMs for two days. Then responds tersely.",
        "A peer who knew the project DMs you: ‘Did you really not name Taylor?’",
      ],
      monthEnd: [
        "Taylor formally requests not to be paired with you again.",
        "The field is adversarial. The cost is not just one collaborator. It is the team’s read of how credit travels through your hands.",
      ],
      outcome: "‘I’ language throughout. Reputation attached to you. Taylor stopped collaborating.",
      others: "Taylor formally requested not to be paired with you again.",
      interp: "You attached the work to yourself. The person who did the work watched it happen.",
      manager: "Taylor’s perspective. “I didn’t lose credit. I lost the ability to trust they would hold credit when I wasn’t in the room. Those are different losses.”",
      fieldDelta: "open → adversarial",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Specific attribution", signal: "Held your contribution while making Taylor’s work visible.", effect: "Field deepens; Taylor stays generous; you become the leadership signal for credit creation." },
    { key: "b", title: "Collective ‘we’", signal: "Avoided credit theft, also avoided credit creation.", effect: "Field slightly guards; Taylor stays in but less generously." },
    { key: "c", title: "Strong analysis, no name", signal: "Allowed ambiguity to benefit you.", effect: "Field becomes adversarial; Taylor moves to a different partner." },
    { key: "d", title: "‘I’ language throughout", signal: "Attached the work to yourself directly.", effect: "Field becomes adversarial; Taylor formally requests separation." },
  ],
  reflection:
    "Think of a moment when ambiguity benefited you and the person who did the work felt the shift. What would naming them — clearly, without diminishing yourself — have cost you, and what would it have built?",
};

/* ============================================================================
   SCENARIO CHAIN 3 — THE STYLE CLASH
   D5 SIGNATURE: roleReversal — participant writes from Avery's chair.
   ========================================================================== */
export const SC3_CONTENT_D5 = {
  id: "SC3",
  title: "The Style Clash",
  commitment: "Write from the other person’s chair, then decide.",
  signatureMechanic: "roleReversal",
  threading: {
    transparent: [
      "Three weeks into a three-month project with Avery. The collaboration has been holding. Then last night, you sent a message you might not send today.",
    ],
    cautious: [
      "Three weeks into a three-month project with Avery. The working space has been functional, not warm. Last night, you sent a message you might not send today.",
    ],
    avoidant: [
      "Three weeks into a three-month project with Avery. The collaboration has felt thin for two weeks. Last night, you sent a message about Avery to a third colleague.",
      "This morning, you opened Avery’s working folder.",
    ],
  },
  intro: [
    "Scenario three. The Style Clash.",
    "You prefer structured planning: milestones, trackers, clear dates. Avery prefers iteration: rough drafts, creative bursts, evolving structure. You think Avery is disorganized. Avery thinks you are rigid.",
    "Last night, you sent a message to a third colleague. That message felt harmless when you sent it.",
    "Today, you open Avery’s working folder and see three strong rough drafts that never appeared in your tracker.",
  ],
  briefing:
    "Three weeks into a three-month project with Avery. You prefer structured planning. Avery prefers iteration. You think Avery is disorganized. Avery thinks you are rigid. Last night, you sent a DM to a third colleague about Avery. This morning, you opened Avery’s working folder and saw three rough drafts — substantive, in progress, never tracked.",
  artifacts: [
    {
      caption: "Your DM thread (last night, 10:22–10:31 PM)",
      title: "DM with a third colleague",
      mono: true,
      lines: [
        "10:22 PM — You",
        "  ‘Is it just me, or is Avery impossible to plan with? I’ve built",
        "   the tracker and their side is blank.’",
        "",
        "10:24 PM — Colleague",
        "  ‘What does Avery say when you ask?’",
        "",
        "10:26 PM — You",
        "  ‘They say “I’m working on it.” That is not a status update.",
        "   That is a stall.’",
        "",
        "10:28 PM — Colleague",
        "  ‘Have you seen their drafts folder?’",
        "",
        "10:31 PM — You",
        "  ‘No. The tracker is empty. That is the data.’",
      ],
    },
    {
      caption: "Avery’s working folder (this morning, 7:14 AM)",
      title: "Folder contents — three weeks of timestamps",
      mono: true,
      lines: [
        "‘Client needs analysis_v1’",
        "  Created Tuesday last week. Rough but insightful.",
        "",
        "‘Competitive landscape_DRAFT’",
        "  Modified Friday. Modified again Sunday at 11:18 PM.",
        "  Strong data points, needs structure.",
        "",
        "‘Recommendation framework — thinking out loud’",
        "  Created this morning at 6:42 AM. Early but creative.",
        "",
        "Avery’s Slack status this morning:",
        "  ‘Heads down. Out at 4.’",
      ],
    },
  ],
  // D5 SIGNATURE: roleReversal — before the decision, the participant writes from Avery's chair.
  roleReversal: {
    label: "Role Reversal Artifact",
    intro: "Before any decision option appears, write two sentences from Avery’s chair.",
    prompt: "If Avery saw your DM, what would they say to a trusted colleague about you? Write two sentences in Avery’s voice. This is private. It is never shared. It will be returned to you later in the module.",
    submitLabel: "Save Avery’s response",
    fieldLabel: "From Avery’s chair",
    minChars: 100,
    privacyNote: "Private. Recorded. Returned to you in Segment G. The platform does not analyse or score this writing.",
  },
  decisionPrompt: "You have written from Avery’s chair. The folder is open in another window. What do you do first?",
  justificationPrompt: "Why this option? Did writing from Avery’s chair change anything?",
  options: [
    { key: "a", label: "“I think I misread your progress because I was looking only at the tracker. Can we align on a way to make your drafts visible without forcing your process into my structure?” (Direct alignment conversation.)" },
    { key: "b", label: "“We need one system. Please update the tracker daily so I know where things stand.” (Tracker enforcement.)" },
    { key: "c", label: "Ask a third colleague how to ‘handle Avery’ before speaking with Avery directly. (Continue side-channeling.)" },
    // AUTHORED — Path D for engine 4-path parity (FM-5 Passive Withdrawer).
    { key: "d", label: "Say nothing to Avery. Stop relying on the tracker for their side. Quietly accept the style clash and stop adjusting. (Disengage.)" },
  ],
  artifactWrite: {
    a: { prompt: "Write the actual message you send to Avery — the words that open the alignment conversation. Acknowledge what you misread.", submit: "Send to Avery" },
    b: { prompt: "Write the message you send to Avery requiring daily tracker updates. The exact words.", submit: "Send to Avery" },
    c: { prompt: "Write the DM you would send to the third colleague asking how to ‘handle Avery.’ The exact words.", submit: "Send to the colleague" },
    d: { prompt: "Write the private note you keep for yourself when you disengage from the tracker disagreement. What you decided, what you risked.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the Path A alignment message.
      { tag: "Defensive", calibrated: false, text: "Saw your folder this morning. Maybe we need to talk about how you’re tracking work.", lands: "Avery hears criticism dressed as a suggestion. The DM you sent last night sits unspoken between you." },
      { tag: "Over-apologetic", calibrated: false, text: "I’m really sorry — I’ve been so unfair to you in my head about the tracker. I had no idea you were doing this much work. I feel terrible.", lands: "The apology becomes the message. Avery now has to manage your guilt before you can manage the working space." },
      { tag: "Calibrated", calibrated: true, text: "Avery — I opened your drafts folder this morning and realised I have been reading the tracker as ‘the data’ when it never represented the half of the work that lives in your drafts. I misread the progress. Can we align on a way to make your drafts visible without forcing your process into my structure?", lands: "Avery hears the misread, the cause, and the ask in one breath. The conversation moves from compliance to a shared rhythm." },
    ],
    b: [
      // AUTHORED — Path B reference set (tracker enforcement).
      { tag: "Defensive", calibrated: false, text: "We need to talk about how you’re using the tracker. It needs to be updated.", lands: "The message lands as authority, not collaboration. Avery complies and stops sharing early." },
      { tag: "Calibrated", calibrated: true, text: "Avery — for the next eight weeks I need to see daily status on the tracker so I can plan around the work. I know your drafts move faster than the tracker; for now I need both.", lands: "Direct, structured, and inflexible by design. Avery knows the shape of what you are asking. Whether they keep volunteering drafts is another question." },
    ],
    d: { card: "Whatever you wrote, you now have a record of what you chose to leave unsaid — and what you chose to stop adjusting." },
    closing: "What changes between these versions: whether Avery hears the misread, hears authority, hears side-channel residue, or hears nothing at all. The folder is the same. The working space is not.",
  },
  consequences: {
    a: {
      sameDay: [
        "Avery relaxes. They admit the tracker feels premature, but agree to add weekly progress markers.",
        "You agree not to treat blank tracker cells as no work.",
      ],
      nextWeek: [
        "The shared rhythm improves. Drafts appear earlier. Tracker updates become lighter but useful.",
      ],
      monthEnd: [
        "The project benefits from both structure and iteration.",
        "The field reopens.",
      ],
      outcome: "Direct alignment. Misread named. Rhythm shared.",
      others: "Avery began sharing drafts earlier; the project gained both structures.",
      interp: "You corrected your own assumption and made room for a different working style.",
      manager: "Avery’s perspective. “The line that mattered was ‘I misread the progress.’ After that line, we could talk about the rhythm instead of about each other.”",
      fieldDelta: "open → open (deepened)",
      traj: "rise",
    },
    b: {
      sameDay: [
        "Avery updates the tracker, but the conversation feels like compliance.",
      ],
      nextWeek: [
        "Avery produces fewer early drafts and waits until work is cleaner before sharing.",
      ],
      monthEnd: [
        "You get more structure and less creativity.",
        "The field becomes transactional.",
      ],
      outcome: "Tracker enforced. Compliance received. Creativity narrowed.",
      others: "Avery shared cleaner drafts, less often, and stopped volunteering early thinking.",
      interp: "You got compliance but narrowed the collaboration.",
      manager: "Avery’s perspective. “The tracker is updated. The collaboration is not what it was. I deliver. I no longer experiment in front of them.”",
      fieldDelta: "open → transactional",
      traj: "drift-down",
    },
    c: {
      sameDay: [
        "The third colleague validates your frustration. It feels good for ten minutes.",
      ],
      nextWeek: [
        "Avery hears indirectly that you have been discussing their working style.",
        "Trust drops.",
      ],
      monthEnd: [
        "Avery collaborates with you only through formal channels.",
        "The field becomes avoidant.",
      ],
      outcome: "Continued triangulation. Avery heard about it. Trust dropped.",
      others: "Avery moved all collaboration through formal channels.",
      interp: "You protected yourself emotionally by triangulating, but damaged the working bond.",
      manager: "Avery’s perspective. “I heard about it from someone else. After that, every conversation with them ran through email so I had a record.”",
      fieldDelta: "open → avoidant",
      traj: "drop",
    },
    d: {
      // AUTHORED — Path D consequence chain (passive withdrawal).
      sameDay: [
        "You close the folder. You stop updating the tracker for Avery’s sections.",
        "Avery notices nothing has changed. You stop reaching out.",
      ],
      nextWeek: [
        "The shared work begins drifting. Avery’s drafts continue to evolve in the folder. Yours sit in the tracker.",
        "The project moves at two speeds with no bridge between them.",
      ],
      monthEnd: [
        "A deliverable lands late because nobody owned the integration of the two halves.",
        "Your manager pulls you aside: ‘What happened between you and Avery? It feels like the project has two captains who don’t talk.’ The field has slid into avoidant without a single conversation.",
      ],
      outcome: "Quiet disengagement. No conversation. Deliverable landed late.",
      others: "Manager noticed the two-captain pattern from the outside.",
      interp: "You disengaged without explaining why. Avery only knew something had changed.",
      manager: "Avery’s perspective. “They stopped talking. I didn’t know if it was me, the tracker, or something else. I stopped asking.”",
      fieldDelta: "open → avoidant",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Direct alignment", signal: "Named the misread. Built a shared rhythm.", effect: "Field deepens; both structures held; project benefits." },
    { key: "b", title: "Tracker enforcement", signal: "Got compliance, narrowed collaboration.", effect: "Field becomes transactional; Avery delivers, no longer experiments openly." },
    { key: "c", title: "Continued triangulation", signal: "Protected yourself emotionally; damaged the bond.", effect: "Field becomes avoidant; Avery moves all collaboration through formal channels." },
    { key: "d", title: "Quiet disengagement", signal: "Stopped adjusting. Stopped explaining.", effect: "Field becomes avoidant; the project drifts at two speeds with no bridge." },
  ],
  reflection:
    "Think of a working-style difference you read as disorganisation. What would opening the folder — literal or figurative — have changed in how you spoke to the other person?",
};

/* ============================================================================
   SCENARIO CHAIN 4 — THE FRACTURE AFTER THE MEETING
   D5 SIGNATURES: thirdObject returns + cross-scenario threading.
   ========================================================================== */
export const SC4_CONTENT_D5 = {
  id: "SC4",
  title: "The Fracture After the Meeting",
  commitment: "Decide whether to defend, build the bridge, or avoid the relational issue.",
  signatureMechanic: "thirdObject + cross_scenario_threading",
  threading: {
    transparent: [
      "People have been bringing concerns to you early. This time, Jordan comes directly to you before the meeting.",
      "Jordan messaged this morning at 7:14 AM: ‘Are we still talking about this in the standup? I want to be ready.’",
    ],
    cautious: [
      "Jordan messages cautiously before the meeting: ‘Do you have a minute to align on today’s discussion?’",
      "Their morning message sits at 7:14 AM. Your read receipt is on. They saw that you saw it.",
    ],
    avoidant: [
      "You hear about Jordan’s concern from someone else.",
      "Jordan’s message at 7:14 AM sits unanswered. They saw your read receipt.",
      "The meeting starts at 10:00. The room is already half-decided.",
    ],
  },
  intro: [
    "Scenario four. The Fracture After the Meeting.",
    "It is 9:38 AM on a Wednesday. At 10:00 AM, the team meets in Boardroom B to decide whether to cut a feature from the release. Six people in the room. Two on Zoom. You believe the feature is unstable and should be removed. Jordan believes removing it will break a promise made to a client.",
    "Both of you are protecting something real. You are protecting product quality. Jordan is protecting client trust.",
    "The meeting is in twenty minutes. The feature is not the only deliverable. The working bond after this decision is also a deliverable.",
  ],
  briefing:
    "At 10:00 AM, the team meets in Boardroom B to decide whether to cut a feature from the release. You believe the feature is unstable and should be removed. Jordan believes removing it will break a promise made to a client. Both are protecting something real. The CTO is in the room. The CTO does not usually attend release calls. The product manager has booked a 4:00 PM ‘post-decision sync.’ Acceptance: tentative. The meeting is in twenty minutes.",
  artifacts: [
    {
      caption: "Client promise — Statement of Work, Section 4.2",
      title: "Client Promise · signed eight weeks ago",
      mono: true,
      lines: [
        "Section 4.2 — Mobile Push Notifications",
        "  ‘Mobile push notifications will be available to end users at",
        "   general availability launch.’",
        "",
        "Signed: eight weeks ago by client and your team lead.",
      ],
    },
    {
      caption: "Engineering note to product (Monday 7:42 AM)",
      title: "Your engineering note",
      mono: true,
      lines: [
        "Subject: Push notification subsystem — recommend pulling from GA",
        "",
        "  Push notification subsystem has a memory leak under load.",
        "  We caught it in staging. Fix window is 2–3 sprints.",
        "  I do not believe we should ship this at GA.",
      ],
    },
    {
      caption: "Jordan’s message to you (this morning, 7:14 AM)",
      title: "Jordan’s message",
      mono: true,
      lines: [
        "Jordan — 7:14 AM",
        "  ‘Are we still talking about this in the standup? I want to be",
        "   ready.’",
        "",
        "You did not reply.",
        "Your read receipt is on. Jordan saw that you saw it.",
      ],
    },
    {
      caption: "The room you are walking into",
      title: "Room context",
      mono: true,
      lines: [
        "Boardroom B. Two Zoom tiles already lit — client success lead",
        "and the head of customer support.",
        "",
        "The CTO is in the room. The CTO does not usually attend release",
        "calls.",
        "",
        "The product manager has booked a 4:00 PM ‘post-decision sync’ on",
        "your shared calendar. Acceptance status: tentative.",
      ],
    },
  ],
  // The Third Object returns in this scenario per the script.
  thirdObjectReturn: {
    intro: "The two figures from SC1 reappear, but the shared object between them is now both the feature and the working space itself. The Third Object is no longer purely the work. It is what the work is doing to the relationship.",
    closing: "Notice which shared object you talk about. The feature is one. The trust between you and Jordan is the other.",
  },
  decisionPrompt: "The meeting starts in twenty minutes. Jordan’s message sits unanswered. The CTO is in the room. What do you do first?",
  justificationPrompt: "Why this option? What are you protecting in the working space between you and Jordan?",
  options: [
    { key: "a", label: "“We cannot ship unstable work. I understand the client issue, but quality has to come first.” (Defend your position strongly.)" },
    { key: "b", label: "“I think we are both protecting trust from different sides. I am protecting trust in the product. You are protecting trust in the promise. Can we name what must be true for either option to be acceptable?” (Use The Alignment Method.)" },
    { key: "c", label: "Focus only on technical facts and avoid naming the tension with Jordan. (Avoid the relational issue.)" },
    // AUTHORED — Path D for engine 4-path parity (FM-4 Triangulator).
    { key: "d", label: "Pull the head of customer support aside before the meeting and pre-align them against Jordan’s position. (Triangulate through a third party.)" },
  ],
  artifactWrite: {
    // D5 SIGNATURE: bridge design — script labels this artifact-write explicitly.
    a: { prompt: "You have decided to defend your position strongly. Write the opening line you say in Boardroom B — the words the room hears first.", submit: "Open the meeting" },
    b: { prompt: "Write a 2–3 sentence bridge proposal that explicitly references each step of The Alignment Method. Hear · Name · Build · Protect. The exact words you would say in the meeting.", submit: "Propose the bridge" },
    c: { prompt: "Write the opening line you say in Boardroom B — the technical-facts framing that avoids the relational issue with Jordan.", submit: "Open the meeting" },
    d: { prompt: "Write the message you send the head of customer support before the meeting — the words that pre-align them with you.", submit: "Send to the head of customer support" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants on the defend-position opening.
      { tag: "Defensive", calibrated: false, text: "We can’t ship this. The memory leak is a real problem.", lands: "The room hears a wall, not an argument. Jordan’s position is not even named." },
      { tag: "Over-apologetic", calibrated: false, text: "I’m sorry to push this, I know it’s sensitive, but I really feel we shouldn’t ship this. I might be wrong but…", lands: "The hedging undercuts the technical case. The CTO has to weigh the engineering signal through your uncertainty." },
      { tag: "Calibrated", calibrated: true, text: "Before we decide — I want to name the trade-off. There is a memory leak in the push subsystem that we found in staging. The fix window is 2–3 sprints. Jordan’s point about the client commitment is real. My recommendation is to pull the feature from GA. I want us to decide what we say to the client today as part of the same decision.", lands: "Direct, structured, and includes Jordan’s concern as part of the decision rather than as the obstacle to it. The CTO can engage both inputs." },
    ],
    b: [
      // AUTHORED — Path B reference set on the bridge-design artifact.
      { tag: "Defensive", calibrated: false, text: "Maybe we can split it — soft launch or something.", lands: "The bridge is hand-waved. The room hears a compromise, not a design." },
      { tag: "Calibrated", calibrated: true, text: "Hear: Jordan is protecting trust in the client promise made eight weeks ago. Name: we are both protecting trust — trust in the product and trust in the promise. Build: remove the feature from general release, offer the client a controlled preview with clear limitations, and a defined GA date once the leak is fixed. Protect: I’ll draft the client message with Jordan today so we send it together.", lands: "The room hears the architecture of the bridge. The CTO can engage the design, not the position. The working bond is named as part of the decision." },
    ],
    d: { card: "Whatever you wrote, you now have a record of how you sought leverage — and what you traded for it." },
    closing: "What changes between these versions: whether Jordan is the shared problem or the obstacle, whether trust is one thing or two, and whether the room leaves the meeting with a decision or with a fracture. The feature is the same. The working bond after is not.",
  },
  consequences: {
    a: {
      sameDay: [
        "Your argument is strong, but Jordan feels reduced to ‘client pressure.’",
        "They stop offering context in the meeting.",
      ],
      nextWeek: [
        "The feature is cut. The decision may be right, but Jordan communicates with you through the product manager.",
      ],
      monthEnd: [
        "You are known as technically sound but difficult to influence once your position is set.",
        "The field is guarded or adversarial depending on prior state.",
      ],
      outcome: "Position defended. Feature cut. Jordan routed communication through the PM.",
      others: "Jordan stopped offering context in meetings; communicated through the PM.",
      interp: "You protected quality but risked making Jordan’s concern feel illegitimate.",
      manager: "Jordan’s perspective. “The decision was right. The handling was not. I had to find another way to be in the room with them.”",
      fieldDelta: "→ guarded or adversarial",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "Jordan slows down. The room now sees the Third Object: trust.",
        "The team designs a bridge — remove the feature from general release, offer the client a controlled preview with clear limitations.",
      ],
      nextWeek: [
        "Jordan brings you into a client-risk conversation earlier than required.",
      ],
      monthEnd: [
        "The team uses the phrase ‘protecting trust from different sides’ in another decision.",
        "The field is open.",
      ],
      outcome: "Full Alignment Method. Bridge designed. Working bond protected.",
      others: "Jordan brought you in earlier; the phrase entered team vocabulary.",
      interp: "You made the shared interest visible and created a bridge that both sides could carry.",
      manager: "Jordan’s perspective. “The decision was the same as if they had pushed hard. But I left the room as a collaborator instead of as the obstacle. That changed what I’ll bring them next time.”",
      fieldDelta: "→ open (restored or deepened)",
      traj: "rise",
    },
    c: {
      sameDay: [
        "The technical facts carry the decision, but the relational tension remains unnamed.",
      ],
      nextWeek: [
        "Jordan is polite but distant. They support the decision in public and question it in side conversations.",
      ],
      monthEnd: [
        "Future disagreements become slower because people are unsure whether tension can be named with you.",
        "The field becomes transactional or avoidant.",
      ],
      outcome: "Technical facts only. Relational tension unnamed.",
      others: "Jordan polite in public, questioning in side conversations.",
      interp: "You solved the task but left the working bond to absorb the tension alone.",
      manager: "Jordan’s perspective. “They did not argue. They did not complain. They simply stopped bringing me the early version of their thinking.”",
      fieldDelta: "→ transactional or avoidant",
      traj: "drift-down",
    },
    d: {
      // AUTHORED — Path D consequence chain (FM-4 Triangulator).
      sameDay: [
        "The head of customer support is wary but listens. They do not commit, but the room enters the meeting with the framing already tilted.",
        "Jordan walks in and reads the temperature in the first sixty seconds.",
      ],
      nextWeek: [
        "Jordan hears, through a third party, that you pre-aligned the customer-support lead before the meeting.",
        "The CTO learns about it the following Monday.",
      ],
      monthEnd: [
        "Trust collapses faster than the technical disagreement could have collapsed it.",
        "The CTO reorganises the next release decision so that pre-meeting alignment runs through them, not through you. The field is adversarial.",
      ],
      outcome: "Triangulated through a third party. CTO reorganised future decisions to route around you.",
      others: "CTO restructured pre-meeting alignment to bypass you.",
      interp: "You sought leverage. The room learned that disagreement with you would be moved into side channels.",
      manager: "Jordan’s perspective. “The technical case might have won the meeting. The pre-alignment lost the next twelve. After that, I treated every conversation with them as something to put in writing first.”",
      fieldDelta: "→ adversarial",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Defend the position", signal: "Held quality. Made Jordan the obstacle.", effect: "Field shifts toward guarded or adversarial; Jordan communicates through the PM." },
    { key: "b", title: "Full Alignment Method", signal: "Made the shared interest visible; designed a bridge.", effect: "Field opens or deepens; Jordan brings you in earlier on the next risk." },
    { key: "c", title: "Avoid the relational issue", signal: "Solved the task; left the bond to absorb the tension.", effect: "Field becomes transactional or avoidant; Jordan stops bringing early thinking." },
    { key: "d", title: "Triangulate via a third party", signal: "Sought leverage outside the room.", effect: "Field becomes adversarial; CTO restructures decision channels to bypass you." },
  ],
  reflection:
    "Think of a meeting where you protected your position and lost the relationship anyway. Which of the four moves — Hear, Name, Build, Protect — would have changed the room the most? What would it have cost you to use it?",
};
