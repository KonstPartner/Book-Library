import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'books.google.com',
      },
      {
        protocol: 'https',
        hostname: 'books.google.nl',
      },
      {
        protocol: 'https',
        hostname: 'coverart.oclc.org',
      },
    ],
  },
};

export default nextConfig;
