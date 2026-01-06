-- Quick verification script to check if all tables exist
-- Run this in Supabase SQL Editor to verify your schema is set up correctly

-- Check if all required tables exist
SELECT 
    table_name,
    CASE 
        WHEN table_name IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_name IN (
        'users',
        'parent_profiles',
        'students',
        'driver_profiles',
        'groups',
        'group_students',
        'trip_sessions',
        'location_points',
        'subscriptions',
        'payment_transactions'
    )
ORDER BY table_name;

-- Check if trigger exists
SELECT 
    trigger_name,
    event_object_table,
    CASE 
        WHEN trigger_name IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Check RLS policies on parent_profiles
SELECT 
    policyname,
    cmd as operation,
    CASE 
        WHEN policyname IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM pg_policies
WHERE schemaname = 'public'
    AND tablename = 'parent_profiles'
ORDER BY cmd, policyname;

