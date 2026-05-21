import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database with Test Users and Portals Setup...');

  // 1. Ensure Roles exist in the DB
  const roleNames = ['ADMIN', 'OFFICE', 'TEACHER', 'PARENT', 'STUDENT', 'STAFF'];
  const rolesMap: Record<string, any> = {};
  
  for (const name of roleNames) {
    const role = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    rolesMap[name] = role;
    console.log(`Role ${name} processed.`);
  }

  // 2. Create Core Academic Infrastructure
  const academicYear = await prisma.academicYear.create({
    data: {
      name: '2026-27',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
    },
  });
  console.log('Academic Year 2026-27 created.');

  const class10 = await prisma.class.create({
    data: {
      name: 'Class 10',
    },
  });
  console.log('Class 10 created.');

  const sectionA = await prisma.section.create({
    data: {
      name: 'A',
      classId: class10.id,
    },
  });
  console.log('Section A created.');

  // Helper to generate hash
  const getHash = async (pwd: string) => await bcrypt.hash(pwd, 10);

  // 3. Create Admin User
  const adminPassword = 'admin_password_123';
  const adminHash = await getHash(adminPassword);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@casantah.com',
      password: adminHash,
      isActive: true,
      roles: {
        create: {
          roleId: rolesMap['ADMIN'].id,
        },
      },
    },
  });
  await prisma.staff.create({
    data: {
      userId: adminUser.id,
      name: 'School Administrator',
      empCode: 'ADM001',
      designation: 'Administrator',
    },
  });
  console.log('Admin user and Staff profile created.');

  // 4. Create Office User
  const officePassword = 'office_password_123';
  const officeHash = await getHash(officePassword);
  const officeUser = await prisma.user.create({
    data: {
      email: 'office@casantah.com',
      password: officeHash,
      isActive: true,
      roles: {
        create: {
          roleId: rolesMap['OFFICE'].id,
        },
      },
    },
  });
  await prisma.staff.create({
    data: {
      userId: officeUser.id,
      name: 'Office Clerk',
      empCode: 'OFF001',
      designation: 'Clerk',
    },
  });
  console.log('Office user and Staff profile created.');

  // 5. Create Teacher User
  const teacherPassword = 'teacher_password_123';
  const teacherHash = await getHash(teacherPassword);
  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@casantah.com',
      password: teacherHash,
      isActive: true,
      roles: {
        create: {
          roleId: rolesMap['TEACHER'].id,
        },
      },
    },
  });
  const teacherProfile = await prisma.staff.create({
    data: {
      userId: teacherUser.id,
      name: 'Mrs. Priya Verma',
      empCode: 'TCH001',
      designation: 'Teacher',
    },
  });
  console.log('Teacher user and Staff profile created.');

  // 6. Create Student User
  const studentPassword = 'student_password_123';
  const studentHash = await getHash(studentPassword);
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@casantah.com',
      password: studentHash,
      isActive: true,
      roles: {
        create: {
          roleId: rolesMap['STUDENT'].id,
        },
      },
    },
  });
  const studentProfile = await prisma.student.create({
    data: {
      userId: studentUser.id,
      firstName: 'Rahul',
      lastName: 'Sharma',
      dob: new Date('2012-05-15'),
      gender: 'MALE',
      admissionNo: 'CAS-2026-0001',
      parentPhone: '9876543210',
      parentName: 'Anjali Sharma',
      status: 'ACTIVE',
    },
  });
  // Enroll student
  await prisma.enrollment.create({
    data: {
      studentId: studentProfile.id,
      sectionId: sectionA.id,
      yearId: academicYear.id,
    },
  });
  console.log('Student user, profile, and enrollment created.');

  // 7. Create Parent User
  const parentPassword = 'parent_password_123';
  const parentHash = await getHash(parentPassword);
  const parentUser = await prisma.user.create({
    data: {
      email: 'parent@casantah.com',
      password: parentHash,
      isActive: true,
      roles: {
        create: {
          roleId: rolesMap['PARENT'].id,
        },
      },
    },
  });
  const parentProfile = await prisma.parent.create({
    data: {
      userId: parentUser.id,
      name: 'Anjali Sharma',
      phone: '9876543210',
    },
  });
  // Connect Student & Parent
  await prisma.studentParent.create({
    data: {
      studentId: studentProfile.id,
      parentId: parentProfile.id,
    },
  });
  console.log('Parent user, profile, and connection created.');

  // 8. Create some initial sample data (Notice & Event)
  await prisma.notice.create({
    data: {
      titleEn: 'Welcome to the New Academic Session!',
      titleHi: 'नवा शैक्षणिक सत्र में आपका स्वागत है!',
      contentEn: 'We are excited to welcome all students to the 2026-27 academic session.',
      contentHi: 'हम 2026-27 शैक्षणिक सत्र में सभी छात्रों का स्वागत करने के लिए उत्साहित हैं।',
      slug: 'welcome-2026-27',
      published: true,
      isPinned: true,
      isPublic: true,
      createdBy: adminUser.id,
    },
  });
  console.log('Sample Notice created.');

  console.log('Database Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
