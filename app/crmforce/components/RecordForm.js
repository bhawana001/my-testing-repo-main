"use client";

import { useState } from "react";

// Generic record form driven by a `fields` spec.
// field: { name, label, type?, options?, required?, placeholder?, half? }
//   type: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea"
export default function RecordForm({ fields, initial = {}, onSubmit, onCancel, submitLabel = "Save" }) {
  const [values, setValues] = useState(() => {
    const seed = {};
    for (const f of fields) seed[f.name] = initial[f.name] ?? "";
    return seed;
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function set(name, v) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      // Coerce number fields.
      const payload = { ...values };
      for (const f of fields) {
        if (f.type === "number" && payload[f.name] !== "") {
          payload[f.name] = Number(payload[f.name]);
        }
      }
      await onSubmit(payload);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setBusy(false);
    }
  }

  // Group consecutive half-width fields into rows.
  const rows = [];
  let buffer = [];
  for (const f of fields) {
    if (f.half) {
      buffer.push(f);
      if (buffer.length === 2) {
        rows.push(buffer);
        buffer = [];
      }
    } else {
      if (buffer.length) {
        rows.push(buffer);
        buffer = [];
      }
      rows.push([f]);
    }
  }
  if (buffer.length) rows.push(buffer);

  return (
    <form onSubmit={submit} id="cf-record-form">
      {error && <div className="cf-error">{error}</div>}
      {rows.map((row, i) => (
        <div key={i} className={row.length === 2 ? "cf-field-row" : ""}>
          {row.map((f) => (
            <div className="cf-field" key={f.name}>
              <label>
                {f.label}
                {f.required ? " *" : ""}
              </label>
              {f.type === "select" ? (
                <select
                  value={values[f.name]}
                  onChange={(e) => set(f.name, e.target.value)}
                  required={f.required}
                >
                  <option value="">Select…</option>
                  {f.options.map((o) => (
                    <option key={o.value ?? o} value={o.value ?? o}>
                      {o.label ?? o}
                    </option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={values[f.name]}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.name, e.target.value)}
                  required={f.required}
                />
              ) : (
                <input
                  type={f.type || "text"}
                  value={values[f.name]}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.name, e.target.value)}
                  required={f.required}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <div className="cf-modal-foot" style={{ padding: "8px 0 0", borderTop: "none" }}>
        {onCancel && (
          <button type="button" className="cf-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="cf-btn cf-btn-primary" disabled={busy}>
          {busy ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
