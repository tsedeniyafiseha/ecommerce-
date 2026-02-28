-- Add the gallery column to Product table
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "gallery" TEXT[] DEFAULT '{}';

-- Verify it was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'Product' AND column_name = 'gallery';
