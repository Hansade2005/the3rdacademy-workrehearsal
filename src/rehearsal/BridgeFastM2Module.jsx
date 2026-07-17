import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Pause, ChevronRight, ChevronLeft, Volume2, Play, Square, Loader2, Mic } from "lucide-react";
import { M2_CONTENT, LS1_CONTENT_M2, LS2_CONTENT_M2 } from "./m2Content.js";
import { C } from "./theme.js";
import { PiperProvider, usePiper } from "./usePiper.jsx";

/* ============================================================================
   THE 3RD ACADEMY · BridgeFast™ Engine — M2 Production Build
   AIWorkLab · Pressure Point 2 — AI Disclosure & Attribution.
   Segments A · B · C · E · F · G. Segment D omitted per AIWorkLab standard.
   Layered scenarios LS1 → LS2 with intra-module residue.
   ========================================================================== */

/* ---- Session-scoped text persistence for text inputs (keyed per screen). ---- */
const __formStore = new Map();
const __recall = (key, fallback) => (key && __formStore.has(key)) ? __formStore.get(key) : (fallback === undefined ? "" : fallback);
const __persist = (key, value) => { if (key) __formStore.set(key, value); };

/* ---------------------------------- FONTS -------------------------------- */
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const MONO = "'Courier New', monospace";
const FOOTER = "Practice and development only. Not behavioural documentation.";
const COPYRIGHT = "© 2026 The 3rd Academy Inc. All rights reserved. Confidential.";

/* ============================================================================
   ERROR BOUNDARY — keeps the module from blanking to the global body
   background if any screen render throws.
   ========================================================================== */
class ModuleErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("M2 render error:", error, info); }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ position: "fixed", inset: 0, overflow: "auto", background: C.navyDeep, fontFamily: SANS, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: C.amber, marginBottom: 12 }}>NAVIGATION RECOVERY</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.4, marginBottom: 14 }}>Looks like we lost the page.</h2>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(245,239,230,0.75)", lineHeight: 1.65, marginBottom: 22 }}>
            Your session is still here. Reload to land back on the cover.
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
   AUDIO — Piper handles all narration. Brand bell + motif are no-ops until
   Tony supplies owned files.
   ========================================================================== */
function useAudio() {
  return { init: async () => {}, strikeBell: () => {}, playMotif: () => {} };
}

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================================
   CHROME
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
        <div style={{ width: 64, height: 64, borderRadius: 32, margin: "0 auto 18px", border: `1px solid ${C.tealMid}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(200,163,92,0.08)" }}>
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

/* ============================================================================
   ENGINE PRIMITIVES
   ========================================================================== */
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
          fontFamily: SANS, fontSize: small ? 11 : 12,
          letterSpacing: 0.3, cursor: "pointer",
        }}>
        <Icon size={small ? 11 : 13} className={isLoading ? "bf-spin" : ""} />
        {labelText}
      </button>
      <span style={{ fontFamily: SANS, fontSize: small ? 10 : 10.5, color: "rgba(255,255,255,0.4)", letterSpacing: 0.4, textTransform: "uppercase" }}>Optional</span>
      {piper.error && (
        <span title={piper.error} style={{
          fontFamily: SANS, fontSize: 11, color: C.redInk,
          background: "rgba(184,60,56,0.12)", border: "1px solid rgba(184,60,56,0.4)",
          borderRadius: 12, padding: "3px 9px", maxWidth: 280,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>⚠ {piper.error}</span>
      )}
    </span>
  );
}

function Narration({ lines, color = "rgba(255,255,255,0.92)", speakable = true }) {
  const arr = Array.isArray(lines) ? lines : [lines];
  const text = arr.filter(Boolean).join("\n\n");
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
      style={{ width: "100%", minHeight: 48, marginTop: 22, borderRadius: 10, border: "none", background: faded ? "rgba(200,163,92,0.4)" : C.teal, color: faded ? "rgba(255,255,255,0.7)" : C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: 0.3, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}>
      {children} <ChevronRight size={17} />
    </button>
  );
}

function AVPlaceholder({ label, text }) {
  if (!text) return null;
  return (
    <div style={{ margin: "12px 0", padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.tealMid}`, background: "rgba(200,163,92,0.06)", display: "flex", alignItems: "center", gap: 10, fontFamily: SANS, flexWrap: "wrap" }}>
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
    recRef.current = r;
    setRecording(true);
    setHint(null);
  };
  return (
    <span style={{ position: "absolute", right: 8, bottom: 8, display: "inline-flex", alignItems: "center", gap: 8 }}>
      {hint && (
        <span style={{ fontFamily: SANS, fontSize: 10.5, color: "rgba(255,255,255,0.55)", background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "2px 8px" }}>{hint}</span>
      )}
      <button type="button" onClick={toggle} aria-label={recording ? "Stop dictation" : "Dictate with voice"}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 14,
          border: `1px solid ${recording ? "#fca5a5" : "rgba(200,163,92,0.4)"}`,
          background: recording ? "rgba(220,38,38,0.18)" : "rgba(200,163,92,0.08)",
          color: recording ? "#fca5a5" : C.tealMid,
          fontFamily: SANS, fontSize: 11, letterSpacing: 0.3, cursor: "pointer",
        }}>
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
        style={{
          width: "100%", boxSizing: "border-box", padding: "14px 14px 44px",
          borderRadius: 8, border: `1px solid ${error ? C.redInk : "rgba(255,255,255,0.18)"}`,
          background: "rgba(0,0,0,0.22)", color: C.white,
          fontFamily: SANS, fontSize: 15, lineHeight: 1.6, resize: "vertical",
          transition: "border-color 0.2s", ...style,
        }} />
      <VoiceDictateButton onTranscript={appendTranscript} />
    </div>
  );
}

function ClickToReveal({ buttonLabel, children }) {
  const [revealed, setRevealed] = useState(false);
  if (revealed) return <div className="bf-fade">{children}</div>;
  return (
    <button onClick={() => setRevealed(true)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, margin: "18px 0",
        padding: "12px 18px", borderRadius: 24,
        border: `1px dashed ${C.tealMid}`, background: "rgba(200,163,92,0.06)",
        color: C.tealMid, fontFamily: SANS, fontSize: 13, letterSpacing: 0.4,
        cursor: "pointer",
      }}>
      <ChevronRight size={14} /> {buttonLabel}
    </button>
  );
}

