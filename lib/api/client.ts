import axios, { AxiosError } from "axios";
import { clearAccessToken, getAccessToken } from "@/lib/api/tokenStorage";
import type { ApiErrorResponse } from "@/lib/api/types";

// Unified internal API URL
const baseURL = "/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  
  // Only add Auth header if we have a token (for legacy JWT support)
  // NextAuth uses cookies automatically via withCredentials: true
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // If we get a 401, it might be an expired legacy token
    if (error.response?.status === 401) {
      clearAccessToken();
    }

    const message =
      error.response?.data?.message ??
      (typeof error.response?.data?.error === "string" ? error.response?.data?.error : undefined) ??
      error.message ??
      "Unexpected API error";

    return Promise.reject(new Error(message));
  },
);
