"use client";
// Flipkort home: search entry plus category rails.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Input, Badge } from "../clones/kit/ui";
import { BRAND, BASE, PRODUCTS, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  const [q, setQ] = useState("");
  const router = useRouter();
  const cartCount = s.cart.reduce((n, l) => n + l.qty, 0);

  return (
    <Shell brand={BRAND}>
      <TopBar
        brand={BRAND}
        search={
          <form
            style={{ flex: 1, minWidth: 220, display: "flex", gap: 6 }}
            onSubmit={(e) => { e.preventDefault(); if (q.trim()) router.push(`${BASE}/search?q=${encodeURIComponent(q.trim())}`); }}
            role="search"
          >
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products, brands and more"
                   aria-label="Search Flipkort" data-testid="search-input" />
            <Btn variant="secondary" type="submit" data-testid="search-go">Search</Btn>
          </form>
        }
        nav={[
          { href: `${BASE}/rewards`, label: "SuperCoins", testId: "nav-rewards" },
          { href: `${BASE}/cart`, label: `Cart (${cartCount})`, testId: "nav-cart" },
        ]}
      />
      <Page title="Today's picks" sub="Free delivery on orders over ₹5,000">
        <div className="ck-grid ck-grid--3">
          {PRODUCTS.map((p) => (
            <Card key={p.id} testId={`tile-${p.id}`}>
              <div className="ck-thumb" aria-hidden="true">{p.emoji}</div>
              <div className="ck-strong">{p.title}</div>
              <div className="ck-muted">{p.brand}</div>
              <div style={{ fontSize: 18, fontWeight: 700, margin: "6px 0" }}>{money(p.price)}</div>
              <Badge tone="ok">★ {p.rating}</Badge>
              {p.exchange && <> <Badge tone="info" testId={`exchange-flag-${p.id}`}>Exchange offer</Badge></>}
              <Btn as="link" href={`${BASE}/search?q=${encodeURIComponent(p.category === "mobile" ? "phone" : "running shoes")}`}
                   variant="secondary" size="sm" block style={{ marginTop: 8 }}>
                View similar
              </Btn>
            </Card>
          ))}
        </div>
      </Page>
    </Shell>
  );
}
