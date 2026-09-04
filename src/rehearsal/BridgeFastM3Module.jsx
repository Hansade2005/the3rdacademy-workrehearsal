import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Pause, ChevronRight, ChevronLeft, Volume2, Play, Square, Loader2, Mic } from "lucide-react";
import { M3_CONTENT, LS1_CONTENT_M3, LS2_CONTENT_M3 } from "./m3Content.js";
import { C, SERIF, SANS } from "./theme.js";
import { PiperProvider, usePiper } from "./usePiper.jsx";

/* ============================================================================
   THE 3RD ACADEMY · BridgeFast™ Engine — M3 Production Build (AIWorkLab)
   Built to AI-Ready Behaviours Production Standard v1.2.
   Cover → A → B → C → E (LS1 + LS2) → F → G
   ─── Segment D is intentionally OMITTED per Section 1.1. ───
   ========================================================================== */

const MONO = "'Courier New', monospace";
const FOOTER = "Practice and development only. Not behavioural documentation.";
const COPYRIGHT = "© 2026 The 3rd Academy Inc. All rights reserved. Confidential.";

const LS_CHAIN = [LS1_CONTENT_M3, LS2_CONTENT_M3];

/* ---- Session-scoped text persistence (mirrors D3 pattern) ---- */
const __formStore = new Map();
const __recall = (key, fallback) => (key && __formStore.has(key)) ? __formStore.get(key) : (fallback === undefined ? "" : fallback);
const __persist = (key, value) => { if (key) __formStore.set(key, value); };

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================================
   ERROR BOUNDARY
   ========================================================================== */
class ModuleErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("M3 render error:", error, info); }
  reset = () => { this.setState({ error: null }); };
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ position: "fixed", inset: 0, overflow: "auto", background: C.navyDeep, fontFamily: SANS, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: C.amber, marginBottom: 12 }}>NAVIGATION RECOVERY</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.4, marginBottom: 14 }}>Looks like we lost the page.</h2>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(245,239,230,0.75)", lineHeight: 1.65, marginBottom: 22 }}>
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
   AUDIO ENGINE — placeholder hooks; MP3s and motif live in usePiper.
   ========================================================================== */
function useAudio() {
  return { init: async () => {}, strikeBell: () => {}, playMotif: () => {} };
}

/* ============================================================================
   LOCAL LOCK-2 FINGERPRINT — same signature as D3's localAnalyze.
   Developer-only diagnostics; never surfaced.
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
   ENGINE PRIMITIVES — mostly ported from D3 with theme.js palette wiring.
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
    <div role="dialog" aria-modal="true" aria-labelledby="pause-title"
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(19,17,15,0.92)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, margin: "0 auto 18px", border: `1px solid ${C.tealMid}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(224,192,129,0.08)" }}>
          <Pause size={24} color={C.tealMid} />
        </div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 3, color: C.tealMid, marginBottom: 12 }}>PAUSED</div>
        <h2 id="pause-title" style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: C.white, lineHeight: 1.3, margin: "0 0 14px" }}>Take a breath.</h2>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 28px" }}>
          Your progress is saved. When you come back, you will land on this exact screen.
        </p>
        <button onClick={onResume}
          style={{ width: "100%", maxWidth: 320, minHeight: 48, margin: "0 auto", borderRadius: 24, border: "none", background: C.teal, color: C.navy, fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Play size={15} /> Resume rehearsal
        </button>
        <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {segmentLabel && (
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
              CURRENT · {segmentLabel.toUpperCase()}
            </div>
          )}
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>
            Tip — press space, enter or esc to resume.
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

function Narration({ lines, color = "rgba(255,255,255,0.92)", speakable = true }) {
  const text = Array.isArray(lines) ? lines.join("\n\n") : String(lines || "");
  return (
    <div style={{ fontFamily: SERIF }}>
      {speakable && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <ListenButton text={text} size="sm" />
        </div>
      )}
      {(Array.isArray(lines) ? lines : [lines]).map((l, i) => (
        <p key={i} className="bf-fade" style={{ fontSize: 19, lineHeight: 1.7, color, margin: "0 0 18px", animationDelay: `${reduceMotion ? 0 : i * 0.5}s` }}>{l}</p>
      ))}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, dim }) {
  const faded = disabled || dim;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: "100%", minHeight: 48, marginTop: 22, borderRadius: 10, border: "none", background: faded ? "rgba(200,163,92,0.4)" : C.teal, color: faded ? "rgba(19,17,15,0.5)" : C.navy, fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}>
      {children} <ChevronRight size={17} />
    </button>
  );
}

/* ---- Voice dictation ---- */
function VoiceDictateButton({ onTranscript }) {
  const [recording, setRecording] = useState(false);
  const [hint, setHint] = useState(null);
  const recRef = useRef(null);
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  if (!SR) return null;
  const stop = () => { try { recRef.current?.stop(); } catch (e) {} };
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
    r.onerror = () => setRecording(false);
    r.onend = () => setRecording(false);
    try { r.start(); } catch (e) { setHint("Voice input failed to start"); return; }
    recRef.current = r; setRecording(true); setHint(null);
  };
  return (
    <span style={{ position: "absolute", right: 8, bottom: 8, display: "inline-flex", alignItems: "center", gap: 8 }}>
      {hint && <span style={{ fontFamily: SANS, fontSize: 10.5, color: "rgba(255,255,255,0.55)", background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "2px 8px" }}>{hint}</span>}
      <button type="button" onClick={toggle} aria-label={recording ? "Stop dictation" : "Dictate with voice"}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 14, border: `1px solid ${recording ? "#fca5a5" : "rgba(224,192,129,0.4)"}`, background: recording ? "rgba(220,38,38,0.18)" : "rgba(224,192,129,0.08)", color: recording ? "#fca5a5" : C.tealMid, fontFamily: SANS, fontSize: 11, letterSpacing: 0.3, cursor: "pointer" }}>
        <Mic size={12} />{recording ? "Recording…" : "Voice"}
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
        style={{ width: "100%", boxSizing: "border-box", padding: "14px 14px 44px", borderRadius: 8, border: `1px solid ${error ? C.redInk : "rgba(255,255,255,0.18)"}`, background: "rgba(0,0,0,0.22)", color: C.white, fontFamily: SANS, fontSize: 15, lineHeight: 1.6, resize: "vertical", transition: "border-color 0.2s", ...style }}
      />
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
      {need && <div style={{ marginTop: 10, fontFamily: SANS, fontSize: 12.5, color: tried ? C.tealMid : "rgba(255,255,255,0.45)", textAlign: "center" }}>{need}</div>}
      <PrimaryButton onClick={submit} dim={!!need}>See what happens</PrimaryButton>
    </div>
  );
}

