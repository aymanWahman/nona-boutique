import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
   async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
    ]
  },

  
};

export default nextConfig;
