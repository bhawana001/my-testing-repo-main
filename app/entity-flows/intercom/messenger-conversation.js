"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Segment, Badge, Btn } from "@/app/components/eval/ui";
import { Composer } from "@/app/components/engines/Feed";
import { MessengerFrame, Bubble } from "@/app/components/engines/Messenger";

const SAMPLE = { name: "error-screenshot.png", size: "184 KB", kind: "image" };
const seed = () => ({ view: "site", open: false, started: false, messages: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const send = ({ text, attachment }) => set((st) => ({ ...st, messages: [...st.messages, { id: "u" + (st.messages.length + 1), text, attachment, time: "10:0" + st.messages.length + " AM" }] }));
  return (
    <>
      <Topbar entity={ent} nav={["Product", "Pricing", "Docs"]} light right={<Segment options={[{ value: "site", label: "Website" }, { value: "inbox", label: "Team inbox" }]} value={s.view} onChange={(v) => set({ ...s, view: v })} />} />
      <main className="ee-main">
        {s.view === "site" ? (<>
          <h1 className="ee-page-title">Acme Cloud · Dashboard</h1>
          <p className="ee-page-sub">Need help? Open the messenger in the bottom-right corner.</p>
          <MessengerFrame open={s.open} onToggle={() => set({ ...s, open: !s.open })}>
            {!s.started ? (<>
              <div className="ee-strong" style={{ fontSize: 18 }}>Hi Demo 👋</div>
              <Card tight><div className="ee-strong">Send us a message</div><div className="ee-small ee-muted">We'll be back in a few minutes</div><Btn size="sm" style={{ marginTop: 8 }} onClick={() => set({ ...s, started: true })} data-testid="new-conversation">New conversation</Btn></Card>
            </>) : (<>
              <div className="ee-feed" data-testid="messenger-thread">
                <Bubble>Hi Demo! How can we help today?</Bubble>
                {s.messages.map((m) => <Bubble key={m.id} me testId={`sent-${m.id}`}>{m.text}{m.attachment && <div className="ee-small" style={{ marginTop: 4 }} data-testid={`sent-${m.id}-attachment`}>📎 {m.attachment.name}</div>}</Bubble>)}
                {s.messages.length > 0 && <div className="ee-tiny ee-muted" style={{ textAlign: "right" }} data-testid="delivered">Delivered · the team will reply soon</div>}
              </div>
              <Composer onSend={send} placeholder="Write a message…" allowAttach sampleFile={SAMPLE} testIdPrefix="messenger-composer" />
            </>)}
          </MessengerFrame>
        </>) : (
          <Card title="Inbox · Unassigned" data-testid="team-inbox">
            {s.messages.length === 0 ? <div className="ee-empty">No conversations yet.</div> : (
              <div className="ee-stack" data-testid="inbox-conversation">
                <div className="ee-row ee-row--between"><span className="ee-strong">Demo User · demo@evals.dev</span><Badge tone="info">Open</Badge></div>
                {s.messages.map((m) => <div key={m.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`inbox-${m.id}`}><div>{m.text}</div>{m.attachment && <div className="ee-small ee-muted">📎 {m.attachment.name} · {m.attachment.size}</div>}</div>)}
              </div>
            )}
          </Card>
        )}
      </main>
    </>
  );
}
