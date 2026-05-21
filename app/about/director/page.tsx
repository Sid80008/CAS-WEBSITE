import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import MessagePage from "@/components/MessagePage";

export const metadata: Metadata = {
  title: "Director's Message",
  description:
    "A message from Mr. Harish Pathak, Director and Founder of Central Academy Senior Secondary School, Anta. Our vision and commitment to educational excellence since 2013.",
};

export default function DirectorPage() {
  return (
    <PublicLayout>
      <MessagePage
        role="Director & Founder"
        name="Mr. Harish Pathak"
        qualifications="Founder, Central Academy School"
        experience="12+ years in educational leadership"
        photo="/gallery/photo-dump/1746853764_DSC_3837.jpg"
        message={`Welcome to Central Academy Senior Secondary School, Anta. When we founded this institution in 2013, our singular vision was clear — to build a school where every child, regardless of background, could receive a quality education that shapes both their intellect and their character.

Education is not merely a transaction of knowledge. It is a lifelong investment in a human being. At CAS Anta, we have always believed that a truly educated person is one who is curious, compassionate, and capable — ready to contribute meaningfully to their community and the nation.

We have built our school around three pillars: disciplined academics, holistic development, and a values-based environment. Our teachers are not just instructors; they are mentors who invest personally in each student's journey. Our infrastructure is designed not just to teach, but to inspire.

To every parent who has trusted us with their child — thank you. Your faith drives us to be better every day. To every student who walks through our gates — know that we see your potential, and our entire institution stands behind your growth and success.`}
        additionalInfo="Central Academy is affiliated with the Rajasthan Board of Secondary Education (RBSE), Affiliation No. 1212, and offers classes from I to XII across Science, Commerce, and Arts streams."
      />
    </PublicLayout>
  );
}
