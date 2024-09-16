import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherState } from "./types";
import { fetchWeather } from "../../api/weather/route";

const initialState: WeatherState = {
  current: null,
  hourly: null,
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const data = await fetchWeather(latitude, longitude);
    if (!data || !data.currentDayIndicators || !data.hourlyWeather) {
      throw new Error("Некорректные данные");
    }
    console.log(data);
    return data;
  },
);

const weatherIndicatorSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.current = action.payload.currentDayIndicators;
        state.hourly = action.payload.hourlyWeather;
        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки погоды";
      });
  },
});

export default weatherIndicatorSlice.reducer;
