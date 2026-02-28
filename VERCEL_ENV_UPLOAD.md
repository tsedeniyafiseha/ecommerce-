# 🚀 Upload Environment Variables to Vercel

## Method 1: Using Vercel CLI (Fastest)

```bash
# Login to Vercel
vercel login

# Link to your project (if not already linked)
vercel link

# Push environment variables from .env.production
vercel env add DATABASE_URL production < .env.production
```

Or use the bulk import:

```bash
# Install vercel CLI if needed
npm i -g vercel

# Login
vercel login

# Go to your project directory
cd C:\Users\Besu Tech\Desktop\next-ecommerce-shopco

# Pull existing env (optional, to see what's there)
vercel env ls

# Add all variables from .env.production
vercel env pull .env.vercel.production
```

## Method 2: Using Vercel Dashboard (Recommended for Bulk Upload)

### Step 1: Prepare the file
✅ **Already done!** Your `.env.production` file is ready to upload.

### Step 2: Upload to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `ecommerce-`
3. **Go to Settings** → **Environment Variables**
4. **Click "Add New"** → **"Bulk Import"** (or look for import option)
5. **Copy the contents** of `.env.production` and paste it
6. **Select environment**: Production (and Preview if you want)
7. **Click "Save"**

### Alternative: Manual Copy-Paste

If bulk import isn't available:

1. Open `.env.production` file
2. Copy ALL the content
3. In Vercel Dashboard → Settings → Environment Variables
4. Look for "Import .env" or "Bulk Add" button
5. Paste the content
6. Save

## Method 3: Using vercel.json (Automated)

Create a `vercel.json` file (but this won't include secrets):

```json
{
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://your-app.vercel.app",
    "NEXT_PUBLIC_SUPABASE_URL": "https://tyankdfmeenvjkdigbey.supabase.co"
  }
}
```

Note: This only works for public variables (NEXT_PUBLIC_*). Secrets must be added via dashboard or CLI.

## ⚠️ Important: After Deployment

1. **Get your Vercel URL** (e.g., `https://ecommerce-abc123.vercel.app`)
2. **Update these variables** in Vercel dashboard:
   - `NEXTAUTH_URL` → Your actual Vercel URL
   - `NEXT_PUBLIC_SITE_URL` → Your actual Vercel URL
3. **Redeploy** the project

## 🎯 Quick Deploy Steps

1. **Upload env file** using one of the methods above
2. **Deploy**: 
   ```bash
   vercel --prod
   ```
   Or use Vercel dashboard to deploy
3. **After deployment**, update URLs and redeploy
4. **Seed database**:
   ```bash
   vercel env pull .env.production
   npx prisma db seed
   ```

## 📝 Verify Environment Variables

After uploading, verify in Vercel dashboard:
- Go to Settings → Environment Variables
- Check all variables are there
- Make sure they're assigned to "Production" environment

## 🐛 Troubleshooting

### Variables not showing up?
- Refresh the page
- Check you selected "Production" environment
- Try re-importing

### Deployment fails?
- Check build logs in Vercel
- Verify DATABASE_URL is correct
- Make sure all required variables are present

### Can't find bulk import?
- Look for "Import .env" button
- Or add variables one by one (copy from .env.production)
- Or use CLI method above
