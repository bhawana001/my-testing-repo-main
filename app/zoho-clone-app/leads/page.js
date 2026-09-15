"use client";
import { Shell, Page, Card, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BLUEPRINT, useStore, money } from "../shared";

export default function Leads() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Leads" sub={`${s.leads.length} records`} wide>
        <Card title="All leads" testId="lead-table">
          <Row label="Lead count" value={s.leads.length} testId="lead-count" />
          {s.leads.length === 0 && <Empty>No leads.</Empty>}
          <table className="ck-table">
            <thead>
              <tr><th>Id</th><th>Name</th><th>Company</th><th>Email</th><th>Source</th>
                  <th>Rating</th><th>Amount</th><th>Owner</th><th>Stage</th></tr>
            </thead>
            <tbody>
              {s.leads.map((l) => (
                <tr key={l.id} data-testid={`lead-${l.id}`}>
                  <td>{l.id}</td>
                  <td data-testid={`lead-name-${l.id}`}>{`${l.firstName} ${l.lastName}`.trim() || "—"}</td>
                  <td data-testid={`lead-company-${l.id}`}>{l.company || "—"}</td>
                  <td data-testid={`lead-email-${l.id}`}>{l.email || "—"}</td>
                  <td data-testid={`lead-source-${l.id}`}>{l.source || "—"}</td>
                  <td><Badge tone={l.rating === "Hot" ? "bad" : l.rating === "Warm" ? "warn" : "neutral"}
                             testId={`lead-rating-${l.id}`}>{l.rating}</Badge></td>
                  <td data-testid={`lead-amount-${l.id}`}>{money(l.amount)}</td>
                  <td data-testid={`lead-owner-${l.id}`}>{l.owner}</td>
                  <td data-testid={`lead-stage-${l.id}`}>
                    {(BLUEPRINT.find((b) => b.id === l.stage) || {}).name || l.stage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Page>
    </Shell>
  );
}
