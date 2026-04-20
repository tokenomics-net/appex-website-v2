/**
 * ApplockrAnchor.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS animations only, no hooks.
 *
 * Design source: borrowers-design.md Section 5  --  "appLockr  --  the anchor borrower"
 * Scene: r21-scene-token-apex.png at 100% (library reuse  --  token-apex ceremonial register)
 * Floating anchor asset: r21-asset-anchor-borrower-transparent.webp at 380-440px
 * Layout: 55/45 two-up (glass copy panel left, scene with floating asset right)
 * Three-row mini-list with icons: r22-step-gap, r22-step-bridge, r22-step-fund-draw
 * NARROWLY SCOPED FUTURE TENSE per decisions.md §10a (appLockr is pre-launch):
 *   "will be," "will draw," "will receive" in appLockr section ONLY.
 * NO CTA, NO outbound link, NO appLockr wordmark.
 * "appLockr" rendered in styled type only (no logo file).
 * Slow 26s brightness pulse on scene. Reduced-motion: pins.
 * Copy: copy/borrowers.md Section 5. Future tense exception active.
 */

import Image from "next/image";

export function ApplockrAnchor(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- appLockr anchor borrower  --  case study surface ---- */
        .applockr {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
          min-height: 560px;
        }

        /* Layer 0: r21-scene-token-apex at 100% */
        .applockr__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 70% center;
          pointer-events: none;
          z-index: 0;
          animation: applockrScenePulse 26s ease-in-out infinite;
        }

        @media (max-width: 767px) {
          .applockr__scene { object-position: center center; }
        }

        @keyframes applockrScenePulse {
          0%, 100% { filter: brightness(0.97); }
          50%       { filter: brightness(1.03); }
        }

        @media (prefers-reduced-motion: reduce) {
          .applockr__scene { animation: none; }
        }

        /* Tint overlay: 50/30/50 top-middle-bottom */
        .applockr__tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.50) 0%,
            rgba(10,15,31,0.30) 45%,
            rgba(10,15,31,0.60) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Left gradient for copy zone protection */
        .applockr__grad-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.75) 0%,
            rgba(10,15,31,0.55) 38%,
            transparent 62%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Top + bottom hairlines */
        .applockr__hairline-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.16);
          pointer-events: none;
          z-index: 2;
        }

        .applockr__hairline-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.16);
          pointer-events: none;
          z-index: 2;
        }

        /* Content */
        .applockr__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .applockr__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .applockr__content { padding: 0 24px; } }

        /* Section header (above the two-up layout, on scene) */
        .applockr__header {
          max-width: 720px;
          margin-bottom: 48px;
        }

        .applockr__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .applockr__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 16px 0;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .applockr__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-primary);
          max-width: 680px;
          margin: 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
        }

        /* Two-up grid */
        .applockr__grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 64px;
          align-items: center;
          max-width: 1200px;
        }

        @media (max-width: 959px) {
          .applockr__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Left column: glass panel */
        .applockr__glass {
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(254,214,7,0.20);
          border-radius: var(--radius-md, 12px);
          padding: 40px;
        }

        /* Pull statement (styled type, sub-H2 scale, NOT blockquote) */
        .applockr__pull {
          font-family: var(--font-display-family);
          font-size: clamp(22px, 2.8vw, 30px);
          font-weight: 400;
          line-height: 1.2;
          margin: 0 0 24px 0;
        }

        /* Supporting paragraph */
        .applockr__para {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0 0 32px 0;
        }

        /* Mini-list */
        .applockr__mini-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .applockr__mini-row {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          align-items: start;
        }

        .applockr__mini-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .applockr__mini-copy {}

        .applockr__mini-label {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.75;
          margin-bottom: 4px;
          display: block;
        }

        .applockr__mini-body {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Right column: floating anchor asset */
        .applockr__asset-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .applockr__anchor-asset {
          width: clamp(240px, 38vw, 440px);
          height: auto;
          opacity: 1;
          filter:
            drop-shadow(0 40px 80px rgba(254,214,7,0.30))
            drop-shadow(0 20px 60px rgba(90,28,203,0.35));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (max-width: 959px) {
          .applockr__anchor-asset { width: 240px; }
        }
      `}</style>

      <section className="applockr" id="anchor" aria-labelledby="applockr-heading">

        {/* Scene */}
        <Image
          src="/images/r21-scene-token-apex.png"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={85}
          className="applockr__scene"
          style={{ objectFit: "cover", objectPosition: "70% center" }}
          loading="lazy"
        />
        <div className="applockr__tint"            aria-hidden="true" />
        <div className="applockr__grad-left"       aria-hidden="true" />
        <div className="applockr__hairline-top"    aria-hidden="true" />
        <div className="applockr__hairline-bottom" aria-hidden="true" />

        <div className="applockr__content">

          {/* Section header  --  on scene, with text-shadow */}
          <header className="applockr__header">
            <div className="applockr__eyebrow">Anchor borrower</div>
            <h2 className="applockr__h2" id="applockr-heading">
              First in.{" "}
              <span className="text-gold-gradient">appLockr launches with the vault.</span>
            </h2>
            <p className="applockr__subhead">
              appLockr is a mobile advertising platform that funds same-day payouts to publishers who would otherwise wait sixty to one hundred eighty days.
            </p>
          </header>

          {/* Two-up layout */}
          <div className="applockr__grid">

            {/* Left: glass panel with pull statement + paragraph + mini-list */}
            <div className="applockr__glass">
              {/* Pull statement  --  declarative framing, future tense per §10a exception */}
              <p className="applockr__pull">
                appLockr will be{" "}
                <span className="text-gold-gradient">appeX&apos;s first anchor borrower.</span>
              </p>

              {/* Supporting paragraph */}
              <p className="applockr__para">
                appLockr serves thousands of app developers. Its publishers earn ad revenue long before advertisers settle those invoices. Instead of waiting the industry standard, appLockr will draw USDC from the vault against verified ad revenue and pay its publishers the same day. Publishers choose the payout format: $APPEX, USDC, or fiat. Deterministic terms align with the cadence of a subscription-funded media business.
              </p>

              {/* Three-row mini-list */}
              <ul className="applockr__mini-list" aria-label="How appLockr uses the vault">
                <li className="applockr__mini-row">
                  <Image
                    src="/images/r22-step-gap-transparent.webp"
                    alt="" aria-hidden="true"
                    role="presentation"
                    width={48}
                    height={48}
                    quality={75}
                    className="applockr__mini-icon"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="applockr__mini-copy">
                    <span className="applockr__mini-label">The gap</span>
                    <p className="applockr__mini-body">Publishers earn ad revenue and wait Net-60 to Net-180 for advertisers to settle the invoice.</p>
                  </div>
                </li>
                <li className="applockr__mini-row">
                  <Image
                    src="/images/r22-step-bridge-transparent.webp"
                    alt="" aria-hidden="true"
                    role="presentation"
                    width={48}
                    height={48}
                    quality={75}
                    className="applockr__mini-icon"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="applockr__mini-copy">
                    <span className="applockr__mini-label">The draw</span>
                    <p className="applockr__mini-body">appLockr will draw USDC from the vault against verified ad revenue, on terms negotiated once.</p>
                  </div>
                </li>
                <li className="applockr__mini-row">
                  <Image
                    src="/images/r22-step-fund-draw-transparent.webp"
                    alt="" aria-hidden="true"
                    role="presentation"
                    width={48}
                    height={48}
                    quality={75}
                    className="applockr__mini-icon"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="applockr__mini-copy">
                    <span className="applockr__mini-label">The payout</span>
                    <p className="applockr__mini-body">Publishers will receive same-day payouts in $APPEX, USDC, or fiat.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: floating anchor asset composited against scene */}
            <div className="applockr__asset-col" aria-hidden="true">
              <Image
                src="/images/r39-asset-first-stake-anchor-transparent.webp"
                alt="literal maritime anchor"
                role="presentation"
                width={440}
                height={440}
                quality={85}
                className="applockr__anchor-asset"
                style={{ objectFit: "contain" }}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
