import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'jandebelastingman.nl'
    ],
  },
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    localeDetection: false, // We handle this in middleware
  },
};

export default nextConfig;
