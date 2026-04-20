/**
 * components/boilerplate/RouteLoading.tsx
 *
 * Shared route-level loading state component.
 * Re-exported by every app/{route}/loading.tsx to eliminate 6 identical copies.
 *
 * Server Component  --  no "use client" needed.
 * Justification: static markup, CSS keyframe animation only, no hooks or browser APIs.
 *
 * Matches root app/loading.tsx design with full reduced-motion support.
 */

export function RouteLoading() {
  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     "var(--ax-fortress, #0A0F1F)",
      }}
      aria-label="Loading"
      role="status"
    >
      <div
        style={{
          width:          "40px",
          height:         "40px",
          border:         "2px solid rgba(90, 28, 203, 0.3)",
          borderTopColor: "var(--ax-capital-yellow, #FED607)",
          borderRadius:   "50%",
          animation:      "spin 800ms linear infinite",
        }}
        aria-hidden="true"
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[aria-hidden="true"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
