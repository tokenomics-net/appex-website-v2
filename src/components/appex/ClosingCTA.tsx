/**
 * ClosingCTA.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS keyframe animation only, no hooks.
 *
 * Design source: appex-design.md Section 9  --  "the horizon"
 * Background: r21-scene-capital-gap.webp at 100% opacity (library reuse)
 *   Gradient overlay (Option A): top 40% darkened for headline, middle opens, bottom dark for CTA
 *   Bottom horizon-glow: subtle yellow edge lift
 *   Top hairline: rgba(254,214,7,0.2)
 * Layout: single centered column, max-width 680px. NO glass card (Option A).
 * Text-shadow stack on non-gradient copy per Rev 4 lesson 1.
 * Primary CTA: mailto:support@appex.finance (yellow bg + glow)
 * Secondary: X + LinkedIn social icons
 * Scene brightness pulse 30s per spec.
 * Copy: appex.md Section 9. Present tense. No em dashes.
 */

import Image from "next/image";
import Link  from "next/link";
import { siteConfig } from "@/lib/site-config";

export function ClosingCTA(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Closing CTA  --  "the horizon" ---- */
        .closing-cta {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 96px 0;
          display: flex;
          align-items: center;
          min-height: 480px;
        }

        /* Layer 0: r21-scene-capital-gap at 100% */
        .closing-cta__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
          pointer-events: none;
          z-index: 0;
          animation: ctaScenePulse 30s ease-in-out infinite;
        }

        @keyframes ctaScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.02); }
        }

        @media (prefers-reduced-motion: reduce) {
          .closing-cta__scene { animation: none; }
        }

        /* Layer 1: gradient overlay (Option A)  --  top dark, middle open, bottom dark */
        .closing-cta__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.72) 0%,
            rgba(10,15,31,0.45) 45%,
            rgba(10,15,31,0.80) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: bottom horizon-glow */
        .closing-cta__horizon-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg,
            rgba(254,214,7,0.08) 0%,
            transparent 25%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: top hairline */
        .closing-cta__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.20);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper: single centered column */
        .closing-cta__content {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @media (max-width: 1023px) { .closing-cta__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .closing-cta__content { padding: 0 24px; } }

        /* Copy cluster  --  max-width 680px per spec */
        .closing-cta__copy {
          max-width: 680px;
        }

        .closing-cta__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .closing-cta__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 20px 0;
          /* gradient on full phrase; overlay gradient handles contrast (no text-shadow on bg-clip) */
        }

        .closing-cta__subhead {
          font-family: var(--font-body-family);
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.6;
          color: var(--text-primary);
          max-width: 540px;
          margin: 0 0 40px 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
        }

        /* Primary CTA */
        .closing-cta__btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 16px 36px;
          font-family: var(--font-body-family);
          font-size: 15px;
          font-weight: 700;
          color: var(--ax-fortress, #0A0F1F);
          background: var(--ax-capital-yellow, #FED607);
          border-radius: 999px;
          text-decoration: none;
          transition: box-shadow 250ms ease, transform 200ms ease;
          box-shadow: 0 0 0 0 rgba(254,214,7,0);
          margin-bottom: 0;
        }

        .closing-cta__btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(254,214,7,0.45), 0 4px 16px rgba(254,214,7,0.20);
        }

        .closing-cta__btn-primary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        @media (max-width: 767px) {
          .closing-cta__btn-primary {
            width: 100%;
            max-width: 360px;
          }
        }

        /* Social icons removed  --  footer is the sole social surface */
      `}</style>

      <section className="closing-cta" id="cta" aria-labelledby="closing-cta-heading">

        {/* Scene */}
        <Image
          src="/images/r21-scene-capital-gap.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          sizes="100vw"
          quality={85}
          className="closing-cta__scene"
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
          loading="lazy"
        />

        <div className="closing-cta__overlay"      aria-hidden="true" />
        <div className="closing-cta__horizon-glow" aria-hidden="true" />
        <div className="closing-cta__hairline"      aria-hidden="true" />

        <div className="closing-cta__content">
          <div className="closing-cta__copy">

            <div className="closing-cta__eyebrow">Next step</div>

            <h2 id="closing-cta-heading" className="closing-cta__h2">
              <span className="text-gold-gradient">Launch is forthcoming.</span>
            </h2>

            <p className="closing-cta__subhead">
              The protocol goes live when the vaults do. Reach out if you have questions. Follow for everything that happens between now and then.
            </p>

            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="closing-cta__btn-primary"
            >
              Contact
            </a>

          </div>
        </div>

      </section>
    </>
  );
}
