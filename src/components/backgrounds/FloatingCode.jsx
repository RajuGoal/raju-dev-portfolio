import { useEffect, useRef } from 'react'

const SNIPPETS = [
  'const App = () => {',
  'export default function',
  'npm run build',
  'git commit -m "fix"',
  'return response.json()',
  '<Component {...props} />',
  'useEffect(() => {}, [])',
  'SELECT * FROM users',
  'docker-compose up',
  '{ status: 200 }',
  'async function fetchData()',
  'if (isLoading) return null',
]

export default function FloatingCode({ color = '#8FA5C9', accentColor = '#FFA94D', fontSize = 14, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let lines

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.max(10, Math.floor(canvas.width / 140))
      lines = Array.from({ length: count }, () => spawnLine(canvas))
    }

    function spawnLine(canvas, startBelow = false) {
      return {
        text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
        x: Math.random() * canvas.width,
        y: startBelow ? canvas.height + 20 : Math.random() * canvas.height,
        speed: 0.15 + Math.random() * 0.3,
        opacity: 0.15 + Math.random() * 0.35,
        isAccent: Math.random() < 0.15,
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      lines.forEach((line, i) => {
        ctx.fillStyle = line.isAccent
          ? hexToRgba(accentColor, line.opacity)
          : hexToRgba(color, line.opacity)
        ctx.fillText(line.text, line.x, line.y)

        line.y -= line.speed
        if (line.y < -20) {
          lines[i] = spawnLine(canvas, true)
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    function hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    resize()
    window.addEventListener('resize', resize)

    if (!prefersReducedMotion) {
      draw()
    } else {
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      lines.forEach((line) => {
        ctx.fillStyle = hexToRgba(color, line.opacity)
        ctx.fillText(line.text, line.x, line.y)
      })
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [color, accentColor, fontSize])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}