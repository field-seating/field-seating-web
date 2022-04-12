/** @type {import('next').NextConfig} */
const apiHost = process.env.API_HOST;

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {},

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

module.exports = nextConfig;
