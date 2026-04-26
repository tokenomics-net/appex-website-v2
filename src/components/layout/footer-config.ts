/**
 * footer-config.ts
 *
 * Pure data  --  no JSX. All footer labels, hrefs, and content consumed
 * by SiteFooter.tsx.
 *
 * Source: outputs/appex-website-build/design/footer-spec.md
 */

import { siteConfig } from "@/lib/site-config";

export interface FooterLink {
  label:    string;
  href:     string;
  external?: boolean;
}

export interface FooterColumn {
  header: string;
  links:  FooterLink[];
}

export interface FooterSocial {
  platform: string;
  href:     string;
  iconKey:  string;
}

export interface FooterConfig {
  brand: {
    wordmarkSrc: string;
    wordmarkAlt: string;
    mission:     string;
    cubeAssetSrc: string;
    socials:     FooterSocial[];
  };
  columns:  FooterColumn[];
  legal: {
    copyright:  string;
    disclaimer: string;
    links:      FooterLink[];
  };
}

export const footerConfig: FooterConfig = {
  brand: {
    wordmarkSrc:  "/brand/appex-wordmark.svg",
    wordmarkAlt:  "appeX Protocol",
    mission:      "Capital that settles the day it is earned.",
    cubeAssetSrc: "/images/r49-asset-footer-mark-cube-bright-transparent.webp",
    socials: [
      { platform: "X",        href: siteConfig.socials.x,       iconKey: "x"        },
      { platform: "LinkedIn", href: siteConfig.socials.linkedin, iconKey: "linkedin" },
    ],
  },
  columns: [
    {
      header: "Product",
      links: [
        { label: "Protocol",       href: "/protocol"          },
        { label: "For LPs",        href: "/lps"               },
        { label: "For Borrowers",  href: "/borrowers"         },
        { label: "$APPEX Token",   href: "/appex"             },
        { label: "Fee structure",  href: "/protocol#fee-curve"     },
        { label: "Risk framework", href: "/protocol#risk-velocity"     },
      ],
    },
    {
      header: "Protocol",
      links: [
        { label: "About",        href: "/about"                               },
        { label: "Blog",         href: "/blog"                                },
        { label: "Contact",      href: `mailto:${siteConfig.supportEmail}`,   external: true },
      ],
    },
    {
      header: "Resources",
      links: [
        { label: "Docs",    href: siteConfig.docs.home,     external: true },
        { label: "FAQ",     href: siteConfig.docs.faq,      external: true },
        { label: "Glossary",href: siteConfig.docs.glossary, external: true },
        { label: "Support", href: `mailto:${siteConfig.supportEmail}`, external: true },
      ],
    },
  ],
  legal: {
    copyright:  "© 2026 appeX Protocol. All rights reserved.",
    disclaimer: "Nothing on this site is investment advice. appeX will launch as onchain financing infrastructure, not a regulated security or investment product.",
    links: [
      { label: "Terms",         href: "/terms"       },
      { label: "Privacy",       href: "/privacy"     },
      { label: "Disclosures",   href: "/disclosures" },
    ],
  },
};
