/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
