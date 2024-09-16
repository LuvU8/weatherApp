import { CityState } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCityNameFromBrowser from "../../api/location/route";

export const fetchCityFromBrowser = createAsyncThunk("city/fetchCityFromBrowser", async () => {
  const response = await getCityNameFromBrowser();
  return response;
});

const initialState: CityState = {
  cityName: "",
  latitude: 0,
  longitude: 0,
  loading: false,
  error: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityFromBrowser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityFromBrowser.fulfilled, (state, action) => {
        state.loading = false;
        state.cityName = action.payload.cityName;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
      })
      .addCase(fetchCityFromBrowser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке данных о городе";
      });
  },
});

// Экспортируем редьюсер и слайс
export const { reducer: cityReducer } = citySlice;
export default cityReducer;
