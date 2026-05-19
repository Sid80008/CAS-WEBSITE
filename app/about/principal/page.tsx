import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import MessagePage from "@/components/MessagePage";

export const metadata: Metadata = {
  title: "Principal's Message",
  description:
    "A message from Dr. S. K. Pathak, Principal of Central Academy Senior Secondary School, Anta — nurturing leaders of tomorrow through holistic education.",
};

export default function PrincipalPage() {
  return (
    <PublicLayout>
      <MessagePage
        role="Principal"
        name="Dr. S. K. Pathak"
        qualifications="Ph.D. in Education"
        experience="20+ years in academic leadership"
        photo="/gallery/photo-dump/1741578082-2.jpg"
        message={`Dear Students, Parents, and Well-Wishers, it gives me immense pleasure to welcome you to the family of Central Academy Senior Secondary School, Anta. Our school is more than a place of academic learning — it is a community dedicated to shaping the leaders of tomorrow.

At CAS Anta, we believe that every child is born with unique gifts. Our responsibility as educators is to create an environment where these gifts can flourish. Our curriculum blends rigorous academics with opportunities in sports, arts, science clubs, and community service — ensuring that no talent goes unnoticed and no passion goes unnurtured.

To our students: be curious, be persistent, and never be afraid to ask questions. The most important lessons you will learn here are not in textbooks — they are in how you treat your peers, how you face setbacks, and how you choose to grow every single day.

To our parents: you are our partners in this journey. Your engagement, your encouragement at home, and your trust in our institution are what make the real difference. Together, we are raising not just students, but thoughtful and empathetic human beings who will make our community proud.`}
        additionalInfo="For academic guidance, admissions queries, or to schedule a meeting with the Principal's office, please contact us at +91-7737689684 or email centralacademyanta@gmail.com."
      />
    </PublicLayout>
  );
}
