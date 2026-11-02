
import type { Direction, PuzzleTileData } from '../../game/puzzleTypes'
import { getTileConnections } from '../../game/puzzleLogic'

interface PuzzleTileProps {
  tile: PuzzleTileData
  onRotate: (tileId: string) => void
  waterConnected?: boolean
}

const DIRECTIONS: Record<Direction, { x: number; y: number }> = {
  north: { x: 50, y: 0 },
  east: { x: 100, y: 50 },
  south: { x: 50, y: 100 },
  west: { x: 0, y: 50 },
}

function PuzzleTile({
  tile,
  onRotate,
  waterConnected = false,
}: PuzzleTileProps) {
  const connections = getTileConnections(tile)

  const isFixed = tile.fixed === true
  const isEmpty = tile.kind === 'empty'
  const isDisabled = isFixed || isEmpty

  const handleClick = () => {
    if (!isDisabled) {
      onRotate(tile.id)
    }
  }

  return (
    <button
      type="button"
      className={[
        'puzzle-tile',
        `tile-${tile.kind}`,
        waterConnected ? 'water-connected' : '',
        isFixed ? 'tile-fixed' : '',
      ].filter(Boolean).join(' ')}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={
        isEmpty
          ? 'Empty tile'
          : `${tile.kind} tile${isFixed ? ', fixed' : ', rotate'}`
      }
    >
      <svg
        viewBox="0 0 100 100"
        className="tile-pipe"
        aria-hidden="true"
      >
        {connections.map(direction => {
          const endpoint = DIRECTIONS[direction]

          return (
            <line
              key={direction}
              x1="50"
              y1="50"
              x2={endpoint.x}
              y2={endpoint.y}
              className="pipe-line"
            />
          )
        })}

        {!isEmpty && (
          <circle
            cx="50"
            cy="50"
            r="11"
            className="pipe-joint"
          />
        )}

        {tile.kind === 'source' && (
          <circle
            cx="50"
            cy="50"
            r="19"
            className="source-symbol"
          />
        )}

        {tile.kind === 'destination' && (
          <rect
            x="38"
            y="38"
            width="24"
            height="24"
            rx="4"
            className="destination-symbol"
          />
        )}
      </svg>

      {!isDisabled && (
        <span className="tile-rotate-indicator" aria-hidden="true">
          ↻
        </span>
      )}
    </button>
  )
}

export default PuzzleTile
