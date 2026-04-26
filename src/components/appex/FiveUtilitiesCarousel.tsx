"use client";
/**
 * FiveUtilitiesCarousel.tsx
 *
 * Client island  --  horizontal-split card drag-scroll carousel for the 5 $APPEX utilities.
 * Justification for "use client": useState for activeDot index + pill counter,
 *   useRef for track + card refs (IntersectionObserver), useEffect for
 *   IntersectionObserver setup + keyboard nav, mouse drag event handlers.
 *
 * Design source: appex-revision-round-2.md §1 (horizontal split redesign)
 * Card anatomy: IMAGE ZONE (left 50%) + COPY ZONE (right 50%) horizontal split
 *   Mobile (<768px): reverts to vertical stack (image top, copy bottom)
 * Background: r17-texture-grounding.png at 0.35 opacity, left-top anchored (uniform all 5 cards)
 * Scroll affordances: right-edge peek, right-edge gradient fade, live counter pill.
 * Text-cutoff fix: min-height 360px, no fixed height, aspect-ratio 1/1 on image zone.
 * Copy: appex.md Section 2. Present tense. No em dashes.
 * Rev 4 rules: no inline script, no Math.random(), gradientUnits userSpaceOnUse.
 * Opacity rule: floating assets always opacity 1  --  never animated below 1.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";

interface UtilityCard {
  id:          string;
  num:         string;
  label:       string;
  headline:    string;
  body:        string;
  bullets:     string[];
  heroAsset:   string;
  heroAlt:     string;
}

const UTILITIES: UtilityCard[] = [
  {
    id:          "payment-backing",
    num:         "01",
    label:       "PAYMENT",
    headline:    "Every payout is a market buy.",
    body:        "When a recipient asks for $APPEX, the vault draws USDC, routes it to a DEX, and buys the token at market. Selling pressure from later recipient sales is neutralized by the earlier purchase. Demand is mechanical.",
    bullets:     [
      "Vault purchases $APPEX on every token-format payout",
      "Demand scales with borrower volume, not marketing spend",
      "No fees charged to recipients",
    ],
    heroAsset:   "/images/r22-appex-token-bright-transparent.webp",
    heroAlt:     "The branded $APPEX token representing the mechanical market buy on every payout",
  },
  {
    id:          "staking-rewards",
    num:         "02",
    label:       "STAKING",
    headline:    "Real fees. No emissions.",
    body:        "Fifty percent of protocol fees convert to $APPEX and distribute to stakers. The conversion runs through a DEX purchase when fees arrive in USDC and through a direct transfer when fees arrive in $APPEX. Either way, stakers get paid.",
    bullets:     [
      "50% of every protocol fee flows to stakers",
      "Eligibility capped by locked LP tokens, not wallet size",
      "Rewards originate from borrower activity, not new issuance",
    ],
    heroAsset:   "/images/r79-asset-staking-lock-bright-transparent.webp",
    heroAlt:     "Literal lock  --  staking rewards",
  },
  {
    id:          "fee-discounts",
    num:         "03",
    label:       "DISCOUNT",
    headline:    "Pay in $APPEX, pay less.",
    body:        "Borrowers who pay the protocol fee in $APPEX pay twenty-five percent less. On a $10,000 advance at a 2% protocol fee, the bill drops from $200 in USDC to $150 in $APPEX. The discount applies only to the protocol fee, never to LP yield.",
    bullets:     [
      "25% cut on protocol fees when settled in $APPEX",
      "$150 in $APPEX versus $200 in USDC on a 2% fee, $10K advance",
      "LP yield fee is unaffected and always paid in USDC",
    ],
    heroAsset:   "/images/r62-asset-util-lower-fees-bright-transparent.webp",
    heroAlt:     "Lower-fees utility form representing protocol fee discount for $APPEX payment",
  },
  {
    id:          "platform-utility",
    num:         "04",
    label:       "PLATFORM",
    headline:    "The token accepted across partner platforms.",
    body:        "Partner platforms operated by approved borrowers accept $APPEX for subscriptions, marketplace purchases, and premium services. Recipients who receive $APPEX can spend it where they already work. Borrowers accumulate it passively and pay protocol fees with it.",
    bullets:     [
      "Accepted for subscriptions, marketplace spend, and premium services",
      "Recipients spend $APPEX on partner platforms at discounted rates",
      "Borrowers accumulate $APPEX through platform revenue",
    ],
    heroAsset:   "/images/r86-asset-token-constellation-bright-transparent.webp",
    heroAlt:     "Orb-style token constellation representing $APPEX accepted across partner platforms",
  },
  {
    id:          "governance",
    num:         "05",
    label:       "GOVERNANCE",
    headline:    "One staked token, one vote.",
    body:        "Governance rights live in the staking contract. Tokens held in wallets or on exchanges do not vote. Stakers steer vault parameters, borrower approvals, fee structures, new vault creation, and DeFi deployment.",
    bullets:     [
      "Voting weight tied to staked position, not wallet balance",
      "Five decision scopes, starting with vault and borrower parameters",
      "No drive-by votes from passive holders",
    ],
    heroAsset:   "/images/r45-asset-governance-quorum-ring-bright-transparent.webp",
    heroAlt:     "Governance quorum ring representing one-token-one-vote staking governance",
  },
];

export function FiveUtilitiesCarousel(): React.JSX.Element {
  const [activeDot, setActiveDot]   = useState<number>(0);
  const trackRef                    = useRef<HTMLDivElement>(null);
  const cardRefs                    = useRef<(HTMLElement | null)[]>([]);
  const isDragging                  = useRef<boolean>(false);
  const dragStartX                  = useRef<number>(0);
  const scrollStart                 = useRef<number>(0);
  // Stable ref so keyboard handler registered once ([] deps) always sees current dot
  const activeDotRef                = useRef<number>(0);

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

  const scrollToCard = useCallback((idx: number): void => {
    const card = cardRefs.current[idx];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, []);

  // Keep ref in sync so keyboard handler always reads current dot without re-registering
  useEffect((): void => { activeDotRef.current = activeDot; }, [activeDot]);

  // Keyboard navigation -- registered once ([] deps) via stable ref to avoid
  // teardown/re-registration on every dot change (eliminates first-keypress lag)
  useEffect((): (() => void) => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        scrollToCard(Math.max(activeDotRef.current - 1, 0));
      } else if (e.key === "ArrowRight") {
        scrollToCard(Math.min(activeDotRef.current + 1, UTILITIES.length - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return (): void => window.removeEventListener("keydown", onKey);
  // scrollToCard is stable (useCallback with [] deps) -- safe to include
  }, [scrollToCard]);

  const handleMouseDown = useCallback((e: React.MouseEvent): void => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current  = true;
    dragStartX.current  = e.clientX;
    scrollStart.current = track.scrollLeft;
    track.style.cursor  = "grabbing";
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
        /* ---- Five utilities carousel (Rev 6: horizontal-split cards) ---- */
        .util-carousel {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        .util-carousel__texture {
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

        .util-carousel__overlay {
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

        .util-carousel__ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1600px 600px at 50% 50%,
            rgba(90,28,203,0.10) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }

        .util-carousel__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .util-carousel__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .util-carousel__content { padding: 0 24px; } }

        /* Header: copy column only  --  pill moves to pill-row above track */
        .util-carousel__header {
          display: block;
          margin-bottom: 32px;
        }

        .util-carousel__header-copy {
          flex: none;
        }

        .util-carousel__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
        }

        .util-carousel__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .util-carousel__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 720px;
          margin: 0;
        }

        /* Pill row  --  sits just above carousel track */
        .util-carousel__pill-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 16px;
          padding-right: 4px;
        }

        @media (max-width: 767px) {
          .util-carousel__pill-row {
            justify-content: flex-start;
            padding-right: 0;
          }
        }

        /* Live scroll-hint pill.
         * Mobile audit exception: 11px retained -- this is a UI affordance indicator
         * (scroll hint), not body content. Small size is intentional for de-emphasis. */
        .util-carousel__pill {
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

        .util-carousel__pill-count {
          color: var(--ax-capital-yellow);
        }

        .util-carousel__pill-sep {
          opacity: 0.45;
        }

        .util-carousel__pill-arrow {
          display: inline-block;
          animation: ucPillArrow 2s ease-in-out infinite;
          font-style: normal;
        }

        @keyframes ucPillArrow {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .util-carousel__pill-arrow { animation: none; }
        }

        .util-carousel__pill-text { display: inline; }

        @media (max-width: 767px) {
          .util-carousel__pill-text { display: none; }
        }

        /* Track wrapper for edge fade positioning */
        .util-carousel__track-wrap {
          position: relative;
        }

        /* Right-edge cinematic fade */
        .util-carousel__edge-fade {
          position: absolute;
          right: -48px;
          top: 0;
          bottom: 0;
          width: 168px;
          background: linear-gradient(270deg, rgba(10,15,31,0.85) 0%, transparent 100%);
          pointer-events: none;
          z-index: 3;
        }

        /* Left-edge cinematic fade (symmetric) */
        .util-carousel__edge-fade--left {
          position: absolute;
          left: -48px;
          top: 0;
          bottom: 0;
          width: 168px;
          background: linear-gradient(90deg, rgba(10,15,31,0.85) 0%, transparent 100%);
          pointer-events: none;
          z-index: 3;
        }

        /* Drag-scroll track  --  proximity snap for gentle assist, not rigid step */
        .util-carousel__track {
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
          will-change: scroll-position; /* primes compositor before first drag -- eliminates geometry-resolution cost on cold first scroll */
        }

        .util-carousel__track::-webkit-scrollbar { display: none; }

        @media (max-width: 1023px) {
          .util-carousel__track {
            padding: 32px 80px 48px 32px;
            margin-left: -32px;
            margin-right: -32px;
          }
        }

        @media (max-width: 767px) {
          .util-carousel__track {
            padding: 24px 60px 40px 24px;
            margin-left: -24px;
            margin-right: -24px;
            gap: 16px;
          }
        }

        /* Responsive edge-fade adjustments to match track margin offsets */
        @media (max-width: 1023px) {
          .util-carousel__edge-fade {
            right: -32px;
            width: 152px;
          }
          .util-carousel__edge-fade--left {
            left: -32px;
            width: 152px;
          }
        }

        @media (max-width: 767px) {
          .util-carousel__edge-fade {
            right: -24px;
            width: 144px;
          }
          .util-carousel__edge-fade--left {
            left: -24px;
            width: 144px;
          }
        }

        /* ---- Card (horizontal split: image-left / copy-right) ---- */
        .util-card {
          flex: 0 0 680px;
          scroll-snap-align: center;
          border: 1px solid rgba(90,28,203,0.22);
          border-radius: var(--radius-md, 16px);
          min-height: 360px;
          display: flex;
          flex-direction: row;
          position: relative;
          overflow: hidden;
          transition: transform 400ms ease-out, border-color 300ms ease;
          will-change: transform;
        }

        .util-card:hover,
        .util-card:focus-within {
          transform: scale(1.015);
          border-color: rgba(90,28,203,0.40);
        }

        @media (max-width: 1023px) { .util-card { flex: 0 0 540px; } }

        /* Mobile: revert to vertical stack */
        @media (max-width: 767px) {
          .util-card {
            flex: 0 0 320px;
            flex-direction: column;
            min-height: auto;
          }
        }

        /* Shared card background texture layer (uniform across all 5 cards) */
        .util-card__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left top;
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        /* IMAGE ZONE  --  280px at desktop, 240px at tablet */
        .util-card__image-zone {
          position: relative;
          flex: 0 0 280px;
          width: 280px;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: var(--radius-md, 16px) 0 0 var(--radius-md, 16px);
          background: transparent;
          z-index: 1;
        }

        @media (max-width: 1023px) {
          .util-card__image-zone { flex: 0 0 240px; width: 240px; height: 320px; }
        }

        /* Mobile: image zone full-width, reverts to top */
        @media (max-width: 767px) {
          .util-card__image-zone {
            flex: none;
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
            border-radius: var(--radius-md, 16px) var(--radius-md, 16px) 0 0;
          }
        }

        .util-card__glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .util-card__asset-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }

        /* Asset: static per Pass 6 site-wide float rule */
        .util-card__asset {
          width: 100%;
          height: 100%;
          max-width: 240px;
          max-height: 280px;
          object-fit: contain;
          opacity: 1;
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        /* CAPTION ZONE  --  flex: 1 auto uses remaining space: 680 - 280 = 400px */
        .util-card__caption {
          flex: 1 1 auto;
          background: rgba(10,15,31,0.68);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-radius: 0 var(--radius-md, 16px) var(--radius-md, 16px) 0;
          overflow: visible;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1023px) {
          .util-card__caption { padding: 28px 28px; }
        }

        /* Mobile: caption zone full-width, reverts to bottom */
        @media (max-width: 767px) {
          .util-card__caption {
            flex: none;
            width: 100%;
            border-radius: 0 0 var(--radius-md, 16px) var(--radius-md, 16px);
            padding: 20px 20px 24px;
          }
        }

        /* Mobile audit exception: 11px retained -- UI ordinal indicator ("01 of 05"),
         * not body content. Letter-spacing + uppercase provides adequate legibility. */
        .util-card__num-label {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          line-height: 1;
        }

        .util-card__headline {
          font-family: var(--font-display-family);
          font-size: 20px;
          font-weight: 500;
          line-height: 1.25;
          color: var(--text-primary);
          margin: 0;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .util-card__body {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        .util-card__bullets {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .util-card__bullet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        .util-card__bullet::before {
          content: '';
          flex-shrink: 0;
          width: 2px;
          height: 1em;
          margin-top: 3px;
          background: linear-gradient(180deg, var(--ax-capital-yellow), var(--ax-node-purple, #5A1CCB));
          border-radius: 1px;
        }

        /* Navigation dots */
        .util-carousel__dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
        }

        .util-carousel__dot {
          height: 8px;
          border-radius: 999px;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 300ms ease, width 300ms ease;
          background: rgba(255,255,255,0.18);
          width: 8px;
        }

        .util-carousel__dot--active {
          background: var(--ax-capital-yellow);
          width: 24px;
        }

        .util-carousel__dot:hover:not(.util-carousel__dot--active) {
          background: rgba(255,255,255,0.42);
        }

        .util-carousel__dot:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }
      `}</style>

      <section
        className="util-carousel"
        id="utilities"
        aria-labelledby="util-carousel-heading"
      >
        <Image
          src="/images/r17-texture-calm.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="util-carousel__texture"
          style={{ objectFit: "cover" }}
        />
        <div className="util-carousel__overlay" aria-hidden="true" />
        <div className="util-carousel__ambient" aria-hidden="true" />

        <div className="util-carousel__content">

          {/* Header: copy column only */}
          <div className="util-carousel__header">
            <div className="util-carousel__header-copy">
              <div className="util-carousel__eyebrow">What it does</div>
              <h2 id="util-carousel-heading" className="util-carousel__h2">
                Five utilities.{" "}
                <span className="text-gold-gradient">One token.</span>
              </h2>
              <p className="util-carousel__subhead">
                Four utilities are demand-side: the vault, the borrower, the LP, and the recipient all touch $APPEX for reasons tied to real protocol activity. The fifth is governance, earned only by staking.
              </p>
            </div>
          </div>

          {/* Track with edge fade */}
          <div className="util-carousel__track-wrap">
            {/* Pill row  --  just above the track */}
            <div className="util-carousel__pill-row">
              <div
                className="util-carousel__pill"
                aria-live="polite"
                aria-label={`Viewing utility ${activeDot + 1} of ${UTILITIES.length}`}
              >
                <span className="util-carousel__pill-count">{pillNum}</span>
                <span className="util-carousel__pill-sep">/</span>
                <span>0{UTILITIES.length}</span>
                <em className="util-carousel__pill-arrow" aria-hidden="true">&#8250;</em>
                <span className="util-carousel__pill-text">Drag to explore</span>
              </div>
            </div>
            <div className="util-carousel__edge-fade util-carousel__edge-fade--left" aria-hidden="true" />
            <div className="util-carousel__edge-fade" aria-hidden="true" />

            <div
              ref={trackRef}
              className="util-carousel__track"
              role="region"
              aria-label="Five $APPEX utilities"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              {UTILITIES.map((u, i) => (
                <article
                  key={u.id}
                  ref={(el): void => { cardRefs.current[i] = el; }}
                  className="util-card"
                  id={`util-card-${u.id}`}
                  style={{
                    "--uc-float-dur":   "8s",
                    "--uc-float-delay": `${i * 0.6}s`,
                  } as React.CSSProperties}
                >
                  {/* Shared background texture  --  r17-texture-grounding at 0.35 (all 5 cards) */}
                  <Image
                    src="/images/r17-texture-grounding.webp"
                    alt="" aria-hidden="true"
                    fill
                    sizes="560px"
                    quality={60}
                    className="util-card__bg"
                    style={{
                      objectFit: "cover",
                      objectPosition: "left top",
                    }}
                    loading={i < 2 ? "eager" : "lazy"}
                  />

                  {/* IMAGE ZONE (left 33%) */}
                  <div className="util-card__image-zone">
                    {/* Uniform warm yellow-amber glow across all 5 cards */}
                    <div
                      className="util-card__glow"
                      style={{
                        background: `radial-gradient(ellipse 300px 280px at 50% 50%, rgba(254,214,7,0.22) 0%, transparent 65%)`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="util-card__asset-wrap">
                      <Image
                        src={u.heroAsset}
                        alt={u.heroAlt}
                        width={280}
                        height={280}
                        className="util-card__asset"
                        style={{ filter: `drop-shadow(0 30px 48px rgba(90,28,203,0.38))` }}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  </div>

                  {/* CAPTION ZONE (right 67%) */}
                  <div className="util-card__caption">
                    <div className="util-card__num-label">
                      <span aria-hidden="true">{u.num}</span>
                      <span className="sr-only">Utility {i + 1}: </span>
                      {" \u00b7 "}{u.label}
                    </div>
                    <h3 className="util-card__headline">{u.headline}</h3>
                    <p className="util-card__body">{u.body}</p>
                    <ul className="util-card__bullets">
                      {u.bullets.map((b, bi) => (
                        <li key={bi} className="util-card__bullet">{b}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div
            className="util-carousel__dots"
            role="tablist"
            aria-label="Navigate $APPEX utilities"
          >
            {UTILITIES.map((u, i) => (
              <button
                key={u.id}
                type="button"
                role="tab"
                aria-selected={activeDot === i ? "true" : "false"}
                aria-controls={`util-card-${u.id}`}
                aria-label={`Show utility ${i + 1} of ${UTILITIES.length}: ${u.label}`}
                className={`util-carousel__dot${activeDot === i ? " util-carousel__dot--active" : ""}`}
                onClick={(): void => scrollToCard(i)}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
