"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Debounced global search that hits /api/crmforce/search.
export default function GlobalSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/crmforce/search?q=${encodeURIComponent(term)}`,
          { cache: "no-store" }
        );
        const { data } = await res.json();
        setResults(data || []);
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function onClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="cf-search" ref={boxRef}>
      <span className="cf-search-ico">🔍</span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => q && setOpen(true)}
        placeholder="Search accounts, contacts, leads, opportunities…"
        aria-label="Global search"
      />
      {open && q.trim() && (
        <div className="cf-search-results">
          {results.length === 0 ? (
            <div className="cf-search-empty">No matches for “{q}”.</div>
          ) : (
            results.map((r) => (
              <Link
                key={`${r.collection}-${r.id}`}
                href={r.href}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                }}
              >
                <span>{r.title}</span>
                <span className="cf-badge cf-badge-gray">{r.type}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
