import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ConnectClient from "./ConnectClient";

export default async function ParentConnectPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/portal/login");
  }

  // Fetch Parent data with linked student and teacher staff-subjects
  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      students: {
        include: {
          student: {
            include: {
              enrollments: {
                include: {
                  section: {
                    include: {
                      staffSubjects: {
                        include: {
                          staff: true,
                          subject: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!parent || parent.students.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E0DB] rounded-2xl shadow-sm">
        <p className="text-on-surface-variant font-medium">No linked students found. Please contact administration.</p>
      </div>
    );
  }

  const student = parent.students[0].student;
  const enrollment = student.enrollments[0];
  const section = enrollment?.section;
  
  // Extract unique teachers and their subjects
  const teachersMap: Record<string, { staffId: string; userId: string; name: string; photo: string | null; designation: string | null; subjects: string[] }> = {};
  
  if (section) {
    section.staffSubjects.forEach(ss => {
      const staff = ss.staff;
      const subject = ss.subject;
      if (!teachersMap[staff.id]) {
        teachersMap[staff.id] = {
          staffId: staff.id,
          userId: staff.userId,
          name: staff.name,
          photo: staff.photo,
          designation: staff.designation,
          subjects: []
        };
      }
      teachersMap[staff.id].subjects.push(subject.name);
    });
  }

  const teachers = Object.values(teachersMap);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="font-h2 text-3xl font-extrabold text-primary">Teacher Connect</h2>
        <p className="font-body text-sm text-on-surface-variant mt-1">
          Direct messaging and meeting requests with {student.firstName}'s instructors.
        </p>
      </div>
      <ConnectClient teachers={teachers} studentName={`${student.firstName} ${student.lastName}`} activeUserId={session.user?.id || ""} />
    </div>
  );
}
