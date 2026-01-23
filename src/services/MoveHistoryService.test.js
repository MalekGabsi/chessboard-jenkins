import { describe, it, expect, beforeEach } from "vitest";
import { MoveHistoryService } from "./MoveHistoryService";
import { initialPosition } from "../domain/chessInitial";

describe("MoveHistoryService", () => {
  let service;

  beforeEach(() => {
    service = new MoveHistoryService(initialPosition());
  });

  it("constructor() initialise position + historique vide", () => {
    const pos = service.getPosition();
    expect(Object.keys(pos).length).toBe(32);
    expect(service.getHistory()).toHaveLength(0);
  });

  it("getPieceAt() renvoie la pièce correcte ou null", () => {
    expect(service.getPieceAt("e1")).toBe("wK");
    expect(service.getPieceAt("e8")).toBe("bK");
    expect(service.getPieceAt("e4")).toBeNull();
  });

  it("movePiece() déplace une pièce librement vers une case vide", () => {
    service.movePiece("e2", "e4");

    const pos = service.getPosition();
    expect(pos["e2"]).toBeUndefined();
    expect(pos["e4"]).toBe("wP");

    const hist = service.getHistory();
    expect(hist).toHaveLength(1);
    expect(hist[0]).toMatchObject({
      piece: "wP",
      from: "e2",
      to: "e4",
      captured: null,
    });
    expect(typeof hist[0].at).toBe("string");
  });

  it("movePiece() remplace la pièce si la case d’arrivée est occupée (capture logique)", () => {
    // bP en a7, wP en a2 -> on met wP sur a7
    service.movePiece("a2", "a7");

    const pos = service.getPosition();
    expect(pos["a2"]).toBeUndefined();
    expect(pos["a7"]).toBe("wP"); // la blanche remplace la noire

    const hist = service.getHistory();
    expect(hist).toHaveLength(1);
    expect(hist[0]).toMatchObject({
      piece: "wP",
      from: "a2",
      to: "a7",
      captured: "bP",
    });
  });

  it("movePiece() ne fait rien si from est vide", () => {
    service.movePiece("e4", "e5"); // e4 vide au départ

    const pos = service.getPosition();
    expect(Object.keys(pos).length).toBe(32);
    expect(service.getHistory()).toHaveLength(0);
  });

  it("movePiece() ne fait rien si from === to", () => {
    service.movePiece("e2", "e2");

    const pos = service.getPosition();
    expect(pos["e2"]).toBe("wP");
    expect(service.getHistory()).toHaveLength(0);
  });

  it("reset() remet position + historique à zéro", () => {
    service.movePiece("e2", "e4");
    expect(service.getHistory()).toHaveLength(1);

    service.reset(initialPosition());

    const pos = service.getPosition();
    expect(Object.keys(pos).length).toBe(32);
    expect(service.getHistory()).toHaveLength(0);
    expect(pos["e2"]).toBe("wP");
    expect(pos["e4"]).toBeUndefined();
  });

  it("getPosition() renvoie une copie (modifier l’objet retourné ne modifie pas le service)", () => {
    const pos = service.getPosition();
    pos["e4"] = "wQ";
    delete pos["e1"];

    const pos2 = service.getPosition();
    expect(pos2["e1"]).toBe("wK"); // toujours présent
    expect(pos2["e4"]).toBeUndefined(); // pas ajouté
  });

  it("getHistory() renvoie une copie (push externe ne modifie pas le service)", () => {
    service.movePiece("e2", "e4");
    const h = service.getHistory();
    expect(h).toHaveLength(1);

    h.push({ fake: true });

    expect(service.getHistory()).toHaveLength(1); // inchangé
  });

  it("listPieces() renvoie une liste cohérente {square, piece}", () => {
    const list = service.listPieces();
    expect(list).toHaveLength(32);

    // vérifie quelques éléments
    const e1 = list.find((x) => x.square === "e1");
    expect(e1).toEqual({ square: "e1", piece: "wK" });

    const a7 = list.find((x) => x.square === "a7");
    expect(a7).toEqual({ square: "a7", piece: "bP" });
  });
});
