# 🔧 Fix Vercel Database Connection

## Problem
Vercel is connecting to the OLD database (with cleaning supplies) instead of the NEW database (tyankdfmeenvjkdigbey).

## Current Wrong Database
```
postgresql://postgres:[PASSWORD]@db.tyankdfmeenvjkdigbey.supabase.co:5432/postgres
```
This is showing cleaning supplies!

## Correct NEW Database
```
postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

## Fix Steps

### 1. Update DATABASE_URL in Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `ecommerce-`
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. Click **Edit**
6. Replace with:
   ```
   postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
   ```
7. Make sure it's set for **Production** environment
8. Click **Save**

### 2. Redeploy

After updating the environment variable:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### 3. Seed the NEW Database

Once redeployed with the correct database, seed it:

```bash
# Create a temporary .env file with production database
echo 'DATABASE_URL="postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"' > .env.temp

# Run seed with this env file
DATABASE_URL="postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1" npx prisma db seed

# Clean up
rm .env.temp
```

Or manually in Supabase SQL Editor:
1. Go to: https://supabase.com/dashboard/project/tyankdfmeenvjkdigbey
2. Click **SQL Editor**
3. Run the seed SQL (see below)

### 4. Verify

After redeployment:
1. Visit your Vercel site
2. You should see **food ingredient categories**:
   - Spices & Herbs
   - Baking Essentials
   - Oils & Vinegars
   - Grains & Flours
   - etc.
3. Products should show food images (turmeric, olive oil, etc.)

## Quick SQL Seed (If needed)

Run this in Supabase SQL Editor for the NEW database:

```sql
-- Clear any existing data
TRUNCATE "Order", "CartItem", "Product", "Category", "User", "VerificationToken" CASCADE;

-- Insert food categories
INSERT INTO "Category" (name, slug, "createdAt", "updatedAt") VALUES
('Spices & Herbs', 'spices-herbs', NOW(), NOW()),
('Baking Essentials', 'baking-essentials', NOW(), NOW()),
('Oils & Vinegars', 'oils-vinegars', NOW(), NOW()),
('Grains & Flours', 'grains-flours', NOW(), NOW()),
('Sauces & Condiments', 'sauces-condiments', NOW(), NOW()),
('Dried Fruits & Nuts', 'dried-fruits-nuts', NOW(), NOW()),
('International Ingredients', 'international-ingredients', NOW(), NOW());

-- Insert food products
INSERT INTO "Product" (title, description, price, "imageUrl", "categoryId", stock, rating, "discountPercentage", "createdAt", "updatedAt") VALUES
('Organic Turmeric Powder', 'Premium organic turmeric powder from India, perfect for curries and golden milk', 12.99, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80', 1, 100, 4.8, NULL, NOW(), NOW()),
('Himalayan Pink Salt', 'Pure Himalayan pink salt crystals, rich in minerals', 8.99, 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=800&q=80', 1, 150, 4.9, 10, NOW(), NOW()),
('Organic Coconut Flour', 'Gluten-free coconut flour, perfect for baking and low-carb recipes', 14.99, 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=800&q=80', 2, 80, 4.7, NULL, NOW(), NOW()),
('Extra Virgin Olive Oil', 'Cold-pressed extra virgin olive oil from Greece, 500ml', 24.99, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80', 3, 60, 4.9, NULL, NOW(), NOW()),
('Organic Quinoa', 'Premium white quinoa, protein-rich superfood, 1kg', 18.99, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80', 4, 90, 4.6, 15, NOW(), NOW()),
('Artisan Balsamic Vinegar', 'Aged balsamic vinegar from Modena, Italy, 250ml', 29.99, 'https://images.unsplash.com/photo-1608181831042-c5a1e1ddd50a?w=800&q=80', 3, 40, 4.8, NULL, NOW(), NOW()),
('Raw Almonds', 'Premium raw almonds, perfect for snacking or baking, 500g', 16.99, 'https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80', 6, 120, 4.7, NULL, NOW(), NOW()),
('Japanese Soy Sauce', 'Authentic Japanese soy sauce, naturally brewed, 500ml', 12.99, 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80', 7, 70, 4.9, NULL, NOW(), NOW());
```

## Summary

The issue is that Vercel has the wrong DATABASE_URL pointing to the old database. Update it in Vercel settings, redeploy, and seed the new database.
