import React from "react";
import prisma from "@/lib/prisma";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Results",
  description: "View the latest academic results for Central Academy, Anta.",
};
export const dynamic = "force-dynamic";

export default async function PublicResultsPage() {
  const results = await prisma.result.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <PublicLayout>
      <PageBanner
        titleEn="Academic Results"
        titleHi="शैक्षणिक परिणाम"
        eyebrowEn="Excellence in Academics"
        eyebrowHi="शिक्षा में उत्कृष्टता"
        imageSrc="/banner-main.png"
      />

      <section className="py-20 px-6 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          {results.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-school-navy mb-2">No Results Published Yet</h3>
              <p className="text-slate-500">Please check back later for the latest academic results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((r) => (
                <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-school-saffron font-bold text-xs tracking-wider uppercase bg-school-saffron/10 px-2.5 py-1 rounded-full mb-2 inline-block">
                        {r.academicYear} • {r.examination}
                      </span>
                      <h3 className="text-xl font-bold text-school-navy mt-1">{r.studentName}</h3>
                      <p className="text-sm text-slate-500">Class {r.className} - {r.section}</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-4 ${r.status === 'PASS' ? 'border-green-100 bg-green-50 text-green-600' : 'border-red-100 bg-red-50 text-red-600'}`}>
                      <span className="font-bold text-lg leading-none">{Math.round(r.percentage)}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-700">Subject Marks:</p>
                    <div className="grid grid-cols-1 gap-2 bg-slate-50 p-4 rounded-xl">
                      {Array.isArray(r.subjectMarks) && (r.subjectMarks as any[]).map((sm: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-slate-600">{sm.subject}</span>
                          <span className="font-semibold text-school-navy">{sm.marks}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-100">
                      <span className="text-sm text-slate-500">Total: <strong className="text-school-navy">{r.total}</strong></span>
                      <span className="text-sm text-slate-500">Grade: <strong className="text-primary">{r.grade}</strong></span>
                    </div>
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
