import { useState } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { languages } from '../../data/translations.js'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-full border border-blueprint-line bg-blueprint-panel/80 backdrop-blur-sm text-blueprint-muted hover:text-blueprint-amber hover:border-blueprint-amber transition"
      >
        <Globe size={14} />
        {languages.find((l) => l.code === lang)?.label}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 rounded-md border border-blueprint-line bg-blueprint-panel shadow-xl overflow-hidden">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-blueprint-bg transition ${
                l.code === lang ? 'text-blueprint-amber' : 'text-blueprint-text'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}