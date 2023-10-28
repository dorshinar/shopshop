/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mysql2"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
