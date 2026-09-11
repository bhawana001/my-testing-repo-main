"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Input, Select, Alert, Badge, Segment } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";

const BOARDS = [{ id: "mkt", name: "Marketing plan", items: 12 }, { id: "client", name: "Client project · Globex", items: 8 }, { id: "fin", name: "Finance · Budget 2026", items: 20 }];
const seed = () => ({ as: "owner", guests: [], open: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [email, setEmail] = useState(""); const [board, setBoard] = useState("client"); const [err, setErr] = useState(null);
  const guest = s.guests[0];
  const visible = s.as === "owner" ? BOARDS : BOARDS.filter((b) => guest && guest.boards.includes(b.id));
  function invite() { if (!isValidEmail(email)) { setErr("Enter a valid email."); return; } setErr(null); set({ ...s, guests: [{ email: email.trim(), boards: [board], role: "Guest" }] }); setEmail(""); }
  const openB = BOARDS.find((b) => b.id === s.open);
  const canOpen = openB && (s.as === "owner" || guest?.boards.includes(openB.id));
  return (
    <SaasShell flow={flow} nav={["Home", "Workspace · Acme", "Members"]} active="Workspace · Acme" title={s.as === "owner" ? "Workspace · Acme (owner)" : `Signed in as guest · ${guest?.email || "no guest"}`} actions={<Segment options={[{ value: "owner", label: "Owner" }, { value: "guest", label: "View as guest" }]} value={s.as} onChange={(v) => set({ ...s, as: v, open: null })} />}>
      <div className="ee-split">
        <Card title={`Boards (${visible.length})`} data-testid="board-list">
          {visible.length === 0 && <div className="ee-empty">No boards shared with you.</div>}
          {visible.map((b) => <div key={b.id} className="ee-row ee-row--between" style={{ padding: "6px 0" }} data-testid={`board-${b.id}`}><span>📋 {b.name}</span><Btn size="sm" variant="secondary" onClick={() => set({ ...s, open: b.id })}>Open</Btn></div>)}
          {s.as === "guest" && <div className="ee-tiny ee-muted" style={{ marginTop: 8 }}>Try a direct link: <button className="ee-link" onClick={() => set({ ...s, open: "fin" })} data-testid="direct-link-fin">/boards/finance-budget-2026</button></div>}
        </Card>
        {s.as === "owner" ? (
          <Card title="Invite a guest to one board" data-testid="invite">
            <div className="ee-stack">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="guest@client.test" aria-label="Guest email" />
              <Select value={board} onChange={(e) => setBoard(e.target.value)} aria-label="Board">{BOARDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</Select>
              {err && <Alert tone="err">{err}</Alert>}
              <Btn onClick={invite} data-testid="invite-btn">Invite as guest</Btn>
              {guest && <Alert tone="ok" data-testid="invite-ok">{guest.email} invited as Guest to “{BOARDS.find((b) => b.id === guest.boards[0]).name}” only.</Alert>}
            </div>
          </Card>
        ) : (
          <Card title={openB ? openB.name : "Board"} data-testid="board-view">
            {!openB ? <div className="ee-empty">Open a board.</div> : canOpen ? <div><Badge tone="ok" data-testid="board-access">Access granted</Badge><div className="ee-small" style={{ marginTop: 6 }}>{openB.items} items</div></div> : <Alert tone="err" data-testid="board-denied">You don't have access to this board. Ask the board owner to invite you.</Alert>}
          </Card>
        )}
      </div>
    </SaasShell>
  );
}
