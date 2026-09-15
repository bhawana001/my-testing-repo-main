"use client";
import { useState } from "react";
import { Shell, Page, Card, Select, Input, Field, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, HEALTH_PLANS, ROOM_FILTERS, useStore, inr, filterHealth } from "../shared";

export default function Health() {
  const [s] = useStore();
  const [room, setRoom] = useState("any");
  const [maxPremium, setMaxPremium] = useState("");

  const rows = filterHealth(HEALTH_PLANS, { room, maxPremium });

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Health insurance" sub="Both filters apply together" wide>
        <Card title="Filters">
          <Field label="Room rent">
            <Select value={room} data-testid="room-filter" aria-label="Room rent filter"
                    onChange={(e) => setRoom(e.target.value)}>
              {ROOM_FILTERS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </Select>
          </Field>
          <Field label="Maximum annual premium" hint="Leave blank for no limit">
            <Input value={maxPremium} placeholder="15000" data-testid="premium-filter" aria-label="Maximum premium"
                   onChange={(e) => setMaxPremium(e.target.value)} />
          </Field>
          <Row label="Plans shown" value={`${rows.length} of ${HEALTH_PLANS.length}`} testId="result-count" />
        </Card>

        <Card title="Plans" testId="health-results">
          {rows.length === 0 && <Empty>No plan meets both filters.</Empty>}
          <table className="ck-table">
            <thead>
              <tr><th>Plan</th><th>Sum insured</th><th>Room rent</th><th>Annual premium</th><th>Cashless hospitals</th></tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr key={p.id} data-testid={`health-plan-${i}`}>
                  <td>
                    <strong data-testid={`plan-name-${i}`}>{p.name}</strong>
                    <div className="ck-muted">{p.insurer}</div>
                  </td>
                  <td data-testid={`plan-sum-${i}`}>{inr(p.sumInsured)}</td>
                  <td data-testid={`plan-room-${i}`}>
                    <Badge tone={p.roomRentCapPct === 0 ? "ok" : "warn"}>{p.roomRent}</Badge>
                  </td>
                  <td data-testid={`plan-premium-${i}`}>{inr(p.premium)}</td>
                  <td>{p.cashless.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Excluded by these filters" testId="excluded">
          {HEALTH_PLANS.filter((p) => !rows.some((r) => r.id === p.id)).map((p) => (
            <Row key={p.id} label={p.name}
                 value={`${p.roomRent} · ${inr(p.premium)}`} testId={`excluded-${p.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
