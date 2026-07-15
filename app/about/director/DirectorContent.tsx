"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Mail, Phone, Quote, GraduationCap, HeartHandshake, Lightbulb, Compass, Award, Users } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, EASE, VIEWPORT } from "../../../lib/animations";

type DirectorKey = "hariprakash" | "rekhraj";

interface DirectorData {
  name: string;
  title: string;
  image: string;
  email: string;
  phone: string;
  quote: string;
  quoteTitle: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
  focusAreas: { icon: React.ReactNode; title: string; desc: string }[];
}

const directors: Record<DirectorKey, DirectorData> = {
  hariprakash: {
    name: "Mr. Hariprakash Meena",
    title: "Founder & Director",
    image: "/placeholder.png",
    email: "centralacademyantah@gmail.com",
    phone: "+917737689684",
    quote: "Education is not merely the accumulation of facts; it is the preparation for life itself.",
    quoteTitle: "Nurturing a Sanctuary of Learning",
    paragraphs: [
      "It is with great pride and joy that I welcome you to Central Academy Anta. When we envisioned this institution over three decades ago, our goal was simple yet profound: to create a nurturing space where education goes beyond textbooks and classrooms, preparing children for the journey of life itself.",
      "Over the years, we have witnessed our students grow into responsible, capable, and compassionate individuals who excel in diverse fields. This success is a testament to the collaborative efforts of our dedicated educators, supportive parents, and the determination of our students.",
      "As a Founder & Director, my mission has always been to construct a sanctuary of learning that inspires curiosity and builds strong character. We believe in instilling core values—integrity, discipline, and intellectual curiosity—that serve as a compass for our students as they navigate an increasingly complex world.",
      "Thank you for trusting us with your child's education. Together, let us continue to shape the leaders, innovators, and thinkers of tomorrow."
    ],
    stats: [
      { value: "30+", label: "Years of Legacy" },
      { value: "50k+", label: "Alumni Network" }
    ],
    focusAreas: [
      {
        icon: <Compass className="h-5 w-5 text-school-saffron" />,
        title: "Holistic Direction",
        desc: "Guiding the institution towards moral and ethical leadership."
      },
      {
        icon: <Award className="h-5 w-5 text-school-saffron" />,
        title: "Legacy of Honor",
        desc: "Maintaining our long-standing record of academic and cultural success."
      },
      {
        icon: <Users className="h-5 w-5 text-school-saffron" />,
        title: "Inclusive Environment",
        desc: "Creating a welcoming sanctuary where every child feels valued."
      }
    ]
  },
  rekhraj: {
    name: "Mr. Rekhraj Meena",
    title: "Founder & Director",
    image: "/placeholder.png",
    email: "centralacademyantah@gmail.com",
    phone: "+917737689684",
    quote: "We focus on holistic development—nurturing the mind, body, and spirit.",
    quoteTitle: "Mission for Modern & Accessible Education",
    paragraphs: [
      "Welcome to Central Academy Anta. In today's dynamic global landscape, education must be both accessible and transformative. As Founder & Director, my focus has been on bridging traditional values with modern pedagogical techniques to prepare our students for the 21st century.",
      "We live in an era of rapid technological advancement and social change. Therefore, our curriculum is designed not only to achieve academic excellence but also to foster critical thinking, creativity, and adaptability. We want our students to be active participants in their learning, not passive consumers.",
      "Our commitment to holistic development means we provide ample opportunities in sports, arts, leadership, and community service. We aim to nurture well-rounded personalities who are not only successful in their careers but are also empathetic global citizens.",
      "We value our close-knit school community and the vital partnership we share with parents. Together, we will continue to foster a rich culture of learning, growth, and excellence."
    ],
    stats: [
      { value: "30+", label: "Years of Legacy" },
      { value: "50k+", label: "Alumni Network" }
    ],
    focusAreas: [
      {
        icon: <Lightbulb className="h-5 w-5 text-school-saffron" />,
        title: "Modern Pedagogy",
        desc: "Integrating technology and interactive tools for active learning."
      },
      {
        icon: <GraduationCap className="h-5 w-5 text-school-saffron" />,
        title: "21st Century Skills",
        desc: "Fostering critical thinking, coding, and problem-solving."
      },
      {
        icon: <HeartHandshake className="h-5 w-5 text-school-saffron" />,
        title: "Global Citizenship",
        desc: "Nurturing empathy and responsibility in a global environment."
      }
    ]
  }
};

function DirectorContentInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DirectorKey>("hariprakash");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "rekhraj" || tab === "hariprakash") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (key: DirectorKey) => {
    setActiveTab(key);
    router.replace(`/about/director?tab=${key}`, { scroll: false });
  };

  const currentDirector = directors[activeTab];

  return (
    <PublicLayout>
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Director's Message"
        titleHi="निदेशक का संदेश"
        eyebrowEn="Leadership Vision"
        eyebrowHi="नेतृत्व दृष्टिकोण"
        imageSrc="/banner-main.png"
      />

      {/* Message Content Section */}
      <section className="py-20 px-6 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          {/* Clean Tab Controls */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200/60 shadow-lg relative z-20">
              <button
                onClick={() => handleTabChange("hariprakash")}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300 ${
                  activeTab === "hariprakash" ? "text-white" : "text-school-blue hover:text-school-saffron"
                }`}
              >
                {activeTab === "hariprakash" && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-school-saffron to-school-saffron-light rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Mr. Hariprakash Meena</span>
              </button>
              <button
                onClick={() => handleTabChange("rekhraj")}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300 ${
                  activeTab === "rekhraj" ? "text-white" : "text-school-blue hover:text-school-saffron"
                }`}
              >
                {activeTab === "rekhraj" && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-school-saffron to-school-saffron-light rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Mr. Rekhraj Meena</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Portrait & Stats Column */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-xl">
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 relative bg-slate-100">
                    <Image
                      alt={`Portrait of ${currentDirector.name}`}
                      src={currentDirector.image}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-school-navy mb-1 font-display">{currentDirector.name}</h3>
                    <p className="text-xs font-bold text-school-saffron uppercase tracking-wider mb-6">{currentDirector.title}</p>
                    
                    <div className="flex justify-center gap-3 border-t border-slate-100 pt-6">
                      <a
                        href={`mailto:${currentDirector.email}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-school-saffron-ghost text-school-saffron-dark hover:bg-school-saffron hover:text-white transition-all duration-300"
                        aria-label="Email Director"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a
                        href={`tel:${currentDirector.phone}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-school-saffron-ghost text-school-saffron-dark hover:bg-school-saffron hover:text-white transition-all duration-300"
                        aria-label="Call Director"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Director Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {currentDirector.stats.map((stat, i) => (
                    <div key={i} className="bg-school-saffron-ghost p-5 rounded-2xl border border-school-saffron/10 text-center shadow-sm">
                      <div className="text-school-saffron-dark text-2xl font-black mb-1 font-display">{stat.value}</div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Body Column */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200/60 shadow-xl relative overflow-hidden">
                  <Quote className="h-16 w-16 text-school-saffron/10 absolute -top-4 -left-4 pointer-events-none" />
                  
                  <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-6 font-sans">
                    <h3 className="text-2xl font-black text-school-navy font-display mb-6">
                      {currentDirector.quoteTitle}
                    </h3>
                    
                    <p className="text-xl font-medium text-slate-800 border-l-4 border-school-saffron pl-6 py-2 bg-school-saffron-ghost/50 rounded-r-xl font-sans">
                      "{currentDirector.quote}"
                    </p>

                    {currentDirector.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}

                    {/* Focus Areas Grid */}
                    <div className="pt-8 border-t border-slate-100">
                      <h4 className="text-lg font-black text-school-navy mb-6 font-display">Core Institutional Pillars</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentDirector.focusAreas.map((area, idx) => (
                          <div key={idx} className="p-5 border border-slate-150 rounded-2xl hover:bg-school-saffron-ghost/30 hover:border-school-saffron/20 transition-all duration-300">
                            <div className="bg-school-saffron-ghost h-10 w-10 rounded-xl flex items-center justify-center mb-4 text-school-saffron-dark">
                              {area.icon}
                            </div>
                            <h5 className="font-bold text-sm text-school-navy mb-2 font-display">{area.title}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed">{area.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div>
                        <p className="font-bold text-school-navy font-display">Warm Regards,</p>
                        <p className="text-lg font-black text-school-saffron-dark mt-1 font-display">{currentDirector.name}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{currentDirector.title}, Central Academy Anta</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PublicLayout>
  );
}

export function DirectorContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
        <div className="w-12 h-12 border-4 border-school-saffron border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DirectorContentInner />
    </Suspense>
  );
}
