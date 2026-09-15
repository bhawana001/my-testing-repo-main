"use client";
// Browse, bid (6.1), Buy It Now (6.2) and Best Offer (6.3).
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Badge, Row, Input, Field, Banner, Empty, useToast } from "../clones/kit/ui";
import { BRAND, BASE, BUYER, useStore, money, minBid } from "./shared";

export default function Browse() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(null);
  const [bid, setBid] = useState("");
  const [offer, setOffer] = useState("");
  const [err, setErr] = useState("");
  const [result, setResult] = useState(null);
  const [toast, showToast] = useToast();

  const listing = open ? s.listings.find((l) => l.id === open) : null;

  function placeBid() {
    const amount = Number(bid);
    const floor = minBid(listing);
    if (!amount || Number.isNaN(amount)) { setErr("Enter a bid amount."); return; }
    if (amount < floor) { setErr(`Your bid must be at least ${money(floor)}.`); return; }
    setErr("");
    update((st) => {
      const l = st.listings.find((x) => x.id === listing.id);
      l.currentBid = amount;
      l.bidCount += 1;
      l.highBidder = BUYER.handle;
      st.bids.unshift({ id: "BID-" + (st.bids.length + 1), listingId: l.id, title: l.title, amount, at: "2026-09-15", status: "High bidder" });
      return st;
    });
    setResult({ type: "bid", amount });
    setBid("");
  }

  function buyItNow() {
    const total = +(listing.price + listing.shipping).toFixed(2);
    const id = "ORD-" + (s.counter + 1);
    update((st) => {
      st.counter += 1;
      st.orders.unshift({ id, listingId: listing.id, title: listing.title, price: listing.price,
                          shipping: listing.shipping, total, paidWith: `${BUYER.card.brand} ••••${BUYER.card.last4}`,
                          at: "2026-09-15", status: "Paid" });
      st.listings = st.listings.filter((x) => x.id !== listing.id);
      return st;
    });
    setResult({ type: "bin", id, total, title: listing.title, price: listing.price });
    setOpen(null);
  }

  function sendOffer() {
    const amount = Number(offer);
    if (!amount) { setErr("Enter an offer amount."); return; }
    if (amount >= listing.price) { setErr("A Best Offer must be below the asking price."); return; }
    setErr("");
    update((st) => {
      st.offers.unshift({ id: "OFR-" + (st.offers.length + 1), listingId: listing.id, title: listing.title,
                          amount, asking: listing.price, status: "Pending seller response", at: "2026-09-15" });
      return st;
    });
    setResult({ type: "offer", amount, title: listing.title });
    setOffer("");
    setOpen(null);
  }

  if (listing) {
    const isAuction = listing.format === "auction";
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: `${BASE}/activity`, label: "My eBid" }, { href: `${BASE}/sell`, label: "Sell" }]} />
        <Page>
          <Btn variant="ghost" onClick={() => { setOpen(null); setErr(""); }} data-testid="back">← Back to listings</Btn>
          <div className="ck-split">
            <Card testId="listing-detail">
              <div className="ck-thumb" style={{ fontSize: 92 }} aria-hidden="true">{listing.emoji}</div>
              <h2 data-testid="listing-title">{listing.title}</h2>
              <div className="ck-muted">{listing.condition} · seller {listing.seller} · {listing.watchers} watching</div>
              {isAuction ? (
                <>
                  <Row label="Current bid" value={money(listing.currentBid)} testId="current-bid" />
                  <Row label="Bids" value={String(listing.bidCount)} testId="bid-count" />
                  <Row label="High bidder" value={listing.highBidder} testId="high-bidder" />
                  <Row label="Time left" value={listing.endsIn} />
                </>
              ) : (
                <Row label="Price" value={money(listing.price)} testId="bin-price" />
              )}
              <Row label="Shipping" value={listing.shipping === 0 ? "Free" : money(listing.shipping)} testId="shipping" />
            </Card>

            <Card title={isAuction ? "Place a bid" : "Buy this item"}>
              {isAuction ? (
                <>
                  <Field label={`Your max bid (minimum ${money(minBid(listing))})`} error={err}>
                    <Input value={bid} onChange={(e) => setBid(e.target.value)} inputMode="decimal"
                           placeholder={String(minBid(listing))} aria-label="Bid amount" data-testid="bid-input" />
                  </Field>
                  <Btn block onClick={placeBid} data-testid="place-bid">Place bid</Btn>
                </>
              ) : (
                <>
                  <Btn block onClick={buyItNow} data-testid="buy-it-now">Buy It Now — {money(listing.price)}</Btn>
                  <div className="ck-muted" style={{ margin: "8px 0" }} data-testid="saved-payment">
                    Paying with {BUYER.card.brand} ending in {BUYER.card.last4}
                  </div>
                  {listing.bestOffer && (
                    <>
                      <div className="ck-strong" style={{ marginTop: 12 }}>Or make an offer</div>
                      <Field label="Your offer" error={err}>
                        <Input value={offer} onChange={(e) => setOffer(e.target.value)} inputMode="decimal"
                               aria-label="Offer amount" data-testid="offer-input" />
                      </Field>
                      <Btn block variant="secondary" onClick={sendOffer} data-testid="send-offer">Send Best Offer</Btn>
                    </>
                  )}
                </>
              )}
            </Card>
          </div>
        </Page>
        {toast}
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/activity`, label: "My eBid", testId: "nav-activity" },
        { href: `${BASE}/sell`, label: "Sell", testId: "nav-sell" },
      ]} />
      <Page title="Today's listings" wide>
        {result?.type === "bid" && (
          <Banner tone="ok" title="Bid placed" testId="bid-confirmation">
            You are the high bidder at <strong data-testid="bid-amount">{money(result.amount)}</strong>.
          </Banner>
        )}
        {result?.type === "bin" && (
          <Banner tone="ok" title="Order confirmed" testId="order-confirmation">
            Order <strong data-testid="order-id">{result.id}</strong> for {result.title} — item {money(result.price)},
            total paid <strong data-testid="order-total">{money(result.total)}</strong>.
          </Banner>
        )}
        {result?.type === "offer" && (
          <Banner tone="info" title="Offer sent" testId="offer-confirmation">
            Your offer of <strong data-testid="offer-amount">{money(result.amount)}</strong> on {result.title} is pending.
          </Banner>
        )}

        {s.listings.length === 0 ? <Empty>No active listings.</Empty> : (
          <div className="ck-grid ck-grid--3" data-testid="listings">
            {s.listings.map((l, i) => (
              <Card key={l.id} testId={`listing-${l.id}`}>
                <div className="ck-thumb" aria-hidden="true">{l.emoji}</div>
                <button className="ck-btn ck-btn--ghost" style={{ padding: 0, fontWeight: 700, textAlign: "left" }}
                        onClick={() => { setOpen(l.id); setErr(""); }} data-testid={`open-${i}`}>{l.title}</button>
                <div className="ck-muted">{l.condition}</div>
                {l.format === "auction" ? (
                  <>
                    <div style={{ fontWeight: 700 }} data-testid={`price-${l.id}`}>{money(l.currentBid)}</div>
                    <Badge tone="warn">{l.bidCount} bids · {l.endsIn}</Badge>
                  </>
                ) : (
                  <>
                    <div style={{ fontWeight: 700 }} data-testid={`price-${l.id}`}>{money(l.price)}</div>
                    <Badge tone="ok">Buy It Now</Badge>
                    {l.bestOffer && <> <Badge tone="info">or Best Offer</Badge></>}
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </Page>
      {toast}
    </Shell>
  );
}
