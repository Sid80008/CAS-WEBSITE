const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  if (prisma.assignment) {
    const assignments = await prisma.assignment.findMany();
    console.log("\n=== All Assignments ===");
    assignments.forEach(a => console.log(`${a.id} | ${a.title}`));
  }

  if (prisma.achievement) {
    const achievements = await prisma.achievement.findMany();
    console.log("\n=== All Achievements ===");
    achievements.forEach(a => console.log(`${a.id} | ${a.titleEn}`));
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
