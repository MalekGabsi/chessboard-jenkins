import { useMemo, useState } from "react";
import Chessboard from "./components/chessboard";
import { initialPosition } from "./domain/chessInitial";
import { MoveHistoryService } from "./services/MoveHistoryService";

export default function App() {
  const service = useMemo(() => new MoveHistoryService(initialPosition()), []);
  const [position, setPosition] = useState(service.getPosition());
  const [selected, setSelected] = useState(null);

  function onPick(square) {
    const piece = service.getPieceAt(square);
    if (!piece) return;
    setSelected(square);
  }

  function onDrop(from, to) {
    if (!from || !to) return;
    service.movePiece(from, to); // libre: remplace si occupée
    setPosition(service.getPosition());
    setSelected(null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.panel}>
        <h1 style={styles.title}>Échecs — déplacements libres</h1>
        <p style={styles.subtitle}>
          Drag & drop une pièce n’importe où (sans règles). Déposer sur une case
          occupée remplace la pièce.
        </p>

        <div style={styles.layout}>
          <Chessboard
            position={position}
            selected={selected}
            onPick={onPick}
            onDrop={onDrop}
          />

          <div style={styles.side}>
            <h2 style={styles.h2}>Infos</h2>
            <div style={styles.card}>
              <div><b>Pièces en jeu :</b> {Object.keys(position).length}</div>
              <div><b>Historique :</b> {service.getHistory().length} coup(s)</div>
            </div>

            <h2 style={styles.h2}>Derniers coups</h2>
            <div style={styles.card}>
              {service.getHistory().slice(-8).reverse().map((m, idx) => (
                <div key={idx} style={styles.moveLine}>
                  {m.piece} : {m.from} → {m.to}
                  {m.captured ? ` (remplace ${m.captured})` : ""}
                </div>
              ))}
              {service.getHistory().length === 0 && (
                <div style={{ opacity: 0.7 }}>Aucun déplacement.</div>
              )}
            </div>

            <button
              style={styles.btn}
              onClick={() => {
                service.reset(initialPosition());
                setPosition(service.getPosition());
                setSelected(null);
              }}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 26,
  },

  panel: {
    width: "min(1240px, 100%)",
    display: "grid",
    gap: 18,
  },

  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 16,
    padding: "16px 18px",
    borderRadius: 18,
    background: "var(--panel)",
    border: "1px solid var(--stroke)",
    backdropFilter: "blur(12px)",
  },

  titleWrap: { display: "flex", flexDirection: "column", gap: 6 },

  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: 0.3,
  },

  subtitle: {
    margin: 0,
    color: "var(--muted)",
    fontSize: 13,
    lineHeight: 1.35,
  },

  badge: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(124,218,255,.14)",
    border: "1px solid rgba(124,218,255,.22)",
    color: "var(--text)",
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "560px 1fr",
    gap: 18,
    alignItems: "start",
  },

  side: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  section: {
    background: "var(--panel)",
    border: "1px solid var(--stroke)",
    borderRadius: 18,
    padding: 14,
    backdropFilter: "blur(12px)",
  },

  h2: {
    margin: 0,
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "rgba(233,238,252,.85)",
  },

  statRow: {
    marginTop: 10,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  stat: {
    borderRadius: 14,
    padding: 12,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.08)",
  },

  statLabel: { fontSize: 12, color: "var(--muted)" },
  statValue: { marginTop: 6, fontSize: 18, fontWeight: 800 },

  list: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxHeight: 330,
    overflow: "auto",
    paddingRight: 6,
  },

  moveItem: {
    padding: "10px 10px",
    borderRadius: 14,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.08)",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    fontSize: 13,
  },

  moveLeft: { display: "flex", gap: 10, alignItems: "center" },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    background: "var(--accent)",
    boxShadow: "0 0 0 4px rgba(124,218,255,.16)",
    flex: "0 0 auto",
  },

  btn: {
    marginTop: 10,
    alignSelf: "flex-start",
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid rgba(124,218,255,.22)",
    background:
      "linear-gradient(135deg, rgba(124,218,255,.26), rgba(82,255,168,.12))",
    color: "var(--text)",
    fontWeight: 800,
    cursor: "pointer",
    transition: "transform .15s ease, filter .15s ease",
  },
};

