"use client";

import { useState, useMemo, useTransition } from "react";
import { approveLeaveRequest, rejectLeaveRequest } from "@/app/actions/leaveActions";

type LeaveRequest = {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
  createdAt: Date;
  staff: {
    name: string;
    designation: string | null;
    empCode: string | null;
  };
};

interface Props {
  leaves: LeaveRequest[];
}

export default function LeavesClient({ leaves }: Props) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return leaves.filter(l => {
      const matchStatus = statusFilter === "All" || l.status === statusFilter;
      const matchSearch = !search || l.staff.name.toLowerCase().includes(search.toLowerCase()) || 
        (l.staff.empCode && l.staff.empCode.toLowerCase().includes(search.toLowerCase()));
      return matchStatus && matchSearch;
    });
  }, [leaves, statusFilter, search]);

  const handleApprove = (id: string) => {
    startTransition(async () => {
      await approveLeaveRequest(id);
    });
  };

  const handleReject = (id: string) => {
    startTransition(async () => {
      await rejectLeaveRequest(id);
    });
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-[#1c1b1b]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-primary mb-1">Leave Requests</h1>
        <p className="text-sm text-on-surface-variant">Review and manage staff leave applications.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-outline-variant rounded-t-xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border border-outline-variant/30 rounded-lg focus:ring-1 focus:ring-primary text-sm outline-none"
            placeholder="Search by staff name or employee code..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#f6f3f2] border border-outline-variant/30 rounded-lg px-3 py-2 text-sm outline-none bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white border-x border-b border-outline-variant rounded-b-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f6f3f2] border-b border-outline-variant">
              {["Staff Name", "Employee Code", "Designation", "Dates", "Duration", "Reason", "Status", "Actions"].map(h =>
                <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center text-sm text-on-surface-variant italic">
                  No leave requests found.
                </td>
              </tr>
            ) : (
              filtered.map((l) => {
                const diffTime = Math.abs(new Date(l.endDate).getTime() - new Date(l.startDate).getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                return (
                  <tr key={l.id} className="hover:bg-[#f6f3f2] transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-on-surface">{l.staff.name}</td>
                    <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">{l.staff.empCode || "—"}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{l.staff.designation || "—"}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {new Date(l.startDate).toLocaleDateString("en-IN")} to {new Date(l.endDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">
                      {diffDays} {diffDays === 1 ? "Day" : "Days"}
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant max-w-[200px] truncate" title={l.reason}>
                      {l.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        l.status === 'APPROVED' ? 'bg-[#E1F5EE] text-[#085041]' :
                        l.status === 'REJECTED' ? 'bg-[#FAEEDA] text-[#633806]' : 'bg-[#F0F6FC] text-[#1B4F8A]'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {l.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(l.id)}
                            disabled={isPending}
                            className="px-3 py-1.5 bg-[#085041] hover:bg-[#063b30] text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1 disabled:opacity-60"
                          >
                            <span className="material-symbols-outlined text-xs">check</span>
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(l.id)}
                            disabled={isPending}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1 disabled:opacity-60"
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Handled</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
