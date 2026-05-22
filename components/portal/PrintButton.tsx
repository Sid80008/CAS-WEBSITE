"use client";

import React from "react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="p-2 text-[#00386b] hover:bg-[#E6F1FB] rounded-full transition-all flex items-center justify-center"
      title="Print Report"
    >
      <span className="material-symbols-outlined text-[20px]">print</span>
    </button>
  );
}
