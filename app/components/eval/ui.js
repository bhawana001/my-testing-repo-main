"use client";
// Shared UI primitives for entity flows. Pure presentational, all styled by
// app/entity-evals.css (.ee-*). Keep props simple so engines stay readable.
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export function Btn({ variant, size, block, pill, className, children, loading, ...rest }) {
  return (
    <button
      type="button"
      className={cx("ee-btn", variant && `ee-btn--${variant}`, size && `ee-btn--${size}`, block && "ee-btn--block", pill && "ee-btn--pill", className)}
      disabled={rest.disabled || loading}
      {...rest}
    >
      {loading && <span className="ee-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function Card({ title, right, flat, tight, className, children, ...rest }) {
  return (
    <section className={cx("ee-card", flat && "ee-card--flat", tight && "ee-card--tight", className)} {...rest}>
      {title && (
        <div className="ee-card__title">
          <span>{title}</span>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, help, error, htmlFor, children }) {
  return (
    <div className="ee-field">
      {label && (
        <label className="ee-label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error ? <div className="ee-error" role="alert">{error}</div> : help ? <div className="ee-help">{help}</div> : null}
    </div>
  );
}
export function Input({ className, invalid, ...rest }) {
  return <input className={cx("ee-input", className)} aria-invalid={invalid ? "true" : undefined} {...rest} />;
}
export function Select({ className, invalid, children, ...rest }) {
  return (
    <select className={cx("ee-select", className)} aria-invalid={invalid ? "true" : undefined} {...rest}>
      {children}
    </select>
  );
}
export function Textarea({ className, invalid, ...rest }) {
  return <textarea className={cx("ee-textarea", className)} aria-invalid={invalid ? "true" : undefined} {...rest} />;
}
export function Check({ label, ...rest }) {
  return (
    <label className="ee-check">
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  );
}
export function Toggle({ checked, onChange, label, ...rest }) {
  return (
    <button type="button" role="switch" aria-checked={checked ? "true" : "false"} aria-label={label} className="ee-toggle" onClick={() => onChange(!checked)} {...rest} />
  );
}
export function RadioCard({ name, value, checked, onChange, title, desc, right }) {
  return (
    <label className="ee-radio-card" data-checked={checked ? "true" : "false"}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} />
      <span style={{ flex: 1 }}>
        <span className="ee-strong" style={{ display: "block" }}>{title}</span>
        {desc && <span className="ee-small ee-muted" style={{ display: "block" }}>{desc}</span>}
      </span>
      {right && <span className="ee-strong ee-num">{right}</span>}
    </label>
  );
}
export function Chips({ options, value, onChange, multi }) {
  const isOn = (v) => (multi ? (value || []).includes(v) : value === v);
  return (
    <div className="ee-row" style={{ gap: 8 }}>
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (
          <button key={v} type="button" className="ee-chip" data-active={isOn(v) ? "true" : "false"} aria-pressed={isOn(v)} onClick={() => {
            if (multi) onChange(isOn(v) ? value.filter((x) => x !== v) : [...(value || []), v]);
            else onChange(isOn(v) ? null : v);
          }}>
            {l}
          </button>
        );
      })}
    </div>
  );
}
export function Segment({ options, value, onChange }) {
  return (
    <div className="ee-segment" role="tablist">
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (
          <button key={v} type="button" role="tab" aria-selected={value === v} data-active={value === v ? "true" : "false"} onClick={() => onChange(v)}>
            {l}
          </button>
        );
      })}
    </div>
  );
}

export function Badge({ tone, children, ...rest }) {
  return (
    <span className={cx("ee-badge", tone && `ee-badge--${tone}`)} {...rest}>
      {children}
    </span>
  );
}
export function Alert({ tone = "info", title, children, ...rest }) {
  const icon = { ok: "✓", err: "!", warn: "⚠", info: "i" }[tone];
  return (
    <div className={cx("ee-alert", `ee-alert--${tone}`)} role={tone === "err" ? "alert" : "status"} {...rest}>
      <span className="ee-strong" aria-hidden="true">{icon}</span>
      <div>
        {title && <div className="ee-strong">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Stepper({ steps, current }) {
  return (
    <ol className="ee-stepper" aria-label="Progress">
      {steps.map((s, i) => (
        <li key={s} className="ee-step" data-state={i < current ? "done" : i === current ? "active" : "todo"} aria-current={i === current ? "step" : undefined}>
          <span className="ee-step__n">{i < current ? "✓" : i + 1}</span>
          <span>{s}</span>
          {i < steps.length - 1 && <span className="ee-step__bar" />}
        </li>
      ))}
    </ol>
  );
}

export function KV({ k, v, total, discount, testId }) {
  return (
    <div className={cx("ee-kv", total && "ee-kv--total", discount && "ee-kv--discount")} data-testid={testId}>
      <span className="ee-kv__k">{k}</span>
      <span className="ee-kv__v ee-num">{v}</span>
    </div>
  );
}

export function Modal({ open, title, onClose, wide, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ee-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={cx("ee-modal", wide && "ee-modal--wide")} role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined}>
        {title && (
          <div className="ee-modal__title">
            <span>{title}</span>
            {onClose && (
              <button type="button" className="ee-btn ee-btn--ghost ee-btn--sm" onClick={onClose} aria-label="Close">
                ✕
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

const ToastCtx = createContext(() => {});
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((text, tone) => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, text, tone }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="ee-toast-wrap" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={cx("ee-toast", t.tone && `ee-toast--${t.tone}`)} role="status">
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
export function useToast() {
  return useContext(ToastCtx);
}

export function Skeleton({ h = 14, w = "100%", style }) {
  return <div className="ee-skeleton" style={{ height: h, width: w, ...style }} aria-hidden="true" />;
}
export function Spinner() {
  return <span className="ee-spinner" aria-label="Loading" />;
}
export function Empty({ children }) {
  return <div className="ee-empty">{children}</div>;
}

export function Timeline({ items }) {
  return (
    <ol className="ee-timeline">
      {items.map((it, i) => (
        <li key={i} data-state={it.state} data-testid={it.testId}>
          <span className="ee-tl__dot">{it.state === "done" ? "✓" : ""}</span>
          <div className="ee-tl__title">{it.title}</div>
          {it.meta && <div className="ee-tl__meta">{it.meta}</div>}
        </li>
      ))}
    </ol>
  );
}

export function Table({ cols, rows, empty = "No rows", rowKey, onRowClick }) {
  return (
    <div className="ee-table-wrap">
      <table className="ee-table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key} className={c.align === "right" ? "ee-right" : undefined}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={cols.length} className="ee-empty">{empty}</td>
            </tr>
          )}
          {rows.map((r, i) => (
            <tr key={rowKey ? rowKey(r) : i} onClick={onRowClick ? () => onRowClick(r) : undefined} style={onRowClick ? { cursor: "pointer" } : undefined}>
              {cols.map((c) => (
                <td key={c.key} className={c.align === "right" ? "ee-right" : undefined}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Simulated async delay; longer when chaos mode is on. */
export function useDelay() {
  const [chaos, setChaos] = useState(false);
  useEffect(() => {
    setChaos(new URLSearchParams(window.location.search).get("chaos") === "true");
  }, []);
  return useCallback((ms = 500) => new Promise((r) => setTimeout(r, chaos ? ms * 5 : ms)), [chaos]);
}
