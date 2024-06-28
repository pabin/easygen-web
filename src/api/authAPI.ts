import axiosInstance from "../config/httpClient";
import { AuthResponse } from "../shared/interfaces/auth/authUser.interface";
import { LoginData } from "../shared/interfaces/auth/login.interface";
import { UserData } from "../shared/interfaces/auth/signup.interface";

export const userLoginAPI = async (data: LoginData): Promise<AuthResponse> => {
  const path = "v1/auth/login";

  const response = await axiosInstance.post(path, data);
  return response.data;
};

export const userSignupAPI = async (data: UserData): Promise<AuthResponse> => {
  const path = "v1/auth/signup";

  const response = await axiosInstance.post(path, data);
  return response.data;
};

export const refreshTokenAPI = async (): Promise<AuthResponse> => {
  const path = "v1/auth/refresh-token";

  const response = await axiosInstance.post(path);
  return response.data;
};
