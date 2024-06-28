import { AxiosInstance } from "axios";

export interface HttpClient {
  client: AxiosInstance;
  token: boolean;
}
