"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, ME, CATALOG, useStore, ritmNumber } from "../shared";

export default function Catalog() {
  const [s, update] = useStore();
  const [itemId, setItemId] = useState(null);
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const item = CATALOG.find((c) => c.id === itemId) || null;

  function order() {
    const missing = item.variables.filter((v) => !String(values[v.id] || "").trim());
    if (missing.length) {
      setError(`These variables are mandatory: ${missing.map((m) => m.label).join(", ")}.`);
      return;
    }
    const request = {
      ritm: ritmNumber(s.requests.length), item: item.name, itemId: item.id,
      requestedFor: ME, state: "Open", stage: "Fulfilment",
      // The variables travel with the request, which is what makes a RITM useful.
      variables: item.variables.map((v) => ({ label: v.label, value: values[v.id] })),
      openedAt: "2026-09-16",
    };
    update((st) => { st.requests.unshift(request); return st; });
    setError(null);
    setSubmitted(request);
    setItemId(null);
    setValues({});
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Service catalog" sub="Order an item and its variables travel onto the request" wide>
        {error && <Banner tone="bad" testId="catalog-error">{error}</Banner>}

        {submitted && (
          <Card title="Request submitted" tone="ok" testId="request-created">
            <Row label="Requested item number" value={submitted.ritm} testId="ritm-number" />
            <Row label="Item" value={submitted.item} testId="ritm-item" />
            <Row label="Requested for" value={submitted.requestedFor} testId="ritm-requested-for" />
            <Row label="Stage" value={submitted.stage} testId="ritm-stage" />
            <Badge tone="info" testId="ritm-state">{submitted.state}</Badge>
            <h3>Variables</h3>
            <div data-testid="ritm-variables">
              {submitted.variables.map((v, i) => (
                <Row key={i} label={v.label} value={v.value} testId={`ritm-variable-${i}`} />
              ))}
            </div>
          </Card>
        )}

        <Card title="Catalog items" testId="catalog-items">
          {CATALOG.map((c) => (
            <div key={c.id} className="ck-row" data-testid={`item-${c.id}`}>
              <span><strong>{c.name}</strong><div className="ck-muted">{c.blurb}</div></span>
              <Btn size="sm" data-testid={`order-${c.id}`}
                   onClick={() => { setItemId(c.id); setValues({}); setError(null); setSubmitted(null); }}>
                Order
              </Btn>
            </div>
          ))}
        </Card>

        {item && (
          <Card title={item.name} testId="order-form">
            {item.variables.map((v) => (
              <Field key={v.id} label={v.label} hint="Required">
                {v.type === "select" ? (
                  <Select value={values[v.id] || ""} data-testid={`var-${v.id}`} aria-label={v.label}
                          onChange={(e) => setValues((x) => ({ ...x, [v.id]: e.target.value }))}>
                    <option value="">Choose…</option>
                    {v.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </Select>
                ) : (
                  <Input type={v.type === "date" ? "date" : "text"} value={values[v.id] || ""}
                         data-testid={`var-${v.id}`} aria-label={v.label}
                         onChange={(e) => setValues((x) => ({ ...x, [v.id]: e.target.value }))} />
                )}
              </Field>
            ))}
            <div className="ck-card-actions">
              <Btn onClick={order} data-testid="submit-order">Order now</Btn>
              <Btn variant="ghost" onClick={() => setItemId(null)}>Cancel</Btn>
            </div>
          </Card>
        )}

        <Card title="My requests" testId="request-list">
          <Row label="Requested items" value={s.requests.length} testId="request-count" />
          {s.requests.length === 0 && <Empty>Nothing ordered yet.</Empty>}
          {s.requests.map((r) => (
            <div key={r.ritm} className="ck-row" data-testid={`request-${r.ritm}`}>
              <span>
                <strong>{r.ritm}</strong>
                <div className="ck-muted">
                  {r.item} — {r.variables.map((v) => `${v.label}: ${v.value}`).join(" · ")}
                </div>
              </span>
              <Badge tone="info">{r.stage}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
