"use client";
import { useState } from "react";
import { sendEmail } from "@/lib/inbox";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Field, Input, Select, Check, Alert, KV, Badge } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";

const seed = () => ({ meeting: null, view: "schedule", registrants: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ topic: "", date: "2026-09-24", time: "15:00", duration: "60", reg: true }); const [err, setErr] = useState(null);
  const [r, setR] = useState({ first: "", last: "", email: "" }); const [rErr, setRErr] = useState(null);
  function save() { if (!f.topic.trim()) { setErr("Topic is required."); return; } setErr(null); set({ ...s, meeting: { id: "851 2204 7731", ...f, topic: f.topic.trim(), link: `zoomly.test/meeting/register/8512204` }, view: "details" }); }
  function register() {
    if (!r.first.trim() || !r.last.trim() || !isValidEmail(r.email)) { setRErr("First name, last name and a valid email are required."); return; }
    if (s.registrants.some((x) => x.email === r.email.trim())) { setRErr("This email is already registered."); return; }
    setRErr(null); sendEmail({ to: r.email.trim(), subject: `Registration confirmed: ${m.topic}`, body: `Hi ${r.first}, you are registered for ${m.topic} on ${m.date} ${m.time}.\nJoin: zoomly.test/j/85122047731?tk=DEMO`, from: "no-reply@zoomly.evals.dev", flow: "zoom/meeting-registration" }); set({ ...s, registrants: [...s.registrants, { ...r, email: r.email.trim() }], view: "registered" });
  }
  const m = s.meeting;
  return (
    <SaasShell flow={flow} nav={["Home", "Meetings", "Webinars", "Recordings"]} active="Meetings" title={s.view === "register" || s.view === "registered" ? "Meeting Registration" : m ? m.topic : "Schedule Meeting"}>
      {s.view === "schedule" && (
        <Card style={{ maxWidth: 600 }} data-testid="schedule-form">
          <div className="ee-stack">
            <Field label="Topic" htmlFor="zm-topic"><Input id="zm-topic" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} placeholder="Product launch webinar" /></Field>
            <div className="ee-grid ee-grid--3"><Field label="Date" htmlFor="zm-date"><Input id="zm-date" type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></Field><Field label="Time" htmlFor="zm-time"><Input id="zm-time" type="time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} /></Field><Field label="Duration (min)" htmlFor="zm-dur"><Select id="zm-dur" value={f.duration} onChange={(e) => setF({ ...f, duration: e.target.value })}>{["30", "45", "60", "90"].map((d) => <option key={d}>{d}</option>)}</Select></Field></div>
            <Check label="Registration required" checked={f.reg} onChange={(e) => setF({ ...f, reg: e.target.checked })} />
            {err && <Alert tone="err">{err}</Alert>}
            <Btn onClick={save} data-testid="save-meeting">Save</Btn>
          </div>
        </Card>
      )}
      {s.view === "details" && m && (
        <Card style={{ maxWidth: 640 }} data-testid="meeting-details">
          <KV k="Topic" v={m.topic} /><KV k="Time" v={`${m.date} ${m.time} (${m.duration} min)`} /><KV k="Meeting ID" v={m.id} />
          <KV k="Registration" v={m.reg ? <Badge tone="ok">Required</Badge> : "Not required"} testId="reg-required" />
          {m.reg && <KV k="Registration link" v={<span className="ee-mono" style={{ wordBreak: "break-all" }} data-testid="reg-link">https://{m.link}</span>} />}
          <KV k="Registrants" v={s.registrants.length} testId="reg-count" />
          {m.reg && <Btn style={{ marginTop: 10 }} onClick={() => set({ ...s, view: "register" })} data-testid="open-reg-link">Open registration link</Btn>}
        </Card>
      )}
      {s.view === "register" && m && (
        <Card style={{ maxWidth: 520 }} data-testid="reg-form">
          <div className="ee-strong">{m.topic}</div><div className="ee-small ee-muted" style={{ marginBottom: 10 }}>{m.date} · {m.time} · {m.duration} minutes</div>
          <div className="ee-stack">
            <Field label="First name *" htmlFor="rg-first"><Input id="rg-first" value={r.first} onChange={(e) => setR({ ...r, first: e.target.value })} /></Field>
            <Field label="Last name *" htmlFor="rg-last"><Input id="rg-last" value={r.last} onChange={(e) => setR({ ...r, last: e.target.value })} /></Field>
            <Field label="Email *" htmlFor="rg-email"><Input id="rg-email" type="email" value={r.email} onChange={(e) => setR({ ...r, email: e.target.value })} /></Field>
            {rErr && <Alert tone="err">{rErr}</Alert>}
            <Btn onClick={register} data-testid="register-btn">Register</Btn>
          </div>
        </Card>
      )}
      {s.view === "registered" && m && (
        <Card style={{ maxWidth: 560 }} data-testid="reg-confirmed">
          <Badge tone="ok">Registration approved</Badge>
          <h2 style={{ margin: "8px 0" }}>You're registered, {s.registrants.at(-1).first}!</h2>
          <KV k="Meeting" v={m.topic} /><KV k="When" v={`${m.date} ${m.time}`} /><KV k="Your join link" v={<span className="ee-mono" style={{ wordBreak: "break-all" }}>zoomly.test/j/85122047731?tk=DEMO</span>} testId="join-link" />
          <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ ...s, view: "details" })} data-testid="back-to-meeting">Back to meeting (host)</Btn>
        </Card>
      )}
    </SaasShell>
  );
}