/* ---- Three-horizon consequence reveal ---- */
function ConsequenceReveal({ horizons, onBell, onDone }) {
  const [stage, setStage] = useState(0);
  const labels = ["Same Day", "Next Week", "Month End"];
  const advance = () => {
    if (stage < 2) { onBell(); setStage(stage + 1); }
    else { onDone(); }
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
        <Narration lines={horizons[["sameDay", "nextWeek", "monthEnd"][stage]] || []} />
      </div>
      <PrimaryButton onClick={advance}>{stage < 2 ? "Let time pass" : "What this may signal"}</PrimaryButton>
    </div>
  );
}

/* ---- Artifact card — labeled monospaced surface ---- */
function ArtifactCard({ caption, title, mono, lines }) {
  return (
    <div style={{ marginTop: 12 }}>
      {caption && (
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
          Artifact · {caption}
        </div>
      )}
      <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
        {title && (
          <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{title}</div>
        )}
        <div style={{ padding: 12, fontFamily: mono ? MONO : SANS, fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
          {lines.map((l, i) => <div key={i}>{l || " "}</div>)}
        </div>
      </div>
    </div>
  );
}

/* ---- Single-choice card for Segment F ---- */
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
      {!revealed
        ? <PrimaryButton onClick={() => sel && setRevealed(true)} dim={!sel}>Name it</PrimaryButton>
        : <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>}
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

/* ---- T3A logo ---- */
function T3ALogo({ size = 56 }) {
  return (
    <img src={(import.meta.env.BASE_URL || "/") + "logo.jpeg"} alt="The 3rd Academy"
      width={size} height={size}
      style={{ display: "block", margin: "0 auto", width: size, height: size, objectFit: "contain", borderRadius: 6 }} />
  );
}

/* ---- Cover ---- */
function CoverPage({ onContinue }) {
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center", paddingTop: 30 }}>
        <T3ALogo size={72} />
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 4, color: C.tealMid, marginTop: 22 }}>THE 3RD ACADEMY · AIWORKLAB</div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>AI-READY BEHAVIOURS · MODULE 3 · PRESSURE POINT · OVERRIDE</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, color: C.white, lineHeight: 1.25, margin: "28px 0 14px" }}>
          AI Override & Escalation
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: 460, margin: "0 auto" }}>
          M3 — AI Override & Escalation · AIWorkLab
        </p>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, maxWidth: 460, margin: "10px auto 0" }}>
          A behavioural rehearsal. Forty-five minutes. Private practice. No scores. No pass or fail.
        </p>
        <div style={{ marginTop: 32 }}>
          <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
        </div>
        <div style={{ marginTop: 56, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 0.5, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>{COPYRIGHT}</p>
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
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 3, color: C.tealMid, marginTop: 18, marginBottom: 18 }}>THE 3RD ACADEMY · AIWORKLAB</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: C.white, lineHeight: 1.4, marginBottom: 10 }}>Pressure Point 3 — AI Override & Escalation</h1>
        <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 26, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}>
          A private rehearsal under workplace pressure. Headphones recommended. Tap below to begin — audio will start with the cinematic opening.
        </p>
        <PrimaryButton onClick={onBegin}>Begin the rehearsal</PrimaryButton>
        <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 18 }}>{COPYRIGHT}</p>
        <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
          style={{ marginTop: 30, padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "rgba(255,255,255,0.8)", fontFamily: SANS, fontSize: 13.5, cursor: "pointer" }}>
          Exit — return home
        </button>
      </div>
    </Stage>
  );
}

