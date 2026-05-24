import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeacherProfileForm from "../profile/TeacherProfileForm";

export default async function TeacherSettingsPage() {
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
      <h2 className="text-2xl font-bold text-[#00386b] mb-6">Profile Settings</h2>
      <TeacherProfileForm
        teacher={teacher}
        email={session.user.email || ""}
      />
    </div>
  );
}
