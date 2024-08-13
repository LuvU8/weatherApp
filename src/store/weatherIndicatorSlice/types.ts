export interface WeatherState {
  temperature: number | null;
  relativeHumidity: number | null;
  precipitation: number | null;
  loading: boolean;
  error: string | null;
}
