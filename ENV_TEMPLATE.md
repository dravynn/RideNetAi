# Environment Variables Template

Copy these templates to create your `.env` files. **Never commit these files to git!**

## Backend (`backend/.env`)

Create this file manually:

```env
# Supabase Configuration
# Get these from: https://app.supabase.com/project/_/settings/api
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# JWT Configuration (optional)
JWT_SECRET=your_jwt_secret_optional

# Payment Provider (optional for MVP)
STRIPE_SECRET_KEY=your_stripe_secret_key_optional
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_optional
```

## Frontend (`frontend/.env.local`)

Create this file manually:

```env
# Supabase Configuration
# Get these from: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Quick Setup

1. **Create Supabase project** at [supabase.com](https://supabase.com)
2. **Get your keys** from Settings → API
3. **Create the .env files** above with your actual values
4. **Run the schema** from `supabase/schema.sql` in Supabase SQL Editor

See `SUPABASE_SETUP.md` for detailed instructions.

