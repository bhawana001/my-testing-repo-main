import Link from "next/link";
import TrvHeader from "./TrvHeader";
import TrvFooter from "./TrvFooter";
import { BASE, inr } from "./lib";
import { ROWS, byCity } from "./data";

const CATS = [
  { ic: "🎭", l: "Cultural tours" }, { ic: "🏛️", l: "Landmarks" }, { ic: "🍜", l: "Food tours" },
  { ic: "🎨", l: "Art workshops" }, { ic: "🍳", l: "Cooking" }, { ic: "🏞️", l: "Outdoors" },
  { ic: "🛍️", l: "Shopping" }, { ic: "🧖", l: "Wellness" }, { ic: "🖼️", l: "Museums" },
];

function Card({ l }) {
  return (
    <Link href={`${BASE}/rooms/${l.id}`} className="trv-card">
      <div className="trv-card__img">
        {l.fav && <span className="trv-badge">Guest favourite</span>}
        <span className="trv-heart">♡</span>
        {l.emoji}
      </div>
      <div className="trv-card__title">{l.title}</div>
      <div className="trv-card__price">
        <b>{inr(l.price)}</b> for 2 nights · ★ {l.rating}
      </div>
    </Link>
  );
}

export default function TravelHome() {
  return (
    <>
      <TrvHeader />
      <div className="trv-container">
        {ROWS.map((row) => (
          <section className="trv-row" key={row.title}>
            <div className="trv-row__head">
              <h2>{row.title}</h2>
              <span>›</span>
            </div>
            <div className="trv-grid">
              {byCity(row.city).map((l) => (
                <Card l={l} key={l.id} />
              ))}
            </div>
          </section>
        ))}

        <div className="trv-cats">
          {CATS.map((c) => (
            <div className="trv-cat" key={c.l}>
              <div className="ic">{c.ic}</div>
              {c.l}
            </div>
          ))}
        </div>
      </div>
      <TrvFooter />
    </>
  );
}
