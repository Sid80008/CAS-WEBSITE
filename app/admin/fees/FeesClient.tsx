"use client";
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
  stats: { totalPaidMTD: number; totalDuePending: number; totalOverdue: number; totalDueAll: number; totalPaidAll: number; pendingCount: number; overdueCount: number; };
}

type Tab = "records" | "structures";

function statusBadge(status: string) {
  switch (status) {
    case "PAID":     return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant">Paid</span>;
    case "PENDING":  return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-secondary-fixed text-on-secondary-fixed-variant">Pending</span>;
    case "OVERDUE":  return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-error-container text-on-error-container">Overdue</span>;
    case "PARTIAL":  return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-primary-fixed-dim text-on-primary-fixed-variant">Partial</span>;
    default:         return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-surface-variant text-on-surface-variant">{status}</span>;
  }
}

export default function FeesClient({ records, structures, stats }: Props) {
  const [tab, setTab] = useState<Tab>("records");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const q = search.toLowerCase();
      const name = `${r.student.firstName} ${r.student.lastName}`.toLowerCase();
      return !q || name.includes(q) || r.student.admissionNo.toLowerCase().includes(q);
    });
  }, [records, search]);

  function handleMarkPaid(id: string) {
    startTransition(() => {
      markFeeAsPaid(id);
    });
  }

  const downloadCsv = () => {
    if (!records || records.length === 0) return;
    
    const headers = ["Student Name", "Admission No", "Fee Type", "Status", "Amount Due", "Amount Paid", "Due Date", "Paid Date"].join(',');
    const rows = records.map(r => [
      `${r.student.firstName} ${r.student.lastName}`,
      r.student.admissionNo,
      r.structure.feeType,
      r.status,
      r.amountDue ?? 0,
      r.amountPaid,
      r.dueDate ? new Date(r.dueDate).toLocaleDateString() : "",
      r.paidDate ? new Date(r.paidDate).toLocaleDateString() : ""
    ].join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `fee_records_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printReceipt = () => {
    window.print();
  };

  const collectionRate = stats.totalDueAll > 0 ? (stats.totalPaidAll / stats.totalDueAll) * 100 : 0;

  return (
    <div className="max-w-[1440px] mx-auto font-body-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Fee Management</h1>
          <p className="text-on-surface-variant font-body-lg">Oversee school finances and student billing</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadCsv} className="px-6 py-2 bg-surface-container-lowest border border-outline text-primary rounded-lg font-bold flex items-center gap-2 hover:bg-surface transition-all">
            <span className="material-symbols-outlined">file_download</span>
            Export Report
          </button>
          <button className="px-6 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-all">
            <span className="material-symbols-outlined">add_card</span>
            New Invoice
          </button>
        </div>
      </div>

      {/* Bento Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/70 backdrop-blur-md border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md uppercase tracking-wider text-outline">Total Revenue (MTD)</span>
            <span className="material-symbols-outlined text-teal-accent">trending_up</span>
          </div>
          <div className="font-headline-md text-primary">₹{stats.totalPaidMTD.toLocaleString("en-IN")}</div>
          <div className="text-xs text-on-tertiary-container mt-1 font-medium">This month collection</div>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md uppercase tracking-wider text-outline">Pending Dues</span>
            <span className="material-symbols-outlined text-secondary">pending_actions</span>
          </div>
          <div className="font-headline-md text-primary">₹{stats.totalDuePending.toLocaleString("en-IN")}</div>
          <div className="text-xs text-secondary mt-1 font-medium">{stats.pendingCount} records pending</div>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md uppercase tracking-wider text-outline">Overdue Accounts</span>
            <span className="material-symbols-outlined text-error-red">warning</span>
          </div>
          <div className="font-headline-md text-primary">₹{stats.totalOverdue > 0 ? stats.totalOverdue.toLocaleString("en-IN") : "0"}</div>
          <div className="text-xs text-error-red mt-1 font-medium">Action required: {stats.overdueCount} records</div>
        </div>
        <div className="bg-primary-container text-white p-5 rounded-xl shadow-sm border border-outline-variant">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md uppercase tracking-wider text-on-primary-container">Collection Rate</span>
            <span className="material-symbols-outlined text-on-primary-container">insights</span>
          </div>
          <div className="font-headline-md text-on-primary">{collectionRate.toFixed(1)}%</div>
          <div className="w-full bg-on-primary-container/30 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-secondary-container h-full" style={{ width: `${Math.min(100, collectionRate)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Tabs Container */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        {/* Tab Headers */}
        <div className="flex border-b border-outline-variant bg-sidebar-bg/50">
          <button 
            onClick={() => setTab("structures")}
            className={`px-8 py-4 font-body-md transition-all flex items-center gap-2 ${tab === "structures" ? "border-b-2 border-primary text-primary font-bold" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
            Fee Structures
          </button>
          <button 
            onClick={() => setTab("records")}
            className={`px-8 py-4 font-body-md transition-all flex items-center gap-2 ${tab === "records" ? "border-b-2 border-primary text-primary font-bold" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <span className="material-symbols-outlined text-[20px]">history_edu</span>
            Payment Records
          </button>
        </div>

        {/* Content Area */}
        {tab === "records" && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                  <input 
                    className="pl-10 pr-4 py-2 bg-sidebar-bg border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 w-full md:w-80 text-body-md outline-none" 
                    placeholder="Filter by name, grade, or ID..." 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-label-md text-outline">
                <span>Showing {filtered.length} records</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sidebar-bg border-b border-outline-variant">
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase">Student Details</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase">Fee Type</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase">Status</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase text-right">Amount Paid</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase text-right">Balance Due</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase text-center">Receipt</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center text-on-surface-variant">No records found.</td>
                    </tr>
                  ) : (
                    filtered.map((r) => (
                      <tr key={r.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                              {r.student.firstName[0]}{r.student.lastName[0]}
                            </div>
                            <div>
                              <div className="font-bold text-primary">{r.student.firstName} {r.student.lastName}</div>
                              <div className="text-xs text-outline">#{r.student.admissionNo}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-body-md">{r.structure.feeType}</td>
                        <td className="px-4 py-4">{statusBadge(r.status)}</td>
                        <td className="px-4 py-4 text-right font-bold text-primary">₹{r.amountPaid.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-4 text-right font-bold text-error-red">₹{(r.amountDue ?? 0).toLocaleString("en-IN")}</td>
                        <td className="px-4 py-4 text-center">
                          {r.status === "PAID" && r.receiptNo ? (
                            <button onClick={printReceipt} className="material-symbols-outlined text-primary hover:scale-110 transition-transform">receipt_long</button>
                          ) : (
                            <button className="material-symbols-outlined text-outline cursor-not-allowed" disabled>block</button>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {r.status !== "PAID" && (
                            <button onClick={() => handleMarkPaid(r.id)} disabled={isPending} className="px-3 py-1 bg-primary text-white text-xs rounded-lg hover:bg-primary-container transition-all">
                              Pay
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "structures" && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sidebar-bg border-b border-outline-variant">
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase">Structure Name</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase">Class</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase">Fee Type</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase text-right">Amount</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase text-center">Frequency</th>
                    <th className="px-4 py-3 font-label-md text-label-md text-outline uppercase text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {structures.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-16 text-center text-on-surface-variant">No fee structures.</td>
                    </tr>
                  ) : (
                    structures.map((s) => (
                      <tr key={s.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-4 py-4 font-bold text-primary">{s.name ?? s.feeType}</td>
                        <td className="px-4 py-4 text-body-md">{s.class.name}</td>
                        <td className="px-4 py-4 text-body-md">{s.feeType}</td>
                        <td className="px-4 py-4 text-right font-bold text-primary">₹{s.amount.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-4 text-center text-body-md capitalize">{s.frequency.toLowerCase()}</td>
                        <td className="px-4 py-4 text-center">
                          <button className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">edit</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
