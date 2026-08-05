import { useEffect, useRef, useState } from 'react'
import Terminal from './Terminal.jsx'
import MusicToggle from './MusicToggle.jsx'
import CursorGlow from './CursorGlow.jsx'
import MouseTrail from './MouseTrail.jsx'
import ShortcutsHelp from './ShortcutsHelp.jsx'
import EasterEggToast from './EasterEggToast.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import InstallPWAButton from './InstallPWAButton.jsx'
import QRCodeWidget from './QRCodeWidget.jsx'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const NAV_TARGETS = { h: 'home', a: 'about', s: 'skills', c: 'contact' }

export default function PremiumExtras() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const konamiIndex = useRef(0)
  const awaitingNavTarget = useRef(false)
  const navTimeout = useRef(null)

  useEffect(() => {
    function handleKeyDown(e) {
      const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName)

      const expected = KONAMI[konamiIndex.current]
      const pressed = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (pressed === expected) {
        konamiIndex.current++
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0
          setShowEasterEgg(true)
          setTimeout(() => setShowEasterEgg(false), 3000)
        }
      } else {
        konamiIndex.current = pressed === KONAMI[0] ? 1 : 0
      }

      if (isTyping) return

      if (e.key === '`') {
        e.preventDefault()
        setIsTerminalOpen((v) => !v)
        return
      }
      if (e.key === '?') {
        setIsShortcutsOpen((v) => !v)
        return
      }
      if (e.key === 'Escape') {
        setIsShortcutsOpen(false)
        return
      }
      if (e.key === 'g') {
        awaitingNavTarget.current = true
        clearTimeout(navTimeout.current)
        navTimeout.current = setTimeout(() => {
          awaitingNavTarget.current = false
        }, 1200)
        return
      }
      if (awaitingNavTarget.current && NAV_TARGETS[e.key]) {
        awaitingNavTarget.current = false
        document.getElementById(NAV_TARGETS[e.key])?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <CursorGlow />
      <MouseTrail />
      <LanguageSwitcher />
      <MusicToggle />
      <QRCodeWidget />
      <InstallPWAButton />

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <ShortcutsHelp isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <EasterEggToast show={showEasterEgg} />
    </>
  )
}