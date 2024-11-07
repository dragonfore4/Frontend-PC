/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'png.pngtree.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost'
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_BACKEND_DOMAIN
            }
        ],
    },
};

export default nextConfig;
