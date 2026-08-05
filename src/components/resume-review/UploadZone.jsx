import { useState, useRef } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

export default function UploadZone({ onFileReady, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setFileName(file.name);
    onFileReady(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed cursor-pointer transition-colors
        ${dragActive ? "border-amber-400 bg-amber-400/5" : "border-slate-700 hover:border-amber-400/50"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {loading ? (
        <>
          <Loader2 size={32} className="text-amber-400 animate-spin" />
          <p className="text-sm text-slate-400 font-mono">Analyzing your resume...</p>
        </>
      ) : fileName ? (
        <>
          <FileText size={32} className="text-amber-400" />
          <p className="text-sm text-slate-300 font-mono">{fileName}</p>
          <p className="text-xs text-slate-500">Click or drop a new file to re-analyze</p>
        </>
      ) : (
        <>
          <UploadCloud size={32} className="text-slate-500" />
          <p className="text-sm text-slate-300">Drop your resume PDF here, or click to browse</p>
          <p className="text-xs text-slate-500">PDF only, max 5MB</p>
        </>
      )}
    </div>
  );
}