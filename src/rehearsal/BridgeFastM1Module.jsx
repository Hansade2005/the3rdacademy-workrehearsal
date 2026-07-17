import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Pause, X, Mic, ChevronRight, ChevronLeft, Volume2, Play, Square, Loader2 } from "lucide-react";
import { M1_CONTENT, LS1_CONTENT_M1, LS2_CONTENT_M1 } from "./m1Content.js";
import { C } from "./theme.js";
import { PiperProvider, usePiper } from "./usePiper.jsx";

/* ---- Session-scoped text persistence.
   When the participant navigates back to a screen where they'd typed a
   response, their previous entry is restored to the input field. Cleared
   on hard reload / module unmount. Keyed by the caller's persistKey. ---- */
const __formStore = new Map();
const __recall = (key, fallback) => (key && __formStore.has(key)) ? __formStore.get(key) : (fallback === undefined ? "" : fallback);
const __persist = (key, value) => { if (key) __formStore.set(key, value); };

// The M1 engine mirrors D3's engine shape but consumes AIWorkLab content.
// The two layered scenarios live in an array so the sc_* screens can index
// into them the same way D3 indexed into its four one-shot scenarios.
const SCENARIOS_M1 = [LS1_CONTENT_M1, LS2_CONTENT_M1];

/* ============================================================================
   ERROR BOUNDARY — keeps the module from blanking to the global cream body
   background if any screen render throws. Without this the React tree
   unmounts on a thrown render and the user sees an unrecoverable empty page.
   With it, they get the same recovery card as the in-module null-body
   fallback, on top of the navy backdrop.
   ========================================================================== */
class ModuleErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("Rehearsal render error:", error, info); }
  reset = () => { this.setState({ error: null }); if (typeof this.props.onReset === "function") this.props.onReset(); };
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ position: "fixed", inset: 0, overflow: "auto", background: C.navyDeep, fontFamily: "'Helvetica Neue', Arial, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: C.amber, marginBottom: 12 }}>NAVIGATION RECOVERY</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.white, lineHeight: 1.4, marginBottom: 14 }}>Looks like we lost the page.</h2>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "rgba(245,239,230,0.75)", lineHeight: 1.65, marginBottom: 22 }}>
            Your session is still here. Reload to land back on the cover and continue from where you remember.
          </p>
          <button onClick={() => window.location.reload()}
            style={{ minHeight: 48, padding: "0 28px", borderRadius: 10, border: "none", background: C.teal, color: C.navyDeep, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
            Reload and continue
          </button>
        </div>
      </div>
    );
  }
}

/* ============================================================================
   THE 3RD ACADEMY · BridgeFast™ Engine — M1 Production Build (AIWorkLab)
   Aligned to AI-Ready Behaviours Production Standard v1.2.
   Cover → A → B → C → E (LS1 + LS2) → F → G   (no Segment D in AIWorkLab)
   ========================================================================== */

/* ---------------------------------- PALETTE ------------------------------- */
// Editorial Noir palette — shared across every BridgeFast module via theme.js.
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const MONO = "'Courier New', monospace";
const FOOTER = "Practice and development only. Not behavioural documentation.";
const COPYRIGHT = "© 2026 The 3rd Academy Inc. All rights reserved. Confidential.";

// AIWorkLab uses 2 layered scenarios (LS1, LS2). SCENARIOS_M1 is defined at
// the top of the file with the imports so both the top-level and the
// component body can reach it. Alias here for readability inside branches.
const SCENARIOS = SCENARIOS_M1;

/* ============================================================================
   AUDIO ENGINE (Tone.js) — interim synthesized brand assets
   ========================================================================== */
function useAudio() {
  // Bell and motif are no-ops in the Voice RSS build. Voice RSS handles all
  // narration; the brand bell + motif are kept as hooks for a future asset pass
  // (Tony to supply owned Tibetan-bowl + four-note motif files).
  return { init: async () => {}, strikeBell: () => {}, playMotif: () => {} };
}

/* ============================================================================
   LIGHTWEIGHT LOCAL ANALYSIS — Lock 2 behavioural-language fingerprint
   Developer-only diagnostics. Never surfaced to participant as a score.
   ========================================================================== */
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
  return { posture, directness, ownership, hedging, deflection, source: "local" };
}

/* ============================================================================
   ENGINE PRIMITIVES (dimension-blind, reusable)
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

function PauseControl({ onPause, onLight = false }) {
  const border = onLight ? "rgba(15,34,51,0.2)" : "rgba(255,255,255,0.18)";
  const bg = onLight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.06)";
  const color = onLight ? C.navyDeep : "rgba(255,255,255,0.7)";
  return (
    <button onClick={onPause} aria-label="Pause rehearsal"
      style={{ position: "fixed", top: 16, right: 16, width: 44, height: 44, borderRadius: 22, border: `1px solid ${border}`, background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 6, backdropFilter: "blur(4px)" }}>
      <Pause size={18} />
    </button>
  );
}

function PauseOverlay({ onResume, onRestart, segmentLabel }) {
  // Block all keyboard nav while paused
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        onResume();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onResume]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="pause-title"
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(14,34,51,0.92)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}>
      <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 32, margin: "0 auto 18px",
          border: `1px solid ${C.tealMid}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(94,234,212,0.08)",
        }}>
          <Pause size={24} color={C.tealMid} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 3, color: C.tealMid, marginBottom: 12 }}>PAUSED</div>
        <h2 id="pause-title" style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: C.white, lineHeight: 1.3, margin: "0 0 14px" }}>
          Take a breath.
        </h2>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 28px" }}>
          Your progress is saved. When you come back, you will land on this exact screen.
        </p>

        <button onClick={onResume}
          style={{
            width: "100%", maxWidth: 320, minHeight: 48, margin: "0 auto",
            borderRadius: 24, border: "none", background: C.teal, color: C.white,
            fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3,
            cursor: "pointer", display: "inline-flex", alignItems: "center",
            justifyContent: "center", gap: 8,
          }}>
          <Play size={15} /> Resume rehearsal
        </button>

        <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {segmentLabel && (
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
              CURRENT · {segmentLabel.toUpperCase()}
            </div>
          )}
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>
            Tip — press <kbd style={{ padding: "1px 6px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.7)" }}>space</kbd>, <kbd style={{ padding: "1px 6px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.7)" }}>enter</kbd> or <kbd style={{ padding: "1px 6px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, fontFamily: MONO, fontSize: 10.5, color: "rgba(255,255,255,0.7)" }}>esc</kbd> to resume.
          </p>
          {onRestart && (
            <button onClick={() => { if (window.confirm("Restart from the beginning? Your current progress in this module will be cleared.")) onRestart(); }}
              style={{ marginTop: 14, background: "transparent", border: "none", padding: 4, color: "rgba(255,255,255,0.4)", fontFamily: SANS, fontSize: 11, letterSpacing: 0.3, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
              Restart from the beginning
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


function BackControl({ onBack, onLight = false }) {
  const border = onLight ? "rgba(15,34,51,0.2)" : "rgba(255,255,255,0.18)";
  const bg = onLight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.06)";
  const color = onLight ? C.navyDeep : "rgba(255,255,255,0.7)";
  return (
    <button onClick={onBack} aria-label="Go back to previous screen"
      style={{ position: "fixed", top: 16, left: 16, height: 44, padding: "0 16px 0 12px", borderRadius: 22, border: `1px solid ${border}`, background: bg, color, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", zIndex: 6, fontFamily: SANS, fontSize: 12.5, letterSpacing: 0.3, backdropFilter: "blur(4px)" }}>
      <ChevronLeft size={16} /> Back
    </button>
  );
}

function Stage({ children, bg = C.navy, narrow = false }) {
  return (
    <div style={{ minHeight: "100%", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "84px 20px 80px", transition: "background 0.8s ease" }}>
      <div style={{ width: "100%", maxWidth: narrow ? 540 : 720 }}>{children}</div>
    </div>
  );
}

function ListenButton({ text, size = "md" }) {
  const piper = usePiper();
  const [playing, setPlaying] = useState(false);
  const tokenRef = useRef(0);

  // Watch piper.error — if speak() failed, drop the playing state so the
  // button doesn't look stuck on "Stop"
  useEffect(() => {
    if (piper.error) setPlaying(false);
  }, [piper.error]);

  // Warm the HTTP cache as soon as the button mounts so click→play is instant
  useEffect(() => { piper.prefetch(text); }, [piper, text]);

  const onClick = async () => {
    if (playing) {
      piper.stop();
      setPlaying(false);
      return;
    }
    if (!piper.enabled) piper.setEnabled(true);
    const t = ++tokenRef.current;
    setPlaying(true);
    // Long narrations get the cinematic settle on the back end; short prompts
    // would feel over-scored, so we leave the outro off for them.
    const outro = String(text || "").length > 400;
    await piper.speak(text, { outro });
    if (t === tokenRef.current && !piper.loading) setPlaying(false);
  };

  const isLoading = piper.loading;
  const Icon = isLoading ? Loader2 : playing ? Square : Play;
  const small = size === "sm";
  const labelText = isLoading ? "Loading…" : playing ? "Stop" : "Play";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <button onClick={onClick} aria-label={playing ? "Stop narration" : "Play narration"}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: small ? "4px 10px" : "6px 12px",
          borderRadius: 16,
          border: `1px solid ${playing ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)"}`,
          background: playing ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
          color: playing ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
          fontFamily: SANS, fontSize: small ? 11 : 12,
          letterSpacing: 0.3,
          cursor: "pointer",
        }}>
        <Icon size={small ? 11 : 13} className={isLoading ? "bf-spin" : ""} />
        {labelText}
      </button>
      <span style={{ fontFamily: SANS, fontSize: small ? 10 : 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: 0.4, textTransform: "uppercase" }}>Optional</span>
      {piper.error && (
        <span title={piper.error} style={{
          fontFamily: SANS, fontSize: 11, color: C.redInk,
          background: "rgba(185,28,28,0.12)", border: "1px solid rgba(185,28,28,0.4)",
          borderRadius: 12, padding: "3px 9px", maxWidth: 280,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>⚠ {piper.error}</span>
      )}
    </span>
  );
}

function Narration({ lines, color = "rgba(255,255,255,0.92)", speakable = true }) {
  const text = Array.isArray(lines) ? lines.join("\n\n") : String(lines || "");
  return (
    <div style={{ fontFamily: SERIF }}>
      {speakable && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <ListenButton text={text} size="sm" />
        </div>
      )}
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

/* ---- Sector assignment notice / picker.
   Reads module.sector_variants[]. With a single variant (MVP today) it renders
   a quiet "locked to X" notification. With multiple variants (post-MVP) it
   will render a picker — leaving the data wiring in place so the swap-in is
   small when those chains are scripted. ---- */
