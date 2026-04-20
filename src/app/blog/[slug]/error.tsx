"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PostError({ error, reset }: ErrorProps) {
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
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ax-capital-yellow, #FED607)",
          opacity: 0.9,
        }}
      >
        Something went wrong
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "12px 24px",
            background: "transparent",
            border: "1px solid rgba(254, 214, 7, 0.3)",
            borderRadius: "6px",
            color: "var(--ax-capital-yellow, #FED607)",
            fontFamily: "var(--font-display-family, system-ui)",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            background: "transparent",
            border: "1px solid rgba(254, 214, 7, 0.3)",
            borderRadius: "6px",
            color: "var(--ax-capital-yellow, #FED607)",
            fontFamily: "var(--font-display-family, system-ui)",
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          Back to all posts
        </Link>
      </div>
    </div>
  );
}
