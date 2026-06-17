/* ============================================================================
   D2 CONTENT LAYER — Accountability & Ownership
   Production reference rev0 (May 2026). Mirrors d1Content.js schema. The
   engine is content-agnostic; D2 runs through the same renderer with the
   D2-specific BridgeFastD2Module.jsx wrapper.

   Cross-module memory contract:
     • CONSUMES prior.D1.final_personal_sentence at A-1 Beat 1 (with fallback).
     • EMITS prior.D2.final_personal_sentence at G-4 Beat 3 submit (for D3).
   ========================================================================== */

export const D2_CONTENT = {
  module: {
    id: "D2",
    title: "Accountability & Ownership",
    tier: "Foundational",
    // SCHEMA FIELD: module.sector_variants[]
    // MVP defaults to Technology/Software only. Healthcare and Public Sector
    // unlock post-MVP. Engine reads array length: 1 → render mvpNotice and
    // lock the sector; >1 → render a picker.
    sector_variants: ["Technology/Software"],
    sectorAssignment: {
      titleMVP: "Sector assignment notification (MVP)",
      titlePicker: "Choose your workplace context",
      mvpNotice: "Your scenarios will be set in a Technology/Software workplace context. The same context applies across all four scenarios.",
      pickerHint: "The context you choose here applies across all four scenarios.",
    },
  },
  dimension: {
    id: "D2",
    name: "Accountability & Ownership",
    central_question:
      "When something you committed to slips, what do other people see in how you handle it?",
    framework: { label: "The Repair Sequence", body: "Acknowledge · Fix · Execute · Confirm" },
  },
  threading_state_model: "repair_posture",

  /* -------- SEGMENT A — COLD OPEN + SAFETY FLOOR + CENTRAL QUESTION -------- */
  segmentA: {
    /* D1 → D2 cold-open callback. The personalized variant ("Last time you
       carried something out of this lab. You wrote: <sentence>...") cannot be
       pre-rendered because the sentence is unknown at build time. For MVP we
       ship the fallback string per script and mark the persistence layer as
       a TODO. See BridgeFastD2Module.jsx for the runtime handling. */
    coldOpenCallback: {
      fallback:
        "This module can stand alone, but it connects more deeply after D1. We are going to ask you to live a moment now — a moment where what you choose matters.",
      // Personalized template (NOT rendered at MVP — stitch via TTS once
      // cross-module memory persistence lands):
      personalizedTemplate:
        "Last time you carried something out of this lab. You wrote: {{prior.D1.final_personal_sentence}}. That sentence still belongs to you. We are going to ask you to live another moment now — a moment where what you carried matters.",
    },
    coldOpen: {
      narration: [
        "It is 9:14 Thursday morning. Sprint standup in sixteen minutes.",
        "The ticket you committed to closing this sprint is not ready. Your team does not know. Your manager does not know.",
        "Reviewers are scheduled to look at it this afternoon. The pull request needs another full day. Maybe two.",
        "Four options. Each one is real. Each one plays out across today, this week, this month. Choose the one closest to what you would actually do.",
      ],
      options: [
        { key: "a", label: "Disclose at standup, before being asked. Tell the team the ticket needs another day, take the visibility hit, and offer a revised commit." },
        { key: "b", label: "Mark the ticket as “in review” at standup, then quietly finish the work today and update the status before anyone checks. No public flag." },
        { key: "c", label: "Skip standup. Send a Slack message afterwards saying you needed focus time. Address the ticket status when someone asks." },
        { key: "d", label: "Disclose at standup but frame the blocker externally. “I was blocked on the API spec from another team.” Partially true. Mostly an exit." },
      ],
      justificationPrompt:
        "Why this option? What are you trying to protect, and what are you willing to risk?",
      /* Cold-open artifact-write — D2 introduces this in Segment A (D1 did
         not have it). After path selection, the participant writes the actual
         Slack / standup statement. The 3 reference versions land at B-0. */
      artifactWritePrompt:
        "Write the exact Slack message (or in-standup statement) you would actually send right now. No instructions to read — just write what you would write.",
      artifactWriteSubmit: "Send",
      sameDay: {
        a: [
          "You said it at standup. Two reviewers re-arranged their afternoon.",
          "Your manager nodded once and said “thanks for the heads up.” No praise. No warmth. No drama.",
          "The ticket moved to a new column. The standup ended. You went back to your desk and started working.",
        ],
        b: [
          "At standup, you said “in review.” No one questioned it. You worked through lunch.",
          "At 3:47 PM a reviewer pinged you: “Hey, ready when you are.” You typed back: “Almost there, finishing some edge cases.”",
          "You were not finishing edge cases. You were rewriting the core function. The reviewer did not push.",
        ],
        c: [
          "Your Slack message went unanswered for two hours. Then your manager replied: “Catch me before lunch.”",
          "You did. You explained the ticket. She listened. She said: “Next time, bring it to standup. That is what standup is for.”",
          "She did not say it sharply. She said it once.",
        ],
        d: [
          "At standup, you said the API spec was the blocker. A teammate from the other team looked at you. He did not say anything in standup.",
          "After the call, he Slacked you privately: “What spec? The spec went out Monday.”",
          "You did not reply for forty minutes.",
        ],
      },
    },
    safetyFloor: {
      card: [
        "THIS IS PRACTICE AND DEVELOPMENT.",
        "Your responses stay in your private rehearsal record unless you choose to share them.",
        "There are no ratings, no rankings, and no qualifying outcome.",
        "Growth Log = your private development record. Skill Passport = the separate observation pathway.",
        "You can pause anytime — your progress saves automatically.",
      ],
      narration: [
        "Ownership is not something you watch. It is not something you answer correctly. It is what you do when a commitment slips and other people are waiting on you.",
        "We are going to look at four more moments like the one you just had. They will not all be about deadlines. They will all be about ownership.",
      ],
    },
  },

  /* ------------------- SEGMENT B — BEHAVIOUR STANDARD --------------------- */
  segmentB: {
    /* B-0 — Reference Calibration. The cold-open artifact threaded forward;
       the three reference versions surface here per Standard §1.9. */
    b0: {
      label: "B-0 · Reference Calibration · 30s",
      narration: [
        "Before we go further — take a breath. Look at the message you just wrote.",
        "We are going to put it next to three other ways people commonly write this kind of message at work. None is rated. Each shows a different mode of accountability. The point is calibration, not comparison.",
      ],
      yourMessageLabel: "Your message (the one you just wrote at 9:14 AM):",
      references: [
        { tag: "Defensive", calibrated: false, text: "Hey, the ticket got more complex than expected — the data-model coupling caught us out. Will need to push the review until later this week. Not a blocker for the sprint goal AFAIK.", lands: "Reads as cover. The framing distances you from the slip; the manager hears “explanation,” not “owner.”" },
        { tag: "Over-apologetic", calibrated: false, text: "So sorry to drop this on you, I know this is the last thing you want to hear, but the ticket really isn’t ready and I feel terrible about it. I should have flagged this sooner. I really messed up here — will do better. Whatever you need from me, just tell me.", lands: "The apology takes up most of the message; the content of the slip gets buried. The manager now has to manage both the work and your distress." },
        { tag: "Calibrated", calibrated: true, text: "Flagging: the search-filter ticket I committed to closing this sprint is not going to be review-ready today. I underestimated the data-model coupling. Need 4 more working days. Can we sync for 15 minutes before reviewers are notified?", lands: "The manager hears: the slip, the cause, the magnitude, the proposed repair, and the ask — all in four sentences. She can decide what to do without translating the message." },
      ],
      closing:
        "The three references are not better or worse than yours. They are calibration anchors. What you wrote belongs to you. Hold it.",
    },
    intro: [
      "Before more scenarios, a quick read.",
      "What you are about to read is not a rulebook. It is a field guide — a description of what ownership looks like when it is present, and what it looks like when it quietly breaks down.",
      "The scenarios you will face later are built on what is in this guide. Read it carefully.",
    ],
    fieldGuide: {
      meaning: {
        title: "WHAT OWNERSHIP MEANS AT WORK",
        body: [
          "Ownership is not the same as authorship. Authorship is who wrote the code, who scoped the project, who drafted the document. Ownership is who carries the outcome when something goes well — and when something goes wrong. The two are often the same person, but not always. Knowing the difference is the start of the dimension.",
          "At the foundational level, this dimension is about situations where the accountable course of action is knowable. The challenge is in the doing, not the seeing. You know what you should do. The question is whether you do it.",
        ],
      },
      present: {
        title: "WHAT OWNERSHIP LOOKS LIKE UNDER WORKPLACE PRESSURE",
        intro: "At work, ownership shows in six places. You will recognise these from your own teams:",
        items: [
          { h: "The first thirty seconds after something slips.", t: "Owners flag early. Non-owners flag late or not at all." },
          { h: "The framing of the slip.", t: "Owners describe what happened. Non-owners describe what happened to them." },
          { h: "The repair offer.", t: "Owners propose a specific next step. Non-owners propose an explanation." },
          { h: "The execution after the offer.", t: "Owners do what they said. Non-owners do something adjacent." },
          { h: "The closing confirmation.", t: "Owners close the loop with the same person they opened it with. Non-owners let the loop stay open and hope no one checks." },
          { h: "The repeat pattern.", t: "Owners do this consistently across slips. Non-owners do it once and slide back." },
        ],
      },
      breakdown: {
        title: "SIX WAYS OWNERSHIP ERODES AT WORK",
        intro: "Most accountability failures are not the result of bad people. They are the result of decent people in workplace pressure moments making small adjustments that feel reasonable in the moment and that quietly cost trust over time. The six modes below are the ones D2 will rehearse you against.",
        items: [
          { h: "Late disclosure.", t: "You know it has slipped; you wait until you are asked." },
          { h: "External framing.", t: "You describe the slip in terms of what someone else did or did not do." },
          { h: "Vague repair offer.", t: "“I’ll get it done” rather than “I will have the reviewed pull request ready by Wednesday 11 AM.”" },
          { h: "Execution drift.", t: "You said one thing on Monday and delivered something adjacent on Wednesday." },
          { h: "Open loops.", t: "You never went back to the person who first raised it." },
          { h: "Pattern slippage.", t: "You did it correctly once when it was easy and slipped back when workplace pressure rose." },
        ],
      },
      end: {
        title: "THE COST IS PAID EITHER WAY",
        body: [
          "Every slip carries a cost. The only question is whether the cost is paid in the open, in the moment, by the person who owns the work — or paid quietly, over time, in the form of erosion of trust, of standing, of how your name is invoked when you are not in the room.",
          "Both costs are real. The first one is bounded. The second one compounds.",
          "D2 is about the first cost. About practising how to pay it in the open. Not because it is heroic, but because it is the only cost that does not compound.",
        ],
      },
    },
    reflectionPrompt:
      "Of the six places where ownership shows, which one comes most naturally to you under workplace pressure? And which one would be the hardest? Why?",
  },

  /* ------------------- SEGMENT C — RECOGNITION BRIEFS --------------------- */
  segmentC: {
    c1: {
      title: "C1 — The First Thirty Seconds",
      narration: [
        "Your manager finds out about the slip in one of two ways. She hears about it from you in the first thirty seconds after you know. Or she hears about it later, from someone else, or from a missed milestone, or from a reviewer asking why the PR is not up.",
        "The content of the message is similar in both cases. The interpretation is not. In the first case, she hears: this person notices their own slips and tells me. In the second case, she hears: I have to chase this one.",
        "Thirty seconds is not literal. It is the window between the moment you know and the moment you decide whether to disclose. That window is where the dimension lives.",
      ],
      /* C1 is conceptual recognition; rather than a 3-signal card like D1 we
         render the two cases as a contrast block. */
      cases: [
        { n: "i", h: "First case — she hears it from you.", t: "The disclosure is timely. It costs you the visibility hit, in the moment. What she reads is: this person notices their own slips and tells me. The window closes cleanly." },
        { n: "ii", h: "Second case — she hears it from someone else.", t: "Same content. Different interpretation. What she reads is: I have to chase this one. The window stays open and grows weight while it does." },
      ],
      close:
        "First thirty seconds. That is the window. The difference between the two cases above is not what was said — it is when it was said, and by whom.",
      prompt:
        "In your own words, what is the difference between “disclosure as a courtesy” and “disclosure as a courtesy you are forced to do later”? (3 sentences max.)",
    },
    c2: {
      title: "C2 — The Framing Trap",
      narration: [
        "There is a version of disclosure that sounds like accountability but lands as deflection. It is technically truthful. It frames the slip in terms of what someone else did, or did not do, or made you do. It is the framing trap.",
        "“I was blocked.” “They never sent the spec.” “The requirements changed three times.” “No one told me the priority had shifted.” Each of these may be true. Each of these may be the most-true thing in the situation. None of them owns the outcome.",
        "The behaviour-centred version is shorter. “I underestimated the work.” “I did not flag when the spec slipped.” “I should have re-baselined when the requirements shifted.” These cost more to say. They also build trust faster, because they describe the only variable you actually control.",
      ],
      /* The cost-equation card is D1's pattern. D2's Technology/Software
         framing — per Screen B-1/B-2/B-3 the cost frame is "bounded vs.
         compounding" rather than "honesty vs. silence." Re-rendered here as
         the C2 reveal card so the participant sees the trade-off
         explicitly. */
      equation: {
        title: "THE COST EQUATION (D2)",
        rows: [
          { k: "Cost of ownership:", v: "visible · immediate · uncomfortable" },
          { k: "Cost of deflection:", v: "invisible · delayed · compounding" },
        ],
        footer: "Both costs are real. The first one is bounded. The second one compounds.",
      },
      delayed: [
        "When you describe the slip in behaviour-centred terms, the cost arrives immediately. You feel exposed. The sentence is short and uncomfortable. You might look bad for a moment.",
        "But that cost is bounded. It happens once. It is visible. It resolves.",
        "When you describe the slip with external framing, the cost is delayed. The conversation goes well. The blame lands elsewhere. The first thirty seconds feel like a save.",
        "The compounding starts when the listener tracks the framing across slips. Once that file opens, you do not see it. They do.",
      ],
      closing: [
        "Behaviour-centred framing is shorter than external framing. It is also more uncomfortable. The discomfort is the price. The interest on the alternative is paid later, with someone you have not yet met, in a room you are not in.",
        "In every scenario ahead, the consequences play out across three time horizons: same day, next week, and month end. Watch where the real cost lands.",
      ],
      centralQuestionReturn: {
        label: "C2 · Part 3 — The central question returns · 45s",
        opener: "So we return to the question.",
        echo: "When something you committed to slips, what do other people see in how you handle it?",
        closing:
          "Now you know the tension this module is built on. The behaviour-centred sentence costs more at first. The external framing costs more later. The consequences will show you where the real cost lands.",
      },
      prompt:
        "Rewrite this sentence in behaviour-centred framing: “I could not finish the ticket because the API team kept changing the spec.” (One sentence.)",
      // C2 does not include a 4-option multiple choice — the script defines
      // a brief written response only. We leave options/justificationPrompt
      // off and have the renderer use a single-field Reflection.
    },
    c3: {
      title: "C3 — The Repair Sequence: Naming What You Already Did",
      open:
        "You have already used a four-step pattern in the last twelve minutes. We did not name it. You used it anyway. Now we name it.",
      framework: "The Repair Sequence",
      steps: [
        { name: "Acknowledge.", body: "You name the slip out loud, in behaviour-centred language, in the first thirty seconds after you know. Not the easy word. The accurate one." },
        { name: "Fix.", body: "You offer a specific repair: what you will do, by when, for whom. Not “I’ll get it done.” The sentence has a verb, a deadline, and a recipient." },
        { name: "Execute.", body: "You do what you said, in the time you said. Not something adjacent. Execution fidelity is the part most people skip — and the part the listener tracks." },
        { name: "Confirm.", body: "You close the loop with the same person you opened it with. “Here is what I said I would do; here is what I did; here is what is true now.” One short message. The loop closes." },
      ],
      close: [
        "You did not pick this up in C1 or C2. You used it in the cold open. The frameworks before this point were maps. The Repair Sequence is what you actually did. We are naming it now so you have a word for it when you need it.",
        "Hold this for a moment. You are about to use it four more times today.",
      ],
      prompt:
        "Which of the four steps — Acknowledge, Fix, Execute, or Confirm — came easiest to you in the cold open? Which one came hardest? One sentence each.",
    },
    complete: {
      label: "Transition to Segment D · 15s",
      narration: [
        "You now have the framework. The First Thirty Seconds. The Framing Trap. The Repair Sequence.",
        "Next, you will sit inside someone else’s accountability moment. A workplace story, told as it happens, with two decisions for you to make as it unfolds.",
        "Put your headphones on if you have them.",
      ],
      /* Per D2 script the Foundational/Intermediate scope notice is not
         declared explicitly. The doctrine section of the preamble names the
         tier as Foundational but the script does not script a Scope Notice
         card the way D1 does. To preserve the architectural beat (Foundational
         framing → tier-bounding language → Break Point 1), we author a
         D2-specific Scope Notice in the same observational register as D1's.
         FLAG (engineering-authored, not script-verbatim): re-pass for Tony
         review before lock.  */
      scopeBoundaries: {
        title: "Scope Boundaries — Foundational Tier and What the Intermediate Tier Adds",
        paragraphs: [
          "This behavioural Dimension [D2], Accountability & Ownership — Foundational, is deliberately bounded. It rehearses ownership: handling the slip well when the right course is already knowable.",
          "The scenarios are designed so that the accountable answer is clear. The difficulty lives in the doing, not the deciding. The participant knows what they should do. The module captures whether they acknowledge, repair, execute, and confirm when doing so carries a cost.",
          "This boundary is intentional, and it follows the WorkRehearsal doctrine. Behaviour that can be observed and rehearsed must have a knowable standard. Teaching accountability theory in the abstract is content delivery, not behavioural rehearsal. That is precisely the territory D2 is designed not to occupy.",
          "The Foundational tier holds the accountability question settled and concentrates the rehearsal on the repair response: flag the slip in behaviour-centred terms, propose a specific repair, execute the repair, close the loop.",
          "What this tier does not cover is genuine accountability ambiguity: situations where the ownership boundary itself is contested — shared deliverables across teams, work where the slip cannot be cleanly traced to one person, decisions delegated upward.",
          "That variability belongs in the Intermediate tier.",
          "Where the Foundational tier asks, “Will you run the Repair Sequence when it costs you?”, the Intermediate tier asks, “How do you carry ownership when the boundary of who owns what is itself in dispute?”",
          "The Foundational tier is the floor the Intermediate tier builds on. You cannot rehearse contested ownership until the repair response in clarity is already a pattern.",
        ],
      },
    },
    breakPoint1: {
      label: "Pause invitation · Break Point 1 · 15-20s",
      title: "PAUSE INVITATION · BREAK POINT 1",
      subtitle: "After Segment C",
      elapsedLabel: "Elapsed: ~22 minutes",
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

  /* ---------------- SEGMENT D — AUDIO CASE: PRIYA'S HOTFIX ---------------- */
  segmentD: {
    title: "Priya's Hotfix",
    intro: [
      "You are about to hear a workplace story. It is a real situation, lightly fictionalised.",
      "The person at the centre of it is an engineer named Priya. She is two years out of her undergraduate degree, working at a series-B fintech with sixty engineers. She is competent. She is well-regarded. And this morning she did something she has not yet told anyone about.",
      "The story will pause twice. At each pause, you will choose what Priya should do. Then you will write the actual Slack message she would send.",
    ],
    part1: {
      heading: "Part 1 — The Discovery",
      narration: [
        "At 6:47 AM, Priya merged a hotfix into production. The hotfix was for a billing-display bug that customer support had been complaining about for three days.",
        "The change was small. She reviewed it herself — she did not request a peer review, because the change felt obvious and the on-call engineer was already off shift.",
        "At 7:14 AM, production billing throughput dropped by 11%. By 7:30 it had dropped 34%. The on-call alert fired at 7:34. The on-call engineer, who had just woken up, paged the senior backend team. By 7:50 they had rolled back.",
        "The post-incident review is being scheduled for 11 AM today.",
        "Priya knows it was her hotfix. She has not said anything yet. The on-call team is asking in Slack who pushed at 6:47. Priya is reading the thread.",
      ],
      // The script does not specify in-world artifacts at D-2 for D2 the way
      // D1 specified a Q1 client report + Slack thread. We render the Slack
      // thread Priya is reading + the rollback timeline as artifacts so the
      // beat lands visually. FLAG (engineering-authored from narration cues,
      // not script-verbatim): re-pass for Tony review before lock.
      slackArtifact: {
        title: "Slack · #incidents-prod — this morning",
        body:
          "on-call-lead — 7:36 AM\nWho pushed at 6:47? Billing throughput dropped 34% before rollback. Need owner for the 11 AM post-mortem.\n\non-call-eng — 7:38 AM\nNo peer review on that commit. Pulling git log now.\n\non-call-lead — 7:42 AM\nWhoever it was — please post here.",
        readReceipt: "[Read: 7:51 AM Thursday — Priya's status: viewing]",
      },
      timelineArtifact: {
        title: "Production timeline — Thursday morning",
        lines: [
          "06:47  Priya merges hotfix to prod  (no peer review)",
          "07:14  Billing throughput -11%",
          "07:30  Billing throughput -34%",
          "07:34  On-call alert fires",
          "07:50  Rollback complete",
          "11:00  Post-mortem scheduled",
        ],
      },
    },
    pause1: {
      prompt: "What should Priya do, in this moment?",
      options: [
        { key: "a", label: "Reply in Slack now: “It was my hotfix at 6:47. I skipped peer review because the change looked small. I am here for the 11 AM debrief and will write the post-mortem.”" },
        { key: "b", label: "Wait. The team will figure out it was her. She can address it at the 11 AM debrief properly, with context and a fix proposal already drafted." },
        { key: "c", label: "Reply in Slack now, but frame the disclosure as “I think this may have been from my hotfix; investigating now.” Leave room for ambiguity until the post-mortem confirms it." },
      ],
      justificationPrompt: "Why this option? What is Priya trying to protect or achieve with this first move?",
      consequences: {
        a: [
          "Priya posted at 7:58. The on-call lead responded within ninety seconds: “Thanks. See you at 11.”",
          "At the debrief, three different engineers said some version of “the disclosure was clean.” The post-mortem was about the process gap, not about Priya. She wrote it. She owns the fix.",
        ],
        b: [
          "By 9:30, the team had identified Priya’s commit. By 10:15, the on-call lead Slacked her privately: “See you at 11. We knew it was your push at 8:20.”",
          "At the debrief, the conversation kept circling back to why no one knew. The post-mortem mentioned “delayed disclosure” as a contributing factor. Priya wrote the technical fix; someone else wrote the process recommendations.",
        ],
        c: [
          "Priya posted at 8:01 with the ambiguous framing. By 8:30 someone else had checked git log and confirmed it.",
          "In the channel, the framing read as “trying to soften it.” Two people thanked her for posting; one asked, privately, “why phrase it like you weren’t sure?” The post-mortem treated her with respect. The Slack thread did not.",
        ],
      },
    },
    pause2: {
      heading: "Decision 2 — Post-mortem leadership",
      narration: [
        "It is now 10:30 AM. The post-mortem is in 30 minutes.",
        "Priya’s manager Slacks her privately: “Will you lead the write-up?”",
        "The team will see whoever leads it. Whoever leads it owns the analysis publicly, including the line that names the person who pushed at 6:47.",
      ],
      prompt: "What should Priya do?",
      options: [
        { key: "a", label: "Accept the lead. “Yes. I caused this; I should write the analysis. I will draft and post before 11.”" },
        { key: "b", label: "Defer. “I think you should lead the write-up. I am too close to it. I will contribute the technical details.”" },
        { key: "c", label: "Accept with a sanity check. “Yes. Can I get a 5-minute review from someone senior before I post it?”" },
      ],
      justificationPrompt: "Why this option? What is Priya weighing about how this lands publicly?",
      consequences: {
        a: [
          "Priya wrote the post-mortem herself. The analysis named the gap clearly: she skipped peer review on a billing-system hotfix.",
          "Two engineers privately told her afterwards: “That took guts. Most people would have hidden behind a co-author.” The post-mortem became the team’s reference example for clean ownership.",
        ],
        b: [
          "The manager wrote the post-mortem. Priya contributed. The optics were fine; the post-mortem was clean.",
          "But two engineers later said privately: “Priya stepped back from her own incident.” The manager did not say it. The team noticed it.",
        ],
        c: [
          "Priya led with a sanity check from the on-call lead. The lead approved with minor edits.",
          "The post-mortem shipped at 11:08 with Priya as primary author. The lead told the manager later: “She asked the right question — should I have someone look over this? — and then she owned it.”",
        ],
      },
      // The Decision 2 also requires the artifact-write (Priya's Slack message
      // to the on-call channel per D-4.7). The references for that artifact
      // are declared on the script:
      artifactWrite: {
        prompt:
          "Write Priya’s Slack message to the on-call channel. Keep it short. Name what happened, what she did, and what she will do next.",
        submitLabel: "Send to #incidents-prod",
        minChars: 50,
        references: [
          { tag: "Defensive", calibrated: false, text: "Hey — looks like the 6:47 push may have been mine. The change looked small and the on-call was off shift so I didn’t request review. Will dig into the rollback and post-mortem.", lands: "The hedging (“may have been mine,” “looked small”) reads as cover. The team hears explanation; the on-call lead has to ask the next question." },
          { tag: "Over-apologetic", calibrated: false, text: "Oh god, I am so sorry. The 6:47 push was me. I skipped peer review which I never should have done. I have caused a real production incident and I take full responsibility — whatever consequences flow from this, I accept them. I am here for whatever the team needs.", lands: "The apology takes up the whole message. The on-call lead now has to manage the apology before they can engage with the fix." },
          { tag: "Calibrated", calibrated: true, text: "It was my hotfix at 6:47. I skipped peer review because the change looked small. I am here for the 11 AM debrief and will write the post-mortem.", lands: "Acknowledge, Fix, Execute, Confirm — all four steps in three sentences. The on-call lead has everything they need. The thread closes in 90 seconds." },
        ],
        closing:
          "What changes between these three versions: how directly the slip is named, where the framing places the cause, and whether the next step is offered or left implied.",
      },
    },
    part3: {
      heading: "Part 3 — What Happened",
      narration: [
        "The post-mortem ran at 11. Whoever was named the primary author of the document is the person whose name is attached to the analysis, in the file, for as long as anyone goes back to read it.",
        "A month from now, when the next billing-system hotfix is ready to ship, someone on the team will remember how this morning went. They will remember the Slack message, the post-mortem, and who wrote it. They will not always remember the rollback.",
        "What Priya carries into the next incident is whatever she did in those two moments — at 7:58 in Slack, and at 10:30 with her manager.",
        "The story ends here, but the pattern does not. Every incident from this Thursday onward sits on top of what she did this morning.",
      ],
    },
    close: {
      card: [
        "You made two decisions inside Priya’s story.",
        "Some of what those decisions revealed, you saw as you made them.",
        "Some of it, you may not see for weeks.",
        "That is how this kind of judgment works.",
      ],
    },
    reflection: {
      prompt: "What did Priya’s choice cost, and what did it buy? (2–3 sentences.)",
    },
    complete: {
      label: "Transition to Segment E · 20s",
      narration: [
        "Priya’s story was one moment. The next four are yours.",
        "Each one will be in a slightly different sector context — but the dimension is the same. You will be in tech, then in tech with a client-facing wrinkle, then in tech with a peer-conflict wrinkle, then in tech with a manager-disclosure wrinkle.",
        "Each time, you will choose one of three paths. Each time, the path will play out across the same day, the next week, and the month end.",
        "Take a moment. The next segment is the core of the module.",
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
        "You have just heard a workplace situation unfold and made decisions inside it. Let what you have practised so far settle.",
        "The Scenario Lab ahead will ask more of you — and you are more ready for it than you think.",
        "Step away if you need to. Reflect. Come back when you are ready.",
      ],
      continueLabel: "Enter the Scenario Lab",
      returnLaterLabel: "Return later",
    },
  },

  /* ------------------ SEGMENT F — MICRO-DRILLS (consolidation) ------------- */
  segmentF: {
    intro: "Two short consolidation drills. Behaviour-centred rewrite, then specific repair offer. The Repair Sequence taken from understood to reflex.",
    f1: {
      title: "F1 — Behaviour-Centred Rewrite",
      audioIntro:
        "Five short Slack-style messages, each containing an externalising frame. Rewrite each one in behaviour-centred framing. Sixty seconds per item. The drill is timed but the timer does not block submission — it nudges. After 60 seconds, the timer turns amber and the message “you can keep going if you need to” appears below the input.",
      header: "Five short messages with externalising frames. Rewrite each one in behaviour-centred framing.",
      onScreenHeader: {
        title: "BEHAVIOUR-CENTRED REWRITE",
        lines: [
          "You will see five short messages.",
          "Each one is framed externally — it puts the cause outside the speaker.",
          "Rewrite each one in behaviour-centred framing. One sentence.",
        ],
        cta: "Tap to begin.",
      },
      // F1 is an artifact-write drill, not multiple choice. We use the same
      // vignette-with-reference-versions pattern as D1's Segment E.
      items: [
        {
          vignette: "“I couldn’t finish the report because finance never sent the numbers.”",
          prompt: "Rewrite this in behaviour-centred framing. One sentence.",
          references: [
            { tag: "Defensive rewrite", calibrated: false, text: "I’m chasing finance for the numbers — should have them soon. Report will follow.", lands: "Still locates the cause outside the speaker. The verb is “chasing,” not “owning.”" },
            { tag: "Over-apologetic rewrite", calibrated: false, text: "So sorry, I dropped the ball on the report — I should have escalated when finance went quiet. Won’t happen again.", lands: "Ownership is there, but buried under apology. The actionable part gets lost." },
            { tag: "Calibrated rewrite", calibrated: true, text: "I did not escalate when the numbers from finance were late. The report is now a day behind. New target: end of day Thursday — does that work?", lands: "Names the behaviour the speaker controlled, the magnitude of the slip, and the proposed repair. Three sentences, no deflection." },
          ],
        },
        {
          vignette: "“The deploy broke because the staging environment was misconfigured.”",
          prompt: "Rewrite this in behaviour-centred framing. One sentence.",
          references: [
            { tag: "Defensive rewrite", calibrated: false, text: "Staging config drift caused the deploy to fail — we’ll get it stabilised.", lands: "Same external frame in a tidier sentence. The drift is still the subject, not the speaker." },
            { tag: "Over-apologetic rewrite", calibrated: false, text: "I am really sorry about the deploy — I should have caught the staging config before pushing. I feel awful.", lands: "Ownership is there but takes a back seat to apology. No repair offer." },
            { tag: "Calibrated rewrite", calibrated: true, text: "I shipped without verifying staging matched prod. The deploy broke. I’m rolling back now and will post a config-parity check we can add to the release script — draft to you by EOD.", lands: "Acknowledges the behaviour, names the consequence, proposes a specific durable fix with a deadline." },
          ],
        },
        {
          vignette: "“The meeting ran long so I didn’t get to the project update.”",
          prompt: "Rewrite this in behaviour-centred framing. One sentence.",
          references: [
            { tag: "Defensive rewrite", calibrated: false, text: "Couldn’t fit the update in — meeting overran. Will follow up async.", lands: "The meeting is the subject. The speaker is along for the ride." },
            { tag: "Over-apologetic rewrite", calibrated: false, text: "I’m so sorry I didn’t get to the project update — I should have flagged it earlier in the agenda.", lands: "Apology dominates; the proposed repair is implied but not stated." },
            { tag: "Calibrated rewrite", calibrated: true, text: "I did not protect time for the project update on the agenda. Posting a 5-bullet written version in this thread by 4 PM today — any flags, reply there.", lands: "Owns the agenda call, names the repair, names the channel, names the time. Repair Sequence in one sentence." },
          ],
        },
        {
          vignette: "“The client is being unreasonable about the timeline.”",
          prompt: "Rewrite this in behaviour-centred framing. One sentence.",
          references: [
            { tag: "Defensive rewrite", calibrated: false, text: "Client expectations are out of line with what we scoped — need to reset.", lands: "Frames the client as the problem. The speaker is still observing." },
            { tag: "Over-apologetic rewrite", calibrated: false, text: "I’m sorry — I should have set timeline expectations more clearly at kick-off. The client is now upset.", lands: "Ownership is present, but the sentence ends on the client’s state, not on a repair." },
            { tag: "Calibrated rewrite", calibrated: true, text: "I did not push back on the original timeline when I knew it was tight. I’m drafting a revised plan with two delivery options and will share it with the client tomorrow — want to review before I send?", lands: "Names the behaviour, names the repair, names the next gate, names the ask." },
          ],
        },
        {
          vignette: "“I was waiting on the design team and they never got back to me.”",
          prompt: "Rewrite this in behaviour-centred framing. One sentence.",
          references: [
            { tag: "Defensive rewrite", calibrated: false, text: "Still blocked on design — pinged them again today.", lands: "External cause, polite verb, no movement." },
            { tag: "Over-apologetic rewrite", calibrated: false, text: "Sorry for the delay — I should have escalated to design lead sooner. My bad.", lands: "Ownership of the escalation gap is there. No repair offer or deadline." },
            { tag: "Calibrated rewrite", calibrated: true, text: "I did not escalate when design went quiet for three days. Booking a 15-minute sync with their lead this afternoon — will post the outcome in this thread by EOD.", lands: "Names the inaction, names the escalation, names the channel and the deadline." },
          ],
        },
      ],
      closeCard:
        "You have rewritten five sentences. The language of behaviour-centred framing is now the language you reach for first when something slips and you start to type.",
    },
    f2: {
      title: "F2 — Specific Repair Offer",
      audioIntro:
        "Three short scenarios. For each one, write a one-sentence repair offer in the shape of the Repair Sequence: Acknowledge, Fix, Execute, Confirm. The offer must be specific — what you will do, by when, for whom. Ninety seconds per scenario.",
      header: "Three workplace scenarios. Write one sentence — a specific repair offer.",
      onScreenHeader: {
        title: "SPECIFIC REPAIR OFFER",
        lines: [
          "You will see three scenarios.",
          "For each, write a one-sentence repair offer.",
          "The offer must be specific — what you will do, by when, for whom.",
        ],
        cta: "Tap to begin.",
      },
      items: [
        {
          vignette: "A teammate flags that you missed reviewing their PR for two days. Write a one-sentence repair offer.",
          prompt: "Write the offer. One sentence in the Repair Sequence shape.",
          references: [
            { tag: "Defensive", calibrated: false, text: "Apologies, got buried — will get to it ASAP.", lands: "No specific timing, no commitment, no closing of the loop. “ASAP” is the language of a slip that will slip again." },
            { tag: "Over-apologetic", calibrated: false, text: "I am so sorry I let this sit for two days — that is not okay, I will do better, reviewing right now.", lands: "Most of the sentence is about the speaker’s discomfort. The teammate now has to manage that before getting their PR reviewed." },
            { tag: "Calibrated", calibrated: true, text: "I did not get to your PR — fully on me. Reviewing now, comments in the PR by 3 PM today. Ping me if 3 PM is too late.", lands: "Acknowledge → Fix → Execute → Confirm in three sentences. Specific time. Closes the loop with the same person." },
          ],
        },
        {
          vignette: "Your manager mentions that a metric you committed to reporting weekly has not been updated for three weeks. Write a one-sentence repair offer.",
          prompt: "Write the offer. One sentence in the Repair Sequence shape.",
          references: [
            { tag: "Defensive", calibrated: false, text: "Yeah, fell off my radar with the quarter-end push — will get it back on track this week.", lands: "Names a reason that is technically the speaker’s but lands as “other priorities.” No specific update or commitment." },
            { tag: "Over-apologetic", calibrated: false, text: "I am so sorry — I cannot believe I let three weeks slip. I will get every missing week backfilled tonight, no matter how late.", lands: "The dramatic repair offer (“tonight, no matter how late”) is not the right repair. The manager wants the metric reliable, not heroic." },
            { tag: "Calibrated", calibrated: true, text: "I dropped the weekly metric — three weeks missing. Posting last week’s now and adding a Friday calendar block for it going forward. Will confirm Friday once the next one lands.", lands: "Acknowledges the slip, fixes the missing data, sets the durable structure, closes the loop next Friday." },
          ],
        },
        {
          vignette: "A client emails: “Hi — we haven’t heard back on the integration question from last Tuesday.” Write a one-sentence repair offer.",
          prompt: "Write the offer. One sentence in the Repair Sequence shape.",
          references: [
            { tag: "Defensive", calibrated: false, text: "Apologies for the delay — looking into it now, will revert shortly.", lands: "“Revert shortly” is the diplomatic version of “I haven’t started yet.” No real commitment." },
            { tag: "Over-apologetic", calibrated: false, text: "I am so sorry for the silence on this — that is not the experience I want you to have with us. I will get you a full answer first thing tomorrow.", lands: "Apology dominates the message. “First thing tomorrow” is unspecific enough that the client will not know whether to expect it at 8 or at 11." },
            { tag: "Calibrated", calibrated: true, text: "Apologies — I missed your message from last Tuesday. Sending a written answer with the integration spec by 11 AM tomorrow. If anything in it raises new questions, I will be on a call you book before Thursday.", lands: "Names the slip, names the deliverable and the time, names the next gate. The client knows what to expect and when to escalate." },
          ],
        },
      ],
      closeCard:
        "You have written three repair offers. The next time you have to write one in a Slack message at the speed of the day, the shape is already there.",
    },
    reflection:
      "Which of the 8 messages you just wrote was hardest to write, and what made it hard? (2 sentences.)",
    complete: {
      label: "Transition to Segment G · 15s",
      narration: [
        "The Field Guide gave you the language.",
        "The Scenario Lab gave you the consequences.",
        "The micro-drills settled the Repair Sequence into reflex.",
        "One thing left.",
      ],
      continueLabel: "Continue",
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
    recognitionLabel: "Recognition narration · 35s",
    recognition: [
      "You just rehearsed the dimension four times. Each time, in a different context. Each time, with a different cost.",
      "Some of your paths were close to what you would actually do. Some surprised you. Both are useful.",
      "What you are carrying out of this module is not a rating. It is not a credential. It is not a list of things you practised. It is a sharper sense of what the dimension feels like in your hands when workplace pressure rises.",
    ],
    recognitionCard: {
      title: "WHAT YOU ARE CARRYING NOW",
      lines: [
        "Not a rating. Not a credential.",
        "A piece of judgment that was not there ninety minutes ago.",
      ],
    },
    callback: {
      a: "You opened this module by disclosing at standup. Hold that first instinct beside the choices that followed.",
      b: "You opened this module by quietly finishing the work. Hold that first instinct beside the choices that followed.",
      c: "You opened this module by skipping the room. Hold that first instinct beside the choices that followed.",
      d: "You opened this module by framing the blocker externally. Hold that first instinct beside the choices that followed.",
    },
    frameworkReturn: {
      label: "Framework Return · 35s",
      durationSeconds: 35,
      lead: "Before you go to your Growth Log, one quiet recall.",
      body: "You moved through four scenarios. Different stakes. Different costs. But the same four steps.",
      steps: ["Acknowledge.", "Fix.", "Execute.", "Confirm."],
      tagline: "This is The Repair Sequence.",
      carryForward:
        "You used it five times today. You will use it tomorrow. Some days, the sequence will be a single Slack message. Some days, it will take a week. The pattern stays. You carry it now.",
    },
    delayedRetentionCheck: {
      label: "Retention check setup · 45s",
      title: "DELAYED RETENTION CHECK",
      narration: [
        "In three to seven days, this module will return you to one of the scenarios you just rehearsed.",
        "We will show you the path you chose, the words you wrote, and ask you one question: is this still what you would do?",
        "Memory plus judgment under time-shift. You will know it is coming. You will not know when. Take it when you have a quiet five minutes.",
        "If your judgment has settled differently in a few days, the system will guide you back to the specific scenarios worth revisiting. Returning is not a setback — it is part of how the rehearsal compounds.",
      ],
      details: [
        { k: "Appears", v: "3 to 7 days from now (notification sent)" },
        { k: "Format", v: "Re-rehearsal of one selected scenario (1 question)" },
        { k: "Response", v: "Decision + brief justification" },
        { k: "Attempts", v: "2 available" },
        { k: "Cooldown", v: "48 hours between attempts" },
        { k: "Window", v: "72 hours from first attempt" },
      ],
      doctrinalNote: [
        "This is not a pass / fail check. It is a check that the judgment pattern has stayed with you after time has passed.",
        "If the pattern has settled differently, the system will guide you back to the scenarios worth revisiting.",
      ],
      continueLabel: "Got it — continue",
      questionsPerAttempt: 1,
      attemptsMax: 2,
      cooldownHours: 48,
      windowHours: 72,
      notificationWindowHours: [72, 168],
    },
    bookendQuestion:
      "When something you committed to slips, what do other people see in how you handle it?",
    finalPrompt:
      "In one sentence, what is one thing you will do differently the next time something slips?",
  },
};

/* ============================================================================
   SCENARIO CHAIN 1 — THE DEADLINE YOU CANNOT MEET
   ========================================================================== */
export const SC1_CONTENT_D2 = {
  id: "SC1",
  title: "The Deadline You Cannot Meet",
  commitment: "Decide how to handle a commitment that will slip before the deadline arrives.",
  callback: [
    "You have been here before.",
    "At the start of this module, you saw this moment for 30 seconds — sixteen minutes before standup. Now you return to it three weeks deeper in.",
    "You may choose the same posture again, or choose differently. Notice whether your reasoning has changed.",
  ],
  intro: [
    "Scenario one. The Deadline You Cannot Meet.",
    "You committed to a delivery. The estimate was wrong. The work is at most 40% done and Friday is the date your manager has already mentioned in two cross-team meetings this week.",
  ],
  briefing:
    "You are a software engineer on a four-person feature team. Three weeks ago you committed to delivering a new search filter by Friday. Today is Tuesday. The work is at most 40% done. The original estimate was wrong; the underlying data model is more entangled than you expected. You have not told anyone yet. Your manager has already mentioned the Friday delivery in two cross-team meetings this week.",
  // The script for SC1 also threads back the participant's cold-open
  // artifact text. The renderer will substitute it at view time.
  briefingArtifactRecall:
    "Earlier this morning at the standup you wrote a message you can still see in your Slack history. That message anchors what your team currently knows. The scenario below is the same project arc, three weeks deeper in.",
  artifacts: [
    {
      caption: "Sprint board view, ticket #4297 highlighted",
      title: "Jira · Ticket #4297",
      mono: true,
      lines: [
        "Ticket #4297: Search filter: facet by region + product type",
        "Assignee: you",
        "Status: In Progress",
        "Estimated: 5 days",
        "Started: 9 days ago",
        "Linked PR: #2841 (Draft, 14 commits, last commit yesterday)",
      ],
    },
  ],
  decisionPrompt: "Choose how to handle the slip. Each path leads to a different outcome on the same day, the next week, and the month end.",
  options: [
    { key: "a", label: "Slack your manager now: “Hey, want to flag something. Ticket #4297 will not be ready by Friday. I underestimated the data-model coupling. Need 4 more working days. Can we sync for 15 min?” Behaviour-centred framing, specific repair offer, concrete ask." },
    { key: "b", label: "Wait until Friday standup. Frame it as: “It is going to slip by a few days. The data model was more complex than expected.” Passive framing, vague repair offer." },
    { key: "c", label: "Send a long Slack message at end of day Thursday: “Wanted to flag the search filter work. The data-model integration has been challenging due to legacy table structures and inconsistent typing in the regional codes. Will need additional time, possibly into next week.” Disclosure but with explanatory framing that distances you from the slip." },
    // SC1 is documented in the script as 3 paths only. We extend with a
    // 4th D-path to keep the engine's a/b/c/d threading and trajectory
    // chart compatible with D1's shape. Path D = no flag at all (the
    // implicit option the script frames the prior three against).
    // FLAG (engineering-authored 4th path, not script-verbatim): re-pass
    // for Tony review before lock; remove if script-fidelity over
    // engine-fidelity is preferred.
    { key: "d", label: "Do not flag at all. Push hard between now and Friday morning, hope to land within hours of the deadline, and address the slip only if your manager raises it." },
  ],
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  artifactWrite: {
    a: { prompt: "Write the Slack message you would actually send to your manager right now. Keep it short. Name what happened, what you will do, and what you need from her.", submit: "Send to manager" },
    b: { prompt: "Write what you would actually say in Friday standup when the slip surfaces. The exact words.", submit: "Save for standup" },
    c: { prompt: "Write the long Slack message you would actually send at end of day Thursday. The exact words.", submit: "Send to manager" },
    d: { prompt: "Write the private note you keep for yourself — what you are choosing not to say, and why.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Hey, just a heads up — the search filter ticket has gotten more complex than the original scope. The data model has more coupling than the original spec suggested. Will need to revise the timeline.", lands: "Locates the cause in the data model, not in the speaker. The manager has to ask the next question to learn what the speaker is going to do about it." },
      { tag: "Over-apologetic", calibrated: false, text: "So sorry to drop this on you, I know this is the last thing you need. I should have seen this earlier. I really underestimated the work and I feel terrible about it. Whatever you need me to do to make this right, just say the word — weekends, late hours, anything.", lands: "Apology dominates the message; the work and the repair get crowded out. The manager now has to manage both the slip and the apologiser." },
      { tag: "Calibrated", calibrated: true, text: "Flagging: ticket #4297 will not be review-ready by Friday. I underestimated the data-model coupling. Need 4 more working days. Want to sync for 15 minutes today so you can decide what to tell the cross-team folks?", lands: "Acknowledge, Fix, Execute, Confirm — the full sequence in four sentences. The manager has the slip, the cause, the magnitude, the proposed repair, and the ask. She can move." },
    ],
    b: [
      { tag: "Vague standup version", calibrated: false, text: "Quick heads up — search filter is going to slip by a few days. Data model was more complex than expected.", lands: "Names the slip and the cause; offers no specific repair, no new date, no closing of the loop. The team gets a fact, not a plan." },
      { tag: "Specific standup version", calibrated: true, text: "Flagging: ticket #4297 is going to slip. Underestimated the data-model coupling. Targeting Wednesday next week. Will send a written update to the cross-team channel today.", lands: "Same room, same audience, different shape. The team hears the slip, the cause, the new target, and the next channel. The standup ends and the work moves forward." },
    ],
    d: { card: "Whatever you wrote, you now have a record of this moment that you did not have before — even if no one else ever sees it." },
  },
  consequences: {
    a: {
      sameDay: [
        "Your manager replied within 90 seconds: “Thanks for the heads up. Let’s sync at 2.”",
        "At 2:00 you walked through the data model with her. She agreed with the 4-day extension. She also said: “This kind of flag is the right thing. Next time, I’d like the flag even earlier — the moment you suspect the estimate is wrong.”",
        "No drama. No praise. No warmth. The work moved from “deadline” to “rescheduled.”",
      ],
      nextWeek: [
        "Wednesday of the following week. The work is delivered, reviewed, and merged.",
        "Your manager mentioned it in standup: “Thanks for the early flag on this one. Saved us a meeting with marketing.” That was the entire callback. No further mention.",
        "The cross-team team-lead, who you barely know, sent a Slack DM later: “Heard you flagged the search filter early. Appreciate that.” You did not know that person knew.",
      ],
      monthEnd: [
        "End of month. Performance check-in.",
        "Your manager: “The search filter slip. That is the one I keep coming back to as a good example of how I want this team to handle estimates that turn out to be wrong. Early flag, specific ask, concrete repair offer. You bought us a meeting we would otherwise have had to have under pressure.”",
        "The slip is now a positive data point in her file on you.",
      ],
      outcome: "Flagged 4 days early in behaviour-centred terms. Manager agreed to the new date in a 15-minute sync.",
      others: "The PM stopped asking for status updates on your work. You moved up the trust queue.",
      interp: "She flagged the slip in the first thirty seconds and took the rework on herself.",
      manager: "Manager’s perspective. “Early flag, specific ask, concrete repair offer. That is the pattern I want this team known for. The slip is the slip — it happens. What I care about is how I hear about it.”",
      traj: "rise",
    },
    b: {
      sameDay: [
        "Friday standup. Your manager went still for half a second when you said it.",
        "Then said: “We need to talk after this.” After standup, in a private 1:1, she asked when you first knew.",
        "You said “maybe Wednesday.” She said: “Wednesday was three days ago. Two cross-team commits were made on the assumption this would land. I have to walk those back now.”",
      ],
      nextWeek: [
        "The work is delivered Wednesday. The marketing team had been told Friday. They had drafted a launch email referencing the new filter. They had to pull it.",
        "Your manager wrote a one-line apology to their team-lead. She did not include you on it.",
        "In your next 1:1 she said: “When we say Friday, the operational system around us moves. I need to know about slips before they cost us trust in other teams.”",
      ],
      monthEnd: [
        "End of month. Performance check-in.",
        "The slip is on the table, but not as the main thing. The main thing is the pattern she suspects: that you wait until the deadline forces disclosure.",
        "She does not say this directly. She says: “I’d like to see you flag earlier in the next cycle.” That is the entire sentence. You hear it.",
      ],
      outcome: "Waited until standup to flag the slip. The downstream team had already committed against your date.",
      others: "Your manager started asking when you first knew, on the next slip and the one after.",
      interp: "She delayed the flag and the downstream cost showed up in someone else’s timeline.",
      manager: "Manager’s perspective. “The slip itself was fine. The waiting was not. I now have to plan for what I do not know about her work — and that is the loss.”",
      traj: "drift-down",
    },
    c: {
      sameDay: [
        "Friday morning. Your manager read the message and replied: “Call me at 10.”",
        "On the call: “I appreciate the detail. But I want to flag something. The phrasing ‘legacy table structures’ — that is shifting the frame to something external. The data model is the same data model you scoped against three weeks ago. Help me understand what you would have said if the legacy structure wasn’t there.”",
        "You stumbled.",
      ],
      nextWeek: [
        "The work is delivered Tuesday.",
        "Your manager, in a follow-up 1:1, returned to the Friday call: “I want to come back to the framing thing. Watch for that. When you put the cause outside yourself, you trade short-term comfort for long-term standing. It costs more than it saves.”",
        "You said “understood” and meant it.",
      ],
      monthEnd: [
        "End of month. Performance check-in.",
        "“You disclosed. That is good. But twice in the last six weeks I have heard you frame slips in terms of upstream constraints. I want to be direct: that framing erodes credibility faster than the slip itself. Watch for it.”",
        "You leave the meeting with one item to work on.",
      ],
      outcome: "Disclosed Thursday end-of-day, but framed the cause externally (“legacy table structures”). Manager flagged the framing on the next call.",
      others: "Your manager began naming framing as a pattern in your 1:1s — twice in six weeks.",
      interp: "She disclosed in time, but the framing put the cause outside herself.",
      manager: "Manager’s perspective. “The disclosure was there. The framing is the part I will be watching. External framing, even when it is true, costs more than the slip it covers.”",
      traj: "dip-flat",
    },
    d: {
      sameDay: [
        "You said nothing. You worked late.",
        "By Friday afternoon, the gap was undeniable. Your manager Slacked: “Where are we on #4297?”",
        "You replied with the truth — incomplete, still a few days out. The conversation that followed was the one you had been avoiding all week, only it landed under more pressure than it would have on Tuesday.",
      ],
      nextWeek: [
        "The work is delivered Wednesday. The cross-team commitments had to be walked back at the eleventh hour.",
        "Your manager sent a short Slack to her own manager: “Search filter slipped. We are recovering.” Your name was attached to the linked ticket but not to the recovery plan.",
        "In your 1:1, she did not raise it dramatically. She said: “I want to know about slips when you know about them — not when the deadline tells me.”",
      ],
      monthEnd: [
        "End of month. Performance check-in.",
        "The slip is on the table, and so is the silence around it. Your manager is not punitive. She is direct: “The deadline did the disclosure for you. That is not how I want to learn about your work.”",
        "The line lands quietly. It will lie on top of every future slip.",
      ],
      outcome: "Did not flag at all. The deadline surfaced the slip; the recovery happened under pressure.",
      others: "Your manager moved you down the trust queue — quietly, without naming it.",
      interp: "She let the deadline do the disclosure. The silence was the decision.",
      manager: "Manager’s perspective. “The slip was the slip. The silence was the choice. I cannot plan for work I do not know is in trouble, and now I have to ask twice as many questions about everything else she touches.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Early flag, specific repair offer", signal: "Names the slip in behaviour-centred terms 4 days before the deadline, with a concrete new date and a specific ask.", effect: "Short-term discomfort, long-term trust deposit." },
    { key: "b", title: "Flag at standup", signal: "Flags the slip on the deadline day, in passive framing, with no new date offered.", effect: "Downstream teams have already committed against the original date; recovery happens under pressure." },
    { key: "c", title: "Disclosure with external framing", signal: "Discloses on Thursday but frames the cause in terms of upstream constraints (“legacy table structures”).", effect: "Disclosure landed; the framing pattern gets named in the next 1:1." },
    { key: "d", title: "No flag — let the deadline disclose", signal: "Says nothing until the deadline forces the conversation. The silence is the decision.", effect: "Trust costs that arrive later, often without being named directly." },
  ],
  reflection:
    "Think of a time you knew a deadline was going to slip days before you flagged it. What was the cost of the delay? Was it higher or lower than the cost of an early flag would have been?",
};

/* ============================================================================
   SCENARIO CHAIN 2 — THE CLIENT DECK YOU FORGOT TO UPDATE
   ========================================================================== */
export const SC2_CONTENT_D2 = {
  id: "SC2",
  title: "The Client Deck You Forgot To Update",
  commitment: "Decide how to handle a deliverable that is about to go to a client with a known error.",
  /* SC2/SC3/SC4 use the cross-scenario threading variants per spec.
     Internal keys: complete / partial / absent. We map to the engine's
     existing reliable/mixed/unreliable threading buckets via the
     BridgeFastD2Module wrapper. */
  threading: {
    transparent: [
      "Two weeks after the deadline slip. The PM did not raise it again, and the work moved on. You named the slip, owned the rework, and the team trusted the next estimate you gave.",
      "The client deck for the next engagement is now in your queue, and an old version is about to be sent.",
    ],
    cautious: [
      "Two weeks after the deadline slip. You named the slip, but the repair was uneven — the rework went to someone else, and the team has been quietly tracking the timing on your work.",
      "The client deck for the next engagement is in your queue, and an old version is about to be sent.",
    ],
    avoidant: [
      "Two weeks after the deadline slip. The conversation went sideways and the team moved on without a clean repair.",
      "The client deck for the next engagement is in your queue, and an old version is about to be sent — a second moment of slipped ownership before the first one has settled.",
    ],
  },
  intro: [
    "Scenario two. The Client Deck You Forgot To Update.",
    "A client meeting is at 3 PM today. You are the engineer attending alongside an account manager. At 2:15 PM, going through the deck the account manager sent you yesterday, you realise three slides reference a feature that was descoped two weeks ago in a planning meeting the account manager was not in. The deck will be used live with the client at 3:00. The account manager is presenting.",
  ],
  briefing:
    "It is 2:17 PM. The meeting is at 3:00. The account manager is in another building. You spotted the descoped feature on slide 7 — listed as Q3, but descoped two weeks ago. The account manager has not seen the descope decision. The client has not asked.",
  artifacts: [
    {
      caption: "Slide 7 of client deck — on screen now",
      title: "Q3 ROADMAP — KEY DELIVERABLES (slide 7 of 12)",
      mono: true,
      lines: [
        "• Smart routing engine (Q3)",
        "• Multi-tenant configuration UI (Q3)",
        "• Auto-scaling dashboard (Q3) — DESCOPED, NOT IN CURRENT PLAN",
        "• Predictive alerting (Q4)",
      ],
    },
  ],
  decisionPrompt: "It is 2:17 PM. What do you do?",
  options: [
    { key: "a", label: "Slack the account manager immediately: “Hey, just spotted: slide 7 has the auto-scaling dashboard listed as Q3 — that got descoped two weeks ago. Want me to draft a replacement bullet or call you?” Specific, immediate, actionable." },
    { key: "b", label: "Edit the slide quietly yourself in the next 15 minutes. Remove the descoped line. Send the updated version to the account manager at 2:45 with a brief note. Hope it goes unnoticed in the meeting." },
    { key: "c", label: "Wait until you are both in the call at 2:55, then mention it quickly off-camera before the client joins: “Hey, slide 7 has something we’ll want to skip past.”" },
    // Engineering-authored 4th path to preserve a/b/c/d engine shape.
    // FLAG: re-pass for Tony review before lock.
    { key: "d", label: "Say nothing. The descoped line is one bullet on one slide. The client may not notice. The account manager will not know either way." },
  ],
  justificationPrompt: "Why this option? What are you trying to protect, and what are you willing to risk?",
  artifactWrite: {
    a: { prompt: "Write the exact Slack message you would send to the account manager at 2:17 PM.", submit: "Send" },
    b: { prompt: "Write the brief note you attach when you send the updated deck at 2:45 PM.", submit: "Send updated deck" },
    c: { prompt: "Write the words you would say to the account manager at 2:55 PM, off-camera, before the client joins.", submit: "Save the line" },
    d: { prompt: "Write the private note you keep for yourself — what you decided not to flag, and why.", submit: "Keep this for yourself" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Hey, FYI — noticed slide 7 mentions the auto-scaling dashboard. Pretty sure that got descoped at some point but might be worth double-checking before the meeting just in case.", lands: "The hedging (“pretty sure,” “at some point,” “might be worth”) reads as covering the speaker more than the deck. The account manager has to do the verification themselves." },
      { tag: "Over-apologetic", calibrated: false, text: "Oh no, I am SO sorry, I just noticed something on slide 7 — the auto-scaling dashboard is listed as Q3 but I think it got descoped two weeks ago. I should have caught this when you sent the deck yesterday. I feel awful, this is on me, I will fix it now or whatever you need.", lands: "The account manager now has 43 minutes before the client meeting and has to manage your distress first. The fix gets pushed to the back of the conversation." },
      { tag: "Calibrated", calibrated: true, text: "Hey — just spotted: slide 7 has the auto-scaling dashboard listed as Q3. That got descoped two weeks ago in planning. Meeting is at 3. Want me to draft a replacement bullet, or do you want to jump on a quick call?", lands: "Acknowledge, Fix, Execute, Confirm in three sentences. Names the issue, names the time pressure, offers two specific repairs and asks which one. The account manager can move in seconds." },
    ],
    b: [
      { tag: "Casual, no flag", calibrated: false, text: "Made a couple of small updates to the deck — latest version attached.", lands: "Hides what changed. If the account manager opens the original deck on the call (they will), the silent edit is the part they remember." },
      { tag: "Specific, traceable", calibrated: true, text: "Hi — updated deck attached. One change on slide 7: removed the auto-scaling dashboard bullet (descoped in the planning meeting two weeks ago). Everything else identical. Worth a 30-second scan before 3.", lands: "The account manager can scan slide 7, accept the change, and move on. The change is visible and explained." },
    ],
    d: { card: "Whatever you wrote, you now have a record of the moment you decided to stay silent. That record is for you." },
  },
  consequences: {
    a: {
      sameDay: [
        "Account manager replied within 4 minutes: “Oh god, thank you. Let’s call now.”",
        "Five-minute call. You both rewrote the slide together. Meeting went fine. The client never noticed.",
        "The account manager messaged afterwards: “You saved me from a really awkward thirty seconds in front of that client. Owe you one.”",
      ],
      nextWeek: [
        "The account manager mentioned your flag to your manager: “He caught something on the deck before the [client] meeting last week. Saved us an awkward moment. Just wanted you to know.”",
        "Your manager mentioned it back to you in your 1:1. “I heard. That is the kind of thing I want this team known for.”",
      ],
      monthEnd: [
        "End of month. In a cross-functional review, the account manager named you in a positive aside about pre-meeting cross-checks.",
        "Your manager, who was in the room, made a mental note. Your annual review now references “strong cross-functional accountability.”",
      ],
      outcome: "Flagged the descoped slide 43 minutes before the client meeting, with two specific repair options.",
      others: "The client asked you, not your manager, when the next decision came up. Account ownership shifted toward you.",
      interp: "She owned it before the client noticed. Sent the corrected version with one line of context. No deflection, no over-apology.",
      manager: "Account manager’s perspective. “He caught a real problem 43 minutes before a client meeting and proposed two fixes in the same message. I made a note. The next client decision in that account, I asked him first.”",
      traj: "rise",
    },
    b: {
      sameDay: [
        "You sent the updated deck at 2:45. The account manager did not see the message until 3:01, two minutes into the meeting.",
        "They opened the original deck on the call. Slide 7 was on screen. The client asked: “Auto-scaling dashboard — wasn’t that supposed to be Q3?”",
        "The account manager froze briefly. They recovered, but it was visible.",
      ],
      nextWeek: [
        "In a private message, the account manager wrote: “Hey — in the future, if you spot a problem like that on a deck, can you just ping me? I’d rather know.”",
        "Polite. Even-toned. But the implication was clear. You did not reply for several hours.",
      ],
      monthEnd: [
        "End of month. The account manager has been working primarily with a different engineer for client-facing work.",
        "You have not been removed from anything formally. The shift was not announced. It happened.",
      ],
      outcome: "Edited the slide quietly, sent the updated deck at 2:45. The account manager opened the original on the call.",
      others: "The account manager has been quietly routing client-facing work to a different engineer.",
      interp: "She fixed the deck without flagging the problem. The account manager opened the wrong version anyway.",
      manager: "Account manager’s perspective. “The fix was real. The silence around the fix was the part I remembered. Next time I want someone in the room with a client, my brain reaches for someone else.”",
      traj: "drift-down",
    },
    c: {
      sameDay: [
        "At 2:55 you said “slide 7 has something we’ll want to skip past.” The account manager said “what? Wait —” and the client joined the call.",
        "The slide came up in front of the client. The account manager improvised. The improvisation was not bad.",
        "But the moment of being caught was visible to everyone on the call.",
      ],
      nextWeek: [
        "The account manager did not say anything directly. But she did not loop you into the next two client meetings on her calendar.",
        "She booked another engineer.",
      ],
      monthEnd: [
        "End of month. You have been included in client work, but at a slight distance.",
        "The account manager always seems to pre-brief the other engineer. The pattern is not hostile. It is protective.",
      ],
      outcome: "Mentioned the error 5 minutes before the meeting, in front of the client about to join. The account manager improvised.",
      others: "The account manager began pre-briefing a different engineer for client meetings.",
      interp: "She flagged the slip, but only at the last possible moment, with no time to act on it.",
      manager: "Account manager’s perspective. “She told me. She told me at 2:55. I lost the moment I could have done anything about it. Next time, I want someone who would have told me at 2:17.”",
      traj: "dip-flat",
    },
    d: {
      sameDay: [
        "The deck went live with the descoped bullet on slide 7. The client noticed about ninety seconds in: “Auto-scaling dashboard — wasn’t that supposed to be Q3?”",
        "The account manager went still for a beat, then said: “Let me come back to you on that.” The meeting moved on.",
        "After the call, the account manager Slacked you: “Did you know about the descope?”",
      ],
      nextWeek: [
        "The honest answer to the Slack message was yes. Saying yes now — after the client noticed — is a fundamentally different conversation than saying yes at 2:17 PM.",
        "The account manager did not raise it with your manager. She raised it with you, once, and then watched.",
      ],
      monthEnd: [
        "End of month. You are off the client-facing rotation for the account.",
        "Your manager asked about it gently. The account manager had said: “He saw the error before the meeting and did not tell me.” That sentence is the whole story.",
      ],
      outcome: "Said nothing. The client surfaced the error in the meeting. The account manager learned afterwards that you had seen it.",
      others: "The account manager removed you from the client-facing rotation for the account.",
      interp: "She saw it. She let the meeting walk into it. The silence was the decision.",
      manager: "Account manager’s perspective. “I can work with someone who spots a problem too late. I cannot work with someone who spotted it in time and said nothing. The next time I am pre-briefing a deck, I will not be opening hers.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Immediate flag with repair options", signal: "Flags the issue 43 minutes before the client meeting, with two specific repair options and an ask.", effect: "Short-term hit to the account manager’s afternoon; long-term trust deposit in client-facing work." },
    { key: "b", title: "Quiet edit, silent send", signal: "Fixes the deck without flagging the change. Relies on the account manager opening the latest version.", effect: "Cover on paper; trust erodes when the silent fix is noticed." },
    { key: "c", title: "Last-minute mention", signal: "Names the issue with no time left to act on it.", effect: "Disclosure happened; the timing made it cosmetic." },
    { key: "d", title: "Stay silent", signal: "When candour is costly and unasked, the instinct is to stay silent.", effect: "Clean now; expensive when the client surfaces it in the room." },
  ],
  reflection:
    "Think of a time you spotted a problem in someone else’s deliverable shortly before it went out. What did you do? What did your choice cost or buy?",
};

/* ============================================================================
   SCENARIO CHAIN 3 — THE CODE REVIEW YOU DISAGREED WITH
   ========================================================================== */
export const SC3_CONTENT_D2 = {
  id: "SC3",
  title: "The Code Review You Disagreed With",
  commitment: "Decide how to respond when a senior reviewer’s feedback contradicts your judgement.",
  threading: {
    transparent: [
      "The two prior moments are behind you, and the pattern they set — naming the slip, repairing without deflection — is the working assumption now.",
      "The reviewer’s comments land in your queue. You read them and you disagree.",
    ],
    cautious: [
      "The two prior moments are behind you, and the pattern they set is uneven — some clean repairs, some moments where the ownership got handed sideways.",
      "The reviewer’s comments land in your queue. You read them and you disagree.",
    ],
    avoidant: [
      "The two prior moments are behind you. The pattern, looking back, is one of deflection and of postponed repairs.",
      "The reviewer’s comments land in your queue. You read them and you disagree.",
    ],
  },
  intro: [
    "Scenario three. The Code Review You Disagreed With.",
    "A senior engineer left a code review on your PR three hours ago. The review asked you to rewrite a function you spent two days on, in a way you believe is technically inferior. You are pretty sure they are wrong. But they have been at the company for eight years and you have been there for nine months. You are sitting at your laptop now, the PR still open, deciding what to type.",
  ],
  briefing:
    "The PR is blocking another team's work that depends on it. The senior reviewer (marcus) is well-respected. You believe the 4-line replacement they want would miss three regional-code edge cases you already handled. You have been at the company for nine months. They have been at the company for eight years.",
  artifacts: [
    {
      caption: "Code review comment on GitHub",
      title: "GitHub · PR #2887 — review comment",
      mono: true,
      lines: [
        "@you — This whole function is over-engineered.",
        "Replace with the simpler version below (4 lines).",
        "I get what you were trying to do, but the abstraction is not earning",
        "its complexity here. Please rewrite.",
        "",
        "[Reviewer: senior_eng_marcus]",
      ],
    },
  ],
  decisionPrompt: "You disagree. The reviewer is senior. The PR is blocking another team’s work. What do you do?",
  options: [
    { key: "a", label: "Reply in the PR: “Appreciate the review. I want to push back on this respectfully — the 4-line version doesn’t handle the regional-code edge cases we hit in #4297. Here are three concrete inputs where it would silently produce wrong output. [paste examples]. Open to other refactors but I don’t think we can ship the 4-line version. Can we grab 15 min?”" },
    { key: "b", label: "Rewrite to the 4-line version. Push the change. Hope no one hits the edge cases for a few weeks. You know about them. They were the reason you wrote it the way you did. But you are not going to argue with an 8-year senior." },
    { key: "c", label: "Reply: “Will think about this.” Then sit on the PR for two days. Re-read the review. Maybe the senior engineer has a point. Maybe you are over-attached. The other team’s work continues to wait." },
    // Engineering-authored 4th path. FLAG: re-pass for Tony review before lock.
    { key: "d", label: "Apply the rewrite without comment. Add the edge cases as TODOs in a follow-up ticket that you will write but not link in the PR. Ship and move on." },
  ],
  justificationPrompt: "Why this option? What is going through your mind as you make this choice?",
  artifactWrite: {
    a: { prompt: "Write the actual reply you would post on the pull request to marcus’s review.", submit: "Post reply" },
    b: { prompt: "Write the PR comment (if any) you would leave when you push the 4-line version.", submit: "Push commit" },
    c: { prompt: "Write the “Will think about this” reply you would actually post.", submit: "Post reply" },
    d: { prompt: "Write the private note in your follow-up ticket about the edge cases — the words a future engineer would read.", submit: "Save follow-up note" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Thanks for the review. I disagree on the simplification — the abstraction is doing real work here that the 4-line version would lose. Happy to discuss if you have time.", lands: "States the position without the evidence. Marcus has to ask three follow-up questions to know what the “real work” is." },
      { tag: "Over-apologetic", calibrated: false, text: "Thank you so much for the thorough review, I really appreciate you taking the time. I see your point about the over-engineering, I was probably overthinking it. I will rewrite to the simpler version — you have more context than I do. Sorry for the back-and-forth.", lands: "Folds without naming the edge cases. The bugs ship. Two weeks later someone will find them; you will know you knew." },
      { tag: "Calibrated", calibrated: true, text: "Appreciate the review. I want to push back respectfully — the 4-line version misses three regional-code edge cases we hit in #4297. Specific inputs that would silently produce wrong output: [paste 3 examples]. Open to other refactors, but I do not think we can ship the 4-line version as-is. Want to grab 15 minutes to look at it together?", lands: "Acknowledges the review, names the disagreement, shows the evidence, proposes the next step. Marcus can engage with the technical content immediately." },
    ],
    b: [
      { tag: "Silent rewrite", calibrated: false, text: "[no PR comment — just push the 4-line version]", lands: "The edge cases are not in the PR thread, not in the commit message, not in the team’s knowledge. If they surface in two weeks, the only place the knowledge lived was inside your head." },
      { tag: "Defensible silent rewrite", calibrated: true, text: "Pushing the 4-line version per review. Flagging for the record: this loses the regional-code edge-case handling from the original (3 known inputs would now silently produce wrong output). I'll open #2891 to add explicit handling next sprint.", lands: "Even if you defer to the senior, the knowledge is now in the PR thread and in a ticket. The team can act on it; you are not the only person holding it." },
    ],
    d: { card: "Whatever you wrote, the edge cases are now documented in a place that may or may not be found. That is the part that becomes the record." },
  },
  consequences: {
    a: {
      sameDay: [
        "The senior engineer replied 40 minutes later: “Okay, I see the edge cases. Fair point. Let me look at this with you. Tomorrow 11?”",
        "At 11 the next day you walked through the function together. He suggested a middle path — your structure, with two of his simplifications. Better than either original.",
        "He merged the PR himself.",
      ],
      nextWeek: [
        "The PR was merged. The other team was unblocked.",
        "The senior engineer dropped you a Slack message the following Tuesday: “Hey — wanted to say, the way you handled that review was actually really good. Most juniors either fold or get defensive. You pushed back with data. I learned something from the edge cases. Anytime.”",
      ],
      monthEnd: [
        "End of month. The senior engineer mentioned in his quarterly review feedback that you were one of the few junior engineers who could give and receive technical feedback well.",
        "Your manager included that in her notes on you. The story of the PR became the example.",
      ],
      outcome: "Pushed back respectfully with three specific edge-case examples. The senior engineer agreed within the day; a middle path shipped.",
      others: "The reviewer copied you on the next architecture discussion. Your read was treated as a signal, not a position.",
      interp: "She acknowledged the reviewer’s point on its merits, named where she still disagreed, and proposed a sync.",
      manager: "Reviewer’s perspective. “She did not fold. She did not get defensive. She brought three examples. That is the conversation I want with every engineer on this team.”",
      traj: "rise",
    },
    b: {
      sameDay: [
        "You pushed the 4-line version. He approved within 20 minutes: “Much better. Ship it.”",
        "Other team unblocked. You went home.",
        "At dinner, you kept thinking about the edge cases.",
      ],
      nextWeek: [
        "On Wednesday, a different team member hit one of the edge cases in staging. They flagged it. The PR was reverted.",
        "The senior engineer pinged you: “Remind me — did the original version handle this case?”",
        "You said: “Yes.” He said: “Why did we ship this one then?”",
      ],
      monthEnd: [
        "End of month. The reverted PR was traced back to the original review.",
        "In a team retro, the question was raised: “How do we make sure code reviewers and authors are both surfacing the actual constraints?”",
        "Your name did not come up. The fact that you knew about the edge case did not come up. You sat through the retro.",
      ],
      outcome: "Rewrote to the 4-line version without flagging the edge cases. The bugs shipped and surfaced in staging within a week.",
      others: "The senior engineer began asking, on the next review, “did the original version handle this?”",
      interp: "She folded under the seniority gradient. The bugs she predicted shipped, then surfaced in someone else’s name.",
      manager: "Reviewer’s perspective. “She knew. She knew and pushed the rewrite anyway. Next time I review her code I will ask twice.”",
      traj: "drop",
    },
    c: {
      sameDay: [
        "By Wednesday, the other team had Slacked their manager about the blocked PR. Their manager Slacked yours: “Can we get a status?”",
        "Your manager Slacked you: “What’s going on with PR #2887?” You explained.",
        "She said: “Okay. Either reply to the review or rewrite. Either is fine. But not both, and not neither.”",
      ],
      nextWeek: [
        "The other team’s work was delayed by a week.",
        "Their team-lead mentioned it in a cross-team sync: “We were waiting on a PR review for several days last week.”",
        "Your manager was in the room. She did not name you. Everyone in the room knew.",
      ],
      monthEnd: [
        "End of month. You have not been asked to lead a PR review for a junior team member, which other engineers at your level have started doing.",
        "You have not been blocked from it. It just has not happened.",
      ],
      outcome: "Sat on the PR for two days. The downstream team escalated; your manager named the open loop directly.",
      others: "Your manager began asking, on the next stuck PR, “what is your call?”",
      interp: "She delayed the decision and the cost showed up in someone else’s blocked work.",
      manager: "Reviewer’s perspective. “I asked for a rewrite. I would have taken a pushback. What I got was silence. That is the thing I cannot work with.”",
      traj: "dip-flat",
    },
    d: {
      sameDay: [
        "You pushed the 4-line version with no PR comment. The follow-up ticket exists, but only on your personal board.",
        "The senior engineer approved and the PR merged.",
        "You closed your laptop with the feeling that you had bought silence with a future bug.",
      ],
      nextWeek: [
        "Eight days later, the first edge case fired in production. Support escalated. The on-call engineer traced it to PR #2887.",
        "Your follow-up ticket was found in the post-mortem. Two engineers asked, privately, why it was not linked from the PR.",
        "The honest answer was that it would have made the rewrite harder to ship. You did not say that.",
      ],
      monthEnd: [
        "End of month. Your manager is direct: “There was a ticket. It was not visible to anyone who could act on it. That is the part we have to talk about.”",
        "The slip was not the rewrite. The slip was where the knowledge lived. You leave the meeting knowing the file on you carries this for a while.",
      ],
      outcome: "Pushed the rewrite without flagging the edge cases in the PR. The follow-up ticket existed but was not linked.",
      others: "Your manager began asking, on the next review, “what is in the PR and what is in your head?”",
      interp: "She owned the disagreement privately and shipped the rewrite publicly. The bugs landed in production within the week.",
      manager: "Reviewer’s perspective. “The edge cases were in her head, then in a ticket no one saw. Both of those places are not the codebase. That is where the slip lived.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Respectful pushback with evidence", signal: "Names the disagreement, shows the data, proposes the next step. Closes the loop with the reviewer.", effect: "The technical conversation gets to land. Trust both ways." },
    { key: "b", title: "Fold under seniority", signal: "Rewrites without surfacing the edge cases. The knowledge stays inside the writer’s head.", effect: "Short-term clean PR; longer-term bugs in someone else’s name." },
    { key: "c", title: "Stall the decision", signal: "Lets the PR sit while the downstream team waits. No reply, no rewrite.", effect: "The open loop becomes someone else’s escalation." },
    { key: "d", title: "Silent rewrite + private ticket", signal: "Ships the rewrite without naming the trade-off in the PR. Keeps the knowledge in a place that may not be found.", effect: "Bugs surface; the ticket explains, after the fact." },
  ],
  reflection:
    "Think of a time you disagreed with a more senior reviewer or stakeholder. What did you do? Where did the cost land?",
};

/* ============================================================================
   SCENARIO CHAIN 4 — THE MISTAKE YOU DISCOVERED IN SOMEONE ELSE'S WORK
   ========================================================================== */
export const SC4_CONTENT_D2 = {
  id: "SC4",
  title: "The Mistake You Discovered In Someone Else’s Work",
  commitment: "Decide how to surface an error in a teammate’s deliverable without erasing their ownership.",
  threading: {
    transparent: [
      "Three scenarios into the day. Each time, you ran the full Repair Sequence.",
      "A teammate’s pull request lands in your inbox — you spot a real bug, and they have not seen it yet. By now, you know how this conversation usually goes when ownership is preserved on both sides.",
    ],
    cautious: [
      "Three scenarios into the day. The pattern is mixed — some full repairs, some moments where the ownership got handed sideways.",
      "A teammate’s pull request lands in your inbox — you spot a real bug, and they have not seen it yet. The choice carries the weight of both halves of the pattern.",
    ],
    avoidant: [
      "Three scenarios into the day. The pattern, looking back, is one of deflected repairs and postponed accountability.",
      "A teammate’s pull request lands in your inbox — you spot a real bug, and they have not seen it yet. The trajectory of the last few hours is sitting in the room with you.",
    ],
  },
  intro: [
    "Scenario four. The Mistake You Discovered In Someone Else’s Work.",
    "You are reviewing a teammate’s PR. They are at your level, hired three months after you. They are well-liked. Their code passes the tests. But you notice a subtle bug that the tests do not catch — a race condition that will only show up in production traffic, intermittently, and will look like a flaky service.",
    "If you raise it, the PR ships a week later, and your teammate will know it was you who caught it. If you don’t raise it, you ship the bug and hope it is caught later, by someone else, in someone else’s name.",
  ],
  briefing:
    "You are sitting on the PR review screen. The teammate is in a different time zone — you have until 8 PM tonight to leave a review before they wake up.",
  artifacts: [
    {
      caption: "PR diff snippet — the relevant function",
      title: "GitHub · PR diff (relevant function)",
      mono: true,
      lines: [
        "function updateBalance(userId, amount) {",
        "  const current = await db.get(userId).balance;",
        "  await db.set(userId, { balance: current + amount });",
        "}",
        "",
        "[No transaction. No optimistic lock. Two concurrent calls will race.]",
      ],
    },
  ],
  decisionPrompt: "You are sitting on the PR review screen. What do you do?",
  options: [
    { key: "a", label: "Leave the review at 5 PM. Behaviour-centred: “Great structure overall. Flagging one thing on updateBalance() — there’s a read-modify-write race here. Two concurrent calls will produce wrong balances intermittently. Suggested fix: wrap in a transaction or use atomic increment. Happy to pair on it.” Specific, kind, owned." },
    { key: "b", label: "Approve the PR. The tests pass. Your teammate did good work. The bug may or may not surface; if it does, it will be caught in staging or in a future review. Not your fight. You like your teammate." },
    { key: "c", label: "Leave a vague comment: “Nice work overall. Maybe double-check updateBalance() for concurrency considerations?” Plausibly deniable if it ships and breaks. Plausibly helpful if your teammate catches it themselves." },
    // Engineering-authored 4th path. FLAG: re-pass for Tony review before lock.
    { key: "d", label: "Approve the PR but Slack your manager directly: “FYI — I noticed a race condition in [teammate]’s PR. I am approving anyway because they are senior to me on this code path.” Hand the disclosure sideways." },
  ],
  justificationPrompt: "Why this option? What are you trying to protect — your teammate, the codebase, or your own visibility?",
  artifactWrite: {
    a: { prompt: "Write the actual review comment you would leave on your teammate’s pull request.", submit: "Post review" },
    b: { prompt: "Write the approval comment (if any) you would leave when you approve the PR.", submit: "Approve PR" },
    c: { prompt: "Write the vague review comment you would actually leave.", submit: "Post review" },
    d: { prompt: "Write the Slack message you would send your manager when you hand the disclosure sideways.", submit: "Send to manager" },
  },
  references: {
    ac: [
      { tag: "Defensive", calibrated: false, text: "Code looks good overall. One small thing on updateBalance() — you may want to double-check the concurrency behaviour there. Otherwise approved.", lands: "Hints at the issue without naming it. The teammate reads “double-check,” shrugs, and ships. The bug ships with the PR." },
      { tag: "Over-apologetic", calibrated: false, text: "Hi! Hope this is okay to flag — really sorry, you probably already thought about this, but I noticed something on updateBalance() that might be a race condition? I might be wrong, I am sure you have a reason for the current structure. Feel free to ignore if I am off base!", lands: "The apology buries the technical content. The teammate is now reassured rather than informed; the race condition stays in the code." },
      { tag: "Calibrated", calibrated: true, text: "Great structure overall. Flagging one thing on updateBalance(): there is a read-modify-write race here. Two concurrent calls will produce wrong balances intermittently — the tests would not catch it because they are sequential. Suggested fix: wrap in a transaction, or use an atomic increment on the balance field. Happy to pair on it.", lands: "Names the bug, explains why the tests miss it, proposes two specific fixes, and offers a pairing session. The teammate can act on it in 20 minutes." },
    ],
    b: [
      { tag: "Silent approval", calibrated: false, text: "LGTM 👍", lands: "The race condition ships. When it surfaces — and it will — the PR thread shows your name on the approval and no flag from you. The silence becomes the record." },
      { tag: "Specific approval with raised flag", calibrated: true, text: "Approving. One thing for the record: updateBalance() has a read-modify-write race condition — two concurrent calls would produce wrong balances. The tests do not catch it. Suggesting a follow-up PR to wrap it in a transaction or use atomic increment. Want me to open the ticket?", lands: "Approves the structure, flags the bug, proposes the durable fix. The teammate decides whether to fix in this PR or the next." },
    ],
    d: { card: "Whatever you wrote, the disclosure now sits with your manager rather than with the teammate. The teammate does not yet know they are holding a race condition." },
  },
  consequences: {
    a: {
      sameDay: [
        "Your teammate replied four hours later (their morning): “Oh wow, you’re right. Thanks for catching that. Pairing at noon?”",
        "You paired. Fixed it together. Shipped the next day.",
        "Your teammate publicly thanked you in the team channel: “Caught a race condition I would have shipped. Beers on me.”",
      ],
      nextWeek: [
        "Your teammate brought it up in their own 1:1 with their manager: “Wanted to flag that [you] caught a race condition I would have shipped. Saved us a real bug.”",
        "That manager mentioned it to yours. The story moved up two levels without you ever telling it.",
        "“He catches things” became part of the file.",
      ],
      monthEnd: [
        "End of month. You are one of two engineers on the team being considered for a tech-lead-track role.",
        "The two managers in the room both cite “the race condition catch” as an example of judgment they want in a tech lead.",
        "Your teammate is the one who told them.",
      ],
      outcome: "Flagged the race condition directly in the PR review with two specific fixes and an offer to pair.",
      others: "The teammate started flagging their own gaps to you before others saw them. Trust ran both directions.",
      interp: "She brought it to them privately first. Named the fix, offered to help, let them carry the repair to the room.",
      manager: "Teammate’s perspective. “She caught a real bug, named it cleanly, offered to pair. Most reviewers would have either approved or made me look bad. She made me look smart.”",
      traj: "rise",
    },
    b: {
      sameDay: [
        "The PR shipped. The bug was not caught for two weeks.",
        "When it surfaced, it surfaced as a billing inconsistency on a customer account — the kind that becomes a support ticket and then a manager escalation.",
        "The post-mortem traced it back to the PR. Your name was on the review approval. Your manager asked, gently, whether you had spotted the race condition.",
      ],
      nextWeek: [
        "Your manager asked you in 1:1: “The race condition in [teammate]’s PR — did you see it?”",
        "You said yes. She did not press, but she made a note. She said: “In this team, the review is the safety. If you spot something and don’t say it, the safety is no longer real.”",
        "That was the whole conversation. It was enough.",
      ],
      monthEnd: [
        "End of month. The race condition bug cost the company three days of engineering time to root-cause and fix.",
        "Your manager did not mention it in your formal review. She did not need to.",
      ],
      outcome: "Approved the PR silently. The race condition shipped and surfaced as a billing inconsistency two weeks later.",
      others: "Your manager began asking, on every review you do, “did you flag everything you saw?”",
      interp: "She approved a bug she had seen. The silence was the decision.",
      manager: "Teammate’s perspective. “She saw it. She did not say it. The review was the place to say it. Now the review thread is the record of what she did not say.”",
      traj: "drop",
    },
    c: {
      sameDay: [
        "Your teammate replied: “Hmm, looked at it again, looks fine to me — are you seeing something specific?”",
        "You hedged. They closed it as approved. It shipped.",
      ],
      nextWeek: [
        "When the bug surfaced two weeks later, the PR thread was reviewed. Your vague comment was visible.",
        "Your teammate did not say anything to you. The relationship survived. Something else did not.",
      ],
      monthEnd: [
        "End of month. The bug was traced to the PR. Your vague review comment was discussed in a retro on “review clarity.”",
        "Your name was not mentioned by name; the comment was. You sat through the retro.",
      ],
      outcome: "Left a vague review comment. The teammate hedged back; the PR shipped with the race condition.",
      others: "The team brought up “review clarity” at the retro. The comment that surfaced was yours.",
      interp: "She named the area without naming the bug. The hedge was the cover.",
      manager: "Teammate’s perspective. “She told me to double-check it. I did. I missed it. She had it. Now the bug shipped on my PR with her cover comment on it.”",
      traj: "dip-flat",
    },
    d: {
      sameDay: [
        "Your manager replied: “Why are you telling me and not [teammate]?”",
        "You did not have a good answer. She asked you to leave the review on the PR.",
        "You did, eventually, several hours after the PR was approved by someone else. The race condition was caught in a separate review.",
      ],
      nextWeek: [
        "Your teammate found out you had Slacked your manager before flagging the bug to them.",
        "They did not raise it directly. They started CC’ing more people on PR threads. The trust in your reviews shifted.",
      ],
      monthEnd: [
        "End of month. Your manager was direct: “You handed me a disclosure that belonged in the PR. Next time, the PR is the channel. I am not.”",
        "The slip was not the bug. The slip was where the disclosure landed.",
      ],
      outcome: "Approved the PR but handed the disclosure to your manager instead of the teammate.",
      others: "The teammate began CC’ing additional reviewers on their PRs.",
      interp: "She saw it. She told the manager. She did not tell the engineer whose code it was.",
      manager: "Teammate’s perspective. “She told my manager before she told me. I had to find out the bug existed at all from a different reviewer. Next time, I am routing around her.”",
      traj: "drop",
    },
  },
  signalPanel: [
    { key: "a", title: "Direct PR review, behaviour-centred", signal: "Names the bug, explains why tests miss it, proposes two specific fixes, offers to pair.", effect: "Clean catch; trust between reviewer and author runs both ways." },
    { key: "b", title: "Silent approval", signal: "Approves the PR knowing about the bug. Relies on someone else to catch it.", effect: "When the bug surfaces in production, the review thread becomes the record." },
    { key: "c", title: "Vague hint", signal: "Names the area without naming the bug. Plausibly deniable.", effect: "Cover for the reviewer; bug ships on the author’s PR thread." },
    { key: "d", title: "Sideways disclosure", signal: "Tells the manager about the bug before telling the engineer whose code it is.", effect: "The disclosure landed; the relationship with the engineer did not." },
  ],
  reflection:
    "Think of a time you spotted a real problem in someone else’s work and chose how to surface it. Where did the cost land — for them, for you, for the work?",
};
