import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  // 1. Create Roles
  const roles = ['ADMIN', 'OFFICE', 'TEACHER', 'PARENT']
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    })
  }
  console.log('Roles created.')

  // 2. Create Initial Academic Year
  const currentYear = await prisma.academicYear.create({
    data: {
      name: '2026-27',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
    },
  })
  console.log(`Academic year ${currentYear.name} created.`)

  // 3. Create Sample Classes
  const classNames = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
  for (const className of classNames) {
    await prisma.class.create({
      data: {
        name: className,
        sections: {
          create: [{ name: 'A' }, { name: 'B' }],
        },
      },
    })
  }
  console.log('Classes and sections created.')

  // 4. Create an Admin User
  const passwordHash = await bcrypt.hash('admin_password_123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@casanta.com' },
    update: { password: passwordHash },
    create: {
      email: 'admin@casanta.com',
      password: passwordHash,
      isActive: true,
      roles: {
        create: {
          role: { connect: { name: 'ADMIN' } }
        }
      }
    },
  })
  console.log('Admin user status updated.')

  // 5. Create a Sample Notice
  await prisma.notice.create({
    data: {
      titleEn: 'Welcome to the New School Session!',
      titleHi: 'नवा शैक्षणिक सत्र में आपका स्वागत है!',
      contentEn: 'We are excited to welcome all students to the 2026-27 academic session.',
      contentHi: 'हम 2026-27 शैक्षणिक सत्र में सभी छात्रों का स्वागत करने के लिए उत्साहित हैं।',
      slug: 'welcome-2026-27',
      published: true,
      isPinned: true,
      author: { connect: { id: adminUser.id } }
    }
  })
  console.log('Sample notice created.')

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // await prisma.$disconnect()
  })
