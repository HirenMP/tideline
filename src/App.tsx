
import { useState } from 'react'
import './App.css'

import HomeScreen from './components/HomeScreen'
import AdventureMap from './components/AdventureMap'
import LocationPreview from './components/LocationPreview'
import MissionBriefing from './components/MissionBriefing'
import GameHeader from './components/GameHeader'
import PuzzleBoard from './components/puzzle/PuzzleBoard'

import { locations } from './data/locations'
import { puzzleLevels } from './game/puzzleLevels'

import type { Location, Screen } from './types/game'

function App() {
  const [screen, setScreen] = useState<Screen>('home')

  const [selectedLocation, setSelectedLocation] =
    useState<Location>(locations[0])

  // First playable puzzle for our prototype.
  const currentPuzzle = puzzleLevels[0]

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

      {/* INTERACTIVE PUZZLE */}
      {screen === 'puzzle' && (
        <div className="game-screen">

          <GameHeader
            onBack={() => setScreen('briefing')}
            backLabel="Mission Briefing"
            sectionLabel={`MISSION 00${selectedLocation.id}`}
          />

          <div className="game-content">
            <PuzzleBoard
              level={currentPuzzle}
            />
          </div>

        </div>
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
