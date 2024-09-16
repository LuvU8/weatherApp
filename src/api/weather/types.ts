export interface CurrentWeatherData {
  temperature: string | null;
  maxTemperature: string | null;
  minTemperature: string | null;
}

export interface CurrentWeatherUnits {
  temperature: string | "°C";
  maxTemperature: string | "°C";
  minTemperature: string | "°C";
}

export interface HourlyWeatherData {
  time: string[];
  temperature: number[];
}

export interface HourlyWeatherUnits {
  time: string | "seconds";
  temperature: string | "°C";
}

export type DailyWeatherData = {
  time: string[];
  temperature: number[];
  maxTemperature: number[];
  minTemperature: number[];
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
