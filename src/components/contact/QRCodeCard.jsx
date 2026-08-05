import { QRCodeSVG } from "qrcode.react";

export default function QRCodeCard() {
  const profileUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 flex items-center gap-4">
      <div className="bg-white p-2 rounded-lg flex-shrink-0">
        <QRCodeSVG value={profileUrl} size={80} fgColor="#0f172a" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-100">Scan to Visit</p>
        <p className="text-xs text-slate-500">
          Share this portfolio instantly — scan with any phone camera.
        </p>
      </div>
    </div>
  );
}