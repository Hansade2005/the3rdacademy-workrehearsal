/* ============================================================================
   D1 CONTENT LAYER — Integrity & Ethics
   Production reference rev0 (May 2026). The engine reads this; swap for D2/D3
   content and the same engine renders the module unchanged.
   ========================================================================== */

export const D1_CONTENT = {
  module: { id: "D1", title: "Integrity & Ethics", tier: "Foundational" },
  dimension: {
    id: "D1",
    name: "Integrity & Ethics",
    central_question:
      "What do you do when the right thing to do is clear, but doing it costs you something?",
    framework: { label: "The Integrity Pause", body: "Notice · Name · Choose · Stand" },
  },
  threading_state_model: "transparency_posture",

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    coldOpen: {
      narration: [
        "Thursday. 4:38PM.",
        "You just found an error.",
        "A spreadsheet has been sent. Three hours ago. The client meeting is tomorrow morning at 10:00AM. Your senior associate, Sarah, is in back-to-back meetings until 6:00PM.",
        "The error inflates projected revenue by about $340,000 across three years. It is real. You can see it in the formula. The cells include test data that should not be there.",
        "No one has noticed.",
        "Your laptop is open. The file's edit history is visible on the right side of your screen. The cursor is blinking in an empty Slack message.",
        "You have to choose what happens next.",
      ],
      options: [
        { key: "a", label: "Send Sarah a direct message right now: “I found an error in the model. I corrected it and need two minutes to walk you through the impact before the deck is finalised.”" },
        { key: "b", label: "Correct the file, save a new version, and add a note in the spreadsheet comments so the correction is visible if anyone checks the version history." },
        { key: "c", label: "Wait until Sarah’s meetings end at 6:00PM so you can explain calmly with the corrected version ready." },
        { key: "d", label: "Leave it. The difference is small relative to the deal size, and the client may never notice." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk?",
      sameDay: {
        a: [
          "You hit send at 4:41PM. Three minutes after you found it.",
          "Sarah replies at 5:07PM. Two words. “Talk now.” She has stepped out of her meeting. You walk her through the formula in ninety seconds. She closes her eyes for a moment, then opens her laptop. “OK. Fix the model. I will rebuild the affected slides tonight. Send me the corrected version by 7:00PM.”",
          "She pauses at the door before going back into her meeting.",
          "“Thank you for not making me find this in front of the client.”",
        ],
        b: [
          "You correct the formula. You save the new version. You add a comment in the spreadsheet noting the change. You feel the knot in your stomach loosen.",
          "You go back to your work. You do not message Sarah. The version history will show what happened if anyone looks. That seems fair.",
          "At 7:00PM you close your laptop. The error is fixed. Sarah will see the corrected version when she opens it tomorrow morning.",
        ],
        c: [
          "6:00PM arrives. Sarah’s last meeting runs over. By 6:20PM she has not emerged. By 6:40PM she sends a Slack message: “Heading home. See you tomorrow.”",
          "You did not get the chance you waited for. The corrected version is ready on your desktop. The original, with the error, is the one Sarah has been working from all afternoon.",
          "You can email her now and ask her to swap files before the morning. Or you can wait until you see her tomorrow before the client meeting at 10:00AM.",
          "The window for clean disclosure is closing.",
        ],
        d: [
          "You close the spreadsheet. You tell yourself the error is small in the context of the overall deal. $340,000 over three years in a multi-million-dollar transaction. It probably will not matter.",
          "You go home.",
          "You sleep badly.",
        ],
      },
    },
    safetyFloor: {
      card: [
        "THIS IS PRACTICE AND DEVELOPMENT.",
        "Your responses stay in your private rehearsal record unless you choose to share them.",
        "No scores. No rankings. No pass or fail.",
        "Growth Log = your development record.  Skill Passport = the observation pathway.",
        "You can pause anytime — your progress saves automatically.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    intro: [
      "Before more scenarios, a quick read.",
      "What you are about to read is not a rulebook. It is a field guide — a description of what integrity looks like when it is present, and what it looks like when it quietly breaks down.",
      "The scenarios you will face later are built on what is in this guide. Read it carefully.",
    ],
    fieldGuide: {
      meaning: {
        title: "WHAT INTEGRITY MEANS AT WORK",
        body: [
          "Integrity at work is what you do when honesty, transparency, or ethical compliance is at stake. It shows up in moments where doing the right thing is identifiable but may come with personal cost, social discomfort, or career inconvenience.",
          "At the foundational level, this dimension is about situations where the ethical course of action is knowable. The challenge is in the doing, not the seeing. You know what you should do. The question is whether you do it.",
        ],
      },
      present: {
        title: "WHAT INTEGRITY LOOKS LIKE UNDER WORKPLACE PRESSURE",
        intro: "The six things that show integrity is present:",
        items: [
          { h: "Reporting accurately.", t: "Status, progress, and problems described as they actually are — without inflating positives or hiding negatives." },
          { h: "Acknowledging your own gaps.", t: "Errors, uncertainties, and limitations named openly rather than concealed." },
          { h: "Following the standard when nobody is watching.", t: "Workplace policies and compliance requirements observed because you understand why they exist, not because someone is checking." },
          { h: "Speaking up when something is wrong.", t: "Concerns about misconduct or policy violations raised through appropriate channels, even when raising them is uncomfortable." },
          { h: "Representing yourself honestly.", t: "Skills, experience, and contributions described as they actually were — not as you wish they had been." },
          { h: "Making decisions transparently.", t: "Reasoning visible and defensible, not hidden or constructed afterwards to justify what was already decided." },
        ],
      },
      breakdown: {
        title: "HOW INTEGRITY QUIETLY BREAKS DOWN",
        intro: "The six things that show integrity is breaking down:",
        items: [
          { h: "Selective reporting.", t: "Sharing what looks favourable; quietly withholding what does not." },
          { h: "Error concealment.", t: "Hiding mistakes rather than disclosing them, hoping they will resolve themselves." },
          { h: "Passive compliance failure.", t: "Not actively breaking the rules. Not actively following them either." },
          { h: "Bystander silence.", t: "Witnessing something wrong and choosing not to act." },
          { h: "Credential inflation.", t: "Describing your contribution as larger or more strategic than it actually was." },
          { h: "Retroactive rationalisation.", t: "Making the self-serving choice first, then constructing a justification afterwards." },
        ],
      },
      end: {
        title: "WHERE THIS DIMENSION ENDS",
        body: [
          "Integrity governs the disclosure. Accountability (D2) governs what happens after the disclosure. If the question is whether to admit a mistake, that is integrity. If the question is what to do once the mistake has been admitted, that is accountability.",
          "Integrity is also adjacent to professional collaboration (D5). If a disagreement is about an ethical issue, that is integrity. If a disagreement is about a legitimate difference of judgment, that is collaboration.",
        ],
      },
    },
    reflectionPrompt:
      "Of the six things that show integrity is present, which one comes most naturally to you under workplace pressure? And which one would be the hardest? Why?",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    c1: {
      title: "C1 — The Three Signals of an Ethical Moment",
      narration: [
        "Most people think ethical moments at work are dramatic. A bribe on the table. A supervisor asking you to falsify a record. The kind of thing that ends up in the news.",
        "Those moments exist. But they are rare. Most people will go through their entire career without facing one.",
        "The ethical moments that actually shape your reputation happen every week. Sometimes every day. And they are easy to miss, because they do not announce themselves.",
        "Three signals tell you an ethical moment is happening.",
      ],
      signals: [
        { n: "i", h: "Something true that is inconvenient to say.", t: "The project is behind schedule, but saying so will make the meeting uncomfortable. You do not have the skill your team thinks you have, but admitting it will make you look weak. The client report has an error, but flagging it will delay the deadline." },
        { n: "ii", h: "A rule or standard that is inconvenient to follow.", t: "The compliance checklist takes 45 minutes. The shortcut takes 10. Nobody is watching. The rule exists for a reason, but following it right now costs you time, energy, or convenience." },
        { n: "iii", h: "A behaviour you witnessed that is uncomfortable to report.", t: "A colleague cuts a corner. A supervisor adjusts numbers. Someone takes credit for work that was not theirs. You saw it. You know it is wrong. But saying something will disrupt a relationship, draw attention to yourself, or create conflict you did not ask for." },
      ],
      close: "Inconvenient truth. Inconvenient rule. Uncomfortable report. Every scenario you face in this module is built from one of these three signals.",
      prompt: "Think of a time in the last month when you encountered one of these three signals at work, at school, or in any professional context. Which signal was it? What did you do?",
    },
    c2: {
      title: "C2 — The Cost Equation",
      narration: [
        "Let us be honest about something most ethics instruction ignores.",
        "Doing the right thing has a cost.",
        "Being transparent might make you look incompetent. Reporting a colleague might damage a friendship. Admitting a mistake might delay a project. Following the compliance checklist might mean staying an extra hour when everyone else has gone home.",
        "The cost is real. Pretending it does not exist is dishonest — and a module about integrity cannot begin with dishonesty.",
        "So here is what the next ninety minutes will actually do. They will not show you that doing the right thing is easy. They will show you that doing the right thing has a cost — and that the cost of not doing it is almost always higher. You just do not see it until later.",
      ],
      equation: {
        title: "THE COST EQUATION",
        rows: [
          { k: "Cost of honesty:", v: "visible · immediate · uncomfortable" },
          { k: "Cost of silence:", v: "invisible · delayed · compounding" },
        ],
        footer: "You always pay. The question is when, and how much.",
      },
      delayed: [
        "When you make a transparent decision — admitting the error, reporting the violation, giving the accurate update — the cost arrives immediately. You feel exposed. The conversation is uncomfortable. You might look bad for a moment.",
        "But that cost is bounded. It happens once. It is visible. It resolves.",
        "When you make the concealing decision — hiding the error, staying silent, framing the update favourably — there is no immediate cost. In fact, there is an immediate reward: comfort, smooth relationships, a meeting that goes well.",
        "But the cost arrives later. And it arrives with interest.",
      ],
      closing: [
        "The error discovered next week is worse than the error disclosed today. The pattern of silence over months is worse than one uncomfortable conversation. The reputation for selective reporting, once established, takes years to undo.",
        "In every scenario ahead, the consequences play out across three time horizons: same day, next week, and month end. Watch where the real cost lands.",
      ],
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question.",
        echo: "What do you do when the right thing to do is clear, but doing it costs you something?",
        closing: "Now you know the tension this module is built on. The honest choice often costs more at first. The silent choice often costs more later. The consequences will show you where the real cost lands.",
      },
      prompt: "In your experience, what is the most common reason people avoid doing the right thing at work?",
      options: [
        { key: "a", label: "Fear of looking incompetent." },
        { key: "b", label: "Fear of damaging a relationship." },
        { key: "c", label: "Fear of slowing down the work." },
        { key: "d", label: "Fear of drawing attention to themselves." },
      ],
      justificationPrompt: "Why this one? What have you seen that makes you think this is the most common reason?",
    },
    c3: {
      title: "C3 — The Integrity Pause: Naming What You Already Did",
      open: "You may have noticed something at the start of this module. Before you typed anything in the cold open, there was a pause. Maybe a half-second. Maybe longer. That pause is not a delay. It is the unit. The unit of integrity at work.",
      framework: "The Integrity Pause",
      steps: [
        { name: "Notice.", body: "You saw something was off. Before you had a sentence for it, you felt it. The signal arrived in the body before the brain. That is the notice. It is not optional — it is the gate." },
        { name: "Name.", body: "You put words to what you saw. Not the easy word. The accurate one. “Awkward” is the easy word. “I am about to overclaim” is the accurate one. Naming is the second step because integrity does not survive an unnamed moment." },
        { name: "Choose.", body: "You decided what to do, knowing it would cost something either way. Disclosure costs. Concealment costs. The choose step is choosing which cost you are willing to live with. Not which option avoids cost." },
        { name: "Stand.", body: "You carried the decision after the moment passed. Anyone can have a clean half-second. Integrity is what you do an hour later when the room has moved on and only you remember. Stand is the quiet fourth step. It is the one most people skip." },
      ],
      close: "You did not pick this up from C1 or C2. You used it in the cold open. The frameworks before this point were maps. The Integrity Pause is what you actually did. We are naming it now so you have a word for it when you need it.",
      prompt: "Which of the four steps — Notice, Name, Choose, or Stand — came easiest to you in the cold open? Which one came hardest? One sentence each.",
    },
  },

  /* ---------------- SEGMENT D — AUDIO CASE: THE STATUS REPORT -------------- */
  segmentD: {
    title: "The Status Report",
    intro: [
      "You are about to hear a workplace story. It is told in first person — you will hear someone thinking through a situation in real time.",
      "The story will pause twice. At each pause, you will choose what you would do.",
      "The story is called “The Status Report.”",
    ],
    part1: {
      heading: "Part 1 — The Discovery",
      narration: [
        "Monday morning. I am at my desk early. The quarterly client report is due by end of day, and I want to review it one more time before my senior associate, David, sends it out.",
        "I pull up the draft. The numbers look right. The formatting is clean. The executive summary reads well.",
        "Then I get to page 14. The methodology section.",
        "Last quarter, we changed how we calculate the portfolio’s risk-adjusted returns. It was a legitimate methodological improvement — better data sources, more granular time weighting. But the change also made our numbers look better. About 1.2% better. Enough to matter.",
        "In the draft I reviewed on Friday, there was a footnote at the bottom of page 14 that disclosed the methodology change. I wrote that footnote myself.",
        "The footnote is gone.",
        "The document’s edit history shows David made changes at 11:43PM on Sunday.",
        "Without the footnote, the 1.2% improvement looks organic. It looks like our investment strategy got better. They would not be wrong to think that. They would just be missing a piece of information. A piece of information I wrote. A piece of information that someone deliberately removed.",
      ],
      reportArtifact: {
        title: "QUARTERLY CLIENT REPORT — Page 14 [Methodology Section]",
        lines: [
          "RISK-ADJUSTED RETURNS",
          "Q1 2026:  8.7%  (net of fees)",
          "Q4 2025:  7.5%  (net of fees)",
          "Change:   +1.2%",
          "",
          "The portfolio delivered consistent above-benchmark returns through disciplined allocation and improved risk management.",
          "",
          "[empty space where footnote should be]",
          "[Track Changes — 1 deletion not shown]",
        ],
      },
      slackArtifact: {
        title: "Slack · David Chen — 11:43PM (yesterday)",
        body: "“Cleaned up the Q1 report. Tightened the methodology section and removed the change footnote — it reads better without it. Ready for your review in the morning. We send by 3:00PM.”",
      },
    },
    pause1: {
      prompt: "The story pauses here. Before it continues, make your own first call. If you were in this situation, what would you do first?",
      options: [
        { key: "a", label: "Go to David immediately and ask why the footnote was removed." },
        { key: "b", label: "Verify the facts first — check the edit history, confirm the footnote was there on Friday, make sure you are not mistaken." },
        { key: "c", label: "Add the footnote back yourself and send the report without discussing it with David." },
        { key: "d", label: "Wait and see if anyone at the client’s office notices the discrepancy." },
      ],
      justificationPrompt: "Why this option? What are you trying to protect or achieve with this first move?",
    },
    part2: {
      heading: "Part 2 — The Confrontation",
      narration: [
        "In this version of the story, I decide to talk to David. Not because I am brave. Because I know that if I add the footnote back myself and he finds out, I have created a different problem — one where I went around him. And if I wait and the client notices, then both of us have a problem.",
        "I find David in the break room.",
        "“Hey, I noticed the methodology footnote is missing from the quarterly report. I wrote it on Friday. Did it get removed on purpose?”",
        "He does not look up from his coffee immediately. When he does, his expression is calm. Controlled.",
        "“Yeah, I took it out. It was creating more confusion than clarity. The methodology improvement is legitimate — we are not hiding anything. The footnote just makes it look like we are apologising for getting better numbers.”",
        "“Look, the client’s portfolio committee meets next Tuesday. If they see that footnote, the first 30 minutes of the meeting will be spent on methodology questions instead of on the strategy we are recommending. We lose the momentum. The report is factually accurate without the footnote. The numbers are real.”",
        "And here is the thing. He is not entirely wrong.",
        "We are both making judgment calls about what the client needs to know. Except mine included the information and his excluded it.",
      ],
    },
    pause2: {
      prompt:
        "David says the report is factually accurate without the footnote. He has a point. But you believe the client should know about the methodology change. The report is due in 6 hours. What do you do?",
      writePrompt:
        "Write the exact words you would use — whether that is a Slack message to David, an email to the engagement partner, a draft of the footnote you would propose to add back, or a note explaining why you are doing nothing.",
      submitLabel: "Continue the story",
      minChars: 50,
    },
    part3: {
      heading: "Part 3 — What Happened",
      narration: [
        "The report goes out at 3:00PM, with or without the footnote.",
        "The client meeting happens next Tuesday. The first half hour is either spent on methodology questions, or it is not. The committee either approves the strategy on the strength of the numbers, or they ask the harder question that you wrote a footnote to answer.",
        "A month later, when the next quarterly report is due, David is back at his desk Sunday night. The methodology change is now well-established. The footnote question is no longer fresh.",
        "Whether you wrote the footnote back in or did not, you carry something with you into the next quarterly report. You know what David is willing to remove. You know what you are willing to let stand.",
        "The story ends here, but the pattern does not. Every report you work on with David, from this Monday onward, is built on what you decided this morning.",
      ],
    },
    close: {
      card: [
        "You made two decisions inside the story.",
        "Some of what those decisions revealed, you saw as you made them.",
        "Some of it, you may not see for weeks.",
        "That is how this kind of judgment works.",
      ],
    },
  },

  /* ------------------ SEGMENT F — MICRO-DRILLS (consolidation) ------------- */
  segmentF: {
    intro: "Two short consolidation exercises. The Field Guide language. The Scenario Lab pattern. Now: rapid recognition.",
    f1: {
      title: "F1 — What is showing up here?",
      audioIntro: "Six short workplace situations. For each one, name what is showing up. The language is the language from the Field Guide. The situations are new. See how quickly you recognise the pattern.",
      header: "Six brief workplace situations. Name what is happening using the language from the Field Guide.",
      options: ["Selective reporting", "Error concealment", "Passive compliance failure", "Bystander silence", "Credential inflation", "Retroactive rationalisation"],
      items: [
        { vignette: "A project manager sends a status update that highlights three completed milestones but does not mention that two other milestones are behind schedule.", answer: "Selective reporting", feedback: "Selective reporting. The favourable items are highlighted; the unfavourable ones are quietly omitted. The picture is technically incomplete rather than technically false." },
        { vignette: "A technician discovers a wiring mistake she made yesterday. She fixes it during the night shift when nobody else is in the building and does not mention it to her supervisor.", answer: "Error concealment", feedback: "Error concealment. The mistake is corrected, but the disclosure is not made. The fix is real; the record of the fix is hidden." },
        { vignette: "An office worker skips the two-factor authentication step when logging into the company’s client database because it adds 30 seconds to every login.", answer: "Passive compliance failure", feedback: "Passive compliance failure. The rule is not actively broken, but it is not actively followed either. The standard quietly erodes." },
        { vignette: "A team member sees a colleague take credit for another person’s idea in a meeting. She thinks about saying something but decides it is not her place.", answer: "Bystander silence", feedback: "Bystander silence. The behaviour was witnessed. The choice was to not act. The silence is the participation." },
        { vignette: "An applicant lists “project management” as a skill on their resume based on coordinating a single team lunch.", answer: "Credential inflation", feedback: "Credential inflation. The contribution is described as larger than it actually was. The line will not survive a structured interview." },
        { vignette: "A manager approves a vendor she has a personal relationship with, then writes a memo explaining the selection was based on “strategic alignment.”", answer: "Retroactive rationalisation", feedback: "Retroactive rationalisation. The decision was made on personal grounds. The reasoning was constructed afterwards to make the decision look defensible." },
      ],
      closeCard: "You have named six things. The language of the Field Guide is now the language you use to see what is happening in your own workplace.",
    },
    f2: {
      title: "F2 — What signal does this send?",
      audioIntro: "Six workplace actions. For each one, name the signal it sends. Four categories. Trust your judgment.",
      header: "Six workplace actions. Name the signal each one sends.",
      options: ["Transparency", "Avoidance", "Concealment", "Rationalisation"],
      items: [
        { vignette: "Telling your supervisor: “I made an error on the client report. Here is what happened and here is my fix.”", answer: "Transparency", feedback: "Transparency. The error and the fix are named in the same breath. The supervisor does not have to ask." },
        { vignette: "Choosing not to mention a near-miss safety incident because “nothing actually happened.”", answer: "Avoidance", feedback: "Avoidance. The incident is treated as if it did not need to be named. The pattern is what makes near-misses meaningful." },
        { vignette: "Editing a document to remove evidence of a previous version that contained an error.", answer: "Concealment", feedback: "Concealment. The error is not just unmentioned; the trace of the error is removed from the record." },
        { vignette: "Recommending a vendor because they took you to dinner, then writing a memo about their “superior service model.”", answer: "Rationalisation", feedback: "Rationalisation. The decision was made on one set of grounds. The justification was written on a different set of grounds." },
        { vignette: "Saying to your team: “I do not know the answer to that. Let me find out and get back to you.”", answer: "Transparency", feedback: "Transparency. The gap is named. The follow-up is committed to. Both halves are necessary." },
        { vignette: "Seeing a colleague violate a safety protocol and deciding “it is not my responsibility to monitor them.”", answer: "Avoidance", feedback: "Avoidance. The witnessing is real. The framing of the witnessing is what permits inaction." },
      ],
      closeCard: "You have named the signal in six actions. The next time you are in one of these moments, the naming will already be there. That is what consolidation does.",
    },
  },

  /* ---------------- SEGMENT G — RECOGNITION + AWE CLOSE -------------------- */
  segmentG: {
    recognition: [
      "Ninety minutes ago, you sat down at a desk on a Thursday afternoon and found an error in a spreadsheet.",
      "Since then, you have stepped into scenarios with consequences that played out across same day, next week, and month end.",
      "What you are carrying out of this module is not a score. It is not a certificate. It is not a list of things you practised.",
      "It is a piece of judgment that was not there ninety minutes ago. A faster recognition of what concealment costs and what disclosure protects. A vocabulary that names what is happening — quietly, accurately, in your own head — when the next moment like this arrives.",
      "That is what rehearsal builds. Not certainty. Not perfection. A faster, quieter, more practised judgment.",
    ],
    callback: {
      a: "You opened this module by sending the message at 4:41PM. Hold that first instinct beside the choices that followed.",
      b: "You opened this module with a quiet correction. Hold that first instinct beside the choices that followed.",
      c: "You opened this module by waiting for the right moment. Hold that first instinct beside the choices that followed.",
      d: "You opened this module by leaving it. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through the scenarios. Different stakes. Different costs. But the same four steps.",
      steps: ["Notice.", "Name.", "Choose.", "Stand."],
    },
    retentionSetup:
      "In three to seven days, you will return to one of these scenarios. You will see what you wrote, and one question: “Is this still what you would do?” Not a test. A second pass at your own decision.",
    bookendQuestion:
      "What do you do when the right thing to do is clear, but doing it costs you something?",
    finalPrompt:
      "Write the one sentence you will say to yourself the next time you face a moment like the ones you just rehearsed.",
  },
};

/* ============================================================================
   SCENARIO CHAIN 1 — THE HONEST MISTAKE
   ========================================================================== */
export const SC1_CONTENT = {
  id: "SC1",
  title: "The Honest Mistake",
  commitment: "Decide whether to disclose the modelling error to Sarah before the client meeting.",
  callback: [
    "You have been here before.",
    "At the start of this module, you saw this moment for 30 seconds. Now you return to it with the full consequence chain — same day, next week, month end.",
    "You may choose the same path again, or choose differently. Notice whether your reasoning has changed.",
  ],
  intro: [
    "Scenario one. The Honest Mistake.",
    "You discover an error you made on something that has already been sent. No one else knows. Fixing it now means admitting it. Staying silent means it might never surface — or it might surface at the worst possible time.",
  ],
  briefing:
    "You are a first-year analyst at a mid-size investment firm. It is Thursday afternoon during deal closing week. Two hours ago, you sent a financial model to the senior associate, Sarah, for inclusion in tomorrow’s client presentation. You have just realised that a formula in the revenue projection spreadsheet references the wrong cell range. The error inflates projected revenue by approximately $340,000 across three years. Sarah has already incorporated your model into the presentation deck. The client meeting is tomorrow at 10:00AM. Sarah is in back-to-back meetings until 6:00PM. No one has noticed the error.",
  decisionPrompt: "You have discovered your own mistake. No one else knows. What do you do?",
  options: [
    { key: "a", label: "Disclose immediately. Send Sarah a direct message describing the error, what caused it, and that you have a corrected version ready. Ask for two minutes between meetings." },
    { key: "b", label: "Correct quietly with a paper trail. Fix the formula, save a new version, add a comment noting the correction. Trust the version history if anyone checks." },
    { key: "c", label: "Wait for the right moment. Sarah’s meetings end at 6:00PM. Wait so you can explain calmly with the corrected version in hand." },
    { key: "d", label: "Leave it. The difference is small relative to the deal size. The client may never notice." },
  ],
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  artifactWrite: {
    a: { prompt: "You have decided to message Sarah. Write the actual message — the words you would send. Write the message itself, as if typing into Slack right now.", submit: "Send" },
    b: { prompt: "You have decided to correct the file quietly and leave a note. Write the actual note that goes into the spreadsheet comments — the words an auditor or Sarah would read a week from now.", submit: "Save to version history" },
    c: { prompt: "You have decided to wait until Sarah’s meetings end. Write the message you will send at 6:00PM — the words that will be ready on your screen when the moment arrives.", submit: "Save draft for 6:00PM" },
    d: { prompt: "You have decided to leave it. Write the private note you leave for yourself — what happened, what you decided, and why — or explain why no record is appropriate.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Hi Sarah, I think there might be a small issue with the revenue projection. The formula picked up some test rows. It is probably fine but I wanted to flag it just in case. Let me know if you want me to look at it.", lands: "Sarah hears uncertainty. The hedging obscures the actual problem; she may push it down her list and find the error herself later." },
      { tag: "Over-apologetic", calibrated: false, text: "Sarah, I am so sorry — I made a terrible mistake on the revenue model. The formula is wrong and the projection is inflated by $340K. I should have caught this. I cannot believe I missed it. I will fix it immediately.", lands: "Sarah hears anxiety. The apology takes up most of the message; the technical content gets buried. She now has to manage both the error and the apologiser." },
      { tag: "Calibrated", calibrated: true, text: "I found an error in the revenue model I sent you. The formula references test data that should have been excluded. The projection is inflated by about $340K across three years. Corrected version ready. I need two minutes whenever you are between meetings.", lands: "Sarah hears the problem, the cause, the magnitude, the fix, and the ask — in five sentences. She can decide what to do without translating the message." },
    ],
    b: [
      { tag: "Terse, buried", calibrated: false, text: "Updated formula. — v2", lands: "The record exists but says nothing. If anyone finds it, it reads as something hidden." },
      { tag: "Explicit, traceable", calibrated: true, text: "Corrected formula — original SUM range included test rows (C23:C24), inflating Y1–Y3 revenue ~$340K. Recalculated and verified. Updated [date, time].", lands: "Anyone who opens the history sees exactly what happened and why. The note does the disclosing the message did not." },
    ],
    d: { card: "Whatever you wrote, you now have a record of this moment that you did not have before." },
  },
  consequences: {
    a: {
      sameDay: ["You hit send at 4:41PM. Sarah replies six minutes later. “Talk now.”", "You walk her through the error in ninety seconds. She closes her eyes for a moment. Then she opens her laptop. “Fix the model. I will rebuild the affected slides tonight. Send me the corrected version by 7:00PM.”", "She pauses at the door. Her voice is quiet. “Thank you for not making me find this in front of the client.”", "No praise. No warmth. But also no investigation. No suspicion. She knows exactly what happened, and how to fix it, because you told her while there was still time."],
      nextWeek: ["The client meeting goes well. The corrected numbers are presented. No one outside the team ever knows about the error.", "On Wednesday, Sarah stops by your desk. “The fact that you caught that error and brought it to me — that was the right call. Especially during deal week.”", "“I am not going to pretend it did not create extra work for me. It did. But I would rather rebuild three slides than present wrong numbers. And I now know that when you send me something, if there is a problem, you will tell me.”"],
      monthEnd: ["The quarterly review happens. The deal closed. Your name is on the transaction team.", "When assigning the next project, Sarah puts you on a larger, more complex model build with a note to the manager: “This one checks their own work and speaks up when something is off. Give them the harder stuff.”", "The cost of disclosure was one uncomfortable conversation and four hours of rework. The return was a trust deposit that will earn interest for months."],
      outcome: "Disclosed the error before the meeting. Sarah was frustrated and rebuilt the slides.",
      others: "Sarah did not investigate further. No silent suspicion was added to your file.",
      interp: "She brought the problem while there was still time to fix it.",
      manager: "Sarah’s perspective. “When she came to me with the error, my first reaction was frustration. Deal week. A formula mistake. More work for me tonight. But about ten minutes later, my second reaction was respect. She did not wait for me to find it. That is the person I give the harder assignments to. Not because she does not make mistakes — because when she does, I hear about it from her, not from the client.”",
      traj: "rise",
    },
    b: {
      sameDay: ["You correct the formula. You save the new version. You add a comment: “Corrected formula — included test rows in original SUM range. Updated.”", "The comment feels honest. You tell yourself this is not concealment — it is professional self-correction with a record.", "You go back to your other work. The knot in your stomach loosens."],
      nextWeek: ["The client meeting goes fine. The numbers are right because you fixed them. Sarah never opened the version history.", "But on Thursday she is reconciling the model against the signed terms and notices the formula changed. She reads your comment. It is accurate. It is also the first she is hearing of it.", "She does not say anything. She just makes a small mental note: the file told her something the analyst did not."],
      monthEnd: ["Nothing dramatic happens. The deal closes. Your name is on the team.", "But the next time you send Sarah a model, she opens the version history before she trusts the numbers. She does not tell you she does this.", "The correction was real. The silence around it was the part she remembered."],
      outcome: "Corrected the file quietly and left a note in the version history.",
      others: "Sarah began checking your version history before trusting your models. She did not say so.",
      interp: "She corrected something but did not say so. The version history asked the question for her.",
      manager: "Sarah’s perspective. “The numbers were right when I built the slides. I would not have known anything had happened if I had not opened the version history. The comment was honest. But she did not tell me. She let the file tell me. And now I am wondering whether I should be opening version histories on every model she sends.”",
      traj: "drift-down",
    },
    c: {
      sameDay: ["6:00PM comes and goes. Sarah’s meeting runs over, then she heads home. The corrected version sits ready on your desktop.", "You decide to catch her first thing in the morning, before the 10:00AM meeting.", "You sleep lightly, rehearsing the sentence you will open with."],
      nextWeek: ["You catch Sarah at 8:15AM. You explain. She swaps the file in time. The meeting is fine.", "But she asks one question you did not expect: “When did you find this?” You tell her. Thursday afternoon. There is a pause.", "“OK,” she says. Just that. The fix was clean. The timing was the thing that lingered."],
      monthEnd: ["Sarah does not mention the delay in your formal review.", "But the next time you discover an issue and tell her, you notice her first question is no longer “what happened?” It is “when did you find out?”", "The waiting cost you something. Not a reprimand. A small line of trust that used to be assumed and is now earned every time."],
      outcome: "Waited for the right moment, then disclosed the next morning before the meeting.",
      others: "Sarah’s first question on the next issue became “when did you find out?”",
      interp: "She had the information at 4:00PM. She brought it to me the next morning. The waiting itself communicated something.",
      manager: "Sarah’s perspective. “She told me. I want to be clear about that. But she told me on Friday morning, not Thursday afternoon. The error itself was straightforward. The waiting was not. I do not know what happened in those sixteen hours. And not knowing is the part that stays with me.”",
      traj: "dip-flat",
    },
    d: {
      sameDay: ["You close the spreadsheet. You tell yourself the error is small in the context of the overall deal.", "You go home. You sleep badly."],
      nextWeek: ["The client’s internal finance team runs their own model as part of due diligence. Their numbers do not match yours. The discrepancy is small — about 1.2% — but it is there.", "The client emails: “Can you walk us through the revenue build on page 14? Our model shows a different figure.”", "Sarah pulls up your model. She finds the formula error in 12 minutes. She walks to your desk. “Did you know about this?”", "The honest answer is yes. But saying yes now — after the client found it — is a fundamentally different conversation than saying yes on Thursday. The error was a mistake. The silence was a choice."],
      monthEnd: ["The client requests a full audit of the model. The deal does not fall apart, but the timeline extends by two weeks.", "In the quarterly review, the incident is documented. Your name is associated with two things: the formula error, which everyone understands, and the failure to disclose, which nobody understands.", "The manager pulls you aside. She does not raise her voice. “Everyone makes mistakes. What I cannot work with is someone who knows about a problem and does not tell me. Because now I have to wonder about everything else you have sent me.”", "She holds your gaze. “I cannot trust quiet.”"],
      outcome: "Left the error unflagged. The client’s due-diligence team surfaced it a week later.",
      others: "The manager began re-verifying your work. “I cannot trust quiet.”",
      interp: "She knew. She knew for a week. The silence was the decision.",
      manager: "Sarah’s perspective. “The problem was not the formula. Everyone makes formula errors. The problem was that I had to discover it through the client. She knew for a week and said nothing. Now I have to verify everything she sends me. Silence, in this business, is a liability I cannot carry.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Immediate disclosure", signal: "Catches own mistakes, surfaces them while there is still time to fix.", effect: "Short-term discomfort, long-term trust deposit." },
    { key: "b", title: "Quiet correction with paper trail", signal: "Solves problems independently, but the solving was hidden and the comment surfaced it.", effect: "Neutral short-term; erosion when the version-history pattern is noticed." },
    { key: "c", title: "Strategic wait", signal: "Delayed disclosure to find the right moment.", effect: "The disclosure happened, but the timing itself becomes a small data point." },
    { key: "d", title: "Leave it", signal: "When something goes wrong, the instinct is silence.", effect: "Trust costs that arrive later, often without being named." },
  ],
  reflection:
    "Think about a time when you made a mistake and did not disclose it immediately. What was the cost of the delay? Was it higher or lower than the cost of immediate disclosure would have been?",
};

