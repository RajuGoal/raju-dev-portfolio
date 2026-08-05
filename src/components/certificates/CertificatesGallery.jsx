// src/components/certificates/CertificatesGallery.jsx
import React from "react";
import CertificateCard from "./CertificateCard";

export default function CertificatesGallery({ certificates, onPreview }) {
  if (!certificates.length) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 font-mono text-sm">
          // No certificates match your search
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert, index) => (
        <CertificateCard
          key={cert.id}
          cert={cert}
          index={index}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}