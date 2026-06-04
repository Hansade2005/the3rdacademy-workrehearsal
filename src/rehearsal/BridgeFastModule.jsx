import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { Pause, X, Mic, ChevronRight, ChevronLeft, Volume2, Play, Square, Loader2 } from "lucide-react";
import { D1_CONTENT, SC1_CONTENT, SC2_CONTENT, SC3_CONTENT, SC4_CONTENT } from "./d1Content.js";
import { PiperProvider, usePiper } from "./usePiper.jsx";

/* ============================================================================
   THE 3RD ACADEMY · BridgeFast™ Engine — D1 Production Build
   Aligned to Dimension Production Standard rev0 (locked, May 2026).
   Cover → A → B → C → D → E (SC1–SC4) → F → G
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
  amber: "#F59E0B",
  amberSoft: "rgba(245, 158, 11, 0.12)",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const MONO = "'Courier New', monospace";
const FOOTER = "Practice and development only. Not behavioural documentation.";
const COPYRIGHT = "© 2026 The 3rd Academy Inc. All rights reserved. Confidential.";

const SCENARIOS = [SC1_CONTENT, SC2_CONTENT, SC3_CONTENT, SC4_CONTENT];

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

function PauseControl({ onPause }) {
  return (
    <button onClick={onPause} aria-label="Pause rehearsal"
      style={{ position: "fixed", top: 16, right: 16, width: 44, height: 44, borderRadius: 22, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 6, backdropFilter: "blur(4px)" }}>
      <Pause size={18} />
    </button>
  );
}

function PauseOverlay({ onResume, segmentLabel }) {
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
        </div>
      </div>
    </div>
  );
}


function BackControl({ onBack }) {
  return (
    <button onClick={onBack} aria-label="Go back to previous screen"
      style={{ position: "fixed", top: 16, left: 16, height: 44, padding: "0 16px 0 12px", borderRadius: 22, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", zIndex: 6, fontFamily: SANS, fontSize: 12.5, letterSpacing: 0.3, backdropFilter: "blur(4px)" }}>
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

  const onClick = async () => {
    if (playing) {
      piper.stop();
      setPlaying(false);
      return;
    }
    if (!piper.enabled) piper.setEnabled(true);
    const t = ++tokenRef.current;
    setPlaying(true);
    await piper.speak(text);
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
          border: `1px solid ${playing ? C.tealMid : "rgba(94,234,212,0.4)"}`,
          background: playing ? "rgba(94,234,212,0.18)" : "rgba(94,234,212,0.06)",
          color: C.tealMid,
          fontFamily: SANS, fontSize: small ? 11 : 12,
          letterSpacing: 0.3,
          cursor: "pointer",
        }}>
        <Icon size={small ? 11 : 13} className={isLoading ? "bf-spin" : ""} />
        {labelText}
      </button>
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

/* ---- Multi-line textarea — Enter adds a newline; submit is only via the button ---- */
function MultilineTextarea({ value, onChange, placeholder, rows = 4, autoFocus = false, error = false, style = {} }) {
  // Default <textarea> behaviour: Enter inserts a newline. We never trap Enter to submit.
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      autoFocus={autoFocus}
      placeholder={placeholder}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: 14,
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
  );
}

/* ---- Two-channel decision (selection + justification) ---- */
function Decision({ prompt, options, justificationPrompt, minChars = 25, onSubmit, audioText, audioLabel }) {
  const [sel, setSel] = useState(null);
  const [text, setText] = useState("");
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

/* ---- Artifact-write + reference calibration ---- */
function ArtifactWrite({ prompt, submitLabel, references, refKind, onDone, minChars = 40 }) {
  const [text, setText] = useState("");
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

/* ---- Trajectory visualisation ---- */
function Trajectory({ chosen }) {
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

function Reflection({ prompt, onDone, minChars = 30 }) {
  const [text, setText] = useState("");
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
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: "block", margin: "0 auto" }}>
      <circle cx="32" cy="32" r="28" fill="none" stroke={C.tealMid} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="20" fill={C.tealDeep} />
      <text x="32" y="40" textAnchor="middle" fontFamily={SERIF} fontWeight="700" fontSize="22" fill={C.white}>3</text>
    </svg>
  );
}

