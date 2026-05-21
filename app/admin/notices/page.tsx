// app/admin/notices/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import NoticesClient from "./NoticesClient";

export const metadata: Metadata = { title: "Notices | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { email: true } } },
  });

  return <NoticesClient notices={notices as any} />;
}
