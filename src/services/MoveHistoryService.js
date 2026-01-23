export class MoveHistoryService {
  constructor(initialPos = {}) {
    this.position = structuredClone(initialPos);
    this.history = [];
  }

  reset(initialPos = {}) {
    this.position = structuredClone(initialPos);
    this.history = [];
  }

  getPosition() {
    // copie pour éviter les mutations externes
    return structuredClone(this.position);
  }

  getHistory() {
    return [...this.history];
  }

  getPieceAt(square) {
    return this.position[square] ?? null;
  }

  /**
   * Déplacement libre:
   * - si "to" contient une pièce: elle est remplacée (captured)
   * - pas de validation des règles
   */
  movePiece(from, to) {
    if (!from || !to) return;
    if (from === to) return;

    const piece = this.position[from];
    if (!piece) return;

    const captured = this.position[to] ?? null;

    // remove from
    delete this.position[from];
    // place to (replace if occupied)
    this.position[to] = piece;

    this.history.push({
      at: new Date().toISOString(),
      piece,
      from,
      to,
      captured,
    });
  }

  /**
   * Utile si tu veux lister toutes les pièces avec leurs cases.
   * Retour: [{ square: "e4", piece: "wQ" }, ...]
   */
  listPieces() {
    return Object.entries(this.position).map(([square, piece]) => ({
      square,
      piece,
    }));
  }
}
