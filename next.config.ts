import type { NextConfig } from "next";

// Log the API URL at config load time (build time) for debugging
console.log("[next.config.ts] NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

const nextConfig: NextConfig = {
  output: "standalone",
  // Note: NEXT_PUBLIC_* variables are automatically inlined by Next.js at build time
  // They must be available as environment variables during the build process
  // No need to use the 'env' object - Next.js handles this automatically
};

export default nextConfig;
