/**
 * AboutHero.tsx
 *
 * Server Component  --  no client interactivity.
 * Justification: static layout, CSS keyframe animations only, no hooks or browser APIs.
 *
 * Design source: revision-pass-4.md §5 (About Checkpoint 1 Plan) + website-layout-standards.md
 * Copy source: outputs/appex-website-build/copy/about.md Section A (TONY-APPROVED)
 *
 * Scene: r35-scene-about-protocol-rest.png  --  bespoke new-gen (r35). "Protocol at rest" concept.
 *   Single ziggurat monolith on low plinth, warm ceremonial chamber, wide format.
 *   Left third dark for copy zone; right two-thirds carry visible form.
 * No floating asset  --  hero is a clean declaration.
 * No CTA buttons.
 * Background stack:
 *   Layer 0: r35-scene-about-protocol-rest.png (100% opacity, LCP candidate)
 *   Layer 1: left-edge gradient  --  copy protection zone (dark left alcove usage)
 *   Layer 2: bottom vignette
 *   Layer 3: top hairline (yellow 0.18)
 * Rev 4 Rule: NO glassmorphism card  --  text lives directly on scene (website-layout-standards §2).
 * Text-shadow stack on all non-gradient copy:
 *   0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3)
 * Gradient-clipped text (gold gradient) cannot carry text-shadow  --  overlay gradient handles contrast.
 */

import Image from "next/image";

