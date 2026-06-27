import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        // port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
