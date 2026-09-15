"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Select, Textarea, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, FIELDS, useStore, parseCsv, leadId } from "../shared";

const SAMPLE = `Given Name,Surname,Organisation,Work Email,Telephone,Channel,Value
Sam,Rivera,Riverfield FC,sam@riverfield.test,555 0110,Web,52000
Ana,Okonkwo,Kestrel Labs,ana@kestrel.test,555 0188,Referral,18500
Leo,Marsh,Harbour Freight,leo@harbourfreight.test,555 0164,Web,7400`;

/** Column headers are guessed, then the user confirms the mapping before import. */
const GUESS = {
  "given name": "firstName", "first name": "firstName",
  surname: "lastName", "last name": "lastName",
  organisation: "company", company: "company",
  "work email": "email", email: "email",
  telephone: "phone", phone: "phone",
  channel: "source", "lead source": "source",
  value: "amount", amount: "amount", rating: "rating",
};

export default function Import() {
  const [s, update] = useStore();
  const [csv, setCsv] = useState(SAMPLE);
  const [parsed, setParsed] = useState(null);
  const [mapping, setMapping] = useState({});
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  function parse() {
    const result = parseCsv(csv);
    if (result.error) { setError(result.error); setParsed(null); return; }
    const guessed = {};
    result.headers.forEach((h, i) => { guessed[i] = GUESS[h.toLowerCase()] || "skip"; });
    setMapping(guessed);
    setParsed(result);
    setError(null);
    setDone(null);
  }

  function runImport() {
    const mapped = Object.values(mapping).filter((v) => v !== "skip");
    if (!mapped.includes("lastName") && !mapped.includes("firstName")) {
      setError("Map at least a first or last name column before importing.");
      return;
    }
    const created = parsed.rows.map((row, r) => {
      const lead = {
        id: leadId(s.counter + r), firstName: "", lastName: "", company: "", email: "",
        phone: "", source: "", rating: "Cold", amount: 0, owner: "Unassigned",
        stage: "qualification", blueprintData: {},
        log: [{ at: "2026-09-16", text: "Created by CSV import" }],
      };
      parsed.headers.forEach((h, i) => {
        const field = mapping[i];
        if (!field || field === "skip") return;
        lead[field] = field === "amount" ? Number(row[i]) || 0 : row[i];
      });
      return lead;
    });
    update((st) => {
      st.leads.push(...created);
      st.counter += created.length;
      st.imports.unshift({
        id: `imp_${st.imports.length + 1}`, rows: created.length,
        mapped: parsed.headers.map((h, i) => `${h} → ${mapping[i] === "skip" ? "not imported"
          : FIELDS.find((f) => f.id === mapping[i]).label}`),
        at: "2026-09-16",
      });
      return st;
    });
    setError(null);
    setDone({ count: created.length, sample: created[0] });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Import leads" sub="Paste a CSV, confirm the mapping, import" wide>
        {error && <Banner tone="bad" testId="import-error">{error}</Banner>}
        {done && (
          <Banner tone="ok" title="Import complete" testId="import-success">
            {done.count} leads created.{" "}
            <Link href={`${BASE}/leads`} data-testid="view-leads">See them in Leads</Link>
          </Banner>
        )}

        <Card title="CSV">
          <Field label="Paste your rows" hint="First line is the header">
            <Textarea value={csv} rows={6} data-testid="csv-input" aria-label="CSV"
                      onChange={(e) => setCsv(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={parse} data-testid="parse-csv">Read the file</Btn>
          </div>
        </Card>

        {parsed && (
          <Card title="Map the columns" testId="mapping">
            <Row label="Rows found" value={parsed.rows.length} testId="row-count" />
            <table className="ck-table">
              <thead><tr><th>CSV column</th><th>First value</th><th>Maps to</th></tr></thead>
              <tbody>
                {parsed.headers.map((h, i) => (
                  <tr key={i} data-testid={`map-row-${i}`}>
                    <td data-testid={`csv-header-${i}`}>{h}</td>
                    <td className="ck-muted">{parsed.rows[0][i]}</td>
                    <td>
                      <select className="ck-input" value={mapping[i] || "skip"} aria-label={`Map ${h}`}
                              data-testid={`map-${i}`}
                              onChange={(e) => setMapping((m) => ({ ...m, [i]: e.target.value }))}>
                        <option value="skip">Do not import</option>
                        {FIELDS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ck-card-actions">
              <Btn onClick={runImport} data-testid="run-import">Import {parsed.rows.length} leads</Btn>
            </div>
          </Card>
        )}

        {done && (
          <Card title="First imported record" testId="import-sample">
            <Row label="Lead id" value={done.sample.id} testId="sample-id" />
            <Row label="First Name" value={done.sample.firstName || "—"} testId="sample-first-name" />
            <Row label="Last Name" value={done.sample.lastName || "—"} testId="sample-last-name" />
            <Row label="Company" value={done.sample.company || "—"} testId="sample-company" />
            <Row label="Email" value={done.sample.email || "—"} testId="sample-email" />
            <Row label="Lead Source" value={done.sample.source || "—"} testId="sample-source" />
            <Row label="Deal Amount" value={done.sample.amount} testId="sample-amount" />
          </Card>
        )}

        <Card title="Import history" testId="import-history">
          {s.imports.length === 0 && <Empty>No imports yet.</Empty>}
          {s.imports.map((i) => (
            <div key={i.id} className="ck-row" data-testid={`import-${i.id}`}>
              <span>
                <strong>{i.rows} leads</strong>
                <div className="ck-muted">{i.mapped.join(" · ")}</div>
              </span>
              <Badge tone="ok">{i.at}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
