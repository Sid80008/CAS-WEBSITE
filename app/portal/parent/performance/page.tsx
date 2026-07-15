import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import PrintButton from "@/components/portal/PrintButton";

function getGradeAndStatus(obtained: number, max: number) {
  if (max <= 0) return { grade: "—", status: "—", color: "text-[#555555]" };
  const pct = (obtained / max) * 100;
  if (pct >= 90) return { grade: "A1", status: "Outstanding", color: "text-green" };
  if (pct >= 80) return { grade: "A2", status: "Advanced", color: "text-green" };
  if (pct >= 70) return { grade: "B1", status: "Good", color: "text-green" };
  if (pct >= 60) return { grade: "B2", status: "Average", color: "text-secondary" };
  if (pct >= 50) return { grade: "C", status: "Pass", color: "text-secondary" };
  return { grade: "D", status: "Needs Focus", color: "text-error" };
}

export default async function ParentPerformancePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/portal/login");
  }

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      students: {
        include: {
          student: {
            include: {
              enrollments: {
                include: {
                  section: {
                    include: {
                      class: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!parent || parent.students.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E0DB] rounded-2xl shadow-sm">
        <p className="text-on-surface-variant font-medium">No linked students found. Please contact administration.</p>
      </div>
    );
  }

  const student = parent.students[0].student;
  const enrollment = student.enrollments[0];
  const classLabel = enrollment ? `${enrollment.section.class.name}-${enrollment.section.name}` : "Unassigned";

  // Fetch Attendance
  const attendances = await prisma.attendance.findMany({
    where: { studentId: student.id }
  });
  const totalDays = attendances.length;
  const presentDays = attendances.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  // Fetch Exam Results
  const examResults = await prisma.examResult.findMany({
    where: { studentId: student.id },
    include: {
      exam: true,
      subject: true
    },
    orderBy: {
      exam: {
        date: 'desc'
      }
    }
  });

  // Calculate Aggregate
  let totalObtained = 0;
  let totalMax = 0;
  examResults.forEach(r => {
    totalObtained += r.marksObtained;
    totalMax += r.maxMarks;
  });
  const aggregatePercentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : null;

  // Calculate Class Rank dynamically
  let rankText = "—";
  let totalPeers = 0;
  if (enrollment) {
    const peers = await prisma.enrollment.findMany({
      where: { sectionId: enrollment.sectionId },
      include: {
        student: {
          include: {
            examResults: true
          }
        }
      }
    });
    totalPeers = peers.length;
    
    const peerAverages = peers.map(p => {
      let pObtained = 0;
      let pMax = 0;
      p.student.examResults.forEach(r => {
        pObtained += r.marksObtained;
        pMax += r.maxMarks;
      });
      const avg = pMax > 0 ? (pObtained / pMax) : 0;
      return { studentId: p.studentId, avg };
    });
    
    peerAverages.sort((a, b) => b.avg - a.avg);
    
    const myIndex = peerAverages.findIndex(p => p.studentId === student.id);
    if (myIndex !== -1) {
      const myRank = myIndex + 1;
      rankText = `${myRank.toString().padStart(2, '0')}/${totalPeers}`;
    }
  }

  // Fetch Teacher Remarks
  const remarks = await prisma.teacherRemark.findMany({
    where: { studentId: student.id },
    include: { staff: true },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E2E0DB] pb-6">
        <div>
          <h2 className="font-h2 text-3xl font-extrabold text-primary">Performance & Progress Report</h2>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Academic progression and remarks for {student.firstName} {student.lastName} ({classLabel})
          </p>
        </div>
        <div className="bg-teal-light text-teal-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-dark/10">
          Session {(enrollment as any)?.year?.name || "Active"}
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Aggregate Score Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-on-surface-variant font-label text-sm font-semibold">Current Aggregate</p>
            <span className="material-symbols-outlined text-primary text-[28px]">trending_up</span>
          </div>
          <h3 className="font-h1 text-4xl font-extrabold text-primary">
            {aggregatePercentage !== null ? `${aggregatePercentage}%` : "—"}
          </h3>
          {aggregatePercentage !== null && (
            <div className="mt-4 w-full bg-[#eae7e7] rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${aggregatePercentage}%` }}></div>
            </div>
          )}
          <p className="text-xs text-on-surface-variant mt-2 font-medium">
            Based on all completed examinations
          </p>
        </div>

        {/* Attendance Card */}
        <div className="bg-white p-6 rounded-2xl border-2 border-primary shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className="text-on-surface-variant font-label text-sm font-semibold">Attendance Rate</p>
            <span className="material-symbols-outlined text-primary text-[28px]">event_available</span>
          </div>
          <h3 className="font-h1 text-4xl font-extrabold text-primary">{attendancePercentage}%</h3>
          <p className={`text-xs font-bold mt-4 ${attendancePercentage >= 75 ? 'text-green' : 'text-error'}`}>
            {attendancePercentage >= 75 ? "Excellent - Regular Student" : "Warning - Low Attendance"}
          </p>
        </div>

        {/* Class Rank Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-on-surface-variant font-label text-sm font-semibold">Class Rank</p>
            <span className="material-symbols-outlined text-secondary text-[28px]">leaderboard</span>
          </div>
          <h3 className="font-h1 text-4xl font-extrabold text-secondary">{rankText}</h3>
          <p className="text-xs text-on-surface-variant mt-4 font-medium">
            Calculated among {totalPeers} students in section
          </p>
        </div>
      </div>

      {/* Main Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Exam Results Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E0DB] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E2E0DB] bg-[#fcf9f8] flex justify-between items-center">
            <h3 className="font-h3 text-xl font-bold text-primary">Latest Exam Results</h3>
          </div>
          
          <div className="overflow-x-auto">
            {examResults.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f6f3f2] text-on-surface-variant font-label text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold">Subject</th>
                    <th className="p-4 font-bold text-center">Exam</th>
                    <th className="p-4 font-bold text-center">Marks Obtained</th>
                    <th className="p-4 font-bold text-center">Max Marks</th>
                    <th className="p-4 font-bold">Grade / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E0DB]">
                  {examResults.map((result) => {
                    const rating = getGradeAndStatus(result.marksObtained, result.maxMarks);
                    return (
                      <tr key={result.id} className="hover:bg-school-blue-extra-light/40 transition-colors text-sm text-[#1c1b1b]">
                        <td className="p-4 font-semibold">{result.subject.name}</td>
                        <td className="p-4 text-center text-on-surface-variant">{result.exam.title}</td>
                        <td className="p-4 text-center font-bold">{result.marksObtained}</td>
                        <td className="p-4 text-center text-on-surface-variant">{result.maxMarks}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 font-bold ${rating.color}`}>
                            {rating.grade} ({rating.status})
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-on-surface-variant font-medium">
                No exam results recorded for this academic period.
              </div>
            )}
          </div>
        </div>

        {/* Action Widgets */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E0DB] shadow-sm">
            <h4 className="font-h4 text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">download</span>
              Report Cards
            </h4>
            <div className="space-y-3">
              <div className="p-3 border border-[#E2E0DB] rounded-xl hover:border-primary hover:bg-school-blue-extra-light transition-all flex items-center justify-between">
                <div>
                  <p className="font-label text-sm font-bold text-on-surface">Term Performance Sheet</p>
                  <p className="font-caption text-xs text-on-surface-variant">Generated dynamically</p>
                </div>
                <PrintButton />
              </div>
            </div>
          </div>

          <div className="bg-primary p-6 rounded-2xl shadow-sm text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-secondary-container">forum</span>
              <h4 className="font-h4 text-lg font-bold">Connect with Teachers</h4>
            </div>
            <p className="font-body text-xs opacity-90 mb-4 leading-relaxed">
              Have questions regarding student grades or performance? Contact the subject instructors directly through the portal.
            </p>
            <a 
              href="/portal/parent/connect"
              className="w-full py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              Send Message
            </a>
          </div>
        </div>
      </div>

      {/* Holistic Remarks */}
      <div className="bg-white rounded-2xl border border-[#E2E0DB] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E2E0DB] bg-[#fcf9f8]">
          <h3 className="font-h3 text-xl font-bold text-primary">Feedback & Teacher Remarks</h3>
          <p className="font-body text-xs text-on-surface-variant mt-1">Specific performance feedback from teachers</p>
        </div>
        <div className="divide-y divide-[#E2E0DB]">
          {remarks.length > 0 ? (
            remarks.map((remark) => (
              <div key={remark.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-[#f6f3f2]/30 transition-colors">
                <div className="w-full md:w-52 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    {remark.staff.photo ? (
                      <Image 
                        src={remark.staff.photo} 
                        alt={remark.staff.name} 
                        width={40} 
                        height={40} 
                        className="w-10 h-10 rounded-full object-cover border border-[#E2E0DB]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
                        {remark.staff.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                    <div>
                      <p className="font-label text-sm font-bold text-primary">{remark.staff.name}</p>
                      <p className="font-caption text-xs text-on-surface-variant">{remark.staff.designation || "Instructor"}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    remark.type === 'POSITIVE' ? 'bg-teal-light text-teal-dark' :
                    remark.type === 'WARNING' ? 'bg-error-container text-error' : 'bg-school-blue-light text-primary'
                  }`}>
                    {remark.type}
                  </span>
                </div>
                <div className="flex-1 bg-[#fcf9f8] p-4 rounded-xl border border-[#E2E0DB]/60">
                  <p className="font-body text-sm text-[#1c1b1b] mb-2 leading-relaxed">
                    "{remark.content}"
                  </p>
                  <p className="text-[11px] text-on-surface-variant font-medium flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {new Date(remark.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-on-surface-variant font-medium">
              No teacher remarks available for this term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
