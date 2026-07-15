const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findRahul() {
  const students = await prisma.student.findMany({
    where: {
      firstName: { contains: 'Rahul' }
    },
    include: {
      fees: { include: { structure: true } },
      parents: { include: { parent: { include: { user: true } } } }
    }
  });

  console.dir(students, { depth: null });
}
findRahul().finally(() => prisma.$disconnect());
