/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  images: {
    domains: ['loremflickr.com', 'ctickets.app'],
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
