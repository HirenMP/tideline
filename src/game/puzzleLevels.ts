
import type { PuzzleLevel, PuzzleCell } from './puzzleTypes'

const sunkenGateTiles: PuzzleCell[] = [
  // Row 1
  { row: 0, col: 0, tile: { id: 't1', kind: 'empty', rotation: 0 } },
  { row: 0, col: 1, tile: { id: 't2', kind: 'empty', rotation: 0 } },
  { row: 0, col: 2, tile: { id: 't3', kind: 'empty', rotation: 0 } },
  { row: 0, col: 3, tile: { id: 't4', kind: 'empty', rotation: 0 } },
  { row: 0, col: 4, tile: { id: 't5', kind: 'empty', rotation: 0 } },

  // Row 2
  { row: 1, col: 0, tile: { id: 't6', kind: 'empty', rotation: 0 } },
  { row: 1, col: 1, tile: { id: 't7', kind: 'empty', rotation: 0 } },
  { row: 1, col: 2, tile: { id: 't8', kind: 'empty', rotation: 0 } },
  { row: 1, col: 3, tile: { id: 't9', kind: 'empty', rotation: 0 } },
  { row: 1, col: 4, tile: { id: 't10', kind: 'destination', rotation: 3, fixed: true } },

  // Row 3
  { row: 2, col: 0, tile: { id: 't11', kind: 'source', rotation: 0, fixed: true } },
  { row: 2, col: 1, tile: { id: 't12', kind: 'corner', rotation: 0 } },
  { row: 2, col: 2, tile: { id: 't13', kind: 'empty', rotation: 0 } },
  { row: 2, col: 3, tile: { id: 't14', kind: 'empty', rotation: 0 } },
  { row: 2, col: 4, tile: { id: 't15', kind: 'straight', rotation: 1 } },

  // Row 4
  { row: 3, col: 0, tile: { id: 't16', kind: 'empty', rotation: 0 } },
  { row: 3, col: 1, tile: { id: 't17', kind: 'corner', rotation: 1 } },
  { row: 3, col: 2, tile: { id: 't18', kind: 'straight', rotation: 0 } },
  { row: 3, col: 3, tile: { id: 't19', kind: 'straight', rotation: 0 } },
  { row: 3, col: 4, tile: { id: 't20', kind: 'corner', rotation: 1 } },

  // Row 5
  { row: 4, col: 0, tile: { id: 't21', kind: 'empty', rotation: 0 } },
  { row: 4, col: 1, tile: { id: 't22', kind: 'empty', rotation: 0 } },
  { row: 4, col: 2, tile: { id: 't23', kind: 'empty', rotation: 0 } },
  { row: 4, col: 3, tile: { id: 't24', kind: 'empty', rotation: 0 } },
  { row: 4, col: 4, tile: { id: 't25', kind: 'empty', rotation: 0 } },
]

export const puzzleLevels: PuzzleLevel[] = [
  {
    id: 'sunken-gate',
    name: 'The Sunken Gate',
    description:
      'An ancient water channel lies dormant beneath the forgotten ruins. Restore its flow to awaken the gate.',
    rows: 5,
    cols: 5,
    source: { row: 2, col: 0 },
    destination: { row: 1, col: 4 },
    tiles: sunkenGateTiles,
  },
]
