/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/login',
                destination: `${process.env.API_DOMAIN}/login`,
            },
        ]
    }
};

export default nextConfig;
