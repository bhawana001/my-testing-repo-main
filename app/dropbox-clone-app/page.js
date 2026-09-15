"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Dropbaks" sub={`${s.files.length} files in ${Object.keys(s.folders).length} folders`}>
        <Card title="Account">
          <Row label="Files" value={s.files.length} testId="file-count" />
          <Row label="Share links" value={s.shareLinks.length} testId="link-count" />
          <Row label="File requests" value={s.fileRequests.length} testId="request-count" />
        </Card>
        <Card title="Folders">
          {Object.values(s.folders).map((f) => (
            <Row key={f.id} label={f.name} value={f.access === "edit" ? "Can edit" : "Can view"}
                 testId={`folder-access-${f.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
