"use client";
/**
 * LPsRiskCarousel.tsx
 *
 * Client island  --  horizontal drag-scroll risk carousel for the LPs risk surface.
 * Justification for "use client": useState for activeDot, useRef for track + card refs
 *   (IntersectionObserver), useEffect for observer setup + keyboard nav, mouse drag handlers.
 *
 * Design source: lps-design.md Section 5  --  "Honest about what can go wrong"
 * Interaction pattern: SAME drag-scroll vocabulary as FiveUtilitiesCarousel and protocol
 *   RiskCarousel. Drag-scroll per Rev 4 lesson 5: content-dense cards must be readable in
 *   parallel; auto-cycle is banned on a risk-disclosure page.
 * Background: r23-scene-trust.webp at 100% opacity (Option B) + 45/30/45 tint overlay.
 *   Same scene as /protocol RiskCarousel  --  cross-page transparency-surface vocabulary.
 *   NO texture (per Rev 4 anti-pattern: scene and texture never combined in same section).
 * Five cards, each with:
 *   - Severity pill top-right (High / Medium / Preliminary  --  verbatim wiki labels)
 *   - Risk headline (4-6 words)
 *   - "How it could happen" block (label + 1-2 sentences)
 *   - "What protects LPs" block (label + 1-2 sentences)
 *   - "What remains" residual caveat (italic, 1 sentence)
 *   - Wiki source nested glass micro-pill (12px italic, Rev 4 lesson 3)
 * Glass card: background rgba(10,15,31,0.82), backdrop-filter blur(20px),
 *   border rgba(90,28,203,0.24), min-height 440px.
 * Navigation: IntersectionObserver drives dot state + drag-pill counter.
 *   Clicking a dot scrollIntoView smooth. Keyboard: left/right arrows advance one card.
 * NO auto-cycle. NO per-card images.
 * Copy: copy/lps.md Section 5. Present tense. No em dashes.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";

type Severity = "High" | "Medium" | "Preliminary";

interface RiskCard {
  id:        string;
  severity:  Severity;
  headline:  string;
  howBody:   string;
  protects:  string;
  remains:   string;
  wikiSource: string;
}

const RISK_CARDS: RiskCard[] = [
  {
    id:        "borrower-default",
    severity:  "High",
    headline:  "When a borrower defaults.",
    howBody:   "A borrower's downstream customers fail to pay, the borrower enters financial distress, or fraud slips through onboarding. Repayment stops before the advance matures.",
    protects:  "Credit evaluation, financial review, and background checks before onboarding. Concentration guidelines. A five-day grace period before impairment. Insurance coverage where available. Permanent loss of vault access on default.",
    remains:   "Confirmed losses are socialized across LP shares. Default risk cannot be eliminated entirely.",
    wikiSource: "risk-framework §1",
  },
  {
    id:        "vault-utilization",
    severity:  "Medium",
    headline:  "When redemptions outrun liquidity.",
    howBody:   "Concentrated withdrawal requests arrive while vault utilization is high and DeFi-deployed capital is drawn down toward the bottom.",
    protects:  "DeFi liquidity withdrawable on demand. Offchain reserves as a second backstop. Daily redemption cap. Per-request limit. FIFO queue that clears as repayments land or new deposits arrive.",
    remains:   "During stress, withdrawals may take multiple days to settle. Advances are never recalled early.",
    wikiSource: "risk-framework §2",
  },
  {
    id:        "smart-contract",
    severity:  "High",
    headline:  "When the code has a bug.",
    howBody:   "Undiscovered bugs or exploits target NAV math, LP token minting, reentrancy surfaces, oracle inputs, or access control. Onchain systems cannot fully escape this class of risk.",
    protects:  "Third-party audits conducted before deployment. Reports publish on completion. Bug bounty across critical, high, medium, and low tiers. Planned multi-sig administration. Conservative launch parameters.",
    remains:   "No audit guarantees the absence of every vulnerability. Treat deposits accordingly.",
    wikiSource: "risk-framework §3, security-overview",
  },
  {
    id:        "centralization",
    severity:  "Preliminary",
    headline:  "Offchain judgment in early phases.",
    howBody:   "Borrower onboarding, credit assessment, collections, and fiat off-ramps all require human decisions in the early phase. These operations sit outside what the smart contracts can verify.",
    protects:  "Published procedures. Multi-sig operations follow documented steps. Governance transfers decision-making to $APPEX stakers progressively, starting with vault parameters and borrower approval criteria.",
    remains:   "Meaningful centralization sits with the protocol operator in the early phase. Decentralization is gradual, not instant.",
    wikiSource: "risk-framework §4",
  },
  {
    id:        "oracle-data-feed",
    severity:  "Preliminary",
    headline:  "When offchain data is wrong.",
    howBody:   "A borrower submits fraudulent receivable data, a data feed fails, or a verification system returns a stale value. NAV or underwriting inputs drift from reality.",
    protects:  "Borrowers carry the repayment obligation regardless of data accuracy. Variance guardrails flag discrepancies exceeding five to ten percent for manual review. NAV refreshes before every deposit and redemption. Multiple sources cross-reference.",
    remains:   "Offchain data cannot be verified onchain with the same certainty as transactions.",
    wikiSource: "risk-framework §6",
  },
];

const SEVERITY_STYLES: Record<Severity, React.CSSProperties> = {
  High:        { background: "rgba(254,214,7,0.18)",   color: "#FED607",               border: "1px solid rgba(254,214,7,0.45)" },
  Medium:      { background: "rgba(185,160,204,0.16)", color: "#B9A0CC",               border: "1px solid rgba(185,160,204,0.40)" },
  Preliminary: { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.18)" },
};

export function LPsRiskCarousel(): React.JSX.Element {
  const [activeDot, setActiveDot] = useState<number>(0);
  const trackRef                  = useRef<HTMLDivElement>(null);
  const cardRefs                  = useRef<(HTMLElement | null)[]>([]);
  const isDragging                = useRef<boolean>(false);
  const dragStartX                = useRef<number>(0);
  const scrollStart               = useRef<number>(0);

  // IntersectionObserver drives dot state and pill counter
  useEffect((): (() => void) => {
    const track = trackRef.current;
    if (!track) return (): void => {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveDot(idx);
          }
        });
      },
      { root: track, threshold: 0.5 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return (): void => observer.disconnect();
  }, []);

  // Keyboard navigation: left/right arrows advance one card
  useEffect((): (() => void) => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        scrollToCard(Math.max(activeDot - 1, 0));
      } else if (e.key === "ArrowRight") {
        scrollToCard(Math.min(activeDot + 1, RISK_CARDS.length - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return (): void => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDot]);

  const scrollToCard = useCallback((idx: number): void => {
    const card = cardRefs.current[idx];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent): void => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current  = true;
    dragStartX.current  = e.clientX;
    scrollStart.current = track.scrollLeft;
    track.style.cursor     = "grabbing";
    track.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent): void => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = scrollStart.current - (e.clientX - dragStartX.current);
  }, []);

  const stopDrag = useCallback((): void => {
    isDragging.current = false;
    const track = trackRef.current;
    if (track) {
      track.style.cursor     = "grab";
      track.style.userSelect = "";
    }
  }, []);

  const pillNum = String(activeDot + 1).padStart(2, "0");

  return (
    <>
      <style>{`
        /* ---- LPs risk carousel  --  drag-scroll transparency surface ---- */
        .lps-risk {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 0: r23-scene-trust at 100% opacity */
        .lps-risk__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: 45/30/45 tint overlay per Rev 4 lesson 6 */
        .lps-risk__tint {
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

        /* Layer 2: top hairline */
        .lps-risk__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.16);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .lps-risk__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .lps-risk__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .lps-risk__content { padding: 0 24px; } }

        /* Section header */
        .lps-risk__header {
          max-width: 720px;
          margin-bottom: 40px;
        }

        .lps-risk__eyebrow {
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

        .lps-risk__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .lps-risk__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
        }

        /* Pill row  --  just above carousel track */
        .lps-risk__pill-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 16px;
        }

        @media (max-width: 767px) {
          .lps-risk__pill-row { justify-content: flex-start; }
        }

        .lps-risk__pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border: 1px solid rgba(254,214,7,0.25);
          border-radius: 999px;
          font-family: var(--font-display-family);
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.70);
          white-space: nowrap;
          cursor: default;
          user-select: none;
        }

        .lps-risk__pill-count {
          color: var(--ax-capital-yellow, #FED607);
        }

        .lps-risk__pill-sep { opacity: 0.45; }

        .lps-risk__pill-arrow {
          display: inline-block;
          animation: lrPillArrow 2s ease-in-out infinite;
        }

        @keyframes lrPillArrow {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lps-risk__pill-arrow { animation: none; }
        }

        /* Track wrapper */
        .lps-risk__track-wrap {
          position: relative;
        }

        /* Right-edge fade */
        .lps-risk__edge-fade {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 120px;
          background: linear-gradient(270deg, rgba(10,15,31,0.85) 0%, transparent 100%);
          pointer-events: none;
          z-index: 3;
        }

        /* Drag-scroll track */
        .lps-risk__track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          scroll-behavior: smooth;
          align-items: stretch;
          gap: 24px;
          padding: 48px 120px 64px 48px;
          cursor: grab;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          margin-left: -48px;
          margin-right: -48px;
        }

        .lps-risk__track::-webkit-scrollbar { display: none; }

        @media (max-width: 1023px) {
          .lps-risk__track {
            padding: 32px 80px 48px 32px;
            margin-left: -32px;
            margin-right: -32px;
          }
        }

        @media (max-width: 767px) {
          .lps-risk__track {
            padding: 24px 60px 40px 24px;
            margin-left: -24px;
            margin-right: -24px;
            gap: 16px;
          }
        }

        /* ---- Risk card ---- */
        .lps-risk__card {
          flex: 0 0 340px;
          scroll-snap-align: center;
          background: rgba(10,15,31,0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(90,28,203,0.24);
          border-radius: var(--radius-md, 16px);
          padding: 28px 32px;
          min-height: 440px;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        @media (max-width: 1023px) { .lps-risk__card { flex: 0 0 300px; } }
        @media (max-width: 767px)  { .lps-risk__card { flex: 0 0 280px; } }

        /* Severity pill  --  top-right absolute */
        .lps-risk__severity {
          position: absolute;
          top: 20px;
          right: 20px;
          border-radius: 999px;
          padding: 4px 12px;
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.4;
        }

        /* Risk headline */
        .lps-risk__card-headline {
          font-family: var(--font-display-family);
          font-size: 22px;
          font-weight: 500;
          line-height: 1.2;
          color: var(--text-primary);
          margin: 0 0 20px 0;
          padding-top: 36px; /* clear the severity pill */
        }

        /* Block labels */
        .lps-risk__block-label {
          font-family: var(--font-display-family);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 6px;
          margin-top: 16px;
          display: block;
        }

        .lps-risk__block-label:first-of-type { margin-top: 0; }

        /* Block body */
        .lps-risk__block-body {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        /* "What remains"  --  italic, lighter */
        .lps-risk__remains {
          font-family: var(--font-body-family);
          font-size: 14px;
          font-style: italic;
          line-height: 1.55;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }

        /* Wiki source micro-pill  --  pinned to card bottom (Rev 4 lesson 3) */
        .lps-risk__source-wrap {
          margin-top: auto;
          padding-top: 20px;
        }

        .lps-risk__source-pill {
          background: rgba(10,15,31,0.55);
          border: 1px solid rgba(90,28,203,0.15);
          border-radius: var(--radius-sm, 8px);
          padding: 8px 12px;
          font-family: var(--font-body-family);
          font-size: 12px;
          font-style: italic;
          color: var(--text-secondary);
          opacity: 0.7;
          display: inline-block;
        }

        /* Navigation dots */
        .lps-risk__dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 8px;
        }

        .lps-risk__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(255,255,255,0.25);
          transition: background 300ms ease, width 300ms ease, border-radius 300ms ease;
        }

        .lps-risk__dot--active {
          background: rgba(254,214,7,0.75);
          width: 20px;
          border-radius: 4px;
          box-shadow: 0 0 8px rgba(254,214,7,0.4);
        }

        .lps-risk__dot:hover:not(.lps-risk__dot--active) {
          background: rgba(255,255,255,0.45);
        }

        .lps-risk__dot:focus-visible {
          outline: 2px solid rgba(254,214,7,0.55);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .lps-risk__track { scroll-behavior: auto; }
        }
      `}</style>

      <section
        className="lps-risk"
        id="risk"
        aria-labelledby="lps-risk-heading"
      >
        {/* Scene: r23-scene-trust at 100%  --  same scene as /protocol RiskCarousel */}
        <Image
          src="/images/r23-scene-trust.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={85}
          className="lps-risk__scene"
          style={{ objectFit: "cover", objectPosition: "center right" }}
          loading="lazy"
        />
        <div className="lps-risk__tint"     aria-hidden="true" />
        <div className="lps-risk__hairline" aria-hidden="true" />

        <div className="lps-risk__content">

          <div className="lps-risk__header">
            <div className="lps-risk__eyebrow">Risk and transparency</div>
            <h2 id="lps-risk-heading" className="lps-risk__h2">
              Honest about{" "}
              <span className="text-gold-gradient">what can go wrong.</span>
            </h2>
            <p className="lps-risk__subhead">
              Five risks pulled directly from the protocol's published framework. Each card carries how the risk materializes, what protects LPs from it, and the residual exposure that no mitigation removes.
            </p>
          </div>

          <div className="lps-risk__track-wrap">
            {/* Drag-pill */}
            <div className="lps-risk__pill-row">
              <div
                className="lps-risk__pill"
                aria-live="polite"
                aria-label={`Viewing risk ${activeDot + 1} of ${RISK_CARDS.length}`}
              >
                <span className="lps-risk__pill-count">{pillNum}</span>
                <span className="lps-risk__pill-sep">/</span>
                <span>0{RISK_CARDS.length}</span>
                <em className="lps-risk__pill-arrow" aria-hidden="true">&#8250;</em>
                <span>Drag to explore</span>
              </div>
            </div>

            <div className="lps-risk__edge-fade" aria-hidden="true" />

            <div
              ref={trackRef}
              className="lps-risk__track"
              role="region"
              aria-label="LPs risk framework, 5 cards"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              {RISK_CARDS.map((card, i) => (
                <article
                  key={card.id}
                  ref={(el): void => { cardRefs.current[i] = el; }}
                  className="lps-risk__card"
                  aria-labelledby={`lps-risk-card-heading-${card.id}`}
                >
                  {/* Severity pill  --  top-right */}
                  <span
                    className="lps-risk__severity"
                    style={SEVERITY_STYLES[card.severity]}
                    aria-label={`Severity: ${card.severity}`}
                  >
                    {card.severity}
                  </span>

                  {/* Risk headline */}
                  <h3
                    id={`lps-risk-card-heading-${card.id}`}
                    className="lps-risk__card-headline"
                  >
                    {card.headline}
                  </h3>

                  {/* How it could happen */}
                  <span className="lps-risk__block-label">How it could happen</span>
                  <p className="lps-risk__block-body">{card.howBody}</p>

                  {/* What protects LPs */}
                  <span className="lps-risk__block-label">What protects LPs</span>
                  <p className="lps-risk__block-body">{card.protects}</p>

                  {/* What remains */}
                  <span className="lps-risk__block-label">What remains</span>
                  <p className="lps-risk__remains">{card.remains}</p>

                  {/* Wiki source micro-pill  --  pinned bottom */}
                  <div className="lps-risk__source-wrap">
                    <span className="lps-risk__source-pill">{card.wikiSource}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div
            className="lps-risk__dots"
            role="tablist"
            aria-label="Navigate risk cards"
          >
            {RISK_CARDS.map((card, i) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={activeDot === i ? "true" : "false"}
                aria-label={`Show risk ${i + 1} of ${RISK_CARDS.length}`}
                className={`lps-risk__dot${activeDot === i ? " lps-risk__dot--active" : ""}`}
                onClick={(): void => { scrollToCard(i); }}
              />
            ))}
          </div>

        </div>

      </section>
    </>
  );
}
