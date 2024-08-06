import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: {
    cityName: "",
  },
  reducers: {
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
  },
});

export const { setCityName } = citySlice.actions;
export default citySlice.reducer;
