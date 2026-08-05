import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    function handleBeforeInstall(e) {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    function handleInstalled() {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  if (!deferredPrompt || isInstalled) return null

  async function handleInstall() {
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-6 left-20 z-50 flex items-center gap-2 text-xs font-mono px-3.5 py-2.5 rounded-full border border-blueprint-line bg-blueprint-panel/80 backdrop-blur-sm text-blueprint-muted hover:text-blueprint-amber hover:border-blueprint-amber transition"
    >
      <Download size={14} />
      Install App
    </button>
  )
}