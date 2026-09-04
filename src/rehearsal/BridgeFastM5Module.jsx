import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Pause, X, Mic, ChevronRight, ChevronLeft, Volume2, Play, Square, Loader2 } from "lucide-react";
import { M5_CONTENT, LS1_CONTENT_M5, LS2_CONTENT_M5 } from "./m5Content.js";
import { C, SERIF, SANS } from "./theme.js";
import { PiperProvider, usePiper } from "./usePiper.jsx";

/* ============================================================================
   ERROR BOUNDARY — same pattern as D3. Keeps the module from blanking to the
   global cream body background if any screen render throws.
   ========================================================================== */
class ModuleErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("Rehearsal render error (M5):", error, info); }
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
   THE 3RD ACADEMY · BridgeFast™ Engine — M5 (AI Breakdown & Recovery)
   AIWorkLab · Pressure Point 5. Built to AI-Ready Behaviours Production
   Standard v1.2. Cover → A → B → C → E (LS1 → LS2) → F → G.
   NO Segment D (audio case omitted per Section 1.1).
   ========================================================================== */

const MONO = "'Courier New', monospace";
const FOOTER = "Private rehearsal under workplace pressure. Not behavioural documentation.";
const COPYRIGHT = "© 2026 The 3rd Academy Inc. All rights reserved. Confidential.";

/* ---- Session-scoped text persistence. Same pattern as D3 — cleared on hard
   reload / module unmount; keyed by caller-supplied persistKey. ---- */
const __formStore = new Map();
const __recall = (key, fallback) => (key && __formStore.has(key)) ? __formStore.get(key) : (fallback === undefined ? "" : fallback);
const __persist = (key, value) => { if (key) __formStore.set(key, value); };

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================================
   AUDIO ENGINE (no-op stubs) — bells and motif are placeholder hooks. Piper
   handles all live narration. Same pattern as D3.
   ========================================================================== */
function useAudio() {
  return { init: async () => {}, strikeBell: () => {}, playMotif: () => {} };
}

/* ============================================================================
   LIGHTWEIGHT LOCAL ANALYSIS — Lock 2 fingerprint (developer-only). M5 also
   captures the syntactic subject of the participant's free-text sentences
   (OI-3 · MOAT-CRITICAL). Regex-based Option 2 stand-in for the pilot; the
   production target is Option 3 (NLP dependency parsing), per the script's
   Engineering Handoff Summary (Appendix M5.9).
   ========================================================================== */
const HEDGES = ["maybe", "i think", "probably", "sort of", "kind of", "i guess", "perhaps", "might", "possibly", "just wanted", "a bit", "somewhat", "hopefully"];
const DEFLECT = ["to be fair", "wasn't my", "was not my", "not my fault", "they should", "someone else", "in fairness", "but the", "blame"];
const OWNERSHIP = ["i made", "i missed", "my error", "my mistake", "my fault", "i caused", "i left", "i forgot", "i should have", "i own", "i shipped", "i will"];

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
  const subject = detectSubject(text);
  let posture = "cautious";
  if (directness >= 2 && ownership >= 1 && deflection === 0) posture = "transparent";
  else if (deflection >= 1 || (hedging >= 2 && directness === 0)) posture = "avoidant";
  return { posture, directness, ownership, hedging, deflection, subject, source: "local" };
}

/* ---- MOAT-CRITICAL: grammatical-subject detection.
   Naive heuristic per the script's Option 2 recommendation (pilot only).
   Returns one of: "person" (I/we/named), "tool" (the AI / tool / system /
   chart), "collective" (the team / process), "passive" (no active subject),
   "unknown". This maps to the Lock 2 fingerprint signal subject_discipline_score.
   The engine never surfaces the signal to the participant. ---- */
function detectSubject(text) {
  if (!text || typeof text !== "string") return "unknown";
  const trimmed = text.trim().replace(/^["'"']|["'"']$/g, "");
  const opening = trimmed.split(/[.!?]/)[0].toLowerCase().trim();
  if (!opening) return "unknown";
  if (/^(i |i'|we |we'|as (a|the) )/.test(opening)) return "person";
  if (/^(the ai|an? ai|the (llm|tool|system|chart|model|engine|assistant|bot))/.test(opening)) return "tool";
  if (/^(the (team|process|company|organisation|organization|firm|department|function))/.test(opening)) return "collective";
  if (/^(an? (anomaly|error|inconsistency|issue|discrepancy|problem)|errors? (were|was)|(mistakes|issues) (were|was))/.test(opening)) return "passive";
  return "unknown";
}

/* ============================================================================
   ENGINE PRIMITIVES (reusable, dimension-blind)
   ========================================================================== */

function Footer() {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, textAlign: "center", padding: "10px 12px", fontFamily: SANS, fontSize: 11, letterSpacing: 0.3, color: "rgba(255,255,255,0.55)", background: "linear-gradient(to top, rgba(19,17,15,0.9), transparent)", pointerEvents: "none", zIndex: 5 }}>
      {FOOTER}
    </div>
  );
}

function PauseControl({ onPause, onLight = false }) {
  const border = onLight ? "rgba(26,24,20,0.2)" : "rgba(255,255,255,0.18)";
  const bg = onLight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.06)";
  const color = onLight ? C.ink : "rgba(255,255,255,0.7)";
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
    <div role="dialog" aria-modal="true" aria-labelledby="pause-title-m5"
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(13,11,10,0.92)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, margin: "0 auto 18px", border: `1px solid ${C.tealMid}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(224,192,129,0.08)" }}>
          <Pause size={24} color={C.tealMid} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 3, color: C.tealMid, marginBottom: 12 }}>PAUSED</div>
        <h2 id="pause-title-m5" style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: C.white, lineHeight: 1.3, margin: "0 0 14px" }}>Take a breath.</h2>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 28px" }}>
          Your progress is saved. When you come back, you will land on this exact screen.
        </p>
        <button onClick={onResume}
          style={{ width: "100%", maxWidth: 320, minHeight: 48, margin: "0 auto", borderRadius: 24, border: "none", background: C.teal, color: C.navyDeep, fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
  const border = onLight ? "rgba(26,24,20,0.2)" : "rgba(255,255,255,0.18)";
  const bg = onLight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.06)";
  const color = onLight ? C.ink : "rgba(255,255,255,0.7)";
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
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: small ? "4px 10px" : "6px 12px",
          borderRadius: 16,
          border: `1px solid ${playing ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)"}`,
          background: playing ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
          color: playing ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
          fontFamily: SANS, fontSize: small ? 11 : 12, letterSpacing: 0.3, cursor: "pointer",
        }}>
        <Icon size={small ? 11 : 13} className={isLoading ? "bf-spin" : ""} />
        {labelText}
      </button>
      <span style={{ fontFamily: SANS, fontSize: small ? 10 : 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: 0.4, textTransform: "uppercase" }}>Optional</span>
      {piper.error && (
        <span title={piper.error} style={{ fontFamily: SANS, fontSize: 11, color: C.redInk, background: "rgba(184,60,56,0.12)", border: "1px solid rgba(184,60,56,0.4)", borderRadius: 12, padding: "3px 9px", maxWidth: 280, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>⚠ {piper.error}</span>
      )}
    </span>
  );
}

