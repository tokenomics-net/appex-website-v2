/**
 * LPsHero.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS keyframe animations only, no hooks or browser APIs.
 *
 * Design source: revision-pass-4.md R2.1
 * Scene: r21-scene-solution-chamber.webp (full-bleed, 100% opacity, LCP candidate)
 * Floating ingot: r33-asset-lp-capital-ingot-transparent.webp (new bespoke)
 * Hero carries NO CTA buttons per R2.1.
 * Background stack:
 *   Layer 0: r21-scene-solution-chamber.webp (object-position: left center)
 *   Layer 1: left-edge gradient  --  copy protection (left 38-42% vestibule)
 *   Layer 2: bottom vignette for CTA stabilization
 *   Layer 3: top hairline (yellow 0.18)
 *   Layer 4: r18-texture-horizon at 8% overlay blend (subliminal horizon atmosphere)
 * Rev 4 Rule: NO glassmorphism card  --  text lives directly on scene (Protocol Rev 4 lesson 2).
 * Text-shadow stack on all non-gradient copy: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3)
 * Copy: copy/lps.md Section 1. Present tense. No em dashes.
 */

import Image from "next/image";

export function LPsHero(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- LP Hero  --  "Capital arrives as light" ---- */
        .lp-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: 720px;
          max-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
        }

        @media (max-width: 767px) {
          .lp-hero {
            aspect-ratio: auto;
            min-height: 100svh;
          }
        }

        /* Mobile: section stacks as a column so the asset renders above the grid */
        @media (max-width: 767px) {
          .lp-hero {
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 96px;
          }
        }

        /* Layer 0: r21-scene-solution-chamber.webp at 100% opacity */
        .lp-hero__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left center;
          pointer-events: none;
          z-index: 0;
          animation: lpHeroScenePulse 22s ease-in-out infinite;
        }

        @media (min-width: 1281px) {
          .lp-hero__scene { object-position: center center; }
        }

        @media (max-width: 767px) {
          .lp-hero__scene {
            object-position: center center;
          }
        }

        /* Right-edge gradient  --  prevents dead-fill on wide viewports */
        .lp-hero__grad-right {
          position: absolute;
          inset: 0;
          background: linear-gradient(270deg, rgba(10,15,31,0.30) 0%, transparent 45%);
          pointer-events: none;
          z-index: 2;
        }

        @keyframes lpHeroScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.03); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-hero__scene { animation: none; }
        }

        /* Layer 4: r18-texture-horizon at 8% subliminal underlayer */
        .lp-hero__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 1;
          opacity: 0.08;
          mix-blend-mode: overlay;
        }

        /* Layer 1: left-edge gradient  --  copy protection zone (left 38-42%) */
        .lp-hero__grad-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.80) 0%,
            rgba(10,15,31,0.50) 32%,
            transparent 62%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 2: bottom vignette for CTA stabilization */
        .lp-hero__grad-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg,
            rgba(10,15,31,0.62) 0%,
            transparent 38%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 3: top hairline */
        .lp-hero__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.18);
          pointer-events: none;
          z-index: 3;
        }

        /* Grid wrapper */
        .lp-hero__grid {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 120px 48px 96px;
          display: flex;
          align-items: center;
        }

        /* Tablet (768-1023px): reduce side padding */
        @media (max-width: 1023px) and (min-width: 768px) { .lp-hero__grid { padding: 120px 32px 80px; } }
        @media (max-width: 767px) {
          .lp-hero__grid {
            padding: 28px 24px 72px;
            flex-direction: column;
            align-items: center;
          }
        }

        /* Copy cluster  --  constrained to gradient-protected left alcove */
        .lp-hero__copy {
          max-width: 620px;
          width: 100%;
        }

        @media (max-width: 767px) {
          .lp-hero__copy {
            max-width: 100%;
            text-align: center;
            order: 2;
          }
        }

        /* Eyebrow */
        .lp-hero__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 0ms both;
        }

        /* H1 */
        .lp-hero__h1 {
          font-family: var(--font-display-family);
          font-size: clamp(56px, 8vw, 96px);
          font-weight: 400;
          line-height: 1.05;
          color: var(--text-primary);
          margin: 0 0 24px 0;
          overflow-wrap: break-word;
        }

        .lp-hero__h1-line {
          display: block;
        }

        .lp-hero__h1-line--plain {
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        /* Gradient line  --  background-clip:text zeroes text-shadow; overlay handles contrast */
        .lp-hero__h1-line--gradient {
          display: inline-block;
          background-image: linear-gradient(
            90deg,
            var(--ax-capital-yellow, #FED607)      0%,
            var(--ax-glint-yellow, #FAF28B)        30%,
            var(--ax-ether-mist, #B9A0CC)          60%,
            var(--ax-node-purple-light, #9B59D5)   80%,
            var(--ax-capital-yellow, #FED607)      100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: axShimmer 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-hero__h1-line--gradient {
            animation: none;
            background-position: 0% 50%;
          }
        }

        /* H1 line stagger fade-up */
        .lp-hero__h1-line:nth-child(1) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 120ms both; }
        .lp-hero__h1-line:nth-child(2) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 240ms both; }
        .lp-hero__h1-line:nth-child(3) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 360ms both; }

        @media (prefers-reduced-motion: reduce) {
          .lp-hero__h1-line {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Subhead */
        .lp-hero__subhead {
          font-family: var(--font-body-family);
          font-size: clamp(15px, 1.8vw, 17px);
          font-weight: 400;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0 0 36px 0;
          max-width: 540px;
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 480ms both;
        }

        @media (max-width: 767px) {
          .lp-hero__subhead { max-width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-hero__subhead { animation: none; opacity: 1; transform: none; }
        }

        /* CTA row */
        .lp-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 600ms both;
        }

        @media (max-width: 767px) {
          .lp-hero__ctas {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-hero__ctas { animation: none; opacity: 1; transform: none; }
        }

        /* Primary CTA  --  yellow bg + glow */
        .lp-hero__cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 14px 32px;
          font-family: var(--font-body-family);
          font-size: 15px;
          font-weight: 700;
          color: var(--ax-fortress, #0A0F1F);
          background: var(--ax-capital-yellow, #FED607);
          border-radius: 999px;
          text-decoration: none;
          transition: box-shadow 250ms ease, transform 200ms ease;
          white-space: nowrap;
        }

        .lp-hero__cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(254,214,7,0.45), 0 4px 16px rgba(254,214,7,0.20);
        }

        .lp-hero__cta-primary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }

        .lp-hero__cta-primary:active { transform: translateY(0); }

        /* Secondary CTA  --  ghost gold pill */
        .lp-hero__cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 14px 28px;
          font-family: var(--font-body-family);
          font-size: 15px;
          font-weight: 600;
          color: var(--ax-capital-yellow, #FED607);
          background: transparent;
          border: 1px solid rgba(254,214,7,0.45);
          border-radius: 999px;
          text-decoration: none;
          transition: border-color 250ms ease, background 250ms ease, transform 200ms ease;
          white-space: nowrap;
        }

        .lp-hero__cta-secondary:hover {
          border-color: rgba(254,214,7,0.80);
          background: rgba(254,214,7,0.06);
          transform: translateY(-1px);
        }

        .lp-hero__cta-secondary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }

        /* Floating LP prism  --  desktop: absolute right side, sits over warm niche cluster */
        .lp-hero__prism {
          position: absolute;
          right: 20%;
          top: 50%;
          width: clamp(360px, 36vw, 540px);
          height: auto;
          z-index: 5;
          pointer-events: none;
          opacity: 1;
          animation:
            lpPrismFloat 5s ease-in-out infinite,
            lpPrismRock  7s ease-in-out infinite;
          filter:
            drop-shadow(0 40px 80px rgba(90,28,203,0.42))
            drop-shadow(0 20px 60px rgba(254,214,7,0.22));
        }

        @keyframes lpPrismFloat {
          0%, 100% { transform: translateY(calc(-50% - 8px)); }
          50%       { transform: translateY(calc(-50% + 8px)); }
        }

        @keyframes lpPrismRock {
          0%, 100% { rotate: -1deg; }
          50%       { rotate:  1deg; }
        }

        @media (max-width: 767px) {
          .lp-hero__prism {
            position: relative;
            right: auto;
            top: auto;
            width: clamp(200px, 58vw, 260px);
            margin: 0 auto 32px;
            display: block;
            order: 1;
            animation:
              lpPrismFloatMobile 5s ease-in-out infinite,
              lpPrismRock        7s ease-in-out infinite;
            filter:
              drop-shadow(0 30px 60px rgba(90,28,203,0.42))
              drop-shadow(0 15px 40px rgba(254,214,7,0.22));
          }

          @keyframes lpPrismFloatMobile {
            0%, 100% { transform: translateY(-8px); }
            50%       { transform: translateY(8px); }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-hero__prism {
            animation: none;
            rotate: 0deg;
            transform: translateY(-50%);
          }
        }

        @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
          .lp-hero__prism { transform: none; }
        }
      `}</style>

      <section className="lp-hero" id="hero" aria-label="For Liquidity Providers">

        {/* Layer 0: r21-scene-solution-chamber.webp  --  library reuse */}
        <Image
          src="/images/r38-scene-lps-hero.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="lp-hero__scene"
          style={{ objectFit: "cover", objectPosition: "left center" }}
        />

        {/* Layer 4: r18-texture-horizon at 8% subliminal underlayer */}
        <Image
          src="/images/r18-texture-horizon.png"
          alt="" aria-hidden="true"
          fill
          sizes="100vw"
          quality={60}
          className="lp-hero__texture"
          style={{ objectFit: "cover" }}
        />

        {/* Gradient protection layers */}
        <div className="lp-hero__grad-left"   aria-hidden="true" />
        <div className="lp-hero__grad-right"  aria-hidden="true" />
        <div className="lp-hero__grad-bottom" aria-hidden="true" />
        <div className="lp-hero__hairline"    aria-hidden="true" />

        {/* Floating LP capital ingot  --  mobile renders inline above copy */}
        <Image
          src="/images/r22-asset-lp-yield-transparent.webp"
          alt="" aria-hidden="true"
          role="presentation"
          width={540}
          height={540}
          quality={85}
          className="lp-hero__prism"
          style={{ objectFit: "contain" }}
          priority
        />

        {/* Grid wrapper */}
        <div className="lp-hero__grid">
          <div className="lp-hero__copy">

            <div className="lp-hero__eyebrow">For Liquidity Providers</div>

            <h1 className="lp-hero__h1">
              <span className="lp-hero__h1-line lp-hero__h1-line--plain">Yield from real borrower fees.</span>
              <span className="lp-hero__h1-line">
                <span className="lp-hero__h1-line--gradient">Paid in USDC.</span>
              </span>
            </h1>

            <p className="lp-hero__subhead">
              USDC in. Borrower fees out. No emissions, no lockup, no hidden spreads. Permissionless from one dollar.
            </p>

          </div>
        </div>

      </section>
    </>
  );
}
