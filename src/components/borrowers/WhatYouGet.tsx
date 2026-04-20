"use client";
/**
 * WhatYouGet.tsx
 *
 * Client island  --  IntersectionObserver for closing row fade-up reveal.
 * Justification for "use client": useRef for scroll observer, useState for reveal state,
 *   useEffect for IntersectionObserver setup + cleanup.
 *
 * Design source: revision-pass-4.md R1.2  --  three-beat horizontal layout
 * Revision: revision-pass-6.md §3.2  --  explicit grid row heights for baseline alignment
 *           revision-pass-6.md §3.3  --  asset remap per confirmed BEATS array
 * Background: r17-texture-calm.png at 20%
 *
 * Layout: three beats horizontal on desktop, stacked on mobile.
 *   Each beat: one phrase (large) + label + one-line body + library asset.
 *   Beat 1: Draw speed  --  "Hours, not weeks."      asset: r36-asset-hours-not-weeks-transparent.webp
 *   Beat 2: Repayment  --  "Principal plus fees, one event." asset: r37-asset-repayment-return-transparent.webp
 *   Beat 3: $APPEX discount  --  "Twenty-five percent off." asset: r22-util-lower-fees-transparent.webp
 * Closing row below: comparator sentence.
 * No interactive toggle  --  borrowers have one offer.
 * Copy: copy/borrowers.md Section 2 DRAFT-v2. No wiki pills. No em dashes.
 */

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Beat {
  phrase:  string;
  label:   string;
  body:    string;
  asset:   string;
  floatDur: string;
}

const BEATS: Beat[] = [
  {
    phrase:  "Hours, not weeks.",
    label:   "From draw request to USDC release inside an approved facility.",
    body:    "Fees and terms are fixed during onboarding, so every draw inside the facility clears on the curve already agreed.",
    asset:   "/images/r36-asset-hours-not-weeks-transparent.webp",
    floatDur: "5s",
  },
  {
    phrase:  "Principal plus fees, one event.",
    label:   "When the customer pays, the borrower pays the vault. No sweeps, no weekly reconciliation.",
    body:    "No rolling-balance math. No lockbox. No ongoing covenants on the operating business.",
    asset:   "/images/r38-asset-principal-fees-bundle-transparent.webp",
    floatDur: "5.4s",
  },
  {
    phrase:  "Twenty-five percent off.",
    label:   "Pay the protocol fee in $APPEX and take the discount on every draw.",
    body:    "Protocol fees clear in USDC or $APPEX. The discount is written into the facility, not offered situationally.",
    asset:   "/images/r22-util-lower-fees-transparent.webp",
    floatDur: "5.8s",
  },
];

export function WhatYouGet(): React.JSX.Element {
  const [revealed, setRevealed] = useState<boolean>(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const el = rowRef.current;
    if (!el) return (): void => {};

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return (): void => {};
    }

    const observer = new IntersectionObserver(
      (entries): void => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return (): void => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ---- What you get  --  three-beat horizontal layout (Rev Pass 4 R1.2, Pass 6 §3.2) ---- */
        .what-get {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        .what-get__texture {
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

        .what-get__overlay {
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

        .what-get__ambient-warm {
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

        .what-get__ambient-purple {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 900px 600px at 20% 50%,
            rgba(90,28,203,0.12) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        .what-get__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .what-get__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .what-get__content { padding: 0 24px; } }

        .what-get__header {
          max-width: 720px;
          margin-bottom: 56px;
        }

        .what-get__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .what-get__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .what-get__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0;
        }

        /* Three-beat grid */
        .what-get__beats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (max-width: 1023px) {
          .what-get__beats {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Individual beat  --  explicit grid rows for baseline alignment (Pass 6 §3.2) */
        .what-get__beat {
          background: rgba(10,15,31,0.68);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(90,28,203,0.22);
          border-radius: var(--radius-md, 16px);
          padding: 32px 28px 28px;

          /* EXPLICIT ROWS  --  each track has a fixed minimum so baseline rides the same across all 3 cards */
          display: grid;
          grid-template-rows:
            120px        /* asset track  --  fixed 120px tall */
            auto         /* phrase  --  driven by content */
            48px         /* label  --  capped at 2 lines; min-height 48px reserves identical space */
            1fr;         /* body  --  fills the rest */
          row-gap: 16px;
          min-height: 360px;
        }

        @media (max-width: 1023px) {
          .what-get__beat {
            grid-template-rows: 100px auto 48px auto;
            min-height: auto;
          }
        }

        /* Beat asset  --  fixed 120px track */
        .what-get__beat-asset {
          width: clamp(80px, 10vw, 120px);
          height: auto;
          max-height: 120px;
          opacity: 1;
          filter: drop-shadow(0 16px 32px rgba(90,28,203,0.38));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
          align-self: end;
          justify-self: start;
        }

        /* Phrase  --  large scale; rides on identical baseline across all 3 cards */
        .what-get__beat-phrase {
          font-family: var(--font-display-family);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 500;
          line-height: 1.2;
          color: var(--text-primary);
          margin: 0;
          align-self: start;
        }

        /* Label  --  fixed 48px track; clamped to 2 lines */
        .what-get__beat-label {
          font-family: var(--font-body-family);
          font-size: 13px;
          line-height: 1.5;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.75;
          margin: 0;
          align-self: start;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        /* Body  --  fills remaining 1fr row */
        .what-get__beat-body {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          align-self: start;
        }

        /* Closing row comparator */
        .what-get__closing-row {
          padding: 24px 40px;
          background: rgba(90,28,203,0.08);
          border: 1px solid rgba(90,28,203,0.18);
          border-radius: var(--radius-sm, 10px);
          transition: opacity 600ms ease, transform 600ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1));
          opacity: 0;
          transform: translateY(12px);
          max-width: 780px;
          margin: 0 auto;
        }

        .what-get__closing-row--revealed {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .what-get__closing-row {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .what-get__closing-text {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          text-align: center;
        }
      `}</style>

      <section className="what-get" id="offer" aria-labelledby="what-get-heading">
        <Image
          src="/images/r17-texture-calm.png"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="what-get__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="what-get__overlay"        aria-hidden="true" />
        <div className="what-get__ambient-warm"   aria-hidden="true" />
        <div className="what-get__ambient-purple" aria-hidden="true" />

        <div className="what-get__content">

          <header className="what-get__header">
            <div className="what-get__eyebrow">What you get</div>
            <h2 id="what-get-heading" className="what-get__h2">
              One facility.{" "}
              <span className="text-gold-gradient">Every draw.</span>
            </h2>
            <p className="what-get__subhead">
              Draw against verified revenue. Repay in one event. Pay less when protocol fees settle in $APPEX.
            </p>
          </header>

          {/* Three beats */}
          <div className="what-get__beats">
            {BEATS.map((beat, i) => (
              <article
                key={i}
                className="what-get__beat"
              >
                <Image
                  src={beat.asset}
                  alt="" aria-hidden="true"
                  role="presentation"
                  width={120}
                  height={120}
                  quality={80}
                  className="what-get__beat-asset"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                />
                <p className="what-get__beat-phrase">{beat.phrase}</p>
                <p className="what-get__beat-label">{beat.label}</p>
                <p className="what-get__beat-body">{beat.body}</p>
              </article>
            ))}
          </div>

          {/* Closing row */}
          <div
            ref={rowRef}
            className={`what-get__closing-row${revealed ? " what-get__closing-row--revealed" : ""}`}
          >
            <p className="what-get__closing-text">
              Traditional receivables financing runs 10-30% per advance. appeX negotiates once per facility.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
