/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        "framer-motion",
        "motion",
        "motion-dom",
        "motion-utils",
        "style-value-types",
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '/**',
            },
        ],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    poweredByHeader: false,
    compress: true,
    swcMinify: true,
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['react-icons', 'lucide-react', '@mui/icons-material', 'framer-motion'],
        largePageDataBytes: 128 * 1000,
    },
    headers: async () => [
        {
            source: '/(.*)',
            headers: [
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin',
                },
            ],
        },
        {
            source: '/_next/static/(.*)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ],
        },
        {
            source: '/images/(.*)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=86400',
                },
            ],
        },
    ],
};

export default nextConfig;
