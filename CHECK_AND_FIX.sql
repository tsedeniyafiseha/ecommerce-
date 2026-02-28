-- Step 1: Check what's in the database
SELECT id, name, slug FROM "Category" ORDER BY id;

-- Step 2: Check if description column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Category';
