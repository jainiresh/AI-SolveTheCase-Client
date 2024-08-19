/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname: '*',
            }
        ],
        domains:['ucarecdn.com'],
        loader:'custom'
    },
    output: 'export'
};

export default nextConfig;
