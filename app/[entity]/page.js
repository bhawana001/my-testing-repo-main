import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntity, getFlowsForEntity, PATTERN_LABELS } from "@/lib/registry";
import { hasFlow } from "@/lib/flow-loaders";

export async function generateMetadata({ params }) {
  const { entity } = await params;
  const ent = getEntity(entity);
  if (!ent) return {};
  return { title: `${ent.skin} flows · Entity Evals (${ent.name})`, description: `${ent.tagline}. Kane CLI eval flows modelled on ${ent.name}.` };
}

export default async function EntityLanding({ params }) {
  const { entity } = await params;
  const ent = getEntity(entity);
  if (!ent) notFound();
  const flows = getFlowsForEntity(entity);
  const live = flows.filter((f) => hasFlow(`${f.entitySlug}/${f.slug}`)).length;
  return (
    <main className="ee-main">
      <div className="ee-row ee-row--between" style={{ marginBottom: 20 }}>
        <div>
          <div className="ee-muted ee-small">
            <Link href="/">Real Evals</Link> / Entity Evals / {ent.industry}
          </div>
          <h1 className="ee-page-title" style={{ marginTop: 6 }}>
            {ent.icon} {ent.skin}
          </h1>
          <p className="ee-page-sub">
            {ent.tagline} · fictional skin modelled on {ent.name} · {flows.length} flows · {live} live
          </p>
        </div>
      </div>
      <div className="ee-grid ee-grid--2">
        {flows.map((f) => {
          const key = `${f.entitySlug}/${f.slug}`;
          const isLive = hasFlow(key);
          return (
            <Link key={f.uc} href={f.path} className="ee-card" style={{ display: "block" }}>
              <div className="ee-row ee-row--between" style={{ marginBottom: 8 }}>
                <span className="ee-muted ee-small ee-strong">Use case {f.uc}</span>
                {isLive ? <span className="ee-badge ee-badge--ok">live</span> : <span className="ee-badge">scheduled · day {f.day}</span>}
              </div>
              <h2 style={{ fontSize: 17, marginBottom: 6 }}>{f.useCase}</h2>
              <p className="ee-small ee-muted" style={{ marginBottom: 10 }}>{f.skinObjective}</p>
              <div className="ee-row" style={{ gap: 6 }}>
                <span className="ee-badge">{PATTERN_LABELS[f.pattern]}</span>
                {f.mobile && <span className="ee-badge ee-badge--info">mobile web equivalent</span>}
                <span className="ee-mono ee-tiny ee-muted">{f.path}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
