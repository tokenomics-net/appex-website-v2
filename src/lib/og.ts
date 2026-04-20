/**
 * lib/og.ts
 *
 * Centralized OG image constant. Import OG_IMAGE in every page metadata export.
 * Override the url field per-page for page-specific images:
 *
 *   openGraph: { images: [{ ...OG_IMAGE, url: `${BASE_URL}/og-about.png` }] }
 *
 * Dimensions are fixed at 1200x630 (the universal OG standard).
 * Never hardcode these dimensions in individual page files.
 */

import { BASE_URL, BUSINESS_NAME } from "@/lib/site-config";

export const OG_IMAGE = {
  url: `${BASE_URL}/og-default.png`,
  width: 1200,
  height: 630,
  alt: BUSINESS_NAME,
};
