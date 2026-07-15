const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const students = await prisma.student.findMany();
  console.log("\n=== All Students ===");
  students.forEach(s => console.log(`${s.id} | ${s.firstName} ${s.lastName} | ${s.userId}`));

  const notices = await prisma.notice.findMany();
  console.log("\n=== All Notices ===");
  notices.forEach(n => console.log(`${n.id} | ${n.titleEn}`));

  const events = await prisma.event.findMany();
  console.log("\n=== All Events ===");
  events.forEach(e => console.log(`${e.id} | ${e.titleEn}`));

  const albums = await prisma.gallery.findMany();
  console.log("\n=== All Albums ===");
  albums.forEach(a => console.log(`${a.id} | ${a.titleEn}`));

  const admissions = await prisma.admission.findMany();
  console.log("\n=== All Admissions ===");
  admissions.forEach(a => console.log(`${a.id} | ${a.studentName}`));
  
  const users = await prisma.user.findMany({ include: { roles: { include: { role: true } } } });
  console.log("\n=== All Users ===");
  users.forEach(u => console.log(`${u.id} | ${u.email} | ${u.roles.map(r => r.role.name).join(', ')}`));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
