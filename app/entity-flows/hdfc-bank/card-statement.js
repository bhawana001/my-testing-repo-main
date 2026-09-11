"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, Table, KV, Badge } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

const TX = [
  { id: 1, date: "02 Aug 2026", desc: "AMAZONIA RETAIL", amount: 4599 }, { id: 2, date: "05 Aug 2026", desc: "SWIGGLY FOOD", amount: 812.5 }, { id: 3, date: "11 Aug 2026", desc: "INDIGO AIRWAYS", amount: 12450 },
  { id: 4, date: "18 Aug 2026", desc: "FUEL STATION", amount: 3000 }, { id: 5, date: "24 Aug 2026", desc: "PAYMENT RECEIVED - THANK YOU", amount: -15000 }, { id: 6, date: "29 Aug 2026", desc: "GROCERY MART", amount: 2350.75 },
];
const total = round2(TX.reduce((s, t) => s + t.amount, 0));
const minDue = round2(Math.max(200, total * 0.05));
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({}));
  return (
    <BankShell entity={ent} nav={["NetBanking", "Cards", "Statements"]} active="Cards" title="Credit card statement" sub="Regalia Credit Card •••• 5520 · Statement dated 01 Sep 2026">
      <div className="ee-split">
        <Card title="Transactions" data-testid="statement-table">
          <Table cols={[{ key: "date", label: "Date" }, { key: "desc", label: "Description" }, { key: "amount", label: "Amount", align: "right", render: (r) => (r.amount < 0 ? <span style={{ color: "var(--ee-ok)" }}>−{money(-r.amount, "INR")} Cr</span> : money(r.amount, "INR")) }]} rows={TX} rowKey={(r) => r.id} />
          <div className="ee-kv ee-kv--total"><span className="ee-kv__k">Total amount due</span><span className="ee-kv__v" data-testid="table-total">{money(total, "INR")}</span></div>
        </Card>
        <Card title="Summary" data-testid="statement-summary">
          <KV k="Statement date" v="01 Sep 2026" />
          <KV k="Payment due date" v="21 Sep 2026" testId="summary-due-date" />
          <KV k="Total amount due" v={money(total, "INR")} testId="summary-total" />
          <KV k="Minimum amount due (5%)" v={money(minDue, "INR")} testId="summary-min-due" />
          <KV k="Credit limit" v={money(200000, "INR")} />
          <KV k="Available credit" v={money(200000 - total, "INR")} />
          <div style={{ marginTop: 10 }}><Badge tone="warn">Due in 7 days</Badge></div>
        </Card>
      </div>
    </BankShell>
  );
}
