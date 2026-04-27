// =====================================================================
// ✏️  EDIT HERE — Per-location data shown in popups & detail pages
// ---------------------------------------------------------------------
// Each location below has its OWN object. To update a value, just
// replace the "—" placeholder with the real data, e.g.:
//
//     value: "12500"   ← number as a string
//     unit:  "m²"      ← unit shown next to the value
//
// You can also change the `label` text if you want different wording.
// Do NOT change the `key` fields or the object names — they are used by
// the rest of the app to find the right data.
// =====================================================================

export interface LocationStat {
  key: string;
  label: string;
  value: string;
  unit?: string;
}

export interface LocationDetailData {
  summary: string;
  stats: {
    surface: LocationStat;
    temperature: LocationStat;
    humidity: LocationStat;
    airQuality: LocationStat;
    solarRadiation: LocationStat;
    precipitation: LocationStat;
  };
  notes: string;
}

// ---------- Parque Doctor Fernández Catalina ----------
export const parqueFernandezCatalinaData: LocationDetailData = {
  summary: "—",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "—", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "—", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "—", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "—", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "—", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "—", unit: "mm" },
  },
  notes: "—",
};

// ---------- Parque Manoteras ----------
export const parqueManoterasData: LocationDetailData = {
  summary: "—",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "—", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "—", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "—", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "—", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "—", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "—", unit: "mm" },
  },
  notes: "—",
};

// ---------- Parque de la Fuente Hortaleza ----------
export const parqueFuenteHortalezaData: LocationDetailData = {
  summary: "—",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "—", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "—", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "—", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "—", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "—", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "—", unit: "mm" },
  },
  notes: "—",
};

// ---------- Parque Pinar del Rey ----------
export const parquePinarDelReyData: LocationDetailData = {
  summary: "—",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "—", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "—", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "—", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "—", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "—", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "—", unit: "mm" },
  },
  notes: "—",
};

// ---------- Colegio Madrid - FSM (Fundación Santa María) ----------
export const colegioMadridFsmData: LocationDetailData = {
  summary: "—",
  stats: {
    surface:        { key: "surface",        label: "Superficie del recinto", value: "—", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media aula", value: "—", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad interior",       value: "—", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "CO₂ medio en aula",      value: "—", unit: "ppm"},
    solarRadiation: { key: "solarRadiation", label: "Radiación en patio",     value: "—", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",        value: "—", unit: "mm" },
  },
  notes: "—",
};

// ---------- Lookup map ----------
export const LOCATION_DATA: Record<string, LocationDetailData> = {
  "parque-fernandez-catalina": parqueFernandezCatalinaData,
  "parque-manoteras":          parqueManoterasData,
  "parque-fuente-hortaleza":   parqueFuenteHortalezaData,
  "parque-pinar-del-rey":      parquePinarDelReyData,
  "colegio-madrid-fsm":        colegioMadridFsmData,
};

export const getLocationData = (id: string): LocationDetailData | undefined =>
  LOCATION_DATA[id];
