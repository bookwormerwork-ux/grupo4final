import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getLocationById } from "@/data/locations";
import { getLocationData } from "@/data/locationData";
import { buttonPressVariants, buttonPressTransition } from "@/lib/animations";
import { WellBeingTable } from "@/components/WellBeingTable";
import { SurveyDataTable } from "@/components/SurveyDataTable";

const Wellbeing = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const location = locationId ? getLocationById(locationId) : undefined;
  const data = locationId ? getLocationData(locationId) : undefined;

  if (!location || !data?.wellbeing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-700">Sin datos de bienestar</h1>
          <button
            onClick={() => navigate(locationId ? `/detail/${locationId}` : "/")}
            className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-neutral-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <motion.button
            onClick={() => navigate(`/detail/${locationId}`)}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={buttonPressVariants}
            transition={buttonPressTransition}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100"
          >
            <ArrowLeft className="h-4 w-4" /> {location.name}
          </motion.button>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Bienestar · G4
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <h1
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Impacto en Bienestar
          </h1>
          <p className="mt-1.5 text-sm text-neutral-500">{location.name}</p>
          <div className="mt-4 h-1 w-16 rounded-full" style={{ background: location.borderColor }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <WellBeingTable
            title={data.wellbeing.title}
            overallScore={data.wellbeing.overallScore}
            metrics={data.wellbeing.metrics}
            respondents={data.wellbeing.respondents}
            distance={data.wellbeing.distance}
            duration={data.wellbeing.duration}
            color={location.color}
            borderColor={location.borderColor}
          />
          {data.wellbeing.respondentRows && (
            <SurveyDataTable
              respondentRows={data.wellbeing.respondentRows}
              demographicBreakdowns={data.wellbeing.demographicBreakdowns}
              color={location.color}
              borderColor={location.borderColor}
            />
          )}
        </motion.div>
      </main>

      <footer className="border-t border-black/5 bg-white py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-neutral-500">
          Grupo 4 · Digitalizando el Medio Ambiente · Madrid, España
        </div>
      </footer>
    </div>
  );
};

export default Wellbeing;
