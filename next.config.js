/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  async rewrites() {
    return [
			{
				source: "/api/:path*/",
				destination: "http://localhost:8000/:path*/",
			},
		];
	},
  trailingSlash: true,
  experimental: {
    proxyTimeout: 300000
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
