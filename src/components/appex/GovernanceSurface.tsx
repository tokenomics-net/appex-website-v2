/**
 * GovernanceSurface.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS keyframe animations only, no hooks.
 *
 * Design source: appex-design.md Section 7  --  "the voting floor"
 * Background: r24-scene-governance-floor.png at 100% opacity (Option B)
 *   + r17-texture-grounding at 8% mix-blend-mode overlay
 *   + gradient overlay: left 40% darkened for glass scope-list panel
 * Left column (55%): glass panel with scope list (eyebrow, H2, subhead, ol, cross-link)
 *   Glass spec (heavier, on-scene): backdrop-filter blur(22px)
 *   Eyebrow uses ether-mist accent #B9A0CC per spec (distinct from yellow-dominant sections)
 *   Hairlines use ether-mist tint rgba(185,160,204,0.16) per spec
 * Right column (45%): r45-asset-governance-quorum-ring-bright-transparent.webp
 *   Animation: translateY 8px / 6s + rock 1deg / 9s (Tony-approved)
 *   Drop-shadow pulse 7s
 * Copy: appex.md Section 7. Present tense. No em dashes.
 */

import Image from "next/image";

export function GovernanceSurface(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Governance surface  --  "the voting floor" ---- */
        .governance {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 0: r24-scene-governance-floor at 100% */
        .governance__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: r17-texture-grounding at 8% mix-blend-mode overlay */
        .governance__grounding {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 1;
          opacity: 0.08;
          mix-blend-mode: overlay;
        }

        /* Layer 2: gradient overlay (Option B)  --  left 40% darkens for glass panel */
        .governance__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.82) 0%,
            rgba(10,15,31,0.60) 40%,
            rgba(10,15,31,0.30) 65%,
            rgba(10,15,31,0.50) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Ether-mist hairlines (distinct from yellow hairlines elsewhere) */
        .governance__hairline-top,
        .governance__hairline-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(185,160,204,0.16);
          pointer-events: none;
          z-index: 3;
        }

        .governance__hairline-top    { top: 0; }
        .governance__hairline-bottom { bottom: 0; }

        /* Content wrapper */
        .governance__content {
          position: relative;
          z-index: 4;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .governance__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .governance__content { padding: 0 24px; } }

        /* Two-column layout: copy left (55%), visual right (45%) */
        .governance__grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 960px) {
          .governance__grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* Left column: glass panel (heavier spec  --  on scene) */
        .governance__panel {
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(185,160,204,0.22);
          border-radius: var(--radius-md, 16px);
          padding: 40px;
        }

        /* Eyebrow uses ether-mist accent per spec */
        .governance__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #B9A0CC;
          opacity: 0.75;
          margin-bottom: 14px;
        }

        .governance__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .governance__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 540px;
          margin: 0 0 24px 0;
        }

        /* Scope list */
        .governance__scope-list {
          list-style: none;
          margin: 0 0 28px 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          counter-reset: scope-counter;
        }

        .governance__scope-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-display-family);
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
          counter-increment: scope-counter;
        }

        /* Gradient pill number markers.
         * Mobile audit exception: 12px retained -- number inside a 26x26 circular
         * gradient badge. Not body content; a UI ordinal marker chip. */
        .governance__scope-num {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--ax-capital-yellow, #FED607), var(--ax-node-purple, #5A1CCB));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display-family);
          font-size: 12px;
          font-variant-numeric: tabular-nums;
          color: rgba(255,255,255,0.9);
        }

        /* Scope list stagger reveal */
        .governance__scope-item:nth-child(1) { animation: govFadeUp 400ms ease 60ms  both; }
        .governance__scope-item:nth-child(2) { animation: govFadeUp 400ms ease 120ms both; }
        .governance__scope-item:nth-child(3) { animation: govFadeUp 400ms ease 180ms both; }
        .governance__scope-item:nth-child(4) { animation: govFadeUp 400ms ease 240ms both; }
        .governance__scope-item:nth-child(5) { animation: govFadeUp 400ms ease 300ms both; }

        @keyframes govFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .governance__scope-item { animation: none; opacity: 1; transform: none; }
        }

        /* Phase microcopy */
        .governance__phase {
          font-family: var(--font-body-family);
          font-size: 14px;
          font-style: italic;
          color: var(--text-tertiary, rgba(255,255,255,0.40));
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* Right column: floating quorum-ring */
        .governance__right {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* Ether-mist halo behind the ring */
        .governance__halo {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle 400px at 50% 50%,
            rgba(185,160,204,0.18) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .governance__ring {
          position: relative;
          z-index: 1;
          width: clamp(240px, 38vw, 460px);
          height: auto;
          opacity: 1 !important;
          filter: drop-shadow(0 50px 100px rgba(90,28,203,0.38));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (max-width: 960px) {
          .governance__ring {
            width: clamp(200px, 55vw, 300px);
          }
        }
      `}</style>

      <section className="governance" id="governance" aria-labelledby="governance-heading">

        {/* Scene */}
        <Image
          src="/images/r24-scene-governance-floor.webp"
          alt="" aria-hidden="true"
          fill
          sizes="100vw"
          quality={85}
          className="governance__scene"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          loading="lazy"
        />

        {/* r17-texture-grounding at 8% subliminal underlayer */}
        <Image
          src="/images/r17-texture-grounding.webp"
          alt="" aria-hidden="true"
          fill
          sizes="100vw"
          quality={50}
          className="governance__grounding"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        <div className="governance__overlay"         aria-hidden="true" />
        <div className="governance__hairline-top"    aria-hidden="true" />
        <div className="governance__hairline-bottom" aria-hidden="true" />

        <div className="governance__content">
          <div className="governance__grid">

            {/* Left column: glass panel */}
            <div className="governance__panel">
              <div className="governance__eyebrow">Governance</div>
              <h2 id="governance-heading" className="governance__h2">
                Steering is{" "}
                <span className="text-gold-gradient">earned,</span>{" "}
                not rented.
              </h2>
              <p className="governance__subhead">
                One staked token, one vote. Tokens sitting in a wallet do not steer the protocol. Only capital at stake steers capital at stake.
              </p>

              <ol className="governance__scope-list">
                {[
                  "Vault parameters",
                  "Borrower approvals",
                  "Fee structure",
                  "New vault creation",
                  "DeFi protocol selection",
                ].map((item, i) => (
                  <li key={item} className="governance__scope-item">
                    <span className="governance__scope-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>

              <p className="governance__phase">
                Governance activates in phases. Operational decisions stay with the protocol operator at launch, then move onchain as the protocol matures.
              </p>
            </div>

            {/* Right column: floating quorum-ring */}
            <div className="governance__right">
              <div className="governance__halo" aria-hidden="true" />
              <Image
                src="/images/r45-asset-governance-quorum-ring-bright-transparent.webp"
                alt="Quorum ring  --  the central symbol of the governance voting floor"
                width={460}
                height={460}
                quality={85}
                className="governance__ring"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
