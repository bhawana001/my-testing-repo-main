"use client";
// Search with filters (3.1). Size and price band both narrow the list, and a
// size filter also hides results that are out of stock in that size -- so
// "respects the size filter" means the opened product really is buyable.
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Badge, Check, Radio, Empty, Field, Select, useToast } from "../../clones/kit/ui";
import { BRAND, BASE, PRODUCTS, PRICE_BANDS, useStore, money, findProduct } from "../shared";

const ALL_SIZES = ["6", "7", "8", "9", "10", "11"];

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [s, update] = useStore();
  const [toast, showToast] = useToast();
  const q = (params.get("q") || "").toLowerCase();
  const [sizes, setSizes] = useState([]);
  const [band, setBand] = useState("");
  const [open, setOpen] = useState(null);
  const [chosenSize, setChosenSize] = useState("");

  const base = PRODUCTS.filter((p) =>
    !q || [p.title, p.brand, p.category].join(" ").toLowerCase().includes(q) ||
    (q.includes("shoe") && p.category === "footwear") || (q.includes("phone") && p.category === "mobile")
  );
  const priceBand = PRICE_BANDS.find((b) => b.id === band);
  const results = base.filter((p) => {
    if (priceBand && (p.price < priceBand.min || p.price > priceBand.max)) return false;
    if (sizes.length) {
      if (!p.sizes) return false;
      // Available in at least one selected size.
      return sizes.some((sz) => p.sizes.includes(sz) && (p.stockBySize?.[sz] ?? 0) > 0);
    }
    return true;
  });

  const product = open ? findProduct(open) : null;
  const sizeStock = product && chosenSize ? product.stockBySize?.[chosenSize] ?? 0 : null;

  function addToCart() {
    if (product.sizes && !chosenSize) { showToast("Select a size first"); return; }
    update((st) => {
      st.cart.push({ id: product.id, title: product.title, price: product.price, qty: 1,
                     variant: chosenSize ? `Size ${chosenSize}` : "", emoji: product.emoji });
      return st;
    });
    showToast("Added to cart");
    router.push(`${BASE}/cart`);
  }

  if (product) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: `${BASE}/cart`, label: "Cart" }]} />
        <Page>
          <Btn variant="ghost" onClick={() => { setOpen(null); setChosenSize(""); }} data-testid="back-to-results">← Back to results</Btn>
          <div className="ck-split">
            <Card testId="pdp">
              <div className="ck-thumb" style={{ fontSize: 96 }} aria-hidden="true">{product.emoji}</div>
              <h2 data-testid="pdp-title">{product.title}</h2>
              <div className="ck-muted">{product.brand} · ★ {product.rating} ({product.ratings.toLocaleString()} ratings)</div>
              <div style={{ fontSize: 24, fontWeight: 700, margin: "10px 0" }} data-testid="pdp-price">{money(product.price)}</div>
              {product.sizes && (
                <Field label="Select size">
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {product.sizes.map((sz) => {
                      const outOfStock = (product.stockBySize?.[sz] ?? 0) === 0;
                      return (
                        <Btn key={sz} size="sm" variant={chosenSize === sz ? "primary" : "secondary"}
                             disabled={outOfStock} onClick={() => setChosenSize(sz)} data-testid={`size-${sz}`}>
                          {sz}{outOfStock ? " (out)" : ""}
                        </Btn>
                      );
                    })}
                  </div>
                </Field>
              )}
              {chosenSize && <Badge tone={sizeStock > 0 ? "ok" : "bad"} testId="size-stock">
                {sizeStock > 0 ? `Size ${chosenSize} · ${sizeStock} left` : `Size ${chosenSize} out of stock`}
              </Badge>}
              <Btn block style={{ marginTop: 12 }} onClick={addToCart} data-testid="add-to-cart">Add to cart</Btn>
            </Card>
            <Card title="Filters applied">
              <div data-testid="applied-filters">
                {sizes.length ? `Sizes: ${sizes.join(", ")}` : "No size filter"}<br />
                {priceBand ? priceBand.label : "No price filter"}
              </div>
            </Card>
          </div>
        </Page>
        {toast}
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: `${BASE}/cart`, label: "Cart" }]} />
      <Page title={`Results for “${params.get("q") || "everything"}”`} wide>
        <div className="ck-split">
          <Card title="Filters" testId="filters">
            <div className="ck-strong" style={{ marginBottom: 6 }}>Size</div>
            {ALL_SIZES.map((sz) => (
              <Check key={sz} label={sz} testId={`filter-size-${sz}`}
                     checked={sizes.includes(sz)}
                     onChange={(e) => setSizes((v) => e.target.checked ? [...v, sz] : v.filter((x) => x !== sz))} />
            ))}
            <div className="ck-strong" style={{ margin: "10px 0 6px" }}>Price</div>
            {PRICE_BANDS.map((b) => (
              <Radio key={b.id} name="band" label={b.label} testId={`filter-${b.id}`}
                     checked={band === b.id} onChange={() => setBand(b.id)} />
            ))}
            {(sizes.length > 0 || band) && (
              <Btn variant="ghost" size="sm" onClick={() => { setSizes([]); setBand(""); }} data-testid="clear-filters">Clear filters</Btn>
            )}
          </Card>

          <div>
            <div className="ck-muted" style={{ marginBottom: 10 }} data-testid="result-count">
              {results.length} result{results.length === 1 ? "" : "s"}
              {sizes.length > 0 && ` · size ${sizes.join(", ")}`}
              {priceBand && ` · ${priceBand.label}`}
            </div>
            {results.length === 0 ? <Empty>No products match these filters.</Empty> : (
              <div className="ck-grid ck-grid--2" data-testid="results">
                {results.map((p, i) => (
                  <Card key={p.id} testId={`result-${i}`}>
                    <div className="ck-thumb" aria-hidden="true">{p.emoji}</div>
                    <button className="ck-btn ck-btn--ghost" style={{ padding: 0, fontWeight: 700 }}
                            onClick={() => setOpen(p.id)} data-testid={`open-${i}`}>
                      {p.title}
                    </button>
                    <div className="ck-muted">{p.brand} · ★ {p.rating}</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }} data-testid={`result-price-${i}`}>{money(p.price)}</div>
                    {p.sizes && <div className="ck-muted">Sizes in stock: {p.sizes.filter((sz) => (p.stockBySize?.[sz] ?? 0) > 0).join(", ")}</div>}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Page>
      {toast}
    </Shell>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<div style={{ padding: 40 }}>Loading…</div>}><SearchInner /></Suspense>;
}