/* ---- Framework return (auto-advance) ---- */
function FrameworkReturnScreen({ content, onDone }) {
  const piper = usePiper();
  const playedRef = useRef(false);
  const seconds = content.durationSeconds || 25;
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
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>{content.lead}</p>
        <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.78)", marginBottom: 30, lineHeight: 1.6 }}>{content.body}</p>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 16 }}>THE WINDOW RULE</div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px 22px", marginBottom: 26 }}>
          {(content.steps || []).map((s, i) => (
            <span key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: "clamp(20px, 5vw, 26px)", color: C.white, animationDelay: `${0.8 + i * 0.5}s`, fontWeight: 500 }}>{s}</span>
          ))}
        </div>
        {content.tagline && <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, marginBottom: 22, animationDelay: "3.4s" }}>{content.tagline}</p>}
        {content.carryForward && <p className="bf-fade" style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto", animationDelay: "4.2s" }}>{content.carryForward}</p>}
        <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,0.35)", marginTop: 30 }}>The closing continues in a moment.</p>
      </div>
    </Stage>
  );
}

/* ---- Awe Close ---- */
function AweClose({ content, onMotif, onDone, persistKey }) {
  const [beat, setBeat] = useState(1);
  const [text, setTextRaw] = useState(__recall(persistKey));
  const setText = (v) => { setTextRaw(v); __persist(persistKey, v); };
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => { setBeat(2); onMotif(); }, reduceMotion ? 600 : 4000);
    const t2 = setTimeout(() => setBeat(3), reduceMotion ? 1000 : 6200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

/* ============================================================================
   FLOW CONTROLLER
   ========================================================================== */

const SEGMENT_LABEL = {
  cover: "Cover", a: "Segment A", b: "Segment B", c: "Segment C",
  e: "Segment E · Layered Scenario Lab", f: "Segment F · Micro-Drills", g: "Segment G",
};
function segmentOf(screen) {
  if (screen === "cover" || screen === "enter") return "cover";
  if (screen.startsWith("a")) return "a";
  if (screen.startsWith("b")) return "b";
  if (screen.startsWith("c")) return "c";
  if (screen.startsWith("ls") || screen === "e_intro" || screen === "e_signature") return "e";
  if (screen.startsWith("f")) return "f";
  if (screen.startsWith("g") || screen === "retention" || screen === "done") return "g";
  return "";
}

const initialState = {
  screen: "enter",
  history: [],
  paused: false,
  coldOpenPath: null,
  // LS state — one index per layered scenario (0=LS1, 1=LS2)
  lsIndex: 0,
  // Decide + Pressure choices per LS
  lsDecide: [null, null],
  lsPressure: [null, null],
  analyses: [],
  segmentBReflection: "",
  segmentCResponses: {},
  segmentFAnswers: { f1: [], f2: [] },
  retentionPath: null,
  finalSentence: "",
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
    case "COLD_OPEN":
      return { ...state, coldOpenPath: action.path, screen: "a2r", history: [...state.history, state.screen] };
    case "SET_LS_DECIDE": {
      const next = state.lsDecide.slice();
      next[state.lsIndex] = action.path;
      return { ...state, lsDecide: next };
    }
    case "SET_LS_PRESSURE": {
      const next = state.lsPressure.slice();
      next[state.lsIndex] = action.path;
      return { ...state, lsPressure: next };
    }
    case "NEXT_LS":
      return { ...state, lsIndex: state.lsIndex + 1, screen: "ls_setup", history: [...state.history, state.screen] };
    case "ANALYZE_ADD":
      return { ...state, analyses: [...state.analyses, action.analysis] };
    case "SET_B_REFLECTION": return { ...state, segmentBReflection: action.text };
    case "SET_C_RESPONSE": return { ...state, segmentCResponses: { ...state.segmentCResponses, [action.key]: action.value } };
    case "SET_F_ANSWER": {
      const f = state.segmentFAnswers;
      return { ...state, segmentFAnswers: { ...f, [action.exercise]: [...f[action.exercise], action.value] } };
    }
    case "SET_RETENTION": return { ...state, retentionPath: action.path };
    case "FINAL": return { ...state, finalSentence: action.text };
    default: return state;
  }
}

export default function BridgeFastM3ModuleRoot() {
  return (
    <ModuleErrorBoundary>
      <PiperProvider>
        <BridgeFastM3Module />
      </PiperProvider>
    </ModuleErrorBoundary>
  );
}

