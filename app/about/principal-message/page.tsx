import type { Metadata } from "next";
import { PrincipalContent } from "./PrincipalContent";

export const metadata: Metadata = {
  title: "Principal's Message",
  description:
    "A message from Dr. S. K. Pathak, Principal of Central Academy Senior Secondary School, antah. Nurturing leaders of tomorrow through holistic education.",
};

export default function PrincipalMessagePage() {
  return <PrincipalContent />;
}
