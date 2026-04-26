/**
 * PostCTA.tsx
 *
 * Server Component  --  static, category-routed CTA block.
 * Justification: no client interactivity; all routing is build-time derived.
 *
 * Design source: blog-design.md §S5 CTA block (category-routed)
 * Copy source: copy/blog.md §Category-default CTA variants
 */

import Image from "next/image";
import Link from "next/link";
import type { PostFrontmatter } from "@/lib/blog/posts";
import type React from "react";

interface PostCTAProps {
  frontmatter: PostFrontmatter;
}

interface CTAVariant {
  eyebrow: string;
  message: string;
  ctaLabel: string;
  ctaRoute: string;
  secondaryLabel?: string;
  secondaryRoute?: string;
}

const CTA_MAP: Record<string, CTAVariant> = {
  lps: {
    eyebrow: "Become an LP",
    message: "The LPs page covers yield sources, four structural protections, and the path to deposit.",
    ctaLabel: "See how LPs earn",
    ctaRoute: "/lps",
    secondaryLabel: "Contact to deposit",
    secondaryRoute: "mailto:support@appex.finance",
  },
  borrowers: {
    eyebrow: "Draw against earned revenue",
    message: "The borrowers page lays out the facility structure, the four-step lifecycle, and the application path.",
    ctaLabel: "Apply for an advance",
    ctaRoute: "/borrowers",
    secondaryLabel: "Contact the protocol",
    secondaryRoute: "mailto:support@appex.finance",
  },
  protocol: {
    eyebrow: "Read the mechanism",
    message: "The protocol page walks the full capital cycle, fee curve, and vault architecture in one scroll.",
    ctaLabel: "See how the protocol works",
    ctaRoute: "/protocol",
    secondaryLabel: "Explore the token",
    secondaryRoute: "/appex",
  },
  markets: {
    eyebrow: "Read for LPs",
    message: "Market writing points at receivables-financing structure. The LPs page translates it into deposit mechanics.",
    ctaLabel: "See how LPs earn",
    ctaRoute: "/lps",
  },
  security: {
    eyebrow: "Architecture and safeguards",
    message: "The protocol architecture section documents the vault, the deployment stack, and the audit and multi-sig posture.",
    ctaLabel: "See the architecture",
    ctaRoute: "/protocol#architecture",
  },
  governance: {
    eyebrow: "Steer the protocol",
    message: "$APPEX stakers vote on parameters, vault launches, and fee curves. The governance section covers scope.",
    ctaLabel: "See governance scope",
    ctaRoute: "/appex#governance",
    secondaryLabel: "Read the protocol",
    secondaryRoute: "/protocol",
  },
};

export function PostCTA({ frontmatter }: PostCTAProps): React.JSX.Element {
  // Use frontmatter overrides if provided, else category default
  const defaults = CTA_MAP[frontmatter.category] ?? CTA_MAP.protocol;
  const ctaRoute = frontmatter.ctaRoute ?? defaults.ctaRoute;
  const ctaLabel = frontmatter.ctaLabel ?? defaults.ctaLabel;

  const variant: CTAVariant = {
    ...defaults,
    ctaRoute,
    ctaLabel,
  };

  const isMailto = ctaRoute.startsWith("mailto:");
  const isSecondaryMailto = variant.secondaryRoute?.startsWith("mailto:");

  return (
    <>
      <style>{`
        /* ── Post CTA block ─────────────────────────────────────────── */
        .post-cta {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 96px 48px;
        }
        @media (max-width: 767px) {
          .post-cta { padding: 64px 24px; }
        }

        .post-cta__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.16;
        }

        .post-cta__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 1200px 300px at 50% 80%, rgba(254,214,7,0.10) 0%, transparent 70%),
            linear-gradient(180deg, rgba(10,15,31,0.92) 0%, rgba(10,15,31,0.82) 50%, rgba(10,15,31,0.96) 100%);
        }

        .post-cta__inner {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }

        .post-cta__eyebrow {
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 20px;
        }

        .post-cta__message {
          font-family: var(--font-display-family, system-ui);
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 400;
          line-height: 1.25;
          color: rgba(255,255,255,0.92);
          margin-bottom: 36px;
        }

        .post-cta__btn-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .post-cta__primary {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 14px 28px;
          border-radius: 9999px;
          background: var(--ax-capital-yellow, #FED607);
          color: #0A0F1F;
          text-decoration: none;
          transition: opacity 180ms ease-out, transform 180ms ease-out;
        }
        .post-cta__primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .post-cta__primary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .post-cta__secondary {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 14px 28px;
          border-radius: 9999px;
          border: 1px solid rgba(254,214,7,0.35);
          color: var(--ax-capital-yellow, #FED607);
          text-decoration: none;
          transition: border-color 180ms ease-out, background 180ms ease-out;
        }
        .post-cta__secondary:hover {
          border-color: var(--ax-capital-yellow, #FED607);
          background: rgba(254,214,7,0.08);
        }
        .post-cta__secondary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .post-cta__primary, .post-cta__secondary { transition: none; }
        }
      `}</style>

      <section id="cta" className="post-cta">
        <Image
          src="/images/r18-texture-horizon.webp"
          alt="" aria-hidden="true"
          fill
          className="post-cta__texture"
        />
        <div className="post-cta__overlay" aria-hidden="true" />

        <div className="post-cta__inner">
          <p className="post-cta__eyebrow">{variant.eyebrow}</p>
          <p className="post-cta__message">{variant.message}</p>

          <div className="post-cta__btn-row">
            {isMailto ? (
              <a
                href={ctaRoute}
                className="post-cta__primary"
                aria-label={`${ctaLabel}  --  email support at appex dot finance`}
              >
                {ctaLabel}
              </a>
            ) : (
              <Link href={ctaRoute} className="post-cta__primary">
                {ctaLabel}
              </Link>
            )}

            {variant.secondaryLabel && variant.secondaryRoute && (
              isSecondaryMailto ? (
                <a
                  href={variant.secondaryRoute}
                  className="post-cta__secondary"
                  aria-label={`${variant.secondaryLabel}  --  email support at appex dot finance`}
                >
                  {variant.secondaryLabel}
                </a>
              ) : (
                <Link href={variant.secondaryRoute} className="post-cta__secondary">
                  {variant.secondaryLabel}
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
