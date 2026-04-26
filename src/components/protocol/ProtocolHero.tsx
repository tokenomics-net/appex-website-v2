/**
 * ProtocolHero.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, no event handlers, no hooks, no browser APIs.
 *
 * Design source: protocol-design.md Rev 4 Section 1 + Fix 1 spec
 * Scene: r23-protocol-hero.webp (CUSTOM interior vault mechanism)
 * Fix 1: glassmorphism card REMOVED. Text placed directly on scene image.
 * Legibility: text-shadow 0 2px 20px rgba(0,0,0,0.6) on all copy elements.
 * Layout: left-aligned in 1280px grid wrapper with 48px padding.
 * Copy: PRESENT TENSE per decisions.md §2. No em dashes.
 */

import Image from "next/image";

export function ProtocolHero(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Protocol hero (Fix 1: no glassmorphism card) ---- */
        .proto-hero {
          position: relative;
          width: 100%;
          min-height: 100svh;
          min-height: 720px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--ax-fortress);
        }

        /* Layer 0: r23-protocol-hero.webp at 100% opacity  --  full-bleed scene */
        .proto-hero__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
          animation: axScenePulse 22s ease-in-out infinite;
        }

        @keyframes axScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.03); }
        }

        /* Layer 1: left-edge gradient for copy protection  --  extended further right */
        .proto-hero__grad-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.82) 0%,
            rgba(10,15,31,0.55) 35%,
            rgba(10,15,31,0.20) 55%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: bottom vignette */
        .proto-hero__grad-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg,
            rgba(10,15,31,0.60) 0%,
            transparent 35%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: top-edge hairline */
        .proto-hero__hairline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(254,214,7,0.18);
          pointer-events: none;
          z-index: 2;
        }

        /* Grid wrapper: 1280px max-width, 48px padding */
        .proto-hero__grid {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 120px 48px 80px;
          display: flex;
          align-items: center;
        }

        @media (max-width: 1023px) {
          .proto-hero__grid { padding: 120px 32px 80px; }
        }
        @media (max-width: 767px) {
          .proto-hero__grid { padding: 28px 24px 60px; }
        }

        /* Mobile: section becomes a column so the static asset stacks above the grid */
        @media (max-width: 767px) {
          .proto-hero {
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 96px;
          }
        }

        /* Copy cluster  --  constrained to left 50% of viewport where gradient protects */
        .proto-hero__copy {
          max-width: 540px;          /* was 580  --  give float more breathing room */
          width: 100%;
        }

        /* Eyebrow */
        .proto-hero__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 16px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
          animation: axFadeUp 600ms var(--ease-enter) 0ms both;
        }

        /*
         * H1: two-line intentional split
         * Line 1: "Three steps. One vault."
         * Line 2: "No intermediaries."  --  second line in gold gradient
         * Font clamped to fit within 720px at left-aligned placement.
         */
        .proto-hero__h1 {
          font-family: var(--font-display-family);
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 24px 0;
          overflow-wrap: break-word;
          word-break: break-word;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .proto-hero__h1-line {
          display: block;
          white-space: nowrap;
        }

        /* Second line: "No intermediaries." in gold gradient */
        .proto-hero__h1-line--gradient {
          display: inline-block;
          background-image: linear-gradient(
            90deg,
            var(--ax-capital-yellow) 0%,
            var(--ax-glint-yellow) 30%,
            var(--ax-ether-mist) 60%,
            var(--ax-node-purple-light) 80%,
            var(--ax-capital-yellow) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          /* text-shadow incompatible with background-clip:text  --  legibility from overlay gradient */
          animation: axShimmer 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .proto-hero__h1-line--gradient {
            animation: none;
            background-position: 0% 50%;
          }
        }

        /* Subhead */
        .proto-hero__subhead {
          font-family: var(--font-body-family);
          font-size: clamp(15px, 1.8vw, 17px);
          font-weight: 400;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          max-width: 540px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        /* Staggered fade-up for each copy element */
        .proto-hero__h1-line:nth-child(1) { animation: axFadeUp 600ms var(--ease-enter) 120ms both; }
        .proto-hero__h1-line:nth-child(2) { animation: axFadeUp 600ms var(--ease-enter) 240ms both; }
        .proto-hero__subhead              { animation: axFadeUp 600ms var(--ease-enter) 360ms both; }

        @media (max-width: 767px) {
          /* Allow natural wrap on small screens */
          .proto-hero__h1-line { white-space: normal; }
        }

        @media (prefers-reduced-motion: reduce) {
          .proto-hero__scene         { animation: none; }
          .proto-hero__h1-line,
          .proto-hero__eyebrow,
          .proto-hero__subhead {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .proto-hero__core { animation: none; transform: translateY(-50%); }
        }

        /* Floating hero asset  --  protocol core (hero exception to float rule) */
        .proto-hero__core {
          position: absolute;
          right: 8%;                            /* was 20%  --  push further toward right edge */
          top: 50%;
          transform: translateY(-50%);
          width: clamp(240px, 26vw, 380px);     /* was clamp(260px, 30vw, 440px) */
          height: auto;
          object-fit: contain;
          z-index: 3;
          filter:
            drop-shadow(0 40px 80px rgba(90,28,203,0.40))
            drop-shadow(0 20px 40px rgba(254,214,7,0.18));
          animation: protoCoreFloat 5s ease-in-out infinite, protoCoreRock 7s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes protoCoreFloat {
          0%, 100% { transform: translateY(calc(-50% - 8px)); }
          50%       { transform: translateY(calc(-50% + 8px)); }
        }

        @keyframes protoCoreRock {
          0%, 100% { rotate: -1deg; }
          50%       { rotate:  1deg; }
        }

        /* Tablet (768-1023px): asset moves inline above copy, still flows before grid */
        @media (max-width: 1023px) and (min-width: 768px) {
          .proto-hero__core {
            position: static;
            display: block;
            width: clamp(180px, 38vw, 280px);
            margin: 0 auto 32px;
            animation: none;
            transform: none;
          }
        }

        /* Mobile (<768px): asset flows as block above the grid, centered, 200-250px */
        @media (max-width: 767px) {
          .proto-hero__core {
            position: static;
            display: block;
            width: clamp(200px, 55vw, 250px);
            margin: 0 auto 28px;
            animation:
              protoCoreFloatMobile 6s ease-in-out infinite,
              protoCoreRock        8s ease-in-out infinite;
            transform: none;
          }

          @keyframes protoCoreFloatMobile {
            0%, 100% { transform: translateY(-8px); }
            50%       { transform: translateY(8px); }
          }
        }

        @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
          .proto-hero__core {
            animation: none;
            rotate: 0deg;
            transform: none;
          }
        }
      `}</style>

      <section className="proto-hero" aria-label="Protocol hero">
        {/* Interior vault mechanism scene  --  r23-protocol-hero.webp, LCP candidate */}
        <Image
          src="/images/r23-protocol-hero.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="proto-hero__scene"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />

        {/* Gradient protection layers */}
        <div className="proto-hero__grad-left"   aria-hidden="true" />
        <div className="proto-hero__grad-bottom" aria-hidden="true" />
        <div className="proto-hero__hairline"    aria-hidden="true" />

        {/* Floating hero asset  --  protocol core (double-use: also in EcosystemCrosslinks) */}
        <Image
          src="/images/r75-asset-protocol-core-bright-transparent.webp"
          alt="The protocol core  --  connected to every surface of the protocol"
          width={440}
          height={440}
          quality={85}
          className="proto-hero__core"
          priority
        />

        {/* Grid wrapper: 1280px max-width, 48px padding */}
        <div className="proto-hero__grid">
          {/* Copy cluster  --  text on scene, no glassmorphism card */}
          <div className="proto-hero__copy">
            <div className="proto-hero__eyebrow">The Protocol</div>

            <h1 className="proto-hero__h1">
              {/* Line 1 */}
              <span className="proto-hero__h1-line">Three steps. One vault.</span>
              {/* Line 2: gold gradient */}
              <span className="proto-hero__h1-line">
                <span className="proto-hero__h1-line--gradient">No intermediaries.</span>
              </span>
            </h1>

            <p className="proto-hero__subhead">
              Each vault isolates its own risk, fee model, and liquidity pool.
              New vaults can launch separate markets without touching existing capital.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
