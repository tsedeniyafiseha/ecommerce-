-- Step 1: Check and fix Category table structure
DO $$ 
BEGIN
    -- Add description column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Category' AND column_name = 'description') THEN
        ALTER TABLE "Category" ADD COLUMN "description" TEXT;
    END IF;
    
    -- Check if id column is integer type
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'Category' AND column_name = 'id' 
               AND data_type = 'integer') THEN
        -- Create sequence if it doesn't exist
        CREATE SEQUENCE IF NOT EXISTS "Category_id_seq";
        
        -- Set default for id column
        ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT nextval('"Category_id_seq"');
        
        -- Set sequence ownership
        ALTER SEQUENCE "Category_id_seq" OWNED BY "Category"."id";
        
        -- Set sequence value
        PERFORM setval('"Category_id_seq"', GREATEST((SELECT COALESCE(MAX(id), 0) FROM "Category"), 0) + 1, false);
    END IF;
END $$;

-- Step 2: Insert categories
INSERT INTO "Category" (name, slug, description, "createdAt", "updatedAt") VALUES
('Spices & Herbs', 'spices-herbs', 'Premium quality spices and herbs from around the world', NOW(), NOW()),
('Baking Essentials', 'baking-essentials', 'Everything you need for perfect baking', NOW(), NOW()),
('Grains & Pulses', 'grains-pulses', 'Wholesome grains and nutritious pulses', NOW(), NOW()),
('Oils & Vinegars', 'oils-vinegars', 'Premium cooking oils and artisan vinegars', NOW(), NOW()),
('Sweeteners', 'sweeteners', 'Natural and refined sweeteners for all your needs', NOW(), NOW()),
('Nuts & Seeds', 'nuts-seeds', 'Fresh nuts and seeds packed with nutrition', NOW(), NOW()),
('Dried Fruits', 'dried-fruits', 'Sun-dried and naturally preserved fruits', NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  "updatedAt" = NOW();

-- Step 3: Fix Product table structure
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'Product' AND column_name = 'id' 
               AND data_type = 'integer') THEN
        CREATE SEQUENCE IF NOT EXISTS "Product_id_seq";
        ALTER TABLE "Product" ALTER COLUMN "id" SET DEFAULT nextval('"Product_id_seq"');
        ALTER SEQUENCE "Product_id_seq" OWNED BY "Product"."id";
        PERFORM setval('"Product_id_seq"', GREATEST((SELECT COALESCE(MAX(id), 0) FROM "Product"), 0) + 1, false);
    END IF;
END $$;

-- Step 4: Insert products
INSERT INTO "Product" (title, description, price, stock, rating, "imageUrl", "categoryId", "createdAt", "updatedAt") VALUES
('Organic Turmeric Powder', 'Premium organic turmeric powder from India, perfect for curries and golden milk', 12.99, 100, 4.8, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800', (SELECT id FROM "Category" WHERE slug = 'spices-herbs'), NOW(), NOW()),
('Extra Virgin Olive Oil', 'Cold-pressed extra virgin olive oil from Mediterranean groves', 24.99, 50, 4.9, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800', (SELECT id FROM "Category" WHERE slug = 'oils-vinegars'), NOW(), NOW()),
('Organic Quinoa', 'Premium white quinoa, protein-rich and gluten-free', 15.99, 75, 4.7, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800', (SELECT id FROM "Category" WHERE slug = 'grains-pulses'), NOW(), NOW()),
('Raw Honey', 'Pure raw honey from local beekeepers, unfiltered and unpasteurized', 18.99, 60, 4.9, 'https://images.unsplash.com/photo-1587049352846-4a222e784422?w=800', (SELECT id FROM "Category" WHERE slug = 'sweeteners'), NOW(), NOW()),
('Almond Flour', 'Finely ground blanched almond flour, perfect for gluten-free baking', 16.99, 80, 4.6, 'https://images.unsplash.com/photo-1599909533730-f9d7e2c1c9b5?w=800', (SELECT id FROM "Category" WHERE slug = 'baking-essentials'), NOW(), NOW()),
('Mixed Nuts', 'Premium blend of cashews, almonds, and walnuts', 22.99, 45, 4.8, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800', (SELECT id FROM "Category" WHERE slug = 'nuts-seeds'), NOW(), NOW()),
('Dried Apricots', 'Sweet and tangy sun-dried apricots, no added sugar', 13.99, 90, 4.7, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800', (SELECT id FROM "Category" WHERE slug = 'dried-fruits'), NOW(), NOW()),
('Himalayan Pink Salt', 'Pure Himalayan pink salt crystals, rich in minerals', 9.99, 120, 4.8, 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=800', (SELECT id FROM "Category" WHERE slug = 'spices-herbs'), NOW(), NOW())
ON CONFLICT DO NOTHING;
