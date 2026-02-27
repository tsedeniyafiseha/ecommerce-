# ▶️ Run FreshPantry NOW - Simple Steps

## Your environment is already configured! Just follow these steps:

---

## Step 1: Install Dependencies (if not done)

```bash
npm install
```

⏱️ Takes 2-3 minutes

---

## Step 2: Generate Prisma Client

```bash
npm run prisma:generate
```

⏱️ Takes 10-20 seconds

---

## Step 3: Seed Database with Food Ingredients

```bash
npm run prisma:seed
```

This will create:
- ✅ 7 food ingredient categories (Spices, Oils, Grains, etc.)
- ✅ 8 sample products with high-quality images
- ✅ Admin user (email: taranveerebu340@gmail.com)
- ✅ Test user (email: test@example.com)

⏱️ Takes 5-10 seconds

---

## Step 4: Start Development Server

```bash
npm run dev
```

✅ Server will start at: **http://localhost:3000**

---

## Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

You should see:
- 🎨 FreshPantry logo with dark red theme
- 🥘 Food ingredient products
- 🍳 New branding throughout

---

## Admin Access

1. Go to: http://localhost:3000/signin
2. Login with:
   - **Email:** taranveerebu340@gmail.com
   - **Password:** FreshPantry@2024$Secure!
3. Access admin at: http://localhost:3000/admin

---

## Test User Access

- **Email:** test@example.com
- **Password:** Test123!

---

## Quick Commands Reference

```bash
# Start development server
npm run dev

# View database in GUI
npm run prisma:studio

# Re-seed database (if needed)
npm run prisma:seed

# Build for production
npm run build

# Start production server
npm start
```

---

## What You'll See

### Homepage (http://localhost:3000)
- Dark red FreshPantry branding
- Food ingredient products with images
- Categories: Spices, Oils, Grains, etc.

### About Page (http://localhost:3000/about)
- Dark red hero section
- Food ingredient mission statement
- "Empowering Culinary Excellence"

### Shop Page (http://localhost:3000/shop)
- All food products
- Filter by category
- Add to cart functionality

### Admin Dashboard (http://localhost:3000/admin)
- Manage food products
- View orders
- Manage categories

---

## Troubleshooting

### If you see "Cannot connect to database"
Your Supabase database is already configured, so this shouldn't happen. If it does:
```bash
npm run test:db
```

### If no products show up
Run the seed script:
```bash
npm run prisma:seed
```

### If port 3000 is busy
```bash
# Use a different port
PORT=3001 npm run dev
```

---

## All Set! 🎉

Your environment is configured with:
- ✅ Supabase database connection
- ✅ Stripe payment keys
- ✅ Email/SMTP setup
- ✅ Cloudinary for images
- ✅ OAuth (Google & GitHub)
- ✅ Admin email configured

Just run:
```bash
npm install
npm run prisma:generate
npm run prisma:seed
npm run dev
```

Then open: **http://localhost:3000**

---

## Need Help?

Check these files:
- `QUICK_START_GUIDE.md` - Detailed guide
- `README.md` - Full documentation
- `REBRANDING_COMPLETE.md` - What changed
