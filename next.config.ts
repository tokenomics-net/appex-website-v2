import type { NextConfig } from "next";

/**
 * next.config.ts
 *
 * Security headers, image optimization, and caching configuration.
 * Based on appeX + SPW reference implementations.
 *
 * Reference: wiki/standards/website-infrastructure-checklist.md §7, §8, §9
 */

const nextConfig: NextConfig = {
  // ── Image optimization ───────────────────────────────────────────────────────
  // AVIF first for superior compression; WebP as broad fallback.
  // deviceSizes covers mobile through 4K. imageSizes covers thumbnails/icons.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 60, 70, 75, 80, 85, 90],
  },

  // ── Security + caching headers ───────────────────────────────────────────────
  async headers() {
    return [
      // Security headers on every route
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limit referrer information shared cross-origin
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Deny access to sensitive browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Font files: immutable 1-year cache (content-hashed by Next.js)
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Images: 1-day cache with 7-day stale-while-revalidate
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  // /disclosures consolidated into /protocol#risk-velocity per Wave 2 directive.
  async redirects() {
    return [
      {
        source:      "/disclosures",
        destination: "/protocol#risk-velocity",
        permanent:   true,
      },
    ];
  },
};

export default nextConfig;
