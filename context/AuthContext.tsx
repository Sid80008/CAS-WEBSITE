"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken } from "@/lib/api/tokenStorage";
import { login as loginRequest, logout as clearSession, getMe } from "@/lib/api/auth";
import type { LoginPayload, User } from "@/lib/api/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = useMemo(() => {
    const publicRoutes = ["/login", "/public"];
    return publicRoutes.some((route) => pathname.startsWith(route));
  }, [pathname]);

  const initAuth = useCallback(async () => {
    const storedToken = getAccessToken();
    if (storedToken) {
      setToken(storedToken);
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        console.error("Failed to restore session:", err);
        clearSession();
        setToken(null);
        setUser(null);
      }
    }
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (isInitializing) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    } else if (isAuthenticated && pathname === "/login") {
      router.replace("/admin");
    }
  }, [isInitializing, isAuthenticated, isPublicRoute, pathname, router]);

  const login = useCallback(async (credentials: LoginPayload) => {
    setError(null);
    try {
      const response = await loginRequest(credentials);
      setToken(response.token);
      setUser(response.user);
      router.replace("/admin");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to login";
      setError(message);
      throw err;
    }
  }, [router]);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
    setError(null);
    router.replace("/login");
  }, [router]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated,
      isInitializing,
      login,
      logout,
      error,
    }),
    [user, token, isAuthenticated, isInitializing, login, logout, error],
  );

  // Prevent flash of protected content while initializing or redirecting
  if (isInitializing || (!isAuthenticated && !isPublicRoute)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
