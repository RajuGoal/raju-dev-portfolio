import { useState } from "react";
import { Download, ExternalLink, AlertCircle } from "lucide-react";

export default function PDFPreview({ version }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/50">
        <div>
          <p className="font-mono text-sm text-slate-200 font-semibold">{version.label}</p>
          <p className="text-xs text-slate-500">{version.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={version.file}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-300 hover:bg-slate-700 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={15} />
          </a>
          <a
            href={version.file}
            download
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-400 text-slate-900 text-xs font-bold hover:bg-amber-300 transition-colors"
          >
            <Download size={14} /> Download
          </a>
        </div>
      </div>

      {/* Preview */}
      <div className="h-[600px] bg-slate-950">
        {!failed ? (
          <iframe
            src={`${version.file}#toolbar=0`}
            title={version.label}
            className="w-full h-full"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-500">
            <AlertCircle size={32} />
            <p className="text-sm font-mono">Preview unavailable</p>
            <a
              href={version.file}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 text-sm hover:underline"
            >
              Open PDF directly →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}