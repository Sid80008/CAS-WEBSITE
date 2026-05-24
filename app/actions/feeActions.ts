// app/actions/feeActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markFeeAsPaid(feeRecordId: string) {
  await prisma.feeRecord.update({
    where: { id: feeRecordId },
    data: {
      status: 'PAID',
      paidDate: new Date(),
      paymentMode: 'CASH',
      amountPaid: {
        increment: 0, // Keep amountPaid same, or copy from amountDue
      }
    },
  });

  // Also sync amountPaid to amountDue when marking as paid
  const record = await prisma.feeRecord.findUnique({
    where: { id: feeRecordId }
  });
  if (record && record.amountDue) {
    await prisma.feeRecord.update({
      where: { id: feeRecordId },
      data: {
        amountPaid: record.amountDue,
        amountDue: 0,
      }
    });
  }

  revalidatePath('/admin/fees');
}

export async function createFeeInvoice(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const structureId = formData.get('structureId') as string;
  const amountDueStr = formData.get('amountDue') as string;
  const dueDateStr = formData.get('dueDate') as string;

  if (!studentId || !structureId || !amountDueStr || !dueDateStr) {
    throw new Error("Missing required fields");
  }

  const amountDue = parseFloat(amountDueStr);
  const dueDate = new Date(dueDateStr);

  await prisma.feeRecord.create({
    data: {
      studentId,
      structureId,
      amountDue,
      amountPaid: 0,
      dueDate,
      status: 'PENDING',
    }
  });

  revalidatePath('/admin/fees');
}
