export default function PostLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ax-fortress, #0A0F1F)",
      }}
      aria-label="Loading post"
      role="status"
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "2px solid rgba(90, 28, 203, 0.3)",
          borderTopColor: "var(--ax-capital-yellow, #FED607)",
          borderRadius: "50%",
          animation: "spin 800ms linear infinite",
        }}
        aria-hidden="true"
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
