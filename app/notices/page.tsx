export const dynamic = "force-dynamic";

import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import prisma from "@/lib/prisma";
import { NoticesClient } from "./NoticesClient";

export const metadata = {
  title: "Notice Board",
  description: "Stay updated with the latest announcements, schedules, and important information.",
};

async function getNotices() {
  try {
    return await prisma.notice.findMany({
      where: { isPublic: true },
      orderBy: [
        { isPinned: "desc" },
        { publishedAt: "desc" }
      ]
    });
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return [];
  }
}

export default async function PublicNotices() {
  const notices = await getNotices();

  return (
    <PublicLayout>
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Notice Board"
        titleHi="सूचना पट्ट"
        eyebrowEn="LIVE UPDATES"
        eyebrowHi="लाइव अपडेट"
        imageSrc="/banner-main.png"
      />

      {/* Notices List Wrapper */}
      <section className="py-24 px-6 bg-[#FAFAF5]">
        <div className="max-w-5xl mx-auto">
          <NoticesClient initialNotices={notices} />
        </div>
      </section>
    </PublicLayout>
  );
}
