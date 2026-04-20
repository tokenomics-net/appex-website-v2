/**
 * FeeTransparency.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, no hooks, no browser APIs required.
 *
 * Design source: borrowers-design.md Section 7  --  "Fee transparency (recall band)"
 * Background: r17-texture-energy.png at 18% (half-height recall band)
 * Section padding: 64px (half of standard 80px  --  breather band)
 * Layout: two-column (copy 60% left, ghosted thumbnail 40% right)
 * Ghosted thumbnail: r22-util-staking-transparent.webp at 0.65 opacity (staking utility = "two fees, one discount")
 *   R35 velvet cleanup: r29-asset-staking-pair-disc retired, swapped to r22-util-staking.
 *   This is the ONLY intentional sub-1.0 static opacity on the page (beyond the
 *   S2 commitment-scale at 0.45). Static CSS opacity, NOT animated.
 * Worked example: inside glass callout per Rev 4 lesson 3.
 * Variance disclaimer: required verbatim per decisions.md §10b.
 * Inline links: /protocol#fee-curve and /appex#utilities.
 * Copy: copy/borrowers.md Section 7. Present tense. No em dashes.
 */

import Image from "next/image";
import Link  from "next/link";

export function FeeTransparency(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Fee transparency  --  recall band ---- */
        .fee-transparency {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 64px 0;
        }

        .fee-transparency__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.18;
        }

        /* Directional overlay */
        .fee-transparency__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.90) 0%,
            rgba(10,15,31,0.92) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Warm wash behind thumbnail (right column) */
        .fee-transparency__warm {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 900px 400px at 75% 50%,
            rgba(254,214,7,0.08) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        .fee-transparency__content {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .fee-transparency__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .fee-transparency__content { padding: 0 24px; } }

        /* Two-column grid */
        .fee-transparency__grid {
          display: grid;
          grid-template-columns: 60fr 40fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 1023px) {
          .fee-transparency__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Left: copy cluster */
        .fee-transparency__copy {}

        .fee-transparency__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .fee-transparency__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 20px 0;
        }

        .fee-transparency__body {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0 0 24px 0;
          max-width: 580px;
        }

        /* Worked example glass callout */
        .fee-transparency__example {
          background: rgba(10,15,31,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(254,214,7,0.22);
          border-radius: var(--radius-md, 12px);
          padding: 20px 28px;
          margin-bottom: 20px;
        }

        .fee-transparency__example p {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0 0 6px 0;
        }

        .fee-transparency__example p:last-of-type { margin-bottom: 0; }

        /* Savings line highlight */
        .fee-transparency__savings {
          font-family: var(--font-body-family);
          font-size: 14px;
          font-weight: 500;
          background-image: linear-gradient(
            90deg,
            var(--ax-capital-yellow, #FED607)      0%,
            var(--ax-glint-yellow, #FAF28B)        40%,
            var(--ax-capital-yellow, #FED607)      100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: block;
          margin-top: 10px;
        }

        /* Wiki footer inside example */
        .fee-transparency__wiki {
          display: block;
          font-family: var(--font-body-family);
          font-size: 12px;
          font-style: italic;
          color: var(--text-secondary);
          opacity: 0.55;
          margin-top: 10px;
        }

        /* Button-style CTA links per R1.7 */
        .fee-transparency__links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }

        .fee-transparency__cta-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-body-family);
          font-size: 14px;
          font-weight: 600;
          color: var(--ax-capital-yellow, #FED607);
          text-decoration: none;
          border: 1px solid rgba(254,214,7,0.40);
          border-radius: 999px;
          padding: 10px 20px;
          transition: border-color 200ms ease, background 200ms ease;
          white-space: nowrap;
        }

        .fee-transparency__cta-link:hover {
          border-color: rgba(254,214,7,0.80);
          background: rgba(254,214,7,0.06);
        }

        .fee-transparency__cta-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .fee-transparency__cta-link { transition: none; }
        }

        /* Right: ghosted fee-curve thumbnail */
        .fee-transparency__thumbnail-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Static 0.65 opacity  --  decorative atmospheric, NOT animated per site-wide rule */
        .fee-transparency__thumbnail {
          width: clamp(200px, 35vw, 380px);
          height: auto;
          opacity: 0.65;
          filter: drop-shadow(0 30px 60px rgba(90,28,203,0.25));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (max-width: 1023px) {
          .fee-transparency__thumbnail { width: 240px; margin: 0 auto; display: block; }
        }
      `}</style>

      <section className="fee-transparency" id="fee-transparency">
        <Image
          src="/images/r17-texture-energy.png"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="fee-transparency__texture"
          style={{ objectFit: "cover" }}
        />
        <div className="fee-transparency__overlay" aria-hidden="true" />
        <div className="fee-transparency__warm"    aria-hidden="true" />

        <div className="fee-transparency__content">
          <div className="fee-transparency__grid">

            {/* Left: copy cluster */}
            <div className="fee-transparency__copy">
              <div className="fee-transparency__eyebrow">Fee transparency</div>
              <h2 className="fee-transparency__h2">
                Two fees. One rule.{" "}
                <span className="text-gold-gradient">One discount.</span>
              </h2>

              <p className="fee-transparency__body">
                Every advance carries two fees. The LP yield fee scales with payment-term duration, from five percent at Net-30 to fifteen percent at Net-180. The protocol fee is negotiated during onboarding and written into the facility. Paying the protocol fee in $APPEX takes twenty-five percent off. Rates vary per borrower based on risk, volume, and negotiated agreement.
              </p>

              {/* Worked example inside glass callout */}
              <div className="fee-transparency__example" role="region" aria-label="Fee worked example">
                <p>$10,000 advance. Net-90. Two percent protocol fee.</p>
                <p>Paid in USDC: $900 LP yield + $200 protocol = $1,100 total.</p>
                <p>Paid in $APPEX: $900 LP yield + $150 protocol = $1,050 total.</p>
                <span className="fee-transparency__savings">
                  Fifty dollars off by paying the protocol fee in $APPEX.
                </span>
              </div>

              {/* Button-style CTA links */}
              <div className="fee-transparency__links">
                <Link href="/protocol#fee-curve" className="fee-transparency__cta-link">
                  See the full fee curve
                </Link>
                <Link href="/appex#utilities" className="fee-transparency__cta-link">
                  See the $APPEX discount
                </Link>
              </div>
            </div>

            {/* Right: staking-pair-disc  --  "two fees, one discount" (library-reuse R1.6) */}
            <div className="fee-transparency__thumbnail-col" aria-hidden="true">
              <Image
                src="/images/r22-util-lower-fees-transparent.webp"
                alt="" aria-hidden="true"
                role="presentation"
                width={380}
                height={380}
                quality={75}
                className="fee-transparency__thumbnail"
                style={{ objectFit: "contain" }}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
