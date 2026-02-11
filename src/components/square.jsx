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

  const file = square[0];       // a..h
  const rank = square[1];       // 1..8

  // ✅ affichage des chiffres seulement sur la colonne 'a'
  const showRank = file === "a";
  // ✅ affichage des lettres seulement sur la rangée '1'
  const showFile = rank === "1";

  // Couleurs comme ton screenshot
  const light = "#EEEED2";
  const dark = "#4C7398"; // bleu
  const base = isLight ? light : dark;

  return (
    <div
      data-testid={`sq-${square}`}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        ...styles.square,
        background: base,

        // optionnel: sélection visible
        outline: isSelected ? "3px solid rgba(255,255,255,.85)" : "none",
        outlineOffset: "-3px",
      }}
      aria-label={`Square ${square}`}
    >
      {/* ✅ Rank à gauche (8..1) */}
      {showRank && (
        <div
          style={{
            ...styles.rankLabel,
            color: isLight ? "rgba(0,0,0,.70)" : "rgba(255,255,255,.92)",
          }}
        >
          {rank}
        </div>
      )}

      {/* ✅ File en bas (a..h) */}
      {showFile && (
        <div
          style={{
            ...styles.fileLabel,
            color: isLight ? "rgba(0,0,0,.70)" : "rgba(255,255,255,.92)",
          }}
        >
          {file}
        </div>
      )}

      {/* zone pièce */}
      <div style={styles.center}>{children}</div>
    </div>
  );
}

const styles = {
  square: {
    width: "100%",
    height: "100%",              // ✅ même taille vide/avec pièce
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    userSelect: "none",
  },

  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  rankLabel: {
    position: "absolute",
    left: 8,
    top: 6,
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1,
    textShadow: "0 1px 0 rgba(0,0,0,.15)",
    pointerEvents: "none",
  },

  fileLabel: {
    position: "absolute",
    right: 8,
    bottom: 6,
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1,
    textShadow: "0 1px 0 rgba(0,0,0,.15)",
    pointerEvents: "none",
    textTransform: "lowercase",
  },
};
