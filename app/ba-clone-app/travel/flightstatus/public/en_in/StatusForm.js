"use client";
// Flight status search, shared by the landing page and the /search/ results page.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { R, STATUS_DATES, prettyDate, AIRPORTS } from "../../../../shared";

const DAY = ["Yesterday", "Today", "Tomorrow"];

export default function StatusForm({ initial = {} }) {
  const router = useRouter();
  const [mode, setMode] = useState(initial.from ? "route" : "flight");
  const [flight, setFlight] = useState(initial.flight || "");
  const [from, setFrom] = useState(initial.from || "");
  const [to, setTo] = useState(initial.to || "");
  const [date, setDate] = useState(initial.date || STATUS_DATES[1]);
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const q = new URLSearchParams({ date });
    if (mode === "flight") {
      const f = flight.replace(/\s/g, "").toUpperCase();
      if (!/^(BX)?\d{1,4}$/.test(f)) { setErr("Enter a flight number, for example BX142"); return; }
      q.set("flight", f.startsWith("BX") ? f : "BX" + f);
    } else {
      if (!from || !to) { setErr("Choose both airports"); return; }
      if (from === to) { setErr("Choose two different airports"); return; }
      q.set("from", from); q.set("to", to);
    }
    setErr("");
    router.push(`${R.statusSearch}?${q}`);
  };

  return (
    <form className="bx-card" onSubmit={submit} noValidate aria-label="Flight status search">
      <div className="bx-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "flight"} className="bx-tab" data-on={mode === "flight" ? "true" : "false"} onClick={() => setMode("flight")}>Flight number</button>
        <button type="button" role="tab" aria-selected={mode === "route"} className="bx-tab" data-on={mode === "route" ? "true" : "false"} onClick={() => setMode("route")}>Route</button>
      </div>
      <div className="bx-grid" style={{ gridTemplateColumns: mode === "flight" ? "1fr 1fr auto" : "1fr 1fr 1fr auto", alignItems: "end" }}>
        {mode === "flight" ? (
          <div className="bx-f"><label htmlFor="flight">Flight number</label><input id="flight" className="bx-in" placeholder="e.g. BX142" value={flight} onChange={(e) => setFlight(e.target.value)} /></div>
        ) : (
          <>
            <div className="bx-f"><label htmlFor="sfrom">From</label><select id="sfrom" className="bx-in" value={from} onChange={(e) => setFrom(e.target.value)}><option value="">Select airport</option>{AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}</select></div>
            <div className="bx-f"><label htmlFor="sto">To</label><select id="sto" className="bx-in" value={to} onChange={(e) => setTo(e.target.value)}><option value="">Select airport</option>{AIRPORTS.map((a) => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}</select></div>
          </>
        )}
        <div className="bx-f"><label htmlFor="sdate">Date</label>
          <select id="sdate" className="bx-in" value={date} onChange={(e) => setDate(e.target.value)}>
            {STATUS_DATES.map((d, i) => <option key={d} value={d}>{DAY[i]} – {prettyDate(d)}</option>)}
          </select>
        </div>
        <button type="submit" className="bx-btn" style={{ height: 40 }}>Search</button>
      </div>
      {err && <div className="bx-err" role="alert">{err}</div>}
    </form>
  );
}
