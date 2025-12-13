import { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Your Next.js configuration options go here
  // For example:
  // reactStrictMode: true,
  // swcMinify: true,
  // images: {
  //   domains: ['example.com'],

  
  // },
};

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Export the combined configuration
export default bundleAnalyzerConfig(nextConfig);
