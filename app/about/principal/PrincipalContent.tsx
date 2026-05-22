"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PublicLayout from "@/components/layout/PublicLayout";
import { Mail, Phone, Quote, GraduationCap, HeartHandshake, Lightbulb } from "lucide-react";
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, staggerFast, EASE, VIEWPORT,
} from "@/lib/animations";

export function PrincipalContent() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-school-blue py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            Leadership Vision
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
          >
            Principal's Message
          </motion.h1>
          <div className="w-24 h-1 bg-[#fdad4e] mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Message Content Section */}
      <section className="py-20 px-6 bg-[#fcf9f8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {/* Portrait Column */}
            <motion.div
              variants={fadeLeft}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <div className="bg-white p-6 rounded-3xl border border-[#E2E0DB] shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative bg-slate-100">
                  <Image
                    alt="Portrait of Principal Mrs. Radha Meena"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbi6VpC17o7iOEsdbeBnC2SwNhfwwNz8_9ydpDjTFbYi_NqpbndwxC4yccBwxuXXQHU6bmsjfH88pBU1myoLaGyIxxEUIJBo5nsc5A6zoELQtBqbziuzkkrQlYxY9HI0YBa_0bAWbuaqbVHpUs6-5yMgPmZ8LaHUIse7PWRxmW6RmKBw5eFTcLYk4JVlXdL0tnpxKiozW0vALo0LkGDcWCVgrgtDCvMh2T0iZUd3n6SlO1KZaLlU3SFJCgAfdt5NFDeGsmJojyQiQD"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#00386b] mb-1 font-sans">Mrs. Radha Meena</h3>
                  <p className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Principal, Central Academy Anta</p>
                  
                  <div className="flex justify-center gap-3 border-t border-[#E2E0DB] pt-6">
                    <a
                      href="mailto:centralacademyantah@gmail.com"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#E6F1FB] text-[#00386b] hover:bg-[#00386b] hover:text-white transition-all duration-300"
                      aria-label="Email Principal"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="tel:+917442407765"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#E6F1FB] text-[#00386b] hover:bg-[#00386b] hover:text-white transition-all duration-300"
                      aria-label="Call Principal"
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Message Body Column */}
            <motion.div
              variants={fadeRight}
              className="lg:col-span-8 space-y-8"
            >
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E2E0DB] shadow-md relative">
                <Quote className="h-16 w-16 text-[#00386b]/10 absolute -top-4 -left-4 pointer-events-none" />
                
                <div className="prose prose-lg max-w-none text-[#424750] leading-relaxed space-y-6 font-body">
                  <p className="text-xl font-bold text-[#1c1b1b]">
                    Dear Parents, Students, and Community Members,
                  </p>
                  <p>
                    Welcome to Central Academy Anta. As we step into another academic year, I am filled with pride and anticipation for the journey ahead. Our commitment to nurturing young minds remains steadfast, rooted in our 30-year legacy of educational excellence.
                  </p>
                  <p>
                    Education is not merely the acquisition of facts; it is the preparation for life itself. In our rapidly evolving world, it is imperative that we equip our students with not just academic knowledge, but with resilience, adaptability, and a deep-seated moral compass.
                  </p>

                  {/* Highlight Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                    {/* Holistic Development */}
                    <div className="bg-[#E1F5EE] border border-[#085041]/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <GraduationCap className="h-10 w-10 text-[#085041] mb-4" />
                      <h4 className="font-bold text-[#085041] mb-2 font-sans">Holistic Growth</h4>
                      <p className="text-xs text-[#085041]/80">Nurturing mind, body, and spirit for balanced development.</p>
                    </div>

                    {/* Learning by Doing */}
                    <div className="bg-[#FAEEDA] border border-[#633806]/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <Lightbulb className="h-10 w-10 text-[#633806] mb-4" />
                      <h4 className="font-bold text-[#633806] mb-2 font-sans">Experiential Learning</h4>
                      <p className="text-xs text-[#633806]/80">Practical learning that bridges theory and real-world application.</p>
                    </div>

                    {/* Adapting to Change */}
                    <div className="bg-[#E6F1FB] border border-[#00386b]/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <HeartHandshake className="h-10 w-10 text-[#00386b] mb-4" />
                      <h4 className="font-bold text-[#00386b] mb-2 font-sans">Strong Values</h4>
                      <p className="text-xs text-[#00386b]/80">Instilling empathy, integrity, discipline, and social responsibility.</p>
                    </div>
                  </div>

                  <p>
                    We believe in a strong partnership between the school and the home. Your involvement is crucial to our students' success. We encourage open communication and invite you to be an active part of our school community.
                  </p>
                  <p>
                    Our dedicated faculty members are committed to providing a safe, inclusive, and stimulating environment where every child is valued and encouraged to reach their full potential. We are constantly updating our pedagogies to ensure that our students are future-ready.
                  </p>

                  <div className="mt-12 pt-8 border-t border-[#E2E0DB] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <p className="font-semibold text-[#00386b] font-sans">Warm Regards,</p>
                      <p className="text-lg font-bold text-[#1c1b1b] mt-1">Mrs. Radha Meena</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Principal, Central Academy Anta</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
