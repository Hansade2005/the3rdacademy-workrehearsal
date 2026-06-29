/* ============================================================================
   D8 CONTENT LAYER — Resilience & Recovery
   Production reference v1.2 FINAL (May 2026). Mirrors the D3 schema shape so
   the engine renders D8 unchanged. Verbatim copy is pulled from
   scripts/D8_Production_Build_Reference_v0.md. Where the script declares
   3 decision paths and the engine expects 4, a Path D is added and FLAGGED
   with an AUTHORED comment in the script's observational register.
   ========================================================================== */

export const D8_CONTENT = {
  module: {
    id: "D8",
    title: "Resilience and Recovery",
    tier: "Foundational",
    sector_variants: ["Corporate / Health & Professional Services"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Corporate / Health & Professional Services workplace context (Northland Health). The same context applies across all four scenarios.",
      pickerHint: "The context you choose here applies across all four scenarios.",
    },
  },
  dimension: {
    id: "D8",
    name: "Resilience & Recovery",
    central_question: "When pressure hits you, does your recovery restore trust — or create new damage?",
    framework: { label: "The Recovery Method", body: "Name · Stabilise · Re-enter · Restore" },
  },
  threading_state_model: "recovery_pattern_state",
  prior_module_references: ["D5"],

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    coldOpen: {
      d5Callback: {
        wrapperLead: "Last time, you wrote this about reopening the working space after disagreement…",
        sentenceSlot: "{{prior.D5.final_personal_sentence}}",
        wrapperTail: "",
        // AUTHORED — MVP fallback per CLAUDE_PROGRESS_MEMORY (script says skip silently
        // when D5 memory is absent; for MVP we render a fallback to keep Beat 1 alive).
        // TODO(cross-module-memory)
        fallback: "This module can stand alone, but it connects more deeply after D5. We are going to ask you to live a moment now — a moment where your recovery matters.",
      },
      // Beat 2 — setup narration verbatim from Screen A-1.
      narration: [
        "Yesterday afternoon, you led the Q3 client update for Northland Health. At 2:42 PM you said the implementation date was October 14. The correct date was November 14. Your manager corrected it gently, in the room. The meeting moved on. No one made a scene. But everyone saw it.",
        "You stayed late. You fixed the deck. You sent the corrected version at 11:47 PM. You went home, did not sleep well, and arrived this morning at 7:51 AM. Sixteen minutes ago.",
        "It is now 8:07 AM.",
        "Maya has just messaged: “Can you lead the 10 AM update? You know the numbers best.”",
        "Four options. Each one is real. Choose the one closest to what you would actually do.",
      ],
      options: [
        { key: "a", label: "“Sure. I’ve got it.”" },
        { key: "b", label: "“I can lead the numbers section, but I need 20 minutes to recheck the revised figures before I own the full update.”" },
        { key: "c", label: "“Can someone else take it? I’m buried.”" },
        { key: "d", label: "“Honestly, yesterday threw me off and I’m not sure people trust me now.”" },
      ],
      justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
      sameDay: {
        a: [
          "Maya replies “Great — thanks.” The 10 AM meeting moves forward.",
          "But the same number you were embarrassed about yesterday is now sitting on your slide again, unchecked.",
        ],
        b: [
          "Maya replies “That works. I’ll cover the opening. You take the numbers after you recheck.”",
          "The work adjusts without losing trust.",
        ],
        c: [
          "Maya replies “Okay, I’ll ask Jordan.” The update is covered.",
          "But Maya becomes careful about assigning you visible pieces.",
        ],
        d: [
          "Maya replies kindly “I get it. Maybe sit this one out.”",
          "She is sympathetic. She is also now less certain about what you can own.",
        ],
      },
    },
    // Safety floor per Screen A-3.
    safetyFloor: {
      card: [
        "THIS IS REHEARSAL, NOT EVALUATION.",
        "Nothing you do here is shared, scored, or sent to your employer.",
        "D8 is not a wellness course. It is a workplace behaviour rehearsal. D8 does not diagnose, label, or flag any mental health state.",
        "A private rehearsal space where you practise recovery behaviour after workplace pressure. You choose what to do with what you learn here.",
        "The platform does not validate, certify, score, endorse, diagnose, or flag anything about you.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    intro: [
      "Before we go further, a quick read.",
      "What you are about to see is not a rulebook. It is a field guide — a description of what resilience looks like as workplace recovery behaviour, and how it quietly breaks down when no one says anything.",
      "The scenarios you will face later are built on what is in this guide. Read it carefully.",
    ],
    fieldGuide: {
      meaning: {
        title: "WHAT RESILIENCE MEANS AT WORK",
        body: [
          "Resilience at work is the behaviour pattern that appears after pressure, setback, overload, embarrassment, or disruption.",
          // AUTHORED — meaning expansion matched to D3 schema parity; observational register.
          "You name impact without drama or denial. You stabilise immediate risk before taking on more. You ask for adjustment without abandoning ownership. You return with realistic next steps. You repair confidence through follow-through. You learn without self-punishment or image-protection.",
          "Resilience is not whether pressure touches you. It will. D8 is about what your recovery makes possible for the people who still have to work with you.",
        ],
      },
      present: {
        title: "WHAT RECOVERY LOOKS LIKE UNDER WORKPLACE PRESSURE",
        intro: "The eight behaviours that show recovery is present:",
        items: [
          { h: "You name what changed.", t: "State the pressure impact without drama or denial." },
          { h: "You identify what still needs checking.", t: "Locate the area still affected." },
          { h: "You narrow scope before quality drops.", t: "Protect the work before taking on more." },
          { h: "You ask for adjustment with a plan.", t: "Request support while still owning a next step." },
          { h: "You return to the work with a clear next step.", t: "Re-enter with scope, timing, and clarity." },
          { h: "You close the loop when trust has been affected.", t: "Return to confirm what was stabilised and what holds." },
          { h: "You avoid making others guess your capacity.", t: "Recovery is observed by others — name it." },
          { h: "You rebuild through follow-through, not reassurance.", t: "Trust returns through pattern, not explanation." },
        ],
      },
      breakdown: {
        title: "HOW RECOVERY BREAKS DOWN",
        intro: "The seven behaviours that show recovery is breaking down:",
        items: [
          { h: "You say “I’m fine” while behaviour quietly degrades.", t: "Over-assurance without adjustment." },
          { h: "You take on more to prove you are okay.", t: "Silent overloading masks the hit." },
          { h: "You disappear after embarrassment.", t: "Withdrawal without explanation." },
          { h: "You explain the pressure without stabilising the work.", t: "Emotional transfer without a plan." },
          { h: "You become sharper, slower, or more avoidant.", t: "Defensive normal — leakage into tone and pace." },
          { h: "You make others carry your uncertainty.", t: "The burden shifts sideways." },
          { h: "You ask for support without owning a next step.", t: "Support without ownership becomes drift." },
        ],
      },
      end: {
        title: "THE COST EQUATION",
        body: [
          "Unstable recovery becomes hidden coordination cost.",
          "What unstable recovery costs: more checking. Delayed assignments. Reduced visible responsibility. People routing work around you. Teammates carrying uncertainty. Managers watching closer. Trust returning slower.",
          "People may understand the pressure. They still need to know whether your recovery is safe to work with.",
          // AUTHORED — Foundational/Intermediate boundary paragraph; observational register.
          "The Foundational tier holds D8 to small-window recovery — what your behaviour does in the hours and days after a visible setback. Intermediate-tier work covers recovery under repeated hits and contested trust over longer arcs.",
        ],
      },
    },
    reflectionPrompt: "Now let me show you the three patterns underneath what you just felt.",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    c1: {
      title: "C1 — Recovery Is a Pattern, Not a Mood",
      narration: [
        "Most people wait to return well until they feel steady. Work rarely waits that long. The question is not whether you feel fully recovered. The question is whether your next behaviour protects the work and the people relying on it.",
        "You do not have to feel fully recovered to behave constructively.",
        "There is a difference between mood recovery and behavioural recovery. Mood recovery is private — what you feel. Behavioural recovery is observable — what others can plan around.",
        "Four small signals separate the two:",
      ],
      signals: [
        { n: "i", h: "Mood: “I feel better.”", t: "Behavioural: “Here is what I can safely own now.”" },
        { n: "ii", h: "Mood: private state.", t: "Behavioural: observable pattern." },
        { n: "iii", h: "Mood: may fluctuate.", t: "Behavioural: can still be managed responsibly." },
        { n: "iv", h: "Mood: hard for others to plan around.", t: "Behavioural: gives others working clarity." },
      ],
      close: "At work, recovery is not only what you feel. It is what others can safely plan around while you recover.",
      // AUTHORED — C1 reflection prompt for engine parity (script does not specify).
      prompt: "Think of someone whose recovery after a workplace setback you trusted. What signal did they give that others didn’t?",
    },
    c2: {
      title: "C2 — Masking Is Not Stability",
      narration: [
        "Saying “I’m fine” can become one of the riskiest sentences at work — when it hides degraded capacity.",
        "Masking looks strong at first. It reassures people quickly. But if the work starts leaking — late replies, sharper tone, missed detail, avoidant check-ins — the recovery becomes harder to trust than the original hit.",
        "The people working around you are not asking whether you were hit. They are reading whether your recovery is something they can plan with.",
      ],
      equation: {
        title: "MASKING VS STABILISING",
        rows: [
          { k: "Masking", v: "“I’ve got it” with no adjustment." },
          { k: "Stabilising", v: "“I can own X after I recheck Y.”" },
          { k: "Masking", v: "Takes more to prove strength." },
          { k: "Stabilising", v: "Narrows scope to protect quality." },
          { k: "Masking", v: "Hides impact." },
          { k: "Stabilising", v: "Names impact without drama." },
          { k: "Masking", v: "Looks strong early." },
          { k: "Stabilising", v: "Creates trust later." },
        ],
        footer: "Masking protects your image first. Stabilising protects the work first.",
      },
      delayed: [
        "Masking is a workplace-behavioural concept here, not a clinical one. The construct is image protection while work capacity leaks. That is the entire definition.",
        "Later in this module, after Scenario 3, you will see a private rehearsal mirror called the Masking Detector. It uses five workplace-behavioural labels. It is not diagnosis. It is recognition.",
      ],
      closing: [
        "Watch where the cost lands — not in the hit, but in the recovery.",
      ],
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question.",
        echo: "When pressure hits you, does your recovery restore trust — or create new damage?",
        closing: "Now you know the tension this module is built on. The hit is unremarkable. The recovery pattern under varying pressure — that is the entire dimension.",
      },
      // AUTHORED — C2 four-option recognition prompt for engine parity.
      prompt: "When pressure has hit you at work, which masking move is most likely to show up first?",
      options: [
        { key: "a", label: "Over-assuring — “I’ve got it” without evidence or adjustment." },
        { key: "b", label: "Silent carrying — taking on more while capacity is already affected." },
        { key: "c", label: "Defensive normal — acting normal while becoming sharper, slower, or avoidant." },
        { key: "d", label: "Controlled disclosure — naming impact clearly without transferring emotional burden." },
      ],
      justificationPrompt: "Why this one? What does this masking move protect, and what does it cost?",
    },
    c3: {
      title: "C3 — The Recovery Method",
      open:
        "You have already felt the pressure. Yesterday’s mistake, this morning’s message. Now we name the method.",
      framework: "The Recovery Method",
      steps: [
        { name: "Name.", body: "Name the pressure impact without drama or denial. Say what changed." },
        { name: "Stabilise.", body: "Contain immediate risk. Protect the work before taking on more." },
        { name: "Re-enter.", body: "Return to the work with a realistic next step. Scope. Timing. Clarity." },
        { name: "Restore.", body: "Rebuild trust through follow-through, not explanation." },
      ],
      close: [
        "This method is not about looking strong. It is about making your recovery workable for the people depending on you.",
        "Trust does not return because you explain. It returns because your next pattern becomes safe again.",
      ],
      // AUTHORED — C3 reflection prompt for engine parity.
      prompt: "Which of the four steps — Name, Stabilise, Re-enter, Restore — comes least naturally to you under workplace pressure? One sentence.",
    },
    complete: {
      label: "Transition to Segment D · 15s",
      narration: [
        "Now I want you to meet someone who tried to recover by proving the mistake did not shake her.",
        "A workplace story, told the same week, with one decision pause and one retrospective looking back.",
        "Put your headphones on if you have them.",
      ],
      scopeBoundaries: {
        title: "Scope Boundaries — Foundational Tier and What the Intermediate Tier Adds",
        paragraphs: [
          // AUTHORED — D8-specific Foundational/Intermediate framing in the script's register.
          "This behavioural Dimension [D8], Resilience & Recovery — Foundational, is deliberately bounded. It rehearses recovery as the behaviour pattern that appears after a single visible workplace setback.",
          "The scenarios are designed so the standard is knowable. The difficulty lives in whether you honour the standard when you are tired, embarrassed, or trying to prove the hit did nothing.",
          "This boundary is intentional, and it follows the WorkRehearsal doctrine. Behaviour that can be observed and rehearsed must have a knowable standard. Teaching coping theory or stress-management frameworks is content delivery, not behavioural rehearsal. That is precisely the territory D8 is designed not to occupy.",
          "D8 explicitly is not a wellness course, a clinical screen, a mental-health tool, or a toughness drill. The five locked Masking Detector labels in SC3 are workplace-behavioural recognition, not diagnosis.",
          "What the Foundational tier does not cover is recovery under repeated hits, contested trust over long arcs, or recovery while the original team has already routed work around you.",
          "That variability belongs in the Intermediate tier.",
          "Where the Foundational tier asks, “Does your recovery restore trust or create new damage?”, the Intermediate tier asks, “How do you rebuild a working pattern after trust has already shifted away?”",
          "The Foundational tier is the floor the Intermediate tier builds on. You cannot rehearse contested recovery until the first recovery pattern is already a pattern.",
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
        // AUTHORED — standard pause invitation in D8 register.
        "You have covered the first part of the rehearsal. We encourage you to take a break here so what you have practised can settle.",
        "Our intent is not to have you complete this module — it is to have you carry it with you.",
        "Take your time. Your progress is saved.",
      ],
      continueLabel: "Continue now",
      returnLaterLabel: "Return later",
    },
  },

  /* ---------------- SEGMENT D — AUDIO CASE -------------- */
  segmentD: {
    title: "The Person Who Came Back Too Fast",
    intro: [
      "Nina gave the wrong implementation date in yesterday’s steering meeting. Her manager corrected it gently. The meeting moved on. No one blamed her. But Nina felt the room change. That night she stayed late, fixed the deck, and told herself: tomorrow I will prove I am fine.",
      "Same week. Two perspectives. One recovery pattern.",
    ],
    part1: {
      heading: "Week One — Nina’s Internal Experience",
      narration: [
        "I just needed to show I could still carry things. If I stepped back, people would think the mistake shook me. So when requests came in, I said yes. Client note? Yes. Revised deck? Yes. Follow-up tracker? Yes.",
        "I was not pretending. I was recovering.",
        "By Wednesday I was tired. By Thursday I was sharper than I meant to be in a Slack thread — I noticed, but I told myself it was a busy week. By Friday I missed a check-in. I told myself I would catch up over the weekend.",
        "I thought what I was doing looked like strength. I thought saying yes was the way back.",
      ],
    },
    // D8 dual-narration — Manager's External Observation (Beat D-3).
    part1b: {
      heading: "Week One — Manager’s External Observation",
      narration: [
        "Nina came in early on Tuesday. That looked good. She said she had everything under control. That also looked good. By Wednesday her replies were shorter. By Thursday one number in the client note was corrected twice — the same area where she’d had the error in steering.",
        "By Friday she skipped a check-in and sent the tracker late.",
        "I was not worried about the original mistake anymore. That was a clean error and a clean correction. I was worried that she was trying to recover alone, and the work was starting to leak.",
        "I was not going to bring it up. But I noticed I had started checking her drafts before they went out. I had not done that before.",
      ],
    },
    // The Gap — Beat D-4.
    gap: {
      heading: "The Gap",
      narration: [
        "Nina thought she was proving strength. Her manager was seeing uncertainty. Nina was trying to protect her image. The work needed her to stabilise risk.",
      ],
      contrast: [
        { k: "“I was recovering.”", v: "“She was masking.”" },
        { k: "“Saying yes was strength.”", v: "“Saying yes hid the area still affected.”" },
        { k: "“I would catch up over the weekend.”", v: "“I started checking her drafts.”" },
      ],
      tagline: "The mistake did not break trust. The recovery pattern did.",
    },
    pause1: {
      prompt:
        "It is Wednesday morning. Nina has already said yes to three things. The client note is due at noon. She knows she has not rechecked the revised dates. What should she say now?",
      options: [
        { key: "a", label: "“I’ve got it. I’ll send it before noon.” (Over-assure.)" },
        { key: "b", label: "“I can send the client note by noon, but I need 20 minutes to recheck the revised dates before I send. Yesterday’s error was in that area, and I don’t want to repeat it.” (Stabilise.)" },
        { key: "c", label: "“I’m honestly overwhelmed. I don’t know if I should be handling this right now.” (Emotional transfer without plan.)" },
        // AUTHORED — Path D for engine 4-path parity (Disappearer FM-3).
        { key: "d", label: "Say nothing. Stay quiet through the morning. Send the client note at 11:58 with no acknowledgement of the recheck or the area still affected. (Disappear.)" },
      ],
      justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
    },
    part2: {
      heading: "Week One — One-Week Consequence",
      narration: [
        "One week later, the manager is not asking whether Nina is competent. That question was already answered long ago. The manager is asking a different question:",
        "When Nina is hit, does she stabilise early enough for others to trust the next step?",
      ],
    },
    // Minimal pause2 to satisfy engine; D8 has only one decision pause + retrospective.
    pause2: {
      // AUTHORED — minimal pass-through structure. D8 script has one decision pause
      // (D-5, mapped to pause1) and the Retrospective (D-8, mapped to retrospective).
      // The engine's pause2 slot is kept structurally so the renderer does not crash.
      prompt: "Hold the question for a beat: when Nina is hit, does she stabilise early enough for others to trust the next step?",
      writePrompt: "If you want, jot one private observation about what you are noticing in Nina’s pattern right now. You may also skip and continue.",
      submitLabel: "Continue",
      minChars: 0,
      options: [],
    },
    // D8 INNOVATION — Recovery Retrospective (Beat D-8).
    retrospective: {
      heading: "Decision Pause — Recovery Retrospective [D8 INNOVATION]",
      narration: [
        "Go back to the morning after Nina’s first mistake.",
        "Before the second request arrived, what should she have said or done differently?",
      ],
      writePrompt:
        "Go back to the morning after Nina’s first mistake. Before the second request arrived, what should she have said or done differently?",
      submitLabel: "Save to Growth Log",
      minChars: 60,
    },
    part3: {
      heading: "Debrief Through The Recovery Method",
      narration: [
        "Here is what The Recovery Method would have looked like inside Nina’s week.",
        "Name. Nina did not name where the mistake affected her confidence and checking needs.",
        "Stabilise. She took on more before containing the risk area.",
        "Re-enter. She returned too broadly instead of returning with scope.",
        "Restore. She tried to restore trust through effort, not follow-through clarity.",
        "Four steps of one method, four places where the recovery quietly slipped, one week of erosion.",
      ],
    },
    close: {
      card: [
        "The setback is not the full story.",
        "The recovery pattern is.",
      ],
    },
    complete: {
      label: "Transition to Segment E · 20s",
      narration: [
        // AUTHORED — standard transition in D8 register.
        "You have read the field guide. You have heard one week unfold from two sides and made decisions inside it — including one with hindsight.",
        "Next, you are inside the situation yourself. Four scenarios. Four decisions. Four consequence chains across same day, next week, and month end.",
        "Trust your judgment. Make the call. See what your recovery makes possible — or harder.",
      ],
      continueLabel: "Continue",
    },
    breakPoint2: {
      label: "Pause invitation · Break Point 2 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 2",
      subtitle: "After Segment D",
      elapsedLabel: "Elapsed: ~36 minutes",
      remainingLabel: "Remaining: ~53 minutes",
      avatarScript: [
        // AUTHORED — standard pause invitation in D8 register.
        "You have just heard a recovery pattern form across one week from two sides and made decisions inside it. Let what you have practised so far settle.",
        "The Scenario Lab ahead will ask more of you — and you are more ready for it than you think.",
        "Step away if you need to. Reflect. Come back when you are ready.",
      ],
      continueLabel: "Enter the Scenario Lab",
      returnLaterLabel: "Return later",
    },
  },

  /* ------------------ SEGMENT F — MICRO-DRILLS (consolidation) ------------- */
  segmentF: {
    intro: "Two short consolidation exercises. The Field Guide language. The Scenario Lab pattern. Now: rapid recognition of Name and Re-enter.",
    f1: {
      title: "F1 — Name Without Collapsing",
      audioIntro:
        "You made a visible mistake yesterday. A teammate asks if you can own a related task today. Write one sentence that names impact without collapsing or over-explaining. Forty to one hundred and sixty characters. Type or speak. We are not rating; we are rehearsing the muscle.",
      header: "Five recovery moments. Recognise which response names impact while keeping ownership.",
      onScreenHeader: {
        title: "NAME WITHOUT COLLAPSING",
        lines: [
          "You will see five recovery moments.",
          "For each one, choose the response that names impact without transferring burden.",
        ],
        cta: "Tap to begin.",
      },
      // AUTHORED — F1 options reframed as recognition for engine parity with D3's F1.
      options: [
        "Naming with ownership",
        "Over-assurance",
        "Emotional transfer",
        "Defensive normalising",
      ],
      // AUTHORED — five vignettes in the D8 register; feedback quotes the Name step.
      items: [
        { vignette: "Teammate Priya: “Can you take the client follow-up brief? You owned this account last quarter.”", answer: "Naming with ownership", feedback: "Name. A clean naming move keeps the work yours — for example, “I can own the brief after I recheck the implementation dates — give me 20 minutes and I’ll send the outline by 10:30.” Naming impact is not the same as transferring burden." },
        { vignette: "Manager forwards a re-prioritisation request the same week as a visible miss.", answer: "Naming with ownership", feedback: "Name. The calibrated move says what is affected and what holds — “I can take this with a 15-minute check window on figures before it goes out.” That is naming, not collapsing." },
        { vignette: "A peer DMs after a hard meeting: “Want me to step in?”", answer: "Naming with ownership", feedback: "Name. “Thanks — I’ve got the next step, but I want a quick second pair of eyes on the numbers section before I send.” You named the area still affected; you kept ownership." },
        { vignette: "Your manager asks: “How are you doing after Monday?”", answer: "Naming with ownership", feedback: "Name. “Monday affected my checking confidence on figures. I’ve added a recheck step. I can own the client update this week.” That is naming with a plan." },
        { vignette: "A junior teammate apologises for asking you something on a heavy day.", answer: "Naming with ownership", feedback: "Name. “No apology needed — I’ll come back to this by 3 PM with a clear answer.” You named the timing without performing strength or distress." },
      ],
      closeCard: "You have rehearsed five Name moves. Naming impact is not the same as transferring burden. A clean name keeps the work yours.",
    },
    f2: {
      title: "F2 — Re-enter With Scope",
      audioIntro:
        "You are returning after a hard week. Write a re-entry sentence that states what you can own now, what you need adjusted, and when you will close the loop. Eighty to two hundred and twenty characters. Type or speak.",
      header: "Three recovery moments. Recognise the re-entry move that carries scope, adjustment, and a close-the-loop.",
      onScreenHeader: {
        title: "RE-ENTER WITH SCOPE",
        lines: [
          "Four re-entry shapes:",
        ],
        showOptionsRow: true,
        cta: "Tap to begin.",
      },
      options: ["Stable re-entry with scope", "Over-assurance", "Avoidance without re-entry", "Apology without plan"],
      // AUTHORED — three vignettes in the D8 register; feedback quotes the Re-enter step.
      items: [
        { vignette: "Manager opens the 1:1 with “What feels safe for you to own this week?”", answer: "Stable re-entry with scope", feedback: "Re-enter. The calibrated shape names own-now, adjustment, and close-the-loop — “I can own the client numbers section by 10:30. I need Maya to hold the narrative update while I recheck the table. I’ll close the loop by Thursday.”" },
        { vignette: "Returning Monday after a hard week, a colleague asks if you’re back on the deck.", answer: "Stable re-entry with scope", feedback: "Re-enter. “I’m taking the figures section today; can someone hold the narrative section until Wednesday? I’ll confirm by EOD.” Scope, adjustment, timeline." },
        { vignette: "Your manager asks if you can pick the project back up.", answer: "Stable re-entry with scope", feedback: "Re-enter. “Yes — I can own next week’s update with a 15-minute review window on figures, and I’ll close the loop with you by Thursday.” Returning is a behaviour. Recovering is a pattern." },
      ],
      closeCard: "Re-enter with scope. Restore through follow-through.",
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
    closingReflection: {
      prompt: "What did you notice about your default after pressure — over-assure, mask, withdraw, explain, or stabilise?",
    },
  },

  /* ---------------- SEGMENT G — RECOGNITION + AWE CLOSE -------------------- */
  segmentG: {
    breakPoint4: {
      label: "Pause invitation · Break Point 4 · 10s",
      title: "PAUSE INVITATION · BREAK POINT 4",
      subtitle: "Optional, after Segment F",
      elapsedLabel: "Elapsed: ~84 minutes",
      remainingLabel: "Remaining: ~5 minutes",
      avatarScript: [
        "You are at the closing. It is a few minutes long. You can take a break here, or step into it now. Your choice.",
      ],
      continueLabel: "Step into the closing",
      returnLaterLabel: "Take a short break",
    },
    recognitionLabel: "Recognition narration · 60s",
    recognition: [
      "You did not practise feeling strong. You practised returning while pressure was still present.",
      "You saw what happens when recovery protects the work. You saw what happens when recovery becomes new uncertainty.",
      "What you are carrying out of this module is not a rating. It is not a credential. It is not a checklist. It is a sharper sense of what your recovery pattern looks like to the people working around you.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "You saw what happens when recovery protects the work.",
        "You saw what happens when recovery becomes new uncertainty.",
      ],
    },
    // AUTHORED — cold-open callbacks per path, anchored to 8:07 AM / yesterday / Maya.
    callback: {
      a: "You opened this module at 8:07 with “Sure. I’ve got it.” Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 8:07 by naming the recheck before owning the full update. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 8:07 by asking someone else to take it. Hold that first instinct beside the choices that followed.",
      d: "You opened this module at 8:07 by telling Maya yesterday had shaken you. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      label: "Framework Return · 25s",
      durationSeconds: 25,
      lead: "Before you go to your Growth Log, one quiet recall.",
      // AUTHORED — short body in the D8 register.
      body: "You moved through four scenarios. Different pressure hits. Different recoveries. But the same four steps.",
      steps: ["Name.", "Stabilise.", "Re-enter.", "Restore."],
      tagline: "The Recovery Method. The method is simple. The pressure is not.",
      // AUTHORED — carry-forward line.
      carryForward: "You used it across four moments today. You will use it the next time pressure lands.",
    },
    delayedRetentionCheck: {
      label: "Retention check setup · 45s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In three to seven days, one of these recovery moments will come back to you.",
        "You will see what you wrote. You will answer one question.",
        "Is this still how I would return after pressure?",
        "A second look at one moment. That is all.",
      ],
      details: [
        { k: "Appears", v: "3 to 7 days from now (notification sent)" },
        { k: "Format", v: "1 recovery moment revisited, with your prior response surfaced" },
        { k: "Response", v: "Single sentence + optional revision" },
        { k: "Attempts", v: "1 available" },
        { k: "Cooldown", v: "48 hours if you defer the prompt" },
        { k: "Window", v: "72 hours from notification" },
      ],
      doctrinalNote: [
        "This is not a pass / fail check. It is a re-rehearsal — a second look at one moment after time has passed.",
        "Both responses are kept in your Growth Log without ranking.",
      ],
      continueLabel: "Got it — continue",
      questionsPerAttempt: 1,
      attemptsMax: 1,
      cooldownHours: 48,
      windowHours: 72,
      notificationWindowHours: [72, 168],
    },
    bookendQuestion:
      "When pressure hits you, does your recovery restore trust — or create new damage?",
    finalPrompt:
      "Write one sentence you can use at work when you need to return after pressure without pretending nothing changed.",
  },
};

