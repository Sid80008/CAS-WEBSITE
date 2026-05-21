"use client";
// app/admin/fees/FeesClient.tsx
import { useState, useMemo, useTransition } from "react";
import { markFeeAsPaid } from "@/app/actions/feeActions";

type FeeRecord = {
  id: string;
  amountDue: number | null;
  amountPaid: number;
  dueDate: Date | null;
  paidDate: Date | null;
  paymentMode: string | null;
  receiptNo: string | null;
  status: string;
  student: { firstName: string; lastName: string; admissionNo: string };
  structure: { feeType: string; name?: string | null };
};

type FeeStructure = {
  id: string;
  name: string | null;
  feeType: string;
  amount: number;
  frequency: string;
  class: { name: string };
};

interface Props {
  records: FeeRecord[];
  structures: FeeStructure[];
  stats: { totalDue: number; totalPaid: number; pending: number; overdue: number };
}

type Tab = "records" | "structures";

function statusBadge(status: string) {
  switch (status) {
    case "PAID":     return <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-tertiary-fixed/30 text-tertiary-container">Paid</span>;
    case "PENDING":  return <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-fixed/30 text-secondary">Pending</span>;
    case "OVERDUE":  return <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-error-container text-error">Overdue</span>;
    case "PARTIAL":  return <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed/30 text-primary">Partial</span>;
    default:         return <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#eae7e7] text-outline">{status}</span>;
  }
}

export default function FeesClient({ records, structures, stats }: Props) {
  const [tab, setTab] = useState<Tab>("records");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const q = search.toLowerCase();
      const name = `${r.student.firstName} ${r.student.lastName}`.toLowerCase();
      const matchSearch = !q || name.includes(q) || r.student.admissionNo.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [records, search, statusFilter]);

  function handleMarkPaid(id: string) {
    startTransition(() => {
      markFeeAsPaid(id);
    });
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Fee Management</h1>
          <p className="text-sm text-on-surface-variant">Track fee structures, payments, dues and receipts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-[#f6f3f2] transition-all text-sm">
            <span className="material-symbols-outlined text-xl">download</span>
            Export
          </button>
          <button
            onClick={() => alert("Record Payment modal — coming soon")}
            className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Record Payment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-error-container rounded-lg text-error w-fit mb-3">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Total Due</p>
          <p className="text-xl font-bold text-error">₹{stats.totalDue.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-tertiary-fixed/30 rounded-lg text-tertiary w-fit mb-3">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Total Collected</p>
          <p className="text-xl font-bold text-tertiary-container">₹{stats.totalPaid.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-secondary-fixed/30 rounded-lg text-secondary w-fit mb-3">
            <span className="material-symbols-outlined">pending</span>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Pending Records</p>
          <p className="text-xl font-bold text-secondary">{stats.pending}</p>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-error-container rounded-lg text-error-red w-fit mb-3">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Overdue</p>
          <p className="text-xl font-bold text-error">{stats.overdue}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-outline-variant mb-0">
        {(["records", "structures"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-sm font-semibold capitalize transition-colors ${
              tab === t
                ? "border-b-2 border-primary text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t === "records" ? "Payment Records" : "Fee Structures"}
          </button>
        ))}
      </div>

      {tab === "records" && (
        <>
          {/* Filter bar */}
          <div className="bg-white border border-outline-variant rounded-t-none rounded-b-none border-t-0 p-4 flex flex-wrap items-center gap-4 border-x">
            <div className="flex-1 min-w-[200px] relative">
              <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border border-outline-variant/30 rounded-lg focus:ring-1 focus:ring-primary text-sm outline-none"
                placeholder="Search by student name or admission no..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-on-surface-variant">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#f6f3f2] border border-outline-variant/30 rounded-lg px-3 py-2 text-sm outline-none"
              >
                <option value="All">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="OVERDUE">Overdue</option>
                <option value="PARTIAL">Partial</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-t-0 border-outline-variant rounded-b-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f6f3f2] border-b border-outline-variant">
                  {["Student", "Fee Type", "Amount Due", "Amount Paid", "Due Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-sm text-on-surface-variant">
                      No fee records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-[#f6f3f2] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-on-surface">{r.student.firstName} {r.student.lastName}</p>
                        <p className="text-xs text-on-surface-variant">#{r.student.admissionNo}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{r.structure.feeType}</td>
                      <td className="px-6 py-4 text-sm font-bold text-error">₹{(r.amountDue ?? 0).toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 text-sm font-bold text-tertiary-container">₹{r.amountPaid.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">
                        {r.dueDate ? new Date(r.dueDate).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td className="px-6 py-4">{statusBadge(r.status)}</td>
                      <td className="px-6 py-4">
                        {r.status !== "PAID" && (
                          <button
                            onClick={() => handleMarkPaid(r.id)}
                            disabled={isPending}
                            className="flex items-center gap-1 px-3 py-1.5 bg-tertiary-fixed/30 text-tertiary-container text-xs font-bold rounded-lg hover:bg-tertiary-fixed/50 transition-all disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            Mark Paid
                          </button>
                        )}
                        {r.status === "PAID" && r.receiptNo && (
                          <span className="text-xs text-on-surface-variant font-mono">#{r.receiptNo}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "structures" && (
        <div className="bg-white border border-t-0 border-outline-variant rounded-b-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f3f2] border-b border-outline-variant">
                {["Name", "Class", "Fee Type", "Amount", "Frequency", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {structures.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-sm text-on-surface-variant">
                    No fee structures configured yet.
                  </td>
                </tr>
              ) : (
                structures.map((s) => (
                  <tr key={s.id} className="hover:bg-[#f6f3f2] transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-on-surface">{s.name ?? s.feeType}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{s.class.name}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{s.feeType}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">₹{s.amount.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant capitalize">{s.frequency.toLowerCase()}</td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-all">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
