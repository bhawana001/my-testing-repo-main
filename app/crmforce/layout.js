"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import GlobalSearch from "./components/GlobalSearch";
import "./crmforce.css";

const NAV = [
  { href: "/crmforce", label: "Dashboard", icon: "▦", exact: true },
  { href: "/crmforce/leads", label: "Leads", icon: "◎" },
  { href: "/crmforce/contacts", label: "Contacts", icon: "☺" },
  { href: "/crmforce/accounts", label: "Accounts", icon: "▣" },
  { href: "/crmforce/opportunities", label: "Opportunities", icon: "$" },
  { href: "/crmforce/tasks", label: "Tasks", icon: "✓" },
];

export default function CrmforceLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // The login page renders its own full-screen layout — no app shell.
  if (pathname === "/crmforce/login") {
    return children;
  }

  async function signOut() {
    await fetch("/api/crmforce/auth", { method: "DELETE" });
    window.location.href = "/crmforce/login";
  }

  function isActive(item) {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + "/");
  }

  return (
    <div className="crmforce">
      <div className="cf-shell">
        <aside className="cf-sidebar">
          <div className="cf-logo">
            <span className="cf-logo-mark">☁</span> CRMforce
          </div>
          <nav className="cf-nav">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item) ? "active" : ""}
              >
                <span className="cf-nav-ico">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="cf-sidebar-foot">
            CRMforce · Powered by <b>Fable</b>
            <br />
            Demo workspace
          </div>
        </aside>

        <div className="cf-main">
          <header className="cf-topbar">
            <GlobalSearch />
            <div className="cf-topbar-spacer" />
            <span className="cf-poweredby">
              Powered by <b>Fable</b>
            </span>
            <div className="cf-user">
              <button className="cf-btn cf-btn-sm" onClick={signOut}>
                Sign out
              </button>
              <div className="cf-avatar">SR</div>
            </div>
          </header>
          <main className="cf-content">{children}</main>
        </div>
      </div>
    </div>
  );
}
