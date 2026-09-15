"use client";
// Favorites (5.2). Backed by the persistent store, so a reload keeps them --
// which is exactly what the use case asserts.
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Badge, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, LISTINGS, findShop, useStore, money } from "../shared";

export default function FavoritesPage() {
  const [s, update] = useStore();
  const items = s.favorites.map((id) => LISTINGS.find((l) => l.id === id)).filter(Boolean);

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Search" }, { href: `${BASE}/cart`, label: "Cart" }]} />
      <Page title="Favorites" sub="Saved items stay here between visits">
        <div className="ck-muted" style={{ marginBottom: 10 }} data-testid="favorites-count">
          {items.length} favorite{items.length === 1 ? "" : "s"}
        </div>
        {items.length === 0 ? (
          <Empty>Nothing saved yet. <Link href={BASE}>Browse listings</Link>.</Empty>
        ) : (
          <div className="ck-grid ck-grid--3" data-testid="favorites-list">
            {items.map((l) => (
              <Card key={l.id} testId={`favorite-${l.id}`}>
                <div className="ck-thumb" aria-hidden="true">{l.emoji}</div>
                <div className="ck-strong" data-testid={`favorite-title-${l.id}`}>{l.title}</div>
                <div className="ck-muted">{findShop(l.shopId).name}</div>
                <div style={{ fontWeight: 700 }}>{money(l.price)}</div>
                <Badge tone="ok">♥ Saved</Badge>
                <Btn variant="secondary" size="sm" block style={{ marginTop: 8 }} data-testid={`unfavorite-${l.id}`}
                     onClick={() => update((st) => { st.favorites = st.favorites.filter((x) => x !== l.id); return st; })}>
                  Remove
                </Btn>
              </Card>
            ))}
          </div>
        )}
      </Page>
    </Shell>
  );
}
