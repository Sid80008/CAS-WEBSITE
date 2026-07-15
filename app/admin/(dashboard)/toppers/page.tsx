import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import ToppersClient from "./ToppersClient";

export const metadata: Metadata = { title: "Toppers | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function ToppersPage() {
  const toppers = await prisma.topper.findMany({
    orderBy: [
      { year: "desc" },
      { rank: "asc" },
      { percentage: "desc" }
    ],
  });

  return <ToppersClient toppers={toppers} />;
}
