import Image from "next/image";

export default function TeacherPortalDashboard() {
  return (
    <>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-[36px] font-bold text-[#00386b] mb-1 leading-tight">Welcome back, Dr. Sharma</h1>
            <p className="text-[18px] text-[#555555]">Class Teacher, XII-B • Thursday, Oct 24, 2023</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#00386b] text-white px-6 py-4 rounded-lg flex items-center gap-4 text-[14px] font-medium shadow-sm hover:-translate-y-px transition-transform active:scale-95">
              <span className="material-symbols-outlined">how_to_reg</span>
              Mark Attendance
            </button>
            <button className="border-2 border-[#00386b] text-[#00386b] px-6 py-4 rounded-lg flex items-center gap-4 text-[14px] font-medium hover:bg-[#E6F1FB] transition-colors active:scale-95">
              <span className="material-symbols-outlined">edit_note</span>
              Enter Marks
            </button>
          </div>
        </div>

        {/* Bento Grid Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-48">
          <div className="col-span-1 bg-white border border-[#E2E0DB] rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-default">
            <div className="flex justify-between items-start">
              <div className="bg-[#FAEEDA] p-2 rounded-lg">
                <span className="material-symbols-outlined text-[#633806]">assignment_late</span>
              </div>
              <span className="text-[12px] text-[#633806] bg-[#FAEEDA] px-2 py-0.5 rounded-full font-medium">High Priority</span>
            </div>
            <div>
              <p className="text-[28px] font-semibold text-[#633806] leading-tight">12</p>
              <p className="text-[14px] text-[#424750] font-medium">Pending Homeworks</p>
            </div>
          </div>
          <div className="col-span-1 bg-white border border-[#E2E0DB] rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-default">
            <div className="flex justify-between items-start">
              <div className="bg-[#E1F5EE] p-2 rounded-lg">
                <span className="material-symbols-outlined text-[#085041]">mail</span>
              </div>
              <span className="text-[12px] text-[#085041] bg-[#E1F5EE] px-2 py-0.5 rounded-full font-medium">New</span>
            </div>
            <div>
              <p className="text-[28px] font-semibold text-[#085041] leading-tight">04</p>
              <p className="text-[14px] text-[#424750] font-medium">Unread Notices</p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 relative overflow-hidden rounded-xl bg-[#0C447C] p-6 flex flex-col justify-center text-white group">
            <div className="relative z-10">
              <p className="text-[14px] font-medium opacity-80 uppercase tracking-widest mb-1">Weekly Average</p>
              <p className="text-[48px] font-bold leading-tight">94% <span className="text-[22px] opacity-90 text-[#7ed0b3]">↑ 2%</span></p>
              <p className="text-[14px] mt-2 opacity-90">Class Attendance performance remains stable across all periods.</p>
            </div>
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[160px]">insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Timeline & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Today's Timeline */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-semibold text-[#00386b] flex items-center gap-4">
              <span className="material-symbols-outlined">schedule</span>
              Today's Timeline
            </h2>
            <button className="text-[#00386b] text-[14px] font-medium hover:underline">View Monthly Calendar</button>
          </div>
          <div className="space-y-4">
            {/* Timeline Item 1 */}
            <div className="bg-white/70 backdrop-blur-md border border-[#E2E0DB]/50 p-6 rounded-xl flex gap-6 items-center group transition-all duration-300 hover:bg-white hover:border-[#00386b] border-l-4 border-l-[#085041]">
              <div className="text-center min-w-[80px]">
                <p className="text-[18px] font-semibold text-[#085041]">08:30</p>
                <p className="text-[12px] text-[#424750]">AM</p>
              </div>
              <div className="flex-grow">
                <h4 className="text-[18px] font-semibold text-[#1c1b1b]">Morning Assembly</h4>
                <p className="text-[14px] text-[#424750]">Central Courtyard • Mandatory</p>
              </div>
              <div className="flex items-center">
                <span className="bg-[#3B6D11] text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Completed</span>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="bg-[#E6F1FB] border border-[#E2E0DB]/50 p-6 rounded-xl flex gap-6 items-center border-l-4 border-l-[#00386b] shadow-sm">
              <div className="text-center min-w-[80px]">
                <p className="text-[18px] font-semibold text-[#00386b]">10:15</p>
                <p className="text-[12px] text-[#424750]">AM</p>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="text-[18px] font-semibold text-[#1c1b1b]">Mathematics: Calculus</h4>
                  <span className="bg-[#00386b] text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Now</span>
                </div>
                <p className="text-[14px] text-[#424750]">Class XII-B • Room 402</p>
              </div>
              <div className="flex gap-4">
                <button className="material-symbols-outlined text-[#00386b] hover:bg-white p-2 rounded-full transition-colors">video_call</button>
                <button className="material-symbols-outlined text-[#00386b] hover:bg-white p-2 rounded-full transition-colors">upload_file</button>
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="bg-white/70 backdrop-blur-md border border-[#E2E0DB]/50 p-6 rounded-xl flex gap-6 items-center border-l-4 border-l-[#737781] opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="text-center min-w-[80px]">
                <p className="text-[18px] font-semibold text-[#424750]">11:45</p>
                <p className="text-[12px] text-[#424750]">AM</p>
              </div>
              <div className="flex-grow">
                <h4 className="text-[18px] font-semibold text-[#1c1b1b]">Physics Lab Session</h4>
                <p className="text-[14px] text-[#424750]">Science Wing • Grade XI-C</p>
              </div>
              <div className="flex items-center">
                <span className="text-[#424750] text-[10px] px-2 py-1 rounded border border-[#737781] font-bold uppercase">Upcoming</span>
              </div>
            </div>
            {/* Timeline Item 4 */}
            <div className="bg-white/70 backdrop-blur-md border border-[#E2E0DB]/50 p-6 rounded-xl flex gap-6 items-center border-l-4 border-l-[#737781] opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="text-center min-w-[80px]">
                <p className="text-[18px] font-semibold text-[#424750]">02:30</p>
                <p className="text-[12px] text-[#424750]">PM</p>
              </div>
              <div className="flex-grow">
                <h4 className="text-[18px] font-semibold text-[#1c1b1b]">Parent-Teacher Meeting</h4>
                <p className="text-[14px] text-[#424750]">Virtual • Mrs. Gupta (XII-B)</p>
              </div>
              <div className="flex items-center">
                <span className="text-[#424750] text-[10px] px-2 py-1 rounded border border-[#737781] font-bold uppercase">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Staff Resources & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E2E0DB] rounded-xl p-6">
            <h3 className="text-[18px] font-semibold text-[#00386b] mb-4">Announcements</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#f6f3f2] border-l-4 border-[#993C1D]">
                <p className="text-[14px] font-semibold text-[#1c1b1b]">Mid-Term Syllabus Deadline</p>
                <p className="text-[12px] text-[#424750] mt-1">Please ensure all syllabi are uploaded by tomorrow EOD.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#f6f3f2] border-l-4 border-[#085041]">
                <p className="text-[14px] font-semibold text-[#1c1b1b]">Teacher's Day Prep</p>
                <p className="text-[12px] text-[#424750] mt-1">Staff meeting at 4 PM in the lounge.</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden h-64 shadow-lg group">
            <img 
              alt="Digital Resources" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-[22px] font-semibold">Digital Resources</h3>
              <p className="text-white/80 text-[14px] mb-4">Access your academic guides, rubrics, and digital library.</p>
              <button className="bg-white text-[#0C447C] py-2 px-6 rounded-lg text-[14px] font-medium w-fit hover:bg-[#E6F1FB] transition-colors">Explore Assets</button>
            </div>
          </div>

          <div className="bg-white border border-[#E2E0DB] rounded-xl p-6">
            <h3 className="text-[18px] font-semibold text-[#00386b] mb-4">Quick Tasks</h3>
            <div className="space-y-2 flex flex-col">
              <label className="flex items-center gap-3 p-2 hover:bg-[#f6f3f2] rounded-lg transition-colors cursor-pointer">
                <input className="w-5 h-5 rounded border-[#E2E0DB] text-[#00386b] focus:ring-[#00386b]/20" type="checkbox"/>
                <span className="text-[14px]">Approve Leave Requests (3)</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-[#f6f3f2] rounded-lg transition-colors cursor-pointer">
                <input className="w-5 h-5 rounded border-[#E2E0DB] text-[#00386b] focus:ring-[#00386b]/20" type="checkbox"/>
                <span className="text-[14px]">Submit Attendance for XI-A</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-[#f6f3f2] rounded-lg transition-colors cursor-pointer">
                <input defaultChecked className="w-5 h-5 rounded border-[#E2E0DB] text-[#00386b] focus:ring-[#00386b]/20" type="checkbox"/>
                <span className="text-[14px] line-through text-[#424750]">Update Lesson Plan (Grade XII)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
