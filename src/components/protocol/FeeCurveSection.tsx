"use client";
/**
 * FeeCurveSection.tsx  --  REBUILT FROM SCRATCH (r19 fee curve rewrite)
 *
 * "use client" justification: useState for active card, useEffect for
 * auto-cycle interval, useRef for hover pause and restart timeout.
 *
 * SVG highlight approach: simple <rect> band + per-segment stroke toggle.
 * No area-fill path. No CSS 'd' transitions. Each segment is independent.
 *
 * Design source: protocol-design.md Rev 4 Section 4
 * Background: r23-scene-yield-curve.webp at 100% + tint overlay
 * Copy: PRESENT TENSE. No em dashes.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface FeeTier {
  id:          string;
  term:        string;
  rate:        string;
  description: string;
  context:     string;
}

const FEE_TIERS: FeeTier[] = [
  {
    id:          "net-30",
    term:        "Net-30",
    rate:        "~5%",
    description: "LP yield fee",
    context:     "Fastest turn. Shortest exposure.",
  },
  {
    id:          "net-60",
    term:        "Net-60",
    rate:        "~7%",
    description: "LP yield fee",
    context:     "Standard manufacturer cycle.",
  },
  {
    id:          "net-120",
    term:        "Net-120",
    rate:        "~12%",
    description: "LP yield fee",
    context:     "Publisher-grade duration.",
  },
  {
    id:          "net-180",
    term:        "Net-180",
    rate:        "~15%",
    description: "LP yield fee",
    context:     "Maximum term. Top of the curve.",
  },
];

// ViewBox: 0 0 800 200
// 4 data points, always ascending
const PTS = [
  { x: 100, y: 170 },
  { x: 300, y: 140 },
  { x: 500, y:  80 },
  { x: 700, y:  30 },
];

// Cubic bezier segment between two consecutive points
function segPath(i: number): string {
  const p0 = PTS[i];
  const p1 = PTS[i + 1];
  const cpX = (p0.x + p1.x) / 2;
  return `M ${p0.x} ${p0.y} C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
}

// Full curve for the dim background reference line
function fullCurvePath(): string {
  let d = `M ${PTS[0].x} ${PTS[0].y}`;
  for (let i = 0; i < PTS.length - 1; i++) {
    const p0 = PTS[i];
    const p1 = PTS[i + 1];
    const cpX = (p0.x + p1.x) / 2;
    d += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

// X-band bounds for the active card highlight rect
// Band spans from the midpoint before the point to the midpoint after it
function bandBounds(idx: number): { x: number; width: number } {
  const prev = idx > 0 ? (PTS[idx - 1].x + PTS[idx].x) / 2 : PTS[0].x - 40;
  const next = idx < PTS.length - 1 ? (PTS[idx].x + PTS[idx + 1].x) / 2 : PTS[PTS.length - 1].x + 40;
  return { x: prev, width: next - prev };
}

const AUTO_CYCLE_MS    = 5000;
const RESTART_DELAY_MS = 10000;

export function FeeCurveSection(): React.JSX.Element {
  const [activeCard, setActiveCard]  = useState<number>(0);
  const autoRef      = useRef<ReturnType<typeof setInterval>  | null>(null);
  const restartRef   = useRef<ReturnType<typeof setTimeout>   | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  const clearAuto = useCallback((): void => {
    if (autoRef.current)    clearInterval(autoRef.current);
    if (restartRef.current) clearTimeout(restartRef.current);
  }, []);

  const startAuto = useCallback((): void => {
    autoRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        setActiveCard(prev => (prev + 1) % FEE_TIERS.length);
      }
    }, AUTO_CYCLE_MS);
  }, []);

  useEffect(() => {
    startAuto();
    return clearAuto;
  }, [startAuto, clearAuto]);

  const handleCardClick = useCallback((idx: number): void => {
    clearAuto();
    setActiveCard(idx);
    restartRef.current = setTimeout(() => { startAuto(); }, RESTART_DELAY_MS);
  }, [clearAuto, startAuto]);

  const handleMouseEnter = useCallback((): void => { isHoveredRef.current = true;  }, []);
  const handleMouseLeave = useCallback((): void => { isHoveredRef.current = false; }, []);

  const band = bandBounds(activeCard);

  return (
    <>
      <style>{`
        /* ---- Fee curve section (rebuilt) ---- */
        .fee-curve {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
          padding: 80px 0;
        }

        @media (max-width: 767px) {
          .fee-curve { padding: 48px 0; }
        }

        /* Scene: r23-scene-yield-curve.webp at 100% */
        .fee-curve__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
        }

        /* Tint overlay */
        .fee-curve__tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.45) 0%,
            rgba(10,15,31,0.30) 50%,
            rgba(10,15,31,0.45) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Purple crown for continuity with adjacent sections */
        .fee-curve__crown {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1200px 400px at 50% 0%, rgba(90,28,203,0.10) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* Top hairline */
        .fee-curve__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.16);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .fee-curve__content {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 767px) {
          .fee-curve__content { padding: 0 24px; }
        }

        /* Header */
        .fee-curve__header {
          text-align: center;
          margin-bottom: 48px;
        }

        /* Mobile audit: opacity bumped from 0.55 to 0.80 -- 14px at 55% reads as
         * ~9px effective visual contrast on small screens. */
        .fee-curve__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.80;
          margin-bottom: 14px;
        }

        .fee-curve__heading {
          font-family: var(--font-display-family);
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .fee-curve__subhead {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 580px;
          margin: 0 auto;
        }

        /* SVG container */
        .fee-curve__svg-wrap {
          position: relative;
          margin-bottom: 0;
        }

        .fee-curve__svg {
          width: 100%;
          display: block;
          overflow: visible;
        }

        /* Axis labels */
        .fee-curve__y-label {
          font-family: var(--font-display-family);
          font-size: 14px;
          fill: rgba(255,255,255,0.45);
        }

        .fee-curve__x-label {
          font-family: var(--font-display-family);
          font-size: 14px;
          fill: rgba(255,255,255,0.45);
          text-anchor: middle;
        }

        .fee-curve__tick-label {
          font-family: var(--font-display-family);
          font-size: 14px;
          fill: rgba(255,255,255,0.45);
          text-anchor: end;
        }

        /* Active tick: bright gold */
        .fee-curve__tick-label--active {
          fill: var(--ax-capital-yellow);
          opacity: 0.9;
        }

        /* Segment transitions  --  stroke and opacity only, no path shape animation */
        .fee-curve__segment {
          transition: stroke-width 300ms ease, opacity 300ms ease;
        }

        /* Highlight band: simple rect, transitions on x/width via CSS won't work in SVG,
           so we let React re-render it  --  keeps it simple and reliable */
        .fee-curve__band {
          transition: opacity 300ms ease;
        }

        /* Cards grid */
        .fee-curve__cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 32px;
        }

        @media (max-width: 767px) {
          .fee-curve__cards { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile audit: explicit 1-col at iPhone SE width (<400px).
         * 2-up at 375px is too cramped on the SE breakpoint. */
        @media (max-width: 399px) {
          .fee-curve__cards { grid-template-columns: 1fr; }
        }

        /* Glass card */
        .fee-card {
          position: relative;
          background: rgba(10,15,31,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(90,28,203,0.20);
          border-radius: var(--radius-md);
          padding: 24px;
          cursor: pointer;
          transition: border-color 300ms cubic-bezier(0.16,1,0.3,1),
                      background 300ms cubic-bezier(0.16,1,0.3,1),
                      box-shadow 300ms cubic-bezier(0.16,1,0.3,1),
                      transform 300ms cubic-bezier(0.16,1,0.3,1);
          animation: axFadeUp 400ms var(--ease-enter) both;
          overflow: hidden;
          text-align: left;
        }

        /* Texture overlay via ::before */
        .fee-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("/images/r18-texture-weight.webp");
          background-size: cover;
          background-position: center;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
          border-radius: var(--radius-md);
        }

        .fee-card__inner {
          position: relative;
          z-index: 1;
        }

        .fee-card:nth-child(1) { animation-delay:   0ms; }
        .fee-card:nth-child(2) { animation-delay:  80ms; }
        .fee-card:nth-child(3) { animation-delay: 160ms; }
        .fee-card:nth-child(4) { animation-delay: 240ms; }

        @media (prefers-reduced-motion: reduce) {
          .fee-card { animation: none; opacity: 1; transform: none; }
        }

        .fee-card:hover:not(.fee-card--active) {
          border-color: rgba(90,28,203,0.40);
          transform: translateY(-2px);
        }

        .fee-card--active {
          border-color: rgba(254,214,7,0.45);
          background: rgba(10,15,31,0.78);
          box-shadow:
            0 0 24px rgba(254,214,7,0.12),
            0 4px 16px rgba(0,0,0,0.30);
          transform: translateY(-3px);
        }

        .fee-card:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .fee-card__term {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          transition: color 300ms;
          margin-bottom: 8px;
        }

        .fee-card__rate {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 400;
          line-height: 1.1;
          transition: color 300ms;
          margin-bottom: 4px;
        }

        .fee-card__rate--active   { color: var(--ax-capital-yellow); }
        .fee-card__rate--inactive { color: var(--text-primary); }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .fee-card__desc {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }

        .fee-card__context {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Stat callout box */
        .fee-curve__callout {
          max-width: 640px;
          margin: 40px auto 0;
          background: rgba(10,15,31,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          padding: 24px 32px;
          text-align: center;
        }

        .fee-curve__callout-stat {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 400;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .fee-curve__callout-label {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .fee-curve__callout-sub {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-tertiary);
          font-style: italic;
        }

        /* Mobile audit exception: 12px retained -- italic legal disclaimer below
         * the curve chart, equivalent to an SVG footnote annotation. Not content. */
        .fee-curve__disclaimer {
          font-family: var(--font-body-family);
          font-size: 12px;
          font-style: italic;
          color: var(--text-secondary);
          text-align: center;
          margin-top: 12px;
          opacity: 0.6;
        }
      `}</style>

      <section
        className="fee-curve"
        id="fee-curve"
        aria-labelledby="fee-curve-heading"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Scene image */}
        <Image
          src="/images/r23-scene-yield-curve.webp"
          alt="" aria-hidden="true"
          fill
          className="fee-curve__scene"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        <div className="fee-curve__tint"     aria-hidden="true" />
        <div className="fee-curve__crown"    aria-hidden="true" />
        <div className="fee-curve__hairline" aria-hidden="true" />

        <div className="fee-curve__content">
          {/* Header */}
          <div className="fee-curve__header">
            <div className="fee-curve__eyebrow">Fee structure</div>
            <h2 id="fee-curve-heading" className="fee-curve__heading">
              LP yield scales with{" "}
              <span className="text-gold-gradient">payment term.</span>
            </h2>
            <p className="fee-curve__subhead">
              Longer terms lock capital for more time. Longer lockup earns a higher fee.
              Every rate is negotiated per borrower based on risk, volume, and agreement terms.
            </p>
          </div>

          {/* SVG curve visualization */}
          <div
            className="fee-curve__svg-wrap"
            aria-label="LP yield fee curve ascending from Net-30 at 5% to Net-180 at 15%"
          >
            <svg
              className="fee-curve__svg"
              viewBox="-60 -20 920 260"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
            >
              <defs>
                {/* Stroke gradient: purple to yellow */}
                <linearGradient id="fcStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#5A1CCB" />
                  <stop offset="100%" stopColor="#FED607" />
                </linearGradient>

                {/* Active segment glow filter */}
                <filter id="fcGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Highlight band gradient: vertical, subtle */}
                <linearGradient id="fcBandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#FED607" stopOpacity="0.14" />
                  <stop offset="60%"  stopColor="#5A1CCB" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#5A1CCB" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Axes */}
              <line x1="100" y1="185" x2="700" y2="185" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
              <line x1="100" y1="10"  x2="100" y2="185" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

              {/* Y-axis label (rotated) */}
              <text
                transform="rotate(-90, 55, 107)"
                x="55" y="107"
                className="fee-curve__y-label"
                textAnchor="middle"
                fontSize="13"
              >
                LP Yield
              </text>

              {/* Y-axis tick labels  --  highlight active */}
              <text x="92" y="174" className={`fee-curve__tick-label${activeCard === 0 ? " fee-curve__tick-label--active" : ""}`}>5%</text>
              <text x="92" y="144" className={`fee-curve__tick-label${activeCard === 1 ? " fee-curve__tick-label--active" : ""}`}>7%</text>
              <text x="92" y="84"  className={`fee-curve__tick-label${activeCard === 2 ? " fee-curve__tick-label--active" : ""}`}>12%</text>
              <text x="92" y="34"  className={`fee-curve__tick-label${activeCard === 3 ? " fee-curve__tick-label--active" : ""}`}>15%</text>

              {/* Highlight band: simple rect behind active data point */}
              <rect
                className="fee-curve__band"
                x={band.x}
                y={10}
                width={band.width}
                height={175}
                fill="url(#fcBandGrad)"
                rx="4"
              />

              {/* Full background reference curve (always visible, thin, muted) */}
              <path
                d={fullCurvePath()}
                stroke="rgba(90,28,203,0.18)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Per-segment paths: 3 segments between 4 points */}
              {[0, 1, 2].map((si) => {
                const isActive = si === activeCard || si === activeCard - 1;
                const isPast   = si < activeCard;
                return (
                  <path
                    key={si}
                    d={segPath(si)}
                    className="fee-curve__segment"
                    stroke={isPast || isActive ? "url(#fcStroke)" : "rgba(90,28,203,0.22)"}
                    strokeWidth={si === activeCard - 1 || si === activeCard ? 4 : 2}
                    fill="none"
                    strokeLinecap="round"
                    filter={si === activeCard ? "url(#fcGlow)" : undefined}
                    style={{ opacity: isPast || isActive ? 1 : 0.35 }}
                  />
                );
              })}

              {/* Data point dots  --  4 dots, one per tier */}
              {PTS.map((pt, i) => (
                <g key={i}>
                  {/* Glow ring on active dot */}
                  {i === activeCard && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="10"
                      fill="rgba(254,214,7,0.15)"
                      stroke="rgba(254,214,7,0.30)"
                      strokeWidth="1"
                    />
                  )}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={i === activeCard ? 6 : 4}
                    fill={i === activeCard ? "#FED607" : (i < activeCard ? "#5A1CCB" : "rgba(90,28,203,0.35)")}
                    stroke={i === activeCard ? "rgba(254,214,7,0.50)" : "none"}
                    strokeWidth="2"
                    style={{ transition: "r 300ms ease, fill 300ms ease" }}
                  />
                </g>
              ))}

              {/* X-axis labels */}
              <text x="100" y="205" className="fee-curve__x-label">Net-30</text>
              <text x="300" y="205" className="fee-curve__x-label">Net-60</text>
              <text x="500" y="205" className="fee-curve__x-label">Net-120</text>
              <text x="700" y="205" className="fee-curve__x-label">Net-180</text>
            </svg>
          </div>

          {/* Fee tier cards */}
          <div className="fee-curve__cards" role="group" aria-label="Fee tier selection">
            {FEE_TIERS.map((tier, i) => (
              <button
                key={tier.id}
                className={`fee-card${activeCard === i ? " fee-card--active" : ""}`}
                onClick={() => { handleCardClick(i); }}
                type="button"
                aria-pressed={activeCard === i ? "true" : "false"}
              >
                <div className="fee-card__inner">
                  <div
                    className="fee-card__term"
                    style={{ color: activeCard === i ? "var(--ax-capital-yellow)" : "var(--text-secondary)" }}
                  >
                    {tier.term}
                  </div>
                  <div className={`fee-card__rate ${activeCard === i ? "fee-card__rate--active" : "fee-card__rate--inactive"}`}>
                    {tier.rate}
                  </div>
                  <div className="fee-card__desc">{tier.description}</div>
                  <div className="fee-card__context">{tier.context}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Stat callout  --  velocity example + disclaimer inside glass card */}
          <div className="fee-curve__callout">
            <div className="fee-curve__callout-stat text-gold-gradient">~4x</div>
            <p className="fee-curve__callout-label">
              capital turns per year at 90-day average terms
            </p>
            <p className="fee-curve__callout-sub">
              Rates vary by utilization, term mix, and market conditions.
            </p>
            <p className="fee-curve__disclaimer">
              Rates vary per borrower based on risk, volume, and negotiated agreement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
