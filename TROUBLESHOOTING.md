# Troubleshooting Guide

## Error: "Could not find the table 'public.parent_profiles' in the schema cache"

This error means Supabase can't find the `parent_profiles` table. Here's how to fix it:

### Solution 1: Verify Schema Was Run

1. **Check Supabase Dashboard**:
   - Go to your Supabase project dashboard
   - Click **Table Editor** in the left sidebar
   - Look for `parent_profiles` table
   - If it's missing, the schema wasn't run

2. **Run the Schema**:
   - Go to **SQL Editor** in Supabase dashboard
   - Click **New query**
   - Open `supabase/schema.sql` from this project
   - Copy the entire file
   - Paste into SQL Editor
   - Click **Run** (or press Ctrl+Enter)
   - Wait for "Success" message

3. **Verify Tables Created**:
   - Go back to **Table Editor**
   - You should see these tables:
     - `users`
     - `parent_profiles`
     - `students`
     - `driver_profiles`
     - `groups`
     - `group_students`
     - `trip_sessions`
     - `location_points`
     - `subscriptions`
     - `payment_transactions`

### Solution 2: Refresh Supabase Schema Cache

Sometimes Supabase needs to refresh its schema cache:

1. **Wait a few minutes** - Schema changes can take 1-2 minutes to propagate
2. **Restart your frontend dev server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   cd frontend
   npm run dev
   ```
3. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Solution 3: Check RLS Policies

If the table exists but you still get errors:

1. Go to **Authentication** → **Policies** in Supabase
2. Find `parent_profiles` table
3. Verify these policies exist:
   - "Parents can insert own profile" (INSERT policy)
   - "Parents can view own profile" (SELECT policy)

### Solution 4: Manual Table Creation

If the schema won't run, create the table manually:

```sql
-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.parent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ NULL,
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.parent_profiles ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Parents can insert own profile" ON public.parent_profiles
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Parents can view own profile" ON public.parent_profiles
    FOR SELECT USING (user_id = auth.uid());
```

## Common Issues

### "Table does not exist"
- **Cause**: Schema wasn't run
- **Fix**: Run `supabase/schema.sql` in Supabase SQL Editor

### "Permission denied"
- **Cause**: RLS policies missing or incorrect
- **Fix**: Check policies in Authentication → Policies

### "Schema cache" errors
- **Cause**: Supabase hasn't refreshed schema
- **Fix**: Wait 1-2 minutes, restart dev server, clear browser cache

### Rate limiting (429 errors)
- **Cause**: Too many requests to Supabase
- **Fix**: Wait 5-10 minutes before trying again

## Quick Checklist

- [ ] Supabase project created
- [ ] Environment variables set in `.env` files
- [ ] Database schema run in SQL Editor
- [ ] All 10 tables visible in Table Editor
- [ ] RLS policies created
- [ ] Frontend dev server restarted
- [ ] Browser cache cleared

## Still Having Issues?

1. Check Supabase project status (not paused)
2. Verify API keys are correct in `.env` files
3. Check browser console for detailed error messages
4. Check Supabase logs in dashboard (Logs section)

