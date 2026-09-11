"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Select, Badge, KV, Btn } from "@/app/components/eval/ui";

const STEPS = [
  { id: "who", title: "Who", heading: "Who are you sending to?", fields: [
    { name: "type", label: "Recipient type", type: "radio-cards", required: true, options: [{ value: "person", label: "Someone else" }, { value: "self", label: "Myself" }, { value: "business", label: "Business" }] },
    { name: "name", label: "Full name of the account holder", required: true, placeholder: "Asha Rao" },
    { name: "email", label: "Email (optional)", type: "email" },
  ] },
  { id: "bank", title: "Bank details", heading: "Bank account details (INR)", fields: [
    { name: "account", label: "Account number", required: true, inputMode: "numeric", validate: (v) => (/^\d{9,18}$/.test(v) ? null : "Account number must be 9–18 digits.") },
    { name: "confirm", label: "Confirm account number", required: true, inputMode: "numeric", validate: (v, all) => (v === all.account ? null : "Account numbers do not match.") },
    { name: "ifsc", label: "IFSC code", required: true, validate: (v) => (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v.toUpperCase()) ? null : "IFSC must look like HDFC0001234."), help: "11 characters, e.g. HDFC0001234" },
  ] },
  { id: "review", title: "Review", heading: "Check the details", summary: true, nextLabel: "Save recipient" },
];
const seed = () => ({ wiz: { ...SEED_WIZARD }, recipients: [{ id: "r1", name: "Ravi Menon", account: "••••4410", ifsc: "ICIC0000123" }], selected: "" });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <BankShell entity={ent} nav={["Home", "Send", "Recipients", "Cards"]} active="Recipients" title="Add a recipient" sub="Saved recipients become selectable in a transfer.">
      <div className="ee-split">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Save recipient" testIdPrefix="recipient"
          onSubmit={(v) => { const rec = { id: "r" + (s.recipients.length + 1), name: v.name, account: "••••" + v.account.slice(-4), ifsc: v.ifsc.toUpperCase() }; set((st) => ({ ...st, recipients: [...st.recipients, rec], selected: rec.id })); return { title: "Recipient saved", message: `${v.name} (${"••••" + v.account.slice(-4)}) can now receive transfers.`, reference: rec.id }; }}
          result={(res) => (<Card data-testid="recipient-saved"><Badge tone="ok">Saved</Badge><h2 style={{ margin: "8px 0" }}>{res.title}</h2><p className="ee-muted">{res.message}</p><Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set((st) => ({ ...st, wiz: { ...SEED_WIZARD } }))}>Add another</Btn></Card>)} />
        <Card title="Send money · choose recipient" data-testid="transfer-picker">
          <Select value={s.selected} onChange={(e) => set({ ...s, selected: e.target.value })} aria-label="Recipient">
            <option value="">Select a recipient…</option>
            {s.recipients.map((r) => <option key={r.id} value={r.id}>{r.name} · {r.account}</option>)}
          </Select>
          {s.selected && (() => { const r = s.recipients.find((x) => x.id === s.selected); return <div style={{ marginTop: 10 }} data-testid="picked-recipient"><KV k="Name" v={r.name} /><KV k="Account" v={r.account} /><KV k="IFSC" v={r.ifsc} /></div>; })()}
          <div className="ee-tiny ee-muted" style={{ marginTop: 8 }}>{s.recipients.length} saved recipient{s.recipients.length === 1 ? "" : "s"}</div>
        </Card>
      </div>
    </BankShell>
  );
}
