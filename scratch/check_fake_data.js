const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== Checking for Fake Students ===");
  const fakeStudents = await prisma.student.findMany({
    where: {
      OR: [
        { firstName: { contains: 'Test', mode: 'insensitive' } },
        { firstName: { contains: 'Demo', mode: 'insensitive' } },
        { lastName: { contains: 'Test', mode: 'insensitive' } },
        { lastName: { contains: 'Demo', mode: 'insensitive' } }
      ]
    }
  });
  console.log("Fake Students:", fakeStudents.map(s => `${s.id} - ${s.firstName} ${s.lastName}`));

  console.log("\n=== Checking for Fake Notices ===");
  const fakeNotices = await prisma.notice.findMany({
    where: {
      OR: [
        { titleEn: { contains: 'Test', mode: 'insensitive' } },
        { titleEn: { contains: 'Demo', mode: 'insensitive' } },
        { titleEn: { contains: 'Sample', mode: 'insensitive' } },
        { contentEn: { contains: 'Lorem', mode: 'insensitive' } }
      ]
    }
  });
  console.log("Fake Notices:", fakeNotices.map(n => `${n.id} - ${n.titleEn}`));

  console.log("\n=== Checking for Fake Events ===");
  const fakeEvents = await prisma.event.findMany({
    where: {
      OR: [
        { titleEn: { contains: 'Test', mode: 'insensitive' } },
        { titleEn: { contains: 'Demo', mode: 'insensitive' } },
        { titleEn: { contains: 'Sample', mode: 'insensitive' } },
        { descriptionEn: { contains: 'Lorem', mode: 'insensitive' } }
      ]
    }
  });
  console.log("Fake Events:", fakeEvents.map(e => `${e.id} - ${e.titleEn}`));

  console.log("\n=== Checking for Fake Gallery Albums ===");
  const fakeAlbums = await prisma.gallery.findMany({
    where: {
      OR: [
        { titleEn: { contains: 'Test', mode: 'insensitive' } },
        { titleEn: { contains: 'Demo', mode: 'insensitive' } },
        { titleEn: { contains: 'Sample', mode: 'insensitive' } },
        { description: { contains: 'Lorem', mode: 'insensitive' } }
      ]
    }
  });
  console.log("Fake Albums:", fakeAlbums.map(a => `${a.id} - ${a.titleEn}`));

  console.log("\n=== Checking for Fake Admissions ===");
  const fakeAdmissions = await prisma.admission.findMany({
    where: {
      OR: [
        { studentName: { contains: 'Test', mode: 'insensitive' } },
        { studentName: { contains: 'Demo', mode: 'insensitive' } },
        { parentName: { contains: 'Test', mode: 'insensitive' } },
        { parentName: { contains: 'Demo', mode: 'insensitive' } }
      ]
    }
  });
  console.log("Fake Admissions:", fakeAdmissions.map(a => `${a.id} - ${a.studentName}`));
  
  // also get all users to see if there are demo accounts
  console.log("\n=== Checking for Fake Users ===");
  const fakeUsers = await prisma.user.findMany({
    where: {
      email: { contains: 'demo', mode: 'insensitive' }
    }
  });
  console.log("Fake Users:", fakeUsers.map(u => `${u.id} - ${u.email}`));

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
