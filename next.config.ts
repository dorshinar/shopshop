import { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mysql2"],
  reactStrictMode: true,
};

export default nextConfig;
