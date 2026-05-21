"use client";
// app/admin/admissions/AdmissionsClient.tsx
import { useState, useMemo, useTransition } from "react";

type Enquiry = {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  status: string;
  createdAt: Date;
};

interface Props {
  enquiries: Enquiry[];
  stats: { total: number; pending: number; enrolled: number; called: number };
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-[#eae7e7] text-outline",
  NEW:       "bg-[#eae7e7] text-outline",
  CALLED:    "bg-primary-fixed/30 text-primary",
  CONTACTED: "bg-primary-fixed/30 text-primary",
  ENROLLED:  "bg-tertiary-fixed/30 text-tertiary-container",
  CONVERTED: "bg-tertiary-fixed/30 text-tertiary-container",
  REJECTED:  "bg-error-container text-error",
};

export default function AdmissionsClient({ enquiries, stats }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const filtered = useMemo(() =>
    enquiries.filter((e) => {
      const q = search.toLowerCase();
      const match = !q || e.studentName.toLowerCase().includes(q) || e.phone.includes(q) || e.parentName.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || e.status === statusFilter;
      return match && matchStatus;
    }), [enquiries, search, statusFilter]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Admissions</h1>
          <p className="text-sm text-on-surface-variant">Manage enquiries, track status and convert to enrollments.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
          <span className="material-symbols-outlined">add</span>
          New Enquiry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Enquiries", value: stats.total, icon: "group_add", color: "bg-primary-fixed/30 text-primary" },
          { label: "Pending", value: stats.pending, icon: "hourglass_empty", color: "bg-[#eae7e7] text-outline" },
          { label: "Called / Contacted", value: stats.called, icon: "phone_in_talk", color: "bg-primary-fixed/30 text-primary" },
          { label: "Enrolled", value: stats.enrolled, icon: "how_to_reg", color: "bg-tertiary-fixed/30 text-tertiary-container" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
            <div className={`p-2 rounded-lg w-fit mb-2 ${s.color}`}><span className="material-symbols-outlined">{s.icon}</span></div>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">{s.label}</p>
            <p className="text-xl font-bold text-on-surface mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-outline-variant rounded-t-xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
          <input className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border border-outline-variant/30 rounded-lg focus:ring-1 focus:ring-primary text-sm outline-none"
            placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#f6f3f2] border border-outline-variant/30 rounded-lg px-3 py-2 text-sm outline-none">
          <option value="All">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CALLED">Called</option>
          <option value="ENROLLED">Enrolled</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-b border-outline-variant rounded-b-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f6f3f2] border-b border-outline-variant">
              {["Student Name", "Parent Name", "Phone", "Grade Applied", "Date", "Status", "Actions"].map(h =>
                <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-16 text-center text-sm text-on-surface-variant">No enquiries found.</td></tr>
            ) : filtered.map((e) => (
              <tr key={e.id} className="hover:bg-[#f6f3f2] transition-colors cursor-pointer" onClick={() => setSelected(e)}>
                <td className="px-6 py-4 text-sm font-semibold text-on-surface">{e.studentName}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{e.parentName}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{e.phone}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Class {e.grade}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{new Date(e.createdAt).toLocaleDateString("en-IN")}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[e.status] ?? "bg-[#eae7e7] text-outline"}`}>
                    {e.status.charAt(0) + e.status.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-all"
                    onClick={(ev) => { ev.stopPropagation(); setSelected(e); }}>
                    <span className="material-symbols-outlined text-xl">open_in_new</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <aside className="w-[400px] bg-white shadow-2xl flex flex-col overflow-y-auto">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h2 className="font-bold text-lg text-primary">Enquiry Details</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4 flex-1">
              <div className="w-16 h-16 bg-primary-fixed/20 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">person</span>
              </div>
              {[
                { label: "Student Name", value: selected.studentName },
                { label: "Parent Name", value: selected.parentName },
                { label: "Email", value: selected.email },
                { label: "Phone", value: selected.phone },
                { label: "Grade Applied", value: `Class ${selected.grade}` },
                { label: "Enquiry Date", value: new Date(selected.createdAt).toLocaleDateString("en-IN") },
                { label: "Current Status", value: selected.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-bold text-outline uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-on-surface font-medium mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-outline-variant space-y-2">
              <button className="w-full py-3 bg-tertiary-fixed/30 text-tertiary-container font-bold rounded-lg hover:bg-tertiary-fixed/50 transition-all text-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">how_to_reg</span>Enroll Student
              </button>
              <button className="w-full py-3 bg-primary-fixed/20 text-primary font-bold rounded-lg hover:bg-primary-fixed/30 transition-all text-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">call</span>Mark as Called
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
