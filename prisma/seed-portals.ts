import { PrismaClient, AttendanceStatus, FeeStatus, HomeworkStatus, RemarkType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Portal Data...');

  const passwordHash = await bcrypt.hash('portal123', 10);

  // Ensure Roles exist
  const studentRole = await prisma.role.upsert({
    where: { name: 'STUDENT' },
    update: {},
    create: { name: 'STUDENT' },
  });
  
  const parentRole = await prisma.role.upsert({
    where: { name: 'PARENT' },
    update: {},
    create: { name: 'PARENT' },
  });

  const staffRole = await prisma.role.upsert({
    where: { name: 'STAFF' },
    update: {},
    create: { name: 'STAFF' },
  });

  // Create Parent User
  const parentUser = await prisma.user.upsert({
    where: { email: 'parent@cas.edu' },
    update: { password: passwordHash },
    create: {
      email: 'parent@cas.edu',
      password: passwordHash,
      roles: {
        create: { roleId: parentRole.id }
      }
    }
  });

  const parentProfile = await prisma.parent.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: {
      userId: parentUser.id,
      name: 'Anjali Sharma',
      phone: '9876543210'
    }
  });

  // Create Student User
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@cas.edu' },
    update: { password: passwordHash },
    create: {
      email: 'student@cas.edu',
      password: passwordHash,
      roles: {
        create: { roleId: studentRole.id }
      }
    }
  });

  const studentProfile = await prisma.student.upsert({
    where: { admissionNo: 'CAS-2023-1001' },
    update: {},
    create: {
      userId: studentUser.id,
      firstName: 'Rahul',
      lastName: 'Sharma',
      dob: new Date('2008-05-15'),
      gender: 'MALE',
      admissionNo: 'CAS-2023-1001',
      parents: {
        create: { parentId: parentProfile.id }
      }
    }
  });

  // Create Staff
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@cas.edu' },
    update: { password: passwordHash },
    create: {
      email: 'staff@cas.edu',
      password: passwordHash,
      roles: {
        create: { roleId: staffRole.id }
      }
    }
  });

  const staffProfile = await prisma.staff.upsert({
    where: { userId: staffUser.id },
    update: {},
    create: {
      userId: staffUser.id,
      name: 'Mrs. Priya Verma'
    }
  });

  // Create Academic Year & Class/Section
  const academicYear = await prisma.academicYear.create({
    data: {
      name: '2023-24',
      startDate: new Date('2023-04-01'),
      endDate: new Date('2024-03-31')
    }
  });

  const class10 = await prisma.class.create({
    data: {
      name: 'Class 10'
    }
  });

  const sectionA = await prisma.section.create({
    data: {
      name: 'A',
      classId: class10.id
    }
  });

  const sectionB = await prisma.section.create({
    data: {
      name: 'B',
      classId: class10.id
    }
  });

  await prisma.enrollment.create({
    data: {
      studentId: studentProfile.id,
      sectionId: sectionA.id,
      yearId: academicYear.id
    }
  });

  // Subjects
  const math = await prisma.subject.create({ data: { name: 'Mathematics' } });
  const science = await prisma.subject.create({ data: { name: 'Science' } });
  const english = await prisma.subject.create({ data: { name: 'English' } });

  // Homework
  const hw = await prisma.homework.create({
    data: {
      title: 'Quadratic Equations Practice Set',
      description: 'Complete exercise 4.2 and 4.3 from the textbook. Show all working steps clearly.',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      subjectId: math.id,
      sectionId: sectionA.id
    }
  });

  await prisma.homeworkSubmission.create({
    data: {
      homeworkId: hw.id,
      studentId: studentProfile.id,
      status: HomeworkStatus.PENDING
    }
  });

  // Exams & Marks
  const halfYearly = await prisma.exam.create({
    data: {
      title: 'Half Yearly Exam',
      term: 'Term 1',
      date: new Date('2023-09-15'),
      yearId: academicYear.id,
      classId: class10.id
    }
  });

  await prisma.examResult.createMany({
    data: [
      {
        examId: halfYearly.id,
        studentId: studentProfile.id,
        subjectId: math.id,
        marksObtained: 74,
        maxMarks: 80,
        remarks: 'Excellent Logic'
      },
      {
        examId: halfYearly.id,
        studentId: studentProfile.id,
        subjectId: science.id,
        marksObtained: 71,
        maxMarks: 80,
        remarks: 'Strong Concepts'
      }
    ]
  });

  // Attendance
  await prisma.attendance.create({
    data: {
      studentId: studentProfile.id,
      date: new Date(),
      status: AttendanceStatus.PRESENT,
      yearId: academicYear.id
    }
  });

  // Remarks
  await prisma.teacherRemark.create({
    data: {
      studentId: studentProfile.id,
      staffId: staffProfile.id,
      content: 'Rahul has shown exceptional improvement in Euclidean Geometry. His logic in solving the complex theorems in the last unit test was flawless.',
      type: RemarkType.POSITIVE
    }
  });

  // Fee Dues
  const feeStructure = await prisma.feeStructure.create({
    data: {
      name: 'Quarter 3 Installment',
      amount: 12450,
      classId: class10.id,
      yearId: academicYear.id
    }
  });

  await prisma.feeRecord.create({
    data: {
      studentId: studentProfile.id,
      structureId: feeStructure.id,
      status: FeeStatus.PENDING
    }
  });

  console.log('Portal Seeding Complete! Email: student@cas.edu / parent@cas.edu | Password: portal123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
