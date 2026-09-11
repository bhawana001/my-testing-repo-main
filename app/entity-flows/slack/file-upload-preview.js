"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SlackShell } from "./_shell";
import { Composer, Message, fmtClock } from "@/app/components/engines/Feed";
import { Alert } from "@/app/components/eval/ui";

// Deterministic sample image rendered as an inline SVG data URL (no network).
const SAMPLE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='270'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#4a154b'/><stop offset='1' stop-color='#36c5f0'/></linearGradient></defs><rect width='480' height='270' fill='url(#g)'/><circle cx='120' cy='150' r='50' fill='#ecb22e'/><circle cx='240' cy='120' r='60' fill='#2eb67d'/><circle cx='360' cy='160' r='45' fill='#e01e5a'/><text x='24' y='44' font-family='Arial' font-size='26' fill='white'>Team offsite 2026</text></svg>`;
const SAMPLE_URL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(SAMPLE_SVG);
const SAMPLE = { name: "team-offsite.svg", size: "2 KB", kind: "image", url: SAMPLE_URL };
const seed = () => ({ messages: [{ id: "m1", author: "Priya Nair", time: "9:41 AM", text: "Share your photos from the offsite here 📸" }], seq: 2, downloaded: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  function send({ text, attachment }) {
    let att = attachment;
    if (att && !att.url && att.kind === "image") att = { ...att, url: SAMPLE_URL };
    set((st) => ({ ...st, seq: st.seq + 1, messages: [...st.messages, { id: "m" + st.seq, author: "Demo User", time: fmtClock(st.seq), text: text || "", attachment: att }] }));
  }
  function download(att) {
    const a = document.createElement("a"); a.href = att.url || SAMPLE_URL; a.download = att.name; document.body.appendChild(a); a.click(); a.remove();
    set((st) => ({ ...st, downloaded: att.name }));
  }
  return (
    <SlackShell flow={flow} active="design" header={<h1 style={{ fontSize: 18, marginBottom: 12 }}># design</h1>}>
      <div className="ee-feed" data-testid="message-list">
        {s.messages.map((m) => (
          <div key={m.id}>
            <Message msg={{ ...m, attachment: undefined }} />
            {m.attachment && (
              <div style={{ marginLeft: 44, marginTop: 6 }} data-testid={`file-${m.id}`}>
                {m.attachment.kind === "image" && <img src={m.attachment.url} alt={`Preview of ${m.attachment.name}`} style={{ maxWidth: 360, width: "100%", borderRadius: 8, border: "1px solid var(--ee-border)", display: "block" }} data-testid={`preview-${m.id}`} />}
                <div className="ee-row ee-small" style={{ marginTop: 4 }}><span>{m.attachment.name} · {m.attachment.size}</span><button className="ee-link" onClick={() => download(m.attachment)} data-testid={`download-${m.id}`}>Download</button></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {s.downloaded && <Alert tone="ok" data-testid="download-ok">Downloaded {s.downloaded}.</Alert>}
      <div style={{ marginTop: 14 }}><Composer onSend={send} placeholder="Message #design" allowAttach sampleFile={SAMPLE} testIdPrefix="composer" /></div>
    </SlackShell>
  );
}
