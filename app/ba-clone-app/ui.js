"use client";
// Shared chrome for the Britannic Airways clone: header, footer and the flight
// search widget used on the home page and every destination page.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BRAND, R, TODAY, airport, airportLabel, matchAirports, CABINS, PAX_TYPES, paxCount, useStore, addDays } from "./shared";

export function Logo() {
  return (
    <Link href={R.home} className="bx-logo" aria-label={`${BRAND.name} home`}>
      <span>BRITANNIC AIRWAYS</span>
      <svg width="30" height="12" viewBox="0 0 30 12" aria-hidden="true">
        <path d="M1 9 C9 2, 20 1, 29 2 C21 4, 14 7, 9 11 Z" fill="#c8102e" />
        <path d="M5 10 C12 6, 20 4, 28 4" stroke="#fff" strokeWidth="1" fill="none" />
      </svg>
    </Link>
  );
}

export function Header({ over = false }) {
  const [s, update] = useStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const links = [
    ["Discover", R.offers], ["Book", R.home], ["Manage", R.manage], ["Help", R.help],
  ];
  return (
    <header className={"bx-head" + (over ? " bx-head--over" : "")}>
      <div className="bx-wrap bx-head__in">
        <button className="bx-burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>☰</button>
        <nav className="bx-nav" aria-label="Main">
          {links.map(([t, h]) => <Link key={t} href={h}>{t}</Link>)}
          <Link href={R.help}>⌕ Search</Link>
        </nav>
        <Logo />
        <div className="bx-head__right">
          {s.user ? (
            <>
              <Link href={R.account} className="bx-login" data-testid="header-account">{s.user.first}</Link>
              <button className="bx-linkbtn" style={{ color: "#fff" }} onClick={() => { update((d) => ({ ...d, user: null })); router.push(R.home); }}>Log out</button>
            </>
          ) : (
            <Link href={R.login} className="bx-login">Log in</Link>
          )}
          <span className="bx-globe" title="India - English" />
        </div>
      </div>
      <div className="bx-menu" data-open={open ? "true" : "false"}>
        {links.map(([t, h]) => <Link key={t} href={h}>{t}</Link>)}
        <Link href={R.checkin}>Check in</Link>
        <Link href={R.status}>Flight status</Link>
      </div>
    </header>
  );
}

export function Footer() {
  const cols = [
    ["About Britannic Airways", [["About us", R.offers], ["Sustainability", R.offers], ["Environmental policy", R.help], ["Modern Slavery statement", R.help], ["Careers", R.help]]],
    ["Support", [["Help and contacts", R.help], ["Customer commitment", R.help], ["Accessibility and site help", R.help], ["Flight status", R.status]]],
    ["Policies", [["Privacy policy", R.help], ["Legal", R.help], ["Website security", R.help], ["Cookie policy", R.help]]],
    ["More", [["Flights", R.offers], ["Manage booking", R.manage], ["Check in", R.checkin]]],
  ];
  return (
    <footer className="bx-foot">
      <div className="bx-wrap">
        <div className="bx-foot__cols">
          {cols.map(([h, items]) => (
            <div key={h}><h4>{h}</h4>{items.map(([t, href]) => <Link key={t} href={href}>{t}</Link>)}</div>
          ))}
        </div>
        <div className="bx-foot__bar">
          <svg width="52" height="16" viewBox="0 0 30 12" aria-hidden="true"><path d="M1 9 C9 2, 20 1, 29 2 C21 4, 14 7, 9 11 Z" fill="#c8102e" /></svg>
          <div className="bx-social" aria-label="Social links"><span>f</span><span>◎</span><span>in</span><span>♪</span><span>𝕏</span><span>▶</span></div>
        </div>
        <div className="bx-foot__bar" style={{ border: 0, marginTop: 0 }}>
          <span>© Britannic Airways - all rights reserved. A demo clone for test automation.</span>
          <a href="#">India - English</a>
        </div>
      </div>
    </footer>
  );
}

