import { AuthResponse } from "./authUser.interface";

export interface AuthSliceInitState {
  authUser: AuthResponse;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isError: boolean;
}
