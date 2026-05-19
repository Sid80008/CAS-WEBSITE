"use client";

import React from "react";
import { motion } from "framer-motion";
import PublicLayout from "@/components/layout/PublicLayout";
import Animate from "@/components/Animate";
import { Eye, Target, ShieldCheck, Flame } from "lucide-react";
import {
  fadeUp, fadeLeft, fadeRight, fadeIn,
  staggerContainer, staggerFast, EASE, VIEWPORT,
} from "@/lib/animations";

export default function VisionMission() {
  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            Our DNA
          </motion.span>

          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
          >
            Vision, Mission &amp; Core Values
          </motion.h1>

          <motion.p
            className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            &ldquo;Defining the path towards a brighter future through purposeful education and unwavering values.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ── Vision & Mission Cards ── */}
      <section className="py-24 px-6">
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
            className="p-12 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group"
            whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.10)", borderColor: "#1B4F8A" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="h-20 w-20 rounded-3xl bg-school-blue-light text-school-blue flex items-center justify-center mb-8 shadow-lg shadow-school-blue/10"
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ duration: 0.3 }}
            >
              <Eye className="h-10 w-10" />
            </motion.div>
            <h2 className="text-4xl font-bold text-school-blue mb-6">Our Vision</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              To be a premier institution of global repute, fostering an environment where innovation meets tradition,
              and where every learner is empowered to reach their zenith of potential through holistic and value-based education.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={fadeRight}
            className="p-12 rounded-[2rem] bg-school-blue text-white shadow-xl shadow-school-blue/30 flex flex-col items-center text-center"
            whileHover={{ y: -6, boxShadow: "0 28px 56px rgba(27,79,138,0.35)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mb-8 border border-white/20"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Target className="h-10 w-10" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-white/90 leading-relaxed">
              To provide a nurturing and inclusive learning community that inspires academic rigour, develops critical thinking,
              and cultivates compassionate citizens who are prepared to contribute positively to the ever-evolving global society.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Animate tag="div" className="text-center mb-20">
            <h2 className="text-4xl font-bold text-school-blue tracking-tight">Our Core Values</h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto">
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
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center border-b-8 border-b-transparent"
      whileHover={{
        y: -6,
        borderBottomColor: "#BA7517",
        boxShadow: "0 20px 40px rgba(0,0,0,0.09)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="h-14 w-14 rounded-2xl bg-slate-50 text-school-blue flex items-center justify-center mb-6 shadow-sm"
        whileHover={{ backgroundColor: "#1B4F8A", color: "white", scale: 1.08 }}
        transition={{ duration: 0.25 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-xl font-bold text-school-blue mb-4 leading-tight">{title}</h4>
      <p className="text-sm text-text-tertiary leading-relaxed">{desc}</p>
    </motion.div>
  );
}
