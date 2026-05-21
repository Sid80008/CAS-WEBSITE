"use client";

import React, { useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitEnquiryClient } from "@/app/actions/admissionActions";
import { Loader2, CheckCircle2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-bold transition flex items-center justify-center gap-2 disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit Enquiry"
      )}
    </button>
  );
}

export function AdmissionForm() {
  const [state, formAction] = useFormState(submitEnquiryClient, { success: false, error: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-8 text-center rounded-lg shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <p className="font-bold text-green-900 text-xl mb-2">Thank you!</p>
        <p className="text-green-800">{state.message}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4 text-black">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded text-sm">
          {state.error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
        <input type="text" name="studentName" required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name *</label>
        <input type="text" name="parentName" required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <input type="tel" name="parentPhone" required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input type="email" name="parentEmail" className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Class Applied For *</label>
        <select name="classAppliedFor" required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow">
          <option value="">Select Class...</option>
          <option value="Nursery">Nursery</option>
          <option value="LKG">LKG</option>
          <option value="UKG">UKG</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 11 (Science)">Class 11 (Science)</option>
        </select>
      </div>
      <SubmitButton />
    </form>
  );
}
