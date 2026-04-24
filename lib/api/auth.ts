import { apiClient } from "@/lib/api/client";
import { setAccessToken, clearAccessToken, getAccessToken } from "@/lib/api/tokenStorage";
import type { LoginPayload, LoginResponse, User } from "@/lib/api/types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/login", payload);
  const { token } = response.data;
  setAccessToken(token);
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await apiClient.get<User>("/auth/me");
  return response.data;
}

export function logout(): void {
  clearAccessToken();
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
