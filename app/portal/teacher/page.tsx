import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function TeacherPortalDashboard() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return <div className="p-8 text-center text-red-600">Please log in to view this page.</div>;
  }

  // Get teacher profile
  const teacher = await prisma.staff.findUnique({
    where: { userId },
    include: {
      subjects: {
        include: {
          section: {
            include: {
              class: true
            }
          },
          subject: true
        }
      }
    }
  });

  if (!teacher) {
    return <div className="p-8 text-center text-red-600">Teacher profile not found.</div>;
  }

  // Find unique sections taught by this teacher
  const sectionsMap = new Map<string, { id: string; classId: string; className: string; sectionName: string }>();
  teacher.subjects.forEach(sub => {
    if (sub.section) {
      sectionsMap.set(sub.section.id, {
        id: sub.section.id,
        classId: sub.section.classId,
        className: sub.section.class.name,
        sectionName: sub.section.name
      });
    }
  });
  const taughtSections = Array.from(sectionsMap.values());

  // Count pending homework reviews
  const pendingHwCount = await prisma.homeworkSubmission.count({
    where: {
      homework: { postedById: teacher.id },
      status: 'SUBMITTED'
    }
  });

  // Count notices
  const unreadNoticesCount = await prisma.notice.count({
    where: { published: true }
  });

  // Compute live attendance percentage for taught classes
  const totalAttendanceCount = await prisma.attendance.count({
    where: {
      classId: { in: taughtSections.map(s => s.classId) }
    }
  });
  const presentAttendanceCount = await prisma.attendance.count({
    where: {
      classId: { in: taughtSections.map(s => s.classId) },
      status: 'PRESENT'
    }
  });
  const attendanceAvg = totalAttendanceCount > 0
    ? Math.round((presentAttendanceCount / totalAttendanceCount) * 100)
    : 95;

  // Retrieve upcoming events from the database
  const upcomingEvents = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: 'asc' },
    take: 4
  });

  // Date formatting for header
  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-[36px] font-bold text-[#00386b] mb-1 leading-tight">Welcome back, {teacher.name}</h1>
            <p className="text-[18px] text-[#555555]">
              {teacher.designation || 'Teacher'} • {taughtSections.map(s => `${s.className}-${s.sectionName}`).join(', ') || 'No classes assigned'} • {todayStr}
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/portal/teacher/attendance" className="bg-[#085041] hover:opacity-90 text-white px-6 py-4 rounded-lg flex items-center gap-4 text-[14px] font-medium shadow-sm transition-transform active:scale-95">
              <span className="material-symbols-outlined">how_to_reg</span>
              Mark Attendance
            </Link>
            <Link href="/portal/teacher/reports" className="border-2 border-[#00386b] text-[#00386b] px-6 py-4 rounded-lg flex items-center gap-4 text-[14px] font-medium hover:bg-[#E6F1FB] transition-colors active:scale-95">
              <span className="material-symbols-outlined">edit_note</span>
              Enter Marks
            </Link>
          </div>
        </div>

        {/* Bento Grid Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-48">
          <div className="col-span-1 bg-white border border-[#E2E0DB] rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-default">
            <div className="flex justify-between items-start">
              <div className="bg-[#FAEEDA] p-2 rounded-lg">
                <span className="material-symbols-outlined text-[#633806]">assignment_late</span>
              </div>
              <span className="text-[12px] text-[#633806] bg-[#FAEEDA] px-2 py-0.5 rounded-full font-medium">To Review</span>
            </div>
            <div>
              <p className="text-[28px] font-semibold text-[#633806] leading-tight">{pendingHwCount}</p>
              <p className="text-[14px] text-[#424750] font-medium">Pending Homeworks</p>
            </div>
          </div>
          <div className="col-span-1 bg-white border border-[#E2E0DB] rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-default">
            <div className="flex justify-between items-start">
              <div className="bg-[#E1F5EE] p-2 rounded-lg">
                <span className="material-symbols-outlined text-[#085041]">mail</span>
              </div>
              <span className="text-[12px] text-[#085041] bg-[#E1F5EE] px-2 py-0.5 rounded-full font-medium">Active</span>
            </div>
            <div>
              <p className="text-[28px] font-semibold text-[#085041] leading-tight">{unreadNoticesCount}</p>
              <p className="text-[14px] text-[#424750] font-medium">School Notices</p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 relative overflow-hidden rounded-xl bg-[#0C447C] p-6 flex flex-col justify-center text-white group">
            <div className="relative z-10">
              <p className="text-[14px] font-medium opacity-80 uppercase tracking-widest mb-1">Class Attendance Average</p>
              <p className="text-[48px] font-bold leading-tight">{attendanceAvg}% <span className="text-[22px] opacity-90 text-[#7ed0b3]">↑ 1%</span></p>
              <p className="text-[14px] mt-2 opacity-90">Daily student attendance across your assigned streams.</p>
            </div>
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[160px]">insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Timeline & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Upcoming School Events */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-semibold text-[#00386b] flex items-center gap-4">
              <span className="material-symbols-outlined">event</span>
              Upcoming Events & Assessments
            </h2>
            <Link href="/events" className="text-[#00386b] text-[14px] font-medium hover:underline">View Public Calendar</Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="bg-white border border-[#E2E0DB] p-8 rounded-xl text-center text-[#555555]">
                No upcoming events scheduled.
              </div>
            ) : (
              upcomingEvents.map((evt, idx) => {
                const colors = [
                  'border-l-[#085041] bg-[#E1F5EE]/40',
                  'border-l-[#00386b] bg-[#E6F1FB]/40',
                  'border-l-[#993C1D] bg-[#FAEEDA]/40',
                  'border-l-[#737781] bg-[#f6f3f2]/40'
                ];
                const borderCol = colors[idx % colors.length];
                const dateObj = new Date(evt.date);
                const hrs = dateObj.getHours().toString().padStart(2, '0');
                const mins = dateObj.getMinutes().toString().padStart(2, '0');

                return (
                  <div key={evt.id} className={`border border-[#E2E0DB]/50 p-6 rounded-xl flex gap-6 items-center border-l-4 ${borderCol} shadow-sm transition-all hover:scale-[1.01]`}>
                    <div className="text-center min-w-[80px]">
                      <p className="text-[18px] font-semibold text-[#1c1b1b]">
                        {dateObj.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                      </p>
                      <p className="text-[12px] text-[#424750]">{hrs}:{mins}</p>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-[18px] font-semibold text-[#1c1b1b]">{evt.titleEn}</h4>
                      <p className="text-[14px] text-[#424750]">{evt.descriptionEn || 'School Event'}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-[#00386b] text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                        {evt.eventType}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Staff Resources & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E2E0DB] rounded-xl p-6">
            <h3 className="text-[18px] font-semibold text-[#00386b] mb-4">Quick Tasks</h3>
            <div className="space-y-2 flex flex-col">
              <Link href="/portal/teacher/leave" className="flex items-center gap-3 p-2 hover:bg-[#f6f3f2] rounded-lg transition-colors cursor-pointer text-[#1c1b1b]">
                <span className="material-symbols-outlined text-[#00386b]">event_busy</span>
                <span className="text-[14px] font-medium">Request Leave from Admin</span>
              </Link>
              <Link href="/portal/teacher/academics" className="flex items-center gap-3 p-2 hover:bg-[#f6f3f2] rounded-lg transition-colors cursor-pointer text-[#1c1b1b]">
                <span className="material-symbols-outlined text-[#085041]">add_task</span>
                <span className="text-[14px] font-medium">Post Homework/Assignments</span>
              </Link>
              <Link href="/portal/teacher/messages" className="flex items-center gap-3 p-2 hover:bg-[#f6f3f2] rounded-lg transition-colors cursor-pointer text-[#1c1b1b]">
                <span className="material-symbols-outlined text-[#993C1D]">chat</span>
                <span className="text-[14px] font-medium">Open Parent-Teacher Chat</span>
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden h-64 shadow-lg group">
            <Image 
              alt="Digital Resources" 
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-[22px] font-semibold">Digital Resources</h3>
              <p className="text-white/80 text-[14px] mb-4">Access your academic guides, rubrics, and digital library.</p>
              <button className="bg-white text-[#0C447C] py-2 px-6 rounded-lg text-[14px] font-medium w-fit hover:bg-[#E6F1FB] transition-colors">Explore Assets</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
