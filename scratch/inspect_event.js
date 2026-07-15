const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== Inspecting Event ===");
  const event = await prisma.event.findUnique({ where: { id: 'cmrm1k10s0001l104ejiqb4qp' } });
  console.log("Event:", event);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
