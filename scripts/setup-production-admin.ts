import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// This script sets up the admin user in the production database
// Make sure to set DATABASE_URL to production before running

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Setting up admin user in production...\n');
  
  const adminEmail = 'tsedeniyafisehaw@gmail.com';
  const adminPassword = 'Hyper@Clean2024$Secure!';
  
  console.log(`Admin Email: ${adminEmail}`);
  console.log('Checking database connection...');
  
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected\n');
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. Updating password...');
    } else {
      console.log('📝 Creating new admin user...');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Create or update admin user
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        passwordHash: hashedPassword,
        role: 'admin',
        emailVerified: new Date(),
      },
      create: {
        email: adminEmail,
        name: 'Admin User',
        passwordHash: hashedPassword,
        role: 'admin',
        emailVerified: new Date(),
      },
    });
    
    console.log('\n✅ Admin user setup completed successfully!\n');
    console.log('═══════════════════════════════════════════════════');
    console.log('  ADMIN CREDENTIALS');
    console.log('═══════════════════════════════════════════════════');
    console.log(`  Email:    ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log('═══════════════════════════════════════════════════');
    console.log('\n📋 Next Steps:');
    console.log('  1. Go to: https://www.hypercleaningsupplies.co.nz/signin');
    console.log('  2. Login with the credentials above');
    console.log('  3. You should be redirected to /admin dashboard');
    console.log('\n⚠️  IMPORTANT: Store this password securely!');
    console.log('   Change it after first login from the admin panel.\n');
    
  } catch (error) {
    console.error('\n❌ Error setting up admin user:');
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
