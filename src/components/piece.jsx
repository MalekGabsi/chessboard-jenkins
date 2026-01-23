import { pieceToUnicode } from "../domain/pieces";

export default function Piece({ piece, square }) {
  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", square);
    e.dataTransfer.effectAllowed = "move";
  }

  return (
    <div
      data-testid={`piece-${square}`}
      data-piece={piece}
      data-square={square}
      draggable
      onDragStart={handleDragStart}
      style={styles.piece}
      aria-label={`Pièce ${piece} sur ${square}`}
      title={`${piece} @ ${square}`}
    >
      {pieceToUnicode(piece)}
    </div>
  );
}

const styles = {
  piece: {
    fontSize: 50,
    lineHeight: "50px",
    cursor: "grab",
    userSelect: "none",
    transform: "translateZ(0)",
    filter:
      "drop-shadow(0 10px 10px rgba(0,0,0,.35)) drop-shadow(0 1px 0 rgba(255,255,255,.25))",
    transition: "transform .12s ease, filter .12s ease",
  },
};

