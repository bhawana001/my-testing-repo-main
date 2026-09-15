"use client";
// Marketplace search, favoriting (5.2) and personalized add-to-cart (5.1).
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Badge, Input, Field, Textarea, Empty, useToast } from "../clones/kit/ui";
import { BRAND, BASE, LISTINGS, SHOPS, findShop, useStore, money } from "./shared";

export default function Marketplace() {
  const [s, update] = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [toast, showToast] = useToast();

  const term = q.trim().toLowerCase();
  const results = LISTINGS.filter((l) => {
    if (!term) return true;
    const shop = findShop(l.shopId);
    return [l.title, shop.name, ...l.tags].join(" ").toLowerCase().includes(term);
  });

  const listing = open ? LISTINGS.find((l) => l.id === open) : null;
  const isFav = (id) => s.favorites.includes(id);
  const toggleFav = (id) => {
    update((st) => {
      st.favorites = st.favorites.includes(id) ? st.favorites.filter((x) => x !== id) : [...st.favorites, id];
      return st;
    });
    showToast(isFav(id) ? "Removed from favorites" : "Saved to favorites");
  };

  function addToCart() {
    if (listing.personalize && !text.trim()) {
      setErr("This item requires personalization before it can be added.");
      return;
    }
    if (listing.personalize && text.length > listing.personalizeMax) {
      setErr(`Personalization must be ${listing.personalizeMax} characters or fewer.`);
      return;
    }
    setErr("");
    update((st) => {
      st.cart.push({ id: listing.id, title: listing.title, shopId: listing.shopId,
                     price: listing.price, qty: 1, personalization: text.trim(), emoji: listing.emoji });
      return st;
    });
    showToast("Added to cart");
    setOpen(null);
    setText("");
  }

  if (listing) {
    const shop = findShop(listing.shopId);
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[
          { href: `${BASE}/favorites`, label: `Favorites (${s.favorites.length})`, testId: "nav-favorites" },
          { href: `${BASE}/cart`, label: `Cart (${s.cart.length})`, testId: "nav-cart" },
        ]} />
        <Page>
          <Btn variant="ghost" onClick={() => { setOpen(null); setErr(""); }} data-testid="back">← Back to search</Btn>
          <div className="ck-split">
            <Card testId="listing">
              <div className="ck-thumb" style={{ fontSize: 96 }} aria-hidden="true">{listing.emoji}</div>
              <h2 data-testid="listing-title">{listing.title}</h2>
              <div className="ck-muted">{shop.name} · {shop.location} · ★ {shop.rating}</div>
              <div style={{ fontSize: 24, fontWeight: 700, margin: "10px 0" }} data-testid="listing-price">{money(listing.price)}</div>
              <Btn variant="secondary" size="sm" onClick={() => toggleFav(listing.id)} data-testid="favorite-toggle">
                {isFav(listing.id) ? "♥ Favorited" : "♡ Add to favorites"}
              </Btn>
            </Card>
            <Card title="Order details">
              {listing.personalize ? (
                <Field label={listing.personalizeLabel} error={err}
                       hint={`${text.length}/${listing.personalizeMax} characters`}>
                  <Textarea value={text} onChange={(e) => setText(e.target.value)}
                            aria-label="Personalization" data-testid="personalization-input" />
                </Field>
              ) : <p className="ck-muted">No personalization needed for this item.</p>}
              <Btn block onClick={addToCart} data-testid="add-to-cart">Add to cart</Btn>
              <p className="ck-muted" style={{ marginTop: 8 }}>Ships from {shop.location} · {money(shop.shipping)} shipping</p>
            </Card>
          </div>
        </Page>
        {toast}
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND}
        search={
          <form style={{ flex: 1, minWidth: 200 }} role="search" onSubmit={(e) => e.preventDefault()}>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for anything handmade"
                   aria-label="Search Etsi" data-testid="search-input" />
          </form>
        }
        nav={[
          { href: `${BASE}/favorites`, label: `Favorites (${s.favorites.length})`, testId: "nav-favorites" },
          { href: `${BASE}/orders`, label: "Orders", testId: "nav-orders" },
          { href: `${BASE}/cart`, label: `Cart (${s.cart.length})`, testId: "nav-cart" },
        ]} />
      <Page title="Shop unique goods" sub={`${SHOPS.length} independent shops`} wide>
        <div className="ck-muted" style={{ marginBottom: 10 }} data-testid="result-count">
          {results.length} listing{results.length === 1 ? "" : "s"}{term && ` for “${q.trim()}”`}
        </div>
        {results.length === 0 ? <Empty>No listings match that search.</Empty> : (
          <div className="ck-grid ck-grid--3" data-testid="listings">
            {results.map((l, i) => {
              const shop = findShop(l.shopId);
              return (
                <Card key={l.id} testId={`listing-${l.id}`}>
                  <div className="ck-thumb" aria-hidden="true">{l.emoji}</div>
                  <button className="ck-btn ck-btn--ghost" style={{ padding: 0, fontWeight: 700, textAlign: "left" }}
                          onClick={() => setOpen(l.id)} data-testid={`open-${i}`}>{l.title}</button>
                  <div className="ck-muted">{shop.name}</div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{money(l.price)}</div>
                  {l.personalize && <Badge tone="warn" testId={`personalize-flag-${l.id}`}>Personalizable</Badge>}
                  <Btn variant="secondary" size="sm" block style={{ marginTop: 8 }}
                       onClick={() => toggleFav(l.id)} data-testid={`fav-${l.id}`}>
                    {isFav(l.id) ? "♥ Favorited" : "♡ Favorite"}
                  </Btn>
                </Card>
              );
            })}
          </div>
        )}
      </Page>
      {toast}
    </Shell>
  );
}
