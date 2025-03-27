/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/djuta2tca/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dttvkmjpd/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
        pathname: '/football/**',
      },
      {
        protocol: "https",
        hostname: "minioapi.swiftsyn.com",
        port: "",
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page/banker',
        permanent: true, 
      },
    ]
  }
};

module.exports = nextConfig;