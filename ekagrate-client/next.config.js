/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.STRAPI_PRODUCTION_HOST,
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'images.unsplash.com',
      'localhost',
      process.env.STRAPI_PRODUCTION_HOST
    ],
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
