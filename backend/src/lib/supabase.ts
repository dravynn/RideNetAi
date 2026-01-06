import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

// Validate config before creating clients
if (!config.supabase.url || config.supabase.url.trim() === '') {
  throw new Error(
    'SUPABASE_URL is required. Please create a .env file in the backend/ directory.\n' +
    'See ENV_TEMPLATE.md or SUPABASE_SETUP.md for setup instructions.'
  );
}

if (!config.supabase.serviceRoleKey || config.supabase.serviceRoleKey.trim() === '') {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY is required. Please add it to your .env file.\n' +
    'See ENV_TEMPLATE.md or SUPABASE_SETUP.md for setup instructions.'
  );
}

if (!config.supabase.anonKey || config.supabase.anonKey.trim() === '') {
  throw new Error(
    'SUPABASE_ANON_KEY is required. Please add it to your .env file.\n' +
    'See ENV_TEMPLATE.md or SUPABASE_SETUP.md for setup instructions.'
  );
}

// Admin client (uses service role key - bypasses RLS)
export const supabaseAdmin: SupabaseClient = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Public client (uses anon key)
export const supabase: SupabaseClient = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

