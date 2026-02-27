# GitHub Push Instructions

## Issue
GitHub is blocking the push because old commits contain sensitive files (.env.vercel, CART_CHECKOUT_FIX_PLAN.md).

## Quick Solution (Recommended)

1. Visit these URLs in your browser to allow the secrets:
   - https://github.com/tsedeniyafiseha/ecommerce-/security/secret-scanning/unblock-secret/3AFhDqHDeGDq5HCQV0tCKg8Tonn
   - https://github.com/tsedeniyafiseha/ecommerce-/security/secret-scanning/unblock-secret/3AFhDlPC5MUrq69d3Rc2IBSzwue
   - https://github.com/tsedeniyafiseha/ecommerce-/security/secret-scanning/unblock-secret/3AFhDmL19SGGeQ1tPDoRMU9jJtc

2. Click "Allow secret" on each page

3. Then run:
   ```bash
   git push origin main
   ```

## After Successful Push

### Deploy to Vercel

1. Go to https://vercel.com/new
2. Import repository: `tsedeniyafiseha/ecommerce-`
3. Add environment variables (see DEPLOYMENT_GUIDE.md)
4. Deploy!

### Important: Rotate Exposed Secrets

Since these secrets were exposed in git history, you should rotate them:

1. **Stripe Keys**: Generate new test keys in Stripe Dashboard
2. **Google OAuth**: Create new credentials in Google Cloud Console
3. **GitHub OAuth**: Create new OAuth app in GitHub Settings
4. Update the new keys in Vercel environment variables

## Alternative: Force Push (Destructive)

If you want to completely clean the history:

```bash
# WARNING: This will rewrite history and force push
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.vercel CART_CHECKOUT_FIX_PLAN.md" \
  --prune-empty --tag-name-filter cat -- --all

git push origin main --force
```

⚠️ Only use this if you're the only one working on the repository!
