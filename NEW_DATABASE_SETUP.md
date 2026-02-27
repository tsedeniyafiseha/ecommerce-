# New Database Setup Guide

## Overview
This guide will help you set up a fresh database for your new deployment while keeping the old database with cleaning supplies intact.

## Step 1: Restore Old Database (Current Supabase)

Run this script to restore the old database with Hyper Cleaning Supplies data:

```bash
npx tsx scripts/restore-cleaning-database.ts
```

This will:
- Clear all current data
- Restore cleaning supply categories (7 categories)
- Restore cleaning supply products (15 products)
- Create admin user with credentials

**Admin Credentials for Old Database:**
- Email: admin@hypercleaning.com
- Password: HyperClean@2024$Admin!

## Step 2: Create New Supabase Database

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in details:
   - Name: `hyper-cleaning-new` (or your preferred name)
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
4. Wait for database to be created (~2 minutes)

## Step 3: Get New Database Connection String

1. In your new Supabase project, go to Settings → Database
2. Copy the connection string under "Connection pooling"
3. It should look like:
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

## Step 4: Update Environment Variables

Create a new `.env.new` file with the new database URL:

```bash
# New Database
DATABASE_URL="postgresql://postgres.[NEW-PROJECT-REF]:[NEW-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10"

# Keep all other variables the same
NEXTAUTH_SECRET="yxVoBPu5Exp7wjIlhcK9b+Lljx3TawMAq4hXO5J3s9k="
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_EMAIL="taranveerebu340@gmail.com"
NEXT_PUBLIC_ADMIN_EMAIL="taranveerebu340@gmail.com"

# ... rest of your environment variables
```

## Step 5: Initialize New Database Schema

```bash
# Use the new database URL
export DATABASE_URL="your-new-database-url"

# Or on Windows PowerShell:
$env:DATABASE_URL="your-new-database-url"

# Push schema to new database
npx prisma db push

# Seed with food ingredients data (current seed.ts)
npx prisma db seed
```

## Step 6: Verify New Database

```bash
# Test connection
npx tsx scripts/test-db-connection-simple.ts
```

You should see:
- 7 users (if using current seed)
- 8 products (food ingredients)
- 2 admin users

## Step 7: Switch Between Databases

### For Local Development (Old Database - Cleaning Supplies)
Use `.env.local`:
```bash
DATABASE_URL="postgresql://postgres.tgdfkmtwwyrzkgtcjdaf:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10"
```

### For New Deployment (New Database - Food Ingredients)
Use the new database URL in Vercel environment variables.

## Database Comparison

### Old Database (Hyper Cleaning Supplies)
- **Categories**: Cleaning Chemicals, Bathroom Care, Kitchen Care, Floor Care, Dispensers, Gloves, Paper Products
- **Products**: 15 cleaning supply products
- **Admin**: admin@hypercleaning.com
- **Use Case**: Keep for reference or old deployment

### New Database (Food Ingredients)
- **Categories**: Spices & Herbs, Baking Essentials, Oils & Vinegars, Grains & Flours, Sauces & Condiments, Dried Fruits & Nuts, International Ingredients
- **Products**: 8 food ingredient products
- **Admin**: taranveerebu340@gmail.com
- **Use Case**: New deployment on Vercel

## Quick Commands Reference

```bash
# Restore old database with cleaning supplies
npx tsx scripts/restore-cleaning-database.ts

# Seed new database with food ingredients
npx prisma db seed

# Test database connection
npx tsx scripts/test-db-connection-simple.ts

# View database in browser
npx prisma studio
```

## Troubleshooting

### Connection Timeout
If you get connection timeouts, ensure:
1. Database URL includes `connect_timeout=10&pool_timeout=10`
2. Supabase project is not paused (free tier pauses after inactivity)
3. Your IP is not blocked by Supabase

### Schema Mismatch
If schema doesn't match:
```bash
npx prisma db push --force-reset
npx prisma db seed
```

### Can't Connect to New Database
1. Check if project is fully initialized in Supabase dashboard
2. Verify connection string is correct
3. Ensure password is URL-encoded (special characters like @ become %40)

## Notes

- The old database will remain unchanged with cleaning supplies
- The new database will have food ingredients
- Both databases use the same schema (Prisma schema.prisma)
- You can switch between them by changing DATABASE_URL
- For production, use the new database URL in Vercel
