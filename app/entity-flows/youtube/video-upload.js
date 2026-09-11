"use client";
import { useCallback } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, Btn, Alert } from "@/app/components/eval/ui";
import { DownloadProgress, Player } from "@/app/components/engines/Media";

const STEPS = [
  { id: "file", title: "Upload", heading: "Upload videos", render: ({ values, setValue, errors }) => (<div className="ee-stack">{values.file ? <Badge tone="info" data-testid="file-selected">🎞️ {values.file} · 00:42 · 18 MB</Badge> : <Btn variant="secondary" onClick={() => setValue("file", "demo-clip.mp4")} data-testid="select-sample">Select sample demo-clip.mp4</Btn>}{errors.file && <div className="ee-error">{errors.file}</div>}</div>), validate: (v) => (v.file ? null : { file: "Select a file to upload." }) },
  { id: "details", title: "Details", heading: "Details", fields: [{ name: "title", label: "Title (required)", required: true, validate: (v) => (v.length <= 100 ? null : "Max 100 characters.") }, { name: "description", label: "Description", type: "textarea" }, { name: "kids", label: "Is this video made for kids?", type: "radio-cards", required: true, options: [{ value: "no", label: "No, it's not made for kids" }, { value: "yes", label: "Yes, it's made for kids" }] }] },
  { id: "visibility", title: "Visibility", heading: "Visibility", fields: [{ name: "visibility", label: "Save or publish", type: "radio-cards", required: true, options: [{ value: "Public", label: "Public", desc: "Everyone can watch" }, { value: "Unlisted", label: "Unlisted", desc: "Anyone with the link can watch" }, { value: "Private", label: "Private", desc: "Only you can watch" }] }] },
];
const seed = () => ({ wiz: { ...SEED_WIZARD }, processing: 0, player: { position: 0, playing: false } });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const tick = useCallback((p) => set((st) => ({ ...st, processing: p })), [set]);
  const onPlayer = useCallback((p) => set((st) => ({ ...st, player: { ...st.player, ...p } })), [set]);
  return (
    <>
      <Topbar entity={ent} light nav={["Dashboard", "Content", "Analytics"]} active="Content" />
      <main className="ee-main ee-main--narrow">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u, processing: 0 }))} steps={STEPS} submitLabel="Publish" testIdPrefix="upload"
          onSubmit={(v) => ({ id: "yt_" + v.title.length + "Q8x", v })}
          result={({ id, v }) => (
            <Card data-testid="upload-result">
              {s.processing < 100 ? (<><div className="ee-strong" style={{ marginBottom: 6 }}>Processing “{v.title}”…</div><DownloadProgress progress={s.processing} active onTick={tick} step={25} tickMs={400} testIdPrefix="processing" /></>) : (<>
                <Alert tone="ok" data-testid="processing-done">Processing complete. Your video is {v.visibility.toLowerCase()}.</Alert>
                <div style={{ height: 8 }} />
                <Player title={v.title} subtitle="Demo Channel" duration={42} position={s.player.position} playing={s.player.playing} onChange={onPlayer} poster="📹" speed={1} testIdPrefix="watch" />
                <div className="ee-row" style={{ marginTop: 8 }}><Badge tone={v.visibility === "Public" ? "ok" : v.visibility === "Unlisted" ? "info" : "warn"} data-testid="visibility-badge">{v.visibility}</Badge><span className="ee-small ee-muted" data-testid="visibility-note">{v.visibility === "Private" ? "Only you can watch" : v.visibility === "Unlisted" ? "Anyone with the link: youtubely.test/watch?v=" + id : "Visible on your channel and in search"}</span></div>
              </>)}
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set(seed())}>Upload another</Btn>
            </Card>
          )} />
      </main>
    </>
  );
}
