"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SlackShell } from "./_shell";
import { Message } from "@/app/components/engines/Feed";
import { Input, Btn, Select, Card } from "@/app/components/eval/ui";

const MSGS = [
  { id: "m1", channel: "general", author: "Priya Nair", time: "Sep 10", text: "Reminder: deploy freeze starts Thursday." },
  { id: "m2", channel: "release-train", author: "Tom Alvarez", time: "Sep 11", text: "Deploy 2026.09.11 is green on staging." },
  { id: "m3", channel: "release-train", author: "Demo User", time: "Sep 12", text: "Kicking off the production deploy now." },
  { id: "m4", channel: "design", author: "Priya Nair", time: "Sep 12", text: "New icons are ready, no deploy needed." },
  { id: "m5", channel: "general", author: "Sam Lee", time: "Sep 13", text: "Lunch is on the 7th floor today." },
];
const seed = () => ({ q: "", inCh: "" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(s.q);
  const res = s.q ? MSGS.filter((m) => m.text.toLowerCase().includes(s.q.toLowerCase()) && (!s.inCh || m.channel === s.inCh)) : [];
  return (
    <SlackShell flow={flow} active="general" header={
      <form className="ee-row" style={{ marginBottom: 12 }} onSubmit={(e) => { e.preventDefault(); set({ ...s, q: q.trim() }); }}>
        <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Acme Inc" aria-label="Search messages" style={{ flex: 1 }} />
        <Btn type="submit" data-testid="search-go">Search</Btn>
      </form>}>
      {s.q ? (
        <Card data-testid="search-results">
          <div className="ee-row ee-row--between" style={{ marginBottom: 8 }}>
            <span className="ee-strong" data-testid="result-count">{res.length} result{res.length === 1 ? "" : "s"} for “{s.q}”{s.inCh ? ` in #${s.inCh}` : ""}</span>
            <Select value={s.inCh} onChange={(e) => set({ ...s, inCh: e.target.value })} aria-label="In channel" style={{ width: "auto" }}><option value="">In: any channel</option>{["general", "design", "release-train"].map((c) => <option key={c} value={c}>In: #{c}</option>)}</Select>
          </div>
          <div className="ee-feed">{res.map((m) => <div key={m.id} data-testid={`result-${m.id}`}><div className="ee-tiny ee-muted" data-testid={`result-${m.id}-channel`}>#{m.channel}</div><Message msg={m} highlight={s.q} /></div>)}</div>
          {res.length === 0 && <div className="ee-empty">No messages match.</div>}
        </Card>
      ) : <div className="ee-empty">Search messages across all channels.</div>}
    </SlackShell>
  );
}