function SectorAssignment({ module }) {
  const variants = module?.sector_variants || [];
  const sa = module?.sectorAssignment;
  if (!variants.length || !sa) return null;

  if (variants.length === 1) {
    return (
      <div style={{ margin: "22px 0 4px", padding: "16px 18px", borderRadius: 10, border: `1px dashed ${C.tealMid}`, background: "rgba(94,234,212,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>
          ✋ {sa.titleMVP}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
          {sa.mvpNotice}
        </p>
      </div>
    );
  }

  // Post-MVP picker placeholder — wire selection through to module state once
  // Healthcare/Construction consequence chains are scripted to parity.
  return (
    <div style={{ margin: "22px 0 4px", padding: "16px 18px", borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "rgba(94,234,212,0.06)" }}>
      <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>
        {sa.titlePicker}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        {variants.map((v) => (
          <span key={v} style={{ padding: "6px 12px", borderRadius: 16, border: "1px solid rgba(94,234,212,0.4)", background: "rgba(94,234,212,0.06)", color: C.tealMid, fontFamily: SANS, fontSize: 12.5 }}>{v}</span>
        ))}
      </div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.55, margin: 0 }}>{sa.pickerHint}</p>
    </div>
  );
}

/* ---- Behavioural signature panel.
   Aggregates the participant's four-scenario disclosure pattern into one of
   three signatures per the Standard's transparency_posture model:
     • reliable    — every scenario was Path A
     • unreliable  — Path D dominates (≥ half, or any D with non-A majority)
     • mixed       — anything else
   Renders count tiles + an observational signature card. Used at the end of
   Segment E (e_signature) and at the Growth Log (g2). Pass theme="light"
   when the host page paints a cream/paper background. ---- */
function BehaviouralSignaturePanel({ paths = [], theme = "dark" }) {
  const count = { a: 0, b: 0, c: 0, d: 0 };
  paths.forEach((p) => { if (count[p] !== undefined) count[p] += 1; });
  const transparent = count.a;
  const ambiguous = count.b + count.c;
  const avoidant = count.d;

  let key, title, bodyText;
  if (paths.length === 0) {
    key = "mixed";
    title = "Pattern not yet established";
    bodyText = "Four scenarios are needed to read a signature. Yours has not yet been recorded.";
  } else if (transparent === paths.length) {
    key = "reliable";
    title = "Reliable — consistently transparent";
    bodyText = "Across all four scenarios, you chose the disclosing path. That is a pattern. Colleagues, managers, and clients begin to read your decisions through that pattern, not just one at a time. Reliability earned in moments like these is the foundation the rest of your professional reputation rests on — and the rarest of the four signatures.";
  } else if (avoidant >= Math.ceil(paths.length / 2) || (avoidant > 0 && ambiguous + avoidant > transparent)) {
    key = "unreliable";
    title = "Unreliable — the silence has weight";
    bodyText = "The pattern across your four scenarios leans toward silence or softening. None of these decisions, on their own, would necessarily change how you are seen. Together, they begin to. The cost of silence is invisible at the moment, delayed, and compounds. The next decision a manager or client makes about you carries the trail of these four.";
  } else {
    key = "mixed";
    title = "Mixed — transparent in some moments, shaded in others";
    bodyText = "Your pattern is not uniform. Some decisions named the uncomfortable thing early; others let the easier reading stand. A mixed pattern is the most common signature and the most informative one — it is the place where the next deliberate decision changes the trajectory more than any other.";
  }

  const light = theme === "light";
  const accent = key === "unreliable" ? C.amber : C.tealMid;
  const fg = light ? C.ink : "rgba(255,255,255,0.88)";
  const fgMute = light ? C.inkSoft : "rgba(255,255,255,0.55)";
  const tileBg = light ? "rgba(15,34,51,0.04)" : "rgba(255,255,255,0.04)";
  const tileBorder = light ? "rgba(15,34,51,0.1)" : "rgba(255,255,255,0.08)";
  const cardBg = key === "reliable" ? (light ? "rgba(13,148,136,0.1)" : "rgba(13,148,136,0.1)") : key === "unreliable" ? "rgba(245,158,11,0.12)" : (light ? "rgba(15,34,51,0.03)" : "rgba(255,255,255,0.04)");
  const cardBorder = key === "reliable" ? C.tealMid : key === "unreliable" ? C.amber : (light ? "rgba(15,34,51,0.12)" : "rgba(255,255,255,0.12)");

  return (
    <div>
      <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: light ? C.navy : C.white, lineHeight: 1.3, marginBottom: 8, textAlign: "center" }}>{title}</h2>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: fgMute, lineHeight: 1.55, textAlign: "center", marginBottom: 20 }}>What four decisions, taken together, may signal.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Transparent disclosures", value: transparent, color: C.tealMid },
          { label: "Middle-ground decisions", value: ambiguous, color: light ? C.inkSoft : "#94A3B8" },
          { label: "Silent / softening", value: avoidant, color: C.amber },
        ].map((stat, i) => (
          <div key={i} style={{ background: tileBg, border: `1px solid ${tileBorder}`, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 28, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 0.5, color: fgMute, marginTop: 6, lineHeight: 1.4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: accent, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>What this pattern signals</div>
        <p style={{ fontFamily: SERIF, fontSize: 15.5, color: fg, lineHeight: 1.7, margin: 0 }}>{bodyText}</p>
      </div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: fgMute, lineHeight: 1.6, marginTop: 18, textAlign: "center" }}>
        Not a score. Not a verdict. The first reading of a pattern that is still forming.
      </p>
    </div>
  );
}

/* ---- Click-to-reveal wrapper. Hides children behind a button until tapped,
   then fades them in. Lets a static card land as an interactive beat. ---- */
function ClickToReveal({ buttonLabel, children }) {
  const [revealed, setRevealed] = useState(false);
  if (revealed) return <div className="bf-fade">{children}</div>;
  return (
    <button onClick={() => setRevealed(true)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        margin: "18px 0",
        padding: "12px 18px",
        borderRadius: 24,
        border: `1px dashed ${C.tealMid}`,
        background: "rgba(94,234,212,0.06)",
        color: C.tealMid,
        fontFamily: SANS, fontSize: 13, letterSpacing: 0.4,
        cursor: "pointer",
      }}>
      <ChevronRight size={14} /> {buttonLabel}
    </button>
  );
}

/* ---- Narration audio row. Always renders as a live Piper player when text
   is supplied. No "to be inserted" placeholder copy anywhere. */
