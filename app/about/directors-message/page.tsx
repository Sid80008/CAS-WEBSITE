import type { Metadata } from "next";
import { DirectorContent } from "./DirectorContent";

export const metadata: Metadata = {
  title: "Director's Message",
  description:
    "A message from Mr. Harish Pathak, Director and Founder of Central Academy Senior Secondary School, antah. Our vision and commitment to educational excellence since 2013.",
};

export default function DirectorsMessagePage() {
  return <DirectorContent />;
}
