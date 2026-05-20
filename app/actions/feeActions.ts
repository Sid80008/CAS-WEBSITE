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
    },
  });

  revalidatePath('/admin/fees');
}
