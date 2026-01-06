# 🚀 Quick Start Checklist

Follow these steps to get your Ride Network Connection app running:

## ✅ Step 1: Set Up Supabase (5 minutes)

1. **Create Account & Project**
   - Go to [supabase.com](https://supabase.com) and sign up
   - Click "New Project"
   - Choose a name, set a database password, select region
   - Wait for project to initialize (~2 minutes)

2. **Get Your API Keys**
   - In Supabase dashboard: **Settings** → **API**
   - Copy these three values:
     - Project URL (e.g., `https://xxxxx.supabase.co`)
     - `anon` `public` key
     - `service_role` key (keep this secret!)

3. **Run Database Schema**
   - In Supabase dashboard: **SQL Editor** → **New query**
   - Open `supabase/schema.sql` from this project
   - Copy entire file and paste into SQL Editor
   - Click **Run** (or Ctrl+Enter)
   - ✅ Should see "Success. No rows returned"

4. **Verify Tables Created**
   - Go to **Table Editor**
   - Should see 10 tables: `users`, `parent_profiles`, `students`, etc.

## ✅ Step 2: Configure Environment Variables (2 minutes)

### Backend

Create `backend/.env` file:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend

Create `frontend/.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**💡 Tip:** Use the setup script:
- Windows: `.\setup-supabase.ps1`
- Mac/Linux: `./setup-supabase.sh`

## ✅ Step 3: Install Dependencies (2 minutes)

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## ✅ Step 4: Start Development Servers (1 minute)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ Should see: `🚀 Server running on port 3001`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
✅ Should see: `Ready on http://localhost:3000`

## ✅ Step 5: Create Admin User (2 minutes)

1. **Sign Up**
   - Visit `http://localhost:3000`
   - Click "Parent Login" → "Sign up"
   - Create an account (this creates a PARENT role)

2. **Make Yourself Admin**
   - In Supabase dashboard: **SQL Editor**
   - Run this (replace with your email):
   ```sql
   UPDATE users 
   SET role = 'ADMIN' 
   WHERE email = 'your-email@example.com';
   ```

3. **Test Admin Access**
   - Log out
   - Visit `http://localhost:3000/admin/login`
   - Log in with your email
   - ✅ Should see admin dashboard

## 🎉 You're Ready!

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📚 Next Steps

- Read [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed Supabase configuration
- Check [README.md](./README.md) for API documentation
- Start building features!

## 🐛 Troubleshooting

**"Invalid API key" error?**
- Double-check you copied the full key (they're very long!)
- No extra spaces or line breaks
- Verify in Supabase dashboard

**"Table does not exist" error?**
- Make sure you ran the entire `schema.sql` file
- Check SQL Editor for error messages

**Port already in use?**
- Change `PORT=3001` in `backend/.env` to another port
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` accordingly

**Can't connect to backend?**
- Make sure backend is running on port 3001
- Check CORS_ORIGIN matches frontend URL
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

---

**Need help?** Check the detailed guides:
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Complete Supabase setup
- [ENV_TEMPLATE.md](./ENV_TEMPLATE.md) - Environment variable templates

