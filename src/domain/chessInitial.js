export function initialPosition() {
  // position = { "e2": "wP", ... }
  const pos = {};

  // Blancs
  pos["a1"] = "wR"; pos["b1"] = "wN"; pos["c1"] = "wB"; pos["d1"] = "wQ";
  pos["e1"] = "wK"; pos["f1"] = "wB"; pos["g1"] = "wN"; pos["h1"] = "wR";
  for (const file of ["a","b","c","d","e","f","g","h"]) pos[`${file}2`] = "wP";

  // Noirs
  pos["a8"] = "bR"; pos["b8"] = "bN"; pos["c8"] = "bB"; pos["d8"] = "bQ";
  pos["e8"] = "bK"; pos["f8"] = "bB"; pos["g8"] = "bN"; pos["h8"] = "bR";
  for (const file of ["a","b","c","d","e","f","g","h"]) pos[`${file}7`] = "bP";

  return pos;
}
