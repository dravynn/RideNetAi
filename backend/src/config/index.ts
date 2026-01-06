import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env file from backend directory
dotenv.config({ path: resolve(__dirname, '../../.env') });

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY',
];

// Check for missing env vars and provide helpful error messages
const missingVars: string[] = [];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar] || process.env[envVar]?.trim() === '') {
    missingVars.push(envVar);
  }
}

if (missingVars.length > 0) {
  const errorMessage = `
❌ Missing required environment variables:
${missingVars.map(v => `   - ${v}`).join('\n')}

📝 Please create a .env file in the backend/ directory with:
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   SUPABASE_ANON_KEY=your_anon_key

See ENV_TEMPLATE.md or SUPABASE_SETUP.md for details.
  `.trim();
  
  if (config.server.nodeEnv === 'production') {
    throw new Error(errorMessage);
  } else {
    console.error(errorMessage);
    console.warn('⚠️  Server will start but Supabase features will not work until .env is configured.');
  }
}

