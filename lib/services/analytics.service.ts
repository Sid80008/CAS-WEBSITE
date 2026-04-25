import { prisma } from "@/lib/prisma";
import { startOfYear, endOfYear, subYears } from "date-fns";

export class AnalyticsService {
  /**
   * Get main dashboard metrics: students, admissions, attendance, fees
   */
  static async getDashboardMetrics() {
    const now = new Date();
    const thisYearStart = startOfYear(now);
    const lastYearStart = startOfYear(subYears(now, 1));
    const lastYearEnd = endOfYear(subYears(now, 1));

    // 1. Total Students
    const totalStudents = await prisma.student.count();
    const lastYearStudents = await prisma.enrollment.count({
      where: {
        year: {
          startDate: { gte: lastYearStart, lte: lastYearEnd }
        }
      }
    });
    const studentGrowth = lastYearStudents > 0 
      ? ((totalStudents - lastYearStudents) / lastYearStudents) * 100 
      : 0;

    // 2. Admissions Growth (New Admissions this year vs last year)
    const thisYearAdmissions = await prisma.admission.count({
      where: { createdAt: { gte: thisYearStart } }
    });
    const lastYearAdmissions = await prisma.admission.count({
      where: { createdAt: { gte: lastYearStart, lte: lastYearEnd } }
    });
    const admissionGrowthValue = lastYearAdmissions > 0 
      ? ((thisYearAdmissions - lastYearAdmissions) / lastYearAdmissions) * 100 
      : 0;

    // 3. Attendance Rate (Last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const attendanceRecords = await prisma.attendance.findMany({
      where: { date: { gte: thirtyDaysAgo } },
      select: { status: true }
    });
    const presentCount = attendanceRecords.filter(r => r.status === 'PRESENT').length;
    const attendanceRate = attendanceRecords.length > 0 
      ? (presentCount / attendanceRecords.length) * 100 
      : 0;

    // 4. Fee Collection (Total Paid vs Total Expected this year)
    const totalPaid = await prisma.payment.aggregate({
      where: { paidAt: { gte: thisYearStart } },
      _sum: { amount: true }
    });
    const totalExpected = await prisma.feeStructure.aggregate({
      where: { year: { startDate: { gte: thisYearStart } } },
      _sum: { amount: true }
    });

    return {
      students: {
        total: totalStudents,
        growth: Number(studentGrowth.toFixed(1)),
        trend: studentGrowth >= 0 ? 'up' : 'down'
      },
      admissions: {
        total: thisYearAdmissions,
        growth: Number(admissionGrowthValue.toFixed(1)),
        trend: admissionGrowthValue >= 0 ? 'up' : 'down'
      },
      attendance: {
        rate: Number(attendanceRate.toFixed(1)),
        trend: 'up' // Simplified for now
      },
      fees: {
        collected: totalPaid._sum.amount || 0,
        expected: totalExpected._sum.amount || 0,
        percentage: totalExpected._sum.amount ? Number(((totalPaid._sum.amount || 0) / totalExpected._sum.amount) * 100).toFixed(1) : 0
      }
    };
  }

  /**
   * Get student statistics by class
   */
  static async getStudentStats() {
    const classes = await prisma.class.findMany({
      include: {
        sections: {
          include: {
            enrollments: true
          }
        }
      }
    });

    return classes.map(c => ({
      name: c.name,
      count: c.sections.reduce((acc, s) => acc + s.enrollments.length, 0)
    }));
  }

  /**
   * Get monthly fee collection trend
   */
  static async getFeeTrend() {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const payments = await prisma.payment.findMany({
      where: { paidAt: { gte: sixMonthsAgo } },
      select: { amount: true, paidAt: true }
    });

    // Group by month
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trend = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const monthName = months[d.getMonth()];
      const total = payments
        .filter(p => p.paidAt.getMonth() === d.getMonth() && p.paidAt.getFullYear() === d.getFullYear())
        .reduce((acc, curr) => acc + curr.amount, 0);
      
      return { month: monthName, amount: total };
    });

    return trend;
  }
}
