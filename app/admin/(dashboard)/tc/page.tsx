// app/admin/tc/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import TCClient from "./TCClient";

export const metadata: Metadata = { title: "TC & Certificates | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function TCPage() {
  const records = await prisma.tCRecord.findMany({
    orderBy: { issuedAt: "desc" },
    include: { student: true },
  });

  return <TCClient records={records as any} />;
}
