"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Badge, Empty, Banner, Select, Field } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, CHANNELS, ME, useStore, nextId } from "../shared";

/**
 * Sample images live as inline SVG data URIs so a preview can be asserted with
 * no network fetch and no binary checked into the repo. A real file picked from
 * disk works too and is read the same way.
 */
const SAMPLES = [
  { name: "checkout-spec.png", color: "#4a154b", label: "SPEC" },
  { name: "release-burndown.png", color: "#1264a3", label: "CHART" },
];
const svgFor = (s) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="${s.color}"/><text x="160" y="98" font-family="sans-serif" font-size="34" fill="#fff" text-anchor="middle">${s.label}</text></svg>`
  );

const MAX_BYTES = 400 * 1024;

export default function Files() {
  const [s, update] = useStore();
  const [channel, setChannel] = useState("general");
  const [notice, setNotice] = useState(null);

  function attach(name, url, size) {
    update((st) => {
      st.files.unshift({ id: nextId(st.counter++), name, url, size, channel, by: ME.name, at: "now" });
      st.messages[channel].push({
        id: nextId(st.counter++), user: ME.name, at: "now",
        text: `uploaded a file: ${name}`, replies: [],
      });
      return st;
    });
    setNotice({ tone: "ok", msg: `${name} uploaded to #${channel}` });
  }

  function onPick(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setNotice({ tone: "bad", msg: `${file.name} is larger than 400 KB — pick a smaller image.` });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => attach(file.name, String(reader.result), file.size);
    reader.readAsDataURL(file);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Files" sub="Upload an image and it previews inline in the channel">
        {notice && <Banner tone={notice.tone} testId="upload-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Upload">
          <Field label="Channel">
            <Select value={channel} data-testid="upload-channel" aria-label="Channel"
                    onChange={(e) => setChannel(e.target.value)}>
              {CHANNELS.map((c) => <option key={c.id} value={c.id}>#{c.name}</option>)}
            </Select>
          </Field>
          <input type="file" accept="image/*" onChange={onPick}
                 className="ck-input" data-testid="file-input" aria-label="Choose a file" />
          <div className="ck-card-actions">
            {SAMPLES.map((sm) => (
              <Btn key={sm.name} variant="secondary" data-testid={`sample-${sm.label.toLowerCase()}`}
                   onClick={() => attach(sm.name, svgFor(sm), 4096)}>
                Attach {sm.name}
              </Btn>
            ))}
          </div>
        </Card>

        <Card title="Uploaded files" testId="file-list">
          {s.files.length === 0 && <Empty>No files yet.</Empty>}
          {s.files.map((f) => (
            <div key={f.id} className="ck-row" data-testid={`file-${f.id}`}>
              <span>
                <strong data-testid={`file-name-${f.id}`}>{f.name}</strong>{" "}
                <Badge tone="neutral">#{f.channel}</Badge>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url} alt={f.name} className="ck-thumb"
                       data-testid={`preview-${f.id}`} style={{ maxWidth: 320 }} />
                </div>
              </span>
              <a href={f.url} download={f.name} data-testid={`download-${f.id}`} className="ck-btn ck-btn--ghost ck-btn--sm">
                Download
              </a>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
