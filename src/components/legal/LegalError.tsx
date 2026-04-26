"use client";
// "use client" required -- Next.js Error Boundary API requires client-side state.
// Justification: useEffect for error logging, unstable_retry() for recovery (Next.js 16 API).

import { useEffect } from "react";
import Link from "next/link";

// Next.js 16 uses unstable_retry, not reset.
// reset existed in Next.js 13-15. Using reset here causes a TypeError in production
// because the prop is undefined -- the "Try again" button silently does nothing.
interface LegalErrorProps {
  error:          Error & { digest?: string };
  unstable_retry: () => void;
}

/**
 * LegalError
 *
 * Shared error boundary UI for /terms, /privacy, and /disclosures.
 * Matches the style established in blog/[slug]/error.tsx:
 *   - Navy fortress background
 *   - Brand yellow label + CTA
 *   - Retry button + back navigation
 */
export function LegalError({ error, unstable_retry }: LegalErrorProps): React.JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 24px",
        background: "var(--ax-fortress, #0A0F1F)",
        textAlign: "center",
        gap: "24px",
      }}
    >
      <p
        style={{
          fontFamily:    "var(--font-display-family, system-ui)",
          fontSize:      "14px",
          fontWeight:    600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "var(--ax-capital-yellow, #FED607)",
          opacity:       0.9,
        }}
      >
        Something went wrong
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={unstable_retry}
          style={{
            padding:      "12px 24px",
            background:   "transparent",
            border:       "1px solid rgba(254, 214, 7, 0.3)",
            borderRadius: "6px",
            color:        "var(--ax-capital-yellow, #FED607)",
            fontFamily:   "var(--font-display-family, system-ui)",
            fontSize:     "13px",
            cursor:       "pointer",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            padding:       "12px 24px",
            background:    "transparent",
            border:        "1px solid rgba(254, 214, 7, 0.3)",
            borderRadius:  "6px",
            color:         "var(--ax-capital-yellow, #FED607)",
            fontFamily:    "var(--font-display-family, system-ui)",
            fontSize:      "13px",
            textDecoration: "none",
          }}
        >
          Back to appeX
        </Link>
      </div>
    </div>
  );
}
