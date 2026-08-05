import {
  GraduationCap,
  Building2,
  FolderGit2,
  Award,
  BadgeCheck,
  Rocket,
} from 'lucide-react'
import useInView from '../../hooks/useInView.js'
import { timelineCategories } from '../../data/timelineData.js'

const ICONS = {
  education: GraduationCap,
  internship: Building2,
  project: FolderGit2,
  achievement: Award,
  certificate: BadgeCheck,
  goal: Rocket,
}

export default function TimelineItem({ event, side }) {
  const [ref, isInView] = useInView({ threshold: 0.3 })
  const Icon = ICONS[event.category]
  const meta = timelineCategories[event.category]
  const isLeft = side === 'left'

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full ${
        isLeft ? 'sm:justify-start' : 'sm:justify-end'
      } justify-start`}
    >
      <div
        className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 ${
          isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } ${event.upcoming ? 'border-dashed' : ''}`}
        style={{
          borderColor: meta.color,
          backgroundColor: '#0B1E3A',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: meta.color }}
        />
      </div>

      <div
        className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 transition-all duration-700 ease-out ${
          isInView
            ? 'opacity-100 translate-y-0'
            : `opacity-0 translate-y-6 ${isLeft ? 'sm:-translate-x-4' : 'sm:translate-x-4'}`
        }`}
      >
        <div
          className={`bg-blueprint-panel/70 border rounded-lg p-4 backdrop-blur-sm hover:-translate-y-0.5 transition-transform ${
            event.upcoming ? 'border-dashed border-blueprint-line' : 'border-blueprint-line'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Icon size={14} style={{ color: meta.color }} />
            <span
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: meta.color }}
            >
              {meta.label}
            </span>
            <span className="text-[10px] font-mono text-blueprint-muted/70 ml-auto">
              {event.date}
            </span>
          </div>
          <p className="text-sm font-semibold text-blueprint-text">{event.title}</p>
          <p className="text-xs text-blueprint-muted mb-1">{event.org}</p>
          <p className="text-xs text-blueprint-muted leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  )
}