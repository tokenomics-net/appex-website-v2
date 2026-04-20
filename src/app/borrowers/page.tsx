/**
 * app/borrowers/page.tsx
 *
 * Borrowers page  --  8 sections, Server Component assembly.
 * Server Component: no client interactivity at this level.
 * All client islands imported from components/borrowers/*.tsx with "use client" where needed.
 *
 * Section order (borrowers-design.md DRAFT-v1, 2026-04-17):
 *   1. BorrowerHero       (server)  --  scene: r22-hero-home-v2.webp
 *   2. WhatYouGet         (client)  --  3 beats, scroll reveal, texture: r17-texture-calm 20%
 *   3. BorrowerProcess    (client)  --  4-step stepper tabs, texture: r17-texture-rhythm 20%
 *   4. WhyAppex           (server)  --  4-row alternating, texture: r17-texture-grounding 20%
 *   5. ApplockrAnchor     (server)  --  scene: r21-scene-token-apex.png
 *   6. TrustAndRigor      (client)  --  drag-scroll carousel, scene: r23-scene-trust.webp
 *   7. FeeTransparency    (server)  --  recall band, texture: r17-texture-energy 18%
 *   8. BorrowerClosingCTA (server)  --  scene: r21-scene-closing-gate.webp
 *
 * Copy: PRESENT TENSE per decisions.md §2. No em dashes.
 * Sources: borrowers-design.md DRAFT-v1, borrowers-ia.md DRAFT-v1, copy/borrowers.md DRAFT-v1
 */

import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/og";
import { BASE_URL } from "@/lib/site-config";
import { BorrowerHero }       from "@/components/borrowers/BorrowerHero";
import { WhatYouGet }         from "@/components/borrowers/WhatYouGet";
import { BorrowerProcess }    from "@/components/borrowers/BorrowerProcess";
import { WhyAppex }           from "@/components/borrowers/WhyAppex";
import { ApplockrAnchor }     from "@/components/borrowers/ApplockrAnchor";
import { TrustAndRigor }      from "@/components/borrowers/TrustAndRigor";
import { FeeTransparency }    from "@/components/borrowers/FeeTransparency";
import { BorrowerClosingCTA } from "@/components/borrowers/BorrowerClosingCTA";

export const metadata: Metadata = {
  title:       "Draw working capital onchain | appeX Borrowers",
  description: "Credit-reviewed borrowers draw USDC against verified receivables. Fees negotiated once. No ongoing covenants. No rate surprises.",
  alternates: {
    canonical: `${BASE_URL}/borrowers`,
  },
  openGraph: {
    title:       "Draw working capital onchain | appeX Borrowers",
    description: "Credit-reviewed borrowers draw USDC against verified receivables. Fees negotiated once. No ongoing covenants. No rate surprises.",
    type:        "website",
    url:         `${BASE_URL}/borrowers`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "Draw working capital onchain | appeX Borrowers",
    description: "Credit-reviewed borrowers draw USDC against verified receivables. Fees negotiated once. No ongoing covenants. No rate surprises.",
    images:      [`${BASE_URL}/og-default.png`],
  },
};

export default function BorrowersPage(): React.JSX.Element {
  return (
    <>
      <style>{`
        #hero,
        #offer,
        #process,
        #why,
        #anchor,
        #rigor,
        #fee-transparency,
        #cta {
          scroll-margin-top: 72px;
        }
      `}</style>

      <BorrowerHero />
      <WhatYouGet />
      <BorrowerProcess />
      <WhyAppex />
      <ApplockrAnchor />
      <TrustAndRigor />
      <FeeTransparency />
      <BorrowerClosingCTA />
    </>
  );
}
