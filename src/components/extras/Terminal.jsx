import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { person, projects, contact } from '../../data/assistantKnowledge.js'

const BANNER = `Welcome to ${person.name}'s terminal. Type "help" to see available commands.`

function runCommand(raw, { onClose }) {
  const cmd = raw.trim().toLowerCase()

  switch (cmd) {
    case 'help':
      return [
        'Available commands:',
        '  help        show this list',
        '  about       who is ' + person.name,
        '  projects    list projects',
        '  skills      list core skills',
        '  resume      download resume',
        '  contact     get contact info',
        '  whoami      ???',
        '  sudo        try it',
        '  clear       clear the terminal',
        '  exit        close the terminal',
      ]
    case 'about':
      return [person.bio]
    case 'projects':
      return projects.map((p) => `${p.name} — ${p.tagline}`)
    case 'skills':
      return ['React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, TypeScript']
    case 'resume':
      window.open(contact.resumeUrl, '_blank')
      return ['Opening resume…']
    case 'contact':
      return [`Email: ${contact.email}`, `GitHub: ${contact.socials.github}`, `LinkedIn: ${contact.socials.linkedin}`]
    case 'whoami':
      return ['A curious visitor with excellent taste in portfolios.']
    case 'sudo':
    case 'sudo make me a sandwich':
      return ["Nice try. You're not in the sudoers file — but here, have a 🥪 anyway."]
    case '':
      return []
    case 'exit':
      onClose()
      return []
    default:
      return [`command not found: ${cmd} — type "help" for a list of commands`]
  }
}

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([{ type: 'output', lines: [BANNER] }])
  const [input, setInput] = useState('')
  const [commandLog, setCommandLog] = useState([])
  const [logIndex, setLogIndex] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [isOpen])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [history])

  function handleSubmit(e) {
    e.preventDefault()
    const value = input
    if (value.trim().toLowerCase() === 'clear') {
      setHistory([])
      setInput('')
      return
    }
    const output = runCommand(value, { onClose })
    setHistory((prev) => [...prev, { type: 'input', text: value }, { type: 'output', lines: output }])
    if (value.trim()) setCommandLog((prev) => [...prev, value])
    setLogIndex(-1)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandLog.length === 0) return
      const nextIndex = logIndex === -1 ? commandLog.length - 1 : Math.max(0, logIndex - 1)
      setLogIndex(nextIndex)
      setInput(commandLog[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (logIndex === -1) return
      const nextIndex = logIndex + 1
      if (nextIndex >= commandLog.length) {
        setLogIndex(-1)
        setInput('')
      } else {
        setLogIndex(nextIndex)
        setInput(commandLog[nextIndex])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl h-[420px] flex flex-col rounded-lg border border-blueprint-line bg-[#050d1c] shadow-2xl overflow-hidden font-mono text-sm">
        <div className="flex items-center justify-between px-3 py-2 border-b border-blueprint-line bg-blueprint-panel/60">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-[11px] text-blueprint-muted">portfolio — zsh</span>
          <button onClick={onClose} aria-label="Close terminal" className="text-blueprint-muted hover:text-blueprint-amber">
            <X size={14} />
          </button>
        </div>

        <div ref={scrollRef} onClick={() => inputRef.current?.focus()} className="flex-1 overflow-y-auto p-3 space-y-1 text-blueprint-text">
          {history.map((entry, i) =>
            entry.type === 'input' ? (
              <p key={i} className="text-blueprint-amber">
                <span className="text-emerald-400">➜ </span>
                {entry.text}
              </p>
            ) : (
              entry.lines.map((line, j) => (
                <p key={`${i}-${j}`} className="text-blueprint-muted whitespace-pre-wrap">
                  {line}
                </p>
              ))
            )
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-emerald-400">➜</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-blueprint-text"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  )
}