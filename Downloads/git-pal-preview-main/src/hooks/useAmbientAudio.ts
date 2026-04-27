import { useRef, useCallback, useState, useEffect } from "react";

export type SoundProfile = "birds" | "rain" | "storm" | "crickets" | "wind";

export interface SoundInfo {
  profile: SoundProfile;
  label: string;
  emoji: string;
}

// Madrid local hour (CEST = UTC+2 Apr–Oct, CET = UTC+1 rest)
function madridHour(): number {
  const now = new Date();
  const month = now.getUTCMonth();
  const offset = month >= 3 && month <= 9 ? 2 : 1;
  return (now.getUTCHours() + offset) % 24;
}

export function getSoundInfo(precipitation: number, aqi: number): SoundInfo {
  const h = madridHour();
  const isNight = h < 7 || h >= 21;
  const isEvening = h >= 18 && h < 21;
  if (precipitation > 5)   return { profile: "storm",   label: "Tormenta",           emoji: "⛈️" };
  if (precipitation > 0.1) return { profile: "rain",    label: "Lluvia suave",        emoji: "🌧️" };
  if (isNight)             return { profile: "crickets",label: "Noche de verano",     emoji: "🌙" };
  if (isEvening)           return { profile: "wind",    label: "Brisa del atardecer", emoji: "🌅" };
  if (aqi > 100)           return { profile: "wind",    label: "Brisa urbana",        emoji: "🏙️" };
  return                          { profile: "birds",   label: "Día soleado",         emoji: "☀️" };
}

// ─── Audio helpers ────────────────────────────────────────────────────────────

function whiteNoise(ctx: AudioContext, seconds = 3): AudioBufferSourceNode {
  const size = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, size, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  return src;
}

function biquad(
  ctx: AudioContext,
  type: BiquadFilterType,
  freq: number,
  q = 1
): BiquadFilterNode {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
}

function gain(ctx: AudioContext, value: number): GainNode {
  const g = ctx.createGain();
  g.gain.value = value;
  return g;
}

// Schedule a single bird or cricket chirp
function chirp(
  ctx: AudioContext,
  dest: AudioNode,
  t: number,
  kind: "bird" | "cricket"
) {
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = "sine";

  if (kind === "bird") {
    const f = 2200 + Math.random() * 2800;
    osc.frequency.setValueAtTime(f, t);
    osc.frequency.linearRampToValueAtTime(f * (1.15 + Math.random() * 0.4), t + 0.07);
    osc.frequency.linearRampToValueAtTime(f * 0.88, t + 0.18);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.13, t + 0.025);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.start(t); osc.stop(t + 0.25);
  } else {
    // crickets: rapid bursts of 3 tiny ticks
    const f = 4400 + Math.random() * 900;
    for (let k = 0; k < 3; k++) {
      const tk = t + k * 0.045;
      const o2 = ctx.createOscillator();
      const e2 = ctx.createGain();
      o2.type = "sine";
      o2.frequency.value = f;
      e2.gain.setValueAtTime(0, tk);
      e2.gain.linearRampToValueAtTime(0.07, tk + 0.008);
      e2.gain.exponentialRampToValueAtTime(0.001, tk + 0.04);
      o2.connect(e2); e2.connect(dest);
      o2.start(tk); o2.stop(tk + 0.05);
    }
    // Keep osc unused path but still need a valid node for type consistency
    env.gain.value = 0;
    osc.start(t); osc.stop(t + 0.001);
  }

  osc.connect(env);
  env.connect(dest);
}

// ─── Main hook ────────────────────────────────────────────────────────────────

interface AudioState {
  ctx: AudioContext;
  master: GainNode;
  sources: AudioBufferSourceNode[];
  timers: ReturnType<typeof setInterval>[];
  dead: { v: boolean };
}

