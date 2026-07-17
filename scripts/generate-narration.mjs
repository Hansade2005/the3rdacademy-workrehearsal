/* ============================================================================
   PRE-RENDER NARRATION — Piper TTS → MP3 into public/narration/

   Why: the rehearsal narration is fixed copy. Rendering it once at build time
   (instead of calling a TTS API at runtime) means no API key, no CORS, no
   per-play latency, and it works fully offline. usePiper just plays the file.

   How it stays in sync with the UI:
     - This script imports the SAME content module the component renders from
       (src/rehearsal/d1Content.js) and rebuilds each spoken string using the
       SAME join expressions as the <ListenButton> call sites.
     - It names each file by narrationKey(text) — the identical hash the browser
       computes. So speak(text) in the browser always lands on the file written
       here. Add/translate copy → re-run; nothing else to wire up.

   Prerequisites (installed in the build env, not committed):
     pip install piper-tts imageio-ffmpeg
     python3 -m piper.download_voices en_US-hfc_female-medium --download-dir .piper-voices

   Usage:  node scripts/generate-narration.mjs [--force]
   ========================================================================== */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

import { D1_CONTENT, SC1_CONTENT, SC2_CONTENT, SC3_CONTENT, SC4_CONTENT } from "../src/rehearsal/d1Content.js";
import { D2_CONTENT, SC1_CONTENT_D2, SC2_CONTENT_D2, SC3_CONTENT_D2, SC4_CONTENT_D2 } from "../src/rehearsal/d2Content.js";
import { D3_CONTENT, SC1_CONTENT_D3, SC2_CONTENT_D3, SC3_CONTENT_D3, SC4_CONTENT_D3 } from "../src/rehearsal/d3Content.js";
import { D4_CONTENT, SC1_CONTENT_D4, SC2_CONTENT_D4, SC3_CONTENT_D4, SC4_CONTENT_D4 } from "../src/rehearsal/d4Content.js";
import { D5_CONTENT, SC1_CONTENT_D5, SC2_CONTENT_D5, SC3_CONTENT_D5, SC4_CONTENT_D5 } from "../src/rehearsal/d5Content.js";
import { D8_CONTENT, SC1_CONTENT_D8, SC2_CONTENT_D8, SC3_CONTENT_D8, SC4_CONTENT_D8 } from "../src/rehearsal/d8Content.js";
import { D9_CONTENT, SC1_CONTENT_D9, SC2_CONTENT_D9, SC3_CONTENT_D9, SC4_CONTENT_D9, PERCEPTION_REPLAY_D9, MID_LAB_PATTERN_CHECK_D9 } from "../src/rehearsal/d9Content.js";
import { narrationKey } from "../src/rehearsal/narrationKey.js";
import { M1_CONTENT, LS1_CONTENT_M1, LS2_CONTENT_M1 } from "../src/rehearsal/m1Content.js";
import { M2_CONTENT, LS1_CONTENT_M2, LS2_CONTENT_M2 } from "../src/rehearsal/m2Content.js";
import { M3_CONTENT, LS1_CONTENT_M3, LS2_CONTENT_M3 } from "../src/rehearsal/m3Content.js";
import { M4_CONTENT, LS1_CONTENT_M4, LS2_CONTENT_M4 } from "../src/rehearsal/m4Content.js";
import { M5_CONTENT, LS1_CONTENT_M5, LS2_CONTENT_M5 } from "../src/rehearsal/m5Content.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "narration");
const MODEL = join(ROOT, ".piper-voices", "en_US-hfc_female-medium.onnx");
const VOICE_NAME = "en_US-hfc_female-medium";
const FORCE = process.argv.includes("--force");

const SCENARIOS = [SC1_CONTENT, SC2_CONTENT, SC3_CONTENT, SC4_CONTENT];
const HORIZONS = ["sameDay", "nextWeek", "monthEnd"];

/* ----- Collect every spoken string, mirroring the <ListenButton> call sites
   in BridgeFastModule.jsx exactly. label is for human-readable logging only. */
