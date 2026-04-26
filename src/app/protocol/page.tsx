/**
 * app/protocol/page.tsx
 *
 * Protocol page  --  Rev 3 composition + Fix 4 ($APPEX utility section).
 * Server Component: this file is a server component; all client islands
 *   are imported from components/protocol/*.tsx with "use client" where needed.
 *
 * Section order (Rev 3 + Fix 4):
 *   1. ProtocolHero           (server)  --  scene: r23-protocol-hero.png
 *   2. ProtocolSteps          (client)  --  stepper tabs, scene: r21-scene-solution-chamber.png
 *   3. CapitalFlowSection     (server)  --  capital routing, r23-flow-capital.png
 *   4. FeeCurveSection        (client)  --  4 glass cards + ascending SVG curve
 *   5. AppexUtilitySection    (server)  --  $APPEX in the vault
 *   6. RiskCarousel           (client)  --  horizontal carousel
 *   7. ProtocolCTA            (server)  --  closing CTA
 */

import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/og";
import { BASE_URL } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema, faqSchema } from "@/lib/schema";
import { faqs } from "@/data/faqs";
import { ProtocolHero }         from "@/components/protocol/ProtocolHero";
import { ProtocolSteps }        from "@/components/protocol/ProtocolSteps";
import { CapitalFlowSection }   from "@/components/protocol/CapitalFlowSection";
import { FeeCurveSection }      from "@/components/protocol/FeeCurveSection";
import { AppexUtilitySection }  from "@/components/protocol/AppexUtilitySection";
import { RiskCarousel }         from "@/components/protocol/RiskCarousel";
import { ProtocolCTA }          from "@/components/protocol/ProtocolCTA";

export const metadata: Metadata = {
  title:       "How the appeX vault works",
  description: "Three steps: LPs deposit USDC, approved borrowers draw, fees accrue to NAV. Origination fees are one-time. No variable rates.",
  alternates: {
    canonical: `${BASE_URL}/protocol`,
  },
  openGraph: {
    title:       "How the appeX vault works | appeX Protocol",
    description: "Three steps: LPs deposit USDC, approved borrowers draw, fees accrue to NAV. Origination fees are one-time. No variable rates.",
    type:        "website",
    url:         `${BASE_URL}/protocol`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "How the appeX vault works | appeX Protocol",
    description: "Three steps: LPs deposit USDC, approved borrowers draw, fees accrue to NAV. Origination fees are one-time. No variable rates.",
    images:      [OG_IMAGE.url],
  },
};

export default function ProtocolPage() {
  return (
    <>
      {/* WebPage + FAQPage JSON-LD  --  structured data for AI citability */}
      <JsonLd data={webPageSchema({
        title:       "How the appeX Vault Works",
        description: "Three steps, one vault. LPs deposit USDC. Borrowers draw against verified revenue. Fees accrue to NAV per advance.",
        url:         `${BASE_URL}/protocol`,
      })} />
      <JsonLd data={faqSchema(faqs)} />

      {/* scroll-margin-top: global nav only, no sub-nav */}
      <style>{`
        #three-steps,
        #capital-flow,
        #fee-curve,
        #appex-utility,
        #risk-velocity,
        #faq {
          scroll-margin-top: 72px;
        }
      `}</style>

      <ProtocolHero />
      <ProtocolSteps />
      <CapitalFlowSection />
      <FeeCurveSection />
      <AppexUtilitySection />
      <RiskCarousel />
      <ProtocolCTA />
    </>
  );
}
