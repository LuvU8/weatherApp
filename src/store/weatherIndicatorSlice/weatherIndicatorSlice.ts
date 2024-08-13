import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherState } from "./types";

const initialState: WeatherState = {
  temperature: null,
  relativeHumidity: null,
  precipitation: null,
  loading: false,
  error: null,
};

const weatherIndicatorSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<{ temperature: number; relativeHumidity: number }>) => {
      const { temperature, relativeHumidity } = action.payload;
      state.temperature = temperature;
      state.relativeHumidity = relativeHumidity;
    },
  },
});

export const { setWeatherData } = weatherIndicatorSlice.actions;

export default weatherIndicatorSlice.reducer;
