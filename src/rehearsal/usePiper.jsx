import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { narrationKey } from "./narrationKey.js";

/* ============================================================================
   NARRATION PLAYBACK — pre-rendered Piper TTS served as static MP3s, with a
   thin layer of Web Audio cinematic SFX on top.

   Why pre-rendered: the rehearsal narration is fixed copy, so we synthesize
   once at build time (scripts/generate-narration.mjs) and serve <key>.mp3
   from public/narration/. No TTS API, no per-play latency.

   Three things make playback feel instant and cinematic:

     1. Per-click warming. ListenButton calls prefetch(text) on mount, so each
        clip is downloaded into the HTTP cache the moment its screen renders.

     2. Session-wide warming. The first prefetch also kicks off prefetchAll(),
        which walks the manifest in idle time and pulls every remaining clip
        in the background. After ~10s of idle on a decent connection, every
        subsequent Play in the session is essentially zero-latency.

     3. Cinematic chime. A short Web Audio tone plays just before the MP3,
        giving the narration a "settle into the next beat" feel without
        having to bake it into the audio files. Opt-out via { intro: false }.
   ========================================================================== */

const BASE = import.meta.env.BASE_URL || "/";
const NARRATION_DIR = `${BASE}narration/`;

const PiperCtx = createContext({
  speak: async () => {},
  stop: () => {},
  prefetch: () => {},
  playSettle: () => {},
  loading: false,
  ready: false,
  progress: 1,
  enabled: false,
  setEnabled: () => {},
  error: null,
});

