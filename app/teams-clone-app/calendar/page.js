"use client";
import { useRouter } from "next/navigation";
import { Shell, Page, Card, Btn, Row, Badge } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, useStore } from "../shared";

export default function Calendar() {
  const [s, update] = useStore();
  const router = useRouter();

  function join(id) {
    const m = s.meetings.find((x) => x.id === id);
    if (!m) return;
    update((st) => {
      const target = st.meetings.find((x) => x.id === id);
      target.joined = true;
      st.inMeeting = { id, title: target.title, muted: true, camera: false, sharing: false, participants: target.attendees };
      return st;
    });
    router.push(`${BASE}/meeting/${id}`);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Calendar" sub="Wednesday, 16 September">
        <Card title="Scheduled meetings" testId="meeting-list">
          {s.meetings.map((m) => (
            <div key={m.id} className="ck-row" data-testid={`meeting-${m.id}`}>
              <span>
                <strong>{m.title}</strong>
                <div className="ck-muted">{m.time} · organised by {m.organizer} · {m.attendees} attendees</div>
                {m.joined && <Badge tone="ok" testId={`joined-${m.id}`}>Joined</Badge>}
              </span>
              <Btn size="sm" data-testid={`join-${m.id}`} onClick={() => join(m.id)}>Join</Btn>
            </div>
          ))}
        </Card>
        {s.inMeeting && (
          <Card title="Currently in" tone="ok">
            <Row label="Meeting" value={s.inMeeting.title} testId="current-meeting" />
          </Card>
        )}
      </Page>
    </Shell>
  );
}
