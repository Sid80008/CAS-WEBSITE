import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Portal Login",
  description: "Staff and admin portal login for Central Academy Senior Secondary School, antah.",
};

function LoginSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <div className="mx-auto h-12 w-12 bg-gray-200 rounded-2xl animate-pulse mb-6" />
        <div className="h-8 bg-gray-200 rounded-xl animate-pulse mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-8 mx-8" />
        <div className="h-12 bg-gray-200 rounded-xl animate-pulse mb-3" />
        <div className="h-12 bg-gray-200 rounded-xl animate-pulse mb-6" />
        <div className="h-12 bg-gray-300 rounded-xl animate-pulse" />
        <div className="flex items-center justify-center mt-4 gap-2 text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading portal…</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
