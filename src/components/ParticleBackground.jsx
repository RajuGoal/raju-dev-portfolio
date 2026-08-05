import { useEffect, useRef } from 'react'

// Drifting nodes connected by faint lines when close together —
// styled like a blueprint schematic / circuit diagram.
export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let width, height, nodes

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const NODE_COUNT_DENSITY = 18000
    const LINK_DISTANCE = 140
    const NODE_COLOR = '148, 168, 209'
    const AMBER = '255, 169, 77'

    function resize() {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio
      height = canvas.height = canvas.offsetHeight * devicePixelRatio
      const count = Math.floor(
        (canvas.offsetWidth * canvas.offsetHeight) / NODE_COUNT_DENSITY
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        isAmber: Math.random() < 0.08,
        r: (Math.random() * 1.4 + 0.6) * devicePixelRatio,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = LINK_DISTANCE * devicePixelRatio
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.isAmber
          ? `rgba(${AMBER}, 0.9)`
          : `rgba(${NODE_COLOR}, 0.8)`
        ctx.fill()
      }

      animationId = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)

    if (!prefersReducedMotion) {
      step()
    } else {
      step()
      cancelAnimationFrame(animationId)
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}