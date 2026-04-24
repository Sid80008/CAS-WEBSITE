import axios, { AxiosError } from "axios";
import { clearAccessToken, getAccessToken } from "@/lib/api/tokenStorage";
import type { ApiErrorResponse } from "@/lib/api/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4001/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  const isInternalRequest = config.url?.startsWith("/") || config.url?.startsWith(baseURL);

  if (token && isInternalRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      clearAccessToken();
    }

    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "Unexpected API error";

    return Promise.reject(new Error(message));
  },
);
