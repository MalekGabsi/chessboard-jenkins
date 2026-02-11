import { useMemo, useState } from "react";
import Chessboard from "../chessboard";
import { ChessGameService } from "../../services/ChessGameService";

export default function ChessboardStory() {
  const service = useMemo(() => new ChessGameService(), []);
  const [position, setPosition] = useState(service.getPosition());
  const [selected, setSelected] = useState(null);

  function onPick(square) {
    const piece = service.getPieceAt(square);
    if (!piece) return;

    // optionnel : empêcher de sélectionner la mauvaise couleur
    const turn = service.getTurnColor();
    if ((turn === "w" && !piece.startsWith("w")) || (turn === "b" && !piece.startsWith("b"))) {
      return;
    }

    setSelected(square);
  }

  function onDrop(from, to) {
    const ok = service.movePiece(from, to);
    if (!ok) {
      setSelected(null);
      return;
    }
    setPosition(service.getPosition());
    setSelected(null);
  }

  return (
    <Chessboard
      position={position}
      selected={selected}
      onPick={onPick}
      onDrop={onDrop}
    />
  );
}
