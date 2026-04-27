// =====================================================================
// ✏️  EDIT HERE — Map locations (circles drawn on the map)
// ---------------------------------------------------------------------
// Each entry below is one circle on the map. You can edit:
//   • name         → label shown in the popup
//   • center       → [latitude, longitude]  (use Google Maps to grab these)
//   • radius       → meters
//   • color        → fill color (hex)
//   • borderColor  → stroke color (hex)
//   • fillOpacity  → 0..1
//
// ⚠️  Do NOT change `id` — it links each location to its data in
//     `locationData.ts` and to the URL `/detail/<id>`.
// =====================================================================

export interface Location {
  id: string;
  name: string;
  center: [number, number];
  radius: number;
  color: string;
  borderColor: string;
  fillOpacity: number;
  type: "park" | "school";
}

export const LOCATIONS: Location[] = [
  {
    id: "parque-fernandez-catalina",
    name: "Parque Doctor Fernández Catalina",
    center: [40.47678278655959, -3.6671160216779923],
    radius: 140,
    color: "#34d399",
    borderColor: "#10b981",
    fillOpacity: 0.25,
    type: "park",
  },
  {
    id: "parque-manoteras",
    name: "Parque Manoteras",
    center: [40.47708134817251, -3.661573201652147],
    radius: 140,
    color: "#34d399",
    borderColor: "#10b981",
    fillOpacity: 0.25,
    type: "park",
  },
  {
    id: "parque-fuente-hortaleza",
    name: "Parque de la Fuente Hortaleza",
    center: [40.47652437184086, -3.655776746109947],
    radius: 140,
    color: "#34d399",
    borderColor: "#10b981",
    fillOpacity: 0.25,
    type: "park",
  },
  {
    id: "parque-pinar-del-rey",
    name: "Parque Pinar del Rey",
    center: [40.464632510471056, -3.6556009029796392],
    radius: 140,
    color: "#34d399",
    borderColor: "#10b981",
    fillOpacity: 0.25,
    type: "park",
  },
  {
    id: "colegio-madrid-fsm",
    name: "Colegio Madrid - FSM",
    center: [40.47374681146278, -3.6656464953234646],
    radius: 90,
    color: "#f59e0b",
    borderColor: "#d97706",
    fillOpacity: 0.30,
    type: "school",
  },
];

export const getLocationById = (id: string): Location | undefined =>
  LOCATIONS.find((l) => l.id === id);
