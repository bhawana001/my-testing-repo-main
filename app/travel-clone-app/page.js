import Link from "next/link";
import TrvHeader from "./TrvHeader";
import TrvFooter from "./TrvFooter";
import { BASE, inr } from "./lib";
import { ROWS, byCity } from "./data";
import { DEMO_FLAGS } from "@/lib/demo-flags";

const CATS = [
  { ic: "🎭", l: "Cultural tours" }, { ic: "🏛️", l: "Landmarks" }, { ic: "🍜", l: "Food tours" },
  { ic: "🎨", l: "Art workshops" }, { ic: "🍳", l: "Cooking" }, { ic: "🏞️", l: "Outdoors" },
  { ic: "🛍️", l: "Shopping" }, { ic: "🧖", l: "Wellness" }, { ic: "🖼️", l: "Museums" },
];

// listingMoved: the "Home in Noida" card (ns1) goes last in its row with new text and locators.
const MOVED_ID = "ns1";
const isMoved = (l) => DEMO_FLAGS.listingMoved && l.id === MOVED_ID;
function rowListings(city) {
  const ls = byCity(city);
  if (!DEMO_FLAGS.listingMoved) return ls;
  return [...ls.filter((l) => l.id !== MOVED_ID), ...ls.filter((l) => l.id === MOVED_ID)];
}

function Card({ l }) {
  if (isMoved(l)) {
    return (
      <Link href={`${BASE}/rooms/${l.id}`} className="trv-stay" id="stay-tile-noida" data-testid="stay-tile-noida">
        <div className="trv-stay__img">
          {l.fav && <span className="trv-badge">Guest favourite</span>}
          <span className="trv-heart">♡</span>
          {l.emoji}
        </div>
        <div className="trv-stay__title">Noida Home Stay</div>
        <div className="trv-stay__price">
          <b>{inr(l.price)}</b> for 2 nights · ★ {l.rating}
        </div>
      </Link>
    );
  }
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

// travelRedesign: listings as horizontal list rows instead of grid cards.
function ListRow({ l }) {
  const moved = isMoved(l);
  return (
    <Link
      href={`${BASE}/rooms/${l.id}`}
      className={"trv-lrow" + (moved ? " trv-lrow--stay" : "")}
      {...(moved ? { id: "stay-tile-noida", "data-testid": "stay-tile-noida" } : {})}
    >
      <div className="trv-lrow__img">{l.emoji}</div>
      <div className="trv-lrow__body">
        <div className="trv-lrow__title">{moved ? "Noida Home Stay" : l.title}</div>
        <div className="trv-lrow__meta">
          {l.type} · {l.beds} bed{l.beds === 1 ? "" : "s"} · {l.baths} bath{l.baths === 1 ? "" : "s"}
          {l.fav && " · Guest favourite"}
        </div>
      </div>
      <div className="trv-lrow__price">
        <b>{inr(l.price)}</b>
        <span>for 2 nights · ★ {l.rating}</span>
      </div>
    </Link>
  );
}

function RedesignHome() {
  return (
    <>
      <TrvHeader showSearch={false} showTabs={false} />
      <div className="trv-container trv-rd">
        <aside className="trv-rd__side">
          <nav className="trv-rd__nav">
            <Link href={BASE} className="is-active">Homes</Link>
            <Link href={BASE}>Experiences</Link>
            <Link href={BASE}>Services</Link>
          </nav>
          <div className="trv-rd__search">
            <label><small>Where</small><input placeholder="Search destinations" /></label>
            <label><small>When</small><input placeholder="Add dates" /></label>
            <label><small>Who</small><input placeholder="Add guests" /></label>
            <button className="trv-btn" type="button">Search</button>
          </div>
          <div className="trv-rd__filters">
            <h3>Filters</h3>
            {CATS.map((c) => (
              <label key={c.l}><input type="checkbox" /> {c.ic} {c.l}</label>
            ))}
          </div>
        </aside>
        <div className="trv-rd__main">
          {ROWS.map((row) => (
            <section className="trv-rd__section" key={row.title}>
              <h2>{row.title}</h2>
              <div className="trv-list">
                {rowListings(row.city).map((l) => (
                  <ListRow l={l} key={l.id} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <TrvFooter />
    </>
  );
}

export default function TravelHome() {
  if (DEMO_FLAGS.travelRedesign) return <RedesignHome />;
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
              {rowListings(row.city).map((l) => (
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
