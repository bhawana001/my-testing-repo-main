"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, Table, Btn, Badge, Alert } from "@/app/components/eval/ui";

// Builds a small but valid PDF in the browser so the download is a real, non-empty file.
export function buildStatementPdf(period) {
  const lines = [`Chaise Bank - Total Checking (**** 4821)`, `Statement period: ${period}`, `Opening balance: $3,902.10`, `Deposits: $2,450.00`, `Withdrawals: $2,141.55`, `Closing balance: $4,210.55`, ...Array.from({ length: 24 }, (_, i) => `2026-08-${String(i + 1).padStart(2, "0")}  Transaction ${i + 1}  -$${(12.5 + i * 3.25).toFixed(2)}`)];
  let content = "BT /F1 11 Tf 40 780 Td 14 TL\n";
  for (const l of lines) content += `(${l.replace(/[()\\]/g, "")}) Tj T*\n`;
  content += "ET";
  const objs = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>", `<< /Length ${content.length} >>\nstream\n${content}\nendstream`, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  let pdf = "%PDF-1.4\n"; const offs = [];
  objs.forEach((o, i) => { offs.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("") + `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}
const STATEMENTS = [{ id: "2026-08", period: "August 1 – August 31, 2026", label: "August 2026" }, { id: "2026-07", period: "July 1 – July 31, 2026", label: "July 2026" }, { id: "2026-06", period: "June 1 – June 30, 2026", label: "June 2026" }];
const seed = () => ({ downloads: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [last, setLast] = useState(null);
  function download(st) {
    const pdf = buildStatementPdf(st.period);
    const blob = new Blob([pdf], { type: "application/pdf" });
    const name = `chaise-statement-${st.id}.pdf`;
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    const info = { id: st.id, name, bytes: blob.size, at: "just now" };
    setLast(info);
    set({ downloads: [info, ...s.downloads.filter((d) => d.id !== st.id)] });
  }
  return (
    <BankShell entity={ent} nav={["Accounts", "Pay & transfer", "Statements"]} active="Statements" title="Statements & documents" sub="Total Checking (•••• 4821)">
      <div className="ee-split">
        <Card data-testid="statements">
          <Table cols={[{ key: "label", label: "Statement", render: (r) => <span>{r.label}{r.id === "2026-08" && <Badge tone="info" style={{ marginLeft: 8 }}>Last month</Badge>}</span> }, { key: "period", label: "Period" }, { key: "dl", label: "", align: "right", render: (r) => <Btn size="sm" variant="secondary" onClick={() => download(r)} data-testid={`download-${r.id}`}>Download PDF</Btn> }]} rows={STATEMENTS} rowKey={(r) => r.id} />
        </Card>
        <Card title="Download status" data-testid="download-status">
          {last ? <Alert tone="ok" data-testid="download-ok">Downloaded <b>{last.name}</b> ({(last.bytes / 1024).toFixed(1)} KB, {last.bytes} bytes). The file is a valid, non-empty PDF.</Alert> : <div className="ee-empty">No downloads yet.</div>}
          {s.downloads.length > 0 && <ul className="ee-small" style={{ marginTop: 10, paddingLeft: 18 }}>{s.downloads.map((d) => <li key={d.id} data-testid={`downloaded-${d.id}`}>{d.name} · {d.bytes} bytes</li>)}</ul>}
        </Card>
      </div>
    </BankShell>
  );
}