function collectNarrations() {
  const out = [];
  const add = (label, text) => {
    const t = String(text || "").trim();
    if (t) out.push({ label, text: t });
  };

  // Segment A — cold open + decision prompt + per-path same-day consequence + central question
  const C0 = D1_CONTENT.segmentA.coldOpen;
  add("A · cold open", C0.narration.join("\n\n"));
  add("A · cold-open decision prompt", "What do you do?");
  for (const k of Object.keys(C0.sameDay)) add(`A · cold-open consequence ${k}`, C0.sameDay[k].join("\n\n"));
  add("A · central question", D1_CONTENT.dimension.central_question);

  // Segment B — field-guide intro
  add("B · intro", D1_CONTENT.segmentB.intro.join("\n\n"));

  // Segment C — recognition briefs
  const c1 = D1_CONTENT.segmentC.c1;
  add("C1 · narration · part 1 (pre-signals)", c1.narration.join("\n\n"));
  add("C1 · narration · part 2 (post-signals)", c1.close);
  const c2 = D1_CONTENT.segmentC.c2;
  add("C2 · narration · part 1 (pre-equation)", c2.narration.join("\n\n"));
  add("C2 · narration · part 2 (post-equation)", [...c2.delayed, ...c2.closing].join("\n\n"));
  const cq = c2.centralQuestionReturn;
  add("C2 · part 3 · central question returns", [cq.opener, cq.echo, cq.closing].join("\n\n"));
  const c3 = D1_CONTENT.segmentC.c3;
  add("C3 · narration · part 1 (pre-reveal)", c3.open);
  add("C3 · narration · part 2 (post-reveal)", [...c3.steps.map((s) => `${s.name} ${s.body}`), ...c3.close].join("\n\n"));
  const cComplete = D1_CONTENT.segmentC.complete;
  add("C · complete · transition to D", cComplete.narration.join("\n\n"));
  if (cComplete.scopeBoundaries) {
    add("C · complete · scope notice", cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  }
  const bp1 = D1_CONTENT.segmentC.breakPoint1;
  add("C · break point 1 · pause invitation", bp1.avatarScript.join("\n\n"));

  // Segment D — audio case
  add("D · case intro", D1_CONTENT.segmentD.intro.join("\n\n"));
  add("D · part 1", D1_CONTENT.segmentD.part1.narration.join("\n\n"));
  add("D · pause 1 prompt", D1_CONTENT.segmentD.pause1.prompt);
  add("D · part 2", D1_CONTENT.segmentD.part2.narration.join("\n\n"));
  add("D · pause 2 prompt", D1_CONTENT.segmentD.pause2.prompt);
  add("D · part 3", D1_CONTENT.segmentD.part3.narration.join("\n\n"));
  add("D · complete · transition to E", D1_CONTENT.segmentD.complete.narration.join("\n\n"));
  add("D · break point 2 · pause invitation", D1_CONTENT.segmentD.breakPoint2.avatarScript.join("\n\n"));

  // Segment F — micro-drill intros + close transition
  add("F1 · intro", D1_CONTENT.segmentF.f1.audioIntro);
  add("F2 · intro", D1_CONTENT.segmentF.f2.audioIntro);
  if (D1_CONTENT.segmentF.complete) {
    add("F · complete · transition to G", D1_CONTENT.segmentF.complete.narration.join("\n\n"));
  }

  // Segment F → G — optional pause invitation
  if (D1_CONTENT.segmentG.breakPoint4) {
    add("G · break point 4 · pause invitation", D1_CONTENT.segmentG.breakPoint4.avatarScript.join("\n\n"));
  }
  // Segment G — recognition close
  add("G · recognition", D1_CONTENT.segmentG.recognition.join("\n\n"));
  // Segment G-1.5 — framework return (no-input, auto-advances; narration plays once)
  const fr = D1_CONTENT.segmentG.frameworkReturn;
  if (fr) {
    const frText = [fr.lead, fr.body, ...(fr.steps || []), fr.tagline, fr.carryForward]
      .filter(Boolean).join("\n\n");
    add("G · framework return", frText);
  }
  // Segment G-3 — delayed retention check setup
  const drc = D1_CONTENT.segmentG.delayedRetentionCheck;
  if (drc) {
    add("G · delayed retention check setup", drc.narration.join("\n\n"));
  }

  // Segment E — scenario lab (per scenario / path / horizon)
  SCENARIOS.forEach((sc, i) => {
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`SC${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`SC${n} · intro`, sc.intro.join("\n\n"));
    const cons = sc.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`SC${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
  });

  /* ============================================================================
     --- D3 NARRATIONS ---
     D3 — Execution Reliability ("The Slow Slide" audio case).
     Mirrors the D1 add(...) sites one-for-one for every <AVPlaceholder
     text={...}> and audioText prop in BridgeFastD3Module.jsx. Keep this block
     self-contained so a merge against the sister D2 agent's edits is trivial.
     ========================================================================== */
  const D3_SCENARIOS = [SC1_CONTENT_D3, SC2_CONTENT_D3, SC3_CONTENT_D3, SC4_CONTENT_D3];

  // Segment A — D2 callback (fallback) + cold-open arc + per-path same-day
  // consequence + central question.
  const D3C0 = D3_CONTENT.segmentA.coldOpen;
  if (D3C0.d2Callback?.fallback) add("D3 · A · D2 callback fallback (Beat 1)", D3C0.d2Callback.fallback);
  add("D3 · A · cold open (Beat 2)", D3C0.narration.join("\n\n"));
  add("D3 · A · cold-open decision prompt", "What do you do?");
  for (const k of Object.keys(D3C0.sameDay)) add(`D3 · A · cold-open consequence ${k}`, D3C0.sameDay[k].join("\n\n"));
  add("D3 · A · central question", D3_CONTENT.dimension.central_question);

  // Segment B — field-guide intro
  add("D3 · B · intro", D3_CONTENT.segmentB.intro.join("\n\n"));

  // Segment C — recognition briefs
  const D3c1 = D3_CONTENT.segmentC.c1;
  add("D3 · C1 · narration · part 1 (pre-signals)", D3c1.narration.join("\n\n"));
  add("D3 · C1 · narration · part 2 (post-signals)", D3c1.close);
  const D3c2 = D3_CONTENT.segmentC.c2;
  add("D3 · C2 · narration · part 1 (pre-equation)", D3c2.narration.join("\n\n"));
  add("D3 · C2 · narration · part 2 (post-equation)", [...D3c2.delayed, ...D3c2.closing].join("\n\n"));
  const D3cq = D3c2.centralQuestionReturn;
  add("D3 · C2 · part 3 · central question returns", [D3cq.opener, D3cq.echo, D3cq.closing].join("\n\n"));
  const D3c3 = D3_CONTENT.segmentC.c3;
  add("D3 · C3 · narration · part 1 (pre-reveal)", D3c3.open);
  add("D3 · C3 · narration · part 2 (post-reveal)", [...D3c3.steps.map((s) => `${s.name} ${s.body}`), ...D3c3.close].join("\n\n"));
  const D3cComplete = D3_CONTENT.segmentC.complete;
  add("D3 · C · complete · transition to D", D3cComplete.narration.join("\n\n"));
  if (D3cComplete.scopeBoundaries) {
    add("D3 · C · complete · scope notice", D3cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  }
  const D3bp1 = D3_CONTENT.segmentC.breakPoint1;
  add("D3 · C · break point 1 · pause invitation", D3bp1.avatarScript.join("\n\n"));

  // Segment D — audio case ("The Slow Slide")
  add("D3 · D · case intro", D3_CONTENT.segmentD.intro.join("\n\n"));
  add("D3 · D · part 1 · Week One narration", D3_CONTENT.segmentD.part1.narration.join("\n\n"));
  if (D3_CONTENT.segmentD.part1.reflection) {
    add("D3 · D · Week One Reflection", D3_CONTENT.segmentD.part1.reflection.narration.join("\n\n"));
  }
  add("D3 · D · pause 1 prompt", D3_CONTENT.segmentD.pause1.prompt);
  add("D3 · D · part 2 · Week Two narration", D3_CONTENT.segmentD.part2.narration.join("\n\n"));
  add("D3 · D · pause 2 prompt", D3_CONTENT.segmentD.pause2.prompt);
  add("D3 · D · debrief mapped to Reliability System", D3_CONTENT.segmentD.part3.narration.join("\n\n"));
  // D3 INNOVATION — Decision Pause 3 (retrospective)
  if (D3_CONTENT.segmentD.retrospective) {
    add("D3 · D · pause 3 retrospective prompt", D3_CONTENT.segmentD.retrospective.narration.join("\n\n"));
  }
  add("D3 · D · complete · transition to E", D3_CONTENT.segmentD.complete.narration.join("\n\n"));
  add("D3 · D · break point 2 · pause invitation", D3_CONTENT.segmentD.breakPoint2.avatarScript.join("\n\n"));

  // Segment F — micro-drill intros + closing reflection + close transition
  add("D3 · F1 · intro", D3_CONTENT.segmentF.f1.audioIntro);
  add("D3 · F2 · intro", D3_CONTENT.segmentF.f2.audioIntro);
  if (D3_CONTENT.segmentF.closingReflection) {
    add("D3 · F · closing reflection prompt", D3_CONTENT.segmentF.closingReflection.prompt);
  }
  if (D3_CONTENT.segmentF.complete) {
    add("D3 · F · complete · transition to G", D3_CONTENT.segmentF.complete.narration.join("\n\n"));
  }

  // Segment G — break point 4 + recognition + framework return + retention check
  if (D3_CONTENT.segmentG.breakPoint4) {
    add("D3 · G · break point 4 · pause invitation", D3_CONTENT.segmentG.breakPoint4.avatarScript.join("\n\n"));
  }
  add("D3 · G · recognition", D3_CONTENT.segmentG.recognition.join("\n\n"));
  const D3fr = D3_CONTENT.segmentG.frameworkReturn;
  if (D3fr) {
    const D3frText = [D3fr.lead, D3fr.body, ...(D3fr.steps || []), D3fr.tagline, D3fr.carryForward]
      .filter(Boolean).join("\n\n");
    add("D3 · G · framework return", D3frText);
  }
  const D3drc = D3_CONTENT.segmentG.delayedRetentionCheck;
  if (D3drc) {
    add("D3 · G · delayed retention check setup", D3drc.narration.join("\n\n"));
  }

  // Segment E — scenario lab (per scenario / path / horizon)
  D3_SCENARIOS.forEach((sc, i) => {
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`D3 · SC${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`D3 · SC${n} · intro`, sc.intro.join("\n\n"));
    const cons = sc.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`D3 · SC${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
  });

  // D3 INNOVATION — SC4 Pre-Perception Replay (three threading variants).
  // Shown BEFORE the decision per script.
  const sc4 = SC4_CONTENT_D3;
  if (sc4?.prePerception) {
    for (const k of ["transparent", "cautious", "avoidant"]) {
      if (sc4.prePerception[k]) {
        add(`D3 · SC4 · pre-perception (${k})`, sc4.prePerception[k]);
      }
    }
  }

  /* ============================================================================
     --- D2 NARRATIONS ---
     D2 — Accountability & Ownership (Sprint Standup cold open + Priya's
     Hotfix audio case). Mirrors every AVPlaceholder/audioText site in
     BridgeFastD2Module.jsx. Defensive checks (?.) on every block so a
     partial content edit during a review pass never crashes the run.
     ========================================================================== */
  const D2_SCENARIOS = [SC1_CONTENT_D2, SC2_CONTENT_D2, SC3_CONTENT_D2, SC4_CONTENT_D2];

  // Segment A — D1 callback fallback (Beat 1) + cold open (Beat 2) +
  // per-path same-day consequences + safety floor + central question.
  const D2A = D2_CONTENT.segmentA;
  if (D2A?.coldOpen?.callback?.fallback) add("D2 · A · D1 callback fallback (Beat 1)", D2A.coldOpen.callback.fallback);
  if (D2A?.coldOpen?.narration) add("D2 · A · cold open (Beat 2)", D2A.coldOpen.narration.join("\n\n"));
  if (D2A?.coldOpen?.decisionPrompt) add("D2 · A · cold-open decision prompt", D2A.coldOpen.decisionPrompt);
  for (const k of Object.keys(D2A?.coldOpen?.sameDay || {})) {
    const v = D2A.coldOpen.sameDay[k];
    if (Array.isArray(v)) add(`D2 · A · cold-open consequence ${k}`, v.join("\n\n"));
  }
  if (D2A?.safetyFloor?.narration) add("D2 · A · safety floor", D2A.safetyFloor.narration.join("\n\n"));
  if (D2_CONTENT?.dimension?.central_question) add("D2 · A · central question", D2_CONTENT.dimension.central_question);

  // Segment B — reference calibration + standard intro + field guide
  const D2B = D2_CONTENT.segmentB;
  if (D2B?.b0?.narration) add("D2 · B-0 · reference calibration narration", D2B.b0.narration.join("\n\n"));
  if (D2B?.intro) add("D2 · B · intro", D2B.intro.join("\n\n"));

  // Segment C — recognition briefs (each split pre/post reveal where the
  // script puts a beat in the middle)
  const D2c1 = D2_CONTENT.segmentC?.c1;
  if (D2c1?.narration) add("D2 · C1 · narration", D2c1.narration.join("\n\n"));
  const D2c2 = D2_CONTENT.segmentC?.c2;
  if (D2c2?.narration) add("D2 · C2 · narration", D2c2.narration.join("\n\n"));
  const D2c3 = D2_CONTENT.segmentC?.c3;
  if (D2c3?.narration) add("D2 · C3 · narration", D2c3.narration.join("\n\n"));

  // Segment C → D transition + Scope Notice + Break Point 1
  const D2cComplete = D2_CONTENT.segmentC?.complete;
  if (D2cComplete?.narration) add("D2 · C · complete · transition to D", D2cComplete.narration.join("\n\n"));
  if (D2cComplete?.scopeBoundaries?.paragraphs) {
    add("D2 · C · complete · scope notice", D2cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  }
  const D2bp1 = D2_CONTENT.segmentC?.breakPoint1;
  if (D2bp1?.avatarScript) add("D2 · C · break point 1 · pause invitation", D2bp1.avatarScript.join("\n\n"));

  // Segment D — Priya's Hotfix audio case
  const D2D = D2_CONTENT.segmentD;
  if (D2D?.intro) add("D2 · D · case intro", D2D.intro.join("\n\n"));
  if (D2D?.part1?.narration) add("D2 · D · part 1", D2D.part1.narration.join("\n\n"));
  if (D2D?.pause1?.prompt) add("D2 · D · pause 1 prompt", D2D.pause1.prompt);
  if (D2D?.pause2?.intro) add("D2 · D · pause 2 intro", D2D.pause2.intro.join("\n\n"));
  if (D2D?.pause2?.prompt) add("D2 · D · pause 2 prompt", D2D.pause2.prompt);
  if (D2D?.part3?.narration) add("D2 · D · part 3", D2D.part3.narration.join("\n\n"));
  if (D2D?.complete?.narration) add("D2 · D · complete · transition to E", D2D.complete.narration.join("\n\n"));
  if (D2D?.breakPoint2?.avatarScript) add("D2 · D · break point 2 · pause invitation", D2D.breakPoint2.avatarScript.join("\n\n"));

  // Segment F — micro-drill intros + close transition
  if (D2_CONTENT.segmentF?.f1?.audioIntro) add("D2 · F1 · intro", D2_CONTENT.segmentF.f1.audioIntro);
  if (D2_CONTENT.segmentF?.f2?.audioIntro) add("D2 · F2 · intro", D2_CONTENT.segmentF.f2.audioIntro);
  if (D2_CONTENT.segmentF?.complete?.narration) {
    add("D2 · F · complete · transition to G", D2_CONTENT.segmentF.complete.narration.join("\n\n"));
  }

  // Segment G — pause invitation BP4 + recognition + framework return + retention check
  const D2G = D2_CONTENT.segmentG;
  if (D2G?.breakPoint4?.avatarScript) add("D2 · G · break point 4 · pause invitation", D2G.breakPoint4.avatarScript.join("\n\n"));
  if (D2G?.recognition) add("D2 · G · recognition", D2G.recognition.join("\n\n"));
  const D2fr = D2G?.frameworkReturn;
  if (D2fr) {
    const txt = [D2fr.lead, D2fr.body, ...(D2fr.steps || []), D2fr.tagline, D2fr.carryForward].filter(Boolean).join("\n\n");
    add("D2 · G · framework return", txt);
  }
  if (D2G?.delayedRetentionCheck?.narration) {
    add("D2 · G · delayed retention check setup", D2G.delayedRetentionCheck.narration.join("\n\n"));
  }

  // Segment E — D2 scenario lab (callback for SC1, intro + consequence horizons for each)
  D2_SCENARIOS.forEach((sc, i) => {
    if (!sc) return;
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`D2 · SC${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`D2 · SC${n} · intro`, sc.intro.join("\n\n"));
    const cons = sc.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`D2 · SC${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
  });

  /* ============================================================================
     --- D5 NARRATIONS ---
     D5 — Collaboration & Conflict Resolution ("The Same Meeting Twice"
     dual-perspective audio case). Mirrors every AVPlaceholder / audioText
     site in BridgeFastD5Module.jsx. Defensive optional chaining throughout
     so a partial content edit during a review pass never crashes the run.
     Kept self-contained so the sister-agent merge is clean.
     ========================================================================== */
  const D5_SCENARIOS = [SC1_CONTENT_D5, SC2_CONTENT_D5, SC3_CONTENT_D5, SC4_CONTENT_D5];

  // Segment A — D4 callback (fallback) + cold-open arc + per-path same-day
  // consequence + central question.
  const D5C0 = D5_CONTENT?.segmentA?.coldOpen;
  if (D5C0?.d4Callback?.fallback) add("D5 · A · D4 callback fallback (Beat 1)", D5C0.d4Callback.fallback);
  if (Array.isArray(D5C0?.narration)) add("D5 · A · cold open (Beat 2)", D5C0.narration.join("\n\n"));
  add("D5 · A · cold-open decision prompt", "What do you do?");
  for (const k of Object.keys(D5C0?.sameDay || {})) {
    const v = D5C0.sameDay[k];
    if (Array.isArray(v)) add(`D5 · A · cold-open consequence ${k}`, v.join("\n\n"));
  }
  if (D5_CONTENT?.dimension?.central_question) add("D5 · A · central question", D5_CONTENT.dimension.central_question);

  // Segment B — field-guide intro
  if (Array.isArray(D5_CONTENT?.segmentB?.intro)) add("D5 · B · intro", D5_CONTENT.segmentB.intro.join("\n\n"));

  // Segment C — recognition briefs
  const D5c1 = D5_CONTENT?.segmentC?.c1;
  if (Array.isArray(D5c1?.narration)) add("D5 · C1 · narration · part 1 (pre-signals)", D5c1.narration.join("\n\n"));
  if (D5c1?.close) add("D5 · C1 · narration · part 2 (post-signals)", D5c1.close);
  const D5c2 = D5_CONTENT?.segmentC?.c2;
  if (Array.isArray(D5c2?.narration)) add("D5 · C2 · narration · part 1 (pre-field-view)", D5c2.narration.join("\n\n"));
  if (Array.isArray(D5c2?.delayed) || Array.isArray(D5c2?.closing)) {
    add("D5 · C2 · narration · part 2 (post-field-view)", [...(D5c2.delayed || []), ...(D5c2.closing || [])].join("\n\n"));
  }
  const D5cq = D5c2?.centralQuestionReturn;
  if (D5cq) add("D5 · C2 · part 3 · central question returns", [D5cq.opener, D5cq.echo, D5cq.closing].filter(Boolean).join("\n\n"));
  const D5c3 = D5_CONTENT?.segmentC?.c3;
  if (D5c3?.open) add("D5 · C3 · narration · part 1 (pre-reveal)", D5c3.open);
  if (Array.isArray(D5c3?.steps) || Array.isArray(D5c3?.close)) {
    add("D5 · C3 · narration · part 2 (post-reveal)",
      [...(D5c3.steps || []).map((s) => `${s.name} ${s.body}`), ...(D5c3.close || [])].join("\n\n"));
  }
  const D5cComplete = D5_CONTENT?.segmentC?.complete;
  if (Array.isArray(D5cComplete?.narration)) add("D5 · C · complete · transition to D", D5cComplete.narration.join("\n\n"));
  if (D5cComplete?.scopeBoundaries?.paragraphs) {
    add("D5 · C · complete · scope notice", D5cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  }
  const D5bp1 = D5_CONTENT?.segmentC?.breakPoint1;
  if (Array.isArray(D5bp1?.avatarScript)) add("D5 · C · break point 1 · pause invitation", D5bp1.avatarScript.join("\n\n"));

  // Segment D — Audio Case "The Same Meeting Twice" (D5 SIGNATURE: dualPerspective).
  // D-2 = Morgan's chair. D-3 = Sam's chair. Two decision pauses (D-5 + D-7).
  const D5D = D5_CONTENT?.segmentD;
  if (Array.isArray(D5D?.intro)) add("D5 · D · case intro", D5D.intro.join("\n\n"));
  if (Array.isArray(D5D?.part1?.narration)) add("D5 · D · part 1 · Morgan's chair", D5D.part1.narration.join("\n\n"));
  if (Array.isArray(D5D?.part1?.reflection?.narration)) {
    add("D5 · D · After Morgan's chair", D5D.part1.reflection.narration.join("\n\n"));
  }
  if (D5D?.pause1?.prompt) add("D5 · D · pause 1 prompt", D5D.pause1.prompt);
  if (Array.isArray(D5D?.part2?.narration)) add("D5 · D · part 2 · Sam's chair", D5D.part2.narration.join("\n\n"));
  if (Array.isArray(D5D?.pause2?.intro)) add("D5 · D · pause 2 intro (three days later)", D5D.pause2.intro.join("\n\n"));
  if (D5D?.pause2?.prompt) add("D5 · D · pause 2 prompt", D5D.pause2.prompt);
  if (Array.isArray(D5D?.part3?.narration)) add("D5 · D · debrief through The Alignment Method", D5D.part3.narration.join("\n\n"));
  if (Array.isArray(D5D?.complete?.narration)) add("D5 · D · complete · transition to E", D5D.complete.narration.join("\n\n"));
  if (Array.isArray(D5D?.breakPoint2?.avatarScript)) add("D5 · D · break point 2 · pause invitation", D5D.breakPoint2.avatarScript.join("\n\n"));

  // Segment F — micro-drill intros + closing reflection + close transition
  if (D5_CONTENT?.segmentF?.f1?.audioIntro) add("D5 · F1 · intro", D5_CONTENT.segmentF.f1.audioIntro);
  if (D5_CONTENT?.segmentF?.f2?.audioIntro) add("D5 · F2 · intro", D5_CONTENT.segmentF.f2.audioIntro);
  if (D5_CONTENT?.segmentF?.closingReflection?.prompt) {
    add("D5 · F · closing reflection prompt", D5_CONTENT.segmentF.closingReflection.prompt);
  }
  if (Array.isArray(D5_CONTENT?.segmentF?.complete?.narration)) {
    add("D5 · F · complete · transition to G", D5_CONTENT.segmentF.complete.narration.join("\n\n"));
  }

  // Segment G — break point 4 + recognition + framework return + retention + role-reversal lead
  const D5G = D5_CONTENT?.segmentG;
  if (Array.isArray(D5G?.breakPoint4?.avatarScript)) add("D5 · G · break point 4 · pause invitation", D5G.breakPoint4.avatarScript.join("\n\n"));
  if (Array.isArray(D5G?.recognition)) add("D5 · G · recognition", D5G.recognition.join("\n\n"));
  const D5fr = D5G?.frameworkReturn;
  if (D5fr) {
    const txt = [D5fr.lead, D5fr.body, ...(D5fr.steps || []), D5fr.tagline, D5fr.carryForward].filter(Boolean).join("\n\n");
    add("D5 · G · framework return", txt);
  }
  // D5 SIGNATURE: roleReversal return — G-2 lead + closing avatar line.
  if (D5G?.roleReversal?.lead) add("D5 · G · role-reversal return · lead", D5G.roleReversal.lead);
  if (D5G?.roleReversal?.avatarClose) add("D5 · G · role-reversal return · avatar close", D5G.roleReversal.avatarClose);
  if (Array.isArray(D5G?.delayedRetentionCheck?.narration)) {
    add("D5 · G · delayed retention check setup", D5G.delayedRetentionCheck.narration.join("\n\n"));
  }

  // Segment E — D5 scenario lab (callback for SC1, intro + consequence horizons for each).
  // D5 SIGNATURE: roleReversal — SC3 carries the Avery's-chair prompt.
  // D5 SIGNATURE: thirdObject — SC1 carries the third-object intro line.
  D5_SCENARIOS.forEach((sc, i) => {
    if (!sc) return;
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`D5 · SC${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`D5 · SC${n} · intro`, sc.intro.join("\n\n"));
    if (n === 1 && sc.thirdObjectIntro) add(`D5 · SC${n} · third object intro`, sc.thirdObjectIntro);
    if (n === 3 && sc.roleReversal?.prompt) add(`D5 · SC${n} · role reversal prompt`, sc.roleReversal.prompt);
    if (n === 4 && sc.thirdObjectReturn?.intro) add(`D5 · SC${n} · third object return`, sc.thirdObjectReturn.intro);
    const cons = sc.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`D5 · SC${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
  });

  /* ============================================================================
     --- D4 NARRATIONS ---
     D4 — Communication Under Pressure ("The Email That Changed Everything"
     audio case). Mirrors every AVPlaceholder/audioText site in
     BridgeFastD4Module.jsx. Defensive optional-chaining (?.) on every block
     so a partial content edit during a review pass never crashes the run.
     ========================================================================== */
  const D4_SCENARIOS = [SC1_CONTENT_D4, SC2_CONTENT_D4, SC3_CONTENT_D4, SC4_CONTENT_D4];

  // Segment A — D3 callback fallback (Beat 1) + cold open (Beat 2) +
  // per-path same-day consequences + central question.
  const D4C0 = D4_CONTENT?.segmentA?.coldOpen;
  if (D4C0?.d3Callback?.fallback) add("D4 · A · D3 callback fallback (Beat 1)", D4C0.d3Callback.fallback);
  if (D4C0?.narration) add("D4 · A · cold open (Beat 2 · The All-Hands)", D4C0.narration.join("\n\n"));
  add("D4 · A · cold-open decision prompt", "What do you do?");
  for (const k of Object.keys(D4C0?.sameDay || {})) {
    const v = D4C0.sameDay[k];
    if (Array.isArray(v)) add(`D4 · A · cold-open consequence ${k}`, v.join("\n\n"));
  }
  if (D4_CONTENT?.dimension?.central_question) add("D4 · A · central question", D4_CONTENT.dimension.central_question);

  // Segment B — field-guide intro
  if (D4_CONTENT?.segmentB?.intro) add("D4 · B · intro", D4_CONTENT.segmentB.intro.join("\n\n"));

  // Segment C — recognition briefs
  const D4c1 = D4_CONTENT?.segmentC?.c1;
  if (D4c1?.narration) add("D4 · C1 · narration · part 1 (pre-signals)", D4c1.narration.join("\n\n"));
  if (D4c1?.close) add("D4 · C1 · narration · part 2 (post-signals)", D4c1.close);
  const D4c2 = D4_CONTENT?.segmentC?.c2;
  if (D4c2?.narration) add("D4 · C2 · narration · part 1 (pre-equation)", D4c2.narration.join("\n\n"));
  if (D4c2?.delayed && D4c2?.closing) add("D4 · C2 · narration · part 2 (post-equation)", [...D4c2.delayed, ...D4c2.closing].join("\n\n"));
  const D4cq = D4c2?.centralQuestionReturn;
  if (D4cq) add("D4 · C2 · part 3 · central question returns", [D4cq.opener, D4cq.echo, D4cq.closing].join("\n\n"));
  const D4c3 = D4_CONTENT?.segmentC?.c3;
  if (D4c3?.open) add("D4 · C3 · narration · part 1 (pre-reveal)", D4c3.open);
  if (D4c3?.steps && D4c3?.close) add("D4 · C3 · narration · part 2 (post-reveal)", [...D4c3.steps.map((s) => `${s.name} ${s.body}`), ...D4c3.close].join("\n\n"));
  const D4cComplete = D4_CONTENT?.segmentC?.complete;
  if (D4cComplete?.narration) add("D4 · C · complete · transition to D", D4cComplete.narration.join("\n\n"));
  if (D4cComplete?.scopeBoundaries?.paragraphs) {
    add("D4 · C · complete · scope notice", D4cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  }
  const D4bp1 = D4_CONTENT?.segmentC?.breakPoint1;
  if (D4bp1?.avatarScript) add("D4 · C · break point 1 · pause invitation", D4bp1.avatarScript.join("\n\n"));

  // Segment D — audio case ("The Email That Changed Everything")
  const D4D = D4_CONTENT?.segmentD;
  if (D4D?.intro) add("D4 · D · case intro", D4D.intro.join("\n\n"));
  if (D4D?.part1?.narration) add("D4 · D · part 1 · Beat 1 (afternoon you wrote it)", D4D.part1.narration.join("\n\n"));
  if (D4D?.part1?.reflection?.narration) {
    add("D4 · D · part 1 · Beat 3 (the send and the moment after)", D4D.part1.reflection.narration.join("\n\n"));
  }
  if (D4D?.pause1?.prompt) add("D4 · D · pause 1 prompt (reopen the draft)", D4D.pause1.prompt);
  if (D4D?.part2?.narration) add("D4 · D · part 2 · Beat 4 (three weeks between send and discovery)", D4D.part2.narration.join("\n\n"));
  if (D4D?.pause2?.prompt) add("D4 · D · pause 2 prompt (today)", D4D.pause2.prompt);
  if (D4D?.part3?.narration) add("D4 · D · debrief mapped to Pressure Response Protocol", D4D.part3.narration.join("\n\n"));
  if (D4D?.complete?.narration) add("D4 · D · complete · transition to E", D4D.complete.narration.join("\n\n"));
  if (D4D?.breakPoint2?.avatarScript) add("D4 · D · break point 2 · pause invitation", D4D.breakPoint2.avatarScript.join("\n\n"));

  // Segment F — micro-drill intros + closing reflection + close transition
  if (D4_CONTENT?.segmentF?.f1?.audioIntro) add("D4 · F1 · intro (One Sentence Under Pressure)", D4_CONTENT.segmentF.f1.audioIntro);
  if (D4_CONTENT?.segmentF?.f2?.audioIntro) add("D4 · F2 · intro (Landing Confirmation)", D4_CONTENT.segmentF.f2.audioIntro);
  if (D4_CONTENT?.segmentF?.closingReflection?.prompt) {
    add("D4 · F · closing reflection prompt", D4_CONTENT.segmentF.closingReflection.prompt);
  }
  if (D4_CONTENT?.segmentF?.complete?.narration) {
    add("D4 · F · complete · transition to G", D4_CONTENT.segmentF.complete.narration.join("\n\n"));
  }

  // Segment G — break point 4 + recognition + framework return + retention check
  const D4G = D4_CONTENT?.segmentG;
  if (D4G?.breakPoint4?.avatarScript) add("D4 · G · break point 4 · pause invitation", D4G.breakPoint4.avatarScript.join("\n\n"));
  if (D4G?.recognition) add("D4 · G · recognition", D4G.recognition.join("\n\n"));
  const D4fr = D4G?.frameworkReturn;
  if (D4fr) {
    const D4frText = [D4fr.lead, D4fr.body, ...(D4fr.steps || []), D4fr.tagline, D4fr.carryForward]
      .filter(Boolean).join("\n\n");
    add("D4 · G · framework return (Pressure Response Protocol)", D4frText);
  }
  if (D4G?.delayedRetentionCheck?.narration) {
    add("D4 · G · delayed retention check setup", D4G.delayedRetentionCheck.narration.join("\n\n"));
  }

  // Segment E — scenario lab (per scenario / path / horizon)
  D4_SCENARIOS.forEach((sc, i) => {
    if (!sc) return;
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`D4 · SC${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`D4 · SC${n} · intro`, sc.intro.join("\n\n"));
    const cons = sc?.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`D4 · SC${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
  });

  // SC4 Pre-Perception Replay (three threading variants).
  const D4sc4 = SC4_CONTENT_D4;
  if (D4sc4?.prePerception) {
    for (const k of ["transparent", "cautious", "avoidant"]) {
      if (D4sc4.prePerception?.[k]) {
        add(`D4 · SC4 · pre-perception (${k})`, D4sc4.prePerception[k]);
      }
    }
  }

  /* ============================================================================
     --- D8 NARRATIONS ---
     D8 — Resilience & Recovery ("The Person Who Came Back Too Fast" audio case).
     Mirrors every <AVPlaceholder text> / audioText site in BridgeFastD8Module.jsx
     with defensive optional chaining so a partial content edit never crashes
     the run.
     ========================================================================== */
  const D8_SCENARIOS = [SC1_CONTENT_D8, SC2_CONTENT_D8, SC3_CONTENT_D8, SC4_CONTENT_D8];

  // Segment A — D5 callback (fallback) + cold open + per-path same-day + safety + central question.
  const D8C0 = D8_CONTENT?.segmentA?.coldOpen;
  if (D8C0?.d5Callback?.fallback) add("D8 · A · D5 callback fallback (Beat 1)", D8C0.d5Callback.fallback);
  if (D8C0?.narration) add("D8 · A · cold open (Beat 2)", D8C0.narration.join("\n\n"));
  add("D8 · A · cold-open decision prompt", "What do you do?");
  for (const k of Object.keys(D8C0?.sameDay || {})) {
    const v = D8C0.sameDay[k];
    if (Array.isArray(v)) add(`D8 · A · cold-open consequence ${k}`, v.join("\n\n"));
  }
  if (D8_CONTENT?.segmentA?.safetyFloor?.card) add("D8 · A · safety floor", D8_CONTENT.segmentA.safetyFloor.card.join("\n\n"));
  if (D8_CONTENT?.dimension?.central_question) add("D8 · A · central question", D8_CONTENT.dimension.central_question);

  // Segment B — field-guide intro.
  if (D8_CONTENT?.segmentB?.intro) add("D8 · B · intro", D8_CONTENT.segmentB.intro.join("\n\n"));

  // Segment C — recognition briefs.
  const D8c1 = D8_CONTENT?.segmentC?.c1;
  if (D8c1?.narration) add("D8 · C1 · narration · part 1 (pre-signals)", D8c1.narration.join("\n\n"));
  if (D8c1?.close) add("D8 · C1 · narration · part 2 (post-signals)", D8c1.close);
  const D8c2 = D8_CONTENT?.segmentC?.c2;
  if (D8c2?.narration) add("D8 · C2 · narration · part 1 (pre-equation)", D8c2.narration.join("\n\n"));
  if (D8c2?.delayed && D8c2?.closing) add("D8 · C2 · narration · part 2 (post-equation)", [...D8c2.delayed, ...D8c2.closing].join("\n\n"));
  const D8cq = D8c2?.centralQuestionReturn;
  if (D8cq) add("D8 · C2 · part 3 · central question returns", [D8cq.opener, D8cq.echo, D8cq.closing].filter(Boolean).join("\n\n"));
  const D8c3 = D8_CONTENT?.segmentC?.c3;
  if (D8c3?.open) add("D8 · C3 · narration · part 1 (pre-reveal)", D8c3.open);
  if (D8c3?.steps && D8c3?.close) add("D8 · C3 · narration · part 2 (post-reveal)", [...D8c3.steps.map((s) => `${s.name} ${s.body}`), ...D8c3.close].join("\n\n"));
  const D8cComplete = D8_CONTENT?.segmentC?.complete;
  if (D8cComplete?.narration) add("D8 · C · complete · transition to D", D8cComplete.narration.join("\n\n"));
  if (D8cComplete?.scopeBoundaries?.paragraphs) add("D8 · C · complete · scope notice", D8cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  const D8bp1 = D8_CONTENT?.segmentC?.breakPoint1;
  if (D8bp1?.avatarScript) add("D8 · C · break point 1 · pause invitation", D8bp1.avatarScript.join("\n\n"));

  // Segment D — Audio Case "The Person Who Came Back Too Fast" (dual narration + retrospective).
  const D8D = D8_CONTENT?.segmentD;
  if (D8D?.intro) add("D8 · D · case intro", D8D.intro.join("\n\n"));
  if (D8D?.part1?.narration) add("D8 · D · part 1 · Nina internal", D8D.part1.narration.join("\n\n"));
  if (D8D?.part1b?.narration) add("D8 · D · part 1b · Manager external", D8D.part1b.narration.join("\n\n"));
  if (D8D?.gap?.narration) add("D8 · D · gap", D8D.gap.narration.join("\n\n"));
  if (D8D?.pause1?.prompt) add("D8 · D · pause 1 prompt", D8D.pause1.prompt);
  if (D8D?.part2?.narration) add("D8 · D · part 2 · one-week consequence", D8D.part2.narration.join("\n\n"));
  if (D8D?.retrospective?.narration) add("D8 · D · retrospective prompt", D8D.retrospective.narration.join("\n\n"));
  if (D8D?.part3?.narration) add("D8 · D · debrief through The Recovery Method", D8D.part3.narration.join("\n\n"));
  if (D8D?.complete?.narration) add("D8 · D · complete · transition to E", D8D.complete.narration.join("\n\n"));
  if (D8D?.breakPoint2?.avatarScript) add("D8 · D · break point 2 · pause invitation", D8D.breakPoint2.avatarScript.join("\n\n"));

  // Segment F — micro-drill intros + closing reflection + close transition.
  if (D8_CONTENT?.segmentF?.f1?.audioIntro) add("D8 · F1 · intro", D8_CONTENT.segmentF.f1.audioIntro);
  if (D8_CONTENT?.segmentF?.f2?.audioIntro) add("D8 · F2 · intro", D8_CONTENT.segmentF.f2.audioIntro);
  if (D8_CONTENT?.segmentF?.closingReflection?.prompt) add("D8 · F · closing reflection prompt", D8_CONTENT.segmentF.closingReflection.prompt);
  if (D8_CONTENT?.segmentF?.complete?.narration) add("D8 · F · complete · transition to G", D8_CONTENT.segmentF.complete.narration.join("\n\n"));

  // Segment G — break point 4 + recognition + framework return + retention check.
  const D8G = D8_CONTENT?.segmentG;
  if (D8G?.breakPoint4?.avatarScript) add("D8 · G · break point 4 · pause invitation", D8G.breakPoint4.avatarScript.join("\n\n"));
  if (D8G?.recognition) add("D8 · G · recognition", D8G.recognition.join("\n\n"));
  const D8fr = D8G?.frameworkReturn;
  if (D8fr) {
    const txt = [D8fr.lead, D8fr.body, ...(D8fr.steps || []), D8fr.tagline, D8fr.carryForward].filter(Boolean).join("\n\n");
    add("D8 · G · framework return", txt);
  }
  if (D8G?.delayedRetentionCheck?.narration) add("D8 · G · delayed retention check setup", D8G.delayedRetentionCheck.narration.join("\n\n"));

  // Segment E — D8 scenario lab (callback for SC1, intro + per-path per-horizon consequences).
  D8_SCENARIOS.forEach((sc, i) => {
    if (!sc) return;
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`D8 · SC${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`D8 · SC${n} · intro`, sc.intro.join("\n\n"));
    const cons = sc.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`D8 · SC${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
  });

  // D8 SC4 Pre-Trust Replay (three threading variants).
  const D8sc4 = SC4_CONTENT_D8;
  if (D8sc4?.prePerception) {
    for (const k of ["transparent", "cautious", "avoidant"]) {
      if (D8sc4.prePerception[k]) add(`D8 · SC4 · pre-perception (${k})`, D8sc4.prePerception[k]);
    }
  }

  /* ============================================================================
     --- D9 NARRATIONS ---
     D9 — Learning Agility (Probation Blueprint Capstone). "The Feedback That
     Followed Her" longitudinal audio case + Comfort Trap cold open + Agility
     Ledger scenarios + Capstone Memory Weave + Capstone Moment Protocol.
     Mirrors how D3 add() calls are wired. Defensive optional chaining on every
     access so a partial content edit during a review pass never crashes the run.
     ========================================================================== */
  const D9_SCENARIOS = [SC1_CONTENT_D9, SC2_CONTENT_D9, SC3_CONTENT_D9, SC4_CONTENT_D9];

  // Segment A — D8 callback fallback + Comfort Trap cold-open + per-path
  // same-day consequence + safety floor + central question + A-1.5 prompts.
  const D9A = D9_CONTENT?.segmentA;
  if (D9A?.coldOpen?.d8Callback?.fallback) add("D9 · A · D8 callback fallback (Beat 1)", D9A.coldOpen.d8Callback.fallback);
  if (D9A?.coldOpen?.d8Callback?.wrapperLead) add("D9 · A · D8 callback wrapper lead", D9A.coldOpen.d8Callback.wrapperLead);
  if (D9A?.coldOpen?.d8Callback?.wrapperTail) add("D9 · A · D8 callback wrapper tail", D9A.coldOpen.d8Callback.wrapperTail);
  if (D9A?.coldOpen?.narration) add("D9 · A · cold open (Comfort Trap, Beat 2)", D9A.coldOpen.narration.join("\n\n"));
  if (D9A?.coldOpen?.mistakeLine) add("D9 · A · cold-open mistake line", D9A.coldOpen.mistakeLine);
  add("D9 · A · cold-open decision prompt", "What do you do?");
  if (D9A?.coldOpen?.artifactWrite?.prompt) add("D9 · A-1.5 · two-line artifact-write prompt", D9A.coldOpen.artifactWrite.prompt.join("\n\n"));
  for (const k of Object.keys(D9A?.coldOpen?.sameDay || {})) {
    const v = D9A.coldOpen.sameDay[k];
    if (Array.isArray(v)) add(`D9 · A · cold-open consequence ${k}`, v.join("\n\n"));
  }
  if (D9A?.safetyFloor?.card) add("D9 · A · safety floor", D9A.safetyFloor.card.join("\n\n"));
  if (D9_CONTENT?.dimension?.central_question) add("D9 · A · central question", D9_CONTENT.dimension.central_question);

  // Segment B — field-guide intro + isNot narration + cost equation narration + reflection.
  const D9B = D9_CONTENT?.segmentB;
  if (D9B?.intro) add("D9 · B · intro", D9B.intro.join("\n\n"));
  if (D9B?.fieldGuide?.isNot?.narration) add("D9 · B-2 · what D9 is not narration", D9B.fieldGuide.isNot.narration);
  if (D9B?.fieldGuide?.costEquation?.narration) add("D9 · B-5 · cost equation narration", D9B.fieldGuide.costEquation.narration);
  if (D9B?.fieldGuide?.costEquation?.brutalLine) add("D9 · B-5 · brutal line", D9B.fieldGuide.costEquation.brutalLine);
  if (D9B?.reflectionPrompt) add("D9 · B · reflection prompt", D9B.reflectionPrompt);

  // Segment C — three Recognition Briefs.
  const D9c1 = D9_CONTENT?.segmentC?.c1;
  if (D9c1?.narration) add("D9 · C1 · narration · part 1 (pre-signals)", D9c1.narration.join("\n\n"));
  if (D9c1?.close) add("D9 · C1 · narration · part 2 (post-signals)", D9c1.close);
  const D9c2 = D9_CONTENT?.segmentC?.c2;
  if (D9c2?.narration) add("D9 · C2 · narration · part 1 (pre-equation)", D9c2.narration.join("\n\n"));
  if (D9c2?.delayed || D9c2?.closing) add("D9 · C2 · narration · part 2 (post-equation)", [...(D9c2?.delayed || []), ...(D9c2?.closing || [])].join("\n\n"));
  const D9cq = D9c2?.centralQuestionReturn;
  if (D9cq) add("D9 · C2 · part 3 · central question returns", [D9cq.opener, D9cq.echo, D9cq.closing].filter(Boolean).join("\n\n"));
  const D9c3 = D9_CONTENT?.segmentC?.c3;
  if (D9c3?.open) add("D9 · C3 · narration · part 1 (pre-reveal)", D9c3.open);
  if (D9c3) add("D9 · C3 · narration · part 2 (post-reveal)", [...(D9c3.steps || []).map((s) => `${s.name} ${s.body}`), ...(D9c3.close || [])].join("\n\n"));
  const D9cComplete = D9_CONTENT?.segmentC?.complete;
  if (D9cComplete?.narration) add("D9 · C · complete · transition to D", D9cComplete.narration.join("\n\n"));
  if (D9cComplete?.scopeBoundaries?.paragraphs) add("D9 · C · complete · scope notice", D9cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  const D9bp1 = D9_CONTENT?.segmentC?.breakPoint1;
  if (D9bp1?.avatarScript) add("D9 · C · break point 1 · pause invitation", D9bp1.avatarScript.join("\n\n"));

  // Segment D — longitudinal Audio Case "The Feedback That Followed Her".
  const D9D = D9_CONTENT?.segmentD;
  if (D9D?.intro) add("D9 · D · case intro", D9D.intro.join("\n\n"));
  // 9-beat structure — register per-beat narration with voice profile labels.
  for (const beat of D9D?.beats || []) {
    if (Array.isArray(beat?.narration)) {
      add(`D9 · D · ${beat.id} · ${beat.voice || "avatar"} narration`, beat.narration.join("\n\n"));
    }
    if (beat?.onScreen) add(`D9 · D · ${beat.id} · on-screen`, beat.onScreen);
    if (beat?.wow) add(`D9 · D · ${beat.id} · wow line`, beat.wow);
  }
  // Engine-compat surfaces — part1/pause1/part2/retrospective/part3 mirror D3.
  if (D9D?.part1?.narration) add("D9 · D · part 1 · beats D-1..D-5 aggregate", D9D.part1.narration.join("\n\n"));
  if (D9D?.part1?.reflection?.narration) add("D9 · D · D-5 pattern reveal", D9D.part1.reflection.narration.join("\n\n"));
  if (D9D?.pause1?.prompt) add("D9 · D · pause 1 (D-6 decision pause) prompt", D9D.pause1.prompt);
  if (D9D?.part2?.narration) add("D9 · D · part 2 · D-7 reference calibration", D9D.part2.narration.join("\n\n"));
  if (D9D?.retrospective?.narration) add("D9 · D · D-8 retrospective Growth Extraction prompt", D9D.retrospective.narration.join("\n\n"));
  if (D9D?.retrospective?.writePrompt) add("D9 · D · D-8 write prompt", D9D.retrospective.writePrompt);
  if (D9D?.part3?.narration) add("D9 · D · D-9 debrief through Learning Cycle", D9D.part3.narration.join("\n\n"));
  if (D9D?.close?.card) add("D9 · D · close card", D9D.close.card.join("\n\n"));
  if (D9D?.complete?.narration) add("D9 · D · complete · transition to E", D9D.complete.narration.join("\n\n"));
  if (D9D?.breakPoint2?.avatarScript) add("D9 · D · break point 2 · pause invitation", D9D.breakPoint2.avatarScript.join("\n\n"));

  // Segment F — Drill 1 (Repeat-Back) + Drill 2 (One Behaviour) + closing.
  if (D9_CONTENT?.segmentF?.f1?.audioIntro) add("D9 · F1 (Repeat-Back) · intro", D9_CONTENT.segmentF.f1.audioIntro);
  if (D9_CONTENT?.segmentF?.f1?.closeCard) add("D9 · F1 · close card", D9_CONTENT.segmentF.f1.closeCard);
  if (D9_CONTENT?.segmentF?.f2?.audioIntro) add("D9 · F2 (One Behaviour) · intro", D9_CONTENT.segmentF.f2.audioIntro);
  if (D9_CONTENT?.segmentF?.f2?.closeCard) add("D9 · F2 · close card", D9_CONTENT.segmentF.f2.closeCard);
  if (D9_CONTENT?.segmentF?.closingReflection?.prompt) add("D9 · F · closing reflection prompt", D9_CONTENT.segmentF.closingReflection.prompt);
  if (D9_CONTENT?.segmentF?.complete?.narration) add("D9 · F · complete · transition to G", D9_CONTENT.segmentF.complete.narration.join("\n\n"));

  // Segment G — break 4 + recognition + framework return + Capstone Weave + Retention + Capstone Moment.
  const D9G = D9_CONTENT?.segmentG;
  if (D9G?.breakPoint4?.avatarScript) add("D9 · G · break point 4 · pause invitation", D9G.breakPoint4.avatarScript.join("\n\n"));
  if (D9G?.recognition) add("D9 · G-1 · recognition", D9G.recognition.join("\n\n"));
  const D9fr = D9G?.frameworkReturn;
  if (D9fr) {
    const txt = [D9fr.lead, D9fr.body, ...(D9fr.steps || []), D9fr.tagline, D9fr.carryForward].filter(Boolean).join("\n\n");
    add("D9 · G-1.5 · framework return", txt);
  }
  // G-2 Capstone Memory Weave + Six-Month Replay (D9 signature mechanic).
  if (D9G?.capstoneWeave?.header) add("D9 · G-2 · capstone weave header", D9G.capstoneWeave.header);
  if (D9G?.capstoneWeave?.ledgerHeader) add("D9 · G-2 · ledger header", D9G.capstoneWeave.ledgerHeader);
  if (D9G?.capstoneWeave?.replayPrompt) add("D9 · G-2 · six-month replay prompt", D9G.capstoneWeave.replayPrompt);
  if (D9G?.capstoneWeave?.replayWritePrompt) add("D9 · G-2 · six-month replay write prompt", D9G.capstoneWeave.replayWritePrompt);
  if (D9G?.capstoneWeave?.doctrinalNote) add("D9 · G-2 · doctrinal note", D9G.capstoneWeave.doctrinalNote);
  // G-3 retention check setup.
  if (D9G?.delayedRetentionCheck?.narration) add("D9 · G-3 · delayed retention check setup", D9G.delayedRetentionCheck.narration.join("\n\n"));
  // G-4 Capstone Moment Protocol (locked sequence).
  const D9cm = D9G?.capstoneMoment;
  if (D9cm?.step1?.narration) add("D9 · G-4 · step 1 final personal sentence prompt narration", D9cm.step1.narration.join("\n\n"));
  if (D9cm?.step1?.prompt) add("D9 · G-4 · step 1 write prompt", D9cm.step1.prompt);
  if (D9cm?.sevenVersionsLine) add("D9 · G-4 · seven-versions line (LOCKED)", D9cm.sevenVersionsLine);
  if (Array.isArray(D9cm?.closingCouplet)) {
    add("D9 · G-4 · closing couplet line 1 (LOCKED)", D9cm.closingCouplet[0]);
    if (D9cm.closingCouplet[1]) add("D9 · G-4 · closing couplet line 2 (LOCKED)", D9cm.closingCouplet[1]);
  }
  if (D9cm?.mvpArc?.line) add("D9 · G-4 · MVP arc panel (LOCKED)", D9cm.mvpArc.line);
  if (D9cm?.mvpArc?.completion) add("D9 · G-4 · blueprint completion line", D9cm.mvpArc.completion);
  if (D9G?.bookendQuestion) add("D9 · G-4 · bookend central question", D9G.bookendQuestion);
  if (D9G?.finalPrompt) add("D9 · G-4 · final prompt", D9G.finalPrompt);

  // Mid-Lab Pattern Check (between SC2 and SC3).
  if (MID_LAB_PATTERN_CHECK_D9?.bridge) add("D9 · Mid-Lab Pattern Check · bridge", MID_LAB_PATTERN_CHECK_D9.bridge);
  if (MID_LAB_PATTERN_CHECK_D9?.prompt) add("D9 · Mid-Lab Pattern Check · prompt", MID_LAB_PATTERN_CHECK_D9.prompt);

  // Segment E — scenario lab (per scenario / path / horizon).
  D9_SCENARIOS.forEach((sc, i) => {
    if (!sc) return;
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`D9 · SC${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`D9 · SC${n} · intro`, sc.intro.join("\n\n"));
    if (sc.reflection) add(`D9 · SC${n} · reflection prompt`, sc.reflection);
    const cons = sc.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`D9 · SC${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
  });

  // SC3 — Mandatory Growth Extraction (D9 signature).
  if (SC3_CONTENT_D9?.growthExtraction?.prompt) add("D9 · SC3 · mandatory Growth Extraction prompt", SC3_CONTENT_D9.growthExtraction.prompt);

  // SC4 — Perception Replay (5 state variants) + locked reckoning line.
  for (const state of Object.keys(PERCEPTION_REPLAY_D9?.variants || {})) {
    add(`D9 · SC4 · Perception Replay (${state})`, PERCEPTION_REPLAY_D9.variants[state]);
  }
  if (PERCEPTION_REPLAY_D9?.intro) add("D9 · SC4 · Perception Replay intro", PERCEPTION_REPLAY_D9.intro);
  if (SC4_CONTENT_D9?.reckoningLine?.primary) add("D9 · SC4 · locked reckoning line (primary)", SC4_CONTENT_D9.reckoningLine.primary);
  if (SC4_CONTENT_D9?.reckoningLine?.secondary) add("D9 · SC4 · locked reckoning line (secondary)", SC4_CONTENT_D9.reckoningLine.secondary);
  if (SC4_CONTENT_D9?.reckoningLine?.wow) add("D9 · SC4 · reckoning wow line", SC4_CONTENT_D9.reckoningLine.wow);
  // --- END D9 NARRATIONS ---

  /* ============================================================================
     --- M1 NARRATIONS ---
     M1 — AI Output Judgment (AIWorkLab · Pressure Point 1). AIWorkLab
     architecture: six segments A/B/C/E/F/G (NO Segment D), two layered
     scenarios (LS1, LS2) with Inspect → Decide → Pressure beats and
     within-module memory residue. Every add() below uses defensive optional
     chaining so a partial content edit never crashes the generator.
     ========================================================================== */
  const M1_SCENARIOS = [LS1_CONTENT_M1, LS2_CONTENT_M1];

  // Segment A — cross-lab D3 callback (fallback), cold open, Marcus's slack,
  // per-path same-day consequence, safety floor, central question.
  const M1A = M1_CONTENT?.segmentA;
  if (M1A?.coldOpen?.d3Callback?.fallback) add("M1 · A-0 · D3 callback fallback (Screen A-0)", M1A.coldOpen.d3Callback.fallback);
  if (M1A?.coldOpen?.d3Callback?.wrapperLead) add("M1 · A-0 · D3 callback wrapper lead", M1A.coldOpen.d3Callback.wrapperLead);
  if (M1A?.coldOpen?.d3Callback?.wrapperTail) add("M1 · A-0 · D3 callback wrapper tail", M1A.coldOpen.d3Callback.wrapperTail);
  if (M1A?.coldOpen?.narration) add("M1 · A-1 · cold open — Marcus's inbox", M1A.coldOpen.narration.join("\n\n"));
  add("M1 · A-1 · cold-open decision prompt", "Do you check, or do you ship?");
  for (const k of Object.keys(M1A?.coldOpen?.sameDay || {})) {
    const v = M1A.coldOpen.sameDay[k];
    if (Array.isArray(v)) add(`M1 · A-2 · cold-open consequence ${k}`, v.join("\n\n"));
  }
  if (M1A?.safetyFloor?.card) add("M1 · A-3 · safety floor", M1A.safetyFloor.card.join("\n\n"));
  if (M1_CONTENT?.dimension?.central_question) add("M1 · A-4 · central question", M1_CONTENT.dimension.central_question);
  if (M1A?.centralQuestion?.subline) add("M1 · A-4 · central question subline", M1A.centralQuestion.subline);

  // Segment B — three screens: what was lived, the standard, what it refuses,
  // plus a short reflection prompt.
  const M1B = M1_CONTENT?.segmentB;
  if (M1B?.justLived?.narration) add("M1 · B-1 · what the participant just lived through", M1B.justLived.narration.join("\n\n"));
  if (M1B?.standard) {
    const s = M1B.standard;
    add("M1 · B-2 · the verification standard", [s.title, ...(s.lines || []), s.footer].filter(Boolean).join("\n"));
  }
  if (M1B?.refuses) {
    const r = M1B.refuses;
    add("M1 · B-3 · what the standard refuses", [r.title, ...(r.items || [])].filter(Boolean).join("\n"));
  }
  if (M1B?.reflectionPrompt) add("M1 · B · reflection prompt", M1B.reflectionPrompt);

  // Segment C — Recognition Brief 1 + Recognition Brief 2 (Source-First Habit
  // reveal) + central question return.
  const M1c1 = M1_CONTENT?.segmentC?.c1;
  if (M1c1?.narration) add("M1 · C1 · narration", M1c1.narration.join("\n\n"));
  if (M1c1?.lockedCard) add("M1 · C1 · locked card", [M1c1.lockedCard.line1, M1c1.lockedCard.line2].filter(Boolean).join("\n"));
  const M1c2 = M1_CONTENT?.segmentC?.c2;
  if (M1c2?.narration) add("M1 · C2 · Source-First Habit narration (post-reveal)", M1c2.narration.join("\n\n"));
  const M1cq = M1c2?.centralQuestionReturn;
  if (M1cq) add("M1 · C2 · central question returns", [M1cq.opener, M1cq.echo, M1cq.closing].filter(Boolean).join("\n\n"));
  const M1cComplete = M1_CONTENT?.segmentC?.complete;
  if (M1cComplete?.narration) add("M1 · C · complete · transition to E", M1cComplete.narration.join("\n\n"));

  // Segment E — LS1 + LS2 (per scenario / path / horizon).
  M1_SCENARIOS.forEach((sc, i) => {
    if (!sc) return;
    const n = i + 1;
    if (Array.isArray(sc.intro)) add(`M1 · LS${n} · intro`, sc.intro.join("\n\n"));
    // LS2 cold setup + within-module memory residue (Slack from Aanya).
    if (sc.coldSetup?.lines) add(`M1 · LS${n} · cold setup`, sc.coldSetup.lines.join("\n\n"));
    for (const k of Object.keys(sc.coldSetup?.aanyaSlackByLS1 || {})) {
      const v = sc.coldSetup.aanyaSlackByLS1[k];
      if (v) add(`M1 · LS${n} · within-module residue · Aanya Slack (LS1=${k})`, v);
    }
    // Inspect Beat prompt (source is on the left; output is on the right).
    if (sc.inspect?.prompt) add(`M1 · LS${n} · Inspect Beat prompt`, sc.inspect.prompt);
    // Decide prompt (baseline + drift variants for LS2).
    if (sc.decidePrompt) add(`M1 · LS${n} · Decide prompt`, sc.decidePrompt);
    for (const k of Object.keys(sc.decidePromptByLS1 || {})) {
      const v = sc.decidePromptByLS1[k];
      if (v) add(`M1 · LS${n} · Decide prompt drift (LS1=${k})`, v);
    }
    // Pressure Beat prompt.
    if (sc.pressure?.prompt) add(`M1 · LS${n} · Pressure Beat prompt (${sc.pressure.type})`, sc.pressure.prompt);
    // Per-path per-horizon consequences.
    const cons = sc.consequences || {};
    for (const p of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[p]?.[h];
        if (Array.isArray(arr)) add(`M1 · LS${n} · ${p} · ${h}`, arr.join("\n\n"));
      }
      if (cons[p]?.interp) add(`M1 · LS${n} · ${p} · interp`, cons[p].interp);
      if (cons[p]?.manager) add(`M1 · LS${n} · ${p} · manager lens`, cons[p].manager);
    }
    if (sc.reflection) add(`M1 · LS${n} · reflection prompt`, sc.reflection);
  });

  // Segment F — F1 write drill + F2 choice drill + reflection card + F transition.
  const M1F = M1_CONTENT?.segmentF;
  if (M1F?.f1?.audioIntro) add("M1 · F1 (Edit toward the source) · intro", M1F.f1.audioIntro);
  if (M1F?.f1?.writePrompt) add("M1 · F1 · write prompt", M1F.f1.writePrompt);
  if (M1F?.f1?.closeCard) add("M1 · F1 · close card", M1F.f1.closeCard);
  if (M1F?.f2?.audioIntro) add("M1 · F2 (Refuse the smoothing) · intro", M1F.f2.audioIntro);
  if (M1F?.f2?.prompt) add("M1 · F2 · prompt", M1F.f2.prompt);
  if (M1F?.reflectionCard?.line) add("M1 · F · reflection card", M1F.reflectionCard.line);
  if (M1F?.complete?.narration) add("M1 · F · complete · transition to G", M1F.complete.narration.join("\n\n"));

  // Segment G — recognition + framework return + retention setup + awe close +
  // per-path callback + central question return + final prompt.
  const M1G = M1_CONTENT?.segmentG;
  if (M1G?.recognition?.lines) add("M1 · G-1 · recognition", M1G.recognition.lines.join("\n\n"));
  const M1fr = M1G?.frameworkReturn;
  if (M1fr) {
    const txt = [M1fr.lead, M1fr.body, ...(M1fr.steps || []), M1fr.tagline, M1fr.carryForward].filter(Boolean).join("\n\n");
    add("M1 · G-15 · framework return", txt);
  }
  if (M1G?.retentionCheck?.title) add("M1 · G-3 · retention check setup", [M1G.retentionCheck.title, M1G.retentionCheck.subtitle].filter(Boolean).join("\n\n"));
  if (M1G?.aweMoment) add("M1 · G-2 · awe moment (LOCKED)", [M1G.aweMoment.lineOne, M1G.aweMoment.lineTwo].filter(Boolean).join("\n"));
  for (const k of Object.keys(M1G?.callback || {})) {
    const v = M1G.callback[k];
    if (v) add(`M1 · G · cold-open callback (path ${k})`, v);
  }
  if (M1G?.bookendQuestion) add("M1 · G-4 · bookend central question", M1G.bookendQuestion);
  if (M1G?.finalPrompt) add("M1 · G-4 · final prompt", M1G.finalPrompt);
  // --- END M1 NARRATIONS ---

  /* ============================================================================
     --- M2 NARRATIONS ---
     M2 — AI Disclosure & Attribution (AIWorkLab Pressure Point 2). AIWorkLab
     architecture: six segments (A/B/C/E/F/G — no Segment D). Two layered
     scenarios (LS1 → LS2) with intra-module residue. Mirrors every
     AVPlaceholder / audioText site in BridgeFastM2Module.jsx. Defensive
     optional chaining on every access so a partial content edit during
     review never crashes the run. Kept self-contained for a clean merge
     with the sister-agent M1/M3/M4/M5 edits.
     ========================================================================== */

  // Segment A — D1 cross-lab callback fallback + inbox scene lead + central question.
  const M2A = M2_CONTENT?.segmentA;
  if (M2A?.coldOpen?.d1Callback?.fallback) {
    add("M2 · A · D1 callback fallback (Beat 1)", M2A.coldOpen.d1Callback.fallback);
  }
  if (Array.isArray(M2A?.coldOpen?.sceneLead)) {
    add("M2 · A · scene lead (Beat 2)", M2A.coldOpen.sceneLead.join("\n\n"));
  }
  if (M2A?.coldOpen?.centralQuestionCard?.primary) {
    add("M2 · A · central question", M2A.coldOpen.centralQuestionCard.primary);
  }

  // Segment B — intro + standard read + refuses card + reflection prompt.
  const M2B = M2_CONTENT?.segmentB;
  if (Array.isArray(M2B?.intro)) add("M2 · B · intro", M2B.intro.join("\n\n"));
  if (M2B?.standardCard) {
    const sc = M2B.standardCard;
    const stdText = [sc.title + ".", ...(sc.items || []), sc.footer].filter(Boolean).join("\n\n");
    add("M2 · B-2 · disclosure standard", stdText);
  }
  if (M2B?.refusesCard) {
    const rc = M2B.refusesCard;
    const rcText = [rc.title + ".", ...((rc.items || []).map((it) => `${it.h} — ${it.t}`))].join("\n\n");
    add("M2 · B-3 · what the standard refuses", rcText);
  }
  if (M2B?.reflectionPrompt) add("M2 · B · reflection prompt", M2B.reflectionPrompt);

  // Segment C — two recognition briefs + transition to E + break point 1.
  const M2c1 = M2_CONTENT?.segmentC?.c1;
  if (Array.isArray(M2c1?.narration)) add("M2 · C1 · narration", M2c1.narration.join("\n\n"));
  const M2c2 = M2_CONTENT?.segmentC?.c2;
  if (Array.isArray(M2c2?.narration)) add("M2 · C2 · narration (after framework reveal)", M2c2.narration.join("\n\n"));
  const M2cComplete = M2_CONTENT?.segmentC?.complete;
  if (Array.isArray(M2cComplete?.narration)) add("M2 · C · complete · transition to E", M2cComplete.narration.join("\n\n"));
  const M2bp1 = M2_CONTENT?.segmentC?.breakPoint1;
  if (Array.isArray(M2bp1?.avatarScript)) add("M2 · C · break point 1 · pause invitation", M2bp1.avatarScript.join("\n\n"));

  // Segment E — layered scenario lab intro + LS1/LS2 pieces.
  if (Array.isArray(M2_CONTENT?.segmentE?.intro)) {
    add("M2 · E · intro", M2_CONTENT.segmentE.intro.join("\n\n"));
  }

  // LS1 — callback, intro, decision prompt, pressure prompt, per-path 3-horizon
  // consequences (with pressure-modulation clauses), reflection.
  const LS1 = LS1_CONTENT_M2;
  if (LS1) {
    if (Array.isArray(LS1.callback)) add("M2 · LS1 · callback", LS1.callback.join("\n\n"));
    if (Array.isArray(LS1.intro)) add("M2 · LS1 · intro", LS1.intro.join("\n\n"));
    if (LS1.decisionPrompt) add("M2 · LS1 · decision prompt", LS1.decisionPrompt);
    if (LS1.pressure?.prompt) add("M2 · LS1 · pressure prompt", LS1.pressure.prompt);
    const LS1cons = LS1.consequences || {};
    for (const path of Object.keys(LS1cons)) {
      for (const h of ["sameDay", "nextWeek", "monthEnd"]) {
        const base = LS1cons[path]?.[h];
        if (Array.isArray(base)) add(`M2 · LS1 · ${path} · ${h}`, base.join("\n\n"));
        // Modulation clauses — held/folded alternates.
        const heldKey = h + "IfHeld";
        const foldedKey = h + "IfFolded";
        if (Array.isArray(LS1cons[path]?.[heldKey])) add(`M2 · LS1 · ${path} · ${h} · if held`, LS1cons[path][heldKey].join("\n\n"));
        if (Array.isArray(LS1cons[path]?.[foldedKey])) add(`M2 · LS1 · ${path} · ${h} · if folded`, LS1cons[path][foldedKey].join("\n\n"));
      }
    }
    if (LS1.reflection) add("M2 · LS1 · reflection prompt", LS1.reflection);
    if (LS1.mirrorRuleCandidate) add("M2 · LS1 · Mirror Rule candidate", LS1.mirrorRuleCandidate);
  }

  // LS2 — setup, forwarded email variants by LS1 path, decision prompt drift,
  // pressure prompt, per-path 3-horizon consequences, reflection.
  const LS2 = LS2_CONTENT_M2;
  if (LS2) {
    if (Array.isArray(LS2.setup?.scene)) add("M2 · LS2 · setup scene", LS2.setup.scene.join("\n\n"));
    const fe = LS2.setup?.forwardedEmail;
    if (fe?.byLs1Path) {
      for (const p of Object.keys(fe.byLs1Path)) {
        add(`M2 · LS2 · Carla forwarded email (LS1 = ${p})`, fe.byLs1Path[p]);
      }
    }
    if (fe?.fallback) add("M2 · LS2 · Carla forwarded email (fallback)", fe.fallback);
    if (LS2.decisionPrompt) {
      // Prompt drifts based on LS1 path — each variant becomes its own clip.
      for (const p of Object.keys(LS2.decisionPrompt)) {
        add(`M2 · LS2 · decision prompt (LS1 = ${p})`, LS2.decisionPrompt[p]);
      }
    }
    if (LS2.pressure?.prompt) add("M2 · LS2 · pressure prompt", LS2.pressure.prompt);
    if (LS2.pressure?.question?.body) add("M2 · LS2 · Carla's direct question", LS2.pressure.question.body);
    const LS2cons = LS2.consequences || {};
    for (const path of Object.keys(LS2cons)) {
      for (const h of ["sameDay", "nextWeek", "monthEnd"]) {
        const base = LS2cons[path]?.[h];
        if (Array.isArray(base)) add(`M2 · LS2 · ${path} · ${h}`, base.join("\n\n"));
        const heldKey = h + "IfHeld";
        const foldedKey = h + "IfFolded";
        if (Array.isArray(LS2cons[path]?.[heldKey])) add(`M2 · LS2 · ${path} · ${h} · if held`, LS2cons[path][heldKey].join("\n\n"));
        if (Array.isArray(LS2cons[path]?.[foldedKey])) add(`M2 · LS2 · ${path} · ${h} · if folded`, LS2cons[path][foldedKey].join("\n\n"));
      }
    }
    if (LS2.reflection) add("M2 · LS2 · reflection prompt", LS2.reflection);
    if (LS2.mirrorRuleCandidate) add("M2 · LS2 · Mirror Rule candidate", LS2.mirrorRuleCandidate);
  }

  // Segment F — micro-drill intros + reflection beat + close cards + transition.
  const M2F = M2_CONTENT?.segmentF;
  if (M2F?.f1?.audioIntro) add("M2 · F1 · intro", M2F.f1.audioIntro);
  if (M2F?.f2?.audioIntro) add("M2 · F2 · intro", M2F.f2.audioIntro);
  if (M2F?.f2?.reflectionBeat) add("M2 · F · reflection beat", M2F.f2.reflectionBeat);
  if (Array.isArray(M2F?.complete?.narration)) add("M2 · F · complete · transition to G", M2F.complete.narration.join("\n\n"));

  // Segment G — break point 4 + recognition + framework return + awe moment
  // + retention check setup + bookend question + final prompt.
  const M2G = M2_CONTENT?.segmentG;
  if (Array.isArray(M2G?.breakPoint4?.avatarScript)) add("M2 · G · break point 4 · pause invitation", M2G.breakPoint4.avatarScript.join("\n\n"));
  if (Array.isArray(M2G?.recognition)) add("M2 · G · recognition", M2G.recognition.join("\n\n"));
  const M2fr = M2G?.frameworkReturn;
  if (M2fr) {
    const txt = [M2fr.lead, M2fr.body, ...(M2fr.steps || []), M2fr.tagline, M2fr.carryForward].filter(Boolean).join("\n\n");
    add("M2 · G · framework return", txt);
  }
  if (Array.isArray(M2G?.aweMoment?.lines)) add("M2 · G · awe moment", M2G.aweMoment.lines.join("\n"));
  if (Array.isArray(M2G?.delayedRetentionCheck?.narration)) {
    add("M2 · G · delayed retention check setup", M2G.delayedRetentionCheck.narration.join("\n\n"));
  }
  // Retention scene — content-only per script but pre-rendered for parity
  // with sister modules once the retention delivery channel comes online.
  const M2ret = M2G?.delayedRetentionCheck?.scene;
  if (M2ret) {
    if (M2ret.message?.body) add("M2 · G · retention scene · Priya message", M2ret.message.body);
    if (M2ret.prompt) add("M2 · G · retention scene · prompt", M2ret.prompt);
    for (const p of Object.keys(M2ret.sameDay || {})) {
      const arr = M2ret.sameDay[p];
      if (Array.isArray(arr)) add(`M2 · G · retention scene · ${p} · same-day`, arr.join("\n\n"));
    }
  }
  if (M2G?.bookendQuestion) add("M2 · G · bookend question", M2G.bookendQuestion);
  if (M2G?.finalPrompt) add("M2 · G · final prompt", M2G.finalPrompt);
  // --- END M2 NARRATIONS ---

  /* ============================================================================
     --- M3 NARRATIONS ---
     M3 — AI Override & Escalation (AIWorkLab · Pressure Point 3).
     Mirrors every AVPlaceholder / audioText site in BridgeFastM3Module.jsx.
     Six segments: A, B, C, E (LS1 + LS2), F, G — no Segment D per AIWorkLab
     Section 1.1. Defensive optional chaining everywhere so a partial content
     edit during a review pass never crashes the run.
     ========================================================================== */
  const M3_LS = [LS1_CONTENT_M3, LS2_CONTENT_M3];

  // Segment A — D2 callback (fallback) + cold-open Recognition Moment seed +
  // cold-open decision prompt + central question.
  const M3A = M3_CONTENT?.segmentA;
  if (M3A?.a0?.d2Callback?.fallback) add("M3 · A · D2 callback fallback (Beat 1)", M3A.a0.d2Callback.fallback);
  if (Array.isArray(M3A?.coldOpen?.narration)) {
    add("M3 · A · cold open Recognition Moment seed (Beat 2)", M3A.coldOpen.narration.join("\n\n"));
  }
  add("M3 · A · cold-open decision prompt", "The room is silent. The timer reads 7:46. The mute icon glows gold. What is your first instinct?");
  if (M3A?.coldOpen?.centralQuestion) add("M3 · A · central question", M3A.coldOpen.centralQuestion);

  // Segment B — three screens.
  const M3B = M3_CONTENT?.segmentB;
  if (Array.isArray(M3B?.b1?.narration)) add("M3 · B-1 · what you just lived through", M3B.b1.narration.join("\n\n"));
  if (M3B?.b2?.title && Array.isArray(M3B?.b2?.items) && M3B?.b2?.close) {
    add("M3 · B-2 · the override standard", [M3B.b2.title, ...M3B.b2.items, M3B.b2.close].join("\n\n"));
  }
  if (M3B?.b3?.title && Array.isArray(M3B?.b3?.items)) {
    add("M3 · B-3 · what this standard refuses", [M3B.b3.title, ...M3B.b3.items].join("\n\n"));
  }

  // Segment C — two Recognition Briefs + framework reveal.
  const M3C = M3_CONTENT?.segmentC;
  if (Array.isArray(M3C?.c1?.narration)) add("M3 · C1 · Confidence is not correctness", M3C.c1.narration.join("\n\n"));
  if (Array.isArray(M3C?.c2?.narration)) add("M3 · C2 · The Window Rule", M3C.c2.narration.join("\n\n"));
  if (Array.isArray(M3C?.complete?.narration)) add("M3 · C · complete · transition to E", M3C.complete.narration.join("\n\n"));

  // Segment E — LS intro + per-LS Inspect prompt + Decide/Pressure prompts +
  // per-path × per-pressure × per-horizon consequence narrations.
  const M3EI = M3_CONTENT?.segmentE?.intro;
  if (Array.isArray(M3EI?.lines)) add("M3 · E · scenario lab intro", M3EI.lines.join("\n\n"));

  M3_LS.forEach((ls, i) => {
    if (!ls) return;
    const n = i + 1;
    // Inspect Beat — observational prompt is the spoken cue.
    if (ls.inspect?.observationalPrompt) add(`M3 · LS${n} · Inspect prompt`, ls.inspect.observationalPrompt);
    // LS2 cold setup — Rita's Slack + Sarah's Slack (three drift variants).
    if (i === 1 && ls.coldSetup) {
      if (ls.coldSetup.ritaSlack?.text && ls.coldSetup.sarahSlackByLS1) {
        for (const k of Object.keys(ls.coldSetup.sarahSlackByLS1)) {
          const sarah = ls.coldSetup.sarahSlackByLS1[k];
          if (sarah?.text) {
            add(`M3 · LS${n} · cold setup (LS1 path ${k})`, `${ls.coldSetup.ritaSlack.text}\n\n${sarah.text}`);
          }
        }
      }
    }
    // Decide Beat — LS2 has three drift variants; LS1 has a single prompt.
    if (i === 0 && ls.decide?.prompt) add(`M3 · LS${n} · Decide prompt`, ls.decide.prompt);
    if (i === 1 && ls.decide?.promptByLS1) {
      for (const k of Object.keys(ls.decide.promptByLS1)) {
        const p = ls.decide.promptByLS1[k];
        if (p) add(`M3 · LS${n} · Decide prompt (LS1 path ${k})`, p);
      }
    }
    // Pressure Beat — one trigger per Decide path + a shared prompt.
    if (ls.pressure?.triggerByDecide) {
      for (const k of Object.keys(ls.pressure.triggerByDecide)) {
        const trigger = ls.pressure.triggerByDecide[k];
        if (trigger) add(`M3 · LS${n} · Pressure trigger (Decide ${k})`, `${trigger}\n\n${ls.pressure.prompt || ""}`);
      }
    }
    // Consequence horizons — 3 Decide paths × 3 Pressure paths × 3 horizons.
    const cons = ls.consequences || {};
    for (const d of Object.keys(cons)) {
      for (const horizon of HORIZONS) {
        const perP = cons[d]?.[horizon] || {};
        for (const p of Object.keys(perP)) {
          const arr = perP[p];
          if (Array.isArray(arr)) add(`M3 · LS${n} · ${d}·${p} · ${horizon}`, arr.join("\n\n"));
        }
      }
    }
    // Interpretive line + manager line + reflection prompt.
    for (const d of Object.keys(cons)) {
      if (cons[d]?.interp) add(`M3 · LS${n} · ${d} · interp`, cons[d].interp);
      if (cons[d]?.manager) add(`M3 · LS${n} · ${d} · manager`, cons[d].manager);
    }
    if (ls.reflection) add(`M3 · LS${n} · reflection prompt`, ls.reflection);
  });

  // Segment F — two micro-drills + reflection beat + close transition.
  const M3F = M3_CONTENT?.segmentF;
  if (M3F?.f1?.audioIntro) add("M3 · F1 · intro", M3F.f1.audioIntro);
  if (M3F?.f2?.audioIntro) add("M3 · F2 · intro", M3F.f2.audioIntro);
  if (M3F?.reflectionBeat?.line) add("M3 · F · reflection beat", M3F.reflectionBeat.line);
  if (Array.isArray(M3F?.complete?.narration)) add("M3 · F · complete · transition to G", M3F.complete.narration.join("\n\n"));

  // Segment G — awe moment lines, recognition, framework return, retention setup,
  // retention scene + three Same-Day horizons.
  const M3G = M3_CONTENT?.segmentG;
  if (Array.isArray(M3G?.g2?.lines)) add("M3 · G-2 · awe moment", M3G.g2.lines.join(" "));
  if (Array.isArray(M3G?.recognition)) add("M3 · G · recognition", M3G.recognition.join("\n\n"));
  const M3fr = M3G?.frameworkReturn;
  if (M3fr) {
    const txt = [M3fr.lead, M3fr.body, ...(M3fr.steps || []), M3fr.tagline, M3fr.carryForward].filter(Boolean).join("\n\n");
    add("M3 · G · framework return", txt);
  }
  if (M3G?.g3?.title && Array.isArray(M3G?.g3?.lines)) {
    add("M3 · G · retention check setup", [M3G.g3.title, ...M3G.g3.lines].join("\n\n"));
  }
  if (M3G?.bookendQuestion) add("M3 · G · awe close bookend", M3G.bookendQuestion);
  if (M3G?.finalPrompt) add("M3 · G · final personal sentence prompt", M3G.finalPrompt);

  // Retention Check — the scene fragment + prompt + three Same-Day horizons.
  const M3R = M3_CONTENT?.retentionCheck;
  if (M3R?.scene?.slack && M3R?.prompt) {
    add("M3 · Retention · scene", `${M3R.scene.slack}\n\n${M3R.prompt}`);
  }
  if (M3R?.sameDay) {
    for (const k of Object.keys(M3R.sameDay)) {
      const v = M3R.sameDay[k];
      if (v) add(`M3 · Retention · Same Day (${k})`, v);
    }
  }
  // --- END M3 NARRATIONS ---

  /* ============================================================================
     --- M4 NARRATIONS ---
     M4 — AI Grey Zone (AIWorkLab Pressure Point 4). Six segments (A, B, C,
     E, F, G — Segment D omitted per AIWorkLab standard). Two layered
     scenarios (LS1, LS2) with intra-module residue. Inspect Beat +
     Pressure Beat MOAT-CRITICAL. Defensive optional chaining (?.) on every
     block so a partial content edit during a review pass never crashes the
     run. Kept self-contained so the sister-agent merge against M1/M2/M3/M5
     is clean.
     ========================================================================== */
  const M4_LS = [LS1_CONTENT_M4, LS2_CONTENT_M4];

  // Segment A — D1 callback fallback (Beat 1) + Wednesday cold-open (Beat 2)
  // + decision prompt + per-path same-day micro-consequence + central question.
  const M4A = M4_CONTENT?.segmentA;
  if (M4A?.coldOpen?.d1Callback?.fallback) add("M4 · A · D1 callback fallback (Beat 1)", M4A.coldOpen.d1Callback.fallback);
  if (Array.isArray(M4A?.coldOpen?.narration)) add("M4 · A · cold open (Beat 2 · Wednesday 3:48 PM)", M4A.coldOpen.narration.join("\n\n"));
  if (M4A?.coldOpen?.decisionPrompt) add("M4 · A · cold-open decision prompt", M4A.coldOpen.decisionPrompt);
  for (const k of Object.keys(M4A?.coldOpen?.sameDay || {})) {
    const v = M4A.coldOpen.sameDay[k];
    if (Array.isArray(v)) add(`M4 · A · cold-open consequence ${k}`, v.join("\n\n"));
  }
  if (M4A?.safetyFloor?.card) add("M4 · A · safety floor", M4A.safetyFloor.card.join("\n\n"));
  if (M4_CONTENT?.dimension?.central_question) add("M4 · A · central question", M4_CONTENT.dimension.central_question);

  // Segment B — standard intro (verbatim script) + reflection prompt.
  const M4B = M4_CONTENT?.segmentB;
  if (Array.isArray(M4B?.intro)) add("M4 · B · standard intro", M4B.intro.join("\n\n"));
  if (M4B?.reflectionPrompt) add("M4 · B · reflection prompt", M4B.reflectionPrompt);

  // Segment C — Recognition Brief 1 + Daylight Rule reveal (Brief 2) +
  // central-question return + transition + scope notice + break point 1.
  const M4c1 = M4_CONTENT?.segmentC?.c1;
  if (Array.isArray(M4c1?.narration)) add("M4 · C1 · narration (pre-tagline)", M4c1.narration.join("\n\n"));
  if (M4c1?.close) add("M4 · C1 · narration (post-tagline)", M4c1.close);
  const M4c2 = M4_CONTENT?.segmentC?.c2;
  if (Array.isArray(M4c2?.narration)) add("M4 · C2 · Daylight Rule reveal", M4c2.narration.join("\n\n"));
  const M4cq = M4c2?.centralQuestionReturn;
  if (M4cq) add("M4 · C2 · part 3 · central question returns", [M4cq.opener, M4cq.echo, M4cq.closing].filter(Boolean).join("\n\n"));
  const M4cComplete = M4_CONTENT?.segmentC?.complete;
  if (Array.isArray(M4cComplete?.narration)) add("M4 · C · complete · transition to E", M4cComplete.narration.join("\n\n"));
  if (M4cComplete?.scopeBoundaries?.paragraphs) add("M4 · C · complete · scope notice", M4cComplete.scopeBoundaries.paragraphs.join("\n\n"));
  const M4bp1 = M4_CONTENT?.segmentC?.breakPoint1;
  if (Array.isArray(M4bp1?.avatarScript)) add("M4 · C · break point 1 · pause invitation", M4bp1.avatarScript.join("\n\n"));

  // Segment F — micro-drill intros + closing reflection + transition.
  if (M4_CONTENT?.segmentF?.f1?.audioIntro) add("M4 · F1 · intro (Is there a rule, or is there a gap?)", M4_CONTENT.segmentF.f1.audioIntro);
  if (M4_CONTENT?.segmentF?.f2?.audioIntro) add("M4 · F2 · intro (Daylight or silence?)", M4_CONTENT.segmentF.f2.audioIntro);
  if (M4_CONTENT?.segmentF?.closingReflection?.prompt) add("M4 · F · closing reflection prompt", M4_CONTENT.segmentF.closingReflection.prompt);
  if (Array.isArray(M4_CONTENT?.segmentF?.complete?.narration)) add("M4 · F · complete · transition to G", M4_CONTENT.segmentF.complete.narration.join("\n\n"));

  // Segment G — break 4 + recognition + framework return + retention setup.
  const M4G = M4_CONTENT?.segmentG;
  if (Array.isArray(M4G?.breakPoint4?.avatarScript)) add("M4 · G · break point 4 · pause invitation", M4G.breakPoint4.avatarScript.join("\n\n"));
  if (Array.isArray(M4G?.recognition)) add("M4 · G · recognition", M4G.recognition.join("\n\n"));
  const M4fr = M4G?.frameworkReturn;
  if (M4fr) {
    const txt = [M4fr.lead, M4fr.body, ...(M4fr.steps || []), M4fr.tagline, M4fr.carryForward].filter(Boolean).join("\n\n");
    add("M4 · G · framework return (The Daylight Rule)", txt);
  }
  if (Array.isArray(M4G?.delayedRetentionCheck?.narration)) add("M4 · G · delayed retention check setup", M4G.delayedRetentionCheck.narration.join("\n\n"));
  // Retention scene (Lior DM + 3 same-day horizons).
  const M4ret = M4G?.delayedRetentionCheck?.retentionScene;
  if (M4ret?.body) add("M4 · G · retention scene (Lior DM)", M4ret.body);
  if (M4ret?.prompt) add("M4 · G · retention prompt", M4ret.prompt);
  for (const k of Object.keys(M4ret?.sameDay || {})) {
    const v = M4ret.sameDay[k];
    if (Array.isArray(v)) add(`M4 · G · retention same-day ${k}`, v.join("\n\n"));
  }
  if (M4ret?.completion) add("M4 · G · retention completion", M4ret.completion);
  // Awe couplet (bell suppressed per script, but the couplet still needs a
  // narration key for the manifest — voiceover pass may or may not use it).
  const couplet = M4G?.aweMoment?.coupletLines;
  if (Array.isArray(couplet)) add("M4 · G · awe couplet (silence beat — voiceover optional)", couplet.join("\n"));
  if (M4G?.bookendQuestion) add("M4 · G · bookend central question", M4G.bookendQuestion);
  if (M4G?.finalPrompt) add("M4 · G · final personal sentence prompt", M4G.finalPrompt);

  // Segment E — LAYERED SCENARIOS (LS1, LS2).
  M4_LS.forEach((ls, i) => {
    if (!ls) return;
    const n = i + 1;
    if (Array.isArray(ls.callback)) add(`M4 · LS${n} · callback`, ls.callback.join("\n\n"));
    if (Array.isArray(ls.intro)) add(`M4 · LS${n} · intro`, ls.intro.join("\n\n"));
    if (ls.briefing) add(`M4 · LS${n} · briefing`, ls.briefing);
    if (ls.reflection) add(`M4 · LS${n} · reflection prompt`, ls.reflection);
    // Inspect Surface — instruction + closing observation. (Artifact card
    // lines are not narrated; participants read them.)
    if (ls.inspect?.instruction) add(`M4 · LS${n} · inspect instruction`, ls.inspect.instruction);
    if (ls.inspect?.closingObservation) add(`M4 · LS${n} · inspect closing observation`, ls.inspect.closingObservation);
    // Decide prompt(s) — LS1 fixed, LS2 drifts by LS1 path.
    if (ls.decide?.prompt) add(`M4 · LS${n} · decide prompt`, ls.decide.prompt);
    if (ls.decide?.promptByLs1) {
      for (const k of Object.keys(ls.decide.promptByLs1)) {
        add(`M4 · LS${n} · decide prompt (drift · LS1=${k})`, ls.decide.promptByLs1[k]);
      }
    }
    // Pressure trigger (per-path for LS1, single-array for LS2).
    if (Array.isArray(ls.pressure?.trigger)) {
      add(`M4 · LS${n} · pressure trigger`, ls.pressure.trigger.join("\n\n"));
    } else if (ls.pressure?.trigger && typeof ls.pressure.trigger === "object") {
      for (const k of Object.keys(ls.pressure.trigger)) {
        const v = ls.pressure.trigger[k];
        if (Array.isArray(v)) add(`M4 · LS${n} · pressure trigger (Decide=${k})`, v.join("\n\n"));
      }
    }
    if (ls.pressure?.prompt) add(`M4 · LS${n} · pressure prompt`, ls.pressure.prompt);
    // Consequences — three-horizon per Decide path + pressure-path modulations.
    const cons = ls.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`M4 · LS${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
      const mods = cons[path]?.pressureMods || {};
      for (const pk of Object.keys(mods)) {
        for (const h of HORIZONS) {
          const arr = mods[pk]?.[h];
          if (Array.isArray(arr) && arr.length) add(`M4 · LS${n} · ${path} · pressure=${pk} · ${h}`, arr.join("\n\n"));
        }
      }
      if (cons[path]?.mirrorRule?.line) add(`M4 · LS${n} · ${path} · mirror rule (combo ${cons[path].mirrorRule.combo})`, cons[path].mirrorRule.line);
      if (cons[path]?.manager) add(`M4 · LS${n} · ${path} · manager lens`, cons[path].manager);
    }
    // Intra-module residue lines (LS2 only).
    if (ls.intraModuleResidue) {
      for (const k of Object.keys(ls.intraModuleResidue)) {
        add(`M4 · LS${n} · intra-module residue (LS1=${k})`, ls.intraModuleResidue[k]);
      }
    }
  });
  // --- END M4 NARRATIONS ---

  /* ============================================================================
     --- M5 NARRATIONS ---
     M5 — AI Breakdown & Recovery (AIWorkLab · Pressure Point 5).
     45-min AIWorkLab shape: NO Segment D. Two layered scenarios (LS1, LS2)
     with Inspect → Decide → Pressure → 3-horizon consequence, plus within-
     module memory drift by LS1 path. Mirrors every `<AVPlaceholder text={...}>`
     call site and every `audioText` prop in BridgeFastM5Module.jsx. Defensive
     optional chaining throughout so a partial rebuild never crashes the
     generator run.
     ========================================================================== */
  const M5_LAYERED = [LS1_CONTENT_M5, LS2_CONTENT_M5];

  // Segment A — D1 cross-lab callback fallback + discovery cinematic notes +
  // central question + safety floor is not spoken (visual card only).
  const M5C0 = M5_CONTENT?.segmentA?.coldOpen;
  if (M5C0?.d1Callback?.fallback) add("M5 · A · D1 callback fallback (Beat 1)", M5C0.d1Callback.fallback);
  if (Array.isArray(M5C0?.cinematicNotes)) add("M5 · A-1 · cinematic recognition (observational)", M5C0.cinematicNotes.join("\n\n"));
  if (M5C0?.centralQuestionLead) add("M5 · A-2 · central question", M5C0.centralQuestionLead);
  if (M5_CONTENT?.dimension?.central_question) add("M5 · A · central question (dimension slot)", M5_CONTENT.dimension.central_question);

  // Segment B — three narrations (just-lived, standard, refuses).
  const M5B = M5_CONTENT?.segmentB;
  if (M5B?.justLived?.narration) add("M5 · B-1 · what you just lived through", M5B.justLived.narration.join("\n\n"));
  if (M5B?.standardCard) {
    const s = M5B.standardCard;
    add("M5 · B-2 · recovery standard narration", [s.title, ...(s.items || []), s.close].filter(Boolean).join("\n\n"));
  }
  if (M5B?.refuses) {
    const r = M5B.refuses;
    add("M5 · B-3 · what the standard refuses", [r.title, ...(r.items || []).map((it) => `${it.h} ${it.t}`)].join("\n\n"));
  }

  // Segment C — two recognition briefs + central question return + transition.
  const M5c1 = M5_CONTENT?.segmentC?.c1;
  if (Array.isArray(M5c1?.narration)) add("M5 · C1 · the breakdown will get named", M5c1.narration.join("\n\n"));
  if (M5c1?.cardLine) add("M5 · C1 · card line", M5c1.cardLine);
  const M5c2 = M5_CONTENT?.segmentC?.c2;
  if (Array.isArray(M5c2?.narration)) add("M5 · C2 · The Three Sentences framework reveal", M5c2.narration.join("\n\n"));
  const M5cq = M5c2?.centralQuestionReturn;
  if (M5cq) add("M5 · C2 · central question returns", [M5cq.opener, M5cq.echo, M5cq.closing].filter(Boolean).join("\n\n"));
  const M5cComplete = M5_CONTENT?.segmentC?.complete;
  if (Array.isArray(M5cComplete?.narration)) add("M5 · C · complete · transition to Scenario Lab", M5cComplete.narration.join("\n\n"));
  const M5bp1 = M5_CONTENT?.segmentC?.breakPoint1;
  if (Array.isArray(M5bp1?.avatarScript)) add("M5 · C · break point 1 · pause invitation", M5bp1.avatarScript.join("\n\n"));

  // Segment E — layered scenarios.
  M5_LAYERED.forEach((sc, i) => {
    if (!sc) return;
    const n = i + 1;
    if (i === 0 && Array.isArray(sc.callback)) add(`M5 · LS${n} · callback`, sc.callback.join("\n\n"));
    if (Array.isArray(sc.intro)) add(`M5 · LS${n} · intro`, sc.intro.join("\n\n"));
    // Decide prompt (LS2 has drift by LS1 path — cover the base prompt plus
    // each variant so no branch runs dry at click time).
    if (sc.decisionPrompt) add(`M5 · LS${n} · Decide beat prompt`, sc.decisionPrompt);
    if (sc.decidePromptByLs1Path) {
      for (const k of Object.keys(sc.decidePromptByLs1Path)) {
        add(`M5 · LS${n} · Decide prompt drift (${k})`, sc.decidePromptByLs1Path[k]);
      }
    }
    // Pressure beat prompt.
    if (sc.pressure?.prompt) add(`M5 · LS${n} · Pressure beat prompt`, sc.pressure.prompt);
    if (sc.reflection) add(`M5 · LS${n} · reflection prompt`, sc.reflection);
    // Consequence horizons — per path per horizon.
    const cons = sc.consequences || {};
    for (const path of Object.keys(cons)) {
      for (const h of HORIZONS) {
        const arr = cons[path]?.[h];
        if (Array.isArray(arr)) add(`M5 · LS${n} · ${path} · ${h}`, arr.join("\n\n"));
      }
    }
    // LS2 within-module memory threading cards.
    if (i === 1 && sc.threading) {
      for (const k of Object.keys(sc.threading)) {
        const lines = sc.threading[k];
        if (Array.isArray(lines)) add(`M5 · LS${n} · threading (${k})`, lines.join("\n\n"));
      }
    }
  });

  // Segment F — two micro-drill intros.
  if (M5_CONTENT?.segmentF?.f1?.audioIntro) add("M5 · F1 (Find the subject) · intro", M5_CONTENT.segmentF.f1.audioIntro);
  if (M5_CONTENT?.segmentF?.f2?.audioIntro) add("M5 · F2 (Rewrite the subject) · intro", M5_CONTENT.segmentF.f2.audioIntro);
  if (M5_CONTENT?.segmentF?.f1?.closeCard) add("M5 · F1 · close card", M5_CONTENT.segmentF.f1.closeCard);
  if (M5_CONTENT?.segmentF?.f2?.closeCard) add("M5 · F2 · close card", M5_CONTENT.segmentF.f2.closeCard);
  if (M5_CONTENT?.segmentF?.reflection) add("M5 · F · reflection line", M5_CONTENT.segmentF.reflection);
  if (Array.isArray(M5_CONTENT?.segmentF?.complete?.narration)) add("M5 · F · complete · transition to G", M5_CONTENT.segmentF.complete.narration.join("\n\n"));

  // Segment G — recognition + framework return + retention + awe close.
  const M5G = M5_CONTENT?.segmentG;
  if (Array.isArray(M5G?.breakPoint4?.avatarScript)) add("M5 · G · break point 4 · pause invitation", M5G.breakPoint4.avatarScript.join("\n\n"));
  if (Array.isArray(M5G?.recognition)) add("M5 · G-1 · recognition", M5G.recognition.join("\n\n"));
  const M5fr = M5G?.frameworkReturn;
  if (M5fr) {
    const txt = [M5fr.lead, M5fr.body, ...(M5fr.steps || []), M5fr.tagline, M5fr.carryForward].filter(Boolean).join("\n\n");
    add("M5 · G-1.5 · framework return", txt);
  }
  if (Array.isArray(M5G?.retentionCheck?.narration)) add("M5 · G-3 · retention check setup", M5G.retentionCheck.narration.join("\n\n"));
  if (M5G?.bookendQuestion) add("M5 · G-4 · bookend central question", M5G.bookendQuestion);
  if (M5G?.finalPrompt) add("M5 · G-4 · final prompt", M5G.finalPrompt);
  if (Array.isArray(M5G?.aweLines)) {
    // Three-line awe arc — verbatim, unbroken, no bell.
    add("M5 · G-2 · awe close (three lines)", M5G.aweLines.join("\n\n"));
  }
  // Cold-open callback variants per LS1 Decide path.
  if (M5G?.callback) {
    for (const k of Object.keys(M5G.callback)) {
      add(`M5 · G-1 · cold-open callback (${k})`, M5G.callback[k]);
    }
  }
  // --- END M5 NARRATIONS ---

  return out;
}

function getFfmpeg() {
  if (process.env.FFMPEG && existsSync(process.env.FFMPEG)) return process.env.FFMPEG;
  try {
    return execFileSync("python3", ["-c", "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"])
      .toString().trim();
  } catch {
    return "ffmpeg"; // fall back to PATH
  }
}

function main() {
  if (!existsSync(MODEL)) {
    console.error(`\n✗ Voice model not found: ${MODEL}`);
    console.error("  Download it with:");
    console.error(`    python3 -m piper.download_voices ${VOICE_NAME} --download-dir .piper-voices\n`);
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const ffmpeg = getFfmpeg();
  const items = collectNarrations();

  // De-dupe by key (identical strings share one file)
  const byKey = new Map();
  for (const it of items) {
    const key = narrationKey(it.text);
    if (!byKey.has(key)) byKey.set(key, it);
  }

  console.log(`Voice: ${VOICE_NAME}`);
  console.log(`Clips: ${byKey.size} unique (${items.length} call sites)\n`);

  let made = 0, skipped = 0;
  for (const [key, it] of byKey) {
    const mp3 = join(OUT_DIR, `${key}.mp3`);
    if (existsSync(mp3) && !FORCE) { skipped++; continue; }
    const wav = join(OUT_DIR, `${key}.wav`);
    try {
      execFileSync("piper", ["-m", MODEL, "-f", wav], { input: it.text, stdio: ["pipe", "ignore", "ignore"] });
      execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-i", wav, "-ac", "1", "-b:a", "64k", mp3]);
      rmSync(wav, { force: true });
      made++;
      console.log(`  ✓ ${key}.mp3  ${it.label}`);
    } catch (e) {
      console.error(`  ✗ ${key}  ${it.label}\n    ${e.message}`);
      process.exitCode = 1;
    }
  }

  // Prune orphans: MP3s on disk whose keys are no longer in the content.
  // Keeps copy edits from accumulating dead audio files in the repo.
  const live = new Set(byKey.keys());
  let pruned = 0;
  for (const f of readdirSync(OUT_DIR)) {
    if (!f.endsWith(".mp3")) continue;
    const key = f.slice(0, -4);
    if (!live.has(key)) {
      rmSync(join(OUT_DIR, f), { force: true });
      pruned++;
      console.log(`  − ${f}  (orphan)`);
    }
  }

  const manifest = {
    voice: VOICE_NAME,
    generatedAt: new Date().toISOString(),
    keys: [...byKey.keys()].sort(),
  };
  writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

  console.log(`\nDone — ${made} rendered, ${skipped} reused, ${pruned} pruned. Manifest: ${manifest.keys.length} keys.`);
}

main();
