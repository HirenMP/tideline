
interface PuzzleControlsProps {
  canUndo: boolean
  onUndo: () => void
  onRestart: () => void
  onHint: () => void
  onReleaseWater: () => void
  isPaused?: boolean
}

function PuzzleControls({
  canUndo,
  onUndo,
  onRestart,
  onHint,
  onReleaseWater,
  isPaused = false,
}: PuzzleControlsProps) {
  return (
    <div className="puzzle-controls">
      <button
        type="button"
        className="puzzle-secondary-button"
        onClick={onUndo}
        disabled={!canUndo || isPaused}
      >
        ↶ Undo
      </button>

      <button
        type="button"
        className="puzzle-secondary-button"
        onClick={onHint}
        disabled={isPaused}
      >
        Hint
      </button>

      <button
        type="button"
        className="puzzle-secondary-button"
        onClick={onRestart}
        disabled={isPaused}
      >
        ↻ Restart
      </button>

      <button
        type="button"
        className="puzzle-release-button"
        onClick={onReleaseWater}
        disabled={isPaused}
      >
        Release the Water
      </button>
    </div>
  )
}

export default PuzzleControls
