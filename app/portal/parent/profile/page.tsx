import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParentProfileForm from "./ParentProfileForm";

export default async function ParentProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/portal/login");
  }

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
  });

  if (!parent) {
    redirect("/portal/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ParentProfileForm
        parent={parent}
        email={session.user.email || ""}
      />
    </div>
  );
}
