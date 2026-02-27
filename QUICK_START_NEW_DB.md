# 🚀 Quick Start - New Database Setup

## What You Need
✅ New Supabase project created  
✅ Anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  
⏳ Database password (get from Supabase)

## 3-Step Setup

### Step 1️⃣: Get Password (2 minutes)

1. Open: https://supabase.com/dashboard/project/tyankdfmeenvjkdigbey/settings/database
2. Find "Database Password" section
3. Copy or reset your password
4. **Save it somewhere safe!**

### Step 2️⃣: Configure Environment (1 minute)

Open `.env.new` file and replace `[YOUR-PASSWORD]` with your actual password:

```bash
# Before:
DATABASE_URL="postgresql://postgres.tyankdfmeenvjkdigbey:[YOUR-PASSWORD]@aws-0..."

# After (example):
DATABASE_URL="postgresql://postgres.tyankdfmeenvjkdigbey:MySecurePass123@aws-0..."
```

Then rename the file:
```bash
# Windows PowerShell
Copy-Item .env.new .env.local

# Or manually rename .env.new to .env.local
```

### Step 3️⃣: Initialize Database (2 minutes)

Run these commands:

```bash
# 1. Push database schema
npx prisma db push

# 2. Seed with food ingredients
npx prisma db seed

# 3. Test connection
npx tsx scripts/test-db-connection-simple.ts
```

## ✅ Success Checklist

After running the commands, you should see:
- ✅ Schema pushed successfully
- ✅ 7 categories created
- ✅ 8 products created
- ✅ 2 admin users created
- ✅ Database connection test passed

## 🎯 Test It

```bash
# Start dev server
npm run dev
```

Visit http://localhost:3001 and check:
- [ ] Homepage loads with food products
- [ ] Categories show food items (Spices, Oils, etc.)
- [ ] Can login with: taranveerebu340@gmail.com

## 🚀 Deploy to Vercel

Once local testing works:

1. **Push to GitHub** (follow PUSH_INSTRUCTIONS.md)
2. **Go to Vercel**: https://vercel.com/new
3. **Import repo**: tsedeniyafiseha/ecommerce-
4. **Add environment variables** from `.env.new`:
   - Use `DATABASE_URL_POOLED` as `DATABASE_URL`
   - Change `NEXTAUTH_URL` to your Vercel URL
   - Change `NEXT_PUBLIC_SITE_URL` to your Vercel URL
5. **Deploy!**

## 📊 Database Status

| Database | Status | Purpose |
|----------|--------|---------|
| **Old** (aws-1-eu-west-1) | ✅ Preserved | Cleaning supplies backup |
| **New** (aws-0-us-east-1) | ⏳ Ready | Food ingredients (deploy this) |

## 🆘 Need Help?

### Password has special characters?
URL-encode them:
- `MyPass@123` → `MyPass%40123`
- `Pass#word` → `Pass%23word`
- `Test$123` → `Test%24123`

### Can't connect?
1. Check password is correct
2. Ensure project is not paused
3. Try resetting password in Supabase

### Schema errors?
```bash
npx prisma db push --force-reset
npx prisma db seed
```

## 📝 Files Reference

- `.env.new` - New database configuration (edit this)
- `.env.local` - Active configuration (copy from .env.new)
- `SETUP_NEW_DATABASE.md` - Detailed guide
- `DATABASE_RESTORATION_COMPLETE.md` - Old database info

---

**Ready?** Start with Step 1 above! 🎉
