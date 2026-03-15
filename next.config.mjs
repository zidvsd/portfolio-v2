/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false, // Disables the "Static" or "Dynamic" indicator
    buildActivity: false, // Disables the "Building..." animation
  },
}

export default nextConfig
