/**
 * Open-Meteo Weather Utility for Srinagar, Kashmir (34.0837° N, 74.7973° E)
 * Zero-auth public meteorological API with client-side caching.
 */

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  isDay: boolean;
  description: string;
  icon: string;
  updatedAt: string;
}

const SRINAGAR_LAT = 34.0837;
const SRINAGAR_LON = 74.7973;
const CACHE_KEY = 'sl_weather_data';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function getWeatherCondition(
  code: number,
  isDay: boolean
): { description: string; icon: string } {
  switch (code) {
    case 0:
      return isDay
        ? { description: 'Clear Sky', icon: 'ph:sun-bold' }
        : { description: 'Clear Night', icon: 'ph:moon-stars-bold' };
    case 1:
    case 2:
      return isDay
        ? { description: 'Partly Cloudy', icon: 'ph:cloud-sun-bold' }
        : { description: 'Partly Cloudy', icon: 'ph:cloud-moon-bold' };
    case 3:
      return { description: 'Overcast', icon: 'ph:cloud-bold' };
    case 45:
    case 48:
      return { description: 'Foggy / Mist', icon: 'ph:cloud-fog-bold' };
    case 51:
    case 53:
    case 55:
      return { description: 'Drizzle', icon: 'ph:cloud-drizzle-bold' };
    case 61:
    case 63:
    case 65:
      return { description: 'Rain', icon: 'ph:cloud-rain-bold' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { description: 'Snow', icon: 'ph:snowflake-bold' };
    case 80:
    case 81:
    case 82:
      return { description: 'Rain Showers', icon: 'ph:cloud-rain-bold' };
    case 85:
    case 86:
      return { description: 'Snow Showers', icon: 'ph:snowflake-bold' };
    case 95:
    case 96:
    case 99:
      return { description: 'Thunderstorm', icon: 'ph:cloud-lightning-bold' };
    default:
      return isDay
        ? { description: 'Clear', icon: 'ph:sun-bold' }
        : { description: 'Clear', icon: 'ph:moon-bold' };
  }
}

export async function fetchLiveWeather(): Promise<WeatherData | null> {
  // Check browser cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - new Date(parsed.timestamp).getTime();
        if (age < CACHE_TTL_MS) {
          return parsed.data;
        }
      }
    } catch {
      // Storage unavailable, proceed with fetch
    }
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${SRINAGAR_LAT}&longitude=${SRINAGAR_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m`;
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    const current = data.current;
    if (!current) return null;

    const isDay = Boolean(current.is_day);
    const { description, icon } = getWeatherCondition(current.weather_code, isDay);

    const weatherData: WeatherData = {
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      isDay,
      description,
      icon,
      updatedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: new Date().toISOString(), data: weatherData })
        );
      } catch {
        // Storage full or unavailable
      }
    }

    return weatherData;
  } catch {
    return null;
  }
}
