export interface CurrentWeatherData {
  temperature: string | null;
  maxTemperature: string | null;
  minTemperature: string | null;
  weatherCode: number;
  isDay: number;
}

export interface CurrentWeatherUnits {
  temperature: string | "°C";
  maxTemperature: string | "°C";
  minTemperature: string | "°C";
}

export interface HourlyWeatherData {
  time: string[];
  temperature: number[];
  weatherCode: number[];
}

export interface HourlyWeatherUnits {
  time: string | "seconds";
  temperature: string | "°C";
}

export type DailyWeatherData = {
  time: string[];
  maxTemperature: number[];
  minTemperature: number[];
  weatherCode: number[];
};

export type DailyWeatherUnits = {
  time: string;
  temperature: string;
  humidity: string;
  apparent_temperature: string;
  is_day: string;
  weather_code: string;
  pressure: string;
  wind_speed: string;
};

export interface WeatherApiResponse {
  hourly: HourlyWeatherData;
  hourly_units: HourlyWeatherUnits;
  current: CurrentWeatherData;
  current_units: CurrentWeatherUnits;
  daily: DailyWeatherData;
  daily_units: DailyWeatherUnits; // Убедитесь, что это поле добавлено
}
