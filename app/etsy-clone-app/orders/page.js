"use client";
// Orders and review submission (5.4). Only delivered orders can be reviewed;
// a submitted review appears under the listing with its star rating and photo.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty, Field, Textarea, Select, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, findShop, findListing, useStore, money } from "../shared";

const PHOTOS = [
  { id: "ph_1", label: "mug-on-shelf.jpg" },
  { id: "ph_2", label: "gift-wrapped.jpg" },
  { id: "ph_3", label: "in-use.jpg" },
];

export default function OrdersPage() {
  const [s, update] = useStore();
  const [openFor, setOpenFor] = useState(null); // listing id being reviewed
  const [stars, setStars] = useState("5");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  function submitReview(orderId, listingId) {
    if (!body.trim()) { setErr("Write a few words about the item."); return; }
    setErr("");
    const review = {
      id: "RV-" + (s.reviews.length + 1), orderId, listingId,
      stars: Number(stars), body: body.trim(), photo,
      author: "Priya N.", at: "2026-09-15",
    };
    update((st) => { st.reviews.unshift(review); return st; });
    setDone(review);
    setOpenFor(null);
    setBody(""); setPhoto("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Search" }, { href: `${BASE}/favorites`, label: "Favorites" }]} />
      <Page title="Your orders">
        {done && (
          <Banner tone="ok" title="Review posted" testId="review-posted">
            Your {done.stars}-star review is now visible under the listing.
          </Banner>
        )}

        {s.orders.length === 0 ? <Empty>No orders yet.</Empty> : s.orders.map((o) => (
          <Card key={o.id} title={`${o.id} · ${o.placedAt}`} testId={`order-${o.id}`}>
            <Badge tone={o.status === "delivered" ? "ok" : "warn"} testId={`order-status-${o.id}`}>
              {o.status === "delivered" ? `Delivered ${o.deliveredOn}` : "Processing"}
            </Badge>
            {o.items.map((l, i) => {
              const listing = findListing(l.id);
              const shop = findShop(l.shopId);
              const existing = s.reviews.find((r) => r.orderId === o.id && r.listingId === l.id);
              return (
                <div key={i} style={{ borderTop: "1px solid #f0e8de", marginTop: 10, paddingTop: 10 }}>
                  <Row label={`${l.title} — ${shop.name}`} value={money(l.price * l.qty)} />
                  {l.personalization && (
                    <div className="ck-muted" data-testid={`order-personalization-${o.id}`}>
                      Personalization: “{l.personalization}”
                    </div>
                  )}

                  {o.status === "delivered" && !existing && openFor !== l.id && (
                    <Btn size="sm" variant="secondary" onClick={() => setOpenFor(l.id)} data-testid={`review-${l.id}`}>
                      Leave a review
                    </Btn>
                  )}

                  {openFor === l.id && (
                    <div style={{ marginTop: 10 }} data-testid="review-form">
                      <Field label="Rating">
                        <Select value={stars} onChange={(e) => setStars(e.target.value)} aria-label="Rating" data-testid="review-stars">
                          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}
                        </Select>
                      </Field>
                      <Field label="Your review" error={err}>
                        <Textarea value={body} onChange={(e) => setBody(e.target.value)} aria-label="Review text" data-testid="review-body" />
                      </Field>
                      <Field label="Add a photo" hint="Buyers find photo reviews most helpful">
                        <Select value={photo} onChange={(e) => setPhoto(e.target.value)} aria-label="Add a photo" data-testid="review-photo">
                          <option value="">No photo</option>
                          {PHOTOS.map((p) => <option key={p.id} value={p.label}>{p.label}</option>)}
                        </Select>
                      </Field>
                      <Btn size="sm" onClick={() => submitReview(o.id, l.id)} data-testid="submit-review">Post review</Btn>
                      <Btn size="sm" variant="ghost" onClick={() => setOpenFor(null)}>Cancel</Btn>
                    </div>
                  )}

                  {existing && (
                    <div className="ck-card ck-card--ok" style={{ marginTop: 10 }} data-testid={`listing-review-${l.id}`}>
                      <div className="ck-strong" data-testid="review-rating">{"★".repeat(existing.stars)} ({existing.stars}/5)</div>
                      <div data-testid="review-text">{existing.body}</div>
                      {existing.photo && <Badge tone="info" testId="review-photo-badge">📷 {existing.photo}</Badge>}
                      <div className="ck-muted">{existing.author} · {existing.at}</div>
                    </div>
                  )}
                </div>
              );
            })}
            <Row label="Order total" value={money(o.total)} strong />
          </Card>
        ))}
      </Page>
    </Shell>
  );
}
