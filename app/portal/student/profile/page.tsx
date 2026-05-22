import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import StudentProfileForm from "./StudentProfileForm";

export default async function StudentProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/portal/login");
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      enrollments: {
        include: {
          section: {
            include: { class: true }
          }
        }
      }
    }
  });

  if (!student) {
    redirect("/portal/login");
  }

  const enrollment = student.enrollments[0];
  const classLabel = enrollment ? `${enrollment.section.class.name}-${enrollment.section.name}` : "Unassigned";

  return (
    <div className="container mx-auto px-4 py-8">
      <StudentProfileForm
        student={student}
        classLabel={classLabel}
        email={session.user.email || ""}
      />
    </div>
  );
}
