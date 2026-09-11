"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Check, Modal, Input, Segment, Badge, KV, Alert } from "@/app/components/eval/ui";
import { downloadPdf } from "./_pdf";

const seed = () => ({ stage: "intro", agreed: false, signature: null, dateSigned: null, sealed: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [adopt, setAdopt] = useState(false); const [name, setName] = useState("Demo User"); const [style, setStyle] = useState("Script"); const [err, setErr] = useState(null);
  function finish() { if (!s.signature) { setErr("Sign the Signature field before finishing."); return; } setErr(null); set({ ...s, stage: "done" }); }
  function dl() { const bytes = downloadPdf("Mutual-NDA-completed.pdf", ["Mutual Non-Disclosure Agreement", "Signed by: " + s.signature.name + " on September 14, 2026", "Certificate of Completion", "Envelope ENV-7F31A2 · Status: Completed · Sealed by DocuSigned"]); set({ ...s, sealed: bytes }); }
  return (
    <>
      <Topbar entity={ent} nav={[]} light right={<span className="ee-small ee-muted">Envelope ENV-7F31A2 · Mutual-NDA.pdf</span>} />
      <main className="ee-main ee-main--narrow">
        {s.stage === "intro" && (
          <Card data-testid="signing-intro">
            <h1 style={{ fontSize: 20 }}>Please review and act on this document</h1>
            <p className="ee-small ee-muted" style={{ margin: "8px 0" }}>Demo User sent you a document to review and sign.</p>
            <Check label="I agree to use electronic records and signatures." checked={s.agreed} onChange={(e) => set({ ...s, agreed: e.target.checked })} />
            <Btn style={{ marginTop: 12 }} disabled={!s.agreed} onClick={() => set({ ...s, stage: "sign" })} data-testid="continue-signing">Continue</Btn>
          </Card>
        )}
        {s.stage === "sign" && (
          <Card data-testid="document">
            <div className="ee-row ee-row--between" style={{ marginBottom: 10 }}><Badge tone="warn">1 required field</Badge><Btn onClick={finish} data-testid="finish">Finish</Btn></div>
            <div style={{ background: "#fff", color: "#111", border: "1px solid var(--ee-border)", borderRadius: 8, padding: 24, fontFamily: "Georgia, serif" }}>
              <h2 style={{ fontSize: 18 }}>Mutual Non-Disclosure Agreement</h2>
              <p style={{ fontSize: 13, margin: "10px 0" }}>The parties agree to keep confidential all non-public information disclosed under this Agreement for a period of two (2) years.</p>
              <div className="ee-row" style={{ gap: 24, marginTop: 20 }}>
                <div><div className="ee-tiny">Signature</div>{s.signature ? <div style={{ fontFamily: s.signature.style === "Script" ? "cursive" : "inherit", fontSize: 24, borderBottom: "1px solid #111", minWidth: 180 }} data-testid="placed-signature">{s.signature.name}</div> : <button type="button" onClick={() => setAdopt(true)} style={{ background: "#ffd400", border: "2px dashed #b38f00", padding: "8px 18px", fontWeight: 800, cursor: "pointer" }} data-testid="sign-field">Sign ▾</button>}</div>
                <div><div className="ee-tiny">Date Signed</div><div style={{ borderBottom: "1px solid #111", minWidth: 120, fontSize: 14 }} data-testid="date-signed">{s.dateSigned || " "}</div></div>
              </div>
            </div>
            {err && <Alert tone="err">{err}</Alert>}
          </Card>
        )}
        {s.stage === "done" && (
          <Card data-testid="signing-done">
            <Badge tone="ok" data-testid="envelope-status">Completed</Badge>
            <h2 style={{ margin: "8px 0" }}>You're done signing</h2>
            <KV k="Signed by" v={s.signature.name} /><KV k="Date signed" v={s.dateSigned} /><KV k="Envelope" v="ENV-7F31A2 · Completed" />
            <Btn variant="secondary" style={{ marginTop: 10 }} onClick={dl} data-testid="download-sealed">Download sealed PDF</Btn>
            {s.sealed && <Alert tone="ok" data-testid="sealed-ok">Downloaded Mutual-NDA-completed.pdf ({s.sealed} bytes) with Certificate of Completion.</Alert>}
          </Card>
        )}
      </main>
      <Modal open={adopt} title="Adopt your signature" onClose={() => setAdopt(false)}>
        <div className="ee-stack" data-testid="adopt-modal">
          <Input value={name} onChange={(e) => setName(e.target.value)} aria-label="Full name" />
          <Segment options={["Script", "Print"]} value={style} onChange={setStyle} />
          <div style={{ fontFamily: style === "Script" ? "cursive" : "inherit", fontSize: 28, padding: 8, border: "1px solid var(--ee-border)", borderRadius: 8 }}>{name}</div>
          <Btn disabled={!name.trim()} onClick={() => { set({ ...s, signature: { name: name.trim(), style }, dateSigned: "9/14/2026" }); setAdopt(false); }} data-testid="adopt-sign">Adopt and Sign</Btn>
        </div>
      </Modal>
    </>
  );
}
