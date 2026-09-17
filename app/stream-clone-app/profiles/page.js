"use client";
// Profile switching with a PIN gate (47.3). The PIN-protected profile refuses
// a wrong code and only loads its content once the right one is entered.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Badge, Field, Input, Banner, Row } from "../../clones/kit/ui";
import { useStore } from "../account-store";
import { BASE } from "../lib";
import StreamFooter from "../StreamFooter";
import { TITLES } from "../data";

const BRAND = { name: "STREAMFLIX", slug: "netflix", footer: false, mark: "▶", home: BASE, accent: "#e50914", accentText: "#fff", bg: "#f5f5f5" };

export default function ProfilesPage() {
  const [s, update] = useStore();
  const [gate, setGate] = useState(null); // profile awaiting a PIN
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const active = s.profiles.find((p) => p.id === s.activeProfile) || s.profiles[0];

  function choose(profile) {
    if (profile.pin) { setGate(profile); setPin(""); setErr(""); return; }
    update((st) => { st.activeProfile = profile.id; return st; });
  }

  function submitPin() {
    if (pin !== gate.pin) {
      setErr("That PIN is incorrect.");
      return;
    }
    update((st) => { st.activeProfile = gate.id; return st; });
    setGate(null);
    setErr("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Browse" }, { href: `${BASE}/account`, label: "Account" }]} />
      <Page title="Who's watching?">
        <Card testId="profile-list">
          <div className="ck-grid ck-grid--3">
            {s.profiles.map((p) => (
              <div key={p.id} className="ck-tile" data-testid={`profile-${p.id}`}>
                <div className="ck-thumb" aria-hidden="true">{p.avatar}</div>
                <div className="ck-strong">{p.name}</div>
                {p.pin && <Badge tone="warn" testId={`locked-${p.id}`}>🔒 PIN protected</Badge>}
                {p.kids && <Badge tone="info">Kids</Badge>}
                {p.id === s.activeProfile && <Badge tone="ok" testId={`active-${p.id}`}>Active</Badge>}
                <Btn size="sm" block style={{ marginTop: 8 }} onClick={() => choose(p)} data-testid={`switch-${p.id}`}>
                  Switch to {p.name}
                </Btn>
              </div>
            ))}
          </div>
        </Card>

        {gate && (
          <Card title={`Enter PIN for ${gate.name}`} tone="warn" testId="pin-gate">
            <Field label="Profile PIN" error={err}>
              <Input value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" type="password"
                     aria-label="Profile PIN" data-testid="pin-input" />
            </Field>
            <Btn onClick={submitPin} data-testid="submit-pin">Unlock profile</Btn>
            <Btn variant="ghost" onClick={() => setGate(null)}>Cancel</Btn>
          </Card>
        )}

        {!gate && (
          <Card title={`Watching as ${active.name}`} testId="profile-content">
            <Row label="Active profile" value={active.name} testId="active-profile-name" />
            <Badge tone="ok" testId="content-loaded">Profile content loaded</Badge>
            <div className="ck-grid ck-grid--3" style={{ marginTop: 10 }}>
              {TITLES.slice(0, 6).map((t) => (
                <div key={t.id} className="ck-tile" data-testid={`tile-${t.id}`}>
                  <div style={{ background: t.c, height: 62, borderRadius: 6 }} aria-hidden="true" />
                  <div className="ck-strong" style={{ marginTop: 6 }}>{t.title}</div>
                  <div className="ck-muted">{t.genre}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Page>
      <StreamFooter />
    </Shell>
  );
}
