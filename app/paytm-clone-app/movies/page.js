"use client";
// Movie ticket booking (20.5). Seats already taken cannot be selected, and the
// booking reaches a payment step priced by seat count.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Select, Field, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, MOVIES, SEAT_ROWS, SEATS_PER_ROW, SEAT_PRICE, TAKEN, useStore, money, txnId } from "../shared";

export default function MoviesPage() {
  const [s, update] = useStore();
  const [movieId, setMovieId] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState([]);
  const [err, setErr] = useState("");
  const [booked, setBooked] = useState(null);

  const movie = MOVIES.find((m) => m.id === movieId) || null;
  const total = seats.length * SEAT_PRICE;

  function toggleSeat(id) {
    if (TAKEN.includes(id)) return;
    setSeats((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  }

  function pay() {
    if (!seats.length) { setErr("Select at least one seat."); return; }
    if (total > s.walletBalance) { setErr(`Wallet balance is only ${money(s.walletBalance)}.`); return; }
    setErr("");
    const id = txnId(s.counter + 1);
    update((st) => {
      st.walletBalance = +(st.walletBalance - total).toFixed(2);
      st.bookings.unshift({ id, movie: movie.title, time, seats: [...seats], total, at: "2026-09-15" });
      st.transactions.unshift({ id, label: `Movie · ${movie.title}`, amount: total, at: "2026-09-15", status: "Success" });
      st.counter += 1;
      return st;
    });
    setBooked({ id, movie: movie.title, time, seats: [...seats], total });
  }

  if (booked) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
        <Page>
          <Banner tone="ok" title="Booking confirmed" testId="booking-confirmed">
            <strong data-testid="booked-movie">{booked.movie}</strong> · {booked.time} · seats{" "}
            <strong data-testid="booked-seats">{booked.seats.join(", ")}</strong>.
          </Banner>
          <Card title="Ticket" testId="ticket">
            <Row label="Booking ID" value={booked.id} testId="booking-id" />
            <Row label="Seats" value={booked.seats.join(", ")} testId="ticket-seats" />
            <Row label="Amount paid" value={money(booked.total)} strong testId="ticket-total" />
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/wallet`, label: "Wallet" }]} />
      <Page title="Movie tickets">
        <Card title="Now showing" testId="movie-list">
          {MOVIES.map((m) => (
            <div key={m.id} className="ck-row" data-testid={`movie-${m.id}`}>
              <span>
                <strong>{m.title}</strong> <span className="ck-muted">{m.cert} · {m.lang}</span>
              </span>
              <Btn size="sm" variant={movieId === m.id ? "primary" : "secondary"}
                   onClick={() => { setMovieId(m.id); setTime(""); setSeats([]); }} data-testid={`select-movie-${m.id}`}>
                Select
              </Btn>
            </div>
          ))}
        </Card>

        {movie && (
          <Card title={`Showtimes · ${movie.title}`} testId="showtimes">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {movie.times.map((t) => (
                <Btn key={t} size="sm" variant={time === t ? "primary" : "secondary"}
                     onClick={() => { setTime(t); setSeats([]); }} data-testid={`time-${t.replace(/[\s:]/g, "")}`}>
                  {t}
                </Btn>
              ))}
            </div>
          </Card>
        )}

        {movie && time && (
          <Card title="Choose your seats" testId="seat-map">
            <div className="ck-muted" style={{ marginBottom: 8 }}>Screen this way</div>
            {SEAT_ROWS.map((row) => (
              <div key={row} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                  const id = `${row}${i + 1}`;
                  const taken = TAKEN.includes(id);
                  const chosen = seats.includes(id);
                  return (
                    <Btn key={id} size="sm" disabled={taken}
                         variant={chosen ? "primary" : "secondary"}
                         onClick={() => toggleSeat(id)} data-testid={`seat-${id}`}>
                      {id}
                    </Btn>
                  );
                })}
              </div>
            ))}
            {err && <div className="ck-field-error" role="alert" data-testid="seat-error">{err}</div>}
            <Row label="Seats selected" value={seats.join(", ") || "None"} testId="selected-seats" />
            <Row label={`${seats.length} × ${money(SEAT_PRICE)}`} value={money(total)} strong testId="seat-total" />
            <Btn block onClick={pay} data-testid="proceed-payment">Proceed to payment</Btn>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
