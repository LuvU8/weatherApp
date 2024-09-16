export interface CurrentWeatherData {
  temperature: string | null;
  maxTemperature: string | null;
  minTemperature: string | null;
}

export interface HourlyWeatherData {
  time: string[];
  temperature: number[];
}

export type DailyWeatherData = {
  time: string;
  temperature: string;
  humidity: string;
  apparent_temperature: string;
  is_day: number;
  weather_code: number;
  pressure: string;
  wind_speed: string;
};

export interface WeatherState {
  current: CurrentWeatherData | null;
  hourly: HourlyWeatherData | null;
  loading: boolean;
  error: string | null;
}
