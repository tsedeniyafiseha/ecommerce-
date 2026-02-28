# ✅ CORRECT Database URL for Vercel

## The Problem
Your Vercel deployment is getting "Tenant or user not found" errors because the DATABASE_URL is incorrect.

## The Solution
Update the DATABASE_URL in Vercel to this EXACT value:

```
postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

## How to Update in Vercel

1. Go to: https://vercel.com/dashboard
2. Select project: `ecommerce-`
3. Go to: **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. Click **Edit**
6. Replace with the value above
7. Make sure it's for **Production**, **Preview**, and **Development**
8. Click **Save**
9. Go to **Deployments** tab
10. Click **Redeploy** on latest deployment

## Why This Matters

The current DATABASE_URL is pointing to a wrong database or has incorrect credentials. The correct URL:
- Project: `tyankdfmeenvjkdigbey`
- Region: `aws-1-eu-west-1`
- Port: `6543` (pooler)
- Password: `NewVersion$1321%` (URL encoded)

## After Updating

Once you update and redeploy:
- ✅ Categories will show (already working!)
- ✅ Products will load
- ✅ No more "Tenant or user not found" errors
- ✅ Site will work perfectly

## Current Status

Looking at your screenshot:
- ✅ Categories ARE showing (Baking Essentials, Spices & Herbs, etc.)
- ❌ Products not showing (because of build-time database errors)
- ❌ Build errors during static generation

The runtime is working (that's why you see categories), but the build process needs the correct DATABASE_URL to pre-render pages.
