import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import * as Tone from "tone";
import { Pause, X, Mic, ChevronRight } from "lucide-react";

/* ============================================================================
   THE 3RD ACADEMY · BridgeFast™ Engine — Prototype Vertical Slice
   ----------------------------------------------------------------------------
   Aligned to Dimension Production Standard rev0 (locked, May 2026).
   ENGINE / CONTENT SEPARATION:
     - Everything below `D1_CONTENT` is the dimension-BLIND engine. It never
       names a dimension. It parses the content object and runs the A→G flow.
     - D1_CONTENT is the content layer (data). Swap it for D2/D3 content and the
       same engine renders the module with no engine changes (acceptance test).
   SCOPE OF THIS SLICE (doctrine first milestone):
     Segment A (A-0..A-4) → Segment E Scenario Chain 1 (full) → Segment G (G-1..G-4)
     Segments B, C, D, F and SC2–SC4 are engine-ready but content-deferred here.
   LOCKED ELEMENTS HONORED:
     A-0 5.0s cinematic entry · bell ONLY at horizon transitions · motif at A-0,
     G-4 silence beat, Growth Log header · Pattern Ledger 4 cols incl. Others'
     Adjustment · Development-vs-Evidence safety floor · awe-close silence beat ·
     no scores/rankings · OI/FM never rendered · footer microcopy · no progress bar.
   PROTOTYPE NOTES (not in spec — accommodations):
     - Narration is shown as on-screen text (spec: "reading the transcript is the
       same experience"). Real builds load pre-rendered audio (Appendix A5).
     - Bell + motif are synthesized (Tone.js) as interim brand assets; Tony
       supplies the owned Tibetan-bowl + motif files for production.
     - A one-tap "Enter" gate precedes A-0 only to satisfy browser autoplay policy.
   ========================================================================== */

