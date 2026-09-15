"use client";
// Screen flow with branching (28.5). The path taken depends on the enquiry
// type, and finishing creates a real record shown on the success screen.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Select, Textarea, Radio, Row, Badge, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, USERS, useStore, nextId } from "../shared";

const TYPES = [
  { id: "sales", label: "Sales enquiry", detail: "Routes to the sales queue and creates a lead" },
  { id: "support", label: "Support issue", detail: "Routes to support and creates a case" },
];
const PRIORITIES = ["Low", "Medium", "High", "Critical"];

export default function FlowPage() {
  const [s, update] = useStore();
  const [screen, setScreen] = useState(1);
  const [type, setType] = useState("sales");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [detail, setDetail] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  function nextFromScreen1() {
    if (!name.trim()) { setErr("Enter your name to continue."); return; }
    setErr("");
    setScreen(2);
  }

  function finish() {
    if (type === "sales" && !company.trim()) { setErr("Enter a company name."); return; }
    if (type === "support" && !detail.trim()) { setErr("Describe the issue."); return; }
    setErr("");
    if (type === "sales") {
      const id = nextId("00Q", s.counter + 1);
      const rec = { id, name: name.trim(), company: company.trim(), email: "", source: "Web",
                    status: "Open — Not Contacted", owner: USERS[0], createdAt: "2026-09-15" };
      update((st) => { st.leads.unshift(rec); st.counter += 1; return st; });
      setDone({ kind: "Lead", id, summary: `${rec.name} · ${rec.company}${budget ? ` · budget ${budget}` : ""}` });
    } else {
      const id = nextId("500", s.counter + 1);
      const rec = { id, contact: name.trim(), priority, detail: detail.trim(), status: "New", createdAt: "2026-09-15" };
      update((st) => { st.cases.unshift(rec); st.counter += 1; return st; });
      setDone({ kind: "Case", id, summary: `${rec.contact} · priority ${rec.priority}` });
    }
    setScreen(3);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/leads`, label: "Leads" }]} />
      <Page title="Customer intake" sub={`Screen ${screen} of 3`}>
        <Card testId={`flow-screen-${screen}`}>
          {screen === 1 && (
            <>
              <h3 style={{ marginTop: 0 }}>What can we help with?</h3>
              {TYPES.map((t) => (
                <Radio key={t.id} name="type" label={t.label} detail={t.detail} testId={`type-${t.id}`}
                       checked={type === t.id} onChange={() => setType(t.id)} />
              ))}
              <Field label="Your name" error={err}>
                <Input value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" data-testid="flow-name" />
              </Field>
              <Btn onClick={nextFromScreen1} data-testid="flow-next">Next</Btn>
            </>
          )}

          {screen === 2 && type === "sales" && (
            <div data-testid="branch-sales">
              <h3 style={{ marginTop: 0 }}>Tell us about your company</h3>
              <Field label="Company name" error={err}>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} aria-label="Company name" data-testid="flow-company" />
              </Field>
              <Field label="Approximate budget">
                <Input value={budget} onChange={(e) => setBudget(e.target.value)} aria-label="Approximate budget" data-testid="flow-budget" />
              </Field>
              <Btn variant="secondary" onClick={() => setScreen(1)}>Previous</Btn>
              <Btn onClick={finish} data-testid="flow-finish">Finish</Btn>
            </div>
          )}

          {screen === 2 && type === "support" && (
            <div data-testid="branch-support">
              <h3 style={{ marginTop: 0 }}>Describe the issue</h3>
              <Field label="Priority">
                <Select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Priority" data-testid="flow-priority">
                  {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                </Select>
              </Field>
              <Field label="What's happening?" error={err}>
                <Textarea value={detail} onChange={(e) => setDetail(e.target.value)} aria-label="What's happening?" data-testid="flow-detail" />
              </Field>
              <Btn variant="secondary" onClick={() => setScreen(1)}>Previous</Btn>
              <Btn onClick={finish} data-testid="flow-finish">Finish</Btn>
            </div>
          )}

          {screen === 3 && done && (
            <div data-testid="flow-success">
              <Banner tone="ok" title="Thanks — you're all set">
                We created {done.kind} <strong data-testid="created-record-id">{done.id}</strong>.
              </Banner>
              <Row label="Record type" value={done.kind} testId="created-type" />
              <Row label="Summary" value={done.summary} testId="created-summary" />
              <Badge tone="ok" testId="flow-complete">Flow completed</Badge>
            </div>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
