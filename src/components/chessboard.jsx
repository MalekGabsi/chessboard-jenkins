import Square from "./square";
import Piece from "./piece";
import { files, ranks } from "../domain/squares";

export default function Chessboard({ position, selected, onPick, onDrop }) {
  return (
    <div data-testid="chessboard" style={styles.board} role="application" aria-label="Plateau d'échecs" >
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
    width: 560,
    height: 560,
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.10)",
    boxShadow:
      "0 30px 90px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.12)",
  },
};
