import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Starting complete database cleanup...\n');

  // Delete in correct order due to foreign key constraints
  console.log('Deleting order items...');
  await prisma.orderItem.deleteMany({});
  console.log('✓ Order items deleted');

  console.log('Deleting orders...');
  await prisma.order.deleteMany({});
  console.log('✓ Orders deleted');

  console.log('Deleting cart items...');
  await prisma.cartItem.deleteMany({});
  console.log('✓ Cart items deleted');

  console.log('Deleting reviews...');
  await prisma.review.deleteMany({});
  console.log('✓ Reviews deleted');

  console.log('Deleting products...');
  await prisma.product.deleteMany({});
  console.log('✓ Products deleted');

  console.log('Deleting categories...');
  await prisma.category.deleteMany({});
  console.log('✓ Categories deleted\n');

  // Create ONLY food ingredient categories
  console.log('Creating food ingredient categories...');
  const categoriesData = [
    { name: 'Spices & Herbs', slug: 'spices-herbs' },
    { name: 'Baking Essentials', slug: 'baking-essentials' },
    { name: 'Oils & Vinegars', slug: 'oils-vinegars' },
    { name: 'Grains & Flours', slug: 'grains-flours' },
    { name: 'Sauces & Condiments', slug: 'sauces-condiments' },
    { name: 'Dried Fruits & Nuts', slug: 'dried-fruits-nuts' },
    { name: 'International Ingredients', slug: 'international-ingredients' },
  ];

  for (const cat of categoriesData) {
    await prisma.category.create({ data: cat });
    console.log(`✓ Created: ${cat.name}`);
  }

  // Get created categories
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(
    categories.map(c => [c.slug, c.id])
  );

  console.log('\nCreating food ingredient products...');
  
  // Create food ingredient products with proper images
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
      title: 'Organic Cinnamon Sticks',
      description: 'Ceylon cinnamon sticks, sweet and aromatic',
      price: 11.99,
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a0b3b1e1c7e7?w=800&q=80',
      categoryId: categoryMap['spices-herbs'],
      stock: 80,
      rating: 4.7,
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
      title: 'Almond Flour',
      description: 'Finely ground almond flour for gluten-free baking',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      categoryId: categoryMap['baking-essentials'],
      stock: 70,
      rating: 4.8,
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
      title: 'Artisan Balsamic Vinegar',
      description: 'Aged balsamic vinegar from Modena, Italy, 250ml',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1608181831042-c5a1e1ddd50a?w=800&q=80',
      categoryId: categoryMap['oils-vinegars'],
      stock: 40,
      rating: 4.8,
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
      title: 'Organic Brown Rice',
      description: 'Long grain brown rice, nutrient-rich and wholesome',
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
      categoryId: categoryMap['grains-flours'],
      stock: 120,
      rating: 4.5,
    },
    {
      title: 'Organic Honey',
      description: 'Raw organic honey from local beekeepers, 500g',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=800&q=80',
      categoryId: categoryMap['sauces-condiments'],
      stock: 50,
      rating: 4.9,
    },
    {
      title: 'Sriracha Hot Sauce',
      description: 'Spicy and tangy sriracha sauce, 250ml',
      price: 7.99,
      imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&q=80',
      categoryId: categoryMap['sauces-condiments'],
      stock: 100,
      rating: 4.7,
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
      title: 'Organic Dried Cranberries',
      description: 'Sweet and tart dried cranberries, no added sugar',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1577003833154-a2e6b8c7d1d7?w=800&q=80',
      categoryId: categoryMap['dried-fruits-nuts'],
      stock: 80,
      rating: 4.6,
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
    {
      title: 'Thai Curry Paste',
      description: 'Authentic red curry paste from Thailand, 200g',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',
      categoryId: categoryMap['international-ingredients'],
      stock: 60,
      rating: 4.8,
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({ data: product });
    console.log(`✓ Created: ${product.title}`);
  }

  // Ensure admin user exists
  console.log('\nChecking admin user...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const adminPassword = await bcrypt.hash('FreshPantry@2024$Secure!', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        passwordHash: adminPassword,
        role: 'admin',
        emailVerified: new Date(),
      },
    });
    console.log('✓ Admin user created');
  } else {
    console.log('✓ Admin user already exists');
  }

  console.log('\n✅ Database reset complete!');
  console.log('\n📊 Summary:');
  console.log(`   - 7 food ingredient categories`);
  console.log(`   - 15 food ingredient products`);
  console.log(`   - Admin user ready`);
  console.log('\n🎉 Your database is now clean and ready!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
