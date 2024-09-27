export interface CurrentWeatherData {
  temperature: string | null;
  maxTemperature: string | null;
  minTemperature: string | null;
  weatherCode: number;
  isDay: number;
}

export interface HourlyWeatherData {
  time: string[];
  temperature: number[];
  weatherCode: number[];
}

export type DailyWeatherData = {
  time: string[];
  maxTemperature: number[];
  minTemperature: number[];
  weatherCode: number[];
};

export interface WeatherState {
  current: CurrentWeatherData | null;
  hourly: HourlyWeatherData | null;
  daily: DailyWeatherData | null;
  loading: boolean;
  error: any;
  errorMessage: string | null;
}
