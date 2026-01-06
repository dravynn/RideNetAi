#!/bin/bash

# Bash script to help set up Supabase environment variables
# Run this script after creating your Supabase project

echo "🚀 Ride Network Connection - Supabase Setup"
echo ""

# Check if .env files exist
BACKEND_ENV="backend/.env"
FRONTEND_ENV="frontend/.env.local"

if [ ! -f "$BACKEND_ENV" ]; then
    echo "❌ Backend .env file not found. Creating from template..."
    cp backend/.env.example "$BACKEND_ENV" 2>/dev/null || true
fi

if [ ! -f "$FRONTEND_ENV" ]; then
    echo "❌ Frontend .env.local file not found. Creating from template..."
    cp frontend/.env.example "$FRONTEND_ENV" 2>/dev/null || true
fi

echo ""
echo "📋 Please provide your Supabase credentials:"
echo "   (Get these from: https://app.supabase.com/project/_/settings/api)"
echo ""

read -p "Enter your Supabase URL (e.g., https://xxxxx.supabase.co): " SUPABASE_URL
read -p "Enter your Supabase Anon Key: " ANON_KEY
read -p "Enter your Supabase Service Role Key: " SERVICE_ROLE_KEY

# Update backend .env
if [ -f "$BACKEND_ENV" ]; then
    sed -i.bak "s|SUPABASE_URL=.*|SUPABASE_URL=$SUPABASE_URL|g" "$BACKEND_ENV"
    sed -i.bak "s|SUPABASE_ANON_KEY=.*|SUPABASE_ANON_KEY=$ANON_KEY|g" "$BACKEND_ENV"
    sed -i.bak "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY|g" "$BACKEND_ENV"
    rm -f "$BACKEND_ENV.bak"
    echo "✅ Updated backend/.env"
fi

# Update frontend .env.local
if [ -f "$FRONTEND_ENV" ]; then
    sed -i.bak "s|NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL|g" "$FRONTEND_ENV"
    sed -i.bak "s|NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY|g" "$FRONTEND_ENV"
    rm -f "$FRONTEND_ENV.bak"
    echo "✅ Updated frontend/.env.local"
fi

echo ""
echo "🎉 Environment variables configured!"
echo ""
echo "Next steps:"
echo "1. Run the database schema: supabase/schema.sql in Supabase SQL Editor"
echo "2. Install dependencies: cd backend && npm install"
echo "3. Install dependencies: cd frontend && npm install"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm run dev"
echo ""

