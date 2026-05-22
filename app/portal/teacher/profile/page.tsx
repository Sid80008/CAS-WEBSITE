import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeacherProfileForm from "./TeacherProfileForm";

export default async function TeacherProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/portal/login");
  }

  const teacher = await prisma.staff.findUnique({
    where: { userId: session.user.id },
  });

  if (!teacher) {
    redirect("/portal/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TeacherProfileForm
        teacher={teacher}
        email={session.user.email || ""}
      />
    </div>
  );
}
