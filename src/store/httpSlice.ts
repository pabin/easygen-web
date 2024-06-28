import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/httpClient";

const initHttpClientWithToken = (token: string): any => {
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

export interface HttpClient {
  client: any;
  token: boolean;
}

const initialState: HttpClient = {
  client: axios,
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
