export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-500 text-sm">Total Students</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-500 text-sm">Fee Collected (Month)</p>
          <p className="text-2xl font-bold">₹0</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-500 text-sm">Attendance Today</p>
          <p className="text-2xl font-bold">0%</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-500 text-sm">Pending Enquiries</p>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