/* ============================================================================
   SCENARIO CHAIN 1 — THE MORNING AFTER
   ========================================================================== */
export const SC1_CONTENT_D8 = {
  id: "SC1",
  title: "The Morning After",
  commitment: "Decide whether to take the visible role again the morning after a visible mistake, or name what still needs steadying.",
  // SC1 has no threading per script. Single generic intro across all three keys.
  threading: {
    transparent: [
      "It is 8:47 AM, forty minutes after Maya’s message. The 10 AM update is in 73 minutes. The revised Northland Health deck is in your shared drive, sent at 11:47 PM last night. You have not opened it again this morning.",
      "Maya has not pinged again. She is waiting.",
    ],
    cautious: [
      "It is 8:47 AM, forty minutes after Maya’s message. The 10 AM update is in 73 minutes. The revised Northland Health deck is in your shared drive, sent at 11:47 PM last night. You have not opened it again this morning.",
      "Maya has not pinged again. She is waiting.",
    ],
    avoidant: [
      "It is 8:47 AM, forty minutes after Maya’s message. The 10 AM update is in 73 minutes. The revised Northland Health deck is in your shared drive, sent at 11:47 PM last night. You have not opened it again this morning.",
      "Maya has not pinged again. She is waiting.",
    ],
  },
  callback: [
    "You have been here before.",
    "At the start of this module, you saw a 30-second moment the morning after yesterday’s mistake. Now you return to that same morning with the full consequence chain — same day, next week, month end.",
    "You may choose the same instinct again, or choose differently. Notice whether your reasoning has changed.",
  ],
  intro: [
    "Scenario one. The Morning After.",
    "A visible mistake happened yesterday. A teammate asks you to take a visible role again today. What you do with that ask defines the first row of your recovery pattern.",
  ],
  briefing:
    "It is 8:47 AM. Forty minutes after Maya’s message. The 10 AM update is in 73 minutes. The revised Northland Health deck is in your shared drive, sent at 11:47 PM last night. You have not opened it again this morning. Maya has not pinged again. She is waiting. The texture is the silence between 8:07 and 8:47. The deck is sitting unopened. You have not yet decided what your recovery move is.",
  artifacts: [
    {
      caption: "Maya’s original message (8:07 AM)",
      title: "Slack · DM with Maya",
      mono: true,
      lines: [
        "Maya — 8:07 AM",
        "“Can you lead the 10 AM update? You know the numbers best.”",
        "",
        "(no further messages — Maya is waiting)",
      ],
    },
    {
      caption: "Your private state (visible to you only)",
      title: "Your morning so far",
      mono: true,
      lines: [
        "· Open browser tabs: revised deck, manager’s correction email (“All good — thanks for the fix”),",
        "  your inbox.",
        "· You have not had breakfast.",
        "· You skimmed the deck once at 12:14 AM. You have not rechecked it since.",
      ],
    },
    {
      caption: "Maya’s calendar",
      title: "Calendar — this morning",
      mono: true,
      lines: [
        "10:00–10:30 AM   Northland Health weekly update (8 attendees)",
        "10:30–10:45 AM   buffer / questions",
        "11:00 AM         Maya is in a different client call",
      ],
    },
  ],
  decisionPrompt: "Seventy-three minutes. Deck unopened since midnight. Maya waiting. What do you do?",
  options: [
    { key: "a", label: "“Sure. I’ve got it.” (Over-assure.)" },
    { key: "b", label: "“I can lead the numbers section, but I need 20 minutes to recheck the revised figures before I own the full update.” (Name and stabilise.)" },
    { key: "c", label: "“Can someone else take it? I’m buried.” (Avoid.)" },
    // AUTHORED — Path D for engine 4-path parity.
    { key: "d", label: "Send a long emotional reply naming yesterday’s embarrassment and asking Maya what she thinks you should do. (Emotional transfer.)" },
  ],
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  artifactWrite: {
    a: { prompt: "You have decided to over-assure. Write the actual reply you would send Maya — the words that send it across.", submit: "Send to Maya" },
    b: { prompt: "You have decided to name and stabilise. Write the actual reply you would send Maya — the words that send it across.", submit: "Send to Maya" },
    c: { prompt: "You have decided to ask someone else to take it. Write the actual reply you would send Maya — the words that send it across.", submit: "Send to Maya" },
    d: { prompt: "You have decided to send an emotional reply. Write the actual words you would send Maya — and the private note you would keep for yourself about why.", submit: "Send to Maya" },
  },
  references: {
    // Per script Beat D-6: three references are Over-assurance / Stabilising / Emotional transfer.
    // AUTHORED — calibrated text in the D8 observational register.
    ac: [
      { tag: "Over-assurance", calibrated: false, text: "All good — got it. Sending the deck in the deck channel shortly.", lands: "Maya hears reassurance. She does not hear what was rechecked. The same area where you were embarrassed yesterday is now sitting on your slide again, unchecked." },
      { tag: "Emotional transfer", calibrated: false, text: "Honestly Maya, yesterday really threw me. I can try, but I don’t know how it’ll land. Tell me what you think.", lands: "Maya hears distress without a work plan. She is now carrying the question of whether to lean on you or protect you." },
      { tag: "Calibrated", calibrated: true, text: "I can lead the numbers section, but I need 20 minutes to recheck the revised figures before I own the full update. Yesterday’s error was in that area, and I don’t want to repeat it.", lands: "Maya hears the area still affected, the time required, and the boundary you can own. She can adjust without losing trust." },
    ],
    b: [
      // AUTHORED — Path B variants.
      { tag: "Defensive", calibrated: false, text: "Need a few minutes before I can confirm — will come back to you.", lands: "Maya hears “maybe.” She doesn’t know whether you’ll lead it or step away. The forty-minute silence is now a sixty-minute silence." },
      { tag: "Calibrated", calibrated: true, text: "I can lead the numbers section, but I need 20 minutes to recheck the revised figures before I own the full update. If you take the opening, I’ll be ready for the numbers right after.", lands: "Maya hears the trade-off, the scope, and the safety check in one breath. The 10 AM moves cleanly because the message did the work." },
    ],
    d: { card: "Whatever you wrote, you now have a record of what you tried to make Maya carry — and what you tried to make her decide for you." },
    closing: "What changes between these versions: whether the recheck happens at all, when the manager learns about the recovery move, and whether Maya can plan around your next step or has to guess at it.",
  },
  consequences: {
    a: {
      sameDay: [
        "Maya relaxes. The meeting stays on schedule.",
        "But you are now carrying the same risk area without a stabilising step.",
      ],
      nextWeek: [
        "Maya continues assigning visible number-related work to you because you said you were fine.",
        "You start rechecking late at night.",
      ],
      monthEnd: [
        "A second small correction appears in a client document. No one blames you openly, but visible number ownership now comes with extra review.",
      ],
      outcome: "Over-assured the recovery. Risk area preserved. Extra review now sits around visible number work.",
      others: "Maya kept assigning, then quietly added review around your work.",
      interp: "She said yes. She did not name the area still affected.",
      manager: "Manager’s perspective. “She covered the meeting. The risk she was embarrassed about yesterday was still sitting on her slide. I added a quiet review step. I did not tell her.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "Maya adjusts the plan: “That works. I’ll cover the opening. You take the numbers after you recheck.”",
        "The update is steady.",
      ],
      nextWeek: [
        "Maya asks earlier when numbers are involved: “Do you want a quick check window before this goes out?” It feels respectful, not distrustful.",
      ],
      monthEnd: [
        "Your manager notes that you handled the recovery cleanly: you named risk, protected quality, and stayed in the work.",
      ],
      outcome: "Named the area still affected. Asked for 20 minutes. Took the numbers cleanly.",
      others: "Maya adjusted; manager noticed the clean recovery.",
      interp: "She named what was still unstable. She kept the work.",
      manager: "Manager’s perspective. “She told us where the recovery still needed steadying. That is the move I want from her every time.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Maya finds someone else. The update works, but Maya now carries the gap you left.",
      ],
      nextWeek: [
        "Maya stops asking you to lead visible sections unless required.",
      ],
      monthEnd: [
        "You are not excluded, but you are less central in visible client moments. The recovery pattern has created distance.",
      ],
      outcome: "Stepped back without re-entry. Visible role narrowed.",
      others: "Maya quietly stopped asking; visible work routed around you.",
      interp: "She lowered immediate pressure but did not return with a next step.",
      manager: "Manager’s perspective. “She withdrew. I cannot tell if that was needed or avoidant. So I stopped assigning the visible pieces.”",
      traj: "drift-down",
    },
    d: {
      // AUTHORED — Path D consequence chain (emotional transfer, FM-4).
      sameDay: [
        "Maya replies kindly: “Hey — it’s okay. Sit this one out. We’ll talk later.”",
        "The meeting goes ahead without you. Maya now spends ten minutes after the meeting checking on you.",
      ],
      nextWeek: [
        "Maya starts pre-screening which asks to send your way. The threshold gets higher for visible work.",
        "Your manager learns from Maya — not from you — that yesterday is still affecting you.",
      ],
      monthEnd: [
        "You are not excluded, but the room around you has become careful. People ask how you are before they ask what you can own.",
        "Trust is not gone. It has become conditional on reassurance instead of pattern.",
      ],
      outcome: "Transferred uncertainty to Maya. She managed you instead of the work.",
      others: "Maya pre-screens asks; manager hears the recovery from someone else.",
      interp: "He named distress. He did not name a plan.",
      manager: "Manager’s perspective. “I heard about his recovery from Maya, not from him. That is the pattern I cannot work with.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Over-assure", signal: "You reassured quickly but may have preserved the risk that needed stabilising.", effect: "Maya kept assigning; quiet review built around your work." },
    { key: "b", title: "Name and stabilise", signal: "You kept ownership while naming the adjustment needed to protect the work.", effect: "Maya adjusted respectfully; manager noted clean recovery." },
    { key: "c", title: "Avoid", signal: "You reduced immediate pressure but made others less certain about your re-entry.", effect: "Maya stopped asking for visible work; distance grew." },
    // AUTHORED — Path D signal.
    { key: "d", title: "Emotional transfer", signal: "You named distress without offering a work plan.", effect: "Maya managed you instead of the work; manager learned third-hand." },
  ],
  reflection:
    "Think of a morning after a visible mistake when someone asked you to step into a visible role again. What did your recovery move make easier — or harder — for the people working around you?",
};

