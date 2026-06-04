import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import * as PiperTTS from "@mintplex-labs/piper-tts-web";

/* ============================================================================
   PIPER TTS — shared session for the whole module
   - Lazy-loads the chosen voice on first speak() call
   - Streams the ONNX model from HuggingFace (cached in OPFS by Piper)
   - One audio element, queueable playback, stop() cancels current speech
   ========================================================================== */

const DEFAULT_VOICE = "en_US-amy-medium"; // calm, clear US English female

const PiperCtx = createContext({
  speak: async () => {},
  stop: () => {},
  loading: false,
  ready: false,
  progress: 0,
  enabled: false,
  setEnabled: () => {},
  voiceId: DEFAULT_VOICE,
  setVoiceId: () => {},
  error: null,
});

export function PiperProvider({ children }) {
  const [enabled, setEnabled] = useState(false);     // user opt-in
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE);
  const [error, setError] = useState(null);

  const sessionRef = useRef(null);
  const audioRef = useRef(null);
  const currentUrlRef = useRef(null);
  const tokenRef = useRef(0); // monotonic — cancels stale speak() calls

  // Lazily build the audio element (browser autoplay rules satisfied by user gesture)
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "auto";
    }
    return audioRef.current;
  }, []);

  // Initialise / swap the session for a voice
  const initSession = useCallback(async (vId) => {
    setLoading(true);
    setError(null);
    setProgress(0);
    try {
      const sess = await PiperTTS.TtsSession.create({
        voiceId: vId,
        progress: (p) => {
          if (p && p.total) {
            setProgress(Math.min(1, p.loaded / p.total));
          }
        },
      });
      sessionRef.current = sess;
      setReady(true);
      setLoading(false);
      setProgress(1);
    } catch (e) {
      console.error("[piper] init failed", e);
      setError(e?.message || "Piper failed to load.");
      setLoading(false);
      setReady(false);
    }
  }, []);

  // If user toggles enabled on, kick off the load
  useEffect(() => {
    if (!enabled) return;
    if (sessionRef.current && sessionRef.current.voiceId === voiceId) return;
    initSession(voiceId);
  }, [enabled, voiceId, initSession]);

  const stop = useCallback(() => {
    tokenRef.current += 1; // invalidate any pending speak()
    const a = audioRef.current;
    if (a) {
      try { a.pause(); a.currentTime = 0; } catch (e) {}
    }
    if (currentUrlRef.current) {
      try { URL.revokeObjectURL(currentUrlRef.current); } catch (e) {}
      currentUrlRef.current = null;
    }
  }, []);

  const speak = useCallback(async (text) => {
    if (!enabled || !text) return;
    const myToken = ++tokenRef.current;
    // Make sure we have a session
    if (!sessionRef.current || sessionRef.current.voiceId !== voiceId) {
      await initSession(voiceId);
      if (myToken !== tokenRef.current) return; // superseded
    }
    if (!sessionRef.current) return;

    try {
      const blob = await sessionRef.current.predict(text);
      if (myToken !== tokenRef.current) return; // superseded mid-inference
      const url = URL.createObjectURL(blob);
      if (currentUrlRef.current) {
        try { URL.revokeObjectURL(currentUrlRef.current); } catch (e) {}
      }
      currentUrlRef.current = url;
      const a = getAudio();
      a.src = url;
      await a.play().catch(() => {});
    } catch (e) {
      console.error("[piper] speak failed", e);
      setError(e?.message || "Speak failed.");
    }
  }, [enabled, voiceId, initSession, getAudio]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stop();
      sessionRef.current = null;
    };
  }, [stop]);

  return (
    <PiperCtx.Provider value={{ speak, stop, loading, ready, progress, enabled, setEnabled, voiceId, setVoiceId, error }}>
      {children}
    </PiperCtx.Provider>
  );
}

export function usePiper() {
  return useContext(PiperCtx);
}
