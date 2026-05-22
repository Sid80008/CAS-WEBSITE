import React from "react";
import prisma from "@/lib/prisma";
import CircularsClient from "./CircularsClient";

function detectNoticeCategory(title: string): "Academic" | "Holiday" | "General" {
  const t = title.toLowerCase();
  if (
    t.includes("exam") ||
    t.includes("test") ||
    t.includes("schedule") ||
    t.includes("timetable") ||
    t.includes("academic") ||
    t.includes("result") ||
    t.includes("report")
  ) {
    return "Academic";
  }
  if (
    t.includes("holiday") ||
    t.includes("vacation") ||
    t.includes("closed") ||
    t.includes("diwali") ||
    t.includes("break") ||
    t.includes("reopen")
  ) {
    return "Holiday";
  }
  return "General";
}

export default async function Page() {
  // Query notices from DB
  const notices = await prisma.notice.findMany({
    where: {
      published: true,
      OR: [
        { targetRole: "ALL" },
        { targetRole: "STUDENT" }
      ]
    },
    orderBy: {
      publishedAt: "desc"
    }
  });

  // Query events from DB
  const events = await prisma.event.findMany({
    where: {
      published: true
    },
    orderBy: {
      date: "desc"
    }
  });

  // Unify Notices & Events
  const unifiedCirculars = [
    ...notices.map((notice) => ({
      id: notice.id,
      type: "NOTICE" as const,
      category: detectNoticeCategory(notice.titleEn),
      title: notice.titleEn,
      content: notice.contentEn,
      date: notice.publishedAt.toISOString(),
      attachmentUrl: notice.attachmentUrl,
      imageUrl: notice.imageUrl,
    })),
    ...events.map((event) => ({
      id: event.id,
      type: "EVENT" as const,
      category: "Events" as const,
      title: event.titleEn,
      content: event.descriptionEn,
      date: event.date.toISOString(),
      attachmentUrl: event.photo,
      imageUrl: event.photo,
    })),
  ];

  // Sort unified list by date descending
  unifiedCirculars.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <CircularsClient initialCirculars={unifiedCirculars} />;
}
