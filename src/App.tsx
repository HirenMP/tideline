
import { useState } from 'react'
import './App.css'

import HomeScreen from './components/HomeScreen'
import AdventureMap from './components/AdventureMap'
import LocationPreview from './components/LocationPreview'
import MissionBriefing from './components/MissionBriefing'
import GameHeader from './components/GameHeader'

import { locations } from './data/locations'

import type { Location, Screen } from './types/game'

function App() {
  const [screen, setScreen] = useState<Screen>('home')

  const [selectedLocation, setSelectedLocation] =
    useState<Location>(locations[0])

  return (
    <main className="home-screen">

      {/* HOME SCREEN */}
      {screen === 'home' && (
        <HomeScreen onNavigate={setScreen} />
      )}

      {/* ADVENTURE MAP */}
      {screen === 'map' && (
        <AdventureMap
          onNavigate={setScreen}
          onSelectLocation={setSelectedLocation}
        />
      )}

      {/* LOCATION PREVIEW */}
      {screen === 'location' && (
        <LocationPreview
          location={selectedLocation}
          onNavigate={setScreen}
        />
      )}

      {/* MISSION BRIEFING */}
      {screen === 'briefing' && (
        <MissionBriefing
          location={selectedLocation}
          onNavigate={setScreen}
        />
      )}

      {/* TEMPORARY PUZZLE PLACEHOLDER */}
      {screen === 'puzzle' && (
        <main className="game-screen">

          <GameHeader
            onBack={() => setScreen('briefing')}
            backLabel="Mission Briefing"
            sectionLabel={`MISSION 00${selectedLocation.id}`}
          />

          <section className="game-content">

            <p className="eyebrow">
              ANCIENT WATER SYSTEM
            </p>

            <h2>{selectedLocation.name}</h2>

            <p>
              The ancient water system awaits restoration.
              Your puzzle adventure begins here.
            </p>

            <p>
              The interactive water-routing puzzle
              will be developed in our next milestone.
            </p>

            <button
              className="primary-button"
              onClick={() => setScreen('briefing')}
            >
              ← Back to Briefing
            </button>

          </section>
        </main>
      )}

      {/* FOOTER */}
      <footer className="home-footer">
        <span>
          © TIDELINE — THE LOST CIVILIZATION
        </span>

        <span>
          EXPLORE · RESTORE · DISCOVER
        </span>
      </footer>

    </main>
  )
}

export default App
