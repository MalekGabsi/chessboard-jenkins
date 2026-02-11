import { Chess } from "chess.js";

/**
 * Service qui applique les règles d'échecs via chess.js
 * - movePiece(from,to) refuse les coups illégaux
 * - getPosition() renvoie ton format { "e2":"wP", ... }
 */
export class ChessGameService {
  constructor(fen) {
    this.game = new Chess(fen);   // fen optionnelle, sinon position initiale
    this.history = [];
  }

  reset() {
    this.game.reset();
    this.history = [];
  }

  // Renvoie ton format UI: { "e2": "wP", ... }
  getPosition() {
    const board = this.game.board(); // matrice 8x8
    const pos = {};

    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    // board[0] = rang 8, board[7] = rang 1
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const p = board[r][f];
        if (!p) continue;

        const square = `${files[f]}${8 - r}`;
        const color = p.color === "w" ? "w" : "b";
        const typeMap = { p: "P", r: "R", n: "N", b: "B", q: "Q", k: "K" };
        pos[square] = `${color}${typeMap[p.type]}`;
      }
    }
    return pos;
  }

  getTurnColor() {
    return this.game.turn(); // 'w' ou 'b'
  }

  // Pour savoir si une case est sélectionnable (au tour de la bonne couleur)
  getPieceAt(square) {
    const p = this.game.get(square);
    if (!p) return null;

    const typeMap = { p: "P", r: "R", n: "N", b: "B", q: "Q", k: "K" };
    return `${p.color === "w" ? "w" : "b"}${typeMap[p.type]}`;
  }

  // Renvoie la liste des destinations légales depuis "from"
  legalMovesFrom(from) {
    return this.game.moves({ square: from, verbose: true }).map((m) => m.to);
  }

  /**
   * Applique un coup si légal. Retourne true si ok, false sinon.
   */
  movePiece(from, to) {
    if (!from || !to) return false;
    if (from === to) return false;

    const move = this.game.move({ from, to, promotion: "q" }); // promotion auto en dame
    if (!move) return false; // coup illégal

    this.history.push({
      at: new Date().toISOString(),
      san: move.san,         // notation (ex: "Nf3", "exd5", "O-O")
      from: move.from,
      to: move.to,
      piece: move.piece,     // 'p','n','b','r','q','k'
      captured: move.captured ?? null,
      promotion: move.promotion ?? null,
    });

    return true;
  }

  getHistory() {
    return [...this.history];
  }

  isGameOver() {
    return this.game.isGameOver();
  }

  fen() {
    return this.game.fen();
  }
}
