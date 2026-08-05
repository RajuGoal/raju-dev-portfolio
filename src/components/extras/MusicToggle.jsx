import { useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'

// Drop your track at public/audio/bg-music.mp3 — this component just needs
// that file to exist; no other wiring required.
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.volume = 0.35
      audio.play().then(() => setIsPlaying(true)).catch(() => setHasError(true))
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} src="/audio/bg-music.mp3" loop onError={() => setHasError(true)} />
      <button
        onClick={toggle}
        disabled={hasError}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={hasError ? 'Add public/audio/bg-music.mp3 to enable' : undefined}
        className="w-11 h-11 rounded-full border border-blueprint-line bg-blueprint-panel/80 backdrop-blur-sm flex items-center justify-center text-blueprint-muted hover:text-blueprint-amber hover:border-blueprint-amber transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPlaying ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
      </button>
    </div>
  )
}