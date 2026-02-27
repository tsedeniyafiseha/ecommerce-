import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning up old categories...');

  // Delete old cleaning-related categories
  const oldCategories = [
    'cleaning-chemicals',
    'bathroom-care',
    'kitchen-care',
    'floor-care',
    'dispensers',
    'gloves',
    'paper-products',
    'test'
  ];

  for (const slug of oldCategories) {
    const deleted = await prisma.category.deleteMany({
      where: { slug }
    });
    if (deleted.count > 0) {
      console.log(`✓ Deleted category: ${slug}`);
    }
  }

  console.log('\n✅ Cleanup complete!');
  console.log('Current categories should only be food-related now.');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
