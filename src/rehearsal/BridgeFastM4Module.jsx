import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Pause, X, Mic, ChevronRight, ChevronLeft, Volume2, Play, Square, Loader2 } from "lucide-react";
import { M4_CONTENT, LS1_CONTENT_M4, LS2_CONTENT_M4 } from "./m4Content.js";
import { C, SERIF, SANS } from "./theme.js";
import { PiperProvider, usePiper } from "./usePiper.jsx";

/* ============================================================================
   THE 3RD ACADEMY · BridgeFast™ Engine — M4 Production Build
   AIWorkLab Pressure Point 4 — AI Grey Zone
   Cover → A → B → C → E (LS1 → LS2, intra-module residue) → F → G

   Differences from BehaviourLab (D-series):
     • Segment D is omitted entirely.
     • Segment E holds two LAYERED scenarios (LS1, LS2), not four one-shot
       scenario chains. LS1's stance threads into LS2 via Pranav's Slack
       drift and the LS2 Decide prompt drift.
     • Every LS has an Inspect Beat (MOAT-CRITICAL source-artifact surface)
       BEFORE the Decide, and a Pressure Beat AFTER the Decide.
     • Runtime is 45 minutes; break points shift accordingly.
   Shared with BehaviourLab: cinematic entry (A-0), signature audio, Growth
   Log, Awe Close pattern, Retention Check specification, quiet observational
   voice register.
   ========================================================================== */

/* ---- Session-scoped text persistence.
   Same helpers as D3. Keyed by persistKey; restored when the participant
   navigates back to a screen where they had already typed. Cleared on hard
   reload / module unmount. ---- */
const __formStore = new Map();
const __recall = (key, fallback) => (key && __formStore.has(key)) ? __formStore.get(key) : (fallback === undefined ? "" : fallback);
const __persist = (key, value) => { if (key) __formStore.set(key, value); };

/* ============================================================================
   ERROR BOUNDARY
   ========================================================================== */
class ModuleErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("M4 rehearsal render error:", error, info); }
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

/* ---------------------------------- CONSTANTS ---------------------------- */
const MONO = "'Courier New', monospace";
const FOOTER = "Private rehearsal only. Not behavioural documentation.";
const COPYRIGHT = "© 2026 The 3rd Academy Inc. All rights reserved. Confidential.";

const LAYERED_SCENARIOS = [LS1_CONTENT_M4, LS2_CONTENT_M4];

/* ============================================================================
   AUDIO (Tone.js placeholder — same as D-series; the M4 build ships with the
   Piper narration pipeline and reserves the bell + motif hooks for the owned
   Tibetan-bowl audio pass).
   ========================================================================== */
function useAudio() {
  return { init: async () => {}, strikeBell: () => {}, playMotif: () => {} };
}

/* ============================================================================
   LOCAL ANALYSIS — Lock 2 fingerprint (developer-only, same as D-series)
   ========================================================================== */
const HEDGES = ["maybe", "i think", "probably", "sort of", "kind of", "i guess", "perhaps", "might", "possibly", "just wanted", "a bit", "somewhat", "hopefully"];
const DEFLECT = ["to be fair", "wasn't my", "was not my", "not my fault", "they should", "someone else", "in fairness", "but the", "blame"];
const OWNERSHIP = ["i made", "i missed", "my error", "my mistake", "my fault", "i caused", "i left", "i forgot", "i should have", "i own", "i named", "i flagged"];

function clamp3(n) { return Math.max(0, Math.min(3, n)); }
function localAnalyze(text) {
  const t = (text || "").toLowerCase();
  const words = t.split(/\s+/).filter(Boolean).length || 1;
  const count = (arr) => arr.reduce((n, p) => n + (t.includes(p) ? 1 : 0), 0);
  const hedge = count(HEDGES);
  const deflect = count(DEFLECT);
  const own = count(OWNERSHIP);
  const hasAsk = /\b(need|can you|could you|by \d|confirm|let me know|two minutes|2 minutes|flag)\b/.test(t);
  const hasMagnitude = /[\$£€]|\d{2,}|percent|%|across|inflat|omit|missing|wrong|policy|clause|tos|dashboard|migration/.test(t);
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
   ENGINE PRIMITIVES — reused from the D-series shape, unchanged
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
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(14,34,51,0.92)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, margin: "0 auto 18px", border: `1px solid ${C.tealMid}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(94,234,212,0.08)" }}>
          <Pause size={24} color={C.tealMid} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 3, color: C.tealMid, marginBottom: 12 }}>PAUSED</div>
        <h2 id="pause-title" style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: C.white, lineHeight: 1.3, margin: "0 0 14px" }}>Take a breath.</h2>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 28px" }}>
          Your progress is saved. When you come back, you will land on this exact screen.
        </p>
        <button onClick={onResume}
          style={{ width: "100%", maxWidth: 320, minHeight: 48, margin: "0 auto", borderRadius: 24, border: "none", background: C.teal, color: C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
  useEffect(() => { if (piper.error) setPlaying(false); }, [piper.error]);
  useEffect(() => { piper.prefetch(text); }, [piper, text]);
  const onClick = async () => {
    if (playing) { piper.stop(); setPlaying(false); return; }
    if (!piper.enabled) piper.setEnabled(true);
    const t = ++tokenRef.current;
    setPlaying(true);
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
        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: small ? "4px 10px" : "6px 12px", borderRadius: 16, border: `1px solid ${playing ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)"}`, background: playing ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)", color: playing ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)", fontFamily: SANS, fontSize: small ? 11 : 12, letterSpacing: 0.3, cursor: "pointer" }}>
        <Icon size={small ? 11 : 13} className={isLoading ? "bf-spin" : ""} />
        {labelText}
      </button>
      <span style={{ fontFamily: SANS, fontSize: small ? 10 : 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: 0.4, textTransform: "uppercase" }}>Optional</span>
      {piper.error && (
        <span title={piper.error} style={{ fontFamily: SANS, fontSize: 11, color: C.redInk, background: "rgba(185,28,28,0.12)", border: "1px solid rgba(185,28,28,0.4)", borderRadius: 12, padding: "3px 9px", maxWidth: 280, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>⚠ {piper.error}</span>
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
      {(Array.isArray(lines) ? lines : [text]).map((l, i) => (
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
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{sa.mvpNotice}</p>
      </div>
    );
  }
  return (
    <div style={{ margin: "22px 0 4px", padding: "16px 18px", borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "rgba(94,234,212,0.06)" }}>
      <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>{sa.titlePicker}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        {variants.map((v) => (
          <span key={v} style={{ padding: "6px 12px", borderRadius: 16, border: "1px solid rgba(94,234,212,0.4)", background: "rgba(94,234,212,0.06)", color: C.tealMid, fontFamily: SANS, fontSize: 12.5 }}>{v}</span>
        ))}
      </div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.55, margin: 0 }}>{sa.pickerHint}</p>
    </div>
  );
}

/* ---- AIWorkLab grey-zone signature panel.
   Aggregates two layered-scenario stances into a signature reading.
   Categories: principled, mixed, avoidant. Uses the same tile+card shape as
   the BehaviourLab BehaviouralSignaturePanel; the semantic categories track
   the M4 script's Locked internal signal labels (never named to participant).
   Pass theme="light" on cream/paper backgrounds (G-2). ---- */
function GreyZoneSignaturePanel({ decides = [], pressures = [], theme = "dark" }) {
  // decides[] and pressures[] each hold LS1 + LS2 path selections (a/b/c).
  // Named/daylight paths: LS1 b/c, LS2 b (name the gap to Naomi). Silent
  // shortcut: LS1 a + LS2 a. Middle: LS1 a with pressure-C, LS2 c without
  // naming.
  const named = (decides.filter((d, i) => (i === 0 ? d === "b" || d === "c" : d === "b")).length)
    + (pressures.filter((p, i) => (i === 0 ? p === "b" || p === "c" : p === "c")).length);
  const silent = decides.filter((d) => d === "a").length + pressures.filter((p) => p === "a").length;
  const middle = decides.length + pressures.length - named - silent;

  let key, title, bodyText;
  if (decides.length === 0) {
    key = "mixed";
    title = "Pattern not yet established";
    bodyText = "Two layered scenarios are needed to read a signature. Yours has not yet been recorded.";
  } else if (named >= silent + middle) {
    key = "reliable";
    title = "Principled — the Daylight Rule as reflex";
    bodyText = "Across the layered scenarios, you named the gap out loud and applied the obligation you already held. Colleagues, HR partners, and directors begin to read your grey-zone decisions through that pattern, not one at a time. Self-governance held under identity pressure in LS1 and under new information in LS2 is the reflex the module was built to rehearse.";
  } else if (silent >= middle && silent >= named) {
    key = "unreliable";
    title = "Silent shortcut — the reading compounds";
    bodyText = "Across the layered scenarios, the reach was toward speed rather than daylight. None of these decisions, on their own, would necessarily change how you are seen. Together, they begin to. The cost of silence in a grey zone is invisible in the moment, delayed, and compounds. The next decision a manager or HR partner makes about you carries the trail of these.";
  } else {
    key = "mixed";
    title = "Mixed — daylight in some moments, silence in others";
    bodyText = "Your pattern is not uniform. In one scenario you named the gap; in the other you let it sit. A mixed pattern is the most common and the most informative signature — it is the place where the next deliberate decision changes the trajectory more than any other.";
  }

  const light = theme === "light";
  const accent = key === "unreliable" ? C.amber : C.tealMid;
  const fg = light ? C.ink : "rgba(255,255,255,0.88)";
  const fgMute = light ? C.inkSoft : "rgba(255,255,255,0.55)";
  const tileBg = light ? "rgba(15,34,51,0.04)" : "rgba(255,255,255,0.04)";
  const tileBorder = light ? "rgba(15,34,51,0.1)" : "rgba(255,255,255,0.08)";
  const cardBg = key === "reliable" ? "rgba(13,148,136,0.1)" : key === "unreliable" ? "rgba(245,158,11,0.12)" : (light ? "rgba(15,34,51,0.03)" : "rgba(255,255,255,0.04)");
  const cardBorder = key === "reliable" ? C.tealMid : key === "unreliable" ? C.amber : (light ? "rgba(15,34,51,0.12)" : "rgba(255,255,255,0.12)");
  return (
    <div>
      <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: light ? C.navy : C.white, lineHeight: 1.3, marginBottom: 8, textAlign: "center" }}>{title}</h2>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: fgMute, lineHeight: 1.55, textAlign: "center", marginBottom: 20 }}>What two layered scenarios, taken together, may signal.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Named the gap", value: named, color: C.tealMid },
          { label: "Middle-ground", value: middle, color: light ? C.inkSoft : "#94A3B8" },
          { label: "Silent / shortcut", value: silent, color: C.amber },
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
        Not a score. Not a verdict. The first reading of a reflex that is still forming.
      </p>
    </div>
  );
}

