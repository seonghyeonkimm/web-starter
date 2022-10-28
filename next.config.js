/* eslint-disable @typescript-eslint/no-var-requires */

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  compiler: {
    relay: {
      src: "./src",
      language: "typescript",
      artifactDirectory: "./src/relay/__generated__",
    },
  },
};

module.exports = withVanillaExtract(nextConfig);
