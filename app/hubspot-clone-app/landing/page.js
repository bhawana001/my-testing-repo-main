"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Field, Banner, Row } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, nextId } from "../shared";

/** The public landing page. No CRM chrome — a visitor never sees it. */
export default function Landing() {
  const [s, update] = useStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  function submit() {
    if (!firstName.trim() || !email.includes("@")) {
      setError("A first name and a valid email are both required.");
      return;
    }
    const contact = {
      id: nextId("c", s.counter),
      firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(),
      company: company.trim(), phone: phone.trim(), source: "Landing page form",
      timeline: [{ at: "2026-09-16", text: "Contact created from the landing page form" }],
    };
    update((st) => { st.contacts.push(contact); st.counter += 1; return st; });
    setError(null);
    setDone(contact);
  }

  return (
    <Shell brand={BRAND}>
      <Page title="The 2026 operations benchmark report" sub="Fill in the form to download it">
        {error && <Banner tone="bad" testId="form-error">{error}</Banner>}

        {!done && (
          <Card title="Get the report" testId="landing-form">
            <Field label="First name">
              <Input value={firstName} data-testid="form-first-name" aria-label="First name"
                     onChange={(e) => setFirstName(e.target.value)} />
            </Field>
            <Field label="Last name">
              <Input value={lastName} data-testid="form-last-name" aria-label="Last name"
                     onChange={(e) => setLastName(e.target.value)} />
            </Field>
            <Field label="Work email">
              <Input value={email} data-testid="form-email" aria-label="Email"
                     onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Company">
              <Input value={company} data-testid="form-company" aria-label="Company"
                     onChange={(e) => setCompany(e.target.value)} />
            </Field>
            <Field label="Phone" hint="Optional">
              <Input value={phone} data-testid="form-phone" aria-label="Phone"
                     onChange={(e) => setPhone(e.target.value)} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={submit} data-testid="form-submit">Download the report</Btn>
            </div>
          </Card>
        )}

        {done && (
          <Card title="Thanks — your download is on its way" tone="ok" testId="form-confirmation">
            <Row label="Contact created" value={`${done.firstName} ${done.lastName}`.trim()} testId="created-name" />
            <Row label="Email" value={done.email} testId="created-email" />
            <Row label="Company" value={done.company || "—"} testId="created-company" />
            <Row label="Original source" value={done.source} testId="created-source" />
            <div className="ck-card-actions">
              <Link href={`${BASE}/contacts`} className="ck-btn ck-btn--primary" data-testid="view-in-crm">
                See the contact in the CRM
              </Link>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