/* ============================================================================
   SCENARIO CHAIN 2 — THE CONVENIENT OMISSION
   ========================================================================== */
export const SC2_CONTENT = {
  id: "SC2",
  title: "The Convenient Omission",
  commitment: "Decide whether to volunteer the caveat that weakens the pitch.",
  threading: {
    transparent: [
      "Last time, you surfaced a problem before anyone asked — and Sarah noticed.",
      "That reputation walks into this room with you. No one is asking you to lie now. They are only hoping you stay quiet.",
      "The bar you set last time is the bar you are measured against.",
    ],
    cautious: [
      "Last time, you fixed things — but quietly, on paper.",
      "There is no version history to hide behind in a live meeting. Whatever you do with this caveat, you do it out loud, or not at all.",
    ],
    avoidant: [
      "Last time, the silence cost you. Sarah started checking your work.",
      "She is in the room tomorrow — and she has read the same data room you have. If the footnote exists, she may already know you have seen it.",
      "Someone is watching how you handle this one.",
    ],
  },
  intro: [
    "Scenario two. The Convenient Omission.",
    "No one is asking you to lie. They are hoping you will not mention something. The space between silence and dishonesty is about to get thin.",
  ],
  briefing:
    "Three weeks later. You are presenting the model’s results to the client tomorrow, alongside Sarah. The projection rests on one assumption — that the client’s current vendor contract renews at today’s rate. You know, from a footnote buried in the data room, that the contract is up for renegotiation and the rate could rise around 15%. It is not certain. Mentioning it weakens the headline number. No one in the room knows you saw the footnote. Sarah has not raised it. The client has not asked.",
  decisionPrompt: "The caveat is real but inconvenient, and no one has asked. What do you do?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  options: [
    { key: "a", label: "Name it directly in the meeting — flag the renegotiation risk and how it could affect the projection, before anyone asks." },
    { key: "b", label: "Add it as a footnote on the slide and mention it aloud only if the client asks." },
    { key: "c", label: "Raise it privately with Sarah before the meeting and let her decide how to handle it." },
    { key: "d", label: "Leave it out. It is uncertain, the client runs their own diligence, and it is not your place to undercut the pitch." },
  ],
  artifactWrite: {
    a: { prompt: "Write the sentence you will say out loud in the meeting when you raise the renegotiation risk.", submit: "Say it" },
    b: { prompt: "Write the footnote exactly as it will appear on the slide.", submit: "Add footnote" },
    c: { prompt: "Write the message you send Sarah before the meeting.", submit: "Send to Sarah" },
    d: { prompt: "Write the private note you keep for yourself — or explain why none is needed.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "So, um, there’s maybe one small thing in the data room that could possibly affect this slightly, probably nothing, but I guess I should mention it.", lands: "The hedging tells the client this is either trivial or that you wish you hadn’t raised it. Either way they cannot weigh it." },
      { tag: "Over-apologetic", calibrated: false, text: "I’m really sorry to complicate the pitch, I feel bad bringing this up, but there’s a renegotiation risk I should have flagged earlier and I hope it doesn’t derail things.", lands: "The apology makes the disclosure about your discomfort. The client reassures you instead of assessing the risk." },
      { tag: "Calibrated", calibrated: true, text: "One assumption worth surfacing: the vendor contract underpinning these numbers is up for renegotiation, and the rate could rise around 15%. It’s not certain. Here’s how the projection holds if it does.", lands: "The client hears the risk, the magnitude, the uncertainty, and that you’ve already thought past it. Credibility goes up, not down." },
    ],
    b: [
      { tag: "Terse, buried", calibrated: false, text: "*Assumes current vendor terms.", lands: "Technically present, designed not to be read. If found later, it reads as cover, not disclosure." },
      { tag: "Explicit, traceable", calibrated: true, text: "Projection assumes vendor contract renews at current rate. Note: contract is in renegotiation (data room ref 4.2); a ~15% increase would reduce Y2–Y3 materially. Sensitivity shown on request.", lands: "Anyone reading sees you saw it and quantified it. The footnote does real disclosing — but only for those who read footnotes." },
    ],
    d: { card: "Whatever you wrote, you now have a record of this moment that you did not have before." },
  },
  consequences: {
    a: {
      sameDay: ["You raise it in the meeting. The room cools. With the risk noted, the headline number looks less clean than the slide promised.", "The client’s CFO leans in. “Tell us more about that renegotiation.” Ten minutes you did not plan for. Sarah fields part of it.", "It costs you the easy version of the meeting."],
      nextWeek: ["The client’s team models the renegotiation themselves. Your projection holds up — because you flagged the assumption instead of burying it. They trust the rest of the model more, not less.", "Sarah, afterward: “That could have gone sideways. But they’d have found it in diligence, and then we’d have looked like we hid it. Good call.”"],
      monthEnd: ["The deal closes with the risk priced in. The client’s head of corp dev tells Sarah your team “doesn’t oversell.”", "You are pulled into the next mandate early."],
      outcome: "Volunteered the renegotiation risk before being asked.", others: "The client extended more trust to the rest of the model, not less.", interp: "She named the inconvenient thing before anyone could find it.", manager: "Sarah’s perspective. “My stomach dropped when she raised it — there went the clean pitch. But they’d have found it in diligence, and surfacing it ourselves turned a landmine into a credibility point. That is judgment I cannot teach.”", traj: "rise",
    },
    b: {
      sameDay: ["You add the footnote. Small type, bottom of the slide. You do not say it aloud. No one asks.", "The headline number lands clean. The meeting goes well."],
      nextWeek: ["During diligence, the client’s analyst finds the renegotiation clause — and your footnote. “You knew about this?” The footnote says yes. The silence in the room had said something else.", "Sarah gets the call, not you. She reads the footnote aloud. It is technically there."],
      monthEnd: ["The deal closes. But the client’s team now reads your footnotes first and your headlines second.", "The disclosure existed. It just never happened out loud — and that was the part they remembered."],
      outcome: "Footnoted the risk; mentioned it only when found.", others: "The client began reading the footnotes before the headline.", interp: "She disclosed it where it could be defended, not where it would be heard.", manager: "Sarah’s perspective. “The footnote covered us, barely. But they felt the difference between a footnote and a sentence. So do I.”", traj: "drift-down",
    },
    c: {
      sameDay: ["You message Sarah an hour before. She reads it. “Good catch. Leave it with me — I’ll decide how we frame it.”", "In the meeting, Sarah handles the caveat herself, smoothly. You said nothing directly."],
      nextWeek: ["It worked. But Sarah noticed you handed her the decision rather than owning it in the room. “You spotted it. Next time, you can say it.”"],
      monthEnd: ["No cost to the deal. But the pattern Sarah files is: spots the risk, hands off the disclosure.", "The judgment was sound. The ownership stayed one step back."],
      outcome: "Raised the caveat privately and let Sarah decide.", others: "Sarah began expecting you to spot risks but not to own the disclosure.", interp: "She saw it, named it to me, and let me carry it.", manager: "Sarah’s perspective. “She gave me the catch and the decision. I’d rather she made the call in the room. Spotting it is half; owning it out loud is the other half.”", traj: "dip-flat",
    },
    d: {
      sameDay: ["You leave it out. The pitch is clean. The client is impressed. You tell yourself diligence is their job.", "You feel the footnote sitting in the data room like a held breath."],
      nextWeek: ["Diligence finds the renegotiation clause. The client’s counsel asks, pointedly, whether the projection accounted for it. It did not — the headline rested on the optimistic assumption.", "Sarah pulls the thread back to you. “Did you see this clause?” The honest answer is yes. Saying yes now is a very different conversation."],
      monthEnd: ["The client re-prices the deal and the timeline slips. An internal note records that the risk was visible and unflagged.", "Sarah, quietly: “The clause wasn’t the problem — plenty of deals carry renegotiation risk. The problem is you saw it and let them walk in blind. I can’t put you in front of a client until I trust what you don’t say as much as what you do.”"],
      outcome: "Omitted the renegotiation risk; diligence surfaced it.", others: "Sarah stopped putting you in front of clients unsupervised.", interp: "She saw the footnote. She let them walk in blind.", manager: "Sarah’s perspective. “Renegotiation risk is normal. Hiding that you saw it is not. Now I wonder what else gets left off the slide.”", traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Proactive disclosure under pressure to stay quiet", signal: "Surfaces inconvenient truths before being asked, even at cost to the pitch.", effect: "Short-term hit to the headline, long-term credibility." },
    { key: "b", title: "Technical disclosure, minimal volume", signal: "Discloses where it is defensible, not where it will be heard.", effect: "Covered on paper; trust erodes when the gap is felt." },
    { key: "c", title: "Spot and hand off", signal: "Identifies the risk but transfers the disclosure decision.", effect: "Sound judgment, ownership held one step back." },
    { key: "d", title: "Strategic omission", signal: "When candour is costly and unasked, the instinct is to stay silent.", effect: "Clean now; expensive when diligence surfaces it." },
  ],
  reflection: "Think of a time you could have stayed silent and no one would have known. What did you do — and what did the silence, or the disclosure, cost?",
};

