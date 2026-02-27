import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Restoring database to Hyper Cleaning Supplies...\n');

  // Step 1: Clear existing data
  console.log('Step 1: Clearing existing data...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('✅ Existing data cleared\n');

  // Step 2: Create cleaning supply categories
  console.log('Step 2: Creating cleaning supply categories...');
  const categoriesData = [
    { name: 'Cleaning Chemicals', slug: 'cleaning-chemicals' },
    { name: 'Bathroom Care', slug: 'bathroom-care' },
    { name: 'Kitchen Care', slug: 'kitchen-care' },
    { name: 'Floor Care', slug: 'floor-care' },
    { name: 'Dispensers', slug: 'dispensers' },
    { name: 'Gloves', slug: 'gloves' },
    { name: 'Paper Products', slug: 'paper-products' },
  ];

  for (const cat of categoriesData) {
    await prisma.category.create({ data: cat });
  }
  console.log('✅ Categories created\n');

  // Step 3: Get categories
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(
    categories.map(c => [c.slug, c.id])
  );

  // Step 4: Create cleaning products
  console.log('Step 3: Creating cleaning supply products...');
  const productsData = [
    {
      title: 'Continu 2 in 1 Surface Cleaner & Disinfectant - 5 Litres',
      description: 'Professional-grade surface cleaner and disinfectant. Kills 99.9% of bacteria and viruses. Perfect for all hard surfaces.',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80',
      categoryId: categoryMap['cleaning-chemicals'],
      stock: 150,
      rating: 4.8,
    },
    {
      title: 'Heavy Duty Bathroom Cleaner - 750ml',
      description: 'Powerful bathroom cleaner that removes limescale, soap scum, and grime. Fresh scent.',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80',
      categoryId: categoryMap['bathroom-care'],
      stock: 200,
      rating: 4.7,
      discountPercentage: 10,
    },
    {
      title: 'Kitchen Degreaser Spray - 1 Litre',
      description: 'Industrial strength degreaser for kitchen surfaces, ovens, and grills. Cuts through tough grease.',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
      categoryId: categoryMap['kitchen-care'],
      stock: 120,
      rating: 4.9,
    },
    {
      title: 'Multi-Surface Floor Cleaner - 5 Litres',
      description: 'Concentrated floor cleaner suitable for all floor types. Leaves no residue and dries quickly.',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80',
      categoryId: categoryMap['floor-care'],
      stock: 100,
      rating: 4.6,
      discountPercentage: 15,
    },
    {
      title: 'Automatic Soap Dispenser - Wall Mount',
      description: 'Touchless automatic soap dispenser with 1000ml capacity. Battery operated, ideal for commercial use.',
      price: 45.99,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80',
      categoryId: categoryMap['dispensers'],
      stock: 50,
      rating: 4.8,
    },
    {
      title: 'Heavy Duty Rubber Gloves - Large (Pack of 12)',
      description: 'Professional rubber gloves with textured grip. Chemical resistant and durable.',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1603712725038-c0e8e3f7e0b6?w=800&q=80',
      categoryId: categoryMap['gloves'],
      stock: 180,
      rating: 4.7,
    },
    {
      title: 'Industrial Paper Towels - 6 Rolls',
      description: 'Extra absorbent paper towels for commercial use. 200 sheets per roll.',
      price: 22.99,
      imageUrl: 'https://images.unsplash.com/photo-1584556326561-c8746083993b?w=800&q=80',
      categoryId: categoryMap['paper-products'],
      stock: 250,
      rating: 4.5,
      discountAmount: 5,
    },
    {
      title: 'Glass & Window Cleaner - 750ml',
      description: 'Streak-free glass cleaner with ammonia. Perfect for windows, mirrors, and glass surfaces.',
      price: 7.99,
      imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80',
      categoryId: categoryMap['cleaning-chemicals'],
      stock: 160,
      rating: 4.6,
    },
    {
      title: 'Toilet Bowl Cleaner - 1 Litre',
      description: 'Thick formula toilet cleaner that clings to bowl. Removes stains and kills germs.',
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80',
      categoryId: categoryMap['bathroom-care'],
      stock: 140,
      rating: 4.8,
    },
    {
      title: 'Stainless Steel Polish - 500ml',
      description: 'Professional stainless steel cleaner and polish. Leaves a protective shine.',
      price: 11.99,
      imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
      categoryId: categoryMap['kitchen-care'],
      stock: 90,
      rating: 4.7,
    },
    {
      title: 'Disinfectant Wipes - 500 Count Bucket',
      description: 'Pre-moistened disinfectant wipes. Kills 99.9% of germs. Ideal for high-touch surfaces.',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1584556326561-c8746083993b?w=800&q=80',
      categoryId: categoryMap['cleaning-chemicals'],
      stock: 110,
      rating: 4.9,
      discountPercentage: 20,
    },
    {
      title: 'Microfiber Cleaning Cloths - Pack of 24',
      description: 'Professional microfiber cloths for all cleaning tasks. Machine washable and reusable.',
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1603712725038-c0e8e3f7e0b6?w=800&q=80',
      categoryId: categoryMap['cleaning-chemicals'],
      stock: 200,
      rating: 4.8,
    },
    {
      title: 'Floor Mop & Bucket Set',
      description: 'Commercial-grade mop and bucket with wringer. Durable and easy to use.',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80',
      categoryId: categoryMap['floor-care'],
      stock: 60,
      rating: 4.6,
    },
    {
      title: 'Hand Sanitizer Gel - 5 Litres',
      description: '70% alcohol hand sanitizer gel. Kills 99.9% of germs. Moisturizing formula.',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&q=80',
      categoryId: categoryMap['cleaning-chemicals'],
      stock: 130,
      rating: 4.9,
    },
    {
      title: 'Nitrile Gloves - Box of 100 (Medium)',
      description: 'Powder-free nitrile gloves. Latex-free and chemical resistant. Perfect for cleaning tasks.',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1603712725038-c0e8e3f7e0b6?w=800&q=80',
      categoryId: categoryMap['gloves'],
      stock: 170,
      rating: 4.7,
      discountPercentage: 10,
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({ data: product });
  }
  console.log(`✅ Created ${productsData.length} products\n`);

  // Step 5: Create admin user
  console.log('Step 4: Creating admin user...');
  const adminPassword = await bcrypt.hash('HyperClean@2024$Admin!', 10);
  await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@hypercleaning.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Admin user created\n');

  console.log('═══════════════════════════════════════════════════');
  console.log('✅ Database restored to Hyper Cleaning Supplies!');
  console.log('═══════════════════════════════════════════════════');
  console.log('\n📊 Summary:');
  console.log(`   - Categories: ${categoriesData.length}`);
  console.log(`   - Products: ${productsData.length}`);
  console.log(`   - Admin user: ${process.env.ADMIN_EMAIL || 'admin@hypercleaning.com'}`);
  console.log('\n🔑 Admin Credentials:');
  console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@hypercleaning.com'}`);
  console.log(`   Password: HyperClean@2024$Admin!`);
  console.log('\n');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
