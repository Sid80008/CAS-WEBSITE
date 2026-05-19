import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // About → existing about page
      {
        source: "/about",
        destination: "/about/vision-mission",
        permanent: false,
      },
      // Academics → homepage (page not yet built)
      {
        source: "/academics",
        destination: "/",
        permanent: false,
      },
      // Admin catch-all → login (portal not fully built)
      {
        source: "/admin/:path*",
        destination: "/login",
        permanent: false,
      },
      // Alumni → homepage (page not yet built)
      {
        source: "/alumni",
        destination: "/",
        permanent: false,
      },
      // Legal pages → homepage (pages not yet built)
      {
        source: "/privacy",
        destination: "/",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

