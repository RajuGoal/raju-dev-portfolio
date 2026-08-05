import { Sparkles } from 'lucide-react'

export default function EasterEggToast({ show }) {
  if (!show) return null
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 bg-blueprint-amber text-blueprint-bg font-mono text-sm font-semibold px-4 py-2.5 rounded-full shadow-2xl animate-fadeUp">
      <Sparkles size={16} />
      Konami code activated — you found the easter egg! 🎉
    </div>
  )
}