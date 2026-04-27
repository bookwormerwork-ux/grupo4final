import { motion } from "framer-motion";
import { Heart, Users, MapPin, Clock } from "lucide-react";
import type { WellBeingMetric } from "@/data/locationData";

interface WellBeingTableProps {
  title: string;
  overallScore: number;
  metrics: WellBeingMetric[];
  respondents: number;
  distance?: string;
  duration?: string;
  color: string;
  borderColor: string;
}

const ScoreBar = ({ score, color }: { score: number; color: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-sm font-semibold text-white/90 w-12 text-right">
        {score.toFixed(1)}%
      </span>
    </div>
  );
};

export const WellBeingTable = ({
  title,
  overallScore,
  metrics,
  respondents,
  distance,
  duration,
  color,
  borderColor,
}: WellBeingTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative rounded-2xl overflow-hidden backdrop-blur-xl border border-white/20 p-6"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5" style={{ color: borderColor }} />
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <p className="text-sm text-white/60">Encuesta de bienestar e impacto social</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: borderColor }}>
            {overallScore.toFixed(1)}%
          </div>
          <p className="text-xs text-white/60 mt-1">Puntuación general</p>
        </div>
      </div>

      {/* Info Pills */}
      <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Users className="h-4 w-4 text-white/60" />
          <span className="text-xs font-medium text-white/80">{respondents} respondentes</span>
        </div>
        {distance && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <MapPin className="h-4 w-4 text-white/60" />
            <span className="text-xs font-medium text-white/80">{distance}</span>
          </div>
        )}
        {duration && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Clock className="h-4 w-4 text-white/60" />
            <span className="text-xs font-medium text-white/80">{duration}</span>
          </div>
        )}
      </div>

      {/* Metrics Table */}
      <div className="space-y-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-white/80 line-clamp-2">{metric.question}</p>
            <ScoreBar score={metric.average} color={borderColor} />
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 blur-3xl"
        style={{ background: color }}
      />
    </motion.div>
  );
};

export { WellBeingTable };
