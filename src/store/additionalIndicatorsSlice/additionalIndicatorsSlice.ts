import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdditionalWeatherState } from "./types";

const initialState: AdditionalWeatherState = {
  windSpeed: null,
  windDirection: null,
  humidity: null,
  visibility: null,
};

const additionalIndicatorsSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (
      state,
      action: PayloadAction<{
        windSpeed: number;
        windDirection: number;
        humidity: number;
        visibility: number;
      }>,
    ) => {
      const { windSpeed, windDirection, humidity, visibility } = action.payload;
      state.windSpeed = windSpeed;
      state.windDirection = windDirection;
      state.humidity = humidity;
      state.visibility = visibility;
    },
  },
});

export const { setWeatherData } = additionalIndicatorsSlice.actions;

export default additionalIndicatorsSlice.reducer;