function BridgeFastM3Module() {
  const [st, dispatch] = useReducer(reducer, initialState);
  const audio = useAudio();
  const piper = usePiper();
  const [a0phase, setA0phase] = useState(0);

  const onPause = useCallback(() => {
    piper.stop();
    dispatch({ type: "PAUSE" });
  }, [piper]);

  const M = M3_CONTENT;
  const A = M.segmentA;
  const B = M.segmentB;
  const CC = M.segmentC;
  const EI = M.segmentE;
  const F = M.segmentF;
  const G = M.segmentG;
  const R = M.retentionCheck;

  const LS = LS_CHAIN[st.lsIndex];
  const decideChoice = st.lsDecide[st.lsIndex];
  const pressureChoice = st.lsPressure[st.lsIndex];

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
            {A.coldOpen.centralQuestion}
          </div>
        </div>
      </div>
    );
  }
  else if (st.screen === "a1") {
    // Beat 1 — D2 callback (fallback for MVP).
    // TODO(cross-module-memory): stitch wrapper MP3 + Web Speech API sentence +
    // wrapper MP3 tail once D2's final_personal_sentence is reachable via the
    // cross_module_memory_store. Same pattern as D3.
    const cb = A.a0.d2Callback;
    const callbackFallback = cb?.fallback || "";
    const co = A.coldOpen;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT A · COLD OPEN</div>
        {cb && (
          <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>D2 → M3 · Cross-lab callback (Beat 1)</div>
            <AVPlaceholder label="Beat 1 · D2 callback (fallback variant — MVP)" text={callbackFallback} />
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "8px 0 0" }}>
              {callbackFallback}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: "10px 0 0" }}>
              When the cross-module memory store is wired up, this beat will play with the participant's own D2 final sentence read back to them. For MVP, the standalone fallback plays.
            </p>
          </div>
        )}
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
          {co.scene}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 12 }}>{co.sceneDescription}</p>
        <ArtifactCard caption="AI pricing dashboard (shared screen)" title={co.dashboard.title} mono lines={co.dashboard.lines} />
        <ArtifactCard caption="Meeting transcript (scrolling panel)" title={co.transcript.title} mono lines={co.transcript.lines} />
        <AVPlaceholder label="Beat 2 · cold open Recognition Moment seed" text={co.narration.join("\n\n")} />
        <Narration lines={co.narration} speakable={false} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "16px 0", alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: 13, padding: "6px 12px", borderRadius: 6, background: "rgba(200,163,92,0.14)", color: C.tealMid, border: `1px solid ${C.tealMid}` }}>{co.timerLabel}</span>
          <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{co.timerHint}</span>
          <span style={{ fontFamily: MONO, fontSize: 12, padding: "4px 10px", borderRadius: 6, background: "rgba(184,60,56,0.14)", color: C.redInk }}>{co.muteHint}</span>
        </div>
        <PrimaryButton onClick={() => goto("a2")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "a2") {
    // Cold-open decision path options (a/b/c) — Do you unmute?
    // AUTHORED — script does not enumerate cold-open A choices; the framing
    // mirrors the A-3 central question (override or obey). These are pre-LS1
    // orientation choices that anchor the G-1 callback register.
    const coOptions = [
      { key: "a", label: "Stay muted. The meeting will close in a moment." },
      { key: "b", label: "Unmute now. Name the cohort mismatch with one example." },
      { key: "c", label: "Unmute now. Ask Dana to pause the rollout." },
    ];
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>SEGMENT A · COLD OPEN · DECISION BEAT</div>
        <Decision persistKey={st.screen}
          prompt="The room is silent. The timer reads 7:46. The mute icon glows gold. What is your first instinct?"
          options={coOptions}
          justificationPrompt="Why this option? What are you protecting, and what are you risking?"
          audioLabel="Cold-open decision prompt"
          audioText="The room is silent. The timer reads 7:46. The mute icon glows gold. What is your first instinct?"
          onSubmit={(p) => dispatch({ type: "COLD_OPEN", path: p })}
        />
      </Stage>
    );
  }
  else if (st.screen === "a3") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, textAlign: "center", marginBottom: 24 }}>That was rehearsal.</p>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 22, borderLeft: `3px solid ${C.teal}` }}>
          {A.safetyFloor.card.map((l, i) => (
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
        <AVPlaceholder label="Central question" text={A.coldOpen.centralQuestion} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>THE QUESTION THAT RUNS THROUGH THIS MODULE</div>
          <p style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.5 }}>{A.coldOpen.centralQuestion}</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginTop: 22 }}>{A.coldOpen.safetyLine}</p>
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
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 24 }}>What you just lived through</h2>
        <AVPlaceholder label={B.b1.label} text={B.b1.narration.join("\n\n")} />
        <Narration lines={B.b1.narration} speakable={false} />
        <PrimaryButton onClick={() => goto("b2")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "b2") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>B-2 · THE OVERRIDE STANDARD</div>
        <AVPlaceholder label={B.b2.label} text={[B.b2.title, ...B.b2.items, B.b2.close].join("\n\n")} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "22px 24px", marginTop: 8 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>{B.b2.title}</div>
          {B.b2.items.map((it, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 16.5, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, margin: "0 0 10px" }}>• {it}</p>
          ))}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: C.tealMid, lineHeight: 1.65, margin: "16px 0 0" }}>{B.b2.close}</p>
        </div>
        <PrimaryButton onClick={() => goto("b3")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "b3") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>B-3 · WHAT THIS STANDARD REFUSES</div>
        <AVPlaceholder label={B.b3.label} text={[B.b3.title, ...B.b3.items].join("\n\n")} />
        <div style={{ background: "rgba(224,120,86,0.08)", border: `1px solid ${C.amber}`, borderRadius: 12, padding: "22px 24px", marginTop: 8 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.amber, fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>{B.b3.title}</div>
          {B.b3.items.map((it, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.65, margin: "0 0 10px" }}>• {it}</p>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("c1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT C — RECOGNITION BRIEFS ============== */
  else if (st.screen === "c1") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{CC.c1.title}</h2>
        <AVPlaceholder label={CC.c1.label} text={CC.c1.narration.join("\n\n")} />
        <Narration lines={CC.c1.narration} speakable={false} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "24px 22px", margin: "22px 0 0", textAlign: "center" }}>
          <div style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: C.white, lineHeight: 1.4, fontWeight: 500, marginBottom: 10 }}>{CC.c1.lockedCard.title}</div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.65, margin: 0 }}>{CC.c1.lockedCard.line}</p>
        </div>
        <PrimaryButton onClick={() => goto("c2")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "c2") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 2 of 2 · SIGNATURE FRAMEWORK</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 12 }}>{CC.c2.title}</h2>
        <div style={{ background: C.paper, color: C.ink, borderRadius: 12, padding: "26px 22px", marginBottom: 22, textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 12 }}>{CC.c2.frameworkCard.heading}</div>
          {CC.c2.frameworkCard.steps.map((s, i) => (
            <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: "clamp(17px, 4vw, 20px)", color: C.teal, fontWeight: 600, margin: "0 0 8px", animationDelay: `${i * 0.5}s` }}>{s}</p>
          ))}
        </div>
        <AVPlaceholder label={CC.c2.label} text={CC.c2.narration.join("\n\n")} />
        <Narration lines={CC.c2.narration} speakable={false} />
        <PrimaryButton onClick={() => goto("c_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "c_complete") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT C · COMPLETE · TRANSITION TO SEGMENT E</div>
        <AVPlaceholder label={CC.complete.label} text={CC.complete.narration.join("\n\n")} />
        {CC.complete.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <PrimaryButton onClick={() => goto("e_intro")}>Enter the Scenario Lab</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT E — LAYERED SCENARIO LAB ============== */
  else if (st.screen === "e_intro") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · AIWORKLAB SCENARIO LAB</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, textAlign: "center", marginBottom: 20 }}>{EI.intro.title}</h2>
        <AVPlaceholder label={EI.intro.label} text={EI.intro.lines.join("\n\n")} />
        {EI.intro.lines.map((l, i) => (
          <p key={i} style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, textAlign: "center", margin: "0 0 12px" }}>{l}</p>
        ))}
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, textAlign: "center", marginTop: 12 }}>{EI.intro.subtle}</p>
        <PrimaryButton onClick={() => goto("ls_setup")}>Begin LS{st.lsIndex + 1}</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "ls_setup") {
    // LS1 has no cold-setup; LS2 does (Rita + Sarah drift).
    const isLS2 = st.lsIndex === 1;
    if (!isLS2) {
      body = (
        <Stage>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>LAYERED SCENARIO {st.lsIndex + 1} OF 2</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 14 }}>{LS.title}</h2>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 22 }}>
            {LS.runtimeNote} Pressure type: <span style={{ color: C.tealMid }}>{LS.pressureType.replace("_", " / ")} — {LS.pressureSubtype.replace("_", " ")}</span>.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
            You are still in Dana's meeting. The room is silent. The timer is closing. The next beat is Inspect — you work the evidence before you decide.
          </p>
          <PrimaryButton onClick={() => goto("ls_inspect")}>Continue to Inspect</PrimaryButton>
        </Stage>
      );
    } else {
      // LS2 cold setup with within-module memory (Sarah's Slack drifts by LS1 path).
      const cs = LS.coldSetup;
      const ls1Path = st.lsDecide[0] || "a"; // AUTHORED — safe default when back-nav'd
      const sarah = cs.sarahSlackByLS1[ls1Path] || cs.sarahSlackByLS1.a;
      body = (
        <Stage>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>LAYERED SCENARIO 2 OF 2</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 14 }}>{LS.title}</h2>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 20 }}>
            {LS.runtimeNote} Pressure type: <span style={{ color: C.tealMid }}>{LS.pressureType.replace("_", " / ")} — {LS.pressureSubtype.replace("_", " ")}</span>.
          </p>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
            {cs.scene}
          </div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 12 }}>{cs.description}</p>
          <ArtifactCard caption="Slack notification (Rita — 2:46 PM)" title={`${cs.ritaSlack.author} · ${cs.ritaSlack.time}`} lines={[cs.ritaSlack.text]} />
          <ArtifactCard caption="Slack notification (Sarah — 2:30 PM)" title={`${sarah.author} · ${sarah.time}`} lines={[sarah.text]} />
          <AVPlaceholder label="LS2 · cold setup narration" text={`${cs.ritaSlack.text}\n\n${sarah.text}`} />
          <PrimaryButton onClick={() => goto("ls_inspect")}>Continue to Inspect</PrimaryButton>
        </Stage>
      );
    }
  }
  else if (st.screen === "ls_inspect") {
    const ins = LS.inspect;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>
          LS{st.lsIndex + 1} · INSPECT BEAT · MOBILE MODE: {ins.mobileMode.toUpperCase().replace("_", "-")}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: 13, padding: "6px 12px", borderRadius: 6, background: "rgba(200,163,92,0.14)", color: C.tealMid, border: `1px solid ${C.tealMid}` }}>{ins.timerLabel}</span>
        </div>
        <AVPlaceholder label={ins.label} text={ins.observationalPrompt} />
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.65, marginBottom: 8 }}>{ins.observationalPrompt}</p>
        <ArtifactCard caption="Source panel (AI output)" title={ins.sourcePanel.title} mono lines={ins.sourcePanel.lines} />
        <ArtifactCard caption="Source panel (your notes)" title={ins.outputPanel.title} mono lines={ins.outputPanel.lines} />
        <div style={{ background: "rgba(200,163,92,0.06)", border: `1px dashed ${C.tealMid}`, borderRadius: 10, padding: "14px 16px", marginTop: 14 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Recognition Moment</div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{ins.recognitionMoment}</p>
        </div>
        <PrimaryButton onClick={() => goto("ls_decide")}>Continue to Decide</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "ls_decide") {
    const d = LS.decide;
    // LS2 Decide prompt drifts by LS1 path (within-module memory thread 2).
    let prompt = d.prompt;
    if (st.lsIndex === 1 && d.promptByLS1) {
      const ls1Path = st.lsDecide[0] || "a";
      prompt = d.promptByLS1[ls1Path] || d.promptByLS1.a;
    }
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>LS{st.lsIndex + 1} · DECIDE BEAT</div>
        <Decision persistKey={st.screen}
          prompt={prompt}
          options={d.options}
          justificationPrompt={d.justificationPrompt}
          audioLabel={d.label}
          audioText={prompt}
          onSubmit={(p, justification) => {
            dispatch({ type: "SET_LS_DECIDE", path: p });
            const a = localAnalyze(justification);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `LS${st.lsIndex + 1}:decide`, path: p } });
            goto("ls_pressure");
          }}
        />
      </Stage>
    );
  }
  else if (st.screen === "ls_pressure") {
    const p = LS.pressure;
    const trigger = p.triggerByDecide[decideChoice] || p.triggerByDecide.a;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>LS{st.lsIndex + 1} · PRESSURE BEAT · {LS.pressureType.replace("_", " / ").toUpperCase()}</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: 13, padding: "6px 12px", borderRadius: 6, background: "rgba(224,120,86,0.14)", color: C.amber, border: `1px solid ${C.amber}` }}>{p.timerLabel}</span>
        </div>
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, marginBottom: 22 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>The pressure arrives</div>
          <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, margin: 0 }}>{trigger}</p>
          {st.lsIndex === 1 && p.jamesOverlap && (
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: C.amber, lineHeight: 1.6, marginTop: 12 }}>
              {p.jamesOverlap}
            </p>
          )}
        </div>
        <Decision persistKey={st.screen}
          prompt={p.prompt}
          options={p.options}
          justificationPrompt={p.justificationPrompt}
          audioLabel={p.label}
          audioText={`${trigger}\n\n${p.prompt}`}
          onSubmit={(pp, justification) => {
            dispatch({ type: "SET_LS_PRESSURE", path: pp });
            const a = localAnalyze(justification);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: `LS${st.lsIndex + 1}:pressure`, path: pp } });
            goto("ls_consequence");
          }}
        />
      </Stage>
    );
  }
  else if (st.screen === "ls_consequence") {
    // Compose horizons from decide × pressure.
    const cons = LS.consequences[decideChoice] || LS.consequences.a;
    const pKey = `p${pressureChoice || "a"}`;
    const horizons = {
      sameDay: cons.sameDay?.[pKey] || cons.sameDay?.pa || [],
      nextWeek: cons.nextWeek?.[pKey] || cons.nextWeek?.pa || [],
      monthEnd: cons.monthEnd?.[pKey] || cons.monthEnd?.pa || [],
    };
    body = (
      <Stage>
        <ConsequenceReveal horizons={horizons} onBell={audio.strikeBell} onDone={() => goto("ls_interp")} />
      </Stage>
    );
  }
  else if (st.screen === "ls_interp") {
    const cons = LS.consequences[decideChoice] || LS.consequences.a;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>What may have been noticed</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: C.white, lineHeight: 1.6 }}>"{cons.interp}"</p>
        {cons.mirrorRule && pressureChoice === cons.mirrorRule.composition?.[1] && decideChoice === cons.mirrorRule.composition?.[0] && (
          <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: 10, background: "rgba(224,120,86,0.1)", border: `1px solid ${C.amber}` }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.amber, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>The line</div>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{cons.mirrorRule.line}</p>
          </div>
        )}
        <PrimaryButton onClick={() => goto("ls_signal")}>How each path may land</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "ls_signal") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>What each path may have communicated</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LS.signalPanel.map((s) => {
            const chosen = s.key === decideChoice;
            return (
              <div key={s.key} style={{ borderRadius: 10, padding: 14, background: chosen ? "rgba(200,163,92,0.1)" : "rgba(255,255,255,0.03)", border: chosen ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: chosen ? C.tealMid : "rgba(255,255,255,0.8)", marginBottom: 5 }}>Path {s.key.toUpperCase()} — {s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Signal: {s.signal}</div>
                {s.effect && <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>}
              </div>
            );
          })}
        </div>
        <PrimaryButton onClick={() => goto("ls_manager")}>The manager's view</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "ls_manager") {
    const cons = LS.consequences[decideChoice] || LS.consequences.a;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Manager Lens</div>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, fontStyle: "italic" }}>{cons.manager}</p>
        <PrimaryButton onClick={() => goto("ls_reflection")}>Reflect</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "ls_reflection") {
    body = (
      <Stage narrow>
        <Reflection persistKey={st.screen} prompt={LS.reflection} onDone={() => {
          if (st.lsIndex < LS_CHAIN.length - 1) dispatch({ type: "NEXT_LS" });
          else goto("f1_intro");
        }} />
      </Stage>
    );
  }

  /* ============== SEGMENT F — MICRO-DRILLS ============== */
  else if (st.screen === "f1_intro") {
    const f1 = F.f1;
    const osh = f1.onScreenHeader;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f1.title}</h2>
        <AVPlaceholder label="F1 · intro" text={f1.audioIntro} />
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
    const f1 = F.f1;
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
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{F.f1.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2_intro")}>Continue to F2</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "f2_intro") {
    const f2 = F.f2;
    const osh = f2.onScreenHeader;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 2 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f2.title}</h2>
        <AVPlaceholder label="F2 · intro" text={f2.audioIntro} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px", margin: "16px 0 18px" }}>
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
    const f2 = F.f2;
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
        <div style={{ background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 26, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{F.f2.closeCard}</p>
        </div>
        <div style={{ marginTop: 22, padding: "18px 22px", borderRadius: 10, border: "1px dashed rgba(255,255,255,0.14)", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: 0 }}>{F.reflectionBeat.line}</p>
        </div>
        <PrimaryButton onClick={() => goto("f_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "f_complete") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT F · COMPLETE · TRANSITION TO SEGMENT G</div>
        <AVPlaceholder label={F.complete.label} text={F.complete.narration.join("\n\n")} />
        {F.complete.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <PrimaryButton onClick={() => goto("g1")}>{F.complete.continueLabel}</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT G — SILENCE, AWE, RETENTION, COMPLETE ============== */
  else if (st.screen === "g1") {
    // G-1 · silence beat + four-note motif → G-2 auto after 4s
    body = <G1Silence onDone={() => goto("g2")} />;
  }
  else if (st.screen === "g2") {
    // Awe moment on cream/light background — no bell, held 1:46.
    body = <G2Awe content={G.g2} onContinue={() => goto("g_recognition")} />;
  }
  else if (st.screen === "g_recognition") {
    const callback = st.coldOpenPath ? G.callback[st.coldOpenPath] : null;
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RECOGNITION</div>
        <AVPlaceholder label="G · recognition" text={G.recognition.join("\n\n")} />
        <div className="bf-fade" style={{ margin: "16px 0 24px", padding: "22px 24px", borderRadius: 12, border: `1px solid ${C.tealMid}`, background: "rgba(200,163,92,0.08)", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 12 }}>{G.recognitionCard.title}</div>
          {G.recognitionCard.lines.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 17, color: C.white, lineHeight: 1.6, margin: "0 0 8px" }}>{l}</p>
          ))}
        </div>
        <Narration lines={G.recognition} speakable={false} />
        {callback && (
          <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: C.tealMid, lineHeight: 1.65, marginTop: 4 }}>{callback}</p>
        )}
        <PrimaryButton onClick={() => goto("g_framework")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "g_framework") {
    body = <FrameworkReturnScreen content={G.frameworkReturn} onDone={() => goto("g_growth")} />;
  }
  else if (st.screen === "g_growth") {
    body = (
      <Stage bg={C.paper} narrow>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 6 }}>YOUR GROWTH LOG</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, color: C.navy }}>Pressure Point 3 — AI Override & Escalation</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: C.inkSoft, marginTop: 6 }}>{M.dimension.central_question}</div>
        </div>
        <div style={{ padding: "20px 22px", borderRadius: 12, background: "rgba(26,24,20,0.03)", border: `1px solid ${C.line}` }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.teal, fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>You worked the evidence in this module.</div>
          <p style={{ fontFamily: SERIF, fontSize: 15.5, color: C.ink, lineHeight: 1.65, margin: 0 }}>
            You sat with the source material and the AI output side by side for the time it takes.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: C.inkSoft, lineHeight: 1.6, marginTop: 14, marginBottom: 0 }}>
            Not a score. Not a certificate. A private record of what you practised — including the pattern LS1 and LS2 revealed together.
          </p>
        </div>
        <button onClick={() => goto("retention_setup")}
          style={{ width: "100%", minHeight: 48, marginTop: 24, borderRadius: 10, border: "none", background: C.navy, color: C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          Continue
        </button>
      </Stage>
    );
  }
  else if (st.screen === "retention_setup") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RETENTION CHECK SETUP</div>
        <div style={{ background: "rgba(200,163,92,0.06)", border: `1px solid ${C.tealMid}`, borderRadius: 12, padding: "22px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: 17, color: C.white, lineHeight: 1.7, margin: "0 0 8px" }}>{G.g3.title}</p>
          {G.g3.lines.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 6px" }}>{l}</p>
          ))}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {G.g3.channels.map((ch) => (
              <span key={ch} style={{ fontFamily: SANS, fontSize: 12.5, padding: "6px 12px", borderRadius: 16, border: ch === G.g3.channelDefault ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.18)", color: ch === G.g3.channelDefault ? C.tealMid : "rgba(255,255,255,0.6)", background: ch === G.g3.channelDefault ? "rgba(200,163,92,0.1)" : "transparent" }}>
                {ch}{ch === G.g3.channelDefault && " · pre-selected"}
              </span>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, textAlign: "center", marginTop: 16 }}>
          The retention check fires 3–7 days from now. Random send within the window; avoid weekends.
        </p>
        <PrimaryButton onClick={() => goto("retention_scene")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "retention_scene") {
    // Retention Check — one scenario fragment + 3 options + one Same-Day horizon.
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
          {R.scene.time}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 12 }}>{R.scene.description}</p>
        <ArtifactCard caption="Slack notification" title={`${R.scene.author} · 10:42 AM`} lines={[R.scene.slack]} />
        <AVPlaceholder label="Retention Check · scene" text={`${R.scene.slack}\n\n${R.prompt}`} />
        <div style={{ marginTop: 22 }}>
          <Decision persistKey={st.screen}
            prompt={R.prompt}
            options={R.options}
            justificationPrompt="One line — why this option?"
            minChars={10}
            onSubmit={(p) => {
              dispatch({ type: "SET_RETENTION", path: p });
              goto("retention_sameday");
            }}
          />
        </div>
      </Stage>
    );
  }
  else if (st.screen === "retention_sameday") {
    const path = st.retentionPath || "a";
    const sameDay = R.sameDay[path];
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>RETENTION CHECK · SAME DAY</div>
        <AVPlaceholder label="Retention · Same Day" text={sameDay} />
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.92)", lineHeight: 1.7 }}>{sameDay}</p>
        <div style={{ marginTop: 24, padding: "18px 20px", borderRadius: 10, border: "1px dashed rgba(255,255,255,0.14)", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{R.completionLine}</p>
        </div>
        <PrimaryButton onClick={() => goto("g4")}>Continue</PrimaryButton>
      </Stage>
    );
  }
  else if (st.screen === "g4") {
    body = <AweClose persistKey={st.screen} content={G} onMotif={audio.playMotif} onDone={(s) => { dispatch({ type: "FINAL", text: s }); goto("done"); }} />;
  }
  else if (st.screen === "done") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          {st.finalSentence && (
            <>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 14 }}>YOU WROTE THIS</div>
              <p style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.5, marginBottom: 30 }}>"{st.finalSentence}"</p>
            </>
          )}
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 8 }}>MODULE COMPLETE</div>
          <p style={{ fontFamily: SERIF, fontSize: 20, color: C.white, lineHeight: 1.5, marginBottom: 10 }}>{G.g4.title}</p>
          <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{G.g4.body}</p>
          <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 10, lineHeight: 1.6 }}>
            Your retention check will arrive in 3 to 7 days.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
            <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
              style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.navy, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {G.g4.returnLabel}
            </button>
            <button onClick={() => { /* Growth Log placeholder */ }}
              style={{ minHeight: 48, borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "transparent", color: C.tealMid, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {G.g4.openLabel}
            </button>
          </div>
          <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
            style={{ marginTop: 24, padding: "10px 22px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: SANS, fontSize: 13, cursor: "pointer" }}>
            Exit
          </button>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 28 }}>{COPYRIGHT}</p>
        </div>
      </Stage>
    );
  }

  // a2r — cold-open same-day snapshot per path. AUTHORED. The script's
  // cautionary-story function for the cold open is absorbed into LS1's
  // Decide × Pressure horizons per Section 1.1 (Segment D omitted). These
  // snapshots keep the DPS same-day-consequence pattern operational without
  // duplicating LS1's horizon narrations.
  else if (st.screen === "a2r") {
    const snapshots = {
      a: "You stay muted. Dana closes the meeting. The rollout is confirmed. You will meet this moment again in a few seconds — same room, same timer, more options.",
      b: "You unmute. Dana pauses. \"You had something?\" The window is open again. You will meet the room's full response in a few seconds.",
      c: "You unmute. \"Can we pause?\" Dana looks up. The meeting will feel this ask before it feels anything else. You will meet the room's full response in a few seconds.",
    };
    const line = snapshots[st.coldOpenPath] || snapshots.a;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>Same Day</div>
        <Narration lines={[line]} />
        <PrimaryButton onClick={() => goto("a3")}>Continue</PrimaryButton>
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
              style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.navy, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              Restart from the beginning
            </button>
          </div>
        </div>
      </Stage>
    );
  }

  /* ----- chrome ----- */
  const noChromeScreens = ["enter", "cover", "a0", "g1", "g2", "g4"];
  const showChrome = !noChromeScreens.includes(st.screen);
  const canBack = st.history.length > 0 && showChrome && st.screen !== "g_framework" && st.screen !== "done";
  const segLabel = SEGMENT_LABEL[segmentOf(st.screen)];
  // Cream / paper backgrounds on the Growth Log screen (g_growth) invert chrome.
  const lightChromeScreens = ["g_growth"];
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

