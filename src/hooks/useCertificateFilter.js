// src/hooks/useCertificateFilter.js
import { useState, useMemo } from "react";

export function useCertificateFilter(certificates) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesCategory =
        activeCategory === "All" || cert.category === activeCategory;

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term === "" ||
        cert.title.toLowerCase().includes(term) ||
        cert.issuer.toLowerCase().includes(term) ||
        cert.skills.some((s) => s.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [certificates, searchTerm, activeCategory]);

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filtered,
  };
}
