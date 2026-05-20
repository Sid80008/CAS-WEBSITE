// app/admin/marks/page.tsx
import prisma from '@/lib/prisma';
import { saveBulkMarks } from '@/app/actions/markActions';

export const dynamic = 'force-dynamic';

export default async function MarksPage({
  searchParams,
}: {
  searchParams: { classId?: string; subjectId?: string; examId?: string };
}) {
  const { classId, subjectId, examId } = searchParams;

  // Load dropdown data
  const classes = await prisma.class.findMany({
    orderBy: [{ name: 'asc' }, { section: 'asc' }],
  });
  const exams = await prisma.exam.findMany({
    orderBy: { startDate: 'desc' },
  });

  let subjects: any[] = [];
  let students: any[] = [];
  const existingMarks: Record<string, any> = {};

  if (classId) {
    subjects = await prisma.subject.findMany({ where: { classId } });
  }

  if (classId && subjectId && examId) {
    // Students for the selected class
    students = await prisma.student.findMany({
      where: { classId, status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    });

    // Existing marks for the selected exam/subject
    const marksRecords = await prisma.mark.findMany({
      where: { subjectId, examId },
    });
    marksRecords.forEach((m) => {
      existingMarks[m.studentId] = m;
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Marks & Results Entry</h1>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded shadow mb-6 text-black">
        <form className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <select
              name="classId"
              defaultValue={classId}
              className="mt-1 block w-40 border border-gray-300 rounded p-2"
              onChange="this.form.submit()"
            >
              <option value="">-- Select --</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.section}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Exam</label>
            <select
              name="examId"
              defaultValue={examId}
              className="mt-1 block w-40 border border-gray-300 rounded p-2"
            >
              <option value="">-- Select --</option>
              {exams.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              name="subjectId"
              defaultValue={subjectId}
              className="mt-1 block w-40 border border-gray-300 rounded p-2"
              disabled={!classId}
            >
              <option value="">-- Select --</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 font-bold transition"
          >
            Load Sheet
          </button>
        </form>
      </div>

      {/* Marks Entry Grid */}
      {classId && subjectId && examId ? (
        <div className="bg-white rounded shadow p-6 text-black">
          <form action={saveBulkMarks}>
            <input type="hidden" name="subjectId" value={subjectId} />
            <input type="hidden" name="examId" value={examId} />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Max Marks for this Exam
              </label>
              <input
                type="number"
                name="maxMarks"
                defaultValue={100}
                required
                className="mt-1 block w-32 border border-gray-300 rounded p-2"
              />
            </div>

            <table className="min-w-full divide-y divide-gray-200 mb-6">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Roll / Adm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Marks Obtained
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Grade (Auto)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => {
                  const currentMark = existingMarks[student.id];
                  return (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.admissionNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input
                          type="number"
                          step="0.1"
                          name={`mark_${student.id}`}
                          defaultValue={currentMark?.marksObtained || ''}
                          className="w-24 border border-gray-300 rounded p-1 text-center"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                        {currentMark?.grade || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 font-bold transition"
            >
              Save All Marks
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
