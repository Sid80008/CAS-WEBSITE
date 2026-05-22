"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";
import { Mail, Phone, Quote, GraduationCap, HeartHandshake, Lightbulb, Compass, Award, Users } from "lucide-react";
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, EASE, VIEWPORT
} from "@/lib/animations";

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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtgGlPOmb1peJGGdj3he6z7DLYUZ8bFAwJ8u62d8XmGjyzqjIl1C_e3LFuSBciUrhH2yCPofE01a5WvTTd-vRrnDGXYY24dc3_2vHAqCaCxhufGq-6zD-04XaAHk5mujSIjAmwX0lfRzGfpmB9su5sYL4CmT7W0BVXAwWC1u6XltzGwmHX3AEEFUGYJRcURsyQaqnCCCNoC6X6HCXX5UhbwJU3ABygV8szfSOTS9zV8yFmNNQ1HgGwapv9mWQKnl89JIuk8ovLpSzj",
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
        icon: <Compass className="h-5 w-5 text-[#885200]" />,
        title: "Holistic Direction",
        desc: "Guiding the institution towards moral and ethical leadership."
      },
      {
        icon: <Award className="h-5 w-5 text-[#885200]" />,
        title: "Legacy of Honor",
        desc: "Maintaining our long-standing record of academic and cultural success."
      },
      {
        icon: <Users className="h-5 w-5 text-[#885200]" />,
        title: "Inclusive Environment",
        desc: "Creating a welcoming sanctuary where every child feels valued."
      }
    ]
  },
  rekhraj: {
    name: "Mr. Rekhraj Meena",
    title: "Founder & Director",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD19IB8h3HM8Ot30jYe7j7guM_snnrm0dIcaYILeg7IxggRMlZAFy6Cb45Rxc7LjTx9OE8Oo5xHlYCW1OTkRVELGD7BY8528WK5VWFbF3xht8BCXO6wJB19YeA_o5NvYKB0U75Gy7LWTeVY9j-BBlpr5GVq2pm6_9Por2nz7OvdvAJwp9qRcTRxk8JWxL-bGEsfhlpRrBHumBLwdfN0O5jNtyLaRL6SAv7C6-hy_rttf903zy5bfKptrkZzn1PLfrlGcZBg9TlOatJ6",
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
        icon: <Lightbulb className="h-5 w-5 text-[#00386b]" />,
        title: "Modern Pedagogy",
        desc: "Integrating technology and interactive tools for active learning."
      },
      {
        icon: <GraduationCap className="h-5 w-5 text-[#00386b]" />,
        title: "21st Century Skills",
        desc: "Fostering critical thinking, coding, and problem-solving."
      },
      {
        icon: <HeartHandshake className="h-5 w-5 text-[#00386b]" />,
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
            Directors' Message
          </motion.h1>
          <div className="w-24 h-1 bg-[#fdad4e] mx-auto rounded-full mb-8"></div>

          {/* Clean Tab Controls */}
          <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg relative z-20">
            <button
              onClick={() => handleTabChange("hariprakash")}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300 ${
                activeTab === "hariprakash" ? "text-[#00386b]" : "text-white hover:text-white/80"
              }`}
            >
              {activeTab === "hariprakash" && (
                <motion.div
                  layoutId="active-bg"
                  className="absolute inset-0 bg-[#fdad4e] rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Mr. Hariprakash Meena</span>
            </button>
            <button
              onClick={() => handleTabChange("rekhraj")}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300 ${
                activeTab === "rekhraj" ? "text-[#00386b]" : "text-white hover:text-white/80"
              }`}
            >
              {activeTab === "rekhraj" && (
                <motion.div
                  layoutId="active-bg"
                  className="absolute inset-0 bg-[#fdad4e] rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Mr. Rekhraj Meena</span>
            </button>
          </div>
        </div>
      </section>

      {/* Message Content Section */}
      <section className="py-20 px-6 bg-[#fcf9f8]">
        <div className="max-w-7xl mx-auto">
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
                <div className="bg-white p-6 rounded-3xl border border-[#E2E0DB] shadow-md">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative bg-slate-100">
                    <Image
                      alt={`Portrait of ${currentDirector.name}`}
                      src={currentDirector.image}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#00386b] mb-1 font-sans">{currentDirector.name}</h3>
                    <p className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">{currentDirector.title}</p>
                    
                    <div className="flex justify-center gap-3 border-t border-[#E2E0DB] pt-6">
                      <a
                        href={`mailto:${currentDirector.email}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#E6F1FB] text-[#00386b] hover:bg-[#00386b] hover:text-white transition-all duration-300"
                        aria-label="Email Director"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a
                        href={`tel:${currentDirector.phone}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#E6F1FB] text-[#00386b] hover:bg-[#00386b] hover:text-white transition-all duration-300"
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
                    <div key={i} className="bg-white p-5 rounded-2xl border border-[#E2E0DB] text-center shadow-sm">
                      <div className="text-[#00386b] text-2xl font-black mb-1">{stat.value}</div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Body Column */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E2E0DB] shadow-md relative">
                  <Quote className="h-16 w-16 text-[#00386b]/10 absolute -top-4 -left-4 pointer-events-none" />
                  
                  <div className="prose prose-lg max-w-none text-[#424750] leading-relaxed space-y-6 font-body">
                    <h3 className="text-2xl font-extrabold text-[#00386b] font-sans mb-6">
                      {currentDirector.quoteTitle}
                    </h3>
                    
                    <p className="text-xl font-medium text-[#1c1b1b] border-l-4 border-[#fdad4e] pl-6 py-2 bg-[#F8F7F5] rounded-r-xl">
                      "{currentDirector.quote}"
                    </p>

                    {currentDirector.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}

                    {/* Focus Areas Grid */}
                    <div className="pt-8 border-t border-[#E2E0DB]">
                      <h4 className="text-lg font-bold text-[#00386b] mb-6 font-sans">Core Institutional Pillars</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentDirector.focusAreas.map((area, idx) => (
                          <div key={idx} className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                            <div className="bg-[#FAEEDA] h-10 w-10 rounded-lg flex items-center justify-center mb-4">
                              {area.icon}
                            </div>
                            <h5 className="font-semibold text-sm text-[#00386b] mb-2">{area.title}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed">{area.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-[#E2E0DB] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div>
                        <p className="font-semibold text-[#00386b] font-sans">Warm Regards,</p>
                        <p className="text-lg font-bold text-[#1c1b1b] mt-1">{currentDirector.name}</p>
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
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f8]">
        <div className="w-12 h-12 border-4 border-[#00386b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DirectorContentInner />
    </Suspense>
  );
}
