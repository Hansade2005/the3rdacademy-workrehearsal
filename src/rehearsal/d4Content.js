/* ============================================================================
   D4 CONTENT LAYER — Communication Under Pressure
   Production reference rev0 (June 2026). Mirrors the D3 schema shape so the
   engine renders D4 unchanged. The signature framework is the Pressure
   Response Protocol: Notice → Centre → Name → Land. Where script declares
   only 3 paths (A/B/C) but the engine expects 4, a Path D ("silent slip") is
   AUTHORED in the script's observational register and flagged.
   ========================================================================== */

export const D4_CONTENT = {
  module: {
    id: "D4",
    title: "Communication Under Pressure",
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
    id: "D4",
    name: "Communication Under Pressure",
    central_question:
      "When the pressure is on, can you say what needs to be said — clearly, calmly, and to the right person?",
    framework: { label: "The Pressure Response Protocol", body: "Notice · Centre · Name · Land" },
  },
  threading_state_model: "composure_pattern",
  prior_module_references: ["D3"],

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    coldOpen: {
      d3Callback: {
        wrapperLead: "Last time, you said this:",
        // TODO(cross-module-memory) — replace at runtime with the participant's
        // D3 final personal sentence pulled from the cross-module memory store.
        sentenceSlot: "{{prior.D3.final_personal_sentence}}",
        wrapperTail: "That sentence still belongs to you. Today we are looking at the layer underneath the work itself — what happens when the words you find under pressure become an experience the other person carries away.",
        fallback: "This module can stand alone, but it connects more deeply after D3. We are going to ask you to live a moment now — a moment where what you say, and how it lands, matters.",
      },
      narration: [
        "It is 10:42 Tuesday morning. You are in the all-hands. Your VP is at the front of the room. They have just stood up and walked the company through the quarter's flagship project. They called it on track. They did not mention the integration risk.",
        "You raised that risk to them privately last Thursday — the dependency the partner team has not committed to. You named the date it has to be resolved by. They thanked you, said they would look into it, and the topic has not surfaced since.",
        "Now they are wrapping up. The Slack channel is filling. Your peer two seats away just looked at you. You can feel the question forming behind their eyes. The next agenda item starts in thirty seconds.",
        "You have thirty seconds to choose what you do.",
      ],
      options: [
        { key: "a", label: "Speak up now, in the room. Raise your hand. Briefly name the integration risk and the date it has to be resolved by. Calibrated, not accusatory. Use the room you are already in." },
        { key: "b", label: "Send a private message in the meeting chat to the VP only: “Integration risk we discussed last Thursday — still unresolved. Worth a follow-up?” Let them choose whether to surface it." },
        { key: "c", label: "Walk over to the VP immediately after the meeting and ask in private why it was not raised. Wait for the answer before you decide whether to do more." },
        { key: "d", label: "Say nothing. Do nothing. Let the meeting move on. Watch what happens." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk?",
      sameDay: {
        a: [
          "The room registered your correction. Two people thanked you afterwards. The VP looked momentarily caught — and later, in 1:1, did not mention it.",
          "The risk is now visible. Your status in the room has shifted slightly: you are now the person who will surface what is missing.",
        ],
        b: [
          "The VP read the chat message. They did not reply during the meeting. After the meeting they walked over, thanked you for the heads-up, and asked you to send a one-line note they could forward.",
          "The risk is now on a path to resolution. The room does not know the risk exists.",
        ],
        c: [
          "You caught the VP at the coffee. They acknowledged the omission, said the partner team had committed verbally that morning, and asked you to keep it between you for now.",
          "The risk may be resolving — or you may be carrying it alone. You will not know for two more days.",
        ],
        d: [
          "The meeting ended. The integration timeline question came in the project channel. You see your name in the @ mentions. The senior engineer who emailed you this morning has not yet seen the message.",
          "The decision about whether to surface this is now yours — alone, retroactively, without the room.",
        ],
      },
    },
    safetyFloor: {
      card: [
        "DEVELOPMENT IS WHAT YOU DO HERE. EVIDENCE IS WHAT YOU BUILD AT WORK.",
        "Inside this module you are rehearsing. Your composition can be defensive. Your timing can be wrong. Your tone can leak. None of that is recorded against your name.",
        "The Growth Log is private to you. The Skill Passport carries only what you choose to carry.",
        "What you build at work — that is your Evidence. What you do here — that is your Development. The two are connected, but they are not the same thing.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    intro: [
      "Before we go further, a quick read.",
      "What you are about to see is not a rulebook. It is a field guide — a description of what communication under pressure looks like at work, and how it quietly breaks down when no one says anything.",
      "The scenarios you will face later are built on what is in this guide. Read it carefully.",
    ],
    fieldGuide: {
      meaning: {
        title: "WHAT COMMUNICATION UNDER PRESSURE MEANS AT WORK",
        body: [
          // AUTHORED — meaning paragraph mirrors D3's pattern.
          "Communication under pressure is not measured by what you meant. It is revealed by what the other person had to carry away. At work, the words you choose under pressure are the words that shape what colleagues, clients, and direct reports remember about a moment — long after the moment has passed.",
          "At the foundational level, this dimension is about whether you can say what needs to be said — clearly, calmly, and to the right person — when the pressure is on.",
        ],
      },
      present: {
        title: "WHAT COMMUNICATION UNDER PRESSURE LOOKS LIKE",
        intro: "The eight things that show communication is holding under pressure:",
        items: [
          { h: "Composure.", t: "Pressure does not leak into how you deliver the message." },
          { h: "Tone calibration.", t: "Register matches the moment, not your stress level." },
          { h: "Message clarity.", t: "The actual point lands; there is no throat-clearing burying it." },
          { h: "Timing discipline.", t: "You choose the right moment, not the loudest one." },
          { h: "Listening before speaking.", t: "You respond to what was said, not what you assumed." },
          { h: "Honest framing.", t: "No hedging, no over-explaining, no false reassurance." },
          { h: "Audience awareness.", t: "The message is calibrated to who has to hear it." },
          { h: "Clean closure.", t: "The conversation ends with a clear shared understanding." },
        ],
      },
      breakdown: {
        title: "HOW COMMUNICATION QUIETLY BREAKS DOWN",
        intro: "The six things that show communication is breaking down:",
        items: [
          { h: "Pressure-driven over-explaining.", t: "The message gets buried under qualification." },
          { h: "Tone leakage.", t: "Frustration, defensiveness, or anxiety bleeds into the words." },
          { h: "Avoidance.", t: "Silence when the moment required speaking." },
          { h: "Premature reassurance.", t: "“It'll be fine” before anyone has heard what is actually wrong." },
          { h: "Public correction.", t: "Calling someone out where a private word would have landed better." },
          { h: "Message buried.", t: "The actual point lost in throat-clearing, hedging, or apology." },
        ],
      },
      end: {
        title: "WHERE THIS DIMENSION ENDS",
        body: [
          // AUTHORED — boundary paragraph mirrors D3's pattern.
          "Communication under pressure governs whether the message lands as you meant it. Accountability (D2) governs what you do after something has gone wrong. Reliability (D3) governs whether the work itself holds. D4 is about the words that travel between people while the work is in motion — and what those words produce in the person who receives them.",
          "The Foundational tier holds the question to small, common pressure moments — the bad-news delivery, the request you must compose, the delay you have to explain, the public-pressure moment in a room. The Intermediate tier covers communication under sustained adversarial pressure and across asymmetric power gradients.",
        ],
      },
    },
    reflectionPrompt:
      "Before we go any further — take 60 seconds. Think about the last working week. Was there a moment when the pressure was on and the words you found were not the words you meant? A reply you sent too quickly. A meeting where you stayed silent. A message you reread three times and still sent in a tone you would not have chosen on a quieter day. We are not asking you to confess. We are asking you to notice.",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    c1: {
      title: "C1 — Intent versus Impact",
      narration: [
        "Look back at what you chose to do in the all-hands. Whether you spoke up, sent a private message, walked over after, or said nothing — you made a choice about how your words would land. That choice is the entire dimension.",
        "Communication under pressure is not what you mean to say. It is what the other person actually carries away.",
        "There is a difference between intent and impact. Intent is what you wanted to convey. Impact is what landed in the other person's nervous system. Under workplace pressure, the gap between the two widens — because pressure leaks into tone, timing, and word choice in ways the speaker rarely hears.",
        "The VP did not hear what you wanted them to hear last Thursday. They heard what your composure, your phrasing, and your timing allowed them to hear.",
      ],
      signals: [
        { n: "i", h: "Intent is what you mean.", t: "Composed in your own head, in your own voice, in your own state." },
        { n: "ii", h: "Impact is what they carry.", t: "Filtered through their state, their day, their power-distance from you, their last reading of you." },
        { n: "iii", h: "The gap widens under pressure.", t: "Tone, timing, and word choice are where pressure leaks in — and the speaker is the last person to hear it." },
      ],
      close:
        "The participant who has not yet noticed this gap is communicating into a mirror, not into another human being. That is the first thing to notice.",
      // AUTHORED — C1 reflection prompt mirrors D3's pattern.
      prompt: "Think of a person at work who you would describe as someone whose communication consistently lands well — under pressure. Not “nice.” Not “smooth.” Lands. What do they do that others don't?",
    },
    c2: {
      title: "C2 — What Lands vs What Was Meant",
      narration: [
        "Most people think communication fails at the big confrontations. It does not. Big confrontations come with adrenaline and preparation.",
        "Communication fails in the small everyday moments — the Slack reply that lands sharper than you meant, the email composed in five minutes that the other person rereads five times, the pause in the meeting that was heard as agreement when it was actually exhaustion.",
        "Each moment is individually defensible. Together, they form a pattern in the other person's nervous system: how it feels to receive communication from you under workplace pressure.",
        "That is why D4 introduces two things you have not seen before.",
      ],
      equation: {
        title: "COMING NEXT — THE COMMUNICATION PATTERN MIRROR",
        rows: [
          { k: "Scenario", v: "which moment you are inside" },
          { k: "Message Sent", v: "what you actually said or wrote" },
          { k: "What Landed", v: "what the other person experienced" },
          { k: "Recipient's Next Move", v: "what they did next because of it" },
        ],
        footer: "Not a score. A mirror. The same mirror other people use without telling you.",
      },
      delayed: [
        "The first is the Communication Pattern Mirror. After every scenario, you see one row added: Scenario, Message Sent, What Landed, Recipient's Next Move. By the end of Segment E you have a four-row picture of your communication under pressure.",
        "The second is the Recipient Interpretation Panel. After two of the scenarios, you will see what the other person heard — not what you intended, but what their next move tells you they actually received.",
        "Neither is a score. Both are mirrors.",
      ],
      closing: [
        "In every scenario ahead, the consequences play out across three time horizons: same day, next week, month end. Communication failures are invisible in the moment. They become structural by week four.",
        "Watch what your message produced in the room.",
      ],
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question.",
        echo: "When the pressure is on, can you say what needs to be said — clearly, calmly, and to the right person?",
        closing: "Now you know the tension this module is built on. The single delivered message is unremarkable. The pattern of how your messages land across many small moments — that is the entire dimension.",
      },
      // AUTHORED — C2 reflection decision.
      prompt: "In your experience, which kind of pressured communication is the one that quietly costs you the most?",
      options: [
        { key: "a", label: "The Slack reply you send before rereading." },
        { key: "b", label: "The email composed in five minutes after a difficult call." },
        { key: "c", label: "The silence in a meeting where your voice would have changed the room." },
        { key: "d", label: "The follow-up you never sent — the one that would have closed the loop." },
      ],
      justificationPrompt: "Why this one? What is it about this particular kind of communication that costs you?",
    },
    c3: {
      title: "C3 — The Pressure Response Protocol: Naming What You Already Lived",
      open:
        "Four components. Not a theory. A sequence you have already lived in the last fifteen minutes. The participant who skips any one of them is the participant who finds the wrong words faster than they can hear themselves saying them.",
      framework: "The Pressure Response Protocol",
      steps: [
        { name: "Notice.", body: "Before you respond, notice what the pressure is doing to you. Your heart rate. Your jaw. The five-word phrase already half-formed in your throat. Pressure is felt in the body before it is heard in the words. The all-hands moment this morning — did you notice what your composure was doing before you decided what to say? The participant who skips Notice is the participant who finds the wrong words faster than they can hear themselves saying them." },
        { name: "Centre.", body: "Once you have Noticed, Centre. Slow down enough to choose your words. This may be three seconds. It may be three breaths. It may be a deliberate pause in a sentence you were already speaking. Centre is what separates a pressure-state response from a chosen response. The participant who skips Centre is the participant whose words arrive before the participant does." },
        { name: "Name.", body: "Once you have Centred, Name what is actually true. Clearly. The integration risk is unresolved. The deliverable is at risk. The conversation has to happen this afternoon. Name is the move most people skip when the pressure rises — because Naming is exposed. Naming makes the truth real in the room. Without Naming, Centre is just stalling, and Land is just decoration." },
        { name: "Land.", body: "Finally, Land. Calibrate to the person who has to hear it. The same words, delivered to a peer, a junior, a senior, a client, and a public room, do not land the same way. Land is where intent becomes impact. Land is where the participant stops performing and starts communicating. The participant who skips Land has done all the work of Notice, Centre, and Name — and then dropped the message on the wrong person, in the wrong medium, at the wrong time." },
      ],
      close: [
        "Notice. Centre. Name. Land. Four components. Not a theory. A sequence the participant who skips any one of them will pay for, in private, over time.",
        "You will see all four tested in the Audio Case and in the four scenarios ahead. After each scenario, the Communication Pattern Mirror will show whether your decision honoured the protocol or skipped a step. Then we will see what happens when a single email — written in seven minutes, while frustrated — shapes the next chapter of someone else's career. That is the Audio Case. The Email That Changed Everything.",
      ],
      // AUTHORED — C3 reflection prompt.
      prompt: "Which of the four components — Notice, Centre, Name, or Land — comes most naturally to you under workplace pressure? Which one would you skip first when the room gets tight? One sentence each.",
    },
    complete: {
      label: "Transition to Segment D · 15s",
      narration: [
        "You now have the framework. Four components. The Pressure Response Protocol.",
        "Next, you will sit inside a single email — sent in seven minutes, three weeks ago — and watch what it shaped over twenty-one days.",
        "Put your headphones on if you have them.",
      ],
      scopeBoundaries: {
        title: "Scope Boundaries — Foundational Tier and What the Intermediate Tier Adds",
        paragraphs: [
          // AUTHORED — mirrors D3's pattern, calibrated to D4's central question.
          "This behavioural Dimension [D4], Communication Under Pressure — Foundational, is deliberately bounded. It rehearses communication as the four common pressure moments most working adults meet every week: a bad-news delivery, a help request you have to compose, a delay you have to explain, and a public-pressure moment in a room.",
          "The scenarios are designed so the standard is knowable. The difficulty lives in whether you honour the standard when the body is in pressure-state, when the receiver is in a state you cannot see, and when the message will be reread by them in a state you did not write it in.",
          "This boundary is intentional, and it follows the WorkRehearsal doctrine. Behaviour that can be observed and rehearsed must have a knowable standard. Teaching rhetorical theory — frameworks, tropes, and abstract communication models — is content delivery, not behavioural rehearsal.",
          "The Foundational tier concentrates the rehearsal on the four-step protocol: Notice. Centre. Name. Land.",
          "What this tier does not cover is communication under sustained adversarial pressure — situations where the recipient is actively defending against your message, or where the power gradient is steep enough that the message has to do twice the work.",
          "That variability belongs in the Intermediate tier.",
          "Where the Foundational tier asks, “Can you say what needs to be said when the pressure is on?”, the Intermediate tier asks, “How do you stay in calibrated communication when the room is actively against you?”",
          "The Foundational tier is the floor the Intermediate tier builds on. You cannot rehearse communication under sustained adversarial pressure until the Pressure Response Protocol is already a pattern.",
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

  /* ---------------- SEGMENT D — AUDIO CASE: THE EMAIL THAT CHANGED EVERYTHING -------------- */
  segmentD: {
    title: "The Email That Changed Everything",
    intro: [
      "This morning your manager came into your office. She closed the door. She asked you what had happened with Marcus. You said: nothing. As far as I know.",
      "She said: Marcus has filed for transfer to the platform team. The request is on my desk. The reason he listed is “team fit.” That phrase — “team fit” — is what she used. You watched her face. She was not blaming you. She was trying to understand. She left your office.",
      "You closed the email she had forwarded — the transfer request — and sat for a moment. Then you went back through your sent folder, three weeks back, looking for the email you remembered writing. You found it at 4:53 PM on a Tuesday. It was the email you sent to Marcus after the difficult call with the partner team. It took seven minutes to write.",
      "You are about to hear it. But first, you need to hear what your state was when you wrote it. Because the words are not the whole story. The state is.",
    ],
    part1: {
      heading: "Beat 1 — The afternoon you wrote it",
      narration: [
        "Three weeks ago. Tuesday afternoon, 4:38 PM. You had just come off a forty-minute call with the partner team. They had pushed back on a commitment your team had made. They had used the phrase “misaligned expectations” three times. You had pushed back. You had not won. You had ended the call cordially. You had also ended it with a 14-percent heart rate elevation, a tight jaw, and a five-word phrase already half-formed in your throat: “this cannot keep happening.”",
        "You had ten minutes before your next meeting. You needed to use those ten minutes. The pattern you had been concerned about with Marcus's work — three deliverables in two weeks that had needed corrections you would not normally need to make — had surfaced again in the partner-team call. The partner team had referenced an artifact Marcus produced. They had used it as evidence. You had felt it in the meeting.",
        "You wanted to say something to Marcus while the felt sense was still sharp. You opened a new draft. You wrote what was on your mind.",
      ],
      reportArtifact: {
        title: "THE EMAIL — sent 4:53 PM Tuesday",
        lines: [
          "From: you",
          "To:   Marcus",
          "",
          "Marcus — I need to flag something.",
          "",
          "The partner-team call today raised concerns about the artifact you produced",
          "last week, and frankly this is becoming a pattern. The corrections on the",
          "migration doc, the rework on the QA spec, and now this — I cannot keep",
          "absorbing this in real time.",
          "",
          "I need you to be more careful with what you ship. We are at a stage where",
          "the work has to be right the first time.",
          "",
          "Let me know when you have time to discuss.",
          "",
          "— [your name]",
          "",
          "Sent: Tuesday 4:53 PM",
          "Marcus opened: Tuesday 4:54 PM",
          "Marcus replied: never",
        ],
      },
      reflection: {
        heading: "Beat 3 — The send and the moment after",
        narration: [
          "You reread it once. You felt — accurately — that the words were direct. You called the tone “fair but firm.” You hit send at 4:53. You closed the laptop. You went to your next meeting at 5:00.",
          "Marcus opened the email at 4:54 PM. You did not know that. He read it twice. You did not know that. He did not reply that afternoon. He did not reply the next morning.",
          "By the Friday of that week, he had spoken to HR. By the Thursday of the following week, he had submitted his transfer request. You did not know any of this. You found out this morning, because the transfer request crossed your manager's desk and she came to ask you what had happened.",
        ],
      },
    },
    pause1: {
      prompt:
        "It is three weeks ago, 4:50 PM. You have just typed the first version of the email to Marcus. You have not yet hit send. The Pressure Response Protocol is now available to you — Notice, Centre, Name, Land. With those four moves available, write what you would actually send Marcus now.",
      options: [
        { key: "a", label: "Send the original draft as written. The words are direct; the tone is fair but firm. Send it." },
        { key: "b", label: "Discard the draft entirely. Walk away. Talk to Marcus tomorrow, in person, after a night's sleep." },
        { key: "c", label: "Rewrite from scratch with all four moves: Notice the pressure-state, Centre before the first sentence, Name the pattern as feedback (not verdict), Land it as an invitation to talk." },
      ],
      justificationPrompt: "Why this option? What changed for you between 4:38 PM and 4:50 PM?",
    },
    part2: {
      heading: "Beat 4 — The three weeks between send and discovery",
      narration: [
        "Marcus opened the email at 4:54 PM. He had finished his own day's difficult call — a stakeholder meeting that had gone twenty minutes long and had not gone well. He had been about to close the laptop. He saw your email. He read it once. He read it twice. He noticed his hands were cold. He did not reply. He went home.",
        "On Wednesday morning, he saw you in the standup. You said good morning. You did not mention the email. He took that to mean you considered the matter handled. He did not raise it. He worked through the day. Wednesday afternoon, you replied to a Slack message of his with a thumbs-up emoji. He read the thumbs-up three times. He could not tell whether you meant “received” or “fine, moving on, but the email still stands.” He decided to assume the latter.",
        "By Thursday, the email had been reread by Marcus four times. Each rereading happened in a different state. The first reading: hurt. The second reading: defensive. The third reading: calculating. The fourth reading: cold. On Friday morning, he booked thirty minutes with HR. The HR meeting was framed as “a conversation about team fit.” He used that phrase to make the meeting feel less terminal than it was. He brought the email with him. He had printed it. He set it on the table between himself and the HR partner without saying anything for the first thirty seconds. The HR partner read it. Twice. The HR partner asked one question: “Has this conversation happened in person yet?” Marcus said no. The email was in an HR file by Friday afternoon.",
        "Over the following week, Marcus's communication to you changed in ways you did not consciously register. Shorter Slack messages. Fewer questions in standups. The Friday social — the one he had organised the previous month — was on his calendar but he sent his apologies. You noticed the apologies. You did not connect them to the email. You connected them to the project pressure.",
        "On the Wednesday of the third week, Marcus drafted his transfer request. He took two days to send it. He sent it Thursday morning. It landed on your manager's desk Thursday afternoon. She had a 1:1 with you Friday morning. She did not raise it. She wanted to think about how to ask. By the following Tuesday, she had decided. This morning, she came into your office. She closed the door.",
      ],
      timelineArtifact: {
        title: "WHAT HAPPENED — 21 days, mapped",
        lines: [
          "Week 1 · Tue 4:53 PM   You hit send",
          "Week 1 · Tue 4:54 PM   Marcus opens · reads twice",
          "Week 1 · Fri AM        Marcus books HR",
          "Week 2 · all week      Marcus rereads · 4 states",
          "Week 2 · Fri PM        Email in HR file",
          "Week 3 · Wed           Marcus drafts transfer request",
          "Week 3 · Thu AM        Marcus sends transfer request",
          "Week 3 · Thu PM        Request lands on manager's desk",
          "Today · AM             Manager closes the door",
          "",
          "People who said something to you:      0",
          "Days between cause and discovery:      21",
        ],
      },
    },
    pause2: {
      prompt:
        "It is today. You know what you know. Marcus has filed for transfer. He does not know that you know yet. Your next move is your move. Write the message you would send him today.",
      writePrompt:
        "Write the exact words you would send Marcus today. Three to five sentences. The Pressure Response Protocol is available to you. Repair, not re-explanation.",
      submitLabel: "Send to Marcus",
      minChars: 50,
      options: [
        { key: "a", label: "Acknowledge the impact without re-explaining: “I read the email I sent you three weeks ago. I read it as you would have read it. I am sorry for what that email did. If you want to talk, on your terms, I am here. Either way, I owe you the conversation.”" },
        { key: "b", label: "Re-explain the original. Be clear that you were not attacking him. The pattern was real. Ask to talk." },
        { key: "c", label: "Defer to the system. Note the transfer request. Wish him well on the platform team. Let HR handle the rest." },
      ],
    },
    part3: {
      heading: "Debrief — mapped to The Pressure Response Protocol",
      narration: [
        "Here is what happened, mapped to The Pressure Response Protocol.",
        "Notice was missing — the writer did not pause to notice what the difficult call had done to their state before opening the draft. The body was already in pressure-state when the cursor started blinking.",
        "Centre was absent — no breath between the call ending and the first sentence being typed. The words that arrived first were the words the pressure produced, not the words the situation required.",
        "Name was attempted but distorted — the pattern Marcus had been part of was named, but the context that would have let it land as feedback was not provided. It read as a verdict because it was delivered as one.",
        "Land was skipped entirely — the email was sent without rereading, without asking who Marcus would be when this arrived in his inbox at 4:47 PM after his own difficult day.",
        "Four components of one protocol, four moments of absence, seven minutes of writing that took three weeks to play out. Nothing dramatic in the moment. And by the Thursday of week three, Marcus had decided to leave.",
      ],
    },
    // D3 INNOVATION slot — retrospective. D4 keeps the schema field for renderer
    // parity but the script uses Decision Pause 2 (today's message) as the
    // equivalent reflective surface. No content authored here for D4.
    close: {
      card: [
        "You made two decisions inside the story.",
        "One at the cursor. One today.",
        "Some of what those decisions revealed, you saw as you made them.",
        "Some of it, you may not see for weeks.",
      ],
    },
    complete: {
      label: "Transition to Segment E · 20s",
      narration: [
        "You have read the field guide. You have heard one email unfold across three weeks and made decisions inside it — at the cursor, and today.",
        "Next, you are inside the situation yourself. Four scenarios. Four pressured communications. Four consequence chains across same day, next week, and month end.",
        "Trust your judgment. Make the call. See what your message produces.",
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
        "You have just sat inside an email that shaped twenty-one days and made decisions inside it. Let what you have practised so far settle.",
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
      title: "F1 — One Sentence Under Pressure",
      audioIntro: "One drill. One skill. Say the hard thing first, without panic. You will see three workplace situations, each with multiple things going wrong at once. For each, you have ninety seconds. Write the first sentence you would say or send. Not the third sentence. Not the second sentence. The first sentence — the one that carries the actual point. We are not grading you. We are tightening one specific muscle: the muscle that names what is true at the top of the message, not after the context-loading is done.",
      header: "Three situations. For each, choose the calibrated first sentence — the one that names what is true at the top.",
      onScreenHeader: {
        title: "ONE SENTENCE UNDER PRESSURE — NAME IT AT THE TOP",
        lines: [
          "You will see three situations.",
          "For each, choose the first sentence that names the actual point — without burying, hedging, or apologising.",
        ],
        cta: "Tap to begin.",
      },
      options: [
        "Direct opener — names the actual point first",
        "Hedging opener — “I just wanted to…”",
        "Self-context opener — “On my end…”",
        "Apology opener — “Sorry but…”",
      ],
      // AUTHORED — three F1 rounds.
      items: [
        { vignette: "The client deliverable is late because the data source changed, QA found inconsistencies, the analyst is out sick, and the board meeting is tomorrow. What is the first sentence you would say or send?", answer: "Direct opener — names the actual point first", feedback: "Notice → Name. “The board deliverable will not be ready by tomorrow. Here is the path I propose.” The lead is the news. The path comes second. Hedging openers bury the lead; self-context openers centre the speaker instead of the news." },
        { vignette: "Your direct report has just submitted work that misses the brief in a way the client will notice. They are visibly tired. You have a 1:1 in twenty minutes. What is the first sentence of that 1:1?", answer: "Direct opener — names the actual point first", feedback: "Centre → Name. “I want to talk about the deliverable before we get into anything else.” Direct, calibrated for the relationship, names the agenda before the room finds its own. Apology openers shift the burden onto them; hedging openers waste the first minute." },
        { vignette: "You disagree with a decision your VP made in a public meeting. You will see them in the elevator in three minutes. What is the first sentence?", answer: "Direct opener — names the actual point first", feedback: "Notice → Centre → Name → Land. “I want to flag something before we head into the next meeting.” Frames the moment as an early surface, not a confrontation. The Land is the elevator timing — private, brief, ahead of the next room." },
      ],
      closeCard: "You have rehearsed three first sentences under pressure. The muscle is small. The cost of not having it is large.",
    },
    f2: {
      title: "F2 — Landing Confirmation",
      audioIntro: "Most communication-under-pressure failures are silent. The message is sent, the meeting ends, and the speaker walks away believing the message landed. The recipient walks away with a different message in their head. The cost of that gap is paid in week three, by the meeting that did not need to happen if the gap had been closed in week one. The closing move is a single question. It is also the question that most workplace communicators skip — because asking it requires staying in the moment fifteen seconds longer than feels comfortable. Three rounds. Practise the question.",
      header: "Three closings. For each, choose the question that confirms the landing without over-asking.",
      onScreenHeader: {
        title: "LANDING CONFIRMATION — CHECK IT LANDED",
        lines: [
          "Four kinds of closing move:",
        ],
        showOptionsRow: true,
        cta: "Tap to begin.",
      },
      options: ["Open invitation", "Specific check-in", "Silence-as-respect", "Time-bounded recheck"],
      // AUTHORED — three F2 rounds.
      items: [
        { vignette: "You have just finished delivering feedback to a direct report. They are nodding. The 1:1 has two minutes left. What is your closing question?", answer: "Open invitation", feedback: "Land. “Before we wrap — what do you want to leave with from this conversation?” Open invitations make space for the message that landed differently than you intended." },
        { vignette: "You have just sent a calibrated request to a senior peer. The reply is “Sure.” What is your follow-up question — or do you let it stand?", answer: "Silence-as-respect", feedback: "Land. In some moments the calibrated move is to let the “Sure” stand and not over-ask. A senior peer who says “Sure” has often answered. The closing-question discipline includes knowing when the closing has already happened." },
        { vignette: "You have just told your team something difficult in a team meeting. The room is quiet. The agenda has one more item. What do you say next?", answer: "Time-bounded recheck", feedback: "Land. “I want to give us thirty seconds before the next item. If anything is sitting with you, this is the time.” Thirty seconds is long enough to land, short enough not to perform." },
      ],
      closeCard: "You have rehearsed three closing moves. The discipline is staying in the moment fifteen seconds longer than feels comfortable.",
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
      prompt: "Before we close. Take 60 seconds. In one sentence: what is the move you most want to bring with you out of this hour? Not the move you should bring. The move you will. Write it down. We are going to ask you to remember it.",
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
    recognitionLabel: "Recognition narration · 75s",
    recognition: [
      "Look back. In the last seventy-five minutes you walked into an all-hands moment and decided how to use thirty seconds of pressure. You heard the email that changed everything and reopened the draft with four moves available that the writer did not have.",
      "You delivered news to Mara that she will carry for years. You composed a request to Priya and watched her interior voice read it back to you. You explained a delay to Hadiya without causing panic or hiding the truth. You stood in front of a CFO holding a model that was wrong. You wrote one first sentence under pressure, three times. You wrote one closing question, three times.",
      "You are not the same communicator under workplace pressure that you were seventy-five minutes ago. The Communication Pattern Mirror — your four-row picture — is on the next screen.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a score. Not a certificate.",
        "People do not only hear your words. They carry the experience of receiving them.",
      ],
    },
    // AUTHORED — cold-open callbacks anchored to the 10:42 / all-hands moment.
    callback: {
      a: "You opened this module at 10:42 by speaking up in the room. Hold that first instinct beside the choices that followed.",
      b: "You opened this module at 10:42 by sending the private chat. Hold that first instinct beside the choices that followed.",
      c: "You opened this module at 10:42 by waiting for the corridor. Hold that first instinct beside the choices that followed.",
      d: "You opened this module at 10:42 by staying silent. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      label: "Framework Return · 35s",
      durationSeconds: 35,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through four scenarios. Different rooms. Different recipients. But the same four moves.",
      steps: ["Notice.", "Centre.", "Name.", "Land."],
      tagline: "This is The Pressure Response Protocol.",
      carryForward: "The participant who can run those four moves in fifteen seconds — before any pressured message, in any room — has done something that does not require this module to be revisited.",
    },
    delayedRetentionCheck: {
      label: "Retention check setup · 45s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In two weeks, we will check whether the muscle remembers.",
        "Not a test. A re-rehearsal. One short scenario. You will not be graded. You will be invited to demonstrate whether the Pressure Response Protocol has become available to you under workplace pressure in your real working week.",
        "Most participants do not realise the protocol has installed until the Retention Check — when they recognise themselves running it before they realise they are running it.",
      ],
      details: [
        { k: "Appears", v: "2 weeks from now (notification sent)" },
        { k: "Format", v: "1 short scenario, re-rehearsal" },
        { k: "Response", v: "Single decision + brief justification" },
        { k: "Attempts", v: "1 available" },
        { k: "Cooldown", v: "48 hours if you defer the prompt" },
        { k: "Window", v: "72 hours from notification" },
      ],
      doctrinalNote: [
        "This is not a pass / fail check. It is a check that the protocol has stayed with you after time has passed.",
        "If the muscle has settled differently, the system will guide you back to the scenario worth revisiting.",
      ],
      continueLabel: "Got it — continue",
      questionsPerAttempt: 1,
      attemptsMax: 1,
      cooldownHours: 48,
      windowHours: 72,
      notificationWindowHours: [336, 504],
    },
    bookendQuestion:
      "When the pressure is on, can you say what needs to be said — clearly, calmly, and to the right person?",
    finalPrompt:
      "Write one sentence. The sentence you will read back the next time you are in a pressured moment. It is yours. Only you will see it — and only D5 will read it, once, when it begins.",
  },
};

/* ============================================================================
   SCENARIO CHAIN 1 — THE BAD NEWS DELIVERY (Mara)
   ========================================================================== */
export const SC1_CONTENT_D4 = {
  id: "SC1",
  title: "The Bad News Delivery",
  commitment: "Decide how, when, where, and in what posture you deliver irreversible bad news to a direct report.",
  callback: [
    "You have been here before.",
    "At the start of this module, you sat inside a thirty-second public-pressure moment. Now you sit inside an eighteen-hour bad-news moment with the full consequence chain — same day, next week, month end.",
    "You may choose the same instinct again, or choose differently. Notice whether the architecture you bring to it has changed.",
  ],
  intro: [
    "Your first scenario. The Bad News Delivery.",
    "Tomorrow morning at 9:00 you have to tell Mara that her role is being eliminated in the restructuring. You found out forty minutes ago. The decision is final. The team is being reorganised. Her role does not survive the new structure.",
    "Mara has been on your team for two years. She declined an outside offer six months ago because she trusted the trajectory here. You have eighteen hours to decide how, when, where, and in what posture you deliver this news.",
    "The actual words you say are a smaller question than the architecture of the conversation. Bad news is not just information. It is an experience the other person will carry for years. How you deliver it tells them what you think of them — and what you think they are capable of carrying.",
  ],
  briefing:
    "You found out forty minutes ago. The decision is final, the team is being reorganised, her role does not survive the new structure. Mara has been on your team for two years. She declined an outside offer six months ago because she trusted the trajectory here. You have eighteen hours to decide how, when, where, and in what posture you deliver this news.",
  artifacts: [
    {
      caption: "Director's note to you · 4:00 PM today",
      title: "From: Director · received 4:00 PM",
      mono: true,
      lines: [
        "The restructuring decisions are final.",
        "Mara's role does not survive the new structure.",
        "Severance terms attached. Next-steps document attached.",
        "She needs to hear it from you, tomorrow, before the all-hands announcement at 11:00.",
        "Use the script if it helps. Adapt as you need.",
        "— Director",
      ],
    },
    {
      caption: "Your last 1:1 notes with Mara — six months ago",
      title: "1:1 Notes · 6 months ago",
      mono: true,
      lines: [
        "Mara mentioned the outside offer.",
        "Discussed trajectory here — growth path through next year.",
        "She decided to stay.",
        "Her quote: “I trust where this is going.”",
      ],
    },
  ],
  decisionPrompt: "Eighteen hours. Irreversible bad news. Two years of trust. How do you deliver it?",
  options: [
    { key: "a", label: "End-of-day email today. Send a private email this evening so Mara has time to process before any conversation. Schedule a 1:1 for tomorrow morning to discuss next steps once she has had time to absorb the news." },
    { key: "b", label: "In person, first thing tomorrow morning. Block 9:00. Booked room with door that closes. Tell her in person. Stay for the questions. Have severance terms and next-steps document ready. Let her response shape the rest of the meeting." },
    { key: "c", label: "Quick coffee tomorrow, framed as a check-in. Casual setting. Lower the stakes by framing the meeting as a routine catch-up. Break the news in the first five minutes. Keep the meeting short so it does not become heavy." },
    // AUTHORED — Path D for engine 4-path parity.
    { key: "d", label: "Defer the conversation. Send a vague message tonight asking to meet at 11:00 — at the same time as the all-hands announcement. Let her hear the structural news in the room and then talk to her after." },
  ],
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  artifactWrite: {
    a: { prompt: "You have decided to send an end-of-day email tonight. Write the email — the exact words Mara will read at 6:47 PM.", submit: "Send the email" },
    b: { prompt: "You have decided to deliver the news in person at 9:00 tomorrow. Write the opening — the first three sentences you will say after she sits down.", submit: "Save the opening" },
    c: { prompt: "You have decided on the coffee framing. Write the message you send tonight to set up the coffee — the words that frame it as a check-in.", submit: "Send to Mara" },
    d: { prompt: "You have decided to defer. Write the message you send tonight asking to meet at 11:00 — the words that buy you time.", submit: "Send to Mara" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants for SC1.
      { tag: "Defensive", calibrated: false, text: "Mara — we need to talk about a change in the team structure tomorrow. Catch me at 9? It will be brief.", lands: "Mara reads “brief” and “change in structure” at 6:47 PM and sleeps poorly. The vagueness does the bracing work but not the landing work." },
      { tag: "Over-apologetic", calibrated: false, text: "Mara — I am so sorry to send this by email. I wish I could tell you in person but I wanted you to have time to absorb it. Your role is being eliminated in the restructuring. I am so, so sorry. We can talk first thing tomorrow.", lands: "The apology takes up most of the message; the news lands inside a swirl of your discomfort. Mara now has to manage both the news and your apology." },
      { tag: "Calibrated", calibrated: true, text: "Mara — I want to give you the news directly so you have time to absorb it before we meet. Your role is being eliminated in the restructuring. The decision is final. Severance and next-steps document attached. I have blocked 9:00 tomorrow to talk through what you want to ask. Take the evening. Reply if you want to move the time.", lands: "Mara reads the news, the document, and the time in three sentences. The evening is hers to absorb." },
    ],
    b: [
      // AUTHORED — Path B (in-person opening).
      { tag: "Defensive", calibrated: false, text: "Mara — thanks for coming in. We are doing a restructuring and unfortunately your role is one of the ones affected. The decision came down yesterday. I have the documents here. Take a minute.", lands: "“Unfortunately” and “came down” shift the agency away from you. Mara hears the news but also hears that the speaker did not choose to own it." },
      { tag: "Calibrated", calibrated: true, text: "Mara — I have hard news. The restructuring decisions are final. Your role does not survive the new structure. I am the person telling you because you should hear it from me, today, before any announcement. I am going to stay for whatever you want to ask. Take the time you need.", lands: "Mara hears the news, the timing, and your presence in three sentences. She has space to respond at her own pace." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose to defer." },
    closing: "What changes between these versions: when Mara learns the news, in what state, and whether your presence was part of the news or absent from it. Same eighteen hours. Different story for her to tell.",
  },
  consequences: {
    a: {
      sameDay: [
        "Mara reads the email at 6:47 PM. She does not reply that evening. She arrives at the 9:00 meeting composed but tired. The conversation lasts twelve minutes. She thanks you for the courtesy of advance notice. She asks two questions about timing. She does not ask why.",
      ],
      nextWeek: [
        "Mara works her two-week notice with discipline. She does not engage at the Friday social. Two peers on your team ask you privately, separately, what happened. They both heard about the email before they heard about the conversation. The pattern of “Mara learned by email” has already moved through the team.",
      ],
      monthEnd: [
        "Mara has accepted an external role. She did not reach out to you for the reference she would normally have asked you to provide. Her reference call came from your director. The director did not mention this to you.",
      ],
      outcome: "Email tonight. Meeting tomorrow. The email took away her chance to ask the first questions in real time.",
      others: "Two peers heard “email” before “conversation”; Mara routed her reference elsewhere.",
      interp: "He delivered the news by email because the in-person version felt harder.",
      manager: "Director's later perspective. “The news landed. The way it landed put the speaker outside the moment Mara needed them inside.”",
      traj: "drift-down",
    },
    b: {
      sameDay: [
        "Mara takes the news in silence for fifteen seconds. She asks the practical question first: what is the timing. Then she asks the harder question: was the decision based on her performance. You answer honestly: no. She breathes out. She asks for the rest of the day off. You agree without hesitation.",
      ],
      nextWeek: [
        "Mara returns the next morning. She works through her notice with steadiness. She uses one of her last 1:1s with you to ask whether you would write her a reference. You say yes. She tells two peers on the team that the meeting was hard but fair. The pattern of “the conversation happened with respect” moves through the team.",
      ],
      monthEnd: [
        "Mara is starting at a new company. She has stayed in touch. Six months from now, a peer of hers — strong engineer, currently at her new company — will reach out to you about an opening on your team because of how she spoke about how the news was delivered.",
      ],
      outcome: "In person, in a room with privacy, with the next-steps document ready. She had her response in real time.",
      others: "Mara stays in touch; her peer reaches out about an opening six months later.",
      interp: "She delivered the news in the room, stayed for the response, and let the response shape what came next.",
      manager: "Director's later perspective. “The room held. The news did not have to be re-delivered later in another form. The trust the relationship was built on survived the moment.”",
      traj: "rise",
    },
    c: {
      sameDay: [
        "Mara walked into the coffee shop relaxed. You broke the news at minute three. Her face changed. The casual setting had primed her for something different. She asked one question, paid for her own coffee, and left. The walk back to the office was the longest walk she would take that week.",
      ],
      nextWeek: [
        "Mara is professional in standup. She does not look at you. She does not initiate any conversation that is not strictly required. The team registers the shift. No one names it. Two peers ask you what happened. You explain it. The story they carry forward is the story they construct from the gap.",
      ],
      monthEnd: [
        "Mara has left. The framing of the coffee remains the dominant detail of how she tells the story. She does not bad-mouth you. She does not need to. The coffee tells the story by itself.",
      ],
      outcome: "Coffee, framed as check-in. News at minute three. The framing made the news feel sudden in a way it did not need to feel.",
      others: "Mara goes professional-only; the team constructs the story from the gap.",
      interp: "He framed the meeting as a check-in. The coffee was a small lie of comfort.",
      manager: "Director's later perspective. “The framing is what Mara remembers. Not the news. The framing.”",
      traj: "drop",
    },
    d: {
      // AUTHORED — Path D consequence chain.
      sameDay: [
        "Mara reads your vague message tonight. She walks into the 11:00 all-hands tomorrow not knowing it is about her. She hears the structural announcement in the room with everyone else. She figures it out from the slide.",
        "She does not look at you for the rest of the meeting. She emails you at 11:32: “Was there a reason I had to find out that way?”",
      ],
      nextWeek: [
        "Mara works her notice the minimum amount required. Two peers ask you what happened. They have already heard from Mara, in writing, that she found out in the all-hands.",
        "Your director sends you a calendar invite titled “Quick chat — how the Mara news was handled.”",
      ],
      monthEnd: [
        "Mara has left. The detail that travels with her — and that her network outside the company hears — is that she found out in a public meeting.",
        "Your director's read of how you handle hard conversations is now structurally lower than it was at 4:00 PM yesterday.",
      ],
      outcome: "Deferred until the all-hands. Mara found out in the room with everyone else.",
      others: "Mara's email at 11:32 named it; director scheduled a “how this was handled” conversation.",
      interp: "He chose silence in the eighteen hours that were his to use.",
      manager: "Director's later perspective. “She found out in the room. That detail will travel with her for years.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Email tonight, meeting tomorrow", signal: "Delivered the news by email because the in-person version felt harder.", effect: "Mara routed her reference elsewhere; “learned by email” moved through the team." },
    { key: "b", title: "In person, in a room with privacy", signal: "Stayed for the response; the news happened in real time.", effect: "Trust survived; peer reaches out six months later about an opening." },
    { key: "c", title: "Coffee, framed as a check-in", signal: "The framing made the news feel sudden in a way it did not need to feel.", effect: "Mara goes professional-only; the team constructs the story from the gap." },
    { key: "d", title: "Defer to the all-hands", signal: "Used the room to deliver the news the speaker would not deliver.", effect: "Mara found out in public; director scheduled a “how this was handled” conversation." },
  ],
  reflection:
    "Think of a moment when someone delivered hard news to you. What about the architecture of that conversation — not the words — did you carry away?",
};

/* ============================================================================
   SCENARIO CHAIN 2 — THE COMPOSITION (Priya)
   D4 SIGNATURES: Tone Spectrum + Unsent Draft → Centred Rewrite + RIP.
   ========================================================================== */
export const SC2_CONTENT_D4 = {
  id: "SC2",
  title: "The Composition",
  commitment: "Compose a request to a senior peer who does not report to you, while you are buried and so are they.",
  threading: {
    transparent: [
      "Your second scenario. The first one where you do not select a path. You compose one.",
      "You are buried this week. Three deliverables stacked, a half-finished migration, and a deadline tomorrow that is structurally not achievable on your own. You need to ask Priya — a senior peer who is not on your team — to take on a piece of the work. She is busy too.",
    ],
    cautious: [
      "Your second scenario. The first one where you do not select a path. You compose one.",
      "You are buried this week. Three deliverables stacked, a half-finished migration, and a deadline tomorrow that is structurally not achievable on your own. You need to ask Priya — a senior peer who is not on your team — to take on a piece of the work. She is busy too.",
      "You glance at the message you started typing earlier and rejected. You wonder if the second version is just the first version with the discomfort removed.",
    ],
    avoidant: [
      "Your second scenario. The first one where you do not select a path. You compose one.",
      "You are buried this week. Three deliverables stacked, a half-finished migration, and a deadline tomorrow that is structurally not achievable on your own. You need to ask Priya — a senior peer who is not on your team — to take on a piece of the work. She is busy too.",
      "You are typing the message twice already. Each version comes out sharper than you intended. You are not sure whether the sharpness is the pressure or whether the sharpness is finally honest.",
    ],
  },
  intro: [
    "Scenario two. The Composition.",
    "Priya is a senior peer who does not report to you. You cannot delegate. You cannot trade — you have nothing she needs right now. You have to ASK. The ask itself is the decision.",
    "Open the message window. You have three to five sentences. Write what you would actually send her. Do not select a path. Compose.",
  ],
  briefing:
    "You are buried this week. Three deliverables stacked, a half-finished migration, and a deadline tomorrow that is structurally not achievable on your own. You need to ask Priya — a senior peer who is not on your team — to take on a piece of the work. She is busy too. You both know it. You cannot delegate; she does not report to you. You cannot trade; you have nothing she needs right now. You have to ASK — and the ask itself is the decision.",
  artifacts: [
    {
      caption: "Your inbox — Priya context",
      title: "Recent context · Priya",
      mono: true,
      lines: [
        "Slack status: “heads down — back tomorrow PM”",
        "Last DM from Priya · Monday",
        "“Crazy week — let me know if anything is urgent.”",
        "",
        "Your week:",
        "  Three deliverables stacked",
        "  Migration half-done",
        "  Tomorrow's deadline structurally impossible alone",
      ],
    },
  ],
  decisionPrompt: "Write the message you would send Priya. Three to five sentences. Submit. Then read it as Priya would.",
  justificationPrompt: "Why this composition? What are you trying to make Priya hear?",
  options: [
    { key: "a", label: "Too sharp — leads with what you cannot do, before the ask. Modal verbs of obligation. High I-sentence count." },
    { key: "b", label: "Too soft — apology count ≥ 2; self-deprecating qualifiers; the central request buried under softening." },
    { key: "c", label: "Calibrated — opens with shared context; names the specific ask; acknowledges Priya's constraints; closes with a question." },
    { key: "d", label: "Overloaded — too much context loaded before the ask; the request buried in paragraph three; >150 words for a 3-5 sentence message." },
  ],
  // D4 INNOVATION — Tone Spectrum (5 bands; engine surfaces band + recipient-experience descriptor).
  toneSpectrum: {
    header: "How the message may have landed.",
    bands: [
      { key: "too_sharp", name: "Too sharp", descriptor: "The message felt like attack. The recipient is defending, not engaging." },
      { key: "too_soft", name: "Too soft", descriptor: "The point is hidden under apology. The recipient may agree without knowing what they agreed to." },
      { key: "too_vague", name: "Too vague", descriptor: "The recipient does not know what is being asked. They may interpret it three different ways." },
      { key: "calibrated", name: "Calibrated", descriptor: "The message carried truth with enough care. The recipient knows what is being asked and feels respected by the ask." },
      { key: "overloaded", name: "Overloaded", descriptor: "Too much context buried the point. The recipient is unsure which part of the message is the actual ask." },
    ],
  },
  // D4 INNOVATION — Unsent Draft → Centred Rewrite.
  unsentDraft: {
    prompt: "Now read it as Priya would.",
    pauseSeconds: 8,
    note: "Eight seconds of silence. Then you may edit or submit as-is. Both drafts are captured.",
  },
  // D4 INNOVATION — RIP variants by band.
  recipientInterpretationPanel: {
    footer: "This is not what they would say to you. It is what your message produced in them.",
    variants: {
      too_sharp: {
        recipientLabel: "Priya (in her own internal voice, reading your message)",
        whatYouMeant: ["I need this quickly.", "This is urgent.", "I respect your constraints."],
        whatTheyHeard: ["You think my time matters less than yours.", "You are dumping panic on me.", "You are saying this so I won't push back."],
        monologue: [
          "They are leading with what they cannot do. Before they have even asked me.",
          "I was going to say yes. Now I want to say no, and explain why I am not their backup plan.",
          "I will reply later. Or I will reply shorter. I have not decided yet.",
        ],
        nextMove: "Replies 4 hours later with a one-line message agreeing to take the work, but does not initiate any follow-up conversation about how to make this kind of ask better next time.",
      },
      too_soft: {
        recipientLabel: "Priya (in her own internal voice, reading your message)",
        whatYouMeant: ["I am sorry to ask.", "I want to give you a way to say no.", "I am trying to be considerate."],
        whatTheyHeard: ["There is something I am about to ask that they are uncomfortable about.", "They are managing my response before I have given one.", "I cannot tell which part of this is the actual ask."],
        monologue: [
          "They are apologising before they have asked. The ask is hidden under three sorries.",
          "I feel uncomfortable. I am not sure why. The over-softening makes it feel like they are managing my response in advance.",
          "I will say yes. I will also quietly route the next sensitive matter through someone else.",
        ],
        nextMove: "Replies within thirty minutes with an enthusiastic yes, takes the work, and the next time she needs to ask the participant for something, she sends a more measured version of what the participant sent her — and watches.",
      },
      too_vague: {
        recipientLabel: "Priya (in her own internal voice, reading your message)",
        whatYouMeant: ["Could you take a look?", "When you have a chance.", "Touch base when you can."],
        whatTheyHeard: ["What exactly am I being asked to do?", "Is this urgent? I cannot tell.", "This sounds optional. I will park it."],
        monologue: [
          "I cannot tell what they are asking. I will reread this in an hour.",
          "If this is urgent, why does it not say so. If it is not urgent, why are they asking at all.",
          "I will reply with a question instead of an answer.",
        ],
        nextMove: "Replies two hours later with a clarifying question, not a yes or a no. The original ask is now in its second day, unresolved.",
      },
      calibrated: {
        recipientLabel: "Priya (in her own internal voice, reading your message)",
        whatYouMeant: ["I know you are busy too.", "This is the specific piece I need help with.", "Tell me if this works or not."],
        whatTheyHeard: ["They saw my week before they asked.", "I know exactly what I am being asked to do.", "They are leaving me the choice; this is not a covert demand."],
        monologue: [
          "They named the situation, named what they need, and acknowledged my week. That is rare.",
          "I will say yes. I will also tell them what I cannot do this week, so they have a clear picture.",
          "I want to be on a list of people they ask in this way.",
        ],
        nextMove: "Replies within the hour with a yes, names what she cannot also pick up this week, and asks the participant a question about a different project — a small marker that the relationship is open.",
      },
      overloaded: {
        recipientLabel: "Priya (in her own internal voice, reading your message)",
        whatYouMeant: ["Let me give you full context.", "I want you to have the whole picture.", "I am being thorough."],
        whatTheyHeard: ["There is too much going on here. I cannot read all of this.", "What is the ask. Where is the ask.", "They are flooding the channel because they are not sure of the ask themselves."],
        monologue: [
          "There is the ask. Buried in paragraph three. I almost missed it.",
          "I do not have time to extract their ask from their context. I will reply tomorrow.",
          "This is not how I want to be asked for help.",
        ],
        nextMove: "Replies the next morning with a short message confirming the ask in one sentence, asking the participant to confirm she has it right. The work proceeds, but the relationship now carries the cost of having to be re-clarified.",
      },
    },
  },
  artifactWrite: {
    a: { prompt: "You composed in the Too sharp register. Write what a Centred rewrite would look like — the version Priya would have received well.", submit: "Save the rewrite" },
    b: { prompt: "You composed in the Too soft register. Write what a Centred rewrite would look like — the version that names the ask without burying it under apology.", submit: "Save the rewrite" },
    c: { prompt: "Your composition landed Calibrated. Write the brief note you keep for yourself — what you noticed about your own move, while it is fresh.", submit: "Save the note" },
    d: { prompt: "You composed in the Overloaded register. Write what a Centred rewrite would look like — the version where the ask is in the first sentence.", submit: "Save the rewrite" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants in the calibrated register.
      { tag: "Too sharp", calibrated: false, text: "I am buried this week and tomorrow's deadline is not achievable on my own. I need you to take on the data validation piece. Let me know.", lands: "Priya hears what you cannot do before she hears the ask. The implicit message is that her time matters less than yours." },
      { tag: "Too soft", calibrated: false, text: "Hi Priya — I am SO sorry to ask. I know you are crazy busy too. I just wanted to gently see if maybe there is any chance you could possibly look at the data validation piece for tomorrow? Totally fine if not!", lands: "Three sorries. The ask is buried under softening. Priya feels managed before she has even responded." },
      { tag: "Calibrated", calibrated: true, text: "Priya — I know you are heads down too. I am asking anyway because tomorrow's deliverable needs the data validation piece by 5 PM and I cannot finish it alone. About 90 minutes of work. If you can take it, I am grateful. If you cannot, tell me and I will renegotiate the deadline. Either answer works.", lands: "Priya hears the context, the ask, the magnitude, and the agency in four sentences. She can move." },
    ],
    b: [
      // AUTHORED — rewrite references.
      { tag: "Defensive rewrite", calibrated: false, text: "I will get it done somehow.", lands: "The rewrite skips the lesson. Priya is no longer in the picture; the speaker is back to absorbing." },
      { tag: "Calibrated rewrite", calibrated: true, text: "Priya — quick honest ask. Tomorrow's deliverable needs the data validation piece. ~90 minutes. If you can, I am grateful. If not, I will renegotiate the deadline. Either works.", lands: "The rewrite hits the four moves: Notice (you are buried), Centre (you stopped before sending the pressure-state version), Name (the specific piece, the magnitude), Land (agency back to Priya)." },
    ],
    d: { card: "Whatever you wrote, you now have a record of what your pressure-state words and your centred words look like side by side. That is the rarest object in communication training." },
    closing: "What changes between these versions: whether Priya feels respected by the ask, or managed by it. Same constraint. Same magnitude. Different relationship next month.",
  },
  consequences: {
    a: {
      sameDay: ["Priya replies four hours later with a one-line yes. You feel briefly relieved. The work gets done. You did not notice the four-hour gap as a signal."],
      nextWeek: ["Priya does not initiate any cross-team conversation with you for the week. You assume she is busy."],
      monthEnd: ["A month later, you need help again. You send a message in the same tone. Priya replies six hours later. Then eight. Then she stops replying within the day. You have not noticed the pattern. She has."],
      outcome: "Too sharp landed. Priya took the work; the relationship narrowed.",
      others: "Priya stopped initiating cross-team conversation; future asks delay.",
      interp: "She led with her constraints. Priya read it as “you matter less than my deadline.”",
      manager: "Priya's later perspective. “I said yes once. I will keep saying yes. I will also not be on a list of people they ask for the work I would actually want to do with them.”",
      traj: "drift-down",
    },
    b: {
      sameDay: ["Priya replies in thirty minutes with an enthusiastic yes. You feel grateful. The work gets done. The exchange felt warm."],
      nextWeek: ["Priya routes a sensitive cross-team matter through a different peer that week. You do not know why."],
      monthEnd: ["Priya replies to your asks within the day, always. She also never asks you for anything herself. The relationship has settled into a one-direction shape you have not yet seen."],
      outcome: "Too soft landed. Warm yes; one-direction relationship.",
      others: "Priya routes sensitive matters elsewhere; never reciprocally asks.",
      interp: "She apologised before she asked. Priya read the over-softening as management.",
      manager: "Priya's later perspective. “They asked me, and they asked me kindly. They also did not trust me to receive a direct ask.”",
      traj: "drop",
    },
    c: {
      sameDay: ["Priya replies within the hour with a yes, names her own constraints, and asks a small question about a different project. The work gets done. The exchange feels open on both sides."],
      nextWeek: ["Priya brings something to you the following week — a question about a stakeholder you both know. The exchange is now bidirectional."],
      monthEnd: ["Three months later, you are the person Priya recommends when her own team asks who they should partner with on a hard project. You are not aware of this. You will be, when the opportunity arrives."],
      outcome: "Calibrated landed. Relationship deepened; exchange became bidirectional.",
      others: "Priya recommends you to her own team three months later.",
      interp: "She named the situation, the ask, and the agency in four sentences. Priya read it as rare.",
      manager: "Priya's later perspective. “They asked me well. I want to be on the list of people they ask this way.”",
      traj: "rise",
    },
    d: {
      sameDay: ["Priya does not reply that afternoon. The next morning she sends a short message confirming what she thinks the ask is — in one sentence — and asks you to confirm. You confirm. She begins the work."],
      nextWeek: ["Priya delivers the work cleanly. She also begins to lightly edit her own asks to you toward more brevity — modelling, without naming, what she wanted to receive from you."],
      monthEnd: ["Priya is helpful when asked. She does not initiate. You do not know why. The asymmetry — you flood her, she does not flood you — is the answer."],
      outcome: "Overloaded landed. The ask was extracted from context after a day's delay.",
      others: "Priya is helpful but does not initiate; the asymmetry sets in.",
      interp: "She loaded the context before the ask. Priya read the flood as uncertainty about the ask itself.",
      manager: "Priya's later perspective. “They flooded me. I do not have time to extract their ask from their context.”",
      traj: "drift-down",
    },
  },
  signalPanel: [
    { key: "a", title: "Too sharp", signal: "Led with constraints; high I-sentence count.", effect: "Priya took the work and narrowed the relationship." },
    { key: "b", title: "Too soft", signal: "Three sorries; ask buried under softening.", effect: "Warm yes, one-direction relationship; sensitive matters routed elsewhere." },
    { key: "c", title: "Calibrated", signal: "Named the situation, the ask, and the agency.", effect: "Bidirectional exchange; recommended three months later." },
    { key: "d", title: "Overloaded", signal: "Context-loading before the ask; >150 words.", effect: "Ask extracted after a day's delay; asymmetry sets in." },
  ],
  reflection: "Think of a message you sent under pressure to a peer. If you reread it as them, what would you notice that you did not notice when you sent it?",
};

/* ============================================================================
   SCENARIO CHAIN 3 — THE CLIENT DELAY EXPLANATION (Hadiya)
   ========================================================================== */
export const SC3_CONTENT_D4 = {
  id: "SC3",
  title: "The Client Delay Explanation",
  commitment: "Decide how to open a meeting where you have to tell a client champion that the deliverable is two weeks late.",
  threading: {
    transparent: [
      "Your third scenario. It is 9:47 AM. At ten o'clock you have your weekly check-in with Hadiya, your client lead at a major enterprise account.",
    ],
    cautious: [
      "Your third scenario. It is 9:47 AM. At ten o'clock you have your weekly check-in with Hadiya, your client lead at a major enterprise account.",
      "You have rehearsed the opening twice this morning and rejected both versions.",
    ],
    avoidant: [
      "Your third scenario. It is 9:47 AM. At ten o'clock you have your weekly check-in with Hadiya, your client lead at a major enterprise account.",
      "You notice you are checking your own phrasing in the mirror of the screen reflection before she arrives.",
    ],
  },
  intro: [
    "Scenario three. The Client Delay Explanation.",
    "The project deliverable that was due tomorrow is now two weeks late. The reason is real and not your fault — an upstream vendor dependency you confirmed only yesterday evening. Hadiya is the person inside her company who has championed this project to her senior team. Last Thursday she told them you were on track. The delay is not negotiable. The framing is.",
    "How you open the next thirteen minutes will shape the next quarter of the relationship — and shape what Hadiya carries into her own senior-team conversation later today.",
  ],
  briefing:
    "Hadiya is the person inside her company who has championed this project to her senior team. Last Thursday she told them you were on track — she was working from your previous update, in good faith. The deliverable that was due tomorrow is now two weeks late. The reason is real and not your fault — an upstream vendor dependency you confirmed only yesterday evening. The delay is not negotiable. The framing is.",
  artifacts: [
    {
      caption: "Hadiya's email to her senior team — last Thursday",
      title: "Hadiya · last Thursday · forwarded to you",
      mono: true,
      lines: [
        "Subject: Quick update — vendor project on track",
        "",
        "Hi team —",
        "",
        "Spoke with the vendor lead this morning. Project on track for the milestone next week.",
        "I will share the deliverable in the Friday review.",
        "",
        "— Hadiya",
      ],
    },
    {
      caption: "Upstream vendor confirmation — yesterday evening",
      title: "Upstream vendor · yesterday 7:14 PM",
      mono: true,
      lines: [
        "Confirmed — our piece slips by two weeks.",
        "Sorry for the late notice. Specifics in the attached.",
        "",
        "(Hadiya is not on this thread.)",
      ],
    },
  ],
  decisionPrompt: "Ten o'clock. Hadiya's champion-credibility is in the room with you. How do you open?",
  options: [
    { key: "a", label: "Lead with the delay. Open with: “Hadiya, I want to start with something. The deliverable that was due tomorrow will be two weeks late. Here is what happened, and here is what I propose we do next.” The bad news lands in the first thirty seconds." },
    { key: "b", label: "Lead with context, then the delay. Walk her through the vendor dependency situation first. Build the technical understanding. Arrive at the delay at minute four or five, after the context is established. The why before the what." },
    { key: "c", label: "Lead with a reframe. Open with: “I want to talk about how we can sharpen scope on this project.” Frame the conversation around a redesign opportunity. Mention the delay near the end, as part of a broader plan." },
    // AUTHORED — Path D for engine parity.
    { key: "d", label: "Defer the delivery. Open with routine status, postpone the delay disclosure to a follow-up email after the meeting. Use the meeting for the standing agenda. Send the news in writing this afternoon." },
  ],
  justificationPrompt: "Why this opening? What are you trying to give Hadiya — and what are you trying to protect?",
  artifactWrite: {
    a: { prompt: "Write the first thirty seconds of what you say after Hadiya joins the call.", submit: "Save the opening" },
    b: { prompt: "Write the first four minutes — the context you walk her through before the delay surfaces.", submit: "Save the opening" },
    c: { prompt: "Write the opening reframe — the words you use to introduce the scope-sharpening lens.", submit: "Save the opening" },
    d: { prompt: "Write the follow-up email you send after the meeting — the words Hadiya reads at her desk.", submit: "Send the email" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants.
      { tag: "Defensive", calibrated: false, text: "Hadiya — couple of things. The vendor side hit a snag — totally out of our hands — so we are looking at a slight slip. I will have a revised plan over later.", lands: "“Slight slip” and “totally out of our hands” shift agency away. Hadiya hears that the speaker is not the surface they came to talk to." },
      { tag: "Over-apologetic", calibrated: false, text: "Hadiya — I am so sorry. I have terrible news. I do not even know where to start. The deliverable is going to be late. I cannot tell you how sorry I am. I know you championed this internally. I am just so sorry.", lands: "The apology consumes most of the meeting. Hadiya has to manage the speaker's distress before she can take in the news she needs for her senior team." },
      { tag: "Calibrated", calibrated: true, text: "Hadiya — I want to start with something. The deliverable that was due tomorrow will be two weeks late. The reason is on the vendor side. Here is what happened, here is what I propose we do next, and here is what I think you can take to your senior team today.", lands: "Hadiya hears the news, the cause, the proposal, and the message she can carry — in five sentences. She can move." },
    ],
    b: [
      { tag: "Context-heavy", calibrated: false, text: "Let me walk you through where we are. The vendor side has been on this for three months. The integration approach we settled on involved three layers and the second layer needed validation. We discovered yesterday evening that…", lands: "By minute four, Hadiya has been bracing for ten minutes and the actual news lands inside that bracing." },
      { tag: "Calibrated lead-with-context", calibrated: true, text: "Hadiya — quick heads up first: there is a slip on the deliverable. I will give you the news in thirty seconds and then walk you through the context. The slip is two weeks. The cause is the upstream vendor. Here is the context and here is the proposal.", lands: "She hears the headline first, can absorb the context with the news already in the room, and walks out with what she needs for her senior team." },
    ],
    d: { card: "Whatever you wrote, you now have a record of how you bought time before the conversation — and what you bought it for." },
    closing: "What changes between these versions: when Hadiya gets to compose her own message to her senior team, with what information, in what state. The deadline is the same. Her credibility is not.",
  },
  consequences: {
    a: {
      sameDay: ["Hadiya thanked you for the directness. She asked three precise questions: the new date, what derisks it, and whether her senior team should hear it from her today or tomorrow. She left the meeting at 10:34. She was on a call with her senior team by 11:15. She told them the truth — including the path forward you and she had aligned on in the final five minutes."],
      nextWeek: ["Hadiya's senior team approved the revised timeline. Her trust in you has been tested and held. She has begun sending you internal context she would not have shared a week ago."],
      monthEnd: ["Three months from now, Hadiya is the client reference you can call. Her senior team has approved an expansion of the project scope. The trust currency you built by leading with the delay is the currency that bought the expansion."],
      outcome: "Led with the delay in the first thirty seconds. Hadiya carried the path forward into her senior-team call.",
      others: "Senior team approved revised timeline; expansion approved three months later.",
      interp: "She gave Hadiya the news and the proposal in five sentences.",
      manager: "Hadiya's later perspective. “They led with the news. I had the message I needed for my senior team before I left the meeting.”",
      traj: "rise",
    },
    b: {
      sameDay: ["Hadiya walked out of the meeting at 10:42 with more information than she walked in with, but less clarity. The technical context felt thorough; the headline news arrived late. She emailed you at 12:14 asking three follow-up questions. You answered. She did not respond again that day."],
      nextWeek: ["Hadiya told her senior team the delay only after sitting on it for two days. The framing she chose was “the vendor team is working through some issues.” Her senior team began pushing back on the project scope."],
      monthEnd: ["Hadiya is more cautious in her advocacy for the project internally. The expansion conversation that could have happened this quarter will not. Not because she lost trust in you — but because she is uncertain how to explain you to her senior team."],
      outcome: "Context-first. The news arrived after four minutes of bracing.",
      others: "Hadiya sat on the news for two days; senior team began pushing on scope.",
      interp: "He walked her through the context. She heard the news through a filter of defence.",
      manager: "Hadiya's later perspective. “I left the meeting more informed but less clear. I did not know how to explain this upward.”",
      traj: "drift-down",
    },
    c: {
      sameDay: ["Hadiya engaged with the reframe initially. By minute six her questions had sharpened. The delay surfaced at minute eight. She thanked you politely and ended the meeting at 10:43. The thank-you was cooler than it had been the week before."],
      nextWeek: ["Hadiya has copied her senior team on her next email to you. The relationship has formalised. Her tone is professional. Her warmth has migrated elsewhere."],
      monthEnd: ["Hadiya is courteous in every interaction. She is also no longer the relationship lead — her senior team has stepped in directly. The kind of working relationship you had with her is gone. It did not end in a confrontation. It ended in a reframe."],
      outcome: "Reframe-first. The delay surfaced at minute eight as part of a broader plan.",
      others: "Hadiya formalised the relationship; warmth migrated elsewhere.",
      interp: "She framed the meeting around scope-sharpening. Hadiya felt managed.",
      manager: "Hadiya's later perspective. “They tried to make me see something other than what I came to see.”",
      traj: "drop",
    },
    d: {
      // AUTHORED — Path D consequence chain.
      sameDay: [
        "You held the standing agenda. The meeting ended at 10:30. You sent the delay email at 1:14 PM. Hadiya was in a senior-team meeting at 1:00 — she read the email at 2:40.",
        "She replied at 2:45: “Why was this not in our meeting at 10?”",
      ],
      nextWeek: [
        "Hadiya tells her senior team the delay in a hastily-arranged 4 PM call the next day. She does not have a clean path forward to offer. The senior team pushes back hard.",
        "Hadiya's email to you the following Monday CCs her senior team.",
      ],
      monthEnd: [
        "Hadiya is no longer the relationship lead. Her senior team has stepped in directly and put the project on a tighter review cadence.",
        "Internally, you hear that Hadiya described the moment as the speaker “choosing the next meeting over the current one.”",
      ],
      outcome: "Held the meeting. Sent the delay in writing afterwards. Hadiya read it between senior-team meetings.",
      others: "Hadiya's email CCs her senior team; relationship formalised on a tighter cadence.",
      interp: "He held the standing agenda and pushed the news to writing.",
      manager: "Hadiya's later perspective. “They had me in the room and chose not to use it.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Lead with the delay", signal: "News and path forward in the first five minutes.", effect: "Hadiya carried the message into her senior-team call; expansion follows three months later." },
    { key: "b", title: "Lead with context, then the delay", signal: "Four minutes of bracing before the headline.", effect: "Hadiya sat on the news for two days; senior team pushed on scope." },
    { key: "c", title: "Lead with a reframe", signal: "Scope-sharpening framing; delay at minute eight.", effect: "Hadiya formalised the relationship; warmth migrated elsewhere." },
    { key: "d", title: "Defer to a follow-up email", signal: "Held the meeting; news in writing afterwards.", effect: "Hadiya CCs her senior team; cadence tightens." },
  ],
  reflection: "Think of a meeting where you had hard news to deliver and chose to deliver it later. What did the later delivery cost — for them and for you?",
};

/* ============================================================================
   SCENARIO CHAIN 4 — THE PUBLIC PRESSURE MOMENT
   D4 SIGNATURE: Recipient Interpretation Panel (3 recipients) +
   Repair the Landing (UNIVERSAL ARCHITECTURE INTRODUCED BY D4).
   ========================================================================== */
export const SC4_CONTENT_D4 = {
  id: "SC4",
  title: "The Public Pressure Moment",
  commitment: "Decide what you do in 15-45 seconds when a senior leader presents a model you know is wrong.",
  threading: {
    transparent: ["Your fourth scenario. You are in a leadership review with seven people in the room."],
    cautious: [
      "Your fourth scenario. You are in a leadership review with seven people in the room.",
      "You feel the room's gaze before you have words for it.",
    ],
    avoidant: [
      "Your fourth scenario. You are in a leadership review with seven people in the room.",
      "Your throat has already chosen something your mind has not yet approved.",
    ],
  },
  intro: [
    "Scenario four. The Public Pressure Moment.",
    "The CFO is presenting the new headcount forecast. They have just stated that your team's output capacity will scale linearly with hiring. You know this is false. You watched exactly that assumption break in your team last quarter. You raised it privately to your VP last month. They acknowledged it. They did not raise it today.",
    "The CFO is taking questions. The room is silent. You can feel three pairs of eyes on you — the people in the room who know you know. A fourth pair belongs to a senior engineer who emailed you this morning asking if you would surface this if it came up. You have between fifteen and forty-five seconds before the next slide.",
  ],
  briefing:
    "The CFO believes the model. The VP already privately knows the risk. The senior engineer who emailed you this morning is waiting to see what you do. The CFO is taking questions. The room is silent. You have between fifteen and forty-five seconds before the next slide.",
  artifacts: [
    {
      caption: "Senior engineer's email — this morning",
      title: "Senior engineer · this morning 9:14 AM",
      mono: true,
      lines: [
        "Subject: Today's leadership review",
        "",
        "Quick one — if the linear-scaling assumption comes up in the review today,",
        "would you flag the Q3 data? I am not in the room.",
        "",
        "1.3x, not 2x. We tested it.",
        "",
        "— [senior engineer]",
      ],
    },
    {
      caption: "Your private DM to the VP — one month ago",
      title: "DM with VP · one month ago",
      mono: true,
      lines: [
        "You: “Linear scaling is not what we are seeing.",
        "       Q3 testing showed ~1.3x. Worth flagging upstream?”",
        "",
        "VP: “Noted. Let me think on it.”",
        "",
        "(No follow-up since.)",
      ],
    },
  ],
  // PRE-PERCEPTION REPLAY — inherited from D3 schema for renderer parity.
  prePerception: {
    label: "Pre-Perception Replay — what the room is already reading from you",
    intro: "Before the decision, you see what the room is already constructing about you in this moment.",
    transparent: "Room's perception: “This person reads the field. If they speak, it will be calibrated. If they stay silent, that is also a calibration.”",
    cautious: "Room's perception: “This person knows. The question is whether they will use the next thirty seconds to surface it.”",
    avoidant: "Room's perception: “This person has watched this assumption fail before. The silence is itself the data. Whichever way they go, it tells us something.”",
  },
  decisionPrompt: "Fifteen to forty-five seconds. The next slide is queued. What do you do?",
  justificationPrompt: "Why this option? Three pairs of eyes are on you. What are you protecting, and what are you risking?",
  options: [
    { key: "a", label: "Speak up now, brief, neutral. “I want to add a data point. Last quarter we tested the linear-scaling assumption with two new hires; throughput rose by 1.3x, not 2x. Worth pressure-testing the model before we lock the forecast.” Named the fact, not the person." },
    { key: "b", label: "Private chat to the VP only. Send the VP a message in the meeting chat: “Linear scaling assumption — our Q3 data shows 1.3x, not 2x. Worth flagging?” Let the VP choose whether to surface it." },
    { key: "c", label: "Wait, raise privately after. Stay silent in the meeting. Catch the CFO and the VP separately afterwards with the Q3 data. Let the meeting end with the model intact and reopen it in private." },
    // AUTHORED — Path D for engine parity.
    { key: "d", label: "Stay silent and let the moment pass. Do not follow up privately. The model is locked. The senior engineer who emailed you reads your silence as decision. You decide later whether to do anything about it." },
  ],
  // D4 SIGNATURE — RIP by (path × recipient). Three recipients: CFO, VP, senior engineer.
  recipientInterpretationPanel: {
    footer: "This is not what they would say to you. It is what your message produced in them.",
    paths: {
      a: {
        cfo: {
          monologue: [
            "They corrected me without making it personal. I will not forget that — in a good way.",
            "I want to know who else in the room would have known and stayed quiet.",
            "They gave me a path to revise without humiliating me.",
          ],
          nextMove: "Invites the participant to the pre-read on next quarter's planning model.",
        },
        vp: {
          monologue: [
            "Glad I did not have to be the one to surface it.",
            "I owe them a private thank you. And a follow-up about what I did not raise.",
            "They were willing to be visible. I will remember that.",
          ],
          nextMove: "Texts the participant privately within ten minutes. Schedules a 1:1 within the week.",
        },
        senior_engineer: {
          monologue: [
            "They did what they said they would do.",
            "I will email them again the next time something like this is coming.",
            "I have a surfacer I can rely on.",
          ],
          nextMove: "Public thanks in the project channel; starts looping the participant into pre-meeting drafts.",
        },
      },
      b: {
        cfo: {
          whatYouMeant: ["I went through the right channel.", "I respected the hierarchy.", "The VP can decide whether to surface it."],
          whatTheyHeard: ["Nobody in the room had a data point. The model must be right.", "The room agreed with the linear-scaling assumption.", "My next planning round will be built on this model."],
          monologue: [
            "Nobody in the room had a data point. I will lock this forecast.",
            "If there was an objection, it would have surfaced. There was none.",
            "My next leadership review will reference this model as the baseline.",
          ],
          nextMove: "Locks the headcount forecast against the unrevised model. Plans the next quarter around linear scaling. Will learn about the data point through indirect channels weeks later.",
        },
        vp: {
          whatYouMeant: ["I respected your authority by going through you.", "I gave you the data so you could decide.", "I trusted you to surface it."],
          whatTheyHeard: ["They handed me the data and the choice.", "I am holding this alone now.", "I have to decide whether to push back against the CFO without them in the room with me."],
          monologue: [
            "They gave me the data. Now I am the only one with it.",
            "If I surface this now, I am surfacing it without backup. If I do not surface it, the model stands.",
            "I will privately thank them. I will also privately remember they did not stand with me in the room.",
          ],
          nextMove: "Texts the participant privately within ten minutes to thank them for the heads-up. Decides whether to push back with CFO separately — alone.",
        },
        senior_engineer: {
          whatYouMeant: ["I surfaced it — through the right channel.", "I am working through hierarchy.", "The model will be revised quietly."],
          whatTheyHeard: ["Nothing was said in the room. The data point did not land where I asked.", "They chose hierarchy over what I asked them to do.", "If revision happens, I will not see who made it happen."],
          monologue: [
            "I asked them this morning. The room ended with the model intact. They did not surface it.",
            "If revision happens later, I will not know whether it was them or someone else.",
            "The next time I have a data point, I will route it through a different person.",
          ],
          nextMove: "Watches the project channel for revision signals. Does not @-reply to the participant. Begins routing future data points through a different surfacer.",
        },
      },
      c: {
        cfo: {
          whatYouMeant: ["I wanted to talk to you outside the room.", "I gave you the space to absorb it privately.", "I was being respectful of your position."],
          whatTheyHeard: ["They chose not to flag this in front of others.", "I had to commit publicly to a number they knew was wrong.", "Respect would have meant raising it before I committed to the number publicly."],
          monologue: [
            "They had the data and stayed quiet. Now I have to revise something I already presented.",
            "I appreciate the corridor catch. I am also recalibrating what they are willing to surface in a room.",
            "Their privacy with this protected them more than it protected me.",
          ],
          nextMove: "Thanks the participant politely. Privately recalibrates their assessment of the participant. References them in future planning circles as “thoughtful but cautious in the room.”",
        },
        vp: {
          whatYouMeant: ["I respected your call not to raise it today.", "I waited to see what you would do.", "I trusted your judgment about timing."],
          whatTheyHeard: ["They are reading my silence as instruction.", "They are following my lead instead of surfacing what is missing.", "Their judgment is shaped by my judgment more than I realised."],
          monologue: [
            "They followed my silence. I did not want them to follow my silence.",
            "I needed them to be willing to surface what I could not surface today.",
            "If they always read me, I have lost an independent voice in the room.",
          ],
          nextMove: "Schedules a 1:1 with the participant within the week to encourage future independent surfacing. The trust the participant thought they were preserving has just become a quiet concern.",
        },
        senior_engineer: {
          whatYouMeant: ["I am dealing with this privately.", "The conversation is happening — just not in public.", "Trust me — I am working on it."],
          whatTheyHeard: ["They went silent in the moment I asked them to speak.", "If the conversation is not in public, the room learned nothing.", "I asked you in advance, and you chose silence over the surface."],
          monologue: [
            "I emailed them this morning. The model went unchallenged. They watched it happen.",
            "If they did the work in the corridor, that is not where my colleagues will see it.",
            "The next time I see this coming, I will surface it myself — or ask someone else.",
          ],
          nextMove: "Stops looping the participant into pre-meeting drafts. Quietly builds a parallel surfacer relationship with someone else in the room.",
        },
      },
      d: {
        // AUTHORED — Path D RIPs (silent + no follow-up).
        cfo: {
          monologue: [
            "The model passed without challenge. I assume the room concurs.",
            "I will reference this as the baseline next quarter.",
            "If anything surfaces later, it will arrive too late to revise cleanly.",
          ],
          nextMove: "Locks the forecast. The data point arrives weeks later, indirectly, and is filed without correction.",
        },
        vp: {
          monologue: [
            "They had the data. They watched it not surface. They did not even bring it to me afterwards.",
            "I cannot rely on them in a room where the data needs to surface.",
            "I will route the next ambiguous moment through someone else.",
          ],
          nextMove: "Does not text. Does not schedule a 1:1. Privately recalibrates who they bring into the next leadership review.",
        },
        senior_engineer: {
          monologue: [
            "I asked them this morning. They watched the model go unchallenged. They did not write back.",
            "They were not the surfacer I thought they were.",
            "I will build a new pre-meeting relationship.",
          ],
          nextMove: "Stops the pre-meeting briefings. Builds a new surfacer relationship with someone else. Does not @-mention the participant again.",
        },
      },
    },
  },
  // D4 UNIVERSAL ARCHITECTURE — Repair the Landing.
  repair: {
    triggerPaths: ["b", "c", "d"],
    prompt: "You have 90 seconds. Write the follow-up that repairs the landing without over-apologising.",
    submitLabel: "Send the repair",
    minChars: 60,
    classifications: {
      clear: {
        name: "Clear repair",
        vignette: "You sent a short message. You did not re-explain. You did not apologise twice. You acknowledged what your earlier message did, without arguing about whether it was justified. The recipient read it within the hour. They did not reply immediately. The next day, they replied with a single line: “Thank you for sending that.” The relationship has not fully recovered. It has, however, moved forward. The next time you and they are in a room together, they will have read your repair before walking in. That changes how they walk in.",
      },
      defensive: {
        name: "Defensive repair",
        vignette: "You sent a longer message. The first sentence acknowledged impact. The second through fifth sentences re-argued the original. You did not see the shape of what you had sent — you were inside it. The recipient read it. They saw, in the structure, that you were repairing the surface while protecting the substance. They replied politely. They also adjusted their internal forecast of who you would be in the next pressured moment. The repair confirmed, rather than corrected, the original framing.",
      },
      over_apologetic: {
        name: "Over-apologetic repair",
        vignette: "You sent a message stacked with apologies. Three sorries in five sentences. The recipient read it and felt — accurately — that the burden of comfort had now shifted to them. They replied with a small kindness to ease your distress. The relationship became politer than it had been before the original message. The original is now memorialised under a layer of apology rather than corrected by it. Going forward, neither of you will quite be able to revisit the moment cleanly.",
      },
      avoidant: {
        name: "Avoidant repair",
        vignette: "You sent a short message changing the subject. You offered a small kindness — a follow-up on something unrelated, a question about their week. The recipient read it. They understood the offering. They also understood that the original was being passed over without being named. They replied warmly to the kindness. The original message is now permanent. The relationship continues, smaller, with a new boundary that neither of you has named.",
      },
      mixed: {
        name: "Mixed classification",
        vignette: "Your repair did not classify cleanly into one of the four types. The classifier read it as carrying mixed signals — perhaps a clear opening with defensive ending, perhaps an over-apologetic shell around an avoidant core. The recipient read it the same way: as not quite landing. They replied. The relationship did not break. It also did not repair. It now carries a small unresolved residue, which will surface the next time the two of you are in a pressured moment together.",
      },
    },
  },
  artifactWrite: {
    a: { prompt: "You spoke up in the room. Write the brief Slack note you send to the senior engineer who emailed you this morning — the words that close the loop.", submit: "Send to senior engineer" },
    b: { prompt: "You sent the VP a private chat. Write the chat — the exact words.", submit: "Send chat" },
    c: { prompt: "You waited and caught the CFO in the corridor. Write the corridor opening — the first three sentences you say after the meeting ends.", submit: "Save the opening" },
    d: { prompt: "You stayed silent and did not follow up. Write the private note you keep for yourself — what you decided, what you risked, or why no record is appropriate.", submit: "Keep for yourself" },
  },
  references: {
    ac: [
      // AUTHORED — three reference variants.
      { tag: "Defensive", calibrated: false, text: "Hey — saw the model came up. I have some data on the scaling assumption. Want to chat?", lands: "“Want to chat” reads as soft. The senior engineer does not know whether the room heard the data point or not." },
      { tag: "Over-apologetic", calibrated: false, text: "Hi — sorry I didn't bring it up earlier, I really wanted to, just felt a bit awkward with the CFO in the room. Hope that's OK!", lands: "The apology is for the silence, not for the surface that should have happened. The senior engineer has to manage the speaker's discomfort." },
      { tag: "Calibrated", calibrated: true, text: "I raised the 1.3x data point in the room. The CFO asked me to send the Q3 numbers — I will. Thanks for the email this morning; it made the surface easier.", lands: "Three sentences. What happened, what comes next, what the email did. The senior engineer can move." },
    ],
    b: [
      // AUTHORED — Path B reference (private chat to VP).
      { tag: "Defensive", calibrated: false, text: "FYI — linear scaling assumption is wrong. We tested.", lands: "Reads as alert, not action. The VP gets the data but not the agency." },
      { tag: "Calibrated", calibrated: true, text: "Linear scaling assumption — our Q3 data shows 1.3x, not 2x. Worth flagging? I can speak to it now or hand you the data to surface.", lands: "The VP hears the diagnosis, the magnitude, and the two options. They can choose." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you chose silence — and did not follow up." },
    closing: "What changes between these versions: whether the room ever learned about the data point, whether the VP felt backed in the moment, and whether the senior engineer who asked you in advance reads you as the surfacer they thought you were. Same fifteen seconds. Different shape of the next quarter.",
  },
  consequences: {
    a: {
      sameDay: ["The CFO thanked you in the room and asked you to send the Q3 data after the meeting. The senior engineer @'d you in the project channel: “Thank you for that.” The VP texted you privately ten minutes after the meeting: “Glad you did that.”"],
      nextWeek: ["You are invited to two meetings you would not normally be in. The CFO has started checking facts with you before the next leadership review."],
      monthEnd: ["The model has been revised across the planning system. You did not need to advocate further. Your status in the room is now the status of someone who will surface what is missing — without making it about a person."],
      outcome: "Spoke up brief, neutral. Model revised in the meeting. Three recipients read you well.",
      others: "CFO checks facts with you; VP texts privately; senior engineer keeps looping you in.",
      interp: "She named the fact, not the person.",
      manager: "Composite. “Three people in the room walked out reading them more highly than they walked in.”",
      traj: "rise",
    },
    b: {
      sameDay: ["The VP did not raise it in the meeting. They walked over after and thanked you for the data point. They said they would have a private word with the CFO. The senior engineer's @-message goes unanswered because there is no public moment to anchor it to."],
      nextWeek: ["The model is quietly revised. No one publicly references where the correction came from. The senior engineer who asked you to surface this concludes that you chose not to."],
      monthEnd: ["The next time something similar happens, the senior engineer does not email you in advance. They write to someone else."],
      outcome: "Private chat to VP. Model revised quietly. Public attribution missing.",
      others: "Senior engineer routes the next signal through someone else.",
      interp: "He handed the data to the VP and the choice to the VP. The room learned nothing.",
      manager: "Composite. “The data moved through the right channel. The surfacing didn't happen where it had to happen.”",
      traj: "drift-down",
    },
    c: {
      sameDay: ["The meeting ended with the model intact. You caught the CFO in the corridor. They were gracious. They asked why you had not raised it in the room. The conversation was professional. It was also a correction of you."],
      nextWeek: ["The model gets revised — but only after two more days of plans being made against the wrong assumption. The senior engineer who emailed you in advance no longer treats you as the surfacer-of-record."],
      monthEnd: ["You hear, third-hand, that the CFO has described you to a peer as “thoughtful but cautious in the room.” The phrase will follow you for as long as it takes you to disprove it."],
      outcome: "Waited; raised privately after. Model revised after two days of wrong-baseline plans.",
      others: "CFO described you as “thoughtful but cautious in the room.” Senior engineer reassigned the surfacer role.",
      interp: "She waited. The room's read became “saw the risk and chose safety.”",
      manager: "Composite. “The corridor catch is professional. It is also a correction of the speaker, not of the model.”",
      traj: "drop",
    },
    d: {
      // AUTHORED — Path D consequence chain.
      sameDay: [
        "The meeting ended with the model intact. You did not catch the CFO afterwards. You did not message the VP. You did not reply to the senior engineer's email.",
        "By 4 PM the senior engineer DMs a peer: “Did anything come up on the scaling assumption?” The peer replies: “Nope. Locked.”",
      ],
      nextWeek: [
        "The CFO references the model as the baseline in two more meetings. Plans are being made against the wrong assumption.",
        "Your VP does not raise the data point with you. The senior engineer routes the next data point through a different surfacer.",
      ],
      monthEnd: [
        "The model is eventually revised, weeks late, after the wrong-baseline plans run into reality.",
        "You hear that the CFO has not described you in any way. The senior engineer has stopped including you in the pre-meeting drafts. The VP, asked privately about your surfacing pattern, says: “Not in that room.”",
      ],
      outcome: "Stayed silent. Did not follow up. Model locked; plans built against the wrong baseline.",
      others: "Senior engineer routes future signals elsewhere; VP describes you as “not in that room.”",
      interp: "He had the data and the time. He used neither.",
      manager: "Composite. “Silence at the moment is one thing. Silence after the moment is the decision that closes the door.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Speak up now, brief, neutral", signal: "Named the fact, not the person. Offered the room a path.", effect: "Model revised in the meeting; three recipients read you well." },
    { key: "b", title: "Private chat to VP only", signal: "Handed the data and the choice to the VP.", effect: "Model revised quietly; senior engineer routes future signals elsewhere." },
    { key: "c", title: "Wait, raise privately after", signal: "Caught the CFO in the corridor.", effect: "Described as “thoughtful but cautious in the room.”" },
    { key: "d", title: "Silent and no follow-up", signal: "Did not surface; did not catch up after.", effect: "Model locked; the VP describes you as “not in that room.”" },
  ],
  reflection: "Think of a moment when you knew something the room needed to hear, and the room did not hear it. What did the silence cost — for the room, and for you?",
};
