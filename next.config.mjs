/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.213', '192.168.0.*'],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
