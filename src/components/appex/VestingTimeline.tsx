"use client";
/**
 * VestingTimeline.tsx
 *
 * Client island  --  stacked area chart for $APPEX vesting schedule.
 * Justification for "use client": useId for SVG gradient IDs (hydration safety),
 *   useRef + useEffect for IntersectionObserver scroll-triggered reveal,
 *   useState for tooltip, useCallback for mouse handlers.
 *
 * Design source: appex-revision-round-1.md §4 (stacked area chart rewrite)
 * Chart: 6 stacked area bands, X = months 0-48, Y = tokens 0-1B
 * Palette matches SupplyDistribution.tsx donut exactly (same hex values)
 * Stack order: day-one-available at base, long-cliff at top
 * Overflow fix: remove overflow-x: auto from svg-wrap on desktop (was causing
 *   visible scrollbar at 1280-1440px); use overflow: visible on >=768px
 * gradientUnits="userSpaceOnUse" per Rev 4 lesson 4
 * useId() for all gradient IDs  --  no Math.random()
 * 14px minimum axis labels per Rev 4 rule
 * Hidden <table> for screen reader parity
 * Copy: appex.md Section 5. No em dashes.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useId,
  useCallback,
} from "react";
import Image from "next/image";

// ---- Palette: matches SupplyDistribution donut EXACTLY ----
// Stack order (bottom to top): day-one-available first, long-cliff last.
// Colors lifted verbatim from SupplyDistribution.tsx ALLOCATIONS array.

interface BucketSpec {
  id:       string;
  name:     string;
  totalM:   number;   // total tokens in millions
  color:    string;   // fill/stroke hex  --  must match donut
  // Vesting rule: returns tokens unlocked (millions) at a given month
  unlocked: (month: number) => number;
}

const BUCKETS: BucketSpec[] = [
  {
    id:     "public",
    name:   "Public",
    totalM: 100,
    color:  "#7A3EF0",   // matches donut "public" segment
    unlocked: (_m) => 100,  // 100% at TGE
  },
  {
    id:     "liquidity",
    name:   "Liquidity",
    totalM: 100,
    color:  "#C3A8AE",   // matches donut "liquidity" segment
    unlocked: (_m) => 100,  // 100% at TGE
  },
  {
    id:     "ecosystem",
    name:   "Ecosystem",
    totalM: 300,
    color:  "#FED607",   // matches donut "ecosystem" segment
    unlocked: (m) => {
      // 25% at TGE (75M), then linear to 300M over 36 months, held at 300 after
      if (m >= 36) return 300;
      return 75 + (225 / 36) * m;
    },
  },
  {
    id:     "investor",
    name:   "Investor Round",
    totalM: 100,
    color:  "#B9A0CC",   // matches donut "investor" segment
    unlocked: (m) => {
      // 6-month cliff, then linear 0->100 over 18 months (months 6-24), held at 100
      if (m < 6)  return 0;
      if (m >= 24) return 100;
      return (100 / 18) * (m - 6);
    },
  },
  {
    id:     "team",
    name:   "Team and Advisors",
    totalM: 150,
    color:  "#7A3BD9",   // matches donut "team" segment -- note: donut uses #7A3EF0 for public;
    // team uses a slightly different purple. Keeping exact value from SupplyDistribution.
    unlocked: (m) => {
      // 12-month cliff, linear 0->150 over 24 months (months 12-36), held at 150
      if (m < 12)  return 0;
      if (m >= 36) return 150;
      return (150 / 24) * (m - 12);
    },
  },
  {
    id:     "treasury",
    name:   "Treasury",
    totalM: 250,
    color:  "#5A1CCB",   // matches donut "treasury" segment
    unlocked: (m) => {
      // 12-month cliff, linear 0->250 over 36 months (months 12-48)
      if (m < 12)  return 0;
      if (m >= 48) return 250;
      return (250 / 36) * (m - 12);
    },
  },
];

// Chart geometry  --  matches AD spec viewBox "0 0 1200 520"
const SVG_W        = 1200;
const SVG_H        = 520;
const PLOT_X       = 80;
const PLOT_Y       = 40;
const PLOT_W       = 1080;
const PLOT_H       = 400;
const TOTAL_MONTHS = 48;
const TOTAL_M      = 1000; // 1B tokens in millions

const Y_TICKS = [0, 200, 400, 600, 800, 1000];
const X_TICKS = [0, 6, 12, 18, 24, 30, 36, 42, 48];

function monthToX(m: number): number {
  return PLOT_X + (m / TOTAL_MONTHS) * PLOT_W;
}

function valueToY(v: number): number {
  return PLOT_Y + PLOT_H - (v / TOTAL_M) * PLOT_H;
}

// Build 49-point stacked data matrix [month 0..48][bucket 0..5]
// Each entry is the CUMULATIVE y-value from bottom of stack up to and including this bucket
function buildStackedData(): number[][] {
  const rows: number[][] = [];
  for (let m = 0; m <= 48; m++) {
    let cumulative = 0;
    const row: number[] = [];
    for (const bucket of BUCKETS) {
      cumulative += bucket.unlocked(m);
      row.push(cumulative);
    }
    rows.push(row);
  }
  return rows;
}

// Build SVG path for a stacked band.
// topEdge: cumulative values at each month for this band's top edge
// bottomEdge: cumulative values at each month for this band's bottom edge (or 0 for base)
function buildAreaPath(topEdge: number[], bottomEdge: number[]): string {
  // Forward along top edge (left to right)
  const topPts = topEdge.map((v, i) => `${monthToX(i).toFixed(1)},${valueToY(v).toFixed(1)}`);
  // Backward along bottom edge (right to left) to close the shape
  const botPts = [...bottomEdge].reverse().map((v, i) => {
    const mIdx = 48 - i;
    return `${monthToX(mIdx).toFixed(1)},${valueToY(v).toFixed(1)}`;
  });
  return `M ${topPts[0]} L ${topPts.slice(1).join(" L ")} L ${botPts[0]} L ${botPts.slice(1).join(" L ")} Z`;
}

interface TooltipState {
  visible: boolean;
  x:       number;   // SVG x coordinate of vertical marker
  month:   number;
  values:  number[]; // per-bucket token counts at this month (millions)
  total:   number;
}

export function VestingTimeline(): React.JSX.Element {
  const uid               = useId();
  const [revealed, setRevealed]   = useState<boolean>(false);
  const [tooltip, setTooltip]     = useState<TooltipState>({
    visible: false, x: 0, month: 0, values: [], total: 0,
  });
  const wrapRef           = useRef<HTMLDivElement>(null);
  const svgRef            = useRef<SVGSVGElement>(null);

  // Precompute stacked data
  const stackedData = React.useMemo(() => buildStackedData(), []);

  // Scroll-triggered reveal
  useEffect((): (() => void) => {
    const wrap = wrapRef.current;
    if (!wrap) return (): void => {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(wrap);
    return (): void => observer.disconnect();
  }, []);

  // Mouse move on SVG: show vertical tooltip
  const handleSvgMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>): void => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * SVG_W;
    // Map svgX to month
    const rawMonth = ((svgX - PLOT_X) / PLOT_W) * TOTAL_MONTHS;
    const month = Math.max(0, Math.min(48, Math.round(rawMonth)));
    const bucketValues = BUCKETS.map((b) => b.unlocked(month));
    const total = bucketValues.reduce((a, b) => a + b, 0);
    setTooltip({
      visible: svgX >= PLOT_X && svgX <= PLOT_X + PLOT_W,
      x: monthToX(month),
      month,
      values: bucketValues,
      total,
    });
  }, []);

  const handleSvgMouseLeave = useCallback((): void => {
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  // Build area paths
  const areaPaths = React.useMemo(() => {
    return BUCKETS.map((_, bIdx) => {
      const topEdge    = stackedData.map((row) => row[bIdx]);
      const bottomEdge = bIdx === 0
        ? new Array(49).fill(0) as number[]
        : stackedData.map((row) => row[bIdx - 1]);
      return buildAreaPath(topEdge, bottomEdge);
    });
  }, [stackedData]);

  // Tooltip x position clamped to chart bounds + flipped when near right edge
  const tooltipFlipped = tooltip.x > PLOT_X + PLOT_W * 0.7;

  return (
    <>
      <style>{`
        /* ---- Vesting stacked area chart ---- */
        .vesting {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        .vesting__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.18;
        }

        .vesting__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.84) 0%,
            rgba(10,15,31,0.80) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .vesting__wash {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(254,214,7,0.05) 0%,
            transparent 40%
          );
          pointer-events: none;
          z-index: 1;
        }

        .vesting__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .vesting__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .vesting__content { padding: 0 24px; } }

        .vesting__header { margin-bottom: 48px; }

        .vesting__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
        }

        .vesting__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .vesting__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 720px;
          margin: 0;
        }

        /* SVG wrapper  --  overflow FIX:
         * overflow: visible on desktop prevents sub-pixel scrollbar artifact.
         * overflow-x: auto only on mobile where min-width scroll is needed.
         * Mobile audit: ::after pseudo-element adds right-edge fade-gradient
         * scroll affordance so iOS users can tell the chart scrolls. */
        .vesting__svg-wrap {
          position: relative;
          width: 100%;
          overflow: visible;
          scrollbar-width: none;
        }

        .vesting__svg-wrap::-webkit-scrollbar { display: none; }

        @media (max-width: 767px) {
          .vesting__svg-wrap {
            overflow-x: auto;
          }

          /* Right-edge fade -- signals horizontal scroll affordance */
          .vesting__svg-wrap::after {
            content: '';
            position: sticky;
            right: 0;
            top: 0;
            display: block;
            width: 48px;
            height: 100%;
            margin-left: auto;
            margin-top: -100%;
            pointer-events: none;
            background: linear-gradient(90deg, transparent 0%, var(--ax-fortress, #0A0F1F) 100%);
            flex-shrink: 0;
          }
        }

        .vesting__svg {
          display: block;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          cursor: crosshair;
        }

        @media (max-width: 767px) {
          .vesting__svg { min-width: 560px; }
        }

        /* Band reveal animation: clip-path left-to-right */
        .vesting__band {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 900ms ease-out;
        }

        .vesting__band--revealed {
          clip-path: inset(0 0% 0 0);
        }

        /* Per-band stagger via CSS custom prop */
        .vesting__band:nth-child(1) { transition-delay: var(--band-delay-0, 0ms); }
        .vesting__band:nth-child(2) { transition-delay: var(--band-delay-1, 120ms); }
        .vesting__band:nth-child(3) { transition-delay: var(--band-delay-2, 240ms); }
        .vesting__band:nth-child(4) { transition-delay: var(--band-delay-3, 360ms); }
        .vesting__band:nth-child(5) { transition-delay: var(--band-delay-4, 480ms); }
        .vesting__band:nth-child(6) { transition-delay: var(--band-delay-5, 600ms); }

        @media (prefers-reduced-motion: reduce) {
          .vesting__band {
            clip-path: none !important;
            transition: none !important;
          }
        }

        /* Legend */
        .vesting__legend {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 24px;
          padding: 0;
          list-style: none;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .vesting__legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body-family);
          font-size: 14px;
          color: rgba(255,255,255,0.85);
        }

        .vesting__legend-swatch {
          width: 16px;
          height: 10px;
          border-radius: 2px;
          flex-shrink: 0;
          opacity: 0.70;
        }

        @media (max-width: 767px) {
          .vesting__legend { gap: 12px 20px; }
        }

        /* Footer callout */
        .vesting__footer {
          margin-top: 48px;
          max-width: 840px;
          margin-left: auto;
          margin-right: auto;
          background: rgba(10,15,31,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(90,28,203,0.20);
          border-radius: var(--radius-md, 16px);
          padding: 20px 32px;
          text-align: center;
        }

        .vesting__footer-text {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-primary);
        }

        /* Visually hidden table */
        .vesting__sr-table {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
        }
      `}</style>

      <section className="vesting" id="vesting" aria-labelledby="vesting-heading">

        <Image
          src="/images/r17-texture-rhythm.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="vesting__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="vesting__overlay" aria-hidden="true" />
        <div className="vesting__wash"    aria-hidden="true" />

        <div className="vesting__content">

          <div className="vesting__header">
            <div className="vesting__eyebrow">Vesting calendar</div>
            <h2 id="vesting-heading" className="vesting__h2">
              48 months from start to{" "}
              <span className="text-gold-gradient">finish.</span>
            </h2>
            <p className="vesting__subhead">
              Public and Liquidity unlock at launch so markets have depth from day one. Team and Treasury carry the longest cliffs so core operators stay aligned with multi-year outcomes.
            </p>
          </div>

          {/* Stacked area chart */}
          <div ref={wrapRef} className="vesting__svg-wrap">
            <svg
              ref={svgRef}
              className="vesting__svg"
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              role="img"
              aria-labelledby={`${uid}-vest-title ${uid}-vest-desc`}
              onMouseMove={handleSvgMouseMove}
              onMouseLeave={handleSvgMouseLeave}
            >
              <defs>
                {/* Per-bucket vertical area gradients  --  userSpaceOnUse per Rev 4 */}
                {BUCKETS.map((bucket, bIdx) => {
                  const topCumulative   = stackedData.map((row) => row[bIdx]);
                  const bottomCumulative = bIdx === 0
                    ? new Array(49).fill(0) as number[]
                    : stackedData.map((row) => row[bIdx - 1]);
                  // Y range of this band at month 48 (its final state = tallest)
                  const yTop    = valueToY(topCumulative[48]);
                  const yBottom = valueToY(bottomCumulative[48]);
                  return (
                    <linearGradient
                      key={`${uid}-grad-${bIdx}`}
                      id={`${uid}-grad-${bIdx}`}
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      y1={yTop}
                      x2="0"
                      y2={yBottom}
                    >
                      <stop offset="0%"   stopColor={bucket.color} stopOpacity="0.55" />
                      <stop offset="100%" stopColor={bucket.color} stopOpacity="0.35" />
                    </linearGradient>
                  );
                })}
              </defs>

              <title id={`${uid}-vest-title`}>$APPEX stacked vesting schedule</title>
              <desc id={`${uid}-vest-desc`}>
                Stacked area chart showing cumulative token supply from month 0 to 48.
                At TGE (month 0): 275M circulating (Public 100M, Ecosystem 75M, Liquidity 100M).
                By month 12: cliffs end for Investor, Team, and Treasury.
                By month 36: Ecosystem fully unlocked at 300M.
                By month 48: all 1 billion tokens unlocked.
              </desc>

              {/* Horizontal grid lines */}
              {Y_TICKS.map((v) => (
                <line
                  key={`grid-${v}`}
                  x1={PLOT_X}
                  y1={valueToY(v)}
                  x2={PLOT_X + PLOT_W}
                  y2={valueToY(v)}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              ))}

              {/* Total supply cap dashed line at 1B */}
              <line
                x1={PLOT_X}
                y1={valueToY(1000)}
                x2={PLOT_X + PLOT_W}
                y2={valueToY(1000)}
                stroke="rgba(254,214,7,0.40)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={PLOT_X + PLOT_W - 4}
                y={valueToY(1000) - 6}
                textAnchor="end"
                fill="rgba(254,214,7,0.70)"
                fontFamily="var(--font-body-family)"
                fontSize="13"
              >
                1B total supply
              </text>

              {/* Stacked area bands */}
              {BUCKETS.map((bucket, bIdx) => (
                <path
                  key={`band-${bIdx}`}
                  d={areaPaths[bIdx]}
                  fill={`url(#${uid}-grad-${bIdx})`}
                  stroke={bucket.color}
                  strokeWidth="1"
                  strokeOpacity="0.75"
                  className={`vesting__band${revealed ? " vesting__band--revealed" : ""}`}
                  style={{ "--band-delay": `${bIdx * 120}ms` } as React.CSSProperties}
                />
              ))}

              {/* Y-axis labels  --  14px minimum per Rev 4 */}
              {Y_TICKS.map((v) => (
                <text
                  key={`ylabel-${v}`}
                  x={PLOT_X - 10}
                  y={valueToY(v) + 5}
                  textAnchor="end"
                  fill="rgba(255,255,255,0.50)"
                  fontFamily="var(--font-body-family)"
                  fontSize="14"
                >
                  {v === 0 ? "0" : `${v}M`}
                </text>
              ))}

              {/* Y-axis title */}
              <text
                x={PLOT_X - 54}
                y={PLOT_Y + PLOT_H / 2}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontFamily="var(--font-body-family)"
                fontSize="14"
                transform={`rotate(-90, ${PLOT_X - 54}, ${PLOT_Y + PLOT_H / 2})`}
              >
                Tokens (M)
              </text>

              {/* X-axis labels  --  14px minimum per Rev 4 */}
              {X_TICKS.map((m) => (
                <text
                  key={`xlabel-${m}`}
                  x={monthToX(m)}
                  y={PLOT_Y + PLOT_H + 22}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.50)"
                  fontFamily="var(--font-body-family)"
                  fontSize="14"
                >
                  {m === 0 ? "TGE" : `M${m}`}
                </text>
              ))}

              {/* X-axis title */}
              <text
                x={PLOT_X + PLOT_W / 2}
                y={PLOT_Y + PLOT_H + 50}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontFamily="var(--font-body-family)"
                fontSize="14"
              >
                Months from TGE
              </text>

              {/* Tooltip vertical marker */}
              {tooltip.visible && (
                <g>
                  <line
                    x1={tooltip.x}
                    y1={PLOT_Y}
                    x2={tooltip.x}
                    y2={PLOT_Y + PLOT_H}
                    stroke="rgba(254,214,7,0.50)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Tooltip card  --  foreignObject for HTML styling */}
                  <foreignObject
                    x={tooltipFlipped ? tooltip.x - 200 : tooltip.x + 10}
                    y={PLOT_Y + 8}
                    width="188"
                    height={160 + BUCKETS.length * 18}
                    style={{ pointerEvents: "none" }}
                  >
                    <div
                      style={{
                        background: "rgba(10,15,31,0.94)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(254,214,7,0.24)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontFamily: "var(--font-body-family)",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.90)",
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 8, color: "var(--ax-capital-yellow, #FED607)" }}>
                        {tooltip.month === 0 ? "TGE (Month 0)" : `Month ${tooltip.month}`}
                      </div>
                      {BUCKETS.map((b, i) => (
                        <div key={b.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.70)" }}>
                            <span style={{ width: 8, height: 8, borderRadius: 2, background: b.color, display: "inline-block", opacity: 0.8 }} />
                            {b.name.length > 10 ? b.name.substring(0, 10) + "..." : b.name}
                          </span>
                          <span>{Math.round(tooltip.values[i])}M</span>
                        </div>
                      ))}
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: 6, paddingTop: 6, fontWeight: 700 }}>
                        <span style={{ color: "rgba(255,255,255,0.70)" }}>Total: </span>
                        {Math.round(tooltip.total)}M ({((tooltip.total / 1000) * 100).toFixed(1)}%)
                      </div>
                    </div>
                  </foreignObject>
                </g>
              )}
            </svg>
          </div>

          {/* Legend  --  stack order top-to-bottom = Treasury first (top of chart) */}
          <ul className="vesting__legend" aria-label="Vesting schedule legend">
            {[...BUCKETS].reverse().map((bucket) => (
              <li key={bucket.id} className="vesting__legend-item">
                <span
                  className="vesting__legend-swatch"
                  style={{ background: bucket.color }}
                  aria-hidden="true"
                />
                {bucket.name}
              </li>
            ))}
          </ul>

          {/* Footer callout */}
          <div className="vesting__footer">
            <p className="vesting__footer-text">
              Circulating at TGE: 275M (27.5%). All figures from supply-distribution wiki.
            </p>
          </div>

          {/* Screen-reader accessible table */}
          <table className="vesting__sr-table" aria-label="$APPEX vesting schedule data">
            <caption>Token unlock schedule by allocation bucket at key milestones</caption>
            <thead>
              <tr>
                <th scope="col">Bucket</th>
                <th scope="col">At TGE (M0)</th>
                <th scope="col">At M12</th>
                <th scope="col">At M24</th>
                <th scope="col">At M36</th>
                <th scope="col">At M48</th>
              </tr>
            </thead>
            <tbody>
              {BUCKETS.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  {[0, 12, 24, 36, 48].map((m) => (
                    <td key={m}>{Math.round(b.unlocked(m))}M</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </section>
    </>
  );
}
