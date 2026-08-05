import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { QrCode, X } from 'lucide-react'

export default function QRCodeWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, window.location.href, {
      width: 180,
      margin: 1,
      color: { dark: '#0B1E3A', light: '#EDF2FA' },
    })
  }, [isOpen])

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Show QR code for this page"
        className="w-11 h-11 rounded-full border border-blueprint-line bg-blueprint-panel/80 backdrop-blur-sm flex items-center justify-center text-blueprint-muted hover:text-blueprint-amber hover:border-blueprint-amber transition"
      >
        <QrCode size={18} />
      </button>

      {isOpen && (
        <div className="absolute bottom-14 left-0 bg-white rounded-lg p-3 shadow-2xl">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blueprint-bg text-blueprint-text flex items-center justify-center border border-blueprint-line"
          >
            <X size={11} />
          </button>
          <canvas ref={canvasRef} />
          <p className="text-[10px] font-mono text-center text-blueprint-bg/70 mt-1">
            Scan to open on mobile
          </p>
        </div>
      )}
    </div>
  )
}