import { useMemo, useState } from "react";
import Chessboard from "./components/chessboard";
import { ChessGameService } from "./services/ChessGameService";

export default function App() {
  const service = useMemo(() => new ChessGameService(), []);
  const [position, setPosition] = useState(service.getPosition());
  const [selected, setSelected] = useState(null);
  const [hints, setHints] = useState([]);       // coups légaux
const [lastMove, setLastMove] = useState(null); // {from,to}

function onPick(square) {
  const piece = service.getPieceAt(square);
  if (!piece) return;

  const turn = service.getTurnColor();
  if ((turn === "w" && !piece.startsWith("w")) || (turn === "b" && !piece.startsWith("b"))) return;

  setSelected(square);
  setHints(service.legalMovesFrom(square)); // ✅ cases possibles
}

function onDrop(from, to) {
  const ok = service.movePiece(from, to);
  setSelected(null);
  setHints([]);

  if (!ok) return;

  setLastMove({ from, to });
  setPosition(service.getPosition());
}


return (
  <div style={styles.page}>
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Échecs — règles activées (chess.js)</h1>
        <div style={styles.badge}>Local</div>
      </header>

      <div style={styles.main}>
        {/* Board */}
        <div style={styles.boardWrap}>
          <Chessboard
            position={position}
            selected={selected}
            onPick={onPick}
            onDrop={onDrop}
          />
        </div>

        {/* Side panel */}
        <aside style={styles.side}>
          <h2 style={styles.h2}>Infos</h2>
          <div style={styles.card}>
            <div><b>Tour :</b> {service.getTurnColor() === "w" ? "Blancs" : "Noirs"}</div>
            <div><b>Coups :</b> {service.getHistory().length}</div>
            <div><b>Game over :</b> {service.isGameOver() ? "Oui" : "Non"}</div>
          </div>

          <h2 style={styles.h2}>Derniers coups (SAN)</h2>
          <div style={styles.cardScroll}>
            {service.getHistory().slice(-12).reverse().map((m, idx) => (
              <div key={idx} style={styles.moveLine}>
                <span style={styles.moveSan}>{m.san}</span>
                <span style={styles.moveSmall}>{m.from}→{m.to}</span>
              </div>
            ))}
            {service.getHistory().length === 0 && (
              <div style={{ opacity: 0.7 }}>Aucun coup.</div>
            )}
          </div>

          <button
            style={styles.btn}
            onClick={() => {
              service.reset();
              setPosition(service.getPosition());
              setSelected(null);
            }}
          >
            Réinitialiser
          </button>
        </aside>
      </div>
    </div>
  </div>
);
}


const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1000px 700px at 20% 0%, rgba(124,218,255,.22), transparent 55%)," +
      "radial-gradient(900px 700px at 80% 30%, rgba(82,255,168,.14), transparent 60%)," +
      "linear-gradient(180deg, #07111f 0%, #050a12 100%)",
    color: "rgba(240,245,255,.95)",
    display: "flex",
    justifyContent: "center",
    padding: 28,
  },

  container: {
    width: "min(1200px, 100%)",
    display: "grid",
    gap: 16,
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.10)",
    backdropFilter: "blur(12px)",
  },

  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 900,
    letterSpacing: 0.2,
  },

  badge: {
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.07)",
    opacity: 0.9,
  },

  main: {
    display: "grid",
    gridTemplateColumns: "minmax(420px, 640px) 320px", // ✅ board max 640 + sidebar fixe
    gap: 18,
    alignItems: "start",
  },

  boardWrap: {
    display: "flex",
    justifyContent: "center",     // ✅ centre le board
  },

  side: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.10)",
    backdropFilter: "blur(12px)",
  },

  h2: {
    margin: 0,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    opacity: 0.9,
  },

  card: {
    padding: 12,
    borderRadius: 14,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.10)",
    lineHeight: 1.55,
  },

  cardScroll: {
    padding: 12,
    borderRadius: 14,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.10)",
    maxHeight: 260,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  moveLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: "8px 10px",
    borderRadius: 12,
    background: "rgba(0,0,0,.18)",
    border: "1px solid rgba(255,255,255,.08)",
    fontSize: 13,
  },

  moveSan: {
    fontWeight: 900,
  },

  moveSmall: {
    opacity: 0.8,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 12,
  },

  btn: {
    marginTop: 6,
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid rgba(124,218,255,.22)",
    background:
      "linear-gradient(135deg, rgba(124,218,255,.20), rgba(82,255,168,.10))",
    color: "rgba(240,245,255,.95)",
    fontWeight: 900,
    cursor: "pointer",
  },
};



