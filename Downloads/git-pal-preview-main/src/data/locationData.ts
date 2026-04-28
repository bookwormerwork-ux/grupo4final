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

export interface WellBeingMetric {
  question: string;
  average: number;
  respondents: number;
}

export interface RespondentRow {
  id: number;
  gender?: "M" | "F";
  ageGroup?: "joven" | "mediana" | "mayor"; // 18-30, 31-50, 51-99
  scores: number[]; // one score per question (1-5 scale)
  percentage: number;
}

export interface DemographicBreakdown {
  label: string;
  average: number;
  count: number;
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
  wellbeing?: {
    title: string;
    overallScore: number;
    metrics: WellBeingMetric[];
    respondents: number;
    distance?: string;
    duration?: string;
    respondentRows?: RespondentRow[];
    demographicBreakdowns?: DemographicBreakdown[];
  };
}

// ---------- Parque Doctor Fernández Catalina ----------
// Source: survey data — 30 respondents, WHO-5 scale (1-5), overall 76.13%
export const parqueFernandezCatalinaData: LocationDetailData = {
  summary: "Espacio verde dedicado a la salud ambiental y el bienestar comunitario.",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "4800", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "—", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "—", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "—", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "—", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "—", unit: "mm" },
  },
  notes: "Sensores en tiempo real — Última actualización: Hoy",
  wellbeing: {
    title: "Impacto en Bienestar",
    overallScore: 76.13,
    respondents: 30,
    metrics: [
      { question: "Me he sentido alegre y de buen humor",                                        average: 82.67, respondents: 30 },
      { question: "Me he sentido tranquilo y relajado",                                          average: 74.67, respondents: 30 },
      { question: "Me he sentido activo y energético",                                           average: 77.33, respondents: 30 },
      { question: "Me he despertado fresco y descansado",                                        average: 62.0,  respondents: 30 },
      { question: "Mi vida cotidiana ha estado llena de cosas que me interesan",                 average: 84.0,  respondents: 30 },
    ],
    respondentRows: [
      { id:  1, scores: [4, 2, 3, 3, 2], percentage: 56 },
      { id:  2, scores: [3, 2, 3, 2, 3], percentage: 52 },
      { id:  3, scores: [5, 5, 5, 5, 5], percentage: 100 },
      { id:  4, scores: [4, 3, 3, 3, 4], percentage: 68 },
      { id:  5, scores: [5, 4, 4, 3, 4], percentage: 80 },
      { id:  6, scores: [4, 4, 3, 3, 5], percentage: 76 },
      { id:  7, scores: [5, 4, 3, 1, 5], percentage: 72 },
      { id:  8, scores: [5, 3, 5, 4, 5], percentage: 88 },
      { id:  9, scores: [2, 2, 4, 3, 3], percentage: 56 },
      { id: 10, scores: [2, 3, 3, 3, 3], percentage: 56 },
      { id: 11, scores: [3, 3, 4, 3, 3], percentage: 64 },
      { id: 12, scores: [5, 5, 5, 3, 5], percentage: 92 },
      { id: 13, scores: [3, 4, 4, 5, 5], percentage: 84 },
      { id: 14, scores: [3, 4, 5, 2, 3], percentage: 68 },
      { id: 15, scores: [3, 3, 4, 2, 4], percentage: 64 },
      { id: 16, scores: [4, 5, 3, 4, 5], percentage: 84 },
      { id: 17, scores: [5, 5, 4, 3, 5], percentage: 88 },
      { id: 18, scores: [5, 4, 4, 4, 4], percentage: 84 },
      { id: 19, scores: [5, 4, 3, 5, 5], percentage: 88 },
      { id: 20, scores: [4, 2, 3, 0, 4], percentage: 52 },
      { id: 21, scores: [4, 2, 3, 2, 4], percentage: 60 },
      { id: 22, scores: [4, 3, 4, 4, 4], percentage: 76 },
      { id: 23, scores: [4, 4, 5, 3, 5], percentage: 84 },
      { id: 24, scores: [4, 4, 4, 4, 5], percentage: 84 },
      { id: 25, scores: [5, 5, 3, 3, 5], percentage: 84 },
      { id: 26, scores: [4, 4, 3, 3, 4], percentage: 72 },
      { id: 27, scores: [5, 5, 5, 3, 5], percentage: 92 },
      { id: 28, scores: [5, 5, 4, 3, 5], percentage: 88 },
      { id: 29, scores: [5, 5, 5, 4, 3], percentage: 88 },
      { id: 30, scores: [5, 4, 5, 3, 4], percentage: 84 },
    ],
  },
};