/* ---- Artifact card (labeled monospaced card) ---- */
function Artifact({ title, children, mono }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.25)" }}>
      <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.55)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{title}</div>
      <div style={{ padding: 12, fontFamily: mono ? MONO : SANS, fontSize: 12.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>{children}</div>
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

/* ---- Artifact-write + reference variants ---- */
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
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", marginBottom: 8 }}>What you wrote</div>
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

/* ---- Three-horizon consequence reveal, with pressure modulation clause ---- */
function ConsequenceReveal({ horizons, pressureHeld, onBell, onDone }) {
  const [stage, setStage] = useState(0);
  const labels = ["Same Day", "Next Week", "Month End"];
  const keys = ["sameDay", "nextWeek", "monthEnd"];
  const modKeys = ["sameDayIfHeld", "nextWeekIfHeld", "monthEndIfHeld"];
  const modKeysFolded = ["sameDayIfFolded", "nextWeekIfFolded", "monthEndIfFolded"];
  const advance = () => {
    if (stage < 2) { onBell(); setStage(stage + 1); }
    else { onDone(); }
  };
  const arr = horizons[keys[stage]] || [];
  // Pick the appropriate modulation clause: if the base path is "concealment"
  // and the participant held under pressure, render the "IfHeld" alternate.
  // If base path is "disclosure" and the participant folded, render "IfFolded".
  const mod = pressureHeld === true ? horizons[modKeys[stage]] : pressureHeld === false ? horizons[modKeysFolded[stage]] : null;
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
        <Narration lines={arr} />
        {mod && Array.isArray(mod) && mod.length > 0 && (
          <div style={{ marginTop: 10, padding: "14px 16px", borderRadius: 10, background: "rgba(200,163,92,0.06)", border: `1px dashed ${C.tealMid}` }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>Under pressure — what shifted</div>
            {mod.map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "0 0 8px" }}>{l}</p>
            ))}
          </div>
        )}
      </div>
      <PrimaryButton onClick={advance}>{stage < 2 ? "Let time pass" : "What this may signal"}</PrimaryButton>
    </div>
  );
}

/* ---- Reflection (short-form open response) ---- */
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

/* ---- Sector assignment card ---- */
function SectorAssignment({ module }) {
  const variants = module?.sector_variants || [];
  const sa = module?.sectorAssignment;
  if (!variants.length || !sa) return null;
  return (
    <div style={{ margin: "22px 0 4px", padding: "16px 18px", borderRadius: 10, border: `1px dashed ${C.tealMid}`, background: "rgba(200,163,92,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>
        ✋ {sa.titleMVP}
      </div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
        {sa.mvpNotice}
      </p>
    </div>
  );
}

/* ---- Single-choice card (used in F1/F2 micro-drills). Re-keyed on
   parent st.screen to avoid selection leakage between vignettes. ---- */
function SingleChoiceCard({ vignette, options, answer, feedback, onContinue }) {
  const [sel, setSel] = useState(null);
  const [revealed, setRevealed] = useState(false);
  // Feedback may be a string (uniform) or a per-key map (F2 pattern).
  const fbText = typeof feedback === "string" ? feedback : (sel ? feedback[sel] : "");
  const optionLabels = options.map((o) => typeof o === "string" ? o : o.label);
  const optionKeys = options.map((o, i) => typeof o === "string" ? o : (o.key || String(i)));
  return (
    <div>
      <p style={{ fontFamily: SERIF, fontSize: 18, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: 20 }}>{vignette}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {optionLabels.map((label, i) => {
          const key = optionKeys[i];
          const active = sel === key;
          const isAnswer = revealed && answer && (label === answer || key === answer);
          const isWrongPick = revealed && active && !isAnswer;
          let border = "rgba(255,255,255,0.15)";
          if (isAnswer) border = C.tealMid;
          else if (isWrongPick) border = C.amber;
          else if (active) border = C.teal;
          return (
            <button key={key} onClick={() => !revealed && setSel(key)} disabled={revealed}
              style={{ textAlign: "left", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${border}`, background: active ? "rgba(200,163,92,0.14)" : "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.9)", fontFamily: SANS, fontSize: 14, cursor: revealed ? "default" : "pointer", transition: "border-color 0.2s, background 0.2s" }}>
              {label}
            </button>
          );
        })}
      </div>
      {revealed && fbText && (
        <div className="bf-fade" style={{ marginTop: 18, padding: 14, borderRadius: 10, background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}` }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: C.white, lineHeight: 1.6, margin: 0 }}>{fbText}</p>
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

/* ---- T3A logo ---- */
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
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 4, color: C.tealMid, marginTop: 22 }}>THE 3RD ACADEMY · AIWORKLAB</div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>M2 — AI DISCLOSURE & ATTRIBUTION · AIWORKLAB</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, color: C.white, lineHeight: 1.25, margin: "28px 0 14px" }}>
          AI Disclosure & Attribution
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: 440, margin: "0 auto" }}>
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
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: C.white, lineHeight: 1.4, marginBottom: 10 }}>M2 — AI Disclosure & Attribution · AIWorkLab</h1>
        <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 26, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}>
          A behavioural rehearsal. Headphones recommended. Tap below to begin — audio will start with the cinematic opening.
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

