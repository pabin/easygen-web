import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginAPI } from "../api/authAPI";
import { setClient } from "./httpSlice";
import { LoginData } from "../shared/interfaces/auth/login.interface";
import { AuthSliceInitState } from "../shared/interfaces/auth/authslice.interface";
import { AuthResponse } from "../shared/interfaces/auth/authUser.interface";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (payload: LoginData, { dispatch, rejectWithValue }) => {
    try {
      const authUser = await userLoginAPI(payload);
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
  },
});

// export const { setAuthUser, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
