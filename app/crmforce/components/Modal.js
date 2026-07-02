"use client";

import { useEffect } from "react";

// Simple accessible modal. Renders nothing when `open` is false.
export default function Modal({ open, title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="cf-modal-overlay" onMouseDown={onClose}>
      <div className="cf-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cf-modal-head">
          <h3>{title}</h3>
          <button
            className="cf-modal-close"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="cf-modal-body">{children}</div>
        {footer && <div className="cf-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
