/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  devIndicators: {
    appIsrStatus: false, // Disables the "Static" or "Dynamic" indicator
    buildActivity: false, // Disables the "Building..." animation
  },
}

export default nextConfig
