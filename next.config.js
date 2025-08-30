/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is enabled by default in Next.js 15
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable experimental optimizeCss to avoid critters module issue
  experimental: {
    // optimizeCss: true, // Disabled to fix build issue
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  // Enable static optimization
  trailingSlash: false,
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
