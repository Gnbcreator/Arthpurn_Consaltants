/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "images.unsplash.com",
            },
            {
                protocol: 'https',
                hostname: "plus.unsplash.com"
            },
            {
                protocol: 'https',
                hostname: "media.istockphoto.com"
            },
            {
                protocol: 'https',
                hostname: "i.pravatar.cc"
            },
            {
                protocol: 'https',
                hostname: "images.pexels.com"
            },
            {
                protocol: 'https',
                hostname: "media.giphy.com"
            },
            {
                protocol: 'https',
                hostname: "img.youtube.com"
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'www.youtube.com'
            }
        ]
    },

};

export default nextConfig;
