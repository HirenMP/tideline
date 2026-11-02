
import GameHeader from './GameHeader'
import { locations } from '../data/locations'
import type { Location, Screen } from '../types/game'

interface AdventureMapProps {
  onNavigate: (screen: Screen) => void
  onSelectLocation: (location: Location) => void
}

function AdventureMap({
  onNavigate,
  onSelectLocation,
}: AdventureMapProps) {
  const handleLocationClick = (location: Location) => {
    if (!location.unlocked) return

    onSelectLocation(location)
    onNavigate('location')
  }

  return (
    <main className="game-screen">

      {/* MAP HEADER */}
      <GameHeader
        onBack={() => onNavigate('home')}
        backLabel="Home"
        sectionLabel="EXPEDITION 01"
      />

      {/* MAP CONTENT */}
      <section className="game-content">

        <p className="eyebrow">
          YOUR JOURNEY BEGINS
        </p>

        <h2>The Forgotten Valley</h2>

        <p>
          An ancient civilization disappeared centuries ago.
          Explore its forgotten landmarks and uncover the
          secrets hidden beneath the waters.
        </p>

        {/* LOCATION COLLECTION */}
        <div className="location-section">

          <h3>Discoverable Locations</h3>

          <div className="location-list">

            {locations.map((location) => (
              <button
                key={location.id}
                className={`location-card ${
                  location.unlocked ? 'unlocked' : 'locked'
                }`}
                disabled={!location.unlocked}
                onClick={() => handleLocationClick(location)}
              >

                <span className="location-number">
                  LOCATION 0{location.id}
                </span>

                <strong>{location.name}</strong>

                <span className="location-description">
                  {location.description}
                </span>

                <span className="location-status">
                  {location.unlocked
                    ? 'Explore →'
                    : '🔒 Locked'}
                </span>

              </button>
            ))}

          </div>
        </div>

      </section>
    </main>
  )
}

export default AdventureMap
