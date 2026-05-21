"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Users, ArrowRight, BookOpen, BarChart2, Calendar, Bell } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-school-blue via-school-blue-dark to-[#071e3d] flex flex-col items-center justify-center px-6 py-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Logo + heading */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="CAS Logo" className="h-14 w-14 object-contain group-hover:scale-105 transition-transform" />
          <div className="text-left">
            <p className="text-white font-extrabold text-xl leading-tight">Central Academy</p>
            <p className="text-white/60 text-xs tracking-widest uppercase">Anta Campus</p>
          </div>
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Choose Your Portal
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto">
          Select your role to access your personalised dashboard.
        </p>
      </motion.div>

      {/* Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl relative z-10">
        {/* Student Portal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
        >
          <a
            href="/portal/login"
            className="group block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] transition-all duration-300 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-school-amber/20 flex items-center justify-center mb-6 group-hover:bg-school-amber/30 transition-colors">
              <GraduationCap className="h-8 w-8 text-school-amber" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Student Portal</h2>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              View your timetable, marks, homework, attendance, and upcoming tests.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Timetable", "Academics", "Homework", "Attendance"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs font-medium flex items-center gap-1"
                >
                  <BookOpen className="h-3 w-3" /> {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-school-amber font-bold text-sm group-hover:gap-3 transition-all">
              Enter Student Portal <ArrowRight className="h-4 w-4" />
            </div>
          </a>
        </motion.div>

        {/* Parent Portal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
        >
          <a
            href="/portal/login"
            className="group block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] transition-all duration-300 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-400/20 flex items-center justify-center mb-6 group-hover:bg-emerald-400/30 transition-colors">
              <Users className="h-8 w-8 text-emerald-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Parent Portal</h2>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Monitor your child's performance, fee dues, teacher remarks, and upcoming events.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Performance", "Fee Portal", "Events", "Circulars"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs font-medium flex items-center gap-1"
                >
                  {tag === "Performance" ? <BarChart2 className="h-3 w-3" /> : tag === "Events" ? <Calendar className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm group-hover:gap-3 transition-all">
              Enter Parent Portal <ArrowRight className="h-4 w-4" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Admin link */}
      <motion.div
        className="mt-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.5 }}
      >
        <Link
          href="/admin/login"
          className="text-white/40 hover:text-white/70 text-sm transition-colors flex items-center gap-2"
        >
          Staff / Admin Login →
        </Link>
      </motion.div>
    </main>
  );
}
