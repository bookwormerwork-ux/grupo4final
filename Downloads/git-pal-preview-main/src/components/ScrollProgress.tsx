import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface SectionDot {
  id: string;
  label: string;
  scrollTo: () => void;
}

interface ScrollProgressProps {
  sections: SectionDot[];
  scrollY: MotionValue<number>;
}

/**
 * Apple-style scroll affordances:
 *   - 2px gradient progress rail at the very top of the viewport
 *   - Vertical "dots" rail on the right that highlights the active section
 *     and lets the user jump between them.
 */
const ScrollProgress = ({ sections, scrollY }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => {
      const h = window.innerHeight;
      // 0..1*h → hero, 1..2*h → map, 2*h+ → credits
      if (v < h * 0.85) setActive(0);
      else if (v < h * 2.05) setActive(1);
      else setActive(2);
    });
    return () => unsub();
  }, [scrollY]);

  // Hide the right-rail until past the very first viewport so it doesn't fight the hero
  const railOpacity = useTransform(scrollY, [0, 200, 400], [0, 0, 1]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-park-green via-accent-amber to-park-green-light"
        aria-hidden
      />

      {/* Right side section rail */}
      <motion.nav
        style={{ opacity: railOpacity }}
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 z-[55] hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      >
        {sections.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.id}
              onClick={s.scrollTo}
              aria-label={`Ir a ${s.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive
                    ? "h-2.5 w-2.5 bg-park-green shadow-[0_0_0_4px_rgba(16,185,129,0.18)]"
                    : "h-1.5 w-1.5 bg-foreground/35 group-hover:bg-foreground/70"
                }`}
              />
              <span
                className={`pointer-events-none absolute right-7 whitespace-nowrap rounded-md bg-foreground/85 px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-background opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 ${
                  isActive ? "opacity-100" : ""
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </>
  );
};

export default ScrollProgress;
