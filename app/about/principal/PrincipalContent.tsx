"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Mail, Phone, Quote, GraduationCap, HeartHandshake, Lightbulb } from "lucide-react";
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, staggerFast, EASE, VIEWPORT,
} from "@/lib/animations";

export function PrincipalContent() {
  return (
    <PublicLayout>
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Principal's Message"
        titleHi="प्राचार्या का संदेश"
        eyebrowEn="Leadership Vision"
        eyebrowHi="नेतृत्व दृष्टिकोण"
        imageSrc="/banner-main.png"
      />

      {/* Message Content Section */}
      <section className="py-20 px-6 bg-[#FAFAF5]">
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
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 relative bg-slate-100">
                  <Image
                    alt="Portrait of Principal Mrs. Radha Meena"
                    src="/principal-main.png"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-school-navy mb-1 font-display">Mrs. Radha Meena</h3>
                  <p className="text-xs font-bold text-school-saffron uppercase tracking-widest mb-6">Principal, Central Academy Anta</p>
                  
                  <div className="flex justify-center gap-3 border-t border-slate-100 pt-6">
                    <a
                      href="mailto:centralacademyantah@gmail.com"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-school-saffron-ghost text-school-saffron-dark hover:bg-school-saffron hover:text-white transition-all duration-300"
                      aria-label="Email Principal"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="tel:+917737689684"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-school-saffron-ghost text-school-saffron-dark hover:bg-school-saffron hover:text-white transition-all duration-300"
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
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-xl relative overflow-hidden">
                <Quote className="h-16 w-16 text-school-saffron/10 absolute -top-4 -left-4 pointer-events-none" />
                
                <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-6 font-sans">
                  <p className="text-xl font-black text-school-navy font-display">
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
                    <div className="bg-school-blue-light/50 border border-school-blue/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <GraduationCap className="h-10 w-10 text-school-blue-dark mb-4" />
                      <h4 className="font-bold text-school-blue-dark mb-2 font-display">Holistic Growth</h4>
                      <p className="text-xs text-text-secondary">Nurturing mind, body, and spirit for balanced development.</p>
                    </div>

                    {/* Learning by Doing */}
                    <div className="bg-school-saffron-ghost border border-school-saffron/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <Lightbulb className="h-10 w-10 text-school-saffron-dark mb-4" />
                      <h4 className="font-bold text-school-saffron-dark mb-2 font-display">Experiential Learning</h4>
                      <p className="text-xs text-text-secondary">Practical learning that bridges theory and real-world application.</p>
                    </div>

                    {/* Adapting to Change */}
                    <div className="bg-school-saffron-ghost border border-school-saffron/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <HeartHandshake className="h-10 w-10 text-school-saffron-dark mb-4" />
                      <h4 className="font-bold text-school-saffron-dark mb-2 font-display">Strong Values</h4>
                      <p className="text-xs text-text-secondary">Instilling empathy, integrity, discipline, and social responsibility.</p>
                    </div>
                  </div>

                  <p>
                    We believe in a strong partnership between the school and the home. Your involvement is crucial to our students' success. We encourage open communication and invite you to be an active part of our school community.
                  </p>
                  <p>
                    Our dedicated faculty members are committed to providing a safe, inclusive, and stimulating environment where every child is valued and encouraged to reach their full potential. We are constantly updating our pedagogies to ensure that our students are future-ready.
                  </p>

                  <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <p className="font-bold text-school-navy font-display">Warm Regards,</p>
                      <p className="text-lg font-black text-school-saffron-dark mt-1 font-display">Mrs. Radha Meena</p>
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
