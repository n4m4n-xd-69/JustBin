import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { RATE_CATEGORIES } from "../src/lib/data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed default admin user
  const adminEmail = "admin@justbin.com";
  const adminPassword = "admin123"; // Default password
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
      passwordHash: adminPasswordHash,
    },
    create: {
      email: adminEmail,
      name: "JustBin Admin",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  console.log(`✅ Default admin user created:`);
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log(`   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN!\n`);

  // Seed scrap categories and rates
  for (const [i, category] of RATE_CATEGORIES.entries()) {
    const created = await prisma.scrapCategory.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        icon: category.icon,
        description: category.description,
        sortOrder: i,
      },
      create: {
        slug: category.slug,
        name: category.name,
        icon: category.icon,
        description: category.description,
        sortOrder: i,
      },
    });

    await prisma.scrapItem.deleteMany({ where: { categoryId: created.id } });
    await prisma.scrapItem.createMany({
      data: category.items.map((item, j) => ({
        name: item.name,
        price: item.price,
        icon: item.icon,
        sortOrder: j,
        categoryId: created.id,
      })),
    });
  }

  console.log(`✅ Seeded ${RATE_CATEGORIES.length} scrap categories with rates.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
