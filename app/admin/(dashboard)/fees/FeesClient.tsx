"use client";

import { useState, useMemo, useTransition } from "react";
import { markFeeAsPaid, createFeeInvoice } from "@/app/actions/feeActions";

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

type StudentListItem = {
  id: string;
  firstName: string;
  lastName: string;
  admissionNo: string;
};

interface Props {
  records: FeeRecord[];
  structures: FeeStructure[];
  stats: { totalPaidMTD: number; totalDuePending: number; totalOverdue: number; totalDueAll: number; totalPaidAll: number; pendingCount: number; overdueCount: number; };
  students: StudentListItem[];
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

export default function FeesClient({ records, structures, stats, students }: Props) {
  const [tab, setTab] = useState<Tab>("records");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  // New Invoice Modal state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedStructureId, setSelectedStructureId] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const q = search.toLowerCase();
      const name = `${r.student.firstName} ${r.student.lastName}`.toLowerCase();
      return !q || name.includes(q) || r.student.admissionNo.toLowerCase().includes(q);
    });
  }, [records, search]);

  const filteredStudents = useMemo(() => {
    const q = studentSearch.toLowerCase();
    if (!q) return [];
    return students.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
      s.admissionNo.toLowerCase().includes(q)
    ).slice(0, 5); // Limit suggestions to 5
  }, [students, studentSearch]);

  const handleStructureChange = (id: string) => {
    setSelectedStructureId(id);
    const struc = structures.find(s => s.id === id);
    if (struc) {
      setCustomAmount(String(struc.amount));
    }
  };

  function handleMarkPaid(id: string) {
    startTransition(async () => {
      await markFeeAsPaid(id);
    });
  }

  const handleInvoiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createFeeInvoice(formData);
      setShowInvoiceModal(false);
      setStudentSearch("");
      setSelectedStructureId("");
      setCustomAmount("");
    });
  };

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
    <div className="max-w-[1440px] mx-auto font-body-md text-[#1c1b1b]">
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
          <button onClick={() => setShowInvoiceModal(true)} className="px-6 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-all">
            <span className="material-symbols-outlined">add_card</span>
            New Invoice
          </button>
        </div>
      </div>

      {/* Bento Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md uppercase tracking-wider text-outline">Total Revenue (MTD)</span>
            <span className="material-symbols-outlined text-teal-accent">trending_up</span>
          </div>
          <div className="font-headline-md text-primary">₹{stats.totalPaidMTD.toLocaleString("en-IN")}</div>
          <div className="text-xs text-on-tertiary-container mt-1 font-medium">This month collection</div>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md uppercase tracking-wider text-outline">Pending Dues</span>
            <span className="material-symbols-outlined text-secondary">pending_actions</span>
          </div>
          <div className="font-headline-md text-primary">₹{stats.totalDuePending.toLocaleString("en-IN")}</div>
          <div className="text-xs text-secondary mt-1 font-medium">{stats.pendingCount} records pending</div>
        </div>
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {structures.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-16 text-center text-on-surface-variant">No fee structures.</td>
                    </tr>
                  ) : (
                    structures.map((s) => (
                      <tr key={s.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-4 py-4 font-bold text-primary">{s.name ?? s.feeType}</td>
                        <td className="px-4 py-4 text-body-md">{s.class.name}</td>
                        <td className="px-4 py-4 text-body-md">{s.feeType}</td>
                        <td className="px-4 py-4 text-right font-bold text-primary">₹{s.amount.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-4 text-center text-body-md capitalize">{s.frequency.toLowerCase()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* New Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowInvoiceModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Create New Invoice</h2>
              <button onClick={() => setShowInvoiceModal(false)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleInvoiceSubmit} className="space-y-4">
              {/* Student Search and Selection */}
              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Search Student *</label>
                <input 
                  type="text" 
                  value={studentSearch} 
                  onChange={(e) => setStudentSearch(e.target.value)} 
                  required={!formDataSelectedStudentId(studentSearch, students)}
                  placeholder="Type name or Admission No..." 
                  className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                />
                {filteredStudents.length > 0 && (
                  <div className="absolute top-[100%] left-0 right-0 bg-white border border-[#E2E0DB] rounded-lg shadow-lg z-50 divide-y divide-slate-100 max-h-40 overflow-y-auto">
                    {filteredStudents.map(student => (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => {
                          setStudentSearch(`${student.firstName} ${student.lastName} (#${student.admissionNo})`);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#f6f3f2] text-sm"
                      >
                        {student.firstName} {student.lastName} <span className="text-slate-400 font-mono">#{student.admissionNo}</span>
                      </button>
                    ))}
                  </div>
                )}
                {/* Hidden input to hold student ID */}
                <input 
                  type="hidden" 
                  name="studentId" 
                  value={students.find(s => `${s.firstName} ${s.lastName} (#${s.admissionNo})` === studentSearch)?.id || ""} 
                />
              </div>

              {/* Fee Structure */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Fee Structure *</label>
                <select 
                  name="structureId" 
                  value={selectedStructureId} 
                  onChange={(e) => handleStructureChange(e.target.value)} 
                  required 
                  className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none bg-white"
                >
                  <option value="" disabled>Select structure</option>
                  {structures.map(struc => (
                    <option key={struc.id} value={struc.id}>
                      {struc.name || struc.feeType} (Class {struc.class.name}) - ₹{struc.amount}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Amount */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Amount Due (₹) *</label>
                <input 
                  name="amountDue" 
                  type="number" 
                  value={customAmount} 
                  onChange={(e) => setCustomAmount(e.target.value)} 
                  required 
                  className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" 
                  placeholder="₹"
                />
              </div>

              {/* Due Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Due Date *</label>
                <input 
                  name="dueDate" 
                  type="date" 
                  required 
                  className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" 
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setShowInvoiceModal(false)} className="px-4 py-2 border border-outline rounded-lg text-slate-600">Cancel</button>
                <button type="submit" disabled={isPending || !students.some(s => `${s.firstName} ${s.lastName} (#${s.admissionNo})` === studentSearch)} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-sm disabled:opacity-60">
                  {isPending ? "Billing..." : "Create Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to check if search string represents a matched student
function formDataSelectedStudentId(search: string, list: StudentListItem[]) {
  return list.some(s => `${s.firstName} ${s.lastName} (#${s.admissionNo})` === search);
}
