import { configureStore } from "@reduxjs/toolkit";

import httpReducer from "./httpSlice";
import authReducer from "./authSlice";

export const reducers = {
  http: httpReducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
