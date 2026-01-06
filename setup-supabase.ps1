# PowerShell script to help set up Supabase environment variables
# Run this script after creating your Supabase project

Write-Host "🚀 Ride Network Connection - Supabase Setup" -ForegroundColor Cyan
Write-Host ""

# Check if .env files exist
$backendEnv = "backend\.env"
$frontendEnv = "frontend\.env.local"

if (-not (Test-Path $backendEnv)) {
    Write-Host "❌ Backend .env file not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" $backendEnv -ErrorAction SilentlyContinue
}

if (-not (Test-Path $frontendEnv)) {
    Write-Host "❌ Frontend .env.local file not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item "frontend\.env.example" $frontendEnv -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "📋 Please provide your Supabase credentials:" -ForegroundColor Green
Write-Host "   (Get these from: https://app.supabase.com/project/_/settings/api)" -ForegroundColor Gray
Write-Host ""

$supabaseUrl = Read-Host "Enter your Supabase URL (e.g., https://xxxxx.supabase.co)"
$anonKey = Read-Host "Enter your Supabase Anon Key"
$serviceRoleKey = Read-Host "Enter your Supabase Service Role Key"

# Update backend .env
if (Test-Path $backendEnv) {
    $backendContent = Get-Content $backendEnv -Raw
    $backendContent = $backendContent -replace "SUPABASE_URL=.*", "SUPABASE_URL=$supabaseUrl"
    $backendContent = $backendContent -replace "SUPABASE_ANON_KEY=.*", "SUPABASE_ANON_KEY=$anonKey"
    $backendContent = $backendContent -replace "SUPABASE_SERVICE_ROLE_KEY=.*", "SUPABASE_SERVICE_ROLE_KEY=$serviceRoleKey"
    Set-Content $backendEnv $backendContent
    Write-Host "✅ Updated backend/.env" -ForegroundColor Green
}

# Update frontend .env.local
if (Test-Path $frontendEnv) {
    $frontendContent = Get-Content $frontendEnv -Raw
    $frontendContent = $frontendContent -replace "NEXT_PUBLIC_SUPABASE_URL=.*", "NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl"
    $frontendContent = $frontendContent -replace "NEXT_PUBLIC_SUPABASE_ANON_KEY=.*", "NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey"
    Set-Content $frontendEnv $frontendContent
    Write-Host "✅ Updated frontend/.env.local" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Environment variables configured!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run the database schema: supabase/schema.sql in Supabase SQL Editor"
Write-Host "2. Install dependencies: cd backend && npm install"
Write-Host "3. Install dependencies: cd frontend && npm install"
Write-Host "4. Start backend: cd backend && npm run dev"
Write-Host "5. Start frontend: cd frontend && npm run dev"
Write-Host ""