export function AirportField({ id, label, placeholder, value, onChange, exclude, error }) {
  const [text, setText] = useState(value ? airportLabel(airport(value)) : "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => { setText(value ? airportLabel(airport(value)) : ""); }, [value]);
  const list = matchAirports(text).filter((a) => a.code !== exclude && (!value || airportLabel(a) !== text));
  const pick = (a) => { onChange(a.code); setText(airportLabel(a)); setOpen(false); };
  return (
    <div className="bx-f bx-ac">
      <label htmlFor={id}>{label}</label>
      <input
        id={id} className="bx-in" placeholder={placeholder} value={text} autoComplete="off"
        aria-invalid={error ? "true" : "false"} role="combobox" aria-expanded={open && list.length > 0}
        onChange={(e) => { setText(e.target.value); onChange(""); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => {
          setOpen(false);
          // A typed city that matches exactly one airport counts as picked.
          const m = matchAirports(text).filter((a) => a.code !== exclude);
          if (!value && m.length === 1) pick(m[0]);
        }, 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, list.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
          if (e.key === "Enter" && open && list[active]) { e.preventDefault(); pick(list[active]); }
        }}
      />
      {open && list.length > 0 && (
        <ul role="listbox" aria-label={`${label} suggestions`}>
          {list.map((a, i) => (
            <li key={a.code}><button type="button" role="option" aria-selected={i === active} data-active={i === active ? "true" : "false"} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(a)}>{airportLabel(a)}</button></li>
          ))}
        </ul>
      )}
      {error && <div className="bx-err">{error}</div>}
    </div>
  );
}

export function PaxPicker({ pax, setPax }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const summary = PAX_TYPES.filter((t) => pax[t.id]).map((t) => {
    const n = pax[t.id];
    const one = { ad: "Adult", ya: "Young adult", ch: "Child", inf: "Infant" }[t.id];
    return `${n} ${n === 1 ? one : t.label}`;
  }).join(", ");
  const set = (id, d) => setPax((p) => {
    const next = { ...p, [id]: Math.max(0, (p[id] || 0) + d) };
    if (next.ad < 1) next.ad = 1;
    if (next.inf > next.ad) next.inf = next.ad;
    return next;
  });
  return (
    <div className="bx-f bx-pax" ref={ref}>
      <label htmlFor="pax-btn">Select passengers</label>
      <button id="pax-btn" type="button" className="bx-in" style={{ textAlign: "left", cursor: "pointer" }} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {summary} <span style={{ float: "right" }}>⌄</span>
      </button>
      {open && (
        <div className="bx-pax__pop" role="dialog" aria-label="Passengers">
          {PAX_TYPES.map((t) => (
            <div className="bx-pax__row" key={t.id}>
              <div>{t.label}<small>{t.hint}</small></div>
              <div className="bx-step">
                <button type="button" aria-label={`Remove ${t.label}`} disabled={(t.id === "ad" && pax.ad <= 1) || !pax[t.id]} onClick={() => set(t.id, -1)}>−</button>
                <span data-testid={`pax-${t.id}`}>{pax[t.id] || 0}</span>
                <button type="button" aria-label={`Add ${t.label}`} disabled={paxCount(pax) >= 9 || (t.id === "inf" && pax.inf >= pax.ad)} onClick={() => set(t.id, 1)}>+</button>
              </div>
            </div>
          ))}
          <p className="bx-small bx-muted" style={{ margin: "6px 0 10px" }}>Up to 9 passengers. Each infant travels on an adult's lap.</p>
          <button type="button" className="bx-btn bx-btn--wide" onClick={() => setOpen(false)}>Done</button>
        </div>
      )}
    </div>
  );
}

