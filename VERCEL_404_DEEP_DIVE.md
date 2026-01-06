# Deep Dive: Vercel 404 NOT_FOUND Error

## 1. 🔧 The Fix

### Immediate Fix

**Problem**: `output: 'standalone'` in `next.config.js` is incompatible with Vercel.

**Solution**: Remove the `output: 'standalone'` line from `next.config.js`.

```javascript
// ❌ WRONG (causes 404 on Vercel)
const nextConfig = {
  output: 'standalone', // This breaks Vercel routing
};

// ✅ CORRECT (works on Vercel)
const nextConfig = {
  reactStrictMode: true,
  // Vercel handles Next.js builds automatically
};
```

Also simplify `vercel.json` - Vercel auto-detects Next.js:

```json
// ✅ CORRECT
{
  "framework": "nextjs"
}
```

### Why This Fixes It

- **`standalone` mode** creates a self-contained build for Docker/self-hosting
- **Vercel** expects the standard Next.js build structure
- When you use `standalone`, Vercel can't find the route handlers because they're in a different location
- Removing it lets Vercel use its optimized Next.js build process

---

## 2. 🔍 Root Cause Analysis

### What Was Actually Happening

**The Code's Intent**:
- You set `output: 'standalone'` thinking it would "optimize for production"
- This creates a minimal, self-contained build for Docker containers

**What It Actually Did**:
- Changed the build output structure from Vercel's expected format
- Moved route handlers to `standalone/.next/server/` instead of `.next/server/`
- Vercel's routing system couldn't find the routes because it looks in the standard location

**The Trigger**:
- When Vercel builds your app, it runs `next build`
- Next.js sees `output: 'standalone'` and creates a different build structure
- Vercel's serverless functions look for routes in `.next/server/pages/` or `.next/server/app/`
- But `standalone` mode puts them in `standalone/.next/server/`
- Result: 404 NOT_FOUND because routes aren't where Vercel expects them

**The Misconception**:
- **Assumption**: "standalone = better for production"
- **Reality**: "standalone = for self-hosting, not Vercel"
- **Correct mental model**: Vercel has its own optimized build process for Next.js

---

## 3. 📚 Understanding the Concept

### Why This Error Exists

The 404 NOT_FOUND error is Vercel's way of saying:
> "I built your app, but I can't find the route handlers where I expect them to be."

### The Correct Mental Model

**Next.js Build Modes**:

1. **Default Mode** (for Vercel, Netlify, etc.):
   - Builds routes as serverless functions
   - Platform-specific optimizations
   - Platform handles deployment

2. **Standalone Mode** (for Docker, self-hosting):
   - Creates self-contained build
   - Includes all dependencies
   - You handle deployment

**Vercel's Next.js Integration**:
- Vercel has **deep integration** with Next.js
- It automatically:
  - Detects Next.js projects
  - Runs optimized builds
  - Creates serverless functions for routes
  - Handles static assets
  - Manages edge functions

**The Framework Design**:
- Next.js is **platform-agnostic** (works on many platforms)
- Each platform has **platform-specific optimizations**
- Using platform-agnostic settings (`standalone`) conflicts with platform-specific optimizations

### How This Fits Into the Broader Design

**Next.js Philosophy**:
- "It just works" on supported platforms
- Platform-specific optimizations are handled automatically
- You only configure when you need custom behavior

**Vercel Philosophy**:
- "Zero-config deployment" for Next.js
- Auto-detects framework and optimizes
- Custom configs can break auto-detection

**The Conflict**:
- `standalone` is a **custom configuration**
- It overrides Vercel's auto-optimizations
- This creates a mismatch between what Next.js builds and what Vercel expects

---

## 4. ⚠️ Warning Signs & Code Smells

### What to Look Out For

**Red Flags**:
1. ✅ **Using `output: 'standalone'` on Vercel/Netlify**
   - This is the #1 cause of 404s on these platforms
   - Only use for Docker/self-hosting

2. ✅ **Manually specifying `outputDirectory` in `vercel.json`**
   - Vercel handles this automatically
   - Only needed for non-standard setups

3. ✅ **Custom build commands that change Next.js output**
   - Vercel expects standard Next.js build output
   - Custom builds can break routing

