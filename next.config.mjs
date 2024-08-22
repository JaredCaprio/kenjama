/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
            {
                protocol: 'https',
                hostname: 'images.dog.ceo',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
