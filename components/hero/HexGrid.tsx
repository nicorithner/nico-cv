import styles from "./HexGrid.module.scss";

// ── Correct honeycomb geometry for pointy-top hexes ────────────────────────
// Row-based layout: same-row hexes are COL_W apart; odd rows shift right by
// COL_W/2. This makes adjacent hexes exactly COL_W (= R√3) apart and ensures
// they share full edges rather than touching at vertices.
const R        = 50;
const SQRT3    = Math.sqrt(3);
const COL_W    = R * SQRT3;        // 86.60 — within-row hex spacing
const ROW_H    = R * 1.5;          // 75.00 — row-to-row spacing
const ODD_DX   = COL_W / 2;        // 43.30 — odd-row rightward shift
const X0       = 540;              // x anchor for pos-0 in even rows
const Y0       = 50;               // y of row 0

function rowCenter(row: number, pos: number): [number, number] {
  return [
    X0 + pos * COL_W + (row % 2 === 1 ? ODD_DX : 0),
    Y0 + row * ROW_H,
  ];
}

function hexPoints(cx: number, cy: number, r = R): string {
  const hx = r * (SQRT3 / 2);
  const hy = r * 0.5;
  return [
    `${cx.toFixed(1)},${(cy - r).toFixed(1)}`,
    `${(cx + hx).toFixed(1)},${(cy - hy).toFixed(1)}`,
    `${(cx + hx).toFixed(1)},${(cy + hy).toFixed(1)}`,
    `${cx.toFixed(1)},${(cy + r).toFixed(1)}`,
    `${(cx - hx).toFixed(1)},${(cy + hy).toFixed(1)}`,
    `${(cx - hx).toFixed(1)},${(cy - hy).toFixed(1)}`,
  ].join(" ");
}

function gridPoints(row: number, pos: number): string {
  const [cx, cy] = rowCenter(row, pos);
  return hexPoints(cx, cy);
}

// ── Connected honeycomb cluster ────────────────────────────────────────────
// [row, pos] — dense top-right, ragged left edge that drifts further left
// as rows descend, then trails sparse into the About section below the hero.
const GRID_CELLS: [number, number][] = [
  // hero zone — top rows: compact and to the right
  [0, 6], [0, 7], [0, 8],
  [1, 5], [1, 6], [1, 7], [1, 8],
  [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
  [3, 4], [3, 5], [3, 6], [3, 7], [3, 8],
  [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8],
  [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8],
  [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
  [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
  [8, 2], [8, 3], [8, 4], [8, 5], [8, 6],
  // About zone — sparse trail drifting left as it descends
  [9,  2], [9,  3], [9,  4], [9,  5],
  [10, 1], [10, 2], [10, 3], [10, 4],
  [11, 1], [11, 2], [11, 3],
  [12, 1], [12, 2],
  [13, 1],
];

// ── Floating brand-colour hexes ────────────────────────────────────────────
// Off-grid positions — they appear to drift away from the main cluster.
// [cx, cy, r]
const FLOATING_HEXES: [number, number, number][] = [
  [1188,   88, 42],   // drifting above cluster, top-right
  [1088,   72, 35],   // floating near top, now fully below nav
  [652,   222, 38],   // floating left of cluster
  [564,   408, 30],   // further left, isolated
  [795,   835, 35],   // About zone, between cluster and left
  [672,   948, 28],   // About zone, drifting left
  [452,  1058, 22],   // deep About zone, far left
];

export default function HexGrid() {
  return (
    <svg
      className={styles.hexGrid}
      viewBox="0 0 1280 1200"
      preserveAspectRatio="xMidYMin meet"
      fill="none"
      aria-hidden="true"
    >
      {/* Connected honeycomb — decoration colour, subtle */}
      <g stroke="var(--color-hex-decoration)" strokeWidth="1.5" opacity="0.14">
        {GRID_CELLS.map(([row, pos], i) => (
          <polygon key={i} points={gridPoints(row, pos)} />
        ))}
      </g>

      {/* Floating brand hexes — off-grid, slightly more prominent */}
      <g stroke="var(--color-brand)" strokeWidth="1.5" opacity="0.30">
        {FLOATING_HEXES.map(([cx, cy, r], i) => (
          <polygon key={i} points={hexPoints(cx, cy, r)} />
        ))}
      </g>
    </svg>
  );
}
