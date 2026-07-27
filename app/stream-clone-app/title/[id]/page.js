import Link from "next/link";
import { notFound } from "next/navigation";
import FlxHeader from "../../FlxHeader";
import { BASE } from "../../lib";
import { getTitle } from "../../data";

export default async function TitleDetail({ params }) {
  const { id } = await params;
  const t = getTitle(id);
  if (!t) return notFound();

  return (
    <>
      <FlxHeader />
      <section className="flx-detail-hero">
        <div className="flx-detail-hero__bg" style={{ background: `linear-gradient(135deg, ${t.c}, #000)` }} />
      </section>
      <div className="flx-detail__body">
        <h1 style={{ fontSize: 44 }}>{t.title}</h1>
        <div className="flx-chip">
          {t.genre} · {t.year}
          {t.seasons ? ` · ${t.seasons} Seasons` : ""} {t.rating ? `· ${t.rating}` : ""}
        </div>
        <p>{t.desc || `Watch ${t.title} and thousands of other titles on StreamFlix.`}</p>
        <div className="flx-hero__btns">
          <Link href={`${BASE}/watch/${t.id}`} className="flx-btn flx-btn--play">
            ▶ Play
          </Link>
          <Link href={BASE} className="flx-btn flx-btn--info">
            + My List
          </Link>
        </div>
      </div>
    </>
  );
}
