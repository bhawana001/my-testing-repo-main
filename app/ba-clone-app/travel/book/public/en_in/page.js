"use client";
// Booking flow, reached from the search form with the search in the query
// string. Choose an outbound flight and cabin, a fare (Basic / Standard /
// Plus), then the return, enter passengers, pay (card + 3-D Secure code) and
// get a booking reference that Manage My Booking and Check in both accept.
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Header, Footer } from "../../../../ui";
import {
  R, TODAY, airport, CABINS, cabin, FAMILIES, family, PAX_TYPES, fmt, prettyDate, addDays,
  searchFlights, legPrice, totalFor, paxCount, segToLeg, bookingRef, CARD_TEST, useStore,
} from "../../../../shared";

const TITLES = ["Mr", "Mrs", "Ms", "Miss", "Dr"];

function DateStrip({ date, onPick, price, min }) {
  const days = Array.from({ length: 7 }, (_, k) => addDays(date, k - 3));
  return (
    <div className="bx-dates" aria-label="Choose a different date">
      {days.map((d) => (
        <button key={d} type="button" data-on={d === date ? "true" : "false"} disabled={d < min} onClick={() => onPick(d)}>
          {prettyDate(d).slice(0, 10)}
          <b>{d < min ? "—" : fmt(price(d))}</b>
        </button>
      ))}
    </div>
  );
}

