import { getAuthToken } from "@/storage/authStorage";
import { ApiError } from "@/utils/ApiError";
import internalAxios from "axios";
import {
  errorLogger,
  requestLogger,
  responseLogger,
  setGlobalConfig,
} from "axios-logger";
import { inRange } from "lodash";

setGlobalConfig({
  prefixText: false,
});

const axios = internalAxios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.request.use(requestLogger);
axios.interceptors.response.use(responseLogger, errorLogger);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      internalAxios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      typeof error.response.data === "object"
    ) {
      const { status } = error.response;
      if (inRange(status, 400, 501)) {
        const { message, status } = error.response.data;
        throw new ApiError(message, status);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
