import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

/* ============================================================================
   VOICE RSS TTS — server-side TTS, MP3 streamed straight to the <audio> tag.

   We deliberately do NOT fetch() + Blob — that triggers a CORS preflight that
   Voice RSS does not always answer. Pointing <audio src=> at the API URL
   makes the browser stream the MP3 like any other audio file (no preflight).

   API key is read from Vite env: VITE_VOICE_RSS=<key>
   Docs: https://www.voicerss.org/api/
   ========================================================================== */

const API_KEY = import.meta.env.VITE_VOICE_RSS;
const VOICE = "Amy";        // female, en-us
const LANG = "en-us";
const CODEC = "MP3";
const FORMAT = "44khz_16bit_stereo";

const PiperCtx = createContext({
  speak: async () => {},
  stop: () => {},
  loading: false,
  ready: false,
  progress: 0,
  enabled: false,
  setEnabled: () => {},
  error: null,
});

function buildUrl(text) {
  const params = new URLSearchParams({
    key: API_KEY || "",
    hl: LANG,
    v: VOICE,
    src: text,
    c: CODEC,
    f: FORMAT,
  });
  return `https://api.voicerss.org/?${params.toString()}`;
}

export function PiperProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const tokenRef = useRef(0);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
      // Surface playback errors so we can see them in the UI
      a.addEventListener("error", () => {
        const code = a.error?.code;
        const map = {
          1: "Playback aborted",
          2: "Network error reaching Voice RSS",
          3: "Audio decode failed (likely an ERROR response from Voice RSS — check API key/usage)",
          4: "Audio format not supported by browser",
        };
        setError(map[code] || "Audio playback failed");
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
      try { a.pause(); a.currentTime = 0; } catch (e) {}
    }
    setLoading(false);
  }, []);

  const speak = useCallback(async (text) => {
    if (!text) return;
    if (!API_KEY) {
      setError("VITE_VOICE_RSS is not set in the build environment. Set it on the host and redeploy.");
      return;
    }
    const cleaned = String(text).trim();
    if (!cleaned) return;
    if (cleaned.length > 8000) {
      setError("Narration exceeds Voice RSS 8,000-character per-request limit.");
      return;
    }

    tokenRef.current += 1;
    setError(null);
    setLoading(true);

    const a = getAudio();
    a.src = buildUrl(cleaned);
    try {
      await a.play();
    } catch (e) {
      setError(e?.message || "Browser blocked playback (click the Play button to trigger it)");
      setLoading(false);
    }
  }, [getAudio]);

  useEffect(() => {
    return () => { stop(); };
  }, [stop]);

  const value = {
    speak, stop,
    loading,
    ready: !!API_KEY,
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
