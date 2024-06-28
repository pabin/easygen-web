import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshTokenAPI, userLoginAPI, userSignupAPI } from "../api/authAPI";
import { setClient } from "./httpSlice";
import { LoginData } from "../shared/interfaces/auth/login.interface";
import { AuthSliceInitState } from "../shared/interfaces/auth/authslice.interface";
import { AuthResponse } from "../shared/interfaces/auth/authUser.interface";
import { UserData } from "../shared/interfaces/auth/signup.interface";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (payload: LoginData, { dispatch, rejectWithValue }) => {
    try {
      const authUser = await userLoginAPI(payload);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      dispatch(setClient(authUser.accessToken));
      return authUser;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

export const userSignup = createAsyncThunk(
  "auth/userSignup",
  async (payload: UserData, { dispatch, rejectWithValue }) => {
    try {
      const authUser = await userSignupAPI(payload);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      dispatch(setClient(authUser.accessToken));
      return authUser;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/userSignup",
  async (refreshToken: string, { dispatch, rejectWithValue }) => {
    try {
      const authUser = await refreshTokenAPI();
      authUser.refreshToken = refreshToken;
      localStorage.setItem("authUser", JSON.stringify(authUser));
      dispatch(setClient(authUser.accessToken));
      return authUser;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
    }
  }
);

const initialState: AuthSliceInitState = {
  authUser: {} as AuthResponse,
  isAuthenticated: false,
  isAuthenticating: false,
  isError: false,
};

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
    logout: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.authUser = action.payload || ({} as AuthResponse);
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isError = true;
      state.isAuthenticating = false;
    });

    builder.addCase(userSignup.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.authUser = action.payload || ({} as AuthResponse);
    });
    builder.addCase(userSignup.rejected, (state) => {
      state.isError = true;
      state.isAuthenticating = false;
    });
  },
});

export const { setAuthUser, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
