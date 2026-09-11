"use client";
// Tracker timeline engine: deterministic step scripts (orders, transfers,
// tickets, envelopes). Progress is driven by explicit actions or a scripted
// tick, never by wall-clock randomness.
import { Badge, Btn, Card, Timeline } from "../eval/ui";

/**
 * steps: [{ id, title, at?: "Mon 14 Sep, 10:00", meta?: string }]
 * currentIndex: number (0-based; steps before it are done, it is active)
 */
export function TrackerTimeline({ steps, currentIndex, testIdPrefix = "tracker" }) {
  const items = steps.map((s, i) => ({
    title: s.title,
    meta: [s.at, s.meta].filter(Boolean).join(" · "),
    state: i < currentIndex ? "done" : i === currentIndex ? "active" : "todo",
    testId: `${testIdPrefix}-step-${s.id}`,
  }));
  return <Timeline items={items} />;
}

export function TrackerHeader({ title, subtitle, status, tone, right, testIdPrefix = "tracker" }) {
  return (
    <div className="ee-row ee-row--between" style={{ marginBottom: 14 }}>
      <div>
        <h2 style={{ fontSize: 20 }} data-testid={`${testIdPrefix}-title`}>{title}</h2>
        {subtitle && <div className="ee-small ee-muted">{subtitle}</div>}
      </div>
      <div className="ee-row">
        {status && <Badge tone={tone} data-testid={`${testIdPrefix}-status`}>{status}</Badge>}
        {right}
      </div>
    </div>
  );
}

/** ScriptedAdvance: a button that moves to the next scripted step (deterministic "live" data). */
export function ScriptedAdvance({ steps, currentIndex, onAdvance, label = "Simulate next update", testIdPrefix = "tracker" }) {
  const done = currentIndex >= steps.length - 1;
  return (
    <div className="ee-row" style={{ marginTop: 12 }}>
      <Btn size="sm" variant="secondary" onClick={onAdvance} disabled={done} data-testid={`${testIdPrefix}-advance`}>
        {done ? "All updates received" : label}
      </Btn>
    </div>
  );
}

export function TrackerCard({ children, ...rest }) {
  return <Card {...rest}>{children}</Card>;
}
