-- Fix the Category table to have proper auto-increment
ALTER TABLE "Category" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "Category_id_seq" CASCADE;
CREATE SEQUENCE "Category_id_seq";
ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT nextval('"Category_id_seq"');
ALTER SEQUENCE "Category_id_seq" OWNED BY "Category"."id";
SELECT setval('"Category_id_seq"', 1, false);

-- Fix the Product table to have proper auto-increment
ALTER TABLE "Product" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "Product_id_seq" CASCADE;
CREATE SEQUENCE "Product_id_seq";
ALTER TABLE "Product" ALTER COLUMN "id" SET DEFAULT nextval('"Product_id_seq"');
ALTER SEQUENCE "Product_id_seq" OWNED BY "Product"."id";
SELECT setval('"Product_id_seq"', 1, false);

-- Verify the setup
SELECT 'Category sequence setup:' as info;
SELECT column_name, column_default 
FROM information_schema.columns 
WHERE table_name = 'Category' AND column_name = 'id';

SELECT 'Product sequence setup:' as info;
SELECT column_name, column_default 
FROM information_schema.columns 
WHERE table_name = 'Product' AND column_name = 'id';
