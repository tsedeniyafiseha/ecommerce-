# 🌱 Seed Production Database with Food Ingredients

## Problem
Your production site is showing cleaning supplies instead of food ingredients because the database hasn't been seeded yet.

## Solution: Seed the Production Database

### Method 1: Using Vercel CLI (Recommended)

```bash
# 1. Pull production environment variables
vercel env pull .env.production

# 2. Run the seed script (this will use the production DATABASE_URL)
npx prisma db seed
```

### Method 2: Run Seed Script Directly on Vercel

```bash
# Login to Vercel
vercel login

# Link to your project
vercel link

# Run the seed command on Vercel
vercel exec -- npx prisma db seed
```

### Method 3: Manual SQL in Supabase (If CLI doesn't work)

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/tyankdfmeenvjkdigbey
2. Click "SQL Editor"
3. Run this SQL to clear old data and add food categories:

```sql
-- Clear existing data
DELETE FROM "Order" WHERE true;
DELETE FROM "CartItem" WHERE true;
DELETE FROM "Product" WHERE true;
DELETE FROM "Category" WHERE true;

-- Insert food categories
INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt") VALUES
(1, 'Spices & Herbs', 'spices-herbs', NOW(), NOW()),
(2, 'Baking Essentials', 'baking-essentials', NOW(), NOW()),
(3, 'Oils & Vinegars', 'oils-vinegars', NOW(), NOW()),
(4, 'Grains & Flours', 'grains-flours', NOW(), NOW()),
(5, 'Sauces & Condiments', 'sauces-condiments', NOW(), NOW()),
(6, 'Dried Fruits & Nuts', 'dried-fruits-nuts', NOW(), NOW()),
(7, 'International Ingredients', 'international-ingredients', NOW(), NOW());

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

-- Reset sequences
SELECT setval(pg_get_serial_sequence('"Category"', 'id'), (SELECT MAX(id) FROM "Category"));
SELECT setval(pg_get_serial_sequence('"Product"', 'id'), (SELECT MAX(id) FROM "Product"));
```

## Quick Fix: Run Locally

If you want to seed the production database from your local machine:

```bash
# 1. Temporarily update .env to use production database
# Copy DATABASE_URL from Vercel to .env

# 2. Run seed
npx prisma db seed

# 3. Restore .env to local database
```

## After Seeding

1. Refresh your Vercel site
2. You should see:
   - Food ingredient categories (Spices, Oils, Grains, etc.)
   - Food product images (turmeric, salt, olive oil, etc.)
   - 8 food products total

## Current Issue

The site is showing cleaning supplies because:
- ✅ Code is deployed correctly
- ✅ Database is connected
- ❌ Database has old cleaning supplies data
- ❌ Database needs to be seeded with food ingredients

Run one of the methods above to fix this!
