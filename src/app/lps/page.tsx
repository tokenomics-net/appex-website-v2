/**
 * app/lps/page.tsx
 *
 * LPs page  --  7 sections, Server Component assembly.
 * Server Component: no client interactivity at this level.
 * All client islands imported from components/lps/*.tsx with "use client" where needed.
 *
 * Section order (design spec DRAFT-v2, 2026-04-16, approved at Checkpoint 1):
 *   1. LPsHero           (server)  --  scene: r21-scene-solution-chamber.webp, floating prism
 *   2. WhatYouEarn       (client)  --  3 beats, scroll counter, texture: r17-texture-calm 20%
 *   3. HowSafe           (server)  --  4-card 2x2 grid, texture: r17-texture-grounding 20%
 *   4. LPLifecycle       (client)  --  4-step stepper tabs, texture: r17-texture-rhythm 20%
 *   5. LPsProtectionCarousel (client)  --  image-left/copy-right slideshow (r35 redesign), scene: r23-scene-trust
 *   6. StakingTeaser     (server)  --  half-height recall band, texture: r18-texture-horizon 16%
 *   7. LPsClosingCTA     (server)  --  full-bleed scene: r28-scene-lp-horizon-open
 *
 * Copy: PRESENT TENSE per decisions.md §2. No em dashes. No fabricated numbers.
 * Sources: lps-design.md DRAFT-v2, lps-ia.md DRAFT-v1, copy/lps.md
 */

import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/og";
import { BASE_URL } from "@/lib/site-config";
import { LPsHero }         from "@/components/lps/LPsHero";
import { WhatYouEarn }     from "@/components/lps/WhatYouEarn";
import { HowSafe }         from "@/components/lps/HowSafe";
import { LPLifecycle }     from "@/components/lps/LPLifecycle";
// LPsProtectionCarousel removed  --  Pass 5: merged into HowSafe as Card 5.
import { StakingTeaser }   from "@/components/lps/StakingTeaser";
import { LPsClosingCTA }   from "@/components/lps/LPsClosingCTA";

export const metadata: Metadata = {
  title:       "Earn from real borrower fees | appeX LPs",
  description: "Deposit USDC from 1 dollar. Yield comes from fees on credit-reviewed advances, not emissions. NAV grows per advance. Exit any time.",
  alternates: {
    canonical: `${BASE_URL}/lps`,
  },
  openGraph: {
    title:       "Earn from real borrower fees | appeX LPs",
    description: "Deposit USDC from 1 dollar. Yield comes from fees on credit-reviewed advances, not emissions. NAV grows per advance. Exit any time.",
    type:        "website",
    url:         `${BASE_URL}/lps`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "Earn from real borrower fees | appeX LPs",
    description: "Deposit USDC from 1 dollar. Yield comes from fees on credit-reviewed advances, not emissions. NAV grows per advance. Exit any time.",
    images:      [`${BASE_URL}/og-default.png`],
  },
};

export default function LPsPage(): React.JSX.Element {
  return (
    <>
      <style>{`
        #hero,
        #yield,
        #safety,
        #lifecycle,
        #protection,
        #staking-teaser,
        #cta {
          scroll-margin-top: 72px;
        }
      `}</style>

      <LPsHero />
      <WhatYouEarn />
      <HowSafe />
      <LPLifecycle />
      {/* LPsProtectionCarousel removed  --  Pass 5: merged into HowSafe as Card 5. */}
      <StakingTeaser />
      <LPsClosingCTA />
    </>
  );
}
