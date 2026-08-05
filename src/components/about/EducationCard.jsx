import { GraduationCap } from 'lucide-react'
import CardHeader from './CardHeader.jsx'
import { education } from '../../data/aboutContent.js'

export default function EducationCard({ index }) {
  return (
    <>
      <CardHeader icon={GraduationCap} label="Education" index={index} />
      <ol className="relative border-l border-blueprint-line ml-1.5 space-y-5">
        {education.map((item) => (
          <li key={item.degree} className="pl-5 relative">
            <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blueprint-amber ring-4 ring-blueprint-panel" />
            <p className="text-sm font-semibold text-blueprint-text">{item.degree}</p>
            <p className="text-xs text-blueprint-muted">{item.institution}</p>
            <p className="text-[11px] font-mono text-blueprint-amber/80 mt-0.5">{item.period}</p>
            <p className="text-xs text-blueprint-muted mt-1 leading-relaxed">{item.description}</p>
          </li>
        ))}
      </ol>
    </>
  )
}