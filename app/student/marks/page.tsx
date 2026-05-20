import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function StudentMarksPage() {
  const session = await auth();

  const student = await prisma.student.findUnique({
    where: { userId: (session?.user as any).id },
  });

  if (!student) return <div>Student profile not found.</div>;

  const marks = await prisma.examResult.findMany({
    where: { studentId: student.id },
    include: {
      subject: true,
      exam: true,
    },
    orderBy: [
      { exam: { startDate: 'desc' } },
      { subject: { name: 'asc' } }
    ]
  });

  const groupedMarks = marks.reduce((acc, mark) => {
    const examName = mark.exam.title;
    if (!acc[examName]) acc[examName] = [];
    acc[examName].push(mark);
    return acc;
  }, {} as Record<string, typeof marks>);

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-6">My Academic Performance</h2>
      {Object.keys(groupedMarks).length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No marks have been published for you yet.
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedMarks).map(([examName, examMarks]) => (
            <div key={examName} className="bg-white rounded shadow-md overflow-hidden">
              <div className="bg-slate-800 text-white p-4">
                <h3 className="font-bold text-lg">{examName}</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obtained</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examMarks.map((mark) => (
                    <tr key={mark.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{mark.subject.name}</td>
                      <td className="px-6 py-4 text-gray-500">{mark.maxMarks}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{mark.marksObtained}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">{mark.grade || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
