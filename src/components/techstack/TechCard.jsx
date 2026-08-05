import { useRef, useState } from 'react'

const PARTICLE_COUNT = 14

export default function TechCard({ tech }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [bursts, setBursts] = useState([])

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 24
    const rotateX = (0.5 - py) * 24
    setTilt({ x: rotateX, y: rotateY })
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 })
    setIsHovering(false)
  }

  function explode() {
    const id = Date.now()
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.4
      const distance = 40 + Math.random() * 40
      return {
        id: i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
      }
    })
    setBursts((prev) => [...prev, { id, particles }])
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, 700)
  }

  return (
    <div style={{ perspective: '800px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={resetTilt}
        onClick={explode}
        className="relative aspect-square rounded-xl border border-blueprint-line bg-blueprint-panel/70 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden transition-shadow duration-200"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.06 : 1})`,
          transition: isHovering ? 'transform 0.05s linear' : 'transform 0.4s ease-out',
          boxShadow: isHovering ? `0 0 30px -6px ${tech.color}99` : 'none',
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            opacity: isHovering ? 0.35 : 0,
            background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)`,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div
          className="relative w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-xs border transition-transform duration-200"
          style={{
            borderColor: tech.color,
            color: tech.color,
            backgroundColor: `${tech.color}14`,
            transform: isHovering ? 'translateZ(20px)' : 'translateZ(0)',
          }}
        >
          {tech.abbr}
        </div>

        <p className="relative text-xs font-medium text-blueprint-text text-center px-2">
          {tech.name}
        </p>

        {bursts.map((burst) => (
          <div key={burst.id} className="absolute inset-0 pointer-events-none">
            {burst.particles.map((p) => (
              <span
                key={p.id}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full explode-particle"
                style={{
                  backgroundColor: tech.color,
                  '--dx': `${p.dx}px`,
                  '--dy': `${p.dy}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}