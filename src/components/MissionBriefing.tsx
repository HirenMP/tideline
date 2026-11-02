
import GameHeader from './GameHeader'
import type { Location, Screen } from '../types/game'

interface MissionBriefingProps {
  location: Location
  onNavigate: (screen: Screen) => void
}

function MissionBriefing({
  location,
  onNavigate,
}: MissionBriefingProps) {
  return (
    <main className="game-screen">

      {/* MISSION HEADER */}
      <GameHeader
        onBack={() => onNavigate('location')}
        backLabel="Location Preview"
        sectionLabel={`MISSION 00${location.id}`}
      />

      {/* MISSION CONTENT */}
      <section className="game-content">

        <p className="eyebrow">
          EXPEDITION BRIEFING
        </p>

        <h2>{location.name}</h2>

        <p>{location.description}</p>

        {/* OBJECTIVE */}
        <div className="mission-objective">

          <p className="eyebrow">
            PRIMARY OBJECTIVE
          </p>

          <h3>Restore the Ancient Waters</h3>

          <p>{location.objective}</p>

        </div>

        {/* MISSION INSTRUCTIONS */}
        <div className="mission-instructions">

          <h3>Your Mission</h3>

          <ul>
            <li>Examine the ancient water system.</li>
            <li>Study the connections between the pathways.</li>
            <li>Rotate tiles to create a continuous water route.</li>
            <li>Release the water when you are ready.</li>
            <li>Discover what happens when the system is restored.</li>
          </ul>

        </div>

        {/* GAMEPLAY RULES */}
        <div className="mission-rules">

          <h3>Explorer's Notes</h3>

          <p>There is no countdown timer.</p>
          <p>You can undo your moves.</p>
          <p>Take your time and experiment.</p>

        </div>

        {/* START MISSION */}
        <button
          className="primary-button"
          onClick={() => onNavigate('puzzle')}
        >
          Start Mission
          <span className="button-arrow">→</span>
        </button>

      </section>
    </main>
  )
}

export default MissionBriefing
