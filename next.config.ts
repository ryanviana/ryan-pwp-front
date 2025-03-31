import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pwpimagesryan.s3.sa-east-1.amazonaws.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "back.pwp.ryanviana.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
