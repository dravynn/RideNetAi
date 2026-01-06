# Deployment Checklist for Vercel

## Quick Fix for 404 Error

### Step 1: Verify Vercel Project Settings

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **General**
4. Check:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: 
     - If monorepo: Set to `frontend`
     - If deploying frontend folder directly: Leave empty
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: Leave empty (Next.js handles this)

### Step 2: Add Environment Variables

Go to **Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Important**:
- ✅ Add for **Production**, **Preview**, and **Development**
- ✅ Use your **production backend URL** (not localhost)
- ✅ Redeploy after adding variables

### Step 3: Test Build Locally First

Before deploying, test the build:

```bash
cd frontend
npm install
npm run build
```

If build fails locally, fix errors before deploying.

### Step 4: Check Deployment Logs

1. In Vercel Dashboard → **Deployments**
2. Click on the failed deployment
3. Check **Build Logs** for errors

Common errors:
- ❌ "Module not found" → Missing dependency
- ❌ "Type error" → TypeScript error
- ❌ "Environment variable not found" → Missing env var

### Step 5: Common 404 Causes & Fixes

#### Cause 1: Wrong Root Directory
**Fix**: Set Root Directory to `frontend` in Vercel settings

#### Cause 2: Build Failing
**Fix**: 
```bash
cd frontend
npm run build
# Fix any errors shown
```

#### Cause 3: Missing Environment Variables
**Fix**: Add all `NEXT_PUBLIC_*` variables in Vercel

#### Cause 4: TypeScript Errors
**Fix**:
```bash
cd frontend
npm run type-check
# Fix any TypeScript errors
```

#### Cause 5: Missing Dependencies
**Fix**: Make sure `package.json` has all dependencies

### Step 6: Verify File Structure

Your `frontend` folder should have:
```
frontend/
├── app/
│   ├── layout.tsx      ✅ Required
│   ├── page.tsx         ✅ Required (root page)
│   └── globals.css      ✅ Required
├── package.json         ✅ Required
├── next.config.js       ✅ Required
├── tsconfig.json        ✅ Required
└── vercel.json          ✅ Optional (created)
```

### Step 7: Redeploy

After fixing issues:

1. **Option A - Auto Deploy**: Push to Git, Vercel auto-deploys
2. **Option B - Manual**: Vercel Dashboard → Deployments → Redeploy

## Monorepo Setup

If your repo has both `frontend/` and `backend/`:

1. In Vercel project settings:
   - **Root Directory**: `frontend`
   - **Framework**: `Next.js`

2. Or create **two separate Vercel projects**:
   - One for frontend (Next.js)
   - One for backend (Node.js/Express)

## Backend Deployment

Your Express backend needs separate deployment:

**Recommended**: Railway.app
1. Connect GitHub repo
2. Set root directory to `backend`
3. Add environment variables
4. Deploy

Then update `NEXT_PUBLIC_API_URL` in Vercel to your backend URL.

## Quick Test

After deployment, test these URLs:
- `https://your-app.vercel.app/` → Should show home page
- `https://your-app.vercel.app/login` → Should show login page
- `https://your-app.vercel.app/admin/login` → Should show admin login

If all return 404, check:
1. Build logs for errors
2. Root directory setting
3. File structure

## Still Getting 404?

1. **Check build logs** in Vercel
2. **Test build locally**: `cd frontend && npm run build`
3. **Verify `app/page.tsx` exists** and exports a component
4. **Check Vercel project settings** match this guide
5. **Redeploy** after making changes

## Need More Help?

- Check `VERCEL_DEPLOYMENT.md` for detailed guide
- Review Vercel deployment logs
- Test build locally first

