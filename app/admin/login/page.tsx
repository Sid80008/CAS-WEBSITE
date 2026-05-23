"use client";
// app/admin/login/page.tsx
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please check your email and password.");
    } else {
      setSuccess(true);
      setTimeout(async () => {
        const session = await getSession();
        const roles = (session?.user as any)?.roles || [];
        if (roles.includes("ADMIN")) {
          window.location.href = "/admin";
        } else if (roles.includes("TEACHER")) {
          window.location.href = "/portal/teacher";
        } else if (roles.includes("OFFICE")) {
          window.location.href = "/portal/office";
        } else if (roles.includes("STUDENT")) {
          window.location.href = "/portal/student/dashboard";
        } else if (roles.includes("PARENT")) {
          window.location.href = "/portal/parent/dashboard";
        } else {
          window.location.href = result?.url || "/";
        }
      }, 600);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #00386b 0%, #071e3d 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#fdad4e]/10 blur-[150px]" />
      </div>

      <main className="relative z-10 w-full max-w-[480px]">
        {/* Card */}
        <div
          className="rounded-xl p-8 md:p-12 flex flex-col items-center"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 40px rgba(0,8,28,0.3)",
          }}
        >
          {/* Logo */}
          <div className="mb-8 p-3 rounded-full bg-[#f6f3f2] shadow-sm border border-[#c3c6d1]/30">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-primary mb-1">Central Academy</h1>
            <p className="text-base text-on-surface-variant font-medium">Admin Portal</p>
            <div className="h-1 w-12 bg-secondary-container mx-auto mt-4 rounded-full" />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="w-full mb-6 bg-error-container border border-error/30 rounded-lg px-4 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-error text-xl">error</span>
              <p className="text-sm text-error font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold text-primary uppercase tracking-wider block ml-1">
                Work Email
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@centralacademy.edu"
                  className="w-full pl-12 pr-4 py-4 bg-[#f6f3f2] border-0 border-b-2 border-[#c3c6d1] focus:border-primary focus:ring-0 rounded-t-lg text-sm text-on-surface transition-all placeholder:text-[#737780]/50 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-xs font-semibold text-primary uppercase tracking-wider block">
                  Password
                </label>
                <span className="text-xs text-secondary font-semibold cursor-pointer hover:underline">Forgot?</span>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">
                  lock
                </span>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-[#f6f3f2] border-0 border-b-2 border-[#c3c6d1] focus:border-primary focus:ring-0 rounded-t-lg text-sm text-on-surface transition-all placeholder:text-[#737780]/50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">{showPwd ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-5 h-5 rounded border-[#c3c6d1] text-primary focus:ring-primary/20"
              />
              <label htmlFor="remember" className="text-sm text-on-surface-variant cursor-pointer">
                Remember this device
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-secondary-container hover:bg-[#e89d3d] active:scale-[0.98] text-on-secondary-container font-bold py-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-80"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Authenticating…
                </>
              ) : success ? (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  Success! Redirecting…
                </>
              ) : (
                <>
                  <span className="text-xl font-bold">Sign In</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Footer links */}
          <footer className="mt-12 text-center">
            <p className="text-xs font-semibold text-outline uppercase tracking-widest">Authorized Access Only</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className="text-outline/40">•</span>
              <Link href="/" className="text-sm text-outline hover:text-primary transition-colors">← Back to website</Link>
              <span className="text-outline/40">•</span>
              <Link href="/portal/login" className="text-sm text-outline hover:text-primary transition-colors">Student Portal</Link>
              <span className="text-outline/40">•</span>
            </div>
          </footer>
        </div>

        {/* System status */}
        <div className="mt-8 text-center text-white/40 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-tighter">Central System Online</span>
        </div>
      </main>
    </div>
  );
}
