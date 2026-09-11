"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, KV, Badge, Alert } from "@/app/components/eval/ui";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { money } from "@/lib/seed";

const QUOTE = { id: "Q-RENT-2201", monthly: 15, property: 20000, liability: 100000, deductible: 500, start: "September 15, 2026" };
export function buildPolicyPdf(policyNo) {
  const text = `Lemonaid Renters Policy ${policyNo} - Personal property $20,000 - Liability $100,000 - Deductible $500 - Effective September 15, 2026`;
  const content = `BT /F1 12 Tf 40 760 Td (${text}) Tj ET`;
  const objs = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>", `<< /Length ${content.length} >>\nstream\n${content}\nendstream`, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  let pdf = "%PDF-1.4\n"; const offs = [];
  objs.forEach((o, i) => { offs.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const x = pdf.length;
  return pdf + `xref\n0 6\n0000000000 65535 f \n` + offs.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("") + `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${x}\n%%EOF`;
}
const seed = () => ({ policy: null, downloaded: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  function download() {
    const blob = new Blob([buildPolicyPdf(s.policy.number)], { type: "application/pdf" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `lemonaid-policy-${s.policy.number}.pdf`; document.body.appendChild(a); a.click(); a.remove();
    set({ ...s, downloaded: { name: a.download, bytes: blob.size } });
  }
  return (
    <>
      <Topbar entity={ent} nav={["Renters", "Homeowners", "Pet", "Car"]} active="Renters" light />
      <main className="ee-main">
        {!s.policy ? (
          <div className="ee-split">
            <Card title="Your quote" data-testid="quote-summary">
              <div className="ee-price" style={{ fontSize: 30 }}>{money(QUOTE.monthly)}<span className="ee-muted" style={{ fontSize: 15 }}>/month</span></div>
              <KV k="Quote" v={QUOTE.id} /><KV k="Personal property" v={money(QUOTE.property)} /><KV k="Personal liability" v={money(QUOTE.liability)} /><KV k="Deductible" v={money(QUOTE.deductible)} /><KV k="Policy starts" v={QUOTE.start} />
            </Card>
            <Card title="Pay your first month">
              <PaymentForm amount={QUOTE.monthly} allow3ds={false} buttonLabel={`Pay ${money(QUOTE.monthly)} and activate`} onSuccess={(p) => set({ ...s, policy: { number: "LP-" + QUOTE.id.slice(-4) + "-0915", card: p.last4 } })} />
            </Card>
          </div>
        ) : (
          <Card style={{ maxWidth: 680, margin: "0 auto" }} data-testid="policy-active">
            <Badge tone="ok" data-testid="policy-status">Policy active</Badge>
            <h1 style={{ fontSize: 24, margin: "10px 0" }}>You're covered, Demo! 🍋</h1>
            <KV k="Policy number" v={<span className="ee-mono" data-testid="policy-number">{s.policy.number}</span>} />
            <KV k="Status" v="Active from September 15, 2026" />
            <KV k="Monthly premium" v={money(QUOTE.monthly)} /><KV k="Paid with" v={`Visa •••• ${s.policy.card}`} />
            <div className="ee-divider" />
            <div className="ee-row ee-row--between" data-testid="policy-document">
              <span><b>Policy documents</b><div className="ee-small ee-muted">Declarations page and full policy (PDF)</div></span>
              <Btn variant="secondary" onClick={download} data-testid="download-policy">Download PDF</Btn>
            </div>
            {s.downloaded && <Alert tone="ok" data-testid="policy-downloaded">Downloaded {s.downloaded.name} ({s.downloaded.bytes} bytes).</Alert>}
          </Card>
        )}
      </main>
    </>
  );
}
