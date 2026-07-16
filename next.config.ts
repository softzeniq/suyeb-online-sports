import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "steadfast.com.bd",
      },
      {
        protocol: "https",
        hostname: "iqrzobjdevbhhmvsvted.supabase.co",
      },
    ],
  },
};

export default nextConfig;
