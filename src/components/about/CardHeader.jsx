export default function CardHeader({ icon: Icon, label, index }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-blueprint-amber/10 border border-blueprint-amber/40 flex items-center justify-center">
          <Icon size={16} className="text-blueprint-amber" />
        </div>
        <h3 className="font-display text-sm font-semibold tracking-wide text-blueprint-text uppercase">
          {label}
        </h3>
      </div>
      {index != null && (
        <span className="font-mono text-[10px] text-blueprint-muted/60">
          {String(index).padStart(2, '0')}
        </span>
      )}
    </div>
  )
}