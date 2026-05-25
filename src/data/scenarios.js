/**
 * Sample-rehearsal scenarios for the landing-page demo modal.
 *
 * Structure: each scenario has 3 stages.
 *   - moment: the scene-set
 *   - choices: 3 written response options (full sentences, not labels)
 *   - consequences: keyed by choice id, each has an immediate reply and a "later" beat
 *
 * Copy is written in the locked WorkRehearsal voice:
 *   "rehearsal", "workplace pressure", no certification language, no scoring.
 *   Footer microcopy is always: "Practice and development only. Not behavioural documentation."
 *
 * Edit the strings here without touching the React component — the modal renders
 * directly from this file.
 */

export const SCENARIOS = {
  probation: {
    id: 'probation',
    productKey: 'Probation Blueprint™',
    productHref: '/checkout/probation-blueprint',
    productPrice: '$29',
    label: 'The first 90 days',
    eyebrow: 'Probation Blueprint · sample',

    moment: {
      setting: 'Tuesday, 2:47pm. Your second week.',
      body: `You missed yesterday's deadline on the onboarding doc — only by half a day, but you didn't flag it. Slack just buzzed. It's your manager, Priya:`,
      message: `Hey — got a sec? Wanted to chat about the doc.`,
      prompt: `What do you reply?`,
    },

    choices: [
      {
        id: 'a',
        label: 'Direct',
        text: `Coming now. I should have flagged yesterday — I missed it by half a day and didn't say anything. That's on me. Want me to send what I have first?`,
      },
      {
        id: 'b',
        label: 'Defensive',
        text: `Yes, on my way. The doc took longer than I thought — I was trying to make it really thorough.`,
      },
      {
        id: 'c',
        label: 'Vague',
        text: `Sure, what's up?`,
      },
    ],

    consequences: {
      a: {
        reply: {
          from: 'Priya',
          text: `Appreciate you owning it. Send what you have, we'll work through it together. Five minutes.`,
        },
        later: {
          when: 'One week later',
          body: `In your 1:1, Priya brings up the doc — but not to talk about being late. She tells you she noticed you flagged it before she had to ask. "That's the muscle I want to see early." The next time something slips, you flag it the same way. Two months in, she puts you on the new-hire onboarding committee.`,
          lesson: `Owning a small miss early built more trust than delivering on time would have. The rehearsal of *how you flag* is what made the difference.`,
        },
      },
      b: {
        reply: {
          from: 'Priya',
          text: `Okay. Come over when you can.`,
        },
        later: {
          when: 'One week later',
          body: `The doc lands fine. But Priya didn't follow up the way she did with your peer who flagged a slip on Day 4. In your 1:1 she asks if you have "any blockers you haven't raised yet" — a question she didn't ask anyone else. You don't have any, so you say no. The pattern that's forming is: you wait until you're asked. By Day 60, that's the story.`,
          lesson: `The defence wasn't loud or wrong — it just delayed ownership by one sentence. That sentence is the difference between "she gets ahead of things" and "she needs prompting."`,
        },
      },
      c: {
        reply: {
          from: 'Priya',
          text: `Just wanted to check in on the doc — looks like it landed this morning?`,
        },
        later: {
          when: 'One week later',
          body: `Priya doesn't bring up the missed deadline. But two weeks in, when a small task slips again, she asks you to "loop in" earlier next time. By the second 1:1 she's added a status check to your calendar she doesn't run with anyone else. It's small. You'll absorb it. But you didn't have to be on that list.`,
          lesson: `Not flagging isn't punished — it's noticed. The cost shows up as small process additions you don't notice until they accumulate.`,
        },
      },
    },
  },

  aiReady: {
    id: 'aiReady',
    productKey: 'AI-Ready Behaviours™',
    productHref: '/checkout/ai-ready',
    productPrice: '$39',
    label: 'When AI is wrong',
    eyebrow: 'AI-Ready Behaviours · sample',

    moment: {
      setting: 'Thursday, 9:12am. The client meeting is at 11.',
      body: `You used the team's AI tool to draft the Q3 numbers section of the client deck. The numbers looked right. You shipped it last night. This morning your colleague Marcus pings you:`,
      message: `Hey — the Q3 growth number in slide 7. I think the AI flipped two quarters. It's saying we grew 18% but I'm pretty sure that's Q2.`,
      prompt: `What do you do?`,
    },

    choices: [
      {
        id: 'a',
        label: 'Verify and disclose',
        text: `Checking the source data now. If you're right, I'll pull the deck, fix the slide, and message the client lead before the 11am that we caught an error in last night's draft.`,
      },
      {
        id: 'b',
        label: 'Fix quietly',
        text: `Good catch — let me check and just update the deck. The client hasn't opened it yet, so we can fix it without making a thing of it.`,
      },
      {
        id: 'c',
        label: 'Defer the check',
        text: `Hmm, I trusted what the tool gave me. Can you double-check and send me the right number? I'll plug it in.`,
      },
    ],

    consequences: {
      a: {
        reply: {
          from: 'Marcus',
          text: `Good call. Sending you the raw numbers now.`,
        },
        later: {
          when: 'Two weeks later',
          body: `Your team lead brings it up in your 1:1 — not the error, but how you handled it. "You caught it, owned it to the client before they saw it, and you were clear it came from the AI draft. That's the playbook." Three weeks later, you get added to the working group writing the team's AI-use guidelines. The error became your credential.`,
          lesson: `When AI-assisted work goes wrong, the verification-then-disclosure sequence is what separates "they're reliable with AI" from "they ship whatever the model says." The rehearsal is *which order you do those two things in*.`,
        },
      },
      b: {
        reply: {
          from: 'Marcus',
          text: `Yeah, that works. Sending you the right numbers.`,
        },
        later: {
          when: 'Two weeks later',
          body: `The client never noticed. But Marcus mentioned it offhand to your team lead — "we caught an AI error in the Q3 deck the night before, fixed it in time." The team lead didn't say anything to you. But in the next AI-tool rollout, you weren't asked to give input. You don't know that's why. You probably never will.`,
          lesson: `Fixing it quietly avoided the short-term cost — explaining the mistake to the client — and traded it for a long-term one: the people who *do* know what happened now have a story about your AI judgment that you can't see or correct.`,
        },
      },
      c: {
        reply: {
          from: 'Marcus',
          text: `Sure. Sending the right number — but the meeting's in less than two hours, you'll want to verify this end-to-end before we send it again.`,
        },
        later: {
          when: 'Two weeks later',
          body: `Marcus quietly tells your team lead he had to "babysit" the deck before the client meeting. Your team lead doesn't bring it up. But in the next round of AI-assisted projects, you're paired with a senior reviewer "for now." The framing is supportive. The signal is: not yet trusted to ship AI-assisted work alone.`,
          lesson: `Deferring the verification reads as: "I'll use the tool, but I won't own its outputs." That's the exact judgment gap AI-Ready Behaviours is built to rehearse — before it shows up in a real reputation moment.`,
        },
      },
    },
  },
}

export const SCENARIO_ORDER = ['probation', 'aiReady']
