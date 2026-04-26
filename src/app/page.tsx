/**
 * app/page.tsx
 *
 * Home page  --  Server Component.
 * Copy source: outputs/appex-website-build/copy/home.md (present tense, r22 rebuild)
 * Design source: outputs/appex-website-build/design/home-design.md (Revision 6 + r22 prompt)
 *
 * Section order (r22 rebuild):
 *   1. Hero              r22-hero-home-v2.webp + r22 token floating right
 *   2. Capital Gap       split-stat on r18-texture-weight (unchanged)
 *   3. Solution          interactive 3-step, Fund step swapped to r81-asset-step-fund-draw-bright
 *   4. ForStakeholders   NEW: merged LPs + Borrowers as interactive two-tab section
 *                        (ForLPsSection + ForBorrowersSection DELETED)
 *   5. AppLockr          hourglass deleted, "Anchor Borrower" eyebrow, expanded copy,
 *                        r67-asset-step-gap-bright + r60-asset-step-bridge-bright replacing prior images
 *   6. Token             5 utility cards with r22-util-* images, "About $APPEX" button
 *   7. ClosingCTA        two-column: "Follow the vault" (socials) + "Apply to borrow" (email)
 */

import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/og";
import { BASE_URL } from "@/lib/site-config";
import { HeroSection }              from "@/components/home/HeroSection";
import { CapitalGapSection }        from "@/components/home/CapitalGapSection";
import { SolutionSection }          from "@/components/home/SolutionSection";
import { ForStakeholdersSection }   from "@/components/home/ForStakeholdersSection";
import { AppLockrSection }          from "@/components/home/AppLockrSection";
import { TokenSection }             from "@/components/home/TokenSection";
import { ClosingCTASection }        from "@/components/home/ClosingCTASection";

export const metadata: Metadata = {
  title:       "Onchain Financing Infrastructure",
  description: "LPs deposit USDC. Approved borrowers draw capital against verified receivables. Fees accrue to NAV per advance. No emissions, no spreads.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title:       "appeX Protocol | Onchain Financing Infrastructure",
    description: "LPs deposit USDC. Approved borrowers draw capital against verified receivables. Fees accrue to NAV per advance. No emissions, no spreads.",
    url:         BASE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "appeX Protocol | Onchain Financing Infrastructure",
    description: "LPs deposit USDC. Approved borrowers draw capital against verified receivables. Fees accrue to NAV per advance. No emissions, no spreads.",
    images:      [OG_IMAGE.url],
  },
};

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <CapitalGapSection />
      <SolutionSection />
      <ForStakeholdersSection />
      <AppLockrSection />
      <TokenSection />
      <ClosingCTASection />
    </>
  );
}
