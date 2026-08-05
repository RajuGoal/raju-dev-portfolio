import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function handleMove(e) {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('pointermove', handleMove)

    let raf
    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[420px] h-[420px] -ml-[210px] -mt-[210px] rounded-full pointer-events-none z-30 mix-blend-screen hidden sm:block"
      style={{
        background: 'radial-gradient(circle, rgba(255,169,77,0.12) 0%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  )
}