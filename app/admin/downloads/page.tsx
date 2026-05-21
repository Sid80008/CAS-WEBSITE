// app/admin/downloads/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import DownloadsClient from "./DownloadsClient";

export const metadata: Metadata = { title: "Downloads | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function DownloadsPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <DownloadsClient resources={resources} />;
}
