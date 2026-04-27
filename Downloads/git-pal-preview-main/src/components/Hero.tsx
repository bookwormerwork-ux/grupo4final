import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  scrollY: MotionValue<number>;
}

// ============================================================
// ✏️  EDIT HERE — Hero copy (title + subtitle)
// ============================================================
const HERO_TITLE = "Grupo 4 — Digitalizando el Medio Ambiente";
const HERO_SUBTITLE = "Pinar de Chamartín, Madrid";
// ============================================================

const Hero = ({ scrollY }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Smoothly map scroll into transforms — tuned for a more cinematic feel
  const titleY = useTransform(scrollY, [0, 700], [0, -120]);
  const titleScale = useTransform(scrollY, [0, 700], [1, 0.94]);
  const titleOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const blurPx = useTransform(scrollY, [0, 500], [2, 0]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const overlayOpacity = useTransform(scrollY, [0, 700], [0.22, 0.08]);
  const heroOpacity = useTransform(scrollY, [480, 720], [1, 0]);
  const pointerEvents = useTransform(scrollY, (v) => (v > 700 ? "none" : "auto"));

  // ----- Mouse parallax + cursor spotlight -----
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  // Smooth springs so the parallax feels weighty, not jittery
  const sx = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.6 });
  // Globe shifts subtly opposite to cursor (parallax)
  const globeX = useTransform(sx, [0, 1], [12, -12]);
  const globeY = useTransform(sy, [0, 1], [8, -8]);
  // Spotlight CSS variables
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);

  const [pxPos, setPxPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set(e.clientX / w);
      mouseY.set(e.clientY / h);
      setPxPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduceMotion]);

  // Drive video currentTime from scroll position; pause when scroll stops.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let pauseTimer: number | null = null;
    let ready = false;

    const onLoaded = () => {
      ready = true;
      try {
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.then === "function") {
          p.then(() => video.pause()).catch(() => {});
        }
      } catch {}
      sync(scrollY.get());
    };

    const sync = (v: number) => {
      if (!ready || !video.duration || isNaN(video.duration)) return;
      const progress = Math.min(Math.max(v / 900, 0), 1);
      const target = progress * video.duration;
      if (Math.abs(video.currentTime - target) > 0.03) {
        video.currentTime = target;
      }
    };

    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();

    const unsubscribe = scrollY.on("change", (v) => {
      sync(v);
      if (pauseTimer) window.clearTimeout(pauseTimer);
      pauseTimer = window.setTimeout(() => video.pause(), 120);
    });

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      if (pauseTimer) window.clearTimeout(pauseTimer);
      unsubscribe();
    };
  }, [scrollY]);

  const titleWords = HERO_TITLE.split(" ");

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: heroOpacity, pointerEvents: pointerEvents as any }}
      className="fixed inset-0 z-30 h-screen w-full overflow-hidden bg-hero-bg"
    >
      {/* Globe video — blur driven by scroll, parallax driven by mouse */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={{
          filter: blurFilter,
          x: reduceMotion ? 0 : globeX,
          y: reduceMotion ? 0 : globeY,
        }}
      >
        <video
          ref={videoRef}
          src="/assets/globe-zoom.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          className="h-full w-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1d3a] via-[#0a0a0a] to-[#072116] -z-10" />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black"
      />

      {/* Cursor spotlight glow — barely visible, just lifts the area near the cursor */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [spotX, spotY] as any,
              ([x, y]: any) =>
                `radial-gradient(360px circle at ${x} ${y}, rgba(255,255,255,0.10), transparent 60%)`,
            ),
          }}
        />
      )}

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Film grain */}
      <div aria-hidden className="film-grain pointer-events-none absolute inset-0" />

      {/* Title */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
      >
        <h1
          className="font-bold text-white"
          style={{
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            textShadow: "0 4px 30px rgba(0,0,0,0.4)",
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="mr-[0.28em] inline-block"
              style={{ overflow: "hidden", verticalAlign: "top" }}
            >
              <motion.span
                initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: reduceMotion ? 0.001 : 0.95,
                  delay: reduceMotion ? 0 : 0.2 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: reduceMotion ? 0.001 : 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: reduceMotion ? 0 : 0.2 + titleWords.length * 0.07 + 0.2,
          }}
          className="mt-6 text-white/75"
          style={{ fontSize: "1.1rem", letterSpacing: "0.02em" }}
        >
          {HERO_SUBTITLE}
        </motion.p>

        {/* ⌘K hint */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: reduceMotion ? 0 : 0.2 + titleWords.length * 0.07 + 0.6,
          }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/60 backdrop-blur"
        >
          <span>Pulsa</span>
          <kbd className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/90">
            ⌘
          </kbd>
          <kbd className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/90">
            K
          </kbd>
          <span>para buscar</span>
        </motion.div>
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        style={{ opacity: titleOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <div className="flex flex-col items-center gap-2 scroll-arrow">
          <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
