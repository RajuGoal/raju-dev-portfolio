import { useMemo, useState } from 'react'
import useScrollProgress from '../../hooks/useScrollProgress.js'
import TimelineItem from './TimelineItem.jsx'
import { timelineEvents, timelineCategories } from '../../data/timelineData.js'

export default function TimelineSection() {
  const [activeFilters, setActiveFilters] = useState(new Set(Object.keys(timelineCategories)))
  const [containerRef, progress] = useScrollProgress()

  const filteredEvents = useMemo(
    () => timelineEvents.filter((e) => activeFilters.has(e.category)),
    [activeFilters]
  )

  function toggleFilter(key) {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        if (next.size === 1) return prev
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <section className="relative py-24 px-6 sm:px-10 border-t border-blueprint-line bg-blueprint-bg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-xs tracking-widest text-blueprint-amber uppercase mb-2">
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-blueprint-text">
            The Journey So Far
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {Object.entries(timelineCategories).map(([key, meta]) => {
            const active = activeFilters.has(key)
            return (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border transition"
                style={{
                  borderColor: active ? meta.color : '#2D4A73',
                  color: active ? meta.color : '#8FA5C9',
                  backgroundColor: active ? `${meta.color}1A` : 'transparent',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: active ? meta.color : '#8FA5C9' }}
                />
                {meta.label}
              </button>
            )
          })}
        </div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-blueprint-line -translate-x-1/2 sm:translate-x-0" />
          <div
            className="absolute left-4 sm:left-1/2 top-0 w-px bg-gradient-to-b from-blueprint-amber to-blueprint-amber/30 -translate-x-1/2 sm:translate-x-0 transition-[height] duration-150 ease-out"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="space-y-10">
            {filteredEvents.map((event, i) => (
              <TimelineItem key={event.id} event={event} side={i % 2 === 0 ? 'left' : 'right'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}