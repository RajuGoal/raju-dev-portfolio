// src/components/certificates/CertificatesSection.jsx
import React, { useState } from "react";
import CertificateSearch from "./CertificateSearch";
import CertificateFilters from "./CertificateFilters";
import CertificatesGallery from "./CertificatesGallery";
import CertificatePreviewModal from "./CertificatePreviewModal";
import { certificates } from "../../data/certificatesData";
import { useCertificateFilter } from "../../hooks/useCertificateFilter";

export default function CertificatesSection() {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filtered,
  } = useCertificateFilter(certificates);

  const [previewCert, setPreviewCert] = useState(null);

  return (
    <section
      id="certificates"
      className="relative py-24 px-6 md:px-12 bg-slate-950 overflow-hidden"
    >
      {/* background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-xs text-amber-500/70 tracking-widest uppercase">
            Fig. 09 — CERTIFICATES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mt-2">
            Credentials &amp; Certifications
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-mono">
            {filtered.length} of {certificates.length} certificates
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <CertificateFilters
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <CertificateSearch value={searchTerm} onChange={setSearchTerm} />
        </div>

        <CertificatesGallery
          certificates={filtered}
          onPreview={setPreviewCert}
        />
      </div>

      <CertificatePreviewModal
        cert={previewCert}
        onClose={() => setPreviewCert(null)}
      />
    </section>
  );
}