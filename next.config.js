/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "digimonk.co",
      "localhost",
      "digimonktech.com",
      "unibonus.app",
      "api.unibonus.app",
      "api.webzlab.site",
    ],
  },
};

module.exports = nextConfig;
