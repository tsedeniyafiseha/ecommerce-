# Vercel Deployment Guide

## Step 1: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository: `https://github.com/tsedeniyafiseha/ecommerce-`
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

## Step 2: Add Environment Variables

In the Vercel project settings, add these environment variables:

### Database
```
DATABASE_URL=postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

### Auth
```
NEXTAUTH_SECRET=yxVoBPu5Exp7wjIlhcK9b+Lljx3TawMAq4hXO5J3s9k=
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

### Admin
```
ADMIN_EMAIL=tsedeniyafisehaw@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=tsedeniyafisehaw@gmail.com
```

### Stripe
```
STRIPE_SECRET_KEY=sk_test_51SY951RySto3MgFUKeEnEBEDEjY13HcGTnwtRMCWpOmvtq9ALU5YcRquSQBOQyvrBFCPyCZIYKSC7A5Q1gkUK4G000jGxoXk3K
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SY951RySto3MgFU8dPH9S0cjvenM4cegZ5A6Fmm15VMrItyshavjDnvUAIWtBzgR50dTH7PC7GRYV0gocqoyZIy00eSea6Ot1
STRIPE_WEBHOOK_SECRET=whsec_9ef9c8a5005306500bfc2ccb931ec479836af2fab33ff9771789cee31c0
```

### Email (SMTP)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tsedeniyafisehaw@gmail.com
SMTP_PASS=zpuq dknd bxii xaxz
FROM_EMAIL=noreply@freshpantry.com
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME=dl2gatvda
CLOUDINARY_API_KEY=169637298546927
CLOUDINARY_API_SECRET=DJD-OL8amniUtyio2tfPFxsDdsM
```

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://tyankdfmeenvjkdigbey.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5YW5rZGZtZWVudmprZGlnYmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTU4ODksImV4cCI6MjA4Nzc3MTg4OX0.3WpqgyONCTO_pIsmaQNxHlBOoi33qOEQvqyPSBsnwYA
```

### OAuth (Optional)
```
GOOGLE_CLIENT_ID=880233503072-e9rvdi9ek9eu3hvc7dc25flm3vdoj274.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23litG3MK2TgMH8BWj
GITHUB_CLIENT_SECRET=7e38521381c00491c9942589e4224923dc961d8f
```

### Sentry (Optional)
```
SENTRY_DSN=https://10c9af94a4fe74388af73e7a20b61821@o4510439047757824.ingest.de.sentry.io/4510439050641488
NEXT_PUBLIC_SENTRY_DSN=https://10c9af94a4fe74388af73e7a20b61821@o4510439047757824.ingest.de.sentry.io/4510439050641488
```

## Step 3: Deploy

Click "Deploy" and wait for the build to complete.

## Step 4: Update NEXTAUTH_URL

After deployment:
1. Copy your Vercel deployment URL (e.g., `https://ecommerce-abc123.vercel.app`)
2. Go back to Vercel project settings → Environment Variables
3. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL
4. Redeploy the project

## Step 5: Seed the Database

After successful deployment, you need to populate the database. You have two options:

### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run the seed script
npx prisma db seed

# Or create admin user
npx tsx scripts/setup-production-admin.ts
```

### Option B: Manual SQL in Supabase
1. Go to https://supabase.com/dashboard/project/tyankdfmeenvjkdigbey
2. Click "SQL Editor"
3. Run the seed queries manually (categories, products, admin user)

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Check if the homepage loads
3. Try to sign in at `/signin` with:
   - Email: `tsedeniyafisehaw@gmail.com`
   - Password: `FreshPantry@2024$Secure!` (or the password from setup script)
4. Access admin dashboard at `/admin`

## Troubleshooting

### Database Connection Issues
- Make sure DATABASE_URL is correct in Vercel environment variables
- Check Supabase project is active and not paused
- Verify the password is URL-encoded: `$` becomes `%24`, `%` becomes `%25`

### Build Failures
- Check build logs in Vercel dashboard
- Make sure all dependencies are in package.json
- Verify TypeScript has no errors

### Admin Login Issues
- Run the seed script or setup-production-admin.ts script
- Check if admin user exists in Supabase database
- Verify email and password are correct

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure Stripe webhook URL in Stripe dashboard
3. Test checkout flow
4. Add products via admin panel
5. Test email functionality