function AVPlaceholder({ label, text }) {
  if (!text) return null; // no text means there's nothing for Piper to speak
  return (
    <div style={{ margin: "12px 0", padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.tealMid}`, background: "rgba(94,234,212,0.06)", display: "flex", alignItems: "center", gap: 10, fontFamily: SANS, flexWrap: "wrap" }}>
      <Volume2 size={15} color={C.tealMid} />
      <span style={{ fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700 }}>NARRATION</span>
      {label && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{label}</span>}
      <span style={{ marginLeft: "auto" }}><ListenButton text={text} size="sm" /></span>
    </div>
  );
}

/* ---- Voice dictation button — Web Speech API, appends transcript to textarea.
   Hidden when the browser has no SpeechRecognition (Firefox). ---- */
function VoiceDictateButton({ onTranscript }) {
  const [recording, setRecording] = useState(false);
  const [hint, setHint] = useState(null);
  const recRef = useRef(null);

  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  if (!SR) return null;

  const stop = () => { try { recRef.current?.stop(); } catch (e) { /* ignore */ } };

  const toggle = () => {
    if (recording) { stop(); return; }
    let r;
    try { r = new SR(); } catch (e) { setHint("Voice input not available"); return; }
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = false;
    r.onresult = (e) => {
      let chunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) chunk += e.results[i][0].transcript;
      }
      const t = chunk.trim();
      if (t) onTranscript(t);
    };
    r.onerror = (e) => {
      const map = {
        "not-allowed": "Microphone permission denied",
        "service-not-allowed": "Microphone permission denied",
        "no-speech": "Didn’t catch that — try again",
        "audio-capture": "No microphone found",
        "network": "Voice service unreachable",
      };
      setHint(map[e.error] || "Voice input error");
      setRecording(false);
    };
    r.onend = () => setRecording(false);
    try { r.start(); } catch (e) { setHint("Voice input failed to start"); return; }
    recRef.current = r;
    setRecording(true);
    setHint(null);
  };

  return (
    <span style={{ position: "absolute", right: 8, bottom: 8, display: "inline-flex", alignItems: "center", gap: 8 }}>
      {hint && (
        <span style={{ fontFamily: SANS, fontSize: 10.5, color: "rgba(255,255,255,0.55)", background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "2px 8px" }}>{hint}</span>
      )}
      <button type="button" onClick={toggle} aria-label={recording ? "Stop dictation" : "Dictate with voice"} title={recording ? "Stop dictation" : "Dictate with voice"}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px",
          borderRadius: 14,
          border: `1px solid ${recording ? "#fca5a5" : "rgba(94,234,212,0.4)"}`,
          background: recording ? "rgba(220,38,38,0.18)" : "rgba(94,234,212,0.08)",
          color: recording ? "#fca5a5" : C.tealMid,
          fontFamily: SANS, fontSize: 11, letterSpacing: 0.3,
          cursor: "pointer",
        }}>
        <Mic size={12} className={recording ? "bf-pulse" : ""} />
        {recording ? "Recording…" : "Voice"}
      </button>
    </span>
  );
}

/* ---- Multi-line textarea — Enter adds a newline; submit is only via the button.
   The voice dictate button (when supported) appends speech to the existing text. ---- */
function MultilineTextarea({ value, onChange, placeholder, rows = 4, autoFocus = false, error = false, style = {} }) {
  const appendTranscript = (t) => {
    const existing = String(value || "");
    const sep = existing && !/\s$/.test(existing) ? " " : "";
    onChange({ target: { value: existing + sep + t } });
  };
  return (
    <div style={{ position: "relative" }}>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        autoFocus={autoFocus}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "14px 14px 44px",
          borderRadius: 8,
          border: `1px solid ${error ? C.redInk : "rgba(255,255,255,0.18)"}`,
          background: "rgba(0,0,0,0.22)",
          color: C.white,
          fontFamily: SANS,
          fontSize: 15,
          lineHeight: 1.6,
          resize: "vertical",
          transition: "border-color 0.2s",
          ...style,
        }}
      />
      <VoiceDictateButton onTranscript={appendTranscript} />
    </div>
  );
}

/* ---- Two-channel decision (selection + justification) ---- */
function Decision({ prompt, options, justificationPrompt, minChars = 25, onSubmit, audioText, audioLabel, persistKey }) {
  const [sel, setSelRaw] = useState(persistKey ? __recall(persistKey + ":sel", null) : null);
  const setSel = (v) => { setSelRaw(v); __persist(persistKey + ":sel", v); };
  const [text, setTextRaw] = useState(__recall(persistKey ? persistKey + ":text" : null));
  const setText = (v) => { setTextRaw(v); __persist(persistKey ? persistKey + ":text" : null, v); };
  const [tried, setTried] = useState(false);
  const left = minChars - text.trim().length;
  const need = !sel ? "Select one option above to continue." : left > 0 ? `Add your reasoning to continue — ${left} more character${left === 1 ? "" : "s"}.` : "";
  const submit = () => { if (need) { setTried(true); return; } onSubmit(sel, text); };
  return (
    <div>
      {audioText && <AVPlaceholder label={audioLabel} text={audioText} />}
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
      <MultilineTextarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={3} placeholder="Type your reasoning… (Enter inserts a new line)" error={tried && left > 0} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 6, color: "rgba(255,255,255,0.4)", fontFamily: SANS, fontSize: 11 }}>
        <span style={{ color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/{minChars}</span>
      </div>
      {need && (
        <div style={{ marginTop: 10, fontFamily: SANS, fontSize: 12.5, color: tried ? C.tealMid : "rgba(255,255,255,0.45)", textAlign: "center" }}>{need}</div>
      )}
      <PrimaryButton onClick={submit} dim={!!need}>See what happens</PrimaryButton>
    </div>
  );
}

/* ---- Artifact-write + reference calibration ---- */
function ArtifactWrite({ prompt, submitLabel, references, refKind, closing, onDone, minChars = 40, persistKey }) {
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [submitted, setSubmitted] = useState(false);
  const [tried, setTried] = useState(false);
  const left = minChars - text.trim().length;
  if (!submitted) {
    return (
      <div>
        <p style={{ fontFamily: SERIF, fontSize: 18, color: "rgba(255,255,255,0.92)", lineHeight: 1.6, marginBottom: 16 }}>{prompt}</p>
        <MultilineTextarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={5} autoFocus
          placeholder="Write the actual words… (Enter inserts a new line — submit with the button below)" error={tried && left > 0} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>Written language is what we are practising. Enter starts a new paragraph.</p>
          <span style={{ fontFamily: SANS, fontSize: 11, color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/{minChars}</span>
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
        <div style={{ fontFamily: SERIF, fontSize: 15.5, color: C.white, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{text}</div>
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
                <div style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.55, marginBottom: 8, whiteSpace: "pre-wrap" }}>{r.text}</div>
                <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>How this lands: {r.lands}</div>
              </div>
            ))}
          </div>
          {closing && (
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: "rgba(13,148,136,0.08)", border: `1px solid ${C.tealMid}` }}>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>What changes between these versions</div>
              <p style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{closing}</p>
            </div>
          )}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.5)", marginTop: 16, textAlign: "center" }}>
            These are not better or worse than yours. They are calibration points. What you wrote belongs to you.
          </p>
        </>
      )}
      <PrimaryButton onClick={() => onDone(text)}>Continue</PrimaryButton>
    </div>
  );
}

/* ---- Three-horizon consequence reveal — Tibetan bell at each transition ---- */
function ConsequenceReveal({ horizons, onBell, onDone }) {
  const [stage, setStage] = useState(0);
  const labels = ["Same Day", "Next Week", "Month End"];
  const advance = () => {
    if (stage < 2) {
      onBell();
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

/* ---- Trajectory visualisation
   Each path's title comes from the scenario's signalPanel so the legend
   matches what the learner just read. Endpoint letters identify each line
   on the chart itself; the chosen path is highlighted everywhere. ---- */
function Trajectory({ chosen, signalPanel = [] }) {
  const paths = { a: [70, 55, 78, 92], b: [70, 68, 55, 40], c: [70, 58, 64, 58], d: [70, 68, 40, 20] };
  // Right-padding extended so endpoint dots and letters don't clip
  const W = 460, H = 160, padX = 30, padXRight = 50, padY = 18;
  const xs = [0, 1, 2].map((i) => padX + (i * (W - padX - padXRight)) / 2);
  const yFor = (v) => padY + ((100 - v) / 100) * (H - padY * 2 - 18);
  const pointsOf = (arr) => [arr[0], arr[1], arr[3]].map((v, i) => ({ x: xs[i], y: yFor(v) }));
  const labelOf = (k) => signalPanel.find((s) => s.key === k)?.title;
  const keys = Object.keys(paths);

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "18px 12px 14px" }}>
      <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: 4 }}>What stakeholders may have noticed</div>
      <div style={{ fontFamily: SANS, fontSize: 10, color: "rgba(255,255,255,0.35)", textAlign: "center", marginBottom: 10, letterSpacing: 0.4 }}>↑ trust gained · ↓ trust lost</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {/* faint baseline at the starting trust level so rises/drops are readable */}
        <line x1={padX} x2={W - padXRight} y1={yFor(70)} y2={yFor(70)}
              stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" />

        {/* lines (chosen drawn last so it sits on top) */}
        {[...keys.filter((k) => k !== chosen), ...(chosen ? [chosen] : [])].map((k) => {
          const pts = pointsOf(paths[k]);
          const isChosen = k === chosen;
          return (
            <polyline key={k} points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none"
              stroke={isChosen ? C.tealMid : "rgba(255,255,255,0.22)"}
              strokeWidth={isChosen ? 2.8 : 1.2}
              strokeLinecap="round" strokeLinejoin="round"
              className={reduceMotion ? "" : "bf-draw"} />
          );
        })}

        {/* endpoint dot + letter label for each line at Month End */}
        {keys.map((k) => {
          const end = pointsOf(paths[k])[2];
          const isChosen = k === chosen;
          return (
            <g key={`end-${k}`}>
              <circle cx={end.x} cy={end.y} r={isChosen ? 5 : 3}
                fill={isChosen ? C.tealMid : "rgba(255,255,255,0.35)"} />
              <text x={end.x + 10} y={end.y + 4}
                fill={isChosen ? C.tealMid : "rgba(255,255,255,0.55)"}
                fontSize={isChosen ? 13 : 11} fontWeight={isChosen ? 700 : 600}
                fontFamily={SANS}>
                {k.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* x-axis time labels */}
        {xs.map((x, i) => (
          <text key={i} x={x} y={H - 2} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily={SANS} textAnchor="middle">
            {["Same Day", "Next Week", "Month End"][i]}
          </text>
        ))}
      </svg>

      {/* Legend — letter → path title, chosen highlighted as "your path" */}
      {signalPanel.length > 0 && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 10px", fontFamily: SANS, fontSize: 11.5 }}>
          {keys.map((k) => {
            const isChosen = k === chosen;
            const title = labelOf(k) || `Path ${k.toUpperCase()}`;
            return (
              <React.Fragment key={k}>
                <span style={{ color: isChosen ? C.tealMid : "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 0.3 }}>{k.toUpperCase()}</span>
                <span style={{ color: isChosen ? C.white : "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                  {title}{isChosen && <span style={{ color: C.tealMid, fontStyle: "italic", marginLeft: 6 }}>— your path</span>}
                </span>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---- Pattern Ledger (Integrity Pattern Mirror) ---- */
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

function Reflection({ prompt, onDone, minChars = 30, persistKey }) {
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [tried, setTried] = useState(false);
  const left = minChars - text.trim().length;
  return (
    <div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 16 }}>{prompt}</p>
      <MultilineTextarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={4} placeholder="A sentence or two… (Enter inserts a new line)" error={tried && left > 0} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
        <span style={{ fontFamily: SANS, fontSize: 11, color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/{minChars}</span>
      </div>
      {tried && left > 0 && <div style={{ marginTop: 8, fontFamily: SANS, fontSize: 12.5, color: C.tealMid, textAlign: "center" }}>A sentence or two to continue — {left} more character{left === 1 ? "" : "s"}.</div>}
      <PrimaryButton onClick={() => { if (left > 0) { setTried(true); return; } onDone(text); }} dim={left > 0}>Save and continue</PrimaryButton>
    </div>
  );
}

/* ---- T3A logo mark used on the cover ---- */
function T3ALogo({ size = 56 }) {
  // Official T3A logo mark. Sits centred above the wordmark on cover + enter.
  return (
    <img src={(import.meta.env.BASE_URL || "/") + "logo.jpeg"} alt="The 3rd Academy"
      width={size} height={size}
      style={{ display: "block", margin: "0 auto", width: size, height: size, objectFit: "contain", borderRadius: 6 }} />
  );
}

/* ---- Cover page (per FR: T3A logo + copyright) ---- */
function CoverPage({ onContinue }) {
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center", paddingTop: 30 }}>
        <T3ALogo size={72} />
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 4, color: C.tealMid, marginTop: 22 }}>THE 3RD ACADEMY</div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>M1 — AI OUTPUT JUDGMENT · AIWORKLAB</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, color: C.white, lineHeight: 1.25, margin: "28px 0 14px" }}>
          AI Output Judgment
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: 440, margin: "0 auto" }}>
          A behavioural rehearsal. Forty-five minutes. Private practice. No scores. No pass or fail.
        </p>
        <div style={{ marginTop: 32 }}>
          <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
        </div>
        <div style={{ marginTop: 56, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 0.5, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>
            {COPYRIGHT}
          </p>
        </div>
      </div>
    </Stage>
  );
}

/* ---- Enter / start screen ---- */
function EnterScreen({ onBegin }) {
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center" }}>
        <T3ALogo size={48} />
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 3, color: C.tealMid, marginTop: 18, marginBottom: 18 }}>THE 3RD ACADEMY</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: C.white, lineHeight: 1.4, marginBottom: 10 }}>M1 — AI Output Judgment · AIWorkLab</h1>
        <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 26, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}>
          A behavioural rehearsal. Headphones recommended. Tap below to begin — audio will start with the cinematic opening.
        </p>
        <PrimaryButton onClick={onBegin}>Begin the rehearsal</PrimaryButton>
        <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 18 }}>
          {COPYRIGHT}
        </p>
          <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
            style={{ marginTop: 30, padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "rgba(255,255,255,0.8)", fontFamily: SANS, fontSize: 13.5, cursor: "pointer" }}>
            Exit — return home
          </button>

      </div>
    </Stage>
  );
}

/* ---- G-4 Awe Close ---- */
/* ---- G-1.5 Framework Return.
   Per spec: no-input transition. Narration plays; "Notice. Name. Choose. Stand."
   fades in centred ~0.8s after narration begins; the whole block dissolves and
   advances automatically at frameworkReturn.durationSeconds. No continue
   button. The participant is meant to land on this beat, not click through it. */
function FrameworkReturnScreen({ content, onDone }) {
  const piper = usePiper();
  const playedRef = useRef(false);
  const seconds = content.durationSeconds || 35;
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start narration once on mount; chime off so the beat stays quiet
    if (!playedRef.current && content && content.lead) {
      playedRef.current = true;
      const text = [content.lead, content.body, ...content.steps, content.tagline, content.carryForward]
        .filter(Boolean).join("\n\n");
      piper.speak(text, { intro: false, outro: false }).catch(() => {});
    }
    // Begin fade-out ~0.6s before auto-advance
    const tFade = setTimeout(() => setFading(true), Math.max(0, (seconds - 0.6) * 1000));
    const tDone = setTimeout(() => { piper.stop(); onDone(); }, seconds * 1000);
    return () => { clearTimeout(tFade); clearTimeout(tDone); piper.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center", opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>{content.lead}</p>
        <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.78)", marginBottom: 30, lineHeight: 1.6 }}>{content.body}</p>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 16 }}>THE SOURCE-FIRST HABIT</div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px 22px", marginBottom: 26 }}>
          {content.steps.map((s, i) => (
            <span key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: "clamp(22px, 5.5vw, 28px)", color: C.white, animationDelay: `${0.8 + i * 0.5}s`, fontWeight: 500 }}>{s}</span>
          ))}
        </div>
        {content.tagline && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, marginBottom: 22, animationDelay: "3.4s" }}>{content.tagline}</p>
        )}
        {content.carryForward && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto", animationDelay: "4.2s" }}>{content.carryForward}</p>
        )}
        <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginTop: 30 }}>The closing continues in a moment.</p>
      </div>
    </Stage>
  );
}

function AweClose({ content, onMotif, onDone, persistKey }) {
  const [beat, setBeat] = useState(1);
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [saved, setSaved] = useState(false);
  useEffect(() => {
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
                <MultilineTextarea value={text} onChange={(e) => setText(e.target.value)} rows={3} autoFocus
                  placeholder="One sentence to yourself. (Enter inserts a new line.)"
                  style={{ textAlign: "center", fontFamily: SERIF, fontSize: 16 }} />
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

/* ---- Artifact frame ---- */
function Artifact({ title, children, mono }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
      <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{title}</div>
      <div style={{ padding: 12, fontFamily: mono ? MONO : SANS, fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

/* ---- Single-choice card (used in Segment F micro-drills) ---- */
function SingleChoiceCard({ vignette, options, answer, feedback, onContinue }) {
  const [sel, setSel] = useState(null);
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <p style={{ fontFamily: SERIF, fontSize: 18, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: 20 }}>{vignette}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((o) => {
          const active = sel === o;
          const isAnswer = revealed && o === answer;
          const isWrongPick = revealed && active && o !== answer;
          let border = "rgba(255,255,255,0.15)";
          if (isAnswer) border = C.tealMid;
          else if (isWrongPick) border = C.amber;
          else if (active) border = C.teal;
          return (
            <button key={o} onClick={() => !revealed && setSel(o)} disabled={revealed}
              style={{ textAlign: "left", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${border}`, background: active ? "rgba(13,148,136,0.14)" : "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.9)", fontFamily: SANS, fontSize: 14, cursor: revealed ? "default" : "pointer", transition: "border-color 0.2s, background 0.2s" }}>
              {o}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="bf-fade" style={{ marginTop: 18, padding: 14, borderRadius: 10, background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}` }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: C.white, lineHeight: 1.6, margin: 0 }}>{feedback}</p>
        </div>
      )}
      {!revealed ? (
        <PrimaryButton onClick={() => sel && setRevealed(true)} dim={!sel}>Name it</PrimaryButton>
      ) : (
        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
      )}
    </div>
  );
}

/* ---- AI-DRAFT badge (preserved for future Variant Studio) ---- */
function Sparkle() {
  return <span style={{ width: 6, height: 6, borderRadius: 3, background: C.tealMid, display: "inline-block" }} />;
}

/* ============================================================================
   FLOW CONTROLLER
   ========================================================================== */

// AIWorkLab segment set — Segment D is omitted (Section 1.1 of the standard).
const SEGMENT_LABEL = {
  cover: "Cover", a: "Segment A", b: "Segment B", c: "Segment C",
  e: "Segment E", f: "Segment F", g: "Segment G",
  break: "",  // suppressed from participant view
};
function segmentOf(screen) {
  if (screen === "cover" || screen === "enter") return "cover";
  if (screen.startsWith("break_")) return "break";
  if (screen.startsWith("a")) return "a";
  if (screen.startsWith("b")) return "b";
  if (screen.startsWith("c")) return "c";
  // No "d" — AIWorkLab omits Segment D.
  if (screen.startsWith("sc_") || screen === "scenario_chain_intro" || screen === "e_signature") return "e";
  if (screen.startsWith("f")) return "f";
  if (screen.startsWith("g") || screen === "done") return "g";
  return "";
}

const initialState = {
  screen: "enter",
  history: [],                 // stack of previous screens for Back nav
  paused: false,
  coldOpenPath: null,
  scenarioPath: null,
  ledger: [],
  finalSentence: "",
  scenarioIndex: 0,
  threadingPosture: null,
  scenarioPathHistory: [],         // ordered list of paths chosen across past scenarios
  analyses: [],
  // captured open responses (kept locally; would write to Growth Log in prod)
  segmentBReflection: "",
  segmentCResponses: {},
  segmentDPause1: null,
  segmentDPause2Text: "",
  // D3 INNOVATION — retrospective decision pause 3 text capture.
  segmentDRetroText: "",
  segmentFAnswers: { f1: [], f2: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "PAUSE":
      return { ...state, paused: true };
    case "RESUME":
      return { ...state, paused: false };
    case "GOTO":
      return { ...state, screen: action.screen, history: [...state.history, state.screen] };
    case "BACK": {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return { ...state, screen: prev, history: state.history.slice(0, -1) };
    }
    case "RESET":
      // Wipe progress and start from the cover (audio is already initialized,
      // so we skip the entry screen). Used by the recovery card and the
      // "Restart" affordance in the pause overlay.
      return { ...initialState, screen: "cover" };
    case "COLD_OPEN":
      return { ...state, coldOpenPath: action.path, screen: "a2", history: [...state.history, state.screen] };
    case "SCENARIO_DECISION":
      return { ...state, scenarioPath: action.path };
    case "ANALYZE_ADD":
      return { ...state, analyses: [...state.analyses, action.analysis] };
    case "NEXT_SCENARIO":
      return {
        ...state,
        scenarioIndex: state.scenarioIndex + 1,
        scenarioPath: null,
        scenarioPathHistory: [...state.scenarioPathHistory, state.scenarioPath],
        threadingPosture: action.posture,
        screen: "sc_callback",
        history: [...state.history, state.screen],
      };
    case "LEDGER_ADD":
      return { ...state, ledger: [...state.ledger, action.row] };
    case "FINAL":
      return { ...state, finalSentence: action.text };
    case "SET_B_REFLECTION":
      return { ...state, segmentBReflection: action.text };
    case "SET_C_RESPONSE":
      return { ...state, segmentCResponses: { ...state.segmentCResponses, [action.key]: action.value } };
    case "SET_D_PAUSE1":
      return { ...state, segmentDPause1: action.value };
    case "SET_D_PAUSE2":
      return { ...state, segmentDPause2Text: action.text };
    case "SET_D_RETRO":
      // D3 INNOVATION — retrospective decision pause text captured.
      return { ...state, segmentDRetroText: action.text };
    case "SET_F_ANSWER": {
      const f = state.segmentFAnswers;
      return { ...state, segmentFAnswers: { ...f, [action.exercise]: [...f[action.exercise], action.value] } };
    }
    default:
      return state;
  }
}

export default function BridgeFastD3ModuleRoot() {
  return (
    <ModuleErrorBoundary>
      <PiperProvider>
        <BridgeFastD3Module />
      </PiperProvider>
    </ModuleErrorBoundary>
  );
}

function BridgeFastD3Module() {
  const [st, dispatch] = useReducer(reducer, initialState);
  const audio = useAudio();
  const piper = usePiper();
  const [a0phase, setA0phase] = useState(0);

  const onPause = useCallback(() => {
    piper.stop();
    dispatch({ type: "PAUSE" });
  }, [piper]);

  const C0 = M1_CONTENT.segmentA.coldOpen;
  const SC = SCENARIOS[st.scenarioIndex];
  const SG = M1_CONTENT.segmentG;

  // D3 threading_state_model: reliability_pattern (reliable / mixed / unreliable).
  // For engine compatibility with D1/D2 the threading object keys remain
  // transparent/cautious/avoidant; we map reliable→transparent, mixed→cautious,
  // unreliable→avoidant. Aggregation rule per D3 script §1.4.D: count Ledger
  // entries with calibrated outcomes (Path B or C on SC1/SC2; Path B on SC3).
  // For MVP we approximate as: all calibrated (a OR b OR c — non-silent) →
  // reliable; majority Path D / silent slips → unreliable; otherwise mixed.
  // The engine then maps to the threading variant keys.
  const advanceScenario = useCallback(() => {
    const allPaths = [...st.scenarioPathHistory, st.scenarioPath].filter(Boolean);
    const calibrated = allPaths.filter((p) => p === "b" || p === "c").length;
    const silent = allPaths.filter((p) => p === "d").length;
    const total = allPaths.length;
    let posture = "cautious";
    if (total > 0 && calibrated === total) posture = "transparent"; // reliable
    else if (total > 0 && silent >= Math.ceil(total / 2)) posture = "avoidant"; // unreliable
    dispatch({ type: "NEXT_SCENARIO", posture });
  }, [st.scenarioPathHistory, st.scenarioPath]);

  // A-0 cinematic timing (5.0s, un-skippable)
  useEffect(() => {
    if (st.screen !== "a0") return;
    audio.playMotif();
    const t1 = setTimeout(() => setA0phase(1), reduceMotion ? 200 : 1500);
    const t2 = setTimeout(() => setA0phase(2), reduceMotion ? 400 : 4000);
    const t3 = setTimeout(() => dispatch({ type: "GOTO", screen: "a1" }), reduceMotion ? 600 : 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [st.screen]);

  const goto = (screen) => dispatch({ type: "GOTO", screen });
  const back = () => dispatch({ type: "BACK" });
  const path = st.scenarioPath;
  const cons = path ? SC.consequences[path] : null;

  /* ----- render per screen ----- */
  let body = null;

  /* ============== ENTRY ============== */
  if (st.screen === "enter") {
    body = <EnterScreen onBegin={async () => { await audio.init(); goto("cover"); }} />;
  }

  else if (st.screen === "cover") {
    body = <CoverPage onContinue={() => goto("a0")} />;
  }

  /* ============== SEGMENT A ============== */
  else if (st.screen === "a0") {
    body = (
      <div style={{ minHeight: "100%", background: a0phase === 0 ? "#000" : C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.5s ease", padding: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div className="bf-fade" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, color: C.white, opacity: a0phase >= 0 ? 1 : 0, transition: "opacity 1s" }}>THE 3RD ACADEMY</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: C.tealMid, lineHeight: 1.5, marginTop: 24, maxWidth: 460, opacity: a0phase >= 1 && a0phase < 2 ? 1 : 0, transition: "opacity 1s" }}>
            {M1_CONTENT.dimension.central_question}
          </div>
        </div>
      </div>
    );
  }

  else if (st.screen === "a1") {
    // Cross-lab callback — BehaviourLab D3 → M1 (AIWorkLab). For MVP we render
    // the FALLBACK narration as the live audio. The personalised variant will
    // play the participant's verbatim D3 final personal sentence once the
    // cross-module memory store is online.
    // TODO(cross-module-memory): swap `callbackFallback` for the wrapper +
    // sentence + tail composition when session persistence lands.
    const cb = C0.d3Callback;
    const callbackFallback = cb?.fallback || "";
    body = (
      <Stage>
        {cb && (
          <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>D3 → M1 · Cross-Lab Callback (Screen A-0)</div>
            <AVPlaceholder label="Screen A-0 · D3 callback (fallback variant — MVP)" text={callbackFallback} />
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "8px 0 0" }}>
              {callbackFallback}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: "10px 0 0" }}>
              When the cross-module memory store is wired up, this beat will play with the participant&apos;s own D3 final sentence read back to them. For MVP, the standalone fallback plays.
            </p>
          </div>
        )}
        <AVPlaceholder label="Screen A-1 · Cold open — Marcus&apos;s inbox" text={C0.narration.join("\n\n")} />
        <Narration lines={C0.narration} speakable={false} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "8px 0 20px" }}>
          <Artifact title={C0.aanyaEmail.title} mono={C0.aanyaEmail.mono}>
            {C0.aanyaEmail.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
          <Artifact title={C0.aiSummary.title} mono={C0.aiSummary.mono}>
            {C0.aiSummary.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
          <Artifact title={C0.marcusSlack.title} mono={C0.marcusSlack.mono}>
            {C0.marcusSlack.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
        </div>
        <Decision persistKey={st.screen} prompt="Do you check, or do you ship?" options={C0.options} justificationPrompt={C0.justificationPrompt}
          audioLabel="Cold-open decision prompt" audioText="Do you check, or do you ship?"
          onSubmit={(p) => dispatch({ type: "COLD_OPEN", path: p })} />
      </Stage>
    );
  }

  else if (st.screen === "a2") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Same Day</div>
        <Narration lines={C0.sameDay[st.coldOpenPath]} />
        <PrimaryButton onClick={() => goto("a3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "a3") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, textAlign: "center", marginBottom: 24 }}>That was rehearsal.</p>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 22, borderLeft: `3px solid ${C.teal}` }}>
          {M1_CONTENT.segmentA.safetyFloor.card.map((l, i) => (
            <p key={i} style={{ fontFamily: i === 0 ? SANS : SERIF, fontWeight: i === 0 ? 700 : 400, fontSize: i === 0 ? 13 : 14.5, letterSpacing: i === 0 ? 0.5 : 0, color: i === 0 ? C.white : "rgba(255,255,255,0.82)", lineHeight: 1.55, margin: "0 0 12px" }}>{l}</p>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("a4")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "a4") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <AVPlaceholder label="The central question" text={M1_CONTENT.dimension.central_question} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>THE QUESTION THAT RUNS THROUGH THIS MODULE</div>
          <p style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.5 }}>{M1_CONTENT.dimension.central_question}</p>
          <PrimaryButton onClick={() => goto("b1")}>Continue</PrimaryButton>
        </div>
      </Stage>
    );
  }

  /* ============== SEGMENT B — BEHAVIOUR STANDARD ============== */
  else if (st.screen === "b1") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT B · BEHAVIOUR STANDARD</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 24 }}>The verification standard</h2>
        <AVPlaceholder label={M1_CONTENT.segmentB.justLived.label} text={M1_CONTENT.segmentB.justLived.narration.join("\n\n")} />
        <Narration lines={M1_CONTENT.segmentB.justLived.narration} speakable={false} />
        <PrimaryButton onClick={() => goto("b2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b2") {
    const s = M1_CONTENT.segmentB.standard;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>BEHAVIOUR STANDARD · M1 · AIWORKLAB</div>
        <AVPlaceholder label={s.label} text={[s.title, ...s.lines, s.footer].join("\n")} />
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "22px 24px", margin: "16px 0" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 1, color: C.tealMid, fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>{s.title}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {(s.lines || []).map((l, i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.92)", lineHeight: 1.6 }}>
                <span style={{ color: C.tealMid, flex: "0 0 auto" }}>•</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
          {s.footer && (
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: "16px 0 0", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {s.footer}
            </p>
          )}
        </div>
        <PrimaryButton onClick={() => goto("b3")}>What this standard refuses</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b3") {
    const r = M1_CONTENT.segmentB.refuses;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>B-3 · WHAT THE STANDARD REFUSES</div>
        <AVPlaceholder label={r.label} text={[r.title, ...(r.items || [])].join("\n")} />
        <div style={{ background: "rgba(224,120,86,0.08)", border: `1px solid ${C.amber}`, borderRadius: 12, padding: "20px 22px", margin: "16px 0" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.amber, fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>{r.title}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {(r.items || []).map((it, i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.55 }}>
                <span style={{ color: C.amber, flex: "0 0 auto" }}>×</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
        <Reflection persistKey={st.screen} prompt={M1_CONTENT.segmentB.reflectionPrompt} minChars={30} onDone={(text) => {
          dispatch({ type: "SET_B_REFLECTION", text });
          goto("c1_1");
        }} />
      </Stage>
    );
  }

  /* ============== SEGMENT C — RECOGNITION BRIEFS =============================
     AIWorkLab Segment C is compressed to two briefs (5:00 target). C1 = "polish
     travels faster than the check"; C2 = The Source-First Habit signature
     framework reveal + central question return. No third brief. NO Segment D. */
  else if (st.screen === "c1_1") {
    const c1 = M1_CONTENT.segmentC.c1;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c1.title}</h2>
        <AVPlaceholder label={c1.label} text={c1.narration.join("\n\n")} />
        <Narration lines={c1.narration} speakable={false} />
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "22px 24px", margin: "22px 0", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(19px, 4.8vw, 22px)", color: C.white, lineHeight: 1.4, margin: "0 0 8px", fontWeight: 500 }}>{c1.lockedCard.line1}</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>{c1.lockedCard.line2}</p>
        </div>
        <PrimaryButton onClick={() => goto("c2_1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c2_1") {
    const c2 = M1_CONTENT.segmentC.c2;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT C · RECOGNITION BRIEF 2 of 2 · FRAMEWORK REVEAL</div>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(22px, 5.4vw, 26px)", color: C.white, lineHeight: 1.3, marginBottom: 20, textAlign: "center" }}>{c2.title}</h2>
        <ClickToReveal buttonLabel="Reveal The Source-First Habit">
          <div style={{ textAlign: "center", padding: "28px 16px", background: C.paper, color: C.ink, borderRadius: 12, margin: "0 0 22px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 14 }}>THE SOURCE-FIRST HABIT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: SERIF, fontSize: "clamp(16px, 4vw, 18px)", color: C.ink, fontWeight: 500 }}>
              {c2.framework.steps.map((s, i) => (
                <span key={i} className="bf-fade" style={{ animationDelay: `${i * 0.6}s` }}>{s}</span>
              ))}
            </div>
          </div>
          <AVPlaceholder label={c2.label} text={c2.narration.join("\n\n")} />
          <Narration lines={c2.narration} speakable={false} />
          <PrimaryButton onClick={() => goto("c2_cqreturn")}>Continue</PrimaryButton>
        </ClickToReveal>
      </Stage>
    );
  }

  else if (st.screen === "c2_cqreturn") {
    const cq = M1_CONTENT.segmentC.c2.centralQuestionReturn;
    const audioText = [cq.opener, cq.echo, cq.closing].join("\n\n");
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>C2 · PART 3 · THE CENTRAL QUESTION RETURNS</div>
        <AVPlaceholder label={cq.label} text={audioText} />
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, textAlign: "center", marginBottom: 28 }}>{cq.opener}</p>
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "28px 22px", textAlign: "center", margin: "0 0 26px" }}>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: C.white, lineHeight: 1.5, margin: 0 }}>{cq.echo}</p>
        </div>
        <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, textAlign: "center" }}>{cq.closing}</p>
        <PrimaryButton onClick={() => goto("c_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT C → E — Transition. NO SEGMENT D. NO break_1. ============== */
  else if (st.screen === "c_complete") {
    const cc = M1_CONTENT.segmentC.complete;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT C · COMPLETE · TRANSITION TO SEGMENT E</div>
        <AVPlaceholder label={cc.label} text={cc.narration.join("\n\n")} />
        {cc.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <PrimaryButton onClick={() => goto("scenario_chain_intro")}>{cc.continueLabel}</PrimaryButton>
      </Stage>
    );
  }


  /* ============== SEGMENT E — LAYERED SCENARIO LAB (AIWorkLab) ==============
     Two layered scenarios (LS1, LS2). Each scenario is a three-beat escalation:
     Inspect → Decide → Pressure, followed by three-horizon consequence.
     LS1's outcome subtly threads into LS2 (within-module memory — Section 1.4.A.1).
     ======================================================================== */
  else if (st.screen === "scenario_chain_intro") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · LAYERED SCENARIO LAB · AIWORKLAB</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, textAlign: "center", marginBottom: 20 }}>Two layered scenarios. Two Inspect Surfaces. Two decisions each.</h2>
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, textAlign: "center" }}>
          Inspect the source. Decide. Hold or fold under pressure. See what happens — same day, next week, month end.
        </p>
        <SectorAssignment module={M1_CONTENT.module} />
        <PrimaryButton onClick={() => goto("sc_callback")}>Begin Layered Scenario 1</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_callback") {
    // LS callback + intra-module residue for LS2.
    const isFirst = st.scenarioIndex === 0;
    // Within-module memory (Section 1.4.A.1): LS2's cold setup renders a
    // Slack notification from Aanya whose content differs by LS1 path.
    const ls1Path = st.scenarioPathHistory?.[0] || null;
    const residueSlack = !isFirst && SC.coldSetup?.aanyaSlackByLS1?.[ls1Path];
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>LAYERED SCENARIO {st.scenarioIndex + 1} OF {SCENARIOS.length}</div>
        {/* LS2 cold setup — Monday morning + Aanya's Slack residue */}
        {!isFirst && SC.coldSetup && (
          <>
            <AVPlaceholder label={SC.coldSetup.label} text={SC.coldSetup.lines.join("\n\n")} />
            {SC.coldSetup.lines.map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, margin: "0 0 12px" }}>{l}</p>
            ))}
            {residueSlack && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Artifact · Aanya&apos;s Slack (within-module residue)</div>
                <Artifact title={SC.coldSetup.slackTitle} mono>
                  <div>{residueSlack}</div>
                </Artifact>
                <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, margin: "8px 0 0" }}>
                  {/* Locked rule: felt, never named. No causal language. */}
                  The workplace continues around you.
                </p>
              </div>
            )}
          </>
        )}
        <Narration lines={SC.intro} />
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, margin: "14px 0", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{SC.briefing}</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          {SC.pressureType && (
            <span style={{ fontFamily: SANS, fontSize: 11, padding: "4px 10px", borderRadius: 12, background: "rgba(94,234,212,0.08)", color: C.tealMid, letterSpacing: 0.3, border: `1px solid ${C.tealMid}` }}>Pressure type · {SC.pressureType}</span>
          )}
          {SC.mobileMode && (
            <span style={{ fontFamily: SANS, fontSize: 11, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>Mobile mode · {SC.mobileMode}</span>
          )}
        </div>
        <PrimaryButton onClick={() => goto("sc_inspect")}>Open the Inspect Surface</PrimaryButton>
      </Stage>
    );
  }

  /* ---- INSPECT BEAT — MOAT-CRITICAL (Section 1.4.D)
     Source panel + Output panel side by side. No submit button.
     Observational instruction only. The engine captures the participant's
     interaction as a Lock 2 signal (never surfaced). --------------------- */
  else if (st.screen === "sc_inspect") {
    const insp = SC.inspect || {};
    const src = insp.sourcePanel || {};
    const out = insp.outputPanel || {};
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Inspect Beat · Source vs Output [MOAT-CRITICAL]</div>
        <AVPlaceholder label={insp.label} text={insp.prompt} />
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 18 }}>{insp.prompt}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Source panel</div>
            <Artifact title={src.title} mono={src.mono}>
              {(src.lines || []).map((l, i) => <div key={i}>{l || " "}</div>)}
            </Artifact>
          </div>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.amber, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Output panel · AI-drafted</div>
            <Artifact title={out.title} mono={out.mono}>
              {(out.lines || []).map((l, i) => <div key={i}>{l || " "}</div>)}
            </Artifact>
          </div>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.55, textAlign: "center", margin: "12px 0 0" }}>
          {insp.footerHint || "There is no submit button. Move on when you are ready."}
        </p>
        <PrimaryButton onClick={() => goto("sc_decision")}>{insp.continueLabel || "Move to the decision"}</PrimaryButton>
      </Stage>
    );
  }

  /* ---- DECIDE BEAT — 3 script paths + AUTHORED Path D silent-slip.
     For LS2, the prompt drifts by LS1 path (within-module memory). -------- */
  else if (st.screen === "sc_decision") {
    const ls1Path = st.scenarioPathHistory?.[0] || null;
    const promptDrift = (st.scenarioIndex > 0 && SC.decidePromptByLS1 && ls1Path)
      ? SC.decidePromptByLS1[ls1Path]
      : SC.decidePrompt;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Decide Beat · Path selection</div>
        <Decision persistKey={st.screen} prompt={promptDrift} options={SC.decideOptions} justificationPrompt={SC.justificationPrompt}
          audioLabel="Decide beat prompt" audioText={promptDrift}
          onSubmit={(p, justification) => {
            dispatch({ type: "SCENARIO_DECISION", path: p });
            const a = localAnalyze(justification);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: SC.title, path: p } });
            goto("sc_artifact");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_artifact") {
    const aw = SC.artifactWrite?.[path];
    const refKind = path === "d" ? "card" : "list";
    // Reference set per path — a and c share, b and c have their own, d is a card.
    const refs = path === "a" ? SC.references?.ac
               : path === "c" ? (SC.references?.c || SC.references?.ac)
               : path === "b" ? SC.references?.b
               : SC.references?.d;
    const closing = (path === "a" || path === "b" || path === "c") ? SC.references?.closing : null;
    body = (
      <Stage>
        <ArtifactWrite persistKey={st.screen} prompt={aw?.prompt || "Write the artifact."} submitLabel={aw?.submit || "Save"} references={refs} refKind={refKind} closing={closing}
          onDone={(txt) => {
            const a = localAnalyze(txt);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: SC.title + " (artifact)", path } });
            goto("sc_pressure");
          }} />
      </Stage>
    );
  }

  /* ---- PRESSURE BEAT — MOAT-CRITICAL (Section 2.5).
     Trigger renders (Marcus's reply / Daniel's Slack), then a three-path
     second decision. The Lock 2 signal records whether the first call held
     or folded under the pressure type declared for this scenario. -------- */
  else if (st.screen === "sc_pressure") {
    const pr = SC.pressure || {};
    const trig = pr.trigger || {};
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.amber, marginBottom: 14 }}>
          {pr.label || "Pressure Beat"} [MOAT-CRITICAL]
        </div>
        {trig.title && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.amber, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Escalation · {pr.type}</div>
            <Artifact title={trig.title} mono={trig.mono}>
              {(trig.lines || []).map((l, i) => <div key={i}>{l || " "}</div>)}
            </Artifact>
          </div>
        )}
        <Decision persistKey={st.screen} prompt={pr.prompt} options={pr.options || []} justificationPrompt={pr.justificationPrompt || "Why this move?"}
          audioLabel="Pressure beat prompt" audioText={pr.prompt}
          onSubmit={(p2, justification) => {
            // The Decide path stays in st.scenarioPath (first decision);
            // the Pressure path is captured via ANALYZE_ADD so both compose
            // into the ledger. Consequence rendering still keys off the
            // primary Decide path per the composition rule in Section 2.5.
            const a = localAnalyze(justification);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: SC.title + " (pressure)", pressurePath: p2 } });
            goto("sc_consequence");
          }} />
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
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>What may have been noticed</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: C.white, lineHeight: 1.6 }}>“{cons?.interp}”</p>
        <PrimaryButton onClick={() => goto("sc_signal")}>How each path may land</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_signal") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Source-First Pattern Mirror · What each path may have communicated</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(SC.signalPanel || []).map((s) => {
            const chosen = s.key === path;
            return (
              <div key={s.key} style={{ borderRadius: 10, padding: 14, background: chosen ? "rgba(13,148,136,0.1)" : "rgba(255,255,255,0.03)", border: chosen ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: chosen ? C.tealMid : "rgba(255,255,255,0.8)", marginBottom: 5 }}>Path {s.key.toUpperCase()} — {s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Signal: {s.signal}</div>
                {s.effect && <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 22 }}><Trajectory chosen={path} signalPanel={SC.signalPanel || []} /></div>
        <PrimaryButton onClick={() => goto("sc_manager")}>The manager&apos;s view</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_manager") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Manager Lens</div>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, fontStyle: "italic" }}>{cons?.manager}</p>
        <PrimaryButton onClick={() => goto("sc_reflection")}>Reflect</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_reflection") {
    body = (
      <Stage narrow>
        <Reflection persistKey={st.screen} prompt={SC.reflection} onDone={() => {
          dispatch({ type: "LEDGER_ADD", row: { sc: SC.id, title: SC.title, commitment: SC.commitment, outcome: cons?.outcome, others: cons?.others } });
          goto("sc_ledger");
        }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_ledger") {
    const moreScenarios = st.scenarioIndex < SCENARIOS.length - 1;
    const onContinue = moreScenarios ? advanceScenario : () => goto("e_signature");
    const nextSC = moreScenarios ? SCENARIOS[st.scenarioIndex + 1] : null;
    body = (
      <Stage>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 18, textAlign: "center" }}>
          {st.ledger.length >= 1 && moreScenarios ? "Your pattern is beginning to form." : "Your pattern is now visible."}
        </div>
        <PatternLedger name="Source-First Pattern Mirror" rows={st.ledger} totalRows={SCENARIOS.length} />
        {moreScenarios && nextSC && (
          <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "rgba(94,234,212,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, textTransform: "uppercase" }}>UP NEXT · LAYERED SCENARIO {st.scenarioIndex + 2} OF {SCENARIOS.length}</span>
              <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Same workplace. New pressure.</span>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.4, marginBottom: 4 }}>{nextSC.title}</div>
            {nextSC.commitment && (
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>{nextSC.commitment}</div>
            )}
            <p style={{ fontFamily: SANS, fontSize: 12, color: C.tealMid, marginTop: 10, marginBottom: 0, lineHeight: 1.55 }}>
              {/* Per Section 1.4.A.1 Locked Rule — felt, never named. */}
              How you handled this stays with the workplace.
            </p>
          </div>
        )}
        <PrimaryButton onClick={onContinue}>
          {moreScenarios ? `Carry it forward → Layered Scenario ${st.scenarioIndex + 2}` : "Continue to micro-drills"}
        </PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT E → F — BEHAVIOURAL SIGNATURE MIRROR ============== */
  else if (st.screen === "e_signature") {
    const paths = [...st.scenarioPathHistory, st.scenarioPath].filter(Boolean);
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · COMPLETE · YOUR SOURCE-FIRST SIGNATURE</div>
        <BehaviouralSignaturePanel paths={paths} theme="dark" />
        <PrimaryButton onClick={() => goto("f1")}>Continue to micro-drills</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT F — MICRO-DRILLS (AIWorkLab: 2 drills) ============
     F1 — "Edit toward the source" (artifact-write, 90 sec).
     F2 — "Refuse the smoothing" (3-option choice, 60 sec).
     Reflection card ("The smoothing was the pressure.") → f_complete → G. */
  else if (st.screen === "f1") {
    const f1 = M1_CONTENT.segmentF.f1;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f1.title}</h2>
        <AVPlaceholder label="F1 introduction" text={f1.audioIntro} />
        <p style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "10px 0 18px" }}>{f1.audioIntro}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "8px 0 18px" }}>
          <Artifact title={f1.source.title} mono={f1.source.mono}>
            {f1.source.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
          <Artifact title={f1.aiDraft.title} mono={f1.aiDraft.mono}>
            {f1.aiDraft.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "0 0 12px" }}>{f1.writePrompt}</p>
        <F1WriteForm persistKey={st.screen} prompt={f1.writePrompt} submit={f1.submitLabel} min={f1.minChars}
          onDone={(t) => {
            dispatch({ type: "SET_F_ANSWER", exercise: "f1", value: { text: t } });
            goto("f1_close");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "f1_close") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 26, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{M1_CONTENT.segmentF.f1.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2")}>Continue to F2</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f2") {
    const f2 = M1_CONTENT.segmentF.f2;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 2 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f2.title}</h2>
        <AVPlaceholder label="F2 introduction" text={f2.audioIntro} />
        <p style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "10px 0 18px" }}>{f2.audioIntro}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "8px 0 18px" }}>
          <Artifact title={f2.source.title} mono={f2.source.mono}>
            {f2.source.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
          <Artifact title={f2.polished.title} mono={f2.polished.mono}>
            {f2.polished.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
        </div>
        <F2ChoiceCard key={st.screen} prompt={f2.prompt} options={f2.options}
          onContinue={(picked) => {
            dispatch({ type: "SET_F_ANSWER", exercise: "f2", value: { picked } });
            goto("f2_close");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "f2_close") {
    const card = M1_CONTENT.segmentF.reflectionCard;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ background: "rgba(224,120,86,0.08)", border: `1px solid ${C.amber}`, borderRadius: 12, padding: 32, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: C.white, lineHeight: 1.55, margin: 0 }}>{card?.line || "The smoothing was the pressure."}</p>
        </div>
        <PrimaryButton onClick={() => goto("f_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f_complete") {
    const fc = M1_CONTENT.segmentF.complete;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT F · COMPLETE · TRANSITION TO SEGMENT G</div>
        <AVPlaceholder label={fc.label} text={fc.narration.join("\n\n")} />
        {fc.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <PrimaryButton onClick={() => goto("g1")}>{fc.continueLabel}</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT G — COMPLETION + AWE MOMENT ============== */
  else if (st.screen === "g1") {
    const recBlock = SG.recognition || {};
    const rec = recBlock.recognitionCard || {};
    const recLines = recBlock.lines || [];
    const callback = st.coldOpenPath ? SG.callback?.[st.coldOpenPath] : null;
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RECOGNITION</div>
        <AVPlaceholder label={recBlock.label} text={recLines.join("\n\n")} />
        {/* On-screen recognition card — fades in slowly per spec */}
        {rec.title && (
          <div className="bf-fade" style={{ margin: "16px 0 24px", padding: "22px 24px", borderRadius: 12, border: `1px solid ${C.tealMid}`, background: "rgba(13,148,136,0.08)", textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 12 }}>{rec.title}</div>
            {(rec.lines || []).map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontSize: 17, color: C.white, lineHeight: 1.6, margin: "0 0 8px" }}>{l}</p>
            ))}
          </div>
        )}
        <Narration lines={recLines} speakable={false} />
        {callback && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: C.tealMid, lineHeight: 1.65, marginTop: 4 }}>{callback}</p>
        )}
        <PrimaryButton onClick={() => goto("g15")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "g15") {
    // Per spec: no-input transition. Auto-advances after frameworkReturn.durationSeconds.
    body = <FrameworkReturnScreen content={SG.frameworkReturn} onDone={() => goto("g2")} />;
  }

  else if (st.screen === "g2") {
    const paths = [...st.scenarioPathHistory, st.scenarioPath].filter(Boolean);
    body = (
      <Stage bg={C.paper} narrow>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 6 }}>YOUR GROWTH LOG</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, color: C.navy }}>M1 — AI Output Judgment · AIWorkLab</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: C.inkSoft, marginTop: 6 }}>{M1_CONTENT.dimension.central_question}</div>
        </div>
        <PatternLedger name="Source-First Pattern Mirror — your pattern" rows={st.ledger} totalRows={st.ledger.length || 1} fullRecall />
        <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.inkSoft, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
          Not a score. Not a certificate. A private record of what you practised.
        </p>
        <div style={{ marginTop: 28, paddingTop: 22, borderTop: `1px solid ${C.line}` }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 12, textAlign: "center" }}>YOUR BEHAVIOURAL SIGNATURE</div>
          <BehaviouralSignaturePanel paths={paths} theme="light" />
        </div>
        <button onClick={() => goto("g3")} style={{ width: "100%", minHeight: 48, marginTop: 24, borderRadius: 10, border: "none", background: C.navy, color: C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continue</button>
      </Stage>
    );
  }

  else if (st.screen === "g3") {
    // M1 Retention Check setup — a quiet frame per script G.3.
    // No details table (script keeps this beat under 40s).
    const rc = SG.retentionCheck || {};
    const audioText = [rc.title, rc.subtitle].filter(Boolean).join("\n\n");
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RETENTION CHECK SETUP</div>
        <AVPlaceholder label={rc.label} text={audioText} />
        <div style={{ background: "rgba(13,148,136,0.06)", border: `1px solid ${C.tealMid}`, borderRadius: 12, padding: "26px 22px", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.55, margin: "0 0 8px" }}>{rc.title}</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{rc.subtitle}</p>
        </div>
        {Array.isArray(rc.channels) && rc.channels.length > 0 && (
          <div style={{ marginTop: 22, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
            {rc.channels.map((ch) => {
              const isDefault = ch === rc.defaultChannel;
              return (
                <span key={ch} style={{
                  padding: "6px 14px", borderRadius: 16,
                  border: `1px solid ${isDefault ? C.tealMid : "rgba(255,255,255,0.18)"}`,
                  background: isDefault ? "rgba(94,234,212,0.08)" : "transparent",
                  color: isDefault ? C.tealMid : "rgba(255,255,255,0.65)",
                  fontFamily: SANS, fontSize: 12.5, letterSpacing: 0.3,
                }}>{ch}{isDefault ? " · default" : ""}</span>
              );
            })}
          </div>
        )}
        <PrimaryButton onClick={() => goto("g4")}>Got it — continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "g4") {
    body = <AweClose persistKey={st.screen} content={SG} onMotif={audio.playMotif} onDone={(s) => { dispatch({ type: "FINAL", text: s }); goto("done"); }} />;
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
            Your retention check will arrive in 3 to 7 days.<br />Until then — {FOOTER.toLowerCase()}
          </p>
          <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
            style={{ marginTop: 30, padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "rgba(255,255,255,0.8)", fontFamily: SANS, fontSize: 13.5, cursor: "pointer" }}>
            Exit — return home
          </button>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 28 }}>
            {COPYRIGHT}
          </p>
        </div>
      </Stage>
    );
  }

  /* ----- defensive fallback: if no render branch matched (unknown screen
     pushed onto history, lost state, etc.) show a recovery card rather than
     a blank screen. Anyone who lands here can choose what to do, not refresh. */
  if (body === null) {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.amber, marginBottom: 12 }}>NAVIGATION RECOVERY</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.4, marginBottom: 14 }}>Looks like we lost the page.</h2>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 22 }}>
            Your progress through the module is still saved. You can step back one screen and try a different path, or restart from the beginning.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: st.history.length > 0 ? "1fr 1fr" : "1fr", gap: 12 }}>
            {st.history.length > 0 && (
              <button onClick={back}
                style={{ minHeight: 48, borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "transparent", color: C.tealMid, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
                Step back
              </button>
            )}
            <button onClick={() => dispatch({ type: "RESET" })}
              style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.white, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              Restart from the beginning
            </button>
          </div>
        </div>
      </Stage>
    );
  }

  /* ----- chrome (nav controls, segment indicator, footer) ----- */
  const noChromeScreens = ["enter", "cover", "a0"];
  const showChrome = !noChromeScreens.includes(st.screen);
  // No Back on the closing transition or terminal beats — the framework
  // return is no-input by spec, and the awe close + done belong to the
  // participant alone.
  // canBack excludes auto-advance / silent-hold beats (g15 framework return,
  // g4 awe close, done terminal) and the awe-moment held card (a0 has no chrome).
  const canBack = st.history.length > 0 && showChrome && st.screen !== "g15" && st.screen !== "g4" && st.screen !== "done";
  const segLabel = SEGMENT_LABEL[segmentOf(st.screen)];
  // Screens that paint a cream/paper background invert the chrome so the
  // floating Back/Pause controls and segment indicator stay legible.
  const lightChromeScreens = ["g2"];
  const onLightBg = lightChromeScreens.includes(st.screen);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "auto", background: C.navy, fontFamily: SANS }}>
      <StyleBlock />
      {showChrome && canBack && <BackControl onBack={back} onLight={onLightBg} />}
      {showChrome && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 6, padding: "5px 12px", borderRadius: 16, background: onLightBg ? "rgba(255,255,255,0.85)" : "rgba(14,34,51,0.85)", border: `1px solid ${onLightBg ? "rgba(15,34,51,0.18)" : "rgba(255,255,255,0.12)"}`, fontFamily: SANS, fontSize: 10.5, letterSpacing: 1, color: onLightBg ? C.navyDeep : "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }}>
          {segLabel}
        </div>
      )}
      {showChrome && <PauseControl onPause={onPause} onLight={onLightBg} />}
      {body}
      {showChrome && <Footer />}
      {st.paused && <PauseOverlay onResume={() => dispatch({ type: "RESUME" })} onRestart={() => dispatch({ type: "RESET" })} segmentLabel={segLabel} />}
    </div>
  );
}

/* ============================================================================
   Helper presentational components for Segment B
   ========================================================================== */
function FieldGuideSection({ title, body }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 10 }}>{title}</div>
      {body.map((b, i) => (
        <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, margin: "0 0 12px" }}>{b}</p>
      ))}
    </div>
  );
}

function FieldGuideList({ title, intro, items, accent }) {
  return (
    <div style={{ marginBottom: 26, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 18, borderLeft: `3px solid ${accent}` }}>
      <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: accent, marginBottom: 10 }}>{title}</div>
      <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 14 }}>{intro}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it, i) => (
          <div key={i}>
            <div style={{ fontFamily: SERIF, fontSize: 15, color: C.white, marginBottom: 4 }}>{it.h}</div>
            <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{it.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* F1 write form — the participant edits an AI draft down to what the source
   supports. Multiline textarea + Save button, mirrors DPause2Form. */
function F1WriteForm({ prompt, submit, min, onDone, persistKey }) {
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [tried, setTried] = useState(false);
  const left = (min || 40) - text.trim().length;
  return (
    <div>
      <MultilineTextarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={5} autoFocus
        placeholder="Rewrite the AI draft… (Enter inserts a new line — submit with the button below)"
        error={tried && left > 0} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>Rewrite in your own words. Ship what the source supports.</p>
        <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: left > 0 ? "rgba(255,255,255,0.4)" : "#E0C081" }}>{Math.max(0, text.trim().length)}/{min || 40}</span>
      </div>
      {tried && left > 0 && (
        <div style={{ marginTop: 8, fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12.5, color: "#E0C081", textAlign: "center" }}>{left} more character{left === 1 ? "" : "s"} to continue.</div>
      )}
      <PrimaryButton onClick={() => { if (left > 0) { setTried(true); return; } onDone(text); }} dim={left > 0}>{submit || "Save"}</PrimaryButton>
    </div>
  );
}

/* F2 choice card — three options; the participant picks one, sees feedback,
   then continues. Correct-answer marking is used for tone (soft green vs
   soft amber) but no score is displayed. key={st.screen} at call site keeps
   local state from leaking between vignettes. */
function F2ChoiceCard({ prompt, options = [], onContinue }) {
  const [sel, setSel] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const picked = options.find((o) => o.key === sel);
  return (
    <div>
      <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 18, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: 18 }}>{prompt}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((o) => {
          const active = sel === o.key;
          const isCorrect = revealed && picked && o.key === sel && o.correct;
          const isWrongPick = revealed && active && !o.correct;
          let border = "rgba(255,255,255,0.15)";
          if (isCorrect) border = "#C8A35C";
          else if (isWrongPick) border = "#E07856";
          else if (active) border = "#C8A35C";
          return (
            <button key={o.key} onClick={() => !revealed && setSel(o.key)} disabled={revealed}
              style={{ textAlign: "left", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${border}`, background: active ? "rgba(200,163,92,0.14)" : "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.9)", fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, cursor: revealed ? "default" : "pointer", transition: "border-color 0.2s, background 0.2s" }}>
              <span style={{ fontWeight: 700, color: active ? "#E0C081" : "rgba(255,255,255,0.5)", marginRight: 8 }}>{String(o.key || "").toUpperCase()}</span>{o.label}
            </button>
          );
        })}
      </div>
      {revealed && picked && (
        <div className="bf-fade" style={{ marginTop: 18, padding: 14, borderRadius: 10, background: "rgba(200,163,92,0.1)", border: `1px solid #C8A35C` }}>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontSize: 15, color: "#FBF7EE", lineHeight: 1.6, margin: 0 }}>{picked.feedback}</p>
        </div>
      )}
      {!revealed ? (
        <PrimaryButton onClick={() => sel && setRevealed(true)} dim={!sel}>Name it</PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => onContinue(picked?.key)}>Continue</PrimaryButton>
      )}
    </div>
  );
}

