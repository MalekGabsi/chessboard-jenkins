// Notation simple: wK = white king, bQ = black queen, etc.
export function pieceToUnicode(p) {
  const map = {
    wK: "♔",
    wQ: "♕",
    wR: "♖",
    wB: "♗",
    wN: "♘",
    wP: "♙",
    bK: "♚",
    bQ: "♛",
    bR: "♜",
    bB: "♝",
    bN: "♞",
    bP: "♟",
  };
  return map[p] ?? "?";
}
