"use client";
// app/admin/attendance/AttendanceClient.tsx
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveBulkAttendance } from "@/app/actions/attendanceActions";

type CLS = { id: string; name: string };
type Student = { id: string; firstName: string; lastName: string; admissionNo: string };

interface Props {
  classes: CLS[];
  students: Student[];
  existingAttendance: Record<string, string>;
  selectedClassId: string;
  selectedDate: string;
}

const STATUS_CONFIG = [
  { value: "PRESENT", label: "Present", icon: "check_circle", color: "text-tertiary-container bg-tertiary-fixed/30 border-tertiary-fixed" },
  { value: "ABSENT",  label: "Absent",  icon: "cancel",       color: "text-error bg-error-container border-error/30" },
  { value: "LATE",    label: "Late",    icon: "schedule",      color: "text-secondary bg-secondary-fixed/30 border-secondary-fixed" },
  { value: "LEAVE",   label: "Leave",   icon: "event_busy",   color: "text-outline bg-[#eae7e7] border-outline-variant" },
];

export default function AttendanceClient({ classes, students, existingAttendance, selectedClassId, selectedDate }: Props) {
  const router = useRouter();
  const [statuses, setStatuses] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    students.forEach(s => { init[s.id] = existingAttendance[s.id] ?? "PRESENT"; });
    return init;
  });
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function markAll(status: string) {
    setStatuses(Object.fromEntries(students.map(s => [s.id, status])));
  }

  function handleFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const classId = fd.get("classId") as string;
    const date = fd.get("date") as string;
    router.push(`/admin/attendance?classId=${classId}&date=${date}`);
  }

  async function handleSave() {
    const fd = new FormData();
    fd.append("classId", selectedClassId);
    fd.append("date", selectedDate);
    students.forEach(s => fd.append(`status_${s.id}`, statuses[s.id] ?? "PRESENT"));
    startTransition(async () => {
      await saveBulkAttendance(fd);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  const presentCount = Object.values(statuses).filter(s => s === "PRESENT").length;
  const absentCount = Object.values(statuses).filter(s => s === "ABSENT").length;

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-primary mb-1">Attendance</h1>
        <p className="text-sm text-on-surface-variant">Mark daily attendance for students by class and date.</p>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleFilter} className="bg-white border border-outline-variant rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-base text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">filter_list</span> Select Class & Date
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Class</label>
            <select name="classId" defaultValue={selectedClassId} required
              className="bg-[#f6f3f2] border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary min-w-[180px]">
              <option value="">— Select Class —</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Date</label>
            <input type="date" name="date" defaultValue={selectedDate} required
              className="bg-[#f6f3f2] border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all text-sm">
            <span className="material-symbols-outlined">people</span>Load Students
          </button>
        </div>
      </form>

      {/* Attendance Sheet */}
      {selectedClassId && students.length > 0 && (
        <>
          {/* Stats + Quick Mark */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-tertiary-container inline-block" />
                <span className="font-semibold text-on-surface">{presentCount} Present</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-error inline-block" />
                <span className="font-semibold text-on-surface">{absentCount} Absent</span>
              </div>
              <span className="text-sm text-on-surface-variant">/ {students.length} total</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-on-surface-variant">Mark All:</span>
              {STATUS_CONFIG.map(sc => (
                <button key={sc.value} type="button" onClick={() => markAll(sc.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${sc.color}`}>
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f6f3f2] border-b border-outline-variant">
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">Adm No</th>
                  <th className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {students.map(s => {
                  const current = statuses[s.id] ?? "PRESENT";
                  return (
                    <tr key={s.id} className="hover:bg-[#f6f3f2] transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                            {s.firstName[0]}{s.lastName[0]}
                          </div>
                          <span className="text-sm font-semibold text-on-surface">{s.firstName} {s.lastName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-on-surface-variant">#{s.admissionNo}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {STATUS_CONFIG.map(sc => (
                            <button
                              key={sc.value}
                              type="button"
                              onClick={() => setStatuses(prev => ({ ...prev, [s.id]: sc.value }))}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                current === sc.value ? sc.color : "bg-white text-on-surface-variant border-outline-variant/50 hover:bg-[#f6f3f2]"
                              }`}
                            >
                              <span className="material-symbols-outlined text-base">{sc.icon}</span>
                              <span className="hidden sm:inline">{sc.label}</span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-outline-variant flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className={`flex items-center gap-2 px-8 py-3 font-bold rounded-lg transition-all text-sm ${
                  saved ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-secondary-container text-on-secondary-container hover:opacity-90"
                } disabled:opacity-60`}
              >
                <span className="material-symbols-outlined">{saved ? "check_circle" : "save"}</span>
                {isPending ? "Saving…" : saved ? "Saved!" : "Save Attendance"}
              </button>
            </div>
          </div>
        </>
      )}

      {selectedClassId && students.length === 0 && (
        <div className="bg-white border border-outline-variant rounded-xl py-16 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl block mb-2 text-outline">person_search</span>
          <p className="text-sm">No active students found in this class.</p>
        </div>
      )}

      {!selectedClassId && (
        <div className="bg-white border border-outline-variant rounded-xl py-16 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl block mb-2 text-outline">event_available</span>
          <p className="text-sm font-medium">Select a class and date above to load the attendance sheet.</p>
        </div>
      )}
    </div>
  );
}
