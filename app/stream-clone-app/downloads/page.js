"use client";
// Offline downloads (47.4). A download runs through queued -> downloading ->
// downloaded and only then is the episode playable offline. The plan's device
// limit is enforced, which is what makes it a real constraint.
import { useEffect, useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Empty } from "../../clones/kit/ui";
import { EPISODES, findPlan, useStore } from "../account-store";
import { BASE } from "../lib";

const BRAND = { name: "STREAMFLIX", slug: "netflix", mark: "▶", home: BASE, accent: "#e50914", accentText: "#fff", bg: "#f5f5f5" };

export default function DownloadsPage() {
  const [s, update] = useStore();
  const [busy, setBusy] = useState(null);
  const [err, setErr] = useState("");

  const plan = s.membership.planId ? findPlan(s.membership.planId) : null;
  const limit = plan ? plan.downloads : 1;

  // Simulated download progress: queued -> downloading -> downloaded.
  useEffect(() => {
    if (!busy) return;
    const t1 = setTimeout(() => {
      update((st) => {
        const d = st.downloads.find((x) => x.id === busy);
        if (d) d.status = "downloading";
        return st;
      });
    }, 400);
    const t2 = setTimeout(() => {
      update((st) => {
        const d = st.downloads.find((x) => x.id === busy);
        if (d) { d.status = "downloaded"; d.playable = true; }
        return st;
      });
      setBusy(null);
    }, 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [busy, update]);

  function download(ep) {
    if (s.downloads.length >= limit) {
      setErr(`Your ${plan ? plan.name : "current"} plan allows ${limit} download${limit === 1 ? "" : "s"}. Remove one first.`);
      return;
    }
    setErr("");
    update((st) => {
      st.downloads.push({ id: ep.id, label: ep.label, size: ep.size, status: "queued", playable: false });
      return st;
    });
    setBusy(ep.id);
  }
  const remove = (id) => update((st) => { st.downloads = st.downloads.filter((d) => d.id !== id); return st; });

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Browse" }, { href: `${BASE}/account`, label: "Account" }]} />
      <Page title="Downloads" sub={plan ? `${plan.name} plan · ${limit} download device${limit === 1 ? "" : "s"}` : "No active plan"}>
        {err && <Banner tone="warn" testId="download-limit" onClose={() => setErr("")}>{err}</Banner>}

        <Card title="Available to download" testId="episode-list">
          {EPISODES.map((ep) => {
            const existing = s.downloads.find((d) => d.id === ep.id);
            return (
              <div key={ep.id} className="ck-row" data-testid={`episode-${ep.id}`}>
                <span>
                  <strong>{ep.label}</strong>
                  <span className="ck-muted"> · {ep.size} · {ep.runtime} min</span>
                </span>
                <span>
                  {existing
                    ? <Badge tone={existing.status === "downloaded" ? "ok" : "warn"} testId={`status-${ep.id}`}>{existing.status}</Badge>
                    : <Btn size="sm" onClick={() => download(ep)} data-testid={`download-${ep.id}`}>Download</Btn>}
                </span>
              </div>
            );
          })}
        </Card>

        <Card title={`On this device (${s.downloads.length}/${limit})`} testId="downloads-list">
          {s.downloads.length === 0 ? <Empty>Nothing downloaded yet.</Empty> : s.downloads.map((d) => (
            <div key={d.id} className="ck-row" data-testid={`download-${d.id}`}>
              <span>
                <strong>{d.label}</strong>
                <div className="ck-muted">{d.size}</div>
                <Badge tone={d.status === "downloaded" ? "ok" : "warn"} testId={`dl-status-${d.id}`}>{d.status}</Badge>
                {d.playable && <> <Badge tone="info" testId={`playable-${d.id}`}>Playable offline</Badge></>}
              </span>
              <span>
                <Btn size="sm" variant="ghost" onClick={() => remove(d.id)} data-testid={`remove-${d.id}`}>Remove</Btn>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
