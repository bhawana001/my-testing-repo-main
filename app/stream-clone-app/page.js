import Link from "next/link";
import FlxHeader from "./FlxHeader";
import { BASE } from "./lib";
import { ROWS, getTitle, titlesByIds } from "./data";

function Tile({ t, rank }) {
  return (
    <Link href={`${BASE}/title/${t.id}`} className="flx-ranked">
      {rank && <span className="flx-rank-num">{rank}</span>}
      <div className="flx-tile" style={{ background: `linear-gradient(135deg, ${t.c}, #000)` }}>
        {t.tag && <span className="flx-tile__tag">{t.tag}</span>}
        <span className="flx-tile__title">{t.title}</span>
      </div>
    </Link>
  );
}

export default function StreamHome() {
  const hero = getTitle("suits");
  return (
    <>
      <FlxHeader />

      <section className="flx-hero">
        <div className="flx-hero__bg" style={{ background: `linear-gradient(135deg, ${hero.c}, #000)` }} />
        <div className="flx-hero__inner">
          <h1>{hero.title}</h1>
          <div className="flx-hero__meta">
            Series · {hero.genre} · {hero.year} · {hero.seasons} Seasons · {hero.rating}
          </div>
          <p>{hero.desc}</p>
          <div className="flx-hero__btns">
            <Link href={`${BASE}/watch/${hero.id}`} className="flx-btn flx-btn--play">
              ▶ Play
            </Link>
            <Link href={`${BASE}/title/${hero.id}`} className="flx-btn flx-btn--info">
              ⓘ More Info
            </Link>
          </div>
        </div>
      </section>

      <div className="flx-rows">
        {ROWS.map((row) => (
          <section className="flx-row" key={row.title}>
            <h2>{row.title}</h2>
            <div className="flx-row__list">
              {titlesByIds(row.ids).map((t, i) => (
                <Tile t={t} key={t.id + row.title} rank={row.ranked ? i + 1 : null} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="flx-footer">© 2026 StreamFlix, Inc. · Demo streaming clone</footer>
    </>
  );
}
