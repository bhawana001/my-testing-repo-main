"use client";
// Price alerts (18.4). An alert needs a direction and a target, and the page
// says how far the target is from the current price.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Radio, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, ASSETS, findAsset, useStore, money } from "../shared";

export default function AlertsPage() {
  const [s, update] = useStore();
  const [asset, setAsset] = useState("ETH");
  const [direction, setDirection] = useState("above");
  const [target, setTarget] = useState("");
  const [err, setErr] = useState("");
  const [created, setCreated] = useState(null);

  const a = findAsset(asset);
  const t = Number(target) || 0;
  const delta = t ? +(((t - a.price) / a.price) * 100).toFixed(2) : 0;

  function create() {
    if (!t || t <= 0) { setErr("Enter a target price above zero."); return; }
    if (direction === "above" && t <= a.price) { setErr(`For an "above" alert the target must exceed ${money(a.price)}.`); return; }
    if (direction === "below" && t >= a.price) { setErr(`For a "below" alert the target must be under ${money(a.price)}.`); return; }
    setErr("");
    const alert = { id: "ALR-" + (s.alerts.length + 1), asset, direction, target: t,
                    priceWhenSet: a.price, status: "Active", createdAt: "2026-09-15" };
    update((st) => { st.alerts.unshift(alert); return st; });
    setCreated(alert);
    setTarget("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Portfolio" }, { href: `${BASE}/buy`, label: "Buy" }]} />
      <Page title="Price alerts">
        {created && (
          <Banner tone="ok" title="Alert created" testId="alert-created">
            We'll notify you when <strong data-testid="alert-asset">{created.asset}</strong> goes{" "}
            <strong data-testid="alert-direction">{created.direction}</strong>{" "}
            <strong data-testid="alert-target">{money(created.target)}</strong>.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="New alert">
            <Field label="Asset">
              <Select value={asset} onChange={(e) => { setAsset(e.target.value); setErr(""); }}
                      aria-label="Asset" data-testid="alert-asset-select">
                {ASSETS.map((x) => <option key={x.id} value={x.id}>{x.id} — {x.name}</option>)}
              </Select>
            </Field>
            <Row label="Current price" value={money(a.price)} testId="current-price" />
            <Radio name="d" label="Price goes above" testId="direction-above"
                   checked={direction === "above"} onChange={() => { setDirection("above"); setErr(""); }} />
            <Radio name="d" label="Price goes below" testId="direction-below"
                   checked={direction === "below"} onChange={() => { setDirection("below"); setErr(""); }} />
            <Field label="Target price" error={err}>
              <Input value={target} onChange={(e) => setTarget(e.target.value)} inputMode="decimal"
                     aria-label="Target price" data-testid="target-price" />
            </Field>
            {t > 0 && <Badge tone="info" testId="target-delta">{delta > 0 ? "+" : ""}{delta}% from current price</Badge>}
            <Btn block onClick={create} data-testid="create-alert">Create alert</Btn>
          </Card>

          <Card title={`Your alerts (${s.alerts.length})`} testId="alert-list">
            {s.alerts.length === 0 ? <Empty>No alerts set.</Empty> : s.alerts.map((al) => (
              <div key={al.id} data-testid={`alert-${al.id}`}>
                <Row label={`${al.asset} ${al.direction} ${money(al.target)}`} value={al.createdAt} />
                <div className="ck-muted">Price when set: {money(al.priceWhenSet)}</div>
                <Badge tone="ok" testId={`alert-status-${al.id}`}>{al.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
