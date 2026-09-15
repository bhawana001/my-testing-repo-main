"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, STAGES, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={s.baseName} sub="One base, four views">
        <Card title="Base summary">
          <Row label="Records" value={s.records.length} testId="record-count" />
          <Row label="Form submissions" value={s.formSubmissions} testId="form-count" />
          <Row label="Automation runs" value={s.runLog.length} testId="run-count" />
          {STAGES.map((st) => (
            <Row key={st} label={st} value={s.records.filter((r) => r.stage === st).length}
                 testId={`stage-count-${st.replace(/\s+/g, "-").toLowerCase()}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
