/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* domains deprecated in nextjs14, remotePatterns is more secure */
    /* domains: ["lh3.googleusercontent.com"], */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "wgcm16ax0j.ufs.sh",
      },
    ],
  },
};

module.exports = nextConfig;
