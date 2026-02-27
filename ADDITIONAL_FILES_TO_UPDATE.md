# 📋 Additional Files to Update for Complete Rebranding

This document lists files that contain references to the old brand or cleaning-related content that should be updated for consistency.

---

## 🔴 HIGH PRIORITY - User-Facing Content

### 1. Homepage (`src/app/page.tsx`)
**Current:** Generic homepage
**Update Needed:**
- Hero section text
- Product section descriptions
- Any cleaning-related references

### 2. Shop Page (`src/app/shop/page.tsx`)
**Update Needed:**
- Page title and meta description
- Filter descriptions
- Category display text

### 3. Product Pages
**Files to check:**
- `src/components/product-page/Header/index.tsx`
- `src/components/product-page/Tabs/ProductDetailsContent.tsx`
- `src/components/product-page/Tabs/FaqContent.tsx`

**Update Needed:**
- FAQ content (change from cleaning to cooking/ingredients)
- Product detail templates

### 4. Blog Pages
**Files:**
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

**Update Needed:**
- Blog post topics (cleaning tips → recipes/cooking tips)
- Meta descriptions
- Sample blog content

---

## 🟡 MEDIUM PRIORITY - Supporting Content

### 5. Email Templates (`src/lib/email.ts`)
**Update Needed:**
- Email subject lines
- Email body content
- Brand name in signatures
- FROM name display

### 6. SEO & Metadata
**Files to check:**
- `src/app/layout.tsx` - Root metadata
- `src/app/sitemap.ts` - If exists
- `src/app/robots.txt` - If exists

**Update Needed:**
- Site title
- Meta descriptions
- Open Graph tags
- Twitter card data

### 7. Error Pages
**Files:**
- `src/app/error.tsx`
- `src/app/not-found.tsx`

**Update Needed:**
- Error messages
- Brand references

### 8. Legal Pages
**Files:**
- `src/app/terms/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/returns/page.tsx`
- `src/app/faq/page.tsx`

**Update Needed:**
- Company name throughout
- Product type references
- Return policy (cleaning supplies → food ingredients)
- FAQ content

---

## 🟢 LOW PRIORITY - Internal/Admin

### 9. Admin Dashboard
**Files:**
- `src/app/admin/page.tsx`
- `src/app/admin/products/page.tsx`
- `src/app/admin/products/new/page.tsx`
- `src/app/admin/categories/page.tsx`

**Update Needed:**
- Dashboard titles
- Product form labels
- Category management text

### 10. Documentation Files
**Files in root directory:**
- `ADMIN_SETUP_GUIDE.md`
- `ADMIN_LOGIN_CREDENTIALS.md`
- `DEPLOYMENT_CHECKLIST.md`
- `CONTACT_FORM_QUICK_REFERENCE.md`
- Various troubleshooting docs

**Update Needed:**
- Replace all "Hyper Cleaning" references
- Update URLs to freshpantry.co.nz
- Update admin credentials documentation

### 11. Test Scripts
**Files in `scripts/` directory:**
- All test scripts that reference the old brand
- Database connection tests
- API test scripts

**Update Needed:**
- Update test data
- Update expected responses
- Update URLs

---

## 🎨 Assets & Media

### 12. Favicon & Icons
**Files:**
- `src/app/icon.tsx`
- `public/favicon.ico` (if exists)
- `public/icons/` directory

**Update Needed:**
- Change "H" to "F"
- Update colors to green theme
- Generate new favicon set

### 13. Images
**Directories:**
- `public/` directory
- Any product images
- Background images

**Update Needed:**
- Replace cleaning-related images
- Add food/ingredient images
- Update hero backgrounds

### 14. Social Media Assets
**Create new:**
- Open Graph images
- Twitter card images
- Social media profile images

---

## 📝 Content Strategy Updates

### 15. Product Descriptions
**Update focus from:**
- Cleaning effectiveness → Flavor profiles
- Chemical properties → Nutritional benefits
- Commercial use → Culinary applications
- Safety data → Storage instructions

### 16. Category Descriptions
**New descriptions needed for:**
- Spices & Herbs
- Baking Essentials
- Oils & Vinegars
- Grains & Flours
- Sauces & Condiments
- Dried Fruits & Nuts
- International Ingredients

### 17. Blog Content Strategy
**Old topics (remove/replace):**
- Cleaning tips
- Product usage guides
- Industry news

**New topics (create):**
- Recipes and cooking techniques
- Ingredient spotlights
- Seasonal cooking guides
- Chef interviews
- Food pairing suggestions

---

## 🔧 Technical Updates

### 18. API Routes
**Check these files:**
- `src/app/api/products/[id]/route.ts`
- `src/app/api/categories/route.ts`
- All API routes for hardcoded text

### 19. Component Props & Types
**Files:**
- `src/components/common/ProductCard.tsx`
- `src/components/common/ProductListSec.tsx`
- Type definitions

**Update Needed:**
- Default text values
- Placeholder content
- Example data

### 20. Configuration Files
**Files:**
- `next.config.js`
- `tailwind.config.js`
- `components.json`

**Update Needed:**
- Site name in configs
- Theme colors (if hardcoded)

---

## 🔍 Search & Replace Suggestions

Run these searches across the codebase:

1. **"Hyper Cleaning"** → "FreshPantry"
2. **"cleaning supplies"** → "food ingredients"
3. **"cleaning products"** → "culinary ingredients"
4. **"hyperclean"** → "freshpantry"
5. **"green-500"** → "red-700" (primary color)
6. **"green-600"** → "red-800" (dark variant)
7. **"green-100"** → "red-100" (light variant)
8. **"emerald-"** → "rose-" (accent colors)
9. **"sky-500"** → "red-700" (if any remain)
10. **"sky-600"** → "red-800" (if any remain)
11. **"Christchurch"** → "New Zealand" (or keep if still relevant)

---

## ✅ Quick Update Script

You can use this command to find remaining references:

```bash
# Find all "Hyper" references
grep -r "Hyper" src/ --exclude-dir=node_modules

# Find all "cleaning" references
grep -ri "cleaning" src/ --exclude-dir=node_modules

# Find all green color references (to change to red)
grep -r "green-[0-9]" src/ --exclude-dir=node_modules

# Find all emerald color references (to change to rose)
grep -r "emerald-[0-9]" src/ --exclude-dir=node_modules

# Find all sky color references (should be mostly gone)
grep -r "sky-[0-9]" src/ --exclude-dir=node_modules
```

---

## 📊 Priority Order

1. **First:** User-facing pages (homepage, shop, product pages)
2. **Second:** Email templates and notifications
3. **Third:** Legal pages and FAQ
4. **Fourth:** Admin dashboard
5. **Fifth:** Documentation and test scripts
6. **Last:** Internal comments and variable names

---

**Note:** This is a comprehensive list. Focus on high-priority items first for a functional rebrand, then work through medium and low priority items for complete consistency.
