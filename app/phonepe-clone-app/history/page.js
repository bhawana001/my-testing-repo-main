"use client";
// History filtered by month and category (21.3). Both filters narrow the list
// and the count and total reflect exactly what is shown.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Select, Field, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, CATEGORIES, MONTHS, useStore, money } from "../shared";

export default function HistoryPage() {
  const [s] = useStore();
  const [month, setMonth] = useState("All");
  const [category, setCategory] = useState("All");

  const rows = s.transactions.filter((t) =>
    (month === "All" || t.month === month) && (category === "All" || t.category === category)
  );
  const total = rows.reduce((n, t) => n + t.amount, 0);

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/scan`, label: "Scan & pay" }]} />
      <Page title="Transaction history" wide>
        <Card title="Filters" testId="filters">
          <div className="ck-grid ck-grid--2">
            <Field label="Month">
              <Select value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Month" data-testid="filter-month">
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </Select>
            </Field>
            <Field label="Category">
              <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category" data-testid="filter-category">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
          </div>
          <Row label="Transactions shown" value={String(rows.length)} testId="result-count" />
          <Row label="Total" value={money(total)} strong testId="filtered-total" />
        </Card>

        <Card testId="history-list">
          {rows.length === 0 ? <Empty>No transactions match these filters.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>Date</th><th>Merchant</th><th>Category</th><th>Amount</th></tr></thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id} data-testid={`row-${t.id}`}>
                    <td>{t.at}</td>
                    <td className="ck-strong">{t.merchant}</td>
                    <td><Badge tone="neutral" testId={`category-${t.id}`}>{t.category}</Badge></td>
                    <td data-testid={`amount-${t.id}`}>{money(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