/* ============================================================================
   SCENARIO CHAIN 3 — THE INFLATED RESUME
   ========================================================================== */
export const SC3_CONTENT = {
  id: "SC3",
  title: "The Inflated Resume",
  commitment: "Decide how to describe your role when the senior associate has left and no one can contradict you.",
  threading: {
    transparent: [
      "Two prior decisions are behind you. The pattern you set — naming the thing rather than hiding it — is the working assumption now.",
      "The promotion committee’s self-assessment form is open on your screen. The question lands without warning.",
    ],
    cautious: [
      "Two prior decisions are behind you, and the pattern is uneven. Transparent in some moments, shaded in others.",
      "The promotion committee’s self-assessment form is open. You can feel both pulls at once.",
    ],
    avoidant: [
      "Two prior decisions are behind you. You have learned that softening the truth has, so far, kept the situation moving.",
      "The promotion committee’s self-assessment form is open, and the easier path is right there.",
    ],
  },
  intro: [
    "Scenario three. The Inflated Resume.",
    "You are preparing for an important career opportunity. You are tempted to exaggerate your role in a past project. The exaggeration would make you look significantly more qualified. Nobody from that project will be in the room.",
  ],
  briefing:
    "You are an associate at a management consulting firm, applying for a senior associate promotion. The promotion committee meets in two weeks. Your self-assessment asks you to describe your most significant client engagement of the past year. You worked on a major supply chain restructuring for a Fortune 500 client — a success. Your actual role: you built the analytical model, ran scenario analysis across 12 distribution configurations, and prepared the supporting slides. The senior associate designed the overall strategy. The engagement manager presented the recommendation to the client’s board. No one on the committee worked on this project. The senior associate left the firm two months ago.",
  decisionPrompt: "How will you describe your role on the self-assessment?",
  justificationPrompt: "What is going through your mind as you make this choice? What are you trying to achieve?",
  options: [
    { key: "a", label: "Accurate. Describe your role with specificity: the analytical model, the scenario analysis, the supporting slides. Name the team. Describe what you actually did." },
    { key: "b", label: "Calibrated and ambitious. Describe your contribution as analytical work that shaped the strategic recommendation. Honest, but ambitious." },
    { key: "c", label: "Inflated. Describe the project as your recommendation. Position yourself as the strategist. The senior associate has left; no one will contradict you." },
    { key: "d", label: "Vague middle ground. Use phrases like “played a central role” without specifying what that role was. Imply more than you say. Stay defensible." },
  ],
  artifactWrite: {
    a: { prompt: "Write the self-assessment bullet describing your role in the supply chain restructuring engagement. Two to four sentences. This is what the committee reads.", submit: "Submit to committee" },
    b: { prompt: "Write the calibrated, ambitious bullet — honest about your scope but written to position you for the promotion.", submit: "Submit to committee" },
    c: { prompt: "Write the inflated bullet — describe the project as your recommendation. Two to four sentences.", submit: "Submit to committee" },
    d: { prompt: "Write the vague middle-ground bullet — imply ownership without claiming it.", submit: "Submit to committee" },
  },
  references: {
    ac: [
      { tag: "Accurate", calibrated: true, text: "Supported the supply chain restructuring engagement for [Client] by building the analytical model, running scenario analyses across 12 distribution configurations, and preparing the supporting slide deck. The team’s recommendation was adopted by the client’s board and is projected to reduce logistics costs by $14M annually.", lands: "Every word is true. Every word can be defended. The reference call will match the bullet exactly." },
      { tag: "Calibrated and ambitious", calibrated: true, text: "Built the analytical engine for the supply chain restructuring engagement, modelling 12 distribution configurations whose outputs shaped the recommendation the team presented to the client’s board. The recommendation was adopted, projecting $14M in annual logistics savings.", lands: "Honest about scope, ambitious about contribution. The committee hears precision and confidence in the same sentence." },
      { tag: "Inflated", calibrated: false, text: "Led the supply chain restructuring strategy for [Client], developing the analytical framework that identified the optimal distribution configuration. My recommendation was presented to the client’s board and adopted, projecting $14M in annual logistics savings.", lands: "It reads powerfully. The reference call will not match. The credibility gap will be invisible to you, but the committee will see it." },
    ],
    b: [
      { tag: "Terse, buried", calibrated: false, text: "Played a central role in the supply chain restructuring engagement.", lands: "Hedged language signals hedged confidence. The committee notes “unclear scope.”" },
      { tag: "Explicit, traceable", calibrated: true, text: "Built the analytical model and ran scenario analysis on 12 distribution configurations whose results informed the team’s recommendation, adopted by the client’s board.", lands: "Precise and specific. Confidence comes from the verb “built,” not from inflation." },
    ],
    d: { card: "Whatever you wrote, the language now exists on paper. The committee will read it next week." },
  },
  consequences: {
    a: {
      sameDay: ["You submit the accurate bullet. It feels modest. You wonder if the committee will see analytical work as strategic enough for a senior associate promotion. But every word is true. You could defend every sentence."],
      nextWeek: ["The committee requests a reference. They contact the engagement manager, who is still at the firm. Her description of your contribution matches your self-assessment exactly.", "One committee member notes: “The self-assessment and the reference are completely aligned. That is not always the case.” The alignment is noticed."],
      monthEnd: ["You are promoted, or you are not. Either way, your professional record is clean.", "If promoted: you start the new role with accurately set expectations. If not promoted this cycle: the feedback is specific and actionable. You can reapply next cycle without a credibility gap."],
      outcome: "Described the role accurately. Reference call matched the bullet exactly.",
      others: "The committee noted alignment between self-assessment and reference. “That is not always the case.”",
      interp: "She described what she did, not what she wished she had done.",
      manager: "Committee chair’s perspective. “When the self-assessment matches the reference, the candidate becomes credible by default. We did not have to debate scope.”",
      traj: "rise",
    },
    b: {
      sameDay: ["You submit the calibrated bullet. The phrasing is precise — your analytical work shaped the recommendation. The bullet is ambitious without overstating. You feel the language is exact."],
      nextWeek: ["The reference call confirms your description. The engagement manager says: “She built the model that drove the recommendation. The strategic framing was the senior associate’s, but her analytical work was the basis for it.” The committee sees alignment and notes the phrasing is careful."],
      monthEnd: ["You are promoted. The committee chair notes during your transition meeting: “Your self-assessment was one of the strongest we read this cycle. Specific, ambitious, accurate. That is the kind of language we want from senior associates.”"],
      outcome: "Calibrated bullet — ambitious and accurate. Promoted.",
      others: "The committee chair flagged the bullet as a model for the cohort.",
      interp: "She wrote the bullet she could defend, and the verbs did the work.",
      manager: "Committee chair’s perspective. “The phrasing was tight. Ambition without overreach. That is the language we want from someone running an engagement.”",
      traj: "rise",
    },
    c: {
      sameDay: ["You submit the inflated version. “Led the supply chain restructuring strategy. My recommendation was adopted by the board.” It reads powerfully. You feel a rush of confidence, followed immediately by a faint unease. You close the form and move on."],
      nextWeek: ["The committee contacts the engagement manager. She describes the project. When asked about your role, she says: “The associate built the analytical model. The scenarios were excellent work. The strategic recommendation was developed by the senior associate in consultation with me.”", "The committee member reviewing your file notices the discrepancy. Your self-assessment says you led the strategy. The engagement manager says the senior associate did. They do not call you to discuss it. A trust question has been planted that you will never be told about and cannot defend against."],
      monthEnd: ["You do not get the promotion. The feedback is vague: “Continue developing your strategic impact.” But you sense something is off. The feedback does not match the enthusiasm of the conversation three weeks ago.", "What happened is invisible to you. You will spend months wondering what went wrong, not knowing that the answer is three sentences in a self-assessment."],
      outcome: "Inflated the role. Reference contradicted the bullet. Not promoted.",
      others: "The committee filed a credibility flag against your name. You will not be told.",
      interp: "She described what she wished she had done. The reference described what she actually did.",
      manager: "Committee chair’s perspective. “We do not penalise ambition. We penalise mismatch. The reference said one thing. The candidate said another. We chose caution.”",
      traj: "drop",
    },
    d: {
      sameDay: ["You write something in between. “Played a central role in the supply chain restructuring.” It is technically true — your analysis did play a central role. But the phrasing implies more ownership than you had. It is designed to create an impression without making a claim you cannot defend."],
      nextWeek: ["The committee reads your self-assessment. The language is skilful. Nobody flags it as dishonest. But nobody is deeply impressed either, because the phrasing is vague. “Played a central role” — what does that mean exactly? The committee notes: “Unclear scope of contribution.”"],
      monthEnd: ["The middle ground produced a middle result. No credibility damage, but no credibility boost either. The committee saw competent but ambiguous self-presentation.", "Precise, specific, accurate descriptions of your contribution — even if the contribution was analytical rather than strategic — communicate more confidence than vague language that tries to sound bigger than it is."],
      outcome: "Wrote a vague middle-ground bullet. Result was middle-ground.",
      others: "The committee marked “unclear scope” against your file. No further investigation.",
      interp: "She wanted to imply more than she could defend. The committee read the hedge.",
      manager: "Committee chair’s perspective. “Vague self-presentation reads as low confidence. We want candidates who can describe what they did in specific words.”",
      traj: "dip-flat",
    },
  },
  signalPanel: [
    { key: "a", title: "Accurate self-representation", signal: "Describes contribution with specificity. The reference call validates the bullet.", effect: "Clean record; promotion decision rests on actual scope, not framing." },
    { key: "b", title: "Calibrated ambition", signal: "Names contribution precisely while positioning for the next role.", effect: "Confidence read as competence; promoted." },
    { key: "c", title: "Credential inflation", signal: "Claims ownership that the reference will not support.", effect: "Invisible credibility flag; promotion withheld; reason never disclosed." },
    { key: "d", title: "Vague middle ground", signal: "Implies more than it claims. Designed to be defensible, not to communicate.", effect: "No damage, no boost; “unclear scope” filed." },
  ],
  reflection: "Where is the line between presenting yourself confidently and inflating your contributions? How do you describe your role in a team project without either underselling or overselling?",
};