export function PiperProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const tokenRef = useRef(0);
  const manifestRef = useRef(null);        // Set<key> | null
  const prefetchedRef = useRef(new Set()); // keys already warmed
  const prefetchAllStartedRef = useRef(false);
  const wantAllRef = useRef(false);        // set true on first prefetch() call
  const audioCtxRef = useRef(null);        // lazy Web Audio context for SFX

  /* ---- Web Audio SFX ---- */

  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const Ctor = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
      if (!Ctor) return null;
      try { audioCtxRef.current = new Ctor(); } catch (e) { return null; }
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      // resume() must be called from a user gesture; speak() is, so this is fine
      ctx.resume().catch(() => {});
    }
    return ctx;
  };

  // Opening chime — bell-like stack: fundamental + octave + tritave, each on
  // its own bell envelope (instant attack, exponential decay). The fundamental
  // pitch-blooms slightly (C5 → E5) for a "settling-in" feel. ~0.8s.
  const playChime = () => {
    const ctx = ensureAudioContext();
    if (!ctx) return Promise.resolve();
    const t0 = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    const partials = [
      { freq: 523.25, bloomTo: 659.25, gain: 0.55, decay: 1.4 },  // C5 → E5
      { freq: 1046.5, bloomTo: null,   gain: 0.32, decay: 1.1 },  // C6
      { freq: 1567.98, bloomTo: null,  gain: 0.14, decay: 0.7 },  // G6 (shimmer)
      { freq: 261.63, bloomTo: null,   gain: 0.22, decay: 1.6 },  // C4 (sub-warmth)
    ];

    partials.forEach(({ freq, bloomTo, gain, decay }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0);
      if (bloomTo) osc.frequency.exponentialRampToValueAtTime(bloomTo, t0 + 0.5);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + 0.025);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + decay);
      osc.connect(g).connect(master);
      osc.start(t0);
      osc.stop(t0 + decay + 0.05);
    });

    return new Promise((r) => setTimeout(r, 650));
  };

  // Settle / closing fade — three slightly-detuned voices descending by an
  // octave, fed through a lowpass that sweeps down for warmth. ~1.6s.
  const playSettle = useCallback(() => {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const t0 = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.value = 0.14;

    // Lowpass that sweeps from open → closed, taking the brightness with it
    const filt = ctx.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.setValueAtTime(1400, t0);
    filt.frequency.exponentialRampToValueAtTime(280, t0 + 1.5);
    filt.Q.value = 0.7;

    master.connect(filt).connect(ctx.destination);

    const voices = [
      { freq: 220, detune: -6, gain: 0.45 },  // A3 (slightly flat)
      { freq: 220, detune: +6, gain: 0.40 },  // A3 (slightly sharp) — chorus
      { freq: 110, detune:  0, gain: 0.30 },  // A2 sub
    ];

    voices.forEach(({ freq, detune, gain }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.detune.value = detune;
      osc.frequency.setValueAtTime(freq, t0);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t0 + 1.45);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + 0.18);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.6);
      osc.connect(g).connect(master);
      osc.start(t0);
      osc.stop(t0 + 1.65);
    });
  }, []);

  /* ---- Prefetch (per-clip + session-wide) ---- */

  const prefetchAll = useCallback(() => {
    if (prefetchAllStartedRef.current) return;
    if (!manifestRef.current) return;
    prefetchAllStartedRef.current = true;

    const keys = [...manifestRef.current];
    const schedule = (cb) =>
      typeof window !== "undefined" && typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(cb, { timeout: 2500 })
        : setTimeout(cb, 250);

    const pull = (i) => {
      if (i >= keys.length) return;
      schedule(() => {
        const k = keys[i];
        if (!prefetchedRef.current.has(k)) {
          prefetchedRef.current.add(k);
          fetch(`${NARRATION_DIR}${k}.mp3`, { cache: "force-cache" }).catch(() => {});
        }
        pull(i + 1);
      });
    };
    pull(0);
  }, []);

  const prefetch = useCallback((text) => {
    const cleaned = String(text || "").trim();
    if (!cleaned) return;
    // Warm THIS clip immediately
    const key = narrationKey(cleaned);
    if (!prefetchedRef.current.has(key)) {
      prefetchedRef.current.add(key);
      fetch(`${NARRATION_DIR}${key}.mp3`, { cache: "force-cache" }).catch(() => {});
    }
    // And kick off the lookahead sweep for the rest of the session (once)
    wantAllRef.current = true;
    if (manifestRef.current) prefetchAll();
  }, [prefetchAll]);

  /* ---- Manifest load (also triggers session-wide prefetch if wanted) ---- */

  useEffect(() => {
    let alive = true;
    fetch(`${NARRATION_DIR}manifest.json`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => {
        if (!alive || !m?.keys) return;
        manifestRef.current = new Set(m.keys);
        if (wantAllRef.current) prefetchAll();
      })
      .catch(() => { /* manifest is optional */ });
    return () => { alive = false; };
  }, [prefetchAll]);

  /* ---- Audio element (singleton) ---- */

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
      a.addEventListener("error", () => {
        const code = a.error?.code;
        const map = {
          1: "Playback aborted",
          2: "Network error loading narration audio",
          3: "Narration audio is corrupt or could not be decoded",
          4: "Narration audio not found — run `npm run narration` to render it",
        };
        setError(map[code] || "Narration playback failed");
        setLoading(false);
      });
      a.addEventListener("playing", () => { setLoading(false); setError(null); });
      a.addEventListener("waiting", () => setLoading(true));
      a.addEventListener("ended", () => setLoading(false));
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  const stop = useCallback(() => {
    tokenRef.current += 1;
    const a = audioRef.current;
    if (a) {
      try { a.pause(); a.currentTime = 0; } catch (e) { /* ignore */ }
    }
    setLoading(false);
  }, []);

  /* ---- speak: chime → MP3 → optional settle ---- */

  const speak = useCallback(async (text, opts = {}) => {
    const { intro = true, outro = false } = opts;
    const cleaned = String(text || "").trim();
    if (!cleaned) return;

    const key = narrationKey(cleaned);
    if (manifestRef.current && !manifestRef.current.has(key)) {
      setError("This narration has not been pre-rendered yet — run `npm run narration`.");
      return;
    }

    const myToken = ++tokenRef.current;
    setError(null);
    setLoading(true);

    // Cinematic lead-in. Skipped on opt-out or very short prompts where the
    // chime would feel heavier than the line itself.
    if (intro && cleaned.length > 60) {
      await playChime();
      if (myToken !== tokenRef.current) return; // user clicked Stop during chime
    }

    const a = getAudio();
    const onEnded = () => {
      a.removeEventListener("ended", onEnded);
      if (outro && myToken === tokenRef.current) playSettle();
    };
    a.addEventListener("ended", onEnded);
    a.src = `${NARRATION_DIR}${key}.mp3`;
    try {
      await a.play();
    } catch (e) {
      setError(e?.message || "Browser blocked playback — tap Play to start it");
      setLoading(false);
    }
  }, [getAudio, playSettle]);

  useEffect(() => () => stop(), [stop]);

  const value = {
    speak,
    stop,
    prefetch,
    playSettle,
    loading,
    ready: true,
    progress: 1,
    enabled,
    setEnabled,
    error,
  };

  return <PiperCtx.Provider value={value}>{children}</PiperCtx.Provider>;
}

export function usePiper() {
  return useContext(PiperCtx);
}