export function AboutHero(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- About Hero  --  "Protocol at rest" ---- */
        .about-hero {
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
          .about-hero {
            /* CLS fix: drop aspect-ratio entirely on mobile.
               aspect-ratio: 16/9 conflicts with height: 100svh -- the browser resolves
               the taller constraint after font/toolbar geometry settles, causing a
               post-paint height reflow (CLS 0.135). With aspect-ratio removed, the
               container height is determined solely by 100svh from first paint,
               which is stable. object-fit: cover on the scene Image handles
               the visual fill without any layout contribution. */
            min-height: 100svh;
            height: 100svh;
          }
        }

        /* Layer 0: r35-scene-about-protocol-rest at 100% opacity */
        .about-hero__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left center;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 767px) {
          .about-hero__scene {
            object-position: center center;
          }
        }

        /* Layer 1: left-edge gradient  --  copy protection zone (dark left alcove) */
        .about-hero__grad-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.78) 0%,
            rgba(10,15,31,0.45) 30%,
            transparent        60%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 2: bottom vignette */
        .about-hero__grad-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg,
            rgba(10,15,31,0.60) 0%,
            transparent        35%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 3: top hairline (yellow) */
        .about-hero__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.18);
          pointer-events: none;
          z-index: 3;
        }

        /* Grid wrapper */
        .about-hero__grid {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 120px 48px 96px;
          display: flex;
          align-items: center;
        }

        @media (max-width: 1023px) {
          .about-hero__grid { padding: 120px 32px 80px; }
        }

        @media (max-width: 767px) {
          .about-hero__grid {
            padding: 28px 24px 72px;
            align-items: flex-start;
          }
        }

        /* Mobile: section becomes a column so the static asset stacks above the grid */
        @media (max-width: 767px) {
          .about-hero {
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 96px;
          }
        }

        /* Copy cluster  --  constrained to gradient-protected left alcove */
        .about-hero__copy {
          max-width: 720px;
          width: 100%;
        }

        /* Eyebrow */
        .about-hero__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
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
        .about-hero__h1 {
          font-family: var(--font-display-family);
          font-size: clamp(48px, 6.5vw, 88px);
          font-weight: 400;
          line-height: 1.05;
          color: var(--text-primary);
          margin: 0 0 28px 0;
          overflow-wrap: break-word;
        }

        .about-hero__h1-line {
          display: block;
        }

        /* Plain text line carries text-shadow */
        .about-hero__h1-line--plain {
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        /* Gradient accent  --  background-clip:text zeroes text-shadow; overlay handles contrast */
        .about-hero__h1-line--gradient {
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
          .about-hero__h1-line--gradient {
            animation: none;
            background-position: 0% 50%;
          }
        }

        /* H1 stagger fade-up */
        .about-hero__h1-line:nth-child(1) {
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 120ms both;
        }
        .about-hero__h1-line:nth-child(2) {
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 240ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-hero__h1-line {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Subhead */
        .about-hero__subhead {
          font-family: var(--font-body-family);
          font-size: clamp(15px, 1.8vw, 17px);
          font-weight: 400;
          line-height: 1.65;
          color: var(--text-primary);
          margin: 0;
          max-width: 580px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 360ms both;
        }

        @media (max-width: 767px) {
          .about-hero__subhead { max-width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-hero__eyebrow,
          .about-hero__subhead {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .about-hero__marker { animation: none; transform: translateY(-50%); }
        }

        /* Floating hero asset  --  principled foundation marker (hero exception to float rule) */
        .about-hero__marker {
          position: absolute;
          right: 18%;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(240px, 28vw, 420px);
          height: auto;
          object-fit: contain;
          z-index: 3;
          filter:
            drop-shadow(0 40px 80px rgba(90,28,203,0.38))
            drop-shadow(0 20px 40px rgba(254,214,7,0.16));
          animation: aboutMarkerFloat 6s ease-in-out infinite, aboutMarkerRock 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes aboutMarkerFloat {
          0%, 100% { transform: translateY(calc(-50% - 8px)); }
          50%       { transform: translateY(calc(-50% + 8px)); }
        }

        @keyframes aboutMarkerRock {
          0%, 100% { rotate: -1deg; }
          50%       { rotate:  1deg; }
        }

        /* Tablet (768-1023px): asset moves inline above copy, still flows before grid */
        @media (max-width: 1023px) and (min-width: 768px) {
          .about-hero__marker {
            position: static;
            display: block;
            width: clamp(160px, 38vw, 260px);
            margin: 0 auto 32px;
            animation: none;
            transform: none;
          }
        }

        /* Mobile (<768px): asset flows as block above the grid, centered, 200-250px */
        @media (max-width: 767px) {
          .about-hero__marker {
            position: static;
            display: block;
            width: clamp(200px, 55vw, 250px);
            margin: 0 auto 28px;
            animation:
              aboutMarkerFloatMobile 6s ease-in-out infinite,
              aboutMarkerRock        8s ease-in-out infinite;
            transform: none;
          }

          @keyframes aboutMarkerFloatMobile {
            0%, 100% { transform: translateY(-8px); }
            50%       { transform: translateY(8px); }
          }
        }

        @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
          .about-hero__marker {
            animation: none;
            rotate: 0deg;
            transform: none;
          }
        }
      `}</style>

      <section className="about-hero" id="hero" aria-label="About appeX Protocol">

        {/* Layer 0: r35-scene-about-protocol-rest.png  --  100% opacity, LCP candidate */}
        <Image
          src="/images/r38-scene-about-hero.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="about-hero__scene"
          style={{ objectFit: "cover", objectPosition: "left center" }}
        />

        {/* Gradient protection layers */}
        <div className="about-hero__grad-left"   aria-hidden="true" />
        <div className="about-hero__grad-bottom" aria-hidden="true" />
        <div className="about-hero__hairline"    aria-hidden="true" />

        {/* Floating hero asset  --  principled foundation marker */}
        <Image
          src="/images/r41-asset-about-hero-floater-bright-transparent.webp"
          alt="decentralized peer-node lattice"
          width={420}
          height={420}
          quality={85}
          className="about-hero__marker"
          priority
        />

        {/* Grid wrapper */}
        <div className="about-hero__grid">
          <div className="about-hero__copy">

            <div className="about-hero__eyebrow" aria-hidden="true">About</div>

            <h1 className="about-hero__h1">
              <span className="about-hero__h1-line about-hero__h1-line--plain">
                A decentralized protocol for
              </span>
              <span className="about-hero__h1-line">
                <span className="about-hero__h1-line--gradient">onchain working capital.</span>
              </span>
            </h1>

            <p className="about-hero__subhead">
              appeX is a protocol, not a company. Permissionless USDC liquidity meets
              credit-reviewed borrowers who draw against verified receivables. Real fees.
              Structured underwriting. Protocol-owned liquidity.
            </p>

          </div>
        </div>

      </section>
    </>
  );
}