// ---------- Parque Manoteras ----------
export const parqueManoterasData: LocationDetailData = {
  summary: "Parque dedicado a la educación ambiental y sostenibilidad.",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "18500", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "18.3", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "52", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "45", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "385", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "8.2", unit: "mm" },
  },
  notes: "Sensores en tiempo real — Última actualización: Hoy",
  wellbeing: {
    title: "Impacto en Bienestar",
    overallScore: 76.13,
    respondents: 30,
    distance: "2.1 km",
    duration: "0.5-1.5 h",
    metrics: [
      { question: "Me he sentido alegre y de buen humor",                                        average: 76.0, respondents: 30 },
      { question: "Me he sentido tranquilo y relajado",                                          average: 72.0, respondents: 30 },
      { question: "Me he sentido activo y energético",                                           average: 78.0, respondents: 30 },
      { question: "Me he despertado fresco y descansado",                                        average: 74.0, respondents: 30 },
      { question: "Mi vida cotidiana ha estado llena de cosas que me interesan",                 average: 80.0, respondents: 30 },
    ],
  },
};

// ---------- Parque de la Fuente Hortaleza ----------
export const parqueFuenteHortalezaData: LocationDetailData = {
  summary: "Parque natural con manantial y vegetación nativa madrileña.",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "22000", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "17.8", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "58", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "38", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "392", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "6.5", unit: "mm" },
  },
  notes: "Sensores en tiempo real — Última actualización: Hoy",
  wellbeing: {
    title: "Impacto en Bienestar",
    overallScore: 74.5,
    respondents: 22,
    distance: "1.4 km",
    duration: "0.75-1 h",
    metrics: [
      { question: "Me he sentido alegre y de buen humor",                                        average: 72.0, respondents: 22 },
      { question: "Me he sentido tranquilo y relajado",                                          average: 75.0, respondents: 22 },
      { question: "Me he sentido activo y energético",                                           average: 76.0, respondents: 22 },
      { question: "Me he despertado fresco y descansado",                                        average: 72.0, respondents: 22 },
      { question: "Mi vida cotidiana ha estado llena de cosas que me interesan",                 average: 78.0, respondents: 22 },
    ],
  },
};

