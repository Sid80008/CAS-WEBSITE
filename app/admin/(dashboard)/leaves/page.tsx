import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import LeavesClient from "./LeavesClient";

export const metadata: Metadata = { title: "Leave Requests | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function LeavesPage() {
  const leaves = await prisma.leaveRequest.findMany({
    include: {
      staff: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <LeavesClient leaves={leaves as any} />;
}
