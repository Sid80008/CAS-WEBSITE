// app/admissions/page.tsx
import { submitEnquiry } from '@/app/actions/admissionActions';

export default function PublicAdmissionForm({ searchParams }: { searchParams: { success?: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">Admission Enquiry 2026-27</h2>
        {searchParams.success ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <p className="font-bold">Thank you!</p>
            <p>Your enquiry has been received. Our office will contact you soon.</p>
          </div>
        ) : null}
        <form action={submitEnquiry} className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student Name</label>
            <input type="text" name="studentName" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent/Guardian Name</label>
            <input type="text" name="parentName" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" name="parentPhone" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address (Optional)</label>
            <input type="email" name="parentEmail" className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Class Applied For</label>
            <select name="classAppliedFor" required className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="">Select Class...</option>
              <option value="Nursery">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 11 (Science)">Class 11 (Science)</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-bold transition">
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