function Narration({ lines, color = "rgba(255,255,255,0.92)", speakable = true }) {
  const text = Array.isArray(lines) ? lines.join("\n\n") : String(lines || "");
  const arr = Array.isArray(lines) ? lines : [String(lines || "")];
  return (
    <div style={{ fontFamily: SERIF }}>
      {speakable && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <ListenButton text={text} size="sm" />
        </div>
      )}
      {arr.map((l, i) => (
        <p key={i} className="bf-fade" style={{ fontSize: 19, lineHeight: 1.7, color, margin: "0 0 18px", animationDelay: `${reduceMotion ? 0 : i * 0.5}s` }}>{l}</p>
      ))}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, dim }) {
  const faded = disabled || dim;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: "100%", minHeight: 48, marginTop: 22, borderRadius: 10, border: "none", background: faded ? "rgba(200,163,92,0.4)" : C.teal, color: faded ? "rgba(19,17,15,0.7)" : C.navyDeep, fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}>
      {children} <ChevronRight size={17} />
    </button>
  );
}

/* ---- Sector assignment notice / picker. AIWorkLab MVP is single-sector. ---- */
function SectorAssignment({ module }) {
  const variants = module?.sector_variants || [];
  const sa = module?.sectorAssignment;
  if (!variants.length || !sa) return null;
  if (variants.length === 1) {
    return (
      <div style={{ margin: "22px 0 4px", padding: "16px 18px", borderRadius: 10, border: `1px dashed ${C.tealMid}`, background: "rgba(224,192,129,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>
          {sa.titleMVP}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
          {sa.mvpNotice}
        </p>
      </div>
    );
  }
  return null;
}

/* ---- AVPlaceholder / Listen row. Same as D3. ---- */
function AVPlaceholder({ label, text }) {
  if (!text) return null;
  return (
    <div style={{ margin: "12px 0", padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.tealMid}`, background: "rgba(224,192,129,0.06)", display: "flex", alignItems: "center", gap: 10, fontFamily: SANS, flexWrap: "wrap" }}>
      <Volume2 size={15} color={C.tealMid} />
      <span style={{ fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700 }}>NARRATION</span>
      {label && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{label}</span>}
      <span style={{ marginLeft: "auto" }}><ListenButton text={text} size="sm" /></span>
    </div>
  );
}

/* ---- ClickToReveal — same as D3. ---- */
function ClickToReveal({ buttonLabel, children }) {
  const [revealed, setRevealed] = useState(false);
  if (revealed) return <div className="bf-fade">{children}</div>;
  return (
    <button onClick={() => setRevealed(true)}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, margin: "18px 0", padding: "12px 18px", borderRadius: 24, border: `1px dashed ${C.tealMid}`, background: "rgba(224,192,129,0.06)", color: C.tealMid, fontFamily: SANS, fontSize: 13, letterSpacing: 0.4, cursor: "pointer" }}>
      <ChevronRight size={14} /> {buttonLabel}
    </button>
  );
}

/* ---- Voice dictation — Web Speech API. ---- */
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
        "no-speech": "Didn't catch that — try again",
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
        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 14, border: `1px solid ${recording ? "#fca5a5" : "rgba(224,192,129,0.4)"}`, background: recording ? "rgba(184,60,56,0.18)" : "rgba(224,192,129,0.08)", color: recording ? "#fca5a5" : C.tealMid, fontFamily: SANS, fontSize: 11, letterSpacing: 0.3, cursor: "pointer" }}>
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

/* ---- Decision — three-path selection + justification. AIWorkLab uses 3
   paths (no Path D). Voice/register unchanged. ---- */
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
              style={{ textAlign: "left", padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${active ? C.teal : "rgba(255,255,255,0.15)"}`, background: active ? "rgba(200,163,92,0.14)" : "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.9)", fontFamily: SANS, fontSize: 14.5, lineHeight: 1.5, cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}>
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

/* ---- ArtifactWrite — participant writes actual words; reference variants
   appear after submit, with the closing observation. Same shape as D3. ---- */
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
      <div style={{ background: "rgba(200,163,92,0.12)", border: `1.5px solid ${C.teal}`, borderRadius: 10, padding: 16, marginBottom: 22 }}>
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
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: "rgba(200,163,92,0.08)", border: `1px solid ${C.tealMid}` }}>
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

/* ---- ConsequenceReveal — 3 horizons, Tibetan bell at each transition ---- */
function ConsequenceReveal({ horizons, onBell, onDone, pressureMod }) {
  const [stage, setStage] = useState(0);
  const labels = ["Same Day", "Next Week", "Month End"];
  const advance = () => {
    if (stage < 2) { onBell(); setStage(stage + 1); }
    else onDone();
  };
  const keys = ["sameDay", "nextWeek", "monthEnd"];
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
        <Narration lines={horizons[keys[stage]] || []} />
        {/* Pressure modulation shown only at Same Day, in the observational
            register — the Pressure beat's outcome layered onto the horizon. */}
        {stage === 0 && pressureMod && (
          <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(224,120,86,0.08)", border: `1px solid ${C.amber}` }}>
            <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.2, color: C.amber, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Pressure Modulation</div>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.6, margin: 0 }}>{pressureMod}</p>
          </div>
        )}
      </div>
      <PrimaryButton onClick={advance}>{stage < 2 ? "Let time pass" : "What this may signal"}</PrimaryButton>
    </div>
  );
}

/* ---- Trajectory — three-line chart. AIWorkLab has three Decide paths so
   the D3 four-line render collapses to three. ---- */
