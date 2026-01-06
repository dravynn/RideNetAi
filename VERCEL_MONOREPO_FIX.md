# Fixing 404 Error in Monorepo on Vercel

## The Real Problem

You have a **monorepo** structure:
```
Ride/
├── frontend/     ← Your Next.js app is here
├── backend/      ← Your Express API
└── supabase/     ← Database schema
```

**Vercel is looking in the root directory** (`Ride/`) instead of `frontend/`, so it can't find your Next.js app!

## The Fix

### Option 1: Set Root Directory in Vercel Dashboard (Recommended)

1. Go to **Vercel Dashboard** → Your Project
2. Go to **Settings** → **General**
3. Find **Root Directory**
4. Click **Edit**
5. Set it to: `frontend`
6. Click **Save**
7. **Redeploy** your project

### Option 2: Use Root vercel.json (Alternative)

I've created a `vercel.json` in the root directory that tells Vercel where your app is.

**Important**: You need to configure this in Vercel Dashboard OR use the root `vercel.json` file.

## Step-by-Step Fix

### Step 1: Check Vercel Project Settings

1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **General**
4. Scroll to **Root Directory**

**If it's empty or set to `/`**:
- This is the problem!
- Vercel is looking in the root, but your app is in `frontend/`

### Step 2: Set Root Directory

**In Vercel Dashboard**:
1. Click **Edit** next to Root Directory
2. Type: `frontend`
3. Click **Save**

**OR use the root `vercel.json`** I created (it specifies `rootDirectory: "frontend"`)

### Step 3: Verify Build Settings

Make sure these are set correctly:
- **Framework Preset**: `Next.js` (auto-detected)
- **Root Directory**: `frontend` ✅
- **Build Command**: Leave default (or `npm run build`)
- **Output Directory**: Leave empty (Next.js handles this)
- **Install Command**: Leave default (or `npm install`)

### Step 4: Redeploy

After changing Root Directory:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger auto-deploy

## Why This Happens

### Monorepo Structure

When you have:
```
project/
├── frontend/  ← Next.js app
└── backend/   ← Express API
```

Vercel doesn't know which folder contains your app. It defaults to the root.

### The Solution

By setting **Root Directory** to `frontend`, you tell Vercel:
> "My Next.js app is in the `frontend/` folder, not the root."

### What Happens Without Root Directory

1. Vercel looks in root (`Ride/`)
2. Finds `package.json` in root? ❌ No
3. Finds `next.config.js` in root? ❌ No
4. Finds `app/` folder in root? ❌ No
5. Result: **404 NOT_FOUND** - Vercel can't find your app

### What Happens With Root Directory Set

1. Vercel looks in `frontend/`
2. Finds `package.json` in `frontend/`? ✅ Yes
3. Finds `next.config.js` in `frontend/`? ✅ Yes
4. Finds `app/` folder in `frontend/`? ✅ Yes
5. Result: **App works!** ✅

## Verification Checklist

After setting Root Directory:

- [ ] Root Directory set to `frontend` in Vercel
- [ ] Build logs show it's building from `frontend/`
- [ ] Deployment succeeds
- [ ] Homepage loads at `https://your-app.vercel.app/`
- [ ] Routes work (e.g., `/login`, `/dashboard`)

## Still Not Working?

### Check Build Logs

1. Go to **Deployments** → Latest deployment
2. Click **View Build Logs**
3. Look for:
   - ✅ "Building in frontend/"
   - ❌ "Building in /" (wrong!)

### Test Build Locally

```bash
cd frontend
npm install
npm run build
```

If this fails locally, fix errors before deploying.

### Common Issues

1. **Root Directory not saved**
   - Make sure you clicked **Save** in Vercel
   - Check it's actually set to `frontend`

2. **Old deployment cached**
   - Redeploy after changing settings
   - Or wait for next auto-deploy

3. **Build failing**
   - Check build logs
   - Fix TypeScript/import errors

## Quick Test

After fixing, test these URLs:
- `https://your-app.vercel.app/` → Should show homepage
- `https://your-app.vercel.app/login` → Should show login page
- `https://your-app.vercel.app/admin/login` → Should show admin login

If all return 404, Root Directory is still wrong.

## Summary

**The Issue**: Monorepo structure - Vercel doesn't know where your app is
**The Fix**: Set Root Directory to `frontend` in Vercel Dashboard
**The Result**: Vercel finds your app and routes work!

