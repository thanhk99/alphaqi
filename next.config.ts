import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // API Proxy: Chuyển tiếp các request từ /api/... sang Backend
    // NEXT_PUBLIC_API_URL nên là http://localhost:8001 (dev) hoặc domain (prod)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

    // Đảm bảo destination không bị thừa suffix /api nếu apiUrl đã có sẵn
    const destination = apiUrl.endsWith('/api')
      ? `${apiUrl}/:path*`
      : `${apiUrl}/api/:path*`;

    return [
      {
        source: '/api/:path*',
        destination: destination,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all external image domains
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