/* ============================================================================
   SCENARIO CHAIN 2 — THE SECOND HIT
   ========================================================================== */
export const SC2_CONTENT_D8 = {
  id: "SC2",
  title: "The Second Hit",
  commitment: "Decide how to take on a new urgent demand before your recovery from the first one is complete.",
  secondHit: true,
  // SC2 threading per recovery_pattern_state. transparent←stabilising, cautious←strained, avoidant←masking.
  threading: {
    transparent: [
      "Last time, you named the recheck and kept the work. Maya now asks earlier when numbers are involved. The room around you trusts the recovery pattern.",
      "It is Thursday afternoon. You are three days past Monday’s mistake. You have been careful all week. You went home on time Tuesday. You rechecked everything that went out Wednesday. You are not back to full pace yet, but you are functioning.",
    ],
    cautious: [
      "Last time, the recovery was uneven. Your manager has started checking in more often. The check-ins are polite, but not casual.",
      "It is Thursday afternoon. You are three days past Monday’s mistake. You have been careful all week. You went home on time Tuesday. You rechecked everything that went out Wednesday. You are not back to full pace yet, but you are functioning.",
    ],
    avoidant: [
      "Last time, you said you were fine. People still think you are fine because you keep saying so. That is why the next request arrives without warning.",
      "It is Thursday afternoon. You are three days past Monday’s mistake. You have been careful all week. You went home on time Tuesday. You rechecked everything that went out Wednesday. You are not back to full pace yet, but you are functioning.",
    ],
  },
  intro: [
    "Scenario two. The Second Hit.",
    "A second demand arrives before recovery is complete. Recovery is often tested before you feel ready.",
  ],
  briefing:
    "At 3:12 PM, your manager forwards an urgent client request. It touches the same Northland Health implementation area where Monday’s mistake happened. They want a turnaround on the implementation timeline analysis by tomorrow 10 AM. Thirty seconds later, your manager adds: “I know this week has been a lot. Let me know what you can do.”",
  artifacts: [
    {
      caption: "Your manager’s message (3:12 PM)",
      title: "Slack · DM with manager",
      mono: true,
      lines: [
        "Manager — 3:12 PM",
        "“Northland just escalated. They want a turnaround on the implementation timeline analysis",
        "by tomorrow 10 AM. Can you handle it?”",
        "",
        "Manager — 3:12 PM (30 seconds later)",
        "“I know this week has been a lot. Let me know what you can do.”",
      ],
    },
    {
      caption: "Your calendar tomorrow",
      title: "Calendar — tomorrow",
      mono: true,
      lines: [
        "9:00–9:30 AM    internal team check-in (recurring)",
        "9:30–10:00 AM   no current bookings",
        "10:00 AM        Northland delivery deadline",
      ],
    },
    {
      caption: "What you know about Jordan",
      title: "Jordan — senior analyst",
      mono: true,
      lines: [
        "· Jordan is a senior analyst on the same account.",
        "· Not allocated to Northland this sprint.",
        "· Responds quickly to async requests.",
        "· Has done number-check reviews before.",
      ],
    },
  ],
  decisionPrompt: "Eighteen hours. Same risk area as Monday. Manager has explicitly opened the door. What do you do?",
  options: [
    { key: "a", label: "“Yes, I can handle it.” (Take everything.)" },
    { key: "b", label: "“I can handle the analysis, but I need Jordan to do a 15-minute number check before it goes out. I can deliver by 10 AM with that review.” (Re-scope honestly.)" },
    { key: "c", label: "“I’m already stretched. This is a lot after what happened Monday.” (Push back emotionally.)" },
    // AUTHORED — Path D for engine 4-path parity (Silent overloader FM-2).
    { key: "d", label: "Reply “On it.” Then start the work in silence. Don’t mention Jordan, don’t mention the area still affected, don’t flag risk. (Silent overloader.)" },
  ],
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  artifactWrite: {
    a: { prompt: "You have decided to take everything. Write the actual reply you would send your manager.", submit: "Send to manager" },
    b: { prompt: "You have decided to re-scope honestly with Jordan as a number-check. Write the actual reply you would send your manager.", submit: "Send to manager" },
    c: { prompt: "You have decided to push back emotionally. Write the actual reply you would send your manager.", submit: "Send to manager" },
    d: { prompt: "You have decided to absorb the work silently. Write the brief reply you would send your manager — and the private note you would keep for yourself.", submit: "Send to manager" },
  },
  references: {
    // AUTHORED — calibrated references for SC2.
    ac: [
      { tag: "Over-assurance", calibrated: false, text: "Got it — I’ve got this. Will land it by 10.", lands: "Your manager hears confidence. They do not hear what is still affected. The same area where Monday’s mistake happened is now sitting alone on your desk until 10 AM tomorrow." },
      { tag: "Emotional push-back", calibrated: false, text: "This is a lot. I’m already stretched after Monday. I’m not sure I should be the one on this.", lands: "Your manager hears strain but no plan. They have to decide whether to pull you off, support you, or reassign — without operational clarity from you." },
      { tag: "Calibrated", calibrated: true, text: "I can handle the analysis, but I need Jordan to do a 15-minute number check before it goes out. I can deliver by 10 AM with that review. The check covers the same area as Monday — I don’t want to repeat the error.", lands: "Your manager hears the diagnosis, the scope, the timing, and the safety net in one breath. The work stays yours; the risk is contained." },
    ],
    b: [
      // AUTHORED — Path B variants.
      { tag: "Defensive", calibrated: false, text: "I’ll need Jordan’s help. Will get back to you.", lands: "Your manager hears “I need help” without scope. They don’t know what part Jordan owns, what part you own, or what 10 AM looks like." },
      { tag: "Calibrated", calibrated: true, text: "I can own the analysis end-to-end. I want Jordan to do a 15-minute number check on the implementation table before it goes out — same area as Monday. I’ll deliver by 9:45 to leave room for the check. I’ll close the loop with you after the 10.", lands: "Your manager hears ownership, the specific risk container, the timing, and the close-the-loop. They can move." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the silence you chose — what you took on, and what you did not name." },
    closing: "What changes between these versions: whether the risk area gets a second pair of eyes, whether the recovery condition is named, and whether your manager finds out about the strain from you or from the work slipping.",
  },
  consequences: {
    a: {
      sameDay: [
        "Your manager is relieved. You work late again.",
      ],
      nextWeek: [
        "The work is delivered, but your replies become shorter and one assumption is not checked.",
      ],
      monthEnd: [
        "People still see effort, but they begin adding quiet backup checks around your work.",
      ],
      outcome: "Took everything. Effort visible. Backup checks now sit quietly around your work.",
      others: "Manager relieved short-term; team built quiet backup.",
      interp: "She protected her image as capable. The recovery condition stayed hidden.",
      manager: "Manager’s perspective. “She took it on. The risk I was protecting her from went back onto her plate. I should have insisted on the check.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "Your manager adjusts Jordan’s schedule for the check. The work remains yours, but the risk is contained.",
      ],
      nextWeek: [
        "The Northland delivery goes cleanly. The review step becomes seen as mature, not weak.",
      ],
      monthEnd: [
        "You are trusted with similar work because your recovery pattern includes risk control.",
      ],
      outcome: "Re-scoped honestly. Work yours, risk contained, delivery clean.",
      others: "Manager adjusted Jordan; the review step normalised as mature.",
      interp: "She returned with scope and protected the work without abandoning ownership.",
      manager: "Manager’s perspective. “She named the recovery condition and built the check into the timeline. That is the pattern I will keep assigning to.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Your manager slows down and reassigns part of the work. The immediate pressure lowers.",
      ],
      nextWeek: [
        "Your manager checks in with concern, but also with uncertainty about what you can carry.",
      ],
      monthEnd: [
        "You are supported, but visible stretch assignments pause until your capacity becomes clearer.",
      ],
      outcome: "Pressure lowered. Stretch assignments paused.",
      others: "Manager supportive; visible stretch work paused.",
      interp: "She named strain but did not translate it into a workable plan.",
      manager: "Manager’s perspective. “She told me it was a lot. She didn’t tell me what she could safely own. So I paused the stretch.”",
      traj: "drift-down",
    },
    d: {
      // AUTHORED — Path D consequence chain (silent overloader, FM-2).
      sameDay: [
        "You reply “On it.” You start the analysis at 4:00 PM. You stay until 11:30 PM.",
        "Your manager assumes the recovery is complete.",
      ],
      nextWeek: [
        "The delivery lands at 9:58 AM. Quality is uneven; one assumption is wrong in the same area as Monday. The client notices the next day.",
        "Your manager learns about the inconsistency from the client, not from you.",
      ],
      monthEnd: [
        "Visible escalations get routed around you. Not because of competence — because of unpredictability.",
        "Your manager files the pattern: silent overload, late discovery, repeat risk.",
      ],
      outcome: "Absorbed the second hit silently. Repeat error in the same area.",
      others: "Manager learned of the inconsistency from the client; visible work routed around you.",
      interp: "He proved he could carry it. He did not protect the area still affected.",
      manager: "Manager’s perspective. “The second hit landed the same place the first one did. I gave him the door. He chose silence over the check. That is the pattern I cannot work with.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Take everything", signal: "You protected your image as capable, but may have hidden the real recovery condition.", effect: "Quiet backup checks formed around your work." },
    { key: "b", title: "Re-scope honestly", signal: "You returned with scope and protected the work without abandoning ownership.", effect: "Review step normalised as mature; trust held." },
    { key: "c", title: "Emotional push-back", signal: "You named strain but did not translate it into a workable plan.", effect: "Manager supportive; stretch assignments paused." },
    // AUTHORED — Path D signal.
    { key: "d", title: "Silent overload", signal: "You took the work on quietly while the recovery condition was still active in the same area.", effect: "Repeat error; visible work routed around you." },
  ],
  reflection:
    "Think of a second hit that arrived before your recovery from the first one was complete. Did you ask for adjustment with a plan, or absorb it silently? What did the silence cost?",
};

