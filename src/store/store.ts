import { combineReducers, configureStore } from "@reduxjs/toolkit";
import weatherIndicatorReducer from "./weatherIndicatorSlice/weatherIndicatorSlice";
import statusReducer from "./statusSlice/statusSlice";
import cityReducer from "./locationSlice/locationSlice";

const rootReducer = combineReducers({
  status: statusReducer,
  weather: weatherIndicatorReducer,
  location: cityReducer,
  // Другие редьюсеры вашего приложения, если они есть
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
