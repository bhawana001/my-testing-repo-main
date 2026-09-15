"use client";
import { use } from "react";
import { Shell, Page, Card, Badge, Row, Empty } from "../../../clones/kit/ui";
import { BRAND, useStore } from "../../shared";

/**
 * The anonymous view of a share link. No nav, no sign-in, and no edit control —
 * "view only" has to be visibly true here, not just a label in the owner's UI.
 */
export default function SharedFile({ params }) {
  const { token: t } = use(params);
  const [s] = useStore();
  const link = s.shareLinks.find((l) => l.token === t) || null;
  const file = link ? s.files.find((f) => f.id === link.fileId) : null;

  if (!link || !file) {
    return (
      <Shell brand={BRAND}>
        <Page title="Link not found"><Empty>This share link is not valid.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Page title={file.name} sub="Shared with you — you are not signed in">
        <Card title="Preview" testId="shared-preview">
          <Badge tone="info" testId="shared-access">View only</Badge>
          <Row label="Owner" value={file.owner} testId="shared-owner" />
          <Row label="Size" value={file.size} />
          <pre className="ck-tile" data-testid="shared-content" style={{ whiteSpace: "pre-wrap" }}>{file.content}</pre>
          <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(file.content)}`} download={file.name}
             className="ck-btn ck-btn--secondary" data-testid="shared-download">Download</a>
          <p className="ck-muted" data-testid="no-edit-notice">
            Editing is not available on a view-only link.
          </p>
        </Card>
      </Page>
    </Shell>
  );
}
