/**
 * Phase 3 — Events Seed
 * Run: npx ts-node --project tsconfig.json scripts/seed-events.ts
 * Or:  npx tsx scripts/seed-events.ts
 *
 * Seeds real school events so the Events page is never empty.
 * Adjust dates once confirmed with school admin.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// You need an admin user ID to set createdBy — query the DB for it.
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@centralacademyantah.edu.in";

const events = [
  {
    titleEn: "Annual Prize Distribution Ceremony",
    titleHi: "वार्षिक पुरस्कार वितरण समारोह",
    descriptionEn:
      "Annual prize distribution and farewell ceremony for graduating students of Class XII, honouring academic excellence and co-curricular achievements.",
    descriptionHi:
      "कक्षा XII के विद्यार्थियों के लिए वार्षिक पुरस्कार वितरण और विदाई समारोह।",
    date: new Date("2025-03-15T09:00:00"),
    slug: "annual-prize-distribution-2025",
    published: true,
  },
  {
    titleEn: "Independence Day Celebration",
    titleHi: "स्वतंत्रता दिवस समारोह",
    descriptionEn:
      "Flag hoisting ceremony, cultural programs, and parade to celebrate India's 79th Independence Day.",
    descriptionHi:
      "भारत के 79वें स्वतंत्रता दिवस पर ध्वजारोहण, सांस्कृतिक कार्यक्रम और परेड।",
    date: new Date("2025-08-15T08:00:00"),
    slug: "independence-day-2025",
    published: true,
  },
  {
    titleEn: "Teachers' Day Celebration",
    titleHi: "शिक्षक दिवस समारोह",
    descriptionEn:
      "Honouring our teachers with cultural performances and felicitation ceremony on the occasion of Teachers' Day.",
    descriptionHi:
      "शिक्षक दिवस के अवसर पर सांस्कृतिक प्रस्तुतियों और सम्मान समारोह के साथ गुरुओं का अभिनंदन।",
    date: new Date("2025-09-05T10:00:00"),
    slug: "teachers-day-2025",
    published: true,
  },
  {
    titleEn: "Annual Sports Day",
    titleHi: "वार्षिक खेल दिवस",
    descriptionEn:
      "Inter-house sports competition including athletics, cricket, kabaddi, volleyball, and more. Parents are cordially invited.",
    descriptionHi:
      "अंतर-हाउस खेल प्रतियोगिता — एथलेटिक्स, क्रिकेट, कबड्डी और अधिक।",
    date: new Date("2025-11-10T08:30:00"),
    slug: "annual-sports-day-2025",
    published: true,
  },
  {
    titleEn: "Diwali Cultural Program",
    titleHi: "दीपावली सांस्कृतिक कार्यक्रम",
    descriptionEn:
      "Rangoli competition, cultural performances, and Diwali celebrations bringing together the school community.",
    descriptionHi:
      "रंगोली प्रतियोगिता, सांस्कृतिक प्रस्तुतियाँ और दीपावली उत्सव।",
    date: new Date("2025-10-20T11:00:00"),
    slug: "diwali-cultural-2025",
    published: true,
  },
  {
    titleEn: "Republic Day Celebration",
    titleHi: "गणतंत्र दिवस समारोह",
    descriptionEn:
      "Flag hoisting, march past, and patriotic cultural programs celebrating India's Republic Day.",
    descriptionHi:
      "ध्वजारोहण, मार्च पास्ट और देशभक्तिपूर्ण सांस्कृतिक कार्यक्रम।",
    date: new Date("2026-01-26T08:00:00"),
    slug: "republic-day-2026",
    published: true,
  },
  {
    titleEn: "Annual Science Exhibition",
    titleHi: "वार्षिक विज्ञान प्रदर्शनी",
    descriptionEn:
      "Students showcase science projects and innovations. Open to parents and the public.",
    descriptionHi:
      "छात्र विज्ञान परियोजनाएं और नवाचार प्रस्तुत करते हैं। अभिभावकों के लिए खुली।",
    date: new Date("2026-02-12T09:00:00"),
    slug: "science-exhibition-2026",
    published: true,
  },
  {
    titleEn: "Board Exam Commencement (Class X & XII)",
    titleHi: "बोर्ड परीक्षा प्रारंभ (कक्षा X एवं XII)",
    descriptionEn:
      "CBSE board examinations begin for Class X and XII students. Best wishes to all appearing students.",
    descriptionHi:
      "कक्षा X और XII के छात्रों के लिए CBSE बोर्ड परीक्षाएं शुरू होंगी।",
    date: new Date("2026-02-20T09:00:00"),
    slug: "board-exams-2026",
    published: true,
  },
];

async function main() {
  console.log("🌱 Seeding events...");

  // Find or create a system admin user to assign as author
  const admin = await prisma.user.findFirst({
    where: { email: { contains: "admin" } },
  });

  if (!admin) {
    console.error(
      `❌ No admin user found. Create an admin user first, then re-run this script.`
    );
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;

  for (const event of events) {
    const existing = await prisma.event.findUnique({
      where: { slug: event.slug },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.event.create({
      data: {
        ...event,
        createdBy: admin.id,
      },
    });
    created++;
    console.log(`  ✅ Created: ${event.titleEn}`);
  }

  console.log(`\nDone! Created ${created} events, skipped ${skipped} existing.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
