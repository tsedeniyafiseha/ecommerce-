import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('🌱 Starting database seed...');

  // Delete all existing data
  console.log('🗑️  Deleting existing products...');
  await prisma.product.deleteMany();
  
  console.log('🗑️  Deleting existing categories...');
  await prisma.category.deleteMany();

  // Create food categories
  console.log('📦 Creating food categories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Spices & Herbs',
        slug: 'spices-herbs',
        description: 'Premium quality spices and herbs from around the world',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Baking Essentials',
        slug: 'baking-essentials',
        description: 'Everything you need for perfect baking',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Grains & Pulses',
        slug: 'grains-pulses',
        description: 'Wholesome grains and nutritious pulses',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Oils & Vinegars',
        slug: 'oils-vinegars',
        description: 'Premium cooking oils and artisan vinegars',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sweeteners',
        slug: 'sweeteners',
        description: 'Natural and refined sweeteners for all your needs',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Nuts & Seeds',
        slug: 'nuts-seeds',
        description: 'Fresh nuts and seeds packed with nutrition',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Dried Fruits',
        slug: 'dried-fruits',
        description: 'Sun-dried and naturally preserved fruits',
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create food products
  console.log('🍎 Creating food products...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: 'Organic Turmeric Powder',
        description: 'Premium organic turmeric powder from India, perfect for curries and golden milk',
        price: 12.99,
        stock: 100,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800',
        categoryId: categories[0].id, // Spices & Herbs
      },
    }),
    prisma.product.create({
      data: {
        title: 'Extra Virgin Olive Oil',
        description: 'Cold-pressed extra virgin olive oil from Mediterranean groves',
        price: 24.99,
        stock: 50,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
        categoryId: categories[3].id, // Oils & Vinegars
      },
    }),
    prisma.product.create({
      data: {
        title: 'Organic Quinoa',
        description: 'Premium white quinoa, protein-rich and gluten-free',
        price: 15.99,
        stock: 75,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
        categoryId: categories[2].id, // Grains & Pulses
      },
    }),
    prisma.product.create({
      data: {
        title: 'Raw Honey',
        description: 'Pure raw honey from local beekeepers, unfiltered and unpasteurized',
        price: 18.99,
        stock: 60,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784422?w=800',
        categoryId: categories[4].id, // Sweeteners
      },
    }),
    prisma.product.create({
      data: {
        title: 'Almond Flour',
        description: 'Finely ground blanched almond flour, perfect for gluten-free baking',
        price: 16.99,
        stock: 80,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1599909533730-f9d7e2c1c9b5?w=800',
        categoryId: categories[1].id, // Baking Essentials
      },
    }),
    prisma.product.create({
      data: {
        title: 'Mixed Nuts',
        description: 'Premium blend of cashews, almonds, and walnuts',
        price: 22.99,
        stock: 45,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800',
        categoryId: categories[5].id, // Nuts & Seeds
      },
    }),
    prisma.product.create({
      data: {
        title: 'Dried Apricots',
        description: 'Sweet and tangy sun-dried apricots, no added sugar',
        price: 13.99,
        stock: 90,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800',
        categoryId: categories[6].id, // Dried Fruits
      },
    }),
    prisma.product.create({
      data: {
        title: 'Himalayan Pink Salt',
        description: 'Pure Himalayan pink salt crystals, rich in minerals',
        price: 9.99,
        stock: 120,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=800',
        categoryId: categories[0].id, // Spices & Herbs
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Verify the data
  const categoryCount = await prisma.category.count();
  const productCount = await prisma.product.count();

  console.log('\n✨ Seed completed successfully!');
  console.log(`📊 Total categories: ${categoryCount}`);
  console.log(`📊 Total products: ${productCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
