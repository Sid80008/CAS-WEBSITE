import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

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
  return <HomeClient {...data} />;
}
