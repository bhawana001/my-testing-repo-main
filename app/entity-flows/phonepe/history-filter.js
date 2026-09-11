"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Select, Field, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const TX = [
  { id: 1, who: "Fresh Mart Groceries", cat: "Groceries", month: "2026-09", amount: 640, day: "12 Sep" }, { id: 2, who: "Uber-ish", cat: "Travel", month: "2026-09", amount: 210, day: "10 Sep" }, { id: 3, who: "Swiggly", cat: "Food", month: "2026-09", amount: 385, day: "8 Sep" },
  { id: 4, who: "Fresh Mart Groceries", cat: "Groceries", month: "2026-08", amount: 720, day: "29 Aug" }, { id: 5, who: "Electricity bill", cat: "Bills", month: "2026-08", amount: 1842, day: "18 Aug" }, { id: 6, who: "Swiggly", cat: "Food", month: "2026-08", amount: 299, day: "11 Aug" }, { id: 7, who: "Airwave Postpaid", cat: "Bills", month: "2026-07", amount: 599, day: "20 Jul" },
];
const MONTHS = [{ v: "", l: "All months" }, { v: "2026-09", l: "September 2026" }, { v: "2026-08", l: "August 2026" }, { v: "2026-07", l: "July 2026" }];
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ month: "", cat: "" }));
  const rows = TX.filter((t) => (!s.month || t.month === s.month) && (!s.cat || t.cat === s.cat));
  return (
    <MobileShell flow={flow} title="History" nav={["Home", "Scan", "History"]}>
      <div className="ee-grid ee-grid--2" style={{ gap: 8 }}>
        <Field label="Month" htmlFor="hf-month"><Select id="hf-month" value={s.month} onChange={(e) => set({ ...s, month: e.target.value })}>{MONTHS.map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}</Select></Field>
        <Field label="Category" htmlFor="hf-cat"><Select id="hf-cat" value={s.cat} onChange={(e) => set({ ...s, cat: e.target.value })}><option value="">All categories</option>{["Groceries", "Food", "Travel", "Bills"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
      </div>
      <div className="ee-small ee-muted" data-testid="result-count">{rows.length} transaction{rows.length === 1 ? "" : "s"}{s.month || s.cat ? " matching filters" : ""}</div>
      <div className="ee-stack" style={{ gap: 6 }} data-testid="history-list">
        {rows.length === 0 && <div className="ee-empty">No transactions match.</div>}
        {rows.map((t) => <div key={t.id} className="ee-row ee-row--between ee-small" data-testid={`tx-${t.id}`}><span><b>{t.who}</b><div className="ee-tiny ee-muted">{t.day} · <span data-testid={`tx-${t.id}-cat`}>{t.cat}</span></div></span><span className="ee-num">−{money(t.amount, "INR")}</span></div>)}
      </div>
    </MobileShell>
  );
}
