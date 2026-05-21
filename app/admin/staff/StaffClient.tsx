"use client";
// app/admin/staff/StaffClient.tsx
import { useState, useMemo } from "react";
import Link from "next/link";

type StaffMember = {
  id: string; name: string; designation: string | null; empCode: string | null;
  photo: string | null; qualification: string | null; isActive: boolean;
  dateOfJoining: Date | null; user: { email: string };
};

interface Props { staff: StaffMember[]; }

export default function StaffClient({ staff }: Props) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() =>
    staff.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.designation ?? "").toLowerCase().includes(search.toLowerCase())),
    [staff, search]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Staff Management</h1>
          <p className="text-sm text-on-surface-variant">Manage teaching and non-teaching staff records.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="p-2.5 bg-white border border-outline-variant rounded-lg hover:bg-[#f6f3f2] transition-all">
            <span className="material-symbols-outlined">{view === "grid" ? "view_list" : "grid_view"}</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
            <span className="material-symbols-outlined">person_add</span>Add Staff
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-primary-fixed/30 rounded-lg w-fit mb-2"><span className="material-symbols-outlined text-primary">badge</span></div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Total Staff</p>
          <p className="text-xl font-bold text-on-surface mt-1">{staff.length}</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-tertiary-fixed/30 rounded-lg w-fit mb-2"><span className="material-symbols-outlined text-tertiary-container">person_check</span></div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Active</p>
          <p className="text-xl font-bold text-on-surface mt-1">{staff.filter(s => s.isActive).length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
        <input className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
          placeholder="Search staff by name or designation..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-outline-variant rounded-xl py-16 text-center text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-5xl block mb-2 text-outline">badge</span>
          No staff records found.
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((s) => (
            <div key={s.id} className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center mb-3 text-primary font-bold text-xl group-hover:bg-primary-fixed/30 transition-colors">
                  {s.photo ? <img src={s.photo} alt={s.name} className="w-16 h-16 rounded-full object-cover" /> : s.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-bold text-sm text-on-surface">{s.name}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">{s.designation ?? "Staff"}</p>
                {s.empCode && <p className="text-xs text-outline font-mono mt-1">#{s.empCode}</p>}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.isActive ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-[#eae7e7] text-outline"}`}>
                  {s.isActive ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-primary-fixed/20 rounded-lg transition-all text-on-surface-variant hover:text-primary">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f3f2] border-b border-outline-variant">
                {["Name", "Designation", "Emp Code", "Email", "Status", "Actions"].map(h =>
                  <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-[#f6f3f2] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        {s.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-on-surface">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{s.designation ?? "—"}</td>
                  <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">{s.empCode ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{s.user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${s.isActive ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-[#eae7e7] text-outline"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-primary-fixed/20 rounded-lg transition-all text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
