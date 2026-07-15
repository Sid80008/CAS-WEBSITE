"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ComboSelect({ taughtCombinations, selectedComboId }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  return (
    <select
      name="combo"
      defaultValue={selectedComboId}
      onChange={(e) => {
        const [secId, subId] = e.target.value.split("_");
        const params = new URLSearchParams(searchParams.toString());
        params.set("sectionId", secId);
        params.set("subjectId", subId);
        router.push("?" + params.toString());
      }}
      className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
    >
      {taughtCombinations.map((combo: any, idx: number) => (
        <option key={idx} value={`${combo.sectionId}_${combo.subjectId}`}>
          {combo.sectionName} - {combo.subjectName}
        </option>
      ))}
    </select>
  );
}
