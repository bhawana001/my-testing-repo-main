"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, PAGES, VISITOR, OUTBOUND, useStore, matchingOutbound } from "../shared";

/**
 * A page simulator: pick which page the visitor is on and which plan they are
 * on, and only the outbound messages whose rules match actually appear.
 */
export default function Outbound() {
  const [s, update] = useStore();
  const [pageId, setPageId] = useState("pricing");
  const [plan, setPlan] = useState(VISITOR.plan);
  const [notice, setNotice] = useState(null);

  const shown = matchingOutbound(pageId, plan);

  function click(msg) {
    update((st) => {
      st.ctaClicks.unshift({ id: `clk_${st.ctaClicks.length + 1}`, message: msg.title, cta: msg.cta,
        page: pageId, at: "now" });
      return st;
    });
    setNotice({ tone: "ok", msg: `“${msg.cta}” clicked — the click is recorded against ${msg.title}.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Outbound messages" sub="Only messages whose audience and page rules match will show">
        {notice && <Banner tone={notice.tone} testId="cta-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Simulate the visitor">
          <Field label="Page they are on">
            <Select value={pageId} data-testid="page-select" aria-label="Page"
                    onChange={(e) => setPageId(e.target.value)}>
              {PAGES.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
            </Select>
          </Field>
          <Field label="Their plan">
            <Select value={plan} data-testid="plan-select" aria-label="Plan" onChange={(e) => setPlan(e.target.value)}>
              {["Free", "Pro", "Enterprise"].map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <Row label="Messages shown on this page" value={shown.length} testId="shown-count" />
        </Card>

        <Card title="What the visitor sees" testId="visitor-view">
          {shown.length === 0 && <Empty>No outbound message targets this page and plan.</Empty>}
          {shown.map((m) => (
            <div key={m.id} className="ck-tile" data-testid={`outbound-${m.id}`}>
              <strong data-testid={`outbound-title-${m.id}`}>{m.title}</strong>
              <p data-testid={`outbound-body-${m.id}`}>{m.body}</p>
              <Btn size="sm" data-testid={`cta-${m.id}`} onClick={() => click(m)}>{m.cta}</Btn>
            </div>
          ))}
        </Card>

        <Card title="Campaign rules" testId="campaign-rules">
          {OUTBOUND.map((m) => (
            <Row key={m.id} label={m.title}
                 value={`Page: ${PAGES.find((p) => p.id === m.page).label} · Audience: ${m.audience}`}
                 testId={`rule-${m.id}`} />
          ))}
        </Card>

        <Card title="CTA clicks" testId="click-log">
          <Row label="Clicks" value={s.ctaClicks.length} testId="click-count" />
          {s.ctaClicks.map((c) => (
            <Row key={c.id} label={c.message} value={`${c.cta} on ${c.page}`} testId={`click-${c.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
