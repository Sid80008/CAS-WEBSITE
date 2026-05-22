import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminProfileForm from "./AdminProfileForm";

export default async function AdminProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminProfileForm email={session.user.email || ""} />
    </div>
  );
}
