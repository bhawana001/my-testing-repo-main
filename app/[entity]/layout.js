import { notFound } from "next/navigation";
import BackToEvals from "../BackToEvals";
import { ENTITIES, getEntity } from "@/lib/registry";
import "../entity-evals.css";

export function generateStaticParams() {
  return ENTITIES.map((e) => ({ entity: e.slug }));
}
export const dynamicParams = false;

export default async function EntityLayout({ children, params }) {
  const { entity } = await params;
  const ent = getEntity(entity);
  if (!ent) notFound();
  const style = { "--ee-accent": ent.accent, "--ee-accent2": ent.accent2 };
  return (
    <div className="ee" data-mode={ent.mode} data-entity={ent.slug} style={style}>
      <BackToEvals />
      {children}
    </div>
  );
}
