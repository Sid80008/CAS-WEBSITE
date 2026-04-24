"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Loader2, School } from "lucide-react";

export default function LoginPage() {
  const { login, error: authError, isAuthenticated, isInitializing } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    
    try {
      await login({ email, password });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid credentials. Please try again.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const errorMessage = formError || authError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-[100px] -z-10" />

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
        <div className="h-3 bg-indigo-600" />
        <CardHeader className="pt-10 pb-6 text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <School className="text-white h-7 w-7" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            Central Academy Anta - Admin Portal
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 animate-pulse">
                {errorMessage}
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <Input 
                  type="email" 
                  placeholder="admin@casanta.com"
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-indigo-500 rounded-xl transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-gray-700 font-medium">Password</Label>
                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-indigo-500 rounded-xl transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all hover:scale-[1.01] active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="pb-10 pt-4 text-center justify-center">
          <p className="text-sm text-gray-500">
            Technically Managed by <span className="text-indigo-600 font-semibold italic">Central Academy IT Cell</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
