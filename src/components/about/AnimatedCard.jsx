import useInView from '../../hooks/useInView.js'

/**
 * Wraps any card content with a fade + slide-up reveal that triggers once
 * the card scrolls into view. `delay` (ms) lets you stagger a grid of cards.
 */
export default function AnimatedCard({ children, delay = 0, className = '' }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`corner-brackets bg-blueprint-panel/60 border border-blueprint-line rounded-xl p-5 backdrop-blur-sm transition-all duration-700 ease-out hover:border-blueprint-amber/60 hover:-translate-y-1 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: isInView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}