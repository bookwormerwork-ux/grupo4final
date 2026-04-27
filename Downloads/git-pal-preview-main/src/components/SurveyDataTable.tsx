import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TableProperties, ChevronDown, Users } from "lucide-react";
import type { RespondentRow, DemographicBreakdown } from "@/data/locationData";
import { EASING } from "@/lib/animations";

const QUESTION_SHORT = [
  "Alegre y de buen humor",
  "Tranquilo y relajado",
  "Activo y energético",
  "Fresco y descansado",
  "Vida llena de interés",
];

const SCORE_PALETTE: Record<number, { bg: string; text: string }> = {
  0: { bg: "rgba(100,116,139,0.35)", text: "#94a3b8" },
  1: { bg: "rgba(239,68,68,0.35)",   text: "#fca5a5" },
  2: { bg: "rgba(249,115,22,0.35)",  text: "#fdba74" },
  3: { bg: "rgba(234,179,8,0.35)",   text: "#fde047" },
  4: { bg: "rgba(20,184,166,0.35)",  text: "#5eead4" },
  5: { bg: "rgba(34,197,94,0.35)",   text: "#86efac" },
};

const AGE_LABEL: Record<string, string> = {
  joven:   "18-30",
  mediana: "31-50",
  mayor:   "51-99",
};

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: EASING.smooth, delay: i * 0.025 },
  }),
};

const chipVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 22, delay: i * 0.012 },
  }),
};

interface SurveyDataTableProps {
  respondentRows: RespondentRow[];
  demographicBreakdowns?: DemographicBreakdown[];
  color: string;
  borderColor: string;
}

