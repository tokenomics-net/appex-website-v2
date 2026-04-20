/**
 * TokenHero.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS keyframe animations only, no hooks or browser APIs.
 *
 * Design source: appex-design.md Section 1  --  "the token, enthroned"
 * Scene: r23-scene-token-utility.png (full-bleed, 100% opacity, LCP candidate)
 * Floating token: r22-appex-token-edited-transparent.webp (translateY 8px / 5s + rock 1.2deg / 7s)
 * Background stack:
 *   Layer 0: r23-scene-token-utility.png
 *   Layer 1: left-edge gradient protection (copy-protection zone, left 40-45%)
 *   Layer 2: bottom vignette for CTA stabilization
 *   Layer 3: top hairline (yellow 0.18)
 *   Layer 4: r18-texture-horizon at 8% overlay (subtle underlayer)
 * Rev 4 Rule: NO glassmorphism card  --  text lives directly on scene.
 * Text-shadow stack on all non-gradient copy: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3)
 * Copy: appex.md Section 1. Present tense. No em dashes.
 */

import Image from "next/image";
import Link  from "next/link";

export function TokenHero(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- $APPEX token hero  --  "the token, enthroned in atmosphere" ---- */
        .token-hero {
          position: relative;
          width: 100%;
          min-height: 720px;
          aspect-ratio: 16 / 9;
          max-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--ax-fortress);
        }

        @media (max-width: 767px) {
          .token-hero {
            aspect-ratio: auto;
            min-height: 100svh;
          }
        }

        /* Layer 0: r23-scene-token-utility.png at 100% opacity */
        .token-hero__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left center;
          pointer-events: none;
          z-index: 0;
          animation: thScenePulse 22s ease-in-out infinite;
        }

        @media (max-width: 767px) {
          .token-hero__scene {
            object-position: center center;
          }
        }

        @keyframes thScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.03); }
        }

        @media (prefers-reduced-motion: reduce) {
          .token-hero__scene { animation: none; }
        }

        /* Layer 1: left-edge gradient  --  copy protection zone (left 40-45%) */
        .token-hero__grad-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.80) 0%,
            rgba(10,15,31,0.50) 32%,
            transparent 62%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: bottom vignette for CTA stabilization */
        .token-hero__grad-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg,
            rgba(10,15,31,0.62) 0%,
            transparent 38%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: top hairline */
        .token-hero__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.18);
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 4: r18-texture-horizon at 8% subliminal underlayer */
        .token-hero__texture {
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

        /* Grid wrapper */
        .token-hero__grid {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 120px 48px 96px;
          display: flex;
          align-items: center;
        }

        @media (max-width: 1023px) {
          .token-hero__grid { padding: 120px 32px 80px; }
        }
        @media (max-width: 767px) {
          .token-hero__grid {
            padding: 96px 24px 72px;
            flex-direction: column;
            align-items: center;
          }
        }

        /* Copy cluster  --  constrained to gradient-protected zone */
        .token-hero__copy {
          max-width: 620px;
          width: 100%;
        }

        @media (max-width: 767px) {
          .token-hero__copy {
            max-width: 100%;
            text-align: center;
          }
        }

        /* Eyebrow */
        .token-hero__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 16px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 0ms both;
        }

        /* H1 */
        .token-hero__h1 {
          font-family: var(--font-display-family);
          font-size: clamp(56px, 8vw, 96px);
          font-weight: 400;
          line-height: 1.05;
          color: var(--text-primary);
          margin: 0 0 24px 0;
          overflow-wrap: break-word;
        }

        .token-hero__h1-line {
          display: block;
        }

        /* Non-gradient lines carry text-shadow */
        .token-hero__h1-line--plain {
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        /* Gradient line  --  background-clip:text zeroes text-shadow; overlay handles contrast */
        .token-hero__h1-line--gradient {
          display: inline-block;
          background-image: linear-gradient(
            90deg,
            var(--ax-capital-yellow)      0%,
            var(--ax-glint-yellow)        30%,
            var(--ax-ether-mist)          60%,
            var(--ax-node-purple-light)   80%,
            var(--ax-capital-yellow)      100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: axShimmer 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .token-hero__h1-line--gradient {
            animation: none;
            background-position: 0% 50%;
          }
        }

        /* H1 line stagger */
        .token-hero__h1-line:nth-child(1) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 120ms both; }
        .token-hero__h1-line:nth-child(2) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 240ms both; }
        .token-hero__h1-line:nth-child(3) { animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 360ms both; }

        @media (prefers-reduced-motion: reduce) {
          .token-hero__h1-line {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Subhead */
        .token-hero__subhead {
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
          .token-hero__subhead { max-width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .token-hero__subhead {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* CTA row */
        .token-hero__ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          animation: axFadeUp 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 600ms both;
        }

        @media (max-width: 767px) {
          .token-hero__ctas {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .token-hero__ctas { animation: none; opacity: 1; transform: none; }
        }

        /* Primary CTA  --  yellow bg + glow */
        .token-hero__cta-primary {
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
          transition: box-shadow 250ms ease, transform 200ms ease, background 200ms ease;
          box-shadow: 0 0 0 0 rgba(254,214,7,0);
          white-space: nowrap;
        }

        .token-hero__cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 28px rgba(254,214,7,0.45), 0 4px 16px rgba(254,214,7,0.20);
        }

        .token-hero__cta-primary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        .token-hero__cta-primary:active {
          transform: translateY(0);
        }

        /* Secondary CTA  --  ghost gold pill */
        .token-hero__cta-secondary {
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

        .token-hero__cta-secondary:hover {
          border-color: rgba(254,214,7,0.80);
          background: rgba(254,214,7,0.06);
          transform: translateY(-1px);
        }

        .token-hero__cta-secondary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        /* Floating token  --  desktop: absolute right side */
        .token-hero__token {
          position: absolute;
          right: 6%;
          top: 50%;
          width: clamp(360px, 36vw, 520px);
          height: auto;
          z-index: 4;
          pointer-events: none;
          animation:
            thTokenFloat  5s ease-in-out infinite,
            thTokenRock   7s ease-in-out infinite,
            thTokenShadow 6s ease-in-out infinite;
        }

        @keyframes thTokenFloat {
          0%, 100% { transform: translateY(calc(-50% - 8px)); }
          50%       { transform: translateY(calc(-50% + 8px)); }
        }

        @keyframes thTokenRock {
          0%, 100% { rotate: -1.2deg; }
          50%       { rotate:  1.2deg; }
        }

        @keyframes thTokenShadow {
          0%, 100% {
            filter:
              drop-shadow(0 40px 90px rgba(90,28,203,0.40))
              drop-shadow(0 0 0 rgba(254,214,7,0));
          }
          50% {
            filter:
              drop-shadow(0 50px 120px rgba(254,214,7,0.25))
              drop-shadow(0 20px 60px rgba(90,28,203,0.35));
          }
        }

        @media (max-width: 767px) {
          .token-hero__token {
            position: relative;
            right: auto;
            top: auto;
            width: clamp(200px, 60vw, 260px);
            margin: 0 auto 32px;
            display: block;
            animation:
              thTokenFloatMobile 5s ease-in-out infinite,
              thTokenRock        7s ease-in-out infinite,
              thTokenShadow      6s ease-in-out infinite;
          }

          @keyframes thTokenFloatMobile {
            0%, 100% { transform: translateY(-8px); }
            50%       { transform: translateY(8px); }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .token-hero__token {
            animation: none;
            rotate: 0deg;
            transform: translateY(-50%);
            filter: drop-shadow(0 40px 90px rgba(90,28,203,0.40));
          }
        }

        @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
          .token-hero__token {
            transform: none;
          }
        }
      `}</style>

      <section className="token-hero" id="hero" aria-label="$APPEX token introduction">

        {/* Layer 0: scene image  --  r23-scene-token-utility (token utility scene) */}
        <Image
          src="/images/r23-scene-token-utility.png"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="token-hero__scene"
          style={{ objectFit: "cover", objectPosition: "left center" }}
        />

        {/* Layer 4: r18-texture-horizon at 8% subliminal underlayer */}
        <Image
          src="/images/r18-texture-horizon.png"
          alt="" aria-hidden="true"
          fill
          sizes="100vw"
          quality={60}
          className="token-hero__texture"
          style={{ objectFit: "cover" }}
        />

        {/* Gradient protection layers */}
        <div className="token-hero__grad-left"   aria-hidden="true" />
        <div className="token-hero__grad-bottom" aria-hidden="true" />
        <div className="token-hero__hairline"    aria-hidden="true" />

        {/* Floating token  --  mobile renders inline above copy */}
        <Image
          src="/images/r22-appex-token-edited-transparent.webp"
          alt="" aria-hidden="true"
          role="presentation"
          width={520}
          height={520}
          quality={85}
          className="token-hero__token"
          style={{ objectFit: "contain" }}
          priority
        />

        {/* Grid wrapper */}
        <div className="token-hero__grid">
          <div className="token-hero__copy">

            <div className="token-hero__eyebrow">$APPEX</div>

            <h1 className="token-hero__h1">
              <span className="token-hero__h1-line token-hero__h1-line--plain">The vault</span>
              <span className="token-hero__h1-line token-hero__h1-line--plain">runs on</span>
              <span className="token-hero__h1-line">
                <span className="token-hero__h1-line--gradient">$APPEX.</span>
              </span>
            </h1>

            <p className="token-hero__subhead">
              Four structural demand sources tied to real economic transactions, plus governance. No emissions. No mining. No speculative loops dressed up as utility.
            </p>

            <div className="token-hero__ctas">
              <a href="#utilities" className="token-hero__cta-primary">
                Read the utilities
              </a>
              <Link href="/protocol" className="token-hero__cta-secondary">
                See how the protocol works
              </Link>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
