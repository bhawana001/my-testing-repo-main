"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, OFFER_CATALOG, CARD, useStore } from "../shared";

export default function Offers() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);

  const isAdded = (id) => s.addedOffers.some((o) => o.id === id);

  function add(offer) {
    if (isAdded(offer.id)) return;
    update((st) => {
      st.addedOffers.push({ ...offer, addedOn: "2026-09-16", status: "Added to card" });
      return st;
    });
    setNotice({ tone: "ok", msg: `${offer.merchant} offer added to ${CARD.name}.` });
  }

  function remove(id) {
    update((st) => { st.addedOffers = st.addedOffers.filter((o) => o.id !== id); return st; });
    setNotice({ tone: "info", msg: "Offer removed from the card." });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Amrex Offers" sub={`${s.addedOffers.length} added to ${CARD.number}`}>
        {notice && <Banner tone={notice.tone} testId="offer-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Available offers" testId="offer-catalog">
          {OFFER_CATALOG.map((o) => (
            <div key={o.id} className="ck-row" data-testid={`offer-${o.id}`}>
              <span>
                <strong data-testid={`offer-merchant-${o.id}`}>{o.merchant}</strong>
                <div className="ck-muted">{o.detail}</div>
              </span>
              <span>
                {isAdded(o.id)
                  ? <Badge tone="ok" testId={`offer-status-${o.id}`}>Added to card</Badge>
                  : <Btn size="sm" data-testid={`add-${o.id}`} onClick={() => add(o)}>Add to card</Btn>}
              </span>
            </div>
          ))}
        </Card>

        <Card title="On your card" testId="added-offers">
          <Row label="Offers added" value={s.addedOffers.length} testId="added-count" />
          {s.addedOffers.length === 0 && <Empty>No offers added yet.</Empty>}
          {s.addedOffers.map((o) => (
            <div key={o.id} className="ck-row" data-testid={`added-${o.id}`}>
              <span>
                <strong>{o.merchant}</strong>
                <div className="ck-muted">{o.detail} · added {o.addedOn}</div>
              </span>
              <span>
                <Badge tone="ok">{o.status}</Badge>{" "}
                <Btn size="sm" variant="ghost" data-testid={`remove-${o.id}`} onClick={() => remove(o.id)}>Remove</Btn>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
