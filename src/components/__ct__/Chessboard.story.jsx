import { useMemo, useState } from "react";
import Chessboard from "../chessboard";
import { initialPosition } from "../../domain/chessInitial";
import { MoveHistoryService } from "../../services/MoveHistoryService";

export default function ChessboardStory() {
  const service = useMemo(() => new MoveHistoryService(initialPosition()), []);
  const [position, setPosition] = useState(service.getPosition());
  const [selected, setSelected] = useState(null);

  function onPick(square) {
    const piece = service.getPieceAt(square);
    if (!piece) return;
    setSelected(square);
  }

  function onDrop(from, to) {
    service.movePiece(from, to);
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
