# Supabase Setup Guide

Follow these steps to set up Supabase for the Ride Network Connection project.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: Ride Network Connection (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for MVP
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to initialize

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co` (this is your `SUPABASE_URL`)
   - **anon/public key**: (this is your `SUPABASE_ANON_KEY`)
   - **service_role key**: (this is your `SUPABASE_SERVICE_ROLE_KEY`) - **⚠️ Keep this secret!**

## Step 3: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Open `supabase/schema.sql` from this project
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see "Success. No rows returned" - this is normal

## Step 4: Verify Tables Created

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
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

## Step 5: Configure Environment Variables

### Backend (`backend/.env`)

Replace the placeholder values in `backend/.env`:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Frontend (`frontend/.env.local`)

Replace the placeholder values in `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 6: Enable Email Auth (Optional but Recommended)

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Ensure **Email** provider is enabled
3. Configure email templates if needed
4. For development, you can use Supabase's built-in email service

## Step 7: Set Up Storage (For Driver Documents)

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `driver-documents`
3. Set it to **Private** (not public)
4. Add policy:
   - Policy name: "Drivers can upload their own documents"
   - Allowed operation: INSERT
   - Target roles: authenticated
   - Policy definition: `bucket_id = 'driver-documents' AND auth.uid()::text = (storage.foldername(name))[1]`

## Step 8: Create Your First Admin User

After running the app and signing up:

1. Go to **SQL Editor** in Supabase
2. Run this query (replace with your email):

```sql
-- First, sign up through the app at /signup
-- Then run this to make yourself an admin:
UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

## Step 9: Test the Setup

### Backend Test

```bash
cd backend
npm install
npm run dev
```

You should see: `🚀 Server running on port 3001`

### Frontend Test

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` - you should see the home page.

## Troubleshooting

### "Invalid API key" error
- Double-check you copied the full key (they're long!)
- Ensure no extra spaces or line breaks
- Verify you're using the correct key (anon vs service_role)

### "Table does not exist" error
- Make sure you ran the entire `schema.sql` file
- Check the SQL Editor for any error messages
- Verify tables exist in Table Editor

### "Row Level Security" errors
- RLS is enabled by default for security
- For development, you can temporarily disable RLS on specific tables
- Or ensure your auth tokens are being sent correctly

### Connection issues
- Verify your Supabase project is active (not paused)
- Check your internet connection
- Ensure CORS is configured correctly in backend

## Next Steps

1. ✅ Database schema is set up
2. ✅ Environment variables configured
3. ✅ Test backend and frontend
4. Create your first admin user
5. Start building features!

## Security Notes

- **Never commit** `.env` or `.env.local` files to git
- The `service_role` key has admin access - keep it secret
- Use `anon` key in frontend (it's safe to expose)
- Enable RLS policies for production
- Use environment-specific keys for staging/production

---

**Need help?** Check the [Supabase Documentation](https://supabase.com/docs) or open an issue.

