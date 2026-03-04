import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Add this line here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;