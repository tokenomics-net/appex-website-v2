/**
 * app/layout.tsx
 *
 * Root layout  --  applies to every route.
 * Loads brand fonts via next/font/local from /public/fonts/.
 * Sources metadata from site-config.ts.
 * Renders SiteHeader + main + SiteFooter.
 *
 * Font files sourced from brand-assets/appex/Fonts/ per DESIGN.md §3:
 *   Tektur    --  display / heading (Tektur-Regular, Medium, SemiBold, Bold)
 *   Hubot Sans  --  body / reading (HubotSans-Regular, Medium, SemiBold, Bold)
 */

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/og";
import {
  BASE_URL,
  BUSINESS_NAME,
  DEFAULT_DESCRIPTION,
  THEME_COLOR,
} from "@/lib/site-config";
import "./globals.css";

// ---- Tektur (display / heading) ----
const tektur = localFont({
  src: [
    { path: "../../public/fonts/tektur/Tektur-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../../public/fonts/tektur/Tektur-Medium.woff2",   weight: "500", style: "normal" },
    { path: "../../public/fonts/tektur/Tektur-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/tektur/Tektur-Bold.woff2",     weight: "700", style: "normal" },
  ],
  variable:    "--font-tektur",
  display:     "swap",
  preload:     true,
  fallback:    ["system-ui", "sans-serif"],
});

// ---- Hubot Sans (body / reading) ----
const hubotSans = localFont({
  src: [
    { path: "../../public/fonts/hubot-sans/HubotSans-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../../public/fonts/hubot-sans/HubotSans-Medium.woff2",   weight: "500", style: "normal" },
    { path: "../../public/fonts/hubot-sans/HubotSans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/hubot-sans/HubotSans-Bold.woff2",     weight: "700", style: "normal" },
  ],
  variable:    "--font-hubot",
  display:     "swap",
  preload:     true,
  fallback:    ["system-ui", "sans-serif"],
});

// ---- Viewport ----

export const viewport: Viewport = {
  width:      "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

// ---- Root metadata ----

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  "appeX Protocol | Onchain Financing Infrastructure",
    template: `%s | appeX Protocol`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         BASE_URL,
    siteName:    BUSINESS_NAME,
    title:       "appeX Protocol | Onchain Financing Infrastructure",
    description: "appeX closes the gap between earned revenue and received cash. LPs deposit USDC and earn from borrower fees. Approved borrowers draw capital from the vault.",
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "appeX Protocol | Onchain Financing Infrastructure",
    description: "appeX closes the gap between earned revenue and received cash. LPs deposit USDC and earn from borrower fees. Approved borrowers draw capital from the vault.",
    images:      [OG_IMAGE.url],
  },
  manifest: "/site.webmanifest",
  robots: {
    index:  true,
    follow: true,
  },
  // NOTE: No site-wide canonical here. Each page sets its own via alternates.canonical
  // in its own metadata export. A root canonical on every page pointed at BASE_URL
  // was signalling all inner pages as homepage duplicates to Google.
};

// ---- Root layout ----

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${tektur.variable} ${hubotSans.variable}`}
    >
      <body>
        {/* Organization + WebSite JSON-LD  --  injected on every page via root layout */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        <SiteHeader />

        <main id="main" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </main>

        <SiteFooter />

        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
