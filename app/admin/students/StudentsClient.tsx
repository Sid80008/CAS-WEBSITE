"use client";
// app/admin/students/StudentsClient.tsx
import { useState, useMemo } from "react";
import Link from "next/link";
import type { Student } from "@prisma/client";

interface Props {
  students: Student[];
  stats: { total: number; active: number; tcIssued: number };
}

function initials(s: Student) {
  return `${s.firstName[0]}${s.lastName[0]}`.toUpperCase();
}

function statusBadge(status: string) {
  switch (status) {
    case "ACTIVE":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed/30 text-tertiary-container">Active</span>;
    case "TC_ISSUED":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eae7e7] text-outline">TC Issued</span>;
    case "DETAINED":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-error">Detained</span>;
    default:
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eae7e7] text-outline">{status}</span>;
  }
}

export default function StudentsClient({ students, stats }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.admissionNo.toLowerCase().includes(q) ||
        (s.parentName ?? "").toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Active" && s.status === "ACTIVE") ||
        (statusFilter === "TC Issued" && s.status === "TC_ISSUED") ||
        (statusFilter === "Detained" && s.status === "DETAINED");
      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Student Management</h1>
          <p className="text-sm text-on-surface-variant">View and manage all student records, academic progress and statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {/* TODO: export CSV */}}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-surface-container-low transition-all text-sm"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            Export CSV
          </button>
          <Link
            href="/admin/students/new"
            className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Add Student
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-primary-fixed/30 rounded-lg text-primary">
              <span className="material-symbols-outlined">groups</span>
            </div>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Total Students</p>
          <p className="text-xl font-bold text-on-surface">{stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-tertiary-fixed/40 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">person_check</span>
            </div>
            <span className="text-xs text-on-tertiary-container font-semibold">
              {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% rate
            </span>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Active Students</p>
          <p className="text-xl font-bold text-on-surface">{stats.active.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-secondary-fixed/50 rounded-lg text-secondary">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">TC Issued</p>
          <p className="text-xl font-bold text-on-surface">{stats.tcIssued}</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-error-container rounded-lg text-error-red">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="text-xs text-error-red font-semibold">Check records</span>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Search Results</p>
          <p className="text-xl font-bold text-on-surface">{filtered.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-outline-variant rounded-t-xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border border-outline-variant/30 rounded-lg focus:ring-1 focus:ring-primary text-sm outline-none"
            placeholder="Filter by name or admission no..."
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-on-surface-variant">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-[#f6f3f2] border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>TC Issued</option>
            <option>Detained</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-b border-outline-variant rounded-b-xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f6f3f2] border-b border-outline-variant">
              {["Adm No", "Student Name", "Status", "Parent / Guardian", "Phone", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
                    <p className="text-sm font-medium">No students found{search ? ` for "${search}"` : ""}.</p>
                    <Link href="/admin/students/new" className="text-sm text-primary font-bold hover:underline">
                      + Add your first student
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((s) => (
                <tr key={s.id} className="hover:bg-[#f6f3f2] transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">#{s.admissionNo}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                        {initials(s)}
                      </div>
                      <span className="text-sm font-semibold text-on-surface">{s.firstName} {s.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{statusBadge(s.status)}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{s.parentName ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{s.parentPhone ?? "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/students/${s.id}`}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-all"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </Link>
                      <Link
                        href={`/admin/students/${s.id}/edit`}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-all"
                        title="Edit Student"
                      >
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-outline-variant">
          <p className="text-sm text-on-surface-variant">
            Showing <span className="font-bold text-on-surface">{Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span className="font-bold text-on-surface">{filtered.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="p-2 rounded-lg hover:bg-[#eae7e7] text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">first_page</span>
            </button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg hover:bg-[#eae7e7] text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`px-3 py-1 rounded-md text-sm ${n === page ? "bg-primary text-white font-bold" : "text-on-surface-variant hover:bg-[#eae7e7]"}`}
                >
                  {n}
                </button>
              );
            })}
            <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="p-2 rounded-lg hover:bg-[#eae7e7] text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <button onClick={() => setPage(pageCount)} disabled={page === pageCount} className="p-2 rounded-lg hover:bg-[#eae7e7] text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">last_page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
