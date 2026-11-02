
import { useState } from 'react'
import forgottenValley from '../assets/environments/forgotten-valley.png'
import type { Screen } from '../types/game'

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [selectedAction, setSelectedAction] = useState('')

  const particles = Array.from({ length: 28 }, (_, index) => ({
    id: index,
    left: `${(index * 37 + 11) % 100}%`,
    top: `${(index * 53 + 17) % 100}%`,
    delay: `${(index % 8) * -1.7}s`,
    duration: `${9 + (index % 6) * 2}s`,
  }))

  return (
    <div className="environment">

      {/* FORGOTTEN VALLEY ENVIRONMENT */}
      <img
        src={forgottenValley}
        alt="The Forgotten Valley"
        className="landscape-image"
      />

      {/* ENVIRONMENTAL LIGHTING */}
      <div className="environment-overlay" />
      <div className="environment-glow" />

      {/* ATMOSPHERIC MIST */}
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <div className="mist mist-three" />

      {/* FLOATING PARTICLES */}
      <div className="particles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* HEADER */}
      <header className="top-bar">
        <div className="brand">
          <span className="brand-mark">≈</span>
          <span>TIDELINE</span>
        </div>

        <span className="version">
          AN UNKNOWN WORLD AWAITS
        </span>
      </header>

      {/* MAIN HERO */}
      <section className="hero-section">
        <div className="hero-content">

          <p className="eyebrow">
            A JOURNEY BEYOND THE KNOWN
          </p>

          <h1>
            Some secrets
            <br />
            <span>were never meant</span>
            <br />
            to stay lost.
          </h1>

          {/* DECORATIVE DIVIDER */}
          <div className="title-divider">
            <span />
            <span className="divider-symbol">◇</span>
            <span />
          </div>

          {/* DESCRIPTION */}
          <p className="hero-description">
            Follow the forgotten waters.
            Discover a civilization lost to time.
            Uncover the story beneath the surface.
          </p>

          {/* PRIMARY ACTIONS */}
          <div className="menu-actions">

            <button
              className="primary-button"
              onClick={() => onNavigate('map')}
            >
              Continue Adventure
              <span className="button-arrow">→</span>
            </button>

            <button
              className="secondary-button"
              onClick={() => onNavigate('map')}
            >
              New Expedition
            </button>

          </div>

          {/* SECONDARY NAVIGATION */}
          <nav className="secondary-actions">

            <button
              onClick={() => setSelectedAction('Explorer Journal')}
            >
              Explorer Journal
            </button>

            <span>·</span>

            <button
              onClick={() => setSelectedAction('Settings')}
            >
              Settings
            </button>

          </nav>

          {/* INTERACTION FEEDBACK */}
          {selectedAction && (
            <div className="selection-message" role="status">
              <span>✧</span>

              <span>
                {selectedAction} — Coming soon.
              </span>

              <button
                onClick={() => setSelectedAction('')}
                aria-label="Close message"
              >
                Close
              </button>
            </div>
          )}

        </div>

        {/* WORLD INFORMATION */}
        <div className="world-caption">
          <span>01 — THE FORGOTTEN VALLEY</span>
          <span>AN ANCIENT WORLD AWAITS DISCOVERY</span>
        </div>

      </section>
    </div>
  )
}

export default HomeScreen
