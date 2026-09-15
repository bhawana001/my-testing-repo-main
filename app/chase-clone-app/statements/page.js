"use client";
// Statement download (23.4). This builds a real, valid PDF in the browser and
// downloads it -- the byte size is shown on screen so "downloaded and
// non-empty" is checkable without reaching into the filesystem.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, useStore } from "../shared";

/** Minimal but structurally valid single-page PDF containing the given lines. */
function buildPdf(lines) {
  const text = lines
    .map((l, i) => `BT /F1 12 Tf 60 ${740 - i * 20} Td (${String(l).replace(/[()\\]/g, "")}) Tj ET`)
    .join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => { pdf += String(o).padStart(10, "0") + " 00000 n \n"; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

export default function StatementsPage() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);

  function download(st) {
    const blob = buildPdf([
      "Chaise Bank",
      `Statement period: ${st.period}`,
      `Account: ${st.account}`,
      "",
      "Opening balance      $3,912.18",
      "Deposits             $2,450.00",
      "Withdrawals          $2,151.63",
      "Closing balance      $4,210.55",
    ]);
    const bytes = blob.size;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chaise-statement-${st.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);

    update((acc) => {
      acc.downloads = acc.downloads.filter((d) => d.id !== st.id);
      acc.downloads.unshift({ id: st.id, period: st.period, account: st.account, bytes, at: "2026-09-15" });
      return acc;
    });
    setNotice(`Statement for ${st.period} downloaded — ${bytes} bytes.`);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: `${BASE}/dashboard`, label: "Accounts" }]} />
      <Page title="Statements & documents">
        {notice && <Banner tone="ok" testId="download-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card title="Available statements" testId="statements-list">
          {s.statements.map((st) => {
            const dl = s.downloads.find((d) => d.id === st.id);
            return (
              <div key={st.id} className="ck-row" data-testid={`statement-${st.id}`}>
                <span>
                  <strong>{st.period}</strong> <span className="ck-muted">· {st.account} · {st.pages} pages</span>
                  {dl && (
                    <div data-testid={`downloaded-${st.id}`}>
                      <Badge tone="ok">Downloaded</Badge>{" "}
                      <span className="ck-muted" data-testid={`bytes-${st.id}`}>{dl.bytes} bytes</span>
                    </div>
                  )}
                </span>
                <span>
                  <Btn size="sm" onClick={() => download(st)} data-testid={`download-${st.id}`}>Download PDF</Btn>
                </span>
              </div>
            );
          })}
        </Card>

        {s.downloads.length > 0 && (
          <Card title="Download history" testId="download-history">
            {s.downloads.map((d) => (
              <Row key={d.id} label={`${d.period} · ${d.account}`} value={`${d.bytes} bytes`} testId={`history-${d.id}`} />
            ))}
            <Badge tone="ok" testId="non-empty">File is non-empty</Badge>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
