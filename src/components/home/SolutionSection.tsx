"use client";
/**
 * SolutionSection.tsx
 *
 * Client island  --  needs useState + event listeners for step interactivity.
 * Justification for "use client": interactive tab panel (step switcher) requires
 *   useState, useEffect (keyboard nav, focus management), and onClick handlers.
 *
 * Design source: home-design.md Rev 4 Section 3
 * Showcase port: 10-page-sections.html L616-790 (Four-Step Capital Cycle, trimmed to 3 steps)
 * Scene: r21-scene-solution-chamber.webp at 100% (Option B glassmorphism)
 * Assets:
 *   Step 1 (Deposit): r21-asset-deposit-pour-transparent.webp
 *     Step 1 asset: r21-asset-deposit-pour-transparent.webp
 *   Step 2 (Fund): r19-asset-borrower-key-ingot-transparent.webp (KEPT)
 *   Step 3 (Earn): r19-asset-yield-curve-wedge-transparent.webp (swapped from ziggurat per Rev 4)
 * Padding: 80px top/bottom per Rev 4
 * NO spinning, NO rotation  --  translateY float only
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface StepData {
  number: string;
  label: string;
  eyebrow: string;
  heading: string;
  body: string;
  code: string;
  asset: string;
  assetAlt: string;
  accentColor: string;
}

const STEPS: StepData[] = [
  {
    number:     "1",
    label:      "Deposit",
    eyebrow:    "Step 01",
    heading:    "LPs deposit USDC into a permissionless vault.",
    body:       "Permissionless access from 1 USDC. LP tokens mint at current NAV in the same transaction. No lockup period, no minimum, no waiting.",
    code:       "vault.deposit(usdc) \u2192 mint(lpTokens)",
    asset:      "/images/r21-asset-deposit-pour-transparent.webp",
    assetAlt:   "Translucent magma-core pour, capital flowing into the vault",
    accentColor: "var(--ax-capital-yellow)",
  },
  {
    number:     "2",
    label:      "Fund",
    eyebrow:    "Step 02",
    heading:    "Approved borrowers draw capital and choose their payout format.",
    body:       "Each draw creates a receivable at the smart-contract level. Enforced limits protect LP capital while giving borrowers flexible, on-demand access to working capital.",
    code:       "vault.fund(borrower, { amount, payout: \"USDC\" | \"$APPEX\" })",
    asset:      "/images/r22-step-fund-draw-transparent.webp",
    assetAlt:   "Y-shaped conduit showing dual USDC and $APPEX payout outputs",
    accentColor: "var(--ax-ether-mist)",
  },
  {
    number:     "3",
    label:      "Earn",
    eyebrow:    "Step 03",
    heading:    "Fees accrue to NAV. LP token value appreciates.",
    body:       "Borrowers repay principal plus fees. Fees flow into the vault, increasing NAV continuously. LP positions compound automatically.",
    code:       "repay(principal + fees) \u2192 nav.increase",
    asset:      "/images/r19-asset-yield-curve-wedge-transparent.webp",
    assetAlt:   "Yield curve wedge: accruing fees",
    accentColor: "var(--ax-capital-yellow)",
  },
];

export function SolutionSection(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activateStep = useCallback((idx: number) => {
    setActiveStep(idx);
  }, []);

  // Keyboard navigation: ArrowLeft/Right, Home, End
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handleKey = (e: KeyboardEvent): void => {
      const btns = btnRefs.current.filter(Boolean) as HTMLButtonElement[];
      const cur = btns.indexOf(document.activeElement as HTMLButtonElement);
      if (cur < 0) return;
      let next = cur;
      if (e.key === "ArrowRight")       next = (cur + 1) % btns.length;
      else if (e.key === "ArrowLeft")   next = (cur - 1 + btns.length) % btns.length;
      else if (e.key === "Home")        next = 0;
      else if (e.key === "End")         next = btns.length - 1;
      else return;
      e.preventDefault();
      activateStep(next);
      btns[next]?.focus();
    };
    nav.addEventListener("keydown", handleKey);
    return () => nav.removeEventListener("keydown", handleKey);
  }, [activateStep]);

  return (
    <>
      <style>{`
        /* ---- Solution section ---- */
        .solution {
          position: relative;
          overflow: hidden;
          min-height: 720px;
          background: var(--ax-fortress);
        }

        /* Layer 1: scene at 100% opacity (Option B) */
        .solution__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
          pointer-events: none;
          z-index: 0;
          animation: axScenePulse 22s ease-in-out infinite;
        }

        /* Layer 2: full-coverage darken */
        .solution__darken {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
            rgba(10,15,31,0.55) 0%,
            rgba(10,15,31,0.35) 50%,
            rgba(10,15,31,0.50) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: top edge hairline */
        .solution__hairline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(180deg, rgba(254,214,7,0.14) 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .solution__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 48px;
        }

        @media (max-width: 767px) {
          .solution__content { padding: 48px 24px; }
        }

        /* Glassmorphism panel */
        .solution__glass {
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          padding: 48px;
          overflow: hidden;
        }

        @media (max-width: 767px) {
          .solution__glass { padding: 32px 24px; }
        }

        /* Header cluster */
        .solution__header {
          max-width: 520px;
          margin-bottom: 40px;
        }

        .solution__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .solution__heading {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        /* Step nav */
        .solution__nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          padding: 0 0 32px 0;
        }

        .ax-step-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .ax-step-btn__circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display-family);
          font-size: 16px;
          font-weight: 600;
          transition: all 300ms cubic-bezier(0.4,0,0.2,1);
        }

        .ax-step-btn__circle--active {
          background: var(--ax-capital-yellow);
          color: var(--ax-fortress);
          border: none;
          box-shadow: 0 2px 16px rgba(254,214,7,0.35);
        }

        .ax-step-btn__circle--inactive {
          border: 2px solid var(--border-hairline);
          background: var(--ax-fortress);
          color: var(--text-muted);
          box-shadow: none;
        }

        .ax-step-btn__label {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 300ms;
        }

        .ax-step-btn__label--active  { color: var(--ax-capital-yellow); }
        .ax-step-btn__label--inactive { color: var(--text-muted); }

        .ax-step-connector {
          flex: 0 0 40px;
          height: 2px;
        }

        /* Step panel */
        .ax-step-panel {
          animation: axTabFade 300ms cubic-bezier(0.4,0,0.2,1);
        }

        .ax-step-panel__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 767px) {
          .ax-step-panel__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .solution__nav {
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
          }
          .ax-step-connector { display: none; }
        }

        /* Asset column */
        .ax-step-panel__asset-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ax-step-panel__asset {
          width: 65%;
          max-width: 380px;
          min-width: 200px;
          height: auto;
          filter: drop-shadow(0 4px 20px rgba(254,214,7,0.15))
                  drop-shadow(0 8px 40px rgba(90,28,203,0.12))
                  drop-shadow(0 16px 60px rgba(0,0,0,0.4));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (prefers-reduced-motion: reduce) {
          .solution__scene  { animation: none; }
        }

        /* Copy column */
        .ax-step-panel__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .ax-step-panel__heading {
          font-family: var(--font-display-family);
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .ax-step-panel__body {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .ax-step-panel__code {
          font-family: var(--font-mono-family);
          font-size: 12px;
          opacity: 0.65;
          padding: 10px 14px;
          background: rgba(254,214,7,0.04);
          border-radius: var(--radius-sm);
          display: inline-block;
        }

        .ax-step-panel__code--mist {
          background: rgba(185,160,204,0.04);
        }

        /* CTA */
        .solution__cta {
          margin-top: 40px;
          text-align: center;
        }
      `}</style>

      <section className="solution" aria-labelledby="solution-heading">
        {/* Scene at 100% */}
        <Image
          src="/images/r21-scene-solution-chamber.webp"
          alt="" aria-hidden="true"
          fill
          className="solution__scene"
          style={{ objectFit: "cover", objectPosition: "center right" }}
          loading="lazy"
          decoding="async"
        />

        <div className="solution__darken" aria-hidden="true" />
        <div className="solution__hairline" aria-hidden="true" />

        <div className="solution__content">
          <div className="solution__glass">
            {/* Header cluster */}
            <div className="solution__header">
              <div className="solution__eyebrow">Mechanism</div>
              <h2 id="solution-heading" className="solution__heading">
                A programmable vault for{" "}
                <span className="text-gold-gradient">working capital onchain.</span>
              </h2>
            </div>

            {/* Step nav */}
            <div
              className="solution__nav"
              ref={navRef}
              role="tablist"
              aria-label="Capital cycle steps"
            >
              {STEPS.map((step, i) => (
                <React.Fragment key={step.number}>
                  <button
                    ref={(el) => { btnRefs.current[i] = el; }}
                    className="ax-step-btn"
                    role="tab"
                    aria-selected={activeStep === i ? "true" : "false"}
                    aria-controls={`ax-step-panel-${i}`}
                    id={`ax-step-tab-${i}`}
                    onClick={() => { activateStep(i); }}
                    type="button"
                  >
                    <span
                      className={`ax-step-btn__circle ${activeStep === i ? "ax-step-btn__circle--active" : "ax-step-btn__circle--inactive"}`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`ax-step-btn__label ${activeStep === i ? "ax-step-btn__label--active" : "ax-step-btn__label--inactive"}`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      className="ax-step-connector"
                      style={{
                        background: i === 0
                          ? "var(--ax-gradient-gold-line)"
                          : "var(--ax-gradient-purple-line)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Active panel */}
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="ax-step-panel"
                id={`ax-step-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`ax-step-tab-${i}`}
                hidden={activeStep !== i}
              >
                <div className="ax-step-panel__grid">
                  <div className="ax-step-panel__asset-col">
                    <Image
                      src={step.asset}
                      alt={step.assetAlt}
                      width={380}
                      height={380}
                      className="ax-step-panel__asset"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <div
                      className="ax-step-panel__eyebrow"
                      style={{ color: step.accentColor }}
                    >
                      {step.eyebrow}
                    </div>
                    <h3 className="ax-step-panel__heading">{step.heading}</h3>
                    <p className="ax-step-panel__body">{step.body}</p>
                    <div
                      className={`ax-step-panel__code ${step.accentColor === "var(--ax-ether-mist)" ? "ax-step-panel__code--mist" : ""}`}
                      style={{ color: step.accentColor }}
                    >
                      {step.code}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="solution__cta">
              <Link href="/protocol" className="ax-btn--secondary">
                See how the protocol works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
