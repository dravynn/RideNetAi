import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl.trim() === '' || supabaseUrl.includes('your-project')) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL is required. Please create a .env.local file in the frontend/ directory.\n' +
    'See ENV_TEMPLATE.md or SUPABASE_SETUP.md for setup instructions.'
  );
}

if (!supabaseAnonKey || supabaseAnonKey.trim() === '' || supabaseAnonKey.includes('your_anon_key')) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Please add it to your .env.local file.\n' +
    'See ENV_TEMPLATE.md or SUPABASE_SETUP.md for setup instructions.'
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

