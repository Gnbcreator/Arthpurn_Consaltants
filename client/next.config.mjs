/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname: "images.unsplash.com",
            },
            {
                protocol:'https',
                hostname:"plus.unsplash.com"
            },
            {
                protocol:'https',
                hostname:"media.istockphoto.com"
            }
        ]
    },
   
};

export default nextConfig;
