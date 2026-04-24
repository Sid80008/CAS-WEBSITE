"use client";

import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import type { LoginPayload, User } from "@/lib/api/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isInitializing = status === "loading";
  const isAuthenticated = status === "authenticated";

  const user = useMemo(() => {
    if (!session?.user) return null;
    return {
      id: session.user.id,
      email: session.user.email,
      roles: (session.user as any).roles || [],
      permissions: (session.user as any).permissions || [],
    } as any; // Cast to User if needed
  }, [session]);

  const login = useCallback(async (credentials: LoginPayload) => {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
    
    router.replace("/admin");
  }, [router]);

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/login" });
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      isInitializing,
      login,
      logout,
      error: null,
    }),
    [user, isAuthenticated, isInitializing, login, logout],
  );

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
