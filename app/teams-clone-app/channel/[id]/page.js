"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Badge, Banner } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, BASE, TEAM_CHANNELS, PEOPLE, ME, useStore, nextId, parseMentions } from "../../shared";

export default function Channel({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState(null);

  const ch = TEAM_CHANNELS.find((c) => c.id === id) || TEAM_CHANNELS[0];
  const posts = s.posts[ch.id] || [];

  function post() {
    const text = draft.trim();
    if (!text) return;
    const mentions = parseMentions(text);
    update((st) => {
      const pid = nextId(st.counter++);
      st.posts[ch.id].push({ id: pid, user: ME.name, text, mentions, at: "now", replies: [] });
      for (const name of mentions) {
        st.activity.unshift({
          id: nextId(st.counter++), to: name, from: ME.name, channel: ch.name,
          text, postId: pid, channelId: ch.id, read: false, at: "now",
        });
      }
      return st;
    });
    setNotice(mentions.length
      ? { tone: "ok", msg: `Posted — ${mentions.join(", ")} notified in Activity.` }
      : { tone: "info", msg: "Posted with no mentions." });
    setDraft("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={ch.name} sub={ch.team}>
        {notice && <Banner tone={notice.tone} testId="post-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Posts" testId="post-list">
          {posts.map((p) => (
            <div key={p.id} className="ck-row" data-testid={`post-${p.id}`}>
              <span>
                <strong>{p.user}</strong> <span className="ck-muted">{p.at}</span>
                <div>{p.text}</div>
                {p.mentions.map((m) => (
                  <Badge key={m} tone="info" testId={`mention-${m.split(" ")[0].toLowerCase()}`}>@{m}</Badge>
                ))}
              </span>
            </div>
          ))}
          <div className="ck-card-actions">
            <Input value={draft} placeholder="Start a post — type @ to mention someone"
                   data-testid="composer" aria-label="Post text"
                   onChange={(e) => setDraft(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && post()} />
            <Btn onClick={post} data-testid="post-send">Post</Btn>
          </div>
          <div className="ck-muted">
            Mention someone:{" "}
            {PEOPLE.filter((p) => p.id !== ME.id).map((p) => (
              <button key={p.id} className="ck-btn ck-btn--ghost ck-btn--sm"
                      data-testid={`mention-add-${p.name.split(" ")[0].toLowerCase()}`}
                      onClick={() => setDraft((d) => `${d}@${p.name} `)}>
                @{p.name}
              </button>
            ))}
          </div>
        </Card>

        <p className="ck-muted">
          {TEAM_CHANNELS.filter((c) => c.id !== ch.id).map((c) => (
            <Link key={c.id} href={`${BASE}/channel/${c.id}`}>{c.name}</Link>
          ))}
        </p>
      </Page>
    </Shell>
  );
}
