"use client";

function timeAgo(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const secs = Math.max(1, Math.floor((Date.now() - then) / 1000));
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function ActivityTimeline({ items, empty = "No recent activity." }) {
  if (!items || items.length === 0) {
    return <div className="cf-empty">{empty}</div>;
  }
  return (
    <ul className="cf-timeline">
      {items.map((a) => (
        <li key={a.id} className={a.type === "updated" ? "cf-ev-updated" : ""}>
          <div className="cf-tl-msg">{a.message}</div>
          <div className="cf-tl-time">{timeAgo(a.createdAt)}</div>
        </li>
      ))}
    </ul>
  );
}
