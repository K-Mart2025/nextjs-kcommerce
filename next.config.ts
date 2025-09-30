import type { NextConfig } from 'next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL(apiUrl), {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
      pathname: '/**',
    },],
  },
}

export default nextConfig
