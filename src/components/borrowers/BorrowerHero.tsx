/**
 * BorrowerHero.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS keyframe animations only, no hooks or browser APIs.
 *
 * Design source: borrowers-design.md Section 1  --  "Draw Chamber"
 * Scene: r22-hero-home-v2.webp (full-bleed, 100% opacity, LCP candidate)
 *   Library reuse  --  approved home hero. Consistent hero language across product.
 *   Left 38-42% is a dark architectural vestibule (copy zone). Right: archway + floor channel.
 * Floating facility-monolith: r33-asset-borrower-facility-monolith-transparent.webp (new bespoke per R1.1-B)
 *   Animation: translateY 8px / 5s + rock 1deg / 7s. NO spin. NO opacity animation.
 *   opacity: 1 always. right: 16% so key-ingot sits over the archway threshold.
 * Background stack:
 *   Layer 0: r22-hero-home-v2.webp (object-position: left center)
 *   Layer 1: r18-texture-horizon at 8% overlay blend (subliminal horizon underlayer)
 *   Layer 2: left-edge gradient  --  copy protection (left 38-42%)
 *   Layer 3: bottom vignette for CTA stabilization
 *   Layer 4: top hairline (yellow 0.18)
 * Rev 4 Rule: NO glassmorphism card  --  text lives directly on scene (Protocol Rev 4 lesson 2).
 * Text-shadow stack on all non-gradient copy: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3)
 * Copy: copy/borrowers.md Section 1. Present tense. No em dashes.
 */

import Image from "next/image";
import Link  from "next/link";

