import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusState } from "./types";

const initialStatusState: StatusState = {
  loading: false,
  error: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState: initialStatusState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, resetStatus } = statusSlice.actions;
export default statusSlice.reducer;
