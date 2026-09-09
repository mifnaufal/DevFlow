/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@devflow/ui', '@devflow/database', '@devflow/auth', '@devflow/api'],
};

module.exports = nextConfig;
