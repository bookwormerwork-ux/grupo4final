import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAmbientAudio, getSoundInfo } from "@/hooks/useAmbientAudio";
import type { LiveWeather } from "@/hooks/useLocationWeather";

interface AmbientPlayerProps {
  weather: LiveWeather | undefined;
  color: string;
  borderColor: string;
}

const BAR_DELAYS = [0, 0.15, 0.3, 0.15, 0];
const BAR_HEIGHTS = [0.5, 0.8, 1, 0.75, 0.55];

const WaveformBars = ({ color }: { color: string }) => (
  <div className="flex items-end gap-[3px]" style={{ height: 16 }}>
    {BAR_DELAYS.map((delay, i) => (
      <motion.div
        key={i}
        style={{ width: 3, borderRadius: 2, background: color, originY: 1 }}
        animate={{
          scaleY: [BAR_HEIGHTS[i] * 0.4, BAR_HEIGHTS[i], BAR_HEIGHTS[i] * 0.5, BAR_HEIGHTS[i] * 0.9, BAR_HEIGHTS[i] * 0.4],
          height: 16,
        }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay }}
      />
    ))}
  </div>
);

const AmbientPlayer = ({ weather, color, borderColor }: AmbientPlayerProps) => {
  const { playing, toggle } = useAmbientAudio();
  const [hovered, setHovered] = useState(false);
  const soundInfo = getSoundInfo(
    weather?.precipitation ?? 0,
    weather?.aqi ?? 0
  );

  const expanded = hovered || playing;

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 50,
      }}
    >
      <motion.button
        onClick={() => toggle(soundInfo.profile)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        layout
        style={{
          display: "flex",
          alignItems: "center",
          gap: expanded ? 10 : 0,
          padding: 8,
          borderRadius: 999,
          background: "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,41,59,0.88) 100%)",
          border: `1px solid ${playing ? borderColor + "66" : "rgba(255,255,255,0.10)"}`,
          boxShadow: playing
            ? `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px ${borderColor}22`
            : "0 2px 12px rgba(0,0,0,0.2)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
          overflow: "hidden",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Play / Pause circle */}
        <motion.div
          animate={{ boxShadow: playing ? `0 0 10px ${borderColor}77` : "none" }}
          transition={{ duration: 0.4 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: playing
              ? `linear-gradient(135deg, ${color}, ${borderColor})`
              : "rgba(255,255,255,0.07)",
            border: `1.5px solid ${playing ? borderColor : "rgba(255,255,255,0.18)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.svg key="pause" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.12 }} width="12" height="12" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="2" width="4" height="10" rx="1.5" fill="white" />
                <rect x="8" y="2" width="4" height="10" rx="1.5" fill="white" />
              </motion.svg>
            ) : (
              <motion.svg key="play" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.12 }} width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M3 2.5L11.5 7L3 11.5V2.5Z" fill="white" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Label — only visible when expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{ overflow: "hidden", whiteSpace: "nowrap", paddingRight: 6 }}
            >
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 1 }}>
                Ambiente
              </div>
              <div style={{ fontSize: 11.5, color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                {playing
                  ? <WaveformBars color={borderColor} />
                  : <span style={{ opacity: 0.7 }}>{soundInfo.emoji}</span>
                }
                <span>{soundInfo.label}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default AmbientPlayer;