/* ---- Framework Return (no-input, auto-advance beat) ---- */
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
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 16 }}>THE MATERIAL-USE RULE</div>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "10px 22px", marginBottom: 26 }}>
          {content.steps.map((s, i) => (
            <span key={i} className="bf-fade" style={{ fontFamily: SERIF, fontSize: "clamp(18px, 4.5vw, 22px)", color: C.white, animationDelay: `${0.8 + i * 0.5}s`, fontWeight: 500 }}>{s}</span>
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

/* ---- Awe Close: bookend question → silence + motif → final sentence
   prompt. Verbatim per M2 script §G.2 — the two-line held card is
   handled on its own g_awe screen so the awe moment sits alone. ---- */
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

/* ---- Disclosure Pattern Panel — layered-scenario aggregate signature
   for M2. Replaces D3's four-scenario BehaviouralSignaturePanel. Reads
   the participant's LS1/LS2 Decide + Pressure choices and renders three
   observational tiles plus a signature card. ---- */
function DisclosurePatternPanel({ ls1Path, ls2Path, ls1PressureHeld, ls2PressureHeld, theme = "dark" }) {
  const light = theme === "light";
  const fg = light ? C.ink : "rgba(255,255,255,0.88)";
  const fgMute = light ? C.inkSoft : "rgba(255,255,255,0.55)";
  const tileBg = light ? "rgba(26,24,20,0.04)" : "rgba(255,255,255,0.04)";
  const tileBorder = light ? "rgba(26,24,20,0.1)" : "rgba(255,255,255,0.08)";
  const rowFor = (label, path, held) => ({
    label,
    path: path ? path.toUpperCase() : "—",
    held: held === true ? "held under pressure" : held === false ? "shifted under pressure" : "—",
    disclosed: path === "b" || path === "c",
  });
  const rows = [rowFor("LS1 · Client email", ls1Path, ls1PressureHeld), rowFor("LS2 · VP attribution", ls2Path, ls2PressureHeld)];
  // Signature reading — conservative categorisation for M2 (open discloser /
  // strategic discloser / silent recipient / mixed). The script's Lock 2
  // labels are developer-only; we render them as observational text.
  const bothDisclosed = rows.every((r) => r.disclosed);
  const bothSilent = rows.every((r) => !r.disclosed);
  let key, title, bodyText;
  if (bothDisclosed) {
    key = "open";
    title = "Open discloser — the line stayed visible";
    bodyText = "Across both scenarios, you named the material distinction. That is a pattern. Colleagues, clients, and senior leaders begin to read your work through that pattern, not just one moment at a time. The Material-Use Rule was in your hand when the room was warm and when the room was watching.";
  } else if (bothSilent) {
    key = "silent";
    title = "Silent recipient — the silence has weight";
    bodyText = "Across both scenarios, you let the credit stand. None of these decisions on their own would necessarily change how you are seen. Together, they begin to. Silence under public credit is itself a declaration — and the credit then sits on a process the next question will surface.";
  } else {
    key = "mixed";
    title = "Mixed — the rule held in one room, not the other";
    bodyText = "Your pattern is not uniform. In one scenario you named the line; in the other you did not. Mixed is the most common signature and the most informative one — it is the place where the next deliberate decision changes the trajectory more than any other.";
  }
  const accent = key === "silent" ? C.amber : C.tealMid;
  const cardBg = key === "open" ? "rgba(200,163,92,0.1)" : key === "silent" ? "rgba(224,120,86,0.12)" : (light ? "rgba(26,24,20,0.03)" : "rgba(255,255,255,0.04)");
  const cardBorder = key === "open" ? C.tealMid : key === "silent" ? C.amber : (light ? "rgba(26,24,20,0.12)" : "rgba(255,255,255,0.12)");
  return (
    <div>
      <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px, 4.5vw, 24px)", color: light ? C.navy : C.white, lineHeight: 1.3, marginBottom: 8, textAlign: "center" }}>{title}</h2>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: fgMute, lineHeight: 1.55, textAlign: "center", marginBottom: 20 }}>Two decisions, taken together, may signal this.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, marginBottom: 20 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ background: tileBg, border: `1px solid ${tileBorder}`, borderRadius: 10, padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 0.5, color: fgMute, marginBottom: 4, textTransform: "uppercase" }}>{r.label}</div>
              <div style={{ fontFamily: SERIF, fontSize: 15.5, color: fg }}>Path {r.path} · {r.held}</div>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 0.5, padding: "4px 10px", borderRadius: 12, color: r.disclosed ? C.tealMid : C.amber, background: r.disclosed ? "rgba(200,163,92,0.08)" : "rgba(224,120,86,0.1)" }}>
              {r.disclosed ? "DISCLOSED" : "SILENT"}
            </div>
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

/* ============================================================================
   FLOW CONTROLLER
   ========================================================================== */
const SEGMENT_LABEL = {
  cover: "Cover", a: "Segment A", b: "Segment B", c: "Segment C",
  e: "Segment E", f: "Segment F", g: "Segment G", break: "",
};
function segmentOf(screen) {
  if (screen === "cover" || screen === "enter") return "cover";
  if (screen.startsWith("break_")) return "break";
  if (screen.startsWith("a")) return "a";
  if (screen.startsWith("b")) return "b";
  if (screen.startsWith("c")) return "c";
  if (screen.startsWith("ls1_") || screen.startsWith("ls2_") || screen === "e_intro" || screen === "e_signature" || screen === "ls1_to_ls2") return "e";
  if (screen.startsWith("f")) return "f";
  if (screen.startsWith("g") || screen === "done") return "g";
  return "";
}

const initialState = {
  screen: "enter",
  history: [],
  paused: false,
  // LS1 state
  ls1Path: null,             // "a" | "b" | "c"
  ls1PressurePath: null,     // "a" | "b" | "c"
  ls1PressureHeld: null,     // true | false (computed after pressure decision)
  // LS2 state
  ls2Path: null,
  ls2PressurePath: null,
  ls2PressureHeld: null,
  // Segment B/C reflection captures
  segmentBReflection: "",
  segmentCResponses: {},
  // Segment F micro-drill answers
  segmentFAnswers: { f1: [], f2: null },
  // Final sentence + retention preview (content-only per script)
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
    case "SET_LS1_PATH": return { ...state, ls1Path: action.path };
    case "SET_LS1_PRESSURE": return { ...state, ls1PressurePath: action.path, ls1PressureHeld: action.held };
    case "SET_LS2_PATH": return { ...state, ls2Path: action.path };
    case "SET_LS2_PRESSURE": return { ...state, ls2PressurePath: action.path, ls2PressureHeld: action.held };
    case "SET_B_REFLECTION": return { ...state, segmentBReflection: action.text };
    case "SET_C_RESPONSE": return { ...state, segmentCResponses: { ...state.segmentCResponses, [action.key]: action.value } };
    case "SET_F1_ANSWER": return { ...state, segmentFAnswers: { ...state.segmentFAnswers, f1: [...state.segmentFAnswers.f1, action.value] } };
    case "SET_F2_ANSWER": return { ...state, segmentFAnswers: { ...state.segmentFAnswers, f2: action.value } };
    case "FINAL": return { ...state, finalSentence: action.text };
    default: return state;
  }
}

export default function BridgeFastM2ModuleRoot() {
  return (
    <ModuleErrorBoundary>
      <PiperProvider>
        <BridgeFastM2Module />
      </PiperProvider>
    </ModuleErrorBoundary>
  );
}

function BridgeFastM2Module() {
  const [st, dispatch] = useReducer(reducer, initialState);
  const audio = useAudio();
  const piper = usePiper();
  const [a0phase, setA0phase] = useState(0);

  const onPause = useCallback(() => {
    piper.stop();
    dispatch({ type: "PAUSE" });
  }, [piper]);

  const M = M2_CONTENT;
  const SA = M.segmentA;
  const SB = M.segmentB;
  const SC = M.segmentC;
  const SE = M.segmentE;
  const SF = M.segmentF;
  const SG = M.segmentG;
  const LS1 = LS1_CONTENT_M2;
  const LS2 = LS2_CONTENT_M2;

  // A-0 cinematic timing (5.0s, un-skippable). No motif file yet — playMotif
  // is a no-op until Tony supplies the four-note MP3.
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

  /* ----- render per screen ----- */
  let body = null;

  if (st.screen === "enter") {
    body = <EnterScreen onBegin={async () => { await audio.init(); goto("cover"); }} />;
  }
  else if (st.screen === "cover") {
    body = <CoverPage onContinue={() => goto("a0")} />;
  }

  /* ============== SEGMENT A ============== */
  else if (st.screen === "a0") {
    // Screen A-0 — silence beat + Tibetan-bell four-note motif. If D1 has
    // been completed in-session, the participant's D1 final sentence would
    // render here (verbatim, attributed to their own name). MVP fallback.
    // TODO(cross-module-memory): read participant's D1 emission from
    // sessionState.prior.D1.final_personal_sentence and render the wrapper
    // lead + sentence + wrapper tail as one narration.
    body = (
      <div style={{ minHeight: "100%", background: a0phase === 0 ? "#000" : C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.5s ease", padding: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div className="bf-fade" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, color: C.white, opacity: a0phase >= 0 ? 1 : 0, transition: "opacity 1s" }}>THE 3RD ACADEMY · AIWORKLAB</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: C.tealMid, lineHeight: 1.5, marginTop: 24, maxWidth: 460, opacity: a0phase >= 1 && a0phase < 2 ? 1 : 0, transition: "opacity 1s" }}>
            {M.dimension.central_question}
          </div>
        </div>
      </div>
    );
  }

  else if (st.screen === "a1") {
    // A-1 — Elena's email + your draft reply. Verbatim script text.
    const cb = SA.coldOpen.d1Callback;
    const callbackFallback = cb?.fallback || "";
    const email = SA.coldOpen.email;
    const draft = SA.coldOpen.draftReply;
    body = (
      <Stage>
        {cb && (
          <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>D1 → M2 · Cross-lab callback (Beat 1)</div>
            <AVPlaceholder label="Beat 1 · D1 callback (fallback variant — MVP)" text={callbackFallback} />
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "8px 0 0" }}>
              {callbackFallback}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: "10px 0 0" }}>
              When the cross-module memory store is wired up, this beat will play with the participant's own D1 final sentence read back to them. For MVP, the standalone fallback plays.
            </p>
          </div>
        )}
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SCENE · INBOX · 11:14 AM TUESDAY</div>
        <AVPlaceholder label="Beat 2 · Scene lead" text={SA.coldOpen.sceneLead.join("\n\n")} />
        <Narration lines={SA.coldOpen.sceneLead} speakable={false} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "8px 0 12px" }}>
          <Artifact title={email.title} mono>
            <div><strong>From:</strong> {email.from}</div>
            <div><strong>To:</strong> {email.to}</div>
            <div><strong>Sent:</strong> {email.sent}</div>
            <div><strong>Subject:</strong> {email.subject}</div>
            <div style={{ marginTop: 6 }}>
              {email.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
            </div>
          </Artifact>
          <Artifact title={draft.title} mono>
            {draft.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "8px 0 0" }}>
          {SA.coldOpen.recognitionSeed}
        </p>
        <PrimaryButton onClick={() => goto("a2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "a2") {
    // A-2 — the calendar strip. Verbatim per §A.3.
    const cal = SA.coldOpen.calendar;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SCENE · CALENDAR · 26 MINUTES TO THE CALL</div>
        <Artifact title={cal.title} mono>
          {cal.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
        </Artifact>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.6)", textAlign: "center", marginTop: 18 }}>
          A single inbox chime. No music. The draft reply remains visible.
        </p>
        <PrimaryButton onClick={() => goto("a3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "a3") {
    // A-3 — the Central Question. Verbatim per §A.4.
    const cq = SA.coldOpen.centralQuestionCard;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <AVPlaceholder label="The central question" text={cq.primary} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>THE QUESTION THAT RUNS THROUGH THIS MODULE</div>
          <p style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.5 }}>{cq.primary}</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginTop: 22 }}>{cq.secondary}</p>
          <PrimaryButton onClick={() => goto("a4")}>Continue</PrimaryButton>
        </div>
      </Stage>
    );
  }

  else if (st.screen === "a4") {
    // Safety floor card.
    body = (
      <Stage bg={C.navyDeep} narrow>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: C.tealMid, textAlign: "center", marginBottom: 24 }}>That was rehearsal.</p>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 22, borderLeft: `3px solid ${C.teal}` }}>
          {SA.safetyFloor.card.map((l, i) => (
            <p key={i} style={{ fontFamily: i === 0 ? SANS : SERIF, fontWeight: i === 0 ? 700 : 400, fontSize: i === 0 ? 13 : 14.5, letterSpacing: i === 0 ? 0.5 : 0, color: i === 0 ? C.white : "rgba(255,255,255,0.82)", lineHeight: 1.55, margin: "0 0 12px" }}>{l}</p>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("b1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT B ============== */
  else if (st.screen === "b1") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT B · BEHAVIOUR STANDARD</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 24 }}>The disclosure standard</h2>
        <AVPlaceholder label="B-1 introduction" text={SB.intro.join("\n\n")} />
        <Narration lines={SB.intro} speakable={false} />
        <PrimaryButton onClick={() => goto("b2")}>Open the standard</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b2") {
    const card = SB.standardCard;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>BEHAVIOUR STANDARD · M2 · AIWORKLAB</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{card.title}</h2>
        <AVPlaceholder label="B-2 standard read aloud" text={[card.title + ".", ...card.items, card.footer].join("\n\n")} />
        <div style={{ background: "rgba(200,163,92,0.06)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px" }}>
          {card.items.map((it, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 10, marginBottom: 12 }}>
              <span style={{ color: C.tealMid, fontFamily: SERIF, fontSize: 20 }}>·</span>
              <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.65, margin: 0 }}>{it}</p>
            </div>
          ))}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginTop: 12, marginBottom: 0 }}>{card.footer}</p>
        </div>
        <PrimaryButton onClick={() => goto("b3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b3") {
    const refuses = SB.refusesCard;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>B-3 · WHAT THE STANDARD REFUSES</div>
        <AVPlaceholder label="B-3 what the standard refuses" text={[refuses.title + ".", ...refuses.items.map((it) => `${it.h} — ${it.t}`)].join("\n\n")} />
        <h2 style={{ fontFamily: SERIF, fontSize: 20, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{refuses.title}</h2>
        <div style={{ background: "rgba(224,120,86,0.06)", border: `1px solid ${C.amber}`, borderRadius: 12, padding: "18px 22px" }}>
          {refuses.items.map((it, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: SERIF, fontSize: 16, color: C.white, fontStyle: "italic", marginBottom: 4 }}>{it.h}</div>
              <div style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{it.t}</div>
            </div>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("b_reflect")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b_reflect") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>B · REFLECTION</div>
        <AVPlaceholder label="B reflection prompt" text={SB.reflectionPrompt} />
        <Reflection persistKey={st.screen} prompt={SB.reflectionPrompt} minChars={30} onDone={(text) => {
          dispatch({ type: "SET_B_REFLECTION", text });
          goto("c1");
        }} />
      </Stage>
    );
  }

  /* ============== SEGMENT C — RECOGNITION BRIEFS ============== */
  else if (st.screen === "c1") {
    const c1 = SC.c1;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c1.title}</h2>
        <AVPlaceholder label="C1 narration" text={c1.narration.join("\n\n")} />
        <Narration lines={c1.narration} speakable={false} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px", margin: "18px 0" }}>
          <p style={{ fontFamily: SERIF, fontSize: 18, color: C.white, lineHeight: 1.5, margin: 0, textAlign: "center", fontWeight: 500 }}>{c1.reveal.title}</p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginTop: 10, marginBottom: 0, textAlign: "center" }}>{c1.reveal.body}</p>
        </div>
        <PrimaryButton onClick={() => goto("c2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c2") {
    const c2 = SC.c2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 2 of 2 · FRAMEWORK REVEAL</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c2.title}</h2>
        <ClickToReveal buttonLabel="Reveal The Material-Use Rule">
          <div style={{ textAlign: "center", padding: "28px 16px", background: C.paper, color: C.ink, borderRadius: 12, margin: "0 0 24px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 14 }}>{c2.framework.name.toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              {c2.framework.steps.map((s, i) => (
                <div key={i} className="bf-fade" style={{ animationDelay: `${i * 0.6}s`, fontFamily: SERIF, fontSize: "clamp(16px, 4.5vw, 20px)", color: C.teal, fontWeight: 500, textAlign: "center" }}>
                  <span style={{ color: C.tealDeep, marginRight: 8 }}>{s.num}</span>{s.label}
                </div>
              ))}
            </div>
          </div>
          <AVPlaceholder label="C2 narration — after the reveal" text={c2.narration.join("\n\n")} />
          <Narration lines={c2.narration} speakable={false} />
          <PrimaryButton onClick={() => goto("c_complete")}>Continue</PrimaryButton>
        </ClickToReveal>
      </Stage>
    );
  }

  else if (st.screen === "c_complete") {
    const cc = SC.complete;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT C · COMPLETE · TRANSITION TO SEGMENT E</div>
        <AVPlaceholder label={cc.label} text={cc.narration.join("\n\n")} />
        {cc.narration.map((l, i) => (
          <p key={i} className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 16, textAlign: "center", animationDelay: `${i * 0.3}s` }}>{l}</p>
        ))}
        <PrimaryButton onClick={() => goto("break_1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "break_1") {
    const bp = SC.breakPoint1;
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
          <button onClick={() => goto("e_intro")}
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
  else if (st.screen === "e_intro") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · LAYERED SCENARIO LAB</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, textAlign: "center", marginBottom: 20 }}>Two layered scenarios. Different pressure. Same reflex.</h2>
        <AVPlaceholder label="Segment E introduction" text={SE.intro.join("\n\n")} />
        <Narration lines={SE.intro} speakable={false} />
        <SectorAssignment module={M.module} />
        <PrimaryButton onClick={() => goto("ls1_callback")}>Enter Layered Scenario 1</PrimaryButton>
      </Stage>
    );
  }

  /* ---------- LS1 — THE CLIENT'S EMAIL ---------- */
  else if (st.screen === "ls1_callback") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>LAYERED SCENARIO 1 OF 2 · SOCIAL / PEER PRESSURE</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 14 }}>{LS1.title}</h2>
        <AVPlaceholder label="LS1 callback" text={LS1.callback.join("\n\n")} />
        <Narration lines={LS1.callback} speakable={false} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "16px 0", fontFamily: SERIF, fontStyle: "italic", color: "rgba(255,255,255,0.85)", fontSize: 14.5, lineHeight: 1.6 }}>
          You have been here before. Same inbox, same draft, same clock. Now you carry the Material-Use Rule with you.
        </div>
        <AVPlaceholder label="LS1 intro" text={LS1.intro.join("\n\n")} />
        <Narration lines={LS1.intro} speakable={false} />
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, margin: "14px 0", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{LS1.briefing}</div>
        <PrimaryButton onClick={() => goto("ls1_inspect")}>Inspect the source before you decide</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls1_inspect") {
    // Inspect Surface — MOAT-CRITICAL. Two labeled monospaced artifact cards
    // (source + output) with an observational instruction and no submit button
    // per §1.4.D. Participant advances when ready.
    const ins = LS1.inspect;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 10, fontWeight: 700, textTransform: "uppercase" }}>{ins.label} · Mobile mode: {ins.mobileMode}</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, margin: "0 0 18px" }}>{ins.instruction}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{ins.source.caption}</div>
            <Artifact title={ins.source.title} mono>
              {ins.source.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
            </Artifact>
          </div>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{ins.output.caption}</div>
            <Artifact title={ins.output.title} mono>
              {ins.output.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
            </Artifact>
          </div>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "16px 0 0" }}>
          {ins.recognitionNote}
        </p>
        <PrimaryButton onClick={() => goto("ls1_decide")}>{ins.continueLabel}</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls1_decide") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14, textTransform: "uppercase" }}>LS1 · Decide</div>
        <Decision persistKey={st.screen} prompt={LS1.decisionPrompt} options={LS1.options} justificationPrompt={LS1.justificationPrompt}
          audioLabel="LS1 decision prompt" audioText={LS1.decisionPrompt}
          onSubmit={(p) => {
            dispatch({ type: "SET_LS1_PATH", path: p });
            goto("ls1_artifact");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "ls1_artifact") {
    const path = st.ls1Path;
    const aw = LS1.artifactWrite[path];
    // Path A = passive draft; Path B = brief AI note; Path C = full material.
    // Reference sets: Path A/C use the same ac reference variants (three);
    // Path B uses its own two-variant set.
    const refs = path === "b" ? LS1.references.b : LS1.references.ac;
    const closing = LS1.references.closing;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14, textTransform: "uppercase" }}>LS1 · Artifact write · Path {path?.toUpperCase()}</div>
        <ArtifactWrite persistKey={st.screen} prompt={aw.prompt} submitLabel={aw.submit} references={refs} refKind="list" closing={closing}
          onDone={() => goto("ls1_pressure")} />
      </Stage>
    );
  }

  else if (st.screen === "ls1_pressure") {
    // Social/peer pressure — Elena's Slack. Verbatim per §E.1.3.
    const p = LS1.pressure;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 10, textTransform: "uppercase", fontWeight: 700 }}>{p.label}</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, margin: "0 0 14px" }}>{p.trigger}</p>
        <Artifact title="Slack DM · Elena Reyes → you" mono>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{p.slack.who}</div>
          <div style={{ whiteSpace: "pre-wrap" }}>{p.slack.body}</div>
        </Artifact>
        <div style={{ marginTop: 18 }}>
          <Decision persistKey={st.screen} prompt={p.prompt} options={p.options} justificationPrompt={LS1.justificationPrompt}
            audioLabel="LS1 pressure prompt" audioText={p.prompt}
            onSubmit={(pp) => {
              const held = p.interpretation?.[pp] === "held";
              dispatch({ type: "SET_LS1_PRESSURE", path: pp, held });
              goto("ls1_consequence");
            }} />
        </div>
      </Stage>
    );
  }

  else if (st.screen === "ls1_consequence") {
    const path = st.ls1Path;
    const cons = LS1.consequences[path];
    // Modulation clause selection:
    //   Base Path A is "concealment" — render "IfHeld" alt when the participant
    //     disclosed under pressure.
    //   Base Path B/C is "disclosure" — render "IfFolded" alt when they did not.
    const isBaseConceal = path === "a";
    const showAlt = isBaseConceal ? st.ls1PressureHeld === true : st.ls1PressureHeld === false;
    body = (
      <Stage>
        <ConsequenceReveal horizons={cons} pressureHeld={showAlt ? (isBaseConceal ? true : false) : null}
          onBell={audio.strikeBell} onDone={() => goto("ls1_interp")} />
      </Stage>
    );
  }

  else if (st.screen === "ls1_interp") {
    const cons = LS1.consequences[st.ls1Path];
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>What may have been noticed</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: C.white, lineHeight: 1.6 }}>"{cons.interp}"</p>
        <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: "rgba(200,163,92,0.06)", border: `1px solid ${C.tealMid}` }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Cost on this path</div>
          <p style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0 }}>{cons.cost}</p>
        </div>
        <PrimaryButton onClick={() => goto("ls1_signal")}>How each path may land</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls1_signal") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>What each LS1 path may have communicated</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LS1.signalPanel.map((s) => {
            const chosen = s.key === st.ls1Path;
            return (
              <div key={s.key} style={{ borderRadius: 10, padding: 14, background: chosen ? "rgba(200,163,92,0.1)" : "rgba(255,255,255,0.03)", border: chosen ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: chosen ? C.tealMid : "rgba(255,255,255,0.8)", marginBottom: 5 }}>Path {s.key.toUpperCase()} — {s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Signal: {s.signal}</div>
                {s.effect && <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>}
              </div>
            );
          })}
        </div>
        <PrimaryButton onClick={() => goto("ls1_reflection")}>Reflect</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls1_reflection") {
    body = (
      <Stage narrow>
        <Reflection persistKey={st.screen} prompt={LS1.reflection} onDone={() => goto("ls1_to_ls2")} />
      </Stage>
    );
  }

  else if (st.screen === "ls1_to_ls2") {
    // Pressure-beat close between LS1 and LS2 — Mirror Rule candidate lands
    // here for participants who chose the concealment path.
    const mirrorFires = st.ls1Path === "a";
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>BETWEEN THE ROOMS · MONDAY MORNING APPROACHES</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, textAlign: "center", marginBottom: 22 }}>
          You have replied to Elena. The week passed. It is Monday morning.
        </p>
        {mirrorFires && (
          <div style={{ background: "rgba(224,120,86,0.08)", border: `1px solid ${C.amber}`, borderRadius: 12, padding: "18px 22px", margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.amber, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Mirror moment</div>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.65, margin: 0 }}>
              {LS1.mirrorRuleCandidate}
            </p>
          </div>
        )}
        <p style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, textAlign: "center" }}>
          Your VP has scheduled a quarterly review. Two new senior leaders are joining the room. Your Northbrook memo is on the agenda.
        </p>
        <PrimaryButton onClick={() => goto("ls2_setup")}>Enter Layered Scenario 2</PrimaryButton>
      </Stage>
    );
  }

  /* ---------- LS2 — THE VP'S ATTRIBUTION ---------- */
  else if (st.screen === "ls2_setup") {
    // Intra-module memory — Carla's forwarded email drifts by LS1 path.
    const setup = LS2.setup;
    const emailBody = st.ls1Path
      ? (setup.forwardedEmail.byLs1Path[st.ls1Path] || setup.forwardedEmail.fallback)
      : setup.forwardedEmail.fallback;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>LAYERED SCENARIO 2 OF 2 · AUTHORITY PRESSURE</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 14 }}>{LS2.title}</h2>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>{setup.heading}</div>
        <AVPlaceholder label="LS2 setup" text={setup.scene.join("\n\n")} />
        {setup.scene.map((l, i) => (
          <p key={i} style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, margin: "0 0 12px" }}>{l}</p>
        ))}
        <div style={{ margin: "14px 0" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Inbox · Forwarded email from Carla</div>
          <Artifact title={setup.forwardedEmail.subject} mono>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{setup.forwardedEmail.who}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{emailBody}</div>
          </Artifact>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "10px 0 0" }}>
          {setup.memoryFrame}
        </p>
        <PrimaryButton onClick={() => goto("ls2_inspect")}>Inspect the source before you decide</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls2_inspect") {
    const ins = LS2.inspect;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 10, fontWeight: 700, textTransform: "uppercase" }}>{ins.label} · Mobile mode: {ins.mobileMode}</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, margin: "0 0 18px" }}>{ins.instruction}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{ins.source.caption}</div>
            <Artifact title={ins.source.title} mono>
              {ins.source.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
            </Artifact>
          </div>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{ins.output.caption}</div>
            <Artifact title={ins.output.title} mono>
              {ins.output.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
            </Artifact>
          </div>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "16px 0 0" }}>
          {ins.recognitionNote}
        </p>
        <PrimaryButton onClick={() => goto("ls2_decide")}>{ins.continueLabel}</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls2_decide") {
    // Intra-module residue — LS2 Decide prompt drifts based on LS1 path.
    const prompt = st.ls1Path
      ? (LS2.decisionPrompt[st.ls1Path] || LS2.decisionPrompt.fallback)
      : LS2.decisionPrompt.fallback;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14, textTransform: "uppercase" }}>LS2 · Decide</div>
        <Decision persistKey={st.screen} prompt={prompt} options={LS2.options} justificationPrompt={LS2.justificationPrompt}
          audioLabel="LS2 decision prompt" audioText={prompt}
          onSubmit={(p) => {
            dispatch({ type: "SET_LS2_PATH", path: p });
            goto("ls2_artifact");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "ls2_artifact") {
    const path = st.ls2Path;
    const aw = LS2.artifactWrite[path];
    const refs = path === "a" ? LS2.references.d : path === "b" ? LS2.references.b : LS2.references.ac;
    const refKind = path === "a" ? "card" : "list";
    const closing = refKind === "card" ? null : LS2.references.closing;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14, textTransform: "uppercase" }}>LS2 · Artifact write · Path {path?.toUpperCase()}</div>
        <ArtifactWrite persistKey={st.screen} prompt={aw.prompt} submitLabel={aw.submit} references={refs} refKind={refKind} closing={closing}
          onDone={() => goto("ls2_pressure")} />
      </Stage>
    );
  }

  else if (st.screen === "ls2_pressure") {
    // Authority pressure — Carla's direct question. Verbatim per §E.2.4.
    const p = LS2.pressure;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: C.tealMid, marginBottom: 10, textTransform: "uppercase", fontWeight: 700 }}>{p.label}</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, margin: "0 0 14px" }}>{p.trigger}</p>
        <div style={{ borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", padding: "14px 16px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, color: C.tealMid, fontWeight: 700, marginBottom: 6 }}>{p.question.who}</div>
          <p style={{ fontFamily: SERIF, fontSize: 16, color: C.white, lineHeight: 1.65, margin: 0 }}>{p.question.body}</p>
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: "14px 0 0" }}>
          {p.roomBeat}
        </p>
        <div style={{ marginTop: 18 }}>
          <Decision persistKey={st.screen} prompt={p.prompt} options={p.options} justificationPrompt={LS2.justificationPrompt}
            audioLabel="LS2 pressure prompt" audioText={p.prompt}
            onSubmit={(pp) => {
              const held = p.interpretation?.[pp] === "held";
              dispatch({ type: "SET_LS2_PRESSURE", path: pp, held });
              goto("ls2_consequence");
            }} />
        </div>
      </Stage>
    );
  }

  else if (st.screen === "ls2_consequence") {
    const path = st.ls2Path;
    const cons = LS2.consequences[path];
    const isBaseConceal = path === "a";
    const showAlt = isBaseConceal ? st.ls2PressureHeld === true : st.ls2PressureHeld === false;
    body = (
      <Stage>
        <ConsequenceReveal horizons={cons} pressureHeld={showAlt ? (isBaseConceal ? true : false) : null}
          onBell={audio.strikeBell} onDone={() => goto("ls2_interp")} />
      </Stage>
    );
  }

  else if (st.screen === "ls2_interp") {
    const cons = LS2.consequences[st.ls2Path];
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 14 }}>What may have been noticed</div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: C.white, lineHeight: 1.6 }}>"{cons.interp}"</p>
        <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: "rgba(200,163,92,0.06)", border: `1px solid ${C.tealMid}` }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Cost on this path</div>
          <p style={{ fontFamily: SERIF, fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0 }}>{cons.cost}</p>
        </div>
        <PrimaryButton onClick={() => goto("ls2_signal")}>How each path may land</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls2_signal") {
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>What each LS2 path may have communicated</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LS2.signalPanel.map((s) => {
            const chosen = s.key === st.ls2Path;
            return (
              <div key={s.key} style={{ borderRadius: 10, padding: 14, background: chosen ? "rgba(200,163,92,0.1)" : "rgba(255,255,255,0.03)", border: chosen ? `1.5px solid ${C.tealMid}` : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: chosen ? C.tealMid : "rgba(255,255,255,0.8)", marginBottom: 5 }}>Path {s.key.toUpperCase()} — {s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Signal: {s.signal}</div>
                {s.effect && <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>}
              </div>
            );
          })}
        </div>
        <PrimaryButton onClick={() => goto("ls2_reflection")}>Reflect</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "ls2_reflection") {
    body = (
      <Stage narrow>
        <Reflection persistKey={st.screen} prompt={LS2.reflection} onDone={() => goto("e_signature")} />
      </Stage>
    );
  }

  else if (st.screen === "e_signature") {
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · COMPLETE · YOUR DISCLOSURE PATTERN</div>
        <DisclosurePatternPanel
          ls1Path={st.ls1Path}
          ls2Path={st.ls2Path}
          ls1PressureHeld={st.ls1PressureHeld}
          ls2PressureHeld={st.ls2PressureHeld}
          theme="dark"
        />
        <PrimaryButton onClick={() => goto("f1")}>Continue to micro-drills</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT F — MICRO-DRILLS ============== */
  else if (st.screen === "f1") {
    const f1 = SF.f1;
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
    const f1 = SF.f1;
    const item = f1.items[idx];
    const next = idx < f1.items.length - 1 ? `f1_q${idx + 2}` : "f1_close";
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>F1 · {idx + 1} of {f1.items.length}</div>
        <SingleChoiceCard key={st.screen} vignette={item.vignette} options={f1.options} answer={item.answer} feedback={item.feedback}
          onContinue={() => {
            dispatch({ type: "SET_F1_ANSWER", value: { idx, answer: item.answer } });
            goto(next);
          }} />
      </Stage>
    );
  }

  else if (st.screen === "f1_close") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 26, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{SF.f1.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2")}>Continue to F2</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f2") {
    const f2 = SF.f2;
    const osh = f2.onScreenHeader;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 2 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{f2.title}</h2>
        <AVPlaceholder label="F2 introduction" text={f2.audioIntro} />
        <div style={{ background: "rgba(200,163,92,0.08)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: "20px 22px", margin: "16px 0 18px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 1.5, color: C.tealMid, fontWeight: 700, marginBottom: 12, textAlign: "center" }}>{osh.title}</div>
          {osh.lines.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontSize: 15.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, textAlign: "left", margin: "0 0 8px" }}>{l}</p>
          ))}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "center", margin: "12px 0 0" }}>{osh.cta}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2_q1")}>Begin</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f2_q1") {
    const f2 = SF.f2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>F2 · 1 of 1</div>
        <SingleChoiceCard key={st.screen} vignette={f2.vignette} options={f2.options} answer={null} feedback={f2.feedback}
          onContinue={() => {
            goto("f2_reflect");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "f2_reflect") {
    // Reflection beat after F2, per script — held for 4 seconds visual.
    body = (
      <Stage bg={C.navyDeep} narrow>
        <p className="bf-fade" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: C.white, textAlign: "center", lineHeight: 1.5, marginBottom: 22 }}>
          {SF.f2.reflectionBeat}
        </p>
        <div style={{ background: "rgba(200,163,92,0.1)", border: `1px solid ${C.teal}`, borderRadius: 12, padding: 22, textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{SF.f2.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("f_complete")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f_complete") {
    const fc = SF.complete;
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
    const callback = st.ls1Path ? SG.callback[st.ls1Path] : null;
    body = (
      <Stage bg={C.navyDeep}>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · RECOGNITION</div>
        <AVPlaceholder label="G · recognition" text={SG.recognition.join("\n\n")} />
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
    // Framework Return — no-input, auto-advance per Standard.
    body = <FrameworkReturnScreen content={SG.frameworkReturn} onDone={() => goto("g_awe")} />;
  }

  else if (st.screen === "g_awe") {
    // Awe Moment — verbatim per §G.2. Two-line held card. Silence.
    // No bell on this transition; the silence is the point.
    const [line1, line2] = SG.aweMoment.lines;
    body = (
      <div style={{ minHeight: "100%", background: C.navyDeep, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
          <p className="bf-fade" style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.5, marginBottom: 12 }}>{line1}</p>
          <p className="bf-fade" style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.5, marginTop: 0, animationDelay: "0.8s" }}>{line2}</p>
          <div style={{ marginTop: 60 }}>
            <button onClick={() => goto("g2")}
              style={{ padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: SANS, fontSize: 13, letterSpacing: 0.3, cursor: "pointer" }}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  else if (st.screen === "g2") {
    // Growth Log — light-chrome cream surface. Disclosure Pattern Panel in
    // light theme.
    body = (
      <Stage bg={C.paper} narrow>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 6 }}>YOUR GROWTH LOG</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, color: C.navy }}>M2 — AI Disclosure & Attribution</div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13.5, color: C.inkSoft, marginTop: 6 }}>{M.dimension.central_question}</div>
        </div>
        <DisclosurePatternPanel
          ls1Path={st.ls1Path}
          ls2Path={st.ls2Path}
          ls1PressureHeld={st.ls1PressureHeld}
          ls2PressureHeld={st.ls2PressureHeld}
          theme="light"
        />
        <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.inkSoft, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
          Not a score. Not a certificate. A private record of what you practised.
        </p>
        <button onClick={() => goto("g3")} style={{ width: "100%", minHeight: 48, marginTop: 24, borderRadius: 10, border: "none", background: C.navy, color: C.white, fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continue</button>
      </Stage>
    );
  }

  else if (st.screen === "g3") {
    const drc = SG.delayedRetentionCheck;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT G · DELAYED RETENTION CHECK</div>
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
    body = <AweClose persistKey={st.screen} content={SG} onMotif={audio.playMotif} onDone={(s) => { dispatch({ type: "FINAL", text: s }); goto("done"); }} />;
  }

  else if (st.screen === "done") {
    const cp = SG.completion;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ textAlign: "center" }}>
          {st.finalSentence && (
            <>
              <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 14 }}>YOU WROTE THIS</div>
              <p style={{ fontFamily: SERIF, fontSize: 22, color: C.white, lineHeight: 1.5, marginBottom: 30 }}>"{st.finalSentence}"</p>
            </>
          )}
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>{cp.title.toUpperCase()}</div>
          <p style={{ fontFamily: SERIF, fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 22 }}>{cp.body}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 420, margin: "0 auto" }}>
            <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
              style={{ minHeight: 48, borderRadius: 10, border: "none", background: C.teal, color: C.white, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {cp.returnLabel}
            </button>
            <button onClick={() => goto("g2")}
              style={{ minHeight: 48, borderRadius: 10, border: `1px solid ${C.tealMid}`, background: "transparent", color: C.tealMid, fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: 0.3, cursor: "pointer" }}>
              {cp.growthLogLabel}
            </button>
          </div>
          <button onClick={() => { window.location.href = (import.meta.env.BASE_URL || "/"); }}
            style={{ marginTop: 26, padding: "10px 22px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: SANS, fontSize: 12.5, cursor: "pointer" }}>
            Exit — return home
          </button>
          <p style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 20, lineHeight: 1.6 }}>
            Your delayed retention check will arrive in 3 to 7 days.<br />Until then — {FOOTER.toLowerCase()}
          </p>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 22 }}>{COPYRIGHT}</p>
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

  /* ----- chrome ----- */
  const noChromeScreens = ["enter", "cover", "a0"];
  const showChrome = !noChromeScreens.includes(st.screen);
  // canBack excludes auto-advance beats (g15), the awe moment (g_awe, g4)
  // and terminal (done). Per Tony's D1 rectifications.
  const canBack = st.history.length > 0 && showChrome && st.screen !== "g15" && st.screen !== "g_awe" && st.screen !== "g4" && st.screen !== "done";
  const segLabel = SEGMENT_LABEL[segmentOf(st.screen)];
  // Cream-background screens invert chrome for legibility.
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
      @keyframes bfHair { 0% { opacity: 0.15; } 100% { opacity: 0; } }
      .bf-hairline { animation: bfHair 2s ease forwards; }
      @keyframes bfSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .bf-spin { animation: bfSpin 1.1s linear infinite; }
      @keyframes bfPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
      .bf-pulse { animation: bfPulse 0.9s ease-in-out infinite; }
      ::selection { background: ${C.tealMid}; color: ${C.navy}; }
    `}</style>
  );
}