/* ---- Cover page (per FR: T3A logo + copyright) ---- */
function CoverPage({ onContinue }) {
  return (
    <Stage bg={C.navyDeep} narrow>
      <div style={{ textAlign: "center", paddingTop: 30 }}>
        <T3ALogo size={72} />
        <div style={{ fontFamily: SANS, fontSize: 12, letterSpacing: 4, color: C.tealMid, marginTop: 22 }}>THE 3RD ACADEMY</div>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>FOUNDATIONAL TIER · MODULE D1</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, color: C.white, lineHeight: 1.25, margin: "28px 0 14px" }}>
          Integrity &amp; Ethics
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: 440, margin: "0 auto" }}>
          A behavioural rehearsal. Ninety minutes. Private practice. No scores. No pass or fail.
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
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: C.white, lineHeight: 1.4, marginBottom: 10 }}>D1 — Integrity &amp; Ethics</h1>
        <p style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 26, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}>
          A behavioural rehearsal. Headphones recommended. Tap below to begin — audio will start with the cinematic opening.
        </p>
        <PrimaryButton onClick={onBegin}>Begin the rehearsal</PrimaryButton>
        <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 18 }}>
          {COPYRIGHT}
        </p>
      </div>
    </Stage>
  );
}

/* ---- G-4 Awe Close ---- */
function AweClose({ content, onMotif, onDone }) {
  const [beat, setBeat] = useState(1);
  const [text, setText] = useState("");
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

const SEGMENT_LABEL = {
  cover: "Cover", a: "Segment A", b: "Segment B", c: "Segment C",
  d: "Segment D", e: "Segment E", f: "Segment F", g: "Segment G",
};
function segmentOf(screen) {
  if (screen === "cover" || screen === "enter") return "cover";
  if (screen.startsWith("a")) return "a";
  if (screen.startsWith("b")) return "b";
  if (screen.startsWith("c")) return "c";
  if (screen.startsWith("d")) return "d";
  if (screen.startsWith("sc_") || screen === "scenario_chain_intro") return "e";
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
  analyses: [],
  // captured open responses (kept locally; would write to Growth Log in prod)
  segmentBReflection: "",
  segmentCResponses: {},
  segmentDPause1: null,
  segmentDPause2Text: "",
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
    case "COLD_OPEN":
      return { ...state, coldOpenPath: action.path, screen: "a2", history: [...state.history, state.screen] };
    case "SCENARIO_DECISION":
      return { ...state, scenarioPath: action.path };
    case "ANALYZE_ADD":
      return { ...state, analyses: [...state.analyses, action.analysis] };
    case "NEXT_SCENARIO":
      return { ...state, scenarioIndex: state.scenarioIndex + 1, scenarioPath: null, threadingPosture: action.posture, screen: "sc_callback", history: [...state.history, state.screen] };
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
    case "SET_F_ANSWER": {
      const f = state.segmentFAnswers;
      return { ...state, segmentFAnswers: { ...f, [action.exercise]: [...f[action.exercise], action.value] } };
    }
    default:
      return state;
  }
}

export default function BridgeFastModuleRoot() {
  return (
    <PiperProvider>
      <BridgeFastModule />
    </PiperProvider>
  );
}

