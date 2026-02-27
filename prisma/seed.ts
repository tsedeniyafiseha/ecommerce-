import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create categories for food ingredients
  const categoriesData = [
    { name: 'Spices & Herbs', slug: 'spices-herbs' },
    { name: 'Baking Essentials', slug: 'baking-essentials' },
    { name: 'Oils & Vinegars', slug: 'oils-vinegars' },
    { name: 'Grains & Flours', slug: 'grains-flours' },
    { name: 'Sauces & Condiments', slug: 'sauces-condiments' },
    { name: 'Dried Fruits & Nuts', slug: 'dried-fruits-nuts' },
    { name: 'International Ingredients', slug: 'international-ingredients' },
  ];

  console.log('Creating categories...');
  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Get created categories
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(
    categories.map(c => [c.slug, c.id])
  );

  // Create sample products with high-quality matching images
  const productsData = [
    {
      title: 'Organic Turmeric Powder',
      description: 'Premium organic turmeric powder from India, perfect for curries and golden milk',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
      categoryId: categoryMap['spices-herbs'],
      stock: 100,
      rating: 4.8,
    },
    {
      title: 'Himalayan Pink Salt',
      description: 'Pure Himalayan pink salt crystals, rich in minerals',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=800&q=80',
      categoryId: categoryMap['spices-herbs'],
      stock: 150,
      rating: 4.9,
      discountPercentage: 10,
    },
    {
      title: 'Organic Coconut Flour',
      description: 'Gluten-free coconut flour, perfect for baking and low-carb recipes',
      price: 14.99,
      imageUrl: 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=800&q=80',
      categoryId: categoryMap['baking-essentials'],
      stock: 80,
      rating: 4.7,
    },
    {
      title: 'Extra Virgin Olive Oil',
      description: 'Cold-pressed extra virgin olive oil from Greece, 500ml',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
      categoryId: categoryMap['oils-vinegars'],
      stock: 60,
      rating: 4.9,
    },
    {
      title: 'Organic Quinoa',
      description: 'Premium white quinoa, protein-rich superfood, 1kg',
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
      categoryId: categoryMap['grains-flours'],
      stock: 90,
      rating: 4.6,
      discountPercentage: 15,
    },
    {
      title: 'Artisan Balsamic Vinegar',
      description: 'Aged balsamic vinegar from Modena, Italy, 250ml',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1608181831042-c5a1e1ddd50a?w=800&q=80',
      categoryId: categoryMap['oils-vinegars'],
      stock: 40,
      rating: 4.8,
    },
    {
      title: 'Raw Almonds',
      description: 'Premium raw almonds, perfect for snacking or baking, 500g',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80',
      categoryId: categoryMap['dried-fruits-nuts'],
      stock: 120,
      rating: 4.7,
    },
    {
      title: 'Japanese Soy Sauce',
      description: 'Authentic Japanese soy sauce, naturally brewed, 500ml',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80',
      categoryId: categoryMap['international-ingredients'],
      stock: 70,
      rating: 4.9,
      discountAmount: 3,
    },
  ];

  console.log('Creating products...');
  for (const product of productsData) {
    await prisma.product.upsert({
      where: { id: 0 }, // Will never match, always creates
      update: {},
      create: product,
    });
  }

  // Create admin user
  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('FreshPantry@2024$Secure!', 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@localhost.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@localhost.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });

  // Create test user
  console.log('Creating test user...');
  const testPassword = await bcrypt.hash('Test123!', 10);
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      passwordHash: testPassword,
      role: 'user',
      emailVerified: new Date(),
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin credentials: admin@localhost.com / FreshPantry@2024$Secure!');
  console.log('Test user credentials: test@example.com / Test123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
