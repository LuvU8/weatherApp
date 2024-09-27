import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { WeatherState } from "./types";
import { fetchWeather } from "../../shared/api/weather/weatherNew";

const initialState: WeatherState = {
  current: null,
  hourly: null,
  daily: null,
  loading: false,
  error: null,
  errorMessage: "",
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const data = await fetchWeather(latitude, longitude);
    if (!data || !data.currentDayIndicators || !data.hourlyWeather || !data.dailyWeather) {
      throw new Error("Некорректные данные");
    }
    return data;
  },
);

const weatherIndicatorSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = "";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.currentDayIndicators;
        state.hourly = action.payload.hourlyWeather;
        state.daily = action.payload.dailyWeather;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error; // Сохраняем ошибку
        state.errorMessage = action.error.message || "Ошибка загрузки данных"; // Кастомное сообщение
      });
  },
});

export const { clearError } = weatherIndicatorSlice.actions;

export default weatherIndicatorSlice.reducer;