4. ✅ **Monorepo without proper root directory**
   - If you have `frontend/` and `backend/`, set root directory
   - Otherwise Vercel looks in wrong place

**Code Smells**:

```javascript
// 🚨 SMELL: Standalone mode on Vercel
output: 'standalone'

// 🚨 SMELL: Over-specifying in vercel.json
{
  "outputDirectory": ".next",  // Vercel knows this
  "buildCommand": "npm run build"  // Vercel knows this
}

// ✅ GOOD: Let Vercel handle it
// Minimal or no vercel.json needed
```

**Similar Mistakes**:

1. **Using `output: 'export'` (static export) with dynamic routes**
   - Static export can't handle server-side routes
   - Causes 404s on dynamic routes

2. **Wrong root directory in monorepo**
   - Vercel looks in root, but app is in `frontend/`
   - Fix: Set root directory in Vercel settings

3. **Missing environment variables**
   - Routes might build but fail at runtime
   - Check Vercel environment variables

4. **TypeScript errors during build**
   - Build might succeed but routes might be broken
   - Always check build logs

---

## 5. 🔄 Alternatives & Trade-offs

### Alternative Approaches

#### Option 1: Default Next.js (Recommended for Vercel)
```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  // No output mode = Vercel optimizes automatically
};
```

**Pros**:
- ✅ Works perfectly on Vercel
- ✅ Automatic optimizations
- ✅ Zero configuration needed
- ✅ Best performance on Vercel

**Cons**:
- ❌ Platform-specific (Vercel only)
- ❌ Can't self-host easily

**When to Use**: Deploying to Vercel (your case)

---

#### Option 2: Standalone Mode (For Self-Hosting)
```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
};
```

**Pros**:
- ✅ Self-contained build
- ✅ Works in Docker
- ✅ Platform-agnostic
- ✅ Can deploy anywhere

**Cons**:
- ❌ Breaks on Vercel/Netlify
- ❌ Larger build size
- ❌ No platform optimizations
- ❌ You handle deployment

**When to Use**: Docker, self-hosting, custom servers

---

#### Option 3: Static Export (For Static Sites)
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
};
```

**Pros**:
- ✅ Fully static (no server needed)
- ✅ Can deploy to any static host
- ✅ Fastest possible

**Cons**:
- ❌ No server-side features
- ❌ No API routes
- ❌ No dynamic routes (unless pre-rendered)

**When to Use**: Static blogs, marketing sites, no server features

---

#### Option 4: Custom Vercel Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "rewrites": [
    { "source": "/(.*)", "destination": "/$1" }
  ]
}
```

**Pros**:
- ✅ Fine-grained control
- ✅ Custom routing rules

**Cons**:
- ❌ Usually unnecessary
- ❌ Can break auto-detection
- ❌ More maintenance

**When to Use**: Complex routing needs, custom requirements

---

### Decision Matrix

| Scenario | Recommended Approach |
|----------|---------------------|
| Deploying to Vercel | Default (no output mode) |
| Docker container | Standalone mode |
| Static site | Export mode |
| Multiple platforms | Separate configs per platform |
| Custom server | Standalone mode |

---

## 🎯 Key Takeaways

1. **Platform-Specific Configs**: Different platforms need different configs
2. **Vercel Auto-Optimization**: Let Vercel handle Next.js builds automatically
3. **Standalone ≠ Better**: It's for self-hosting, not Vercel
4. **Check Build Logs**: Always verify what's actually being built
5. **Test Locally First**: `npm run build` should work before deploying

---

## 🔧 Quick Reference

### For Vercel (Your Case)
```javascript
// ✅ DO THIS
const nextConfig = {
  reactStrictMode: true,
};
```

### For Docker/Self-Hosting
```javascript
// ✅ DO THIS
const nextConfig = {
  output: 'standalone',
};
```

### For Static Sites
```javascript
// ✅ DO THIS
const nextConfig = {
  output: 'export',
};
```

---

## 📖 Further Learning

- **Next.js Deployment Docs**: https://nextjs.org/docs/deployment
- **Vercel Next.js Guide**: https://vercel.com/docs/frameworks/nextjs
- **Next.js Output Modes**: https://nextjs.org/docs/app/api-reference/next-config-js/output

The key insight: **Match your build configuration to your deployment platform**.