function Trajectory({ chosen, signalPanel = [] }) {
  const paths = { a: [70, 55, 40, 22], b: [70, 68, 78, 92], c: [70, 66, 80, 90] };
  const W = 460, H = 160, padX = 30, padXRight = 50, padY = 18;
  const xs = [0, 1, 2].map((i) => padX + (i * (W - padX - padXRight)) / 2);
  const yFor = (v) => padY + ((100 - v) / 100) * (H - padY * 2 - 18);
  const pointsOf = (arr) => [arr[0], arr[1], arr[3]].map((v, i) => ({ x: xs[i], y: yFor(v) }));
  const labelOf = (k) => signalPanel.find((s) => s.key === k)?.title;
  const keys = Object.keys(paths);
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "18px 12px 14px" }}>
      <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: 4 }}>How the record may read over time</div>
      <div style={{ fontFamily: SANS, fontSize: 10, color: "rgba(255,255,255,0.35)", textAlign: "center", marginBottom: 10, letterSpacing: 0.4 }}>↑ named actor · ↓ silent record</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        <line x1={padX} x2={W - padXRight} y1={yFor(70)} y2={yFor(70)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" />
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
        {keys.map((k) => {
          const end = pointsOf(paths[k])[2];
          const isChosen = k === chosen;
          return (
            <g key={`end-${k}`}>
              <circle cx={end.x} cy={end.y} r={isChosen ? 5 : 3} fill={isChosen ? C.tealMid : "rgba(255,255,255,0.35)"} />
              <text x={end.x + 10} y={end.y + 4} fill={isChosen ? C.tealMid : "rgba(255,255,255,0.55)"} fontSize={isChosen ? 13 : 11} fontWeight={isChosen ? 700 : 600} fontFamily={SANS}>
                {k.toUpperCase()}
              </text>
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

/* ---- PatternLedger — Recovery Pattern Mirror. Same shape as D3 but with
   only two rows (LS1, LS2). ---- */
function PatternLedger({ name, rows, totalRows = 2, fullRecall = false }) {
  return (
    <div style={{ background: fullRecall ? C.paper : "rgba(255,255,255,0.04)", borderRadius: 12, border: fullRecall ? `1px solid ${C.line}` : "none", overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", fontFamily: SANS, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: fullRecall ? C.tealDeep : C.tealMid, borderBottom: `1px solid ${fullRecall ? C.line : "rgba(255,255,255,0.08)"}` }}>{name}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 540, borderCollapse: "collapse", fontFamily: SANS, fontSize: 12.5 }}>
          <thead>
            <tr>
              {["Scenario", "Commitment", "Outcome", "Others' Adjustment"].map((h) => (
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
                <tr key={i} className={r && !reduceMotion ? "bf-row" : ""} style={{ borderBottom: i < totalRows - 1 ? `1px solid ${fullRecall ? "#EAE3D3" : "rgba(255,255,255,0.05)"}` : "none" }}>
                  {r ? (
                    <>
                      <td style={{ padding: "10px 12px", color: txt, fontWeight: 600, verticalAlign: "top" }}>{r.sc}<div style={{ color: soft, fontWeight: 400, fontSize: 11 }}>{r.title}</div></td>
                      <td style={{ padding: "10px 12px", color: soft, verticalAlign: "top", minWidth: 140 }}>{r.commitment}</td>
                      <td style={{ padding: "10px 12px", color: txt, verticalAlign: "top", minWidth: 150 }}>{r.outcome}</td>
                      <td style={{ padding: "10px 12px", color: fullRecall ? C.tealDeep : C.tealMid, verticalAlign: "top", minWidth: 160 }}>{r.others}</td>
                    </>
                  ) : (
                    <td colSpan={4} style={{ padding: "14px 12px", color: fullRecall ? "#B4AC9B" : "rgba(255,255,255,0.18)", fontStyle: "italic", fontSize: 12 }}>{i === 0 ? "LS1" : "LS2"} — not yet rehearsed</td>
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

/* ---- T3A logo mark. Same asset as D3. ---- */
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
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>M5 — AI Breakdown &amp; Recovery · AIWorkLab</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, color: C.white, lineHeight: 1.25, margin: "28px 0 14px" }}>
          AI Breakdown &amp; Recovery
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: 440, margin: "0 auto" }}>
          A private rehearsal under workplace pressure. Forty-five minutes. No scores. No pass or fail.
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
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: C.white, lineHeight: 1.4, marginBottom: 10 }}>M5 — AI Breakdown &amp; Recovery</h1>
        <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 26, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}>
          A private rehearsal under workplace pressure. Headphones recommended. Tap below to begin — audio will start with the cinematic opening.
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

/* ---- G-1.5 Framework Return — no-input transition, auto-advances. ---- */
function FrameworkReturnScreen({ content, onDone }) {
  const piper = usePiper();
  const playedRef = useRef(false);
  const seconds = content.durationSeconds || 25;
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (!playedRef.current && content && content.lead) {
      playedRef.current = true;
      const text = [content.lead, content.body, ...content.steps, content.tagline, content.carryForward]
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
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>{content.lead}</p>
        <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.78)", marginBottom: 30, lineHeight: 1.6 }}>{content.body}</p>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 16 }}>THE THREE SENTENCES</div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px 22px", marginBottom: 26 }}>
          {content.steps.map((s, i) => (
            <span key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: "clamp(22px, 5.5vw, 28px)", color: C.white, animationDelay: `${0.8 + i * 0.5}s`, fontWeight: 500 }}>{s}</span>
          ))}
        </div>
        {content.tagline && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, marginBottom: 22, animationDelay: "2.6s" }}>{content.tagline}</p>
        )}
        {content.carryForward && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto", animationDelay: "3.2s" }}>{content.carryForward}</p>
        )}
        <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginTop: 30 }}>The closing continues in a moment.</p>
      </div>
    </Stage>
  );
}

/* ---- Awe Close — M5 signature: three-line arc, no bell, 8-second hold.
   ("The work carried your name. The breakdown carried your name. The
   recovery will too.") The silence is the point. ---- */
