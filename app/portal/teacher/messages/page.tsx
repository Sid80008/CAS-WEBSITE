import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import TeacherMessagesClient from "./TeacherMessagesClient";

export const dynamic = 'force-dynamic';

export default async function TeacherMessagesPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return <div className="p-8 text-center text-red-600">Please log in to view this page.</div>;
  }

  // Get teacher profile
  const teacher = await prisma.staff.findUnique({
    where: { userId },
    include: {
      subjects: {
        include: {
          section: {
            include: {
              class: true
            }
          }
        }
      }
    }
  });

  if (!teacher) {
    return <div className="p-8 text-center text-red-600">Teacher profile not found.</div>;
  }

  // Find unique sections taught by this teacher
  const sectionsMap = new Map<string, string>();
  teacher.subjects.forEach(sub => {
    if (sub.section) {
      sectionsMap.set(sub.section.id, sub.section.id);
    }
  });
  const taughtSectionIds = Array.from(sectionsMap.keys());

  // Find students and their parents
  const enrollments = await prisma.enrollment.findMany({
    where: {
      sectionId: { in: taughtSectionIds },
      yearId: 'ay-2026-27'
    },
    include: {
      student: {
        include: {
          parents: {
            include: {
              parent: {
                include: {
                  user: {
                    select: {
                      id: true,
                      email: true,
                      phone: true
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

  const contactsMap = new Map<string, { userId: string; name: string; info: string }>();

  // Add parents of taught students
  enrollments.forEach(e => {
    const studentName = `${e.student.firstName} ${e.student.lastName}`;
    e.student.parents.forEach(sp => {
      if (sp.parent && sp.parent.user) {
        contactsMap.set(sp.parent.user.id, {
          userId: sp.parent.user.id,
          name: sp.parent.name || e.student.parentName || "Parent",
          info: `Parent of ${studentName}`
        });
      }
    });

    // If student has a user account, add student as a contact as well
    if (e.student.userId) {
      contactsMap.set(e.student.userId, {
        userId: e.student.userId,
        name: studentName,
        info: `Student (${e.section.class.name}-${e.section.name})`
      });
    }
  });

  // Also query recent messages to/from this teacher to add any other chat partners
  const recentChats = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    },
    select: {
      senderId: true,
      receiverId: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  });

  const messageUserIds = new Set<string>();
  recentChats.forEach(c => {
    if (c.senderId !== userId) messageUserIds.add(c.senderId);
    if (c.receiverId !== userId) messageUserIds.add(c.receiverId);
  });

  const uniqueMessageUserIds = Array.from(messageUserIds).filter(id => !contactsMap.has(id));

  if (uniqueMessageUserIds.length > 0) {
    const users = await prisma.user.findMany({
      where: { id: { in: uniqueMessageUserIds } },
      include: {
        parent: true,
        student: true
      }
    });

    users.forEach(u => {
      let name = u.email || "User";
      let info = "Portal User";
      if (u.parent) {
        name = u.parent.name || name;
        info = "Parent";
      } else if (u.student) {
        name = `${u.student.firstName} ${u.student.lastName}`;
        info = "Student";
      }
      contactsMap.set(u.id, {
        userId: u.id,
        name,
        info
      });
    });
  }

  const contactsList = Array.from(contactsMap.values());

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-[#00386b]">Inbox & Chats</h2>
        <p className="text-sm text-[#555555] mt-1">
          Communicate with parents and students of your taught class sections.
        </p>
      </div>
      <TeacherMessagesClient contacts={contactsList} activeUserId={userId} />
    </div>
  );
}
