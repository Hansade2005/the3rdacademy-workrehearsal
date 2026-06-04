import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { narrationKey } from "./narrationKey.js";

/* ============================================================================
   NARRATION PLAYBACK — pre-rendered Piper TTS, served as static MP3s.

   The voiceover is synthesized once at build time (scripts/generate-narration.mjs)
   with Piper and written to public/narration/<key>.mp3, where <key> is
   narrationKey(text). At runtime we just compute the same key and point the
   <audio> element at the matching file. No TTS API, no key, no CORS, no
   latency — and it works offline.

   manifest.json (written by the generator) lists which keys exist, so we can
   give a precise message if a string was never rendered (i.e. the generator
   needs to be re-run after a copy change).
   ========================================================================== */

const BASE = import.meta.env.BASE_URL || "/";
const NARRATION_DIR = `${BASE}narration/`;

const PiperCtx = createContext({
  speak: async () => {},
  stop: () => {},
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
  const manifestRef = useRef(null); // Set<key> | null (null = not loaded yet)

  // Load the manifest once so we can detect "not pre-rendered" precisely.
  useEffect(() => {
    let alive = true;
    fetch(`${NARRATION_DIR}manifest.json`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => { if (alive && m?.keys) manifestRef.current = new Set(m.keys); })
      .catch(() => { /* manifest optional — fall back to letting <audio> 404 */ });
    return () => { alive = false; };
  }, []);

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

  const speak = useCallback(async (text) => {
    const cleaned = String(text || "").trim();
    if (!cleaned) return;

    const key = narrationKey(cleaned);

    // If we have the manifest and the key isn't in it, this string was never
    // pre-rendered — say so plainly instead of triggering a silent 404.
    if (manifestRef.current && !manifestRef.current.has(key)) {
      setError("This narration has not been pre-rendered yet — run `npm run narration`.");
      return;
    }

    tokenRef.current += 1;
    setError(null);
    setLoading(true);

    const a = getAudio();
    a.src = `${NARRATION_DIR}${key}.mp3`;
    try {
      await a.play();
    } catch (e) {
      setError(e?.message || "Browser blocked playback — tap Play to start it");
      setLoading(false);
    }
  }, [getAudio]);

  useEffect(() => () => stop(), [stop]);

  const value = {
    speak,
    stop,
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
