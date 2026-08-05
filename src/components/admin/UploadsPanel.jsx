import { useState } from "react";
import { Upload, FileText, Award } from "lucide-react";

// Browser-only file handling — files aren't sent anywhere (no backend), so this
// stores them as local blob URLs for preview. Real persistence needs file storage
// (Firebase Storage / Cloudinary / S3) — ask me to wire this up if you want it real.
export default function UploadsPanel() {
  const [resumeFile, setResumeFile] = useState(null);
  const [certFiles, setCertFiles] = useState([]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Resume Update</h4>
        <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900/60 border border-dashed border-slate-700 cursor-pointer hover:border-amber-400/60">
          <Upload size={16} className="text-amber-400" />
          <span className="text-sm text-slate-300">
            {resumeFile ? resumeFile.name : "Click to upload new resume PDF"}
          </span>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </label>
        {resumeFile && (
          <p className="text-xs text-slate-500 mt-2 font-mono">
            Preview only — copy this file into /public/resume/ manually to make it live (no backend connected).
          </p>
        )}
      </div>

      <div>
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Certificate Upload</h4>
        <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900/60 border border-dashed border-slate-700 cursor-pointer hover:border-amber-400/60">
          <Award size={16} className="text-amber-400" />
          <span className="text-sm text-slate-300">Click to upload certificates (images/PDF)</span>
          <input
            type="file"
            accept="image/*,.pdf"
            multiple
            className="hidden"
            onChange={(e) => setCertFiles((prev) => [...prev, ...Array.from(e.target.files)])}
          />
        </label>

        {certFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {certFiles.map((f, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-700 rounded-lg p-2 flex flex-col items-center gap-1">
                <FileText size={20} className="text-amber-400" />
                <p className="text-[10px] text-slate-400 truncate w-full text-center">{f.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}