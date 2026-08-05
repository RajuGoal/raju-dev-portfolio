import { BadgeCheck } from 'lucide-react'
import CardHeader from './CardHeader.jsx'
import { certifications } from '../../data/aboutContent.js'

export default function CertificationsCard({ index }) {
  return (
    <>
      <CardHeader icon={BadgeCheck} label="Certifications" index={index} />
      <ul className="space-y-3">
        {certifications.map((c) => (
          <li key={c.name} className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-blueprint-text">{c.name}</p>
              <p className="text-xs text-blueprint-muted">{c.issuer}</p>
            </div>
            <span className="font-mono text-[10px] text-blueprint-amber/80 shrink-0 mt-0.5">
              {c.year}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}