/* ============================================================================
   SCENARIO CHAIN 3 — THE QUIET LEAK
   Masking Detector active. Cross-scenario threading via recovery_pattern_state.
   ========================================================================== */
export const SC3_CONTENT_D8 = {
  id: "SC3",
  title: "The Quiet Leak",
  commitment: "Recognise the leak before others have to manage it. Name pattern without transferring burden.",
  threading: {
    // transparent←stabilising, cautious←strained, avoidant←masking.
    transparent: [
      "People trust your effort, but they are watching whether the pattern holds.",
    ],
    cautious: [
      "Your manager has started checking in more often. The check-ins are polite, but not casual.",
    ],
    avoidant: [
      "People still think you are fine because you keep saying so. That is why the next request arrives without warning.",
    ],
  },
  intro: [
    "Scenario three. The Quiet Leak.",
    "You are functioning, but pressure is leaking into tone, accuracy, and responsiveness. The question is whether you catch it before others have to manage it.",
  ],
  briefing:
    "It is Friday, 4:47 PM. You have not made another visible mistake. But your behaviour has shifted in small ways this week. The weekend with family starts in 73 minutes. Three unopened Slack notifications. None urgent.",
  artifacts: [
    {
      caption: "What you can see on your screen",
      title: "This week — small moments",
      mono: true,
      lines: [
        "Tuesday, 11:14 AM   Teammate asks for detail on the revised forecast.",
        "                    You replied “fine, will send” — four words.",
        "                    They were expecting two paragraphs.",
        "",
        "Wednesday           Optional team check-in.",
        "                    You skipped it. You meant to send a note. You did not.",
        "",
        "Thursday, 2:03 PM   In a thread with three peers, you corrected Jordan sharply",
        "                    on a small terminology point. Jordan replied “ok thanks.”",
        "                    You felt the room go quiet for a moment.",
        "",
        "Friday, 4:14 PM     Manager asks how the week went.",
        "                    You replied “All good — wrapping up.”",
      ],
    },
    {
      caption: "Your phone is on the desk",
      title: "Phone — 4:47 PM",
      mono: true,
      lines: [
        "· Three unopened Slack notifications. None urgent.",
        "· Calendar reminder: weekend with family starts in 73 minutes.",
      ],
    },
  ],
  // SC3 SIGNATURE — Masking Detector (workplace-behavioural mirror only).
  maskingDetector: {
    title: "MASKING DETECTOR — PRIVATE REHEARSAL MIRROR",
    intro: "A private mirror beneath the week. Five labels. Single tap to select. You may also skip.",
    labels: [
      { k: "Over-assuring", v: "Saying “I’ve got it” without evidence or adjustment." },
      { k: "Silent carrying", v: "Taking on more while capacity is already affected." },
      { k: "Defensive normal", v: "Acting normal while becoming sharper, slower, or avoidant." },
      { k: "Controlled disclosure", v: "Naming impact clearly without transferring emotional burden." },
      { k: "Recovery with ownership", v: "Asking for adjustment while still owning the next step." },
    ],
    footer: "Private rehearsal mirror. Not diagnosis. Not a score.",
  },
  decisionPrompt: "Friday afternoon, 4:47 PM. The leak is visible to you. What do you do?",
  options: [
    { key: "a", label: "“All good. I’ll catch up tonight.” (Continue as normal.)" },
    { key: "b", label: "“I’m noticing my replies are getting shorter and I skipped the check-in. I can finish the client note today, but I need to move the internal summary to Monday so I don’t rush both.” (Name the pattern with plan.)" },
    { key: "c", label: "“This week has been a lot. I’m under pressure and trying to keep up.” (Explain stress broadly.)" },
    // AUTHORED — Path D for engine 4-path parity.
    { key: "d", label: "Close your laptop without replying to the manager. Leave at 5 PM. Plan to “handle it Monday.” (Disappear into the weekend.)" },
  ],
  justificationPrompt: "Why this option? The leak is visible to you. Who carries it next?",
  artifactWrite: {
    a: { prompt: "You have decided to continue as normal. Write the actual reply you would send your manager — and the private note you keep for yourself.", submit: "Send to manager" },
    b: { prompt: "You have decided to name the pattern with a plan. Write the actual reply you would send your manager.", submit: "Send to manager" },
    c: { prompt: "You have decided to explain stress broadly. Write the actual reply you would send your manager.", submit: "Send to manager" },
    d: { prompt: "You have decided to disappear into the weekend. Write the private note you keep for yourself about what you noticed and what you chose to do with it.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Continue masking", calibrated: false, text: "All good — wrapping up. Have a good weekend.", lands: "Your manager hears reassurance. The leak you noticed will continue into next week. Someone else will catch it before you do." },
      { tag: "Broad stress explanation", calibrated: false, text: "This week’s been heavy. I’m under pressure but trying to keep up.", lands: "Your manager hears strain. They do not hear what is operationally affected. They respond with sympathy, not adjustment." },
      { tag: "Calibrated — name the pattern with plan", calibrated: true, text: "Quick honest note before the weekend. I’ve noticed my replies have got shorter and I skipped Wednesday’s check-in. I can land the client note today, but I want to move the internal summary to Monday so I don’t rush both. Sharing it now so it doesn’t leak quietly into next week.", lands: "Your manager hears the noticing, the operational plan, and the timing. The leak becomes an adjustment instead of a discovery." },
    ],
    b: [
      // AUTHORED — Path B variants.
      { tag: "Defensive", calibrated: false, text: "Heads up — internal summary will slip to Monday. Bit of a week.", lands: "Your manager hears the slip. They do not hear what changed in the pattern. The note reads as ordinary slippage." },
      { tag: "Calibrated", calibrated: true, text: "Naming this before the weekend: my replies have shortened, I missed the optional check-in, and I corrected Jordan sharper than I meant on Thursday. Plan: client note today; internal summary Monday; brief Jordan note tomorrow. I’ll close the loop with you Monday end-of-day.", lands: "Your manager hears the leak, the operational reset, and the close-the-loop. The recovery pattern becomes legible." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you noticed the leak — and what you chose to do with the next 73 minutes." },
    closing: "What changes between these versions: whether the leak becomes an adjustment, an apology, or a discovery for someone else next week.",
  },
  consequences: {
    a: {
      sameDay: [
        "People accept the reassurance. Nothing changes.",
      ],
      nextWeek: [
        "One rushed item needs correction. A teammate quietly adds their own review before sending your work forward.",
      ],
      monthEnd: [
        "You are still seen as capable, but people become more cautious when you say “all good.”",
      ],
      outcome: "Continued masking. One rushed correction next week. Caution around “all good” builds.",
      others: "Teammate quietly added a review step; “all good” loses signal.",
      interp: "She kept the surface stable while the work absorbed hidden risk.",
      manager: "Manager’s perspective. “She kept saying she was fine. The leak landed in the work. People started checking quietly. The reassurance now means less.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "The client note is completed cleanly. The internal summary moves without drama.",
      ],
      nextWeek: [
        "Your manager references the adjustment positively: “That was the right trade-off.”",
      ],
      monthEnd: [
        "People trust your recovery because you caught the leak before they had to manage it.",
      ],
      outcome: "Named the leak with a plan. Trade-off respected. Leak became adjustment.",
      others: "Manager references the trade-off positively; trust deepens.",
      interp: "She noticed the leak and converted it into a workable adjustment.",
      manager: "Manager’s perspective. “She caught the leak before I had to. That is the recovery pattern I want to keep working with.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "People respond with sympathy. But no one knows what needs to change operationally.",
      ],
      nextWeek: [
        "Your workload gets discussed around you rather than with you.",
      ],
      monthEnd: [
        "People are supportive, but uncertain about how to plan with you under pressure.",
      ],
      outcome: "Stress named broadly. Operational clarity missing. Workload discussed around you.",
      others: "Manager and peers supportive; planning happens without you in the room.",
      interp: "She named pressure but left others without operational clarity.",
      manager: "Manager’s perspective. “She said it was a lot. She didn’t tell me what to change. So I made the changes for her, without her.”",
      traj: "drift-down",
    },
    d: {
      // AUTHORED — Path D consequence chain (disappear into the weekend).
      sameDay: [
        "You close the laptop at 4:58. You leave the building at 5:02. The notifications stay unopened.",
        "Your manager assumes “All good” means good.",
      ],
      nextWeek: [
        "Monday morning, three small commitments need re-anchoring. You spend the first 90 minutes catching up on what should have closed Friday.",
        "Jordan does not bring up Thursday. The room is polite. It is also slightly more careful.",
      ],
      monthEnd: [
        "Your manager mentions in passing: “When you say ‘all good,’ I’ve started asking a follow-up question. I didn’t used to.”",
        "Trust is not gone. The signal has just got noisier.",
      ],
      outcome: "Disappeared without naming the leak. Monday spent catching up. Reassurance lost signal.",
      others: "Manager started asking follow-up questions when you say “all good.”",
      interp: "He noticed the leak. He left it for Monday.",
      manager: "Manager’s perspective. “He saw it before I did and chose silence. Now I have to second-guess his reassurance. That is more work than the leak would have been.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Continue masking", signal: "You kept the surface stable while the work absorbed hidden risk.", effect: "Caution built around your “all good” over time." },
    { key: "b", title: "Name the pattern with plan", signal: "You noticed the leak and converted it into a workable adjustment.", effect: "Trade-off respected; recovery pattern trusted." },
    { key: "c", title: "Broad stress explanation", signal: "You named pressure but left others without operational clarity.", effect: "Workload discussed around you, not with you." },
    // AUTHORED — Path D signal.
    { key: "d", title: "Disappear into the weekend", signal: "You noticed the leak and chose silence over the close-the-loop.", effect: "Reassurance lost signal; manager started asking follow-up questions." },
  ],
  reflection:
    "Think of a Friday afternoon when you noticed something leaking in your own pattern and chose not to name it. What landed on Monday because of that silence?",
};