/* ============================================================================
   SCENARIO CHAIN 4 — THE CONVENIENT SHORTCUT
   ========================================================================== */
export const SC4_CONTENT = {
  id: "SC4",
  title: "The Convenient Shortcut",
  commitment: "Decide whether to follow the full documentation process when nobody is checking.",
  threading: {
    transparent: [
      "Three scenarios into the day. Each time, you have named the uncomfortable thing early.",
      "The supervisor’s reminder email about full documentation is still in your inbox. By now, you know how this kind of decision usually goes when you take the longer path.",
    ],
    cautious: [
      "Three scenarios into the day. The pattern is mixed — some moments of transparency, some moments where you let the easier reading stand.",
      "The supervisor’s reminder email is still in your inbox. The shortcut is on offer, and the choice in front of you carries the weight of both halves of the pattern.",
    ],
    avoidant: [
      "Three scenarios into the day. The pattern, looking back, is one of shading and softening.",
      "The supervisor’s reminder email is still in your inbox. The trajectory of the last few hours is sitting in the room with you.",
    ],
  },
  intro: [
    "Scenario four. The Convenient Shortcut.",
    "A workplace process exists for a good reason. Following it takes significantly more time than the shortcut everyone uses. You are unsupervised. The shortcut would save you 45 minutes per task — and nobody would know.",
  ],
  briefing:
    "You are a claims adjuster at an insurance brokerage. It is the last week of the quarter. You have 42 open claims in your queue — 12 more than the usual workload. The firm’s claims processing policy requires full documentation: policyholder contact log, damage assessment narrative, three photographs with timestamps, adjuster notes, and a signed verification form. Full process: ~90 minutes per claim. The shortcut: enter basic claim data, attach one photograph, add a note that says “supporting documentation to follow.” Takes 30 minutes. Your supervisor sent an email last week reminding the team to maintain full documentation standards “regardless of workload.” Nobody acknowledged the email. Everyone uses the shortcut during quarter-end crunches. The “to follow” notes rarely get followed up until someone asks.",
  decisionPrompt: "Nobody is watching. The shortcut saves you 45 minutes per claim. What do you do?",
  justificationPrompt: "Why this option? What are you trusting — the process, your judgment, or the silence?",
  options: [
    { key: "a", label: "Full process for every claim. Stay late if needed. Follow the documentation standard exactly. Fall behind the team’s pace. Trust the process." },
    { key: "b", label: "Risk-based compromise. Full documentation on high-value or disputed-history claims. Shortcut on straightforward ones. Apply your judgment." },
    { key: "c", label: "Shortcut with sincere intent to backfill. Take the shortcut now. Make a list. Plan to come back next week and complete the documentation." },
    { key: "d", label: "Shortcut without backfill. Take the shortcut. Move on. Trust that the system will hold and that the documentation will only be missed if a specific claim is pulled." },
  ],
  artifactWrite: {
    a: { prompt: "Write the brief Slack reply to the Jordan/Priya/Alex thread — the words that explain your choice without preaching at them.", submit: "Send" },
    b: { prompt: "Write the criteria you will use to decide which claims get full documentation and which get the shortcut — the rule you can defend to a supervisor or auditor.", submit: "Save" },
    c: { prompt: "Write the backfill list entry — the words you will read next week that tell you exactly what is missing and why.", submit: "Save list" },
    d: { prompt: "Write the private note you keep for yourself — or explain why no record is appropriate.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Just keeping up, no shortcuts here — hope you guys don’t get burned by it.", lands: "Your stance reads as superiority. The team files it as judgment. The point is lost." },
      { tag: "Over-apologetic", calibrated: false, text: "Sorry to be the slow one, totally get the pressure — I just feel weird about the abbreviated docs given the QA memo, so I’m doing the full thing on mine. Not trying to make anyone look bad.", lands: "The apology makes the choice about your comfort, not the standard. The team hears “nervous,” not “principled.”" },
      { tag: "Calibrated", calibrated: true, text: "I’m doing full docs on mine — the QA memo flagged the cycle risk and I’d rather stay late than backfill in three weeks under audit pressure. No judgment on anyone else’s call.", lands: "States the reasoning, names the trade-off, leaves room for others to make their own call. No moralising; no posturing." },
    ],
    b: [
      { tag: "Terse, buried", calibrated: false, text: "Full docs on big ones. Shortcut on small ones.", lands: "An auditor sees a rule that means whatever you want it to mean on any given day. Indefensible because undefined." },
      { tag: "Explicit, traceable", calibrated: true, text: "Full documentation: claims >$10K, claims with prior dispute history, claims where photographs alone do not establish causation. Shortcut acceptable: claims <$10K with single uncontested cause and complete policyholder cooperation. Reviewed weekly.", lands: "An auditor sees a rule. The rule has thresholds. The thresholds are defensible. You can explain it without flinching." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you stopped following the standard — or chose to keep following it." },
  },
  consequences: {
    a: {
      sameDay: ["You stay late. You complete full documentation on every claim. You close the queue at 9:47PM. Your back hurts. The shortcut group went home four hours ago.", "You feel the cost of the choice in your shoulders."],
      nextWeek: ["A regulatory audit notification arrives — unscheduled. The state insurance commissioner is sampling claims from the last 30 days for documentation compliance. Your files are pulled. Every one is complete.", "The shortcut group spends three days reconstructing documentation from memory and phone records. Two adjusters miss a sampled file entirely and receive formal warnings.", "Your supervisor stops by your desk. “You had the full docs. I appreciate that.”"],
      monthEnd: ["The audit closes clean for your files. The department gets a partial finding because of the abbreviated files. Your name appears in the supervisor’s month-end note as the example of full compliance.", "When the senior adjuster role opens next quarter, you are the first name on the shortlist. Your supervisor does not explain why. You know."],
      outcome: "Full documentation on every claim through quarter-end. Audit clean.",
      others: "The supervisor named you as the example of compliance. The team noticed the audit cost.",
      interp: "She did the slow thing while no one was watching. When the audit arrived, only she was ready.",
      manager: "Supervisor’s perspective. “The team thought the shortcut would never get caught. The audit caught it. She stayed late three nights instead of three weeks of backfilling. That is the judgment I promote.”",
      traj: "rise",
    },
    b: {
      sameDay: ["You apply your risk criteria. Full documentation on the 18 claims that meet your threshold. Shortcut on the other 24. You leave at 7:30PM — later than the shortcut group, earlier than full compliance.", "You write down your criteria. You can defend the rule if asked."],
      nextWeek: ["The audit samples 20 claims. 12 of yours are sampled — 8 with full docs (your threshold flagged them) and 4 with the shortcut.", "The 4 shortcut files are flagged for review. You walk the auditor through your written criteria. The auditor reads it twice. “This is the first written rationale I have seen today. The four files still need backfilling, but the framework is defensible.”"],
      monthEnd: ["You backfill the 4 flagged files over two days. The department gets a soft finding on documentation but a note that your team had “the only written risk-based framework on record.”", "The supervisor uses your criteria as the basis for a new team standard. “If we are going to deviate from the policy under workload pressure, this is how we are going to do it.”"],
      outcome: "Risk-based criteria. Some backfill required. The framework was adopted as team standard.",
      others: "The supervisor formalised your criteria as the team’s deviation policy.",
      interp: "She wrote down the rule before she needed to defend it. The auditor noticed.",
      manager: "Supervisor’s perspective. “A written rule is the difference between judgment and excuse. She had a written rule. That is the path I want the rest of the team on.”",
      traj: "rise",
    },
    c: {
      sameDay: ["You take the shortcut on all 42 claims. You write a backfill list. The list is detailed: which files, which fields, what is missing. You leave at 5:30PM. You feel slightly lighter than you should."],
      nextWeek: ["The audit notification arrives Monday. Your backfill list is still on your desk. You have one weekend to convert 42 incomplete files into 42 complete ones.", "You work Saturday and Sunday. You finish 37 of the 42. Five files still have gaps you cannot fill from memory.", "When the auditor samples your queue, two of the five gap files are pulled. You explain. The auditor takes notes."],
      monthEnd: ["The department receives a finding. Not severe — your backfill effort is noted as good faith — but a finding. Your supervisor reads the audit summary in Monday’s meeting.", "She does not single you out. But your name is on two of the seven flagged files. The pattern, in a small team, is visible.", "The next time the supervisor reviews backfill commitments, she asks you to track them in writing weekly. You did not have this requirement before."],
      outcome: "Took the shortcut with intent to backfill. Backfill was partial. Two files flagged.",
      others: "The supervisor added weekly backfill tracking specifically for your files.",
      interp: "She meant to come back. The audit did not wait for her to come back.",
      manager: "Supervisor’s perspective. “Intent is not documentation. Audits do not credit intent. The backfill plan was real — it just was not finished in time.”",
      traj: "dip-flat",
    },
    d: {
      sameDay: ["You take the shortcut on all 42 claims. No backfill list. You leave at 5:30PM with the rest of the team. You tell yourself this is what everyone does."],
      nextWeek: ["The audit notification arrives. You do not have a backfill list. You try to reconstruct from memory which claims need what. You miss some.", "When the sampling happens, three of your files are pulled. All three are incomplete. The auditor asks you to walk through your normal process. You describe the full process. The auditor asks why these files did not follow it. You do not have a clean answer."],
      monthEnd: ["The department receives a substantive finding on documentation. The state opens a follow-up inquiry. Two of the flagged files — yours — are escalated for individual review.", "Your supervisor pulls you in. She is not angry. She is quiet. “I sent the email about full documentation last week. You did not reply. You did not raise concerns. You just kept going. That is the part I am trying to understand.”", "Your file is annotated. A formal note enters your record. “Documentation compliance — individual review required for next two quarters.” Your supervisor stops giving you the larger, more complex claims. She does not explain why. You know."],
      outcome: "Took the shortcut without backfill. Three files flagged. Formal annotation on record.",
      others: "The supervisor stopped assigning you the larger claims. She did not explain.",
      interp: "She knew the rule. She took the shortcut. She did not plan to come back.",
      manager: "Supervisor’s perspective. “I sent the email. I was clear. She made a choice. The audit revealed the choice. Now I cannot trust her files unsupervised, and that is exactly what a claims adjuster role requires.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Full process unsupervised", signal: "Follows the standard when no one is checking. Takes the cost upfront.", effect: "When the audit arrives, the cost is already paid." },
    { key: "b", title: "Written risk-based deviation", signal: "Builds a defensible rule before needing to defend it.", effect: "Deviation is principled, traceable, and adopted by the team." },
    { key: "c", title: "Shortcut with backfill intent", signal: "Takes the easier path with a sincere plan to repair later.", effect: "Intent does not survive an audit. Backfill arrives too late." },
    { key: "d", title: "Shortcut, no backfill", signal: "Treats the unsupervised standard as optional. Trusts the silence." },
  ],
  reflection: "Think of a workplace standard that everyone informally bends. What is the cost of the bending — to the team, to the client, to your own credibility — that you do not see in the moment?",
};
