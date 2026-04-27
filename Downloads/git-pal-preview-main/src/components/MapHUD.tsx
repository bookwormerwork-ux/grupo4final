import { useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { ChevronDown, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LOCATIONS } from "@/data/locations";

/**
 * A small glass HUD floating in the corner of the map. Shows the live
 * cursor coordinates, current zoom level, and a colour legend so the
 * user understands what the circles mean. Collapsible.
 *
 * Must be rendered inside <MapContainer> because it uses Leaflet hooks.
 */
const MapHUD = () => {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [open, setOpen] = useState(true);

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
    mousemove: (e) => setCoords({ lat: e.latlng.lat, lng: e.latlng.lng }),
    mouseout: () => setCoords(null),
  });

  useEffect(() => {
    setZoom(map.getZoom());
  }, [map]);

  return (
    <div
      className="leaflet-top leaflet-right pointer-events-none"
      style={{ zIndex: 800, marginTop: 12, marginRight: 12 }}
    >
      <motion.div
        layout
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glass pointer-events-auto overflow-hidden rounded-2xl text-[12px] text-neutral-800"
        style={{ width: open ? 240 : 156 }}
      >
        {/* Header */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 transition-colors hover:bg-white/40"
          aria-expanded={open}
          aria-label={open ? "Contraer panel" : "Expandir panel"}
        >
          <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-neutral-700">
            <MapPin className="h-3.5 w-3.5 text-park-green" />
            <span className="text-[10.5px]">Vista del mapa</span>
          </div>
          <motion.span
            animate={{ rotate: open ? 0 : -90 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-2.5 border-t border-black/5 px-3.5 py-3">
                {/* Live readout */}
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-neutral-500">Lat</span>
                  <span className="tabular-nums text-neutral-900">
                    {coords ? coords.lat.toFixed(5) : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-neutral-500">Lng</span>
                  <span className="tabular-nums text-neutral-900">
                    {coords ? coords.lng.toFixed(5) : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-neutral-500">Zoom</span>
                  <span className="tabular-nums text-neutral-900">{zoom}</span>
                </div>

                {/* Legend */}
                <div className="mt-3 border-t border-black/5 pt-2.5">
                  <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-neutral-500">
                    Leyenda
                  </div>
                  <div className="space-y-1.5">
                    <LegendRow
                      color={LOCATIONS[0].color}
                      borderColor={LOCATIONS[0].borderColor}
                      label="Parques (3)"
                    />
                    <LegendRow
                      color={LOCATIONS[4].color}
                      borderColor={LOCATIONS[4].borderColor}
                      label="Colegio Madrid"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const LegendRow = ({
  color,
  borderColor,
  label,
}: {
  color: string;
  borderColor: string;
  label: string;
}) => (
  <div className="flex items-center gap-2 text-[11.5px] text-neutral-700">
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{
        background: color,
        boxShadow: `0 0 0 1.5px ${borderColor}`,
      }}
    />
    {label}
  </div>
);

export default MapHUD;