function ClickToReveal({ buttonLabel, children }) {
  const [revealed, setRevealed] = useState(false);
  if (revealed) return <div className="bf-fade">{children}</div>;
  return (
    <button onClick={() => setRevealed(true)}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, margin: "18px 0", padding: "12px 18px", borderRadius: 24, border: `1px dashed ${C.tealMid}`, background: "rgba(94,234,212,0.06)", color: C.tealMid, fontFamily: SANS, fontSize: 13, letterSpacing: 0.4, cursor: "pointer" }}>
      <ChevronRight size={14} /> {buttonLabel}
    </button>
  );
}

function AVPlaceholder({ label, text }) {
  if (!text) return null;
  return (
    <div style={{ margin: "12px 0", padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.tealMid}`, background: "rgba(94,234,212,0.06)", display: "flex", alignItems: "center", gap: 10, fontFamily: SANS, flexWrap: "wrap" }}>
      <Volume2 size={15} color={C.tealMid} />
      <span style={{ fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700 }}>NARRATION</span>
      {label && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{label}</span>}
      <span style={{ marginLeft: "auto" }}><ListenButton text={text} size="sm" /></span>
    </div>
  );
}

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
    r.lang = "en-US"; r.continuous = true; r.interimResults = false;
    r.onresult = (e) => {
      let chunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) chunk += e.results[i][0].transcript;
      }
      const t = chunk.trim();
      if (t) onTranscript(t);
    };
    r.onerror = (e) => {
      const map = { "not-allowed": "Microphone permission denied", "service-not-allowed": "Microphone permission denied", "no-speech": "Didn't catch that — try again", "audio-capture": "No microphone found", "network": "Voice service unreachable" };
      setHint(map[e.error] || "Voice input error");
      setRecording(false);
    };
    r.onend = () => setRecording(false);
    try { r.start(); } catch (e) { setHint("Voice input failed to start"); return; }
    recRef.current = r; setRecording(true); setHint(null);
  };
  return (
    <span style={{ position: "absolute", right: 8, bottom: 8, display: "inline-flex", alignItems: "center", gap: 8 }}>
      {hint && (
        <span style={{ fontFamily: SANS, fontSize: 10.5, color: "rgba(255,255,255,0.55)", background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "2px 8px" }}>{hint}</span>
      )}
      <button type="button" onClick={toggle} aria-label={recording ? "Stop dictation" : "Dictate with voice"} title={recording ? "Stop dictation" : "Dictate with voice"}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 14, border: `1px solid ${recording ? "#fca5a5" : "rgba(94,234,212,0.4)"}`, background: recording ? "rgba(220,38,38,0.18)" : "rgba(94,234,212,0.08)", color: recording ? "#fca5a5" : C.tealMid, fontFamily: SANS, fontSize: 11, letterSpacing: 0.3, cursor: "pointer" }}>
        <Mic size={12} className={recording ? "bf-pulse" : ""} />
        {recording ? "Recording…" : "Voice"}
      </button>
    </span>
  );
}

function MultilineTextarea({ value, onChange, placeholder, rows = 4, autoFocus = false, error = false, style = {} }) {
  const appendTranscript = (t) => {
    const existing = String(value || "");
    const sep = existing && !/\s$/.test(existing) ? " " : "";
    onChange({ target: { value: existing + sep + t } });
  };
  return (
    <div style={{ position: "relative" }}>
      <textarea value={value} onChange={onChange} rows={rows} autoFocus={autoFocus} placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", padding: "14px 14px 44px", borderRadius: 8, border: `1px solid ${error ? C.redInk : "rgba(255,255,255,0.18)"}`, background: "rgba(0,0,0,0.22)", color: C.white, fontFamily: SANS, fontSize: 15, lineHeight: 1.6, resize: "vertical", transition: "border-color 0.2s", ...style }} />
      <VoiceDictateButton onTranscript={appendTranscript} />
    </div>
  );
}

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
          {references?.card}
        </div>
      ) : (
        <>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 12 }}>Other ways this moment can be written</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(references || []).map((r, i) => (
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

/* ---- Three-horizon consequence reveal — extended for AIWorkLab to append
   pressure-path modulation lines onto each horizon's base narration. If the
   scenario does not carry a pressure path (LS1's cold-open micro-consequence
   uses this component too), pressureMods is simply undefined and the base
   narration plays. Mirror Rule line renders on Month End when the combo
   matches. ---- */
function ConsequenceReveal({ horizons, pressureMods, mirrorRule, mirrorCombo, onBell, onDone }) {
  const [stage, setStage] = useState(0);
  const labels = ["Same Day", "Next Week", "Month End"];
  const keys = ["sameDay", "nextWeek", "monthEnd"];
  const advance = () => {
    if (stage < 2) { onBell(); setStage(stage + 1); }
    else onDone();
  };
  const currentKey = keys[stage];
  const base = horizons?.[currentKey] || [];
  const mods = pressureMods?.[currentKey] || [];
  const showMirror = stage === 2 && mirrorRule && mirrorCombo && mirrorRule.combo === mirrorCombo;
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
        <Narration lines={base} />
        {mods.length > 0 && (
          <div style={{ marginTop: 6, padding: "14px 16px", borderRadius: 10, border: `1px dashed ${C.amber}`, background: "rgba(224,120,86,0.06)" }}>
            <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", color: C.amber, fontWeight: 700, marginBottom: 8 }}>Pressure carries into this horizon</div>
            {mods.map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "0 0 8px" }}>{l}</p>
            ))}
          </div>
        )}
        {showMirror && (
          <div style={{ marginTop: 16, padding: "18px 20px", borderRadius: 12, border: `1.5px solid ${C.tealMid}`, background: "rgba(94,234,212,0.06)" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, fontWeight: 700, marginBottom: 8, textAlign: "center", textTransform: "uppercase" }}>Mirror line</div>
            <p style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.6, margin: 0, textAlign: "center", fontStyle: "italic" }}>“{mirrorRule.line}”</p>
          </div>
        )}
      </div>
      <PrimaryButton onClick={advance}>{stage < 2 ? "Let time pass" : "What this may signal"}</PrimaryButton>
    </div>
  );
}

function Trajectory({ chosen, signalPanel = [] }) {
  // For M4, only three paths (a/b/c) — reuse the D-series shape but drop D.
  const paths = { a: [70, 55, 78, 55], b: [70, 78, 85, 92], c: [70, 66, 82, 90] };
  const W = 460, H = 160, padX = 30, padXRight = 50, padY = 18;
  const xs = [0, 1, 2].map((i) => padX + (i * (W - padX - padXRight)) / 2);
  const yFor = (v) => padY + ((100 - v) / 100) * (H - padY * 2 - 18);
  const pointsOf = (arr) => [arr[0], arr[1], arr[3]].map((v, i) => ({ x: xs[i], y: yFor(v) }));
  const labelOf = (k) => signalPanel.find((s) => s.key === k)?.title;
  const keys = Object.keys(paths);
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "18px 12px 14px" }}>
      <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: 4 }}>What HR, peers, and directors may have noticed</div>
      <div style={{ fontFamily: SANS, fontSize: 10, color: "rgba(255,255,255,0.35)", textAlign: "center", marginBottom: 10, letterSpacing: 0.4 }}>↑ daylight compounds · ↓ silence compounds</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        <line x1={padX} x2={W - padXRight} y1={yFor(70)} y2={yFor(70)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" />
        {[...keys.filter((k) => k !== chosen), ...(chosen ? [chosen] : [])].map((k) => {
          const pts = pointsOf(paths[k]);
          const isChosen = k === chosen;
          return (
            <polyline key={k} points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none"
              stroke={isChosen ? C.tealMid : "rgba(255,255,255,0.22)"} strokeWidth={isChosen ? 2.8 : 1.2}
              strokeLinecap="round" strokeLinejoin="round" className={reduceMotion ? "" : "bf-draw"} />
          );
        })}
        {keys.map((k) => {
          const end = pointsOf(paths[k])[2];
          const isChosen = k === chosen;
          return (
            <g key={`end-${k}`}>
              <circle cx={end.x} cy={end.y} r={isChosen ? 5 : 3} fill={isChosen ? C.tealMid : "rgba(255,255,255,0.35)"} />
              <text x={end.x + 10} y={end.y + 4} fill={isChosen ? C.tealMid : "rgba(255,255,255,0.55)"} fontSize={isChosen ? 13 : 11} fontWeight={isChosen ? 700 : 600} fontFamily={SANS}>{k.toUpperCase()}</text>
            </g>
          );
        })}
        {xs.map((x, i) => (
          <text key={i} x={x} y={H - 2} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily={SANS} textAnchor="middle">
            {["Same Day", "Next Week", "Month End"][i]}
          </text>
        ))}
      </svg>
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

/* ---- Grey-Zone Ledger — two-row mirror (LS1, LS2). Fills the same role as
   the BehaviourLab PatternLedger; columns per M4_CONTENT.segmentG.growthLog. */
function GreyZoneLedger({ rows = [], totalRows = 2, fullRecall = false }) {
  return (
    <div style={{ background: fullRecall ? C.white : "rgba(255,255,255,0.04)", borderRadius: 12, border: fullRecall ? `1px solid ${C.line}` : "none", overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", fontFamily: SANS, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: fullRecall ? C.teal : C.tealMid, borderBottom: `1px solid ${fullRecall ? C.line : "rgba(255,255,255,0.08)"}` }}>Grey-Zone Pattern Mirror</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 540, borderCollapse: "collapse", fontFamily: SANS, fontSize: 12.5 }}>
          <thead>
            <tr>
              {["Scenario", "Stance", "Visibility", "What compounds"].map((h) => (
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
                      <td style={{ padding: "10px 12px", color: soft, verticalAlign: "top", minWidth: 140 }}>{r.stance}</td>
                      <td style={{ padding: "10px 12px", color: txt, verticalAlign: "top", minWidth: 150 }}>{r.visibility}</td>
                      <td style={{ padding: "10px 12px", color: fullRecall ? C.tealDeep : C.tealMid, verticalAlign: "top", minWidth: 160 }}>{r.compounds}</td>
                    </>
                  ) : (
                    <td colSpan={4} style={{ padding: "14px 12px", color: fullRecall ? "#CBD5E1" : "rgba(255,255,255,0.18)", fontStyle: "italic", fontSize: 12 }}>{i === 0 ? "LS1 — not yet rehearsed" : "LS2 — not yet rehearsed"}</td>
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

/* ---- T3A logo — real image mark (per Tony rectification). ---- */
function T3ALogo({ size = 56 }) {
  return (
    <img src={(import.meta.env.BASE_URL || "/") + "logo.jpeg"} alt="The 3rd Academy"
      width={size} height={size}
      style={{ display: "block", margin: "0 auto", width: size, height: size, objectFit: "contain", borderRadius: 6 }} />
  );
}

function CoverPage({ onContinue }) {
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center", paddingTop: 30 }}>
        <T3ALogo size={72} />
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 4, color: C.tealMid, marginTop: 22 }}>THE 3RD ACADEMY</div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>M4 — AI GREY ZONE · AIWORKLAB</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, color: C.white, lineHeight: 1.25, margin: "28px 0 14px" }}>
          AI Grey Zone
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: 440, margin: "0 auto" }}>
          A behavioural rehearsal under AI-assisted conditions. Forty-five minutes. Private practice. No scores. No pass or fail.
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

function EnterScreen({ onBegin }) {
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center" }}>
        <T3ALogo size={48} />
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 3, color: C.tealMid, marginTop: 18, marginBottom: 18 }}>THE 3RD ACADEMY</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: C.white, lineHeight: 1.4, marginBottom: 10 }}>M4 — AI Grey Zone · AIWorkLab</h1>
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

/* ---- G-1.5 Framework Return (Daylight Rule). Same shape as D-series. ---- */
function FrameworkReturnScreen({ content, onDone }) {
  const piper = usePiper();
  const playedRef = useRef(false);
  const seconds = content?.durationSeconds || 25;
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (!playedRef.current && content && content.lead) {
      playedRef.current = true;
      const text = [content.lead, content.body, ...(content.steps || []), content.tagline, content.carryForward]
        .filter(Boolean).join("\n\n");
      piper.speak(text, { intro: false, outro: false }).catch(() => {});
    }
    const tFade = setTimeout(() => setFading(true), Math.max(0, (seconds - 0.6) * 1000));
    const tDone = setTimeout(() => { piper.stop(); onDone(); }, seconds * 1000);
    return () => { clearTimeout(tFade); clearTimeout(tDone); piper.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center", opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>{content?.lead}</p>
        <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.78)", marginBottom: 30, lineHeight: 1.6 }}>{content?.body}</p>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 16 }}>THE DAYLIGHT RULE</div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px 22px", marginBottom: 26 }}>
          {(content?.steps || []).map((s, i) => (
            <span key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: "clamp(22px, 5.5vw, 28px)", color: C.white, animationDelay: `${0.8 + i * 0.5}s`, fontWeight: 500 }}>{s}</span>
          ))}
        </div>
        {content?.tagline && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, marginBottom: 22, animationDelay: "3.4s" }}>{content.tagline}</p>
        )}
        {content?.carryForward && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto", animationDelay: "4.2s" }}>{content.carryForward}</p>
        )}
        <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginTop: 30 }}>The closing continues in a moment.</p>
      </div>
    </Stage>
  );
}

/* ---- Awe Close — M4 variant.
   Per script §G.2: bell does NOT sound on the awe couplet transition.
   The silence is the point. Beat 1 = bookend central question. Beat 2 =
   silence. Beat 3 = two-line awe couplet + final personal sentence prompt. */
function AweClose({ content, aweCouplet, suppressBell, onMotif, onDone, persistKey }) {
  const [beat, setBeat] = useState(1);
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => { setBeat(2); if (!suppressBell) onMotif(); }, reduceMotion ? 600 : 4000);
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
            {aweCouplet && (
              <div style={{ marginBottom: 32 }}>
                {aweCouplet.map((line, i) => (
                  <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.6, margin: "0 0 4px", fontWeight: 500, animationDelay: `${i * 0.4}s` }}>{line}</p>
                ))}
              </div>
            )}
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

/* ---- Artifact frame — same monospaced labeled card as D-series (Tony rectification). */
function Artifact({ caption, title, children, mono }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)", marginTop: 12 }}>
      {caption && (
        <div style={{ padding: "6px 12px", background: "rgba(94,234,212,0.08)", fontFamily: SANS, fontSize: 10.5, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, borderBottom: "1px solid rgba(94,234,212,0.14)" }}>{caption}</div>
      )}
      <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{title}</div>
      <div style={{ padding: 12, fontFamily: mono ? MONO : SANS, fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, whiteSpace: mono ? "pre-wrap" : "normal" }}>{children}</div>
    </div>
  );
}

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

/* ============================================================================
   FLOW CONTROLLER — M4 screen map:
     enter, cover, a0, a1 (cold open inspect surface), a2 (same-day
     micro-consequence), a3 (safety floor), a4 (central question),
     b1 (behaviour standard intro), b2 (grey-zone standard panel),
     b3 (refuses panel), b4 (reflection),
     c1_1 (recognition brief 1 narration + tagline), c1_2 (reflection),
     c2_1 (Daylight Rule reveal), c2_cqreturn, c_complete, break_1,
     ls_intro (Scenario Lab intro), ls_callback, ls_inspect, ls_decide,
     ls_artifact, ls_pressure, ls_consequence, ls_signal, ls_reflection,
     ls_ledger, e_signature (after LS2),
     f1, f1_q1..f1_q3, f1_close, f2, f2_q1..f2_q3, f2_close, f_closing,
     f_complete, break_4,
     g1 (recognition), g15 (framework return), g2 (Growth Log),
     g3 (retention check), g4 (Awe close), done.
   ========================================================================== */
const SEGMENT_LABEL = {
  cover: "Cover", a: "Segment A", b: "Segment B", c: "Segment C",
  e: "Segment E", f: "Segment F", g: "Segment G",
  break: "",
};
function segmentOf(screen) {
  if (screen === "cover" || screen === "enter") return "cover";
  if (screen.startsWith("break_")) return "break";
  if (screen.startsWith("a")) return "a";
  if (screen.startsWith("b")) return "b";
  if (screen.startsWith("c")) return "c";
  if (screen.startsWith("ls_") || screen === "ls_intro" || screen === "e_signature") return "e";
  if (screen.startsWith("f")) return "f";
  if (screen.startsWith("g") || screen === "done") return "g";
  return "";
}

const initialState = {
  screen: "enter",
  history: [],
  paused: false,
  coldOpenPath: null,
  coldOpenJustification: "",
  // Segment E — layered scenarios track two decides + two pressures.
  lsIndex: 0,
  lsDecide: null,       // current LS decide path
  lsPressure: null,     // current LS pressure path
  lsDecidesHistory: [], // [ls1Decide, ls2Decide]
  lsPressuresHistory: [], // [ls1Pressure, ls2Pressure]
  ledger: [],
  finalSentence: "",
  analyses: [],
  segmentBReflection: "",
  segmentCResponses: {},
  segmentFAnswers: { f1: [], f2: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "PAUSE": return { ...state, paused: true };
    case "RESUME": return { ...state, paused: false };
    case "GOTO": return { ...state, screen: action.screen, history: [...state.history, state.screen] };
    case "BACK": {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return { ...state, screen: prev, history: state.history.slice(0, -1) };
    }
    case "RESET": return { ...initialState, screen: "cover" };
    case "COLD_OPEN": return { ...state, coldOpenPath: action.path, coldOpenJustification: action.justification || "", screen: "a2", history: [...state.history, state.screen] };
    case "LS_DECIDE": return { ...state, lsDecide: action.path };
    case "LS_PRESSURE": return { ...state, lsPressure: action.path };
    case "ANALYZE_ADD": return { ...state, analyses: [...state.analyses, action.analysis] };
    case "NEXT_LS":
      return {
        ...state,
        lsIndex: state.lsIndex + 1,
        lsDecidesHistory: [...state.lsDecidesHistory, state.lsDecide],
        lsPressuresHistory: [...state.lsPressuresHistory, state.lsPressure],
        lsDecide: null,
        lsPressure: null,
        screen: "ls_callback",
        history: [...state.history, state.screen],
      };
    case "LEDGER_ADD": return { ...state, ledger: [...state.ledger, action.row] };
    case "FINAL": return { ...state, finalSentence: action.text };
    case "SET_B_REFLECTION": return { ...state, segmentBReflection: action.text };
    case "SET_C_RESPONSE": return { ...state, segmentCResponses: { ...state.segmentCResponses, [action.key]: action.value } };
    case "SET_F_ANSWER": {
      const f = state.segmentFAnswers;
      return { ...state, segmentFAnswers: { ...f, [action.exercise]: [...f[action.exercise], action.value] } };
    }
    default: return state;
  }
}

export default function BridgeFastM4ModuleRoot() {
  return (
    <ModuleErrorBoundary>
      <PiperProvider>
        <BridgeFastM4Module />
      </PiperProvider>
    </ModuleErrorBoundary>
  );
}

function BridgeFastM4Module() {
  const [st, dispatch] = useReducer(reducer, initialState);
  const audio = useAudio();
  const piper = usePiper();
  const [a0phase, setA0phase] = useState(0);

  const onPause = useCallback(() => {
    piper.stop();
    dispatch({ type: "PAUSE" });
  }, [piper]);

  const C0 = M4_CONTENT.segmentA.coldOpen;
  const LS = LAYERED_SCENARIOS[st.lsIndex] || LAYERED_SCENARIOS[0];
  const SG = M4_CONTENT.segmentG;

  const goto = (screen) => dispatch({ type: "GOTO", screen });
  const back = () => dispatch({ type: "BACK" });
  const decidePath = st.lsDecide;
  const pressurePath = st.lsPressure;
  const cons = decidePath ? LS?.consequences?.[decidePath] : null;

  // A-0 cinematic timing
  useEffect(() => {
    if (st.screen !== "a0") return;
    audio.playMotif();
    const t1 = setTimeout(() => setA0phase(1), reduceMotion ? 200 : 1500);
    const t2 = setTimeout(() => setA0phase(2), reduceMotion ? 400 : 4000);
    const t3 = setTimeout(() => dispatch({ type: "GOTO", screen: "a1" }), reduceMotion ? 600 : 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [st.screen]);

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
            {M4_CONTENT.dimension.central_question}
          </div>
        </div>
      </div>
    );
  }

  else if (st.screen === "a1") {
    // A-1 — the Wednesday afternoon cold open scene.
    // D1 callback fallback banner + narration + on-scene artifacts + Pranav
    // banner + Decision.
    // TODO(cross-module-memory): once prior.D1.final_personal_sentence is
    // available in the browser store, stitch the personalized wrapper +
    // sentence + tail as a three-part narration; MVP uses the fallback only.
    const cb = C0.d1Callback;
    const callbackFallback = cb?.fallback || "";
    body = (
      <Stage>
        {cb && (
          <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>D1 → M4 · Callback (Beat 1)</div>
            <AVPlaceholder label="Beat 1 · D1 callback (fallback variant — MVP)" text={callbackFallback} />
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "8px 0 0" }}>
              {callbackFallback}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: "10px 0 0" }}>
              When the cross-module memory store is wired up, this beat will play with the participant's own D1 final sentence read back to them. For MVP, the standalone fallback plays.
            </p>
          </div>
        )}
        <AVPlaceholder label="Beat 2 · Wednesday afternoon cold open" text={C0.narration.join("\n\n")} />
        <Narration lines={C0.narration} speakable={false} />
        <Artifact caption="Left window — AI productivity dashboard (dominant)"
          title="WorkPattern Engine · Q4 Performance Indicators · Devon Park" mono>
{`Direct Report: Devon Park · Engineer II
Recommendation: Consider Performance Improvement Plan (PIP)
Risk score: 0.78 (PIP threshold: 0.70)

FLAGGED SIGNALS (last 90 days):
  • Commit frequency: 18 per month · Team average: 42
  • Code review activity: 6 PRs reviewed · Team average: 19
  • Meeting attendance: 92% · Team average: 88% (no flag)
  • Slack response time: median 47 min · Team average: 12 min

Comparable cohort: Engineer IIs with similar metric profile
in prior quarters · 72% placed on PIP within 60 days

[Status: AWAITING MANAGER RECOMMENDATION]`}
        </Artifact>
        <Artifact caption="Right window — Slack DM from HR"
          title="Slack · Naomi Choi (HR Business Partner) · 3:46 PM" mono>
{`Hi! Hope you're settling in well as a manager. Quick one —
WorkPattern Engine flagged Devon Park for PIP consideration
this morning. I'm batching manager recommendations tonight
at 8 PM so we can move on Q4 actions Monday. Could you
confirm your read by then? If you agree, we'll prep PIP
paperwork over the weekend. If you disagree, just send a
quick note with your reasoning.

Naomi · HR Business Partner · she/her`}
        </Artifact>
        <Artifact caption="Surfaces briefly — your own 1:1 notes"
          title="Notes — Devon 1:1 · October 12" mono>
{`...assigned Devon as sole owner of Q4 data-pipeline
migration. Discussed: blocking all PRs from team until end
Nov to avoid merge conflicts. Devon flagged this would
slow his commit cadence visibly during the freeze. Agreed
it was acceptable because the migration unblocks 40% of
Q1 work...

[The note fades after 4 seconds. The dashboard remains.]`}
        </Artifact>
        <div style={{ margin: "18px 0 0", padding: "14px 16px", borderRadius: 10, border: `1px solid ${C.amber}`, background: "rgba(224,120,86,0.08)" }}>
          <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.5, color: C.amber, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Incoming — top-right Slack banner</div>
          <div style={{ fontFamily: SANS, fontSize: 12.5, color: C.white, marginBottom: 4, fontWeight: 700 }}>{C0.pranavBanner?.header}</div>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "0 0 6px" }}>{C0.pranavBanner?.body}</p>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, fontStyle: "italic", margin: 0 }}>{C0.pranavBanner?.footnote}</p>
        </div>
        <div style={{ marginTop: 22 }}>
          <Decision persistKey={st.screen} prompt={C0.decisionPrompt} options={C0.options} justificationPrompt={C0.justificationPrompt}
            audioLabel="Decision Beat 1 prompt" audioText={C0.decisionPrompt}
            onSubmit={(p, j) => dispatch({ type: "COLD_OPEN", path: p, justification: j })} />
        </div>
      </Stage>
    );
  }

  else if (st.screen === "a2") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>First ripple — same day</div>
        <Narration lines={C0.sameDay[st.coldOpenPath] || []} />
        <PrimaryButton onClick={() => goto("a3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "a3") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, textAlign: "center", marginBottom: 24 }}>That was rehearsal.</p>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 22, borderLeft: `3px solid ${C.teal}` }}>
          {M4_CONTENT.segmentA.safetyFloor.card.map((l, i) => (
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
        <AVPlaceholder label="The central question" text={M4_CONTENT.dimension.central_question} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>THE QUESTION THAT RUNS THROUGH THIS MODULE</div>
          <p style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.5 }}>{M4_CONTENT.dimension.central_question}</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, marginTop: 14 }}>This is rehearsal. Nothing is graded. Take the time you would actually take.</p>
          <PrimaryButton onClick={() => goto("b1")}>Continue</PrimaryButton>
        </div>
      </Stage>
    );
  }

  /* ============== SEGMENT B ============== */
  else if (st.screen === "b1") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT B · BEHAVIOUR STANDARD</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 24 }}>The grey-zone standard, plainly stated</h2>
        <AVPlaceholder label="B-1 · what you just lived through" text={M4_CONTENT.segmentB.intro.join("\n\n")} />
        <Narration lines={M4_CONTENT.segmentB.intro} speakable={false} />
        <PrimaryButton onClick={() => goto("b2")}>Open the standard</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b2") {
    const std = M4_CONTENT.segmentB.fieldGuide.standard;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>THE GREY-ZONE STANDARD, UNDER AI-ASSISTED WORK</div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 20, borderLeft: `3px solid ${C.tealMid}`, marginBottom: 22 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {std.bullets.map((b, i) => (
              <li key={i} style={{ fontFamily: SERIF, fontSize: 16.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.65, marginBottom: 12, paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: C.tealMid, fontWeight: 700 }}>•</span>{b}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: C.tealMid, lineHeight: 1.65, marginTop: 16, marginBottom: 0 }}>{std.italicTagline}</p>
        </div>
        <PrimaryButton onClick={() => goto("b3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b3") {
    const rf = M4_CONTENT.segmentB.fieldGuide.refuses;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.amber, marginBottom: 10 }}>WHAT THIS STANDARD REFUSES</div>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 20, borderLeft: `3px solid ${C.amber}`, marginBottom: 22 }}>
          {rf.items.map((it, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: SERIF, fontSize: 15.5, color: C.white, marginBottom: 4 }}>{it.h}</div>
              <div style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{it.t}</div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("b4")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b4") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>B · REFLECTION</div>
        <Reflection persistKey={st.screen} prompt={M4_CONTENT.segmentB.reflectionPrompt} minChars={30} onDone={(text) => {
          dispatch({ type: "SET_B_REFLECTION", text });
          goto("c1_1");
        }} />
      </Stage>
    );
  }

  /* ============== SEGMENT C — RECOGNITION BRIEFS ============== */
  else if (st.screen === "c1_1") {
    const c1 = M4_CONTENT.segmentC.c1;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c1.title}</h2>
        <AVPlaceholder label="C1 narration · part 1 (pre-tagline)" text={c1.narration.join("\n\n")} />
        <Narration lines={c1.narration} speakable={false} />
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: "18px 22px", margin: "18px 0", textAlign: "center" }}>
          <div style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.5, marginBottom: 8, fontWeight: 500 }}>{c1.tagline}</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>{c1.close}</div>
        </div>
        <AVPlaceholder label="C1 narration · part 2 (post-tagline)" text={c1.close} />
        <PrimaryButton onClick={() => goto("c1_2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c1_2") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>C1 · REFLECTION</div>
        <Reflection persistKey={st.screen} prompt="Think of a grey-zone moment where the AI tool spoke with confidence and the deadline closed anyway. What did you use to decide — the tool's confidence, the peer's example, the clock, or something you already knew?" minChars={30} onDone={(text) => {
          dispatch({ type: "SET_C_RESPONSE", key: "c1", value: text });
          goto("c2_1");
        }} />
      </Stage>
    );
  }

  else if (st.screen === "c2_1") {
    const c2 = M4_CONTENT.segmentC.c2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 2 of 2 · FRAMEWORK REVEAL</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c2.title}</h2>
        <ClickToReveal buttonLabel="Reveal The Daylight Rule">
          <div style={{ textAlign: "center", padding: "28px 16px", background: C.paper, color: C.ink, borderRadius: 12, margin: "0 0 24px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 14 }}>THE DAYLIGHT RULE</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "6px 10px", fontFamily: SERIF, fontSize: "clamp(19px, 6vw, 26px)", color: C.teal, fontWeight: 600 }}>
              {c2.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <span className="bf-fade" style={{ animationDelay: `${i * 0.6}s` }}>{s.name.replace(/\.$/, "")}</span>
                  {i < c2.steps.length - 1 && <span style={{ color: C.inkSoft }}>→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <AVPlaceholder label="C2 narration · Daylight Rule reveal" text={c2.narration.join("\n\n")} />
          {c2.steps.map((s) => (
            <div key={s.name} style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: SERIF, fontSize: 18, color: C.tealMid, marginBottom: 6, fontWeight: 600 }}>{s.name}</div>
              <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
            </div>
          ))}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.65, marginTop: 18 }}>The Daylight Rule is what was missing in the manager who answered fast and silently.</p>
          <PrimaryButton onClick={() => goto("c2_cqreturn")}>Continue</PrimaryButton>
        </ClickToReveal>
      </Stage>
    );
  }

  else if (st.screen === "c2_cqreturn") {
    const cq = M4_CONTENT.segmentC.c2.centralQuestionReturn;
    const audioText = [cq.opener, cq.echo, cq.closing].join("\n\n");
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>C2 · PART 3 · THE CENTRAL QUESTION RETURNS</div>
        <AVPlaceholder label={cq.label} text={audioText} />
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, textAlign: "center", marginBottom: 28 }}>{cq.opener}</p>
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "28px 22px", textAlign: "center", margin: "0 0 26px" }}>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: C.white, lineHeight: 1.5, margin: 0 }}>{cq.echo}</p>
        </div>
        <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>{cq.closing}</p>
        <PrimaryButton onClick={() => goto("c_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT C → E — CLOSE AND PAUSE INVITATION ============== */
  else if (st.screen === "c_complete") {
    const cc = M4_CONTENT.segmentC.complete;
    const sb = cc.scopeBoundaries;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT C · COMPLETE · TRANSITION TO SEGMENT E</div>
        <AVPlaceholder label={cc.label} text={cc.narration.join("\n\n")} />
        {cc.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        {sb && (
          <div style={{ marginTop: 30, padding: "22px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>Scope notice</div>
            <h3 style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.4, margin: "0 0 14px" }}>{sb.title}</h3>
            <AVPlaceholder label="Scope notice — narrated" text={sb.paragraphs.join("\n\n")} />
            {sb.paragraphs.map((p, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, margin: "0 0 12px" }}>{p}</p>
            ))}
          </div>
        )}
        <PrimaryButton onClick={() => goto("break_1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "break_1") {
    const bp = M4_CONTENT.segmentC.breakPoint1;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: 16, background: C.amber, color: C.navy, fontFamily: SANS, fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>{bp.title}</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
          <span style={{ fontFamily: SANS, fontSize: 11.5, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>{bp.elapsedLabel}</span>
          <span style={{ fontFamily: SANS, fontSize: 11.5, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>{bp.remainingLabel}</span>
        </div>
        <AVPlaceholder label={bp.label} text={bp.avatarScript.join("\n\n")} />
        {bp.avatarScript.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginBottom: 14, animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
          <button onClick={() => goto("ls_intro")}
            style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.white, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
            {bp.continueLabel}
          </button>
          <button onClick={onPause}
            style={{ minHeight: 48, borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "transparent", color: C.tealMid, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
            {bp.returnLaterLabel}
          </button>
        </div>
      </Stage>
    );
  }

  /* ============== SEGMENT E — LAYERED SCENARIO LAB ============== */
  else if (st.screen === "ls_intro") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · AIWORKLAB™ LAYERED SCENARIO LAB</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, textAlign: "center", marginBottom: 20 }}>Two layered scenarios. Two decides. Two pressures.</h2>
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, textAlign: "center" }}>
          LS1 opens where the cold open opened — Wednesday afternoon, the PIP recommendation.<br/>
          LS2 opens the following Monday morning — a peer manager's tool sitting at the top of your inbox.<br/>
          What you decide in the first will still be in the room in the second.
        </p>
        <SectorAssignment module={M4_CONTENT.module} />
        <PrimaryButton onClick={() => goto("ls_callback")}>Begin LS1</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls_callback") {
    const isLS2 = st.lsIndex === 1;
    const ls1Path = st.lsDecidesHistory[0] || null;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>LAYERED SCENARIO {st.lsIndex + 1} OF 2 · {LS.id}</div>
        {!isLS2 && (
          <>
            <Narration lines={LS.callback} />
            <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "16px 0", fontFamily: SERIF, fontStyle: "italic", color: "rgba(255,255,255,0.85)", fontSize: 14.5, lineHeight: 1.6 }}>
              You have been here before. Now you see the full arc. Same path, or different — notice whether your reasoning has changed.
            </div>
          </>
        )}
        {isLS2 && (
          <>
            <Narration lines={LS.callback} />
            {/* Intra-module residue banner — TODO(cross-module-memory)
               fallback: reads LS1 decide from st.lsDecidesHistory. */}
            {ls1Path && LS.intraModuleResidue?.[ls1Path] && (
              <div style={{ background: "rgba(13,148,136,0.08)", border: `1px dashed ${C.tealMid}`, borderRadius: 10, padding: 14, margin: "12px 0 16px" }}>
                <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Intra-module residue · from LS1</div>
                <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, margin: 0 }}>{LS.intraModuleResidue[ls1Path]}</p>
                <p style={{ fontFamily: SANS, fontSize: 10.5, color: "rgba(255,255,255,0.4)", marginTop: 6, lineHeight: 1.55, fontStyle: "italic" }}>Pranav's Saturday follow-on drifts by what you did on Wednesday. The workplace continues — never a system response.</p>
              </div>
            )}
          </>
        )}
        <Narration lines={LS.intro} />
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, margin: "14px 0", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{LS.briefing}</div>
        <PrimaryButton onClick={() => goto("ls_inspect")}>Open the Inspect Surface</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls_inspect") {
    // Inspect Beat — MOAT-CRITICAL source-artifact surface. Three labelled
    // monospaced cards + fixed countdown banner + on-screen instruction.
    const isp = LS.inspect;
    const ls1Path = st.lsDecidesHistory[0] || null;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 10, fontWeight: 700 }}>INSPECT BEAT · {isp.label}</div>
        <div style={{ background: "rgba(224,120,86,0.1)", border: `1px solid ${C.amber}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: SANS, fontSize: 12.5, color: C.amber, textAlign: "center", letterSpacing: 0.5, fontWeight: 700 }}>
          ⏱ {isp.countdown}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.65, marginBottom: 12 }}>{isp.instruction}</p>
        <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, marginBottom: 18 }}>Mobile mode: {isp.mobileMode}.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {isp.artifacts.map((a, i) => {
            // LS2 renders Pranav's residue inline in the first artifact card.
            const isPranavCard = st.lsIndex === 1 && i === 0;
            return (
              <Artifact key={i} caption={a.caption} title={a.title} mono={a.mono}>
                {a.lines.map((line, j) => {
                  if (isPranavCard && ls1Path && line && line.startsWith("// LS1 residue")) {
                    const residueLine = LS.intraModuleResidue?.[ls1Path] || "";
                    return residueLine ? <div key={j} style={{ color: C.tealMid, whiteSpace: "pre-wrap" }}>{residueLine}</div> : null;
                  }
                  return <div key={j}>{line || " "}</div>;
                })}
              </Artifact>
            );
          })}
        </div>
        {isp.closingObservation && (
          <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 10, background: "rgba(13,148,136,0.08)", border: `1px solid ${C.tealMid}` }}>
            <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>What the Inspect Surface is showing you</div>
            <p style={{ fontFamily: SERIF, fontSize: 15.5, color: C.white, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>{isp.closingObservation}</p>
          </div>
        )}
        <PrimaryButton onClick={() => goto("ls_decide")}>Continue to the Decide beat</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls_decide") {
    // LS2's Decide prompt drifts by LS1 path (intra-module memory thread 2).
    const dc = LS.decide;
    const ls1Path = st.lsDecidesHistory[0] || null;
    const prompt = dc.promptByLs1 ? (dc.promptByLs1[ls1Path] || dc.promptByLs1.a) : dc.prompt;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 14, fontWeight: 700 }}>DECIDE BEAT · {LS.id}</div>
        <Decision persistKey={st.screen} prompt={prompt} options={dc.options} justificationPrompt={dc.justificationPrompt}
          audioLabel={`${LS.id} · Decide prompt`} audioText={prompt}
          onSubmit={(p, j) => {
            dispatch({ type: "LS_DECIDE", path: p });
            const a = localAnalyze(j);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `${LS.id} · Decide`, path: p } });
            goto("ls_artifact");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "ls_artifact") {
    const aw = LS.decide.artifactWrite?.[decidePath];
    const refs = LS.decide.references?.[decidePath];
    const closing = LS.decide.references?.closing;
    if (!aw) {
      // Defensive — some paths may not have an artifact-write (schema silent).
      // Render a continue button instead of dispatching a goto during render.
      body = (
        <Stage narrow>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>No artifact-write on this path — continue to the Pressure beat.</p>
          <PrimaryButton onClick={() => goto("ls_pressure")}>Continue</PrimaryButton>
        </Stage>
      );
    } else body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 14, fontWeight: 700 }}>DECIDE BEAT · ARTIFACT WRITE</div>
        <ArtifactWrite persistKey={st.screen} prompt={aw.prompt} submitLabel={aw.submit} references={refs} refKind={refs ? "list" : "card"} closing={closing}
          onDone={(txt) => {
            const a = localAnalyze(txt);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `${LS.id} · Artifact`, path: decidePath } });
            goto("ls_pressure");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "ls_pressure") {
    // Pressure Beat — script §Pressure. LS1 is identity/role (Pranav);
    // LS2 is epistemic (HR Tech Weekly newsletter).
    const pr = LS.pressure;
    // Trigger content differs across LS1 (per Decide path) and LS2 (single
    // trigger regardless of Decide).
    let triggerLines = [];
    if (Array.isArray(pr.trigger)) triggerLines = pr.trigger;
    else if (pr.trigger && typeof pr.trigger === "object") triggerLines = pr.trigger[decidePath] || pr.trigger.a || [];
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.amber, marginBottom: 14, fontWeight: 700 }}>PRESSURE BEAT · {pr.typeLabel.toUpperCase()}</div>
        {pr.countdown && (
          <div style={{ background: "rgba(224,120,86,0.1)", border: `1px solid ${C.amber}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: SANS, fontSize: 12.5, color: C.amber, textAlign: "center", letterSpacing: 0.5, fontWeight: 700 }}>
            ⏱ {pr.countdown}
          </div>
        )}
        {pr.calendarReminder && (
          <div style={{ background: "rgba(224,120,86,0.1)", border: `1px solid ${C.amber}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: SANS, fontSize: 12.5, color: C.amber, textAlign: "center", letterSpacing: 0.5, fontWeight: 700 }}>
            📅 {pr.calendarReminder}
          </div>
        )}
        <AVPlaceholder label={`${LS.id} · Pressure trigger`} text={triggerLines.join("\n\n")} />
        <Narration lines={triggerLines} speakable={false} />
        <div style={{ marginTop: 18 }}>
          <Decision persistKey={st.screen} prompt={pr.prompt} options={pr.options} justificationPrompt={pr.justificationPrompt}
            audioLabel={`${LS.id} · Pressure prompt`} audioText={pr.prompt}
            onSubmit={(p, j) => {
              dispatch({ type: "LS_PRESSURE", path: p });
              const a = localAnalyze(j);
              dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `${LS.id} · Pressure`, path: p } });
              goto("ls_consequence");
            }} />
        </div>
      </Stage>
    );
  }

  else if (st.screen === "ls_consequence") {
    const mods = cons?.pressureMods?.[pressurePath];
    const combo = `${decidePath}${pressurePath}`;
    const mirror = cons?.mirrorRule;
    body = (
      <Stage>
        <ConsequenceReveal horizons={cons} pressureMods={mods} mirrorRule={mirror} mirrorCombo={combo}
          onBell={audio.strikeBell} onDone={() => goto("ls_signal")} />
      </Stage>
    );
  }

  else if (st.screen === "ls_signal") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>What each path may have communicated</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LS.signalPanel.map((s) => {
            const chosen = s.key === decidePath;
            return (
              <div key={s.key} style={{ borderRadius: 10, padding: 14, background: chosen ? "rgba(13,148,136,0.1)" : "rgba(255,255,255,0.03)", border: chosen ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: chosen ? C.tealMid : "rgba(255,255,255,0.8)", marginBottom: 5 }}>Path {s.key.toUpperCase()} — {s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Signal: {s.signal}</div>
                {s.effect && <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 22 }}><Trajectory chosen={decidePath} signalPanel={LS.signalPanel} /></div>
        {cons?.manager && (
          <div style={{ marginTop: 22, padding: "16px 18px", borderRadius: 10, background: "rgba(255,255,255,0.04)", borderLeft: `3px solid ${C.tealMid}` }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 8, textTransform: "uppercase" }}>Manager Lens</div>
            <p style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{cons.manager}</p>
          </div>
        )}
        <PrimaryButton onClick={() => goto("ls_reflection")}>Reflect</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls_reflection") {
    body = (
      <Stage narrow>
        <Reflection persistKey={st.screen} prompt={LS.reflection} onDone={() => {
          dispatch({
            type: "LEDGER_ADD",
            row: {
              sc: LS.id,
              title: LS.title,
              stance: cons?.outcome || "",
              visibility: cons?.interp || "",
              compounds: cons?.others || "",
            },
          });
          goto("ls_ledger");
        }} />
      </Stage>
    );
  }

  else if (st.screen === "ls_ledger") {
    const moreLS = st.lsIndex < LAYERED_SCENARIOS.length - 1;
    const nextLS = moreLS ? LAYERED_SCENARIOS[st.lsIndex + 1] : null;
    const onContinue = moreLS ? () => dispatch({ type: "NEXT_LS" }) : () => goto("e_signature");
    body = (
      <Stage>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 18, textAlign: "center" }}>
          {st.ledger.length >= 2 ? "Your grey-zone pattern is becoming visible." : "Your grey-zone pattern is beginning to form."}
        </div>
        <GreyZoneLedger rows={st.ledger} totalRows={2} />
        {moreLS && nextLS && (
          <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "rgba(94,234,212,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, textTransform: "uppercase" }}>UP NEXT · LS{st.lsIndex + 2} OF 2</span>
              <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Monday morning. Same workplace. Different pressure.</span>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.4, marginBottom: 4 }}>{nextLS.title}</div>
            {nextLS.commitment && (
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>{nextLS.commitment}</div>
            )}
            <p style={{ fontFamily: SANS, fontSize: 12, color: C.tealMid, marginTop: 10, marginBottom: 0, lineHeight: 1.55 }}>
              How you handled this carries forward. The next scenario opens differently because of it.
            </p>
          </div>
        )}
        <PrimaryButton onClick={onContinue}>
          {moreLS ? `Carry it forward → LS${st.lsIndex + 2}` : "Continue to micro-drills"}
        </PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "e_signature") {
    const decides = [...st.lsDecidesHistory, st.lsDecide].filter(Boolean);
    const pressures = [...st.lsPressuresHistory, st.lsPressure].filter(Boolean);
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · COMPLETE · YOUR GREY-ZONE SIGNATURE</div>
        <GreyZoneSignaturePanel decides={decides} pressures={pressures} theme="dark" />
        <PrimaryButton onClick={() => goto("f1")}>Continue to micro-drills</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT F — MICRO-DRILLS ============== */
  else if (st.screen === "f1") {
    const f1 = M4_CONTENT.segmentF.f1;
    const osh = f1.onScreenHeader;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f1.title}</h2>
        <AVPlaceholder label="F1 introduction" text={f1.audioIntro} />
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px", margin: "16px 0 18px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 12, textAlign: "center" }}>{osh.title}</div>
          {osh.lines.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, textAlign: "center", margin: "0 0 8px" }}>{l}</p>
          ))}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "center", margin: "12px 0 0" }}>{osh.cta}</p>
        </div>
        <PrimaryButton onClick={() => goto("f1_q1")}>Begin</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen.startsWith("f1_q")) {
    const idx = parseInt(st.screen.slice(4), 10) - 1;
    const f1 = M4_CONTENT.segmentF.f1;
    const item = f1.items[idx];
    const next = idx < f1.items.length - 1 ? `f1_q${idx + 2}` : "f1_close";
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>F1 · {idx + 1} of {f1.items.length}</div>
        <SingleChoiceCard key={st.screen} vignette={item.vignette} options={f1.options} answer={item.answer} feedback={item.feedback}
          onContinue={() => {
            dispatch({ type: "SET_F_ANSWER", exercise: "f1", value: { idx, answer: item.answer } });
            goto(next);
          }} />
      </Stage>
    );
  }

  else if (st.screen === "f1_close") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 26, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{M4_CONTENT.segmentF.f1.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2")}>Continue to F2</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f2") {
    const f2 = M4_CONTENT.segmentF.f2;
    const osh = f2.onScreenHeader;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 2 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f2.title}</h2>
        <AVPlaceholder label="F2 introduction" text={f2.audioIntro} />
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px", margin: "16px 0 18px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 12, textAlign: "center" }}>{osh.title}</div>
          {osh.lines.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, textAlign: "center", margin: "0 0 8px" }}>{l}</p>
          ))}
          {osh.showOptionsRow && (
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "6px 12px", marginTop: 6 }}>
              {f2.options.map((o, i) => (
                <React.Fragment key={o}>
                  <span style={{ fontFamily: SERIF, fontSize: 15.5, color: C.tealMid }}>{o}</span>
                  {i < f2.options.length - 1 && <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>}
                </React.Fragment>
              ))}
            </div>
          )}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "center", margin: "14px 0 0" }}>{osh.cta}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2_q1")}>Begin</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen.startsWith("f2_q")) {
    const idx = parseInt(st.screen.slice(4), 10) - 1;
    const f2 = M4_CONTENT.segmentF.f2;
    const item = f2.items[idx];
    const next = idx < f2.items.length - 1 ? `f2_q${idx + 2}` : "f2_close";
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>F2 · {idx + 1} of {f2.items.length}</div>
        <SingleChoiceCard key={st.screen} vignette={item.vignette} options={f2.options} answer={item.answer} feedback={item.feedback}
          onContinue={() => {
            dispatch({ type: "SET_F_ANSWER", exercise: "f2", value: { idx, answer: item.answer } });
            goto(next);
          }} />
      </Stage>
    );
  }

  else if (st.screen === "f2_close") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 26, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{M4_CONTENT.segmentF.f2.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto(M4_CONTENT.segmentF.closingReflection ? "f_closing" : "f_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f_closing") {
    const cr = M4_CONTENT.segmentF.closingReflection;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>SEGMENT F · CLOSING REFLECTION</div>
        <AVPlaceholder label="F closing reflection prompt" text={cr.prompt} />
        <Reflection persistKey={st.screen} prompt={cr.prompt} minChars={20} onDone={() => goto("f_complete")} />
      </Stage>
    );
  }

  else if (st.screen === "f_complete") {
    const fc = M4_CONTENT.segmentF.complete;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT F · COMPLETE · TRANSITION TO SEGMENT G</div>
        <AVPlaceholder label={fc.label} text={fc.narration.join("\n\n")} />
        {fc.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <PrimaryButton onClick={() => goto("break_4")}>{fc.continueLabel}</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "break_4") {
    const bp = SG.breakPoint4;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: 16, background: C.amber, color: C.navy, fontFamily: SANS, fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>{bp.title}</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
          <span style={{ fontFamily: SANS, fontSize: 11.5, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>{bp.elapsedLabel}</span>
          <span style={{ fontFamily: SANS, fontSize: 11.5, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>{bp.remainingLabel}</span>
        </div>
        <AVPlaceholder label={bp.label} text={bp.avatarScript.join("\n\n")} />
        {bp.avatarScript.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginBottom: 14, animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
          <button onClick={() => goto("g1")}
            style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.white, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
            {bp.continueLabel}
          </button>
          <button onClick={onPause}
            style={{ minHeight: 48, borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "transparent", color: C.tealMid, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
            {bp.returnLaterLabel}
          </button>
        </div>
      </Stage>
    );
  }

  /* ============== SEGMENT G ============== */
  else if (st.screen === "g1") {
    const rec = SG.recognitionCard;
    const callback = st.coldOpenPath ? SG.callback[st.coldOpenPath] : null;
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RECOGNITION</div>
        <AVPlaceholder label={SG.recognitionLabel} text={SG.recognition.join("\n\n")} />
        <div className="bf-fade" style={{ margin: "16px 0 24px", padding: "22px 24px", borderRadius: 12, border: `1px solid ${C.tealMid}`, background: "rgba(13,148,136,0.08)", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 12 }}>{rec.title}</div>
          {rec.lines.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 17, color: C.white, lineHeight: 1.6, margin: "0 0 8px" }}>{l}</p>
          ))}
        </div>
        <Narration lines={SG.recognition} speakable={false} />
        {callback && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: C.tealMid, lineHeight: 1.65, marginTop: 4 }}>{callback}</p>
        )}
        <PrimaryButton onClick={() => goto("g15")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "g15") {
    body = <FrameworkReturnScreen content={SG.frameworkReturn} onDone={() => goto("g2")} />;
  }

  else if (st.screen === "g2") {
    const decides = [...st.lsDecidesHistory, st.lsDecide].filter(Boolean);
    const pressures = [...st.lsPressuresHistory, st.lsPressure].filter(Boolean);
    body = (
      <Stage bg={C.paper} narrow>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 6 }}>YOUR GROWTH LOG</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, color: C.navy }}>M4 — AI Grey Zone</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: C.inkSoft, marginTop: 6 }}>{M4_CONTENT.dimension.central_question}</div>
        </div>
        <GreyZoneLedger rows={st.ledger} totalRows={st.ledger.length || 1} fullRecall />
        <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.inkSoft, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
          Not a score. Not a certificate. A private record of what you practised.
        </p>
        <div style={{ marginTop: 28, paddingTop: 22, borderTop: `1px solid ${C.line}` }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 12, textAlign: "center" }}>YOUR GREY-ZONE SIGNATURE</div>
          <GreyZoneSignaturePanel decides={decides} pressures={pressures} theme="light" />
        </div>
        <button onClick={() => goto("g3")} style={{ width: "100%", minHeight: 48, marginTop: 24, borderRadius: 10, border: "none", background: C.navy, color: C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continue</button>
      </Stage>
    );
  }

  else if (st.screen === "g3") {
    const drc = SG.delayedRetentionCheck;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · DELAYED RETENTION CHECK</div>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: C.white, lineHeight: 1.3, marginBottom: 16, textAlign: "center" }}>In three to seven days, the workplace will return.</h2>
        <AVPlaceholder label={drc.label} text={drc.narration.join("\n\n")} />
        {drc.narration.map((l, i) => (
          <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginBottom: 14 }}>{l}</p>
        ))}
        <div style={{ marginTop: 12, padding: "22px 24px", borderRadius: 12, border: `1px solid ${C.tealMid}`, background: "rgba(13,148,136,0.06)" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>{drc.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "8px 14px", fontFamily: SANS, fontSize: 13.5 }}>
            {drc.details.map((row) => (
              <React.Fragment key={row.k}>
                <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{row.k}</span>
                <span style={{ color: "rgba(255,255,255,0.92)" }}>{row.v}</span>
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {drc.doctrinalNote.map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.6, margin: "0 0 8px" }}>{l}</p>
            ))}
          </div>
        </div>
        <PrimaryButton onClick={() => goto("g4")}>{drc.continueLabel}</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "g4") {
    const aweCouplet = SG.aweMoment?.coupletLines;
    const suppressBell = SG.aweMoment?.suppressBell;
    body = (
      <AweClose persistKey={st.screen}
        content={{ bookendQuestion: SG.bookendQuestion, finalPrompt: SG.finalPrompt }}
        aweCouplet={aweCouplet} suppressBell={suppressBell}
        onMotif={audio.playMotif}
        onDone={(s) => { dispatch({ type: "FINAL", text: s }); goto("done"); }} />
    );
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
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 12 }}>MODULE COMPLETE</div>
          <p style={{ fontFamily: SERIF, fontSize: 20, color: C.white, lineHeight: 1.4, marginBottom: 8 }}>{SG.completion.title}</p>
          <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 30 }}>{SG.completion.body}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
              style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.white, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {SG.completion.buttons.dashboard}
            </button>
            <button onClick={() => goto("g2")}
              style={{ minHeight: 48, borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "transparent", color: C.tealMid, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {SG.completion.buttons.growthLog}
            </button>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 10, lineHeight: 1.6 }}>
            Your delayed retention check will arrive in 3 to 7 days.<br />Until then — {FOOTER.toLowerCase()}
          </p>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 28 }}>
            {COPYRIGHT}
          </p>
          {/* Exit button per Tony rectification. */}
          <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
            style={{ marginTop: 24, padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "rgba(255,255,255,0.8)", fontFamily: SANS, fontSize: 13.5, cursor: "pointer" }}>
            Exit — return home
          </button>
        </div>
      </Stage>
    );
  }

  /* ----- defensive fallback ----- */
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
  const canBack = st.history.length > 0 && showChrome && st.screen !== "g15" && st.screen !== "g4" && st.screen !== "done";
  const segLabel = SEGMENT_LABEL[segmentOf(st.screen)];
  // Light chrome on cream backgrounds — G-2 Growth Log.
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
