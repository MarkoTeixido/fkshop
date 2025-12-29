/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Optimize CSS delivery
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['react-icons', 'framer-motion'],
    },

    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },

    // Modern JavaScript output (reduce polyfills)
    swcMinify: true,

    // Production optimizations
    productionBrowserSourceMaps: false,

    // Headers for resource hints
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Link',
                        value: '<https://res.cloudinary.com>; rel=preconnect; crossorigin'
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
