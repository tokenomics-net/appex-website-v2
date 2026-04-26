/**
 * LPsClosingCTA.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS keyframe animation only, no hooks.
 *
 * Design source: lps-revision-round-1.md Revision 7  --  centering fix (CSS only, no new asset)
 *
 * Diagnosis: r28-scene-lp-horizon-open.webp has its brightest anchor at ~37% horizontal
 *   (measured via pixel analysis), not 50%. Centering copy to viewport while scene anchor
 *   is at 37% makes copy feel adrift. Three-part fix per AD Rev 7:
 *   1. object-position updated to 37% 55%  --  locks horizon doorway under copy cluster.
 *   2. .lps-cta__copy-frame ::before  --  soft elliptical radial pedestal behind copy, creates
 *      an intentional "this is the content frame" zone independent of scene alignment.
 *   3. min-height bumped 480px -> 560px for more horizon-band air above the copy.
 *   4. Mobile: pedestal disabled (no off-center issue at mobile viewport).
 *
 * Background: r28-scene-lp-horizon-open.webp at 100% opacity.
 * Layout: single centered column, max-width 680px. NO glass card.
 * NO social icons  --  footer is the sole social surface site-wide.
 * Text-shadow stack on non-gradient copy per Rev 4 lesson 1.
 * Copy: copy/lps.md Section 7. Present tense. No em dashes.
 */

import Image from "next/image";

export function LPsClosingCTA(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- LPs Closing CTA  --  "The vault opens at the horizon" ---- */
        .lps-cta {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 96px 0;
          display: flex;
          align-items: center;
          min-height: 560px;
        }

        /* Layer 0: r28-scene-lp-horizon-open at 100% */
        .lps-cta__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 37% 55%;
          pointer-events: none;
          z-index: 0;
          animation: lpsCtaScenePulse 30s ease-in-out infinite;
        }

        @keyframes lpsCtaScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.02); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lps-cta__scene { animation: none; }
        }

        /* Layer 1: gradient overlay (Option A)  --  top dark, middle open, bottom dark */
        .lps-cta__overlay {
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
        .lps-cta__horizon-glow {
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
        .lps-cta__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.20);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper: single centered column */
        .lps-cta__content {
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

        @media (max-width: 1023px) { .lps-cta__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .lps-cta__content { padding: 0 24px; } }

        /* Copy frame  --  with soft elliptical pedestal behind the copy cluster */
        .lps-cta__copy {
          position: relative;
          max-width: 680px;
          padding: 56px 48px;
          isolation: isolate;
        }

        /* Soft elliptical darkening  --  "the copy sits in its own frame" */
        .lps-cta__copy::before {
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
          /* NO border-radius. The gradient falloff is the shape. */
        }

        @media (max-width: 767px) {
          .lps-cta__copy::before { display: none; }
          .lps-cta__copy { padding: 32px 0; }
        }

        .lps-cta__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 14px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .lps-cta__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 20px 0;
        }

        /* Non-gradient words carry text-shadow. Gradient-clipped text carries no shadow. */
        .lps-cta__h2-plain {
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .lps-cta__subhead {
          font-family: var(--font-body-family);
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.6;
          color: var(--text-primary);
          max-width: 540px;
          margin: 0 0 40px 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
        }

        /* Social icons  --  replaces mailto CTA (appeX is decentralized, no contact surface) */
        .lps-cta__socials {
          display: inline-flex;
          gap: 18px;
          align-items: center;
          justify-content: center;
          padding: 8px 4px;
        }

        .lps-cta__social-icon {
          display: inline-flex;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          color: var(--ax-capital-yellow, #FED607);
          border: 1px solid rgba(254,214,7,0.45);
          border-radius: 999px;
          transition: border-color 200ms ease, color 200ms ease, transform 200ms ease;
          text-decoration: none;
        }

        .lps-cta__social-icon:hover {
          border-color: rgba(254,214,7,0.80);
          color: #fff;
          transform: translateY(-1px);
        }

        .lps-cta__social-icon:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }
      `}</style>

      <section
        className="lps-cta"
        id="cta"
        aria-labelledby="lps-cta-heading"
      >
        {/* Scene */}
        <Image
          src="/images/r28-scene-lp-horizon-open.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          sizes="100vw"
          quality={85}
          className="lps-cta__scene"
          style={{ objectFit: "cover", objectPosition: "37% 55%" }}
          loading="lazy"
        />

        <div className="lps-cta__overlay"      aria-hidden="true" />
        <div className="lps-cta__horizon-glow" aria-hidden="true" />
        <div className="lps-cta__hairline"      aria-hidden="true" />

        <div className="lps-cta__content">
          <div className="lps-cta__copy">

            <div className="lps-cta__eyebrow">Next step</div>

            <h2 id="lps-cta-heading" className="lps-cta__h2">
              <span className="lps-cta__h2-plain">The vault opens </span>
              <span className="text-gold-gradient">at the horizon.</span>
            </h2>

            <p className="lps-cta__subhead">
              Launch is forthcoming. Follow the protocol to be ready the day the first vault opens.
            </p>

            <div className="lps-cta__socials">
              <a
                href="https://x.com/appexprotocol"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow appeX on X"
                className="lps-cta__social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/appex-protocol/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow appeX on LinkedIn"
                className="lps-cta__social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
