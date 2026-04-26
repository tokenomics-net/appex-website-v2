"use client";
/**
 * BorrowerProcess.tsx
 *
 * Client island  --  needs useState + keyboard navigation for the 4-step tab/accordion.
 * Justification for "use client": useState for activeStep + expandedMobile, useEffect for
 *   keyboard handlers on tablist, useRef for focus management.
 *
 * Design source: borrowers-design.md Section 3  --  "The process (4-step lifecycle)"
 * Background: r17-texture-rhythm.png at 20% (canonical structured-mechanism texture)
 * Interaction:
 *   Desktop: horizontal 4-tab nav + panel crossfade (500ms). Keyboard: arrow keys + Home/End.
 *   Mobile: vertical accordion (tap-to-expand), first step expanded by default.
 *   WAI-ARIA: role="tablist" / role="tab" / aria-selected / aria-controls on desktop.
 *   Mobile: <button aria-expanded> pattern.
 * Per-step floating assets (ALL REUSE from borrowers design spec):
 *   Step 1 Apply:        r19-asset-borrower-key-ingot-transparent.webp
 *   Step 2 Review:       r19-asset-fee-split-disc-transparent.webp
 *   Step 3 Draw:         r81-asset-step-fund-draw-bright-transparent.webp
 *   Step 4 Repay:        r70-asset-step-repayment-cycle-r5n-bright-transparent.webp
 * UNIFORM card treatment across all 4 steps per LPs R1 lesson.
 * Floating assets: translateY 6-10px / 4-6s ease-in-out. NO rotation. opacity: 1 always.
 * Copy: copy/borrowers.md Section 3. Present tense. No em dashes.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface ProcessStep {
  number:    string;
  tabLabel:  string;
  heading:   string;
  body:      string;
  bullet:    string;
  asset:     string;
  assetAlt:  string;
  floatDur:  string;
  glowStyle: React.CSSProperties;
}

const STEPS: ProcessStep[] = [
  {
    number:   "1",
    tabLabel: "Apply",
    heading:  "Submit a structured application.",
    body:     "Send financial statements, a short business-model document, and customer payment data. The application runs on a documented track rather than through a loan-officer relationship. Timeline depends on documentation completeness and the complexity of the credit file.",
    bullet:   "No relationship-gated wait-list. Every applicant joins the same queue.",
    asset:    "/images/r89-asset-filed-dossier-bright-transparent.webp",
    assetAlt: "",
    floatDur: "4.8s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(254,214,7,0.20) 0%, rgba(90,28,203,0.10) 45%, transparent 70%)",
    },
  },
  {
    number:   "2",
    tabLabel: "Review",
    heading:  "Credit review and term negotiation.",
    body:     "Credit assessment looks at the borrower's own ability to repay, not at downstream customers. Background checks verify corporate identity, beneficial ownership, and regulatory standing. Borrowing limit, payment-term range, LP yield fee, and protocol fee rate are agreed together.",
    bullet:   "Terms reflect margin, payment velocity, creditworthiness, and strategic fit.",
    asset:    "/images/r77-asset-credit-review-loupe-bright-transparent.webp",
    assetAlt: "",
    floatDur: "5.2s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(90,28,203,0.20) 0%, rgba(254,214,7,0.10) 45%, transparent 70%)",
    },
  },
  {
    number:   "3",
    tabLabel: "Draw",
    heading:  "Draw in USDC or $APPEX.",
    body:     "Submit a draw request inside the approved facility specifying amount, term, and payout currency. The vault releases USDC, or $APPEX at the borrower's option, into the borrower wallet. No per-draw re-underwriting while facility terms hold. Every draw settles on the fee curve agreed during onboarding.",
    bullet:   "USDC funds routed downstream in the format each recipient wants. $APPEX draws clear directly into the borrower's treasury.",
    asset:    "/images/r81-asset-step-fund-draw-bright-transparent.webp",
    assetAlt: "",
    floatDur: "5.6s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(254,214,7,0.20) 0%, rgba(90,28,203,0.10) 45%, transparent 70%)",
    },
  },
  {
    number:   "4",
    tabLabel: "Repay",
    heading:  "Principal plus fees, one event.",
    body:     "When the borrower's customer pays, the borrower repays principal plus LP yield fee plus protocol fee in a single event. Paying the protocol fee in $APPEX applies a twenty-five percent discount. The facility stays open for the next draw.",
    bullet:   "Early collection is rewarded. Capital turns faster; the next draw arrives sooner.",
    asset:    "/images/r68-asset-principal-fees-bundle-bright-transparent.webp",
    assetAlt: "Principal plus fees returned as a single bundled transfer",
    floatDur: "6s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(90,28,203,0.20) 0%, rgba(254,214,7,0.10) 45%, transparent 70%)",
    },
  },
];

export function BorrowerProcess(): React.JSX.Element {
  const [activeStep,     setActiveStep]     = useState<number>(0);
  const [expandedMobile, setExpandedMobile] = useState<number>(0);
  const navRef   = useRef<HTMLDivElement>(null);
  const btnRefs  = useRef<Array<HTMLButtonElement | null>>([]);

  const activateStep = useCallback((idx: number): void => {
    setActiveStep(idx);
  }, []);

  // Keyboard navigation on desktop tablist
  useEffect((): (() => void) => {
    const nav = navRef.current;
    if (!nav) return (): void => {};
    const handleKey = (e: KeyboardEvent): void => {
      const btns = btnRefs.current.filter(Boolean) as HTMLButtonElement[];
      const cur  = btns.indexOf(document.activeElement as HTMLButtonElement);
      if (cur < 0) return;
      let next = cur;
      if      (e.key === "ArrowRight") next = (cur + 1) % btns.length;
      else if (e.key === "ArrowLeft")  next = (cur - 1 + btns.length) % btns.length;
      else if (e.key === "Home")       next = 0;
      else if (e.key === "End")        next = btns.length - 1;
      else return;
      e.preventDefault();
      activateStep(next);
      btns[next]?.focus();
    };
    nav.addEventListener("keydown", handleKey);
    return (): void => nav.removeEventListener("keydown", handleKey);
  }, [activateStep]);

  const toggleMobile = useCallback((idx: number): void => {
    setExpandedMobile((prev) => (prev === idx ? -1 : idx));
  }, []);

  const step = STEPS[activeStep];

  return (
    <>
      <style>{`
        /* ---- Borrower Process  --  4-step stepper ---- */
        .bor-process {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        .bor-process__texture {
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

        .bor-process__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.88) 0%,
            rgba(10,15,31,0.80) 50%,
            rgba(10,15,31,0.88) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .bor-process__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .bor-process__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .bor-process__content { padding: 0 24px; } }

        /* Section header */
        .bor-process__header {
          max-width: 720px;
          margin-bottom: 48px;
        }

        .bor-process__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .bor-process__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .bor-process__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0;
        }

        /* ---- STEPPER WIDGET ---- */
        .bor-process__widget {
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md, 12px);
          padding: 48px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        /* Inner rhythm texture */
        .bor-process__widget-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.12;
        }

        @media (max-width: 767px) {
          .bor-process__widget { padding: 24px; }
        }

        /* Tab navigation row  --  desktop only */
        .bor-process__tabs {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 48px;
          justify-content: center;
        }

        @media (max-width: 767px) {
          .bor-process__tabs { display: none; }
        }

        .bor-process__tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        /* Connector line between tabs */
        .bor-process__tab-connector {
          width: 80px;
          height: 2px;
          background: rgba(255,255,255,0.15);
          margin-top: 24px;
          flex-shrink: 0;
        }

        @media (max-width: 1023px) {
          .bor-process__tab-connector { width: 48px; }
        }

        /* Tab button */
        .bor-process__tab-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(10,15,31,0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-secondary);
          font-family: var(--font-display-family);
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 250ms ease, background 250ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bor-process__tab-btn[aria-selected="true"] {
          border-color: rgba(254,214,7,0.50);
          background: rgba(10,15,31,0.80);
          color: var(--ax-capital-yellow, #FED607);
        }

        .bor-process__tab-btn:hover:not([aria-selected="true"]) {
          border-color: rgba(255,255,255,0.25);
          background: rgba(10,15,31,0.75);
        }

        .bor-process__tab-btn:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }

        /* Tab label below button.
         * Mobile audit: bumped from 12px to 14px minimum. */
        .bor-process__tab-label {
          margin-top: 10px;
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-secondary);
          transition: color 250ms ease;
        }

        .bor-process__tab-btn[aria-selected="true"] + .bor-process__tab-label {
          color: var(--ax-capital-yellow, #FED607);
        }

        /* Tab panel  --  desktop */
        .bor-process__panel {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 767px) {
          .bor-process__panel { display: none; }
        }

        /* Per-step radial glow */
        .bor-process__glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 600ms linear;
        }

        /* Panel content: 50/50 layout */
        .bor-process__panel-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 1023px) {
          .bor-process__panel-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* Asset column  --  fixed height frame so all 4 steps have equal visual padding */
        .bor-process__panel-asset {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 360px;
          min-height: 360px;
        }

        @media (max-width: 1023px) {
          .bor-process__panel-asset {
            height: 260px;
            min-height: 260px;
          }
        }

        .bor-process__step-img {
          width: auto;
          height: 100%;
          max-width: clamp(220px, 30vw, 360px);
          max-height: 100%;
          object-fit: contain;
          opacity: 1;
          filter: drop-shadow(0 40px 80px rgba(90,28,203,0.40));
        }

        /* Copy column */
        .bor-process__panel-copy {}

        .bor-process__step-num {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .bor-process__step-h3 {
          font-family: var(--font-display-family);
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          line-height: 1.2;
        }

        .bor-process__step-body {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0 0 16px 0;
        }

        .bor-process__step-bullet {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          padding-left: 14px;
          border-left: 2px solid rgba(254,214,7,0.5);
          margin: 0;
        }

        /* ---- MOBILE ACCORDION ---- */
        .bor-process__accordion {
          display: none;
          flex-direction: column;
          gap: 0;
        }

        @media (max-width: 767px) {
          .bor-process__accordion { display: flex; }
        }

        .bor-process__acc-item {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .bor-process__acc-item:first-child {
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .bor-process__acc-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .bor-process__acc-btn-label {
          font-family: var(--font-display-family);
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bor-process__acc-num {
          display: inline-flex;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(10,15,31,0.65);
          border: 1px solid rgba(255,255,255,0.12);
          align-items: center;
          justify-content: center;
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .bor-process__acc-btn[aria-expanded="true"] .bor-process__acc-num {
          border-color: rgba(254,214,7,0.50);
          color: var(--ax-capital-yellow, #FED607);
        }

        .bor-process__acc-chevron {
          font-size: 20px;
          color: var(--text-secondary);
          transition: transform 250ms ease;
          flex-shrink: 0;
        }

        .bor-process__acc-btn[aria-expanded="true"] .bor-process__acc-chevron {
          transform: rotate(180deg);
        }

        .bor-process__acc-body {
          overflow: hidden;
          transition: max-height 350ms ease;
          max-height: 0;
        }

        .bor-process__acc-body--open {
          max-height: 600px;
        }

        .bor-process__acc-inner {
          padding: 0 0 24px 44px;
        }

        .bor-process__acc-asset {
          width: 200px;
          height: auto;
          opacity: 1;
          display: block;
          margin: 0 auto 16px;
          filter: drop-shadow(0 20px 40px rgba(90,28,203,0.35));
        }
      `}</style>

      <section className="bor-process" id="process">
        <Image
          src="/images/r17-texture-rhythm.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="bor-process__texture"
          style={{ objectFit: "cover" }}
        />
        <div className="bor-process__overlay" aria-hidden="true" />

        <div className="bor-process__content">
          {/* Section header */}
          <header className="bor-process__header">
            <div className="bor-process__eyebrow">The process</div>
            <h2 className="bor-process__h2">
              Apply. Review. Draw.{" "}
              <span className="text-gold-gradient">Repay.</span>
            </h2>
            <p className="bor-process__subhead">
              Four steps, one continuous flow. Steps one and two run once per facility. Steps three and four repeat every time the borrower draws against a verified receivable.
            </p>
          </header>

          {/* Stepper widget */}
          <div className="bor-process__widget">
            <Image
              src="/images/r17-texture-rhythm.webp"
              alt="" aria-hidden="true"
              fill
              sizes="(max-width: 767px) 50vw, 540px"
              quality={50}
              className="bor-process__widget-texture"
              style={{ objectFit: "cover" }}
            />

            {/* Desktop tab nav */}
            <div
              className="bor-process__tabs"
              role="tablist"
              aria-label="Borrower process steps"
              ref={navRef}
            >
              {STEPS.map((s, i) => (
                <React.Fragment key={s.number}>
                  <div className="bor-process__tab-item">
                    <button
                      ref={(el) => { btnRefs.current[i] = el; }}
                      role="tab"
                      aria-selected={activeStep === i}
                      aria-controls={`process-panel-${i}`}
                      id={`process-tab-${i}`}
                      className="bor-process__tab-btn"
                      onClick={() => activateStep(i)}
                      tabIndex={activeStep === i ? 0 : -1}
                    >
                      {s.number}
                    </button>
                    <span className="bor-process__tab-label">{s.tabLabel}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="bor-process__tab-connector" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Desktop panel */}
            <div
              className="bor-process__panel"
              role="tabpanel"
              id={`process-panel-${activeStep}`}
              aria-labelledby={`process-tab-${activeStep}`}
            >
              {/* Per-step radial glow */}
              <div
                className="bor-process__glow"
                aria-hidden="true"
                style={step.glowStyle}
              />

              <div className="bor-process__panel-grid">
                {/* Asset column */}
                <div className="bor-process__panel-asset">
                  <Image
                    src={step.asset}
                    alt={step.assetAlt}
                    role="presentation"
                    width={360}
                    height={360}
                    quality={80}
                    className="bor-process__step-img"
                    style={{
                      objectFit: "contain",
                      /* Static per Pass 5 site-wide rule  --  only hero assets float. */
                    }}
                  />
                </div>

                {/* Copy column */}
                <div className="bor-process__panel-copy">
                  <div className="bor-process__step-num">Step {step.number}</div>
                  <h3 className="bor-process__step-h3">{step.heading}</h3>
                  <p className="bor-process__step-body">{step.body}</p>
                  <p className="bor-process__step-bullet">{step.bullet}</p>
                </div>
              </div>
            </div>

            {/* Mobile accordion */}
            <div className="bor-process__accordion" aria-label="Borrower process steps">
              {STEPS.map((s, i) => (
                <div key={s.number} className="bor-process__acc-item">
                  <button
                    className="bor-process__acc-btn"
                    aria-expanded={expandedMobile === i}
                    onClick={() => toggleMobile(i)}
                  >
                    <span className="bor-process__acc-btn-label">
                      <span className="bor-process__acc-num">{s.number}</span>
                      {s.tabLabel}
                    </span>
                    <span className="bor-process__acc-chevron" aria-hidden="true">&#8964;</span>
                  </button>
                  <div
                    className={`bor-process__acc-body${expandedMobile === i ? " bor-process__acc-body--open" : ""}`}
                    aria-hidden={expandedMobile !== i}
                  >
                    <div className="bor-process__acc-inner">
                      <Image
                        src={s.asset}
                        alt="" aria-hidden="true"
                        role="presentation"
                        width={200}
                        height={200}
                        quality={75}
                        className="bor-process__acc-asset"
                        style={{ objectFit: "contain" }}
                      />
                      <h3 className="bor-process__step-h3">{s.heading}</h3>
                      <p className="bor-process__step-body">{s.body}</p>
                      <p className="bor-process__step-bullet">{s.bullet}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
