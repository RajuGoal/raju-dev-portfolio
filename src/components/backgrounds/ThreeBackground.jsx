import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createGlobeScene } from './scenes/globe.js'
import { createGalaxyScene } from './scenes/galaxy.js'
import { createGridScene } from './scenes/grid.js'
import { createParticleNetworkScene } from './scenes/particleNetwork.js'
import { createMeshScene } from './scenes/mesh.js'

const SCENE_BUILDERS = {
  globe: createGlobeScene,
  galaxy: createGalaxyScene,
  grid: createGridScene,
  particles: createParticleNetworkScene,
  mesh: createMeshScene,
}

/**
 * Drop-in 3D background. Renders full-bleed behind whatever content sits
 * on top of it (parent should be `position: relative`).
 *
 * Props:
 *   mode        — 'globe' | 'galaxy' | 'grid' | 'particles' | 'mesh'
 *   interactive — if true, the camera drifts toward the mouse position (parallax)
 */
export default function ThreeBackground({ mode = 'particles', interactive = true, className = '' }) {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const build = SCENE_BUILDERS[mode] || SCENE_BUILDERS.particles
    const activeScene = build(scene)

    function handleResize() {
      const { clientWidth, clientHeight } = container
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }
    window.addEventListener('resize', handleResize)

    function handlePointerMove(e) {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (interactive) window.addEventListener('pointermove', handlePointerMove)

    let animationId
    const clock = new THREE.Clock()

    function animate() {
      const elapsed = clock.getElapsedTime()
      activeScene.update(elapsed)

      if (interactive) {
        camera.position.x += (mouseRef.current.x * 0.6 - camera.position.x) * 0.04
        camera.position.y += (-mouseRef.current.y * 0.4 - camera.position.y) * 0.04
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    if (!prefersReducedMotion) {
      animate()
    } else {
      renderer.render(scene, camera)
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      if (interactive) window.removeEventListener('pointermove', handlePointerMove)
      activeScene.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [mode, interactive])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}