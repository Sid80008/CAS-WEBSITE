"use client";

import React from "react";
import { motion } from "framer-motion";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import Animate from "@/components/Animate";
import { Eye, Target, ShieldCheck, Flame } from "lucide-react";
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, staggerFast, EASE, VIEWPORT,
} from "@/lib/animations";

export function VisionMissionContent() {
  return (
    <PublicLayout>
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Vision, Mission & Core Values"
        titleHi="दृष्टिकोण, लक्ष्य और मूल मूल्य"
        eyebrowEn="Our DNA"
        eyebrowHi="हमारा डीएनए"
        imageSrc="/gallery/slider/1741166362_slider-17.jpg"
      />

      {/* ── Vision & Mission Cards ── */}
      <section className="py-24 px-6 bg-[#FAFAF5]">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Vision */}
          <motion.div
            variants={fadeLeft}
            className="p-12 rounded-[2.5rem] bg-white border border-slate-200/60 shadow-xl shadow-slate-100/50 flex flex-col items-center text-center group"
            whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.06)", borderColor: "var(--school-saffron)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="h-20 w-20 rounded-3xl bg-school-saffron-ghost text-school-saffron flex items-center justify-center mb-8 shadow-lg shadow-school-saffron/10"
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ duration: 0.3 }}
            >
              <Eye className="h-10 w-10" />
            </motion.div>
            <h2 className="text-4xl font-black text-school-navy mb-6 font-display">Our Vision</h2>
            <p className="text-lg text-text-secondary leading-relaxed font-sans">
              To be a premier institution of global repute, fostering an environment where innovation meets tradition,
              and where every learner is empowered to reach their zenith of potential through holistic and value-based education.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={fadeRight}
            className="p-12 rounded-[2.5rem] bg-school-navy text-white shadow-2xl shadow-school-navy/30 flex flex-col items-center text-center group"
            whileHover={{ y: -6, boxShadow: "0 28px 56px rgba(232,98,26,0.25)", borderColor: "var(--school-saffron)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-md text-school-saffron-light flex items-center justify-center mb-8 border border-white/20"
              whileHover={{ scale: 1.1, rotate: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Target className="h-10 w-10" />
            </motion.div>
            <h2 className="text-4xl font-black mb-6 font-display text-white">Our Mission</h2>
            <p className="text-lg text-white/90 leading-relaxed font-sans">
              To provide a nurturing and inclusive learning community that inspires academic rigour, develops critical thinking,
              and cultivates compassionate citizens who are prepared to contribute positively to the ever-evolving global society.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 px-6 bg-school-ink relative overflow-hidden">
        {/* Radial saffron glow in the background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,98,26,0.06)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-school-saffron/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Animate tag="div" className="text-center mb-20">
            <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">FOUNDATIONAL PILLARS</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-display">Our Core Values</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto font-sans">
              The foundational pillars that guide our every decision and action within the CAS community.
            </p>
          </Animate>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <ValueCard title="Academic Rigour" desc="Striving for the highest standards in teaching and learning."      icon={<Flame />}        />
            <ValueCard title="Integrity"        desc="Building trust through honesty, transparency and ethical conduct." icon={<ShieldCheck />}  />
            <ValueCard title="Global Mindset"   desc="Understanding and respecting diverse cultures and perspectives."  icon={<Eye />}          />
            <ValueCard title="Innovation"       desc="Embracing new ideas and creative problem-solving approaches."     icon={<Target />}       />
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

function ValueCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-school-navy/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 text-center flex flex-col items-center border-b-8 border-b-transparent transition-all duration-300"
      whileHover={{
        y: -6,
        borderBottomColor: "var(--school-saffron)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        backgroundColor: "rgba(0, 29, 58, 0.7)",
        borderColor: "rgba(232, 98, 26, 0.2)"
      }}
    >
      <motion.div
        className="h-14 w-14 rounded-2xl bg-white/5 text-school-saffron-light flex items-center justify-center mb-6 shadow-sm border border-white/10"
        whileHover={{ backgroundColor: "var(--school-saffron)", color: "white", scale: 1.08 }}
        transition={{ duration: 0.25 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-xl font-bold text-white mb-4 leading-tight font-display">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed font-sans">{desc}</p>
    </motion.div>
  );
}