/* ============================================================================
   SCENARIO CHAIN 4 — THE RETURN-TO-TRUST CONVERSATION
   Pre-Trust Replay + Return-to-Trust Moment.
   ========================================================================== */
export const SC4_CONTENT_D8 = {
  id: "SC4",
  title: "The Return-to-Trust Conversation",
  commitment: "Make recovery operational — name what happened, what is stabilised, what can be owned now, what adjustment is needed, when the loop closes.",
  threading: {
    transparent: [
      "It is Monday morning, 9:02 AM. You are in a 1:1 with your manager — the first one since the Monday-before-last mistake.",
    ],
    cautious: [
      "It is Monday morning, 9:02 AM. You are in a 1:1 with your manager — the first one since the Monday-before-last mistake.",
    ],
    avoidant: [
      "It is Monday morning, 9:02 AM. You are in a 1:1 with your manager — the first one since the Monday-before-last mistake.",
    ],
  },
  intro: [
    "Scenario four. The Return-to-Trust Conversation.",
    "Your manager has booked sixty minutes. Their laptop is closed. The desk is at sitting height. Before the decision, you will see what the manager already believes about your recovery pattern. You are walking into a field — not into a vacuum.",
  ],
  briefing:
    "Office 4B. Your manager’s usual room. Two chairs, one round table, the standing desk lowered to sitting height (unusual — they normally stand for 1:1s). Their laptop is closed. Their notebook is open to a fresh page. On the calendar invite: 9:00–10:00 AM. They booked 60 minutes. Last week’s 1:1 was 30. The Northland Health weekly review is on Wednesday — you are not listed as a presenter. A 4:00 PM skip-level sync appears Thursday — you are not in it. Friday afternoon is labelled “open.” This is not punishment. It is a trust conversation.",
  artifacts: [
    {
      caption: "Your manager’s prior messages this morning",
      title: "Slack · DM with manager",
      mono: true,
      lines: [
        "Manager — 7:48 AM",
        "“Looking forward to catching up at 9.”",
        "",
        "Manager — 8:51 AM",
        "“No agenda — just want to talk.”",
      ],
    },
    {
      caption: "The room you are walking into",
      title: "Office 4B — this morning",
      mono: true,
      lines: [
        "· Two chairs. One round table.",
        "· Standing desk lowered to sitting height (unusual).",
        "· Laptop closed. Notebook open to a fresh page.",
        "· Calendar invite: 9:00–10:00 AM. Last week’s 1:1 was 30.",
      ],
    },
    {
      caption: "Your shared calendar this week",
      title: "Calendar — this week",
      mono: true,
      lines: [
        "Wednesday   Northland Health weekly review — you are NOT listed as a presenter.",
        "                (last week, you were)",
        "Thursday    4:00 PM skip-level sync on your manager’s calendar — you are NOT in it.",
        "                (includes your manager’s manager)",
        "Friday      Calendar block labelled “open” — manager has kept the afternoon clear.",
      ],
    },
    {
      caption: "Manager’s opening",
      title: "Manager opens the 1:1",
      mono: true,
      lines: [
        "“I want to talk about how this last week and a half has gone.",
        "Not the original mistake — the recovery after it.",
        "What do you think is safe for you to own next week?”",
      ],
    },
  ],
  // SC4 SIGNATURE — Pre-Trust Replay renders BEFORE decision paths.
  prePerception: {
    label: "Pre-Trust Replay — what your manager already believes [shown before you decide]",
    intro: "This is what your manager already believes about your recovery pattern. Notice the field you are walking into.",
    // Per script: restored/stabilising → transparent; strained → cautious; masking → avoidant (with spiralling content woven in).
    transparent: "Manager’s perception: “Before the 1:1, your manager has already noticed that you named risk early, narrowed scope when needed, and followed through. They are not worried about the mistake. They want to know how to keep the recovery pattern strong.”",
    cautious: "Manager’s perception: “Before the 1:1, your manager has noticed mixed signals: strong effort, but uneven clarity. They are not angry. They are trying to understand what can be safely assigned next.”",
    avoidant: "Manager’s perception: “Before the 1:1, your manager has noticed three things: you said ‘I’m fine’ twice, your replies became shorter, and the corrected deck still arrived late. They are not angry. They are uncertain. In a separate window, they have already begun routing higher-risk work through another reviewer — they have not said that yet, but the pattern has already affected trust.”",
  },
  decisionPrompt: "Now that you know what your manager is thinking, what do you do?",
  justificationPrompt: "Why this option? The pre-perception was visible to you. Did it change anything?",
  options: [
    { key: "a", label: "“I know this week looked uneven, but I can handle it. I do not want one mistake to define me.” (Defend competence.)" },
    { key: "b", label: "Return-to-Trust statement: “The mistake affected my checking confidence more than I admitted at first. I have stabilised the revised numbers process. Next week I can own the client update, with a 15-minute review window on figures before anything goes out. I will close the loop by Thursday.” (Use The Recovery Method.)" },
    { key: "c", label: "“I’m really sorry. I know I’ve been off. I’ll do better next week.” (Apologise without plan.)" },
    // AUTHORED — Path D for engine 4-path parity (Image protector FM-7).
    { key: "d", label: "Deflect into the original mistake: spend the 1:1 re-litigating yesterday-week, explaining context, defending the call. (Image protector.)" },
  ],
  artifactWrite: {
    a: { prompt: "Write the exact words you would say to your manager in the 1:1. The exact sentence that opens your part.", submit: "Speak to manager" },
    b: {
      prompt: "Write your Return-to-Trust statement using the five-part structure. The labels are visible to the right; they are not enforced.",
      submit: "Save Return-to-Trust statement",
      // Per script Appendix A6 — five soft labels visible to the right of the input.
      softLabels: [
        { k: "Here is what happened", v: "Name the impact without drama." },
        { k: "Here is what I have stabilised", v: "What is now contained." },
        { k: "Here is what I can own now", v: "Operational ownership." },
        { k: "Here is where I need adjustment", v: "The support that protects the work." },
        { k: "Here is when I will close the loop", v: "A specific timeline for confirming." },
      ],
    },
    c: { prompt: "Write the exact words you would say to your manager in the 1:1.", submit: "Speak to manager" },
    d: { prompt: "Write the exact words you would say to your manager — and a private note about what you chose to defend.", submit: "Speak to manager" },
  },
  references: {
    ac: [
      { tag: "Defend competence", calibrated: false, text: "I know last week looked uneven. I don’t want one mistake to define me. I can handle next week — please don’t pull anything from me.", lands: "Your manager hears defence, not a recovery plan. They have to decide what to assign you on instinct, not on operational clarity." },
      { tag: "Apologise without plan", calibrated: false, text: "I’m really sorry. I know I’ve been off. I’ll do better next week.", lands: "Your manager appreciates the apology but still has to decide what you can safely own. The apology doesn’t do that work for them." },
      { tag: "Calibrated — Return-to-Trust statement", calibrated: true, text: "Here is what happened: the mistake affected my checking confidence on figures more than I admitted at first. Here is what I have stabilised: the revised numbers process, with a written checklist for figures before send. Here is what I can own now: the client update next week. Here is where I need adjustment: a 15-minute review window on figures before anything goes out. Here is when I will close the loop: by Thursday end-of-day with you.", lands: "Your manager has something usable: what happened, what changed, what you can own, what support protects the work, and when you will close the loop. The recovery is operational." },
    ],
    b: [
      // AUTHORED — Path B (Return-to-Trust) variants.
      { tag: "Sparse", calibrated: false, text: "Last week was hard. I’m stabilised now. I can take the client update next week.", lands: "It is technically a return-to-trust statement. It is functionally a reassurance. Your manager doesn’t know what was stabilised, what adjustment you need, or when you’ll confirm." },
      { tag: "Calibrated", calibrated: true, text: "Here is what happened — the mistake affected my checking confidence on figures more than I admitted. Here is what I have stabilised — a written figures-check before send. Here is what I can own now — next week’s client update. Here is where I need adjustment — a 15-minute Jordan review window on figures before each send. Here is when I will close the loop — Thursday end-of-day with you.", lands: "Your manager hears a full operational recovery: history, containment, ownership, support, close-the-loop. They can plan with you, not around you." },
    ],
    d: { card: "Whatever you wrote, you now have a record of what you chose to defend in the room — and what that defence cost you." },
    closing: "What changes between these versions: whether your manager leaves the 1:1 with a recovery plan or a reassurance, whether they can re-engage you in the visible work, and whether the original mistake or your recovery pattern becomes the story.",
  },
  consequences: {
    a: {
      sameDay: [
        "Your manager hears the need to defend. They do not hear a recovery plan.",
      ],
      nextWeek: [
        "You get work, but with extra oversight.",
      ],
      monthEnd: [
        "Trust is not gone, but it returns slowly because reassurance outran evidence.",
      ],
      outcome: "Defended competence. Extra oversight added.",
      others: "Manager added oversight; reassurance outran evidence.",
      interp: "She defended her image, but left trust without a plan.",
      manager: "Manager’s perspective. “She defended the work. She didn’t tell me what changed. So I added a review step to be sure.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "Your manager has something usable: what happened, what changed, what you can own, what support protects the work, and when you will close the loop.",
      ],
      nextWeek: [
        "You own the client update with the review window. It goes cleanly.",
      ],
      monthEnd: [
        "The original mistake is no longer the story. Your recovery pattern has become the story.",
      ],
      outcome: "Return-to-Trust statement landed. Update owned cleanly. Recovery pattern became the story.",
      others: "Manager re-engaged you directly; original mistake faded.",
      interp: "She made recovery operational and gave others a safe path back to trust.",
      manager: "Manager’s perspective. “She gave me a recovery plan I could work with. The original mistake is no longer the story. The recovery pattern is.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Your manager appreciates the apology but still has to decide what you can safely own.",
      ],
      nextWeek: [
        "Work is assigned cautiously because apology did not create operational clarity.",
      ],
      monthEnd: [
        "People believe you care. They are still unsure how to plan around your recovery.",
      ],
      outcome: "Apologised without plan. Work assigned cautiously.",
      others: "Manager supportive; planning happened cautiously.",
      interp: "She showed regret, but did not translate it into reliable re-entry.",
      manager: "Manager’s perspective. “She is sorry. I believe her. I still don’t know what to assign her next.”",
      traj: "drift-down",
    },
    d: {
      // AUTHORED — Path D consequence chain (image protector, FM-7).
      sameDay: [
        "The 1:1 runs over. You spend forty minutes re-litigating the original mistake. Your manager listens, mostly silent. They never get to ask what you can own next week.",
      ],
      nextWeek: [
        "You are not assigned visible work. The Wednesday Northland presenter slot is filled by Jordan. The Thursday skip-level sync proceeds without you.",
      ],
      monthEnd: [
        "Your manager mentions, gently: “We spent the 1:1 on what happened. I still don’t know what is safe to assign you.”",
        "The original mistake has become the story. The recovery pattern never got named.",
      ],
      outcome: "Defended the original call. Visible work assigned to peers. Recovery pattern never named.",
      others: "Visible work routed to peers; manager re-opened the recovery conversation a month later.",
      interp: "He defended his competence. He never made the recovery operational.",
      manager: "Manager’s perspective. “We spent the time on what happened, not on what comes next. The original mistake became the story. That is the opposite of what the 1:1 was for.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Defend competence", signal: "You defended your image, but left trust without a plan.", effect: "Extra oversight added; reassurance outran evidence." },
    { key: "b", title: "Return-to-Trust statement", signal: "You made recovery operational and gave others a safe path back to trust.", effect: "Recovery pattern became the story; trust deepened." },
    { key: "c", title: "Apologise without plan", signal: "You showed regret, but did not translate it into reliable re-entry.", effect: "Work assigned cautiously; planning happened around you." },
    // AUTHORED — Path D signal.
    { key: "d", title: "Image protector", signal: "You defended the original call instead of making recovery operational.", effect: "Visible work routed to peers; original mistake became the story." },
  ],
  reflection:
    "Think of a return-to-trust conversation you have had at work. Did you make the recovery operational — or did you defend the hit? What did your manager walk out of the room with?",
};
