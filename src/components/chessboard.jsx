import Square from "./square";
import Piece from "./piece";
import { files, ranks } from "../domain/squares";

export default function Chessboard({ position, selected, onPick, onDrop }) {
  return (
    <div
      data-testid="chessboard"
      style={styles.board}
      role="application"
      aria-label="Plateau d'échecs"
    >
      {ranks.map((r, rIndex) =>
        files.map((f, fIndex) => {
          const square = `${f}${r}`;
          const isLight = (rIndex + fIndex) % 2 === 0;
          const piece = position[square];

          return (
            <Square
              key={square}
              square={square}
              isLight={isLight}
              isSelected={selected === square}
              onDrop={(from) => onDrop(from, square)}
              onClick={() => onPick(square)}
            >
              {piece ? <Piece piece={piece} square={square} /> : null}
            </Square>
          );
        })
      )}
    </div>
  );
}

const styles = {
  board: {
    width: 640,
    height: 640,
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)", // ✅ carrés fixes
    overflow: "hidden",
    borderRadius: 6,
    border: "2px solid rgba(0,0,0,.35)",
    boxShadow: "0 20px 60px rgba(0,0,0,.35)",
    background: "#000",
  },
};
