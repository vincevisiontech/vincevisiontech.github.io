import type { NextConfig } from "next";

/**
 * Build modes
 * -----------
 * `next build`                → full app (Vercel/Node), includes /api/chat
 * `npm run build:static`      → static export (GitHub Pages / any static host),
 *                               the API route is temporarily moved aside by
 *                               scripts/build-static.mjs and the chat widget
 *                               gracefully falls back to email/WhatsApp.
 */
const isStaticExport = process.env.BUILD_STATIC === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  trailingSlash: isStaticExport ? true : false,
  images: {
    // Required for static export; harmless in the Node build
    unoptimized: true,
    // Documents the CEO portrait hotlink; only consulted if image
    // optimization is ever re-enabled (unoptimized bypasses it today).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/dms/image/**",
      },
    ],
  },
  // Set NEXT_PUBLIC_BASE_PATH only when deploying to a project page (e.g. *.github.io/<repo>).
  // The vincevisiontech.github.io user site is served from the root, so the default is "".
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
