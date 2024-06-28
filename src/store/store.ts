import { configureStore } from "@reduxjs/toolkit";

import httpReducer from "./httpSlice";

export const reducers = {
  http: httpReducer,
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
