"use client";
/**
 * SupplyDistribution.tsx
 *
 * Client island  --  hand-built SVG donut + legend with hover/focus interaction.
 * Justification for "use client": useState for hovered/selected segment,
 *   useId for stable SVG gradient IDs (never Math.random  --  hydration mismatch).
 *
 * Design source: appex-design.md Section 4  --  "six buckets, fixed forever"
 * Background: r18-texture-horizon.png at 18% opacity
 * SVG donut: 6 segments, brand-specific color palette, hover expands segment
 * Legend rows sync with hovered/selected segment (accent border-left)
 * Selected-segment detail text shown on hover/focus/click
 * useId() for all SVG gradient IDs  --  prevents hydration issues
 * gradientUnits="userSpaceOnUse" with explicit x1/x2 per Rev 4 anti-pattern rule
 * Area fill stop opacity floor 35-45% per Rev 4 lesson 4
 * Copy: appex.md Section 4. All numbers wiki-anchored from supply-distribution.md.
 */

import React, { useState, useId } from "react";
import Image from "next/image";

interface Allocation {
  id:      string;
  label:   string;
  pct:     number;       // percent 0-100
  tokens:  string;
  terms:   string;
  color:   string;
  detail:  string;
}

const ALLOCATIONS: Allocation[] = [
  {
    id:     "investor",
    label:  "Investor Round",
    pct:    10,
    tokens: "100,000,000",
    terms:  "6-month cliff, 18-month linear vest",
    color:  "#5A1CCB",
    detail: "Early capital. The 6-month cliff keeps investor exits behind the point where the protocol establishes initial traction.",
  },
  {
    id:     "public",
    label:  "Public",
    pct:    10,
    tokens: "100,000,000",
    terms:  "100% unlocked at TGE",
    color:  "#7A3EF0",
    detail: "Broad distribution. Fully unlocked at TGE so price discovery and trading begin on day one.",
  },
  {
    id:     "ecosystem",
    label:  "Ecosystem",
    pct:    30,
    tokens: "300,000,000",
    terms:  "25% at TGE, 75% over 36 months",
    color:  "#FED607",
    detail: "The largest bucket funds staking rewards at launch and growth programs over 36 months. Twenty-five percent unlocks at TGE to seed early liquidity; the remainder vests on a steady line.",
  },
  {
    id:     "team",
    label:  "Team and Advisors",
    pct:    15,
    tokens: "150,000,000",
    terms:  "12-month cliff, 24-month linear vest",
    color:  "#B9A0CC",
    detail: "Long alignment. A 12-month cliff followed by 24 months of linear vest. No insider exits inside the first year.",
  },
  {
    id:     "treasury",
    label:  "Treasury",
    pct:    25,
    tokens: "250,000,000",
    terms:  "12-month cliff, 36-month linear vest",
    color:  "#FAF28B",
    detail: "The longest tail. A 12-month cliff followed by 36 months of linear vest, finishing at month 48. Reserves runway for multi-year operations and an insurance backstop.",
  },
  {
    id:     "liquidity",
    label:  "Liquidity",
    pct:    10,
    tokens: "100,000,000",
    terms:  "100% unlocked at TGE",
    color:  "#C3A8AE",
    detail: "Unlocked at TGE so DEX pools open deep. Without this, price discovery breaks on thin markets.",
  },
];

// SVG donut geometry helpers
const CX = 210;
const CY = 210;
const INNER_R = 120;
const OUTER_R = 200;

