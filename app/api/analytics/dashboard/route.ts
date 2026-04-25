import { NextResponse } from "next/server";
import { AnalyticsService } from "@/lib/services/analytics.service";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [metrics, studentStats, feeTrend] = await Promise.all([
      AnalyticsService.getDashboardMetrics(),
      AnalyticsService.getStudentStats(),
      AnalyticsService.getFeeTrend()
    ]);

    return NextResponse.json({
      metrics,
      studentStats,
      feeTrend
    });
  } catch (error) {
    console.error("Dashboard Analytics Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