// ---------- Parque Pinar del Rey ----------
// Source: survey data — 23 respondents (with gender/age), WHO-5 scale (1-5), overall 77.91%
export const parquePinarDelReyData: LocationDetailData = {
  summary: "Espacio forestal con preservación de flora endémica.",
  stats: {
    surface:        { key: "surface",        label: "Superficie",         value: "15800", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura media",  value: "16.9", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad",            value: "61", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",   value: "32", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",    value: "378", unit: "W/m²"},
    precipitation:  { key: "precipitation",  label: "Precipitaciones",    value: "7.1", unit: "mm" },
  },
  notes: "Sensores en tiempo real — Última actualización: Hoy",
  wellbeing: {
    title: "Impacto en Bienestar",
    overallScore: 77.91,
    respondents: 23,
    distance: "1.6 km",
    duration: "0.5-1 h",
    metrics: [
      { question: "Me he sentido alegre y de buen humor",                                        average: 80.87, respondents: 23 },
      { question: "Me he sentido tranquilo y relajado",                                          average: 73.91, respondents: 23 },
      { question: "Me he sentido activo y energético",                                           average: 74.78, respondents: 23 },
      { question: "Me he despertado fresco y descansado",                                        average: 78.26, respondents: 23 },
      { question: "Mi vida cotidiana ha estado llena de cosas que me interesan",                 average: 81.74, respondents: 23 },
    ],
    respondentRows: [
      { id:  1, gender: "M", ageGroup: "mayor",   scores: [3, 5, 5, 5, 4], percentage: 88 },
      { id:  2, gender: "F", ageGroup: "joven",   scores: [5, 3, 4, 3, 5], percentage: 80 },
      { id:  3, gender: "M", ageGroup: "mayor",   scores: [4, 3, 4, 5, 4], percentage: 80 },
      { id:  4, gender: "F", ageGroup: "mayor",   scores: [5, 4, 3, 5, 4], percentage: 84 },
      { id:  5, gender: "M", ageGroup: "mayor",   scores: [3, 3, 5, 4, 3], percentage: 72 },
      { id:  6, gender: "M", ageGroup: "mayor",   scores: [3, 3, 2, 3, 4], percentage: 60 },
      { id:  7, gender: "F", ageGroup: "mayor",   scores: [4, 3, 3, 3, 5], percentage: 72 },
      { id:  8, gender: "F", ageGroup: "mediana", scores: [5, 5, 5, 4, 4], percentage: 92 },
      { id:  9, gender: "F", ageGroup: "joven",   scores: [4, 3, 4, 2, 5], percentage: 72 },
      { id: 10, gender: "F", ageGroup: "mayor",   scores: [3, 3, 3, 4, 4], percentage: 68 },
      { id: 11, gender: "M", ageGroup: "joven",   scores: [5, 4, 5, 4, 5], percentage: 92 },
      { id: 12, gender: "M", ageGroup: "joven",   scores: [4, 3, 2, 4, 3], percentage: 64 },
      { id: 13, gender: "M", ageGroup: "mayor",   scores: [2, 3, 3, 4, 2], percentage: 56 },
      { id: 14, gender: "M", ageGroup: "joven",   scores: [1, 1, 3, 1, 2], percentage: 32 },
      { id: 15, gender: "F", ageGroup: "mayor",   scores: [5, 5, 4, 4, 5], percentage: 92 },
      { id: 16, gender: "M", ageGroup: "joven",   scores: [5, 4, 4, 5, 5], percentage: 92 },
      { id: 17, gender: "F", ageGroup: "mayor",   scores: [4, 4, 3, 5, 5], percentage: 84 },
      { id: 18, gender: "F", ageGroup: "joven",   scores: [5, 5, 3, 3, 5], percentage: 84 },
      { id: 19, gender: "M", ageGroup: "mayor",   scores: [4, 3, 5, 3, 4], percentage: 76 },
      { id: 20, gender: "F", ageGroup: "mayor",   scores: [5, 5, 5, 5, 5], percentage: 100 },
      { id: 21, gender: "F", ageGroup: "mayor",   scores: [4, 5, 4, 5, 5], percentage: 92 },
      { id: 22, gender: "M", ageGroup: "joven",   scores: [5, 3, 4, 5, 3], percentage: 80 },
      { id: 23, gender: "F", ageGroup: "mayor",   scores: [5, 5, 3, 4, 3], percentage: 80 },
    ],
    demographicBreakdowns: [
      { label: "Jóvenes (18–30)",       average: 74.5,  count: 8 },
      { label: "Mediana edad (31–50)",  average: 92.0,  count: 1 },
      { label: "Mayores (51–99)",       average: 78.86, count: 14 },
    ],
  },
};

// ---------- Colegio Madrid - FSM (Fundación Santa María) ----------
export const colegioMadridFsmData: LocationDetailData = {
  summary: "—",
  stats: {
    surface:        { key: "surface",        label: "Superficie del recinto", value: "12400", unit: "m²" },
    temperature:    { key: "temperature",    label: "Temperatura exterior",   value: "—", unit: "°C" },
    humidity:       { key: "humidity",       label: "Humedad exterior",       value: "—", unit: "%"  },
    airQuality:     { key: "airQuality",     label: "Calidad del aire",       value: "—", unit: "ICA"},
    solarRadiation: { key: "solarRadiation", label: "Radiación solar",        value: "—", unit: "W/m²"},
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
