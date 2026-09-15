"use client";
import Link from "next/link";
import { Shell, Page, Card, Badge, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Yootube" sub={`${s.videos.length} videos on this account`}>
        <Card title="Videos" testId="video-list">
          {s.videos.map((v) => (
            <div key={v.id} className="ck-row" data-testid={`video-${v.id}`}>
              <span>
                <Link href={`${BASE}/watch/${v.id}`} data-testid={`open-${v.id}`}><strong>{v.title}</strong></Link>
                <div className="ck-muted">{v.channel} · {v.views.toLocaleString()} views</div>
              </span>
              <span>
                <Badge tone={v.status === "Ready" ? "ok" : "warn"} testId={`status-${v.id}`}>{v.status}</Badge>{" "}
                <Badge tone="neutral" testId={`visibility-${v.id}`}>{v.visibility}</Badge>
              </span>
            </div>
          ))}
        </Card>
        <Card title="Account">
          <Row label="Premium" value={s.premium ? "Active" : "Not active"} testId="premium-state" />
          <Row label="Memberships" value={s.memberships.length} testId="membership-count" />
        </Card>
      </Page>
    </Shell>
  );
}
