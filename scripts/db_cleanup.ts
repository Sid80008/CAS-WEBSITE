import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("=== Starting Database Cleanup ===");

  // 1. Delete Fake Admissions
  const fakeAdmissionId = 'cmrm15ucb0000jl04qnkpcgis';
  try {
    await prisma.admission.delete({ where: { id: fakeAdmissionId } });
    console.log(`Deleted fake admission: ${fakeAdmissionId}`);
  } catch (e: any) {
    console.log(`Failed to delete admission ${fakeAdmissionId}: ${e.message}`);
  }

  // 2. Delete Fake Notices
  const fakeNoticeIds = ['cmpe8j03o000sjsu4za82fss1', 'cmpifb8o60001jp04ssedjurg'];
  for (const id of fakeNoticeIds) {
    try {
      await prisma.notice.delete({ where: { id } });
      console.log(`Deleted fake notice: ${id}`);
    } catch (e: any) {
      console.log(`Failed to delete notice ${id}: ${e.message}`);
    }
  }

  // 3. Delete Fake Student and all related records to avoid orphans
  const fakeStudentId = 'cmrm12c170000if048my0ter8';
  
  // Clean up related records first
  try {
    const student = await prisma.student.findUnique({ where: { id: fakeStudentId } });
    if (student) {
      // Enrollments
      await prisma.enrollment.deleteMany({ where: { studentId: fakeStudentId } });
      console.log(`Deleted enrollments for student ${fakeStudentId}`);
      
      // Attendance
      await prisma.attendance.deleteMany({ where: { studentId: fakeStudentId } });
      console.log(`Deleted attendance for student ${fakeStudentId}`);
      
      // Fee Records
      await prisma.feeRecord.deleteMany({ where: { studentId: fakeStudentId } });
      console.log(`Deleted fee records for student ${fakeStudentId}`);
      
      // TC Records
      await prisma.tCRecord.deleteMany({ where: { studentId: fakeStudentId } });
      console.log(`Deleted TC records for student ${fakeStudentId}`);
      
      // Homework Submissions
      await prisma.homeworkSubmission.deleteMany({ where: { studentId: fakeStudentId } });
      console.log(`Deleted homework submissions for student ${fakeStudentId}`);
      
      // Exam Results
      await prisma.examResult.deleteMany({ where: { studentId: fakeStudentId } });
      console.log(`Deleted exam results for student ${fakeStudentId}`);
      
      // Student Parent Relations
      await prisma.studentParent.deleteMany({ where: { studentId: fakeStudentId } });
      console.log(`Deleted parent links for student ${fakeStudentId}`);
      
      // Finally, delete the student
      await prisma.student.delete({ where: { id: fakeStudentId } });
      console.log(`Deleted fake student: ${fakeStudentId}`);
    } else {
      console.log(`Fake student ${fakeStudentId} not found or already deleted.`);
    }
  } catch (e) {
    console.error(`Failed to cleanup fake student:`, e);
  }

  console.log("=== Cleanup Complete ===");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
