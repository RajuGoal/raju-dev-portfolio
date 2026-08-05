import { Code2 } from 'lucide-react'
import CardHeader from './CardHeader.jsx'
import { skillGroups } from '../../data/aboutContent.js'

export default function SkillsCard({ index }) {
  return (
    <>
      <CardHeader icon={Code2} label="Skills" index={index} />
      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[11px] font-mono uppercase tracking-widest text-blueprint-muted mb-1.5">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-md bg-blueprint-bg border border-blueprint-line text-blueprint-text hover:border-blueprint-amber hover:text-blueprint-amber transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}