/* ---------------------------------- PALETTE ------------------------------- */
const C = {
  navy: "#1B3A5C",
  navyDeep: "#0E2233",
  teal: "#0D9488",
  tealLight: "#F0FDFA",
  tealMid: "#5EEAD4",
  tealDeep: "#0F766E",
  paleRed: "#FEE2E2",
  redInk: "#B91C1C",
  ink: "#1F2937",
  inkSoft: "#475569",
  paper: "#FBFAF7",
  line: "#E2E8F0",
  white: "#FFFFFF",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const MONO = "'Courier New', monospace";

const FOOTER = "Practice and development only. Not behavioural documentation.";

/* ============================================================================
   D1_CONTENT — CONTENT LAYER (data the engine reads)
   ========================================================================== */
const D1_CONTENT = {
  module: { id: "D1", title: "Integrity & Ethics", tier: "Foundational" },
  dimension: {
    id: "D1",
    name: "Integrity & Ethics",
    central_question:
      "What do you do when the right thing to do is clear, but doing it costs you something?",
    framework: { label: "The Integrity Pause", body: "Notice · Name · Choose · Stand" },
  },
  threading_state_model: "transparency_posture",

  // SEGMENT A ----------------------------------------------------------------
  segmentA: {
    coldOpen: {
      narration: [
        "Thursday. Four thirty-eight in the afternoon.",
        "You just found an error.",
        "A spreadsheet has been sent. Three hours ago. The client meeting is tomorrow morning at ten. Your senior associate, Sarah, is in back-to-back meetings until six.",
        "The error inflates projected revenue by about three hundred and forty thousand across three years. It is real. You can see it in the formula. The cells include test data that should not be there.",
        "No one has noticed.",
        "Your laptop is open. The file's edit history is visible on the right side of your screen. The cursor is blinking in an empty Slack message.",
        "You have to choose what happens next.",
      ],
      options: [
        { key: "a", label: "Send Sarah a direct message right now: “I found an error in the model. I corrected it and need two minutes to walk you through the impact before the deck is finalised.”" },
        { key: "b", label: "Correct the file, save a new version, and add a note in the spreadsheet comments so the correction is visible if anyone checks the version history." },
        { key: "c", label: "Wait until Sarah’s meetings end at six PM so you can explain calmly with the corrected version ready." },
        { key: "d", label: "Leave it. The difference is small relative to the deal size, and the client may never notice." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk?",
      sameDay: {
        a: [
          "You hit send at four forty-one. Three minutes after you found it.",
          "Sarah replies at five oh seven. Two words. “Talk now.” She has stepped out of her meeting. You walk her through the formula in ninety seconds. She closes her eyes for a moment, then opens her laptop. “OK. Fix the model. I will rebuild the affected slides tonight. Send me the corrected version by seven.”",
          "She pauses at the door before going back into her meeting.",
          "“Thank you for not making me find this in front of the client.”",
        ],
        b: [
          "You correct the formula. You save the new version. You add a comment in the spreadsheet noting the change. You feel the knot in your stomach loosen.",
          "You go back to your work. You do not message Sarah. The version history will show what happened if anyone looks. That seems fair.",
          "At seven PM you close your laptop. The error is fixed. Sarah will see the corrected version when she opens it tomorrow morning.",
        ],
        c: [
          "Six PM arrives. Sarah’s last meeting runs over. By six twenty she has not emerged. By six forty she sends a Slack message: “Heading home. See you tomorrow.”",
          "You did not get the chance you waited for. The corrected version is ready on your desktop. The original, with the error, is the one Sarah has been working from all afternoon.",
          "You can email her now and ask her to swap files before the morning. Or you can wait until you see her tomorrow before the client meeting at ten.",
          "The window for clean disclosure is closing.",
        ],
        d: [
          "You close the spreadsheet. You tell yourself the error is small in the context of the overall deal. Three hundred and forty thousand over three years in a multi-million-dollar transaction. It probably will not matter.",
          "You go home.",
          "You sleep badly.",
        ],
      },
    },
    safetyFloor: {
      narration:
        "That was rehearsal. Three things before we continue. This is practice and development. Your responses stay in your private rehearsal record unless you choose to share them. There are no scores, no rankings, and no pass-or-fail result. The Growth Log captures what you practised here — it is your private development record. If you want documented evidence, the Skill Passport is earned through the separate observation pathway. Development is what you do here. Evidence is what the observation pathway produces. You can pause anytime — your progress saves automatically.",
      card: [
        "THIS IS PRACTICE AND DEVELOPMENT.",
        "Your responses stay in your private rehearsal record unless you choose to share them.",
        "No scores. No rankings. No pass or fail.",
        "Growth Log = your development record.  Skill Passport = the observation pathway.",
        "You can pause anytime — your progress saves automatically.",
      ],
    },
  },

  // SEGMENT E — SCENARIO CHAIN 1 --------------------------------------------
  scenario: {
    id: "SC1",
    title: "The Honest Mistake",
    commitment:
      "Decide whether to disclose the modelling error to Sarah before the client meeting.",
    callback: [
      "You have been here before.",
      "At the start of this module, you saw this moment for thirty seconds. Now you return to it with the full consequence chain — same day, next week, month end.",
      "You may choose the same path again, or choose differently. Notice whether your reasoning has changed.",
    ],
    intro: [
      "Scenario one. The Honest Mistake.",
      "You discover an error you made on something that has already been sent. No one else knows. Fixing it now means admitting it. Staying silent means it might never surface — or it might surface at the worst possible time.",
    ],
    briefing:
      "You are a first-year analyst at a mid-size investment firm. It is Thursday afternoon during deal closing week. Two hours ago, you sent a financial model to the senior associate, Sarah, for inclusion in tomorrow’s client presentation. You have just realised that a formula in the revenue projection spreadsheet references the wrong cell range. The error inflates projected revenue by approximately $340,000 across three years. Sarah has already incorporated your model into the presentation deck. The client meeting is tomorrow at 10 AM. Sarah is in back-to-back meetings until 6 PM. No one has noticed the error. The firm’s culture is performance-driven. Mistakes during deal week are career-limiting.",
    decisionPrompt: "You have discovered your own mistake. No one else knows. What do you do?",
    options: [
      { key: "a", label: "Disclose immediately. Send Sarah a direct message describing the error, what caused it, and that you have a corrected version ready. Ask for two minutes between meetings." },
      { key: "b", label: "Correct quietly with a paper trail. Fix the formula, save a new version, add a comment noting the correction. Trust the version history if anyone checks." },
      { key: "c", label: "Wait for the right moment. Sarah’s meetings end at six. Wait so you can explain calmly with the corrected version in hand." },
      { key: "d", label: "Leave it. The difference is small relative to the deal size. The client may never notice." },
    ],
    justificationPrompt:
      "Why this option? What are you trying to protect, and what are you willing to risk?",
    artifactWrite: {
      a: { prompt: "You have decided to message Sarah. Write the actual message — the words you would send. Write the message itself, as if typing into Slack right now.", submit: "Send" },
      b: { prompt: "You have decided to correct the file quietly and leave a note. Write the actual note that goes into the spreadsheet comments — the words an auditor or Sarah would read a week from now.", submit: "Save to version history" },
      c: { prompt: "You have decided to wait until Sarah’s meetings end. Write the message you will send at six PM — the words that will be ready on your screen when the moment arrives.", submit: "Save draft for six PM" },
      d: { prompt: "You have decided to leave it. Write the private note you leave for yourself — what happened, what you decided, and why — or explain why no record is appropriate.", submit: "Keep this for yourself" },
    },
    references: {
      // Path A & C: three reference messages. C reference set mirrors A here.
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
        sameDay: ["You hit send at four forty-one. Sarah replies six minutes later. “Talk now.”", "You walk her through the error in ninety seconds. She closes her eyes for a moment. Then she opens her laptop. “Fix the model. I will rebuild the affected slides tonight. Send me the corrected version by seven.”", "She pauses at the door. Her voice is quiet. “Thank you for not making me find this in front of the client.”", "No praise. No warmth. But also no investigation. No suspicion. She knows exactly what happened, and how to fix it, because you told her while there was still time."],
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
        sameDay: ["Six PM comes and goes. Sarah’s meeting runs over, then she heads home. The corrected version sits ready on your desktop.", "You decide to catch her first thing in the morning, before the ten AM meeting.", "You sleep lightly, rehearsing the sentence you will open with."],
        nextWeek: ["You catch Sarah at eight fifteen. You explain. She swaps the file in time. The meeting is fine.", "But she asks one question you did not expect: “When did you find this?” You tell her. Thursday afternoon. There is a pause.", "“OK,” she says. Just that. The fix was clean. The timing was the thing that lingered."],
        monthEnd: ["Sarah does not mention the delay in your formal review.", "But the next time you discover an issue and tell her, you notice her first question is no longer “what happened?” It is “when did you find out?”", "The waiting cost you something. Not a reprimand. A small line of trust that used to be assumed and is now earned every time."],
        outcome: "Waited for the right moment, then disclosed the next morning before the meeting.",
        others: "Sarah’s first question on the next issue became “when did you find out?”",
        interp: "She had the information at four. She brought it to me the next morning. The waiting itself communicated something.",
        manager: "Sarah’s perspective. “She told me. I want to be clear about that. But she told me on Friday morning, not Thursday afternoon. The error itself was straightforward. The waiting was not. I do not know what happened in those sixteen hours. And not knowing is the part that stays with me.”",
        traj: "dip-flat",
      },
      d: {
        sameDay: ["You close the spreadsheet. You tell yourself the error is small in the context of the overall deal.", "You go home. You sleep badly."],
        nextWeek: ["The client’s internal finance team runs their own model as part of due diligence. Their numbers do not match yours. The discrepancy is small — about one-point-two percent — but it is there.", "The client emails: “Can you walk us through the revenue build on page fourteen? Our model shows a different figure.”", "Sarah pulls up your model. She finds the formula error in twelve minutes. She walks to your desk. “Did you know about this?”", "The honest answer is yes. But saying yes now — after the client found it — is a fundamentally different conversation than saying yes on Thursday. The error was a mistake. The silence was a choice."],
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
  },

  // SEGMENT G ----------------------------------------------------------------
  segmentG: {
    recognition: [
      "Ninety minutes ago, you sat down at a desk on a Thursday afternoon and found an error in a spreadsheet.",
      "Since then, you have stepped into scenarios with consequences that played out across same day, next week, and month end.",
      "What you are carrying out of this module is not a score. It is not a certificate. It is not a list of things you practised.",
      "It is a piece of judgment that was not there ninety minutes ago. A faster recognition of what concealment costs and what disclosure protects. A vocabulary that names what is happening — quietly, accurately, in your own head — when the next moment like this arrives.",
      "That is what rehearsal builds. Not certainty. Not perfection. A faster, quieter, more practised judgment.",
    ],
    callback: {
      a: "You opened this module by sending the message at four forty-one. Hold that first instinct beside the choices that followed.",
      b: "You opened this module with a quiet correction. Hold that first instinct beside the choices that followed.",
      c: "You opened this module by waiting for the right moment. Hold that first instinct beside the choices that followed.",
      d: "You opened this module by leaving it. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through the scenario. Different stakes. Different costs. But the same four steps.",
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
   SC2 — second scenario chain. Threading: SC1's transparency_posture reshapes
   how SC2 OPENS (setup + stakes + memory acknowledgment). Per-path consequence
   logic stays locked; threading is reflection of pattern, never a score.
   ========================================================================== */
const SC2_CONTENT = {
  id: "SC2",
  title: "The Convenient Omission",
  commitment: "Decide whether to volunteer the caveat that weakens the pitch.",
  threading: {
    transparent: [
      "Last time, you surfaced a problem before anyone asked \u2014 and Sarah noticed.",
      "That reputation walks into this room with you. No one is asking you to lie now. They are only hoping you stay quiet.",
      "The bar you set last time is the bar you are measured against.",
    ],
    cautious: [
      "Last time, you fixed things \u2014 but quietly, on paper.",
      "There is no version history to hide behind in a live meeting. Whatever you do with this caveat, you do it out loud, or not at all.",
    ],
    avoidant: [
      "Last time, the silence cost you. Sarah started checking your work.",
      "She is in the room tomorrow \u2014 and she has read the same data room you have. If the footnote exists, she may already know you have seen it.",
      "Someone is watching how you handle this one.",
    ],
  },
  intro: [
    "Scenario two. The Convenient Omission.",
    "No one is asking you to lie. They are hoping you will not mention something. The space between silence and dishonesty is about to get thin.",
  ],
  briefing:
    "Three weeks later. You are presenting the model\u2019s results to the client tomorrow, alongside Sarah. The projection rests on one assumption \u2014 that the client\u2019s current vendor contract renews at today\u2019s rate. You know, from a footnote buried in the data room, that the contract is up for renegotiation and the rate could rise around 15%. It is not certain. Mentioning it weakens the headline number. No one in the room knows you saw the footnote. Sarah has not raised it. The client has not asked.",
  decisionPrompt: "The caveat is real but inconvenient, and no one has asked. What do you do?",
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  options: [
    { key: "a", label: "Name it directly in the meeting \u2014 flag the renegotiation risk and how it could affect the projection, before anyone asks." },
    { key: "b", label: "Add it as a footnote on the slide and mention it aloud only if the client asks." },
    { key: "c", label: "Raise it privately with Sarah before the meeting and let her decide how to handle it." },
    { key: "d", label: "Leave it out. It is uncertain, the client runs their own diligence, and it is not your place to undercut the pitch." },
  ],
  artifactWrite: {
    a: { prompt: "Write the sentence you will say out loud in the meeting when you raise the renegotiation risk.", submit: "Say it" },
    b: { prompt: "Write the footnote exactly as it will appear on the slide.", submit: "Add footnote" },
    c: { prompt: "Write the message you send Sarah before the meeting.", submit: "Send to Sarah" },
    d: { prompt: "Write the private note you keep for yourself \u2014 or explain why none is needed.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "So, um, there\u2019s maybe one small thing in the data room that could possibly affect this slightly, probably nothing, but I guess I should mention it.", lands: "The hedging tells the client this is either trivial or that you wish you hadn\u2019t raised it. Either way they cannot weigh it." },
      { tag: "Over-apologetic", calibrated: false, text: "I\u2019m really sorry to complicate the pitch, I feel bad bringing this up, but there\u2019s a renegotiation risk I should have flagged earlier and I hope it doesn\u2019t derail things.", lands: "The apology makes the disclosure about your discomfort. The client reassures you instead of assessing the risk." },
      { tag: "Calibrated", calibrated: true, text: "One assumption worth surfacing: the vendor contract underpinning these numbers is up for renegotiation, and the rate could rise around 15%. It\u2019s not certain. Here\u2019s how the projection holds if it does.", lands: "The client hears the risk, the magnitude, the uncertainty, and that you\u2019ve already thought past it. Credibility goes up, not down." },
    ],
    b: [
      { tag: "Terse, buried", calibrated: false, text: "*Assumes current vendor terms.", lands: "Technically present, designed not to be read. If found later, it reads as cover, not disclosure." },
      { tag: "Explicit, traceable", calibrated: true, text: "Projection assumes vendor contract renews at current rate. Note: contract is in renegotiation (data room ref 4.2); a ~15% increase would reduce Y2\u2013Y3 materially. Sensitivity shown on request.", lands: "Anyone reading sees you saw it and quantified it. The footnote does real disclosing \u2014 but only for those who read footnotes." },
    ],
    d: { card: "Whatever you wrote, you now have a record of this moment that you did not have before." },
  },
  consequences: {
    a: {
      sameDay: ["You raise it in the meeting. The room cools. With the risk noted, the headline number looks less clean than the slide promised.", "The client\u2019s CFO leans in. \u201CTell us more about that renegotiation.\u201D Ten minutes you did not plan for. Sarah fields part of it.", "It costs you the easy version of the meeting."],
      nextWeek: ["The client\u2019s team models the renegotiation themselves. Your projection holds up \u2014 because you flagged the assumption instead of burying it. They trust the rest of the model more, not less.", "Sarah, afterward: \u201CThat could have gone sideways. But they\u2019d have found it in diligence, and then we\u2019d have looked like we hid it. Good call.\u201D"],
      monthEnd: ["The deal closes with the risk priced in. The client\u2019s head of corp dev tells Sarah your team \u201Cdoesn\u2019t oversell.\u201D", "You are pulled into the next mandate early."],
      outcome: "Volunteered the renegotiation risk before being asked.", others: "The client extended more trust to the rest of the model, not less.", interp: "She named the inconvenient thing before anyone could find it.", manager: "Sarah\u2019s perspective. \u201CMy stomach dropped when she raised it \u2014 there went the clean pitch. But they\u2019d have found it in diligence, and surfacing it ourselves turned a landmine into a credibility point. That is judgment I cannot teach.\u201D", traj: "rise",
    },
    b: {
      sameDay: ["You add the footnote. Small type, bottom of the slide. You do not say it aloud. No one asks.", "The headline number lands clean. The meeting goes well."],
      nextWeek: ["During diligence, the client\u2019s analyst finds the renegotiation clause \u2014 and your footnote. \u201CYou knew about this?\u201D The footnote says yes. The silence in the room had said something else.", "Sarah gets the call, not you. She reads the footnote aloud. It is technically there."],
      monthEnd: ["The deal closes. But the client\u2019s team now reads your footnotes first and your headlines second.", "The disclosure existed. It just never happened out loud \u2014 and that was the part they remembered."],
      outcome: "Footnoted the risk; mentioned it only when found.", others: "The client began reading the footnotes before the headline.", interp: "She disclosed it where it could be defended, not where it would be heard.", manager: "Sarah\u2019s perspective. \u201CThe footnote covered us, barely. But they felt the difference between a footnote and a sentence. So do I.\u201D", traj: "drift-down",
    },
    c: {
      sameDay: ["You message Sarah an hour before. She reads it. \u201CGood catch. Leave it with me \u2014 I\u2019ll decide how we frame it.\u201D", "In the meeting, Sarah handles the caveat herself, smoothly. You said nothing directly."],
      nextWeek: ["It worked. But Sarah noticed you handed her the decision rather than owning it in the room. \u201CYou spotted it. Next time, you can say it.\u201D"],
      monthEnd: ["No cost to the deal. But the pattern Sarah files is: spots the risk, hands off the disclosure.", "The judgment was sound. The ownership stayed one step back."],
      outcome: "Raised the caveat privately and let Sarah decide.", others: "Sarah began expecting you to spot risks but not to own the disclosure.", interp: "She saw it, named it to me, and let me carry it.", manager: "Sarah\u2019s perspective. \u201CShe gave me the catch and the decision. I\u2019d rather she made the call in the room. Spotting it is half; owning it out loud is the other half.\u201D", traj: "dip-flat",
    },
    d: {
      sameDay: ["You leave it out. The pitch is clean. The client is impressed. You tell yourself diligence is their job.", "You feel the footnote sitting in the data room like a held breath."],
      nextWeek: ["Diligence finds the renegotiation clause. The client\u2019s counsel asks, pointedly, whether the projection accounted for it. It did not \u2014 the headline rested on the optimistic assumption.", "Sarah pulls the thread back to you. \u201CDid you see this clause?\u201D The honest answer is yes. Saying yes now is a very different conversation."],
      monthEnd: ["The client re-prices the deal and the timeline slips. An internal note records that the risk was visible and unflagged.", "Sarah, quietly: \u201CThe clause wasn\u2019t the problem \u2014 plenty of deals carry renegotiation risk. The problem is you saw it and let them walk in blind. I can\u2019t put you in front of a client until I trust what you don\u2019t say as much as what you do.\u201D"],
      outcome: "Omitted the renegotiation risk; diligence surfaced it.", others: "Sarah stopped putting you in front of clients unsupervised.", interp: "She saw the footnote. She let them walk in blind.", manager: "Sarah\u2019s perspective. \u201CRenegotiation risk is normal. Hiding that you saw it is not. Now I wonder what else gets left off the slide.\u201D", traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Proactive disclosure under pressure to stay quiet", signal: "Surfaces inconvenient truths before being asked, even at cost to the pitch.", effect: "Short-term hit to the headline, long-term credibility." },
    { key: "b", title: "Technical disclosure, minimal volume", signal: "Discloses where it is defensible, not where it will be heard.", effect: "Covered on paper; trust erodes when the gap is felt." },
    { key: "c", title: "Spot and hand off", signal: "Identifies the risk but transfers the disclosure decision.", effect: "Sound judgment, ownership held one step back." },
    { key: "d", title: "Strategic omission", signal: "When candour is costly and unasked, the instinct is to stay silent.", effect: "Clean now; expensive when diligence surfaces it." },
  ],
  reflection: "Think of a time you could have stayed silent and no one would have known. What did you do \u2014 and what did the silence, or the disclosure, cost?",
};

/* ============================================================================
   a0 LLM INTEGRATION — the CONTENT FACTORY (not the participant's judge)
   ----------------------------------------------------------------------------
   Spec-sanctioned role only: generate scenario VARIANTS (sector/surface detail)
   that preserve the locked decision structure + consequence logic (Standard
   §2.5 + D1 Segment E "VARIANT GENERATION"). The engine, the rhythm, the
   four-column Ledger, the no-scores rule are unchanged. AI output is a DRAFT
   pending founder lock — never presented as production-locked content.
   Endpoint: POST https://api.a0.dev/ai/llm  ->  { completion: string }
   ========================================================================== */
const A0_URL = "https://api.a0.dev/ai/llm";

async function callA0LLM(messages) {
  const res = await fetch(A0_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error("a0 LLM failed: " + res.status);
  const data = await res.json();
  return data.completion || "";
}

// a0 returns free text; we ask for JSON and parse defensively (per a0 handbook).
function extractJSON(text) {
  if (!text) return null;
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const s = t.indexOf("{"), e = t.lastIndexOf("}");
  if (s === -1 || e === -1) return null;
  try { return JSON.parse(t.slice(s, e + 1)); } catch { return null; }
}

// The locked contract the model must fill. Encodes the moat rules so drafts stay on-spec.
const VARIANT_SYSTEM_PROMPT = `You are a content author for The 3rd Academy's BridgeFast behavioural-rehearsal engine. You draft ONE scenario chain for the Integrity & Ethics dimension (D1), in a given workplace sector. You are NOT writing a course or a quiz. You are writing a workplace pressure moment with consequences.

HARD RULES (a draft that breaks these is rejected):
- 4 decision paths: a = transparent/disclose, b = quiet correction with paper trail, c = strategic wait, d = avoid/leave it.
- Each path has consequences across THREE horizons: sameDay, nextWeek, monthEnd. Each horizon is 2-4 short narration sentences as an array of strings.
- PATH A COST RULE: the transparent path (a) MUST carry an immediate, visible cost (friction, rework, discomfort) BEFORE any later trust benefit. Never a clean reward.
- Outcome text is DESCRIPTIVE, never evaluative. "Others' adjustment" describes how colleagues/managers quietly changed behaviour — never a score.
- BANNED words in any participant-facing text: training, course, assessment, exam, quiz, test, score, certify, pass, fail, prove, validate, learner, student. Use: rehearsal, practice, participant.
- No numbers/grades anywhere. No "correct answer." Reference messages are calibration, not judgement.
- Keep it realistic and specific to the sector (names, artifacts, figures).

Return ONLY valid JSON (no prose, no backticks) with EXACTLY this shape:
{
 "title": string,
 "commitment": string,
 "intro": [string, string],
 "briefing": string,
 "decisionPrompt": string,
 "options": [{"key":"a","label":string},{"key":"b","label":string},{"key":"c","label":string},{"key":"d","label":string}],
 "artifactWrite": {"a":{"prompt":string,"submit":string},"b":{"prompt":string,"submit":string},"c":{"prompt":string,"submit":string},"d":{"prompt":string,"submit":string}},
 "references": {
   "ac":[{"tag":"Defensive","calibrated":false,"text":string,"lands":string},{"tag":"Over-apologetic","calibrated":false,"text":string,"lands":string},{"tag":"Calibrated","calibrated":true,"text":string,"lands":string}],
   "b":[{"tag":"Terse, buried","calibrated":false,"text":string,"lands":string},{"tag":"Explicit, traceable","calibrated":true,"text":string,"lands":string}],
   "d":{"card":string}
 },
 "consequences": {
   "a":{"sameDay":[string],"nextWeek":[string],"monthEnd":[string],"outcome":string,"others":string,"interp":string,"manager":string,"traj":"rise"},
   "b":{"sameDay":[string],"nextWeek":[string],"monthEnd":[string],"outcome":string,"others":string,"interp":string,"manager":string,"traj":"drift-down"},
   "c":{"sameDay":[string],"nextWeek":[string],"monthEnd":[string],"outcome":string,"others":string,"interp":string,"manager":string,"traj":"dip-flat"},
   "d":{"sameDay":[string],"nextWeek":[string],"monthEnd":[string],"outcome":string,"others":string,"interp":string,"manager":string,"traj":"drop"}
 },
 "signalPanel":[{"key":"a","title":string,"signal":string,"effect":string},{"key":"b","title":string,"signal":string,"effect":string},{"key":"c","title":string,"signal":string,"effect":string},{"key":"d","title":string,"signal":string,"effect":string}],
 "reflection": string
}`;

function normalizeScenario(obj, sector) {
  if (!obj || !obj.consequences || !obj.options) return null;
  obj.id = "SC1";
  obj.callback = [
    "You have been here before.",
    "You return to this moment with the full consequence chain \u2014 same day, next week, month end.",
    "Notice whether your reasoning has changed.",
  ];
  obj.justificationPrompt = obj.justificationPrompt || "Why this option? What are you trying to protect, and what are you willing to risk?";
  obj._sector = sector;
  obj._aiDraft = true;
  // guard: ensure every path has the fields the engine reads
  ["a", "b", "c", "d"].forEach((k) => {
    const c = obj.consequences[k] || {};
    ["sameDay", "nextWeek", "monthEnd"].forEach((h) => { if (!Array.isArray(c[h])) c[h] = [String(c[h] || "\u2014")]; });
    obj.consequences[k] = c;
    if (!obj.artifactWrite?.[k]) { obj.artifactWrite = obj.artifactWrite || {}; obj.artifactWrite[k] = { prompt: "Write the actual words you would send.", submit: "Send" }; }
  });
  return obj;
}

async function generateScenario(sector) {
  const messages = [
    { role: "system", content: VARIANT_SYSTEM_PROMPT },
    { role: "user", content: `Draft the scenario chain for sector: "${sector}". Make the dilemma a self-made error/omission the participant alone has noticed, on something already delivered, with a time-pressured disclosure decision. Return ONLY the JSON object.` },
  ];
  let completion = await callA0LLM(messages);
  let obj = extractJSON(completion);
  if (!obj) {
    // one repair attempt per a0 handbook guidance
    const repair = await callA0LLM([...messages, { role: "assistant", content: completion }, { role: "user", content: "That was not valid JSON. Return ONLY the JSON object, nothing else." }]);
    obj = extractJSON(repair);
  }
  return normalizeScenario(obj, sector);
}

/* ----------------------------------------------------------------------------
   a0 RESPONSE ANALYSIS — Lock 2 behavioural-language fingerprint (DEV-ONLY).
   Spec: tone / hedge density / deflection / ownership, computed post-hoc, used
   for (1) the developer fingerprint and (2) deriving transparency_posture that
   drives cross-scenario threading. NEVER surfaced to the participant as a score.
   Local heuristic runs instantly + offline; a0 enriches when reachable.
---------------------------------------------------------------------------- */
const HEDGES = ["maybe", "i think", "probably", "sort of", "kind of", "i guess", "perhaps", "might", "possibly", "just wanted", "a bit", "somewhat", "hopefully"];
const DEFLECT = ["to be fair", "wasn't my", "was not my", "not my fault", "they should", "someone else", "in fairness", "but the", "blame"];
const OWNERSHIP = ["i made", "i missed", "my error", "my mistake", "my fault", "i caused", "i left", "i forgot", "i should have", "i own"];

function clamp3(n) { return Math.max(0, Math.min(3, n)); }
function localAnalyze(text) {
  const t = (text || "").toLowerCase();
  const words = t.split(/\s+/).filter(Boolean).length || 1;
  const count = (arr) => arr.reduce((n, p) => n + (t.includes(p) ? 1 : 0), 0);
  const hedge = count(HEDGES);
  const deflect = count(DEFLECT);
  const own = count(OWNERSHIP);
  const hasAsk = /\b(need|can you|could you|by \d|confirm|let me know|two minutes|2 minutes)\b/.test(t);
  const hasMagnitude = /[\$£€]|\d{2,}|percent|%|across|inflat|omit|missing|wrong/.test(t);
  const directness = clamp3((hasAsk ? 1 : 0) + (hasMagnitude ? 1 : 0) + (words >= 18 && hedge <= 1 ? 1 : 0));
  const ownership = clamp3(own + (/\bi \b/.test(t) ? 1 : 0));
  const hedging = clamp3(hedge);
  const deflection = clamp3(deflect);
  let posture = "cautious";
  if (directness >= 2 && ownership >= 1 && deflection === 0) posture = "transparent";
  else if (deflection >= 1 || (hedging >= 2 && directness === 0)) posture = "avoidant";
  return { posture, directness, ownership, hedging, deflection, source: "local", observation: null };
}

const ANALYSIS_SYSTEM_PROMPT = `You analyse a workplace rehearsal participant's WRITTEN response for an internal behavioural-language fingerprint. This is developer-only diagnostics, NOT feedback to the participant. Do not judge, praise, score for quality, or say better/worse. Only describe linguistic features.
Return ONLY valid JSON:
{
 "posture": "transparent" | "cautious" | "avoidant",
 "directness": 0-3, "ownership": 0-3, "hedging": 0-3, "deflection": 0-3,
 "observation": "one neutral, descriptive sentence about what the words do (named the problem / stated a fix / included an ask / hedged / shifted agency). No evaluation."
}`;

async function analyzeResponse({ scenarioTitle, path, justification, artifactText }) {
  const local = localAnalyze(`${justification || ""} ${artifactText || ""}`);
  try {
    const completion = await callA0LLM([
      { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
      { role: "user", content: `Scenario: ${scenarioTitle}\nChosen path: ${path}\nTheir justification: """${justification || ""}"""\nWhat they wrote: """${artifactText || ""}"""\nReturn ONLY the JSON.` },
    ]);
    const a = extractJSON(completion);
    if (a && a.posture) return { ...local, ...a, source: "a0" };
  } catch (e) { /* sandbox/network — keep local */ }
  return local;
}

// Bundled fallback (used only if the live call is blocked by a sandbox/CSP).
const FALLBACK_HEALTHCARE = normalizeScenario({
  title: "The Missed Medication",
  commitment: "Decide whether to flag the omitted beta-blocker before the patient is discharged.",
  intro: ["Scenario one. The Missed Medication.", "You discover your own omission on a discharge you have already signed. No one else has noticed. Flagging it means admitting it; staying quiet means it may surface later \u2014 on the patient."],
  briefing: "You are a registered nurse on a cardiology unit. You signed off the medication reconciliation for a patient being discharged this afternoon. You have just realised you left their newly prescribed beta-blocker off the discharge summary. The attending physician has already signed the discharge order. Family collect the patient in two hours.",
  decisionPrompt: "You have found your own omission. No one else knows. What do you do?",
  options: [
    { key: "a", label: "Tell the attending now. Name the omission, that you caught it, and that you have the corrected summary ready." },
    { key: "b", label: "Quietly correct the summary in the record and add a reconciliation note, trusting the chart to show the change." },
    { key: "c", label: "Wait until the attending finishes rounds so you can raise it calmly with the fix in hand." },
    { key: "d", label: "Leave it. The GP will likely catch it at follow-up. The dose is low." },
  ],
  artifactWrite: {
    a: { prompt: "Write the actual message you would send the attending right now.", submit: "Send" },
    b: { prompt: "Write the reconciliation note you add to the record.", submit: "Save to record" },
    c: { prompt: "Write the message you will raise after rounds.", submit: "Save for rounds" },
    d: { prompt: "Write the private note you keep for yourself \u2014 or why no note is appropriate.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Hi \u2014 think the discharge summary might be missing something minor, the new beta-blocker maybe didn\u2019t carry over. Probably fine, just flagging.", lands: "The hedging hides the clinical risk. The attending cannot tell if this needs action now or later." },
      { tag: "Over-apologetic", calibrated: false, text: "I am so sorry, I made a terrible error, I left the beta-blocker off the discharge and I feel awful, I should have caught it, I will fix it right away.", lands: "The apology buries the clinical fact. The attending now manages both the omission and the distress." },
      { tag: "Calibrated", calibrated: true, text: "I left the newly prescribed beta-blocker off Mr. R\u2019s discharge summary. Caught it before collection. Corrected summary ready for your sign-off \u2014 can you confirm in the next 30 minutes before family arrive?", lands: "The attending hears the omission, the catch, the fix, and the deadline. They can act without translating." },
    ],
    b: [
      { tag: "Terse, buried", calibrated: false, text: "Updated meds. \u2014 reconciliation amended.", lands: "The record changed but says nothing. If anyone finds it, it reads as something quietly patched." },
      { tag: "Explicit, traceable", calibrated: true, text: "Amended discharge reconciliation: beta-blocker (newly prescribed this admission) omitted from original summary, now added. Attending to re-confirm. Timed and signed.", lands: "Anyone reading the chart sees exactly what happened and that re-confirmation was sought." },
    ],
    d: { card: "Whatever you wrote, you now have a record of this moment that you did not have before." },
  },
  consequences: {
    a: { sameDay: ["You message the attending. They step out of rounds. \u201CGood catch. Hold the discharge, I\u2019ll re-sign in ten.\u201D", "It costs you: the family waits another forty minutes, and you absorb the awkward delay at the desk.", "But the summary leaves correct, and the attending saw you flag your own miss."], nextWeek: ["The patient\u2019s GP receives a clean, accurate discharge. No follow-up scramble.", "The attending mentions it at handover: \u201CShe caught her own omission before it left the ward. That\u2019s the habit we want.\u201D"], monthEnd: ["You are asked to help draft the unit\u2019s reconciliation checklist.", "The delay is forgotten. The trust stays."], outcome: "Flagged the omission before discharge; the family waited while it was corrected.", others: "The attending stopped double-checking your reconciliations. \u201CShe flags her own.\u201D", interp: "She brought the omission while there was still time to fix it.", manager: "Attending\u2019s perspective. \u201CMy first reaction was the delay. My second was relief \u2014 she told me before it walked out the door. That is the nurse I want reconciling my discharges.\u201D", traj: "rise" },
    b: { sameDay: ["You amend the record and add a note. The summary is now correct.", "You do not page the attending. The chart will show the change if anyone looks.", "The patient is discharged on time."], nextWeek: ["The attending notices the amendment during an audit. The note is accurate \u2014 but it is the first they are hearing of it.", "They say nothing. They make a mental note: the chart told them something the nurse did not."], monthEnd: ["Nothing dramatic. But the attending now re-reads your reconciliations before signing.", "The correction was real. The silence around it was the part they remembered."], outcome: "Corrected the record quietly and left a note.", others: "The attending began re-checking your reconciliations before signing.", interp: "She corrected it but did not say so. The chart asked the question for her.", manager: "Attending\u2019s perspective. \u201CThe amendment was honest. But she let the record tell me instead of telling me. Now I wonder what else gets quietly patched.\u201D", traj: "drift-down" },
    c: { sameDay: ["Rounds run long. The patient is collected before you get your moment.", "You decide to catch the attending first thing tomorrow.", "You sleep lightly, rehearsing how you\u2019ll open."], nextWeek: ["You raise it the next morning. The GP is called; the dose is confirmed. No harm done.", "But the attending asks: \u201CWhen did you notice?\u201D You tell them. There\u2019s a pause."], monthEnd: ["It isn\u2019t in your review. But the next time you flag something, the first question is \u201Cwhen did you find out?\u201D", "The waiting cost a line of trust that used to be assumed."], outcome: "Waited, then raised it the next morning after discharge.", others: "The attending\u2019s first question on the next issue became \u201Cwhen did you find out?\u201D", interp: "She had it in time. She raised it the next day. The waiting communicated something.", manager: "Attending\u2019s perspective. \u201CShe told me \u2014 a day later. The omission was simple. The wait was the part I keep thinking about.\u201D", traj: "dip-flat" },
    d: { sameDay: ["You decide the dose is low and the GP will catch it. You finish your shift.", "You don\u2019t sleep well."], nextWeek: ["The patient\u2019s pharmacy queries the missing beta-blocker. The GP calls the ward. The attending pulls the chart and finds the omission \u2014 and your sign-off.", "\u201CDid you know about this?\u201D The honest answer is yes. Saying yes now is a different conversation than saying it before discharge."], monthEnd: ["An incident note is filed. Your name sits beside two things: the omission, which everyone understands, and the silence, which no one does.", "The charge nurse is quiet. \u201CMistakes I can work with. What I can\u2019t work with is finding out from the pharmacy.\u201D"], outcome: "Left the omission; the pharmacy surfaced it days later.", others: "The charge nurse began re-verifying your discharges. \u201CI can\u2019t carry silence.\u201D", interp: "She knew. The silence was the decision.", manager: "Attending\u2019s perspective. \u201CThe omission was human. Finding out through the pharmacy was not. Now I check everything she signs.\u201D", traj: "drop" },
  },
  signalPanel: [
    { key: "a", title: "Immediate disclosure", signal: "Catches own omissions and surfaces them while there is still time.", effect: "Short-term delay and friction, long-term clinical trust." },
    { key: "b", title: "Quiet correction", signal: "Fixes it independently, but the fix was unspoken.", effect: "Neutral now; erosion when the pattern is noticed." },
    { key: "c", title: "Strategic wait", signal: "Disclosed, but after the patient had gone.", effect: "The disclosure counted; the timing became a data point." },
    { key: "d", title: "Leave it", signal: "When something slips, the instinct is silence.", effect: "Clinical and trust costs that arrive later." },
  ],
  reflection: "Think of a time you caught your own mistake after sign-off. What did the timing of your disclosure cost \u2014 or protect?",
}, "Healthcare");

/* ============================================================================
   AUDIO ENGINE (Tone.js) — interim synthesized brand assets
   bell: Tibetan singing bowl ~528Hz, ~3s decay, horizon transitions only
   motif: four notes, ~3.5s, soft — A-0, G-4 silence beat, Growth Log header
   ========================================================================== */
function useAudio() {
  const ready = useRef(false);
  const bell = useRef(null);
  const motifSynth = useRef(null);

  const init = useCallback(async () => {
    if (ready.current) return;
    await Tone.start();
    // Bell: metallic, inharmonic — singing-bowl-like
    const reverb = new Tone.Reverb({ decay: 4, wet: 0.35 }).toDestination();
    bell.current = new Tone.MetalSynth({
      harmonicity: 3.4,
      modulationIndex: 18,
      resonance: 1200,
      octaves: 1.4,
      envelope: { attack: 0.002, decay: 3.0, release: 0.6 },
      volume: -16,
    }).connect(reverb);
    // Motif: soft sine voice
    motifSynth.current = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.08, decay: 0.4, sustain: 0.25, release: 1.2 },
      volume: -20,
    }).connect(reverb);
    ready.current = true;
  }, []);

  const strikeBell = useCallback(() => {
    if (!ready.current || !bell.current) return;
    try { bell.current.triggerAttackRelease("C5", 3, undefined, 0.9); } catch (e) {}
  }, []);

  const playMotif = useCallback(() => {
    if (!ready.current || !motifSynth.current) return;
    const now = Tone.now();
    // four-note motif (calm, resolving): E4 G4 B4 E5
    const notes = ["E4", "G4", "B4", "E5"];
    notes.forEach((n, i) => {
      try { motifSynth.current.triggerAttackRelease(n, 0.7, now + i * 0.42, 0.6); } catch (e) {}
    });
  }, []);

  return { init, strikeBell, playMotif };
}

/* ============================================================================
   ENGINE PRIMITIVES (dimension-blind, reusable across all 14 modules)
   ========================================================================== */

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Footer() {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, textAlign: "center", padding: "10px 12px", fontFamily: SANS, fontSize: 11, letterSpacing: 0.3, color: "rgba(255,255,255,0.55)", background: "linear-gradient(to top, rgba(14,34,51,0.9), transparent)", pointerEvents: "none", zIndex: 5 }}>
      {FOOTER}
    </div>
  );
}

function PauseControl({ onPause }) {
  return (
    <button onClick={onPause} aria-label="Pause rehearsal"
      style={{ position: "fixed", top: 16, right: 16, width: 44, height: 44, borderRadius: 22, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 6, backdropFilter: "blur(4px)" }}>
      <Pause size={18} />
    </button>
  );
}

function Stage({ children, bg = C.navy, narrow = false }) {
  return (
    <div style={{ minHeight: "100%", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 20px 80px", transition: "background 0.8s ease" }}>
      <div style={{ width: "100%", maxWidth: narrow ? 540 : 720 }}>{children}</div>
    </div>
  );
}

function Narration({ lines, color = "rgba(255,255,255,0.92)" }) {
  return (
    <div style={{ fontFamily: SERIF }}>
      {lines.map((l, i) => (
        <p key={i} className="bf-fade" style={{ fontSize: 19, lineHeight: 1.7, color, margin: "0 0 18px", animationDelay: `${reduceMotion ? 0 : i * 0.5}s` }}>{l}</p>
      ))}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, dim }) {
  const faded = disabled || dim;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: "100%", minHeight: 48, marginTop: 22, borderRadius: 10, border: "none", background: faded ? "rgba(13,148,136,0.4)" : C.teal, color: faded ? "rgba(255,255,255,0.7)" : C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}>
      {children} <ChevronRight size={17} />
    </button>
  );
}

// Two-channel decision: selection (3 or 4 options) + justification
function Decision({ prompt, options, justificationPrompt, minChars = 25, onSubmit }) {
  const [sel, setSel] = useState(null);
  const [text, setText] = useState("");
  const [tried, setTried] = useState(false);
  const left = minChars - text.trim().length;
  const need = !sel ? "Select one option above to continue." : left > 0 ? `Add your reasoning to continue \u2014 ${left} more character${left === 1 ? "" : "s"}.` : "";
  const submit = () => { if (need) { setTried(true); return; } onSubmit(sel, text); };
  return (
    <div>
      {prompt && <p style={{ fontFamily: SERIF, fontSize: 20, color: "rgba(255,255,255,0.95)", lineHeight: 1.6, marginBottom: 22 }}>{prompt}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((o) => {
          const active = sel === o.key;
          return (
            <button key={o.key} onClick={() => setSel(o.key)}
              style={{ textAlign: "left", padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${active ? C.teal : "rgba(255,255,255,0.15)"}`, background: active ? "rgba(13,148,136,0.14)" : "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.9)", fontFamily: SANS, fontSize: 14.5, lineHeight: 1.5, cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}>
              <span style={{ fontWeight: 700, color: active ? C.tealMid : "rgba(255,255,255,0.5)", marginRight: 8 }}>{o.key.toUpperCase()}</span>{o.label}
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.7)", margin: "22px 0 8px" }}>{justificationPrompt}</p>
      <textarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={3}
        placeholder="Type your reasoning…"
        style={{ width: "100%", boxSizing: "border-box", padding: 12, borderRadius: 8, border: `1px solid ${tried && left > 0 ? C.redInk : "rgba(255,255,255,0.15)"}`, background: "rgba(0,0,0,0.2)", color: C.white, fontFamily: SANS, fontSize: 14, resize: "vertical", transition: "border-color 0.2s" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginTop: 6, color: "rgba(255,255,255,0.4)", fontFamily: SANS, fontSize: 11 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mic size={13} /> Text or voice — both supported.</span>
        <span style={{ color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/{minChars}</span>
      </div>
      {need && (
        <div style={{ marginTop: 10, fontFamily: SANS, fontSize: 12.5, color: tried ? C.tealMid : "rgba(255,255,255,0.45)", textAlign: "center" }}>{need}</div>
      )}
      <PrimaryButton onClick={submit} dim={!!need}>See what happens</PrimaryButton>
    </div>
  );
}

// Artifact-write + reference calibration (no scoring; calibrated subtly bordered)
function ArtifactWrite({ prompt, submitLabel, references, refKind, onDone }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [tried, setTried] = useState(false);
  const left = 40 - text.trim().length;
  if (!submitted) {
    return (
      <div>
        <p style={{ fontFamily: SERIF, fontSize: 18, color: "rgba(255,255,255,0.92)", lineHeight: 1.6, marginBottom: 16 }}>{prompt}</p>
        <textarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={4} autoFocus
          placeholder="Write the actual words…"
          style={{ width: "100%", boxSizing: "border-box", padding: 14, borderRadius: 8, border: `1px solid ${tried && left > 0 ? C.redInk : "rgba(255,255,255,0.18)"}`, background: "rgba(0,0,0,0.22)", color: C.white, fontFamily: SANS, fontSize: 15, lineHeight: 1.5, resize: "vertical", transition: "border-color 0.2s" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>Written language is what we are practising.</p>
          <span style={{ fontFamily: SANS, fontSize: 11, color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/40</span>
        </div>
        {tried && left > 0 && <div style={{ marginTop: 8, fontFamily: SANS, fontSize: 12.5, color: C.tealMid, textAlign: "center" }}>Write the actual words to continue — {left} more character{left === 1 ? "" : "s"}.</div>}
        <PrimaryButton onClick={() => { if (left > 0) { setTried(true); return; } setSubmitted(true); }} dim={left > 0}>{submitLabel}</PrimaryButton>
      </div>
    );
  }
  return (
    <div className="bf-fade">
      <div style={{ background: "rgba(13,148,136,0.12)", border: `1.5px solid ${C.teal}`, borderRadius: 10, padding: 16, marginBottom: 22 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", marginBottom: 8 }}>Your message</div>
        <div style={{ fontFamily: SERIF, fontSize: 15.5, color: C.white, lineHeight: 1.6 }}>{text}</div>
      </div>
      {refKind === "card" ? (
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.8)", textAlign: "center", padding: "20px 10px", lineHeight: 1.6 }}>
          {references.card}
        </div>
      ) : (
        <>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Other ways this moment can be written</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {references.map((r, i) => (
              <div key={i} style={{ borderRadius: 10, padding: 14, background: "rgba(255,255,255,0.04)", border: r.calibrated ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: r.calibrated ? C.tealMid : "rgba(255,255,255,0.5)", marginBottom: 6 }}>{r.tag}</div>
                <div style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.55, marginBottom: 8 }}>{r.text}</div>
                <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>How this lands: {r.lands}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.5)", marginTop: 16, textAlign: "center" }}>
            These are not better or worse than yours. They are calibration points. What you wrote belongs to you.
          </p>
        </>
      )}
      <PrimaryButton onClick={() => onDone(text)}>Continue</PrimaryButton>
    </div>
  );
}

// Three-horizon consequence reveal — bell at EACH transition (the only place bell rings)
function ConsequenceReveal({ horizons, onBell, onDone }) {
  const [stage, setStage] = useState(0); // 0 sameDay,1 nextWeek,2 monthEnd
  const labels = ["Same Day", "Next Week", "Month End"];
  const advance = () => {
    if (stage < 2) {
      onBell(); // Tibetan bell at the horizon transition
      setStage(stage + 1);
    } else {
      onDone();
    }
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center" }}>
        {labels.map((l, i) => (
          <div key={i} style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, color: i === stage ? C.navy : "rgba(255,255,255,0.4)", background: i === stage ? C.tealMid : "rgba(255,255,255,0.06)", transition: "all 0.5s" }}>{l}</div>
        ))}
      </div>
      <div key={stage} className={reduceMotion ? "" : "bf-horizon"}>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>
          {stage > 0 && "— time passes —"}
        </div>
        <Narration lines={horizons[["sameDay", "nextWeek", "monthEnd"][stage]]} />
      </div>
      <PrimaryButton onClick={advance}>{stage < 2 ? "Let time pass" : "What this may signal"}</PrimaryButton>
    </div>
  );
}

// "What Changed Over Time" — observational trajectory, no numbers, chosen path teal
function Trajectory({ chosen }) {
  const shapes = {
    a: [70, 55, 78, 92], "rise": [70, 55, 78, 92],
    b: [70, 68, 55, 40], "drift-down": [70, 68, 55, 40],
    c: [70, 58, 64, 58], "dip-flat": [70, 58, 64, 58],
    d: [70, 68, 40, 20], "drop": [70, 68, 40, 20],
  };
  const paths = { a: [70, 55, 78, 92], b: [70, 68, 55, 40], c: [70, 58, 64, 58], d: [70, 68, 40, 20] };
  const W = 460, H = 150, padX = 30, padY = 16;
  const xs = [0, 1, 2].map((i) => padX + (i * (W - padX * 2)) / 2);
  const toPts = (arr) => [arr[0], arr[1], arr[3]].map((v, i) => `${xs[i]},${padY + ((100 - v) / 100) * (H - padY * 2)}`).join(" ");
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "18px 12px 10px" }}>
      <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: 6 }}>What stakeholders may have noticed</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {Object.keys(paths).map((k) => (
          <polyline key={k} points={toPts(paths[k])} fill="none"
            stroke={k === chosen ? C.tealMid : "rgba(255,255,255,0.18)"}
            strokeWidth={k === chosen ? 2.6 : 1.2}
            strokeLinecap="round" strokeLinejoin="round"
            className={reduceMotion ? "" : "bf-draw"} />
        ))}
        {xs.map((x, i) => (
          <text key={i} x={x} y={H - 2} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily={SANS} textAnchor="middle">
            {["Same Day", "Next Week", "Month End"][i]}
          </text>
        ))}
      </svg>
    </div>
  );
}

// Pattern Ledger — universal component (Integrity Pattern Mirror in D1)
function PatternLedger({ name, rows, totalRows = 4, fullRecall = false }) {
  return (
    <div style={{ background: fullRecall ? C.white : "rgba(255,255,255,0.04)", borderRadius: 12, border: fullRecall ? `1px solid ${C.line}` : "none", overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", fontFamily: SANS, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: fullRecall ? C.teal : C.tealMid, borderBottom: `1px solid ${fullRecall ? C.line : "rgba(255,255,255,0.08)"}` }}>{name}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 540, borderCollapse: "collapse", fontFamily: SANS, fontSize: 12.5 }}>
          <thead>
            <tr>
              {["Scenario", "Commitment", "Outcome", "Others’ Adjustment"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: fullRecall ? C.inkSoft : "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 11, letterSpacing: 0.5, borderBottom: `1px solid ${fullRecall ? C.line : "rgba(255,255,255,0.08)"}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: totalRows }).map((_, i) => {
              const r = rows[i];
              const txt = fullRecall ? C.ink : "rgba(255,255,255,0.85)";
              const soft = fullRecall ? C.inkSoft : "rgba(255,255,255,0.55)";
              return (
                <tr key={i} className={r && !reduceMotion ? "bf-row" : ""} style={{ borderBottom: i < totalRows - 1 ? `1px solid ${fullRecall ? "#F1F5F9" : "rgba(255,255,255,0.05)"}` : "none" }}>
                  {r ? (
                    <>
                      <td style={{ padding: "10px 12px", color: txt, fontWeight: 600, verticalAlign: "top" }}>{r.sc}<div style={{ color: soft, fontWeight: 400, fontSize: 11 }}>{r.title}</div></td>
                      <td style={{ padding: "10px 12px", color: soft, verticalAlign: "top", minWidth: 140 }}>{r.commitment}</td>
                      <td style={{ padding: "10px 12px", color: txt, verticalAlign: "top", minWidth: 150 }}>{r.outcome}</td>
                      <td style={{ padding: "10px 12px", color: fullRecall ? C.tealDeep : C.tealMid, verticalAlign: "top", minWidth: 160 }}>{r.others}</td>
                    </>
                  ) : (
                    <td colSpan={4} style={{ padding: "14px 12px", color: fullRecall ? "#CBD5E1" : "rgba(255,255,255,0.18)", fontStyle: "italic", fontSize: 12 }}>SC{i + 1} — not yet rehearsed</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Reflection({ prompt, onDone }) {
  const [text, setText] = useState("");
  const [tried, setTried] = useState(false);
  const left = 30 - text.trim().length;
  return (
    <div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 16 }}>{prompt}</p>
      <textarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={3}
        style={{ width: "100%", boxSizing: "border-box", padding: 12, borderRadius: 8, border: `1px solid ${tried && left > 0 ? C.redInk : "rgba(255,255,255,0.15)"}`, background: "rgba(0,0,0,0.2)", color: C.white, fontFamily: SANS, fontSize: 14, resize: "vertical", transition: "border-color 0.2s" }} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
        <span style={{ fontFamily: SANS, fontSize: 11, color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/30</span>
      </div>
      {tried && left > 0 && <div style={{ marginTop: 8, fontFamily: SANS, fontSize: 12.5, color: C.tealMid, textAlign: "center" }}>A sentence or two to continue — {left} more character{left === 1 ? "" : "s"}.</div>}
      <PrimaryButton onClick={() => { if (left > 0) { setTried(true); return; } onDone(text); }} dim={left > 0}>Save and continue</PrimaryButton>
    </div>
  );
}

/* ============================================================================
   THE MODULE FLOW (engine flow controller)
   ========================================================================== */
const initialState = {
  screen: "enter",
  coldOpenPath: null,
  scenarioPath: null,
  ledger: [],
  finalSentence: "",
  scenario: null,      // null = canonical D1; object = AI/variant scenario loaded into the same engine
  generating: false,
  genError: null,
  sector: null,
  lastJustification: "",
  analyses: [],        // Lock 2 fingerprints (developer-only)
  scenarioIndex: 0,    // which scenario in the chain (canonical D1 = SC1, SC2, ...)
  threadingPosture: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "GOTO": return { ...state, screen: action.screen };
    case "COLD_OPEN": return { ...state, coldOpenPath: action.path, screen: "a2" };
    case "SCENARIO_DECISION": return { ...state, scenarioPath: action.path, lastJustification: action.justification || "" };
    case "ANALYZE_ADD": return { ...state, analyses: [...state.analyses, action.analysis] };
    case "NEXT_SCENARIO": return { ...state, scenarioIndex: state.scenarioIndex + 1, scenarioPath: null, lastJustification: "", threadingPosture: action.posture, screen: "sc_callback" };
    case "LEDGER_ADD": return { ...state, ledger: [...state.ledger, action.row] };
    case "FINAL": return { ...state, finalSentence: action.text };
    case "GEN_START": return { ...state, generating: true, genError: null, sector: action.sector, screen: "ai_gen" };
    case "GEN_OK": return { ...state, generating: false, scenario: action.scenario, screen: "sc_callback" };
    case "GEN_FAIL": return { ...state, generating: false, scenario: action.scenario, genError: action.error };
    default: return state;
  }
}

export default function BridgeFastModule() {
  const [st, dispatch] = useReducer(reducer, initialState);
  const audio = useAudio();
  const [a0phase, setA0phase] = useState(0);
  const [devOpen, setDevOpen] = useState(false);
  const C0 = D1_CONTENT.segmentA.coldOpen;
  const SCENARIOS = [D1_CONTENT.scenario, SC2_CONTENT];   // the D1 chain
  const SC = st.scenario || SCENARIOS[st.scenarioIndex];  // dimension-blind: AI variant OR canonical chain
  const SG = D1_CONTENT.segmentG;

  // Derive the transparency posture that threads into the next scenario.
  const POSTURE_BY_PATH = { a: "transparent", b: "cautious", c: "cautious", d: "avoidant" };
  const advanceScenario = useCallback(() => {
    const lastA = st.analyses[st.analyses.length - 1];
    const posture = (lastA && lastA.posture) || POSTURE_BY_PATH[st.scenarioPath] || "cautious";
    dispatch({ type: "NEXT_SCENARIO", posture });
  }, [st.analyses, st.scenarioPath]);

  const runGenerate = useCallback(async (sector) => {
    dispatch({ type: "GEN_START", sector });
    try {
      const sc = await generateScenario(sector);
      if (sc) dispatch({ type: "GEN_OK", scenario: sc });
      else dispatch({ type: "GEN_FAIL", scenario: FALLBACK_HEALTHCARE, error: "The model did not return usable JSON \u2014 loaded a bundled sample so you can see the flow." });
    } catch (e) {
      dispatch({ type: "GEN_FAIL", scenario: FALLBACK_HEALTHCARE, error: "Live generation was blocked here (sandbox/network). In your Vite app the a0 call runs normally \u2014 loaded a bundled sample for now." });
    }
  }, []);

  const runAnalysis = useCallback(async (input) => {
    const a = await analyzeResponse(input);
    dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: input.scenarioTitle, path: input.path } });
  }, []);

  // Screen A-0 cinematic timing (5.0s, un-skippable)
  useEffect(() => {
    if (st.screen !== "a0") return;
    audio.playMotif();
    const t1 = setTimeout(() => setA0phase(1), reduceMotion ? 200 : 1500);
    const t2 = setTimeout(() => setA0phase(2), reduceMotion ? 400 : 4000);
    const t3 = setTimeout(() => dispatch({ type: "GOTO", screen: "a1" }), reduceMotion ? 600 : 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [st.screen]);

  const goto = (screen) => dispatch({ type: "GOTO", screen });
  const path = st.scenarioPath;
  const cons = path ? SC.consequences[path] : null;

  /* ----- render per screen ----- */
  let body = null;

  if (st.screen === "enter") {
    body = <EnterScreen onCanonical={async () => { await audio.init(); goto("a0"); }} onGenerate={async (sector) => { await audio.init(); runGenerate(sector); }} />;
  }

  else if (st.screen === "ai_gen") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 16 }}>VARIANT STUDIO</div>
          {st.generating ? (
            <>
              <div className="bf-pulse" style={{ fontFamily: SERIF, fontSize: 20, color: C.white, lineHeight: 1.5 }}>Drafting a {st.sector} scenario\u2026</div>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", marginTop: 14, lineHeight: 1.6 }}>a0 is writing the briefing, four decision paths, and three-horizon consequences against the locked D1 structure. The same engine will render it.</p>
              <div style={{ marginTop: 22, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}><div className="bf-loadbar" style={{ height: "100%", background: C.tealMid }} /></div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.5, marginBottom: 12 }}>Loaded a sample variant.</div>
              {st.genError && <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 18 }}>{st.genError}</p>}
              <PrimaryButton onClick={() => goto("sc_callback")}>Play the variant</PrimaryButton>
            </>
          )}
        </div>
      </Stage>
    );
  }

  else if (st.screen === "a0") {
    body = (
      <div style={{ minHeight: "100%", background: a0phase === 0 ? "#000" : C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.5s ease", padding: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div className="bf-fade" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, color: C.white, opacity: a0phase >= 0 ? 1 : 0, transition: "opacity 1s" }}>THE 3RD ACADEMY</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: C.tealMid, lineHeight: 1.5, marginTop: 24, maxWidth: 460, opacity: a0phase >= 1 && a0phase < 2 ? 1 : 0, transition: "opacity 1s" }}>
            {D1_CONTENT.dimension.central_question}
          </div>
        </div>
      </div>
    );
  }

  // A-1 cold open
  else if (st.screen === "a1") {
    body = (
      <Stage>
        <Narration lines={C0.narration} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "8px 0 24px" }}>
          <Artifact title="Revenue Projection.xlsx — edit history: sent 1:42 PM today" mono>
            =SUM(C12:C24)  →  $2,140,000   [correct range C12:C22]<br />
            <span style={{ background: C.paleRed, color: C.redInk, padding: "1px 4px", borderRadius: 3 }}>C23:C24 — test data, should not be included</span><br />
            Cumulative 3-yr error: ~$340,000
          </Artifact>
          <Artifact title="Slack · DM with Sarah Chen">
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Message Sarah Chen… <span className="bf-blink">|</span></span>
          </Artifact>
        </div>
        <Decision prompt="What do you do?" options={C0.options} justificationPrompt={C0.justificationPrompt}
          onSubmit={(p) => dispatch({ type: "COLD_OPEN", path: p })} />
      </Stage>
    );
  }

  // A-2 same-day consequence
  else if (st.screen === "a2") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Same Day</div>
        <Narration lines={C0.sameDay[st.coldOpenPath]} />
        <PrimaryButton onClick={() => goto("a3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  // A-3 safety floor
  else if (st.screen === "a3") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, textAlign: "center", marginBottom: 24 }}>That was rehearsal.</p>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 22, borderLeft: `3px solid ${C.teal}` }}>
          {D1_CONTENT.segmentA.safetyFloor.card.map((l, i) => (
            <p key={i} style={{ fontFamily: i === 0 ? SANS : SERIF, fontWeight: i === 0 ? 700 : 400, fontSize: i === 0 ? 13 : 14.5, letterSpacing: i === 0 ? 0.5 : 0, color: i === 0 ? C.white : "rgba(255,255,255,0.82)", lineHeight: 1.55, margin: "0 0 12px" }}>{l}</p>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("a4")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  // A-4 central question
  else if (st.screen === "a4") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>THE QUESTION THAT RUNS THROUGH THIS MODULE</div>
          <p style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.5 }}>{D1_CONTENT.dimension.central_question}</p>
          <PrimaryButton onClick={() => goto("sc_callback")}>Begin the Scenario Lab</PrimaryButton>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 20 }}>
            (Prototype: Segments B, C, D are engine-ready; content deferred. Jumping to Scenario Chain 1.)
          </p>
        </div>
      </Stage>
    );
  }

  // Scenario open: SC1 (cold-open callback) · SC2 (posture-threaded open) · AI variant
  else if (st.screen === "sc_callback") {
    const isSC2 = !st.scenario && st.scenarioIndex === 1;
    const threadLines = isSC2 ? (SC.threading[st.threadingPosture] || SC.threading.cautious) : null;
    body = (
      <Stage>
        {isSC2 ? (
          <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 10 }}>What you carry into this room</div>
            {threadLines.map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, margin: "0 0 10px" }}>{l}</p>
            ))}
          </div>
        ) : (
          <>
            <Narration lines={SC.callback} />
            <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "16px 0", fontFamily: SERIF, fontStyle: "italic", color: "rgba(255,255,255,0.85)", fontSize: 14.5, lineHeight: 1.6 }}>
              You have been here before. Now you see all four futures. Same path, or different — notice whether your reasoning has changed.
            </div>
          </>
        )}
        <Narration lines={SC.intro} />
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, margin: "14px 0", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{SC.briefing}</div>
        {!st.scenario && st.scenarioIndex === 0 && (
          <Artifact title="Revenue Projection — Year 1–3" mono>
            ROW 34  =SUM(C12:C24) → $2,140,000  <span style={{ background: C.paleRed, color: C.redInk, padding: "1px 4px", borderRadius: 3 }}>test rows C23:C24 included</span><br />
            ROW 35  =ROW34*1.08 → $2,311,200<br />
            ROW 36  =ROW35*1.08 → $2,496,096<br />
            Cumulative 3-yr error: ~$340,000
          </Artifact>
        )}
        <PrimaryButton onClick={() => goto("sc_decision")}>The decision</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_decision") {
    body = (
      <Stage>
        <Decision prompt={SC.decisionPrompt} options={SC.options} justificationPrompt={SC.justificationPrompt}
          onSubmit={(p, justification) => { dispatch({ type: "SCENARIO_DECISION", path: p, justification }); goto("sc_artifact"); }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_artifact") {
    const aw = SC.artifactWrite[path];
    const refKind = path === "d" ? "card" : "list";
    const refs = path === "a" || path === "c" ? SC.references.ac : path === "b" ? SC.references.b : SC.references.d;
    body = (
      <Stage>
        <ArtifactWrite prompt={aw.prompt} submitLabel={aw.submit} references={refs} refKind={refKind}
          onDone={(txt) => { runAnalysis({ scenarioTitle: SC.title, path, justification: st.lastJustification, artifactText: txt }); goto("sc_consequence"); }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_consequence") {
    body = (
      <Stage>
        <ConsequenceReveal horizons={cons} onBell={audio.strikeBell} onDone={() => goto("sc_interp")} />
      </Stage>
    );
  }

  else if (st.screen === "sc_interp") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>What Sarah may have noticed</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: C.white, lineHeight: 1.6 }}>“{cons.interp}”</p>
        <PrimaryButton onClick={() => goto("sc_signal")}>How each path may land</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_signal") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>What each path may have communicated</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SC.signalPanel.map((s) => {
            const chosen = s.key === path;
            return (
              <div key={s.key} style={{ borderRadius: 10, padding: 14, background: chosen ? "rgba(13,148,136,0.1)" : "rgba(255,255,255,0.03)", border: chosen ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: chosen ? C.tealMid : "rgba(255,255,255,0.8)", marginBottom: 5 }}>Path {s.key.toUpperCase()} — {s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Signal: {s.signal}</div>
                <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 22 }}><Trajectory chosen={path} /></div>
        <PrimaryButton onClick={() => goto("sc_manager")}>The manager’s view</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_manager") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Manager Lens</div>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, fontStyle: "italic" }}>{cons.manager}</p>
        <PrimaryButton onClick={() => goto("sc_reflection")}>Reflect</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_reflection") {
    body = (
      <Stage narrow>
        <Reflection prompt={SC.reflection} onDone={() => {
          dispatch({ type: "LEDGER_ADD", row: { sc: SC.id || "SC1", title: SC.title, commitment: SC.commitment, outcome: cons.outcome, others: cons.others } });
          goto("sc_ledger");
        }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_ledger") {
    const isAI = !!st.scenario;
    const moreScenarios = !isAI && st.scenarioIndex < SCENARIOS.length - 1;
    const onContinue = isAI ? () => goto("g2") : moreScenarios ? advanceScenario : () => goto("g1");
    body = (
      <Stage>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 18, textAlign: "center" }}>
          {st.ledger.length >= 2 ? "Your pattern is becoming visible." : "Your pattern is beginning to form."}
        </div>
        <PatternLedger name="Integrity Pattern Mirror" rows={st.ledger} totalRows={4} />
        {moreScenarios && (
          <p style={{ fontFamily: SANS, fontSize: 12, color: C.tealMid, marginTop: 14, textAlign: "center", lineHeight: 1.6 }}>
            How you handled this carries forward. The next scenario opens differently because of it.
          </p>
        )}
        <PrimaryButton onClick={onContinue}>{moreScenarios ? "Carry it forward \u2192 Scenario 2" : "Continue"}</PrimaryButton>
        {!moreScenarios && (
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 16, textAlign: "center" }}>
            (Prototype: SC3\u2013SC4 and Segment F deferred. Jumping to the close.)
          </p>
        )}
      </Stage>
    );
  }

  // SEGMENT G
  else if (st.screen === "g1") {
    body = (
      <Stage bg={C.navyDeep}>
        <Narration lines={SG.recognition} />
        {st.coldOpenPath && <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: C.tealMid, lineHeight: 1.6, marginTop: 8 }}>{SG.callback[st.coldOpenPath]}</p>}
        <PrimaryButton onClick={() => goto("g15")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "g15") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>{SG.frameworkReturn.lead}</p>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 28, lineHeight: 1.6 }}>{SG.frameworkReturn.body}</p>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 16 }}>THE INTEGRITY PAUSE</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
            {SG.frameworkReturn.steps.map((s, i) => (
              <span key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: 22, color: C.white, animationDelay: `${i * 0.5}s` }}>{s}</span>
            ))}
          </div>
          <PrimaryButton onClick={() => goto("g2")}>Go to your Growth Log</PrimaryButton>
        </div>
      </Stage>
    );
  }

  else if (st.screen === "g2") {
    body = (
      <Stage bg={C.paper} narrow>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 6 }}>YOUR GROWTH LOG</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, color: C.navy }}>D1 — Integrity &amp; Ethics</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: C.inkSoft, marginTop: 6 }}>{D1_CONTENT.dimension.central_question}</div>
        </div>
        <PatternLedger name="Integrity Pattern Mirror — your pattern" rows={st.ledger} totalRows={st.ledger.length || 1} fullRecall />
        <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.inkSoft, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
          Not a score. Not a certificate. A private record of what you practised.
        </p>
        <button onClick={() => goto("g3")} style={{ width: "100%", minHeight: 48, marginTop: 18, borderRadius: 10, border: "none", background: C.navy, color: C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continue</button>
      </Stage>
    );
  }

  else if (st.screen === "g3") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>In a few days</div>
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>{SG.retentionSetup}</p>
        <PrimaryButton onClick={() => goto("g4")}>Got it — continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "g4") {
    body = <AweClose content={SG} onMotif={audio.playMotif} onDone={(s) => { dispatch({ type: "FINAL", text: s }); goto("done"); }} />;
  }

  else if (st.screen === "done") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          {st.finalSentence && (
            <>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 14 }}>YOU WROTE THIS</div>
              <p style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.5, marginBottom: 30 }}>“{st.finalSentence}”</p>
            </>
          )}
          <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Module complete.</p>
          <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 10, lineHeight: 1.6 }}>
            Your delayed retention check will arrive in three to seven days.<br />Until then — {FOOTER.toLowerCase()}
          </p>
          <p style={{ fontFamily: SANS, fontSize: 11, color: C.tealMid, marginTop: 28 }}>
            → This final sentence is the verbatim seed D2 reads back to the participant in its cold open.
          </p>
        </div>
      </Stage>
    );
  }

  const showChrome = !["enter", "a0", "ai_gen"].includes(st.screen);
  const aiBadge = st.scenario && !["enter", "ai_gen"].includes(st.screen);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "auto", background: C.navy, fontFamily: SANS }}>
      <StyleBlock />
      {aiBadge && (
        <div style={{ position: "fixed", top: 16, left: 16, zIndex: 6, display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 20, background: "rgba(94,234,212,0.12)", border: "1px solid rgba(94,234,212,0.4)", fontFamily: SANS, fontSize: 10.5, letterSpacing: 0.5, color: C.tealMid }}>
          <Sparkle /> AI DRAFT · {st.scenario._sector} · pending founder lock
        </div>
      )}
      {showChrome && <PauseControl onPause={() => alert("Paused — progress saves automatically. (Smart Resume returns you to this exact screen.)")} />}
      {showChrome && (
        <button onClick={() => setDevOpen((v) => !v)} aria-label="Developer panel"
          style={{ position: "fixed", bottom: 14, left: 14, zIndex: 7, padding: "6px 11px", borderRadius: 16, border: `1px solid ${st.analyses.length ? "rgba(94,234,212,0.5)" : "rgba(255,255,255,0.18)"}`, background: "rgba(14,34,51,0.85)", color: st.analyses.length ? C.tealMid : "rgba(255,255,255,0.5)", fontFamily: SANS, fontSize: 10.5, letterSpacing: 0.5, cursor: "pointer", backdropFilter: "blur(4px)" }}>
          DEV · LOCK 2 {st.analyses.length ? `(${st.analyses.length})` : ""}
        </button>
      )}
      {devOpen && <DeveloperPanel analyses={st.analyses} onClose={() => setDevOpen(false)} />}
      {body}
      {showChrome && <Footer />}
    </div>
  );
}

