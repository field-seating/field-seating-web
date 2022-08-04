/** @type {import('next').NextConfig} */
const apiHost = process.env.API_HOST;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  i18n: {
    locales: ['zh-Hant'],
    defaultLocale: 'zh-Hant',
  },
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
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/manifest.json',
        destination: '/api/manifest',
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
