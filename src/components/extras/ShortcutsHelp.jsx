import { X } from 'lucide-react'

const SHORTCUTS = [
  { keys: '` (backtick)', desc: 'Open the terminal' },
  { keys: 'g then h', desc: 'Go to Home' },
  { keys: 'g then a', desc: 'Go to About' },
  { keys: 'g then s', desc: 'Go to Skills' },
  { keys: 'g then c', desc: 'Go to Contact' },
  { keys: '?', desc: 'Show this shortcuts panel' },
  { keys: '↑ ↑ ↓ ↓ ← → ← → b a', desc: '??? (try it)' },
]

export default function ShortcutsHelp({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-lg border border-blueprint-line bg-blueprint-panel shadow-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm font-semibold text-blueprint-text uppercase tracking-wide">
            Keyboard Shortcuts
          </h3>
          <button onClick={onClose} aria-label="Close" className="text-blueprint-muted hover:text-blueprint-amber">
            <X size={16} />
          </button>
        </div>
        <ul className="space-y-2">
          {SHORTCUTS.map((s) => (
            <li key={s.keys} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-blueprint-muted">{s.desc}</span>
              <kbd className="font-mono px-2 py-0.5 rounded bg-blueprint-bg border border-blueprint-line text-blueprint-amber whitespace-nowrap">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}