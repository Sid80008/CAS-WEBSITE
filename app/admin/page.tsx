// app/admin/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [totalStudents, activeStudents, pendingAdmissions, recentNotices, upcomingEvents, pendingFees] = await Promise.all([
    prisma.student.count(),
    prisma.student.count({ where: { status: "ACTIVE" } }),
    prisma.admission.count({ where: { status: "PENDING" } }),
    prisma.notice.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.event.findMany({ where: { date: { gte: new Date() }, published: true }, orderBy: { date: "asc" }, take: 5 }),
    prisma.feeRecord.count({ where: { status: { in: ["PENDING", "OVERDUE"] } } }),
  ]);

  const quickActions = [
    { label: "Add Student", icon: "person_add", href: "/admin/students/new", color: "bg-primary-fixed/20 text-primary" },
    { label: "Record Fee", icon: "payments", href: "/admin/fees", color: "bg-secondary-fixed/30 text-secondary" },
    { label: "Mark Attendance", icon: "event_available", href: "/admin/attendance", color: "bg-tertiary-fixed/30 text-tertiary-container" },
    { label: "Post Notice", icon: "campaign", href: "/admin/notices", color: "bg-error-container text-error" },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-primary mb-1">Dashboard</h1>
        <p className="text-sm text-on-surface-variant">Welcome back. Here's what's happening at Central Academy today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-primary-fixed/30 rounded-lg"><span className="material-symbols-outlined text-primary">groups</span></div>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Total Students</p>
          <p className="text-2xl font-bold text-on-surface mt-1">{totalStudents.toLocaleString()}</p>
          <p className="text-xs text-on-surface-variant mt-1">{activeStudents} active</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-tertiary-fixed/40 rounded-lg"><span className="material-symbols-outlined text-tertiary-container">payments</span></div>
            {pendingFees > 0 && <span className="text-xs text-error font-bold">{pendingFees} pending</span>}
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Fee Collection</p>
          <p className="text-2xl font-bold text-on-surface mt-1">—</p>
          <Link href="/admin/fees" className="text-xs text-primary font-semibold hover:underline mt-1 block">View all dues →</Link>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-secondary-fixed/30 rounded-lg"><span className="material-symbols-outlined text-secondary">how_to_reg</span></div>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Pending Admissions</p>
          <p className="text-2xl font-bold text-on-surface mt-1">{pendingAdmissions}</p>
          <Link href="/admin/admissions" className="text-xs text-primary font-semibold hover:underline mt-1 block">Review enquiries →</Link>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-error-container rounded-lg"><span className="material-symbols-outlined text-error">event</span></div>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Upcoming Events</p>
          <p className="text-2xl font-bold text-on-surface mt-1">{upcomingEvents.length}</p>
          <Link href="/admin/events" className="text-xs text-primary font-semibold hover:underline mt-1 block">View calendar →</Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">bolt</span> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl ${a.color} hover:opacity-80 transition-all text-center`}
              >
                <span className="material-symbols-outlined text-3xl">{a.icon}</span>
                <span className="text-xs font-bold">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">campaign</span> Recent Notices
            </h2>
            <Link href="/admin/notices" className="text-xs text-primary font-bold hover:underline">View all</Link>
          </div>
          {recentNotices.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant text-sm">No notices posted yet.</div>
          ) : (
            <div className="space-y-3">
              {recentNotices.map((n) => (
                <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#f6f3f2]">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">article</span>
                  <div>
                    <p className="text-sm font-semibold text-on-surface line-clamp-1">{n.titleEn}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {n.targetRole} · {new Date(n.createdAt).toLocaleDateString("en-IN")}
                      {n.isPinned && <span className="ml-2 text-secondary font-bold">📌 Pinned</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">event</span> Upcoming Events
            </h2>
            <Link href="/admin/events" className="text-xs text-primary font-bold hover:underline">View all</Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant text-sm">No upcoming events.</div>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((e) => {
                const typeColor: Record<string, string> = {
                  EXAM: "bg-error-container text-error",
                  HOLIDAY: "bg-tertiary-fixed/30 text-tertiary-container",
                  SPORTS: "bg-secondary-fixed/30 text-secondary",
                  CULTURAL: "bg-primary-fixed/30 text-primary",
                  MEETING: "bg-[#eae7e7] text-outline",
                  OTHER: "bg-[#eae7e7] text-outline",
                };
                return (
                  <div key={e.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#f6f3f2]">
                    <div className="text-center min-w-[36px]">
                      <p className="text-xs font-bold text-primary">{new Date(e.date).toLocaleDateString("en-IN", { month: "short" })}</p>
                      <p className="text-lg font-bold text-primary leading-none">{new Date(e.date).getDate()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface line-clamp-1">{e.titleEn}</p>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${typeColor[e.eventType] ?? typeColor.OTHER}`}>
                        {e.eventType}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-8 bg-primary-container rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-on-primary-container mb-1">Need help managing the school?</h3>
          <p className="text-sm text-on-primary-container/70">Use the sidebar to navigate to Students, Fees, Attendance, Staff and more.</p>
        </div>
        <Link href="/admin/students/new" className="flex items-center gap-2 px-6 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all whitespace-nowrap">
          <span className="material-symbols-outlined">person_add</span> Add Student
        </Link>
      </div>
    </div>
  );
}
