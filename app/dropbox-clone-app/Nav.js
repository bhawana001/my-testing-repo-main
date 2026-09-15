"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/files`, label: "Files", testId: "nav-files" },
      { href: `${BASE}/sharing`, label: "Sharing", testId: "nav-sharing" },
      { href: `${BASE}/requests`, label: "File requests", testId: "nav-requests" },
      { href: `${BASE}/versions`, label: "Version history", testId: "nav-versions" },
    ]} />
  );
}
