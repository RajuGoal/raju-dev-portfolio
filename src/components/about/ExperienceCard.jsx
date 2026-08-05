import { Briefcase } from 'lucide-react'
import CardHeader from './CardHeader.jsx'
import { experience } from '../../data/aboutContent.js'

export default function ExperienceCard({ index }) {
  return (
    <>
      <CardHeader icon={Briefcase} label="Experience" index={index} />
      <ol className="relative border-l border-blueprint-line ml-1.5 space-y-5">
        {experience.map((item) => (
          <li key={item.role + item.period} className="pl-5 relative">
            <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blueprint-amber ring-4 ring-blueprint-panel" />
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-blueprint-text">{item.role}</p>
              <span
                className={`text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded ${
                  item.type === 'internship'
                    ? 'bg-blueprint-amber/10 text-blueprint-amber border border-blueprint-amber/40'
                    : 'bg-blueprint-line/40 text-blueprint-muted border border-blueprint-line'
                }`}
              >
                {item.type === 'internship' ? 'Internship' : 'Full-time'}
              </span>
            </div>
            <p className="text-xs text-blueprint-muted">{item.org}</p>
            <p className="text-[11px] font-mono text-blueprint-amber/80 mt-0.5">{item.period}</p>
            <p className="text-xs text-blueprint-muted mt-1 leading-relaxed">{item.description}</p>
          </li>
        ))}
      </ol>
    </>
  )
}