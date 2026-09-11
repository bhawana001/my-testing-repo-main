"use client";
// Homepage "Entity Evals" section: searchable, industry-filterable index of all
// 49 entities and 208 flows. Lives below the untouched clones grid.
import { useMemo, useState } from "react";
import Link from "next/link";
import { ENTITIES, FLOWS, INDUSTRIES, PATTERN_LABELS } from "@/lib/registry";
import { hasFlow } from "@/lib/flow-loaders";

export default function EntityEvals() {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("All");
  const [open, setOpen] = useState({});

  const liveCount = useMemo(() => FLOWS.filter((f) => hasFlow(`${f.entitySlug}/${f.slug}`)).length, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ENTITIES.map((e) => {
      if (industry !== "All" && e.industry !== industry) return null;
      const flows = FLOWS.filter((f) => f.entitySlug === e.slug);
      if (!term) return { e, flows };
      const entHit = (e.name + " " + e.skin + " " + e.industry).toLowerCase().includes(term);
      const hits = flows.filter((f) => (f.uc + " " + f.useCase + " " + f.objective + " " + f.assertion + " " + f.pattern).toLowerCase().includes(term));
      if (!entHit && hits.length === 0) return null;
      return { e, flows: entHit ? flows : hits, forceOpen: !entHit };
    }).filter(Boolean);
  }, [q, industry]);

  const shownFlows = filtered.reduce((n, x) => n + x.flows.length, 0);

  return (
    <section className="ee-home" id="entity-evals" aria-labelledby="entity-evals-h">
      <div className="e-h2" id="entity-evals-h">Entity Evals</div>
      <div className="ee-home__intro">
        <p>
          {ENTITIES.length} real-world entities, {FLOWS.length} business-critical flows, each a working fictional-skin
          clone with a deterministic Reset and a matching Kane CLI <code>_test.md</code>. Routes:{" "}
          <code>/{"{entity}"}/{"{flow}"}</code>. {liveCount} of {FLOWS.length} flows live.
        </p>
      </div>
      <div className="ee-home__controls">
        <input
          type="search"
          className="ee-home__search"
          placeholder="Search entities or flows (e.g. checkout, 3DS, kanban, Netflix)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search entity evals"
        />
        <div className="ee-home__chips" role="group" aria-label="Filter by industry">
          {["All", ...INDUSTRIES].map((ind) => (
            <button key={ind} type="button" className="ee-home__chip" data-active={industry === ind ? "true" : "false"} onClick={() => setIndustry(ind)}>
              {ind}
            </button>
          ))}
        </div>
        <div className="ee-home__count" aria-live="polite">
          Showing {filtered.length} entities · {shownFlows} flows
        </div>
      </div>
      <div className="ee-home__grid">
        {filtered.map(({ e, flows, forceOpen }) => {
          const isOpen = forceOpen || open[e.slug];
          const live = flows.filter((f) => hasFlow(`${f.entitySlug}/${f.slug}`)).length;
          return (
            <article key={e.slug} className="ee-home__ent" data-entity={e.slug}>
              <div className="ee-home__ent-head">
                <span className="ee-home__ic" aria-hidden="true">{e.icon}</span>
                <div className="ee-home__ent-meta">
                  <Link href={`/${e.slug}`} className="ee-home__ent-name">{e.skin}</Link>
                  <span className="ee-home__ent-sub">
                    #{e.no} · {e.name} · {e.industry}
                  </span>
                </div>
                <button type="button" className="ee-home__toggle" onClick={() => setOpen((s) => ({ ...s, [e.slug]: !s[e.slug] }))} aria-expanded={isOpen ? "true" : "false"}>
                  {flows.length} flows · {live} live {isOpen ? "▴" : "▾"}
                </button>
              </div>
              {isOpen && (
                <ul className="ee-home__flows">
                  {flows.map((f) => {
                    const isLive = hasFlow(`${f.entitySlug}/${f.slug}`);
                    return (
                      <li key={f.uc}>
                        <Link href={f.path} className="ee-home__flow">
                          <span className="ee-home__uc">{f.uc}</span>
                          <span className="ee-home__flow-name">{f.useCase}</span>
                          <span className="ee-home__pat">{PATTERN_LABELS[f.pattern]}</span>
                          <span className={"ee-home__status" + (isLive ? " is-live" : "")}>{isLive ? "live" : `day ${f.day}`}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </article>
          );
        })}
        {filtered.length === 0 && <div className="ee-home__none">No entities or flows match “{q}”.</div>}
      </div>
    </section>
  );
}
