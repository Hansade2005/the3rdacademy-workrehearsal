import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

/* ============================================================================
   VOICE RSS TTS — server-side TTS, returns MP3 over HTTPS.
   Same hook contract as the old Piper integration so every <ListenButton>
   and <AVPlaceholder text="..."> keeps working unchanged.

   API key is read from Vite env: VITE_VOICE_RSS=<key>
   Docs: https://www.voicerss.org/api/
   ========================================================================== */

const API_KEY = import.meta.env.VITE_VOICE_RSS;
const VOICE = "Amy";        // female, en-us, clear and calm
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
    key: API_KEY,
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
  const cacheRef = useRef(new Map()); // text -> objectURL
  const tokenRef = useRef(0);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "auto";
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
      setError("Voice RSS API key missing (set VITE_VOICE_RSS in .env)");
      return;
    }
    const cleaned = String(text).trim();
    if (!cleaned) return;

    const myToken = ++tokenRef.current;
    setError(null);

    // Cached?
    let url = cacheRef.current.get(cleaned);
    if (!url) {
      setLoading(true);
      try {
        const resp = await fetch(buildUrl(cleaned));
        if (!resp.ok) throw new Error(`Voice RSS HTTP ${resp.status}`);
        // Voice RSS returns "ERROR: <reason>" as plain text on failure (200 OK)
        const buf = await resp.arrayBuffer();
        const head = new Uint8Array(buf.slice(0, 5));
        const headStr = String.fromCharCode(...head);
        if (headStr.startsWith("ERROR")) {
          const full = new TextDecoder().decode(buf);
          throw new Error(full);
        }
        const blob = new Blob([buf], { type: "audio/mpeg" });
        url = URL.createObjectURL(blob);
        cacheRef.current.set(cleaned, url);
      } catch (e) {
        if (myToken !== tokenRef.current) return;
        console.error("[voicerss] speak failed", e);
        setError(e?.message || "Speak failed.");
        setLoading(false);
        return;
      }
      if (myToken !== tokenRef.current) return; // superseded mid-fetch
      setLoading(false);
    }

    const a = getAudio();
    a.src = url;
    try {
      await a.play();
    } catch (e) {
      // Common cause: no user gesture. The Listen button click is itself a
      // gesture so this should always succeed when triggered from one.
      console.warn("[voicerss] play() rejected", e);
    }
  }, [getAudio]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      stop();
      cacheRef.current.forEach((u) => { try { URL.revokeObjectURL(u); } catch (e) {} });
      cacheRef.current.clear();
    };
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
