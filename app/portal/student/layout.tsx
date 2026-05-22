import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import StudentPortalShell from "@/components/portal/StudentPortalShell"

export default async function StudentPortalLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/portal/login")
  }

  // Ensure they have the STUDENT role
  const roles = (session.user as any).roles || []
  if (!roles.includes("STUDENT")) {
    redirect("/portal/login")
  }

  // Fetch Student data
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
  })

  if (!student) {
    return <div className="p-8 text-red-500">Student profile not found. Please contact administration.</div>
  }

  const enrollment = student.enrollments[0]
  const gradeLabel = enrollment ? `${enrollment.section.class.name}-${enrollment.section.name}` : "Unassigned"

  return (
    <StudentPortalShell student={student} gradeLabel={gradeLabel}>
      {children}
    </StudentPortalShell>
  )
}
