import { useMemo, useState } from 'react'
import TechCard from './TechCard.jsx'
import { techStack, techStackCategories } from '../../data/techStackData.js'

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...techStackCategories]

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? techStack
        : techStack.filter((t) => t.category === activeCategory),
    [activeCategory]
  )

  return (
    <section className="relative py-24 px-6 sm:px-10 border-t border-blueprint-line bg-blueprint-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <p className="font-mono text-xs tracking-widest text-blueprint-amber uppercase mb-2">
            Fig. 10 — Tech Stack
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-blueprint-text">
            Tech Stack
          </h2>
          <p className="text-xs text-blueprint-muted font-mono mt-2">
            Tilt with your cursor · click a logo to see it spark
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono uppercase tracking-wide px-3.5 py-1.5 rounded-full border transition ${
                activeCategory === cat
                  ? 'border-blueprint-amber text-blueprint-amber bg-blueprint-amber/10'
                  : 'border-blueprint-line text-blueprint-muted hover:text-blueprint-text hover:border-blueprint-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  )
}