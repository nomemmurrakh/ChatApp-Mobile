import { AxiosResponse } from "axios";
import axios from "./axios";

export namespace API {
  export interface LoginRequest {
    phoneNumber: string;
    password: string;
  }
  export interface Credentials extends LoginRequest {}
  export interface LoginResponse {
    token: string;
    user: User;
  }
  export interface User {
    id: string;
    phoneNumber: string;
    name: string;
    createdAt: string;
    lastSeen: string;
  }
}

export const authService = {
  async verifyToken() {
    return awaitApi(() => axios.get<API.User>("/auth/me"));
  },

  async login(credentials: API.Credentials) {
    return awaitApi(() =>
      axios.post<API.LoginResponse>("/auth/login", credentials)
    );
  },
};

async function awaitApi<T>(
  producer: () => Promise<AxiosResponse<T, any, any>>
) {
  return (await producer()).data;
}
