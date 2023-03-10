/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { net: false, tls: false, fs: false }

    return config
  },
}

module.exports = nextConfig
