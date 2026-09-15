"use client";
// Record edit behind a loading overlay (28.4). The save is deliberately async
// with a spinner, and the value must still be there after a reload -- which it
// is, because it is written to the store, not just local component state.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Select, Row, Badge, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, INDUSTRIES, USERS, useStore } from "../shared";

export default function AccountsPage() {
  const [s, update] = useStore();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  function startEdit(a) {
    setEditing(a.id);
    setDraft({ ...a });
    setNotice(null);
  }

  function save() {
    setSaving(true);
    // Deliberate delay so the save genuinely passes through a loading overlay.
    setTimeout(() => {
      update((st) => {
        const a = st.accounts.find((x) => x.id === editing);
        Object.assign(a, { industry: draft.industry, employees: Number(draft.employees) || 0,
                           phone: draft.phone, website: draft.website, owner: draft.owner });
        return st;
      });
      setSaving(false);
      setNotice(`Account ${draft.name} saved.`);
      setEditing(null);
    }, 900);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/leads`, label: "Leads" }]} />
      <Page title="Accounts" wide>
        {notice && <Banner tone="ok" testId="save-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        {s.accounts.map((a) => (
          <Card key={a.id} title={a.name} testId={`account-${a.id}`}
                actions={editing === a.id ? null : <Btn size="sm" variant="secondary" onClick={() => startEdit(a)} data-testid={`edit-${a.id}`}>Edit</Btn>}>
            {editing === a.id ? (
              <div style={{ position: "relative" }}>
                {saving && (
                  <div className="ck-modal-backdrop" style={{ position: "absolute", background: "rgba(255,255,255,.75)" }}
                       data-testid="saving-overlay">
                    <Badge tone="info">Saving…</Badge>
                  </div>
                )}
                <div className="ck-grid ck-grid--2">
                  <Field label="Industry">
                    <Select value={draft.industry} onChange={(e) => setDraft({ ...draft, industry: e.target.value })}
                            aria-label="Industry" data-testid="edit-industry">
                      {INDUSTRIES.map((x) => <option key={x}>{x}</option>)}
                    </Select>
                  </Field>
                  <Field label="Employees">
                    <Input value={draft.employees} onChange={(e) => setDraft({ ...draft, employees: e.target.value })}
                           inputMode="numeric" aria-label="Employees" data-testid="edit-employees" />
                  </Field>
                  <Field label="Phone">
                    <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                           aria-label="Phone" data-testid="edit-phone" />
                  </Field>
                  <Field label="Website">
                    <Input value={draft.website} onChange={(e) => setDraft({ ...draft, website: e.target.value })}
                           aria-label="Website" data-testid="edit-website" />
                  </Field>
                  <Field label="Account Owner">
                    <Select value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })}
                            aria-label="Account Owner" data-testid="edit-owner">
                      {USERS.map((x) => <option key={x}>{x}</option>)}
                    </Select>
                  </Field>
                </div>
                <div className="ck-card-actions">
                  <Btn variant="secondary" onClick={() => setEditing(null)} disabled={saving}>Cancel</Btn>
                  <Btn onClick={save} disabled={saving} data-testid="save-account">{saving ? "Saving…" : "Save"}</Btn>
                </div>
              </div>
            ) : (
              <>
                <Row label="Industry" value={a.industry} testId={`industry-${a.id}`} />
                <Row label="Employees" value={String(a.employees)} testId={`employees-${a.id}`} />
                <Row label="Phone" value={a.phone} testId={`phone-${a.id}`} />
                <Row label="Website" value={a.website} testId={`website-${a.id}`} />
                <Row label="Account Owner" value={a.owner} testId={`owner-${a.id}`} />
              </>
            )}
          </Card>
        ))}
      </Page>
    </Shell>
  );
}
