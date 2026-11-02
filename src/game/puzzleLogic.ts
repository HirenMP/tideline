
import type {
  Direction,
  PuzzleLevel,
  PuzzleTileData,
  TileRotation,
  WaterFlowResult,
} from './puzzleTypes'

// Direction order follows clockwise rotation.
const DIRECTIONS: Direction[] = [
  'north',
  'east',
  'south',
  'west',
]

// Base connections before rotation.
const BASE_CONNECTIONS: Record<
  PuzzleTileData['kind'],
  Direction[]
> = {
  straight: ['north', 'south'],
  corner: ['north', 'east'],
  tee: ['north', 'east', 'west'],
  cross: ['north', 'east', 'south', 'west'],
  source: ['east'],
  destination: ['west'],
  empty: [],
}

// Rotate a tile clockwise by 90 degrees.
export function rotateTile(
  tile: PuzzleTileData
): PuzzleTileData {
  if (tile.fixed) return tile

  return {
    ...tile,
    rotation: ((tile.rotation + 1) % 4) as TileRotation,
  }
}

// Rotate a direction clockwise.
function rotateDirection(
  direction: Direction,
  rotation: TileRotation
): Direction {
  const currentIndex = DIRECTIONS.indexOf(direction)
  return DIRECTIONS[(currentIndex + rotation) % 4]
}

// Get all open connections on a tile.
export function getTileConnections(
  tile: PuzzleTileData
): Direction[] {
  return BASE_CONNECTIONS[tile.kind].map(direction =>
    rotateDirection(direction, tile.rotation)
  )
}

// Get the opposite direction.
function getOppositeDirection(
  direction: Direction
): Direction {
  const opposites: Record<Direction, Direction> = {
    north: 'south',
    east: 'west',
    south: 'north',
    west: 'east',
  }

  return opposites[direction]
}

// Get the neighbouring board position.
function getNeighbour(
  row: number,
  col: number,
  direction: Direction
) {
  switch (direction) {
    case 'north':
      return { row: row - 1, col }
    case 'east':
      return { row, col: col + 1 }
    case 'south':
      return { row: row + 1, col }
    case 'west':
      return { row, col: col - 1 }
  }
}

// Check whether water can travel between two adjacent tiles.
function canConnect(
  current: PuzzleTileData,
  neighbour: PuzzleTileData,
  direction: Direction
): boolean {
  const currentConnections = getTileConnections(current)
  const neighbourConnections = getTileConnections(neighbour)

  return (
    currentConnections.includes(direction) &&
    neighbourConnections.includes(
      getOppositeDirection(direction)
    )
  )
}

// Trace water from the source using breadth-first search.
export function simulateWater(
  level: PuzzleLevel
): WaterFlowResult {
  const board = new Map<string, PuzzleTileData>()

  for (const cell of level.tiles) {
    board.set(`${cell.row},${cell.col}`, cell.tile)
  }

  const sourceKey = `${level.source.row},${level.source.col}`
  const destinationKey =
    `${level.destination.row},${level.destination.col}`

  const sourceTile = board.get(sourceKey)
  const destinationTile = board.get(destinationKey)

  if (
    !sourceTile ||
    !destinationTile ||
    sourceTile.kind !== 'source' ||
    destinationTile.kind !== 'destination'
  ) {
    return {
      success: false,
      connectedTiles: [],
      reachedDestination: false,
      message: 'The water source or destination is missing.',
    }
  }

  const visited = new Set<string>()
  const queue = [sourceKey]

  visited.add(sourceKey)

  while (queue.length > 0) {
    const currentKey = queue.shift()!
    const currentTile = board.get(currentKey)!

    const [row, col] = currentKey.split(',').map(Number)

    for (const direction of getTileConnections(currentTile)) {
      const next = getNeighbour(row, col, direction)

      if (
        next.row < 0 ||
        next.row >= level.rows ||
        next.col < 0 ||
        next.col >= level.cols
      ) {
        continue
      }

      const nextKey = `${next.row},${next.col}`

      if (visited.has(nextKey)) continue

      const nextTile = board.get(nextKey)

      if (!nextTile) continue

      if (!canConnect(currentTile, nextTile, direction)) {
        continue
      }

      visited.add(nextKey)
      queue.push(nextKey)
    }
  }

  const reachedDestination = visited.has(destinationKey)

  return {
    success: reachedDestination,
    connectedTiles: Array.from(visited)
      .map(key => board.get(key)?.id)
      .filter((id): id is string => Boolean(id)),
    reachedDestination,
    message: reachedDestination
      ? 'Water successfully reached the destination!'
      : 'The water pathway is incomplete. Keep exploring.',
  }
}
