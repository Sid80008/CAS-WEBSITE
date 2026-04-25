import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Megaphone, Pin, Calendar, History } from "lucide-react";

async function getNotices() {
  return await prisma.notice.findMany({
    where: { published: true },
    orderBy: [
      { isPinned: "desc" },
      { createdAt: "desc" }
    ]
  });
}

export default async function PublicNotices() {
  const notices = await getNotices();

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-school-blue py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Notice Board</h1>
          <p className="text-school-blue-light/80 text-lg">Stay updated with the latest announcements, schedules, and important information.</p>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-8">
            {notices.length > 0 ? (
              notices.map((notice, idx) => (
                <div 
                  key={notice.id} 
                  className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all ${
                    notice.isPinned ? "border-l-8 border-l-school-amber ring-4 ring-school-amber/5" : "border-l-8 border-l-school-blue"
                  }`}
                >
                  <div className="p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${notice.isPinned ? "bg-amber-50 text-school-amber" : "bg-blue-50 text-school-blue"}`}>
                           {notice.isPinned ? <Pin className="h-5 w-5" /> : <Megaphone className="h-5 w-5" />}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-text-tertiary">
                           {notice.isPinned ? "Important Announcement" : "School Notice"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-text-tertiary text-sm font-semibold">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(notice.createdAt), "MMMM d, yyyy")}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-school-blue mb-4 leading-tight group-hover:text-school-blue-dark transition-colors">
                      {notice.titleEn}
                    </h3>
                    <p className="text-xl font-bold text-text-primary/70 mb-6 font-hindi leading-relaxed">
                      {notice.titleHi}
                    </p>

                    <div className="prose prose-slate max-w-none text-text-secondary leading-relaxed space-y-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic">
                        {notice.contentEn}
                      </div>
                      {notice.contentHi && (
                        <div className="p-4 bg-amber-50/30 rounded-xl border border-amber-100/50 font-hindi">
                          {notice.contentHi}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-text-tertiary font-bold tracking-widest uppercase">
                       <span>Ref No: CAS/2024/{(idx + 1).toString().padStart(3, '0')}</span>
                       <span className="flex items-center gap-1"><History className="h-4 w-4" /> Posted {format(new Date(notice.createdAt), "hh:mm a")}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <Megaphone className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-tertiary">No notices posted yet.</h3>
                <p className="text-text-tertiary mt-2">Please check back later for updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
