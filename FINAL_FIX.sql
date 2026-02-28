-- Delete all existing categories and products to start fresh
DELETE FROM "Product";
DELETE FROM "Category";

-- Reset sequences to start from 1
ALTER SEQUENCE IF EXISTS "Category_id_seq" RESTART WITH 1;
ALTER SEQUENCE IF EXISTS "Product_id_seq" RESTART WITH 1;

-- Insert fresh food categories with descriptions
INSERT INTO "Category" (name, slug, description, "createdAt", "updatedAt") VALUES
('Spices & Herbs', 'spices-herbs', 'Premium quality spices and herbs from around the world', NOW(), NOW()),
('Baking Essentials', 'baking-essentials', 'Everything you need for perfect baking', NOW(), NOW()),
('Grains & Pulses', 'grains-pulses', 'Wholesome grains and nutritious pulses', NOW(), NOW()),
('Oils & Vinegars', 'oils-vinegars', 'Premium cooking oils and artisan vinegars', NOW(), NOW()),
('Sweeteners', 'sweeteners', 'Natural and refined sweeteners for all your needs', NOW(), NOW()),
('Nuts & Seeds', 'nuts-seeds', 'Fresh nuts and seeds packed with nutrition', NOW(), NOW()),
('Dried Fruits', 'dried-fruits', 'Sun-dried and naturally preserved fruits', NOW(), NOW());

-- Insert food products
INSERT INTO "Product" (title, description, price, stock, rating, "imageUrl", "categoryId", "createdAt", "updatedAt") VALUES
('Organic Turmeric Powder', 'Premium organic turmeric powder from India, perfect for curries and golden milk', 12.99, 100, 4.8, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800', 1, NOW(), NOW()),
('Extra Virgin Olive Oil', 'Cold-pressed extra virgin olive oil from Mediterranean groves', 24.99, 50, 4.9, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800', 4, NOW(), NOW()),
('Organic Quinoa', 'Premium white quinoa, protein-rich and gluten-free', 15.99, 75, 4.7, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800', 3, NOW(), NOW()),
('Raw Honey', 'Pure raw honey from local beekeepers, unfiltered and unpasteurized', 18.99, 60, 4.9, 'https://images.unsplash.com/photo-1587049352846-4a222e784422?w=800', 5, NOW(), NOW()),
('Almond Flour', 'Finely ground blanched almond flour, perfect for gluten-free baking', 16.99, 80, 4.6, 'https://images.unsplash.com/photo-1599909533730-f9d7e2c1c9b5?w=800', 2, NOW(), NOW()),
('Mixed Nuts', 'Premium blend of cashews, almonds, and walnuts', 22.99, 45, 4.8, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800', 6, NOW(), NOW()),
('Dried Apricots', 'Sweet and tangy sun-dried apricots, no added sugar', 13.99, 90, 4.7, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800', 7, NOW(), NOW()),
('Himalayan Pink Salt', 'Pure Himalayan pink salt crystals, rich in minerals', 9.99, 120, 4.8, 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=800', 1, NOW(), NOW());

-- Verify the data
SELECT 'Categories:' as info;
SELECT id, name, slug, description FROM "Category" ORDER BY id;

SELECT 'Products:' as info;
SELECT id, title, price, "categoryId" FROM "Product" ORDER BY id;
