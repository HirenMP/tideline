
interface GameHeaderProps {
  onBack: () => void
  backLabel: string
  sectionLabel: string
}

function GameHeader({
  onBack,
  backLabel,
  sectionLabel,
}: GameHeaderProps) {
  return (
    <header className="game-header">

      <button
        className="game-header-back"
        onClick={onBack}
      >
        ← {backLabel}
      </button>

      <div className="game-header-brand">
        <span className="game-header-mark">≈</span>
        <span>TIDELINE</span>
      </div>

      <span className="game-header-section">
        {sectionLabel}
      </span>

    </header>
  )
}

export default GameHeader
