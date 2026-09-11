"use client";
// Payment-widget helpers: hosted payment page layout, fake popup window,
// success/failure panels. Used by the payments-infra skins.
import { Badge, Btn, Card, KV } from "../eval/ui";
import { money } from "@/lib/seed";

export function PaymentLayout({ merchant, amount, currency = "USD", lines = [], children, note, testIdPrefix = "hosted" }) {
  return (
    <main className="ee-main">
      <div className="ee-split ee-split--even" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div data-testid={`${testIdPrefix}-summary`}>
          <div className="ee-row" style={{ marginBottom: 14 }}>
            <span className="ee-avatar" aria-hidden="true">{merchant.slice(0, 1)}</span>
            <span className="ee-strong">{merchant}</span>
            <Badge>TEST MODE</Badge>
          </div>
          <div className="ee-muted ee-small">Pay {merchant}</div>
          <div className="ee-price" style={{ fontSize: 32 }} data-testid={`${testIdPrefix}-amount`}>{money(amount, currency)}</div>
          <div className="ee-stack" style={{ marginTop: 16 }}>
            {lines.map((l) => (
              <div key={l.name} className="ee-row ee-row--between ee-small">
                <span>{l.name}{l.qty > 1 ? ` × ${l.qty}` : ""}</span>
                <span className="ee-num">{money(l.price * (l.qty || 1), currency)}</span>
              </div>
            ))}
          </div>
          {note && <div className="ee-small ee-muted" style={{ marginTop: 16 }}>{note}</div>}
        </div>
        <Card>{children}</Card>
      </div>
    </main>
  );
}

export function PaymentSuccess({ title = "Payment successful", amount, currency = "USD", id, method, rows = [], children, testIdPrefix = "success" }) {
  return (
    <div data-testid={`${testIdPrefix}-panel`}>
      <div style={{ fontSize: 40 }} aria-hidden="true">✅</div>
      <h2 style={{ fontSize: 22, margin: "6px 0" }} data-testid={`${testIdPrefix}-title`}>{title}</h2>
      <KV k="Amount paid" v={money(amount, currency)} testId={`${testIdPrefix}-amount`} />
      {method && <KV k="Payment method" v={method} testId={`${testIdPrefix}-method`} />}
      {id && <KV k="Payment ID" v={<span className="ee-mono">{id}</span>} testId={`${testIdPrefix}-id`} />}
      {rows.map((r) => <KV key={r.k} k={r.k} v={r.v} testId={r.testId} />)}
      {children}
    </div>
  );
}

export function PaymentFailure({ title = "Payment failed", message, onRetry, testIdPrefix = "failure" }) {
  return (
    <div className="ee-alert ee-alert--err" role="alert" data-testid={`${testIdPrefix}-panel`}>
      <span aria-hidden="true">!</span>
      <div>
        <div className="ee-strong">{title}</div>
        <div>{message}</div>
        {onRetry && <button className="ee-link" style={{ marginTop: 6 }} onClick={onRetry}>Try a different payment method</button>}
      </div>
    </div>
  );
}

/** PopupWindow: an in-page stand-in for a payment provider popup / redirect. */
export function PopupWindow({ open, title, url, onClose, children, testId = "popup" }) {
  if (!open) return null;
  return (
    <div className="ee-modal-backdrop">
      <div className="ee-modal ee-modal--wide" role="dialog" aria-modal="true" aria-label={title} data-testid={testId} style={{ padding: 0, overflow: "hidden" }}>
        <div className="ee-row ee-row--between ee-small" style={{ background: "var(--ee-surface-2)", padding: "8px 12px", borderBottom: "1px solid var(--ee-border)" }}>
          <span className="ee-mono ee-muted" data-testid={`${testId}-url`}>🔒 {url}</span>
          {onClose && <button type="button" className="ee-btn ee-btn--ghost ee-btn--sm" onClick={onClose} aria-label="Close popup">✕</button>}
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}
