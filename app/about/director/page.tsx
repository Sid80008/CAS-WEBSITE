import type { Metadata } from "next";
import { DirectorContent } from "./DirectorContent";

export const metadata: Metadata = {
  title: "Directors' Message | Central Academy Anta",
  description:
    "Read the welcome messages from our Founders & Directors, Mr. Hariprakash Meena and Mr. Rekhraj Meena, sharing their vision, values, and commitment to accessible and modern education.",
};

export default function DirectorMessagePage() {
  return <DirectorContent />;
}
