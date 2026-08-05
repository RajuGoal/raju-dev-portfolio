import { MapPin, Radio } from 'lucide-react'
import CardHeader from './CardHeader.jsx'
import { location, currentStatus } from '../../data/aboutContent.js'

export default function LocationStatusCard({ index }) {
  return (
    <>
      <CardHeader icon={MapPin} label="Location & Status" index={index} />

      <div className="flex items-center gap-2 mb-4">
        <MapPin size={14} className="text-blueprint-amber shrink-0" />
        <p className="text-sm text-blueprint-text">
          {location.city}, {location.country}
        </p>
      </div>
      <p className="text-xs text-blueprint-muted mb-4">
        {location.timezone}
        {location.remoteFriendly ? ' · Open to remote work' : ''}
      </p>

      <div className="flex items-center gap-2 pt-3 border-t border-blueprint-line">
        <span className="relative flex h-2 w-2 shrink-0">
          {currentStatus.available && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              currentStatus.available ? 'bg-emerald-400' : 'bg-blueprint-muted'
            }`}
          />
        </span>
        <div className="flex items-center gap-1.5 min-w-0">
          <Radio size={12} className="text-blueprint-muted shrink-0" />
          <p className="text-xs text-blueprint-text truncate">{currentStatus.headline}</p>
        </div>
      </div>
      <p className="text-[11px] text-blueprint-muted mt-1">{currentStatus.responseTime}</p>
    </>
  )
}