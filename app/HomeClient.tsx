"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Bell, BookOpen, Beaker, Trophy, Laptop, Award } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { SCHOOL_STATS } from "@/lib/stats";
import { SCHOOL } from "@/lib/constants";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  fadeIn,
  staggerContainer,
  staggerFast,
  EASE,
  VIEWPORT,
} from "@/lib/animations";
import Animate from "@/components/Animate";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface HomeProps {
  notices: {
    id: string;
    titleEn: string;
    titleHi: string | null;
    isPinned: boolean;
    createdAt: Date;
  }[];
  toppers: {
    id: string;
    name: string;
    class: string;
    year: string | number;
    percentage: number;
    imageUrl: string | null;
  }[];
  studentCount: number;
}

/* ─────────────────────────────────────────────
   Counter hook — animates 0 → target
───────────────────────────────────────────── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─────────────────────────────────────────────
   Animated stat item
───────────────────────────────────────────── */
function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Extract numeric portion and suffix (e.g. "400+" → 400, "+")
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const count = useCounter(numeric, 2200, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="text-center px-4 border-r border-white/10 last:border-r-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      <div className="text-2xl md:text-3xl font-extrabold text-white leading-none">
        {numeric > 0 ? (visible ? count + suffix : "0" + suffix) : value}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1.5 font-semibold">
        {label}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Quick access card
───────────────────────────────────────────── */
const QUICK_LINKS = [
  { icon: "🔔", label: "Notices", labelHi: "सूचनाएं", href: "/notices", color: "from-[#1B5EAA] to-[#003D7A]" },
  { icon: "💰", label: "Fee Portal", labelHi: "फीस पोर्टल", href: "/portal", color: "from-[#0A4A3C] to-[#065030]" },
  { icon: "📋", label: "Admissions", labelHi: "प्रवेश", href: "/admissions", color: "from-[#E8621A] to-[#B84A0D]" },
  { icon: "🏆", label: "Results", labelHi: "परिणाम", href: "/academics/toppers", color: "from-[#001D3A] to-[#003D7A]" },
];

/* ─────────────────────────────────────────────
   Facility card — "Enter a World"
───────────────────────────────────────────── */
const FACILITIES = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    worldName: "Knowledge World",
    worldNameHi: "ज्ञान की दुनिया",
    title: "Library",
    desc: "10,000+ volumes and digital resources for curious minds.",
    /* PLACEHOLDER: Verify book count — see PLACEHOLDER_CONTENT.md #11 */
    img: "/gallery/students/1741166797-7.jpeg",
    href: "/facilities/library",
    accent: "#1B5EAA",
  },
  {
    icon: <Beaker className="h-5 w-5" />,
    worldName: "Discovery World",
    worldNameHi: "खोज की दुनिया",
    title: "Science Labs",
    desc: "Fully equipped Physics, Chemistry & Biology laboratories.",
    img: "/gallery/students/1741166831-10.jpeg",
    href: "/facilities/labs",
    accent: "#0A4A3C",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    worldName: "Achievement World",
    worldNameHi: "उपलब्धि की दुनिया",
    title: "Sports Complex",
    desc: "Outdoor courts, tracks, and fields for champions.",
    img: "/gallery/students/1741578116-4.jpg",
    href: "/facilities/sports",
    accent: "#E8621A",
  },
  {
    icon: <Laptop className="h-5 w-5" />,
    worldName: "Innovation World",
    worldNameHi: "नवाचार की दुनिया",
    title: "Smart Classrooms",
    desc: "Interactive smartboards and digital learning tools.",
    img: "/gallery/students/1741578082-2.jpg",
    href: "/facilities/smart-classrooms",
    accent: "#534AB7",
  },
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function HomeClient({ notices, toppers, studentCount }: HomeProps) {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax: hero bg moves slower than scroll
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -90]);

  // Live student count override
  const displayCount = studentCount > 400 ? studentCount : 400;

  return (
    <>
      {/* ══════════════════════════════════════════════
          SCENE 1 — THE OPENING SHOT
          Full-bleed hero, 3-layer depth, bottom-left text
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", maxHeight: "760px", minHeight: "520px" }}
      >
        {/* Layer 1 — Background photo with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.0, ease: EASE }}
        >
          <Image
            src="/gallery/slider/1741166362_slider-17.jpg"
            alt="Central Academy Senior Secondary School campus"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Layer 2 — Directional gradient (bottom-heavy, not flat overlay) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(4,13,26,0.97) 0%, rgba(4,13,26,0.72) 30%, rgba(4,13,26,0.3) 60%, rgba(4,13,26,0.05) 100%)",
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 40%, rgba(27,94,170,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Layer 3 — Content, bottom-left anchored */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-14 lg:px-20 pb-0">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          >
            <span className="block w-6 h-[2px] bg-school-saffron rounded-full" />
            <span
              className="text-[10px] font-black tracking-[0.22em] uppercase"
              style={{ color: "var(--school-saffron)" }}
            >
              Anta, Baran · Est. {SCHOOL.established} · RBSE Affiliated
            </span>
          </motion.div>

          {/* Main headline — Playfair-style weight with tight tracking */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-5 max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.72 }}
          >
            Where Every Child<br />
            Finds Their{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(135deg, #E8621A, #FF8C42)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Best Self.
            </em>
          </motion.h1>

          {/* Sub — PLACEHOLDER: see PLACEHOLDER_CONTENT.md #1 for real tagline */}
          <motion.p
            className="text-base md:text-lg text-white/60 mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.95 }}
          >
            {language === "hi"
              ? "अंता, बारां में उच्च गुणवत्तापूर्ण शिक्षा — कक्षा I से XII तक, RBSE से मान्यता प्राप्त।"
              : `Central Academy Senior Secondary School, Anta — ${SCHOOL.yearsOfExcellence}+ years of academic excellence in Baran, Rajasthan.`}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE, delay: 1.18 }}
          >
            <Link href="/admissions">
              <motion.button
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-black text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #E8621A, #FF8C42)",
                  letterSpacing: "0.02em",
                }}
                whileHover={{ scale: 1.04, y: -2, boxShadow: "0 14px 36px rgba(232,98,26,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {language === "hi" ? "प्रवेश लें" : "Apply for Admission"}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
            <Link href="/facilities">
              <motion.button
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white/90 border border-white/20"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
                whileHover={{
                  scale: 1.04,
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {language === "hi" ? "परिसर देखें" : "Explore Campus"}
              </motion.button>
            </Link>
          </motion.div>

          {/* ── Stat bar — anchored to hero bottom ── */}
          <motion.div
            className="grid grid-cols-4 border-t"
            style={{ borderColor: "rgba(255,255,255,0.07)", borderTopWidth: "1px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.4 }}
          >
            <AnimatedStat value={`${displayCount}+`} label={language === "hi" ? "विद्यार्थी" : "Students"} delay={0} />
            <AnimatedStat value={`${SCHOOL.yearsOfExcellence}`} label={language === "hi" ? "वर्षों का अनुभव" : "Years of Excellence"} delay={0.08} />
            <AnimatedStat value="37+" label={language === "hi" ? "योग्य शिक्षक" : "Qualified Teachers"} delay={0.16} />
            <AnimatedStat value="I–XII" label={language === "hi" ? "कक्षाएं" : "All Classes"} delay={0.24} />
          </motion.div>
          {/* Saffron accent line — THE signature */}
          <div
            className="w-full h-[3px]"
            style={{ background: "linear-gradient(90deg, #E8621A 0%, rgba(232,98,26,0.2) 100%)" }}
          />
        </div>
      </section>

      {/* Scrolling notice ticker */}
      {notices.length > 0 && (
        <div
          className="w-full overflow-hidden py-2.5"
          style={{ background: "var(--school-navy)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {[...notices, ...notices].map((notice, i) => (
              <Link
                key={`${notice.id}-${i}`}
                href="/notices"
                className="inline-flex items-center gap-3 text-xs font-semibold"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <Bell className="h-3 w-3 flex-shrink-0" style={{ color: "var(--school-saffron)" }} />
                <span>
                  {language === "hi" && notice.titleHi ? notice.titleHi : notice.titleEn}
                </span>
                <span
                  className="inline-block w-1 h-1 rounded-full mx-2 flex-shrink-0"
                  style={{ background: "var(--school-saffron)", opacity: 0.5 }}
                />
              </Link>
            ))}
          </motion.div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SCENE 2 — THE LOBBY
          Quick-access cards overlapping from hero
      ══════════════════════════════════════════════ */}
      <section
        className="relative z-10 px-4 md:px-8 lg:px-14"
        style={{ marginTop: "-1px", background: "var(--school-ink)", paddingTop: "48px", paddingBottom: "64px" }}
      >
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {QUICK_LINKS.map((ql) => (
            <motion.div key={ql.href} variants={fadeUp}>
              <Link href={ql.href} className="block h-full">
                <motion.div
                  className="relative h-28 md:h-32 rounded-xl overflow-hidden flex flex-col justify-end p-4 cursor-pointer"
                  style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`, border: "1px solid rgba(255,255,255,0.07)" }}
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(232,98,26,0.3)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                  }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="text-3xl mb-2 leading-none">{ql.icon}</div>
                  <div className="text-sm font-bold text-white leading-tight">
                    {language === "hi" ? ql.labelHi : ql.label}
                  </div>
                  <ArrowRight
                    className="absolute top-4 right-4 h-4 w-4"
                    style={{ color: "var(--school-saffron)", opacity: 0.7 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          SCENE 3 — THE TOPPERS REVEAL
          Editorial split: #1 large left, #2+#3 stacked right
          Background: saffron ghost tint
      ══════════════════════════════════════════════ */}
      {toppers.length > 0 && (
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--school-saffron-ghost)", padding: "80px 0" }}
        >
          {/* Oversized watermark text — editorial technique */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            style={{ zIndex: 0 }}
          >
            <span
              className="text-[15vw] font-black whitespace-nowrap"
              style={{
                color: "rgba(232,98,26,0.055)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              EXCELLENCE
            </span>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-14">
            {/* Section header */}
            <Animate tag="div" className="mb-10">
              <div
                className="flex items-center gap-3 mb-3"
              >
                <span className="block w-6 h-[2px] rounded-full" style={{ background: "var(--school-saffron)" }} />
                <span
                  className="text-[10px] font-black tracking-[0.18em] uppercase"
                  style={{ color: "var(--school-saffron-dark)" }}
                >
                  {language === "hi" ? "शैक्षणिक उत्कृष्टता" : "Academic Excellence"}
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-black tracking-tight"
                style={{ color: "var(--school-navy)", letterSpacing: "-0.03em" }}
              >
                {language === "hi" ? "हमारे सितारे" : "Our Brightest Stars"}
              </h2>
            </Animate>

            {/* Editorial split layout */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {/* #1 — Feature large */}
              {toppers[0] && (
                <motion.div
                  variants={fadeLeft}
                  className="md:col-span-7"
                >
                  <motion.div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      background: "var(--school-navy)",
                      border: "1px solid rgba(232,98,26,0.15)",
                    }}
                    whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(4,13,26,0.3)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Top saffron badge */}
                    <div
                      className="w-full py-2 text-center text-[10px] font-black tracking-[0.15em] uppercase text-white"
                      style={{ background: "linear-gradient(135deg, #E8621A, #FF8C42)" }}
                    >
                      {language === "hi" ? `कक्षा ${toppers[0].class} — ${toppers[0].year}` : `Class ${toppers[0].class} Topper · ${toppers[0].year}`}
                    </div>
                    <div className="p-7 flex gap-6 items-center">
                      {/* Rank */}
                      <div
                        className="text-7xl font-black leading-none flex-shrink-0 w-16 text-center"
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          background: "linear-gradient(135deg, #E8621A, #FF8C42)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        1
                      </div>
                      {/* Info */}
                      <div className="flex-1">
                        <div className="text-2xl font-black text-white leading-tight tracking-tight mb-1">
                          {toppers[0].name}
                        </div>
                        <div className="text-sm text-white/50 mb-4">
                          {language === "hi" ? `कक्षा ${toppers[0].class} · ${toppers[0].year}` : `Class ${toppers[0].class} · ${toppers[0].year}`}
                        </div>
                        {/* PLACEHOLDER: Real quote needed — see PLACEHOLDER_CONTENT.md #2 */}
                        <p className="text-sm text-white/40 italic leading-relaxed">
                          &ldquo;Grateful to my teachers and parents for their constant support and guidance.&rdquo;
                        </p>
                      </div>
                      {/* Percentage */}
                      <div className="flex-shrink-0 text-right">
                        <div
                          className="text-4xl font-black"
                          style={{
                            background: "linear-gradient(135deg, #E8621A, #FF8C42)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {toppers[0].percentage}%
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Score</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* #2 and #3 — stacked right */}
              <div className="md:col-span-5 flex flex-col gap-4">
                {toppers.slice(1, 3).map((topper, idx) => (
                  <motion.div
                    key={topper.id}
                    variants={fadeRight}
                    className="rounded-2xl overflow-hidden flex items-center gap-4 p-5"
                    style={{
                      background: "var(--school-navy)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    whileHover={{ y: -4, borderColor: "rgba(232,98,26,0.2)", boxShadow: "0 12px 32px rgba(4,13,26,0.3)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div
                      className="text-4xl font-black leading-none flex-shrink-0 w-10 text-center"
                      style={{
                        fontFamily: "Georgia, serif",
                        color: idx === 0 ? "rgba(192,192,192,0.8)" : "rgba(180,130,80,0.8)",
                      }}
                    >
                      {idx + 2}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-bold text-white truncate">{topper.name}</div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {language === "hi" ? `कक्षा ${topper.class}` : `Class ${topper.class}`} · {topper.year}
                      </div>
                    </div>
                    <div
                      className="text-2xl font-black flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "-0.02em" }}
                    >
                      {topper.percentage}%
                    </div>
                  </motion.div>
                ))}

                {/* View all link */}
                <motion.div variants={fadeUp}>
                  <Link
                    href="/academics/toppers"
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold w-full"
                    style={{
                      color: "var(--school-saffron-dark)",
                      background: "rgba(232,98,26,0.08)",
                      border: "1px solid rgba(232,98,26,0.18)",
                    }}
                  >
                    {language === "hi" ? "सभी उपलब्धियां देखें" : "View All Achievers"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          SCENE 4 — LATEST NOTICES
          Dark navy section — clean board
      ══════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 md:px-8 lg:px-14"
        style={{ background: "var(--school-navy)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-8"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="block w-6 h-[2px] rounded-full" style={{ background: "var(--school-saffron)" }} />
                <span className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: "var(--school-saffron)" }}>
                  {language === "hi" ? "अद्यतन" : "Live Updates"}
                </span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-black text-white tracking-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                {language === "hi" ? "नवीनतम सूचनाएं" : "Notice Board"}
              </h2>
            </div>
            <Link
              href="/notices"
              className="flex items-center gap-1.5 text-xs font-bold"
              style={{ color: "var(--school-saffron-light)" }}
            >
              {language === "hi" ? "सभी देखें" : "View All"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-col gap-2"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {notices.length > 0 ? (
              notices.map((notice, idx) => (
                <motion.div key={notice.id} variants={fadeUp}>
                  <Link href="/notices">
                    <motion.div
                      className="flex items-start gap-4 p-4 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${idx === 0 ? "rgba(232,98,26,0.2)" : "rgba(255,255,255,0.06)"}`,
                        borderLeft: `3px solid ${idx === 0 ? "var(--school-saffron)" : "rgba(255,255,255,0.1)"}`,
                      }}
                      whileHover={{ x: 4, borderLeftColor: "var(--school-saffron)", backgroundColor: "rgba(232,98,26,0.04)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="rounded-lg px-2 py-1.5 text-center flex-shrink-0 min-w-[46px]"
                        style={{ background: idx === 0 ? "rgba(232,98,26,0.12)" : "rgba(255,255,255,0.06)" }}
                      >
                        <span className="block text-lg font-black text-white leading-none">
                          {new Date(notice.createdAt).getDate()}
                        </span>
                        <span
                          className="block text-[9px] uppercase tracking-wider font-bold mt-0.5"
                          style={{ color: idx === 0 ? "var(--school-saffron)" : "rgba(255,255,255,0.4)" }}
                        >
                          {new Date(notice.createdAt).toLocaleString("en", { month: "short" })}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {notice.isPinned && (
                            <span
                              className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm"
                              style={{ background: "rgba(232,98,26,0.15)", color: "var(--school-saffron-light)" }}
                            >
                              Pinned
                            </span>
                          )}
                          {idx === 0 && !notice.isPinned && (
                            <span
                              className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm"
                              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                            >
                              New
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-white/85 leading-snug">
                          {language === "hi" && notice.titleHi ? notice.titleHi : notice.titleEn}
                        </h4>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-30"
                        style={{ color: "var(--school-saffron)" }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-white/30">
                {language === "hi" ? "कोई हालिया सूचना नहीं" : "No recent notices"}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCENE 5 — YOUR CHILD'S UNIVERSE
          Facilities as "worlds" — warm cream bg, breath after dark
      ══════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 md:px-8 lg:px-14"
        style={{ background: "var(--background-alt)" }}
      >
        <div className="max-w-6xl mx-auto">
          <Animate tag="div" className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-[2px] rounded-full" style={{ background: "var(--school-saffron)" }} />
              <span
                className="text-[10px] font-black tracking-[0.18em] uppercase"
                style={{ color: "var(--school-saffron-dark)" }}
              >
                {language === "hi" ? "सुविधाएं" : "Our Worlds"}
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black tracking-tight"
              style={{ color: "var(--school-navy)", letterSpacing: "-0.03em" }}
            >
              {language === "hi" ? "आपके बच्चे का ब्रह्मांड" : "Your Child's Universe"}
            </h2>
            <p className="text-base mt-3" style={{ color: "var(--text-secondary)", maxWidth: "500px" }}>
              {language === "hi"
                ? "हर सुविधा एक अलग दुनिया है — जहाँ हर बच्चा अपनी क्षमता खोजता है।"
                : "Every facility is a world unto itself — where each child discovers their potential."}
            </p>
          </Animate>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {FACILITIES.map((fac) => (
              <motion.div key={fac.href} variants={fadeUp}>
                <Link href={fac.href} className="block h-full">
                  <motion.div
                    className="group relative rounded-2xl overflow-hidden cursor-pointer"
                    style={{ height: "300px" }}
                    whileHover={{ y: -6, boxShadow: "0 24px 52px rgba(0,0,0,0.2)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Photo */}
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <Image
                        src={fac.img}
                        alt={fac.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Saffron hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${fac.accent}33, transparent)` }}
                    />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {/* World name — subtle */}
                      <div
                        className="text-[9px] font-black uppercase tracking-[0.16em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: "var(--school-saffron-light)" }}
                      >
                        {language === "hi" ? fac.worldNameHi : fac.worldName}
                      </div>
                      {/* Icon */}
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center mb-3 text-white"
                        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
                      >
                        {fac.icon}
                      </div>
                      <h3 className="text-lg font-black text-white leading-tight">{fac.title}</h3>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        {fac.desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View all facilities */}
          <motion.div
            className="mt-8 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <Link href="/facilities">
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
                style={{
                  color: "var(--school-navy)",
                  background: "rgba(0,29,58,0.06)",
                  border: "1px solid rgba(0,29,58,0.12)",
                }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(0,29,58,0.1)" }}
                transition={{ duration: 0.2 }}
              >
                {language === "hi" ? "सभी सुविधाएं" : "All Facilities"}
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCENE 6 — THE INVITATION
          Cinematic CTA — dark navy, saffron radial glow
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-24 px-4 md:px-8 lg:px-14"
        style={{ background: "var(--school-navy)" }}
      >
        {/* Saffron radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(232,98,26,0.14) 0%, transparent 60%), " +
              "radial-gradient(ellipse at 15% 50%, rgba(27,94,170,0.18) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {/* Text */}
            <motion.div variants={fadeLeft}>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-6 h-[2px] rounded-full" style={{ background: "var(--school-saffron)" }} />
                <span
                  className="text-[10px] font-black tracking-[0.18em] uppercase"
                  style={{ color: "var(--school-saffron)" }}
                >
                  {language === "hi" ? "हमारे परिवार से जुड़ें" : "Join Our Family"}
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-black text-white leading-tight mb-4"
                style={{ letterSpacing: "-0.03em" }}
              >
                {language === "hi" ? (
                  <>आपके बच्चे की कहानी<br /><em className="not-italic" style={{ background: "linear-gradient(135deg,#E8621A,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>यहाँ से शुरू होती है।</em></>
                ) : (
                  <>Your child&rsquo;s story<br />starts <em className="not-italic" style={{ background: "linear-gradient(135deg,#E8621A,#FF8C42)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>right here.</em></>
                )}
              </h2>
              <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "440px" }}>
                {language === "hi"
                  ? `${SCHOOL.yearsOfExcellence}+ वर्षों से अंता में उत्कृष्ट शिक्षा — RBSE मान्यता प्राप्त। 2026–27 सत्र के लिए प्रवेश प्रक्रिया अभी शुरू हो चुकी है।`
                  : `${SCHOOL.yearsOfExcellence}+ years of academic excellence in Anta, Baran. Admissions for 2026–27 are now open. Classes I to XII — RBSE affiliated.`}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/admissions">
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-black text-white"
                    style={{ background: "linear-gradient(135deg, #E8621A, #FF8C42)" }}
                    whileHover={{ scale: 1.04, y: -2, boxShadow: "0 14px 36px rgba(232,98,26,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                  >
                    {language === "hi" ? "अभी आवेदन करें" : "Apply for Admission"}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white/80 border border-white/15"
                    style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
                    whileHover={{ scale: 1.04, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                  >
                    {language === "hi" ? "संपर्क करें" : "Contact Us"}
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Contact info card */}
            <motion.div variants={fadeRight}>
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest">
                  {language === "hi" ? "संपर्क जानकारी" : "Reach Us"}
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4 items-start">
                    <span
                      className="text-lg flex-shrink-0 mt-0.5 w-8 text-center"
                    >📍</span>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "var(--school-saffron)" }}>
                        {language === "hi" ? "पता" : "Address"}
                      </div>
                      <span className="text-sm text-white/60 leading-relaxed">{SCHOOL.address}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="text-lg flex-shrink-0 mt-0.5 w-8 text-center">📞</span>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "var(--school-saffron)" }}>
                        {language === "hi" ? "फोन" : "Phone"}
                      </div>
                      <a
                        href={`tel:${SCHOOL.phone1}`}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {SCHOOL.phone1}
                      </a>
                      <span className="text-white/30 mx-2">·</span>
                      <a
                        href={`tel:${SCHOOL.phone2}`}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {SCHOOL.phone2}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="text-lg flex-shrink-0 mt-0.5 w-8 text-center">✉️</span>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "var(--school-saffron)" }}>
                        {language === "hi" ? "ईमेल" : "Email"}
                      </div>
                      <a
                        href={`mailto:${SCHOOL.email}`}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {SCHOOL.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
