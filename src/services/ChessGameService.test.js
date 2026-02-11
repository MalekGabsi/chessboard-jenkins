import { describe, it, expect, beforeEach } from "vitest";
import { ChessGameService } from "./ChessGameService";

describe("ChessGameService (chess.js rules)", () => {
  let s;

  beforeEach(() => {
    s = new ChessGameService();
  });

  it("starts with 32 pieces in position()", () => {
    const pos = s.getPosition();
    expect(Object.keys(pos)).toHaveLength(32);
    expect(pos["e1"]).toBe("wK");
    expect(pos["e8"]).toBe("bK");
  });

  it("turn starts with white", () => {
    expect(s.getTurnColor()).toBe("w");
  });

  it("legalMovesFrom() returns legal targets", () => {
    // pawn at e2 can go e3 or e4 at start
    const moves = s.legalMovesFrom("e2");
    expect(moves).toContain("e3");
    expect(moves).toContain("e4");
  });

  it("rejects illegal move (blocked bishop)", () => {
    // bishop c1 is blocked at start
    const ok = s.movePiece("c1", "c3");
    expect(ok).toBe(false);
    // position unchanged
    const pos = s.getPosition();
    expect(pos["c1"]).toBe("wB");
    expect(pos["c3"]).toBeUndefined();
  });

  it("accepts legal move and updates turn + history", () => {
    const ok = s.movePiece("e2", "e4");
    expect(ok).toBe(true);

    const pos = s.getPosition();
    expect(pos["e4"]).toBe("wP");
    expect(pos["e2"]).toBeUndefined();

    expect(s.getTurnColor()).toBe("b");
    expect(s.getHistory()).toHaveLength(1);
    expect(s.getHistory()[0]).toHaveProperty("san");
    expect(s.getHistory()[0]).toMatchObject({ from: "e2", to: "e4" });
  });

  it("captures are handled (ex: e4xd5 after setup)", () => {
    // white: e2->e4
    expect(s.movePiece("e2", "e4")).toBe(true);
    // black: d7->d5
    expect(s.movePiece("d7", "d5")).toBe(true);
    // white: e4xd5 capture pawn
    const ok = s.movePiece("e4", "d5");
    expect(ok).toBe(true);

    const pos = s.getPosition();
    expect(pos["d5"]).toBe("wP");
    expect(pos["e4"]).toBeUndefined();
    // capture info exists in history
    const last = s.getHistory().at(-1);
    expect(last.captured).toBeTruthy(); // 'p' usually
  });

  it("reset() returns to initial", () => {
    s.movePiece("e2", "e4");
    expect(Object.keys(s.getPosition())).toHaveLength(32);

    s.reset();
    const pos = s.getPosition();
    expect(pos["e2"]).toBe("wP");
    expect(pos["e4"]).toBeUndefined();
    expect(s.getHistory()).toHaveLength(0);
    expect(s.getTurnColor()).toBe("w");
  });
});
