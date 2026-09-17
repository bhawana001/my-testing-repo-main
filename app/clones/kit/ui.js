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
      {brand.footer !== false && <Footer brand={brand} />}
    </div>
  );
}

// Footer copy is grouped by kind of product so a bank reads like a bank and a
// store like a store. Link labels avoid words the Kane tests click on
// ("Help", "Support", "Status", "Returns"...) so they never compete with the
// real controls on the page.
const FINTECH = ["adyen", "amex", "chase", "coinbase", "hdfc", "klarna", "paypal", "paytm", "phonepe",
  "razorpay", "revolut", "robinhood", "square", "stripe", "venmo", "wise", "zerodha"];
const INSURANCE = ["lemonade", "policybazaar"];
const COMMERCE = ["ebay", "etsy", "flipkart", "instacart", "nike", "shopify", "walmart"];
const MEDIA = ["hotstar", "spotify", "youtube"];

function footerFor(brand) {
  const n = brand.name;
  const company = { h: "Company", items: [`About ${n}`, "Careers", "Newsroom", "Investors"] };
  const legal = { h: "Legal", items: ["Terms of Use", "Cookie preferences", "Accessibility", "Sitemap"] };
  if (FINTECH.includes(brand.slug)) return {
    cols: [company, { h: "Products", items: ["Personal", "Business", "Developers", "Partners"] },
      { h: "Trust", items: ["Trust center", "Fraud awareness", "Fee schedule", "Disclosures"] }, legal],
    note: `${n} is a fictional financial service. No real money moves and no account data is stored outside your browser.`,
  };
  if (INSURANCE.includes(brand.slug)) return {
    cols: [company, { h: "Coverage", items: ["Renters", "Homeowners", "Term life", "Health"] },
      { h: "Resources", items: ["Glossary", "Licensing", "Grievance redressal", "Disclosures"] }, legal],
    note: `${n} is a fictional insurer. Quotes and premiums are illustrative and no policy is issued.`,
  };
  if (COMMERCE.includes(brand.slug)) return {
    cols: [company, { h: "Shop with us", items: ["Gift ideas", "Student deals", "Store locator", "Sustainability"] },
      { h: "Sell", items: ["Become a seller", "Affiliates", "Advertise", "Brand registry"] }, legal],
    note: `${n} is a fictional store. Orders are simulated and nothing is shipped or charged.`,
  };
  if (MEDIA.includes(brand.slug)) return {
    cols: [company, { h: "Watch & listen", items: ["Devices", "Gift cards", "Creators", "Ad choices"] },
      { h: "Developers", items: ["Platform", "Brand assets", "Partners", "Blog"] }, legal],
    note: `${n} is a fictional streaming service. All titles, artists and matches are made up.`,
  };
  return {
    cols: [company, { h: "Product", items: ["Integrations", "Enterprise", "Templates gallery", "Changelog"] },
      { h: "Developers", items: ["API docs", "App directory", "Partners", "Blog"] }, legal],
    note: `${n} is a fictional workplace app. Workspaces, people and data are sample content.`,
  };
}

export function Footer({ brand }) {
  const { cols, note } = footerFor(brand);
  const stop = (e) => e.preventDefault();
  return (
    <footer className="ck-foot" data-testid="site-footer">
      <div className="ck-foot-inner">
        <div className="ck-foot-cols">
          {cols.map((c) => (
            <div key={c.h}>
              <h3 className="ck-foot-h">{c.h}</h3>
              <ul className="ck-list">
                {c.items.map((i) => (
                  <li key={i}><a href="#" onClick={stop} className="ck-foot-link">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ck-foot-bar">
          <span className="ck-foot-brand">
            {brand.mark && <span aria-hidden="true">{brand.mark} </span>}{brand.name}
          </span>
          <span>🌐 English (US)</span>
          <span>© 2026 {brand.name}, Inc.</span>
        </div>
        <p className="ck-foot-note">{note} Fictional clone built for testing; not affiliated with any real company.</p>
      </div>
    </footer>
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
