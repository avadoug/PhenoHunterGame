"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useGameAudio() {
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.35);
  const contextRef = useRef<AudioContext | null>(null);
  const humRef = useRef<OscillatorNode | null>(null);

  const ensureContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    contextRef.current ??= new AudioContextClass();
    return contextRef.current;
  }, []);

  const click = useCallback((kind: "soft"|"reveal"|"keeper" = "soft") => {
    if (muted) return;
    const context = ensureContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = kind === "keeper" ? "sine" : "triangle";
    oscillator.frequency.value = kind === "keeper" ? 392 : kind === "reveal" ? 520 : 240;
    gain.gain.setValueAtTime(Math.max(0.001, volume * 0.09), context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + (kind === "keeper" ? 0.7 : 0.12));
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + (kind === "keeper" ? 0.72 : 0.14));
  }, [ensureContext, muted, volume]);

  useEffect(() => {
    if (muted) {
      humRef.current?.stop();
      humRef.current = null;
      return;
    }
    const context = ensureContext();
    if (!context || humRef.current) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 54;
    gain.gain.value = volume * 0.012;
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    humRef.current = oscillator;
    return () => {
      try { oscillator.stop(); } catch { /* already stopped */ }
      humRef.current = null;
    };
  }, [ensureContext, muted, volume]);

  return { muted, setMuted, volume, setVolume, click, supported:typeof window === "undefined" || Boolean(window.AudioContext) };
}
