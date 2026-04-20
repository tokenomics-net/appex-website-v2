/**
 * BorrowerClosingCTA.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS animation only, no hooks.
 *
 * Design source: borrowers-design.md Section 8  --  "Closing CTA"
 * Scene: r21-scene-closing-gate.webp at 100% opacity (library reuse).
 * Layout: single centered column, max-width 680px. NO glass card.
 * NO social icons  --  matches /appex and /lps closing-band pattern.
 *   Note: borrowers-design.md AD note indicates socials are an optional pick per IA.
 *   Per task brief override: NO social icons (matches $APPEX + LPs pattern).
 * Text-shadow stack on non-gradient copy per Rev 4 lesson 1.
 * Soft elliptical radial pedestal behind copy cluster (same fix as LPsClosingCTA).
 * Slow 30s brightness pulse on scene. Reduced-motion: pins.
 * Copy: copy/borrowers.md Section 8. Present tense. No em dashes.
 */

import Image from "next/image";

export function BorrowerClosingCTA(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Borrower Closing CTA  --  "Step across the threshold" ---- */
        .bor-cta {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 96px 0;
          display: flex;
          align-items: center;
          min-height: 560px;
        }

        /* Layer 0: r21-scene-closing-gate at 100% */
        .bor-cta__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 55%;
          pointer-events: none;
          z-index: 0;
          animation: borCtaScenePulse 30s ease-in-out infinite;
        }

        @keyframes borCtaScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.02); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bor-cta__scene { animation: none; }
        }

        /* Layer 1: gradient overlay (Option A)  --  top dark, middle open, bottom dark */
        .bor-cta__overlay {
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

        /* Layer 2: bottom horizon-glow (slightly warmer than LPs close) */
        .bor-cta__horizon-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg,
            rgba(254,214,7,0.10) 0%,
            transparent 25%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: top hairline */
        .bor-cta__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.20);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper: single centered column */
        .bor-cta__content {
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

        @media (max-width: 1023px) { .bor-cta__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .bor-cta__content { padding: 0 24px; } }

        /* Copy frame with soft elliptical pedestal */
        .bor-cta__copy {
          position: relative;
          max-width: 680px;
          padding: 56px 48px;
          isolation: isolate;
        }

        .bor-cta__copy::before {
          content: '';
          position: absolute;
          inset: -60px -80px;
          background: radial-gradient(ellipse 760px 440px at 50% 50%,
            rgba(10,15,31,0.35) 0%,
            rgba(10,15,31,0.20) 45%,
            transparent 80%
          );
          pointer-events: none;
          z-index: -1;
          /* NO border-radius  --  gradient falloff is the shape, not a pill clip */
        }

        @media (max-width: 767px) {
          .bor-cta__copy::before { display: none; }
          .bor-cta__copy { padding: 32px 0; }
        }

        .bor-cta__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 14px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .bor-cta__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 20px 0;
        }

        .bor-cta__h2-plain {
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .bor-cta__subhead {
          font-family: var(--font-body-family);
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.6;
          color: var(--text-primary);
          max-width: 540px;
          margin: 0 0 40px 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
        }

        /* Primary CTA  --  yellow bg + glow */
        .bor-cta__btn {
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
          transition: box-shadow 300ms ease, transform 200ms ease;
        }

        .bor-cta__btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 32px rgba(254,214,7,0.50), 0 4px 16px rgba(254,214,7,0.22);
        }

        .bor-cta__btn:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }

        .bor-cta__btn:active { transform: translateY(0); }

        @media (max-width: 767px) {
          .bor-cta__btn {
            width: 100%;
            max-width: 360px;
          }
        }

        /* Social icons: REMOVED per task brief override.
           Footer is the sole social surface site-wide.
           Matches /appex Section 9 and /lps Section 7 pattern. */
      `}</style>

      <section
        className="bor-cta"
        id="cta"
        aria-labelledby="bor-cta-heading"
      >
        {/* Scene */}
        <Image
          src="/images/r21-scene-closing-gate.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          sizes="100vw"
          quality={85}
          className="bor-cta__scene"
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
          loading="lazy"
        />

        <div className="bor-cta__overlay"       aria-hidden="true" />
        <div className="bor-cta__horizon-glow"  aria-hidden="true" />
        <div className="bor-cta__hairline"       aria-hidden="true" />

        <div className="bor-cta__content">
          <div className="bor-cta__copy">

            <div className="bor-cta__eyebrow">Apply</div>

            <h2 id="bor-cta-heading" className="bor-cta__h2">
              <span className="bor-cta__h2-plain">Step across </span>
              <span className="text-gold-gradient">the threshold.</span>
            </h2>

            <p className="bor-cta__subhead">
              Contact the protocol to start structured evaluation, and be ready the day the vault opens.
            </p>

            <a
              href="mailto:support@appex.finance"
              className="bor-cta__btn"
              aria-label="Apply for an advance"
            >
              Apply for an advance
            </a>

          </div>
        </div>
      </section>
    </>
  );
}
