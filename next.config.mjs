/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        images: {
            domains: ['images.pexels.com', 'png.pngtree.com', 'localhost', 'backend-pc-production-e77d.up.railway.app'],
        },
        remotePatterns: [
            {
                protocol : 'https',
                hostname : 'images.pexels.com',
            },
            {
                protocol : 'https',
                hostname : 'png.pngtree.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost'
            }
        ],
    },
};

export default nextConfig;
