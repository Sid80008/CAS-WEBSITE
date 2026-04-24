import apiClient from "@/lib/api-client";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/api/tokenStorage";

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await apiClient.post("/auth/login", credentials);
    if (data?.token) {
      setAccessToken(data.token);
    }
    return data;
  },
  
  logout: () => {
    clearAccessToken();
    window.location.href = "/login";
  },
  
  getCurrentUser: async () => {
    const { data } = await apiClient.get("/users/me");
    return data;
  },
  
  isAuthenticated: () => {
    return Boolean(getAccessToken());
  }
};
