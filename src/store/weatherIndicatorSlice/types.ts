export interface WeatherState {
    temperature: number | null;
    relativeHumidity: number | null;
    loading: boolean;
    error: string | null;
  }