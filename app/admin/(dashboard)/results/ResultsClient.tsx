"use client";

import { useState, useTransition } from "react";
import { createResult, deleteResult } from "@/app/actions/resultActions";

interface ResultType {
  id: string;
  studentName: string;
  className: string;
  section: string;
  academicYear: string;
  examination: string;
  total: number;
  percentage: number;
  grade: string;
  status: string;
}

export default function ResultsClient({ results }: { results: ResultType[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [subjects, setSubjects] = useState([{ subject: "", marks: "" }]);

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("subjectMarks", JSON.stringify(subjects));
    
    startTransition(async () => {
      await createResult(formData);
      setIsAddOpen(false);
      setSubjects([{ subject: "", marks: "" }]);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this result?")) {
      startTransition(async () => {
        await deleteResult(id);
      });
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Results Management</h1>
          <p className="text-sm text-on-surface-variant">Publish academic results for students.</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-sm"
        >
          <span className="material-symbols-outlined">add</span>
          Add Result
        </button>
      </div>

      <div className="bg-white border border-outline-variant rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f6f3f2] border-b border-outline-variant">
              {["Student", "Class", "Exam", "Year", "Total", "%", "Grade", "Status", "Actions"].map(h =>
                <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {results.length === 0 ? (
              <tr><td colSpan={9} className="px-6 py-16 text-center text-sm text-on-surface-variant">No results found.</td></tr>
            ) : results.map((r) => (
              <tr key={r.id} className="hover:bg-[#f6f3f2] transition-colors">
                <td className="px-6 py-4 text-sm font-semibold">{r.studentName}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Class {r.className}-{r.section}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{r.examination}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{r.academicYear}</td>
                <td className="px-6 py-4 text-sm font-medium">{r.total}</td>
                <td className="px-6 py-4 text-sm font-medium">{r.percentage}%</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{r.grade}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${r.status === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-xl text-primary mb-6">Add New Result</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Student Name</label>
                  <input name="studentName" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold block mb-1">Class</label>
                    <input name="className" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-bold block mb-1">Section</label>
                    <input name="section" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Academic Year</label>
                  <input name="academicYear" required placeholder="e.g. 2025-26" className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Examination</label>
                  <input name="examination" required placeholder="e.g. Final Exams" className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <label className="text-sm font-bold block mb-2">Subject Marks</label>
                {subjects.map((sub, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input 
                      placeholder="Subject" 
                      value={sub.subject}
                      required
                      onChange={e => {
                        const newSubs = [...subjects];
                        newSubs[idx].subject = e.target.value;
                        setSubjects(newSubs);
                      }}
                      className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none" 
                    />
                    <input 
                      placeholder="Marks" 
                      type="number"
                      required
                      value={sub.marks}
                      onChange={e => {
                        const newSubs = [...subjects];
                        newSubs[idx].marks = e.target.value;
                        setSubjects(newSubs);
                      }}
                      className="w-24 border rounded-lg px-3 py-2 text-sm outline-none" 
                    />
                    <button type="button" onClick={() => setSubjects(subjects.filter((_, i) => i !== idx))} className="text-red-500 hover:bg-red-50 p-2 rounded">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setSubjects([...subjects, { subject: "", marks: "" }])} className="text-xs text-primary font-bold mt-1">+ Add Subject</button>
              </div>

              <div className="grid grid-cols-4 gap-4 border-t pt-4 mt-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Total</label>
                  <input name="total" type="number" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">%</label>
                  <input name="percentage" type="number" step="0.01" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Grade</label>
                  <input name="grade" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Status</label>
                  <select name="status" className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary">
                    <option value="PASS">PASS</option>
                    <option value="FAIL">FAIL</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 bg-primary text-white font-bold rounded-lg disabled:opacity-50">
                  {isPending ? "Saving..." : "Save Result"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
