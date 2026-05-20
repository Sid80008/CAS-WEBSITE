// app/admin/attendance/page.tsx
import prisma from '@/lib/prisma';
import { saveBulkAttendance } from '@/app/actions/attendanceActions';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: { classId?: string; date?: string };
}) {
  const classes = await prisma.class.findMany({
    orderBy: [{ name: 'asc' }, { section: 'asc' }],
  });

  const selectedClassId = searchParams.classId || '';
  const selectedDate =
    searchParams.date || new Date().toISOString().split('T')[0];

  let students: any[] = [];
  const existingAttendance: Record<string, string> = {};

  if (selectedClassId && selectedDate) {
    // Get active students for this class
    students = await prisma.student.findMany({
      where: { classId: selectedClassId, status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    });

    // Existing attendance for the date
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        classId: selectedClassId,
        date: new Date(selectedDate),
      },
    });

    attendanceRecords.forEach((record) => {
      existingAttendance[record.studentId] = record.status;
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Attendance Management
      </h1>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded shadow mb-6 text-black">
        <form className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Class
            </label>
            <select
              name="classId"
              defaultValue={selectedClassId}
              required
              className="mt-1 block w-48 border border-gray-300 rounded p-2"
            >
              <option value="">-- Choose Class --</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.section}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              defaultValue={selectedDate}
              required
              className="mt-1 block w-48 border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition"
          >
            Fetch Students
          </button>
        </form>
      </div>

      {/* Attendance Sheet */}
      {selectedClassId ? (
        <div className="bg-white rounded shadow overflow-hidden text-black p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              Mark Attendance for {selectedDate}
            </h2>
            <p className="text-sm text-gray-500">
              Total Students: {students.length}
            </p>
          </div>

          {students.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No active students found in this class.
            </p>
          ) : (
            <form action={saveBulkAttendance}>
              <input type="hidden" name="classId" value={selectedClassId} />
              <input type="hidden" name="date" value={selectedDate} />

              <table className="min-w-full divide-y divide-gray-200 mb-6">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Adm No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Present
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Absent
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Late
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => {
                    const currentStatus =
                      existingAttendance[student.id] || 'PRESENT';
                    return (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.admissionNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input
                            type="radio"
                            name={`status_${student.id}`}
                            value="PRESENT"
                            defaultChecked={currentStatus === 'PRESENT'}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input
                            type="radio"
                            name={`status_${student.id}`}
                            value="ABSENT"
                            defaultChecked={currentStatus === 'ABSENT'}
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input
                            type="radio"
                            name={`status_${student.id}`}
                            value="LATE"
                            defaultChecked={currentStatus === 'LATE'}
                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 font-bold transition"
                >
                  Save Attendance
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12 bg-white rounded shadow">
          Select a class and date above to load the attendance sheet.
        </div>
      )}
    </div>
  );
}