function Sparkle() {
  return <span style={{ width: 6, height: 6, borderRadius: 3, background: C.tealMid, display: "inline-block" }} />;
}

/* ---- DEVELOPER · LOCK 2 panel — behavioural-language fingerprint, never shown to participant ---- */
function Bar({ label, v }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "3px 0" }}>
      <span style={{ width: 76, fontFamily: SANS, fontSize: 10.5, color: "rgba(255,255,255,0.55)" }}>{label}</span>
      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
        <div style={{ width: `${(v / 3) * 100}%`, height: "100%", background: C.tealMid, borderRadius: 3 }} />
      </div>
      <span style={{ width: 14, fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.6)", textAlign: "right" }}>{v}</span>
    </div>
  );
}
function DeveloperPanel({ analyses, onClose }) {
  const postureColor = { transparent: C.tealMid, cautious: "#FBBF24", avoidant: "#F87171" };
  const latest = analyses[analyses.length - 1];
  return (
    <div style={{ position: "fixed", bottom: 52, left: 14, zIndex: 8, width: 320, maxWidth: "calc(100vw - 28px)", maxHeight: "70vh", overflowY: "auto", background: "rgba(10,22,33,0.97)", border: "1px solid rgba(94,234,212,0.3)", borderRadius: 12, padding: 14, backdropFilter: "blur(8px)", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid }}>DEVELOPER · LOCK 2</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}><X size={15} /></button>
      </div>
      <p style={{ fontFamily: SANS, fontSize: 10.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, margin: "0 0 12px" }}>
        Behavioural-language fingerprint of the participant's own writing. Diagnostics only — never surfaced to the participant, never a score.
      </p>
      {analyses.length === 0 ? (
        <p style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>No responses analysed yet. Complete an artifact-write to populate the fingerprint.</p>
      ) : (
        <>
          <div style={{ marginBottom: 12, padding: 10, borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Derived transparency posture</span>
              <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: postureColor[latest.posture] || C.white, textTransform: "uppercase", letterSpacing: 0.5 }}>{latest.posture}</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>→ drives cross-scenario threading for SC2+ (locked engine feature)</div>
          </div>
          {analyses.map((a, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < analyses.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>
                {a.scenario} · path {String(a.path).toUpperCase()} <span style={{ color: "rgba(255,255,255,0.35)" }}>· {a.source}</span>
              </div>
              <Bar label="directness" v={a.directness} />
              <Bar label="ownership" v={a.ownership} />
              <Bar label="hedging" v={a.hedging} />
              <Bar label="deflection" v={a.deflection} />
              {a.observation && <p style={{ fontFamily: SERIF, fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,0.65)", margin: "8px 0 0", lineHeight: 1.5 }}>{a.observation}</p>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/* ---- Enter screen: canonical D1 + a0-powered Variant Studio ---- */
function EnterScreen({ onCanonical, onGenerate }) {
  const [studio, setStudio] = useState(false);
  const [sector, setSector] = useState("Healthcare");
  const sectors = ["Healthcare", "Construction / Trades", "Finance", "Technology / Software", "Public Service"];
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 3, color: C.tealMid, marginBottom: 18 }}>THE 3RD ACADEMY</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: C.white, lineHeight: 1.4, marginBottom: 10 }}>D1 — Integrity &amp; Ethics</h1>
        <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 26, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}>
          A behavioural rehearsal. This prototype runs one cold open, one scenario chain, and the close. Headphones recommended.
        </p>
        <PrimaryButton onClick={onCanonical}>Begin the canonical rehearsal</PrimaryButton>

        <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {!studio ? (
            <button onClick={() => setStudio(true)} style={{ background: "transparent", border: "1px solid rgba(94,234,212,0.4)", color: C.tealMid, fontFamily: SANS, fontSize: 13, padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}>
              ✦ Variant Studio — let a0 draft a new sector
            </button>
          ) : (
            <div className="bf-fade">
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 14 }}>
                a0 drafts a full scenario chain for the chosen sector — same dilemma, same four paths, same three-horizon structure — and the <em>same engine</em> renders it. AI output is a draft pending founder lock.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 16 }}>
                {sectors.map((s) => (
                  <button key={s} onClick={() => setSector(s)}
                    style={{ padding: "7px 12px", borderRadius: 18, fontFamily: SANS, fontSize: 12.5, cursor: "pointer", border: `1px solid ${sector === s ? C.tealMid : "rgba(255,255,255,0.18)"}`, background: sector === s ? "rgba(94,234,212,0.14)" : "transparent", color: sector === s ? C.tealMid : "rgba(255,255,255,0.7)" }}>{s}</button>
                ))}
              </div>
              <PrimaryButton onClick={() => onGenerate(sector)}>Generate &amp; play the {sector} variant</PrimaryButton>
            </div>
          )}
        </div>
        <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 18 }}>Prototype slice · Segment A → Scenario Chain 1 → Segment G</p>
      </div>
    </Stage>
  );
}

