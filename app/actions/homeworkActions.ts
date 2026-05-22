'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from "@/auth";

export async function createHomework(formData: FormData) {
  const session = await auth();
  const teacherId = (session?.user as any)?.id;
  
  if (!teacherId) throw new Error("Unauthorized");

  const title = formData.get('title') as string;
  const subjectAndSection = formData.get('subjectAndSection') as string;
  
  if (!title || !subjectAndSection) throw new Error("Missing required fields");
  
  const [subjectId, sectionId] = subjectAndSection.split('_');
  const dueDate = formData.get('dueDate') as string;
  const description = formData.get('description') as string;

  const teacher = await prisma.staff.findUnique({ where: { userId: teacherId } });
  
  if (!teacher) throw new Error("Invalid teacher");

  await prisma.homework.create({
    data: {
      title,
      description: description || '',
      dueDate: new Date(dueDate),
      subjectId,
      sectionId,
      postedById: teacher.id,
    }
  });

  revalidatePath('/portal/teacher/academics');
}
