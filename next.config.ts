import type { NextConfig } from "next";

/**
 * next.config.ts
 *
 * Security headers, image optimization, and caching configuration.
 * Based on appeX + SPW reference implementations.
 *
 * Reference: wiki/standards/website-infrastructure-checklist.md §7, §8, §9
 *
 * Security header audit: 2026-04-25
 * Audit report: outputs/appex-asset-harmonization/security-headers-audit.md
 *
 * CSP is deployed as Content-Security-Policy (enforced).
 * Flipped from Report-Only on 2026-04-25 after static-analysis audit confirmed
 * zero gaps. Audit report: outputs/appex-asset-harmonization/security-headers-audit.md
 */

// ── CSP policy ────────────────────────────────────────────────────────────────
// Fonts: self-hosted via next/font/local -- no fonts.googleapis.com needed.
// Scripts: GTM loader + inline ga-init block in layout.tsx require
//   'unsafe-inline' on script-src. A nonce-based CSP would eliminate this
//   but requires middleware rewrite -- deferred pending Tony approval.
// Dev mode also needs 'unsafe-eval' because React in development uses eval()
//   for callstack reconstruction and HMR. Production React never uses eval(),
//   so 'unsafe-eval' is added only when NODE_ENV !== 'production'.
// Third-party domains confirmed by code audit 2026-04-25:
//   www.googletagmanager.com  -- GA4 script loader (layout.tsx:128)
//   www.google-analytics.com  -- GA4 beacon endpoint
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`;
const CSP = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

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
          // ── Content Security Policy (Enforced) ────────────────────────────
          // Flipped from Report-Only to enforcement 2026-04-25. Static-analysis
          // audit confirmed zero gaps: fonts self-hosted, GA4 covered, no
          // external CDNs, no Three.js, no web workers. Tony approved the flip.
          {
            key: "Content-Security-Policy",
            value: CSP,
          },
          // ── HTTPS enforcement ──────────────────────────────────────────────
          // 2-year max-age with includeSubDomains. "preload" intentionally
          // omitted -- opt into the browser preload list via hstspreload.org
          // after 60-90 days of confirmed subdomain HTTPS readiness.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          // ── Clickjacking ───────────────────────────────────────────────────
          { key: "X-Frame-Options", value: "DENY" },
          // ── MIME sniffing ──────────────────────────────────────────────────
          { key: "X-Content-Type-Options", value: "nosniff" },
          // ── Referrer privacy ───────────────────────────────────────────────
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // ── Browser feature gating ─────────────────────────────────────────
          // Extended from original (camera, mic, geo) to include usb, midi,
          // payment per OWASP baseline.
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), usb=(), midi=(), payment=()",
          },
          // ── Cross-origin isolation (Spectre mitigation) ────────────────────
          // same-origin prevents window handles leaking across origins.
          // Note: COEP (require-corp) intentionally omitted -- see audit report.
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          // ── Resource isolation ─────────────────────────────────────────────
          // Prevents other origins from embedding this site's resources
          // (images, fonts, scripts) without explicit opt-in.
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          // ── DNS prefetch ───────────────────────────────────────────────────
          // "on" lets the browser resolve DNS for linked domains proactively.
          // Low risk, small perf benefit for external links in content.
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // ── Legacy XSS filter ──────────────────────────────────────────────
          // Modern browsers ignore this header. Setting 0 explicitly disables
          // the old IE/Chrome XSS auditor, which could itself be exploited.
          {
            key: "X-XSS-Protection",
            value: "0",
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
};

export default nextConfig;
