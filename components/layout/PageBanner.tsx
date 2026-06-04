"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { EASE } from "@/lib/animations";

interface PageBannerProps {
  titleEn: string;
  titleHi?: string;
  eyebrowEn: string;
  eyebrowHi?: string;
  imageSrc: string;
  heightClass?: string;
}

export function PageBanner({
  titleEn,
  titleHi,
  eyebrowEn,
  eyebrowHi,
  imageSrc,
  heightClass = "h-[320px] md:h-[400px] lg:h-[450px]"
}: PageBannerProps) {
  const { language } = useLanguage();

  const title = language === "hi" && titleHi ? titleHi : titleEn;
  const eyebrow = language === "hi" && eyebrowHi ? eyebrowHi : eyebrowEn;

  return (
    <section className={`relative w-full overflow-hidden flex items-end ${heightClass} bg-school-ink`}>
      {/* Layer 1: Background environment photo (slow scale-in zoom on load) */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src={imageSrc}
          alt={titleEn}
          fill
          priority
          className="object-cover object-center brightness-[0.85]"
        />
      </motion.div>

      {/* Layer 2: Directional gradient overlay (bottom-to-top, deep ink heavy at bottom) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(4, 13, 26, 0.95) 0%, rgba(4, 13, 26, 0.65) 35%, rgba(4, 13, 26, 0.1) 100%)"
        }}
      />

      {/* Layer 3: Content anchored bottom-left */}
      <div className="relative z-20 w-full max-w-[1536px] mx-auto px-4 md:px-8 lg:px-6 xl:px-12 pb-10 md:pb-16 flex flex-col justify-end h-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-6 h-[2px] bg-school-saffron" />
          <span className="text-school-saffron font-bold text-xs md:text-sm uppercase tracking-[0.18em]">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.4 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
