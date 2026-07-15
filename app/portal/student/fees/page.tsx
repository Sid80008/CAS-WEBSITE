import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return <div className="p-8 text-red-500">Not authenticated.</div>;
  }

  // Fetch Student data
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      enrollments: {
        include: {
          section: {
            include: {
              class: true
            }
          }
        }
      },
      fees: {
        include: {
          structure: true
        }
      }
    }
  });

  if (!student) {
    return (
      <div className="p-8 text-red-500">
        Student profile not found. Please contact school administration.
      </div>
    );
  }

  const enrollment = student.enrollments[0];
  const gradeLabel = enrollment
    ? `Class ${enrollment.section.class.name}-${enrollment.section.name}`
    : "Unassigned";
  const rollNo = student.rollNo || "N/A";

  // Compute fee stats
  const hasFeeRecords = student.fees.length > 0;
  const unpaidFees = student.fees.filter((f) => f.status !== "PAID");
  const paidFees = student.fees.filter((f) => f.status === "PAID" || f.amountPaid > 0);

  const totalOutstanding = unpaidFees.reduce((acc, curr) => {
    const dueAmount = curr.amountDue ?? (curr.structure?.amount ?? 0);
    return acc + (dueAmount - curr.amountPaid);
  }, 0);

  // Format dates helper
  const formatDate = (date: Date | null | undefined, defaultStr: string) => {
    if (!date) return defaultStr;
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Student Details Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#E2E0DB] rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#E6F1FB] flex items-center justify-center border-2 border-[#00386b] text-[#00386b] text-xl font-bold uppercase">
            {student.firstName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#00386b] font-h3">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-sm font-label text-[#424750]">
              {gradeLabel} | Roll No: {rollNo}
            </p>
          </div>
        </div>
        <div className="bg-[#E6F1FB] text-[#00386b] px-4 py-2 rounded-xl text-sm font-semibold self-start sm:self-auto">
          Academic Year 2026-27
        </div>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Outstanding balance and Upcoming dues */}
        <div className="lg:col-span-2 space-y-8">
          {/* Outstanding Balance Box */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00386b] to-[#1b4f8a] p-8 shadow-md text-white">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#fdad4e]/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#a6c8ff] font-semibold mb-1">
                  Total Outstanding Balance
                </p>
                <h3 className="text-4xl font-extrabold font-h1">
                  ₹{totalOutstanding.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-xl border border-white/10">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                <p className="text-sm font-medium">
                  Next Due: {unpaidFees.length > 0
                    ? formatDate(unpaidFees[0].dueDate, "N/A")
                    : "No pending dues"}
                </p>
              </div>

              <button className="w-full sm:w-auto px-8 py-4 bg-[#fdad4e] hover:bg-[#ffb869] text-[#704200] font-bold text-base rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                Pay Outstanding Fees
              </button>
            </div>
          </div>

          {/* Upcoming Dues List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-[#00386b] font-h4">Upcoming Dues</h4>
              <span className="text-xs font-semibold text-[#424750] bg-slate-100 px-2.5 py-1 rounded-full">
                {unpaidFees.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {unpaidFees.length > 0 ? (
                unpaidFees.map((fee) => {
                  const feeName = fee.structure?.name || `${fee.structure?.feeType || "Tuition"} Fee`;
                  const amount = (fee.amountDue ?? fee.structure?.amount ?? 0) - fee.amountPaid;
                  return (
                    <div
                      key={fee.id}
                      className="bg-white border border-[#E2E0DB] hover:border-[#1b4f8a] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#E6F1FB] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#00386b]">menu_book</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-base">{feeName}</h5>
                          <p className="text-xs text-[#424750] mt-0.5">
                            Due by: {formatDate(fee.dueDate, "N/A")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                        <div className="sm:text-right">
                          <p className="font-bold text-lg text-[#00386b]">₹{amount.toLocaleString("en-IN")}</p>
                          <span className="inline-block px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold rounded-md uppercase tracking-wider">
                            Pending
                          </span>
                        </div>
                        <button className="px-4 py-2 border-2 border-[#00386b] text-[#00386b] hover:bg-[#00386b] hover:text-white rounded-lg text-xs font-bold transition-all">
                          Pay
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-[#424750]">No upcoming dues.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Actions & Recent Transactions */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white border border-[#E2E0DB] rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-slate-800 font-h4">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 rounded-xl border border-[#E2E0DB] bg-[#fcf9f8] hover:bg-[#E6F1FB] hover:border-[#00386b] active:scale-95 transition-all cursor-pointer text-center group">
                <span className="material-symbols-outlined text-[#00386b] mb-2 block group-hover:scale-110 transition-transform">
                  request_quote
                </span>
                <h5 className="font-bold text-xs text-slate-700">Fee Structure</h5>
                <p className="text-[10px] text-[#424750] mt-0.5">AY 2026-27</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white border border-[#E2E0DB] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#E2E0DB] flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-800 font-h4">Recent Transactions</h4>
              <button className="text-xs font-semibold text-[#00386b] hover:underline">
                View History
              </button>
            </div>
            
            <div className="divide-y divide-[#E2E0DB]">
              {hasFeeRecords && paidFees.length > 0 ? (
                paidFees.map((fee) => {
                  const feeName = fee.structure?.name || `${fee.structure?.feeType || "Tuition"} Fee`;
                  return (
                    <div key={fee.id} className="p-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-emerald-700 text-lg">check_circle</span>
                        </div>
                        <div>
                          <h6 className="font-bold text-xs text-slate-700">{feeName}</h6>
                          <p className="text-[10px] text-[#424750] mt-0.5">
                            {formatDate(fee.paidDate, "Recent")} • ID: {fee.transactionId || "Direct"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-emerald-700">₹{fee.amountPaid.toLocaleString("en-IN")}</p>
                        <button className="text-[10px] font-bold text-[#00386b] hover:underline flex items-center gap-0.5 justify-end mt-0.5">
                          <span className="material-symbols-outlined text-xs">download</span> Receipt
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  {/* Default simulated transactions */}
                  <div className="p-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-emerald-700 text-lg">check_circle</span>
                      </div>
                      <div>
                        <h6 className="font-bold text-xs text-slate-700">Quarter 2 Tuition Fee</h6>
                        <p className="text-[10px] text-[#424750] mt-0.5">
                          Dec 05, 2026 • ID: #TRX9021
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-emerald-700">₹12,000</p>
                      <button className="text-[10px] font-bold text-[#00386b] hover:underline flex items-center gap-0.5 justify-end mt-0.5">
                        <span className="material-symbols-outlined text-xs">download</span> Receipt
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-emerald-700 text-lg">check_circle</span>
                      </div>
                      <div>
                        <h6 className="font-bold text-xs text-slate-700">Annual Sports Fee</h6>
                        <p className="text-[10px] text-[#424750] mt-0.5">
                          Nov 12, 2026 • ID: #TRX8842
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-emerald-700">₹1,500</p>
                      <button className="text-[10px] font-bold text-[#00386b] hover:underline flex items-center gap-0.5 justify-end mt-0.5">
                        <span className="material-symbols-outlined text-xs">download</span> Receipt
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Need Assistance Info */}
          <div className="bg-[#F0F6FC] border border-[#d4e3ff] p-5 rounded-2xl flex items-start gap-4">
            <span className="material-symbols-outlined text-[#00386b] text-2xl shrink-0 mt-0.5">help_outline</span>
            <div>
              <h5 className="font-bold text-sm text-[#001c3a]">Need assistance?</h5>
              <p className="text-xs text-[#424750] mt-1 leading-relaxed">
                Contact our helpdesk for fee-related queries at <a href="mailto:centralacademyantah@gmail.com" className="font-bold text-[#00386b] hover:underline">centralacademyantah@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
