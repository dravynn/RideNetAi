# Signup Flow Fix

## Issues Fixed

### 1. **400 Bad Request on User Creation**
- **Problem**: Trying to insert into `users` table directly was blocked by RLS policies
- **Solution**: Added database trigger that automatically creates `users` record when a new auth user signs up

### 2. **429 Rate Limiting**
- **Problem**: Too many signup attempts hitting Supabase rate limits
- **Solution**: Added better error handling with user-friendly messages

### 3. **Email Confirmation**
- **Problem**: Supabase may require email confirmation before allowing login
- **Solution**: Updated signup flow to handle email confirmation requirement

## Database Changes

### New Trigger
A database trigger `on_auth_user_created` now automatically:
- Creates a `users` record with `PARENT` role when a new user signs up
- Uses `SECURITY DEFINER` to bypass RLS for this operation
- Handles conflicts gracefully (won't fail if record already exists)

### New RLS Policies
- Users can now insert their own record in `users` table
- Parents can insert their own profile in `parent_profiles` table

## How to Apply

### If you haven't run the schema yet:
1. Run the updated `supabase/schema.sql` in Supabase SQL Editor
2. The trigger and policies are included

### If you already ran the schema:
1. Run `supabase/migration_add_user_trigger.sql` in Supabase SQL Editor
2. This adds the trigger and policies without affecting existing data

## Updated Signup Flow

1. User fills out signup form
2. Supabase Auth creates `auth.users` record
3. **Database trigger automatically creates `public.users` record** (new!)
4. Frontend creates `parent_profiles` record
5. If email confirmation is required, user is redirected to login with message
6. Otherwise, user is logged in and redirected to dashboard

## Testing

1. Try signing up with a new email
2. Check Supabase Table Editor - you should see:
   - Record in `auth.users` (in Authentication section)
   - Record in `public.users` (created automatically by trigger)
   - Record in `public.parent_profiles` (created by frontend)

## Error Messages

The signup page now shows helpful error messages for:
- Rate limiting: "Too many signup attempts. Please wait a few minutes and try again."
- Duplicate email: "This email is already registered. Please sign in instead."
- Email confirmation: Shows alert to check email

## Notes

- The trigger uses `SECURITY DEFINER` to run with elevated privileges
- Default role for new signups is `PARENT` (can be changed to `ADMIN` via SQL later)
- The trigger handles race conditions with `ON CONFLICT DO NOTHING`