/* ---- G-1 silence beat + four-note motif ---- */
function G1Silence({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, reduceMotion ? 800 : 4000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{ minHeight: "100%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ opacity: 0, position: "absolute" }}>The silence is the beat.</span>
    </div>
  );
}

/* ---- G-2 awe moment: two lines held on the warm dark background ---- */
function G2Awe({ content, onContinue }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // 1:46 hold per script; scaled down to 8s to keep MVP UX moving. The bell
    // stays off — the silence is the point.
    const t = setTimeout(() => setReady(true), reduceMotion ? 2000 : 8000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ minHeight: "100%", background: C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="bf-fade" style={{ textAlign: "center", maxWidth: 480 }}>
        {content.lines.map((l, i) => (
          <p key={i} style={{ fontFamily: SERIF, fontSize: "clamp(24px, 6vw, 34px)", color: C.white, lineHeight: 1.35, margin: "0 0 8px", fontWeight: 400 }}>{l}</p>
        ))}
        {ready && (
          <button onClick={onContinue} className="bf-fade"
            style={{ marginTop: 44, padding: "10px 22px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: SANS, fontSize: 13.5, cursor: "pointer" }}>
            Continue quietly
          </button>
        )}
      </div>
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
      @keyframes bfHair { 0% { opacity: 0.15; } 100% { opacity: 0; } }
      .bf-hairline { animation: bfHair 2s ease forwards; }
      @keyframes bfSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .bf-spin { animation: bfSpin 1.1s linear infinite; }
      ::selection { background: ${C.tealMid}; color: ${C.navy}; }
    `}</style>
  );
}
