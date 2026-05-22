"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Student } from "@prisma/client";
import { bulkUploadStudents } from "@/app/actions/bulkActions";

interface Props {
  students: Student[];
  stats: { total: number; active: number; tcIssued: number; feePaidPercentage: number; attendanceAlerts: number };
  filteredCount: number;
  currentPage: number;
  searchQuery: string;
  statusQuery: string;
}

function initials(s: Student) {
  return `${s.firstName[0]}${s.lastName[0]}`.toUpperCase();
}

function statusBadge(status: string) {
  switch (status) {
    case "ACTIVE":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed/30 text-tertiary-container">Active</span>;
    case "TC_ISSUED":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-fixed/30 text-secondary">On Leave</span>;
    case "DETAINED":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-error">Suspended</span>;
    default:
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-outline-variant/30 text-outline">{status}</span>;
  }
}

export default function StudentsClient({ students, stats, filteredCount, currentPage, searchQuery, statusQuery }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const PAGE_SIZE = 10;
  const pageCount = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 when changing filters
    if (key !== 'page') params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const downloadCsv = () => {
    if (!students || students.length === 0) return;
    
    const headers = ["Admission No", "First Name", "Last Name", "Status", "Parent Name", "Parent Phone"].join(',');
    const rows = students.map(s => [
      s.admissionNo,
      s.firstName,
      s.lastName,
      s.status,
      s.parentName || "",
      s.parentPhone || ""
    ].join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `students_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("csvFile", file);
      try {
        await bulkUploadStudents(formData);
        alert("Bulk upload successful!");
      } catch (err: any) {
        alert("Error during bulk upload: " + err.message);
      }
      e.target.value = ""; // reset
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Hidden File Input for Bulk Upload */}
      <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-1">Student Management</h1>
          <p className="text-body-md text-on-surface-variant">View and manage all student records, academic progress and statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={downloadCsv} className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined">download</span>
            Export CSV
          </button>
          <Link href="/admin/students/new" className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all">
            <span className="material-symbols-outlined">add</span>
            Add Student
          </Link>
        </div>
      </div>

      {/* Dashboard Stats Row (High-end UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-primary-fixed/30 rounded-lg text-primary">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <span className="text-label-md text-on-surface-variant">+12 this month</span>
          </div>
          <p className="text-label-md font-bold text-outline uppercase tracking-wider">Total Students</p>
          <p className="text-headline-md font-bold text-on-surface">{stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-tertiary-fixed/40 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">person_check</span>
            </div>
            <span className="text-label-md text-on-tertiary-container">{stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% rate</span>
          </div>
          <p className="text-label-md font-bold text-outline uppercase tracking-wider">Active Students</p>
          <p className="text-headline-md font-bold text-on-surface">{stats.active.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-secondary-fixed/50 rounded-lg text-secondary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-label-md text-error">{stats.tcIssued} Pending / Left</span>
          </div>
          <p className="text-label-md font-bold text-outline uppercase tracking-wider">Fee Paid (Overall)</p>
          <p className="text-headline-md font-bold text-on-surface">{stats.feePaidPercentage}%</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-error-container rounded-lg text-error-red">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="text-label-md text-error-red">{stats.attendanceAlerts > 0 ? "Critical" : "Normal"}</span>
          </div>
          <p className="text-label-md font-bold text-outline uppercase tracking-wider">Attendance Alerts</p>
          <p className="text-headline-md font-bold text-on-surface">{stats.attendanceAlerts} Students</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface border border-outline-variant rounded-t-xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline">search</span>
          <form onSubmit={(e) => { e.preventDefault(); updateFilters('q', localSearch); }}>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-sidebar-bg border border-outline-variant/30 rounded-lg focus:ring-1 focus:ring-primary text-body-md" 
              placeholder="Filter by name or ID... (Press Enter)" 
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-md text-on-surface-variant">Status:</span>
          <select 
            value={statusQuery}
            onChange={(e) => updateFilters('status', e.target.value)}
            className="bg-sidebar-bg border border-outline-variant/30 rounded-lg px-3 py-2 text-body-md focus:ring-1 focus:ring-primary outline-none"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </div>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border-x border-b border-outline-variant rounded-b-xl overflow-hidden shadow-sm overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Adm No
                  <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                </div>
              </th>
              <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider">Class-Section</th>
              <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider">Parent/Guardian</th>
              <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {students.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl text-outline mb-2">search_off</span>
                  <p>No students found.</p>
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4 text-body-md font-bold text-primary">#{s.admissionNo}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary font-bold text-xs">{initials(s)}</div>
                      <span className="text-body-md font-semibold text-on-surface">{s.firstName} {s.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-body-md text-on-surface-variant">—</td>
                  <td className="px-6 py-4 text-body-md text-on-surface-variant">{s.parentName ?? "—"}</td>
                  <td className="px-6 py-4 text-body-md text-on-surface-variant">{s.parentPhone ?? "—"}</td>
                  <td className="px-6 py-4">{statusBadge(s.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/students/${s.id}`} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-all" title="View Details">
                        <span className="material-symbols-outlined">visibility</span>
                      </Link>
                      <Link href={`/admin/students/${s.id}/edit`} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-all" title="Edit Profile">
                        <span className="material-symbols-outlined">edit</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-outline-variant">
          <p className="text-body-md text-on-surface-variant">
            Showing <span className="font-bold text-on-surface">{filteredCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, filteredCount)}</span> of <span className="font-bold text-on-surface">{filteredCount}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => updateFilters('page', '1')} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">first_page</span>
            </button>
            <button onClick={() => updateFilters('page', String(Math.max(1, currentPage - 1)))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex items-center px-2">
              {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                const startPage = Math.max(1, currentPage - 2);
                const n = startPage + i;
                if (n > pageCount) return null;
                return (
                  <span
                    key={n}
                    onClick={() => updateFilters('page', String(n))}
                    className={`px-3 py-1 text-body-md rounded-md cursor-pointer ${n === currentPage ? "bg-primary text-white font-bold" : "text-on-surface-variant hover:bg-surface-container-high"}`}
                  >
                    {n}
                  </span>
                );
              })}
            </div>
            <button onClick={() => updateFilters('page', String(Math.min(pageCount, currentPage + 1)))} disabled={currentPage === pageCount || pageCount === 0} className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <button onClick={() => updateFilters('page', String(pageCount))} disabled={currentPage === pageCount || pageCount === 0} className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30">
              <span className="material-symbols-outlined">last_page</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento Info Section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-surface border border-outline-variant rounded-xl p-6 relative overflow-hidden h-64 flex flex-col justify-end group cursor-pointer">
          <div className="absolute inset-0 z-0">
            <img alt="School Campus" className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-700" src="/gallery/photo-dump/1746853764_DSC_3837.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Annual Performance Review</h3>
            <p className="text-body-md text-on-surface-variant max-w-md">Detailed academic metrics and student growth charts for the current session are now available for review.</p>
          </div>
          <span className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur rounded-full text-primary material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
        <div className="bg-primary-container text-on-primary-container rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Quick Actions</h3>
            <ul className="space-y-3 mt-4">
              <li onClick={handleBulkUploadClick} className="flex items-center gap-3 text-body-md group cursor-pointer hover:font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="group-hover:translate-x-1 transition-transform">Bulk Upload Students</span>
              </li>
              <li className="flex items-center gap-3 text-body-md group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="group-hover:translate-x-1 transition-transform">Print ID Cards</span>
              </li>
              <li className="flex items-center gap-3 text-body-md group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="group-hover:translate-x-1 transition-transform">Generate Leaving Certificates</span>
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <button className="w-full py-2 bg-on-primary text-primary-container font-bold rounded-lg hover:bg-surface transition-all">
              View All Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
