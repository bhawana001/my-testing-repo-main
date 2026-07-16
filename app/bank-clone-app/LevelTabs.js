"use client";

import { useState } from "react";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function LevelTabs() {
  const [active, setActive] = useState("Beginner");

  return (
    <div className="b-segment" role="tablist" aria-label="Experience level">
      {LEVELS.map((lvl) => (
        <button
          key={lvl}
          role="tab"
          aria-selected={active === lvl}
          className={active === lvl ? "is-active" : undefined}
          onClick={() => setActive(lvl)}
        >
          {lvl}
        </button>
      ))}
    </div>
  );
}
