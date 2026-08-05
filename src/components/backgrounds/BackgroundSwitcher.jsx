import { useState } from 'react'
import ThreeBackground from './ThreeBackground.jsx'
import MatrixRain from './MatrixRain.jsx'
import FloatingCode from './FloatingCode.jsx'

const OPTIONS = [
  { id: 'particles', label: 'Particle Network' },
  { id: 'globe', label: 'Rotating Globe' },
  { id: 'galaxy', label: 'Galaxy' },
  { id: 'grid', label: 'Animated Grid' },
  { id: 'mesh', label: 'Three.js Objects' },
  { id: 'matrix', label: 'Matrix Rain' },
  { id: 'code', label: 'Floating Code' },
]

export default function BackgroundSwitcher() {
  const [active, setActive] = useState('particles')

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-blueprint-bg border-t border-blueprint-line flex items-center justify-center">
      {active === 'matrix' && <MatrixRain />}
      {active === 'code' && <FloatingCode />}
      {active !== 'matrix' && active !== 'code' && (
        <ThreeBackground mode={active} />
      )}

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-blueprint-text">
          3D Background — {OPTIONS.find((o) => o.id === active)?.label}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {OPTIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => setActive(o.id)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition ${
                active === o.id
                  ? 'border-blueprint-amber text-blueprint-amber bg-blueprint-amber/10'
                  : 'border-blueprint-line text-blueprint-muted hover:text-blueprint-text hover:border-blueprint-text'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}