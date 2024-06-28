import axiosInstance from "../config/httpClient";

export const userLoginAPI = async (data: any) => {
  const path = "v1/auth/login";

  const response = await axiosInstance.post(path, data);
  return response.data;
};

export const userSignupAPI = async (data: any) => {
  const path = "v1/auth/signup";

  const response = await axiosInstance.post(path, data);
  return response.data;
};