export function useAmbientAudio() {
  const state = useRef<AudioState | null>(null);
  const [playing, setPlaying] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const s = state.current;
      if (s) {
        s.dead.v = true;
        s.timers.forEach(clearInterval);
        s.sources.forEach(src => { try { src.stop(); } catch { /**/ } });
        s.ctx.close();
      }
    };
  }, []);

  const stop = useCallback((instant = false) => {
    const s = state.current;
    if (!s) return;
    s.dead.v = true;
    s.timers.forEach(clearInterval);

    const fadeOut = instant ? 0.05 : 1.8;
    s.master.gain.cancelScheduledValues(s.ctx.currentTime);
    s.master.gain.setValueAtTime(s.master.gain.value, s.ctx.currentTime);
    s.master.gain.linearRampToValueAtTime(0, s.ctx.currentTime + fadeOut);

    setTimeout(() => {
      s.sources.forEach(src => { try { src.stop(); } catch { /**/ } });
      s.ctx.close();
      state.current = null;
    }, (fadeOut + 0.1) * 1000);

    setPlaying(false);
  }, []);

  const play = useCallback(
    (profile: SoundProfile) => {
      // Kill previous
      if (state.current) stop(true);

      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.75, ctx.currentTime + 2.5);
      master.connect(ctx.destination);

      const sources: AudioBufferSourceNode[] = [];
      const timers: ReturnType<typeof setInterval>[] = [];
      const dead = { v: false };

      // ── Rain / Storm ───────────────────────────────────────────────────────
      if (profile === "rain" || profile === "storm") {
        const noise = whiteNoise(ctx);
        const f1 = biquad(ctx, "lowpass", profile === "storm" ? 550 : 340, 0.7);
        const g1 = gain(ctx, 0.45);
        noise.connect(f1); f1.connect(g1); g1.connect(master);
        noise.start();
        sources.push(noise);

        // Subtle high-freq spray
        const spray = whiteNoise(ctx);
        const f2 = biquad(ctx, "highpass", 4000, 0.5);
        const g2 = gain(ctx, 0.04);
        spray.connect(f2); f2.connect(g2); g2.connect(master);
        spray.start();
        sources.push(spray);
      }

      // ── Wind (also layered into storm) ────────────────────────────────────
      if (profile === "wind" || profile === "storm") {
        const noise = whiteNoise(ctx);
        const f1 = biquad(ctx, "bandpass", 160, 0.35);
        const g1 = gain(ctx, 0.28);

        // LFO — slow gust modulation
        const lfo = ctx.createOscillator();
        const lfoG = gain(ctx, 0.18);
        lfo.frequency.value = 0.18 + Math.random() * 0.12;
        lfo.connect(lfoG);
        lfoG.connect(g1.gain);
        lfo.start();

        noise.connect(f1); f1.connect(g1); g1.connect(master);
        noise.start();
        sources.push(noise);
      }

      // ── Birds / Crickets ──────────────────────────────────────────────────
      if (profile === "birds" || profile === "crickets") {
        // Soft ambient breath underneath
        const amb = whiteNoise(ctx);
        const fa = biquad(ctx, "bandpass", profile === "birds" ? 3500 : 5000, 2);
        const ga = gain(ctx, 0.02);
        amb.connect(fa); fa.connect(ga); ga.connect(master);
        amb.start();
        sources.push(amb);

        const kind = profile === "birds" ? "bird" : "cricket";
        const minGap = kind === "bird" ? 0.25 : 0.06;
        const maxGap = kind === "bird" ? 2.8  : 0.35;
        const horizon = 4; // schedule this many seconds ahead

        const schedule = () => {
          if (dead.v) return;
          let t = ctx.currentTime + 0.4;
          while (t < ctx.currentTime + horizon) {
            chirp(ctx, master, t, kind);
            t += minGap + Math.random() * (maxGap - minGap);
          }
        };

        schedule();
        const tid = setInterval(schedule, (horizon - 0.5) * 1000);
        timers.push(tid);
      }

      state.current = { ctx, master, sources, timers, dead };
      setPlaying(true);
    },
    [stop]
  );

  const toggle = useCallback(
    (profile: SoundProfile) => {
      if (playing) stop();
      else play(profile);
    },
    [playing, play, stop]
  );

  return { playing, play, stop, toggle };
}
