import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimatePresence, motion } from "framer-motion";
import { LOCATIONS, Location } from "@/data/locations";
import LocationPopup from "./LocationPopup";
import MapHUD from "./MapHUD";
import colegioLogo from "@/assets/colegio-madrid-logo.png";

const CENTER: [number, number] = [40.4760, -3.6625];

interface HoverState {
  location: Location;
  x: number;
  y: number;
}

interface MapInnerProps {
  enableInteraction: boolean;
  onHover: (state: HoverState | null) => void;
}

const MapController = ({ enableInteraction }: { enableInteraction: boolean }) => {
  const map = useMap();

  // Force Leaflet to recompute its size whenever it becomes visible / the
  // viewport changes. The map is mounted while still hidden behind the fixed
  // hero overlay, which leaves a gray "still loading" patch until we
  // explicitly call invalidateSize().
  useEffect(() => {
    const refresh = () => {
      try {
        map.invalidateSize({ pan: false });
      } catch {}
    };

    // Initial multi-pass refresh to catch any layout shifts (fonts, hero unmount, etc.)
    const timers = [50, 200, 500, 900, 1500].map((t) =>
      window.setTimeout(refresh, t),
    );

    // Refresh whenever the map container resizes (responsive, devtools, etc.)
    const ro = new ResizeObserver(refresh);
    ro.observe(map.getContainer());

    // Refresh whenever the section scrolls into view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) refresh();
        });
      },
      { threshold: 0.05 },
    );
    io.observe(map.getContainer());

    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, { passive: true });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh);
    };
  }, [map]);

  useEffect(() => {
    if (enableInteraction) {
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
    }
    // Also invalidate when interactivity flips — that's exactly when the user reaches the map
    try {
      map.invalidateSize({ pan: false });
    } catch {}
  }, [enableInteraction, map]);
  return null;
};

const HighlightCircles = ({ onHover }: { onHover: MapInnerProps["onHover"] }) => {
  const map = useMap();

  return (
    <>
      {LOCATIONS.map((loc) => (
        <Circle
          key={loc.id}
          center={loc.center}
          radius={loc.radius}
          pathOptions={{
            color: loc.borderColor,
            weight: 2,
            fillColor: loc.color,
            fillOpacity: loc.fillOpacity,
            className: "pulse-highlight",
          }}
          eventHandlers={{
            mouseover: (e) => {
              const point = map.latLngToContainerPoint(e.latlng);
              const container = map.getContainer().getBoundingClientRect();
              onHover({
                location: loc,
                x: container.left + point.x,
                y: container.top + point.y,
              });
              (e.target as L.Path).setStyle({ fillOpacity: 0.5, weight: 3 });
            },
            mousemove: (e) => {
              const point = map.latLngToContainerPoint(e.latlng);
              const container = map.getContainer().getBoundingClientRect();
              onHover({
                location: loc,
                x: container.left + point.x,
                y: container.top + point.y,
              });
            },
            mouseout: (e) => {
              onHover(null);
              (e.target as L.Path).setStyle({
                fillOpacity: loc.fillOpacity,
                weight: 2,
              });
            },
            click: () => {
              window.open(`/detail/${loc.id}`, "_blank", "noopener,noreferrer");
            },
          }}
        />
      ))}
    </>
  );
};

// Floating glassy logo overlay anchored at the centre of a given map location.
// Only rendered while `visible` is true (e.g. on hover of the orange school circle).
const SchoolLogoOverlay = ({
  locationId,
  visible,
}: {
  locationId: string;
  visible: boolean;
}) => {
  const map = useMap();
  const loc = LOCATIONS.find((l) => l.id === locationId);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!loc) return;
    const update = () => {
      const p = map.latLngToContainerPoint(loc.center);
      setPos({ x: p.x, y: p.y });
    };
    update();
    map.on("move zoom viewreset resize", update);
    return () => {
      map.off("move zoom viewreset resize", update);
    };
  }, [map, loc]);

  if (!loc || !pos) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="school-logo"
          // We position the wrapper so its center sits exactly on (pos.x, pos.y)
          // by offsetting left/top with margins. This avoids fighting framer-motion
          // for the `transform` property, which would break -50%/-50% centering
          // and was causing the logo to drift off the orange circle.
          initial={{ opacity: 0, scale: 0.82, y: 8 }}
          animate={{
            opacity: 1,
            scale: 1,
            // Gentle floating loop — purely vertical, smooth easing
            y: [0, -7, 0],
          }}
          exit={{ opacity: 0, scale: 0.82, y: 8 }}
          transition={{
            opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            y: {
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="pointer-events-none absolute z-[500]"
          style={{
            left: pos.x - 32, // half of w-16 (64px)
            top: pos.y - 32,  // half of h-16 (64px)
            willChange: "transform, opacity",
          }}
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, hsla(220, 50%, 22%, 0.55), hsla(220, 60%, 10%, 0.55))",
              backdropFilter: "blur(18px) saturate(180%)",
              WebkitBackdropFilter: "blur(18px) saturate(180%)",
              border: "1px solid hsla(0, 0%, 100%, 0.22)",
              boxShadow:
                "0 12px 32px -10px hsla(220, 50%, 5%, 0.55), inset 0 1px 0 hsla(0,0%,100%,0.18)",
            }}
          >
            <img
              src={colegioLogo}
              alt="Colegio Madrid - FSM"
              className="h-12 w-12 object-contain"
              style={{ filter: "drop-shadow(0 2px 4px hsla(0,0%,0%,0.45))" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface MapViewProps {
  enableInteraction: boolean;
}

const MapView = ({ enableInteraction }: MapViewProps) => {
  const [hover, setHover] = useState<HoverState | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <MapContainer
        center={CENTER}
        zoom={16}
        scrollWheelZoom={false}
        zoomControl={true}
        className="h-full w-full"
        style={{ cursor: "grab" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OSM'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController enableInteraction={enableInteraction} />
        <HighlightCircles onHover={setHover} />
        <SchoolLogoOverlay
          locationId="colegio-madrid-fsm"
          visible={hover?.location.id === "colegio-madrid-fsm"}
        />
        <MapHUD />
      </MapContainer>

      {/* Floating popup (desktop) */}
      <AnimatePresence>
        {hover && !isMobile && (
          <div
            className="pointer-events-none fixed z-[1000]"
            style={{
              left: hover.x,
              top: hover.y,
              transform: "translate(16px, -50%)",
            }}
          >
            <LocationPopup location={hover.location} />
          </div>
        )}
      </AnimatePresence>

      {/* Bottom sheet (mobile) */}
      <AnimatePresence>
        {hover && isMobile && (
          <div className="pointer-events-none fixed inset-x-3 bottom-3 z-[1000]">
            <LocationPopup location={hover.location} isMobile />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
