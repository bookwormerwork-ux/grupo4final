import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

// ---------- Helpers ----------

// Tiny seeded PRNG so each location id always renders the same fake series.
// Replace with real data once `locationData.ts` ships time-series.
const seed = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const buildSeries = (id: string, base: number, swing: number) => {
  const rnd = seed(id);
  const labels = ["L", "M", "X", "J", "V", "S", "D"];
  return labels.map((day) => ({
    day,
    value: +(base + (rnd() - 0.5) * swing).toFixed(1),
  }));
};

const buildAirQuality = (id: string) => {
  const rnd = seed(id + ":aq");
  return [
    { range: "0-50", count: Math.round(20 + rnd() * 20) },
    { range: "51-100", count: Math.round(15 + rnd() * 15) },
    { range: "101-150", count: Math.round(8 + rnd() * 10) },
    { range: "151-200", count: Math.round(2 + rnd() * 6) },
  ];
};

// ---------- Tooltip ----------

const GlassTooltip = ({ active, payload, label, unit }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-black/10 bg-white/95 px-3 py-2 text-[12px] shadow-lg backdrop-blur">
      <div className="font-semibold text-neutral-800">{label}</div>
      <div className="mt-0.5 text-neutral-600">
        {payload[0].value}
        {unit ? ` ${unit}` : ""}
      </div>
    </div>
  );
};

// ---------- Charts ----------

interface ChartProps {
  locationId: string;
  color: string;
  borderColor: string;
}

export const TemperatureAreaChart = ({
  locationId,
  color,
  borderColor,
}: ChartProps) => {
  const data = useMemo(() => buildSeries(locationId, 21, 6), [locationId]);
  const gradId = `temp-${locationId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-black/5 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-neutral-800">
          Temperatura — últimos 7 días
        </h3>
        <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          °C
        </span>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 14, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.55} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<GlassTooltip unit="°C" />} cursor={{ stroke: borderColor, strokeWidth: 1, strokeDasharray: "3 3" }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={borderColor}
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              dot={{ r: 3, stroke: borderColor, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 5, stroke: borderColor, strokeWidth: 2, fill: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export const AirQualityBarChart = ({
  locationId,
  color,
  borderColor,
}: ChartProps) => {
  const data = useMemo(() => buildAirQuality(locationId), [locationId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-black/5 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-neutral-800">
          Distribución de calidad del aire
        </h3>
        <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          ICA
        </span>
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 14, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#888" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<GlassTooltip unit="h" />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="count" fill={color} stroke={borderColor} strokeWidth={1} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

interface HumidityProps extends ChartProps {
  value?: number;
}

export const HumidityRadial = ({
  locationId,
  color,
  borderColor,
  value,
}: HumidityProps) => {
  const seeded = useMemo(() => {
    const rnd = seed(locationId + ":hum");
    return Math.round(40 + rnd() * 45);
  }, [locationId]);
  const v = value ?? seeded;

  const data = [{ name: "humidity", value: v, fill: color }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-xl border border-black/5 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-neutral-800">Humedad actual</h3>
        <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          %
        </span>
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="78%"
              outerRadius="100%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                background={{ fill: "rgba(0,0,0,0.05)" }}
                dataKey="value"
                cornerRadius={20}
                fill={color}
                stroke={borderColor}
                strokeWidth={1}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-4xl font-bold tabular-nums"
            style={{ color: borderColor }}
          >
            {v}
            <span className="ml-0.5 text-base font-medium text-neutral-400">%</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-neutral-400">
            humedad relativa
          </div>
        </div>
      </div>
    </motion.div>
  );
};
