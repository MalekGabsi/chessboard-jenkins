export default function Square({
  square,
  isLight,
  isSelected,
  onDrop,
  onClick,
  children,
}) {
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const from = e.dataTransfer.getData("text/plain");
    onDrop(from);
  }

  const base = isLight ? "var(--light)" : "var(--dark)";

  return (
    <div
      data-testid={`sq-${square}`}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: base,
        transition: "transform .08s ease, filter .15s ease, outline .15s ease",
        outline: isSelected ? "3px solid rgba(124,218,255,.95)" : "none",
        outlineOffset: "-3px",
        boxShadow: isSelected
          ? "inset 0 0 0 999px rgba(124,218,255,.10)"
          : "none",
      }}
      aria-label={`Square ${square}`}
    >
      {/* coord */}
      <div
        style={{
          position: "absolute",
          bottom: 7,
          right: 8,
          fontSize: 10,
          opacity: 0.38,
          color: "#0b1020",
          userSelect: "none",
          fontWeight: 700,
        }}
      >
        {square}
      </div>

      {/* subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(120px 120px at 50% 45%, rgba(255,255,255,.16), transparent 60%)",
          opacity: isLight ? 0.35 : 0.22,
        }}
      />

      {children}
    </div>
  );

  
}
