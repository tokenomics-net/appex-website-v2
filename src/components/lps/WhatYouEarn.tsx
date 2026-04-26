/**
 * WhatYouEarn.tsx
 *
 * Server Component  --  static layout, no client state.
 * Toggle removed per revision-pass-6.md §2.2: both streams visible simultaneously.
 * Justification: no event handlers, no hooks, no browser APIs needed.
 *
 * Design source: revision-pass-6.md §2.2  --  horizontal 3-column dense row
 * Background: r17-texture-calm.png at 20%
 *
 * Layout (desktop >= 1024px):
 *   Eyebrow + H2 (reduced size) + subhead above
 *   3-column triad: Stream A (left 1fr) | Convergence asset (center 1.4fr) | Stream B (right 1fr)
 *   Optional italic derivation caption below Stream B
 *
 * Vertical height: ~540-620px desktop (was ~820-960px)  --  35-45% reduction.
 * Asset: r69-asset-two-streams-converge-r5n-bright-transparent.webp in convergence column.
 * STATIC asset per Pass 6 site-wide float rule  --  only hero assets float.
 * Copy: copy/lps.md Section 2. Present tense. No em dashes.
 */

import Image from "next/image";
import type React from "react";

export function WhatYouEarn(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- What you earn  --  3-column triad (Rev Pass 6 §2.2) ---- */
        .what-earn {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 56px 0 72px;
          min-height: auto;
        }

        .what-earn__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
          opacity: 0.20;
        }

        .what-earn__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.86) 0%,
            rgba(10,15,31,0.78) 50%,
            rgba(10,15,31,0.88) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .what-earn__ambient-warm {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1200px 800px at 75% 55%,
            rgba(254,214,7,0.10) 0%,
            rgba(90,28,203,0.08) 40%,
            transparent 75%
          );
          pointer-events: none;
          z-index: 1;
        }

        .what-earn__ambient-purple {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 900px 600px at 20% 50%,
            rgba(90,28,203,0.12) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        .what-earn__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .what-earn__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .what-earn__content { padding: 0 24px; } }

        /* Section header */
        .what-earn__header {
          max-width: 720px;
          margin-bottom: 32px;
        }

        .what-earn__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .what-earn__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .what-earn__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0;
        }

        /* 3-column triad */
        .what-earn__triad {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1fr;
          gap: 32px;
          align-items: center;
          min-height: 360px;
        }

        @media (max-width: 1023px) {
          .what-earn__triad {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 24px;
          }
        }

        /* Stream column (left/right) */
        .what-earn__stream {
          display: grid;
          grid-template-rows: auto auto 1fr;
          row-gap: 12px;
        }

        /* Big stat */
        .what-earn__stat {
          font-family: var(--font-display-family);
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 400;
          line-height: 1;
          margin: 0;
          display: inline-block;
          background-image: linear-gradient(
            90deg,
            var(--ax-capital-yellow, #FED607) 0%,
            var(--ax-glint-yellow, #FAF28B)   50%,
            var(--ax-capital-yellow, #FED607) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .what-earn__stat-label {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin: 0;
        }

        .what-earn__bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .what-earn__bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .what-earn__bullet::before {
          content: '';
          flex-shrink: 0;
          width: 2px;
          height: 1em;
          margin-top: 3px;
          background: linear-gradient(180deg, var(--ax-capital-yellow, #FED607), var(--ax-node-purple, #5A1CCB));
          border-radius: 1px;
        }

        /* Derivation caption below Stream B */
        .what-earn__caption {
          margin-top: 12px;
        }

        /* Mobile audit exception: 11px retained -- italic caption/footnote below
         * a data callout. Not body content; analogous to chart footnote. */
        .what-earn__caption p {
          font-family: var(--font-body-family);
          font-size: 11px;
          font-style: italic;
          line-height: 1.55;
          color: var(--text-secondary);
          opacity: 0.65;
          margin: 0;
        }

        /* Center convergence column */
        .what-earn__convergence {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .what-earn__convergence-img {
          width: 100%;
          max-width: 340px;
          height: auto;
          filter: drop-shadow(0 30px 60px rgba(90,28,203,0.38)) drop-shadow(0 15px 30px rgba(254,214,7,0.18));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (max-width: 1023px) {
          .what-earn__convergence-img { max-width: 240px; }
        }
      `}</style>

      <section className="what-earn" id="yield" aria-labelledby="what-earn-heading">

        <Image
          src="/images/r17-texture-calm.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="what-earn__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="what-earn__overlay"        aria-hidden="true" />
        <div className="what-earn__ambient-warm"   aria-hidden="true" />
        <div className="what-earn__ambient-purple" aria-hidden="true" />

        <div className="what-earn__content">

          <div className="what-earn__header">
            <div className="what-earn__eyebrow">Two streams</div>
            <h2 id="what-earn-heading" className="what-earn__h2">
              Two streams.{" "}
              <span className="text-gold-gradient">One deposit.</span>
            </h2>
            <p className="what-earn__subhead">
              The base fee pays every LP. The protocol fee pays the LPs who stake $APPEX.
            </p>
          </div>

          {/* 3-column triad */}
          <div className="what-earn__triad">

            {/* Stream A  --  left column */}
            <div className="what-earn__stream">
              <p className="what-earn__stat">Base fee</p>
              <p className="what-earn__stat-label">Paid by borrowers on every draw</p>
              <ul className="what-earn__bullets" aria-label="Base yield highlights">
                <li className="what-earn__bullet">Negotiated per borrower. The longer the payment term, the larger the fee.</li>
                <li className="what-earn__bullet">Captured through LP token appreciation. No claim step, no gas.</li>
              </ul>
            </div>

            {/* Convergence  --  center column */}
            <div className="what-earn__convergence">
              <Image
                src="/images/r69-asset-two-streams-converge-r5n-bright-transparent.webp"
                alt="Two streams converging into one deposit"
                width={340}
                height={340}
                quality={85}
                className="what-earn__convergence-img"
                style={{ objectFit: "contain" }}
                loading="lazy"
              />
            </div>

            {/* Stream B  --  right column */}
            <div className="what-earn__stream">
              <p className="what-earn__stat">Protocol fee</p>
              <p className="what-earn__stat-label">Available to LPs who stake $APPEX</p>
              <ul className="what-earn__bullets" aria-label="Staked yield highlights">
                <li className="what-earn__bullet">Stakers earn a share of protocol fees, weighted by lock duration.</li>
                <li className="what-earn__bullet">This adds to the base fee. It does not replace it.</li>
              </ul>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}
