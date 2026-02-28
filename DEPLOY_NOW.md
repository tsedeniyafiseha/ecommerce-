# 🚀 Deploy to Vercel - Quick Steps

## ✅ What's Done
- ✅ Code pushed to GitHub: https://github.com/tsedeniyafiseha/ecommerce-
- ✅ Admin email updated to: tsedeniyafisehaw@gmail.com
- ✅ Database ready: Supabase (tyankdfmeenvjkdigbey)
- ✅ Schema created in database

## 🎯 Deploy Now (Choose One Method)

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "Add New"** → "Project"
4. **Import** your repo: `tsedeniyafiseha/ecommerce-`
5. **Configure**:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Keep default build settings
6. **Add Environment Variables** (click "Environment Variables" before deploying):

   Copy and paste these one by one:

   ```
   DATABASE_URL=postgresql://postgres.tyankdfmeenvjkdigbey:NewVersion$1321%@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
   
   NEXTAUTH_SECRET=yxVoBPu5Exp7wjIlhcK9b+Lljx3TawMAq4hXO5J3s9k=
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   
   ADMIN_EMAIL=tsedeniyafisehaw@gmail.com
   NEXT_PUBLIC_ADMIN_EMAIL=tsedeniyafisehaw@gmail.com
   
   STRIPE_SECRET_KEY=sk_test_51SY951RySto3MgFUKeEnEBEDEjY13HcGTnwtRMCWpOmvtq9ALU5YcRquSQBOQyvrBFCPyCZIYKSC7A5Q1gkUK4G000jGxoXk3K
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SY951RySto3MgFU8dPH9S0cjvenM4cegZ5A6Fmm15VMrItyshavjDnvUAIWtBzgR50dTH7PC7GRYV0gocqoyZIy00eSea6Ot1
   STRIPE_WEBHOOK_SECRET=whsec_9ef9c8a5005306500bfc2ccb931ec479836af2fab33ff9771789cee31c0
   
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=tsedeniyafisehaw@gmail.com
   SMTP_PASS=zpuq dknd bxii xaxz
   FROM_EMAIL=noreply@freshpantry.com
   
   CLOUDINARY_CLOUD_NAME=dl2gatvda
   CLOUDINARY_API_KEY=169637298546927
   CLOUDINARY_API_SECRET=DJD-OL8amniUtyio2tfPFxsDdsM
   
   NEXT_PUBLIC_SUPABASE_URL=https://tyankdfmeenvjkdigbey.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5YW5rZGZtZWVudmprZGlnYmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTU4ODksImV4cCI6MjA4Nzc3MTg4OX0.3WpqgyONCTO_pIsmaQNxHlBOoi33qOEQvqyPSBsnwYA
   
   GOOGLE_CLIENT_ID=880233503072-e9rvdi9ek9eu3hvc7dc25flm3vdoj274.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   GITHUB_CLIENT_ID=Ov23litG3MK2TgMH8BWj
   GITHUB_CLIENT_SECRET=7e38521381c00491c9942589e4224923dc961d8f
   ```

7. **Click "Deploy"** and wait 2-3 minutes

8. **After deployment**:
   - Copy your Vercel URL (e.g., `https://ecommerce-xyz.vercel.app`)
   - Go to Settings → Environment Variables
   - Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` with your actual URL
   - Click "Redeploy" from the Deployments tab

### Method 2: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts
```

## 📝 After Deployment

### 1. Seed the Database

You need to add products and admin user. Run this locally:

```bash
# Pull production environment variables
vercel env pull .env.production

# Seed the database
npx prisma db seed
```

Or create admin user only:

```bash
npx tsx scripts/setup-production-admin.ts
```

### 2. Test Your Site

1. Visit your Vercel URL
2. Homepage should load with products
3. Try signing in at `/signin`:
   - Email: `tsedeniyafisehaw@gmail.com`
   - Password: `FreshPantry@2024$Secure!`
4. Access admin at `/admin`

### 3. Configure Stripe Webhook (Important!)

1. Go to Stripe Dashboard: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter: `https://your-vercel-url.vercel.app/api/checkout/webhook`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy the webhook signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. Redeploy

## 🎉 You're Done!

Your e-commerce site should now be live at your Vercel URL!

## 🐛 Troubleshooting

### Build fails?
- Check build logs in Vercel dashboard
- Make sure all environment variables are added

### Database connection error?
- Verify DATABASE_URL is correct
- Check Supabase project is active (not paused)

### Can't login?
- Make sure you ran the seed script
- Check admin user exists in Supabase database

### Need help?
- Check Vercel deployment logs
- Check Supabase logs
- Run `vercel logs` in terminal
