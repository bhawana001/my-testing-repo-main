"use client";
// Phone-frame wrapper for "mobile web equivalent" flows.
import { getEntity } from "@/lib/registry";
import { Topbar } from "../eval/SkinChrome";

export function MobileShell({ flow, title, right, children, nav = [] }) {
  const ent = getEntity(flow.entitySlug);
  return (
    <>
      <Topbar entity={ent} nav={nav} light />
      <main className="ee-main ee-main--narrow">
        <div className="ee-mobile-note">mobile web equivalent · {ent.skin}</div>
        <div className="ee-phone" data-testid="phone">
          <div className="ee-phone__bar"><span>{title}</span>{right}</div>
          <div className="ee-phone__body ee-stack">{children}</div>
        </div>
      </main>
    </>
  );
}
