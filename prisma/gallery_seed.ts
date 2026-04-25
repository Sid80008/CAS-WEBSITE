import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  let user = await prisma.user.findFirst();
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "admin@casanta.edu.in",
        password: "hashed_password", // Placeholder
        isActive: true
      }
    });
  }

  const userId = user.id;

  const albums = [
    {
      titleEn: "Annual Sports Meet 2024",
      titleHi: "वार्षिक खेलकूद समारोह 2024",
      images: [
        "/gallery/photo-dump/1741166362_slider-17.jpg",
        "/gallery/photo-dump/1741166412_slider-20.jpg",
        "/gallery/photo-dump/1741166451_slider-21.jpg"
      ],
      published: true
    },
    {
      titleEn: "Classroom Life & Learning",
      titleHi: "कक्षा जीवन और सीखना",
      images: [
        "/gallery/students/1741166797-7.jpeg",
        "/gallery/students/1741166816-9.jpeg",
        "/gallery/students/1741166831-10.jpeg"
      ],
      published: true
    },
    {
      titleEn: "Campus Infrastructure",
      titleHi: "कैंपस का बुनियादी ढांचा",
      images: [
        "/gallery/photo-dump/1746853764_DSC_3837.jpg",
        "/gallery/slider/1774511691_slider-52.jpg"
      ],
      published: true
    },
    {
      titleEn: "Cultural Celebrations",
      titleHi: "सांस्कृतिक उत्सव",
      images: [
        "/gallery/photo-dump/celebration.jpg",
        "/gallery/photo-dump/1758789718_WhatsApp Image 2025-09-25 at 2.jpeg"
      ],
      published: true
    }
  ];

  for (const album of albums) {
    await prisma.gallery.create({
      data: {
        titleEn: album.titleEn,
        titleHi: album.titleHi,
        published: album.published,
        createdBy: userId,
        media: {
          create: album.images.map(img => ({ url: img }))
        }
      }
    });
  }

  // Also seed Slider table
  const sliders = [
    { imageUrl: "/gallery/slider/1741074055_slider-14.jpg", title: "Future Ready Labs", order: 1 },
    { imageUrl: "/gallery/slider/1741074074_slider-15.jpg", title: "Sports Excellence", order: 2 },
    { imageUrl: "/gallery/slider/1741166362_slider-17.jpg", title: "Dynamic Campus", order: 3 }
  ];

  for (const slider of sliders) {
    await prisma.slider.create({ data: slider });
  }

  console.log("Gallery and slider seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