export function BorrowerHero(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Borrower Hero  --  "Draw against revenue you have already earned" ---- */
        .bor-hero {
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
          .bor-hero {
            aspect-ratio: auto;
            min-height: 100svh;
          }
        }

        /* Mobile: section stacks as a column so the asset renders above the grid */
        @media (max-width: 767px) {
          .bor-hero {
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 96px;
          }
        }

        /* Layer 0: r22-hero-home-v2.webp at 100% opacity */
        .bor-hero__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left center;
          pointer-events: none;
          z-index: 0;
          animation: borHeroScenePulse 22s ease-in-out infinite;
        }

        @media (max-width: 767px) {
          .bor-hero__scene {
            object-position: center center;
          }
        }

        @keyframes borHeroScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.03); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bor-hero__scene { animation: none; }
        }

        /* Layer 1: r18-texture-horizon at 8% subliminal underlayer */
        .bor-hero__texture {
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

        /* Layer 2: left-edge gradient  --  copy protection zone (left 38-42%) */
        .bor-hero__grad-left {
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

        /* Layer 3: bottom vignette for CTA stabilization */
        .bor-hero__grad-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg,
            rgba(10,15,31,0.62) 0%,
            transparent 38%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 4: top hairline */
        .bor-hero__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.18);
          pointer-events: none;
          z-index: 3;
        }

        /* Grid wrapper */
        .bor-hero__grid {
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
        @media (max-width: 1023px) and (min-width: 768px) { .bor-hero__grid { padding: 120px 32px 80px; } }
        @media (max-width: 767px) {
          .bor-hero__grid {
            padding: 28px 24px 72px;
            flex-direction: column;
            align-items: center;
          }
        }

        /* Copy cluster  --  constrained to gradient-protected left vestibule */
        .bor-hero__copy {
          max-width: 620px;
          width: 100%;
        }

        @media (max-width: 767px) {
          .bor-hero__copy {
            max-width: 100%;
            text-align: center;
            order: 2;
          }
        }

        /* Eyebrow */
        .bor-hero__eyebrow {
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
        .bor-hero__h1 {
          font-family: var(--font-display-family);
          font-size: clamp(56px, 8vw, 96px);
          font-weight: 400;
          line-height: 1.05;
          color: var(--text-primary);
          margin: 0 0 24px 0;
          overflow-wrap: break-word;
        }

        .bor-hero__h1-line {
          display: block;
        }

        .bor-hero__h1-line--plain {
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        /* Gradient line  --  background-clip:text zeroes text-shadow; overlay handles contrast */
        .bor-hero__h1-line--gradient {
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
          .bor-hero__h1-line--gradient {
            animation: none;
            background-position: 0% 50%;
          }
        }

        /* H1 line stagger fade-up */
        .bor-hero__h1-line:nth-child(1) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 120ms both; }
        .bor-hero__h1-line:nth-child(2) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 240ms both; }
        .bor-hero__h1-line:nth-child(3) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 360ms both; }

        @media (prefers-reduced-motion: reduce) {
          .bor-hero__h1-line {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Subhead */
        .bor-hero__subhead {
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
          .bor-hero__subhead { max-width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bor-hero__subhead { animation: none; opacity: 1; transform: none; }
        }

        /* CTA row */
        .bor-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 600ms both;
        }

        @media (max-width: 767px) {
          .bor-hero__ctas {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bor-hero__ctas { animation: none; opacity: 1; transform: none; }
        }

        /* Primary CTA  --  yellow bg + glow */
        .bor-hero__cta-primary {
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

        .bor-hero__cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(254,214,7,0.45), 0 4px 16px rgba(254,214,7,0.20);
        }

        .bor-hero__cta-primary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }

        .bor-hero__cta-primary:active { transform: translateY(0); }

        /* Secondary CTA  --  ghost gold pill */
        .bor-hero__cta-secondary {
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

        .bor-hero__cta-secondary:hover {
          border-color: rgba(254,214,7,0.80);
          background: rgba(254,214,7,0.06);
          transform: translateY(-1px);
        }

        .bor-hero__cta-secondary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }

        /* Floating key-ingot  --  desktop: absolute right side, sits over archway threshold */
        .bor-hero__ingot {
          position: absolute;
          right: 16%;
          top: 50%;
          width: clamp(280px, 33vw, 460px);
          height: auto;
          z-index: 5;
          pointer-events: none;
          opacity: 1;
          animation:
            borIngotFloat 5s ease-in-out infinite,
            borIngotRock  7s ease-in-out infinite;
          filter:
            drop-shadow(0 40px 80px rgba(90,28,203,0.42))
            drop-shadow(0 20px 60px rgba(254,214,7,0.28));
        }

        @keyframes borIngotFloat {
          0%, 100% { transform: translateY(calc(-50% - 8px)); }
          50%       { transform: translateY(calc(-50% + 8px)); }
        }

        @keyframes borIngotRock {
          0%, 100% { rotate: -1deg; }
          50%       { rotate:  1deg; }
        }

        @media (max-width: 767px) {
          .bor-hero__ingot {
            position: relative;
            right: auto;
            top: auto;
            width: clamp(200px, 58vw, 260px);
            margin: 0 auto 32px;
            display: block;
            order: 1;
            animation:
              borIngotFloatMobile 5s ease-in-out infinite,
              borIngotRock        7s ease-in-out infinite;
            filter:
              drop-shadow(0 30px 60px rgba(90,28,203,0.42))
              drop-shadow(0 15px 40px rgba(254,214,7,0.28));
          }

          @keyframes borIngotFloatMobile {
            0%, 100% { transform: translateY(-8px); }
            50%       { transform: translateY(8px); }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bor-hero__ingot {
            animation: none;
            rotate: 0deg;
            transform: translateY(-50%);
          }
        }

        @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
          .bor-hero__ingot { transform: none; }
        }
      `}</style>

      <section className="bor-hero" id="hero" aria-label="For Borrowers">

        {/* Layer 0: r22-hero-home-v2.webp  --  library home hero reuse */}
        <Image
          src="/images/r22-hero-home-v2.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="bor-hero__scene"
          style={{ objectFit: "cover", objectPosition: "left center" }}
        />

        {/* Layer 1: horizon texture underlayer at 8% */}
        <Image
          src="/images/r18-texture-horizon.png"
          alt="" aria-hidden="true"
          fill
          sizes="100vw"
          quality={60}
          className="bor-hero__texture"
          style={{ objectFit: "cover" }}
        />

        {/* Gradient protection layers */}
        <div className="bor-hero__grad-left"   aria-hidden="true" />
        <div className="bor-hero__grad-bottom" aria-hidden="true" />
        <div className="bor-hero__hairline"    aria-hidden="true" />

        {/* Floating borrower facility monolith  --  mobile renders inline above copy */}
        <Image
          src="/images/r39-asset-borrower-hero-floater-transparent.webp"
          alt="capital facility archway gate"
          role="presentation"
          width={460}
          height={460}
          quality={85}
          className="bor-hero__ingot"
          style={{ objectFit: "contain" }}
          priority
        />

        {/* Grid wrapper */}
        <div className="bor-hero__grid">
          <div className="bor-hero__copy">

            <div className="bor-hero__eyebrow">For Borrowers</div>

            <h1 className="bor-hero__h1">
              <span className="bor-hero__h1-line bor-hero__h1-line--plain">Draw capital</span>
              <span className="bor-hero__h1-line bor-hero__h1-line--plain">against revenue</span>
              <span className="bor-hero__h1-line">
                <span className="bor-hero__h1-line--gradient">already earned.</span>
              </span>
            </h1>

            <p className="bor-hero__subhead">
              Businesses waiting sixty to one hundred eighty days on receivables draw against verified revenue, in USDC, on terms negotiated once and written down.
            </p>

            <div className="bor-hero__ctas">
              <a
                href="mailto:support@appex.finance"
                className="bor-hero__cta-primary"
              >
                Apply for an advance
              </a>
              <Link href="/protocol" className="bor-hero__cta-secondary">
                See how the protocol works
              </Link>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
