import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/REST-Countries-API-with-color-theme-switcher-with-Nextjs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/REST-Countries-API-with-color-theme-switcher-with-Nextjs/' : '',
};

export default nextConfig;
