// =====================================================================
// 🟡  EDIT HERE — Detail page layout (per-location page)
// ---------------------------------------------------------------------
// The numbers (temperature, humidity, etc.) are pulled automatically from
// `src/data/locationData.ts`, so for plain data edits go there instead.
// Edit THIS file only if you want to change the page structure: add a
// new section, change wording, embed a photo, etc.
// =====================================================================
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Thermometer, Droplets, Wind, Sun, CloudRain, RefreshCw } from "lucide-react";
import { getLocationById } from "@/data/locations";
import { getLocationData } from "@/data/locationData";
import { buttonPressVariants, buttonPressTransition, staggerContainerVariants, staggerItemVariants, staggerItemTransition } from "@/lib/animations";
import { WellBeingTable } from "@/components/WellBeingTable";
import { SurveyDataTable } from "@/components/SurveyDataTable";
import { useLocationWeather } from "@/hooks/useLocationWeather";
import {
  TemperatureAreaChart,
  AirQualityBarChart,
  HumidityRadial,
} from "@/components/charts/LocationCharts";

const Detail = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const location = locationId ? getLocationById(locationId) : undefined;
  const data = locationId ? getLocationData(locationId) : undefined;

  const { data: weather, isLoading: weatherLoading, isError: weatherError, dataUpdatedAt } =
    useLocationWeather(
      location?.center[0] ?? 0,
      location?.center[1] ?? 0
    );

  // Build stat card list — live values override static placeholders when available
  const liveValue = (key: string): string | undefined => {
    if (!weather) return undefined;
    switch (key) {
      case "temperature":    return weather.temperature.toFixed(1);
      case "humidity":       return String(weather.humidity);
      case "airQuality":     return String(weather.aqi);
      case "solarRadiation": return weather.solarRadiation.toFixed(0);
      case "precipitation":  return weather.precipitation.toFixed(1);
      default:               return undefined;
    }
  };

  const statCards = [
    { icon: Leaf,        stat: data?.stats.surface,        liveKey: undefined },
    { icon: Thermometer, stat: data?.stats.temperature,    liveKey: "temperature" },
    { icon: Droplets,    stat: data?.stats.humidity,       liveKey: "humidity" },
    { icon: Wind,        stat: data?.stats.airQuality,     liveKey: "airQuality" },
    { icon: Sun,         stat: data?.stats.solarRadiation, liveKey: "solarRadiation" },
    { icon: CloudRain,   stat: data?.stats.precipitation,  liveKey: "precipitation" },
  ];

  if (!location) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Ubicación no encontrada</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-park-green px-4 py-2 text-white"
          >
            Volver al mapa
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (window.opener) window.close();
    else navigate("/");
  };

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-neutral-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <motion.button
            onClick={handleBack}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={buttonPressVariants}
            transition={buttonPressTransition}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all duration-300 ease-smooth hover:bg-neutral-100"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al mapa
          </motion.button>
          <div className="flex items-center gap-3">
            {weatherLoading && (
              <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Obteniendo datos…
              </span>
            )}
            {lastUpdated && !weatherLoading && (
              <span className="text-[11px] text-neutral-400">
                Actualizado: {lastUpdated}
              </span>
            )}
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              G4 · Medio Ambiente
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-0.02em" }}
          >
            {location.name}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Coordenadas: {location.center[0].toFixed(4)}° N, {Math.abs(location.center[1]).toFixed(4)}° W
          </p>
          <div
            className="mt-5 h-1 w-24 rounded-full"
            style={{ background: location.borderColor }}
          />
        </motion.div>

        {/* Stat cards */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerContainerVariants}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {statCards.map((card, i) => {
            const Icon = card.icon;
            const s = card.stat;
            const live = card.liveKey ? liveValue(card.liveKey) : undefined;
            const displayValue = live ?? s?.value ?? "—";
            const isLive = live !== undefined;
            const isCardLoading = weatherLoading && card.liveKey !== undefined;

            return (
              <motion.div
                key={s?.key ?? i}
                variants={staggerItemVariants}
                transition={staggerItemTransition}
                className="relative rounded-xl border border-black/5 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-smooth hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* Live indicator stripe */}
                {isLive && (
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl"
                    style={{ background: location.borderColor }}
                  />
                )}

                <div className="flex items-start justify-between">
                  <div
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${location.color}22`, color: location.borderColor }}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </div>
                  {isLive && (
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
                      style={{ background: `${location.color}18`, color: location.borderColor }}
                    >
                      En vivo
                    </span>
                  )}
                </div>

                <div className="mt-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {s?.label ?? "—"}
                </div>

                {isCardLoading ? (
                  <div className="mt-2 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-100" />
                ) : (
                  <motion.div
                    key={displayValue}
                    initial={isLive ? { opacity: 0, y: 6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-1 text-4xl font-bold text-neutral-900"
                  >
                    {displayValue}
                    {s?.unit && displayValue !== "—" && (
                      <span className="ml-1 text-base font-medium text-neutral-500">{s.unit}</span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.section>

        {/* Charts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <TemperatureAreaChart
              locationId={location.id}
              color={location.color}
              borderColor={location.borderColor}
              tempHistory={weather?.tempHistory}
              isLoading={weatherLoading}
              isError={weatherError}
            />
          </div>
          <HumidityRadial
            locationId={location.id}
            color={location.color}
            borderColor={location.borderColor}
            value={weather?.humidity}
            isLoading={weatherLoading}
            isError={weatherError}
          />
          <div className="lg:col-span-3">
            <AirQualityBarChart
              locationId={location.id}
              color={location.color}
              borderColor={location.borderColor}
              aqHistory={weather?.aqHistory}
              isLoading={weatherLoading}
              isError={weatherError}
            />
          </div>
        </motion.section>

        {/* Well-being Impact Section */}
        {data?.wellbeing && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 space-y-5"
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
          </motion.section>
        )}
      </main>

      <footer className="border-t border-black/5 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-neutral-500">
          Grupo 4 · Digitalizando el Medio Ambiente · Madrid, España
        </div>
      </footer>
    </div>
  );
};

export default Detail;
