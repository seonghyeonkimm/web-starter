/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins");

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withPlugins([[createVanillaExtractPlugin()]], nextConfig);
