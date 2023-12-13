/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    minimumCacheTTL: 60,
  },
  output: "export",
};

module.exports = nextConfig;
