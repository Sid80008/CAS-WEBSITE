export default function OfficePortalDashboard() {
  return (
    <>
      {/* Page Heading */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-[36px] font-bold text-[#1c1b1b] leading-tight">Office Dashboard</h2>
          <p className="text-[18px] text-[#555555] mt-1">Welcome back, Admin. Here is today's financial and operational overview.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-[#BA7517] text-white rounded-lg text-[14px] font-medium flex items-center gap-2 hover:shadow-md transition-all">
            <span className="material-symbols-outlined">add</span>
            New Transaction
          </button>
          <button className="px-6 py-4 border-2 border-[#BA7517] text-[#BA7517] rounded-lg text-[14px] font-medium flex items-center gap-2 hover:bg-[#BA7517] hover:text-white transition-all">
            <span className="material-symbols-outlined">download</span>
            Export Daily Report
          </button>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-12 gap-6">
        {/* Financial Stats */}
        <div className="col-span-12 md:col-span-4 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border-l-4 border-l-[#3B6D11] border border-[#E2E0DB]/50 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[#3B6D11] text-[11px] font-semibold uppercase tracking-widest">Today's Collection</span>
              <h3 className="text-[28px] font-semibold text-[#1c1b1b] mt-2">₹ 1,42,500</h3>
            </div>
            <div className="bg-[#3B6D11]/10 p-3 rounded-lg text-[#3B6D11]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
          </div>
          <p className="text-[12px] text-[#888888] mt-4">↑ 12% increase from yesterday</p>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border-l-4 border-l-[#993C1D] border border-[#E2E0DB]/50 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[#993C1D] text-[11px] font-semibold uppercase tracking-widest">Pending Dues</span>
              <h3 className="text-[28px] font-semibold text-[#1c1b1b] mt-2">₹ 4,12,800</h3>
            </div>
            <div className="bg-[#993C1D]/10 p-3 rounded-lg text-[#993C1D]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
          </div>
          <p className="text-[12px] text-[#888888] mt-4">32 Grade 10 student dues remaining</p>
        </div>

        {/* Operational Stats */}
        <div className="col-span-12 md:col-span-2 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border-l-4 border-l-[#BA7517] border border-[#E2E0DB]/50 flex flex-col justify-center items-center hover:shadow-md transition-shadow text-center">
          <span className="material-symbols-outlined text-[48px] text-[#BA7517] mb-2">person_add</span>
          <h4 className="text-[22px] font-semibold text-[#1c1b1b]">24</h4>
          <span className="text-[12px] text-[#555555] uppercase">New Enquiries</span>
        </div>

        <div className="col-span-12 md:col-span-2 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border-l-4 border-l-[#534AB7] border border-[#E2E0DB]/50 flex flex-col justify-center items-center hover:shadow-md transition-shadow text-center">
          <span className="material-symbols-outlined text-[48px] text-[#534AB7] mb-2">assignment_late</span>
          <h4 className="text-[22px] font-semibold text-[#1c1b1b]">07</h4>
          <span className="text-[12px] text-[#555555] uppercase">Pending TCs</span>
        </div>

        {/* Ledger View / Recent Transactions */}
        <div className="col-span-12 lg:col-span-8 bg-white/70 backdrop-blur-md rounded-xl shadow-sm border border-[#E2E0DB]/50 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#E2E0DB] flex justify-between items-center bg-[#f6f3f2]">
            <h4 className="text-[18px] font-semibold text-[#1c1b1b]">Recent Ledger Transactions</h4>
            <button className="text-[#BA7517] text-[14px] font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#ffffff] text-[#424750] text-[11px] font-semibold uppercase tracking-widest border-b border-[#E2E0DB]">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E0DB]">
                <tr className="hover:bg-[#eae7e7] transition-colors">
                  <td className="px-6 py-4 text-[14px] text-[#555555]">24 Oct, 2023</td>
                  <td className="px-6 py-4 text-[16px] font-medium text-[#1c1b1b]">Aryan Sharma (XI-B)</td>
                  <td className="px-6 py-4 text-[14px] text-[#555555]">Tuition Fee - Q3</td>
                  <td className="px-6 py-4 text-[16px] font-bold text-[#3B6D11]">₹ 15,200</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#E1F5EE] text-[#085041] rounded-full text-[12px] font-medium">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-[#e5e2e1] rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[#424750]">print</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-[#eae7e7] transition-colors">
                  <td className="px-6 py-4 text-[14px] text-[#555555]">24 Oct, 2023</td>
                  <td className="px-6 py-4 text-[16px] font-medium text-[#1c1b1b]">Priya Verma (IX-A)</td>
                  <td className="px-6 py-4 text-[14px] text-[#555555]">Lab Security Deposit</td>
                  <td className="px-6 py-4 text-[16px] font-bold text-[#3B6D11]">₹ 5,000</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#E1F5EE] text-[#085041] rounded-full text-[12px] font-medium">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-[#e5e2e1] rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[#424750]">print</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-[#eae7e7] transition-colors">
                  <td className="px-6 py-4 text-[14px] text-[#555555]">23 Oct, 2023</td>
                  <td className="px-6 py-4 text-[16px] font-medium text-[#1c1b1b]">Rohan Gupta (VII-C)</td>
                  <td className="px-6 py-4 text-[14px] text-[#555555]">Annual Day Charges</td>
                  <td className="px-6 py-4 text-[16px] font-bold text-[#993C1D]">₹ 2,500</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#FAEEDA] text-[#633806] rounded-full text-[12px] font-medium">New</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-[#e5e2e1] rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[#424750]">print</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-[#eae7e7] transition-colors">
                  <td className="px-6 py-4 text-[14px] text-[#555555]">23 Oct, 2023</td>
                  <td className="px-6 py-4 text-[16px] font-medium text-[#1c1b1b]">Sneha Kapur (XII-D)</td>
                  <td className="px-6 py-4 text-[14px] text-[#555555]">Examination Fee</td>
                  <td className="px-6 py-4 text-[16px] font-bold text-[#3B6D11]">₹ 4,800</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#E1F5EE] text-[#085041] rounded-full text-[12px] font-medium">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-[#e5e2e1] rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[#424750]">print</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar / Action Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Notifications/Alerts */}
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border-l-4 border-l-[#BA7517] border border-[#E2E0DB]/50">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-[#BA7517]">campaign</span>
              <h4 className="text-[18px] font-semibold text-[#1c1b1b]">Office Alerts</h4>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-2 p-2 bg-[#fcf9f8] rounded-lg">
                <span className="material-symbols-outlined text-[#633806]">info</span>
                <p className="text-[14px] text-[#1c1b1b]">Internal Audit scheduled for 28th October. Keep records ready.</p>
              </li>
              <li className="flex gap-2 p-2 bg-[#fcf9f8] rounded-lg">
                <span className="material-symbols-outlined text-[#993C1D]">error</span>
                <p className="text-[14px] text-[#1c1b1b]">12 Online payments pending manual verification since yesterday.</p>
              </li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-[#E2E0DB]/50">
            <h4 className="text-[18px] font-semibold text-[#1c1b1b] mb-4">Quick Stationery Inventory</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[14px]">
                <span>Report Cards</span>
                <span className="font-bold text-[#993C1D]">Low (120)</span>
              </div>
              <div className="w-full bg-[#f0eded] h-2 rounded-full overflow-hidden">
                <div className="bg-[#993C1D] h-full w-1/4"></div>
              </div>
              
              <div className="flex justify-between items-center text-[14px]">
                <span>Admission Forms</span>
                <span className="font-bold text-[#3B6D11]">Stocked (1200)</span>
              </div>
              <div className="w-full bg-[#f0eded] h-2 rounded-full overflow-hidden">
                <div className="bg-[#3B6D11] h-full w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Campus View Card */}
          <div className="relative h-48 rounded-xl overflow-hidden shadow-sm group">
            <img 
              alt="School Admin Building" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <span className="text-white text-[18px] font-semibold">Campus Central</span>
              <span className="text-white/80 text-[12px]">Live Monitoring: All Blocks Active</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