function polarToCart(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

interface ArcPath {
  d:         string;
  midAngle:  number;
}

function describeArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
): ArcPath {
  const startOuter = polarToCart(cx, cy, outerR, startAngle);
  const endOuter   = polarToCart(cx, cy, outerR, endAngle);
  const startInner = polarToCart(cx, cy, innerR, endAngle);
  const endInner   = polarToCart(cx, cy, innerR, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  const d = [
    `M ${startOuter[0]} ${startOuter[1]}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${endOuter[0]} ${endOuter[1]}`,
    `L ${startInner[0]} ${startInner[1]}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${endInner[0]} ${endInner[1]}`,
    "Z",
  ].join(" ");
  return { d, midAngle: (startAngle + endAngle) / 2 };
}

export function SupplyDistribution(): React.JSX.Element {
  const [hovered, setHovered]   = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const uid                     = useId();

  const active = selected ?? hovered;

  // Build arc paths from allocation percentages
  let cumAngle = 0;
  const arcs = ALLOCATIONS.map((a) => {
    const spanAngle = (a.pct / 100) * 360;
    const arc = describeArc(CX, CY, INNER_R, OUTER_R, cumAngle, cumAngle + spanAngle);
    cumAngle += spanAngle;
    return arc;
  });

  function getSegmentTransform(idx: number): string {
    if (active !== idx) return "translate(0, 0)";
    // Expand segment 6px outward from center
    const { midAngle } = arcs[idx];
    const rad = ((midAngle - 90) * Math.PI) / 180;
    const dx = 6 * Math.cos(rad);
    const dy = 6 * Math.sin(rad);
    return `translate(${dx}, ${dy})`;
  }

  function handleSegmentClick(idx: number): void {
    setSelected(selected === idx ? null : idx);
  }

  return (
    <>
      <style>{`
        /* ---- Supply distribution  --  interactive donut ---- */
        .supply {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 1: r18-texture-horizon at 18% */
        .supply__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.18;
        }

        /* Layer 2: dark overlay */
        .supply__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.84) 0%,
            rgba(10,15,31,0.76) 60%,
            rgba(10,15,31,0.88) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: radial behind donut */
        .supply__radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle 600px at 28% 50%,
            rgba(90,28,203,0.14) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Content wrapper */
        .supply__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .supply__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .supply__content { padding: 0 24px; } }

        /* Section header */
        .supply__header {
          margin-bottom: 56px;
        }

        .supply__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
        }

        .supply__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .supply__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 720px;
          margin: 0;
        }

        /* Two-column layout */
        .supply__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 960px) {
          .supply__grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* Donut container */
        .supply__donut-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .supply__donut {
          width: 100%;
          max-width: 420px;
          height: auto;
          overflow: visible;
        }

        .supply__segment {
          cursor: pointer;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .supply__segment path {
          stroke: rgba(10,15,31,0.6);
          stroke-width: 1;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .supply__segment:focus-visible path {
          stroke: white;
          stroke-width: 2;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .supply__hint {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-tertiary, rgba(255,255,255,0.35));
          text-align: center;
        }

        /* Donut center text (positioned via SVG text elements) */

        /* Legend list */
        .supply__legend {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .supply__legend-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: start;
          gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          border-left: 3px solid transparent;
          transition: border-left-color 300ms ease, background 300ms ease, padding-left 300ms ease;
          cursor: pointer;
        }

        .supply__legend-row--active {
          border-left-color: var(--row-color, rgba(254,214,7,0.8));
          padding-left: 20px;
          background: rgba(90,28,203,0.06);
        }

        .supply__legend-swatch {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .supply__legend-mid {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .supply__legend-name {
          font-family: var(--font-display-family);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.2;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .supply__legend-terms {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-tertiary, rgba(255,255,255,0.4));
        }

        /* Detail text shown when active.
         * Mobile audit: bumped from 13px to 14px minimum. */
        .supply__legend-detail {
          grid-column: 1 / -1;
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          padding-top: 8px;
          animation: supplyDetailIn 250ms ease both;
        }

        @keyframes supplyDetailIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .supply__legend-detail { animation: none; }
        }

        .supply__legend-pct-tokens {
          text-align: right;
          flex-shrink: 0;
        }

        .supply__legend-pct {
          display: block;
          font-family: var(--font-display-family);
          font-size: 17px;
          font-variant-numeric: tabular-nums;
          line-height: 1.2;
        }

        /* Mobile audit exception: 12px retained -- tabular-nums token count in a
         * data legend row. Analogous to a chart axis annotation, not body content. */
        .supply__legend-tokens {
          display: block;
          font-family: var(--font-display-family);
          font-size: 12px;
          color: var(--text-secondary);
          font-variant-numeric: tabular-nums;
        }

        /* Footer callout */
        .supply__footer {
          margin-top: 48px;
          max-width: 840px;
          margin-left: auto;
          margin-right: auto;
          background: rgba(10,15,31,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(254,214,7,0.22);
          border-radius: var(--radius-md, 16px);
          padding: 20px 32px;
          text-align: center;
        }

        .supply__footer-text {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.6;
        }
      `}</style>

      <section className="supply" id="distribution" aria-labelledby="supply-heading">

        {/* r18-texture-horizon at 18% */}
        <Image
          src="/images/r18-texture-horizon.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="supply__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="supply__overlay" aria-hidden="true" />
        <div className="supply__radial"  aria-hidden="true" />

        <div className="supply__content">

          {/* Section header */}
          <div className="supply__header">
            <div className="supply__eyebrow">Distribution</div>
            <h2 id="supply-heading" className="supply__h2">
              Six buckets.{" "}
              <span className="text-gold-gradient">Fixed forever.</span>
            </h2>
            <p className="supply__subhead">
              Total supply is one billion tokens with no minting function. The six buckets are intentional: broad public access, sustained ecosystem funding, and a treasury tail long enough to operate through market cycles.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="supply__grid">

            {/* Left: SVG donut */}
            <div className="supply__donut-wrap">
              <svg
                className="supply__donut"
                viewBox="0 0 420 420"
                role="img"
                aria-labelledby={`${uid}-donut-title ${uid}-donut-desc`}
              >
                <title id={`${uid}-donut-title`}>$APPEX supply distribution</title>
                <desc id={`${uid}-donut-desc`}>
                  Six allocation buckets totaling one billion $APPEX tokens: Investor Round 10%, Public 10%, Ecosystem 30%, Team and Advisors 15%, Treasury 25%, Liquidity 10%.
                </desc>

                <g transform="rotate(-90 210 210)">
                  {ALLOCATIONS.map((a, i) => (
                    <g
                      key={a.id}
                      className="supply__segment"
                      style={{ transform: getSegmentTransform(i), transformOrigin: `${CX}px ${CY}px` }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${a.label}, ${a.pct}%, ${a.tokens} tokens, ${a.terms}`}
                      onMouseEnter={(): void => setHovered(i)}
                      onMouseLeave={(): void => setHovered(null)}
                      onClick={(): void => handleSegmentClick(i)}
                      onKeyDown={(e): void => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSegmentClick(i);
                        }
                      }}
                    >
                      <path
                        d={arcs[i].d}
                        fill={a.color}
                        fillOpacity={active === i ? 0.92 : 0.72}
                      />
                    </g>
                  ))}
                </g>

                {/* Center label */}
                <text
                  x={CX}
                  y={CY - 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily: "var(--font-display-family)",
                    fontSize:   "44px",
                    fontWeight: "400",
                    fill:       "#FED607",
                  }}
                >
                  1B
                </text>
                <text
                  x={CX}
                  y={CY + 22}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily:  "var(--font-body-family)",
                    fontSize:    "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fill:        "rgba(255,255,255,0.35)",
                  }}
                >
                  Total supply
                </text>
              </svg>

              <div className="supply__hint" aria-live="polite">
                {active !== null
                  ? ALLOCATIONS[active].label
                  : "Click a segment to see that allocation\u2019s role and vesting."}
              </div>
            </div>

            {/* Right: legend + allocations */}
            <ul className="supply__legend" role="list">
              {ALLOCATIONS.map((a, i) => (
                <li
                  key={a.id}
                  className={`supply__legend-row${active === i ? " supply__legend-row--active" : ""}`}
                  style={{ "--row-color": a.color } as React.CSSProperties}
                  onMouseEnter={(): void => setHovered(i)}
                  onMouseLeave={(): void => setHovered(null)}
                  onClick={(): void => handleSegmentClick(i)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected === i ? "true" : "false"}
                  aria-label={`${a.label}: ${a.pct}%, ${a.tokens} tokens, ${a.terms}`}
                  onKeyDown={(e): void => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSegmentClick(i);
                    }
                  }}
                >
                  <span
                    className="supply__legend-swatch"
                    style={{ background: a.color }}
                    aria-hidden="true"
                  />
                  <div className="supply__legend-mid">
                    <span className="supply__legend-name">{a.label}</span>
                    <span className="supply__legend-terms">{a.terms}</span>
                    {active === i && (
                      <span className="supply__legend-detail">{a.detail}</span>
                    )}
                  </div>
                  <div className="supply__legend-pct-tokens">
                    <span
                      className="supply__legend-pct text-gold-gradient"
                      style={active !== i ? { backgroundImage: "none", color: "var(--text-secondary)" } : undefined}
                    >
                      {a.pct}%
                    </span>
                    <span className="supply__legend-tokens">{a.tokens}</span>
                  </div>
                </li>
              ))}
            </ul>

          </div>

          {/* Footer callout */}
          <div className="supply__footer">
            <p className="supply__footer-text">
              275,000,000 (27.5%) circulating at TGE. Remainder unlocks over 12 to 48 months.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
