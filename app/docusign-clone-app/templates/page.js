"use client";
// Templates (43.3). Sending from one carries its subject, message and fields
// into the new envelope.
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../../clones/kit/ui";
import { BRAND, BASE, TEMPLATES } from "../shared";

export default function TemplatesPage() {
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Envelopes" }, { href: `${BASE}/send`, label: "Send envelope" }]} />
      <Page title="Templates" sub="Reusable documents with fields already placed">
        <div className="ck-grid ck-grid--2">
          {TEMPLATES.map((t) => (
            <Card key={t.id} title={t.name} testId={`template-${t.id}`}>
              <div className="ck-muted">{t.message}</div>
              <Row label="Subject" value={t.subject} testId={`tpl-subject-${t.id}`} />
              <Row label="Fields" value={t.fields.map((f) => f.label).join(", ")} testId={`tpl-fields-${t.id}`} />
              <Badge tone="info">{t.fields.length} fields prefilled</Badge>
              <Btn as="link" href={`${BASE}/send?tpl=${t.id}`} block style={{ marginTop: 10 }} data-testid={`use-${t.id}`}>
                Use this template
              </Btn>
            </Card>
          ))}
        </div>
      </Page>
    </Shell>
  );
}
