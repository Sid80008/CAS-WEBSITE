import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import ParentPortalShell from "@/components/portal/ParentPortalShell"

export default async function ParentPortalLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/portal/login")
  }

  // Ensure they have the PARENT role
  const roles = (session.user as any).roles || []
  if (!roles.includes("PARENT")) {
    redirect("/portal/login")
  }

  // Fetch Parent data
  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      students: {
        include: {
          student: true
        }
      }
    }
  })

  if (!parent) {
    return <div className="p-8 text-red-500">Parent profile not found. Please contact administration.</div>
  }

  return (
    <ParentPortalShell parent={parent}>
      {children}
    </ParentPortalShell>
  )
}
