"use client";
// "use client" is required  --  error boundaries must be Client Components.
// Justification: Next.js Error Boundary API requires client-side state and
// event handlers (useEffect for logging, unstable_retry() for recovery).

/**
 * app/error.tsx
 *
 * Root error boundary  --  catches runtime errors in any route segment.
 *
 * In Next.js 16, the recovery function is `unstable_retry` (not `reset`).
 * Replace placeholder styles with actual brand design from DESIGN.md.
 */

import { useEffect } from "react";
import { BUSINESS_NAME } from "@/lib/site-config";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "4rem 2rem",
        textAlign: "center",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "var(--color-text-primary, #111)",
          marginBottom: "1rem",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary, #555)",
          maxWidth: "480px",
          lineHeight: "1.6",
          marginBottom: "2rem",
        }}
      >
        An unexpected error occurred on the {BUSINESS_NAME} website. Please try
        again. If the problem persists, contact us directly.
      </p>
      <button
        onClick={unstable_retry}
        style={{
          padding: "0.75rem 2rem",
          background: "var(--color-primary, #000)",
          color: "var(--color-primary-foreground, #fff)",
          borderRadius: "0.375rem",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        Try again
      </button>
    </div>
  );
}
