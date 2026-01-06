# 🚨 IMMEDIATE FIX: Vercel 404 Error

## The Problem

You have a **monorepo** (frontend + backend), and Vercel is looking in the wrong directory.

## The Fix (2 minutes)

### Step 1: Go to Vercel Dashboard

1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project (`ride-net-ai` or similar)

### Step 2: Set Root Directory

1. Click **Settings** (top menu)
2. Click **General** (left sidebar)
3. Scroll down to **Root Directory**
4. Click **Edit**
5. Type: `frontend`
6. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to finish

### Step 4: Test

Visit: `https://ride-net-ai.vercel.app/`

Should now work! ✅

## Why This Works

Your project structure:
```
Ride/
├── frontend/  ← Your Next.js app (Vercel needs to look here)
├── backend/   ← Not needed by Vercel
└── supabase/  ← Not needed by Vercel
```

**Before**: Vercel looked in root (`Ride/`) → Found nothing → 404
**After**: Vercel looks in `frontend/` → Finds Next.js app → Works!

## Alternative: Use Root vercel.json

I've created a `vercel.json` in the root that specifies `rootDirectory: "frontend"`.

**But the Dashboard method is more reliable** - do that first!

## Still 404?

1. **Check Root Directory is actually set**:
   - Go to Settings → General
   - Verify it says `frontend` (not empty)

2. **Check build logs**:
   - Deployments → Latest → View Build Logs
   - Should see "Building in frontend/"

3. **Test build locally**:
   ```bash
   cd frontend
   npm run build
   ```
   - If this fails, fix errors first

## Quick Checklist

- [ ] Root Directory set to `frontend` in Vercel Dashboard
- [ ] Redeployed after changing settings
- [ ] Build logs show "Building in frontend/"
- [ ] Homepage loads without 404

That's it! The Root Directory setting is the key. 🎯

