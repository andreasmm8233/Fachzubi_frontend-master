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
      "azubi.app",
      "api.azubi.app",
      "api.webzlab.site",
    ],
  },
};

module.exports = nextConfig;
