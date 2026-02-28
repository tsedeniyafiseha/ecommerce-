# Push to GitHub Instructions

## Issue
GitHub is blocking the push because it detected secrets (API keys) in the commit history.

## Solution: Allow the Secrets

You need to click these URLs to allow the secrets (you'll need to be logged into GitHub):

1. **Stripe Test API Secret Key**
   https://github.com/tsedeniyafiseha/ecommerce-/security/secret-scanning/unblock-secret/3AFhDqHDeGDq5HCQV0tCKg8Tonn

2. **Google OAuth Client ID**
   https://github.com/tsedeniyafiseha/ecommerce-/security/secret-scanning/unblock-secret/3AFhDlPC5MUrq69d3Rc2IBSzwue

3. **Google OAuth Client Secret**
   https://github.com/tsedeniyafiseha/ecommerce-/security/secret-scanning/unblock-secret/3AFhDmL19SGGeQ1tPDoRMU9jJtc

## Steps

1. Open each URL above in your browser (while logged into GitHub)
2. Click "Allow secret" or similar button on each page
3. After allowing all three secrets, run:
   ```bash
   git push origin main
   ```

## Alternative: Force Push Without History

If you want to start fresh without the old commits containing secrets:

```bash
# Create a new branch without history
git checkout --orphan fresh-main

# Add all files
git add .

# Commit
git commit -m "Initial commit with new database setup"

# Force push to main
git push -f origin fresh-main:main
```

## After Successful Push

Once pushed successfully, you can deploy to Vercel:

1. Go to https://vercel.com
2. Import your GitHub repo: https://github.com/tsedeniyafiseha/ecommerce-
3. Add environment variables from `.env.local` (except DATABASE_URL - use the production one)
4. Deploy!

## Environment Variables for Vercel

Make sure to add these in Vercel dashboard:

```
DATABASE_URL=postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1

NEXTAUTH_SECRET=yxVoBPu5Exp7wjIlhcK9b+Lljx3TawMAq4hXO5J3s9k=
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app

ADMIN_EMAIL=tsedeniyafisehaw@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=tsedeniyafisehaw@gmail.com

# Stripe
STRIPE_SECRET_KEY=sk_test_51SY951RySto3MgFUKeEnEBEDEjY13HcGTnwtRMCWpOmvtq9ALU5YcRquSQBOQyvrBFCPyCZIYKSC7A5Q1gkUK4G000jGxoXk3K
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SY951RySto3MgFU8dPH9S0cjvenM4cegZ5A6Fmm15VMrItyshavjDnvUAIWtBzgR50dTH7PC7GRYV0gocqoyZIy00eSea6Ot1
STRIPE_WEBHOOK_SECRET=whsec_9ef9c8a5005306500bfc2ccb931ec479836af2fab33ff9771789cee31c0

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tsedeniyafisehaw@gmail.com
SMTP_PASS=zpuq dknd bxii xaxz
FROM_EMAIL=noreply@freshpantry.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=dl2gatvda
CLOUDINARY_API_KEY=169637298546927
CLOUDINARY_API_SECRET=DJD-OL8amniUtyio2tfPFxsDdsM

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tyankdfmeenvjkdigbey.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5YW5rZGZtZWVudmprZGlnYmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTU4ODksImV4cCI6MjA4Nzc3MTg4OX0.3WpqgyONCTO_pIsmaQNxHlBOoi33qOEQvqyPSBsnwYA

# OAuth (Optional)
GOOGLE_CLIENT_ID=880233503072-e9rvdi9ek9eu3hvc7dc25flm3vdoj274.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23litG3MK2TgMH8BWj
GITHUB_CLIENT_SECRET=7e38521381c00491c9942589e4224923dc961d8f
```

## After Deployment

1. Run the seed script to populate the database:
   ```bash
   npx prisma db seed
   ```

2. Or manually create admin user via Vercel CLI:
   ```bash
   vercel env pull .env.production
   npx tsx scripts/setup-production-admin.ts
   ```

3. Login at: https://your-vercel-domain.vercel.app/signin
   - Email: tsedeniyafisehaw@gmail.com
   - Password: (the one set in the script)