function FlightList({ legKey, from, to, date, trip, cabinPref, chosen, onSelect }) {
  const flights = searchFlights(from, to);
  const [open, setOpen] = useState(null); // `${flightId}|${cabinId}`
  if (!flights.length) return <div className="bx-card">There are no flights between these airports on this site.</div>;
  return flights.map((f, idx) => {
    const fromPrice = (c) => legPrice({ from, to, date, cabinId: c, familyId: "basic", optionIdx: idx, trip });
    const [of, oc] = (open || "").split("|");
    return (
      <div className="bx-flight" key={f.id} data-testid={`flight-${f.id}`}>
        <div className="bx-flight__main">
          <div className="bx-flight__info">
            <div className="bx-times"><span>{f.depTime}</span><i /><span>{f.arrTime}{f.plusDays > 0 && <sup style={{ fontSize: 11 }}>+{f.plusDays}</sup>}</span></div>
            <small>{from} → {to} · {f.duration} · {f.stops === 0 ? "Direct" : `${f.stops} stop (London Heathrow)`}</small>
            <small>{f.segs.map((s) => s.flight).join(" + ")} · Operated by Britannic Airways</small>
          </div>
          {CABINS.map((c) => (
            <button key={c.id} type="button" className="bx-cab" data-on={of === f.id && oc === c.id ? "true" : "false"}
              aria-label={`${c.name} from ${fmt(fromPrice(c.id))} on ${f.segs[0].flight}`}
              onClick={() => setOpen(of === f.id && oc === c.id ? null : `${f.id}|${c.id}`)}>
              {c.name}{c.id === cabinPref && <span className="bx-muted"> ★</span>}<b>{fmt(fromPrice(c.id))}</b>
            </button>
          ))}
        </div>
        {of === f.id && (
          <div className="bx-fams" aria-label={`${cabin(oc).name} fares`}>
            {FAMILIES.map((fam) => {
              const price = legPrice({ from, to, date, cabinId: oc, familyId: fam.id, optionIdx: idx, trip });
              const isChosen = chosen && chosen.flightId === f.id && chosen.cabinId === oc && chosen.familyId === fam.id;
              return (
                <div className="bx-fam" key={fam.id}>
                  <div className="bx-between"><b style={{ fontWeight: 600 }}>{cabin(oc).name} {fam.name}</b></div>
                  <ul>{fam.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                  <div className="p">{fmt(price)}<span className="bx-small bx-muted"> per person</span></div>
                  <button type="button" className={"bx-btn" + (isChosen ? " bx-btn--ghost" : "")}
                    aria-label={`Select ${cabin(oc).name} ${fam.name} on ${f.segs[0].flight}`}
                    onClick={() => onSelect({ legKey, flightId: f.id, flight: f, optionIdx: idx, cabinId: oc, familyId: fam.id, price, from, to, date })}>
                    {isChosen ? "Selected ✓" : "Select"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  });
}

function BookInner() {
  const router = useRouter();
  const p = useSearchParams();
  const [s, update] = useStore();
  const q = {
    from: p.get("from") || "", to: p.get("to") || "", trip: p.get("trip") === "one" ? "one" : "return",
    depart: p.get("depart") || "", ret: p.get("return") || "", cabin: p.get("cabin") || "M",
  };
  const pax = useMemo(() => Object.fromEntries(PAX_TYPES.map((t) => [t.id, Math.max(t.id === "ad" ? 1 : 0, parseInt(p.get(t.id) || (t.id === "ad" ? "1" : "0"), 10) || 0)])), [p]);
  const valid = airport(q.from) && airport(q.to) && q.depart >= TODAY && (q.trip === "one" || q.ret >= q.depart);

  const [step, setStep] = useState("out"); // out -> back -> pax -> pay -> done
  const [sel, setSel] = useState({ out: null, back: null });
  const [people, setPeople] = useState(null);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [err, setErr] = useState({});
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [done, setDone] = useState(null);

  if (!valid) {
    return (
      <div className="bx-wrap bx-page">
        <h1 className="bx-h1">We couldn't run that search</h1>
        <p className="bx-lead">The search is missing an airport or has dates in the past. Start a new search from the home page.</p>
        <Link className="bx-btn" href={R.home}>New search</Link>
      </div>
    );
  }

  const setParam = (k, v) => {
    const n = new URLSearchParams(p.toString());
    n.set(k, v);
    if (k === "depart" && q.trip === "return" && q.ret && q.ret < v) n.set("return", v);
    router.replace(`${R.book}?${n}`);
  };
  const legs = [sel.out, sel.back].filter(Boolean);
  const total = totalFor(legs, pax);
  const legsNeeded = q.trip === "return" ? 2 : 1;
  const FA = airport(q.from), TA = airport(q.to);

  const choose = (c) => {
    setSel((x) => ({ ...x, [c.legKey]: c }));
    setStep(c.legKey === "out" && q.trip === "return" ? "back" : "review");
  };

  const startPax = () => {
    const list = [];
    PAX_TYPES.forEach((t) => { for (let k = 0; k < pax[t.id]; k++) list.push({ id: `p${list.length + 1}`, type: t.id, title: "", first: "", last: "" }); });
    if (s.user && list[0]) Object.assign(list[0], { title: "Ms", first: s.user.first, last: s.user.last });
    setPeople(list);
    if (s.user) setContact({ email: s.user.email, phone: "" });
    setStep("pax");
  };

  const submitPax = (e) => {
    e.preventDefault();
    const x = {};
    people.forEach((pp) => {
      if (!pp.title) x[`${pp.id}title`] = "Choose a title";
      if (!pp.first.trim()) x[`${pp.id}first`] = "Enter a first name";
      if (!pp.last.trim()) x[`${pp.id}last`] = "Enter a last name";
    });
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) x.email = "Enter a valid email address";
    if (!/^\+?[0-9 ]{8,15}$/.test(contact.phone)) x.phone = "Enter a valid phone number";
    setErr(x);
    if (!Object.keys(x).length) setStep("pay");
  };

  const submitCard = (e) => {
    e.preventDefault();
    const x = {};
    const digits = card.number.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) x.number = "Enter the 16-digit card number";
    else if (digits === "4000000000000002") x.number = "Your card was declined. Try another card.";
    else if (digits !== CARD_TEST.number.replace(/\s/g, "")) x.number = "This demo only accepts the test card 4111 1111 1111 1111";
    if (!card.name.trim()) x.name = "Enter the name on the card";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) x.expiry = "Use MM/YY";
    else if (Number(card.expiry.slice(3)) < 26) x.expiry = "This card has expired";
    if (!/^\d{3}$/.test(card.cvv)) x.cvv = "Enter the 3-digit security code";
    setErr(x);
    if (!Object.keys(x).length) { setOtp(""); setOtpErr(""); setOtpOpen(true); }
  };

  const confirmOtp = () => {
    if (otp.trim() !== CARD_TEST.otp) { setOtpErr("That code is incorrect. Check the SMS from your bank and try again."); return; }
    // Work out the reference before the update so the confirmation can show it.
    const ref = bookingRef(s.counter);
    const first = sel.out;
    const fam = family(first.familyId);
    const booking = {
      ref, surname: people[0].last.trim(), email: contact.email, cabin: first.cabinId, family: first.familyId, total,
      passengers: people.filter((pp) => pp.type !== "inf").map((pp) => ({ id: pp.id, title: pp.title, first: pp.first.trim(), last: pp.last.trim(), bags: fam.bags, meal: "Standard", seat: null, checkedIn: false, passport: null })),
      infants: people.filter((pp) => pp.type === "inf").length,
      legs: legs.flatMap((l) => l.flight.segs.map((sg) => segToLeg(sg, l.date))),
      payments: [{ label: "Flights", amount: total }],
    };
    update((d) => ({ ...d, counter: d.counter + 1, bookings: [booking, ...d.bookings] }));
    setOtpOpen(false);
    setDone(booking);
    setStep("done");
  };

  const STEPS = [["out", "Outbound"], ...(q.trip === "return" ? [["back", "Return"]] : []), ["review", "Your selection"], ["pax", "Passengers"], ["pay", "Payment"], ["done", "Confirmation"]];
  const field = (id, label, input, error) => (
    <div className="bx-f"><label htmlFor={id}>{label}</label>{input}{error && <div className="bx-err">{error}</div>}</div>
  );

  return (
    <>
      <div className="bx-sumbar">
        <div className="bx-wrap bx-between">
          <div>
            <b data-testid="search-summary">{FA.city} ({FA.code}) {q.trip === "return" ? "⇄" : "→"} {TA.city} ({TA.code})</b>
            <div className="bx-small">{prettyDate(q.depart)}{q.trip === "return" && ` – ${prettyDate(q.ret)}`} · {paxCount(pax)} passenger{paxCount(pax) > 1 ? "s" : ""} · {cabin(q.cabin).name}</div>
          </div>
          <Link href={R.home} className="bx-login">Edit search</Link>
        </div>
      </div>
      <div className="bx-wrap bx-page" style={{ paddingTop: 0 }}>
        <div className="bx-steps">{STEPS.map(([k, t]) => <span key={k} data-on={step === k ? "true" : "false"}>{t}</span>)}</div>

        {legs.length > 0 && step !== "done" && (
          <div className="bx-sel" data-testid="selection-bar">
            <span>{legs.map((l) => `${l.from}→${l.to} ${l.flight.segs[0].flight} · ${cabin(l.cabinId).name} ${family(l.familyId).name} · ${fmt(l.price)}`).join("  |  ")}</span>
            <span>Total for all passengers <b data-testid="running-total">{fmt(total)}</b></span>
          </div>
        )}

        {step === "out" && (
          <>
            <h1 className="bx-h1" style={{ fontSize: 24 }}>Select your outbound flight</h1>
            <p className="bx-lead">{FA.city} to {TA.city} · {prettyDate(q.depart)}. Prices are per person and include taxes.</p>
            <DateStrip date={q.depart} min={TODAY} onPick={(d) => setParam("depart", d)} price={(d) => legPrice({ from: q.from, to: q.to, date: d, cabinId: q.cabin, familyId: "basic", optionIdx: 0, trip: q.trip })} />
            <FlightList legKey="out" from={q.from} to={q.to} date={q.depart} trip={q.trip} cabinPref={q.cabin} chosen={sel.out} onSelect={choose} />
          </>
        )}

        {step === "back" && (
          <>
            <h1 className="bx-h1" style={{ fontSize: 24 }}>Select your return flight</h1>
            <p className="bx-lead">{TA.city} to {FA.city} · {prettyDate(q.ret)}. <button className="bx-linkbtn" onClick={() => setStep("out")}>Change outbound flight</button></p>
            <DateStrip date={q.ret} min={q.depart} onPick={(d) => setParam("return", d)} price={(d) => legPrice({ from: q.to, to: q.from, date: d, cabinId: q.cabin, familyId: "basic", optionIdx: 0, trip: q.trip })} />
            <FlightList legKey="back" from={q.to} to={q.from} date={q.ret} trip={q.trip} cabinPref={q.cabin} chosen={sel.back} onSelect={choose} />
          </>
        )}

        {step === "review" && legs.length === legsNeeded && (
          <div className="bx-card">
            <h2>Your selection</h2>
            <table className="bx-table">
              <thead><tr><th>Flight</th><th>Date</th><th>Times</th><th>Fare</th><th>Per person</th></tr></thead>
              <tbody>
                {legs.map((l) => (
                  <tr key={l.legKey}>
                    <td>{l.flight.segs.map((sg) => sg.flight).join(" + ")} · {l.from} → {l.to}</td>
                    <td>{prettyDate(l.date)}</td>
                    <td>{l.flight.depTime} – {l.flight.arrTime}{l.flight.plusDays ? ` (+${l.flight.plusDays})` : ""}</td>
                    <td>{cabin(l.cabinId).name} {family(l.familyId).name}</td>
                    <td>{fmt(l.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="bx-small bx-muted">
              {PAX_TYPES.filter((t) => pax[t.id]).map((t) => `${pax[t.id]} × ${t.label.toLowerCase()}${t.mult !== 1 ? ` (${t.mult * 100}% of fare)` : ""}`).join(", ")}
            </p>
            <div className="bx-between">
              <div>Total price <div className="bx-total" data-testid="review-total">{fmt(total)}</div></div>
              <div className="bx-row">
                <button className="bx-btn bx-btn--ghost" onClick={() => setStep("out")}>Change flights</button>
                <button className="bx-btn" onClick={startPax}>Continue to passenger details</button>
              </div>
            </div>
          </div>
        )}

        {step === "pax" && people && (
          <form onSubmit={submitPax} noValidate>
            {people.map((pp, k) => (
              <div className="bx-card" key={pp.id}>
                <h2>Passenger {k + 1} <span className="bx-small bx-muted">({PAX_TYPES.find((t) => t.id === pp.type).label.replace(/s$/, "").toLowerCase()})</span></h2>
                <div className="bx-grid" style={{ gridTemplateColumns: "120px 1fr 1fr" }}>
                  {field(`${pp.id}-title`, "Title", (
                    <select id={`${pp.id}-title`} className="bx-in" value={pp.title} onChange={(e) => setPeople((l) => l.map((x) => x.id === pp.id ? { ...x, title: e.target.value } : x))}>
                      <option value="">Select</option>{TITLES.map((t) => <option key={t}>{t}</option>)}
                    </select>), err[`${pp.id}title`])}
                  {field(`${pp.id}-first`, "First name", <input id={`${pp.id}-first`} className="bx-in" value={pp.first} onChange={(e) => setPeople((l) => l.map((x) => x.id === pp.id ? { ...x, first: e.target.value } : x))} />, err[`${pp.id}first`])}
                  {field(`${pp.id}-last`, "Last name", <input id={`${pp.id}-last`} className="bx-in" value={pp.last} onChange={(e) => setPeople((l) => l.map((x) => x.id === pp.id ? { ...x, last: e.target.value } : x))} />, err[`${pp.id}last`])}
                </div>
              </div>
            ))}
            <div className="bx-card">
              <h2>Contact details</h2>
              <div className="bx-two">
                {field("email", "Email address", <input id="email" type="email" className="bx-in" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} />, err.email)}
                {field("phone", "Mobile number", <input id="phone" type="tel" className="bx-in" placeholder="+91 98765 43210" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />, err.phone)}
              </div>
            </div>
            <div className="bx-between"><button type="button" className="bx-btn bx-btn--ghost" onClick={() => setStep("review")}>Back</button><button type="submit" className="bx-btn">Continue to payment</button></div>
          </form>
        )}

        {step === "pay" && (
          <form className="bx-card" onSubmit={submitCard} noValidate style={{ maxWidth: 560 }}>
            <h2>Payment</h2>
            <p className="bx-small bx-muted">Test card: {CARD_TEST.number}, any name, expiry {CARD_TEST.expiry}, CVV {CARD_TEST.cvv}. Your bank will then ask for a one-time code.</p>
            <div className="bx-grid">
              {field("card", "Card number", <input id="card" inputMode="numeric" className="bx-in" value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))} />, err.number)}
              {field("cardname", "Name on card", <input id="cardname" className="bx-in" value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))} />, err.name)}
              <div className="bx-two">
                {field("expiry", "Expiry date (MM/YY)", <input id="expiry" className="bx-in" placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))} />, err.expiry)}
                {field("cvv", "Security code", <input id="cvv" inputMode="numeric" className="bx-in" value={card.cvv} onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))} />, err.cvv)}
              </div>
            </div>
            <div className="bx-between" style={{ marginTop: 16 }}>
              <button type="button" className="bx-btn bx-btn--ghost" onClick={() => setStep("pax")}>Back</button>
              <button type="submit" className="bx-btn">Pay {fmt(total)}</button>
            </div>
          </form>
        )}

        {step === "done" && done && (
          <div data-testid="confirmation">
            <div className="bx-banner bx-banner--ok">Payment successful. We've emailed your e-ticket to {done.email}.</div>
            <div className="bx-card">
              <h1 className="bx-h1">Your booking is confirmed</h1>
              <p className="bx-lead">Booking reference <b data-testid="booking-ref" style={{ fontSize: 22, color: "var(--navy)" }}>{done.ref}</b></p>
              <table className="bx-table">
                <thead><tr><th>Flight</th><th>Route</th><th>Date</th><th>Departs</th><th>Arrives</th></tr></thead>
                <tbody>{done.legs.map((l) => <tr key={l.flight + l.date}><td>{l.flight}</td><td>{l.from} → {l.to}</td><td>{prettyDate(l.date)}</td><td>{l.dep}</td><td>{l.arr}</td></tr>)}</tbody>
              </table>
              <dl className="bx-dl" style={{ marginTop: 14 }}>
                <dt>Passengers</dt><dd>{done.passengers.map((pp) => `${pp.title} ${pp.first} ${pp.last}`).join(", ")}{done.infants ? ` + ${done.infants} infant` : ""}</dd>
                <dt>Fare</dt><dd>{cabin(done.cabin).name} {family(done.family).name} · {family(done.family).bags} checked bag{family(done.family).bags === 1 ? "" : "s"} each</dd>
                <dt>Total paid</dt><dd data-testid="total-paid">{fmt(done.total)}</dd>
              </dl>
              <div className="bx-row" style={{ marginTop: 16 }}>
                <Link className="bx-btn" href={`${R.manage}?ref=${done.ref}&surname=${encodeURIComponent(done.surname)}`}>Manage this booking</Link>
                <Link className="bx-btn bx-btn--ghost" href={R.home}>Back to home</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {otpOpen && (
        <div className="bx-modal" role="dialog" aria-modal="true" aria-label="Verify your payment">
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 6 }}>Verify your payment</h2>
            <p className="bx-small bx-muted">Your bank has sent a one-time code to the mobile number ending 3210. Paying {fmt(total)} to Britannic Airways. (Demo code: {CARD_TEST.otp})</p>
            <div className="bx-f"><label htmlFor="otp">One-time code</label><input id="otp" className="bx-in" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} /></div>
            {otpErr && <div className="bx-err">{otpErr}</div>}
            <div className="bx-between" style={{ marginTop: 14 }}>
              <button className="bx-btn bx-btn--ghost" onClick={() => setOtpOpen(false)}>Cancel</button>
              <button className="bx-btn" onClick={confirmOtp}>Confirm payment</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Book() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="bx-wrap bx-page">Finding flights…</div>}><BookInner /></Suspense>
      <Footer />
    </>
  );
}
