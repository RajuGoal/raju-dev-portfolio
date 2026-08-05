import { Award } from 'lucide-react'
import CardHeader from './CardHeader.jsx'
import { achievements } from '../../data/aboutContent.js'

export default function AchievementsCard({ index }) {
  return (
    <>
      <CardHeader icon={Award} label="Achievements" index={index} />
      <ul className="space-y-3">
        {achievements.map((a) => (
          <li key={a.title} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blueprint-amber shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blueprint-text">
                {a.title}{' '}
                <span className="font-mono text-[10px] text-blueprint-muted font-normal">
                  {a.year}
                </span>
              </p>
              <p className="text-xs text-blueprint-muted">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}