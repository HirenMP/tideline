
import GameHeader from './GameHeader'
import type { Location, Screen } from '../types/game'

interface LocationPreviewProps {
  location: Location
  onNavigate: (screen: Screen) => void
}

function LocationPreview({
  location,
  onNavigate,
}: LocationPreviewProps) {
  return (
    <main className="game-screen">

      {/* LOCATION HEADER */}
      <GameHeader
        onBack={() => onNavigate('map')}
        backLabel="Adventure Map"
        sectionLabel={`LOCATION 0${location.id}`}
      />

      {/* LOCATION INFORMATION */}
      <section className="game-content">

        <p className="eyebrow">
          LOCATION DISCOVERED
        </p>

        <h2>{location.name}</h2>

        <p>{location.description}</p>

        {/* MISSION OBJECTIVE */}
        <div className="location-objective">

          <p className="eyebrow">
            MISSION OBJECTIVE
          </p>

          <h3>Your Task</h3>

          <p>{location.objective}</p>

        </div>

        {/* EXPLORATION INFORMATION */}
        <div className="location-details">

          <h3>Before You Begin</h3>

          <ul>
            <li>Observe your surroundings carefully.</li>
            <li>Look for clues hidden in the environment.</li>
            <li>Restore the ancient water system.</li>
            <li>Discover what the location has been hiding.</li>
          </ul>

          <p>
            Take your time. There is no countdown or time limit.
          </p>

        </div>

        {/* START BRIEFING */}
        <button
          className="primary-button"
          onClick={() => onNavigate('briefing')}
        >
          View Mission Briefing
          <span className="button-arrow">→</span>
        </button>

      </section>
    </main>
  )
}

export default LocationPreview
