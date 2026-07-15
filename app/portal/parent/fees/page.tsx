import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FeeStatus } from "@prisma/client";

export default async function ParentFeesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/portal/login");
  }

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      students: {
        include: {
          student: {
            include: {
              enrollments: {
                include: {
                  section: {
                    include: {
                      class: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!parent || parent.students.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E0DB] rounded-2xl shadow-sm">
        <p className="text-on-surface-variant font-medium">No linked students found. Please contact administration.</p>
      </div>
    );
  }

  const student = parent.students[0].student;
  const enrollment = student.enrollments[0];
  const classLabel = enrollment ? `${enrollment.section.class.name}-${enrollment.section.name}` : "Unassigned";

  // Fetch Fee Records
  const feeRecords = await prisma.feeRecord.findMany({
    where: { studentId: student.id },
    include: {
      structure: true
    },
    orderBy: {
      dueDate: 'asc'
    }
  });

  // Calculate Outstanding, Paid, and Dues
  let totalOutstanding = 0;
  let nextDueDate: Date | null = null;

  feeRecords.forEach(record => {
    const due = record.amountDue ?? record.structure.amount;
    const outstandingForRecord = due - record.amountPaid;
    if (record.status !== "PAID" && outstandingForRecord > 0) {
      totalOutstanding += outstandingForRecord;
      if (!nextDueDate && record.dueDate) {
        nextDueDate = record.dueDate;
      }
    }
  });

  // Group by fee types for structure breakdown
  const feeTypeBreakdownMap: Record<string, { total: number; paid: number; label: string }> = {};

  feeRecords.forEach(record => {
    const typeKey = record.structure.feeType;
    const due = record.amountDue ?? record.structure.amount;
    if (!feeTypeBreakdownMap[typeKey]) {
      // Human friendly label
      const typeLabel = typeKey.charAt(0) + typeKey.slice(1).toLowerCase() + " Fees";
      feeTypeBreakdownMap[typeKey] = { total: 0, paid: 0, label: typeLabel };
    }
    feeTypeBreakdownMap[typeKey].total += due;
    feeTypeBreakdownMap[typeKey].paid += record.amountPaid;
  });

  const breakdownList = Object.values(feeTypeBreakdownMap);

  // Upcoming Dues
  const upcomingDues = feeRecords.filter(r => r.status !== "PAID" && (r.amountDue ?? r.structure.amount) > r.amountPaid);

  // Recent Paid Transactions
  const paidTransactions = feeRecords.filter(r => r.amountPaid > 0);

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E2E0DB] pb-6">
        <div>
          <h2 className="font-h2 text-3xl font-extrabold text-primary">Fee Portal</h2>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Track outstanding balance and payment history for {student.firstName} {student.lastName} ({classLabel})
          </p>
        </div>
        <div className="bg-school-blue-light text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/10">
          Academic Year {(enrollment as any)?.year?.name || "Active"}
        </div>
      </div>

      {/* Hero Outstanding Balance Panel */}
      <section className="relative overflow-hidden rounded-2xl bg-primary text-white p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="relative z-10 space-y-1 text-center md:text-left">
          <p className="font-label text-xs uppercase tracking-widest opacity-80">Total Outstanding Balance</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight">
            ₹{totalOutstanding.toLocaleString("en-IN")}
          </h2>
          {nextDueDate && (
            <div className="flex items-center justify-center md:justify-start gap-1.5 mt-2 text-xs opacity-90">
              <span className="material-symbols-outlined text-sm">event</span>
              <p>Next Deadline: <span className="font-bold">{new Date(nextDueDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span></p>
            </div>
          )}
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {totalOutstanding > 0 ? (
            <button className="px-6 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-xl shadow hover:opacity-90 active:scale-98 transition-all text-sm">
              Pay Outstanding Balance
            </button>
          ) : (
            <div className="px-5 py-2.5 bg-teal-dark/40 border border-teal-light/20 text-teal-light rounded-xl text-xs font-bold uppercase flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              All Dues Cleared
            </div>
          )}
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Fee Structure Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-h3 text-xl font-bold text-primary">Fee Structure Breakdown</h3>
          
          {breakdownList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {breakdownList.map((item, index) => {
                const percentage = item.total > 0 ? Math.round((item.paid / item.total) * 100) : 100;
                return (
                  <div key={index} className="bg-white border border-[#E2E0DB] p-6 rounded-2xl shadow-sm hover:border-primary transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-school-blue-light rounded-xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-lg">receipt_long</span>
                      </div>
                      <div>
                        <p className="font-h4 text-base font-bold text-on-surface">{item.label}</p>
                        <p className="font-caption text-xs text-on-surface-variant">Annual Allocation</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-on-surface">
                        <span>Total: ₹{item.total.toLocaleString("en-IN")}</span>
                        <span>Paid: ₹{item.paid.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="w-full bg-[#eae7e7] h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <p className="text-right text-[10px] font-bold text-on-surface-variant">
                        {percentage}% Cleared
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-white border border-[#E2E0DB] rounded-2xl text-on-surface-variant">
              No fee items defined in the structure for this class level.
            </div>
          )}
        </div>

        {/* Upcoming Dues List */}
        <div className="space-y-6">
          <h3 className="font-h3 text-xl font-bold text-primary">Upcoming Dues</h3>
          <div className="bg-white border border-[#E2E0DB] rounded-2xl p-6 space-y-4 shadow-sm">
            {upcomingDues.length > 0 ? (
              <div className="divide-y divide-[#E2E0DB] space-y-4">
                {upcomingDues.map((item, index) => {
                  const balance = (item.amountDue ?? item.structure.amount) - item.amountPaid;
                  return (
                    <div key={item.id} className={`${index > 0 ? "pt-4" : ""} flex justify-between items-start gap-4 text-sm text-[#1c1b1b]`}>
                      <div>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                          DUE {item.dueDate ? new Date(item.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "Soon"}
                        </p>
                        <p className="font-bold text-on-surface mt-0.5">{item.structure.name || "Fee Installment"}</p>
                        <p className="text-xs text-on-surface-variant">{item.structure.feeType}</p>
                      </div>
                      <span className="font-bold text-base text-primary">₹{balance.toLocaleString("en-IN")}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant text-center font-medium py-4">No upcoming dues found.</p>
            )}
          </div>
        </div>

      </div>

      {/* Transaction History */}
      <section className="space-y-6">
        <h3 className="font-h3 text-xl font-bold text-primary">Recent Transactions & Receipts</h3>
        
        <div className="overflow-x-auto bg-white border border-[#E2E0DB] rounded-2xl shadow-sm">
          {paidTransactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f6f3f2] text-on-surface-variant font-label text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Description</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Paid Date</th>
                  <th className="px-6 py-4 font-bold">Amount Paid</th>
                  <th className="px-6 py-4 font-bold">Payment Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E0DB]">
                {paidTransactions.map((item) => (
                  <tr key={item.id} className="hover:bg-school-blue-extra-light/40 transition-colors text-sm text-[#1c1b1b]">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-on-surface">{item.structure.name || "Fee Installment"}</p>
                      <p className="text-xs text-on-surface-variant">Receipt No: {item.receiptNo || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-teal-light text-teal-dark rounded-full text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">check_circle</span> Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {item.paidDate ? new Date(item.paidDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : "—"}
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">₹{item.amountPaid.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{item.paymentMode || "ONLINE"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-on-surface-variant font-medium">
              No transactions recorded for this student yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