function AweClose({ content, onDone, persistKey }) {
  const [beat, setBeat] = useState(1);
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    // Hold the three-line arc for 8 seconds per script, then advance to the
    // final-sentence prompt (participant carries one sentence out).
    const t1 = setTimeout(() => setBeat(2), reduceMotion ? 800 : 8000);
    return () => clearTimeout(t1);
  }, []);
  return (
    <div style={{ minHeight: "100%", background: C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 560, textAlign: "center" }}>
        {beat === 1 && (
          <div className="bf-fade">
            {content.aweLines.map((l, i) => (
              <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: "clamp(22px, 5vw, 28px)", color: C.white, lineHeight: 1.5, marginBottom: 18, fontWeight: 500, animationDelay: `${reduceMotion ? 0 : i * 1.6}s` }}>{l}</p>
            ))}
          </div>
        )}
        {beat === 2 && (
          <div className="bf-fade">
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>{content.bookendQuestion}</p>
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

/* ---- Artifact frame — labelled monospaced card (per Tony's rectification) */
function Artifact({ title, mono, children }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
      <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{title}</div>
      <div style={{ padding: 12, fontFamily: mono ? MONO : SANS, fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{children}</div>
    </div>
  );
}

/* ---- SingleChoiceCard (F1 drill) ---- */
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
              style={{ textAlign: "left", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${border}`, background: active ? "rgba(200,163,92,0.14)" : "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.9)", fontFamily: SANS, fontSize: 14, cursor: revealed ? "default" : "pointer", transition: "border-color 0.2s, background 0.2s" }}>
              {o}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="bf-fade" style={{ marginTop: 18, padding: 14, borderRadius: 10, background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}` }}>
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

/* ---- Free-form rewrite (F2 drill) — participant writes; the reference and
   feedback surface after submit. ---- */
function RewriteCard({ original, referenceText, feedback, onContinue, persistKey }) {
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [submitted, setSubmitted] = useState(false);
  const [tried, setTried] = useState(false);
  const MIN = 15;
  const left = MIN - text.trim().length;
  if (!submitted) {
    return (
      <div>
        <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.12)", marginBottom: 14 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.amber, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Original</div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.55, margin: 0 }}>{original}</p>
        </div>
        <MultilineTextarea value={text} onChange={(e) => { setText(e.target.value); setTried(false); }} rows={3} placeholder="Rewrite so a person is the subject. Under 20 words." error={tried && left > 0} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, color: left > 0 ? "rgba(255,255,255,0.4)" : C.tealMid }}>{Math.max(0, text.trim().length)}/{MIN}</span>
        </div>
        {tried && left > 0 && <div style={{ marginTop: 8, fontFamily: SANS, fontSize: 12.5, color: C.tealMid, textAlign: "center" }}>Rewrite so a person is the subject.</div>}
        <PrimaryButton onClick={() => { if (left > 0) { setTried(true); return; } setSubmitted(true); }} dim={left > 0}>Submit rewrite</PrimaryButton>
      </div>
    );
  }
  return (
    <div className="bf-fade">
      <div style={{ background: "rgba(200,163,92,0.12)", border: `1.5px solid ${C.teal}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", marginBottom: 6 }}>Your rewrite</div>
        <div style={{ fontFamily: SERIF, fontSize: 15, color: C.white, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{text}</div>
      </div>
      <div style={{ borderRadius: 10, padding: 14, background: "rgba(255,255,255,0.04)", border: `1.5px solid ${C.tealMid}`, marginBottom: 14 }}>
        <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: C.tealMid, marginBottom: 6 }}>Calibration reference</div>
        <div style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.55, marginBottom: 8 }}>{referenceText}</div>
        <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{feedback}</div>
      </div>
      <PrimaryButton onClick={() => onContinue(text)}>Continue</PrimaryButton>
    </div>
  );
}

/* ---- Inspect Surface — MOAT-CRITICAL renderer per Section 1.4.D.
   Three-panel layout (source · source · output) with a fixed-top countdown
   banner and a mobile-mode declaration. On desktop, panels render as a
   vertical stack of labeled monospaced cards; on mobile the stack IS the
   Stacked-Swipe rendering. Comparison-Tap mode collapses panels 2 and 3
   until tapped. ---- */
function InspectSurface({ config, threadingCard }) {
  const isComparisonTap = config?.mobileMode === "comparison_tap";
  return (
    <div>
      {/* Fixed countdown banner — MOAT-CRITICAL on mobile per Section 1.4.D */}
      <div style={{ position: "sticky", top: 74, zIndex: 4, background: "rgba(224,120,86,0.95)", color: C.navyDeep, padding: "8px 14px", borderRadius: 6, marginBottom: 16, fontFamily: SANS, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, textAlign: "center" }}>
        {config.countdownFixed}
      </div>
      {threadingCard}
      <div style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(200,163,92,0.06)", border: `1px dashed ${C.tealMid}`, marginBottom: 16 }}>
        <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.2, color: C.tealMid, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Inspect Beat · {config.label}</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.55, margin: 0 }}>{config.subtitle}</p>
      </div>
      <InspectPanels panels={config.panels} isComparisonTap={isComparisonTap} />
    </div>
  );
}

function InspectPanels({ panels, isComparisonTap }) {
  const [expanded, setExpanded] = useState(() => panels.map((_, i) => !isComparisonTap || i === 0));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {panels.map((p, i) => {
        const isOpen = expanded[i];
        const roleColour = p.role === "SOURCE" ? C.tealMid : C.amber;
        return (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.2, color: roleColour, fontWeight: 700 }}>[{p.role}]</span>
              <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 0.6, color: "rgba(255,255,255,0.55)" }}>Panel {i + 1} · {p.caption}</span>
              {isComparisonTap && i > 0 && (
                <button onClick={() => setExpanded((e) => e.map((v, j) => (j === i ? !v : v)))}
                  style={{ marginLeft: "auto", padding: "3px 10px", borderRadius: 12, border: `1px solid ${C.tealMid}`, background: "rgba(224,192,129,0.06)", color: C.tealMid, fontFamily: SANS, fontSize: 10.5, letterSpacing: 0.4, cursor: "pointer" }}>
                  {isOpen ? "Collapse" : "Tap to expand"}
                </button>
              )}
            </div>
            {isOpen && (
              <Artifact title={p.title} mono={p.mono}>
                {p.lines.map((line, j) => <div key={j}>{line || " "}</div>)}
              </Artifact>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================================
   FLOW CONTROLLER
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
  if (screen.startsWith("ls") || screen === "scenario_chain_intro" || screen === "e_signature") return "e";
  if (screen.startsWith("f")) return "f";
  if (screen.startsWith("g") || screen === "done") return "g";
  return "";
}

const initialState = {
  screen: "enter",
  history: [],
  paused: false,
  coldOpenPath: null,
  // LS1 / LS2 layered scenario state.
  ls1DecidePath: null,
  ls1PressurePath: null,
  ls2DecidePath: null,
  ls2PressurePath: null,
  // Ledger — one row per layered scenario after consequence reveal.
  ledger: [],
  analyses: [],
  // Growth Log capture surfaces.
  segmentBReflection: "",
  segmentCResponses: {},
  segmentFAnswers: { f1: [], f2: [] },
  finalSentence: "",
  // Currently active scenario — 1 (LS1) or 2 (LS2).
  scenarioIndex: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "PAUSE": return { ...state, paused: true };
    case "RESUME": return { ...state, paused: false };
    case "GOTO":
      return { ...state, screen: action.screen, history: [...state.history, state.screen] };
    case "BACK": {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return { ...state, screen: prev, history: state.history.slice(0, -1) };
    }
    case "RESET": return { ...initialState, screen: "cover" };
    case "COLD_OPEN":
      return { ...state, coldOpenPath: action.path, screen: "a2", history: [...state.history, state.screen] };
    case "LS_DECIDE":
      // Route capture per scenario; index = 0 → LS1, 1 → LS2.
      if (action.scenario === 0) return { ...state, ls1DecidePath: action.path };
      return { ...state, ls2DecidePath: action.path };
    case "LS_PRESSURE":
      if (action.scenario === 0) return { ...state, ls1PressurePath: action.path };
      return { ...state, ls2PressurePath: action.path };
    case "NEXT_SCENARIO":
      return { ...state, scenarioIndex: state.scenarioIndex + 1, screen: "ls_callback", history: [...state.history, state.screen] };
    case "LEDGER_ADD":
      return { ...state, ledger: [...state.ledger, action.row] };
    case "ANALYZE_ADD":
      return { ...state, analyses: [...state.analyses, action.analysis] };
    case "FINAL":
      return { ...state, finalSentence: action.text };
    case "SET_B_REFLECTION":
      return { ...state, segmentBReflection: action.text };
    case "SET_C_RESPONSE":
      return { ...state, segmentCResponses: { ...state.segmentCResponses, [action.key]: action.value } };
    case "SET_F_ANSWER": {
      const f = state.segmentFAnswers;
      return { ...state, segmentFAnswers: { ...f, [action.exercise]: [...f[action.exercise], action.value] } };
    }
    default: return state;
  }
}

export default function BridgeFastM5ModuleRoot() {
  return (
    <ModuleErrorBoundary>
      <PiperProvider>
        <BridgeFastM5Module />
      </PiperProvider>
    </ModuleErrorBoundary>
  );
}

function BridgeFastM5Module() {
  const [st, dispatch] = useReducer(reducer, initialState);
  const audio = useAudio();
  const piper = usePiper();
  const [a0phase, setA0phase] = useState(0);

  const onPause = useCallback(() => { piper.stop(); dispatch({ type: "PAUSE" }); }, [piper]);

  const C0 = M5_CONTENT.segmentA.coldOpen;
  const SG = M5_CONTENT.segmentG;
  // Current layered scenario — index 0 = LS1, 1 = LS2.
  const LS = st.scenarioIndex === 0 ? LS1_CONTENT_M5 : LS2_CONTENT_M5;
  const currentDecidePath = st.scenarioIndex === 0 ? st.ls1DecidePath : st.ls2DecidePath;
  const currentPressurePath = st.scenarioIndex === 0 ? st.ls1PressurePath : st.ls2PressurePath;
  const currentCons = currentDecidePath ? LS.consequences[currentDecidePath] : null;
  const currentPressureMod = currentPressurePath && currentCons?.pressureMods
    ? currentCons.pressureMods[currentPressurePath]
    : null;

  // A-0 cinematic timing (4.0s, un-skippable per script §A.1)
  useEffect(() => {
    if (st.screen !== "a0") return;
    audio.playMotif();
    const t1 = setTimeout(() => setA0phase(1), reduceMotion ? 200 : 1200);
    const t2 = setTimeout(() => setA0phase(2), reduceMotion ? 400 : 3000);
    const t3 = setTimeout(() => dispatch({ type: "GOTO", screen: "a1" }), reduceMotion ? 600 : 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [st.screen]);

  const goto = (screen) => dispatch({ type: "GOTO", screen });
  const back = () => dispatch({ type: "BACK" });

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
    // Screen A-0 — silence beat + four-note motif + cross-lab D1 callback
    // if available. MVP renders the fallback.
    body = (
      <div style={{ minHeight: "100%", background: a0phase === 0 ? "#000" : C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.5s ease", padding: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div className="bf-fade" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, color: C.white, opacity: a0phase >= 0 ? 1 : 0, transition: "opacity 1s" }}>THE 3RD ACADEMY</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, lineHeight: 1.6, marginTop: 24, maxWidth: 480, opacity: a0phase >= 1 && a0phase < 2 ? 1 : 0, transition: "opacity 1s" }}>
            {C0.d1Callback?.fallback}
          </div>
        </div>
      </div>
    );
  }

  else if (st.screen === "a1") {
    // Screen A-1 — the discovery. Two windows visible: the CFO pre-read
    // slide 7 chart (left) and the ChartDraft Engine source-file dashboard
    // (right). Timer top-right corner. Recognition seeds rendered as
    // observational body text.
    // Cross-lab callback fallback also shown as a labelled beat 1 card.
    // TODO(cross-module-memory): when the store is online, stitch wrapper
    // lead + participant's D1 final personal sentence + wrapper tail into
    // one narration and drop the fallback card.
    const cb = C0.d1Callback;
    const callbackFallback = cb?.fallback || "";
    body = (
      <Stage>
        {cb && (
          <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>D1 → M5 · Cross-lab Callback (Beat 1)</div>
            <AVPlaceholder label="Beat 1 · D1 callback (fallback variant — MVP)" text={callbackFallback} />
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "8px 0 0" }}>
              {callbackFallback}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: "10px 0 0" }}>
              When the cross-module memory store is wired up, this beat will play with the participant's own D1 final sentence read back to them. For MVP, the standalone fallback plays.
            </p>
          </div>
        )}
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT A · SCREEN A-1 · THE DISCOVERY</div>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginBottom: 14 }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.6, color: C.tealMid, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>{C0.scene.title}</div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.55, margin: 0 }}>{C0.scene.subtitle}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          {C0.artifacts.map((a, i) => (
            <div key={i}>
              {a.caption && (
                <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Artifact · {a.caption}</div>
              )}
              <Artifact title={a.title} mono={a.mono}>
                {a.lines.map((l, j) => <div key={j}>{l || " "}</div>)}
              </Artifact>
            </div>
          ))}
        </div>
        <AVPlaceholder label="A-1 · cinematic recognition (observational)" text={C0.cinematicNotes.join("\n\n")} />
        {C0.cinematicNotes.map((line, i) => (
          <p key={i} style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, margin: "0 0 10px" }}>{line}</p>
        ))}
        <PrimaryButton onClick={() => goto("a2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "a2") {
    // Screen A-2 — the central question, quietly framed, plus safety floor.
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 24, textAlign: "center" }}>THE QUESTION THAT RUNS THROUGH THIS MODULE</div>
        <AVPlaceholder label="A-2 · central question" text={C0.centralQuestionLead} />
        <p style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.5, textAlign: "center", margin: "0 0 22px" }}>{C0.centralQuestionLead}</p>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, textAlign: "center", margin: "0 0 30px" }}>{C0.centralQuestionSub}</p>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 22, borderLeft: `3px solid ${C.teal}` }}>
          {M5_CONTENT.segmentA.safetyFloor.card.map((l, i) => (
            <p key={i} style={{ fontFamily: i === 0 ? SANS : SERIF, fontWeight: i === 0 ? 700 : 400, fontSize: i === 0 ? 13 : 14.5, letterSpacing: i === 0 ? 0.5 : 0, color: i === 0 ? C.white : "rgba(255,255,255,0.82)", lineHeight: 1.55, margin: "0 0 12px" }}>{l}</p>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("b1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT B — BEHAVIOUR STANDARD ============== */
  else if (st.screen === "b1") {
    const b = M5_CONTENT.segmentB.justLived;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT B · BEHAVIOUR STANDARD</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 24 }}>What you just lived through</h2>
        <AVPlaceholder label={b.label} text={b.narration.join("\n\n")} />
        <Narration lines={b.narration} speakable={false} />
        <PrimaryButton onClick={() => goto("b2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b2") {
    const s = M5_CONTENT.segmentB.standardCard;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>B-2 · THE RECOVERY STANDARD</div>
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "22px 24px", marginBottom: 20 }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 14 }}>{s.title}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {s.items.map((it, i) => (
              <li key={i} style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.65, padding: "6px 0", borderBottom: i < s.items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span style={{ color: C.tealMid, marginRight: 8 }}>•</span>{it}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: C.tealMid, marginTop: 16, marginBottom: 0 }}>{s.close}</p>
        </div>
        <AVPlaceholder label="B-2 · recovery standard narration" text={[s.title, ...s.items, s.close].join("\n\n")} />
        <PrimaryButton onClick={() => goto("b3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b3") {
    const r = M5_CONTENT.segmentB.refuses;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.amber, marginBottom: 10 }}>B-3 · WHAT THIS STANDARD REFUSES</div>
        <div style={{ background: "rgba(224,120,86,0.08)", border: `1px solid ${C.amber}`, borderRadius: 12, padding: "22px 24px", marginBottom: 22 }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 1.5, color: C.amber, fontWeight: 700, marginBottom: 14 }}>{r.title}</div>
          {r.items.map((it, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: SERIF, fontSize: 15.5, color: C.white, marginBottom: 4 }}>{it.h}</div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>{it.t}</div>
            </div>
          ))}
        </div>
        <AVPlaceholder label="B-3 · what the standard refuses" text={[r.title, ...r.items.map((it) => `${it.h} ${it.t}`)].join("\n\n")} />
        <PrimaryButton onClick={() => goto("c1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT C — RECOGNITION BRIEFS ============== */
  else if (st.screen === "c1") {
    const c1 = M5_CONTENT.segmentC.c1;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c1.title}</h2>
        <AVPlaceholder label={c1.label} text={c1.narration.join("\n\n")} />
        <Narration lines={c1.narration} speakable={false} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 22, margin: "22px 0" }}>
          <p style={{ fontFamily: SERIF, fontSize: 20, color: C.white, lineHeight: 1.55, textAlign: "center", margin: 0 }}>{c1.cardLine}</p>
        </div>
        <PrimaryButton onClick={() => goto("c2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c2") {
    const c2 = M5_CONTENT.segmentC.c2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 2 of 2 · FRAMEWORK REVEAL</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c2.title}</h2>
        <ClickToReveal buttonLabel="Reveal The Three Sentences">
          <div style={{ background: C.paper, color: C.ink, borderRadius: 12, padding: "26px 22px", margin: "0 0 22px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealDeep, marginBottom: 14, textAlign: "center" }}>THE THREE SENTENCES</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SERIF, fontSize: 15 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: C.tealDeep, fontFamily: SANS, fontSize: 11, letterSpacing: 0.6, borderBottom: `1px solid ${C.line}` }}>Sentence</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: C.tealDeep, fontFamily: SANS, fontSize: 11, letterSpacing: 0.6, borderBottom: `1px solid ${C.line}` }}>Function</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", color: C.tealDeep, fontFamily: SANS, fontSize: 11, letterSpacing: 0.6, borderBottom: `1px solid ${C.line}` }}>Subject rule</th>
                </tr>
              </thead>
              <tbody>
                {c2.matrix.map((row) => (
                  <tr key={row.n} style={{ borderBottom: `1px solid ${C.line}` }}>
                    <td style={{ padding: "10px", fontWeight: 700, color: C.tealDeep, verticalAlign: "top" }}>{row.n}</td>
                    <td style={{ padding: "10px", color: C.ink, verticalAlign: "top" }}>{row.function}</td>
                    <td style={{ padding: "10px", color: C.ink, fontStyle: "italic", verticalAlign: "top" }}>{row.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AVPlaceholder label={c2.label} text={c2.narration.join("\n\n")} />
          <Narration lines={c2.narration} speakable={false} />
          <PrimaryButton onClick={() => goto("c2_cqreturn")}>Continue</PrimaryButton>
        </ClickToReveal>
      </Stage>
    );
  }

  else if (st.screen === "c2_cqreturn") {
    const cq = M5_CONTENT.segmentC.c2.centralQuestionReturn;
    const audioText = [cq.opener, cq.echo, cq.closing].join("\n\n");
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>C · THE CENTRAL QUESTION RETURNS</div>
        <AVPlaceholder label={cq.label} text={audioText} />
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, textAlign: "center", marginBottom: 28 }}>{cq.opener}</p>
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "28px 22px", textAlign: "center", margin: "0 0 26px" }}>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: C.white, lineHeight: 1.5, margin: 0 }}>{cq.echo}</p>
        </div>
        <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>{cq.closing}</p>
        <PrimaryButton onClick={() => goto("c_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c_complete") {
    const cc = M5_CONTENT.segmentC.complete;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT C · COMPLETE · TRANSITION TO SCENARIO LAB</div>
        <AVPlaceholder label={cc.label} text={cc.narration.join("\n\n")} />
        {cc.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <PrimaryButton onClick={() => goto("break_1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "break_1") {
    const bp = M5_CONTENT.segmentC.breakPoint1;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: 16, background: C.amber, color: C.navyDeep, fontFamily: SANS, fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>{bp.title}</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
          <span style={{ fontFamily: SANS, fontSize: 11.5, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>{bp.elapsedLabel}</span>
          <span style={{ fontFamily: SANS, fontSize: 11.5, padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>{bp.remainingLabel}</span>
        </div>
        <AVPlaceholder label={bp.label} text={bp.avatarScript.join("\n\n")} />
        {bp.avatarScript.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginBottom: 14, animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
          <button onClick={() => goto("scenario_chain_intro")}
            style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.navyDeep, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
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
  else if (st.screen === "scenario_chain_intro") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · AIWORKLAB™ LAYERED SCENARIO LAB</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, textAlign: "center", marginBottom: 20 }}>Two layered scenarios. Two moments. The same three sentences.</h2>
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, textAlign: "center" }}>
          Each scenario opens with Inspect. You see the source and the output side by side before you decide. The Pressure beat is a real second decision, not a reflection prompt.
        </p>
        <SectorAssignment module={M5_CONTENT.module} />
        <PrimaryButton onClick={() => goto("ls_callback")}>Begin Layered Scenario 1</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls_callback") {
    const isFirst = st.scenarioIndex === 0;
    // LS2 within-module memory thread — template prefill + decide prompt
    // drift by LS1 path. Rendered as a threading card at the top of LS2's
    // Inspect surface (§1.4.A.1 — felt, never named).
    const threadKey = st.ls1DecidePath || "a"; // default fallback
    const threadLines = !isFirst && LS.threading ? (LS.threading[threadKey] || LS.threading.a) : null;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>LAYERED SCENARIO {st.scenarioIndex + 1} OF 2</div>
        {!isFirst && threadLines && (
          <div style={{ background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 10 }}>What carries into this room</div>
            {threadLines.map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, margin: "0 0 10px" }}>{l}</p>
            ))}
          </div>
        )}
        {isFirst && LS.callback && (
          <>
            <Narration lines={LS.callback} />
          </>
        )}
        <Narration lines={LS.intro} />
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, margin: "14px 0", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{LS.briefing}</div>
        <PrimaryButton onClick={() => goto("sc_inspect")}>Continue to the Inspect beat</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_inspect") {
    // MOAT-CRITICAL Inspect beat per §1.4.D — three panels, mobile mode
    // declared, countdown timer fixed at the top of the surface, gap
    // anchors captured invisibly to the Lock 2 signal.
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 12 }}>LS{st.scenarioIndex + 1} · INSPECT BEAT · {LS.mobileMode.replace("_", "-")}</div>
        <InspectSurface config={LS.inspect} />
        <PrimaryButton onClick={() => goto("sc_decide")}>The decision</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_decide") {
    // LS2 Decide prompt drifts by LS1 path (within-module memory).
    const prompt = st.scenarioIndex === 1 && LS.decidePromptByLs1Path
      ? (LS.decidePromptByLs1Path[st.ls1DecidePath || "a"] || LS.decisionPrompt)
      : LS.decisionPrompt;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>LS{st.scenarioIndex + 1} · DECIDE BEAT</div>
        <Decision persistKey={`ls${st.scenarioIndex + 1}_decide`} prompt={prompt} options={LS.options} justificationPrompt={LS.justificationPrompt}
          audioLabel="Decide beat prompt" audioText={prompt}
          onSubmit={(p, justification) => {
            dispatch({ type: "LS_DECIDE", scenario: st.scenarioIndex, path: p });
            const a = localAnalyze(justification);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `${LS.title} · Decide`, path: p } });
            goto("sc_artifact");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_artifact") {
    // ArtifactWrite — participant writes actual words; references appear
    // after submit. MOAT-CRITICAL: on paths B and C, this is where the
    // grammatical subject of the participant's sentence is captured as a
    // Lock 2 signal (subject_discipline_score).
    const path = currentDecidePath;
    const aw = LS.artifactWrite[path];
    // Reference kind — three references for paths a/c on LS1 (calibration
    // triad), two references for path b (paired). LS2 has references per
    // path with the two-reference calibration pattern.
    const refs = LS.references[path] || LS.references.ac || [];
    const closing = LS.references?.closing;
    body = (
      <Stage>
        <ArtifactWrite persistKey={`ls${st.scenarioIndex + 1}_artifact`} prompt={aw.prompt} submitLabel={aw.submit}
          references={refs} refKind="list" closing={closing}
          onDone={(txt) => {
            const a = localAnalyze(txt);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `${LS.title} · Artifact`, path, subject: a.subject } });
            goto("sc_pressure");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_pressure") {
    // Pressure beat — true second decision per Section 2.5.
    // Trigger drift: LS1 by Decide path (Sara's message); LS2 by LS1 path
    // (David's message).
    const p = LS.pressure;
    const decidePath = currentDecidePath || "a";
    const trigger = st.scenarioIndex === 0
      ? p.triggerByPath?.[decidePath]
      : p.triggerByLs1Path?.[st.ls1DecidePath || "a"];
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.amber, marginBottom: 12 }}>LS{st.scenarioIndex + 1} · PRESSURE BEAT · {LS.pressureType}</div>
        <div style={{ background: "rgba(224,120,86,0.08)", border: `1px solid ${C.amber}`, borderRadius: 10, padding: 16, margin: "0 0 18px" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.amber, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>{p.label}</div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, margin: "0 0 12px" }}>{p.intro}</p>
          {trigger && (
            <Artifact title="Incoming message" mono>
              <div>{trigger}</div>
            </Artifact>
          )}
          {p.countdownReset && (
            <div style={{ marginTop: 10, padding: "6px 10px", background: "rgba(224,120,86,0.15)", borderRadius: 6, fontFamily: SANS, fontSize: 12, color: C.amber, fontWeight: 600, letterSpacing: 0.5 }}>
              {p.countdownReset}
            </div>
          )}
          {p.driftNote && (
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: "10px 0 0" }}>{p.driftNote}</p>
          )}
        </div>
        <Decision persistKey={`ls${st.scenarioIndex + 1}_pressure`} prompt={p.prompt} options={p.options} justificationPrompt={p.justificationPrompt}
          audioLabel="Pressure beat prompt" audioText={p.prompt}
          onSubmit={(pathKey, justification) => {
            dispatch({ type: "LS_PRESSURE", scenario: st.scenarioIndex, path: pathKey });
            const a = localAnalyze(justification);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `${LS.title} · Pressure`, path: pathKey } });
            goto("sc_consequence");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_consequence") {
    body = (
      <Stage>
        <ConsequenceReveal horizons={currentCons} onBell={audio.strikeBell} onDone={() => goto("sc_interp")} pressureMod={currentPressureMod} />
      </Stage>
    );
  }

  else if (st.screen === "sc_interp") {
    // Mirror Rule check — only fires on Decide-A + Pressure-A double-
    // silence composition. Both LS1 and LS2 carry a locked line per script.
    const mrTrigger = LS.pressure?.mirrorRuleTrigger;
    const mrFires = mrTrigger && currentDecidePath === mrTrigger.decide && currentPressurePath === mrTrigger.pressure;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>What may have been noticed</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: C.white, lineHeight: 1.6 }}>"{currentCons.interp}"</p>
        {mrFires && LS.pressure.mirrorRuleLine && (
          <div className="bf-fade" style={{ marginTop: 22, padding: "18px 20px", borderRadius: 12, background: "rgba(184,60,56,0.12)", border: `1.5px solid ${C.redInk}` }}>
            <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: 1.5, color: C.redInk, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Mirror moment</div>
            <p style={{ fontFamily: SERIF, fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{LS.pressure.mirrorRuleLine}</p>
          </div>
        )}
        <PrimaryButton onClick={() => goto("sc_signal")}>How each path may land</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_signal") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>What each path may have communicated</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LS.signalPanel.map((s) => {
            const chosen = s.key === currentDecidePath;
            return (
              <div key={s.key} style={{ borderRadius: 10, padding: 14, background: chosen ? "rgba(200,163,92,0.1)" : "rgba(255,255,255,0.03)", border: chosen ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: chosen ? C.tealMid : "rgba(255,255,255,0.8)", marginBottom: 5 }}>Path {s.key.toUpperCase()} — {s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Signal: {s.signal}</div>
                {s.effect && <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 22 }}><Trajectory chosen={currentDecidePath} signalPanel={LS.signalPanel} /></div>
        <PrimaryButton onClick={() => goto("sc_manager")}>The manager's view</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_manager") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Manager Lens</div>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, fontStyle: "italic" }}>{currentCons.manager}</p>
        <PrimaryButton onClick={() => goto("sc_reflection")}>Reflect</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_reflection") {
    body = (
      <Stage narrow>
        <Reflection persistKey={`ls${st.scenarioIndex + 1}_reflection`} prompt={LS.reflection} onDone={() => {
          dispatch({ type: "LEDGER_ADD", row: { sc: LS.id, title: LS.title, commitment: LS.commitment, outcome: currentCons.outcome, others: currentCons.others } });
          goto("sc_ledger");
        }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_ledger") {
    const hasMore = st.scenarioIndex < 1;
    const nextLS = hasMore ? LS2_CONTENT_M5 : null;
    const onContinue = hasMore
      ? () => dispatch({ type: "NEXT_SCENARIO" })
      : () => goto("e_signature");
    body = (
      <Stage>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 18, textAlign: "center" }}>
          {st.ledger.length >= 1 ? "Your pattern is beginning to form." : "One row on the record."}
        </div>
        <PatternLedger name="Recovery Pattern Mirror" rows={st.ledger} totalRows={2} />
        {hasMore && nextLS && (
          <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "rgba(200,163,92,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, textTransform: "uppercase" }}>UP NEXT · LAYERED SCENARIO 2 of 2</span>
              <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Same workplace. Monday, 9:14 AM.</span>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.4, marginBottom: 4 }}>{nextLS.title}</div>
            {nextLS.commitment && (
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>{nextLS.commitment}</div>
            )}
            <p style={{ fontFamily: SANS, fontSize: 12, color: C.tealMid, marginTop: 10, marginBottom: 0, lineHeight: 1.55 }}>
              How Friday landed carries forward. The Monday template opens differently because of it.
            </p>
          </div>
        )}
        <PrimaryButton onClick={onContinue}>
          {hasMore ? "Carry it forward → Layered Scenario 2" : "Continue to micro-drills"}
        </PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "e_signature") {
    // End of Segment E — quiet reflection card. AIWorkLab does not show a
    // signature-mirror aggregate; the two-scenario cadence is the signal.
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · COMPLETE</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, textAlign: "center", margin: "0 0 22px" }}>
          Two moments. Two records. The same three sentences.
        </p>
        <PatternLedger name="Recovery Pattern Mirror" rows={st.ledger} totalRows={2} />
        <PrimaryButton onClick={() => goto("f1")}>Continue to micro-drills</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT F — MICRO-DRILLS ============== */
  else if (st.screen === "f1") {
    const f1 = M5_CONTENT.segmentF.f1;
    const osh = f1.onScreenHeader;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f1.title}</h2>
        <AVPlaceholder label="F1 introduction" text={f1.audioIntro} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px", margin: "16px 0 18px" }}>
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
    const f1 = M5_CONTENT.segmentF.f1;
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
        <div style={{ background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 26, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{M5_CONTENT.segmentF.f1.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2")}>Continue to F2</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f2") {
    const f2 = M5_CONTENT.segmentF.f2;
    const osh = f2.onScreenHeader;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 2 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f2.title}</h2>
        <AVPlaceholder label="F2 introduction" text={f2.audioIntro} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px", margin: "16px 0 18px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 12, textAlign: "center" }}>{osh.title}</div>
          {osh.lines.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, textAlign: "center", margin: "0 0 8px" }}>{l}</p>
          ))}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "center", margin: "12px 0 0" }}>{osh.cta}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2_q1")}>Begin</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen.startsWith("f2_q")) {
    const idx = parseInt(st.screen.slice(4), 10) - 1;
    const f2 = M5_CONTENT.segmentF.f2;
    const item = f2.items[idx];
    const next = idx < f2.items.length - 1 ? `f2_q${idx + 2}` : "f2_close";
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>F2 · {idx + 1} of {f2.items.length}</div>
        <RewriteCard persistKey={`f2_q${idx + 1}`} original={item.original} referenceText={item.reference} feedback={item.feedback}
          onContinue={(rewrite) => {
            const a = localAnalyze(rewrite);
            dispatch({ type: "SET_F_ANSWER", exercise: "f2", value: { idx, subject: a.subject } });
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `F2 rewrite ${idx + 1}` } });
            goto(next);
          }} />
      </Stage>
    );
  }

  else if (st.screen === "f2_close") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 26, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{M5_CONTENT.segmentF.f2.closeCard}</p>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: C.tealMid, lineHeight: 1.6, textAlign: "center", marginTop: 22 }}>{M5_CONTENT.segmentF.reflection}</p>
        <PrimaryButton onClick={() => goto("f_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f_complete") {
    const fc = M5_CONTENT.segmentF.complete;
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

  /* ============== SEGMENT F → G — OPTIONAL PAUSE INVITATION ============== */
  else if (st.screen === "break_4") {
    const bp = SG.breakPoint4;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: 16, background: C.amber, color: C.navyDeep, fontFamily: SANS, fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>{bp.title}</div>
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
            style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.navyDeep, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
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

  /* ============== SEGMENT G — COMPLETION + AWE-MOMENT + RETENTION ============== */
  else if (st.screen === "g1") {
    const rec = SG.recognitionCard;
    const callback = st.ls1DecidePath ? SG.callback[st.ls1DecidePath] : null;
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RECOGNITION</div>
        <AVPlaceholder label={SG.recognitionLabel} text={SG.recognition.join("\n\n")} />
        <div className="bf-fade" style={{ margin: "16px 0 24px", padding: "22px 24px", borderRadius: 12, border: `1px solid ${C.tealMid}`, background: "rgba(200,163,92,0.08)", textAlign: "center" }}>
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
    // No-input framework return; auto-advances per §G-1.5 durationSeconds.
    body = <FrameworkReturnScreen content={SG.frameworkReturn} onDone={() => goto("g2")} />;
  }

  else if (st.screen === "g2") {
    // Growth Log surface — cream paper (light chrome). Recovery Pattern
    // Mirror rendered at fullRecall.
    body = (
      <Stage bg={C.paper} narrow>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealDeep, marginBottom: 6 }}>YOUR GROWTH LOG</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, color: C.ink }}>M5 — AI Breakdown &amp; Recovery</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: C.inkSoft, marginTop: 6 }}>{M5_CONTENT.dimension.central_question}</div>
        </div>
        <PatternLedger name="Recovery Pattern Mirror — your record" rows={st.ledger} totalRows={st.ledger.length || 1} fullRecall />
        <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.inkSoft, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
          Not a score. Not a certificate. A private record of what you rehearsed.
        </p>
        <div style={{ marginTop: 24, padding: "18px 20px", borderRadius: 12, background: "rgba(200,163,92,0.08)", border: `1px solid ${C.tealDeep}` }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealDeep, fontWeight: 700, marginBottom: 8 }}>YOU WORKED THE EVIDENCE</div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: C.ink, lineHeight: 1.6, margin: 0 }}>
            You sat with the source material and the AI output side by side for the time it takes. The Inspect Surface signal was captured to the Growth Log; the measurements stay behind the surface.
          </p>
        </div>
        <button onClick={() => goto("g3")} style={{ width: "100%", minHeight: 48, marginTop: 24, borderRadius: 10, border: "none", background: C.navy, color: C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continue</button>
      </Stage>
    );
  }

  else if (st.screen === "g3") {
    const drc = SG.retentionCheck;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RETENTION CHECK</div>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: C.white, lineHeight: 1.3, marginBottom: 16, textAlign: "center" }}>How this module finishes</h2>
        <AVPlaceholder label={drc.label} text={drc.narration.join("\n\n")} />
        {drc.narration.map((l, i) => (
          <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginBottom: 14 }}>{l}</p>
        ))}
        <div style={{ marginTop: 12, padding: "22px 24px", borderRadius: 12, border: `1px solid ${C.tealMid}`, background: "rgba(200,163,92,0.06)" }}>
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
    // Awe close — three-line arc + final personal sentence prompt.
    // No bell (silence is the point). No motif on the transition.
    body = <AweClose persistKey={st.screen} content={{ aweLines: SG.aweLines, bookendQuestion: SG.bookendQuestion, finalPrompt: SG.finalPrompt }}
      onDone={(s) => { dispatch({ type: "FINAL", text: s }); goto("done"); }} />;
  }

  else if (st.screen === "done") {
    const cmp = SG.completion;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          {st.finalSentence && (
            <>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 14 }}>YOU WROTE THIS</div>
              <p style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.5, marginBottom: 30 }}>"{st.finalSentence}"</p>
            </>
          )}
          <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.4, marginBottom: 6 }}>{cmp.title}</h2>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>{cmp.subtitle}</p>
          <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{cmp.body}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
            <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
              style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.navyDeep, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {cmp.dashboardLabel}
            </button>
            <button onClick={() => goto("g2")}
              style={{ minHeight: 48, borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "transparent", color: C.tealMid, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {cmp.growthLogLabel}
            </button>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 20, lineHeight: 1.6 }}>
            Your retention check will arrive in 3 to 7 days.<br />Until then — {FOOTER.toLowerCase()}
          </p>
          {/* Exit button on the done screen per Tony's rectification */}
          <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
            style={{ marginTop: 26, padding: "10px 22px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.75)", fontFamily: SANS, fontSize: 13, cursor: "pointer" }}>
            Exit — return home
          </button>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 20 }}>{COPYRIGHT}</p>
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
              style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.navyDeep, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
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
  // No Back on: framework return (no-input), awe close (participant's
  // moment), done (terminal).
  const canBack = st.history.length > 0 && showChrome && st.screen !== "g15" && st.screen !== "g4" && st.screen !== "done";
  const segLabel = SEGMENT_LABEL[segmentOf(st.screen)];
  // Light-bg chrome inversion on the cream Growth Log surface (g2).
  const lightChromeScreens = ["g2"];
  const onLightBg = lightChromeScreens.includes(st.screen);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "auto", background: C.navy, fontFamily: SANS }}>
      <StyleBlock />
      {showChrome && canBack && <BackControl onBack={back} onLight={onLightBg} />}
      {showChrome && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 6, padding: "5px 12px", borderRadius: 16, background: onLightBg ? "rgba(255,255,255,0.85)" : "rgba(19,17,15,0.85)", border: `1px solid ${onLightBg ? "rgba(26,24,20,0.18)" : "rgba(255,255,255,0.12)"}`, fontFamily: SANS, fontSize: 10.5, letterSpacing: 1, color: onLightBg ? C.ink : "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }}>
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
