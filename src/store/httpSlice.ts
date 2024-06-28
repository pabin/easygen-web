import { AxiosInstance } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/httpClient";
import { HttpClient } from "../shared/interfaces/httpClient/httpSlice.interface";

const initHttpClientWithToken = (token: string): AxiosInstance => {
  if (token) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = "Bearer " + token;
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }
  return axiosInstance;
};

const initialState: HttpClient = {
  client: axiosInstance,
  token: false,
};

export const httpSlice = createSlice({
  name: "httpSlice",
  initialState,

  reducers: {
    setClient: (state, action) => {
      state.client = initHttpClientWithToken(action.payload);
      state.token = true;
    },

    removeClient: () => initialState,
  },
});

export const { setClient, removeClient } = httpSlice.actions;

export default httpSlice.reducer;
