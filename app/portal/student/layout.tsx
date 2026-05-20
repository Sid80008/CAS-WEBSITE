import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"

export default async function StudentPortalLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/portal/login")
  }

  // Ensure they have the STUDENT role
  const roles = (session.user as any).roles || []
  if (!roles.includes("STUDENT")) {
    redirect("/portal")
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
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-body min-h-screen">
      {/* Side Navigation */}
      <aside className="h-full w-64 fixed left-0 top-0 overflow-y-auto bg-[#f6f3f2] shadow-sm border-r border-[#E2E0DB] z-50 flex flex-col gap-2 p-4">
        <div className="mb-8 px-2 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/logo.png" alt="CAS Logo" width={40} height={40} className="object-contain" />
            <div>
              <h1 className="font-h3 text-xl font-bold text-[#00386b] leading-tight">Central Academy</h1>
              <p className="font-label text-sm text-[#424750]">Anta Campus</p>
            </div>
          </div>
        </div>
        <nav className="flex-grow space-y-1">
          <Link href="/portal/student/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#1b4f8a] text-[#9ac2ff] rounded-lg font-bold scale-[0.98]">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label text-sm">Dashboard</span>
          </Link>
          <Link href="/portal/student/academics" className="flex items-center gap-3 px-4 py-3 text-[#424750] hover:bg-[#e5e2e1]/50 rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">school</span>
            <span className="font-label text-sm">Academics</span>
          </Link>
          <Link href="/portal/student/fees" className="flex items-center gap-3 px-4 py-3 text-[#424750] hover:bg-[#e5e2e1]/50 rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">payments</span>
            <span className="font-label text-sm">Fee Portal</span>
          </Link>
          <Link href="/portal/student/circulars" className="flex items-center gap-3 px-4 py-3 text-[#424750] hover:bg-[#e5e2e1]/50 rounded-lg transition-all duration-200">
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label text-sm">Circulars</span>
          </Link>
        </nav>
        <div className="mt-auto border-t border-[#E2E0DB] pt-4">
          <Link href="/" className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-[#00386b] text-[#00386b] font-bold rounded-lg hover:bg-[#00386b] hover:text-white transition-all">
            ← Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Top AppBar */}
      <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-[#fcf9f8] border-b border-[#E2E0DB]">
        <div className="flex justify-between items-center px-6 h-full">
          <h2 className="font-h4 text-lg text-[#00386b] font-bold">Student Portal</h2>
          <div className="flex items-center gap-6">
            <div className="relative flex items-center bg-[#f0eded] px-4 py-1.5 rounded-full border border-transparent focus-within:border-[#00386b] transition-all">
              <span className="material-symbols-outlined text-[#424750] text-[20px]">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 font-label ml-2 outline-none" placeholder="Search portal..." type="text" aria-label="Search portal" />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#424750] hover:text-[#00386b] transition-all" aria-label="View notifications">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-[#fcf9f8]"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-[#E2E0DB]">
                <div className="text-right hidden sm:block">
                  <p className="font-label text-sm font-bold text-[#1c1b1b] leading-tight">{student.firstName} {student.lastName}</p>
                  <p className="font-caption text-xs text-[#424750]">{gradeLabel}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-[#00386b] flex items-center justify-center text-white font-bold text-lg" aria-label="User profile">
                  {student.firstName.charAt(0)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">
        {children}
      </main>
    </div>
  )
}
