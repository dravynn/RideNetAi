/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Environment variables are automatically available in Next.js
  // No need to explicitly list them in env object for NEXT_PUBLIC_ variables
  // Note: 'standalone' output mode is for self-hosting, not Vercel
  // Vercel handles Next.js builds automatically
};

module.exports = nextConfig;

