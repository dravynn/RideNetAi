/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Environment variables are automatically available in Next.js
  // No need to explicitly list them in env object for NEXT_PUBLIC_ variables
  output: 'standalone', // Optimize for production
};

module.exports = nextConfig;

