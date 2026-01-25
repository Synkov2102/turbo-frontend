import type { NextConfig } from "next";

// Log the API URL at config load time (build time)
console.log("[next.config.ts] NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);

const nextConfig: NextConfig = {
  output: "standalone",
  // Explicitly set the env var so Next.js inlines it
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  },
};

export default nextConfig;
