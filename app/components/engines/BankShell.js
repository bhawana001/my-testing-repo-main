"use client";
// Bank/fintech portal chrome: top bar + optional account strip.
import { Topbar } from "../eval/SkinChrome";
import { Badge } from "../eval/ui";
import { money } from "@/lib/seed";

export function BankShell({ entity, nav, active, accounts = [], children, right, title, sub, light = true }) {
  return (
    <>
      <Topbar entity={entity} nav={nav} active={active} light={light} right={right || <Badge tone="ok">🔒 Secure session · Demo User</Badge>} />
      <main className="ee-main">
        {accounts.length > 0 && (
          <div className="ee-grid ee-grid--3" style={{ marginBottom: 20 }} data-testid="account-strip">
            {accounts.map((a) => (
              <div key={a.name} className="ee-card ee-card--tight" data-testid={`acct-${a.id || a.name.replace(/\s+/g, "-").toLowerCase()}`}>
                <div className="ee-small ee-muted">{a.name} {a.mask && <span className="ee-mono">{a.mask}</span>}</div>
                <div className="ee-price ee-num" data-testid={`acct-${a.id || a.name.replace(/\s+/g, "-").toLowerCase()}-balance`}>{money(a.balance, a.currency || "USD")}</div>
                {a.sub && <div className="ee-tiny ee-muted">{a.sub}</div>}
              </div>
            ))}
          </div>
        )}
        {title && <h1 className="ee-page-title">{title}</h1>}
        {sub && <p className="ee-page-sub">{sub}</p>}
        {children}
      </main>
    </>
  );
}
