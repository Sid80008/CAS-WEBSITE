import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { NoticesClient } from "./NoticesClient";

export const metadata = {
  title: "Notice Board – Central Academy Senior Secondary School",
  description: "Stay updated with the latest announcements, schedules, and important information.",
};

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

      {/* Notices List Wrapper */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <NoticesClient initialNotices={notices} />
        </div>
      </section>
    </PublicLayout>
  );
}
