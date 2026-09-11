"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { NotionShell } from "./_shell";
import { Btn, Badge, Toggle, Card, Alert } from "@/app/components/eval/ui";

const SLUG = "q3-roadmap-8a1f";
const CONTENT = (<><h1 style={{ fontSize: 32 }}>🚀 Q3 Roadmap</h1><h2 style={{ fontSize: 20, marginTop: 14 }}>Themes</h2><ul><li>Self-serve onboarding</li><li>Usage-based billing</li><li>Two new regions</li></ul><p className="ee-small ee-muted">Last edited by Demo User · Sep 14, 2026</p></>);
const seed = () => ({ published: false, open: false });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [pub, setPub] = useState(null);
  useEffect(() => { setPub(new URLSearchParams(window.location.search).get("public")); }, []);
  if (pub) {
    const ok = pub === SLUG && s.published;
    return (
      <main className="ee-main ee-main--narrow" data-testid="public-view">
        <div className="ee-row ee-row--between" style={{ marginBottom: 16 }}><Badge tone={ok ? "ok" : "err"} data-testid="public-badge">{ok ? "Public page · viewing without signing in" : "Not published"}</Badge><span className="ee-small ee-muted">Built with Notionly · <a className="ee-link" href="#signup">Sign up</a></span></div>
        {ok ? <article data-testid="public-content">{CONTENT}</article> : <Alert tone="err" data-testid="public-missing">This page isn't published, or the link is no longer active.</Alert>}
      </main>
    );
  }
  const link = `https://demo.notionly.site/${SLUG}`;
  return (
    <NotionShell flow={flow} pages={[{ id: "r", title: "Q3 Roadmap", icon: "🚀" }]} active="r" topRight={<div style={{ position: "relative" }}><Btn size="sm" variant="secondary" onClick={() => set({ ...s, open: !s.open })} data-testid="share-btn">Share</Btn>{s.open && (
      <Card tight style={{ position: "absolute", right: 0, top: "110%", width: "min(340px, 80vw)", zIndex: 10 }} data-testid="share-popover">
        <div className="ee-strong" style={{ marginBottom: 6 }}>Publish</div>
        <div className="ee-row ee-row--between"><span className="ee-small">Publish to web</span><Toggle checked={s.published} label="Publish to web" onChange={(v) => set({ ...s, published: v })} data-testid="publish-toggle" /></div>
        {s.published ? (<div className="ee-stack" style={{ marginTop: 8 }}><div className="ee-small ee-mono" style={{ wordBreak: "break-all" }} data-testid="public-link">{link}</div><Btn size="sm" onClick={() => { window.location.href = `${window.location.pathname}?public=${SLUG}`; }} data-testid="open-public">Open public link</Btn></div>) : <div className="ee-tiny ee-muted" style={{ marginTop: 6 }}>Anyone with the link will be able to view this page.</div>}
      </Card>)}</div>}>
      {s.published && <Badge tone="ok" data-testid="published-badge">🌐 Published</Badge>}
      <div style={{ marginTop: 10 }}>{CONTENT}</div>
    </NotionShell>
  );
}
