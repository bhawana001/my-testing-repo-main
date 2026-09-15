"use client";
import { use, useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, CHANNEL, ME, useStore, nextId, sortComments, visibleToVisitor, entitled } from "../../shared";

export default function Watch({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [text, setText] = useState("");
  const [as, setAs] = useState("owner");
  const [notice, setNotice] = useState(null);

  const video = s.videos.find((v) => v.id === id) || null;
  const comments = video ? sortComments(s.comments.filter((c) => c.videoId === id)) : [];
  const isCreator = as === "owner";
  const visitorCanSee = video ? visibleToVisitor(video, true) : false;

  function postComment() {
    const body = text.trim();
    if (!body) return;
    update((st) => {
      st.comments.push({
        id: nextId(st.counter++), videoId: id,
        by: isCreator ? CHANNEL.owner : ME.name, text: body, pinned: false, likes: 0,
      });
      return st;
    });
    setText("");
    setNotice({ tone: "ok", msg: "Comment posted." });
  }

  function pin(commentId) {
    if (!isCreator) {
      setNotice({ tone: "bad", msg: "Only the channel owner can pin a comment." });
      return;
    }
    update((st) => {
      for (const c of st.comments) if (c.videoId === id) c.pinned = c.id === commentId;
      return st;
    });
    setNotice({ tone: "ok", msg: "Comment pinned to the top." });
  }

  if (!video) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Video unavailable"><Empty>No video with that id.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={video.title} sub={`${video.channel} · ${video.views.toLocaleString()} views`} wide>
        {notice && <Banner tone={notice.tone} testId="watch-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Player" testId="player">
          {video.status !== "Ready" ? (
            <Banner tone="warn" testId="processing-notice">
              This video is still processing and cannot be played yet.
            </Banner>
          ) : (
            <div className="ck-tile" data-testid="player-surface"
                 style={{ minHeight: 180, display: "grid", placeItems: "center", background: "#111", color: "#fff" }}>
              <span style={{ fontSize: 38 }}>▶</span>
              <strong>Playing — {video.title}</strong>
            </div>
          )}
          <Row label="Visibility" value={video.visibility} testId="video-visibility" />
          <Row label="Status" value={video.status} testId="video-status" />
          <Row label="Background play"
               value={entitled(s, "background") ? "Available" : "Premium only"} testId="background-play" />
          <Badge tone={visitorCanSee ? "ok" : "warn"} testId="visitor-access">
            {video.visibility === "public"
              ? "A signed-out visitor can find and watch this"
              : video.visibility === "unlisted"
                ? "A signed-out visitor can watch this only with the link"
                : "A signed-out visitor cannot watch this"}
          </Badge>
        </Card>

        <Card title="Comments" testId="comments">
          <Field label="Commenting as">
            <Select value={as} data-testid="comment-as" aria-label="Commenting as"
                    onChange={(e) => setAs(e.target.value)}>
              <option value="owner">{CHANNEL.owner} (channel owner)</option>
              <option value="viewer">{ME.name} (viewer)</option>
            </Select>
          </Field>
          <Row label="Comment count" value={comments.length} testId="comment-count" />
          {comments.length === 0 && <Empty>No comments yet.</Empty>}
          {comments.map((c, i) => (
            <div key={c.id} className="ck-row" data-testid={`comment-${i}`}>
              <span>
                {c.pinned && <Badge tone="ok" testId={`pinned-${c.id}`}>Pinned by the creator</Badge>}
                <strong data-testid={`comment-author-${i}`}>{c.by}</strong>
                <div data-testid={`comment-text-${i}`}>{c.text}</div>
                <span className="ck-muted">{c.likes} likes</span>
              </span>
              <Btn size="sm" variant="ghost" data-testid={`pin-${c.id}`} disabled={!isCreator}
                   onClick={() => pin(c.id)}>
                {c.pinned ? "Pinned" : "Pin"}
              </Btn>
            </div>
          ))}
          <div className="ck-card-actions">
            <Input value={text} placeholder="Add a comment" data-testid="comment-input" aria-label="Comment"
                   onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && postComment()} />
            <Btn onClick={postComment} data-testid="post-comment">Comment</Btn>
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
