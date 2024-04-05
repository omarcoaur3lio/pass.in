import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "8f381006-0bf0-449d-93f0-402896a44edc",
      title: "My first event",
      slug: "my-first-event",
      details: "This is my first event",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Seeding complete!");
  prisma.$disconnect;
});
