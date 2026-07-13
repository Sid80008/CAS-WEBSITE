import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Our Leadership",
  description: "Guided by a legacy of academic excellence and a future-focused vision, our leaders steer Central Academy Anta toward nurturing global citizens.",
};

export default function LeadershipPage() {
  return (
    <PublicLayout>
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Our Leadership"
        titleHi="हमारा नेतृत्व"
        eyebrowEn="Institutional Voices"
        eyebrowHi="संस्थागत स्वर"
        imageSrc="/banner-main.png"
      />

      <div className="min-h-screen bg-[#FAFAF5] text-text-primary font-sans py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          
          {/* Founder & Director 1: Mr. Hariprakash Meena */}
          <section className="mb-20">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-100/50">
              <div className="flex flex-col lg:flex-row">
                {/* Photo & Name overlay */}
                <div className="lg:w-2/5 relative min-h-[380px] lg:min-h-[480px]">
                  <Image
                    alt="Mr. Hariprakash Meena, Founder & Director"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtgGlPOmb1peJGGdj3he6z7DLYUZ8bFAwJ8u62d8XmGjyzqjIl1C_e3LFuSBciUrhH2yCPofE01a5WvTTd-vRrnDGXYY24dc3_2vHAqCaCxhufGq-6zD-04XaAHk5mujSIjAmwX0lfRzGfpmB9su5sYL4CmT7W0BVXAwWC1u6XltzGwmHX3AEEFUGYJRcURsyQaqnCCCNoC6X6HCXX5UhbwJU3ABygV8szfSOTS9zV8yFmNNQ1HgGwapv9mWQKnl89JIuk8ovLpSzj"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-ink via-school-ink/35 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                    <h2 className="text-3xl font-black mb-1 font-display">Mr. Hariprakash Meena</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-school-saffron">Founder &amp; Director</p>
                  </div>
                </div>
                
                {/* Content & Stats */}
                <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                  <div className="mb-8">
                    <span className="text-school-saffron font-bold text-4xl block mb-2 leading-none font-display">“</span>
                    <h3 className="text-2xl font-black text-school-navy mb-4 font-display">
                      Nurturing a Sanctuary of Learning
                    </h3>
                    <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed">
                      <p>
                        Education is not merely the accumulation of facts; it is the preparation of life itself. When we laid the foundation of Central Academy Anta, our vision was to create a sanctuary of learning where every child could discover their true potential.
                      </p>
                      <p>
                        Today, seeing our students excel in various fields brings immense pride. We remain committed to our core values of integrity, discipline, and academic excellence. Our journey has just begun, and we look forward to shaping the leaders of tomorrow.
                      </p>
                    </div>
                    <div className="mt-8 flex justify-start">
                      <Link
                        href="/about/director?tab=hariprakash"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-school-saffron to-school-saffron-light hover:opacity-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
                      >
                        Read Full Message
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-school-saffron-ghost rounded-2xl border border-school-saffron/10 text-center">
                      <div className="text-school-saffron-dark text-3xl font-black mb-1 font-display">30+</div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Years of Legacy</div>
                    </div>
                    <div className="p-5 bg-school-blue-light/50 rounded-2xl border border-school-blue/10 text-center">
                      <div className="text-school-blue-dark text-3xl font-black mb-1 font-display">50k+</div>
                      <div className="text-[#003D7A] text-[10px] font-bold uppercase tracking-wider">Alumni Network</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Subtle Divider 1 */}
          <div className="flex justify-center items-center gap-4 my-20">
            <div className="h-[1px] bg-slate-200 flex-grow max-w-xs"></div>
            <span className="material-symbols-outlined text-school-saffron/40">school</span>
            <div className="h-[1px] bg-slate-200 flex-grow max-w-xs"></div>
          </div>

          {/* Founder & Director 2: Mr. Rekhraj Meena (Alternating layout: Photo Right) */}
          <section className="mb-20">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-100/50">
              <div className="flex flex-col lg:flex-row-reverse">
                {/* Photo & Name overlay */}
                <div className="lg:w-2/5 relative min-h-[380px] lg:min-h-[480px]">
                  <Image
                    alt="Mr. Rekhraj Meena, Founder & Director"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD19IB8h3HM8Ot30jYe7j7guM_snnrm0dIcaYILeg7IxggRMlZAFy6Cb45Rxc7LjTx9OE8Oo5xHlYCW1OTkRVELGD7BY8528WK5VWFbF3xht8BCXO6wJB19YeA_o5NvYKB0U75Gy7LWTeVY9j-BBlpr5GVq2pm6_9Por2nz7OvdvAJwp9qRcTRxk8JWxL-bGEsfhlpRrBHumBLwdfN0O5jNtyLaRL6SAv7C6-hy_rttf903zy5bfKptrkZzn1PLfrlGcZBg9TlOatJ6"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-ink via-school-ink/35 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                    <h2 className="text-3xl font-black mb-1 font-display">Mr. Rekhraj Meena</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-school-saffron">Founder &amp; Director</p>
                  </div>
                </div>
                
                {/* Content & Stats */}
                <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                  <div className="mb-8">
                    <span className="text-school-saffron font-bold text-4xl block mb-2 leading-none font-display">“</span>
                    <h3 className="text-2xl font-black text-school-navy mb-4 font-display">
                      Mission for Modern &amp; Accessible Education
                    </h3>
                    <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed">
                      <p>
                        As the Director of Central Academy School, Anta, it has been my lifelong mission to provide world-class education that is accessible and transformative. Since our founding, we have remained steadfast in our pursuit of excellence.
                      </p>
                      <p>
                        We focus on holistic development—nurturing the mind, body, and spirit. By integrating modern pedagogy with traditional values, we ensure that our students are well-equipped to navigate the complexities of the 21st century.
                      </p>
                    </div>
                    <div className="mt-8 flex justify-start">
                      <Link
                        href="/about/director?tab=rekhraj"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-school-saffron to-school-saffron-light hover:opacity-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
                      >
                        Read Full Message
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-school-saffron-ghost rounded-2xl border border-school-saffron/10 text-center">
                      <div className="text-school-saffron-dark text-3xl font-black mb-1 font-display">30+</div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Years of Legacy</div>
                    </div>
                    <div className="p-5 bg-school-blue-light/50 rounded-2xl border border-school-blue/10 text-center">
                      <div className="text-school-blue-dark text-3xl font-black mb-1 font-display">50k+</div>
                      <div className="text-[#003D7A] text-[10px] font-bold uppercase tracking-wider">Alumni Network</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Subtle Divider 2 */}
          <div className="flex justify-center items-center gap-4 my-20">
            <div className="h-[1px] bg-slate-200 flex-grow max-w-xs"></div>
            <span className="material-symbols-outlined text-school-saffron/40">school</span>
            <div className="h-[1px] bg-slate-200 flex-grow max-w-xs"></div>
          </div>

          {/* Principal: Mrs. Radha Meena (Alternating layout: Photo Left) */}
          <section className="mb-20">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-100/50">
              <div className="flex flex-col lg:flex-row">
                {/* Photo & Name overlay */}
                <div className="lg:w-2/5 relative min-h-[380px] lg:min-h-[480px]">
                  <Image
                    alt="Mrs. Radha Meena, Principal"
                    src="/principal-main.png"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-ink via-school-ink/35 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                    <h2 className="text-3xl font-black mb-1 font-display">Mrs. Radha Meena</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-school-saffron">Principal</p>
                  </div>
                </div>
                
                {/* Content & Pedagogical cards */}
                <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                  <div className="mb-8">
                    <div className="inline-block px-4 py-1.5 bg-school-saffron-ghost text-school-saffron-dark rounded-full font-bold text-xs mb-4 uppercase tracking-widest">
                      Nurturing Minds
                    </div>
                    <h3 className="text-2xl font-black text-school-navy mb-4 font-display">
                      Cultivating Excellence Daily
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                      My philosophy centers on creating a safe, stimulating environment where curiosity thrives. We don't just teach subjects; we mentor students to find their passion and develop the resilience needed for life's journey.
                    </p>
                    <div className="mb-8 flex justify-start">
                      <Link
                        href="/about/principal"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-school-saffron to-school-saffron-light hover:opacity-95 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
                      >
                        Read Full Message
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                    
                    {/* Pedagogical Approach Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="bg-school-blue-light/50 text-school-blue h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-xl">psychology</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-school-navy mb-1">Holistic Learning</h4>
                          <p className="text-xs text-slate-500">Integrating sports, arts, and values with core academics.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="bg-school-saffron-ghost text-school-saffron-dark h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-xl">diversity_3</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-school-navy mb-1">Individual Attention</h4>
                          <p className="text-xs text-slate-500">Tailored mentorship programs for every unique learner.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="bg-school-saffron-ghost text-school-saffron-dark h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-xl">rocket_launch</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-school-navy mb-1">Modern Pedagogy</h4>
                          <p className="text-xs text-slate-500">Using technology and interactive tools for deeper engagement.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="bg-red-50 text-school-coral h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-xl">verified</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-school-navy mb-1">Character Building</h4>
                          <p className="text-xs text-slate-500">Instilling discipline, integrity, and social responsibility.</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-school-navy rounded-[2.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,98,26,0.08)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-school-saffron/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-school-blue/15 rounded-full -ml-24 -mb-24 blur-2xl"></div>
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] inline-block">ADMISSIONS OPEN</span>
              <h3 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
                Partner in Your Child's Growth
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Join the Central Academy family and experience a legacy of transformative education in Anta.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href="/admissions"
                  className="bg-gradient-to-r from-school-saffron to-school-saffron-light hover:opacity-95 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Visit Campus
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}
