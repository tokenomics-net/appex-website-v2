/**
 * app/about/page.tsx
 *
 * About appeX Protocol  --  full 5-section page.
 * Server Component assembly  --  no client interactivity at this level.
 *
 * Section order (revision-pass-4.md §5, About Checkpoint 1, TONY-APPROVED):
 *   A. AboutHero       (server)  --  scene: r35-scene-about-protocol-rest.png
 *   B. Mission         (server)  --  3 tenets, glass cards
 *   C. Architecture    (server)  --  3 numbered steps
 *   D. Governance      (server)  --  3-phase timeline
 *   E. AuditsContact   (server)  --  audits + inquiry
 *
 * Copy: copy/about.md DRAFT-v1 (TONY-APPROVED). Present tense. Zero em dashes.
 */

import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/og";
import { BASE_URL } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { AboutHero }     from "@/components/about/AboutHero";
import { Mission }       from "@/components/about/Mission";
import { Architecture }  from "@/components/about/Architecture";
import { Governance }    from "@/components/about/Governance";
import { AuditsContact } from "@/components/about/AuditsContact";

export const metadata: Metadata = {
  title:       "About appeX | A protocol, not a company",
  description: "appeX is a decentralized protocol for onchain working capital. Read the mission, the architecture, the governance pathway, and the security posture.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title:       "About appeX | A protocol, not a company",
    description: "appeX is a decentralized protocol for onchain working capital. Read the mission, the architecture, the governance pathway, and the security posture.",
    type:        "website",
    url:         `${BASE_URL}/about`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "About appeX | A protocol, not a company",
    description: "appeX is a decentralized protocol for onchain working capital. Read the mission, the architecture, the governance pathway, and the security posture.",
    images:      [`${BASE_URL}/og-default.png`],
  },
};

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <JsonLd data={webPageSchema({
        title:       "About appeX Protocol",
        description: "A decentralized protocol for onchain working capital. Mission, architecture, governance pathway, and security commitments.",
        url:         `${BASE_URL}/about`,
      })} />

      <style>{`
        #hero,
        #mission,
        #architecture,
        #governance,
        #security {
          scroll-margin-top: 72px;
        }
      `}</style>

      <AboutHero />
      <Mission />
      <Architecture />
      <Governance />
      <AuditsContact />
    </>
  );
}
