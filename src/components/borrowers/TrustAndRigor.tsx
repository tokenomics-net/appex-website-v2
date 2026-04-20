"use client";
/**
 * TrustAndRigor.tsx
 *
 * Client island  --  needs drag-scroll + IntersectionObserver + keyboard navigation.
 * Justification for "use client": useRef for track + card refs, useState for activeDot,
 *   useEffect for IntersectionObserver + keyboard nav, mouse drag event handlers.
 *
 * Design source: borrowers-design.md Section 6  --  "Trust & rigor (proactive framing)"
 * Background: r23-scene-trust.webp at 100% (Option B) + 45/30/45 tint overlay.
 *   Same scene as /protocol RiskCarousel and /lps risk carousel  --  cross-page vocabulary.
 *   NO texture. Scene + texture are never combined.
 * Five glass cards with protection pills (green-accent, distinct from severity yellow).
 *   Pill color: #8BE0A3 per borrowers-design.md autonomous pick.
 * Per-card icon at 64px top-left. All icons from approved r19 library (fee-split-disc, security-seal, governance-ring, fee-split-disc again).
 * Drag-scroll: mouse + native touch. NO auto-cycle.
 * Navigation dots with IntersectionObserver drive active state.
 * Keyboard: left/right arrows advance one card.
 * Copy: copy/borrowers.md Section 6. Borrower-forward framing. No em dashes.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";

interface ProtectionCard {
  id:         string;
  pill:       string;
  headline:   string;
  summary:    string;
  bullets:    string[];
  icon:       string;
}

const PROTECTION_CARDS: ProtectionCard[] = [
  {
    id:         "structured-application",
    pill:       "Protects your application",
    headline:   "Same track for every applicant.",
    summary:    "One lane runs straight through. Financials, revenue history, customer payment data, and business-model docs travel it in the same order.",
    bullets:    [
      "No discretionary fast-lane, no relationship shortcut",
      "Your application responds on quality, not on who you know",
    ],
    icon:       "/images/r36-asset-single-lane-transparent.webp",
  },
  {
    id:         "customer-relationship",
    pill:       "Protects your customer relationship",
    headline:   "Credit focus stays on you.",
    summary:    "The aperture points at one subject. Evaluation assesses the borrower's own ability to repay, not the downstream customer's.",
    bullets:    [
      "Customers are not pulled into vendor-finance diligence",
      "Your customers never learn you financed the receivable",
    ],
    icon:       "/images/r36-asset-you-focus-transparent.webp",
  },
  {
    id:         "peer-pool",
    pill:       "Protects the peer pool",
    headline:   "Every borrower clears the same bar.",
    summary:    "One bar sits across the pool. Corporate identity, beneficial ownership, regulatory standing, and financial review each clear it before a facility opens.",
    bullets:    [
      "No pay-to-play counterparty drift over time",
      "You stand next to peers who passed the same bar",
    ],
    icon:       "/images/r36-asset-clear-bar-transparent.webp",
  },
  {
    id:         "margin",
    pill:       "Protects your margin",
    headline:   "One curve. One written facility.",
    summary:    "Borrowing limit, payment-term range, LP yield fee, and protocol fee rate are agreed together and inscribed during onboarding.",
    bullets:    [
      "Fees fixed during onboarding, not haggled per invoice",
      "The $APPEX discount is written into the facility",
    ],
    icon:       "/images/r36-asset-written-facility-transparent.webp",
  },
  {
    id:         "facility",
    pill:       "Protects your facility",
    headline:   "Discipline rewards draw access.",
    summary:    "Standing in the pool compounds in steps. Each earned step shapes draw access when vault liquidity tightens.",
    bullets:    [
      "Fee generation, payment velocity, credit quality compound into priority",
      "Acting like a long-term partner earns matching treatment",
    ],
    icon:       "/images/r36-asset-priority-stair-transparent.webp",
  },
];

export function TrustAndRigor(): React.JSX.Element {
  const [activeDot, setActiveDot] = useState<number>(0);
  const trackRef                   = useRef<HTMLDivElement>(null);
  const cardRefs                   = useRef<(HTMLElement | null)[]>([]);
  const isDragging                 = useRef<boolean>(false);
  const dragStartX                 = useRef<number>(0);
  const scrollStart                = useRef<number>(0);

  // IntersectionObserver drives dot state + pill counter
  useEffect((): (() => void) => {
    const track = trackRef.current;
    if (!track) return (): void => {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              setActiveDot(idx);
            }
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

  const scrollToCard = useCallback((idx: number): void => {
    const card = cardRefs.current[idx];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, []);

  // Keyboard navigation
  useEffect((): (() => void) => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft")  scrollToCard(Math.max(activeDot - 1, 0));
      if (e.key === "ArrowRight") scrollToCard(Math.min(activeDot + 1, PROTECTION_CARDS.length - 1));
    };
    window.addEventListener("keydown", onKey);
    return (): void => window.removeEventListener("keydown", onKey);
  }, [activeDot, scrollToCard]);

  // Mouse drag handlers
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStart.current = track.scrollLeft;
    track.style.cursor = "grabbing";
    track.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const delta = e.clientX - dragStartX.current;
    track.scrollLeft = scrollStart.current - delta;
  }, []);

  const onMouseUp = useCallback((): void => {
    isDragging.current = false;
    const track = trackRef.current;
    if (track) {
      track.style.cursor = "grab";
      track.style.userSelect = "";
    }
  }, []);

  return (
    <>
      <style>{`
        /* ---- Trust & rigor  --  proactive-framing drag-scroll carousel ---- */
        .trust-rigor {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
          min-height: 600px;
        }

        /* Layer 0: r23-scene-trust at 100% */
        .trust-rigor__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
          pointer-events: none;
          z-index: 0;
        }

        /* Tint overlay: 45/30/45 top-middle-bottom */
        .trust-rigor__tint {
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

        /* Top hairline */
        .trust-rigor__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.16);
          pointer-events: none;
          z-index: 2;
        }

        /* Content */
        .trust-rigor__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .trust-rigor__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .trust-rigor__content { padding: 0 24px; } }

        /* Section header */
        .trust-rigor__header {
          max-width: 720px;
          margin-bottom: 16px;
        }

        .trust-rigor__header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 0;
        }

        .trust-rigor__eyebrow {
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

        .trust-rigor__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 16px 0;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .trust-rigor__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-primary);
          max-width: 720px;
          margin: 0 0 12px 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
        }

        /* Drag pill  --  prominently sized, inline with header-row */
        .trust-rigor__drag-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(10,15,31,0.72);
          border: 1px solid rgba(90,28,203,0.28);
          border-radius: 9999px;
          padding: 10px 20px;
          font-family: var(--font-display-family);
          font-size: 14px;
          letter-spacing: 1px;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .trust-rigor__drag-pill-count {
          font-weight: 700;
          color: var(--ax-capital-yellow, #FED607);
        }

        .trust-rigor__drag-pill-sep {
          opacity: 0.35;
        }

        .trust-rigor__drag-pill-action {
          color: var(--ax-capital-yellow, #FED607);
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 2px;
        }

        /* Carousel track */
        .trust-rigor__track {
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
          margin: 0 -48px;
        }

        .trust-rigor__track::-webkit-scrollbar { display: none; }

        @media (max-width: 1023px) {
          .trust-rigor__track {
            margin: 0 -32px;
            padding: 32px 80px 48px 32px;
          }
        }

        @media (max-width: 767px) {
          .trust-rigor__track {
            margin: 0 -24px;
            padding: 24px 48px 40px 24px;
            gap: 16px;
          }
        }

        /* Card */
        .trust-rigor__card {
          flex: 0 0 340px;
          scroll-snap-align: center;
          background: rgba(10,15,31,0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(90,28,203,0.24);
          border-radius: var(--radius-md, 12px);
          padding: 28px 32px;
          min-height: 440px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        @media (max-width: 767px) {
          .trust-rigor__card { flex: 0 0 280px; }
        }

        /* Protection pill  --  REMOVED per recovery pass (Tony rejected green pills) */

        /* Card icon  --  prominent 180px asset, static (no float per recovery pass) */
        .trust-rigor__icon {
          width: 180px;
          height: 180px;
          object-fit: contain;
          margin: 0 auto 24px;
          flex-shrink: 0;
          opacity: 1;
          filter:
            drop-shadow(0 20px 40px rgba(90,28,203,0.35))
            drop-shadow(0 10px 20px rgba(254,214,7,0.15));
          display: block;
        }

        @media (max-width: 767px) {
          .trust-rigor__icon { width: 120px; height: 120px; }
        }

        /* Card legibility panel */
        .trust-rigor__card-panel {
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(254,214,7,0.12);
          border-radius: var(--radius-sm, 10px);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .trust-rigor__card-summary {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        .trust-rigor__card-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .trust-rigor__card-bullet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: var(--font-body-family);
          font-size: 13px;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        .trust-rigor__card-bullet::before {
          content: '';
          flex-shrink: 0;
          width: 2px;
          height: 1em;
          margin-top: 2px;
          background: linear-gradient(180deg, var(--ax-capital-yellow, #FED607), var(--ax-node-purple, #5A1CCB));
          border-radius: 1px;
        }

        /* Card content */
        .trust-rigor__card-h3 {
          font-family: var(--font-display-family);
          font-size: 20px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          line-height: 1.2;
          flex-shrink: 0;
        }

        .trust-rigor__how-label,
        .trust-rigor__why-label {
          font-family: var(--font-display-family);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }

        .trust-rigor__how-label { color: var(--ax-capital-yellow, #FED607); opacity: 0.60; }
        .trust-rigor__why-label { color: var(--ax-ether-mist, #B9A0CC); opacity: 0.70; }

        .trust-rigor__how-body,
        .trust-rigor__why-body {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0 0 16px 0;
        }

        .trust-rigor__why-body {
          color: var(--text-primary);
          opacity: 0.85;
        }



        /* Navigation dots */
        .trust-rigor__dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .trust-rigor__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.20);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 200ms ease, transform 200ms ease;
        }

        .trust-rigor__dot--active {
          background: var(--ax-capital-yellow, #FED607);
          transform: scale(1.25);
        }

        .trust-rigor__dot:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 3px;
        }
      `}</style>

      <section className="trust-rigor" id="rigor" aria-labelledby="trust-rigor-heading">

        {/* Scene */}
        <Image
          src="/images/r23-scene-trust.webp"
          alt="" aria-hidden="true"
          role="presentation"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={85}
          className="trust-rigor__scene"
          style={{ objectFit: "cover", objectPosition: "center right" }}
          loading="lazy"
        />
        <div className="trust-rigor__tint"     aria-hidden="true" />
        <div className="trust-rigor__hairline" aria-hidden="true" />

        <div className="trust-rigor__content">

          {/* Section header */}
          <header>
            <div className="trust-rigor__eyebrow">Trust and rigor</div>
            <h2 className="trust-rigor__h2" id="trust-rigor-heading">
              Discipline is{" "}
              <span className="text-gold-gradient">the feature.</span>
            </h2>
            <p className="trust-rigor__subhead">
              Five checks sit between an application and an approved facility. Each one protects something the borrower cares about. Protection here is mutual, not one-sided.
            </p>
            {/* Pill counter and drag label removed per Pass 5 feedback. */}
          </header>

          {/* Drag-scroll track */}
          <div
            className="trust-rigor__track"
            ref={trackRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            role="region"
            aria-label="Trust and rigor cards"
            tabIndex={0}
          >
            {PROTECTION_CARDS.map((card, i) => (
              <article
                key={card.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="trust-rigor__card"
                aria-label={card.pill}
              >
                {/* Icon  --  prominent 180px */}
                <Image
                  src={card.icon}
                  alt="" aria-hidden="true"
                  role="presentation"
                  width={180}
                  height={180}
                  quality={80}
                  className="trust-rigor__icon"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                />

                {/* Card content */}
                <h3 className="trust-rigor__card-h3">{card.headline}</h3>

                <div className="trust-rigor__card-panel">
                  <p className="trust-rigor__card-summary">{card.summary}</p>
                  <ul className="trust-rigor__card-bullets">
                    {card.bullets.map((b, bi) => (
                      <li key={bi} className="trust-rigor__card-bullet">{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="trust-rigor__dots" role="group" aria-label="Card navigation">
            {PROTECTION_CARDS.map((card, i) => (
              <button
                key={card.id}
                className={`trust-rigor__dot${activeDot === i ? " trust-rigor__dot--active" : ""}`}
                onClick={() => scrollToCard(i)}
                aria-label={`Show protection card ${i + 1} of ${PROTECTION_CARDS.length}: ${card.pill}`}
                aria-pressed={activeDot === i}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
