
import { useEffect, useState } from 'react'

import type {
  PuzzleLevel,
  PuzzleTileData,
  WaterFlowResult,
} from '../../game/puzzleTypes'

import { rotateTile, simulateWater } from '../../game/puzzleLogic'

import PuzzleTile from './PuzzleTile'
import PuzzleControls from './PuzzleControls'

import './Puzzle.css'

interface PuzzleBoardProps {
  level: PuzzleLevel
  onComplete?: () => void
}

function createInitialTiles(level: PuzzleLevel) {
  return level.tiles.map(cell => ({
    ...cell,
    tile: { ...cell.tile },
  }))
}

function PuzzleBoard({ level, onComplete }: PuzzleBoardProps) {
  const [tiles, setTiles] = useState(() => createInitialTiles(level))
  const [history, setHistory] = useState<PuzzleTileData[][]>([])
  const [waterResult, setWaterResult] =
    useState<WaterFlowResult | null>(null)
  const [hintVisible, setHintVisible] = useState(false)
  const [completed, setCompleted] = useState(false)

  // Reset when switching levels.
  useEffect(() => {
    setTiles(createInitialTiles(level))
    setHistory([])
    setWaterResult(null)
    setHintVisible(false)
    setCompleted(false)
  }, [level])

  // Rotate a movable tile.
  const handleRotate = (tileId: string) => {
    const currentTile = tiles.find(
      cell => cell.tile.id === tileId
    )?.tile

    if (
      !currentTile ||
      currentTile.fixed ||
      currentTile.kind === 'empty' ||
      completed
    ) {
      return
    }

    setHistory(previous => [
      ...previous,
      tiles.map(cell => ({ ...cell.tile })),
    ])

    setTiles(previous =>
      previous.map(cell =>
        cell.tile.id === tileId
          ? { ...cell, tile: rotateTile(cell.tile) }
          : cell
      )
    )

    setWaterResult(null)
  }

  // Undo the previous move.
  const handleUndo = () => {
    if (history.length === 0 || completed) return

    const previousTiles = history[history.length - 1]

    setTiles(current =>
      current.map(cell => {
        const previousTile = previousTiles.find(
          tile => tile.id === cell.tile.id
        )

        return previousTile
          ? { ...cell, tile: previousTile }
          : cell
      })
    )

    setHistory(previous => previous.slice(0, -1))
    setWaterResult(null)
  }

  // Restart the puzzle.
  const handleRestart = () => {
    setTiles(createInitialTiles(level))
    setHistory([])
    setWaterResult(null)
    setHintVisible(false)
    setCompleted(false)
  }

  // Display a contextual hint.
  const handleHint = () => {
    setHintVisible(true)
  }

  // Simulate the water flow.
  const handleReleaseWater = () => {
    if (completed) return

    const currentLevel: PuzzleLevel = {
      ...level,
      tiles: tiles.map(cell => ({
        ...cell,
        tile: { ...cell.tile },
      })),
    }

    const result = simulateWater(currentLevel)

    setWaterResult(result)

    if (result.success && !completed) {
      setCompleted(true)
      onComplete?.()
    }
  }

  const connectedTileIds = waterResult?.connectedTiles ?? []

  return (
    <section className="puzzle-container">

      <div className="puzzle-heading">
        <p className="eyebrow">ANCIENT WATER SYSTEM</p>
        <h2>{level.name}</h2>
        <p>{level.description}</p>
      </div>

      <div
        className="puzzle-board"
        style={{
          gridTemplateColumns: `repeat(${level.cols}, minmax(0, 1fr))`,
        }}
        aria-label={`${level.name} puzzle board`}
      >
        {tiles.map(cell => (
          <PuzzleTile
            key={cell.tile.id}
            tile={cell.tile}
            onRotate={handleRotate}
            waterConnected={connectedTileIds.includes(cell.tile.id)}
          />
        ))}
      </div>

      <PuzzleControls
        canUndo={history.length > 0 && !completed}
        onUndo={handleUndo}
        onRestart={handleRestart}
        onHint={handleHint}
        onReleaseWater={handleReleaseWater}
      />

      {hintVisible && (
        <div className="puzzle-feedback">
          Follow the water from the source. Each pipe must connect
          to its neighbouring tile without leaving a gap.
        </div>
      )}

      {waterResult && (
        <div
          className={`puzzle-feedback ${
            waterResult.success ? 'puzzle-success' : 'puzzle-error'
          }`}
          role="status"
          aria-live="polite"
        >
          {waterResult.message}
        </div>
      )}

    </section>
  )
}

export default PuzzleBoard
