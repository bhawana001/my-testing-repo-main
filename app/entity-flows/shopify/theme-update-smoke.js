"use client";
import { useEffect, useRef, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Alert, KV } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const seed = () => ({ published: false, page: "home", cart: 0 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const frame = useRef(null); const [layout, setLayout] = useState(null);
  useEffect(() => { if (!s.published || !frame.current) return; const el = frame.current; const ok = el.scrollWidth <= el.clientWidth + 1; setLayout({ ok, w: el.clientWidth, sw: el.scrollWidth }); }, [s.published, s.page, s.cart]);
  return (
    <SaasShell flow={flow} nav={["Home", "Orders", "Online Store · Themes"]} active="Online Store · Themes" title="Themes">
      <div className="ee-split">
        <Card title="Theme library" data-testid="themes">
          <KV k="Current theme" v={s.published ? "Dawn-ish 2.0" : "Dawn-ish 1.8"} testId="current-theme" />
          <KV k="Draft" v={s.published ? "—" : "Dawn-ish 2.0 (new header + product cards)"} />
          {!s.published ? <Btn style={{ marginTop: 10 }} onClick={() => set({ ...s, published: true })} data-testid="publish-theme">Publish Dawn-ish 2.0</Btn> : <Alert tone="ok" data-testid="theme-published">Dawn-ish 2.0 is now your live theme.</Alert>}
          {layout && <div style={{ marginTop: 10 }} data-testid="layout-check"><Badge tone={layout.ok ? "ok" : "err"}>{layout.ok ? "Mobile layout check: no horizontal overflow ✓" : `Overflow: ${layout.sw}px in ${layout.w}px`}</Badge></div>}
        </Card>
        <Card title="Mobile preview · 390px (mobile web equivalent)" data-testid="mobile-preview">
          {!s.published ? <div className="ee-empty">Publish the theme to preview the live storefront.</div> : (
            <div ref={frame} style={{ width: 390, maxWidth: "100%", margin: "0 auto", border: "10px solid #111", borderRadius: 26, overflowX: "auto", background: "#fff", color: "#111" }} data-testid="storefront-frame">
              <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee" }}><b>Fernhouse Prints</b><span data-testid="sf-cart">🛒 {s.cart}</span></div>
              <div style={{ padding: 14 }}>
                {s.page === "home" && <div data-testid="sf-home"><h3>New botanical prints</h3><div style={{ background: "#f3f3f3", borderRadius: 8, padding: 16, textAlign: "center", fontSize: 40 }}>🖼️</div><button type="button" className="ee-btn ee-btn--block" style={{ marginTop: 10 }} onClick={() => set({ ...s, page: "product" })} data-testid="sf-shop">Shop now</button></div>}
                {s.page === "product" && <div data-testid="sf-product"><h3>Botanical Art Print A3</h3><div>{money(35)}</div><button type="button" className="ee-btn ee-btn--block" style={{ marginTop: 10 }} onClick={() => set({ ...s, cart: s.cart + 1, page: "cart" })} data-testid="sf-add">Add to cart</button></div>}
                {s.page === "cart" && <div data-testid="sf-cart-page"><h3>Your cart</h3><div>Botanical Art Print A3 × {s.cart}</div><button type="button" className="ee-btn ee-btn--block" style={{ marginTop: 10 }} onClick={() => set({ ...s, page: "checkout" })} data-testid="sf-checkout">Check out</button></div>}
                {s.page === "checkout" && <div data-testid="sf-checkout-page"><Badge tone="ok">Checkout reachable</Badge><h3 style={{ marginTop: 8 }}>Checkout</h3><div className="ee-small">Contact · Shipping · Payment</div><div>Total {money(35 * s.cart + 5)}</div></div>}
              </div>
            </div>
          )}
        </Card>
      </div>
    </SaasShell>
  );
}