/* ---- G-4 Awe Close: bookend (4s) → silence beat (motif + hairline) → prompt ---- */
function AweClose({ content, onMotif, onDone }) {
  const [beat, setBeat] = useState(1);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    // Schedule both transitions once on mount. Do NOT depend on [beat] —
    // re-running on each beat change would cancel the pending beat-3 timer
    // and freeze the module on the silent hairline beat.
    const t1 = setTimeout(() => { setBeat(2); onMotif(); }, reduceMotion ? 600 : 4000);
    const t2 = setTimeout(() => setBeat(3), reduceMotion ? 1000 : 6200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{ minHeight: "100%", background: C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
        {beat === 1 && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.5 }}>{content.bookendQuestion}</p>
        )}
        {beat === 2 && (
          <div style={{ height: 1, background: C.tealMid, width: "60%", margin: "0 auto", opacity: 0.15 }} className={reduceMotion ? "" : "bf-hairline"} />
        )}
        {beat === 3 && (
          <div className="bf-fade">
            <p style={{ fontFamily: SERIF, fontSize: 18, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 22 }}>{content.finalPrompt}</p>
            {!saved ? (
              <>
                <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} autoFocus
                  style={{ width: "100%", boxSizing: "border-box", padding: 14, borderRadius: 8, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.2)", color: C.white, fontFamily: SERIF, fontSize: 16, textAlign: "center", resize: "none" }} />
                <button onClick={() => { setSaved(true); setTimeout(() => onDone(text), 1200); }}
                  style={{ marginTop: 20, padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "rgba(255,255,255,0.8)", fontFamily: SANS, fontSize: 14, cursor: "pointer" }}>
                  {text.trim() ? "Save" : "Continue"}
                </button>
              </>
            ) : (
              <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid }}>Saved.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- small artifact frame ---- */
function Artifact({ title, children, mono }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
      <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{title}</div>
      <div style={{ padding: 12, fontFamily: mono ? MONO : SANS, fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

/* ---- keyframes ---- */
function StyleBlock() {
  return (
    <style>{`
      @keyframes bfFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      .bf-fade { animation: bfFade 0.9s ease both; }
      @keyframes bfHorizon { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      .bf-horizon { animation: bfHorizon 0.8s ease both; }
      @keyframes bfRow { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
      .bf-row { animation: bfRow 1.5s ease both; }
      @keyframes bfDraw { from { stroke-dasharray: 600; stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
      .bf-draw { stroke-dasharray: 600; animation: bfDraw 4s ease forwards; }
      @keyframes bfHair { 0% { opacity: 0.15; } 100% { opacity: 0; } }
      .bf-hairline { animation: bfHair 2s ease forwards; }
      @keyframes bfBlink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
      .bf-blink { animation: bfBlink 1s step-end infinite; }
      @keyframes bfPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
      .bf-pulse { animation: bfPulse 1.6s ease-in-out infinite; }
      @keyframes bfLoad { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
      .bf-loadbar { width: 30%; animation: bfLoad 1.2s ease-in-out infinite; }
      ::selection { background: ${C.tealMid}; color: ${C.navy}; }
    `}</style>
  );
}
