
/**
 * TIDELINE — Puzzle Engine
 * Core data types used by the water-routing puzzle system.
 */

// Four possible directions water can flow.
export type Direction = 'north' | 'east' | 'south' | 'west'

// Types of tiles available in a puzzle.
export type TileKind =
  | 'straight'
  | 'corner'
  | 'tee'
  | 'cross'
  | 'source'
  | 'destination'
  | 'empty'

// A tile can be rotated in four 90-degree steps.
export type TileRotation = 0 | 1 | 2 | 3

// Data describing one puzzle tile.
export interface PuzzleTileData {
  id: string
  kind: TileKind
  rotation: TileRotation
  fixed?: boolean
}

// A single position on the puzzle board.
export interface PuzzleCell {
  row: number
  col: number
  tile: PuzzleTileData
}

// Complete puzzle configuration.
export interface PuzzleLevel {
  id: string
  name: string
  description: string
  rows: number
  cols: number
  source: {
    row: number
    col: number
  }
  destination: {
    row: number
    col: number
  }
  tiles: PuzzleCell[]
}

// Result returned after checking the water pathway.
export interface WaterFlowResult {
  success: boolean
  connectedTiles: string[]
  reachedDestination: boolean
  message: string
}

// Information about a player's move.
export interface PuzzleMove {
  tileId: string
  previousRotation: TileRotation
  newRotation: TileRotation
}
