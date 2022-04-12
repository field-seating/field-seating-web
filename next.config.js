/** @type {import('next').NextConfig} */
const apiHost = process.env.API_HOST;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {},
  experimental: {
    modularizeImports: {
      ramda: {
        transform: 'ramda/{{member}}',
      },
    },
  },

  async rewrites() {
    return [
      // Proxy to Backend
      {
        source: '/api/:path*',
        destination: `${apiHost}/api/:path*`,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
