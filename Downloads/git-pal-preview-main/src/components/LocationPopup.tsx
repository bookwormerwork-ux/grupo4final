import { motion } from "framer-motion";
import { Location } from "@/data/locations";
import { getLocationData } from "@/data/locationData";
import { useLocationWeather } from "@/hooks/useLocationWeather";

interface LocationPopupProps {
  location: Location;
  isMobile?: boolean;
}

const Sparkline = ({ color }: { color: string }) => {
  const heights = [40, 65, 30, 80, 55];
  return (
    <svg viewBox="0 0 100 36" className="mt-3 h-9 w-full">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 20 + 2}
          y={36 - (h * 36) / 100}
          width={14}
          height={(h * 36) / 100}
          rx={2}
          fill={color}
          opacity={0.85}
        />
      ))}
    </svg>
  );
};

const LocationPopup = ({ location, isMobile = false }: LocationPopupProps) => {
  const data = getLocationData(location.id);

  const { data: weather } = useLocationWeather(
    location.center[0],
    location.center[1]
  );

  // Prefer live value, fall back to static, then "—"
  const fmtStatic = (s?: { value: string; unit?: string }) =>
    s && s.value !== "—" ? `${s.value}${s.unit ? ` ${s.unit}` : ""}` : null;

  const tempDisplay =
    weather != null
      ? `${weather.temperature.toFixed(1)} °C`
      : (fmtStatic(data?.stats.temperature) ?? "—");

  const humidDisplay =
    weather != null
      ? `${weather.humidity} %`
      : (fmtStatic(data?.stats.humidity) ?? "—");

  const surfaceDisplay = fmtStatic(data?.stats.surface) ?? "—";

  const isLive = weather != null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: isMobile ? 20 : 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: isMobile ? 20 : 4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="custom-popup-card glass pointer-events-auto"
      style={{
        borderRadius: 14,
        padding: "16px 20px",
        minWidth: 220,
        maxWidth: isMobile ? "100%" : 280,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className="font-semibold"
          style={{ fontSize: 13, color: "#111", lineHeight: 1.3 }}
        >
          {location.name}
        </div>
        {isLive && (
          <span
            className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
            style={{ background: `${location.color}22`, color: location.borderColor }}
          >
            En vivo
          </span>
        )}
      </div>

      <div className="my-2.5 h-px w-full bg-black/10" />

      <div className="space-y-1.5 text-[12.5px] text-neutral-700">
        <div className="flex justify-between gap-4">
          <span>🌿 {data?.stats.surface.label ?? "Superficie"}</span>
          <span className="font-medium text-neutral-900">{surfaceDisplay}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>🌡️ {data?.stats.temperature.label ?? "Temperatura"}</span>
          <motion.span
            key={tempDisplay}
            initial={isLive ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            className="font-medium text-neutral-900"
          >
            {tempDisplay}
          </motion.span>
        </div>
        <div className="flex justify-between gap-4">
          <span>💧 {data?.stats.humidity.label ?? "Humedad"}</span>
          <motion.span
            key={humidDisplay}
            initial={isLive ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            className="font-medium text-neutral-900"
          >
            {humidDisplay}
          </motion.span>
        </div>
      </div>

      <Sparkline color={location.color} />
      <div
        className="mt-3 text-[12px] font-semibold"
        style={{ color: location.borderColor }}
      >
        Ver más →
      </div>
    </motion.div>
  );
};

export default LocationPopup;
