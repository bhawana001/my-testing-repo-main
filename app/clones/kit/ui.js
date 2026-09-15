"use client";
// Shared chrome and controls for the clone apps. Brand identity comes from CSS
// variables set on the shell, so the same components render as Flipkart blue or
// Nike black without per-brand component copies.
import Link from "next/link";
import { useEffect, useState } from "react";

export function Shell({ brand, children }) {
  // brand: { name, slug, accent, accentText, bg, font }
  const style = {
    "--ck-accent": brand.accent || "#2874f0",
    "--ck-accent-text": brand.accentText || "#fff",
    "--ck-bg": brand.bg || "#f1f3f6",
  };
  return (
    <div className="ck" style={style} data-brand={brand.slug}>
      {children}
    </div>
  );
}

export function TopBar({ brand, nav = [], right = null, search = null }) {
  return (
    <header className="ck-top">
      <div className="ck-top-inner">
        <Link href={brand.home} className="ck-logo">
          {brand.mark && <span className="ck-logo-mark" aria-hidden="true">{brand.mark}</span>}
          <span className="ck-logo-text">{brand.name}</span>
        </Link>
        {search}
        <nav className="ck-nav">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="ck-nav-link" data-testid={n.testId}>
              {n.label}
            </Link>
          ))}
        </nav>
        {right}
      </div>
    </header>
  );
}

export function Page({ title, sub, children, wide = false, actions = null }) {
  return (
    <main className={"ck-page" + (wide ? " ck-page--wide" : "")}>
      {(title || actions) && (
        <div className="ck-page-head">
          <div>
            {title && <h1 className="ck-h1">{title}</h1>}
            {sub && <p className="ck-sub">{sub}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </main>
  );
}

export function Card({ title, children, actions, tone, testId, className = "" }) {
  return (
    <section className={`ck-card ${tone ? `ck-card--${tone}` : ""} ${className}`} data-testid={testId}>
      {title && <h2 className="ck-card-title">{title}</h2>}
      {children}
      {actions && <div className="ck-card-actions">{actions}</div>}
    </section>
  );
}

export function Btn({ children, variant = "primary", size, block, as, ...rest }) {
  const cls = `ck-btn ck-btn--${variant}${size ? ` ck-btn--${size}` : ""}${block ? " ck-btn--block" : ""}`;
  if (as === "link") return <Link className={cls} {...rest}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}

export function Field({ label, hint, error, children }) {
  return (
    <label className="ck-field">
      {label && <span className="ck-field-label">{label}</span>}
      {children}
      {hint && !error && <span className="ck-field-hint">{hint}</span>}
      {error && <span className="ck-field-error" role="alert">{error}</span>}
    </label>
  );
}

export function Input(props) {
  return <input className="ck-input" {...props} />;
}
export function Select({ children, ...rest }) {
  return <select className="ck-input" {...rest}>{children}</select>;
}
export function Textarea(props) {
  return <textarea className="ck-input" rows={3} {...props} />;
}

export function Radio({ name, checked, onChange, label, detail, testId }) {
  return (
    <label className={"ck-choice" + (checked ? " is-active" : "")} data-testid={testId}>
      <input type="radio" name={name} checked={checked} onChange={onChange} aria-label={label} />
      <span>
        <span className="ck-choice-label">{label}</span>
        {detail && <span className="ck-choice-detail">{detail}</span>}
      </span>
    </label>
  );
}

export function Check({ checked, onChange, label, detail, testId }) {
  return (
    <label className={"ck-choice" + (checked ? " is-active" : "")} data-testid={testId}>
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} />
      <span>
        <span className="ck-choice-label">{label}</span>
        {detail && <span className="ck-choice-detail">{detail}</span>}
      </span>
    </label>
  );
}

export function Badge({ children, tone = "neutral", testId }) {
  return <span className={`ck-badge ck-badge--${tone}`} data-testid={testId}>{children}</span>;
}

export function Row({ label, value, strong, testId }) {
  return (
    <div className={"ck-row" + (strong ? " ck-row--strong" : "")}>
      <span>{label}</span>
      <span data-testid={testId}>{value}</span>
    </div>
  );
}

export function Timeline({ steps, current, testId = "timeline" }) {
  return (
    <ol className="ck-timeline" data-testid={testId}>
      {steps.map((s, i) => (
        <li key={s} className={"ck-tl-step" + (i <= current ? " is-done" : "") + (i === current ? " is-current" : "")}
            data-testid={`step-${String(s).replace(/\s+/g, "-").toLowerCase()}`}>
          <span className="ck-tl-dot">{i <= current ? "✓" : ""}</span>
          <span className="ck-tl-label">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export function Empty({ children }) {
  return <div className="ck-empty">{children}</div>;
}

export function Banner({ tone = "ok", title, children, testId, onClose }) {
  return (
    <div className={`ck-banner ck-banner--${tone}`} role="status" data-testid={testId}>
      <div className="ck-banner-body">
        {title && <strong>{title}</strong>}
        <div>{children}</div>
      </div>
      {onClose && <button className="ck-banner-x" onClick={onClose} aria-label="Dismiss">×</button>}
    </div>
  );
}

export function Modal({ open, title, onClose, children, actions, testId }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ck-modal-backdrop" onClick={onClose}>
      <div className="ck-modal" role="dialog" aria-modal="true" aria-label={title}
           data-testid={testId} onClick={(e) => e.stopPropagation()}>
        <div className="ck-modal-head">
          <h2>{title}</h2>
          <button className="ck-modal-x" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="ck-modal-body">{children}</div>
        {actions && <div className="ck-modal-actions">{actions}</div>}
      </div>
    </div>
  );
}

/** Small transient confirmation, used after cart/save actions. */
export function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg) => setToast(msg);
  const node = toast ? (
    <div className="ck-toast" role="status" data-testid="toast">{toast}</div>
  ) : null;
  return [node, show, () => setToast(null)];
}
