import { fetchWeatherApi } from "openmeteo";
import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from "./types";
import { roundValue } from "../../utils/numbers";

const API_URL = "https://api.open-meteo.com/v1/forecast";

if (!API_URL) {
  throw new Error("Weather API URL is not defined");
}

export const fetchWeather = async (latitude: number, longitude: number) => {
  const params = {
    timezone: "GMT",
    latitude: latitude,
    longitude: longitude,
    forecast_hours: "12",
    temperature_unit: "celsius",
    wind_speed_unit: "ms",
    precipitation_unit: "mm",
    timeformat: "iso8601",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "apparent_temperature",
      "wind_speed_80m",
      "wind_direction_80m",
      "dew_point_2m",
      "visibility",
    ],
    hourly: ["temperature_2m", "relativehumidity_2m", "weather_code"],
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  };

  const responses = await fetchWeatherApi(API_URL, params);
  if (responses.length === 0) {
    throw new Error("No data received from the weather API");
  }

  const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();

  const currentDayIndicators: CurrentWeatherData = {
    temperature: `${roundValue(current?.variables(0)?.value()) ?? null}°C`,
    maxTemperature: `${roundValue(daily?.variables(0)?.valuesArray()?.[0]) ?? null}°C`,
    minTemperature: `${roundValue(daily?.variables(1)?.valuesArray()?.[0]) ?? null}°C`,
  };

  const hourlyWeather: HourlyWeatherData = {
    time: range(Number(hourly?.time() ?? 0), Number(hourly?.timeEnd() ?? 0), hourly?.interval() ?? 1).map(
      (t) => new Date((t + utcOffsetSeconds) * 1000).toISOString(), // Преобразование объекта Date в строку
    ),
    temperature: Array.from(hourly?.variables(0)?.valuesArray() || []) ?? [],
  };

  const dailyWeather: DailyWeatherData = {
    time: range(Number(daily?.time() ?? 0), Number(daily?.timeEnd() ?? 0), daily?.interval() ?? 1).map(
      (t) => new Date((t + utcOffsetSeconds) * 1000).toISOString(), // Преобразование объекта Date в строку
    ),
    temperature: Array.from(daily?.variables(0)?.valuesArray() || []) ?? [],
    maxTemperature: Array.from(daily?.variables(1)?.valuesArray() || []) ?? [],
    minTemperature: Array.from(daily?.variables(2)?.valuesArray() || []) ?? [],
  };
  console.log(currentDayIndicators, hourlyWeather);
  return { currentDayIndicators, hourlyWeather };
};
