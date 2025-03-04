import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'jandebelastingman.nl'
    ],
  },
  async redirects() {
    return [
      {
        source: '/besloten-vennootschap',
        destination: '/onderwerpen/besloten-vennootschap',
        permanent: true,
      },
      {
        source: '/en/private-limited-companies',
        destination: '/topics/private-limited-company',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
