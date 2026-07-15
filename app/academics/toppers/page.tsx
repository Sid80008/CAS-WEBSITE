import React from "react";
import prisma from "@/lib/prisma";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Toppers",
  description: "Meet our outstanding academic achievers who have set new benchmarks of excellence at Central Academy, Anta.",
};
export const dynamic = "force-dynamic";

export default async function PublicToppersPage() {
  const toppers = await prisma.topper.findMany({
    orderBy: [
      { year: "desc" },
      { rank: "asc" },
      { percentage: "desc" }
    ],
  });

  // Group toppers by year
  const toppersByYear = toppers.reduce((acc, topper) => {
    if (!acc[topper.year]) acc[topper.year] = [];
    acc[topper.year].push(topper);
    return acc;
  }, {} as Record<string, typeof toppers>);

  const years = Object.keys(toppersByYear).sort((a, b) => b.localeCompare(a));

  return (
    <PublicLayout>
      <PageBanner
        titleEn="Academic Achievers"
        titleHi="शैक्षणिक मेधावी छात्र"
        eyebrowEn="Hall of Fame"
        eyebrowHi="हॉल ऑफ फेम"
        imageSrc="/banner-main.png"
      />

      <section className="py-20 px-6 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          {years.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-school-navy mb-2">Toppers List Updating</h3>
              <p className="text-slate-500">The list of our academic achievers will be updated shortly.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {years.map((year) => (
                <div key={year}>
                  <h2 className="text-3xl font-black text-school-navy font-display border-b-2 border-school-saffron/30 pb-4 mb-8 inline-block">
                    Batch of {year}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {toppersByYear[year].map((t) => (
                      <div key={t.id} className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all text-center relative group overflow-hidden">
                        <div className="absolute top-0 right-0 bg-school-saffron text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                          {t.percentage}%
                        </div>
                        {t.rank && (
                          <div className="absolute top-0 left-0 bg-school-blue text-white text-xs font-bold px-3 py-1 rounded-br-xl z-10">
                            Rank {t.rank}
                          </div>
                        )}
                        <div className="mx-auto w-24 h-24 rounded-full mb-4 border-4 border-[#FAFAF5] shadow-inner overflow-hidden flex items-center justify-center bg-slate-100 mt-2">
                          {t.imageUrl ? (
                            <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <span className="text-3xl font-bold text-slate-300">{t.name.charAt(0)}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-school-navy line-clamp-1">{t.name}</h3>
                        <p className="text-slate-500 text-sm mt-1">Class {t.class}{t.section ? ` - ${t.section}` : ""}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
