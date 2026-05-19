"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Megaphone,
  Award,
  Users as UsersIcon,
  BookOpen,
  Beaker,
  Trophy,
  Laptop
} from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import Animate from "@/components/Animate";
import { fadeUp, fadeLeft, fadeRight, fadeIn, staggerContainer, staggerFast, EASE, VIEWPORT } from "@/lib/animations";

/** Minimal hero data inlined — notices/toppers are loaded by a wrapper in a server component below */
interface HomeProps {
  notices: { id: string; titleEn: string; isPinned: boolean; createdAt: Date }[];
  toppers: { id: string; name: string; class: string; year: number; percentage: number; imageUrl: string | null }[];
  studentCount: number;
}

export default function HomeClient({ notices, toppers, studentCount }: HomeProps) {
  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[620px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <motion.img
          src="/gallery/slider/1741166362_slider-17.jpg"
          alt="Students on campus"
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <motion.span
            className="text-xs font-semibold text-school-blue-light mb-4 uppercase tracking-[0.2em] bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            Empowering Minds
          </motion.span>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            Excellence in Education Since 2013
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            Nurturing holistic development and academic brilliance in a secure, modern environment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
          >
            <Link href="/admissions">
              <motion.button
                className="bg-school-blue text-white px-8 py-4 rounded-lg font-semibold shadow-lg"
                whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 30px rgba(30,58,138,0.35)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                Apply for Admission
              </motion.button>
            </Link>
            <Link href="/facilities">
              <motion.button
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold shadow-lg"
                whileHover={{ scale: 1.04, y: -2, backgroundColor: "white", color: "#1B4F8A" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                Explore Campus
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Stats ──────────────────────────────────────── */}
      <section className="py-12 px-6 max-w-7xl mx-auto -mt-12 relative z-30">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Stat 1 */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 flex items-center gap-6"
            whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="h-16 w-16 rounded-full bg-school-blue-light flex items-center justify-center text-school-blue shrink-0">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-school-blue">12+ Years</h3>
              <p className="text-sm text-text-secondary">Of Academic Excellence</p>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 border-t-4 border-t-school-amber flex items-center gap-6"
            whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center text-school-amber shrink-0">
              <UsersIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-school-blue">{studentCount || 500}+</h3>
              <p className="text-sm text-text-secondary">Active Students Enrolled</p>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 flex items-center gap-6"
            whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Trophy className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-school-blue">100%</h3>
              <p className="text-sm text-text-secondary">Board Results Record</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Dynamic Content Grid ─────────────────────────────── */}
      <section className="py-16 bg-background-alt px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Latest Notices */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Animate variants={fadeLeft}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-school-blue flex items-center gap-2">
                  <Megaphone className="h-6 w-6 text-school-amber" />
                  Latest Notices
                </h2>
                <Link href="/notices" className="text-sm font-semibold text-school-blue hover:underline">View All</Link>
              </div>
            </Animate>

            <motion.div
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex flex-col gap-2"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {notices.length > 0 ? notices.map((notice, idx) => (
                <motion.div
                  key={notice.id}
                  variants={fadeUp}
                  className={`p-4 rounded-lg hover:bg-school-blue-light transition-colors cursor-pointer border-l-4 ${idx === 0 ? "border-school-amber bg-slate-50" : "border-transparent"}`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {idx === 0 && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase">New</span>}
                    {notice.isPinned && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">Important</span>}
                    <span className="text-[11px] text-text-tertiary">
                      {new Date(notice.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary line-clamp-2">{notice.titleEn}</h4>
                </motion.div>
              )) : (
                <motion.p variants={fadeUp} className="p-4 text-sm text-text-tertiary italic text-center">No recent notices</motion.p>
              )}
            </motion.div>
          </div>

          {/* Academic Achievers */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Animate variants={fadeRight}>
              <h2 className="text-2xl font-bold text-school-blue flex items-center gap-2 mb-2">
                <Award className="h-6 w-6 text-school-amber" />
                Academic Achievers
              </h2>
            </Animate>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {toppers.length > 0 ? toppers.map((topper) => (
                <motion.div
                  key={topper.id}
                  variants={fadeUp}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group"
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="h-32 bg-school-blue relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 bg-school-amber text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      ★ {topper.percentage}%
                    </span>
                  </div>
                  <div className="px-6 pb-6 relative">
                    <img
                      alt={topper.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-md absolute -top-10 left-6 object-cover bg-slate-200"
                      src={topper.imageUrl || "/gallery/students/1741166797-7.jpeg"}
                    />
                    <div className="pt-12">
                      <h4 className="text-xl font-bold text-text-primary">{topper.name}</h4>
                      <p className="text-sm text-text-secondary mb-3">Class {topper.class} - {topper.year}</p>
                      <p className="text-xs text-text-tertiary italic line-clamp-2">&ldquo;Excellence is not an act, but a habit. Grateful for the support from CAS faculty.&rdquo;</p>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <motion.p variants={fadeUp} className="col-span-2 text-center py-12 text-text-tertiary italic border border-dashed rounded-xl">
                  Awards records will be updated soon.
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Facilities Quick View ────────────────────────────── */}
      <section className="py-20 px-6 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-school-blue-light rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">

          <Animate tag="div" className="text-center mb-16">
            <motion.span
              className="text-xs font-bold text-school-blue tracking-[0.2em] uppercase mb-3 block"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              Infrastructure
            </motion.span>
            <h2 className="text-4xl font-bold text-text-primary">World-Class Facilities</h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              Providing a conducive environment for both academic rigour and extracurricular excellence.
            </p>
          </Animate>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <FacilityCard title="Digital Library"    desc="10,000+ volumes and digital resources."                icon={<BookOpen />} img="/gallery/students/1741166797-7.jpeg" />
            <FacilityCard title="Advanced Labs"      desc="Fully equipped Physics, Chemistry & Bio labs."        icon={<Beaker />}   img="/gallery/students/1741166831-10.jpeg" />
            <FacilityCard title="Sports Complex"     desc="Indoor courts and outdoor tracks."                    icon={<Trophy />}   img="/gallery/students/1741166412_slider-20.jpg" />
            <FacilityCard title="Smart Classes"      desc="Interactive panels and digital tools."                icon={<Laptop />}   img="/gallery/students/1741578082-2.jpg" />
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

function FacilityCard({ title, desc, icon, img }: { title: string; desc: string; icon: React.ReactNode; img: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative h-80 rounded-2xl overflow-hidden shadow-sm"
      whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.img
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        src={img}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <motion.div
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 border border-white/30"
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ duration: 0.25 }}
        >
          {icon}
        </motion.div>
        <h4 className="text-xl font-bold text-white mb-1 tracking-tight">{title}</h4>
        <p className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{desc}</p>
      </div>
    </motion.div>
  );
}
