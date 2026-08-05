import { Languages as LanguagesIcon } from 'lucide-react'
import useInView from '../../hooks/useInView.js'
import CardHeader from './CardHeader.jsx'
import { languages } from '../../data/aboutContent.js'

export default function LanguagesCard({ index }) {
  const [barsRef, barsInView] = useInView()

  return (
    <>
      <CardHeader icon={LanguagesIcon} label="Languages" index={index} />
      <div ref={barsRef} className="space-y-3">
        {languages.map((lang) => (
          <div key={lang.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-blueprint-text font-medium">{lang.name}</span>
              <span className="text-blueprint-muted font-mono">{lang.level}</span>
            </div>
            <div className="h-1.5 rounded-full bg-blueprint-bg border border-blueprint-line overflow-hidden">
              <div
                className="h-full bg-blueprint-amber rounded-full transition-all duration-1000 ease-out"
                style={{ width: barsInView ? `${lang.proficiency}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}