export function SearchWidget({ defaultTo = "", lift = false }) {
  const router = useRouter();
  const [tab, setTab] = useState("flights");
  const [trip, setTrip] = useState("return");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(defaultTo);
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [cabinId, setCabin] = useState("M");
  const [pax, setPax] = useState({ ad: 1, ya: 0, ch: 0, inf: 0 });
  const [err, setErr] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!from) x.from = "Please choose where you are flying from";
    if (!to) x.to = "Please choose where you are flying to";
    if (from && to && from === to) x.to = "Departure and destination must be different";
    if (from && to && !airport(from).india && !airport(to).india) x.to = "We only sell flights to and from India on this site";
    if (!depart) x.depart = "Please choose a departure date";
    else if (depart < TODAY) x.depart = "Departure date can't be in the past";
    if (trip === "return") {
      if (!ret) x.ret = "Please choose a return date";
      else if (depart && ret < depart) x.ret = "Return date must be after your departure date";
    }
    setErr(x);
    if (Object.keys(x).length) return;
    const q = new URLSearchParams({ from, to, trip, depart, cabin: cabinId, ad: pax.ad, ya: pax.ya, ch: pax.ch, inf: pax.inf });
    if (trip === "return") q.set("return", ret);
    router.push(`${R.book}?${q}`);
  };

  return (
    <form className={"bx-search" + (lift ? " bx-search--lift" : "")} onSubmit={submit} noValidate aria-label="Flight search">
      <div className="bx-tabs" role="tablist">
        {[["flights", "✈ Flights"], ["hotel", "Flight + Hotel"], ["car", "Flight + Car"], ["multi", "Multi-city"]].map(([id, t]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className="bx-tab" data-on={tab === id ? "true" : "false"} onClick={() => setTab(id)}>{t}</button>
        ))}
        <a className="bx-car" href="#" onClick={(e) => e.preventDefault()}>Find a car →</a>
      </div>
      {tab !== "flights" ? (
        <div className="bx-banner">Flight + Hotel, Flight + Car and Multi-city bookings aren't available in this demo. Use <button type="button" className="bx-linkbtn" onClick={() => setTab("flights")}>Flights</button> instead.</div>
      ) : (
        <>
          <div className="bx-grid bx-grid--a">
            <div className="bx-f">
              <label htmlFor="trip">Trip type</label>
              <select id="trip" className="bx-in" value={trip} onChange={(e) => setTrip(e.target.value)}>
                <option value="return">Return trip</option>
                <option value="one">One way</option>
              </select>
            </div>
            <AirportField id="from" label="From" placeholder="Departure city" value={from} onChange={setFrom} exclude={to} error={err.from} />
            <AirportField id="to" label="To" placeholder="Where can we take you?" value={to} onChange={setTo} exclude={from} error={err.to} />
          </div>
          {/* Date inputs are uncontrolled on purpose: re-rendering a controlled
              type=date mid-typing makes Chrome commit "2" before the "6" of "26". */}
          <div className="bx-grid bx-grid--b">
            <div className="bx-f">
              <label htmlFor="depart">Depart</label>
              <input id="depart" type="date" className="bx-in" min={TODAY} max={addDays(TODAY, 355)} defaultValue="" onChange={(e) => setDepart(e.target.value)} aria-invalid={err.depart ? "true" : "false"} />
              {err.depart && <div className="bx-err">{err.depart}</div>}
            </div>
            <div className="bx-f">
              <label htmlFor="return">Return</label>
              <input id="return" type="date" className="bx-in" min={depart || TODAY} max={addDays(TODAY, 355)} defaultValue="" disabled={trip === "one"} onChange={(e) => setRet(e.target.value)} aria-invalid={err.ret ? "true" : "false"} />
              {err.ret && <div className="bx-err">{err.ret}</div>}
            </div>
            <div className="bx-f">
              <label htmlFor="cabin">Travel class</label>
              <select id="cabin" className="bx-in" value={cabinId} onChange={(e) => setCabin(e.target.value)}>
                {CABINS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <PaxPicker pax={pax} setPax={setPax} />
          </div>
          <div className="bx-search__go"><button type="submit" className="bx-btn">Find flights</button></div>
        </>
      )}
    </form>
  );
}

