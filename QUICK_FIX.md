# Quick Fix: "Table not found" Error

## The Problem

You're seeing: **"Could not find the table 'public.parent_profiles' in the schema cache"**

This means the database tables haven't been created yet.

## The Solution (2 minutes)

### Step 1: Run the Database Schema

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor** (left sidebar)
3. Click **New query**
4. Open the file `supabase/schema.sql` from this project
5. **Copy the entire contents** (Ctrl+A, Ctrl+C)
6. **Paste into the SQL Editor** (Ctrl+V)
7. Click **Run** button (or press Ctrl+Enter)
8. Wait for "Success" message ✅

### Step 2: Verify Tables Were Created

1. In Supabase dashboard, go to **Table Editor** (left sidebar)
2. You should see these tables:
   - ✅ `users`
   - ✅ `parent_profiles`
   - ✅ `students`
   - ✅ `driver_profiles`
   - ✅ `groups`
   - ✅ `group_students`
   - ✅ `trip_sessions`
   - ✅ `location_points`
   - ✅ `subscriptions`
   - ✅ `payment_transactions`

If you see all 10 tables, you're good to go! ✅

### Step 3: Restart Your Dev Server

```bash
# Stop your frontend server (Ctrl+C)
# Then restart it
cd frontend
npm run dev
```

### Step 4: Try Signing Up Again

The error should be gone! 🎉

## Still Not Working?

Run this in Supabase SQL Editor to check what's missing:

```sql
-- Copy and paste the contents of supabase/verify_schema.sql
```

This will show you exactly which tables/policies are missing.

## Need More Help?

See `TROUBLESHOOTING.md` for detailed troubleshooting steps.

