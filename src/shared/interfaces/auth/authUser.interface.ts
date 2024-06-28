export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
