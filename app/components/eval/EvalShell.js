"use client";
// Thin strip above every entity flow: use-case label, pattern badge, chaos
// indicator and the visible Reset button. Also honours ?reset=true by clearing
// the flow's persisted state and stripping the param from the URL.
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { broadcastReset, storageKey } from "@/lib/state";
import { PATTERN_LABELS } from "@/lib/registry";

function StripInner({ flow }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const chaos = params.get("chaos") === "true";
  const [flash, setFlash] = useState(false);
  const key = storageKey(flow.entitySlug, flow.slug);

  // ?reset=true: state hooks already discarded storage during hydration
  // (lib/state.js). Broadcast once more for any late subscribers, then drop
  // the param so a reload does not reset again.
  useEffect(() => {
    if (params.get("reset") === "true") {
      broadcastReset(key);
      const next = new URLSearchParams(params.toString());
      next.delete("reset");
      const qs = next.toString();
      router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false });
    }
  }, [params, key, pathname, router]);

  function onReset() {
    broadcastReset(key);
    setFlash(true);
    setTimeout(() => setFlash(false), 1500);
  }

  return (
    <div className="ee-strip" data-testid="eval-strip">
      <Link href={`/${flow.entitySlug}`} className="ee-strip__back" title="All flows for this entity">
        ← {flow.skin}
      </Link>
      <span className="ee-strip__title">
        <span className="ee-strip__uc">Use case {flow.uc}</span>
        <span>{flow.useCase}</span>
      </span>
      <span className="ee-badge">{PATTERN_LABELS[flow.pattern]}</span>
      {flow.mobile && <span className="ee-badge ee-badge--info">mobile web equivalent</span>}
      {chaos && <span className="ee-badge ee-badge--warn">chaos mode</span>}
      <span className="ee-strip__spacer" />
      {flash && (
        <span className="ee-badge ee-badge--ok" role="status">
          State reset to seed
        </span>
      )}
      <button type="button" className="ee-btn ee-btn--secondary ee-btn--sm" onClick={onReset} aria-label="Reset flow state">
        ↺ Reset
      </button>
    </div>
  );
}

export default function EvalShell({ flow, children }) {
  return (
    <>
      <Suspense fallback={<div className="ee-strip" />}>
        <StripInner flow={flow} />
      </Suspense>
      {children}
    </>
  );
}
