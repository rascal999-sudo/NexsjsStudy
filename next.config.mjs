/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: true, // これを新しく追記してください
  },
};

export default nextConfig;