export const SurveyDataTable = ({
  respondentRows,
  demographicBreakdowns,
  color,
  borderColor,
}: SurveyDataTableProps) => {
  const [open, setOpen] = useState(false);

  const hasDemo = demographicBreakdowns && demographicBreakdowns.length > 0;
  const hasDemographics = respondentRows.some((r) => r.gender || r.ageGroup);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65, ease: EASING.smooth }}
      className="relative rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 60%, ${color}28 100%)`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.07)`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: borderColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-56 h-56 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: color }}
      />

      {/* Header — toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-full flex items-center justify-between p-6 group focus:outline-none"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2, ease: EASING.smooth }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
            style={{ background: `${borderColor}22` }}
          >
            <TableProperties className="h-5 w-5" style={{ color: borderColor }} />
          </motion.div>
          <div className="text-left">
            <h3 className="text-base font-bold text-white leading-tight">
              Datos de Encuesta Individuales
            </h3>
            <p className="text-sm text-white/50 mt-0.5">
              {respondentRows.length} respondentes · Escala WHO-5 (1–5)
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.38, ease: EASING.smooth }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
          style={{ background: `${color}20` }}
        >
          <ChevronDown className="h-5 w-5 text-white/60" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.48, ease: EASING.smooth }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 space-y-6">
              {/* Divider */}
              <div className="h-px bg-white/10" />

              {/* Demographic summary pills (only when available) */}
              {hasDemo && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: EASING.smooth }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" style={{ color: borderColor }} />
                    <span className="text-sm font-semibold text-white/70">Por grupo de edad</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {demographicBreakdowns!.map((d, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.1 + i * 0.08, ease: EASING.smooth }}
                        className="rounded-xl p-4 text-center border border-white/10"
                        style={{ background: `${color}18` }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25 + i * 0.08 }}
                          className="text-2xl font-bold tabular-nums"
                          style={{ color: borderColor }}
                        >
                          {d.average.toFixed(1)}%
                        </motion.div>
                        <div className="text-xs font-medium text-white/60 mt-1">{d.label}</div>
                        <div className="text-xs text-white/35 mt-0.5">{d.count} personas</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Question legend */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="grid grid-cols-5 gap-2"
              >
                {QUESTION_SHORT.map((label, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="mx-auto mb-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: `${borderColor}44` }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-[10px] leading-tight text-white/40">{label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[480px] border-collapse">
                  <thead>
                    <tr
                      className="border-b border-white/10"
                      style={{ background: `${color}22` }}
                    >
                      <th className="py-2.5 pl-4 pr-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/50 w-20">
                        #
                      </th>
                      {hasDemographics && (
                        <th className="py-2.5 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/50">
                          Perfil
                        </th>
                      )}
                      {["P1", "P2", "P3", "P4", "P5"].map((p) => (
                        <th
                          key={p}
                          className="py-2.5 px-2 text-center text-[11px] font-semibold uppercase tracking-wider text-white/50"
                        >
                          {p}
                        </th>
                      ))}
                      <th className="py-2.5 pl-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-wider text-white/50">
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {respondentRows.map((row, idx) => (
                      <motion.tr
                        key={row.id}
                        custom={idx}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        className="border-b border-white/5 transition-colors duration-150 hover:bg-white/[0.04]"
                      >
                        {/* ID */}
                        <td className="py-2 pl-4 pr-3">
                          <span className="text-xs font-semibold text-white/50">
                            {String(row.id).padStart(2, "0")}
                          </span>
                        </td>

                        {/* Demographic tag */}
                        {hasDemographics && (
                          <td className="py-2 px-3">
                            {row.gender && row.ageGroup ? (
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border border-white/10"
                                style={{ background: `${color}20`, color: borderColor }}
                              >
                                {row.gender === "M" ? "♂" : "♀"}{" "}
                                {AGE_LABEL[row.ageGroup]}
                              </span>
                            ) : (
                              <span className="text-white/20">—</span>
                            )}
                          </td>
                        )}

                        {/* Score chips */}
                        {row.scores.map((score, si) => {
                          const palette = SCORE_PALETTE[score] ?? SCORE_PALETTE[0];
                          return (
                            <td key={si} className="py-2 px-2 text-center">
                              <motion.span
                                custom={idx * 5 + si}
                                variants={chipVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
                                style={{ background: palette.bg, color: palette.text }}
                              >
                                {score}
                              </motion.span>
                            </td>
                          );
                        })}

                        {/* Percentage */}
                        <td className="py-2 pl-3 pr-4 text-right">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 + idx * 0.025 }}
                            className="text-sm font-bold tabular-nums"
                            style={{ color: row.percentage >= 80 ? borderColor : "rgba(255,255,255,0.55)" }}
                          >
                            {row.percentage}%
                          </motion.span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>

                  {/* Summary footer row */}
                  <tfoot>
                    <tr style={{ background: `${color}14` }}>
                      <td
                        colSpan={hasDemographics ? 2 : 1}
                        className="py-2.5 pl-4 pr-3 text-xs font-bold text-white/60"
                      >
                        Media
                      </td>
                      {[0, 1, 2, 3, 4].map((qi) => {
                        const avg =
                          respondentRows.reduce((s, r) => s + (r.scores[qi] ?? 0), 0) /
                          respondentRows.length;
                        return (
                          <td key={qi} className="py-2.5 px-2 text-center text-xs font-bold" style={{ color: borderColor }}>
                            {avg.toFixed(1)}
                          </td>
                        );
                      })}
                      <td className="py-2.5 pl-3 pr-4 text-right text-sm font-bold tabular-nums" style={{ color: borderColor }}>
                        {(
                          respondentRows.reduce((s, r) => s + r.percentage, 0) /
                          respondentRows.length
                        ).toFixed(1)}%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Score legend */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-xs text-white/35 mr-1">Leyenda:</span>
                {([1, 2, 3, 4, 5] as const).map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ background: SCORE_PALETTE[s].bg, color: SCORE_PALETTE[s].text }}
                  >
                    {s} —{" "}
                    {s === 1
                      ? "Nunca"
                      : s === 2
                      ? "Raramente"
                      : s === 3
                      ? "A veces"
                      : s === 4
                      ? "A menudo"
                      : "Siempre"}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
