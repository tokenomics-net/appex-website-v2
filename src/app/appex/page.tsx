/**
 * app/appex/page.tsx
 *
 * $APPEX Token page  --  9 sections, Server Component assembly.
 * Server Component: no client interactivity at this level.
 * All client islands imported from components/appex/*.tsx with "use client" where needed.
 *
 * Section order (design spec APPROVED-v2, 2026-04-16):
 *   1. TokenHero             (server)  --  scene: r24-scene-token-enthroned.png, floating token
 *   2. FiveUtilitiesCarousel (client)  --  drag-scroll carousel
 *   3. StakingMechanics      (server)  --  scene + glass panel
 *   4. SupplyDistribution    (client)  --  hand-built SVG donut
 *   5. VestingTimeline       (client)  --  hand-built SVG timeline
 *   6. FeeFlowRecall         (server)  --  no-texture breather band
 *   7. GovernanceSurface     (server)  --  scene + glass panel
 *   8. EcosystemCrosslinks   (server)  --  3 glass cross-link cards
 *   9. ClosingCTA            (server)  --  closing scene
 *
 * Copy: PRESENT TENSE per decisions.md §2. No em dashes. No fabricated numbers.
 * Sources: appex-design.md APPROVED-v2, appex-ia.md APPROVED-v2, copy/appex.md
 */

import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/og";
import { BASE_URL } from "@/lib/site-config";
import { TokenHero }             from "@/components/appex/TokenHero";
import { FiveUtilitiesCarousel } from "@/components/appex/FiveUtilitiesCarousel";
import { StakingMechanics }      from "@/components/appex/StakingMechanics";
import { SupplyDistribution }    from "@/components/appex/SupplyDistribution";
import { VestingTimeline }       from "@/components/appex/VestingTimeline";
import { FeeFlowRecall }         from "@/components/appex/FeeFlowRecall";
import { GovernanceSurface }     from "@/components/appex/GovernanceSurface";
import { EcosystemCrosslinks }   from "@/components/appex/EcosystemCrosslinks";
import { ClosingCTA }            from "@/components/appex/ClosingCTA";

export const metadata: Metadata = {
  title:       "$APPEX | Fixed Supply, Real Utility",
  description: "1,000,000,000 supply. No minting. No emissions. Pay fees in $APPEX for a 25% discount. Stake for rewards. Vote on protocol changes.",
  alternates: {
    canonical: `${BASE_URL}/appex`,
  },
  openGraph: {
    title:       "$APPEX | Fixed Supply, Real Utility",
    description: "1,000,000,000 supply. No minting. No emissions. Pay fees in $APPEX for a 25% discount. Stake for rewards. Vote on protocol changes.",
    type:        "website",
    url:         `${BASE_URL}/appex`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "$APPEX | Fixed Supply, Real Utility",
    description: "1,000,000,000 supply. No minting. No emissions. Pay fees in $APPEX for a 25% discount. Stake for rewards. Vote on protocol changes.",
    images:      [`${BASE_URL}/og-default.png`],
  },
};

export default function AppexPage(): React.JSX.Element {
  return (
    <>
      <style>{`
        #hero,
        #utilities,
        #staking,
        #distribution,
        #vesting,
        #fee-flow,
        #governance,
        #ecosystem,
        #cta {
          scroll-margin-top: 72px;
        }
      `}</style>

      <TokenHero />
      <FiveUtilitiesCarousel />
      <StakingMechanics />
      <SupplyDistribution />
      <VestingTimeline />
      <FeeFlowRecall />
      <GovernanceSurface />
      <EcosystemCrosslinks />
      <ClosingCTA />
    </>
  );
}
