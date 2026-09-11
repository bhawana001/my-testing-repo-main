import Link from "next/link";
import { notFound } from "next/navigation";
import EvalShell from "@/app/components/eval/EvalShell";
import { FLOWS, getFlow, PATTERN_LABELS } from "@/lib/registry";
import { FLOW_LOADERS } from "@/lib/flow-loaders";

export function generateStaticParams() {
  return FLOWS.map((f) => ({ entity: f.entitySlug, flow: f.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { entity, flow } = await params;
  const f = getFlow(entity, flow);
  if (!f) return {};
  return {
    title: `${f.skin}: ${f.useCase} · Entity Evals (${f.entity} ${f.uc})`,
    description: `${f.skinObjective}. Key assertion: ${f.skinAssertion}.`,
  };
}

export default async function FlowPage({ params }) {
  const { entity, flow } = await params;
  const f = getFlow(entity, flow);
  if (!f) notFound();
  const key = `${entity}/${flow}`;
  const loader = FLOW_LOADERS[key];
  if (!loader) {
    return (
      <EvalShell flow={f}>
        <main className="ee-main ee-main--narrow">
          <section className="ee-card" data-testid="flow-scheduled">
            <span className="ee-badge">Scheduled · day {f.day}</span>
            <h1 className="ee-page-title" style={{ marginTop: 10 }}>{f.useCase}</h1>
            <p className="ee-muted" style={{ marginBottom: 14 }}>
              {f.skin} · {PATTERN_LABELS[f.pattern]} · this flow ships on day {f.day} of the build plan.
            </p>
            <div className="ee-stack ee-small">
              <div><span className="ee-strong">Objective:</span> {f.skinObjective}</div>
              <div><span className="ee-strong">Key assertion:</span> {f.skinAssertion}</div>
              <div><span className="ee-strong">Why it matters:</span> {f.why}</div>
            </div>
            <div className="ee-divider" />
            <Link href={`/${entity}`} className="ee-btn ee-btn--secondary ee-btn--sm">← All {f.skin} flows</Link>
          </section>
        </main>
      </EvalShell>
    );
  }
  const mod = await loader();
  const Flow = mod.default;
  return (
    <EvalShell flow={f}>
      <Flow flow={f} />
    </EvalShell>
  );
}
