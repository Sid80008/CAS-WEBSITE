import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Leadership | Central Academy Senior Secondary School, antah",
  description: "Guided by a legacy of academic excellence and a future-focused vision, our leaders steer Central Academy Anta toward nurturing global citizens.",
};

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] font-body pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E6F1FB] text-[#00386b] rounded-full mb-4">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span className="text-xs font-bold uppercase tracking-wider font-sans">Institutional Voices</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00386b] mb-4 tracking-tight font-sans">
            Our Leadership
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Guided by a legacy of academic excellence and a future-focused vision, our leaders steer Central Academy Anta toward nurturing global citizens.
          </p>
        </section>

        {/* Founder & Director 1: Mr. Hariprakash Meena */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E0DB] shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
              {/* Photo & Name overlay */}
              <div className="lg:w-2/5 relative min-h-[350px] lg:min-h-[450px]">
                <Image
                  alt="Mr. Hariprakash Meena, Founder & Director"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtgGlPOmb1peJGGdj3he6z7DLYUZ8bFAwJ8u62d8XmGjyzqjIl1C_e3LFuSBciUrhH2yCPofE01a5WvTTd-vRrnDGXYY24dc3_2vHAqCaCxhufGq-6zD-04XaAHk5mujSIjAmwX0lfRzGfpmB9su5sYL4CmT7W0BVXAwWC1u6XltzGwmHX3AEEFUGYJRcURsyQaqnCCCNoC6X6HCXX5UhbwJU3ABygV8szfSOTS9zV8yFmNNQ1HgGwapv9mWQKnl89JIuk8ovLpSzj"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-2xl font-extrabold mb-1 font-sans">Mr. Hariprakash Meena</h2>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#fdad4e]">Founder &amp; Director</p>
                </div>
              </div>
              
              {/* Content & Stats */}
              <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="mb-8">
                  <span className="material-symbols-outlined text-[#885200] text-[48px] opacity-25 block mb-2">
                    format_quote
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#00386b] mb-4 font-sans">
                    Nurturing a Sanctuary of Learning
                  </h3>
                  <div className="space-y-4 text-[#43474f] text-base leading-relaxed">
                    <p>
                      Education is not merely the accumulation of facts; it is the preparation of life itself. When we laid the foundation of Central Academy Anta, our vision was to create a sanctuary of learning where every child could discover their true potential.
                    </p>
                    <p>
                      Today, seeing our students excel in various fields brings immense pride. We remain committed to our core values of integrity, discipline, and academic excellence. Our journey has just begun, and we look forward to shaping the leaders of tomorrow.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-start">
                    <Link
                      href="/about/director?tab=hariprakash"
                      className="inline-flex items-center gap-2 bg-[#00386b] hover:bg-[#002547] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm group"
                    >
                      Read Full Message
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>
                
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-[#F0F6FC] rounded-xl border border-[#d4e3ff] text-center">
                    <div className="text-[#00386b] text-3xl font-extrabold mb-1 font-sans">30+</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Years of Legacy</div>
                  </div>
                  <div className="p-5 bg-[#FAEEDA] rounded-xl border border-[#fdad4e]/20 text-center">
                    <div className="text-[#885200] text-3xl font-extrabold mb-1 font-sans">50k+</div>
                    <div className="text-[#633806] text-xs font-bold uppercase tracking-wider">Alumni Network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Divider 1 */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <div className="h-[1px] bg-[#E2E0DB] flex-grow max-w-xs"></div>
          <span className="material-symbols-outlined text-slate-300">school</span>
          <div className="h-[1px] bg-[#E2E0DB] flex-grow max-w-xs"></div>
        </div>

        {/* Founder & Director 2: Mr. Rekhraj Meena (Alternating layout: Photo Right) */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E0DB] shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row-reverse">
              {/* Photo & Name overlay */}
              <div className="lg:w-2/5 relative min-h-[350px] lg:min-h-[450px]">
                <Image
                  alt="Mr. Rekhraj Meena, Founder & Director"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD19IB8h3HM8Ot30jYe7j7guM_snnrm0dIcaYILeg7IxggRMlZAFy6Cb45Rxc7LjTx9OE8Oo5xHlYCW1OTkRVELGD7BY8528WK5VWFbF3xht8BCXO6wJB19YeA_o5NvYKB0U75Gy7LWTeVY9j-BBlpr5GVq2pm6_9Por2nz7OvdvAJwp9qRcTRxk8JWxL-bGEsfhlpRrBHumBLwdfN0O5jNtyLaRL6SAv7C6-hy_rttf903zy5bfKptrkZzn1PLfrlGcZBg9TlOatJ6"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-2xl font-extrabold mb-1 font-sans">Mr. Rekhraj Meena</h2>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#fdad4e]">Founder &amp; Director</p>
                </div>
              </div>
              
              {/* Content & Stats */}
              <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="mb-8">
                  <span className="material-symbols-outlined text-[#885200] text-[48px] opacity-25 block mb-2">
                    format_quote
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#00386b] mb-4 font-sans">
                    Mission for Modern &amp; Accessive Education
                  </h3>
                  <div className="space-y-4 text-[#43474f] text-base leading-relaxed">
                    <p>
                      As the Director of Central Academy School, Anta, it has been my lifelong mission to provide world-class education that is accessible and transformative. Since our founding, we have remained steadfast in our pursuit of excellence.
                    </p>
                    <p>
                      We focus on holistic development—nurturing the mind, body, and spirit. By integrating modern pedagogy with traditional values, we ensure that our students are well-equipped to navigate the complexities of the 21st century.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-start">
                    <Link
                      href="/about/director?tab=rekhraj"
                      className="inline-flex items-center gap-2 bg-[#00386b] hover:bg-[#002547] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm group"
                    >
                      Read Full Message
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>
                
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-[#F0F6FC] rounded-xl border border-[#d4e3ff] text-center">
                    <div className="text-[#00386b] text-3xl font-extrabold mb-1 font-sans">30+</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Years of Legacy</div>
                  </div>
                  <div className="p-5 bg-[#FAEEDA] rounded-xl border border-[#fdad4e]/20 text-center">
                    <div className="text-[#885200] text-3xl font-extrabold mb-1 font-sans">50k+</div>
                    <div className="text-[#633806] text-xs font-bold uppercase tracking-wider">Alumni Network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Divider 2 */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <div className="h-[1px] bg-[#E2E0DB] flex-grow max-w-xs"></div>
          <span className="material-symbols-outlined text-slate-300">school</span>
          <div className="h-[1px] bg-[#E2E0DB] flex-grow max-w-xs"></div>
        </div>

        {/* Principal: Mrs. Radha Meena (Alternating layout: Photo Left) */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E0DB] shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
              {/* Photo & Name overlay */}
              <div className="lg:w-2/5 relative min-h-[350px] lg:min-h-[450px]">
                <Image
                  alt="Mrs. Radha Meena, Principal"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbi6VpC17o7iOEsdbeBnC2SwNhfwwNz8_9ydpDjTFbYi_NqpbndwxC4yccBwxuXXQHU6bmsjfH88pBU1myoLaGyIxxEUIJBo5nsc5A6zoELQtBqbziuzkkrQlYxY9HI0YBa_0bAWbuaqbVHpUs6-5yMgPmZ8LaHUIse7PWRxmW6RmKBw5eFTcLYk4JVlXdL0tnpxKiozW0vALo0LkGDcWCVgrgtDCvMh2T0iZUd3n6SlO1KZaLlU3SFJCgAfdt5NFDeGsmJojyQiQD"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-2xl font-extrabold mb-1 font-sans">Mrs. Radha Meena</h2>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#fdad4e]">Principal</p>
                </div>
              </div>
              
              {/* Content & Pedagogical cards */}
              <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="mb-8">
                  <div className="inline-block px-4 py-1.5 bg-[#E1F5EE] text-[#085041] rounded-full font-bold text-xs mb-4">
                    Nurturing Minds
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#00386b] mb-4 font-sans">
                    Cultivating Excellence Daily
                  </h3>
                  <p className="text-[#43474f] text-base leading-relaxed mb-6">
                    My philosophy centers on creating a safe, stimulating environment where curiosity thrives. We don't just teach subjects; we mentor students to find their passion and develop the resilience needed for life's journey.
                  </p>
                  <div className="mb-8 flex justify-start">
                    <Link
                      href="/about/principal"
                      className="inline-flex items-center gap-2 bg-[#00386b] hover:bg-[#002547] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm group"
                    >
                      Read Full Message
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                  
                  {/* Pedagogical Approach Boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="bg-[#E6F1FB] text-[#00386b] h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">psychology</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#00386b] mb-1">Holistic Learning</h4>
                        <p className="text-xs text-slate-500">Integrating sports, arts, and values with core academics.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="bg-[#FAEEDA] text-[#885200] h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">diversity_3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#00386b] mb-1">Individual Attention</h4>
                        <p className="text-xs text-slate-500">Tailored mentorship programs for every unique learner.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="bg-[#E1F5EE] text-[#085041] h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">rocket_launch</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#00386b] mb-1">Modern Pedagogy</h4>
                        <p className="text-xs text-slate-500">Using technology and interactive tools for deeper engagement.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="bg-[#ffdad6] text-[#ba1a1a] h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">verified</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#00386b] mb-1">Character Building</h4>
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
        <section className="bg-[#00386b] rounded-2xl p-12 text-center text-white relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-xl"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold font-sans">
              Partner in Your Child's Growth
            </h3>
            <p className="text-[#d4e3ff] text-base max-w-xl mx-auto leading-relaxed">
              Join the Central Academy family and experience a legacy of transformative education in Anta.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/admissions"
                className="bg-[#fdad4e] hover:bg-[#ffb869] text-[#704200] px-8 py-3 rounded-xl font-bold transition-all shadow-md"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all"
              >
                Visit Campus
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
