# Setup New Database - Quick Guide

## Your New Supabase Database Info
- **Project Reference**: `tyankdfmeenvjkdigbey`
- **Region**: US East 1
- **Anon Key**: ✅ Provided

## Step 1: Get Your Database Password

1. Go to your Supabase project: https://supabase.com/dashboard/project/tyankdfmeenvjkdigbey
2. Go to **Settings** → **Database**
3. Scroll to **Connection string**
4. Copy the password (or reset it if you forgot)

## Step 2: Update .env.new File

Open `.env.new` and replace `[YOUR-PASSWORD]` with your actual password in both URLs:

```bash
DATABASE_URL="postgresql://postgres.tyankdfmeenvjkdigbey:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

DATABASE_URL_POOLED="postgresql://postgres.tyankdfmeenvjkdigbey:YOUR_ACTUAL_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=10&pool_timeout=10"
```

**Important**: If your password has special characters, URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`

## Step 3: Initialize Database Schema

```bash
# Copy the new env file
Copy-Item .env.new .env.local

# Push schema to new database
npx prisma db push

# Seed with food ingredients
npx prisma db seed
```

## Step 4: Verify Setup

```bash
# Test connection
npx tsx scripts/test-db-connection-simple.ts
```

You should see:
- ✅ 7 food categories
- ✅ 8 food products
- ✅ 2 admin users

## Step 5: Test Locally

```bash
# Start dev server
npm run dev
```

Visit http://localhost:3001 and verify:
- Products load correctly
- Categories show food items
- Admin login works

## Step 6: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import repository: `tsedeniyafiseha/ecommerce-`
3. Add environment variables:
   - Copy all from `.env.new`
   - Use `DATABASE_URL_POOLED` as `DATABASE_URL`
   - Update `NEXTAUTH_URL` to your Vercel domain
   - Update `NEXT_PUBLIC_SITE_URL` to your Vercel domain
4. Deploy!

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Database Comparison

### Old Database (Cleaning Supplies) - KEEP THIS
- URL: `postgresql://postgres.tgdfkmtwwyrzkgtcjdaf:...@aws-1-eu-west-1.pooler.supabase.com`
- Products: 15 cleaning supplies
- Admin: admin@hypercleaning.com
- Status: ✅ Restored and preserved

### New Database (Food Ingredients) - USE FOR DEPLOYMENT
- URL: `postgresql://postgres.tyankdfmeenvjkdigbey:...@aws-0-us-east-1.pooler.supabase.com`
- Products: 8 food ingredients
- Admin: taranveerebu340@gmail.com
- Status: ⏳ Ready to initialize

## Quick Commands

```bash
# Initialize new database
npx prisma db push
npx prisma db seed

# Test connection
npx tsx scripts/test-db-connection-simple.ts

# View database
npx prisma studio

# Switch back to old database
# Just change DATABASE_URL in .env.local to old URL
```

## Troubleshooting

### "Can't reach database server"
- Check if password is correct
- Ensure password is URL-encoded
- Verify project is not paused in Supabase

### "Schema mismatch"
```bash
npx prisma db push --force-reset
npx prisma db seed
```

### "Connection timeout"
- Use the pooled URL (port 6543) for application
- Use transaction URL (port 5432) only for migrations

## Next Steps After Setup

1. ✅ Initialize new database
2. ✅ Test locally
3. ✅ Push to GitHub (follow PUSH_INSTRUCTIONS.md)
4. ✅ Deploy to Vercel
5. ✅ Update Stripe webhook URL
6. ✅ Test production deployment

---

**Need the password?** Go to: https://supabase.com/dashboard/project/tyankdfmeenvjkdigbey/settings/database
