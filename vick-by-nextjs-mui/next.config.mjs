/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/login',
                destination: `${process.env.API_DOMAIN}/login`,
            },
            {
                source: '/logout',
                destination: `${process.env.API_DOMAIN}/logout`,
            },
        ]
    }
};

export default nextConfig;
