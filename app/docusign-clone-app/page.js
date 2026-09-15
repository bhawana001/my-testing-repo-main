"use client";
// Envelope list — the sender's view of status, including declines with reasons.
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty } from "../clones/kit/ui";
import { BRAND, BASE, useStore } from "./shared";

const tone = (s) => (s === "completed" ? "ok" : s === "declined" ? "bad" : s === "sent" ? "warn" : "neutral");

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/send`, label: "Send envelope", testId: "nav-send" },
        { href: `${BASE}/templates`, label: "Templates", testId: "nav-templates" },
      ]} />
      <Page title="Envelopes" sub="Everything you've sent for signature" wide>
        <Card testId="envelope-list">
          {s.envelopes.length === 0 ? <Empty>No envelopes yet.</Empty> : s.envelopes.map((e) => (
            <div key={e.id} className="ck-row" data-testid={`envelope-${e.id}`}>
              <span>
                <strong>{e.subject}</strong>
                <div className="ck-muted">{e.id} · to {e.recipientName} ({e.recipient}) · sent {e.sentAt}</div>
                {e.status === "declined" && (
                  <div data-testid={`decline-reason-${e.id}`} className="ck-muted">
                    Declined: {e.declineReason}{e.declineNote ? ` — ${e.declineNote}` : ""}
                  </div>
                )}
                {e.fromTemplate && <Badge tone="info" testId={`from-template-${e.id}`}>From template: {e.fromTemplate}</Badge>}
              </span>
              <span>
                <Badge tone={tone(e.status)} testId={`status-${e.id}`}>{e.status}</Badge>
                {e.sealed && <> <Badge tone="ok" testId={`sealed-${e.id}`}>PDF sealed</Badge></>}
                {e.status === "sent" && (
                  <div style={{ marginTop: 6 }}>
                    <Btn size="sm" as="link" href={`${BASE}/sign?e=${e.id}`} data-testid={`sign-link-${e.id}`}>Open signing link</Btn>
                  </div>
                )}
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
