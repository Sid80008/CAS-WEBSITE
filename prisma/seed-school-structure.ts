import { PrismaClient, EventType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding School Academic Structure, Subjects, Events, and Toppers...');

  // 1. Seed Academic Year
  const academicYear = await prisma.academicYear.upsert({
    where: { id: 'ay-2026-27' },
    update: {},
    create: {
      id: 'ay-2026-27',
      name: '2026-27',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
    },
  });
  console.log(`Academic Year ${academicYear.name} seeded.`);

  // 2. Define Classes and their associated Subjects
  const classDefs = [
    {
      name: 'Nursery',
      subjects: ['English Oral & Written', 'Hindi Oral & Written', 'Mathematics (1-50)', 'Art & Craft'],
    },
    {
      name: 'LKG',
      subjects: ['English Reading & Writing', 'Hindi Reading & Writing', 'Mathematics (1-100)', 'Art & Craft', 'General Awareness'],
    },
    {
      name: 'UKG',
      subjects: ['English Primer', 'Hindi Swar & Vyanjan', 'Mathematics (Addition/Subtraction)', 'Art & Craft', 'EVS & Oral'],
    },
    {
      name: 'Class I',
      subjects: ['English Literature', 'English Grammar', 'Hindi Sahitya', 'Hindi Vyakaran', 'Mathematics', 'Environmental Studies (EVS)', 'Computer Science', 'General Knowledge'],
    },
    {
      name: 'Class II',
      subjects: ['English Literature', 'English Grammar', 'Hindi Sahitya', 'Hindi Vyakaran', 'Mathematics', 'Environmental Studies (EVS)', 'Computer Science', 'General Knowledge'],
    },
    {
      name: 'Class III',
      subjects: ['English Literature', 'English Grammar', 'Hindi Sahitya', 'Hindi Vyakaran', 'Mathematics', 'Environmental Studies (EVS)', 'Computer Science', 'General Knowledge'],
    },
    {
      name: 'Class IV',
      subjects: ['English Literature', 'English Grammar', 'Hindi Sahitya', 'Hindi Vyakaran', 'Mathematics', 'Environmental Studies (EVS)', 'Computer Science', 'General Knowledge'],
    },
    {
      name: 'Class V',
      subjects: ['English Literature', 'English Grammar', 'Hindi Sahitya', 'Hindi Vyakaran', 'Mathematics', 'Environmental Studies (EVS)', 'Computer Science', 'General Knowledge'],
    },
    {
      name: 'Class VI',
      subjects: ['English Literature & Grammar', 'Hindi Literature & Vyakaran', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer Science'],
    },
    {
      name: 'Class VII',
      subjects: ['English Literature & Grammar', 'Hindi Literature & Vyakaran', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer Science'],
    },
    {
      name: 'Class VIII',
      subjects: ['English Literature & Grammar', 'Hindi Literature & Vyakaran', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer Science'],
    },
    {
      name: 'Class IX',
      subjects: ['English Language & Literature', 'Hindi Course A', 'Mathematics', 'Science', 'Social Science', 'Information Technology'],
    },
    {
      name: 'Class X',
      subjects: ['English Language & Literature', 'Hindi Course A', 'Mathematics', 'Science', 'Social Science', 'Information Technology'],
    },
    {
      name: 'Class XI (Science)',
      subjects: ['English Core', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    },
    {
      name: 'Class XI (Commerce)',
      subjects: ['English Core', 'Accountancy', 'Business Studies', 'Economics', 'Informatics Practices'],
    },
    {
      name: 'Class XI (Arts)',
      subjects: ['English Core', 'History', 'Geography', 'Political Science', 'Economics'],
    },
    {
      name: 'Class XII (Science)',
      subjects: ['English Core', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    },
    {
      name: 'Class XII (Commerce)',
      subjects: ['English Core', 'Accountancy', 'Business Studies', 'Economics', 'Informatics Practices'],
    },
    {
      name: 'Class XII (Arts)',
      subjects: ['English Core', 'History', 'Geography', 'Political Science', 'Economics'],
    },
  ];

  // 3. Seed Classes, Sections, and Subjects
  for (const cDef of classDefs) {
    // Upsert Class
    let schoolClass = await prisma.class.findFirst({
      where: { name: cDef.name },
    });

    if (!schoolClass) {
      schoolClass = await prisma.class.create({
        data: { name: cDef.name },
      });
    }

    console.log(`Seeding subjects and sections for ${schoolClass.name}...`);

    // Create Sections A and B for this class
    const sectionNames = ['A', 'B'];
    for (const secName of sectionNames) {
      const section = await prisma.section.findFirst({
        where: { name: secName, classId: schoolClass.id },
      });

      if (!section) {
        await prisma.section.create({
          data: {
            name: secName,
            classId: schoolClass.id,
          },
        });
      }
    }

    // Create Subjects for this class
    for (const subName of cDef.subjects) {
      const subject = await prisma.subject.findFirst({
        where: { name: subName, classId: schoolClass.id },
      });

      if (!subject) {
        await prisma.subject.create({
          data: {
            name: subName,
            classId: schoolClass.id,
          },
        });
      }
    }
  }

  // 4. Seed Events
  const eventsToSeed = [
    {
      titleEn: 'Annual Sports Meet - Spardha 2026',
      titleHi: 'वार्षिक खेलकूद महोत्सव - स्पर्धा २०२६',
      descriptionEn: 'Join us for our school annual sports day showcasing athletics, football, and team competitions.',
      descriptionHi: 'एथलेटिक्स, फुटबॉल और टीम प्रतियोगिताओं का प्रदर्शन करने वाले हमारे स्कूल के वार्षिक खेल दिवस में शामिल हों।',
      date: new Date('2026-10-15T09:00:00.000Z'),
      slug: 'annual-sports-meet-2026',
      published: true,
      eventType: EventType.SPORTS,
    },
    {
      titleEn: 'Annual Cultural Fest - Tarang 2026',
      titleHi: 'वार्षिक सांस्कृतिक उत्सव - तरंग २०२६',
      descriptionEn: 'A celebration of dance, music, drama, and fine arts performed by our talented students.',
      descriptionHi: 'हमारे प्रतिभाशाली छात्रों द्वारा प्रस्तुत नृत्य, संगीत, नाटक और ललित कलाओं का उत्सव।',
      date: new Date('2026-11-20T10:00:00.000Z'),
      slug: 'annual-cultural-fest-2026',
      published: true,
      eventType: EventType.CULTURAL,
    },
    {
      titleEn: 'Science & Arts Exhibition 2026',
      titleHi: 'विज्ञान एवं कला प्रदर्शनी २०२६',
      descriptionEn: 'Students showcase their working scientific models, technological concepts, and artistic paintings.',
      descriptionHi: 'छात्र अपने काम करने वाले वैज्ञानिक मॉडल, तकनीकी अवधारणाओं और कलात्मक चित्रों का प्रदर्शन करते हैं।',
      date: new Date('2026-12-05T09:00:00.000Z'),
      slug: 'science-arts-exhibition-2026',
      published: true,
      eventType: EventType.OTHER,
    },
    {
      titleEn: 'Half-Yearly Examination 2026',
      titleHi: 'अर्धवार्षिक परीक्षा २०२६',
      descriptionEn: 'Academic assessment exams for Classes I to XII.',
      descriptionHi: 'कक्षा १ से १२ के लिए शैक्षणिक मूल्यांकन परीक्षाएं।',
      date: new Date('2026-09-10T08:00:00.000Z'),
      slug: 'half-yearly-examination-2026',
      published: true,
      eventType: EventType.EXAM,
    },
    {
      titleEn: 'Parent-Teacher Meeting (PTM)',
      titleHi: 'अभिभावक-शिक्षक बैठक (पीटीएम)',
      descriptionEn: 'Discuss academic progress and term performance of students.',
      descriptionHi: 'छात्रों की शैक्षणिक प्रगति और अवधि के प्रदर्शन पर चर्चा करें।',
      date: new Date('2026-10-05T08:30:00.000Z'),
      slug: 'parent-teacher-meeting-oct-2026',
      published: true,
      eventType: EventType.MEETING,
    },
  ];

  // Fetch admin user ID to associate as creator
  const adminUser = await prisma.user.findFirst({
    where: { roles: { some: { role: { name: 'ADMIN' } } } },
  });

  const creatorId = adminUser ? adminUser.id : (await prisma.user.findFirst())?.id;

  if (creatorId) {
    for (const ev of eventsToSeed) {
      await prisma.event.upsert({
        where: { slug: ev.slug },
        update: {
          titleEn: ev.titleEn,
          titleHi: ev.titleHi,
          descriptionEn: ev.descriptionEn,
          descriptionHi: ev.descriptionHi,
          date: ev.date,
          eventType: ev.eventType,
          published: ev.published,
        },
        create: {
          ...ev,
          createdBy: creatorId,
        },
      });
    }
    console.log('Events seeded.');
  } else {
    console.log('Skipping event seed: No User found to assign as creator.');
  }

  // 5. Seed Toppers
  const toppersToSeed = [
    {
      name: 'Priya Patel',
      class: 'Class XII (Science)',
      year: '2025-26',
      percentage: 97.2,
      imageUrl: '/gallery/students/top-2.jpg',
    },
    {
      name: 'Rahul Sharma',
      class: 'Class X',
      year: '2025-26',
      percentage: 95.8,
      imageUrl: '/gallery/students/top-1.jpg',
    },
    {
      name: 'Amit Verma',
      class: 'Class XII (Commerce)',
      year: '2025-26',
      percentage: 94.6,
      imageUrl: '/gallery/students/top-3.jpg',
    },
    {
      name: 'Sneha Meena',
      class: 'Class X',
      year: '2025-26',
      percentage: 94.2,
      imageUrl: '/gallery/students/top-4.jpg',
    },
  ];

  for (const t of toppersToSeed) {
    const topper = await prisma.topper.findFirst({
      where: { name: t.name, year: t.year },
    });

    if (!topper) {
      await prisma.topper.create({
        data: {
          name: t.name,
          class: t.class,
          year: t.year,
          percentage: t.percentage,
          imageUrl: t.imageUrl,
          academicYearId: academicYear.id,
        },
      });
    } else {
      await prisma.topper.update({
        where: { id: topper.id },
        data: {
          class: t.class,
          percentage: t.percentage,
          imageUrl: t.imageUrl,
        },
      });
    }
  }
  console.log('Toppers seeded.');

  console.log('All school structure, subjects, events, and toppers seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
