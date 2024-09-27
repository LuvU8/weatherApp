import axios from "axios";
import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from "./types";
import { roundValue } from "../../../utils/numbers";
import { format } from "date-fns/fp/format";
import { ensureUtcOffset, DateFormat } from "../../../utils/time";

const API_URL = process.env.REACT_APP_WEATHER_API_URL;
console.log(process.env);

if (!API_URL) {
  throw new Error("Weather API URL is not defined");
}

export const fetchWeather = async (
  latitude: number,
  longitude: number,
  params = {
    timezone: "GMT",
    current: ["temperature_2m", "weather_code", "is_day"],
    hourly: ["temperature_2m", "relative_humidity_2m", "weather_code"],
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  },
) => {
  try {
    const response = await axios.get(API_URL, { params: { latitude, longitude, ...params } });
    const data = response.data;

    if (!data || !data.current || !data.hourly || !data.daily) {
      throw new Error("Incomplete data received from the weather API");
    }

    const current = data.current;
    const hourly = data.hourly;
    const daily = data.daily;

    const currentDayIndicators: CurrentWeatherData = {
      temperature: `${roundValue(current.temperature_2m) ?? null} ${data.current_units.temperature_2m}`,
      maxTemperature: `${roundValue(daily.temperature_2m_max[0]) ?? null} ${data.daily_units.temperature_2m_max}`,
      minTemperature: `${roundValue(daily.temperature_2m_min[0]) ?? null} ${data.daily_units.temperature_2m_min}`,
      weatherCode: current.weather_code,
      isDay: current.is_day,
    };

    const hourlyWeather: HourlyWeatherData = {
      time: hourly.time.map((t: string) => format(DateFormat.HourMinute, new Date(ensureUtcOffset(t)))),
      temperature: hourly.temperature_2m ?? [],
      weatherCode: hourly.weather_code ?? [],
    };

    const dailyWeather: DailyWeatherData = {
      time: daily.time.map((t: string) => format(DateFormat.DayMonth, new Date(ensureUtcOffset(t)))),
      maxTemperature: daily.temperature_2m_max ?? [],
      minTemperature: daily.temperature_2m_min ?? [],
      weatherCode: daily.weather_code ?? [],
    };

    console.log(currentDayIndicators, hourlyWeather);
    return { currentDayIndicators, hourlyWeather, dailyWeather };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch weather data: ${error.response?.status} - ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    } else {
      throw new Error("Failed to fetch weather data: An unknown error occurred.");
    }
  }
};