function BridgeFastModule() {
  const [st, dispatch] = useReducer(reducer, initialState);
  const audio = useAudio();
  const piper = usePiper();
  const [a0phase, setA0phase] = useState(0);

  const onPause = useCallback(() => {
    piper.stop();
    dispatch({ type: "PAUSE" });
  }, [piper]);

  const C0 = D1_CONTENT.segmentA.coldOpen;
  const SC = SCENARIOS[st.scenarioIndex];
  const SG = D1_CONTENT.segmentG;

  const POSTURE_BY_PATH = { a: "transparent", b: "cautious", c: "cautious", d: "avoidant" };
  const advanceScenario = useCallback(() => {
    const lastA = st.analyses[st.analyses.length - 1];
    const posture = (lastA && lastA.posture) || POSTURE_BY_PATH[st.scenarioPath] || "cautious";
    dispatch({ type: "NEXT_SCENARIO", posture });
  }, [st.analyses, st.scenarioPath]);

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
            {D1_CONTENT.dimension.central_question}
          </div>
        </div>
      </div>
    );
  }

  else if (st.screen === "a1") {
    body = (
      <Stage>
        <AVPlaceholder label="Cold open narration" text={C0.narration.join("\n\n")} />
        <Narration lines={C0.narration} speakable={false} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "8px 0 24px" }}>
          <Artifact title="Revenue Projection.xlsx — edit history: sent 1:42PM today" mono>
            =SUM(C12:C24)  →  $2,140,000   [correct range C12:C22]<br />
            <span style={{ background: C.paleRed, color: C.redInk, padding: "1px 4px", borderRadius: 3 }}>C23:C24 — test data, should not be included</span><br />
            Cumulative 3-yr error: ~$340,000
          </Artifact>
          <Artifact title="Slack · DM with Sarah Chen">
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Message Sarah Chen… <span className="bf-blink">|</span></span>
          </Artifact>
        </div>
        <Decision prompt="What do you do?" options={C0.options} justificationPrompt={C0.justificationPrompt}
          audioLabel="Decision Beat 1 prompt" audioText="What do you do?"
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
          {D1_CONTENT.segmentA.safetyFloor.card.map((l, i) => (
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
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>THE QUESTION THAT RUNS THROUGH THIS MODULE</div>
          <p style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.5 }}>{D1_CONTENT.dimension.central_question}</p>
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
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, marginBottom: 24 }}>The Field Guide</h2>
        <AVPlaceholder label="B-1 introduction · 25s" text={D1_CONTENT.segmentB.intro.join("\n\n")} />
        <Narration lines={D1_CONTENT.segmentB.intro} speakable={false} />
        <PrimaryButton onClick={() => goto("b2")}>Open the field guide</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b2") {
    const fg = D1_CONTENT.segmentB.fieldGuide;
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>BEHAVIOUR STANDARD · D1 · FOUNDATIONAL</div>
        <FieldGuideSection title={fg.meaning.title} body={fg.meaning.body} />
        <FieldGuideList title={fg.present.title} intro={fg.present.intro} items={fg.present.items} accent={C.tealMid} />
        <FieldGuideList title={fg.breakdown.title} intro={fg.breakdown.intro} items={fg.breakdown.items} accent={C.amber} />
        <FieldGuideSection title={fg.end.title} body={fg.end.body} />
        <PrimaryButton onClick={() => goto("b3")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "b3") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>B-3 · REFLECTION</div>
        <Reflection prompt={D1_CONTENT.segmentB.reflectionPrompt} minChars={30} onDone={(text) => {
          dispatch({ type: "SET_B_REFLECTION", text });
          goto("c1_1");
        }} />
      </Stage>
    );
  }

  /* ============== SEGMENT C — RECOGNITION BRIEFS ============== */
  else if (st.screen === "c1_1") {
    const c1 = D1_CONTENT.segmentC.c1;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 1 of 3</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c1.title}</h2>
        <AVPlaceholder label="C1 narration · 4:30" text={c1.narration.join("\n\n") + "\n\n" + c1.close} />
        <Narration lines={c1.narration} speakable={false} />
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 18, margin: "18px 0" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>THE THREE SIGNALS OF AN ETHICAL MOMENT</div>
          {c1.signals.map((s) => (
            <div key={s.n} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 14, marginBottom: 14 }}>
              <span style={{ fontFamily: SERIF, fontStyle: "italic", color: C.tealMid, fontSize: 18 }}>{s.n}</span>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 16, color: C.white, marginBottom: 6 }}>{s.h}</div>
                <div style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{s.t}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>{c1.close}</p>
        <PrimaryButton onClick={() => goto("c1_2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c1_2") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>C1 · ACTION PROMPT</div>
        <Reflection prompt={D1_CONTENT.segmentC.c1.prompt} minChars={30} onDone={(text) => {
          dispatch({ type: "SET_C_RESPONSE", key: "c1", value: text });
          goto("c2_1");
        }} />
      </Stage>
    );
  }

  else if (st.screen === "c2_1") {
    const c2 = D1_CONTENT.segmentC.c2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT C · RECOGNITION BRIEF 2 of 3</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{c2.title}</h2>
        <AVPlaceholder label="C2 narration · 4:00" text={[...c2.narration, ...c2.delayed].join("\n\n")} />
        <Narration lines={c2.narration} speakable={false} />
        <div style={{ background: "rgba(13,148,136,0.08)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 22, margin: "18px 0" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>{c2.equation.title}</div>
          {c2.equation.rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 10, marginBottom: 8 }}>
              <span style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{r.k}</span>
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: C.white }}>{r.v}</span>
            </div>
          ))}
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: C.tealMid, marginTop: 12, marginBottom: 0 }}>{c2.equation.footer}</p>
        </div>
        <Narration lines={c2.delayed} speakable={false} />
        <PrimaryButton onClick={() => goto("c2_2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c2_2") {
    const c2 = D1_CONTENT.segmentC.c2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>C2 · TWO-CHANNEL RESPONSE</div>
        <Decision prompt={c2.prompt} options={c2.options} justificationPrompt={c2.justificationPrompt} minChars={20}
          onSubmit={(p, j) => {
            dispatch({ type: "SET_C_RESPONSE", key: "c2", value: { path: p, justification: j } });
            goto("c3");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "c3") {
    const c3 = D1_CONTENT.segmentC.c3;
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT C · RECOGNITION BRIEF 3 of 3</div>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(20px, 5.5vw, 24px)", color: C.white, lineHeight: 1.3, marginBottom: 18, textAlign: "center" }}>{c3.title}</h2>
        <AVPlaceholder label="C3 narration + recognition beat · 4:00"
          text={[c3.open, ...c3.steps.map(s => `${s.name} ${s.body}`), c3.close].join("\n\n")} />
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 28 }}>{c3.open}</p>
        <div style={{ textAlign: "center", padding: "28px 16px", background: C.paper, color: C.ink, borderRadius: 12, margin: "0 0 24px" }}>
          <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.teal, marginBottom: 14 }}>THE INTEGRITY PAUSE</div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "6px 10px", fontFamily: SERIF, fontSize: "clamp(19px, 6vw, 26px)", color: C.teal, fontWeight: 600 }}>
            {c3.steps.map((s, i) => (
              <React.Fragment key={i}>
                <span className="bf-fade" style={{ animationDelay: `${i * 0.6}s` }}>{s.name.replace(".", "")}</span>
                {i < c3.steps.length - 1 && <span style={{ color: C.inkSoft }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        {c3.steps.map((s) => (
          <div key={s.name} style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: SERIF, fontSize: 18, color: C.tealMid, marginBottom: 6, fontWeight: 600 }}>{s.name}</div>
            <p style={{ fontFamily: SERIF, fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginTop: 24 }}>{c3.close}</p>
        <PrimaryButton onClick={() => goto("c3_2")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "c3_2") {
    body = (
      <Stage narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>C3 · RECOGNITION REFLECTION</div>
        <Reflection prompt={D1_CONTENT.segmentC.c3.prompt} minChars={30} onDone={(text) => {
          dispatch({ type: "SET_C_RESPONSE", key: "c3", value: text });
          goto("d1");
        }} />
      </Stage>
    );
  }

  /* ============== SEGMENT D — AUDIO CASE ============== */
  else if (st.screen === "d1") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT D · AUDIO CASE</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 28, color: C.white, lineHeight: 1.3, marginBottom: 20 }}>{D1_CONTENT.segmentD.title}</h2>
        <AVPlaceholder label="Segment D · audio case intro" text={D1_CONTENT.segmentD.intro.join("\n\n")} />
        <Narration lines={D1_CONTENT.segmentD.intro} speakable={false} />
        <PrimaryButton onClick={() => goto("d2")}>Begin the story</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "d2") {
    const p1 = D1_CONTENT.segmentD.part1;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>PART 1 · THE DISCOVERY</div>
        <AVPlaceholder label="Audio Part 1 · 3:45 · The Discovery" text={p1.narration.join("\n\n")} />
        <Narration lines={p1.narration} speakable={false} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "16px 0 8px" }}>
          <Artifact title={p1.reportArtifact.title} mono>
            {p1.reportArtifact.lines.map((l, i) => <div key={i}>{l || " "}</div>)}
          </Artifact>
          <Artifact title={p1.slackArtifact.title}>{p1.slackArtifact.body}</Artifact>
        </div>
        <PrimaryButton onClick={() => goto("d3")}>Continue to decision pause 1</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "d3") {
    const p = D1_CONTENT.segmentD.pause1;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>D · DECISION PAUSE 1</div>
        <Decision prompt={p.prompt} options={p.options} justificationPrompt={p.justificationPrompt} minChars={25}
          audioLabel="Decision Pause 1 prompt" audioText={p.prompt}
          onSubmit={(path, j) => {
            dispatch({ type: "SET_D_PAUSE1", value: { path, justification: j } });
            goto("d4");
          }} />
      </Stage>
    );
  }

  else if (st.screen === "d4") {
    const p2 = D1_CONTENT.segmentD.part2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>PART 2 · THE CONFRONTATION</div>
        <AVPlaceholder label="Audio Part 2 · 3:30 · The Confrontation" text={p2.narration.join("\n\n")} />
        <Narration lines={p2.narration} speakable={false} />
        <PrimaryButton onClick={() => goto("d5")}>Continue to decision pause 2</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "d5") {
    const p = D1_CONTENT.segmentD.pause2;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>D · DECISION PAUSE 2 · OPEN RESPONSE</div>
        <AVPlaceholder label="Decision Pause 2 prompt" text={p.prompt} />
        <p style={{ fontFamily: SERIF, fontSize: 19, color: C.white, lineHeight: 1.6, marginBottom: 16 }}>{p.prompt}</p>
        <DPause2Form prompt={p.writePrompt} submit={p.submitLabel} min={p.minChars}
          onDone={(t) => { dispatch({ type: "SET_D_PAUSE2", text: t }); goto("d6"); }} />
      </Stage>
    );
  }

  else if (st.screen === "d6") {
    const p3 = D1_CONTENT.segmentD.part3;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>PART 3 · WHAT HAPPENED</div>
        <AVPlaceholder label="Audio Part 3 · 1:30 · What Happened" text={p3.narration.join("\n\n")} />
        <Narration lines={p3.narration} speakable={false} />
        <PrimaryButton onClick={() => goto("d7")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "d7") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 26, borderLeft: `3px solid ${C.teal}`, textAlign: "center" }}>
          {D1_CONTENT.segmentD.close.card.map((l, i) => (
            <p key={i} style={{ fontFamily: SERIF, fontStyle: i === 0 ? "normal" : "italic", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "0 0 12px" }}>{l}</p>
          ))}
        </div>
        <PrimaryButton onClick={() => goto("scenario_chain_intro")}>Enter the Scenario Lab</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT E — SCENARIO LAB ============== */
  else if (st.screen === "scenario_chain_intro") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10, textAlign: "center" }}>SEGMENT E · BEHAVIOURLAB™ SCENARIO LAB</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 26, color: C.white, lineHeight: 1.3, textAlign: "center", marginBottom: 20 }}>Four scenarios. Four decisions. Four consequence chains.</h2>
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, textAlign: "center" }}>
          Trust your judgment. Make the call. See what happens — same day, next week, month end.
        </p>
        <PrimaryButton onClick={() => goto("sc_callback")}>Begin Scenario 1</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "sc_callback") {
    const isFirst = st.scenarioIndex === 0;
    const threadLines = !isFirst ? (SC.threading?.[st.threadingPosture] || SC.threading?.cautious) : null;
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 10 }}>SCENARIO {st.scenarioIndex + 1} OF 4</div>
        {!isFirst && threadLines && (
          <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "0 0 20px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.tealMid, marginBottom: 10 }}>What you carry into this room</div>
            {threadLines.map((l, i) => (
              <p key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, margin: "0 0 10px" }}>{l}</p>
            ))}
          </div>
        )}
        {isFirst && (
          <>
            <Narration lines={SC.callback} />
            <div style={{ background: "rgba(13,148,136,0.1)", border: `1px solid ${C.teal}`, borderRadius: 10, padding: 16, margin: "16px 0", fontFamily: SERIF, fontStyle: "italic", color: "rgba(255,255,255,0.85)", fontSize: 14.5, lineHeight: 1.6 }}>
              You have been here before. Now you see all four futures. Same path, or different — notice whether your reasoning has changed.
            </div>
          </>
        )}
        <Narration lines={SC.intro} />
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, margin: "14px 0", fontFamily: SANS, fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{SC.briefing}</div>
        {st.scenarioIndex === 0 && (
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
          onSubmit={(p, justification) => {
            dispatch({ type: "SCENARIO_DECISION", path: p });
            // analyse in-place (Lock 2 fingerprint) — local only
            const a = localAnalyze(justification);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: SC.title, path: p } });
            goto("sc_artifact");
          }} />
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
          onDone={(txt) => {
            const a = localAnalyze(txt);
            dispatch({ type: "ANALYZE_ADD", analysis: { ...a, scenario: SC.title + " (artifact)", path } });
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
                {s.effect && <div style={{ fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginTop: 4 }}>Over time: {s.effect}</div>}
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
          dispatch({ type: "LEDGER_ADD", row: { sc: SC.id, title: SC.title, commitment: SC.commitment, outcome: cons.outcome, others: cons.others } });
          goto("sc_ledger");
        }} />
      </Stage>
    );
  }

  else if (st.screen === "sc_ledger") {
    const moreScenarios = st.scenarioIndex < SCENARIOS.length - 1;
    const onContinue = moreScenarios ? advanceScenario : () => goto("f1");
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
        <PrimaryButton onClick={onContinue}>
          {moreScenarios ? `Carry it forward → Scenario ${st.scenarioIndex + 2}` : "Continue to micro-drills"}
        </PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT F — MICRO-DRILLS ============== */
  else if (st.screen === "f1") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 1 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{D1_CONTENT.segmentF.f1.title}</h2>
        <AVPlaceholder label="F1 introduction" text={D1_CONTENT.segmentF.f1.audioIntro} />
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>{D1_CONTENT.segmentF.f1.header}</p>
        <PrimaryButton onClick={() => goto("f1_q1")}>Begin</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen.startsWith("f1_q")) {
    const idx = parseInt(st.screen.slice(4), 10) - 1;
    const f1 = D1_CONTENT.segmentF.f1;
    const item = f1.items[idx];
    const next = idx < f1.items.length - 1 ? `f1_q${idx + 2}` : "f1_close";
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>F1 · {idx + 1} of {f1.items.length}</div>
        <SingleChoiceCard vignette={item.vignette} options={f1.options} answer={item.answer} feedback={item.feedback}
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
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{D1_CONTENT.segmentF.f1.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("f2")}>Continue to F2</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen === "f2") {
    body = (
      <Stage bg={C.navyDeep} narrow>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 2, color: C.tealMid, marginBottom: 10 }}>SEGMENT F · MICRO-DRILL 2 of 2</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 24, color: C.white, lineHeight: 1.3, marginBottom: 18 }}>{D1_CONTENT.segmentF.f2.title}</h2>
        <AVPlaceholder label="F2 introduction" text={D1_CONTENT.segmentF.f2.audioIntro} />
        <p style={{ fontFamily: SERIF, fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>{D1_CONTENT.segmentF.f2.header}</p>
        <PrimaryButton onClick={() => goto("f2_q1")}>Begin</PrimaryButton>
      </Stage>
    );
  }

  else if (st.screen.startsWith("f2_q")) {
    const idx = parseInt(st.screen.slice(4), 10) - 1;
    const f2 = D1_CONTENT.segmentF.f2;
    const item = f2.items[idx];
    const next = idx < f2.items.length - 1 ? `f2_q${idx + 2}` : "f2_close";
    body = (
      <Stage>
        <div style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1, color: C.tealMid, marginBottom: 14 }}>F2 · {idx + 1} of {f2.items.length}</div>
        <SingleChoiceCard vignette={item.vignette} options={f2.options} answer={item.answer} feedback={item.feedback}
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
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, color: C.white, lineHeight: 1.6, margin: 0 }}>{D1_CONTENT.segmentF.f2.closeCard}</p>
        </div>
        <PrimaryButton onClick={() => goto("g1")}>Continue</PrimaryButton>
      </Stage>
    );
  }

  /* ============== SEGMENT G ============== */
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
            Your delayed retention check will arrive in 3 to 7 days.<br />Until then — {FOOTER.toLowerCase()}
          </p>
          <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 28 }}>
            {COPYRIGHT}
          </p>
        </div>
      </Stage>
    );
  }

  /* ----- chrome (nav controls, segment indicator, footer) ----- */
  const noChromeScreens = ["enter", "cover", "a0"];
  const showChrome = !noChromeScreens.includes(st.screen);
  const canBack = st.history.length > 0 && showChrome && st.screen !== "g4" && st.screen !== "done";
  const segLabel = SEGMENT_LABEL[segmentOf(st.screen)];

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "auto", background: C.navy, fontFamily: SANS }}>
      <StyleBlock />
      {showChrome && canBack && <BackControl onBack={back} />}
      {showChrome && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 6, padding: "5px 12px", borderRadius: 16, background: "rgba(14,34,51,0.85)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: SANS, fontSize: 10.5, letterSpacing: 1, color: "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }}>
          {segLabel}
        </div>
      )}
      {showChrome && <PauseControl onPause={onPause} />}
      {body}
      {showChrome && <Footer />}
      {st.paused && <PauseOverlay onResume={() => dispatch({ type: "RESUME" })} segmentLabel={segLabel} />}
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

/* Decision Pause 2 (Segment D) — open-response text form, multiline by default */
function DPause2Form({ prompt, submit, min, onDone }) {
  const [text, setText] = useState("");
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
      ::selection { background: ${C.tealMid}; color: ${C.navy}; }
    `}</style>
  );
}
