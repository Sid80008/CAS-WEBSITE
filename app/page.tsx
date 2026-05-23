export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import PublicLayout from "@/components/layout/PublicLayout";
import { HomeClient } from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Central Academy Senior Secondary School, Anta | Quality Education Since 2013",
  },
  description:
    "Central Academy Senior Secondary School (CAS), antah, Baran, Rajasthan. RBSE affiliated school offering Classes I to XII with modern facilities, experienced faculty.",
  keywords: "CAS antah, Central Academy School antah, RBSE school Baran, school in antah Rajasthan",
};

async function getHomeData() {
  try {
    const [notices, toppers, studentCount] = await Promise.all([
      prisma.notice.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.topper.findMany({
        take: 2,
        orderBy: { percentage: "desc" },
      }),
      prisma.student.count(),
    ]);
    return { notices, toppers, studentCount };
  } catch {
    // DB unavailable during build / cold start — return safe defaults
    return { notices: [], toppers: [], studentCount: 0 };
  }
}

export default async function Home() {
  const data = await getHomeData();
  return (
    <PublicLayout>
      <HomeClient {...data} />
    </PublicLayout>
  );
}
