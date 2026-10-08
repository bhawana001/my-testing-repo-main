"use client";
// Flight status results for ?flight=BX142&date=... or ?from=DEL&to=LHR&date=...
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header, Footer } from "../../../../../ui";
import { R, STATUSES, STATUS_DATES, airport, prettyDate, useStore } from "../../../../../shared";
import StatusForm from "../StatusForm";

const TONE = { "On time": "ok", Landed: "ok", Departed: "info", Delayed: "warn", Cancelled: "err" };

function Results() {
  useStore();
  const p = useSearchParams();
  const flight = (p.get("flight") || "").toUpperCase();
  const from = p.get("from") || "", to = p.get("to") || "";
  const date = STATUS_DATES.includes(p.get("date")) ? p.get("date") : STATUS_DATES[1];
  const rows = STATUSES.filter((x) => x.date === date && (flight ? x.flight === flight : x.from === from && x.to === to));
  const what = flight || (airport(from) && airport(to) ? `${airport(from).city} to ${airport(to).city}` : "your search");

  return (
    <div className="bx-wrap bx-page">
      <div className="bx-crumb"><Link href={R.home}>Home</Link> › <Link href={R.status}>Flight status</Link> › Results</div>
      <h1 className="bx-h1">Flight status: {what}</h1>
      <p className="bx-lead">{prettyDate(date)} · times are local to each airport.</p>
      <StatusForm key={p.toString()} initial={{ flight, from, to, date }} />
      {rows.length === 0 ? (
        <div className="bx-banner bx-banner--warn" role="status">We couldn't find any flights for {what} on {prettyDate(date)}.</div>
      ) : rows.map((x) => (
        <div className="bx-card" key={x.flight + x.date} data-testid={`status-${x.flight}`}>
          <div className="bx-between">
            <h2 style={{ margin: 0 }}>{x.flight} · {airport(x.from).city} to {airport(x.to).city}</h2>
            <span className={`bx-tag bx-tag--${TONE[x.status]}`} data-testid="status-tag">{x.status}</span>
          </div>
          <dl className="bx-dl" style={{ marginTop: 12 }}>
            <dt>Scheduled departure</dt><dd>{x.sched} from {airport(x.from).name} (T{x.terminal})</dd>
            <dt>{x.status === "Departed" || x.status === "Landed" ? "Actual departure" : "Estimated departure"}</dt><dd data-testid="est-dep">{x.est}</dd>
            <dt>{x.status === "Landed" ? "Arrived" : "Estimated arrival"}</dt><dd>{x.arr}</dd>
            <dt>Gate</dt><dd>{x.gate}</dd>
          </dl>
          {x.note && <p className="bx-small" style={{ marginBottom: 0 }}><b>Update:</b> {x.note}</p>}
        </div>
      ))}
    </div>
  );
}

export default function StatusSearch() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="bx-wrap bx-page">Loading…</div>}><Results /></Suspense>
      <Footer />
    </>
  );
}
