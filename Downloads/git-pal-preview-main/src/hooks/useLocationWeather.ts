import { useQuery } from "@tanstack/react-query";

export interface TempPoint {
  day: string;
  value: number;
}

export interface AqPoint {
  range: string;
  count: number;
}

export interface LiveWeather {
  temperature: number;
  humidity: number;
  aqi: number;
  precipitation: number;
  solarRadiation: number;
  tempHistory: TempPoint[];
  aqHistory: AqPoint[];
  updatedAt: Date;
}

const DAY_SHORT = ["D", "L", "M", "X", "J", "V", "S"] as const;

const AQ_RANGES = [
  { range: "0–50",    min: 0,   max: 50   },
  { range: "51–100",  min: 51,  max: 100  },
  { range: "101–150", min: 101, max: 150  },
  { range: ">150",    min: 151, max: Infinity },
];

async function fetchLiveWeather(lat: number, lon: number): Promise<LiveWeather> {
  const tz = "Europe%2FMadrid";
  const base = lat.toFixed(4) + "&longitude=" + lon.toFixed(4);

  const [wRes, aqRes] = await Promise.all([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${base}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,shortwave_radiation` +
      `&daily=temperature_2m_max,temperature_2m_min` +
      `&past_days=6&forecast_days=1&timezone=${tz}`
    ),
    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${base}` +
      `&current=european_aqi&hourly=european_aqi` +
      `&past_days=7&forecast_days=0&timezone=${tz}`
    ),
  ]);

  if (!wRes.ok) throw new Error(`Weather API ${wRes.status}`);
  if (!aqRes.ok) throw new Error(`Air quality API ${aqRes.status}`);

  const [w, aq] = await Promise.all([wRes.json(), aqRes.json()]);

  const tempHistory: TempPoint[] = (w.daily.time as string[]).map(
    (d: string, i: number) => ({
      day: DAY_SHORT[new Date(d + "T12:00:00").getDay()],
      value: +(
        (w.daily.temperature_2m_max[i] + w.daily.temperature_2m_min[i]) / 2
      ).toFixed(1),
    })
  );

  const hourlyAqi: number[] = (
    aq.hourly.european_aqi as (number | null)[]
  ).filter((v): v is number => v !== null);

  const aqHistory: AqPoint[] = AQ_RANGES.map(({ range, min, max }) => ({
    range,
    count: hourlyAqi.filter((v) => v >= min && v <= max).length,
  }));

  return {
    temperature:    w.current.temperature_2m,
    humidity:       w.current.relative_humidity_2m,
    aqi:            aq.current.european_aqi,
    precipitation:  w.current.precipitation,
    solarRadiation: w.current.shortwave_radiation,
    tempHistory,
    aqHistory,
    updatedAt: new Date(),
  };
}

export function useLocationWeather(lat: number, lon: number) {
  return useQuery<LiveWeather>({
    queryKey: ["weather", lat.toFixed(4), lon.toFixed(4)],
    queryFn: () => fetchLiveWeather(lat, lon),
    staleTime: 1000 * 60 * 30,
    gcTime:    1000 * 60 * 60,
    retry: 2,
  });
}
