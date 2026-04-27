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
  <div className="flex items-end gap-[3px]" style={{ height: 20 }}>
    {BAR_DELAYS.map((delay, i) => (
      <motion.div
        key={i}
        style={{
          width: 3,
          borderRadius: 2,
          background: color,
          originY: 1,
        }}
        animate={{
          scaleY: [BAR_HEIGHTS[i] * 0.4, BAR_HEIGHTS[i], BAR_HEIGHTS[i] * 0.5, BAR_HEIGHTS[i] * 0.9, BAR_HEIGHTS[i] * 0.4],
          height: 20,
        }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    ))}
  </div>
);

const AmbientPlayer = ({ weather, color, borderColor }: AmbientPlayerProps) => {
  const { playing, toggle } = useAmbientAudio();
  const soundInfo = getSoundInfo(
    weather?.precipitation ?? 0,
    weather?.aqi ?? 0
  );

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
      }}
    >
      <motion.button
        onClick={() => toggle(soundInfo.profile)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 18px 10px 10px",
          borderRadius: 999,
          background: "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,41,59,0.92) 70%)",
          border: `1px solid ${borderColor}44`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
        }}
      >
        {/* Play / Pause circle */}
        <motion.div
          animate={{ boxShadow: playing ? `0 0 12px ${borderColor}88` : "none" }}
          transition={{ duration: 0.4 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: playing
              ? `linear-gradient(135deg, ${color}, ${borderColor})`
              : "rgba(255,255,255,0.08)",
            border: `1.5px solid ${borderColor}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.svg
                key="pause"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                width="14" height="14" viewBox="0 0 14 14" fill="none"
              >
                <rect x="2" y="2" width="4" height="10" rx="1.5" fill="white" />
                <rect x="8" y="2" width="4" height="10" rx="1.5" fill="white" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                width="14" height="14" viewBox="0 0 14 14" fill="none"
              >
                <path d="M3 2.5L11.5 7L3 11.5V2.5Z" fill="white" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Label */}
        <div style={{ textAlign: "left", minWidth: 120 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 1 }}>
            Ambiente del parque
          </div>
          <div style={{ fontSize: 13, color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
            <span>{soundInfo.emoji}</span>
            <span>{soundInfo.label}</span>
          </div>
        </div>

        {/* Waveform (only when playing) */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden", flexShrink: 0 }}
            >
              <WaveformBars color={borderColor} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default AmbientPlayer;
