import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import ResultsClient from "./ResultsClient";

export const metadata: Metadata = { title: "Results | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const results = await prisma.result.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ResultsClient results={results} />;
}
