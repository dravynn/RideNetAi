# Vercel Deployment Guide

## Fixing 404 Errors on Vercel

If you're seeing `404: NOT_FOUND` errors, follow these steps:

### Step 1: Check Build Settings

In your Vercel project settings:

1. **Framework Preset**: Should be **Next.js**
2. **Root Directory**: Should be `frontend` (if deploying from monorepo) or leave empty if deploying frontend folder directly
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next` (or leave empty for Next.js)
5. **Install Command**: `npm install`

### Step 2: Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

**Important**: 
- Use your production backend URL for `NEXT_PUBLIC_API_URL` (not `localhost:3001`)
- Make sure to add these for **Production**, **Preview**, and **Development** environments

### Step 3: Verify Build Output

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the **Build Logs**
4. Look for any errors during build

Common build errors:
- Missing environment variables
- TypeScript errors
- Missing dependencies

### Step 4: Check File Structure

Make sure your `frontend` folder has:
- ✅ `app/` directory (App Router)
- ✅ `app/page.tsx` (root page)
- ✅ `app/layout.tsx` (root layout)
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`

### Step 5: Common Issues & Fixes

#### Issue: "Cannot find module"
**Fix**: Make sure all dependencies are in `package.json` and run `npm install` locally first

#### Issue: "Build failed"
**Fix**: 
1. Test build locally: `cd frontend && npm run build`
2. Fix any errors before deploying
3. Check TypeScript errors: `npm run type-check`

#### Issue: "404 on all routes"
**Fix**: 
1. Verify `app/page.tsx` exists and exports a default component
2. Check `next.config.js` is correct
3. Make sure you're deploying the `frontend` folder, not the root

#### Issue: "Environment variables not working"
**Fix**:
1. Variables must start with `NEXT_PUBLIC_` to be available in browser
2. Redeploy after adding environment variables
3. Check variable names match exactly (case-sensitive)

### Step 6: Deploy Checklist

Before deploying:
- [ ] All environment variables set in Vercel
- [ ] `npm run build` works locally
- [ ] `npm run type-check` passes
- [ ] No TypeScript errors
- [ ] Root page (`app/page.tsx`) exists
- [ ] Root layout (`app/layout.tsx`) exists

### Step 7: Redeploy

After fixing issues:
1. Push changes to your Git repository
2. Vercel will auto-deploy
3. Or manually trigger deployment in Vercel Dashboard

## Quick Fix for 404

If you're getting 404 immediately after deployment:

1. **Check the deployment logs** in Vercel Dashboard
2. **Verify the root page exists**: `frontend/app/page.tsx`
3. **Test build locally**:
   ```bash
   cd frontend
   npm install
   npm run build
   npm start
   ```
4. **Check Vercel project settings**:
   - Framework: Next.js
   - Root Directory: `frontend` (if monorepo) or empty
   - Build Command: `npm run build`

## Monorepo Setup

If your project is a monorepo (frontend + backend):

1. In Vercel, set **Root Directory** to `frontend`
2. Or create separate Vercel projects for frontend and backend

## Backend Deployment

Your backend (Express API) needs to be deployed separately:

**Options**:
- **Railway**: Easy Express deployment
- **Render**: Free tier available
- **Heroku**: Paid option
- **AWS/Google Cloud**: More complex setup

After deploying backend, update `NEXT_PUBLIC_API_URL` in Vercel to point to your backend URL.

## Need Help?

1. Check Vercel deployment logs
2. Test build locally first
3. Verify all environment variables are set
4. Check that `app/page.tsx` exists and is valid

