import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/leetcode/:path*',
        destination: 'https://alfa-leetcode-api.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
