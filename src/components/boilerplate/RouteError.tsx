"use client";
// "use client" required  --  Next.js Error Boundary API requires client-side state.
// Justification: useEffect for logging, unstable_retry() for recovery (Next.js 16 API).

/**
 * components/boilerplate/RouteError.tsx
 *
 * Shared route-level error boundary component.
 * Re-exported by every app/{route}/error.tsx to eliminate 6 identical copies.
 *
 * Uses Next.js 16 unstable_retry API (not the deprecated reset prop from Next.js 15).
 * Brand-styled: appeX navy background, gold accent text, matches the overall dark theme.
 */

import { useEffect } from "react";

interface RouteErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export function RouteError({ error, unstable_retry }: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "96px 24px",
        background:     "var(--ax-fortress, #0A0F1F)",
        textAlign:      "center",
        gap:            "24px",
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
      <button
        onClick={unstable_retry}
        style={{
          padding:    "12px 24px",
          background: "transparent",
          border:     "1px solid rgba(254, 214, 7, 0.3)",
          borderRadius: "6px",
          color:      "var(--ax-capital-yellow, #FED607)",
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize:   "13px",
          cursor:     "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