/* Decision Pause 2 (Segment D) — open-response text form, multiline by default */
function DPause2Form({ prompt, submit, min, onDone, persistKey }) {
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [tried, setTried] = useState(false);
  const left = min - text.trim().length;
  return (
    <div>
      <p style={{ fontFamily: SERIF, fontSize: 16.5, color: "rgba(255,255,255,0.92)", lineHeight: 1.6, marginBottom: 14 }}>{prompt}</p>
      <MultilineTextarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={6} autoFocus
        placeholder="Write the actual words you would use… (Enter inserts a new line — submit with the button)"
        error={tried && left > 0} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>Open response — construct your own answer in your own words.</p>
        <span style={{ fontFamily: SANS, fontSize: 11, color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/{min}</span>
      </div>
      {tried && left > 0 && <div style={{ marginTop: 8, fontFamily: SANS, fontSize: 12.5, color: C.tealMid, textAlign: "center" }}>{left} more character{left === 1 ? "" : "s"} to continue.</div>}
      <PrimaryButton onClick={() => { if (left > 0) { setTried(true); return; } onDone(text); }} dim={left > 0}>{submit}</PrimaryButton>
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
      @keyframes bfSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .bf-spin { animation: bfSpin 1.1s linear infinite; }
      @keyframes bfPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
      .bf-pulse { animation: bfPulse 0.9s ease-in-out infinite; }
      ::selection { background: ${C.tealMid}; color: ${C.navy}; }
    `}</style>
  );
}
