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
import { narrationKey } from "../src/rehearsal/narrationKey.js";

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

  // Segment F — micro-drill intros
  add("F1 · intro", D1_CONTENT.segmentF.f1.audioIntro);
  add("F2 · intro", D1_CONTENT.segmentF.f2.audioIntro);

  // Segment G — recognition close
  add("G · recognition", D1_CONTENT.segmentG.recognition.join("\n\n"));

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
