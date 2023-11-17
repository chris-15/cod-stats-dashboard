/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        /* domains deprecated in nextjs14, remotePatterns is more secure */
        /* domains: ["lh3.googleusercontent.com"], */
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            }
        ]
    }
}

module.exports = nextConfig
