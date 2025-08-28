/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Desabilita o prerendering para evitar erros de window durante build
  experimental: {
    ppr: false,
  },
}

export default nextConfig
