/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images:{
        domains: ["images.pexels.com",
                    "res.cloudinary.com"]
    }
}

module.exports = nextConfig
