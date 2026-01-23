import { g as getDefaultExportFromCjs, r as reactExports } from './index-CTGrptbR.js';

var jsxRuntime$2 = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	"use strict";
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var jsxRuntime$1 = jsxRuntime$2.exports;

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime$2.exports;
	hasRequiredJsxRuntime = 1;
	"use strict";
	if (true) {
	  jsxRuntime$2.exports = requireReactJsxRuntime_production();
	} else {
	  module.exports = require("./cjs/react-jsx-runtime.development.js");
	}
	return jsxRuntime$2.exports;
}

var jsxRuntimeExports = requireJsxRuntime();
const jsxRuntime = /*@__PURE__*/getDefaultExportFromCjs(jsxRuntimeExports);

function Square({
  square,
  isLight,
  isSelected,
  onDrop,
  onClick,
  children
}) {
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const from = e.dataTransfer.getData("text/plain");
    onDrop(from);
  }
  const base = isLight ? "var(--light)" : "var(--dark)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-testid": `sq-${square}`,
      onClick,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: base,
        transition: "transform .08s ease, filter .15s ease, outline .15s ease",
        outline: isSelected ? "3px solid rgba(124,218,255,.95)" : "none",
        outlineOffset: "-3px",
        boxShadow: isSelected ? "inset 0 0 0 999px rgba(124,218,255,.10)" : "none"
      },
      "aria-label": `Square ${square}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 7,
              right: 8,
              fontSize: 10,
              opacity: 0.38,
              color: "#0b1020",
              userSelect: "none",
              fontWeight: 700
            },
            children: square
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "radial-gradient(120px 120px at 50% 45%, rgba(255,255,255,.16), transparent 60%)",
              opacity: isLight ? 0.35 : 0.22
            }
          }
        ),
        children
      ]
    }
  );
}

// Notation simple: wK = white king, bQ = black queen, etc.
function pieceToUnicode(p) {
  const map = {
    wK: "♔",
    wQ: "♕",
    wR: "♖",
    wB: "♗",
    wN: "♘",
    wP: "♙",
    bK: "♚",
    bQ: "♛",
    bR: "♜",
    bB: "♝",
    bN: "♞",
    bP: "♟",
  };
  return map[p] ?? "?";
}

function Piece({ piece, square }) {
  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", square);
    e.dataTransfer.effectAllowed = "move";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-testid": `piece-${square}`,
      "data-piece": piece,
      "data-square": square,
      draggable: true,
      onDragStart: handleDragStart,
      style: styles$1.piece,
      "aria-label": `Pièce ${piece} sur ${square}`,
      title: `${piece} @ ${square}`,
      children: pieceToUnicode(piece)
    }
  );
}
const styles$1 = {
  piece: {
    fontSize: 50,
    lineHeight: "50px",
    cursor: "grab",
    userSelect: "none",
    transform: "translateZ(0)",
    filter: "drop-shadow(0 10px 10px rgba(0,0,0,.35)) drop-shadow(0 1px 0 rgba(255,255,255,.25))",
    transition: "transform .12s ease, filter .12s ease"
  }
};

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

function Chessboard({ position, selected, onPick, onDrop }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-testid": "chessboard", style: styles.board, role: "application", "aria-label": "Plateau d'échecs", children: ranks.map(
    (r, rIndex) => files.map((f, fIndex) => {
      const square = `${f}${r}`;
      const isLight = (rIndex + fIndex) % 2 === 0;
      const piece = position[square];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Square,
        {
          square,
          isLight,
          isSelected: selected === square,
          onDrop: (from) => onDrop(from, square),
          onClick: () => onPick(square),
          children: piece ? /* @__PURE__ */ jsxRuntimeExports.jsx(Piece, { piece, square }) : null
        },
        square
      );
    })
  ) });
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
    boxShadow: "0 30px 90px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.12)"
  }
};

function initialPosition() {
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

class MoveHistoryService {
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

function ChessboardStory() {
  const service = reactExports.useMemo(() => new MoveHistoryService(initialPosition()), []);
  const [position, setPosition] = reactExports.useState(service.getPosition());
  const [selected, setSelected] = reactExports.useState(null);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Chessboard,
    {
      position,
      selected,
      onPick,
      onDrop
    }
  );
}

export { ChessboardStory as default };
//# sourceMappingURL=Chessboard.story-D-QjQ4zX.js.map
