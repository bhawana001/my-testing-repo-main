"use client";
// Shoplify storefront. The active theme (set in admin) drives the accent colour
// and layout density here, which is what use case 2.5 checks after a publish.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Badge, Select, Field, useToast } from "../clones/kit/ui";
import { BRAND, BASE, PRODUCTS, THEMES, useStore, money } from "./shared";

export default function Storefront() {
  const [s, update] = useStore();
  const [sel, setSel] = useState({});
  const [toast, showToast] = useToast();
  const router = useRouter();

  const theme = THEMES.find((t) => t.id === s.activeTheme) || THEMES[0];
  const brand = { ...BRAND, accent: theme.accent };
  const cartCount = s.cart.reduce((n, l) => n + l.qty, 0);

  function choose(pid, opt, val) {
    setSel((prev) => ({ ...prev, [pid]: { ...(prev[pid] || {}), [opt]: val } }));
  }

  function addToCart(p) {
    const chosen = sel[p.id] || {};
    const variant = Object.keys(p.options).map((o) => chosen[o] || p.options[o][0]).join(" · ");
    update((st) => {
      const line = st.cart.find((l) => l.id === p.id && l.variant === variant);
      if (line) line.qty += 1;
      else st.cart.push({ id: p.id, title: p.title, variant, price: p.price, qty: 1, emoji: p.emoji });
      return st;
    });
    showToast(`Added ${p.title} to cart`);
  }

  return (
    <Shell brand={brand}>
      <TopBar
        brand={brand}
        nav={[
          { href: `${BASE}/cart`, label: `Cart (${cartCount})`, testId: "nav-cart" },
          { href: `${BASE}/admin`, label: "Admin", testId: "nav-admin" },
        ]}
      />
      <Page
        title="Alder & Oak"
        sub={`Theme: ${theme.name} v${theme.version} · everyday goods, made to last`}
      >
        <div className="ck-banner ck-banner--info" data-testid="theme-banner">
          <div className="ck-banner-body">
            Storefront is running the <strong data-testid="active-theme">{theme.name}</strong> theme.
          </div>
        </div>

        <div className="ck-grid ck-grid--2" data-testid="product-grid">
          {PRODUCTS.map((p) => {
            const out = p.stock === 0;
            return (
              <Card key={p.id} testId={`product-${p.id}`}>
                <div className="ck-thumb" aria-hidden="true">{p.emoji}</div>
                <h3 style={{ margin: "8px 0 2px", fontSize: 16 }}>{p.title}</h3>
                <div className="ck-muted">{p.blurb}</div>
                <div className="ck-strong" style={{ fontSize: 18, margin: "8px 0" }} data-testid={`price-${p.id}`}>
                  {money(p.price)}
                </div>
                {out ? <Badge tone="bad" testId={`stock-${p.id}`}>Sold out</Badge>
                     : <Badge tone="ok" testId={`stock-${p.id}`}>{p.stock} in stock</Badge>}

                {Object.entries(p.options).map(([opt, vals]) => (
                  <Field key={opt} label={opt}>
                    <Select
                      aria-label={`${p.title} ${opt}`}
                      value={(sel[p.id] || {})[opt] || vals[0]}
                      onChange={(e) => choose(p.id, opt, e.target.value)}
                      data-testid={`opt-${p.id}-${opt.toLowerCase()}`}
                    >
                      {vals.map((v) => <option key={v}>{v}</option>)}
                    </Select>
                  </Field>
                ))}

                <Btn block disabled={out} onClick={() => addToCart(p)} data-testid={`add-${p.id}`}>
                  {out ? "Sold out" : "Add to cart"}
                </Btn>
              </Card>
            );
          })}
        </div>

        <Card>
          <Btn as="link" href={`${BASE}/cart`} variant="secondary" data-testid="go-cart">
            View cart ({cartCount})
          </Btn>
        </Card>
      </Page>
      {toast}
    </Shell>
  );
}
